/* assets/js/tests/iels.js
   Registers the IELS Tests metadata (button list) into the global tests store.

   Notes:
   - Keep slugs stable once published.
   - Each test points to a separate module file that can be lazy-loaded on /tests/:slug.
*/

(function () {
  "use strict";

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.add !== "function") return;

  store.add({
    tests: [
      {
        slug: "iels-reading",
        title: "IELS Reading",
        subtitle: "Test your ability",
        skill: "reading",
        module: "assets/js/tests/iels/reading.js"
      },
      {
        slug: "iels-speaking",
        title: "IELS Speaking",
        subtitle: "Test your ability",
        skill: "speaking",
        module: "assets/js/tests/iels/speaking.js"
      },
      {
        slug: "iels-writing",
        title: "IELS Writing",
        subtitle: "Test your ability",
        skill: "writing",
        module: "assets/js/tests/iels/writing.js"
      },
      {
        slug: "iels-listening",
        title: "IELS Listening",
        subtitle: "Test your ability",
        skill: "listening",
        module: "assets/js/tests/iels/listening.js"
      }
    ]
  });
})();
