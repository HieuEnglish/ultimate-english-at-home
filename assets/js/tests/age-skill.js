/* assets/js/tests/age-skill.js
   Registers Age + Skill practice tests (metadata only) into the global tests store.

   - No build step (plain <script defer>).
   - Stable slugs: age-<age>-<skill>
   - Append-only: safe to extend later without touching UI code.
*/

(function () {
  "use strict";

  const store = window.UEAH_TESTS_STORE;
  if (!store || typeof store.add !== "function") {
    console.warn("[UEAH] tests store not found; age-skill tests not registered.");
    return;
  }

  const AGES = ["0-3", "4-7", "8-10", "11-12", "13-18"];
  const SKILLS = [
    { key: "reading", label: "Reading" },
    { key: "listening", label: "Listening" },
    { key: "writing", label: "Writing" },
    { key: "speaking", label: "Speaking" }
  ];

  function displayAge(age) {
    return String(age || "").replace("-", "–");
  }

  const tests = [];

  AGES.forEach((age) => {
    const ageLabel = displayAge(age);

    SKILLS.forEach((s) => {
      // Only set a module path when a runner exists.
      // This avoids network 404s for tests that are still "Coming soon".
      let module = "";

      // Ages 0–3
      if (age === "0-3" && s.key === "reading") module = "assets/js/tests/age/0-3-reading.js";
      if (age === "0-3" && s.key === "listening") module = "assets/js/tests/age/0-3-listening.js";
      if (age === "0-3" && s.key === "writing") module = "assets/js/tests/age/0-3-writing.js";
      if (age === "0-3" && s.key === "speaking") module = "assets/js/tests/age/0-3-speaking.js";

      // Ages 4–7
      if (age === "4-7" && s.key === "reading") module = "assets/js/tests/age/4-7-reading.js";
      if (age === "4-7" && s.key === "listening") module = "assets/js/tests/age/4-7-listening.js";
      if (age === "4-7" && s.key === "writing") module = "assets/js/tests/age/4-7-writing.js";
      if (age === "4-7" && s.key === "speaking") module = "assets/js/tests/age/4-7-speaking.js";

      // Ages 8–10
      if (age === "8-10" && s.key === "reading") module = "assets/js/tests/age/8-10-reading.js";
      if (age === "8-10" && s.key === "listening") module = "assets/js/tests/age/8-10-listening.js";
      if (age === "8-10" && s.key === "writing") module = "assets/js/tests/age/8-10-writing.js";
      if (age === "8-10" && s.key === "speaking") module = "assets/js/tests/age/8-10-speaking.js";

      // Ages 11–12
      if (age === "11-12" && s.key === "reading") module = "assets/js/tests/age/11-12-reading.js";
      if (age === "11-12" && s.key === "listening") module = "assets/js/tests/age/11-12-listening.js";
      if (age === "11-12" && s.key === "writing") module = "assets/js/tests/age/11-12-writing.js";
      if (age === "11-12" && s.key === "speaking") module = "assets/js/tests/age/11-12-speaking.js";

      // Ages 13–18
      if (age === "13-18" && s.key === "reading") module = "assets/js/tests/age/13-18-reading.js";
      if (age === "13-18" && s.key === "listening") module = "assets/js/tests/age/13-18-listening.js";
      // if (age === "13-18" && s.key === "writing") module = "assets/js/tests/age/13-18-writing.js";
      // if (age === "13-18" && s.key === "speaking") module = "assets/js/tests/age/13-18-speaking.js";

      tests.push({
        slug: `age-${age}-${s.key}`,
        age,
        skill: s.key,
        title: `${s.label} (${ageLabel})`,
        subtitle: `Ages ${ageLabel} • Practice test`,
        ...(module ? { module } : {})
      });
    });
  });

  store.add({ tests });
})();
