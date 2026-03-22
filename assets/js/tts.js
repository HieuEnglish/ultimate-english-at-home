/* assets/js/tts.js
   Shared Text-to-Speech helper for UEAH.

   Supports:
   - Pre-generated local audio clips (preferred when available)
   - Browser speech synthesis (Web Speech API)
   - Optional external Microsoft/Edge-style neural endpoint configured in
     assets/js/tts-config.js

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
  const SCRIPT_URL = (() => {
    try {
      if (document.currentScript && document.currentScript.src) {
        return new URL(document.currentScript.src, window.location.href);
      }
    } catch (_) {}
    return new URL("assets/js/tts.js", window.location.href);
  })();
  const STATIC_MANIFEST_URL = new URL("../audio/tts/manifest.json", SCRIPT_URL).toString();
  const PROVIDERS = {
    auto: "auto",
    browser: "browser",
    edge: "edge",
  };

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

  function cleanHeaders(input) {
    if (!input || typeof input !== "object") return {};
    const out = {};
    for (const [k, v] of Object.entries(input)) {
      const key = String(k || "").trim();
      if (!key) continue;
      out[key] = String(v == null ? "" : v);
    }
    return out;
  }

  function loadRuntimeConfig() {
    const raw = window.UEAH_TTS_CONFIG && typeof window.UEAH_TTS_CONFIG === "object"
      ? window.UEAH_TTS_CONFIG
      : {};
    const edge = raw.edge && typeof raw.edge === "object" ? raw.edge : {};
    const preferredProvider = norm(raw.preferredProvider);
    const endpoint = String(edge.endpoint || "").trim();

    return {
      preferredProvider:
        preferredProvider === PROVIDERS.edge || preferredProvider === PROVIDERS.browser
          ? preferredProvider
          : PROVIDERS.auto,
      edge: {
        endpoint,
        voice: String(edge.voice || "en-US-AriaNeural").trim() || "en-US-AriaNeural",
        format: String(edge.format || "audio-24khz-48kbitrate-mono-mp3").trim() || "audio-24khz-48kbitrate-mono-mp3",
        headers: cleanHeaders(edge.headers),
      },
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

  function hasStaticAudioCatalog() {
    return true;
  }

  function isSupported() {
    return hasStaticAudioCatalog() || hasBrowserSpeech() || hasEdgeEndpoint();
  }

  function hasEdgeEndpoint() {
    return !!runtimeConfig.edge.endpoint;
  }

  function normalizeProvider(value) {
    const v = norm(value);
    if (v === PROVIDERS.browser || v === PROVIDERS.edge) return v;
    return PROVIDERS.auto;
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
  let readyResolved = false;
  let readyResolve = null;
  let readyReject = null;
  let speakJobId = 0;
  let activeAudio = null;
  let activeAudioUrl = "";
  let activeAudioJobId = 0;
  let activeFetchController = null;
  let staticManifestState = "idle";
  let staticManifestPromise = null;
  let staticManifestEntries = null;
  let staticManifestBaseUrl = STATIC_MANIFEST_URL;

  const readyPromise = new Promise((resolve, reject) => {
    readyResolve = resolve;
    readyReject = reject;
  });

  function stopExternalAudio() {
    activeAudioJobId += 1;

    if (activeFetchController) {
      try {
        activeFetchController.abort();
      } catch (_) {}
      activeFetchController = null;
    }

    if (activeAudio) {
      try {
        activeAudio.pause();
      } catch (_) {}
      try {
        activeAudio.src = "";
      } catch (_) {}
      activeAudio = null;
    }

    if (activeAudioUrl) {
      try {
        URL.revokeObjectURL(activeAudioUrl);
      } catch (_) {}
      activeAudioUrl = "";
    }
  }

  function normalizePromptKey(text) {
    return String(text == null ? "" : text)
      .replace(/[\s\u00A0]+/g, " ")
      .trim()
      .toLowerCase();
  }

  function normalizeManifestData(data) {
    const items = data && typeof data === "object" && data.items && typeof data.items === "object"
      ? data.items
      : data && typeof data === "object"
        ? data
        : {};

    const out = Object.create(null);
    for (const [key, value] of Object.entries(items)) {
      const normalizedKey = normalizePromptKey(key);
      if (!normalizedKey) continue;

      if (typeof value === "string" && value.trim()) {
        out[normalizedKey] = { src: value.trim() };
        continue;
      }

      if (value && typeof value === "object" && typeof value.src === "string" && value.src.trim()) {
        out[normalizedKey] = {
          src: value.src.trim(),
          text: typeof value.text === "string" ? value.text : "",
          duration: Number(value.duration) || 0,
        };
      }
    }

    return out;
  }

  function loadStaticManifest() {
    if (staticManifestState === "loaded") {
      return Promise.resolve(staticManifestEntries || Object.create(null));
    }

    if (staticManifestPromise) return staticManifestPromise;

    staticManifestState = "loading";
    staticManifestPromise = fetch(STATIC_MANIFEST_URL, { cache: "no-cache" })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Manifest request failed: ${response.status}`);
        }
        staticManifestBaseUrl = response.url || STATIC_MANIFEST_URL;
        return response.json();
      })
      .then((data) => {
        staticManifestEntries = normalizeManifestData(data);
        staticManifestState = "loaded";
        return staticManifestEntries;
      })
      .catch(() => {
        staticManifestEntries = Object.create(null);
        staticManifestState = "failed";
        return staticManifestEntries;
      });

    return staticManifestPromise;
  }

  function getStaticAudioEntry(text) {
    const key = normalizePromptKey(text);
    if (!key || !staticManifestEntries) return null;
    return staticManifestEntries[key] || null;
  }

  function refreshVoices() {
    if (!hasBrowserSpeech()) return [];

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
        synth.addEventListener("voiceschanged", refreshVoices);
        return;
      }
    } catch (_) {}

    try {
      synth.onvoiceschanged = function () {
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

    for (const t of ["espeak", "mbrola", "festival", "robot"]) {
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

  function resolveProvider(requestedProvider) {
    const desired = normalizeProvider(requestedProvider || settings.provider || runtimeConfig.preferredProvider);

    if (desired === PROVIDERS.browser) {
      return PROVIDERS.browser;
    }

    if (desired === PROVIDERS.edge) {
      return hasEdgeEndpoint() ? PROVIDERS.edge : PROVIDERS.browser;
    }

    return hasEdgeEndpoint() ? PROVIDERS.edge : PROVIDERS.browser;
  }

  function getProviderMeta(preferredLang) {
    const selectedProvider = normalizeProvider(settings.provider || runtimeConfig.preferredProvider);
    const resolvedProvider = resolveProvider(selectedProvider);
    const browserMeta = getPreferredVoiceMeta(preferredLang || "en-US");
    const edgeVoice = runtimeConfig.edge.voice;
    const edgeConfigured = hasEdgeEndpoint();
    const staticCatalogAvailable = hasStaticAudioCatalog();

    let summary = "";
    let quality = "";

    if (resolvedProvider === PROVIDERS.edge && edgeConfigured) {
      quality = "Edge Neural";
      summary = `Using the configured Edge-style neural endpoint with ${edgeVoice}.`;
    } else if (browserMeta && browserMeta.voice) {
      quality = browserMeta.quality || "Standard";
      summary = browserMeta.summary;
      if (selectedProvider === PROVIDERS.edge && !edgeConfigured) {
        summary = "Edge neural playback is not configured yet, so the app is falling back to browser voices.";
      }
    } else if (selectedProvider === PROVIDERS.edge && !edgeConfigured) {
      quality = "Browser fallback";
      summary = "Edge neural playback is not configured yet, and no browser voices were detected.";
    } else {
      quality = "Browser fallback";
      summary = "Using browser speech synthesis because no external Edge-style endpoint is configured.";
    }

    return {
      selectedProvider,
      resolvedProvider,
      edgeConfigured,
      edgeEndpoint: runtimeConfig.edge.endpoint,
      edgeVoice,
      staticCatalogAvailable,
      browserMeta,
      quality,
      summary,
      usesExternalAudio: resolvedProvider === PROVIDERS.edge && edgeConfigured,
      usesBrowserVoices: resolvedProvider === PROVIDERS.browser,
    };
  }

  function stop() {
    speakJobId += 1;
    stopExternalAudio();
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch (_) {}
  }

  function isSpeaking() {
    const browserSpeaking = (() => {
      try {
        return !!(window.speechSynthesis && window.speechSynthesis.speaking);
      } catch (_) {
        return false;
      }
    })();

    const externalSpeaking = !!(activeAudio && !activeAudio.paused && !activeAudio.ended);
    return browserSpeaking || externalSpeaking;
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

  async function getEdgeAudioSource(response) {
    const contentType = String(response.headers.get("content-type") || "").toLowerCase();

    if (contentType.startsWith("audio/")) {
      const blob = await response.blob();
      return {
        kind: "blob",
        blob,
        mimeType: blob.type || contentType || "audio/mpeg",
      };
    }

    const data = await response.json();
    if (data && typeof data.audioUrl === "string" && data.audioUrl.trim()) {
      return {
        kind: "url",
        audioUrl: data.audioUrl.trim(),
        mimeType: String(data.mimeType || "").trim() || "audio/mpeg",
      };
    }

    const audioBase64 = data && typeof data.audioBase64 === "string" ? data.audioBase64.trim() : "";
    if (!audioBase64) {
      throw new Error("No audio payload returned from Edge TTS endpoint.");
    }

    const mimeType = String((data && data.mimeType) || "audio/mpeg").trim() || "audio/mpeg";
    const binary = atob(audioBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    return {
      kind: "blob",
      blob: new Blob([bytes], { type: mimeType }),
      mimeType,
    };
  }

  function playExternalAudio(source, jobId) {
    stopExternalAudio();
    activeAudioJobId = jobId;

    return new Promise((resolve) => {
      if (jobId !== speakJobId) {
        resolve(false);
        return;
      }

      const audio = new Audio();
      activeAudio = audio;

      let objectUrl = "";
      if (source.kind === "blob") {
        objectUrl = URL.createObjectURL(source.blob);
        activeAudioUrl = objectUrl;
        audio.src = objectUrl;
      } else {
        audio.src = source.audioUrl;
      }

      const cleanup = (ok) => {
        if (activeAudio === audio) {
          activeAudio = null;
        }
        if (activeAudioJobId === jobId) {
          activeAudioJobId += 1;
        }
        if (objectUrl) {
          try {
            URL.revokeObjectURL(objectUrl);
          } catch (_) {}
          if (activeAudioUrl === objectUrl) activeAudioUrl = "";
        }
        resolve(ok);
      };

      audio.onended = () => cleanup(true);
      audio.onerror = () => cleanup(false);

      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.catch(() => cleanup(false));
      }
    });
  }

  function speakWithStaticAudio(text, jobId) {
    return loadStaticManifest()
      .then(() => {
        const entry = getStaticAudioEntry(text);
        if (!entry || !entry.src) return false;
        const audioUrl = new URL(entry.src, staticManifestBaseUrl).toString();
        return playExternalAudio({ kind: "url", audioUrl }, jobId);
      })
      .catch(() => false);
  }

  async function speakWithEdge(text, options, jobId) {
    if (!hasEdgeEndpoint()) return false;

    const controller = new AbortController();
    activeFetchController = controller;

    try {
      const response = await fetch(runtimeConfig.edge.endpoint, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...runtimeConfig.edge.headers,
        },
        body: JSON.stringify({
          text,
          lang: options.lang,
          rate: options.rate,
          pitch: options.pitch,
          volume: options.volume,
          voice: String(options.voiceName || runtimeConfig.edge.voice || "").trim() || "en-US-AriaNeural",
          format: runtimeConfig.edge.format,
        }),
        signal: controller.signal,
      });

      if (jobId !== speakJobId) return false;
      if (!response.ok) return false;

      const source = await getEdgeAudioSource(response);
      if (jobId !== speakJobId) return false;

      return playExternalAudio(source, jobId);
    } catch (_) {
      return false;
    } finally {
      if (activeFetchController === controller) {
        activeFetchController = null;
      }
    }
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
              utterance.rate = options.rate;
              utterance.pitch = options.pitch;
              utterance.volume = options.volume;

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
      voiceURI: typeof options.voiceURI === "string" ? options.voiceURI : settings.voiceURI,
      voiceName: typeof options.voiceName === "string" ? options.voiceName : runtimeConfig.edge.voice,
    };

    stopExternalAudio();
    try {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    } catch (_) {}

    return speakWithStaticAudio(t, jobId).then((ok) => {
      if (ok) return true;

      if (resolved.provider === PROVIDERS.edge) {
        return speakWithEdge(t, resolved, jobId).then((edgeOk) => {
          if (edgeOk) return true;
          return speakWithBrowser(t, { ...resolved, provider: PROVIDERS.browser }, jobId);
        });
      }

      return speakWithBrowser(t, resolved, jobId);
    });
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
    speak,
    speakAsync,
    stop,
    isSpeaking,
    EVENTS,
  };
})();
