/* assets/js/tts.js
   Shared Text-to-Speech helper for UEAH (Web Speech API).

   Goals:
   - Keep everything free + client-only (GitHub Pages compatible)
   - Choose a better default English voice when available
   - Let user persist voice + speed (rate) via localStorage
   - Provide a single API used by all listening/speaking runners

   Exposes: window.UEAH_TTS
     - isSupported()
     - ready() -> Promise<void>   (voices loaded best-effort)
     - getVoices() -> SpeechSynthesisVoice[]
     - getSettings() -> { voiceURI, rate }
     - setSettings({ voiceURI?, rate? }) -> { voiceURI, rate }
     - pickBestVoice(preferredLang?) -> SpeechSynthesisVoice|null
     - speak(text, opts?) -> boolean
     - speakAsync(text, opts?) -> Promise<boolean>
     - stop()
     - isSpeaking() -> boolean
*/

(function () {
  "use strict";

  if (window.UEAH_TTS) return;

  const STORAGE_KEY = "ueah:tts:settings:v1";

  const DEFAULTS = {
    voiceURI: "",
    rate: 1.0, // Most voices sound natural around ~0.95–1.05
  };

  const RATE_MIN = 0.7;
  const RATE_MAX = 1.2;

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
      // Older browsers fallback (unlikely needed in target browsers)
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

  // -----------------------------
  // Settings (localStorage)
  // -----------------------------

  let settings = loadSettings();

  function loadSettings() {
    const raw = safeParseJSON(localStorage.getItem(STORAGE_KEY) || "");
    const out = { ...DEFAULTS };

    if (raw && typeof raw === "object") {
      if (typeof raw.voiceURI === "string") out.voiceURI = raw.voiceURI.trim();
      if (raw.rate != null) out.rate = clamp(raw.rate, RATE_MIN, RATE_MAX);
    }

    // Ensure defaults always valid
    out.voiceURI = String(out.voiceURI || "").trim();
    out.rate = clamp(out.rate, RATE_MIN, RATE_MAX);

    return out;
  }

  function persistSettings() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (_) {
      // ignore storage errors (private mode, quota, etc.)
    }
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

  // -----------------------------
  // Voices (async load quirks)
  // -----------------------------

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
      const list = window.speechSynthesis.getVoices ? window.speechSynthesis.getVoices() : [];
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
    } catch (_) {
      // ignore
    }
  }

  function primeVoices() {
    // Many browsers require calling getVoices() once to populate.
    refreshVoices();

    // If still empty, try again shortly (common in Chrome/Edge).
    if (!voices.length) {
      setTimeout(() => {
        refreshVoices();
      }, 150);
      setTimeout(() => {
        refreshVoices();
      }, 600);
    }

    // If still empty, resolve ready() anyway after a timeout; app can still speak
    // (browser may pick a default voice lazily).
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

  // -----------------------------
  // Voice picking
  // -----------------------------

  function norm(s) {
    return String(s || "").trim().toLowerCase();
  }

  function scoreVoice(v, preferredLang) {
    const lang = norm(v && v.lang);
    const name = norm(v && v.name);
    const uri = norm(v && v.voiceURI);

    let score = 0;

    // Language preference
    const pref = norm(preferredLang || "en-us");
    if (lang === pref) score += 120;
    else if (lang && pref && lang.startsWith(pref.split("-")[0])) score += 90; // "en"
    else if (lang.startsWith("en")) score += 70;
    else score -= 50;

    // Default voice gets a bump
    if (v && v.default) score += 10;

    // Prefer localService voices (often higher quality / more stable)
    if (v && v.localService) score += 6;

    // Name hints (best-effort; varies by OS/browser)
    const goodTokens = ["natural", "neural", "premium", "enhanced", "google", "microsoft"];
    for (const t of goodTokens) {
      if (name.includes(t)) score += 6;
    }

    // Penalize obvious low-quality/legacy tokens (best-effort)
    const badTokens = ["espeak", "mbrola", "festival", "robot"];
    for (const t of badTokens) {
      if (name.includes(t)) score -= 8;
    }

    // If user previously chose it (voiceURI stored), treat as top priority
    if (settings.voiceURI && uri && uri === norm(settings.voiceURI)) score += 1000;

    return score;
  }

  function pickBestVoice(preferredLang) {
    const list = voices.length ? voices : refreshVoices();
    if (!list.length) return null;

    // If the stored voiceURI is available, use it.
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

  // -----------------------------
  // Speaking (with optional chunking)
  // -----------------------------

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

    // Split into sentences without lookbehind for compatibility.
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

    // Now pack sentences into <= limit chunks.
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

    // If any chunk is still too long (no punctuation), split by commas/spaces.
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

      // Fallback: hard wrap by words
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

    const chunk = options.chunk !== false; // default true for better reliability
    const chunkSize = Number(options.chunkSize) || 180;
    const chunks = chunk ? splitIntoChunks(t, chunkSize) : [t];

    // Ensure voices are primed best-effort before picking one.
    return ready()
      .catch(() => {})
      .then(() => {
        if (jobId !== speakJobId) return false;

        try {
          const synth = window.speechSynthesis;
          synth.cancel();

          // Some browsers need resume() if paused.
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
              const u = new SpeechSynthesisUtterance(part);

              u.lang = lang;
              u.rate = rate;
              u.pitch = pitch;
              u.volume = volume;

              if (voice) {
                try {
                  u.voice = voice;
                } catch (_) {}
              }

              u.onend = () => {
                // Small gap can help some voices sound more natural
                setTimeout(speakNext, 10);
              };

              u.onerror = () => {
                // If a chunk errors, stop the chain.
                resolve(false);
              };

              try {
                synth.speak(u);
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
    // Fire-and-forget; returns boolean "queued" (best-effort).
    const t = cleanText(text);
    if (!t || !isSupported()) return false;

    // Start async chain; caller can ignore.
    speakInternal(t, opts);
    return true;
  }

  function speakAsync(text, opts) {
    return speakInternal(text, opts);
  }

  // -----------------------------
  // Init
  // -----------------------------

  attachVoicesChangedListener();
  // Prime as soon as script loads (defer script runs after parse)
  if (isSupported()) {
    try {
      primeVoices();
    } catch (_) {
      try {
        readyReject(new Error("TTS init failed"));
      } catch (__) {}
    }
  } else {
    // Resolve ready() quickly for unsupported browsers.
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
    speak,
    speakAsync,
    stop,
    isSpeaking,
    EVENTS,
  };
})();
