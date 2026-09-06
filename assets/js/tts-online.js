/* assets/js/tts-online.js
   Online neural voice provider for UEAH (opt-in, needs internet).

   Streams sentence audio from the Microsoft Edge read-aloud endpoint
   (free, no API key) and plays it with the browser <audio> element.
   Nothing is downloaded or installed; clips are cached in memory per
   session. Any failure returns false so callers fall back to the
   built-in browser voice.

   NOTE: this uses an unofficial endpoint that Microsoft may throttle or
   change without notice. The provider is strictly opt-in ("online") and
   the app works fully offline without it.

   Exposes: window.UEAH_TTS_ONLINE
     - VOICE
     - synthesize(text, opts?) -> Promise<Blob|null> (mp3, no playback)
     - speak(text, opts?) -> boolean
     - speakAsync(text, opts?) -> Promise<boolean>
     - stop()
     - isSpeaking() -> boolean
*/
(function () {
  "use strict";

  if (window.UEAH_TTS_ONLINE) return;

  var VOICE = "en-US-AvaNeural";
  var WS_BASE = "wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1";
  var TRUSTED_CLIENT_TOKEN = "6A5AA1D4EAFF4E9FB37E23D68491D6F4";
  // Must track the Chromium version the service expects; on mismatch the
  // handshake is rejected and we fall back to the browser voice.
  var SEC_MS_GEC_VERSION = "1-143.0.3650.75";
  var CONNECT_TIMEOUT_MS = 8000;
  var MAX_CACHE = 60;

  var cache = new Map(); // key -> Blob
  var jobId = 0;
  var audio = null;
  var speaking = false;

  function cleanText(text) {
    return String(text == null ? "" : text).replace(/[\s ]+/g, " ").trim();
  }

  function escapeXml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;");
  }

  function rateToProsody(rate) {
    var r = Number(rate);
    if (!isFinite(r)) r = 1;
    r = Math.max(0.5, Math.min(1.5, r));
    var pct = Math.round((r - 1) * 100);
    return (pct >= 0 ? "+" : "") + pct + "%";
  }

  function splitIntoChunks(text, maxLen) {
    var t = cleanText(text);
    if (!t) return [];
    var limit = Math.max(60, Number(maxLen) || 400);
    if (t.length <= limit) return [t];
    var out = [];
    var sentences = t.match(/[^.!?]+[.!?]+["'”’)]?|\S[^.!?]*$/g) || [t];
    var cur = "";
    sentences.forEach(function (s) {
      s = s.trim();
      if (!s) return;
      if (!cur) cur = s;
      else if ((cur + " " + s).length <= limit) cur += " " + s;
      else {
        out.push(cur);
        cur = s;
      }
    });
    if (cur) out.push(cur);
    return out;
  }

  function cacheKey(text, rate) {
    return VOICE + "|" + rateToProsody(rate) + "|" + cleanText(text);
  }

  function cacheGet(key) {
    if (!cache.has(key)) return null;
    var blob = cache.get(key);
    cache.delete(key);
    cache.set(key, blob); // LRU refresh
    return blob;
  }

  function cacheSet(key, blob) {
    cache.set(key, blob);
    while (cache.size > MAX_CACHE) {
      var oldest = cache.keys().next();
      if (oldest.done) break;
      cache.delete(oldest.value);
    }
  }

  function hexId() {
    try {
      var b = new Uint8Array(16);
      (window.crypto || {}).getRandomValues
        ? window.crypto.getRandomValues(b)
        : b.forEach(function (_, i) { b[i] = Math.floor(Math.random() * 256); });
      return Array.from(b).map(function (x) { return ("0" + x.toString(16)).slice(-2); }).join("");
    } catch (_) {
      return String(Date.now()) + String(Math.floor(Math.random() * 1e9));
    }
  }

  function timestamp() {
    // JS-style date string the service expects, e.g.
    // "Sat Sep 06 2026 08:30:00 GMT+0000 (Coordinated Universal Time)".
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    var d = new Date();
    function pad(n) {
      return (n < 10 ? "0" : "") + n;
    }
    return days[d.getUTCDay()] + " " + months[d.getUTCMonth()] + " " +
      pad(d.getUTCDate()) + " " + d.getUTCFullYear() + " " +
      pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes()) + ":" + pad(d.getUTCSeconds()) +
      " GMT+0000 (Coordinated Universal Time)";
  }

  function stripIncompatible(s) {
    return String(s).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, " ");
  }

  // Sec-MS-GEC handshake token: SHA256 (uppercase hex) of the Windows file
  // time rounded down to 5 minutes concatenated with the client token.
  // NOTE: windows ticks (~1.3e17) exceed float precision, so the x10^7 step
  // is done by appending zeros to the exact seconds string, not multiplying.
  async function generateSecMsGec() {
    var secs = Math.floor(Date.now() / 1000) + 11644473600;
    secs -= secs % 300;
    var raw = String(secs) + "0000000" + TRUSTED_CLIENT_TOKEN;
    if (window.crypto && window.crypto.subtle) {
      var digest = await window.crypto.subtle.digest(
        "SHA-256", new TextEncoder().encode(raw)
      );
      return Array.from(new Uint8Array(digest)).map(function (b) {
        return ("0" + b.toString(16)).slice(-2).toUpperCase();
      }).join("");
    }
    // Fallback (non-secure contexts): DJB2-style hash is NOT valid for the
    // service; return empty so the caller can abort to browser fallback.
    return "";
  }

  function buildWsUrl(gec) {
    return WS_BASE +
      "?TrustedClientToken=" + TRUSTED_CLIENT_TOKEN +
      "&ConnectionId=" + hexId() +
      "&Sec-MS-GEC=" + gec +
      "&Sec-MS-GEC-Version=" + SEC_MS_GEC_VERSION;
  }

  // Synthesize one chunk over the Edge WebSocket. Resolves Blob or null.
  function fetchChunk(chunk, rate) {
    return new Promise(function (resolve) {
      var done = false;
      var finish = function (blob) {
        if (done) return;
        done = true;
        try {
          ws.close();
        } catch (_) {}
        resolve(blob || null);
      };

      if (!window.WebSocket) {
        finish(null);
        return;
      }

      var ws;
      var parts = [];
      var timer = setTimeout(function () {
        finish(null);
      }, CONNECT_TIMEOUT_MS);

      var cleanup = function () {
        clearTimeout(timer);
      };

      var openSocket = function (url) {
        try {
          ws = new WebSocket(url);
        } catch (_) {
          cleanup();
          finish(null);
          return;
        }
        ws.binaryType = "arraybuffer";

        ws.onopen = function () {
          var config =
            "X-Timestamp:" + timestamp() + "\r\n" +
            "Content-Type:application/json; charset=utf-8\r\n" +
            "Path:speech.config\r\n\r\n" +
            '{"context":{"synthesis":{"audio":{"metadataoptions":{' +
            '"sentenceBoundaryEnabled":"false","wordBoundaryEnabled":"false"},' +
            '"outputFormat":"audio-24khz-48kbitrate-mono-mp3"}}}}';
          var ssml =
            "X-RequestId:" + hexId() + "\r\n" +
            "Content-Type:application/ssml+xml\r\n" +
            "X-Timestamp:" + timestamp() + "Z\r\n" +
            "Path:ssml\r\n\r\n" +
            "<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='en-US'>" +
            "<voice name='" + VOICE + "'>" +
            "<prosody rate='" + rateToProsody(rate) + "' pitch='+0Hz' volume='+0%'>" +
            escapeXml(stripIncompatible(chunk)) +
            "</prosody></voice></speak>";
          try {
            ws.send(config);
            ws.send(ssml);
          } catch (_) {
            cleanup();
            finish(null);
          }
        };

        ws.onmessage = function (ev) {
          if (typeof ev.data === "string") {
            if (ev.data.indexOf("Path:turn.end") !== -1) {
              cleanup();
              if (!parts.length) {
                finish(null);
                return;
              }
              try {
                finish(new Blob(parts, { type: "audio/mpeg" }));
              } catch (_) {
                finish(null);
              }
            }
            return;
          }
          try {
            var buf = ev.data instanceof ArrayBuffer ? ev.data : null;
            if (!buf) return;
            var view = new DataView(buf);
            if (view.byteLength < 2) return;
            var headerLen = view.getUint16(0);
            if (view.byteLength > headerLen + 2) {
              parts.push(buf.slice(headerLen + 2));
            }
          } catch (_) {}
        };

        ws.onerror = function () {
          cleanup();
          finish(null);
        };
        ws.onclose = function () {
          cleanup();
          finish(parts.length ? new Blob(parts, { type: "audio/mpeg" }) : null);
        };
      };

      generateSecMsGec().then(function (gec) {
        if (done) return;
        if (!gec) {
          cleanup();
          finish(null);
          return;
        }
        openSocket(buildWsUrl(gec));
      }).catch(function () {
        cleanup();
        finish(null);
      });
    });
  }

  async function synthesize(text, opts) {
    var t = cleanText(text);
    if (!t) return null;
    var rate = opts && opts.rate != null ? opts.rate : 1;
    var key = cacheKey(t, rate);
    var hit = cacheGet(key);
    if (hit) return hit;
    var blob = await fetchChunk(t, rate);
    if (blob && blob.size > 0) cacheSet(key, blob);
    return blob && blob.size > 0 ? blob : null;
  }

  function ensureAudio() {
    if (!audio) {
      try {
        audio = new Audio();
        audio.preload = "auto";
      } catch (_) {
        return null;
      }
    }
    return audio;
  }

  function playBlob(blob, rate, myJob) {
    return new Promise(function (resolve) {
      var el = ensureAudio();
      if (!el) {
        resolve(false);
        return;
      }
      var url = null;
      try {
        url = URL.createObjectURL(blob);
      } catch (_) {
        resolve(false);
        return;
      }
      var done = false;
      var finish = function (ok) {
        if (done) return;
        done = true;
        try {
          el.pause();
        } catch (_) {}
        try {
          el.removeAttribute("src");
        } catch (_) {}
        try {
          URL.revokeObjectURL(url);
        } catch (_) {}
        resolve(myJob === jobId && !!ok);
      };
      el.onended = function () {
        finish(true);
      };
      el.onerror = function () {
        finish(false);
      };
      try {
        el.playbackRate = Math.max(0.5, Math.min(1.5, Number(rate) || 1));
      } catch (_) {}
      try {
        el.src = url;
        var p = el.play();
        if (p && typeof p.catch === "function") {
          p.catch(function () {
            finish(false);
          });
        }
      } catch (_) {
        finish(false);
      }
    });
  }

  function stop() {
    jobId += 1;
    speaking = false;
    try {
      if (audio) audio.pause();
    } catch (_) {}
  }

  function isSpeaking() {
    return speaking;
  }

  async function speakAsync(text, opts) {
    var t = cleanText(text);
    if (!t) return false;
    var myJob = (jobId += 1);
    var rate = opts && opts.rate != null ? opts.rate : 1;

    var chunks = splitIntoChunks(t, 400);
    speaking = true;
    for (var i = 0; i < chunks.length; i++) {
      if (myJob !== jobId) {
        speaking = false;
        return false;
      }
      var key = cacheKey(chunks[i], rate);
      var blob = cacheGet(key) || (await synthesize(chunks[i], { rate: rate }));
      if (!blob || myJob !== jobId) {
        speaking = false;
        return false;
      }
      var ok = await playBlob(blob, rate, myJob);
      if (!ok || myJob !== jobId) {
        speaking = false;
        return false;
      }
    }
    if (myJob === jobId) speaking = false;
    return myJob === jobId;
  }

  function speak(text, opts) {
    if (!cleanText(text)) return false;
    speakAsync(text, opts);
    return true;
  }

  window.UEAH_TTS_ONLINE = {
    VOICE: VOICE,
    synthesize: synthesize,
    speak: speak,
    speakAsync: speakAsync,
    stop: stop,
    isSpeaking: isSpeaking,
  };
})();
