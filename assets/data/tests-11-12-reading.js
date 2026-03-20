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
        "To teach students to write neatly",
        "To check that the person is the real owner",
        "To make the line longer on purpose",
        "To decide which basket to use"
      ], answer: 1,
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
        "The logbook is too expensive",
        "Volunteers wear the wrong colour badges",
        "Students do not return found items quickly",
        "Teachers do not like announcements"
      ], answer: 2,
      difficulty: "medium",
      explanation: "The passage says it works well only when items are returned as soon as they are found."
    },
    {
      id: "q4",
      type: "multipleChoice",
      passage:
        "Every Friday, Ms. Nguyen’s class runs a student-led Lost & Found table near the school gate. Two volunteers wear bright badges, sort items into baskets, and write each item into a simple logbook. If someone claims an item, the volunteer asks one clear question (for example, ‘What colour is the zipper?’) before handing it over. The system is quick, but it only works well when students return items as soon as they are found. Last month, the class added short announcements to remind everyone to check their bags and label water bottles.",
      question: "In the passage, the word ‘quick’ is closest in meaning to…",
      options: ["silent", "messy", "dangerous", "fast"], answer: 3,
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
      options: ["True", "Not Given", "False"], answer: 1,
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
        "Why roads are always crowded",
        "How to build a tall building",
        "Small parks with big benefits",
        "Training to run a marathon"
      ], answer: 2,
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
        "Turn buildings into parks",
        "Make traffic faster",
        "Stop all rain from falling",
        "Reduce heat on hot days"
      ], answer: 3,
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
      options: ["throw away", "absorb", "freeze", "hide"], answer: 1,
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
      options: ["False", "True", "Not Given"], answer: 0,
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
        "To close the park every weekend",
        "To stop people from sitting on benches",
        "To make the park larger",
        "To keep the pocket park clean"
      ], answer: 3,
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
        "How to build a new phone app",
        "Paper and screens: choosing the right tool",
        "The history of bicycles",
        "Why students dislike libraries"
      ], answer: 1,
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
        "Notifications disappear forever",
        "You can always write in the margin",
        "You can search for words quickly",
        "Paper pages become waterproof"
      ], answer: 2,
      difficulty: "easy",
      explanation: "The passage says you can search for words on screens."
    },
    {
      id: "q19",
      type: "multipleChoice",
      passage:
        "On a screen, messages and notifications can interrupt concentration.",
      question: "The word ‘interrupt’ is closest in meaning to…",
      options: ["decorate", "improve", "measure", "stop"], answer: 3,
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
        "A shortage of volunteers",
        "The river flooding the market",
        "Vendors selling too much food",
        "Litter created by the night market"
      ], answer: 3,
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
        "Moving the market to another city",
        "Changing how rubbish is managed",
        "Stopping people from visiting",
        "Raising prices for all food"
      ], answer: 1,
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
        "To make bowls heavier",
        "To make food taste sweeter",
        "To reduce plastic waste",
        "To stop the market from growing"
      ], answer: 2,
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
        "They only worked inside the bins",
        "They were angry and shouted at visitors",
        "They refused to speak to anyone",
        "They were helpful and respectful"
      ], answer: 3,
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
    ,
    // -----------------------------
    // Passage E
    // -----------------------------
    {
      id: "q31",
      type: "multipleChoice",
      passage:
        "During the science club’s project week, a group of sixth-graders tried to build a simple solar oven from a pizza box. They lined the inside with aluminium foil to reflect light, taped clear plastic over the opening, and placed a dark tray at the bottom to absorb heat. To keep warm air from escaping, they sealed the edges with thick paper strips. The students tested the oven at lunchtime on the roof, recording the temperature every ten minutes. On the first day, clouds arrived and the oven warmed slowly, so the group adjusted their plan. They added a small stand to tilt the box toward the sun and used a spare notebook as a wind shield. The next test reached a much higher temperature, and the team managed to melt chocolate for their presentation, even though it was not hot enough to bake bread.",
      question: "Which heading fits the passage best?",
      options: [
        "Building a solar oven for a science project",
        "Buying pizza for the class",
        "How to paint a roof",
        "A story about winter snow"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage describes how students built and improved a solar oven for science club."
    },
    {
      id: "q32",
      type: "multipleChoice",
      passage:
        "During the science club’s project week, a group of sixth-graders tried to build a simple solar oven from a pizza box. They lined the inside with aluminium foil to reflect light, taped clear plastic over the opening, and placed a dark tray at the bottom to absorb heat. To keep warm air from escaping, they sealed the edges with thick paper strips. The students tested the oven at lunchtime on the roof, recording the temperature every ten minutes. On the first day, clouds arrived and the oven warmed slowly, so the group adjusted their plan. They added a small stand to tilt the box toward the sun and used a spare notebook as a wind shield. The next test reached a much higher temperature, and the team managed to melt chocolate for their presentation, even though it was not hot enough to bake bread.",
      question: "Why did the students tape clear plastic over the opening?",
      options: [
        "It makes the box heavier",
        "It lets sunlight in and helps trap warm air",
        "It blocks all heat from entering",
        "It changes the colour of the foil"
      ], answer: 1,
      difficulty: "medium",
      explanation: "Clear plastic allows light through while reducing warm air escaping."
    },
    {
      id: "q33",
      type: "multipleChoice",
      passage:
        "They added a small stand to tilt the box toward the sun and used a spare notebook as a wind shield.",
      question: "In the sentence, the word ‘tilt’ is closest in meaning to…",
      options: ["measure", "shout", "lean", "break"], answer: 2,
      difficulty: "easy",
      explanation: "To tilt means to lean something to one side or angle it." 
    },
    {
      id: "q34",
      type: "multipleChoice",
      passage:
        "The students tested the oven at lunchtime on the roof, recording the temperature every ten minutes.",
      question: "Why did the students record the temperature every ten minutes?",
      options: [
        "To choose a new pizza topping",
        "To stop the clouds from coming",
        "To make the oven colder",
        "To track how the heat changed over time"
      ], answer: 3,
      difficulty: "medium",
      explanation: "Regular recordings help them see how the temperature rises or falls during the test." 
    },
    {
      id: "q35",
      type: "multipleChoice",
      passage:
        "The next test reached a much higher temperature, and the team managed to melt chocolate for their presentation, even though it was not hot enough to bake bread.",
      question: "Choose the correct option (True / False / Not Given): The oven was hot enough to bake bread.",
      options: ["False", "True", "Not Given"], answer: 0,
      difficulty: "medium",
      explanation: "The passage states it was not hot enough to bake bread." 
    },
    {
      id: "q36",
      type: "trueFalse",
      passage:
        "They lined the inside with aluminium foil to reflect light.",
      question: "The passage says the students used aluminium foil inside the box.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "It directly says the inside was lined with aluminium foil." 
    },
    {
      id: "q37",
      type: "fillInTheBlank",
      passage:
        "To keep warm air from escaping, they sealed the edges with thick paper strips.",
      question: "Sentence completion: They sealed the edges with thick paper ______.",
      answer: "strips",
      difficulty: "easy",
      explanation: "The sentence ends with ‘thick paper strips’."
    },
    {
      id: "q38",
      type: "multipleChoice",
      passage:
        "On the first day, clouds arrived and the oven warmed slowly, so the group adjusted their plan. They added a small stand to tilt the box toward the sun and used a spare notebook as a wind shield.",
      question: "What did the group do after the first test warmed slowly?",
      options: [
        "They used an electric heater instead",
        "They filled the box with ice",
        "They added a stand and a wind shield",
        "They covered the foil to block light"
      ], answer: 2,
      difficulty: "hard",
      explanation: "They changed the setup by tilting the box and blocking wind to improve heating." 
    },

    // -----------------------------
    // Passage F
    // -----------------------------
    {
      id: "q39",
      type: "multipleChoice",
      passage:
        "At the community library, a new ‘seed shelf’ appeared beside the cookbooks. Small paper envelopes held sunflower, basil, and bean seeds donated by local gardeners. Each envelope had a label with the plant name, the best month to plant it, and a simple note such as ‘needs full sun’. Borrowers were encouraged to take one envelope and, after the growing season, return a fresh envelope made from the seeds they collected. The librarians set one rule: no treated or chemical-coated seeds, because these might harm insects or contaminate the shelf. At first, some visitors worried that different varieties would get mixed together. To solve this, volunteers added coloured stickers that matched a chart on the wall and showed where each type belonged. The library also held a short workshop on saving seeds from tomatoes, including how to dry them properly.",
      question: "What is the best heading for the passage?",
      options: [
        "How to build a garden fence",
        "A new recipe for tomato soup",
        "Why books should be kept locked",
        "A library shares seeds with the community"
      ], answer: 3,
      difficulty: "easy",
      explanation: "The passage is about the library’s seed shelf, rules, and how people share seeds." 
    },
    {
      id: "q40",
      type: "multipleChoice",
      passage:
        "Each envelope had a label with the plant name, the best month to plant it, and a simple note such as ‘needs full sun’.",
      question: "What information was included on each seed envelope label?",
      options: [
        "Plant name, best planting month, and a simple growing note",
        "Only the price of the seeds",
        "A long history of the library",
        "The gardener’s phone number"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The label includes the plant name, month to plant, and a note like ‘needs full sun’." 
    },
    {
      id: "q41",
      type: "multipleChoice",
      passage:
        "Small paper envelopes held sunflower, basil, and bean seeds donated by local gardeners.",
      question: "In the sentence, the word ‘donated’ is closest in meaning to…",
      options: ["hidden", "given", "sold", "broken"], answer: 1,
      difficulty: "easy",
      explanation: "‘Donated’ means given for free to help others." 
    },
    {
      id: "q42",
      type: "multipleChoice",
      passage:
        "The librarians set one rule: no treated or chemical-coated seeds, because these might harm insects or contaminate the shelf.",
      question: "Why did the librarians not allow treated or chemical-coated seeds?",
      options: [
        "They cannot grow in sunlight",
        "They are too large to fit in envelopes",
        "They might harm insects or contaminate the shelf",
        "They make plants grow instantly"
      ], answer: 2,
      difficulty: "hard",
      explanation: "The passage gives two reasons: protecting insects and keeping the shelf clean and safe." 
    },
    {
      id: "q43",
      type: "multipleChoice",
      passage:
        "Borrowers were encouraged to take one envelope and, after the growing season, return a fresh envelope made from the seeds they collected.",
      question: "Choose the correct option (True / False / Not Given): Borrowers must pay money to take seeds.",
      options: ["True", "Not Given", "False"], answer: 1,
      difficulty: "medium",
      explanation: "The passage explains borrowing and returning seeds, but it does not mention payment." 
    },
    {
      id: "q44",
      type: "trueFalse",
      passage:
        "The library also held a short workshop on saving seeds from tomatoes, including how to dry them properly.",
      question: "The passage says the library held a workshop on saving tomato seeds.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "It directly states there was a workshop on saving tomato seeds." 
    },
    {
      id: "q45",
      type: "fillInTheBlank",
      passage:
        "Small paper envelopes held sunflower, basil, and bean seeds donated by local gardeners.",
      question: "Sentence completion: Small paper ______ held the seeds.",
      answer: "envelopes",
      difficulty: "easy",
      explanation: "The passage says the seeds were in small paper envelopes." 
    },
    {
      id: "q46",
      type: "multipleChoice",
      passage:
        "At first, some visitors worried that different varieties would get mixed together. To solve this, volunteers added coloured stickers that matched a chart on the wall and showed where each type belonged.",
      question: "How did volunteers help prevent different seed varieties from being mixed together?",
      options: [
        "They removed all the envelopes",
        "They added coloured stickers that matched a chart",
        "They stopped people from borrowing seeds",
        "They planted the seeds inside the library"
      ], answer: 1,
      difficulty: "medium",
      explanation: "Coloured stickers and a matching chart helped organise the seeds correctly." 
    },

    // -----------------------------
    // Passage G
    // -----------------------------
    {
      id: "q47",
      type: "multipleChoice",
      passage:
        "The school newspaper team planned an article about the canteen’s new menu. Instead of writing opinions only, the editor asked reporters to collect facts. One student timed how long the lunch line took on three different days. Another counted how many students chose the vegetarian dish when it was offered. The team also interviewed the kitchen manager, who explained that the menu changed to use more seasonal vegetables and reduce food waste. After drafting the article, the editor required each reporter to underline every number and name and then check it again. During this process, they discovered that one quote had been copied incorrectly. The group contacted the manager, fixed the sentence, and added a short note at the bottom: ‘Updated after confirming details.’ The next week, a teacher praised the article for being clear and fair, even to readers who disagreed with the menu.",
      question: "Which heading fits the passage best?",
      options: [
        "How to cook only vegetarian meals",
        "Planning a class camping trip",
        "A school newspaper learns to fact-check",
        "A report about a new sports stadium"
      ], answer: 2,
      difficulty: "easy",
      explanation: "The passage focuses on collecting facts and checking details before publishing an article." 
    },
    {
      id: "q48",
      type: "multipleChoice",
      passage:
        "One student timed how long the lunch line took on three different days.",
      question: "What did one student measure for the article?",
      options: [
        "How many clouds were in the sky",
        "How many books were borrowed",
        "How fast students ran in PE",
        "How long the lunch line took"
      ], answer: 3,
      difficulty: "easy",
      explanation: "The student timed the lunch line on three days." 
    },
    {
      id: "q49",
      type: "multipleChoice",
      passage:
        "The menu changed to use more seasonal vegetables and reduce food waste.",
      question: "In the passage, ‘seasonal’ vegetables are vegetables that…",
      options: [
        "are available at that time of year",
        "can only be eaten in winter",
        "never grow outdoors",
        "are made from plastic"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Seasonal foods are those that are in season (available) during certain times of the year." 
    },
    {
      id: "q50",
      type: "multipleChoice",
      passage:
        "After drafting the article, the editor required each reporter to underline every number and name and then check it again.",
      question: "Why did the editor ask reporters to check every number and name?",
      options: [
        "To make the article longer",
        "To make sure the facts were accurate",
        "To hide the important details",
        "To help readers skip the article"
      ], answer: 1,
      difficulty: "hard",
      explanation: "Checking numbers and names helps prevent mistakes and keeps the article accurate." 
    },
    {
      id: "q51",
      type: "multipleChoice",
      passage:
        "The team also interviewed the kitchen manager, who explained that the menu changed to use more seasonal vegetables and reduce food waste.",
      question: "Choose the correct option (True / False / Not Given): The team wrote the article without interviewing anyone.",
      options: ["True", "Not Given", "False"], answer: 2,
      difficulty: "medium",
      explanation: "They interviewed the kitchen manager, so the statement is false." 
    },
    {
      id: "q52",
      type: "trueFalse",
      passage:
        "They discovered that one quote had been copied incorrectly. The group contacted the manager, fixed the sentence, and added a short note at the bottom: ‘Updated after confirming details.’",
      question: "The passage says the team corrected a quote after checking details.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "They found an incorrect quote, contacted the manager, and fixed it." 
    },
    {
      id: "q53",
      type: "fillInTheBlank",
      passage:
        "The menu changed to use more seasonal vegetables and reduce food waste.",
      question: "Sentence completion: The menu changed to use more ______ vegetables.",
      answer: "seasonal",
      difficulty: "easy",
      explanation: "The passage uses the phrase ‘seasonal vegetables’." 
    },
    {
      id: "q54",
      type: "multipleChoice",
      passage:
        "Instead of writing opinions only, the editor asked reporters to collect facts.",
      question: "What helped make the article ‘clear and fair’?",
      options: [
        "Using facts and checking details",
        "Avoiding any numbers",
        "Only writing personal opinions",
        "Copying information without checking"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Facts and careful checking make writing clearer and fairer to different readers." 
    },

    // -----------------------------
    // Passage H
    // -----------------------------
    {
      id: "q55",
      type: "multipleChoice",
      passage:
        "On a class trip to the city museum, Year 6 students received small audio guides that clipped onto a lanyard. Each room had a number on the wall; students typed it in and heard a one-minute story about the object in front of them. The stories were written for children and often included a question such as ‘What do you think this tool was used for?’ to encourage careful looking. Because the museum can be noisy, the guides came with headphones, but students were told to pause the audio when the teacher spoke. At the end of the visit, the museum staff asked for quick feedback. Some students said they preferred reading the labels because they could move at their own pace. Others liked the audio because it explained difficult words. In response, the museum added short “pause-and-look” reminders to the recordings, giving listeners time to examine details before the next sentence.",
      question: "What is the best heading for the passage?",
      options: [
        "How to build a museum from wood",
        "Using audio guides to support museum visits",
        "A long history of ancient kings",
        "Why headphones should be banned"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The passage describes how audio guides worked and how the museum improved them." 
    },
    {
      id: "q56",
      type: "multipleChoice",
      passage:
        "Each room had a number on the wall; students typed it in and heard a one-minute story about the object in front of them.",
      question: "How long was each audio story?",
      options: ["One hour", "Ten minutes", "One minute", "Thirty seconds"], answer: 2,
      difficulty: "easy",
      explanation: "The passage says students heard a one-minute story." 
    },
    {
      id: "q57",
      type: "multipleChoice",
      passage:
        "Some students said they preferred reading the labels because they could move at their own pace.",
      question: "In the sentence, the word ‘pace’ is closest in meaning to…",
      options: ["noise", "price", "shape", "speed"], answer: 3,
      difficulty: "medium",
      explanation: "Your pace is your speed or rate of movement." 
    },
    {
      id: "q58",
      type: "multipleChoice",
      passage:
        "In response, the museum added short “pause-and-look” reminders to the recordings, giving listeners time to examine details before the next sentence.",
      question: "Why did the museum add ‘pause-and-look’ reminders?",
      options: [
        "To give listeners time to examine the object carefully",
        "To make the recordings louder",
        "To stop students from visiting the museum",
        "To remove questions from the stories"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "The reminders were added so listeners could look closely before the audio continued." 
    },
    {
      id: "q59",
      type: "multipleChoice",
      passage:
        "On a class trip to the city museum, Year 6 students received small audio guides that clipped onto a lanyard.",
      question: "Choose the correct option (True / False / Not Given): Students used their own phones as the audio guides.",
      options: ["False", "True", "Not Given"], answer: 0,
      difficulty: "medium",
      explanation: "The passage says students received audio guides, not that they used their own phones." 
    },
    {
      id: "q60",
      type: "trueFalse",
      passage:
        "Others liked the audio because it explained difficult words.",
      question: "The passage says some students liked the audio because it explained difficult words.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "This idea is stated directly in the passage." 
    },
    {
      id: "q61",
      type: "fillInTheBlank",
      passage:
        "Each room had a number on the wall; students typed it in and heard a one-minute story about the object in front of them.",
      question: "Sentence completion: Each room had a ______ on the wall.",
      answer: "number",
      difficulty: "easy",
      explanation: "The passage explains students typed in the room number." 
    },
    {
      id: "q62",
      type: "multipleChoice",
      passage:
        "Because the museum can be noisy, the guides came with headphones, but students were told to pause the audio when the teacher spoke.",
      question: "What were students told to do when the teacher spoke?",
      options: [
        "Throw away the headphones",
        "Turn the sound up",
        "Run to the next room",
        "Pause the audio"
      ], answer: 3,
      difficulty: "medium",
      explanation: "They were instructed to pause the audio when the teacher spoke." 
    },

    // -----------------------------
    // Passage I
    // -----------------------------
    {
      id: "q63",
      type: "multipleChoice",
      passage:
        "After a heavy storm, the local river carried a lot of rubbish onto the banks. A youth group wanted to help, but they did not want to waste time searching the whole area. One member suggested using a small drone to take photos from above. With an adult supervising, they flew the drone along a short stretch and marked ‘hot spots’ where plastic bottles and food wrappers were gathered. The images helped the group plan a route, and it also showed that most rubbish collected near a bus stop upstream. Before the clean-up, the team asked the nearby snack shop to place a bin outside, and the owner agreed. On Saturday morning, the group worked in pairs with gloves and separate bags for recyclables. After two hours, they compared the riverbank to the drone photos taken earlier. Although they did not remove every piece of rubbish, the worst areas were cleared, and the group posted a reminder at the bus stop asking people to take litter home.",
      question: "Which heading fits the passage best?",
      options: [
        "Planning a river clean-up with drone photos",
        "Learning to swim in deep water",
        "A guide to selling snacks",
        "How storms are created"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage is about using drone photos to plan and improve a river clean-up." 
    },
    {
      id: "q64",
      type: "multipleChoice",
      passage:
        "One member suggested using a small drone to take photos from above.",
      question: "Why did the group use a drone?",
      options: [
        "To scare birds away from the river",
        "To find where rubbish was gathered and plan a route",
        "To carry rubbish bags to the bin",
        "To change the weather"
      ], answer: 1,
      difficulty: "medium",
      explanation: "The photos helped them mark hot spots and plan where to clean." 
    },
    {
      id: "q65",
      type: "multipleChoice",
      passage:
        "With an adult supervising, they flew the drone along a short stretch…",
      question: "In the passage, the word ‘supervising’ is closest in meaning to…",
      options: ["painting", "sleeping", "watching and guiding", "celebrating"], answer: 2,
      difficulty: "easy",
      explanation: "To supervise is to watch over and make sure something is done safely." 
    },
    {
      id: "q66",
      type: "multipleChoice",
      passage:
        "Before the clean-up, the team asked the nearby snack shop to place a bin outside, and the owner agreed.",
      question: "Why did the team ask the snack shop to place a bin outside?",
      options: [
        "To block the path to the bus stop",
        "To stop the shop from selling snacks",
        "To make the river flow faster",
        "To make it easier for people to throw rubbish away"
      ], answer: 3,
      difficulty: "hard",
      explanation: "A bin near the area could reduce new litter by giving people a place to dispose of rubbish." 
    },
    {
      id: "q67",
      type: "multipleChoice",
      passage:
        "After a heavy storm, the local river carried a lot of rubbish onto the banks… On Saturday morning, the group worked in pairs…",
      question: "Choose the correct option (True / False / Not Given): The storm happened on Saturday morning.",
      options: ["True", "Not Given", "False"], answer: 1,
      difficulty: "medium",
      explanation: "The passage mentions a storm and a Saturday clean-up, but it does not say the storm happened on Saturday morning." 
    },
    {
      id: "q68",
      type: "trueFalse",
      passage:
        "On Saturday morning, the group worked in pairs with gloves and separate bags for recyclables.",
      question: "The passage says the group used separate bags for recyclables.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "This detail is stated directly in the sentence." 
    },
    {
      id: "q69",
      type: "fillInTheBlank",
      passage:
        "…marked ‘hot spots’ where plastic bottles and food wrappers were gathered.",
      question: "Sentence completion: They marked hot spots where plastic bottles and food ______ were gathered.",
      answer: "wrappers",
      difficulty: "easy",
      explanation: "The passage lists ‘food wrappers’ as part of the rubbish." 
    },
    {
      id: "q70",
      type: "multipleChoice",
      passage:
        "…it also showed that most rubbish collected near a bus stop upstream.",
      question: "Where did the drone photos show most rubbish was collecting?",
      options: [
        "Inside the snack shop",
        "In the middle of the river",
        "Near a bus stop upstream",
        "On the roof of the school"
      ], answer: 2,
      difficulty: "medium",
      explanation: "The passage clearly states most rubbish collected near a bus stop upstream." 
    },
    {
      id: "q71",
      type: "multipleChoice",
      passage:
        "After two hours… Although they did not remove every piece of rubbish, the worst areas were cleared…",
      question: "What was the result of the clean-up after two hours?",
      options: [
        "More rubbish appeared than before",
        "The river became completely empty of rubbish",
        "The group decided to stop cleaning forever",
        "The worst areas were cleared, but not every piece was removed"
      ], answer: 3,
      difficulty: "hard",
      explanation: "They improved the area by clearing the worst spots, even though some rubbish remained." 
    },

    // -----------------------------
    // Passage J
    // -----------------------------
    {
      id: "q72",
      type: "multipleChoice",
      passage:
        "At Oakwood School, the canteen introduced a compost bucket next to the usual rubbish bins. The idea sounded simple, but in the first week, students threw everything in together, including plastic forks. The science teacher and the canteen staff decided to teach the system instead of removing it. They made a clear poster with three photos: leftovers, fruit peels, and paper napkins. A volunteer stood nearby for the first ten minutes of lunch to guide students and answer questions. The canteen also changed one menu item: it stopped selling yoghurt in plastic cups on Fridays and served it in reusable bowls that stayed in the dining hall. By the end of the month, the compost bucket filled with mostly correct materials, and the school garden club used the finished compost in their vegetable beds. Teachers noticed one extra benefit: students began to think about waste even during class events, reminding each other to sort items properly.",
      question: "Which heading fits the passage best?",
      options: [
        "A school learns to use a compost system",
        "How to win a cooking contest",
        "The most expensive lunch in the city",
        "Why gardens cannot grow vegetables"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage describes introducing composting and teaching students how to use it correctly." 
    },
    {
      id: "q73",
      type: "multipleChoice",
      passage:
        "The idea sounded simple, but in the first week, students threw everything in together, including plastic forks.",
      question: "What problem happened in the first week?",
      options: [
        "The compost bucket disappeared",
        "Students put incorrect items like plastic forks in the compost",
        "No one ate lunch",
        "The poster fell off the wall"
      ], answer: 1,
      difficulty: "easy",
      explanation: "Students mixed compost with non-compost items such as plastic forks." 
    },
    {
      id: "q74",
      type: "multipleChoice",
      passage:
        "At Oakwood School, the canteen introduced a compost bucket next to the usual rubbish bins.",
      question: "In the passage, the word ‘introduced’ is closest in meaning to…",
      options: ["hid", "forgot", "started", "stole"], answer: 2,
      difficulty: "medium",
      explanation: "‘Introduced’ means they began using or brought in the compost bucket." 
    },
    {
      id: "q75",
      type: "multipleChoice",
      passage:
        "A volunteer stood nearby for the first ten minutes of lunch to guide students and answer questions.",
      question: "Why did a volunteer stand nearby at the start of lunch?",
      options: [
        "To collect money for the garden",
        "To sell yoghurt to students",
        "To close the compost bucket",
        "To guide students and answer questions about sorting waste"
      ], answer: 3,
      difficulty: "hard",
      explanation: "The volunteer helped students learn how to use the compost system correctly." 
    },
    {
      id: "q76",
      type: "multipleChoice",
      passage:
        "The canteen also changed one menu item: it stopped selling yoghurt in plastic cups on Fridays and served it in reusable bowls…",
      question: "Choose the correct option (True / False / Not Given): The canteen removed all plastic items from the school.",
      options: ["False", "True", "Not Given"], answer: 0,
      difficulty: "medium",
      explanation: "Only one change is mentioned (yoghurt cups on Fridays), not removing all plastic items." 
    },
    {
      id: "q77",
      type: "trueFalse",
      passage:
        "…the school garden club used the finished compost in their vegetable beds.",
      question: "The passage says the garden club used the finished compost in vegetable beds.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "This is stated directly in the passage." 
    },
    {
      id: "q78",
      type: "fillInTheBlank",
      passage:
        "They made a clear poster with three photos: leftovers, fruit peels, and paper napkins.",
      question: "Sentence completion: They made a clear ______ with three photos.",
      answer: "poster",
      difficulty: "easy",
      explanation: "The passage says they made a clear poster." 
    },
    {
      id: "q79",
      type: "multipleChoice",
      passage:
        "…it stopped selling yoghurt in plastic cups on Fridays and served it in reusable bowls that stayed in the dining hall.",
      question: "What menu change did the canteen make?",
      options: [
        "It sold only fruit peels",
        "It stopped serving food completely",
        "It served yoghurt in reusable bowls instead of plastic cups on Fridays",
        "It removed all bins from the canteen"
      ], answer: 2,
      difficulty: "medium",
      explanation: "The passage describes switching from plastic cups to reusable bowls on Fridays." 
    },
    {
      id: "q80",
      type: "multipleChoice",
      passage:
        "Teachers noticed one extra benefit: students began to think about waste even during class events, reminding each other to sort items properly.",
      question: "What extra benefit did teachers notice?",
      options: [
        "Students forgot how to recycle",
        "Students stopped eating lunch",
        "Students refused to visit the garden",
        "Students started thinking about waste and reminding each other"
      ], answer: 3,
      difficulty: "hard",
      explanation: "Teachers saw students using the habit in other situations and reminding each other to sort waste." 
    },
    {
      id: "q81",
      type: "trueFalse",
      question: "A heading is a short title for a paragraph.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "Headings help readers understand what each part is about."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
