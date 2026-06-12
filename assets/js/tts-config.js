/* assets/js/tts-config.js
   Browser-only runtime config for shared TTS.

   UEAH is a fully static GitHub Pages app. Speech is generated live with the
   browser Web Speech API; no stored clips, server, or API key is used.
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
