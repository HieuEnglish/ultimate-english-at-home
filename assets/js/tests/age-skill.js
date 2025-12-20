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
    // 0-3 -> 0–3 (en dash for nicer UI)
    return String(age || "").replace("-", "–");
  }

  const tests = [];

  AGES.forEach((age) => {
    const ageLabel = displayAge(age);

    SKILLS.forEach((s) => {
      tests.push({
        slug: `age-${age}-${s.key}`,
        age,
        skill: s.key,
        title: `${s.label} (${ageLabel})`,
        subtitle: `Ages ${ageLabel} • Practice test`
        // module: intentionally omitted (not implemented yet)
      });
    });
  });

  store.add({ tests });
})();
