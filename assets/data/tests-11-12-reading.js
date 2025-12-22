/* assets/data/tests-11-12-reading.js
   Question bank: Ages 11–12 • Reading

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-11-12-reading"

   Content notes:
   - Longer passages (approx. 120–180 words) with comprehension questions.
   - Main idea, detail, inference, and vocabulary-in-context.
   - Simplified exam-style tasks (best heading, T/F/NG as multiple choice,
     sentence completion).

   Implementation notes:
   - Runner shuffles questions and option order on each attempt.
   - fillInTheBlank answers are strings or arrays of strings.
*/

(function () {
  "use strict";

  const SLUG = "age-11-12-reading";

  const QUESTIONS = [
    // -----------------------------
    // Passage A
    // -----------------------------
    {
      id: "q1",
      type: "multipleChoice",
      passage:
        "Every Friday, Ms. Nguyen’s class runs a student-led Lost & Found table near the school gate. Two volunteers wear bright badges, sort items into baskets, and write each item into a simple logbook. If someone claims an item, the volunteer asks one clear question (for example, ‘What colour is the zipper?’) before handing it over. The system is quick, but it only works well when students return items as soon as they are found. Last month, the class added short announcements to remind everyone to check their bags and label water bottles.",
      question: "Which heading fits the passage best?",
      options: [
        "A class improves its Lost & Found system",
        "How to sew a school badge",
        "A problem with school uniforms",
        "Planning a weekend trip"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage describes how the class runs Lost & Found and how they improved it."
    },
    {
      id: "q2",
      type: "multipleChoice",
      passage:
        "Every Friday, Ms. Nguyen’s class runs a student-led Lost & Found table near the school gate. Two volunteers wear bright badges, sort items into baskets, and write each item into a simple logbook. If someone claims an item, the volunteer asks one clear question (for example, ‘What colour is the zipper?’) before handing it over. The system is quick, but it only works well when students return items as soon as they are found. Last month, the class added short announcements to remind everyone to check their bags and label water bottles.",
      question: "Why do volunteers ask a question before giving an item back?",
      options: [
        "To check that the person is the real owner",
        "To teach students to write neatly",
        "To make the line longer on purpose",
        "To decide which basket to use"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The question helps confirm the item belongs to the student claiming it."
    },
    {
      id: "q3",
      type: "multipleChoice",
      passage:
        "Every Friday, Ms. Nguyen’s class runs a student-led Lost & Found table near the school gate. Two volunteers wear bright badges, sort items into baskets, and write each item into a simple logbook. If someone claims an item, the volunteer asks one clear question (for example, ‘What colour is the zipper?’) before handing it over. The system is quick, but it only works well when students return items as soon as they are found. Last month, the class added short announcements to remind everyone to check their bags and label water bottles.",
      question: "What is the main reason the system might fail?",
      options: [
        "Students do not return found items quickly",
        "Volunteers wear the wrong colour badges",
        "The logbook is too expensive",
        "Teachers do not like announcements"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The passage says it works well only when items are returned as soon as they are found."
    },
    {
      id: "q4",
      type: "multipleChoice",
      passage:
        "Every Friday, Ms. Nguyen’s class runs a student-led Lost & Found table near the school gate. Two volunteers wear bright badges, sort items into baskets, and write each item into a simple logbook. If someone claims an item, the volunteer asks one clear question (for example, ‘What colour is the zipper?’) before handing it over. The system is quick, but it only works well when students return items as soon as they are found. Last month, the class added short announcements to remind everyone to check their bags and label water bottles.",
      question: "In the passage, the word ‘quick’ is closest in meaning to…",
      options: ["fast", "messy", "dangerous", "silent"],
      answer: 0,
      difficulty: "easy",
      explanation: "‘Quick’ means ‘fast’."
    },
    {
      id: "q5",
      type: "trueFalse",
      passage:
        "Every Friday, Ms. Nguyen’s class runs a student-led Lost & Found table near the school gate. Two volunteers wear bright badges, sort items into baskets, and write each item into a simple logbook. If someone claims an item, the volunteer asks one clear question (for example, ‘What colour is the zipper?’) before handing it over. The system is quick, but it only works well when students return items as soon as they are found. Last month, the class added short announcements to remind everyone to check their bags and label water bottles.",
      question: "The Lost & Found table is run by students.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "It is described as ‘student-led’ and run by volunteers."
    },
    {
      id: "q6",
      type: "multipleChoice",
      passage:
        "Every Friday, Ms. Nguyen’s class runs a student-led Lost & Found table near the school gate. Two volunteers wear bright badges, sort items into baskets, and write each item into a simple logbook. If someone claims an item, the volunteer asks one clear question (for example, ‘What colour is the zipper?’) before handing it over. The system is quick, but it only works well when students return items as soon as they are found. Last month, the class added short announcements to remind everyone to check their bags and label water bottles.",
      question: "Choose the correct option (True / False / Not Given): The class created a website for Lost & Found.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "The passage mentions a table, a logbook, and announcements, but not a website."
    },
    {
      id: "q7",
      type: "fillInTheBlank",
      passage:
        "Every Friday, Ms. Nguyen’s class runs a student-led Lost & Found table near the school gate. Two volunteers wear bright badges, sort items into baskets, and write each item into a simple logbook.",
      question: "Sentence completion: The volunteers write each item into a ______.",
      answer: "logbook",
      difficulty: "medium",
      explanation: "The passage says they write each item into a simple logbook."
    },
    {
      id: "q8",
      type: "fillInTheBlank",
      passage:
        "Last month, the class added short announcements to remind everyone to check their bags and label water bottles.",
      question: "Sentence completion: The announcements remind students to ______ their water bottles.",
      answer: "label",
      difficulty: "easy",
      explanation: "The final sentence uses the verb ‘label’."
    },

    // -----------------------------
    // Passage B
    // -----------------------------
    {
      id: "q9",
      type: "multipleChoice",
      passage:
        "In many cities, pocket parks are being built in small spaces between buildings or beside busy roads. These parks might be no bigger than a classroom, but they can still make a difference. A few trees can reduce heat on hot days, and benches give people a place to rest. Some pocket parks include plants that soak up rainwater, helping to prevent puddles and flooding. However, because the parks are small, they can become messy quickly if no one looks after them. In one neighbourhood, residents created a weekly cleaning schedule and added a sign asking visitors to take rubbish home.",
      question: "What is the best heading for the passage?",
      options: [
        "Small parks with big benefits",
        "How to build a tall building",
        "Why roads are always crowded",
        "Training to run a marathon"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage explains what pocket parks are and why they help."
    },
    {
      id: "q10",
      type: "multipleChoice",
      passage:
        "In many cities, pocket parks are being built in small spaces between buildings or beside busy roads. These parks might be no bigger than a classroom, but they can still make a difference. A few trees can reduce heat on hot days, and benches give people a place to rest. Some pocket parks include plants that soak up rainwater, helping to prevent puddles and flooding. However, because the parks are small, they can become messy quickly if no one looks after them. In one neighbourhood, residents created a weekly cleaning schedule and added a sign asking visitors to take rubbish home.",
      question: "According to the passage, what can trees do in pocket parks?",
      options: [
        "Reduce heat on hot days",
        "Make traffic faster",
        "Stop all rain from falling",
        "Turn buildings into parks"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "It says trees can reduce heat on hot days."
    },
    {
      id: "q11",
      type: "multipleChoice",
      passage:
        "In many cities, pocket parks are being built in small spaces between buildings or beside busy roads. These parks might be no bigger than a classroom, but they can still make a difference. A few trees can reduce heat on hot days, and benches give people a place to rest. Some pocket parks include plants that soak up rainwater, helping to prevent puddles and flooding. However, because the parks are small, they can become messy quickly if no one looks after them. In one neighbourhood, residents created a weekly cleaning schedule and added a sign asking visitors to take rubbish home.",
      question: "Why might pocket parks become messy quickly?",
      options: [
        "Because they are small and need regular care",
        "Because benches are too heavy",
        "Because rainwater cannot be absorbed",
        "Because no one is allowed to visit"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The passage says small parks can become messy if no one looks after them."
    },
    {
      id: "q12",
      type: "multipleChoice",
      passage:
        "Some pocket parks include plants that soak up rainwater, helping to prevent puddles and flooding.",
      question: "In the sentence, ‘soak up’ means…",
      options: ["absorb", "throw away", "freeze", "hide"],
      answer: 0,
      difficulty: "easy",
      explanation: "Plants can absorb (soak up) rainwater."
    },
    {
      id: "q13",
      type: "multipleChoice",
      passage:
        "In many cities, pocket parks are being built in small spaces between buildings or beside busy roads. These parks might be no bigger than a classroom, but they can still make a difference.",
      question:
        "Choose the correct option (True / False / Not Given): Pocket parks are usually larger than a classroom.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "The passage says they might be no bigger than a classroom."
    },
    {
      id: "q14",
      type: "multipleChoice",
      passage:
        "In one neighbourhood, residents created a weekly cleaning schedule and added a sign asking visitors to take rubbish home.",
      question: "Why did residents create a cleaning schedule?",
      options: [
        "To keep the pocket park clean",
        "To stop people from sitting on benches",
        "To make the park larger",
        "To close the park every weekend"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "A schedule helps them look after the park regularly."
    },
    {
      id: "q15",
      type: "fillInTheBlank",
      passage:
        "A few trees can reduce heat on hot days, and benches give people a place to rest.",
      question: "Sentence completion: Benches give people a place to ______.",
      answer: "rest",
      difficulty: "easy",
      explanation: "The passage says benches give people a place to rest."
    },
    {
      id: "q16",
      type: "multipleChoice",
      passage:
        "These parks might be no bigger than a classroom, but they can still make a difference.",
      question: "What does the phrase ‘make a difference’ suggest?",
      options: [
        "They can have a positive effect",
        "They will always be noisy",
        "They are impossible to build",
        "They cost nothing at all"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "‘Make a difference’ means ‘have a useful or positive effect’."
    },

    // -----------------------------
    // Passage C
    // -----------------------------
    {
      id: "q17",
      type: "multipleChoice",
      passage:
        "Many students read on screens every day: phones, tablets, and laptops. Screens are convenient because you can search for words and carry many books at once. However, some readers say they focus better on paper. When reading on paper, it is easier to see where you are on the page and to write notes in the margin. On a screen, messages and notifications can interrupt concentration, especially if the device is used for games or social media. Some teachers suggest a simple plan: use screens for quick research, but choose paper for longer reading that requires deep attention.",
      question: "Which heading is best for the passage?",
      options: [
        "Paper and screens: choosing the right tool",
        "How to build a new phone app",
        "The history of bicycles",
        "Why students dislike libraries"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage compares reading on screens and on paper and suggests when to use each."
    },
    {
      id: "q18",
      type: "multipleChoice",
      passage:
        "Screens are convenient because you can search for words and carry many books at once.",
      question: "What is one advantage of reading on screens?",
      options: [
        "You can search for words quickly",
        "You can always write in the margin",
        "Notifications disappear forever",
        "Paper pages become waterproof"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage says you can search for words on screens."
    },
    {
      id: "q19",
      type: "multipleChoice",
      passage:
        "On a screen, messages and notifications can interrupt concentration.",
      question: "The word ‘interrupt’ is closest in meaning to…",
      options: ["stop", "improve", "measure", "decorate"],
      answer: 0,
      difficulty: "medium",
      explanation: "To interrupt is to stop something for a moment."
    },
    {
      id: "q20",
      type: "multipleChoice",
      passage:
        "Some teachers suggest a simple plan: use screens for quick research, but choose paper for longer reading that requires deep attention.",
      question: "What do the teachers suggest?",
      options: [
        "Use screens for quick research and paper for deep reading",
        "Avoid reading completely",
        "Only read on phones",
        "Only read books with pictures"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The suggestion is to match the tool to the task: screens for research, paper for deep attention."
    },
    {
      id: "q21",
      type: "multipleChoice",
      passage:
        "Some readers say they focus better on paper.",
      question:
        "Choose the correct option (True / False / Not Given): All readers focus better on paper.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "hard",
      explanation: "The passage says ‘some readers’, not ‘all readers’."
    },
    {
      id: "q22",
      type: "trueFalse",
      passage:
        "When reading on paper, it is easier to see where you are on the page and to write notes in the margin.",
      question: "The passage says it can be easier to write notes on paper.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "It directly states writing notes in the margin is easier on paper."
    },
    {
      id: "q23",
      type: "fillInTheBlank",
      passage:
        "On a screen, messages and notifications can interrupt concentration, especially if the device is used for games or social media.",
      question: "Sentence completion: Notifications can interrupt ______.",
      answer: "concentration",
      difficulty: "medium",
      explanation: "The exact word used is ‘concentration’."
    },
    {
      id: "q24",
      type: "fillInTheBlank",
      passage:
        "Some teachers suggest a simple plan: use screens for quick research, but choose paper for longer reading that requires deep attention.",
      question: "Sentence completion: Choose paper for longer reading that requires deep ______.",
      answer: "attention",
      difficulty: "medium",
      explanation: "The sentence ends with ‘deep attention’."
    },

    // -----------------------------
    // Passage D
    // -----------------------------
    {
      id: "q25",
      type: "multipleChoice",
      passage:
        "A new night market opened near the river, and it became popular very quickly. After two weekends, the local council received complaints about litter on the footpaths. Instead of closing the market, organisers tried a different solution. They set up three clearly marked bins at each entrance: one for food waste, one for recyclables, and one for everything else. They also asked vendors to use paper bowls rather than plastic ones. On the third weekend, volunteers walked around with spare bags and politely reminded visitors to throw rubbish away. The next Monday, the cleanup team reported that the area was noticeably cleaner.",
      question: "What is the main problem described in the passage?",
      options: [
        "Litter created by the night market",
        "The river flooding the market",
        "Vendors selling too much food",
        "A shortage of volunteers"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Complaints were about litter on the footpaths."
    },
    {
      id: "q26",
      type: "multipleChoice",
      passage:
        "They set up three clearly marked bins at each entrance: one for food waste, one for recyclables, and one for everything else.",
      question: "How many types of bins were added?",
      options: ["Three", "Two", "Four", "One"],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage lists three bins."
    },
    {
      id: "q27",
      type: "multipleChoice",
      passage:
        "Instead of closing the market, organisers tried a different solution.",
      question: "What does ‘a different solution’ refer to?",
      options: [
        "Changing how rubbish is managed",
        "Moving the market to another city",
        "Stopping people from visiting",
        "Raising prices for all food"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "They added bins, changed packaging, and used volunteers—actions to manage rubbish."
    },
    {
      id: "q28",
      type: "multipleChoice",
      passage:
        "They also asked vendors to use paper bowls rather than plastic ones.",
      question: "Why did organisers ask for paper bowls?",
      options: [
        "To reduce plastic waste",
        "To make food taste sweeter",
        "To make bowls heavier",
        "To stop the market from growing"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paper bowls are a change aimed at reducing waste and litter."
    },
    {
      id: "q29",
      type: "multipleChoice",
      passage:
        "On the third weekend, volunteers walked around with spare bags and politely reminded visitors to throw rubbish away.",
      question: "What can we infer about the volunteers’ approach?",
      options: [
        "They were helpful and respectful",
        "They were angry and shouted at visitors",
        "They refused to speak to anyone",
        "They only worked inside the bins"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "The passage says they ‘politely reminded’ visitors and carried spare bags."
    },
    {
      id: "q30",
      type: "fillInTheBlank",
      passage:
        "The next Monday, the cleanup team reported that the area was noticeably cleaner.",
      question: "Sentence completion: The area was noticeably ______.",
      answer: "cleaner",
      difficulty: "easy",
      explanation: "The final sentence ends with ‘noticeably cleaner’."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
