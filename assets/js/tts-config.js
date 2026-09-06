/* assets/js/tts-config.js
   Browser-only runtime config for shared TTS.

   UEAH is a fully static GitHub Pages app. Speech uses the browser
   Web Speech API by default (no stored clips, server, or API key).
   Users can opt into the online neural voice (streams sentence audio,
   needs internet) from the test audio panel; anything else falls back
   to the browser voice.
*/
(function () {
  "use strict";

  const existing = window.UEAH_TTS_CONFIG && typeof window.UEAH_TTS_CONFIG === "object"
    ? window.UEAH_TTS_CONFIG
    : {};

  window.UEAH_TTS_CONFIG = {
    preferredProvider: typeof existing.preferredProvider === "string"
      ? existing.preferredProvider
      : "browser"
  };
})();
