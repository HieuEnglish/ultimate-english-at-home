/* global window */
/**
 * Category pack: IELTS
 * This file is lazy-loaded by assets/js/resources-store.js when visiting
 * /resources/ielts (and child routes).
 */
(() => {
  "use strict";

  const DATA = {
    age: "ielts",
    packs: {
      "ielts/reading": {
        title: "IELTS Reading 📖",
        overview:
          "IELTS Reading resources and practice sets. (Add your links to this pack file.)",
      },
      "ielts/listening": {
        title: "IELTS Listening 🎧",
        overview:
          "IELTS Listening resources and practice sets. (Add your links to this pack file.)",
      },
      "ielts/writing": {
        title: "IELTS Writing ✍️",
        overview:
          "IELTS Writing resources and practice sets. (Add your links to this pack file.)",
      },
      "ielts/speaking": {
        title: "IELTS Speaking 🗣️",
        overview:
          "IELTS Speaking resources and practice sets. (Add your links to this pack file.)",
      },
    },

    // Add IELTS resources here.
    // Each item schema matches existing age packs:
    // { age, skill, slug, title, description, link, format?, level?, time?, focus?, details? }
    resources: [],
  };

  if (window.UEAH_RESOURCES_STORE && typeof window.UEAH_RESOURCES_STORE.add === "function") {
    window.UEAH_RESOURCES_STORE.add(DATA);
  }
})();
