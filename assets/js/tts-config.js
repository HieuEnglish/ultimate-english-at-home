/* assets/js/tts-config.js
   Optional runtime config for shared TTS.

   Leave edge.endpoint blank to keep browser-only speech.
   If you deploy an Edge/Azure-style proxy, point endpoint at it and the
   shared helper can prefer that provider across tests and games.

   Expected POST JSON payload:
   {
     text: string,
     lang: string,
     rate: number,
     pitch: number,
     volume: number,
     voice: string,
     format: string
   }

   The endpoint may respond with:
   - raw audio bytes (audio/mpeg, audio/wav, ...)
   - JSON { audioUrl: "..." }
   - JSON { audioBase64: "...", mimeType?: "audio/mpeg" }
*/
(function () {
  "use strict";

  const existing = window.UEAH_TTS_CONFIG && typeof window.UEAH_TTS_CONFIG === "object"
    ? window.UEAH_TTS_CONFIG
    : {};

  const edge = existing.edge && typeof existing.edge === "object" ? existing.edge : {};

  window.UEAH_TTS_CONFIG = {
    preferredProvider: typeof existing.preferredProvider === "string"
      ? existing.preferredProvider
      : "auto",
    edge: {
      endpoint: typeof edge.endpoint === "string" ? edge.endpoint : "",
      voice: typeof edge.voice === "string" && edge.voice.trim()
        ? edge.voice.trim()
        : "en-US-AriaNeural",
      format: typeof edge.format === "string" && edge.format.trim()
        ? edge.format.trim()
        : "audio-24khz-48kbitrate-mono-mp3",
      headers: edge.headers && typeof edge.headers === "object" ? edge.headers : {}
    }
  };
})();
