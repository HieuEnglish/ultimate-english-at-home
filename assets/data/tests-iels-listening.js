/* assets/data/tests-iels-listening.js
   Question bank: IELTS Listening (original practice)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "iels-listening"

   Notes:
   - 4 parts (P1–P4). Questions are in part order and question order.
   - Audio is produced by the runner using the browser's Speech Synthesis (TTS).
   - "say" contains the Part transcript (same for each question in that part).
*/

(function () {
  "use strict";

  const SLUG = "iels-listening";

  // -----------------------------
  // Part scripts (TTS)
  // -----------------------------

  const P1 =
    "Part 1. You will hear a conversation between a caller and an assistant at a sports centre. " +
    "Assistant: Northgate Sports Centre, bookings desk. How can I help? " +
    "Caller: Hi, I want to book a badminton court for next week. " +
    "Assistant: No problem. Is this for a single hour or a longer session? " +
    "Caller: Just one hour. " +
    "Assistant: Great. Can I take your full name? " +
    "Caller: It’s Daniel Cooper. That’s C-O-O-P-E-R. " +
    "Assistant: Thanks. And a contact number? " +
    "Caller: 07915 406 882. " +
    "Assistant: Got it. Now, which day would you like? " +
    "Caller: Tuesday the 14th of May, please. " +
    "Assistant: We have 6 p.m. or 7 p.m. available. " +
    "Caller: 7 p.m. " +
    "Assistant: Okay, 7 to 8 p.m. Would you like Court 2 or Court 4? " +
    "Caller: Court 4 if possible. " +
    "Assistant: Court 4 is free. The price is twelve pounds for the hour. " +
    "Caller: That’s fine. Do I pay now? " +
    "Assistant: You can pay online, or at reception when you arrive. " +
    "Caller: I’ll pay online. " +
    "Assistant: Perfect. Please arrive ten minutes early to collect the key card from reception. " +
    "Caller: Okay. Thanks very much. " +
    "Assistant: You’re welcome. See you on Tuesday.";

  const P2 =
    "Part 2. You will hear a short talk by a guide at a city museum. " +
    "Guide: Welcome to the Harbour City Museum. Before you begin, here is some important information. " +
    "The main entrance is on River Road, and the ticket desk is directly inside the front doors. " +
    "If you have a backpack, please use the lockers, which are to the left of the ticket desk. " +
    "The café is upstairs on the first floor, next to the reading area. " +
    "At 11 a.m. we run a free guided tour, starting at the large map in Gallery One. " +
    "If you prefer an audio guide, you can collect one from the information counter beside the gift shop. " +
    "Photography is allowed in most rooms, but please do not take photos in the ship model gallery. " +
    "The museum closes at 5:30 p.m. today, and the last entry is at 5 p.m. " +
    "If you’re visiting with children, the activity room is on the ground floor, behind the café stairs. " +
    "Finally, if there is an emergency, the nearest exit from Gallery Two is through the side corridor marked in green.";

  const P3 =
    "Part 3. You will hear two students discussing a class project. " +
    "Mina: Have you chosen a topic for the sociology project yet? " +
    "Owen: Not really. I was thinking about remote work, but it feels too broad. " +
    "Mina: What about studying how people use co-working spaces? We could focus on one area of the city. " +
    "Owen: That’s better. We could compare students and full-time workers. " +
    "Mina: Yes. For data, we can do short interviews and a simple questionnaire. " +
    "Owen: Where should we collect responses? The library might be too quiet. " +
    "Mina: Let’s go to the Central Hub co-working space. They have a public lounge. " +
    "Owen: Good idea. When can we go? " +
    "Mina: I’m free on Thursday afternoon. " +
    "Owen: Thursday is difficult for me. Could we do Friday morning? " +
    "Mina: Friday morning works. Let’s meet at 9:30 outside the main entrance. " +
    "Owen: Great. I’ll draft the questionnaire tonight. " +
    "Mina: Then I’ll write the interview questions and we can review them together. " +
    "Owen: For the final report, we need a short summary and a chart. " +
    "Mina: We can make a bar chart showing how often people use the space each week. " +
    "Owen: And we should keep the presentation to eight minutes. " +
    "Mina: Right, and we’ll submit the written report on the 2nd of June.";

  const P4 =
    "Part 4. You will hear part of a lecture about sleep and learning. " +
    "Lecturer: Many people assume that learning happens only while we are awake, but research suggests that sleep plays a major role. " +
    "During the day, the brain collects new information. At night, some of that information is stabilised, which helps it last longer. " +
    "This process is often called consolidation. " +
    "One reason sleep helps is that the brain replays patterns of activity linked to what was learned earlier. " +
    "However, not all sleep is the same. Deep sleep is strongly linked to remembering facts and vocabulary, while dream sleep—also known as REM—has been associated with creativity and connecting ideas. " +
    "Importantly, sleep is not a magic solution. If learners do not practise correctly, there is little useful information to consolidate. " +
    "Another factor is timing. Short naps can improve alertness, but a nap that is too long may cause grogginess, making study less effective afterwards. " +
    "In practical terms, students should prioritise a regular schedule, limit caffeine late in the day, and review key material shortly before bedtime. " +
    "These habits do not guarantee high scores, but they can support the brain’s ability to store and organise learning over time.";

  // -----------------------------
  // Questions (40)
  // -----------------------------

  const QUESTIONS = [
    // Part 1 (10)
    {
      id: "q1",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "The caller’s first name is ______.",
      answer: ["Daniel"],
      explanation: "He says: “It’s Daniel Cooper.”"
    },
    {
      id: "q2",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "The caller’s family name is ______.",
      answer: ["Cooper"],
      explanation: "He spells the surname: C-O-O-P-E-R."
    },
    {
      id: "q3",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "The caller’s phone number is ______.",
      answer: ["07915 406 882", "07915406882"],
      explanation: "He gives: 07915 406 882."
    },
    {
      id: "q4",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "The booking is for Tuesday the ______ of May.",
      answer: ["14", "14th"],
      explanation: "He says: Tuesday the 14th of May."
    },
    {
      id: "q5",
      partId: "p1",
      type: "multipleChoice",
      say: P1,
      context: "Part 1: Choose the correct answer.",
      question: "What time is the court booked for?",
      options: ["6 to 7 p.m.", "7 to 8 p.m.", "7:30 to 8:30 p.m.", "8 to 9 p.m."],
      answer: 1,
      explanation: "They agree on 7 p.m. for one hour."
    },
    {
      id: "q6",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "The caller wants Court ______.",
      answer: ["4", "four"],
      explanation: "He asks for Court 4."
    },
    {
      id: "q7",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "The price for one hour is ______ pounds.",
      answer: ["12", "twelve"],
      explanation: "The assistant says: twelve pounds."
    },
    {
      id: "q8",
      partId: "p1",
      type: "multipleChoice",
      say: P1,
      context: "Part 1: Choose the correct answer.",
      question: "How will the caller pay?",
      options: ["In cash at reception", "By bank transfer", "Online", "By cheque"],
      answer: 2,
      explanation: "He says: “I’ll pay online.”"
    },
    {
      id: "q9",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "He should arrive ______ minutes early.",
      answer: ["10", "ten"],
      explanation: "The assistant says: arrive ten minutes early."
    },
    {
      id: "q10",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "He needs to collect a ______ card from reception.",
      answer: ["key", "keycard", "key card"],
      explanation: "The assistant mentions collecting the key card."
    },

    // Part 2 (10)
    {
      id: "q11",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "Where is the main entrance?",
      options: ["On River Road", "On King Street", "On Harbour Avenue", "On Station Lane"],
      answer: 0,
      explanation: "The guide says the main entrance is on River Road."
    },
    {
      id: "q12",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD AND/OR A NUMBER.",
      question: "Lockers are to the ______ of the ticket desk.",
      answer: ["left"],
      explanation: "The guide says lockers are to the left of the ticket desk."
    },
    {
      id: "q13",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "Where is the café located?",
      options: [
        "On the ground floor beside the gift shop",
        "Upstairs on the first floor next to the reading area",
        "Outside near the main entrance",
        "In Gallery Two"
      ],
      answer: 1,
      explanation: "The café is upstairs on the first floor next to the reading area."
    },
    {
      id: "q14",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD AND/OR A NUMBER.",
      question: "The free guided tour starts at ______ a.m.",
      answer: ["11", "11am", "11:00"],
      explanation: "The guide says the free tour starts at 11 a.m."
    },
    {
      id: "q15",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "Where does the free tour begin?",
      options: [
        "At the ticket desk",
        "At the large map in Gallery One",
        "At the café stairs",
        "At the ship model gallery"
      ],
      answer: 1,
      explanation: "It starts at the large map in Gallery One."
    },
    {
      id: "q16",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD AND/OR A NUMBER.",
      question: "Audio guides can be collected from the information counter beside the ______ shop.",
      answer: ["gift"],
      explanation: "The guide says: beside the gift shop."
    },
    {
      id: "q17",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "In which area are photos NOT allowed?",
      options: ["Gallery One", "The reading area", "The ship model gallery", "The activity room"],
      answer: 2,
      explanation: "No photos in the ship model gallery."
    },
    {
      id: "q18",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD AND/OR A NUMBER.",
      question: "The museum closes at ______ p.m.",
      answer: ["5:30", "530", "5 30", "five thirty"],
      explanation: "The guide says it closes at 5:30 p.m."
    },
    {
      id: "q19",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD AND/OR A NUMBER.",
      question: "The last entry is at ______ p.m.",
      answer: ["5", "5:00", "500"],
      explanation: "The last entry is at 5 p.m."
    },
    {
      id: "q20",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "Where is the activity room for children?",
      options: [
        "On the ground floor behind the café stairs",
        "On the first floor inside Gallery Two",
        "Outside the building near the exit",
        "Next to the lockers"
      ],
      answer: 0,
      explanation: "It’s on the ground floor behind the café stairs."
    },

    // Part 3 (10)
    {
      id: "q21",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "What topic do they decide to focus on?",
      options: ["Remote work at home", "Co-working spaces in the city", "Online learning platforms", "Public transport surveys"],
      answer: 1,
      explanation: "They choose co-working spaces."
    },
    {
      id: "q22",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "Which two groups will they compare?",
      options: ["Tourists and locals", "Students and full-time workers", "Teenagers and retirees", "Managers and customers"],
      answer: 1,
      explanation: "Mina suggests comparing students and full-time workers."
    },
    {
      id: "q23",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "Where will they collect responses?",
      options: ["In the library", "At a café near campus", "At the Central Hub co-working space", "At the train station"],
      answer: 2,
      explanation: "They decide on the Central Hub co-working space."
    },
    {
      id: "q24",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "When will they collect the data?",
      options: ["Thursday afternoon", "Friday morning", "Saturday afternoon", "Monday morning"],
      answer: 1,
      explanation: "They change to Friday morning."
    },
    {
      id: "q25",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD AND/OR A NUMBER.",
      question: "They will meet at ______ outside the main entrance.",
      answer: ["9:30", "930", "9 30", "nine thirty"],
      explanation: "They agree on 9:30."
    },
    {
      id: "q26",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD AND/OR A NUMBER.",
      question: "Owen will draft the ______ tonight.",
      answer: ["questionnaire"],
      explanation: "He says he’ll draft the questionnaire."
    },
    {
      id: "q27",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD AND/OR A NUMBER.",
      question: "Mina will write the interview ______.",
      answer: ["questions"],
      explanation: "She says she’ll write the interview questions."
    },
    {
      id: "q28",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "What kind of chart will they include?",
      options: ["A line chart", "A pie chart", "A bar chart", "A scatter plot"],
      answer: 2,
      explanation: "They mention making a bar chart."
    },
    {
      id: "q29",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD AND/OR A NUMBER.",
      question: "Their presentation should be ______ minutes long.",
      answer: ["8", "eight"],
      explanation: "They plan an eight-minute presentation."
    },
    {
      id: "q30",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD AND/OR A NUMBER.",
      question: "They will submit the written report on the ______ of June.",
      answer: ["2", "2nd", "second"],
      explanation: "Mina says they’ll submit it on the 2nd of June."
    },

    // Part 4 (10)
    {
      id: "q31",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The process of making learning more stable is called ______.",
      answer: ["consolidation"],
      explanation: "The lecturer says: “This process is often called consolidation.”"
    },
    {
      id: "q32",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "According to the lecture, what happens at night?",
      options: [
        "The brain forgets most new information",
        "Some new information is stabilised",
        "Learning only happens during dreams",
        "The brain stops working"
      ],
      answer: 1,
      explanation: "The lecturer says some information is stabilised at night."
    },
    {
      id: "q33",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which type of sleep is strongly linked to remembering facts and vocabulary?",
      options: ["Deep sleep", "Dream (REM) sleep", "Light sleep", "No sleep"],
      answer: 0,
      explanation: "Deep sleep is linked to remembering facts and vocabulary."
    },
    {
      id: "q34",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Dream sleep is also known as ______.",
      answer: ["REM"],
      explanation: "The lecture calls dream sleep REM."
    },
    {
      id: "q35",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "REM sleep has been associated with ______.",
      options: ["muscle growth", "creativity and connecting ideas", "memorising phone numbers", "avoiding naps"],
      answer: 1,
      explanation: "REM is linked to creativity and connecting ideas."
    },
    {
      id: "q36",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Sleep is not helpful if learners do not practise ______.",
      answer: ["correctly"],
      explanation: "The lecturer says correct practice is needed to consolidate useful information."
    },
    {
      id: "q37",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "What may happen if a nap is too long?",
      options: ["Better memory immediately", "Grogginess", "Increased caffeine tolerance", "No effect"],
      answer: 1,
      explanation: "A long nap may cause grogginess, making study less effective afterwards."
    },
    {
      id: "q38",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the advice. Write ONE WORD ONLY.",
      question: "Students should limit ______ late in the day.",
      answer: ["caffeine"],
      explanation: "The lecture advises limiting caffeine late in the day."
    },
    {
      id: "q39",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the advice. Write ONE WORD ONLY.",
      question: "Students should review key material shortly before ______.",
      answer: ["bedtime"],
      explanation: "The lecture says to review shortly before bedtime."
    },
    {
      id: "q40",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the advice. Write ONE WORD ONLY.",
      question: "Students should prioritise a regular ______.",
      answer: ["schedule"],
      explanation: "The lecture recommends a regular schedule."
    }
  ];

  // -----------------------------
  // Added questions (50) — q41–q90
  // -----------------------------

  QUESTIONS.push(
    {
      id: "q41",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Many people assume that learning happens only while we are ______.",
      answer: ["awake", "Awake"],
      explanation: "The lecturer says people assume learning happens only while we are awake."
    },
    {
      id: "q42",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "What idea does the lecturer challenge at the start of the talk?",
      options: [
        "Learning happens only while we are awake",
        "Deep sleep is the same as REM sleep",
        "Naps always make study less effective",
        "Caffeine improves memory during sleep"
      ],
      answer: 0,
      explanation: "The talk begins by challenging the idea that learning happens only when we are awake."
    },
    {
      id: "q43",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The lecturer says sleep plays a ______ role in learning.",
      answer: ["major", "Major"],
      explanation: "He states that sleep plays a major role in learning."
    },
    {
      id: "q44",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "During the day, the brain ______ new information.",
      answer: ["collects", "Collects"],
      explanation: "The lecture says the brain collects new information during the day."
    },
    {
      id: "q45",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "According to the lecturer, sleep supports learning mainly by:",
      options: [
        "stabilising new information and replaying patterns of activity",
        "replacing the need to practise during the day",
        "stopping the brain from processing any information",
        "making caffeine more effective for studying"
      ],
      answer: 0,
      explanation: "The lecture mentions stabilising information and replaying patterns of activity during sleep."
    },
    {
      id: "q46",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "At night, some of the day's information is ______, which helps it last longer.",
      answer: ["stabilised", "stabilized"],
      explanation: "The lecturer says some information is stabilised at night."
    },
    {
      id: "q47",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Why does stabilising information matter, according to the lecturer?",
      options: ["It helps learning last longer", "It prevents any new learning the next day", "It guarantees high test scores", "It eliminates the need for revision"],
      answer: 0,
      explanation: "He says stabilisation helps information last longer."
    },
    {
      id: "q48",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Stabilising information helps it last ______.",
      answer: ["longer", "Longer"],
      explanation: "The lecturer explains that stabilisation helps learning last longer."
    },
    {
      id: "q49",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "One reason sleep helps learning is that the brain:",
      options: [
        "replays patterns of activity linked to earlier learning",
        "stores all information only in REM sleep",
        "forgets most of what was learned during the day",
        "works best only when caffeine is consumed late"
      ],
      answer: 0,
      explanation: "The lecture says the brain replays patterns of activity linked to what was learned."
    },
    {
      id: "q50",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The brain replays ______ of activity linked to what was learned earlier.",
      answer: ["patterns", "Patterns"],
      explanation: "He says the brain replays patterns of activity."
    },
    {
      id: "q51",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The brain replays patterns of ______ linked to earlier learning.",
      answer: ["activity", "Activity"],
      explanation: "The phrase in the talk is “patterns of activity”."
    },
    {
      id: "q52",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which statement matches the lecturer's description of different sleep stages?",
      options: [
        "Deep sleep is linked to facts and vocabulary, while REM is linked to creativity",
        "REM sleep is linked to facts and vocabulary, while deep sleep is linked to creativity",
        "All sleep stages have exactly the same effect on learning",
        "Only short naps, not night sleep, support learning"
      ],
      answer: 0,
      explanation: "Deep sleep is linked to remembering facts/vocabulary, while REM is linked to creativity and connecting ideas."
    },
    {
      id: "q53",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Deep sleep is strongly linked to remembering ______.",
      answer: ["facts", "Facts"],
      explanation: "The lecturer says deep sleep is strongly linked to remembering facts and vocabulary."
    },
    {
      id: "q54",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Deep sleep is strongly linked to remembering facts and ______.",
      answer: ["vocabulary", "Vocabulary"],
      explanation: "He pairs “facts and vocabulary” when describing deep sleep."
    },
    {
      id: "q55",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which outcome is linked to REM (dream) sleep rather than deep sleep?",
      options: [
        "Creativity and connecting ideas",
        "Remembering facts and vocabulary",
        "Becoming fully alert immediately after a long nap",
        "Eliminating the need to practise correctly"
      ],
      answer: 0,
      explanation: "The lecture links REM sleep to creativity and connecting ideas."
    },
    {
      id: "q56",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The lecturer says sleep is not a ______ solution for learning.",
      answer: ["magic", "Magic"],
      explanation: "He states that sleep is not a magic solution."
    },
    {
      id: "q57",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Why does the lecturer say sleep is not a “magic solution”?",
      options: [
        "Without correct practice, there is little useful information to consolidate",
        "Because the brain stops working during sleep",
        "Because naps always damage memory",
        "Because REM sleep prevents consolidation"
      ],
      answer: 0,
      explanation: "The lecturer says practice quality matters; otherwise there is little useful information to consolidate."
    },
    {
      id: "q58",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "If learners do not practise correctly, there is little useful information to ______.",
      answer: ["consolidate", "Consolidate"],
      explanation: "The lecture says there is little useful information to consolidate without correct practice."
    },
    {
      id: "q59",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "What does the lecturer imply about practice and sleep?",
      options: [
        "Sleep helps most when learners practise correctly",
        "Sleep helps even if learners practise incorrectly",
        "Practice is unnecessary if learners sleep deeply",
        "Practice matters only for creativity, not memory"
      ],
      answer: 0,
      explanation: "He notes that correct practice is needed for sleep to consolidate useful information."
    },
    {
      id: "q60",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The lecturer says another important factor is ______.",
      answer: ["timing", "Timing"],
      explanation: "He introduces timing as another factor affecting learning outcomes."
    },
    {
      id: "q61",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which topic does the lecturer use to explain the importance of timing?",
      options: ["Naps", "Fish migration", "Museum opening hours", "Online payments"],
      answer: 0,
      explanation: "He discusses short naps and long naps to illustrate timing effects."
    },
    {
      id: "q62",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Short ______ can improve alertness.",
      answer: ["naps", "nap", "Naps", "Nap"],
      explanation: "The lecture says short naps can improve alertness."
    },
    {
      id: "q63",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "What benefit of short naps does the lecturer mention?",
      options: [
        "They can improve alertness",
        "They guarantee high exam results",
        "They replace the need for sleep at night",
        "They always increase creativity immediately"
      ],
      answer: 0,
      explanation: "He says short naps can improve alertness."
    },
    {
      id: "q64",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Short naps can improve ______.",
      answer: ["alertness", "Alertness"],
      explanation: "Alertness is the benefit mentioned for short naps."
    },
    {
      id: "q65",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which option best summarises what the lecturer says about naps?",
      options: [
        "Short naps can help, but very long naps may cause grogginess",
        "All naps are harmful for learning",
        "Only long naps improve learning",
        "Naps are unrelated to alertness"
      ],
      answer: 0,
      explanation: "He contrasts short naps (alertness) with too-long naps (grogginess)."
    },
    {
      id: "q66",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "A nap that is too long may cause ______.",
      answer: ["grogginess", "Grogginess"],
      explanation: "The lecturer warns that a nap that is too long may cause grogginess."
    },
    {
      id: "q67",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Why can grogginess make studying less effective?",
      options: [
        "It can make study less effective afterwards",
        "It prevents the brain from collecting information during the day",
        "It improves vocabulary recall too much",
        "It guarantees high scores without revision"
      ],
      answer: 0,
      explanation: "He says grogginess makes study less effective afterwards."
    },
    {
      id: "q68",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "Grogginess can make study less ______ afterwards.",
      answer: ["effective", "Effective"],
      explanation: "The lecture says grogginess can make study less effective afterwards."
    },
    {
      id: "q69",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which set of recommendations is mentioned in the lecture?",
      options: [
        "Keep a regular schedule, limit caffeine late in the day, and review key material before bedtime",
        "Avoid all naps, drink caffeine at midnight, and skip revision",
        "Study only in the morning and never review vocabulary",
        "Change sleep times daily to train flexibility"
      ],
      answer: 0,
      explanation: "He recommends a regular schedule, limiting late caffeine, and reviewing key material shortly before bedtime."
    },
    {
      id: "q70",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the advice. Write ONE WORD ONLY.",
      question: "Students should prioritise a ______ schedule.",
      answer: ["regular", "Regular"],
      explanation: "The advice includes prioritising a regular schedule."
    },
    {
      id: "q71",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "What does the lecturer advise students to limit late in the day?",
      options: ["Caffeine", "Water", "Fruits", "Exercise"],
      answer: 0,
      explanation: "He advises limiting caffeine late in the day."
    },
    {
      id: "q72",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the advice. Write ONE WORD ONLY.",
      question: "Students should limit caffeine ______ in the day.",
      answer: ["late", "Late"],
      explanation: "The lecture says to limit caffeine late in the day."
    },
    {
      id: "q73",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "When does the lecturer suggest reviewing key material?",
      options: ["Shortly before bedtime", "Immediately after waking up", "Only at lunchtime", "During a very long nap"],
      answer: 0,
      explanation: "He suggests reviewing key material shortly before bedtime."
    },
    {
      id: "q74",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the advice. Write ONE WORD ONLY.",
      question: "Students should review ______ material shortly before bedtime.",
      answer: ["key", "Key"],
      explanation: "The phrase used is “review key material shortly before bedtime”."
    },
    {
      id: "q75",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "What does the lecturer say these habits will NOT do?",
      options: ["Guarantee high scores", "Support the brain's ability to store learning", "Help organise learning over time", "Reduce the negative effects of poor timing"],
      answer: 0,
      explanation: "He says these habits do not guarantee high scores."
    },
    {
      id: "q76",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "These habits do not guarantee high ______.",
      answer: ["scores", "Scores"],
      explanation: "The lecturer says the habits do not guarantee high scores."
    },
    {
      id: "q77",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "According to the lecturer, these habits can support the brain's ability to:",
      options: ["store and organise learning over time", "learn without any practice", "avoid needing sleep completely", "replace all revision with caffeine"],
      answer: 0,
      explanation: "He concludes that the habits can support storing and organising learning over time."
    },
    {
      id: "q78",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "They can support the brain's ability to store and ______ learning.",
      answer: ["organise", "organize", "Organise", "Organize"],
      explanation: "The final sentence mentions the ability to store and organise learning over time."
    },
    {
      id: "q79",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The lecturer says these habits can support learning over ______.",
      answer: ["time", "Time"],
      explanation: "He says the brain can store and organise learning over time."
    },
    {
      id: "q80",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which statement is closest to the lecturer's main message?",
      options: [
        "Sleep can support learning, but it works best alongside good practice and sensible habits",
        "Sleep alone is enough to guarantee excellent exam results",
        "Only naps matter for learning; night sleep is irrelevant",
        "Learning happens only when people are awake"
      ],
      answer: 0,
      explanation: "He explains that sleep supports learning, but practice and habits still matter."
    },
    {
      id: "q81",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "When does the lecturer say the brain collects new information?",
      options: ["During the day", "Only during REM sleep", "Only during deep sleep", "Only during naps"],
      answer: 0,
      explanation: "He states: “During the day, the brain collects new information.”"
    },
    {
      id: "q82",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which of the following is NOT mentioned as advice in the lecture?",
      options: [
        "Prioritise a regular schedule",
        "Limit caffeine late in the day",
        "Review key material shortly before bedtime",
        "Do intense exercise immediately before sleeping"
      ],
      answer: 3,
      explanation: "The lecture mentions schedule, caffeine, and reviewing material, but not intense exercise before sleeping."
    },
    {
      id: "q83",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "What does the lecturer mean by saying “not all sleep is the same”?",
      options: [
        "Different sleep stages are linked to different learning outcomes",
        "Sleep has no effect on learning at all",
        "Only REM sleep exists",
        "All sleep stages have identical effects"
      ],
      answer: 0,
      explanation: "He contrasts deep sleep (facts/vocabulary) with REM (creativity/connecting ideas)."
    },
    {
      id: "q84",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which pairing is supported by the lecture?",
      options: [
        "Deep sleep → facts and vocabulary; REM sleep → creativity",
        "Deep sleep → creativity; REM sleep → facts and vocabulary",
        "Deep sleep → grogginess; REM sleep → alertness",
        "Deep sleep → caffeine tolerance; REM sleep → no learning"
      ],
      answer: 0,
      explanation: "The lecture links deep sleep to facts/vocabulary and REM to creativity."
    },
    {
      id: "q85",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The lecturer says the brain ______ patterns of activity linked to earlier learning.",
      answer: ["replays", "Replays"],
      explanation: "He says the brain replays patterns of activity linked to what was learned earlier."
    },
    {
      id: "q86",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which title best fits the lecture segment in Part 4?",
      options: [
        "How sleep supports learning and memory",
        "How to book a sports court online",
        "Museum rules for visitors with children",
        "Choosing a topic for a sociology project"
      ],
      answer: 0,
      explanation: "The lecture focuses on sleep, consolidation, and study habits."
    },
    {
      id: "q87",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "These habits can support the brain's ability to ______ learning over time.",
      answer: ["store", "Store"],
      explanation: "The lecturer says the habits can support the brain’s ability to store and organise learning over time."
    },
    {
      id: "q88",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "In the final sentence, “over time” most nearly suggests that learning is stored and organised:",
      options: [
        "gradually across days and weeks",
        "instantly within seconds",
        "only during one long nap",
        "only if caffeine is avoided completely"
      ],
      answer: 0,
      explanation: "“Over time” implies a gradual process rather than an instant result."
    },
    {
      id: "q89",
      partId: "p4",
      type: "multipleChoice",
      say: P4,
      context: "Part 4: Choose the correct answer.",
      question: "Which situation does the lecturer suggest could reduce how effective studying is after resting?",
      options: [
        "Taking a nap that is too long and feeling groggy afterwards",
        "Taking a short nap that improves alertness",
        "Keeping a regular sleep schedule",
        "Reviewing key material before bedtime"
      ],
      answer: 0,
      explanation: "A too-long nap may cause grogginess, making study less effective afterwards."
    },
    {
      id: "q90",
      partId: "p4",
      type: "fillInTheBlank",
      say: P4,
      context: "Part 4: Complete the notes. Write ONE WORD ONLY.",
      question: "The lecturer says that at ______, some new information is stabilised.",
      answer: ["night", "Night"],
      explanation: "He says that at night, some information is stabilised."
    }
  );

  // -----------------------------
  // Added questions (30) — q91–q120 (to reach bank size 120 for Run=40)
  // -----------------------------

  QUESTIONS.push(
    // Part 1 — additional (10)
    {
      id: "q91",
      partId: "p1",
      type: "multipleChoice",
      say: P1,
      context: "Part 1: Choose the correct answer.",
      question: "What does the caller want to book?",
      options: ["A swimming lesson", "A badminton court", "A tennis coach", "A fitness class"],
      answer: 1,
      explanation: "The caller says he wants to book a badminton court."
    },
    {
      id: "q92",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD ONLY.",
      question: "The name of the sports centre is ______ Sports Centre.",
      answer: ["Northgate", "NORTHGATE"],
      explanation: "The assistant answers: “Northgate Sports Centre, bookings desk.”"
    },
    {
      id: "q93",
      partId: "p1",
      type: "multipleChoice",
      say: P1,
      context: "Part 1: Choose the correct answer.",
      question: "Which department does the assistant mention?",
      options: ["Customer service", "Bookings desk", "First aid desk", "Equipment hire"],
      answer: 1,
      explanation: "The assistant says: “bookings desk.”"
    },
    {
      id: "q94",
      partId: "p1",
      type: "multipleChoice",
      say: P1,
      context: "Part 1: Choose the correct answer.",
      question: "How long is the booking?",
      options: ["30 minutes", "One hour", "Two hours", "Three hours"],
      answer: 1,
      explanation: "They agree it is just one hour."
    },
    {
      id: "q95",
      partId: "p1",
      type: "multipleChoice",
      say: P1,
      context: "Part 1: Choose the correct answer.",
      question: "What other time is available besides 7 p.m.?",
      options: ["5 p.m.", "6 p.m.", "8 p.m.", "9 p.m."],
      answer: 1,
      explanation: "The assistant offers 6 p.m. or 7 p.m."
    },
    {
      id: "q96",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "The assistant also offers Court ______ as an option.",
      answer: ["2", "two"],
      explanation: "The assistant asks: Court 2 or Court 4?"
    },
    {
      id: "q97",
      partId: "p1",
      type: "multipleChoice",
      say: P1,
      context: "Part 1: Choose the correct answer.",
      question: "What is mentioned as an alternative to paying online?",
      options: ["Pay by cheque", "Pay at reception when he arrives", "Pay by bank transfer", "Pay in advance by phone"],
      answer: 1,
      explanation: "The assistant says he can pay online, or at reception when he arrives."
    },
    {
      id: "q98",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD ONLY.",
      question: "He should collect the key card from ______.",
      answer: ["reception", "Reception"],
      explanation: "The assistant says to collect the key card from reception."
    },
    {
      id: "q99",
      partId: "p1",
      type: "multipleChoice",
      say: P1,
      context: "Part 1: Choose the correct answer.",
      question: "Why does the assistant ask the caller to arrive early?",
      options: ["To warm up on the court", "To collect the key card", "To meet the coach", "To complete a fitness test"],
      answer: 1,
      explanation: "He must arrive early to collect the key card from reception."
    },
    {
      id: "q100",
      partId: "p1",
      type: "fillInTheBlank",
      say: P1,
      context: "Part 1: Complete the booking details. Write ONE WORD AND/OR A NUMBER.",
      question: "The booking starts at ______ p.m.",
      answer: ["7", "7pm", "7 p.m.", "seven"],
      explanation: "They confirm 7 to 8 p.m."
    },

    // Part 2 — additional (10)
    {
      id: "q101",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "Where is the ticket desk located?",
      options: ["Outside the building", "Directly inside the front doors", "Upstairs beside the café", "In Gallery One"],
      answer: 1,
      explanation: "The guide says the ticket desk is directly inside the front doors."
    },
    {
      id: "q102",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD ONLY.",
      question: "Visitors with a backpack should use the ______.",
      answer: ["lockers", "Lockers"],
      explanation: "The guide asks visitors with backpacks to use the lockers."
    },
    {
      id: "q103",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "Where can you collect an audio guide?",
      options: [
        "From the café on the first floor",
        "From the information counter beside the gift shop",
        "From the lockers area",
        "From the large map in Gallery One"
      ],
      answer: 1,
      explanation: "The guide says to collect an audio guide from the information counter beside the gift shop."
    },
    {
      id: "q104",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD ONLY.",
      question: "The free tour begins at the large ______ in Gallery One.",
      answer: ["map", "Map"],
      explanation: "The guide says it starts at the large map in Gallery One."
    },
    {
      id: "q105",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "In an emergency, what is the nearest exit from Gallery Two?",
      options: [
        "Through the main entrance on River Road",
        "Through the side corridor marked in green",
        "Up the café stairs to the first floor",
        "Through the ship model gallery"
      ],
      answer: 1,
      explanation: "The guide mentions the nearest exit is through the side corridor marked in green."
    },
    {
      id: "q106",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD ONLY.",
      question: "The emergency corridor is marked in ______.",
      answer: ["green", "Green"],
      explanation: "The guide says the corridor is marked in green."
    },
    {
      id: "q107",
      partId: "p2",
      type: "multipleChoice",
      say: P2,
      context: "Part 2: Choose the correct answer.",
      question: "Where is the reading area mentioned in the talk?",
      options: [
        "Next to the café on the first floor",
        "Behind the ticket desk",
        "Inside the ship model gallery",
        "Outside the main entrance"
      ],
      answer: 0,
      explanation: "The guide says the café is upstairs on the first floor next to the reading area."
    },
    {
      id: "q108",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD ONLY.",
      question: "The café is on the ______ floor.",
      answer: ["first", "First"],
      explanation: "The guide says the café is upstairs on the first floor."
    },
    {
      id: "q109",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD ONLY.",
      question: "The activity room is behind the café ______.",
      answer: ["stairs", "Stairs"],
      explanation: "The guide says the activity room is behind the café stairs."
    },
    {
      id: "q110",
      partId: "p2",
      type: "fillInTheBlank",
      say: P2,
      context: "Part 2: Complete the information. Write ONE WORD ONLY.",
      question: "The main entrance is on River ______.",
      answer: ["Road", "road"],
      explanation: "The guide says the main entrance is on River Road."
    },

    // Part 3 — additional (10)
    {
      id: "q111",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD ONLY.",
      question: "Mina and Owen are discussing a ______ project.",
      answer: ["sociology", "Sociology"],
      explanation: "Mina says: “the sociology project.”"
    },
    {
      id: "q112",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "What topic does Owen mention first?",
      options: ["Co-working spaces", "Remote work", "City museums", "Sleep and learning"],
      answer: 1,
      explanation: "Owen says he was thinking about remote work."
    },
    {
      id: "q113",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD ONLY.",
      question: "They could focus on one area of the ______.",
      answer: ["city", "City"],
      explanation: "Mina suggests focusing on one area of the city."
    },
    {
      id: "q114",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "What two methods do they plan to use for data collection?",
      options: [
        "Short interviews and a questionnaire",
        "A laboratory experiment and a quiz",
        "A debate and a poster",
        "Online payments and a timetable"
      ],
      answer: 0,
      explanation: "Mina suggests short interviews and a simple questionnaire."
    },
    {
      id: "q115",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD ONLY.",
      question: "They decide to go to the Central ______ co-working space.",
      answer: ["Hub", "hub"],
      explanation: "Mina says: “the Central Hub co-working space.”"
    },
    {
      id: "q116",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "Where will they meet?",
      options: ["Inside the library", "Outside the main entrance", "At the café upstairs", "In Gallery Two"],
      answer: 1,
      explanation: "They agree to meet outside the main entrance."
    },
    {
      id: "q117",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD ONLY.",
      question: "Owen says he will draft the questionnaire ______.",
      answer: ["tonight", "Tonight"],
      explanation: "Owen says: “I’ll draft the questionnaire tonight.”"
    },
    {
      id: "q118",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "What do they say they need for the final report?",
      options: [
        "A short summary and a chart",
        "A long essay and a video",
        "A map of the museum",
        "A payment receipt"
      ],
      answer: 0,
      explanation: "Owen says they need a short summary and a chart."
    },
    {
      id: "q119",
      partId: "p3",
      type: "multipleChoice",
      say: P3,
      context: "Part 3: Choose the correct answer.",
      question: "What will their bar chart show?",
      options: [
        "How often people use the space each week",
        "How much the museum tickets cost",
        "How many hours of sleep students get",
        "How many courts the sports centre has"
      ],
      answer: 0,
      explanation: "Mina suggests a bar chart showing how often people use the space each week."
    },
    {
      id: "q120",
      partId: "p3",
      type: "fillInTheBlank",
      say: P3,
      context: "Part 3: Complete the notes. Write ONE WORD ONLY.",
      question: "Mina says they can ______ the questions together.",
      answer: ["review", "Review"],
      explanation: "Mina says they can review them together."
    }
  );

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
