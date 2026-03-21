/* assets/js/tts.js
   Shared Text-to-Speech helper for UEAH (Web Speech API).

   Goals:
   - Keep everything free + client-only (GitHub Pages compatible)
   - Choose a better default English voice when available
   - Prefer Microsoft natural voices when the browser exposes them
   - Let users persist voice + speed (rate) via localStorage
   - Provide a single API used by all listening/speaking runners

   Exposes: window.UEAH_TTS
     - isSupported()
     - ready() -> Promise<void>
     - getVoices() -> SpeechSynthesisVoice[]
     - getSettings() -> { voiceURI, rate }
     - setSettings({ voiceURI?, rate? }) -> { voiceURI, rate }
     - pickBestVoice(preferredLang?) -> SpeechSynthesisVoice|null
     - getVoiceMeta(voiceOrURI?, preferredLang?) -> metadata object
     - getPreferredVoiceMeta(preferredLang?) -> metadata object
     - speak(text, opts?) -> boolean
     - speakAsync(text, opts?) -> Promise<boolean>
     - stop()
     - isSpeaking() -> boolean
 */

(function () {
  "use strict";

  if (window.UEAH_TTS) return;

  const STORAGE_KEY = "ueah:tts:settings:v1";
  const RATE_MIN = 0.7;
  const RATE_MAX = 1.2;

  const DEFAULTS = {
    voiceURI: "",
    rate: 0.95,
  };

  const EVENTS = {
    voicesChanged: "ueah:tts-voices-changed",
    settingsChanged: "ueah:tts-settings-changed",
  };

  function clamp(n, min, max) {
    const x = Number(n);
    if (!Number.isFinite(x)) return min;
    return Math.min(max, Math.max(min, x));
  }

  function safeParseJSON(s) {
    try {
      return JSON.parse(s);
    } catch (_) {
      return null;
    }
  }

  function dispatch(name, detail) {
    try {
      window.dispatchEvent(new CustomEvent(name, { detail }));
    } catch (_) {
      try {
        const ev = document.createEvent("CustomEvent");
        ev.initCustomEvent(name, false, false, detail);
        window.dispatchEvent(ev);
      } catch (__) {}
    }
  }

  function isSupported() {
    return !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  }

  function loadSettings() {
    const raw = safeParseJSON(localStorage.getItem(STORAGE_KEY) || "");
    const out = { ...DEFAULTS };

    if (raw && typeof raw === "object") {
      if (typeof raw.voiceURI === "string") out.voiceURI = raw.voiceURI.trim();
      if (raw.rate != null) out.rate = clamp(raw.rate, RATE_MIN, RATE_MAX);
    }

    out.voiceURI = String(out.voiceURI || "").trim();
    out.rate = clamp(out.rate, RATE_MIN, RATE_MAX);
    return out;
  }

  let settings = loadSettings();

  function persistSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (_) {}
  }

  function getSettings() {
    return { ...settings };
  }

  function setSettings(next) {
    if (!next || typeof next !== "object") return getSettings();

    if (typeof next.voiceURI === "string") {
      settings.voiceURI = next.voiceURI.trim();
    }

    if (next.rate != null) {
      settings.rate = clamp(next.rate, RATE_MIN, RATE_MAX);
    }

    persistSettings();
    dispatch(EVENTS.settingsChanged, { settings: getSettings() });
    return getSettings();
  }

  let voices = [];
  let readyResolved = false;
  let readyResolve = null;
  let readyReject = null;

  const readyPromise = new Promise((resolve, reject) => {
    readyResolve = resolve;
    readyReject = reject;
  });

  function refreshVoices() {
    if (!isSupported()) return [];

    try {
      const list = typeof window.speechSynthesis.getVoices === "function"
        ? window.speechSynthesis.getVoices()
        : [];
      voices = Array.isArray(list) ? list.slice() : [];
    } catch (_) {
      voices = [];
    }

    if (voices.length && !readyResolved) {
      readyResolved = true;
      try {
        readyResolve();
      } catch (_) {}
    }

    dispatch(EVENTS.voicesChanged, { voices: voices.slice() });
    return voices.slice();
  }

  function attachVoicesChangedListener() {
    if (!isSupported()) return;

    try {
      window.speechSynthesis.onvoiceschanged = function () {
        refreshVoices();
      };
    } catch (_) {}
  }

  function primeVoices() {
    refreshVoices();

    if (!voices.length) {
      setTimeout(() => refreshVoices(), 150);
      setTimeout(() => refreshVoices(), 600);
    }

    setTimeout(() => {
      if (!readyResolved) {
        readyResolved = true;
        try {
          readyResolve();
        } catch (_) {}
      }
    }, 1800);
  }

  function ready() {
    return readyPromise;
  }

  function norm(s) {
    return String(s || "").trim().toLowerCase();
  }

  function resolveVoice(voiceOrURI, preferredLang) {
    const list = voices.length ? voices : refreshVoices();
    if (!list.length) return null;

    if (typeof voiceOrURI === "string" && voiceOrURI.trim()) {
      return list.find((v) => String(v.voiceURI || "") === voiceOrURI.trim()) || null;
    }

    if (voiceOrURI && typeof voiceOrURI === "object") {
      return voiceOrURI;
    }

    return pickBestVoice(preferredLang);
  }

  function getVoiceMeta(voiceOrURI, preferredLang) {
    const v = resolveVoice(voiceOrURI, preferredLang);
    const pref = norm(preferredLang || "en-US");
    const primaryPref = pref.split("-")[0] || "en";
    const lang = norm(v && v.lang);
    const name = String((v && v.name) || "").trim();
    const uri = String((v && v.voiceURI) || "").trim();
    const nameNorm = norm(name);
    const uriNorm = norm(uri);

    const isEnglish = lang.startsWith("en");
    const isExactLang = !!(lang && pref && lang === pref);
    const isPrimaryLang = !!(lang && primaryPref && lang.startsWith(primaryPref));
    const isMicrosoft = nameNorm.includes("microsoft") || uriNorm.includes("microsoft");
    const isGoogle = nameNorm.includes("google") || uriNorm.includes("google");
    const isNatural = nameNorm.includes("natural") || nameNorm.includes("neural");
    const isOnline = nameNorm.includes("online") || uriNorm.includes("online");
    const isEdgeNatural = isMicrosoft && (isNatural || isOnline);
    const isUserSelected = !!(settings.voiceURI && uri && norm(settings.voiceURI) === uriNorm);

    let provider = "Browser";
    if (isMicrosoft) provider = "Microsoft";
    else if (isGoogle) provider = "Google";
    else if (v && v.localService) provider = "Device";

    let quality = "Standard";
    if (isEdgeNatural) quality = "Microsoft Natural";
    else if (isMicrosoft && isNatural) quality = "Microsoft Enhanced";
    else if (isNatural) quality = "Enhanced";

    let summary = "Using the browser's available voice.";
    if (isEdgeNatural) {
      summary = "Using a Microsoft natural voice for more lifelike playback.";
    } else if (isMicrosoft) {
      summary = "Using a Microsoft voice. Natural Microsoft voices sound best when available.";
    } else if (isGoogle && isNatural) {
      summary = "Using an enhanced Google voice from the browser.";
    } else if (isNatural) {
      summary = "Using an enhanced voice exposed by the browser.";
    } else if (isEnglish) {
      summary = "Using a standard English browser voice.";
    }

    const displayName = v
      ? `${name || "Voice"} (${lang || "unknown"})${isEdgeNatural ? " - Microsoft natural" : isMicrosoft ? " - Microsoft" : ""}`
      : "Automatic browser voice";

    return {
      voice: v || null,
      voiceURI: uri,
      name,
      lang,
      provider,
      quality,
      displayName,
      summary,
      isEnglish,
      isExactLang,
      isPrimaryLang,
      isMicrosoft,
      isGoogle,
      isNatural,
      isOnline,
      isEdgeNatural,
      isUserSelected,
    };
  }

  function scoreVoice(v, preferredLang) {
    const meta = getVoiceMeta(v, preferredLang);
    const lang = meta.lang;
    const name = norm(meta.name);
    const uri = norm(meta.voiceURI);

    let score = 0;
    const pref = norm(preferredLang || "en-US");

    if (lang === pref) score += 120;
    else if (lang && pref && lang.startsWith(pref.split("-")[0])) score += 90;
    else if (lang.startsWith("en")) score += 70;
    else score -= 50;

    if (meta.isEdgeNatural) score += 140;
    else if (meta.isMicrosoft && meta.isNatural) score += 100;
    else if (meta.isMicrosoft) score += 55;
    else if (meta.isGoogle && meta.isNatural) score += 45;
    else if (meta.isGoogle) score += 25;
    else if (meta.isNatural) score += 30;

    if (v && v.default) score += 10;
    if (v && v.localService && !meta.isEdgeNatural) score += 4;
    if (meta.isOnline) score += 10;

    const badTokens = ["espeak", "mbrola", "festival", "robot"];
    for (const t of badTokens) {
      if (name.includes(t)) score -= 8;
    }

    if (settings.voiceURI && uri && uri === norm(settings.voiceURI)) score += 1000;

    return score;
  }

  function pickBestVoice(preferredLang) {
    const list = voices.length ? voices : refreshVoices();
    if (!list.length) return null;

    if (settings.voiceURI) {
      const chosen = list.find((v) => String(v.voiceURI || "") === settings.voiceURI);
      if (chosen) return chosen;
    }

    const pref = preferredLang || "en-US";
    let best = null;
    let bestScore = -Infinity;

    for (const v of list) {
      const s = scoreVoice(v, pref);
      if (s > bestScore) {
        bestScore = s;
        best = v;
      }
    }

    return best;
  }

  function getVoices() {
    return voices.slice();
  }

  function getPreferredVoiceMeta(preferredLang) {
    return getVoiceMeta(null, preferredLang);
  }

  let speakJobId = 0;

  function stop() {
    speakJobId += 1;
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch (_) {}
  }

  function isSpeaking() {
    try {
      return !!(window.speechSynthesis && window.speechSynthesis.speaking);
    } catch (_) {
      return false;
    }
  }

  function cleanText(text) {
    return String(text == null ? "" : text)
      .replace(/[\s\u00A0]+/g, " ")
      .trim();
  }

  function splitIntoChunks(text, maxLen) {
    const t = cleanText(text);
    if (!t) return [];

    const limit = Math.max(80, Number(maxLen) || 180);
    if (t.length <= limit) return [t];

    const sentences = [];
    let buf = "";
    for (let i = 0; i < t.length; i++) {
      const ch = t[i];
      buf += ch;

      const isEnd = ch === "." || ch === "!" || ch === "?";
      const next = t[i + 1] || "";
      if (isEnd && (next === " " || next === "\n" || next === "\t")) {
        const s = buf.trim();
        if (s) sentences.push(s);
        buf = "";
      }
    }

    const tail = buf.trim();
    if (tail) sentences.push(tail);

    const chunks = [];
    let cur = "";

    function pushCur() {
      const c = cur.trim();
      if (c) chunks.push(c);
      cur = "";
    }

    for (const s of sentences.length ? sentences : [t]) {
      if (!cur) {
        cur = s;
        continue;
      }

      if ((cur + " " + s).length <= limit) {
        cur += " " + s;
      } else {
        pushCur();
        cur = s;
      }
    }
    pushCur();

    const finalChunks = [];
    for (const c of chunks) {
      if (c.length <= limit) {
        finalChunks.push(c);
        continue;
      }

      const parts = c.split(/,\s+/);
      if (parts.length > 1) {
        let pbuf = "";
        for (const p of parts) {
          const piece = p.trim();
          if (!piece) continue;

          if (!pbuf) pbuf = piece;
          else if ((pbuf + ", " + piece).length <= limit) pbuf += ", " + piece;
          else {
            finalChunks.push(pbuf);
            pbuf = piece;
          }
        }
        if (pbuf) finalChunks.push(pbuf);
        continue;
      }

      const words = c.split(/\s+/);
      let wbuf = "";
      for (const w of words) {
        if (!wbuf) wbuf = w;
        else if ((wbuf + " " + w).length <= limit) wbuf += " " + w;
        else {
          finalChunks.push(wbuf);
          wbuf = w;
        }
      }
      if (wbuf) finalChunks.push(wbuf);
    }

    return finalChunks;
  }

  function speakInternal(text, opts) {
    const t = cleanText(text);
    if (!t) return Promise.resolve(false);
    if (!isSupported()) return Promise.resolve(false);

    const jobId = (speakJobId += 1);
    const options = opts && typeof opts === "object" ? opts : {};
    const lang = String(options.lang || "en-US");
    const rate = clamp(options.rate != null ? options.rate : settings.rate, RATE_MIN, RATE_MAX);
    const pitch = clamp(options.pitch != null ? options.pitch : 1.0, 0.5, 2.0);
    const volume = clamp(options.volume != null ? options.volume : 1.0, 0.0, 1.0);
    const chunk = options.chunk !== false;
    const chunkSize = Number(options.chunkSize) || 180;
    const chunks = chunk ? splitIntoChunks(t, chunkSize) : [t];

    return ready()
      .catch(() => {})
      .then(() => {
        if (jobId !== speakJobId) return false;

        try {
          const synth = window.speechSynthesis;
          synth.cancel();

          try {
            if (typeof synth.resume === "function") synth.resume();
          } catch (_) {}

          const voice = options.voiceURI
            ? (voices.find((v) => String(v.voiceURI || "") === String(options.voiceURI)) || null)
            : pickBestVoice(lang);

          return new Promise((resolve) => {
            let i = 0;

            const speakNext = () => {
              if (jobId !== speakJobId) {
                resolve(false);
                return;
              }

              if (i >= chunks.length) {
                resolve(true);
                return;
              }

              const part = chunks[i++];
              const utterance = new SpeechSynthesisUtterance(part);
              utterance.lang = lang;
              utterance.rate = rate;
              utterance.pitch = pitch;
              utterance.volume = volume;

              if (voice) {
                try {
                  utterance.voice = voice;
                } catch (_) {}
              }

              utterance.onend = () => {
                setTimeout(speakNext, 10);
              };

              utterance.onerror = () => {
                resolve(false);
              };

              try {
                synth.speak(utterance);
              } catch (_) {
                resolve(false);
              }
            };

            speakNext();
          });
        } catch (_) {
          return false;
        }
      });
  }

  function speak(text, opts) {
    const t = cleanText(text);
    if (!t || !isSupported()) return false;
    speakInternal(t, opts);
    return true;
  }

  function speakAsync(text, opts) {
    return speakInternal(text, opts);
  }

  attachVoicesChangedListener();

  if (isSupported()) {
    try {
      primeVoices();
    } catch (_) {
      try {
        readyReject(new Error("TTS init failed"));
      } catch (__) {}
    }
  } else {
    readyResolved = true;
    try {
      readyResolve();
    } catch (_) {}
  }

  window.UEAH_TTS = {
    isSupported,
    ready,
    getVoices,
    getSettings,
    setSettings,
    pickBestVoice,
    getVoiceMeta,
    getPreferredVoiceMeta,
    speak,
    speakAsync,
    stop,
    isSpeaking,
    EVENTS,
  };
})();
