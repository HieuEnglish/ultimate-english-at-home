/* assets/data/tests-13-18-listening.js
   Question bank: Ages 13–18 • Listening (IELTS-inspired)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-13-18-listening"

   Notes:
   - 4 parts (P1–P4). Questions are grouped by partId.
   - Audio is produced by the runner using the browser's Speech Synthesis (TTS).
   - "say" contains the part transcript. (It is duplicated across questions for simplicity.)
   - Fill-in answers can be a string or an array of accepted answers.
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-listening";

  // -----------------------------
  // Part transcripts (read by TTS)
  // -----------------------------

  const P1 =
    "Receptionist: Good morning, Brookside Community Centre. How can I help? " +
    "Student: Hi, I'd like to register for the evening presentation skills course. " +
    "Receptionist: Sure. Can I take your full name? " +
    "Student: It's Maya Patel. That's P-A-T-E-L. " +
    "Receptionist: Thank you. And a contact number? " +
    "Student: 0905 381 204. " +
    "Receptionist: Great. The course runs for four Tuesdays, starting on the 12th of March, from 6:30 to 8:00 p.m. " +
    "It's in Room 14 on the first floor. " +
    "Student: How much is it? " +
    "Receptionist: The fee is 320,000 dong, and it includes printed handouts. You can pay online or at the front desk. " +
    "Student: I'll pay online. Do I need to bring anything? " +
    "Receptionist: Just a notebook. See you on the 12th.";

  const P2 =
    "Welcome to the Riverside Art Museum. The building opens at 9:30 a.m., but guided tours begin at 10 a.m. " +
    "The main entrance is on King Street. The café is next to the lobby, and the lockers are opposite the ticket desk. " +
    "Photography is allowed without flash in most galleries, but not in the special exhibition on the second floor. " +
    "On Saturdays, the museum stays open until 8 p.m.; on other days it closes at 6 p.m. " +
    "Tickets for adults are 9 dollars, and students pay 6. " +
    "If you arrive by bus, take route 17 and get off at Market Square, then walk two minutes.";

  const P3 =
    "Liam: We need to choose a topic for our business project. " +
    "Nora: How about reusable packaging? Many cafés are switching to deposit cups. " +
    "Liam: Good idea. We could compare two local brands. " +
    "Nora: Let's interview customers outside the station on Friday afternoon. " +
    "Liam: Friday might be too busy. Could we do Saturday morning instead? " +
    "Nora: Okay. And we should also email the café manager to ask about costs. " +
    "Liam: I'll write the email. You can design the questionnaire. " +
    "Nora: Deal. For the final presentation, should we use slides or a poster? " +
    "Liam: Slides are safer, and we can include a short chart. " +
    "Nora: Then let's meet in the library at 2:30 to plan the chart.";

  const P4 =
    "In today's short lecture, we'll look at the urban heat island effect. " +
    "Cities can be several degrees warmer than nearby rural areas, mainly because dark surfaces like asphalt absorb sunlight, " +
    "and tall buildings reduce airflow. One common response is to increase shade. Street trees can lower surface temperatures " +
    "and make walking more comfortable, but they need water and space for roots. " +
    "Another strategy is reflective roofing: light-coloured roofs bounce more sunlight back into the atmosphere. " +
    "Some cities also install green roofs, which add plants on top of buildings. These can reduce indoor temperatures and slow storm-water runoff, " +
    "but they are heavier and cost more to maintain. Finally, transport choices matter: reducing traffic can cut heat from engines and lower air pollution, " +
    "which sometimes traps heat. The best plans combine several measures rather than relying on only one.";

  const QUESTIONS = [
    // -----------------------------
    // Part 1 (p1) — booking / form completion
    // -----------------------------
    {
      id: "q1",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course. Complete the information.",
      question: "Write the student's first name.",
      answer: "Maya",
      difficulty: "easy",
      explanation: "The student says: 'It's Maya Patel.'"
    },
    {
      id: "q2",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course. Complete the information.",
      question: "Write the student's family name.",
      answer: "Patel",
      difficulty: "easy",
      explanation: "The student spells the family name: P-A-T-E-L."
    },
    {
      id: "q3",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course. Complete the information.",
      question: "Write the contact number.",
      answer: ["0905 381 204", "0905381204"],
      difficulty: "medium",
      explanation: "The student gives the number: 0905 381 204."
    },
    {
      id: "q4",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course. Complete the information.",
      question: "The course starts on the ______ of March.",
      answer: ["12", "12th"],
      difficulty: "easy",
      explanation: "The receptionist says: 'starting on the 12th of March.'"
    },
    {
      id: "q5",
      partId: "p1",
      type: "listenChoice",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "What time does the course run?",
      options: ["6:30–8:00 p.m.", "5:30–7:00 p.m.", "7:00–8:30 p.m.", "6:00–7:30 p.m."],
      answer: 0,
      difficulty: "medium",
      explanation: "The receptionist says: 'from 6:30 to 8:00 p.m.'"
    },
    {
      id: "q6",
      partId: "p1",
      type: "listenChoice",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "Where is the course held?",
      options: ["Room 14", "Room 40", "Room 4", "Room 18"],
      answer: 0,
      difficulty: "easy",
      explanation: "The receptionist says: 'It's in Room 14.'"
    },
    {
      id: "q7",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "Write the course fee in dong.",
      answer: ["320,000", "320000"],
      difficulty: "easy",
      explanation: "The receptionist says: 'The fee is 320,000 dong.'"
    },
    {
      id: "q8",
      partId: "p1",
      type: "listenTrueFalse",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "Printed handouts are included in the fee.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "The receptionist says the fee includes printed handouts."
    },

    // -----------------------------
    // Part 2 (p2) — public announcement / multiple choice
    // -----------------------------
    {
      id: "q9",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "What time does the museum building open?",
      options: ["9:30 a.m.", "10:00 a.m.", "9:00 a.m.", "11:00 a.m."],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker says: 'The building opens at 9:30 a.m.'"
    },
    {
      id: "q10",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum.",
      question: "Guided tours begin at ______ a.m.",
      answer: ["10", "10am", "10:00"],
      difficulty: "easy",
      explanation: "The speaker says tours begin at 10 a.m."
    },
    {
      id: "q11",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum.",
      question: "Where are the lockers?",
      options: [
        "Opposite the ticket desk",
        "Behind the café",
        "Inside the special exhibition",
        "Next to the main entrance"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Lockers are opposite the ticket desk."
    },
    {
      id: "q12",
      partId: "p2",
      type: "listenTrueFalse",
      say: P2,
      context: "Part 2: An announcement at a museum.",
      question: "Photography is allowed without flash in every gallery.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "medium",
      explanation: "Photography is not allowed in the special exhibition on the second floor."
    },
    {
      id: "q13",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum.",
      question: "How late is the museum open on Saturdays?",
      options: ["8 p.m.", "6 p.m.", "7 p.m.", "9 p.m."],
      answer: 0,
      difficulty: "easy",
      explanation: "On Saturdays the museum stays open until 8 p.m."
    },
    {
      id: "q14",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum.",
      question: "Student ticket price: ______ dollars.",
      answer: ["6", "six"],
      difficulty: "easy",
      explanation: "Students pay 6 dollars."
    },
    {
      id: "q15",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum.",
      question: "Which bus route should visitors take? Route ______.",
      answer: ["17", "seventeen"],
      difficulty: "medium",
      explanation: "The speaker says: 'take route 17.'"
    },
    {
      id: "q16",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum.",
      question: "Where is the main entrance?",
      options: ["On King Street", "On Market Square", "On River Road", "On Queen Street"],
      answer: 0,
      difficulty: "easy",
      explanation: "The main entrance is on King Street."
    },

    // -----------------------------
    // Part 3 (p3) — student discussion / planning details
    // -----------------------------
    {
      id: "q17",
      partId: "p3",
      type: "listenChoice",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "What topic do they choose?",
      options: ["Reusable packaging", "Online advertising", "Sports nutrition", "Public transport"],
      answer: 0,
      difficulty: "easy",
      explanation: "Nora suggests reusable packaging and Liam agrees."
    },
    {
      id: "q18",
      partId: "p3",
      type: "listenChoice",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "Why do they change the interview day?",
      options: [
        "Friday might be too busy",
        "The station is closed on Friday",
        "They have an exam on Saturday",
        "The manager asks them to wait"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Liam says Friday might be too busy."
    },
    {
      id: "q19",
      partId: "p3",
      type: "listenFillInTheBlank",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "They decide to interview customers on ______ morning.",
      answer: ["Saturday", "sat"],
      difficulty: "easy",
      explanation: "They change the plan to Saturday morning."
    },
    {
      id: "q20",
      partId: "p3",
      type: "listenFillInTheBlank",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "Where will they interview customers? Outside the ______.",
      answer: ["station", "train station"],
      difficulty: "medium",
      explanation: "Nora suggests interviewing customers outside the station."
    },
    {
      id: "q21",
      partId: "p3",
      type: "listenChoice",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "Who will write the email to the café manager?",
      options: ["Liam", "Nora", "Their teacher", "A classmate"],
      answer: 0,
      difficulty: "easy",
      explanation: "Liam says: 'I'll write the email.'"
    },
    {
      id: "q22",
      partId: "p3",
      type: "listenChoice",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "What will Nora do?",
      options: ["Design the questionnaire", "Draw the posters", "Book the museum", "Call the bus company"],
      answer: 0,
      difficulty: "easy",
      explanation: "Liam asks Nora to design the questionnaire."
    },
    {
      id: "q23",
      partId: "p3",
      type: "listenFillInTheBlank",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "They will meet in the ______.",
      answer: "library",
      difficulty: "easy",
      explanation: "They agree to meet in the library."
    },
    {
      id: "q24",
      partId: "p3",
      type: "listenFillInTheBlank",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "The meeting time is ______.",
      answer: ["2:30", "230", "two thirty"],
      difficulty: "medium",
      explanation: "Nora suggests meeting at 2:30."
    },

    // -----------------------------
    // Part 4 (p4) — lecture / sentence completion
    // -----------------------------
    {
      id: "q25",
      partId: "p4",
      type: "listenFillInTheBlank",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Dark surfaces like ______ absorb sunlight.",
      answer: "asphalt",
      difficulty: "easy",
      explanation: "The lecturer mentions asphalt as an example of a dark surface."
    },
    {
      id: "q26",
      partId: "p4",
      type: "listenChoice",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Which is mentioned as a main reason cities are warmer?",
      options: [
        "Dark surfaces absorb heat and buildings reduce airflow",
        "Cities are always closer to the sun",
        "Rural areas produce more engine heat",
        "Trees make air hotter"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The lecture mentions absorption by dark surfaces and reduced airflow."
    },
    {
      id: "q27",
      partId: "p4",
      type: "listenTrueFalse",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Street trees need water and space for roots.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "The lecture says trees need water and space for roots."
    },
    {
      id: "q28",
      partId: "p4",
      type: "listenFillInTheBlank",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Reflective roofing uses ______-coloured roofs.",
      answer: ["light", "lightcoloured", "light-colored", "light coloured"],
      difficulty: "easy",
      explanation: "The lecturer says light-coloured roofs bounce sunlight back."
    },
    {
      id: "q29",
      partId: "p4",
      type: "listenFillInTheBlank",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Green roofs can slow storm-water ______.",
      answer: "runoff",
      difficulty: "medium",
      explanation: "The lecture mentions storm-water runoff."
    },
    {
      id: "q30",
      partId: "p4",
      type: "listenChoice",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "What is one drawback of green roofs?",
      options: [
        "They are heavier and cost more to maintain",
        "They stop all rainfall",
        "They cannot reduce indoor temperatures",
        "They increase traffic"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The lecture says green roofs are heavier and cost more to maintain."
    },
    {
      id: "q31",
      partId: "p4",
      type: "listenFillInTheBlank",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Reducing traffic can cut heat from ______.",
      answer: ["engines", "engine"],
      difficulty: "easy",
      explanation: "The lecture mentions heat from engines."
    },
    {
      id: "q32",
      partId: "p4",
      type: "listenChoice",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "According to the lecture, the best plans…",
      options: [
        "combine several measures",
        "rely on only one measure",
        "avoid all trees in cities",
        "use only dark surfaces"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The lecturer says the best plans combine several measures."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
