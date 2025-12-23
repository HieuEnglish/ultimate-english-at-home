/* assets/data/tests-iels-speaking.js
   Question bank: IELTS Speaking (original practice)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "iels-speaking"

   Structure:
   - Multiple topic sets. Runner randomly chooses one setId each run.
   - Each item:
     {
       id, setId, setLabel, order,
       type: "prompt",
       partId: "p1"|"p2"|"p3",
       kind: "interview"|"cue"|"followup"|"discussion",
       title?, question, bullets?,
       minWords? (practice-only),
       cues?: { label, anyOf: [...] }
     }
*/

(function () {
  "use strict";

  const SLUG = "iels-speaking";

  const bank = [];

  function add(item) {
    bank.push(item);
  }

  // =========================================================
  // SET A — Travel / Journey
  // =========================================================

  const setA = { id: "set-a", label: "A memorable journey" };

  // Part 1 (Interview) — 10 items
  [
    "Do you work or are you a student?",
    "What do you like most about your daily routine?",
    "Do you prefer mornings or evenings? Why?",
    "How often do you use public transport?",
    "What kind of places do you enjoy visiting on weekends?",
    "Do you like travelling to new places or returning to familiar places?",
    "What is one place in your country you would recommend to visitors?",
    "Do you usually plan trips carefully, or do you prefer to be spontaneous?",
    "What kind of weather do you prefer when you travel?",
    "Has travelling become easier in recent years? Why / why not?"
  ].forEach((q, i) => {
    add({
      id: `a-p1-${i + 1}`,
      type: "prompt",
      setId: setA.id,
      setLabel: setA.label,
      order: 10 + i,
      partId: "p1",
      kind: "interview",
      question: q,
      minWords: 25,
      cues: { label: "Use a reason phrase (because / so / that’s why)", anyOf: ["because", "so", "that's why"] }
    });
  });

  // Part 2 (Cue card)
  add({
    id: "a-p2-1",
    type: "prompt",
    setId: setA.id,
    setLabel: setA.label,
    order: 200,
    partId: "p2",
    kind: "cue",
    title: "Describe a journey you remember well.",
    question:
      "You should say:\n" +
      "• where you went\n" +
      "• who you went with\n" +
      "• what happened during the journey\n" +
      "and explain why you remember this journey so clearly.",
    bullets: [
      "Aim for 2 minutes of speaking.",
      "Include specific details (time, place, feelings).",
      "Use sequencing: first, then, after that, finally."
    ],
    minWords: 140,
    cues: { label: "Use an example phrase (for example / such as)", anyOf: ["for example", "for instance", "such as"] }
  });

  // Part 2 follow-up
  add({
    id: "a-p2-2",
    type: "prompt",
    setId: setA.id,
    setLabel: setA.label,
    order: 210,
    partId: "p2",
    kind: "followup",
    question: "Do you prefer travelling alone or with other people? Why?",
    minWords: 40,
    cues: { label: "Compare options (however / whereas / on the other hand)", anyOf: ["however", "whereas", "on the other hand"] }
  });

  // Part 3 (Discussion) — 6 items
  [
    "How has tourism changed in your country in the last 20 years?",
    "What are the advantages and disadvantages of low-cost travel?",
    "Should popular tourist areas limit the number of visitors? Why / why not?",
    "How can tourism affect local culture in positive and negative ways?",
    "What role does technology play in modern travel planning?",
    "Do you think international travel will increase or decrease in the future? Why?"
  ].forEach((q, i) => {
    add({
      id: `a-p3-${i + 1}`,
      type: "prompt",
      setId: setA.id,
      setLabel: setA.label,
      order: 300 + i,
      partId: "p3",
      kind: "discussion",
      question: q,
      minWords: 70,
      cues: { label: "Use a linking phrase (for example / as a result / in contrast)", anyOf: ["for example", "as a result", "in contrast"] }
    });
  });

  // =========================================================
  // SET B — Technology / Apps
  // =========================================================

  const setB = { id: "set-b", label: "A useful app or piece of technology" };

  [
    "Do you use your phone more for work/study or for entertainment?",
    "What apps do you use every day?",
    "Do you prefer texting or calling? Why?",
    "How often do you buy things online?",
    "Do you think people spend too much time on social media?",
    "What is one technology you couldn’t live without?",
    "Have you ever had problems with online privacy?",
    "Do you learn new skills online? What kind?",
    "How do you think technology changes the way people communicate?",
    "Should schools teach more technology skills? Why / why not?"
  ].forEach((q, i) => {
    add({
      id: `b-p1-${i + 1}`,
      type: "prompt",
      setId: setB.id,
      setLabel: setB.label,
      order: 10 + i,
      partId: "p1",
      kind: "interview",
      question: q,
      minWords: 25,
      cues: { label: "Use a reason phrase (because / so / therefore)", anyOf: ["because", "so", "therefore"] }
    });
  });

  add({
    id: "b-p2-1",
    type: "prompt",
    setId: setB.id,
    setLabel: setB.label,
    order: 200,
    partId: "p2",
    kind: "cue",
    title: "Describe an app or piece of technology you find useful.",
    question:
      "You should say:\n" +
      "• what it is\n" +
      "• how you use it\n" +
      "• what problem it helps you solve\n" +
      "and explain why it is useful for you.",
    bullets: [
      "Aim for 2 minutes of speaking.",
      "Give a real example of when you used it.",
      "Add one limitation (a small disadvantage)."
    ],
    minWords: 140,
    cues: { label: "Use an example phrase (for example / such as)", anyOf: ["for example", "for instance", "such as"] }
  });

  add({
    id: "b-p2-2",
    type: "prompt",
    setId: setB.id,
    setLabel: setB.label,
    order: 210,
    partId: "p2",
    kind: "followup",
    question: "Do you think technology makes people more productive? Why / why not?",
    minWords: 40,
    cues: { label: "Balance ideas (however / although / on the other hand)", anyOf: ["however", "although", "on the other hand"] }
  });

  [
    "In what ways has technology changed education?",
    "Do you think children should have strict screen-time limits? Why?",
    "How can governments or companies protect people’s data more effectively?",
    "Will artificial intelligence create more jobs or replace jobs overall?",
    "Why do some people resist new technologies?",
    "How do you think communication will change in the next 30 years?"
  ].forEach((q, i) => {
    add({
      id: `b-p3-${i + 1}`,
      type: "prompt",
      setId: setB.id,
      setLabel: setB.label,
      order: 300 + i,
      partId: "p3",
      kind: "discussion",
      question: q,
      minWords: 70,
      cues: { label: "Use a cause/effect phrase (as a result / leads to / results in)", anyOf: ["as a result", "leads to", "results in"] }
    });
  });

  // =========================================================
  // SET C — Community / Festivals
  // =========================================================

  const setC = { id: "set-c", label: "A local festival or community event" };

  [
    "Do you enjoy going to events with large crowds?",
    "What do people usually do for fun in your area?",
    "How often do you meet friends in person?",
    "What kinds of food are popular at celebrations in your country?",
    "Do you prefer indoor or outdoor activities? Why?",
    "What is a traditional celebration that is important in your country?",
    "Have celebrations changed compared to the past?",
    "Do you think traditions are still important for young people?",
    "What makes a city a good place to live?",
    "Do you think neighbours should know each other well? Why / why not?"
  ].forEach((q, i) => {
    add({
      id: `c-p1-${i + 1}`,
      type: "prompt",
      setId: setC.id,
      setLabel: setC.label,
      order: 10 + i,
      partId: "p1",
      kind: "interview",
      question: q,
      minWords: 25,
      cues: { label: "Add detail (for example / especially / in particular)", anyOf: ["for example", "especially", "in particular"] }
    });
  });

  add({
    id: "c-p2-1",
    type: "prompt",
    setId: setC.id,
    setLabel: setC.label,
    order: 200,
    partId: "p2",
    kind: "cue",
    title: "Describe a local festival or community event you have attended.",
    question:
      "You should say:\n" +
      "• what the event was\n" +
      "• where and when it took place\n" +
      "• what people did there\n" +
      "and explain why the event was memorable for you.",
    bullets: [
      "Aim for 2 minutes of speaking.",
      "Mention atmosphere (music, food, crowds, mood).",
      "Finish with a clear reason why it was memorable."
    ],
    minWords: 140,
    cues: { label: "Use feeling words (excited / relaxed / impressed)", anyOf: ["excited", "relaxed", "impressed", "proud", "surprised"] }
  });

  add({
    id: "c-p2-2",
    type: "prompt",
    setId: setC.id,
    setLabel: setC.label,
    order: 210,
    partId: "p2",
    kind: "followup",
    question: "Do you prefer traditional events or modern events? Why?",
    minWords: 40,
    cues: { label: "Compare (whereas / while / on the other hand)", anyOf: ["whereas", "while", "on the other hand"] }
  });

  [
    "Why do communities organise festivals and public events?",
    "How can large events benefit local businesses?",
    "What problems can festivals cause for residents?",
    "Should governments spend public money on cultural events? Why / why not?",
    "Do you think traditions will disappear in the future? Why?",
    "How can cities create stronger communities among residents?"
  ].forEach((q, i) => {
    add({
      id: `c-p3-${i + 1}`,
      type: "prompt",
      setId: setC.id,
      setLabel: setC.label,
      order: 300 + i,
      partId: "p3",
      kind: "discussion",
      question: q,
      minWords: 70,
      cues: { label: "Develop ideas (for example / in addition / however)", anyOf: ["for example", "in addition", "however"] }
    });
  });

  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = bank;
})();
