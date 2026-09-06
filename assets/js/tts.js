/* assets/js/tts.js
   Shared Text-to-Speech helper for UEAH.

   Supports:
   - Browser speech synthesis (Web Speech API, instant default)
   - Online neural voice (streams sentence audio, opt-in, needs internet;
     falls back to the browser voice when offline or on error)

   Exposes: window.UEAH_TTS
     - isSupported()
     - ready() -> Promise<void>
     - getVoices() -> SpeechSynthesisVoice[]
     - getSettings() -> { provider, voiceURI, rate }
     - setSettings({ provider?, voiceURI?, rate? }) -> { provider, voiceURI, rate }
     - pickBestVoice(preferredLang?) -> SpeechSynthesisVoice|null
     - getVoiceMeta(voiceOrURI?, preferredLang?) -> metadata object
     - getPreferredVoiceMeta(preferredLang?) -> metadata object
     - getProviderMeta(preferredLang?) -> metadata object
     - speak(text, opts?) -> boolean
     - speakAsync(text, opts?) -> Promise<boolean>
     - stop()
     - isSpeaking() -> boolean
 */

(function () {
  "use strict";

  if (window.UEAH_TTS) return;

  const STORAGE_KEY = "ueah:tts:settings:v2";
  const RATE_MIN = 0.7;
  const RATE_MAX = 1.2;
  const PROVIDERS = {
    auto: "auto",
    browser: "browser",
    online: "online",
  };

  function getOnline() {
    var o = window.UEAH_TTS_ONLINE;
    return o && typeof o === "object" ? o : null;
  }

  function norm(s) {
    return String(s || "").trim().toLowerCase();
  }

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

  function loadRuntimeConfig() {
    const raw = window.UEAH_TTS_CONFIG && typeof window.UEAH_TTS_CONFIG === "object"
      ? window.UEAH_TTS_CONFIG
      : {};
    const preferredProvider = norm(raw.preferredProvider);

    return {
      preferredProvider:
        preferredProvider === PROVIDERS.browser || preferredProvider === PROVIDERS.online
          ? preferredProvider
          : PROVIDERS.browser,
    };
  }

  const runtimeConfig = loadRuntimeConfig();

  const DEFAULTS = {
    provider: runtimeConfig.preferredProvider,
    voiceURI: "",
    rate: 0.95,
  };

  const EVENTS = {
    voicesChanged: "ueah:tts-voices-changed",
    settingsChanged: "ueah:tts-settings-changed",
  };

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

  function hasBrowserSpeech() {
    return !!(window.speechSynthesis && window.SpeechSynthesisUtterance);
  }

  function isSupported() {
    return hasBrowserSpeech();
  }

  function normalizeProvider(value) {
    const v = norm(value);
    if (v === PROVIDERS.auto || v === PROVIDERS.browser || v === PROVIDERS.online) return v;
    return PROVIDERS.browser;
  }

  // Online neural voice (streams sentence audio, needs internet).
  function onlineStatus() {
    const o = getOnline();
    if (!o) return { available: false };
    return {
      available: true,
      voice: String(o.VOICE || ""),
      needsInternet: true,
    };
  }

  function loadSettings() {
    const raw = safeParseJSON(localStorage.getItem(STORAGE_KEY) || "");
    const out = { ...DEFAULTS };

    if (raw && typeof raw === "object") {
      if (typeof raw.provider === "string") out.provider = normalizeProvider(raw.provider);
      if (typeof raw.voiceURI === "string") out.voiceURI = raw.voiceURI.trim();
      if (raw.rate != null) out.rate = clamp(raw.rate, RATE_MIN, RATE_MAX);
    }

    out.provider = normalizeProvider(out.provider);
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

    if (typeof next.provider === "string") {
      settings.provider = normalizeProvider(next.provider);
    }

    if (typeof next.voiceURI === "string") {
      settings.voiceURI = next.voiceURI.trim();
    }

    if (next.rate != null) {
      settings.rate = clamp(next.rate, RATE_MIN, RATE_MAX);
    }

    persistSettings();
    dispatch(EVENTS.settingsChanged, { settings: getSettings(), provider: getProviderMeta("en-US") });
    return getSettings();
  }

  let voices = [];
  let voicesChangedFired = false;
  let readyResolved = false;
  let readyResolve = null;
  let readyReject = null;
  let speakJobId = 0;
  let cachedBestVoice = null;

  const readyPromise = new Promise((resolve, reject) => {
    readyResolve = resolve;
    readyReject = reject;
  });

  function resolveReadyIfVoicesLoaded() {
    if (readyResolved || !voicesChangedFired || !voices.length) return;
    readyResolved = true;
    try {
      readyResolve();
    } catch (_) {}
  }

  function refreshVoices() {
    if (!hasBrowserSpeech()) return [];

    try {
      const list = typeof window.speechSynthesis.getVoices === "function"
        ? window.speechSynthesis.getVoices()
        : [];
      voices = Array.isArray(list) ? list.slice() : [];
      cachedBestVoice = null;
    } catch (_) {
      voices = [];
      cachedBestVoice = null;
    }

    resolveReadyIfVoicesLoaded();

    dispatch(EVENTS.voicesChanged, {
      voices: voices.slice(),
      provider: getProviderMeta("en-US"),
    });
    return voices.slice();
  }

  function attachVoicesChangedListener() {
    if (!hasBrowserSpeech()) return;

    const synth = window.speechSynthesis;
    if (!synth) return;

    try {
      if (typeof synth.addEventListener === "function") {
        synth.addEventListener("voiceschanged", () => {
          voicesChangedFired = true;
          refreshVoices();
        });
        return;
      }
    } catch (_) {}

    try {
      synth.onvoiceschanged = function () {
        voicesChangedFired = true;
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
        voicesChangedFired = true;
        refreshVoices();
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

  function resolveVoice(voiceOrURI, preferredLang) {
    // Prevent infinite recursion by not calling refreshVoices if list is empty
    const list = voices.length ? voices : [];
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
    const isMicrosoftNatural = isMicrosoft && (isNatural || isOnline);
    const isUserSelected = !!(settings.voiceURI && uri && norm(settings.voiceURI) === uriNorm);

    let provider = "Browser";
    if (isMicrosoft) provider = "Microsoft";
    else if (isGoogle) provider = "Google";
    else if (v && v.localService) provider = "Device";

    let quality = "Standard";
    if (isMicrosoftNatural) quality = "Microsoft Natural";
    else if (isMicrosoft && isNatural) quality = "Microsoft Enhanced";
    else if (isNatural) quality = "Enhanced";

    let summary = "Using the browser's available voice.";
    if (isMicrosoftNatural) {
      summary = "Using a Microsoft natural browser voice for more lifelike playback.";
    } else if (isMicrosoft) {
      summary = "Using a Microsoft browser voice. Natural Microsoft voices sound best when available.";
    } else if (isGoogle && isNatural) {
      summary = "Using an enhanced Google voice from the browser.";
    } else if (isNatural) {
      summary = "Using an enhanced voice exposed by the browser.";
    } else if (isEnglish) {
      summary = "Using a standard English browser voice.";
    }

    const displayName = v
      ? `${name || "Voice"} (${lang || "unknown"})${isMicrosoftNatural ? " - Microsoft natural" : isMicrosoft ? " - Microsoft" : ""}`
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
      isMicrosoftNatural,
      isUserSelected,
    };
  }

  // Known-good built-in voices (no download needed). Names as reported by
  // Windows (Microsoft), macOS/iOS (Samantha et al.) and Chrome (Google).
  // Kept as substring matchers so "Microsoft Aria Online (Natural)" still hits.
  const PREFERRED_VOICE_NAMES = [
    "aria", "jenny", "guy", "ana", "christopher", "emma", "brian", "natasha",
    "samantha", "karen", "moira", "tessa", "fiona", "daniel", "aaron", "zoe",
    "google us english", "google uk english female", "google uk english male",
  ];

  function rankVoice(v, preferredLang) {
    const pref = norm(preferredLang || "en-US");
    const primaryPref = pref.split("-")[0] || "en";
    const name = norm(v && v.name);
    const uri = norm(v && v.voiceURI);
    const lang = norm(v && v.lang);
    if (!lang.startsWith("en")) return -1;

    let score = 0;
    // Quality signals (strongest first).
    if (name.includes("natural") || name.includes("neural")) score += 60;
    else if (name.includes("enhanced") || name.includes("premium") || name.includes("online")) score += 40;
    else if (name.includes("google") || name.includes("microsoft") || name.includes("samantha")) score += 20;
    // Online (network) voices usually sound better than local eSpeak-class ones.
    if (v && v.localService === false) score += 10;
    if (name.includes("microsoft") || uri.includes("microsoft")) score += 5;
    // Known-good built-ins get a nudge.
    if (PREFERRED_VOICE_NAMES.some((n) => name.includes(n))) score += 15;
    // Locale preference: exact > en-US > other en.
    if (lang === pref) score += 12;
    else if (lang.startsWith("en-us")) score += 8;
    else if (lang.startsWith(primaryPref)) score += 4;
    return score;
  }

  function pickBestVoice(preferredLang) {
    const list = voices.length ? voices : refreshVoices();
    if (!list.length) return null;

    if (settings.voiceURI) {
      const chosen = list.find((v) => String(v.voiceURI || "") === settings.voiceURI);
      if (chosen) return chosen;
    }

    if (cachedBestVoice && list.includes(cachedBestVoice)) return cachedBestVoice;

    let best = null;
    let bestScore = -1;
    for (const v of list) {
      const s = rankVoice(v, preferredLang);
      if (s > bestScore) {
        bestScore = s;
        best = v;
      }
    }
    cachedBestVoice = best;
    return cachedBestVoice;
  }

  function getVoices() {
    return voices.slice();
  }

  function getPreferredVoiceMeta(preferredLang) {
    return getVoiceMeta(null, preferredLang);
  }

  function resolveProvider(requestedProvider) {
    const v = normalizeProvider(requestedProvider || settings.provider || runtimeConfig.preferredProvider);
    if (v === PROVIDERS.online && !getOnline()) return PROVIDERS.browser;
    return v;
  }

  function getProviderMeta(preferredLang) {
    const selectedProvider = normalizeProvider(settings.provider || runtimeConfig.preferredProvider);
    const resolvedProvider = resolveProvider(selectedProvider);

    if (resolvedProvider === PROVIDERS.online) {
      return {
        selectedProvider,
        resolvedProvider,
        browserMeta: getPreferredVoiceMeta(preferredLang || "en-US"),
        online: onlineStatus(),
        quality: "Online neural",
        summary: "Online neural voice (streams audio, needs internet). Falls back to the browser voice offline.",
        usesBrowserVoices: false,
      };
    }

    const browserMeta = getPreferredVoiceMeta(preferredLang || "en-US");

    let summary = "";
    let quality = "";

    if (browserMeta && browserMeta.voice) {
      quality = browserMeta.quality || "Standard";
      summary = browserMeta.summary;
    } else {
      quality = "Browser speech";
      summary = "Using live browser speech synthesis.";
    }

    return {
      selectedProvider,
      resolvedProvider,
      browserMeta,
      quality,
      summary,
      usesBrowserVoices: resolvedProvider === PROVIDERS.browser,
    };
  }

  function stop() {
    speakJobId += 1;
    try {
      const o = getOnline();
      if (o && typeof o.stop === "function") o.stop();
    } catch (_) {}
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch (_) {}
  }

  function isSpeaking() {
    const onlineSpeaking = (() => {
      try {
        const o = getOnline();
        return !!(o && typeof o.isSpeaking === "function" && o.isSpeaking());
      } catch (_) {
        return false;
      }
    })();

    const browserSpeaking = (() => {
      try {
        return !!(window.speechSynthesis && window.speechSynthesis.speaking);
      } catch (_) {
        return false;
      }
    })();

    return browserSpeaking || onlineSpeaking;
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

  function speakWithBrowser(text, options, jobId) {
    if (!hasBrowserSpeech()) return Promise.resolve(false);

    const lang = String(options.lang || "en-US");
    const chunk = options.chunk !== false;
    const chunkSize = Number(options.chunkSize) || 180;
    const chunks = chunk ? splitIntoChunks(text, chunkSize) : [text];

    return ready()
      .catch(() => {})
      .then(() => {
        if (jobId !== speakJobId) return false;

        try {
          const synth = window.speechSynthesis;
          if (!synth) return false;

          synth.cancel();
          try {
            if (typeof synth.resume === "function") synth.resume();
          } catch (_) {}

          const voice = options.voice && typeof options.voice === "object"
            ? options.voice
            : options.voiceURI
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
              // Honour caller/user settings (previously hardcoded).
              utterance.rate = clamp(options.rate, RATE_MIN, RATE_MAX);
              utterance.pitch = clamp(options.pitch, 0.5, 2.0);
              utterance.volume = clamp(options.volume, 0.0, 1.0);

              if (voice) {
                try {
                  utterance.voice = voice;
                } catch (_) {}
              }

              utterance.onend = () => {
                // Natural sentence pause instead of a 10ms blurt.
                setTimeout(speakNext, chunks.length > 1 ? 180 : 10);
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

  function speakInternal(text, opts) {
    const t = cleanText(text);
    if (!t) return Promise.resolve(false);

    const jobId = (speakJobId += 1);
    const options = opts && typeof opts === "object" ? opts : {};
    const resolved = {
      provider: resolveProvider(options.provider),
      lang: String(options.lang || "en-US"),
      rate: clamp(options.rate != null ? options.rate : settings.rate, RATE_MIN, RATE_MAX),
      pitch: clamp(options.pitch != null ? options.pitch : 1.0, 0.5, 2.0),
      volume: clamp(options.volume != null ? options.volume : 1.0, 0.0, 1.0),
      chunk: options.chunk !== false,
      chunkSize: Number(options.chunkSize) || 180,
      voice: options.voice && typeof options.voice === "object" ? options.voice : null,
      voiceURI: typeof options.voiceURI === "string" ? options.voiceURI : settings.voiceURI,
    };

    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch (_) {}
    try {
      const o = getOnline();
      if (o && typeof o.stop === "function") o.stop();
    } catch (_) {}

    // Online neural voice first when selected; any failure falls back to browser.
    if (resolved.provider === PROVIDERS.online) {
      const o = getOnline();
      if (o && typeof o.speakAsync === "function") {
        return o.speakAsync(t, { rate: resolved.rate }).then((ok) => {
          if (ok && jobId === speakJobId) return true;
          if (jobId !== speakJobId) return false;
          return speakWithBrowser(t, resolved, jobId);
        }).catch(() => {
          if (jobId !== speakJobId) return false;
          return speakWithBrowser(t, resolved, jobId);
        });
      }
    }

    return speakWithBrowser(t, resolved, jobId);
  }

  function speak(text, opts) {
    const t = cleanText(text);
    if (!t) return false;
    speakInternal(t, opts);
    return true;
  }

  function speakAsync(text, opts) {
    return speakInternal(text, opts);
  }

  attachVoicesChangedListener();

  if (hasBrowserSpeech()) {
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
    getProviderMeta,
    onlineStatus,
    speak,
    speakAsync,
    stop,
    isSpeaking,
    EVENTS,
  };
})();
