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

  // Additional transcripts (still mapped to parts via partId)
  const P1B =
    "Receptionist: Good afternoon, Greenhill Language School. How can I help? " +
    "Student: Hi, I'd like to book a place on the IELTS listening workshop. " +
    "Receptionist: Of course. What's your full name? " +
    "Student: Daniel Wong. That's W-O-N-G. " +
    "Receptionist: Thanks. What's the best phone number to reach you? " +
    "Student: 0981 552 990. " +
    "Receptionist: Great. The workshop is on Saturday the 21st of April, from 9:00 a.m. to 12:00 noon, in Room 6B. " +
    "The fee is 250,000 dong and it includes a practice booklet. " +
    "Student: Great. Do I need to bring anything? " +
    "Receptionist: Yes, please bring headphones.";

  const P2B =
    "Attention passengers on the CityBus network. From Monday, route 5 will be diverted because of roadworks on Bridge Avenue. " +
    "The stop outside Central Park will be closed; please use the temporary stop on Hill Street, beside the post office. " +
    "Buses will run every 12 minutes during the day, and the last service leaves the terminal at 10:40 p.m. " +
    "Tickets can still be bought with a bank card on board.";

  const P3B =
    "Jack: We still need a topic for our class presentation. " +
    "Mia: Let's do online privacy, like how apps collect data. " +
    "Jack: Good. We can use examples from social media and school websites. " +
    "Mia: When should we meet to plan? " +
    "Jack: Thursday at 4:45 in the computer room. " +
    "Mia: Okay. I'll collect examples, and you can write the summary. " +
    "Jack: Deal. Let's keep the presentation to six minutes.";

  const P4B =
    "In this mini-lecture, we'll discuss how sleep supports learning. " +
    "When you review new information, your brain stores it temporarily, but during deep sleep it strengthens connections, " +
    "a process called consolidation. Short naps can also help, especially if they include slow-wave sleep. " +
    "However, using bright screens late at night can delay the release of melatonin, making it harder to fall asleep. " +
    "Caffeine is another factor: because it stays in the body for hours, coffee after 4 p.m. may reduce sleep quality. " +
    "For best results before exams, study earlier, keep a consistent bedtime, and aim for at least eight hours.";

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
      options: ["6:00–7:30 p.m.", "5:30–7:00 p.m.", "7:00–8:30 p.m.", "6:30–8:00 p.m."], answer: 3,
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
      options: ["False", "True"], answer: 1,
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
      options: ["9:00 a.m.", "10:00 a.m.", "9:30 a.m.", "11:00 a.m."], answer: 2,
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
      options: ["Next to the main entrance", "Behind the café", "Inside the special exhibition", "Opposite the ticket desk"], answer: 3,
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
      options: ["False", "True"], answer: 0,
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
      options: ["6 p.m.", "8 p.m.", "7 p.m.", "9 p.m."], answer: 1,
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
      options: ["On River Road", "On Market Square", "On King Street", "On Queen Street"], answer: 2,
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
      options: ["Public transport", "Online advertising", "Sports nutrition", "Reusable packaging"], answer: 3,
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
      options: ["Friday might be too busy", "The station is closed on Friday", "They have an exam on Saturday", "The manager asks them to wait"],
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
      options: ["Nora", "Liam", "Their teacher", "A classmate"], answer: 1,
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
      options: ["Book the museum", "Draw the posters", "Design the questionnaire", "Call the bus company"], answer: 2,
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
      options: ["Trees make air hotter", "Cities are always closer to the sun", "Rural areas produce more engine heat", "Dark surfaces absorb heat and buildings reduce airflow"], answer: 3,
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
      options: ["They stop all rainfall", "They are heavier and cost more to maintain", "They cannot reduce indoor temperatures", "They increase traffic"], answer: 1,
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
      options: ["avoid all trees in cities", "rely on only one measure", "combine several measures", "use only dark surfaces"], answer: 2,
      difficulty: "easy",
      explanation: "The lecturer says the best plans combine several measures."
    },
    {
      id: "q33",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course. Complete the information.",
      question: "Write the name of the community centre.",
      answer: ["Brookside", "Brookside Community Centre", "BrooksideCommunityCentre"],
      difficulty: "medium",
      explanation: "The receptionist answers: \"Brookside Community Centre.\""
    },
    {
      id: "q34",
      partId: "p1",
      type: "listenChoice",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "Which course does Maya want to register for?",
      options: ["The afternoon business course", "The weekend photography course", "The morning debate workshop", "The evening presentation skills course"], answer: 3,
      difficulty: "easy",
      explanation: "She says she wants the evening presentation skills course."
    },
    {
      id: "q35",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course. Complete the information.",
      question: "The course runs for ______ Tuesdays.",
      answer: ["4", "four"],
      difficulty: "easy",
      explanation: "The receptionist says the course runs for four Tuesdays."
    },
    {
      id: "q36",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course. Complete the information.",
      question: "The sessions are on ______.",
      answer: ["Tuesday", "Tuesdays"],
      difficulty: "easy",
      explanation: "The receptionist says the course runs for four Tuesdays."
    },
    {
      id: "q37",
      partId: "p1",
      type: "listenChoice",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "Which floor is the classroom on?",
      options: ["The first floor", "The second floor", "The ground floor", "The basement"],
      answer: 0,
      difficulty: "medium",
      explanation: "The receptionist says it is in Room 14 on the first floor."
    },
    {
      id: "q38",
      partId: "p1",
      type: "listenChoice",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "How can the student pay the fee?",
      options: ["Only in cash on the first night", "Online or at the front desk", "Only by bank transfer", "Only by cheque"], answer: 1,
      difficulty: "easy",
      explanation: "The receptionist says payment can be online or at the front desk."
    },
    {
      id: "q39",
      partId: "p1",
      type: "listenTrueFalse",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "Maya plans to pay at the front desk.",
      options: ["False", "True"], answer: 0,
      difficulty: "easy",
      explanation: "Maya says: \"I'll pay online.\""
    },
    {
      id: "q40",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "Maya needs to bring a ______.",
      answer: "notebook",
      difficulty: "easy",
      explanation: "The receptionist says: \"Just a notebook.\""
    },
    {
      id: "q41",
      partId: "p1",
      type: "listenChoice",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "How many sessions are in the course?",
      options: ["Ten", "Six", "Eight", "Four"], answer: 3,
      difficulty: "easy",
      explanation: "It runs for four Tuesdays (four sessions)."
    },
    {
      id: "q42",
      partId: "p1",
      type: "listenChoice",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "After taking the full name, what does the receptionist ask for?",
      options: ["A contact number", "A home address", "An email address", "A passport number"],
      answer: 0,
      difficulty: "medium",
      explanation: "The receptionist asks for a contact number."
    },
    {
      id: "q43",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1,
      context: "Part 1: A student registers for an evening course. Complete the information.",
      question: "Maya registers for the ______ presentation skills course.",
      answer: ["evening", "eveningpresentation"],
      difficulty: "easy",
      explanation: "She says she wants the evening presentation skills course."
    },
    {
      id: "q44",
      partId: "p1",
      type: "listenChoice",
      say: P1,
      context: "Part 1: A student registers for an evening course.",
      question: "Approximately how long is each session?",
      options: ["2 hours", "1 hour 30 minutes", "45 minutes", "3 hours"], answer: 1,
      difficulty: "hard",
      explanation: "From 6:30 to 8:00 is 1 hour 30 minutes."
    },
    {
      id: "q45",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "Write the name of the museum.",
      answer: ["Riverside", "Riverside Art Museum", "RiversideArtMuseum"],
      difficulty: "easy",
      explanation: "The announcement begins: \"Welcome to the Riverside Art Museum.\""
    },
    {
      id: "q46",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "Where is the café?",
      options: ["On the second floor", "Opposite the ticket desk", "Next to the lobby", "Outside the main entrance"], answer: 2,
      difficulty: "easy",
      explanation: "The speaker says the café is next to the lobby."
    },
    {
      id: "q47",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "The special exhibition is on the ______ floor.",
      answer: ["second", "2nd", "2", "secondfloor"],
      difficulty: "medium",
      explanation: "The speaker mentions the special exhibition on the second floor."
    },
    {
      id: "q48",
      partId: "p2",
      type: "listenTrueFalse",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "Photography without flash is allowed in most galleries.",
      options: ["False", "True"], answer: 1,
      difficulty: "medium",
      explanation: "The speaker says photography is allowed without flash in most galleries."
    },
    {
      id: "q49",
      partId: "p2",
      type: "listenTrueFalse",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "Visitors may use flash photography in most galleries.",
      options: ["False", "True"], answer: 0,
      difficulty: "hard",
      explanation: "The announcement allows photography without flash, so flash is not permitted."
    },
    {
      id: "q50",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "On days other than Saturday, the museum closes at ______ p.m.",
      answer: ["6", "6pm", "six"],
      difficulty: "easy",
      explanation: "The speaker says it closes at 6 p.m. on other days."
    },
    {
      id: "q51",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "Adult ticket price: ______ dollars.",
      answer: ["9", "nine"],
      difficulty: "easy",
      explanation: "The announcement says tickets for adults are 9 dollars."
    },
    {
      id: "q52",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "Where should bus passengers get off?",
      options: ["King Street", "Market Square", "River Road", "Museum Gate"], answer: 1,
      difficulty: "easy",
      explanation: "The speaker says to get off at Market Square."
    },
    {
      id: "q53",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "After getting off the bus, walk ______ minutes.",
      answer: ["2", "two"],
      difficulty: "medium",
      explanation: "The announcement says to walk two minutes."
    },
    {
      id: "q54",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "A visitor arrives at 9:40 a.m. What is correct?",
      options: [
        "They must wait outside because the building is closed",
        "They can join a guided tour immediately",
        "They can enter the building but must wait until 10 a.m. for a guided tour",
        "They can go straight into the special exhibition before 10 a.m."
      ], answer: 2,
      difficulty: "hard",
      explanation: "The building opens at 9:30, but tours begin at 10."
    },
    {
      id: "q55",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "A student visits on Wednesday at 6:30 p.m. What is true?",
      options: ["The café is open but galleries are closed", "The museum is open until 8 p.m.", "Guided tours start at 6:30 p.m.", "The museum is closed"], answer: 3,
      difficulty: "hard",
      explanation: "On other days the museum closes at 6 p.m."
    },
    {
      id: "q56",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "Which statement about the special exhibition is correct?",
      options: ["Photography is not allowed there", "It is on the ground floor", "It is next to the lockers", "It is open only on Saturdays"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says photography is not allowed in the special exhibition."
    },
    {
      id: "q57",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "Photography is allowed without ______ in most galleries.",
      answer: "flash",
      difficulty: "easy",
      explanation: "The speaker says photography is allowed without flash."
    },
    {
      id: "q58",
      partId: "p2",
      type: "listenChoice",
      say: P2,
      context: "Part 2: An announcement at a museum. Answer the questions.",
      question: "How much less do students pay than adults?",
      options: ["2 dollars", "3 dollars", "4 dollars", "5 dollars"], answer: 1,
      difficulty: "medium",
      explanation: "Adults pay 9 dollars and students pay 6, a difference of 3."
    },
    {
      id: "q59",
      partId: "p3",
      type: "listenChoice",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "Who first suggests the project idea?",
      options: ["Their teacher", "Liam", "Nora", "The café manager"], answer: 2,
      difficulty: "medium",
      explanation: "Nora suggests the idea at the start of the discussion."
    },
    {
      id: "q60",
      partId: "p3",
      type: "listenFillInTheBlank",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "Many cafés are switching to deposit ______.",
      answer: "cups",
      difficulty: "easy",
      explanation: "Nora mentions deposit cups when discussing reusable packaging."
    },
    {
      id: "q61",
      partId: "p3",
      type: "listenChoice",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "What do they plan to compare?",
      options: ["Two sports teams", "Two train stations", "Two school clubs", "Two local brands"], answer: 3,
      difficulty: "easy",
      explanation: "They say they could compare two local brands."
    },
    {
      id: "q62",
      partId: "p3",
      type: "listenFillInTheBlank",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "At first, they plan to interview customers on ______ afternoon.",
      answer: ["Friday", "friday"],
      difficulty: "medium",
      explanation: "Nora suggests Friday afternoon before they change the plan."
    },
    {
      id: "q63",
      partId: "p3",
      type: "listenChoice",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "Why do they want to email the café manager?",
      options: ["To ask about costs", "To ask about museum tickets", "To book a bus route", "To cancel the project"],
      answer: 0,
      difficulty: "medium",
      explanation: "They want to ask about costs."
    },
    {
      id: "q64",
      partId: "p3",
      type: "listenChoice",
      say: P3,
      context: "Part 3: Two students plan a business project.",
      question: "For the final presentation, what do they choose?",
      options: ["A poster", "Slides", "A video", "A leaflet"], answer: 1,
      difficulty: "easy",
      explanation: "They decide that slides are safer than a poster."
    },
    {
      id: "q65",
      partId: "p3",
      type: "listenChoice",
      say:
        "Eva: For our economics project, let's compare music subscription services. Ben: Good. We can survey 60 students online and collect responses by Monday night. Eva: I'll create the Google Form, and you can analyse the results in Excel. Ben: Perfect. Let's meet in the café on Tuesday at 5:15 to check the questions. Eva: And we need at least one graph for the report.",
      context: "Part 3: Two students discuss an economics project.",
      question: "What do Eva and Ben decide to compare?",
      options: ["Bus routes to school", "Football training plans", "Music subscription services", "Museum ticket types"], answer: 2,
      difficulty: "easy",
      explanation: "Eva suggests comparing music subscription services."
    },
    {
      id: "q66",
      partId: "p3",
      type: "listenFillInTheBlank",
      say:
        "Eva: For our economics project, let's compare music subscription services. Ben: Good. We can survey 60 students online and collect responses by Monday night. Eva: I'll create the Google Form, and you can analyse the results in Excel. Ben: Perfect. Let's meet in the café on Tuesday at 5:15 to check the questions. Eva: And we need at least one graph for the report.",
      context: "Part 3: Two students discuss an economics project.",
      question: "They plan to survey ______ students.",
      answer: ["60", "sixty"],
      difficulty: "easy",
      explanation: "Ben says they can survey 60 students online."
    },
    {
      id: "q67",
      partId: "p3",
      type: "listenFillInTheBlank",
      say:
        "Eva: For our economics project, let's compare music subscription services. Ben: Good. We can survey 60 students online and collect responses by Monday night. Eva: I'll create the Google Form, and you can analyse the results in Excel. Ben: Perfect. Let's meet in the café on Tuesday at 5:15 to check the questions. Eva: And we need at least one graph for the report.",
      context: "Part 3: Two students discuss an economics project.",
      question: "They want to collect responses by ______ night.",
      answer: ["Monday", "monday"],
      difficulty: "medium",
      explanation: "Ben says to collect responses by Monday night."
    },
    {
      id: "q68",
      partId: "p3",
      type: "listenChoice",
      say:
        "Eva: For our economics project, let's compare music subscription services. Ben: Good. We can survey 60 students online and collect responses by Monday night. Eva: I'll create the Google Form, and you can analyse the results in Excel. Ben: Perfect. Let's meet in the café on Tuesday at 5:15 to check the questions. Eva: And we need at least one graph for the report.",
      context: "Part 3: Two students discuss an economics project.",
      question: "Who will analyse the results in Excel?",
      options: ["Eva", "A volunteer", "Their teacher", "Ben"], answer: 3,
      difficulty: "easy",
      explanation: "Eva says Ben can analyse the results in Excel."
    },
    {
      id: "q69",
      partId: "p3",
      type: "listenFillInTheBlank",
      say:
        "Eva: For our economics project, let's compare music subscription services. Ben: Good. We can survey 60 students online and collect responses by Monday night. Eva: I'll create the Google Form, and you can analyse the results in Excel. Ben: Perfect. Let's meet in the café on Tuesday at 5:15 to check the questions. Eva: And we need at least one graph for the report.",
      context: "Part 3: Two students discuss an economics project.",
      question: "The meeting time is ______.",
      answer: ["5:15", "515", "five fifteen", "fivefifteen"],
      difficulty: "hard",
      explanation: "They agree to meet on Tuesday at 5:15."
    },
    {
      id: "q70",
      partId: "p3",
      type: "listenFillInTheBlank",
      say:
        "Eva: For our economics project, let's compare music subscription services. Ben: Good. We can survey 60 students online and collect responses by Monday night. Eva: I'll create the Google Form, and you can analyse the results in Excel. Ben: Perfect. Let's meet in the café on Tuesday at 5:15 to check the questions. Eva: And we need at least one graph for the report.",
      context: "Part 3: Two students discuss an economics project.",
      question: "They need at least one ______ for the report.",
      answer: ["graph", "a graph"],
      difficulty: "medium",
      explanation: "Eva says they need at least one graph."
    },
    {
      id: "q71",
      partId: "p4",
      type: "listenFillInTheBlank",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "The lecture is about the urban ______ island effect.",
      answer: "heat",
      difficulty: "easy",
      explanation: "The lecturer calls it the urban heat island effect."
    },
    {
      id: "q72",
      partId: "p4",
      type: "listenTrueFalse",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Cities can be several degrees warmer than nearby rural areas.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "The lecturer says cities can be several degrees warmer."
    },
    {
      id: "q73",
      partId: "p4",
      type: "listenFillInTheBlank",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Tall buildings reduce ______.",
      answer: "airflow",
      difficulty: "medium",
      explanation: "The lecture says tall buildings reduce airflow."
    },
    {
      id: "q74",
      partId: "p4",
      type: "listenChoice",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "What is one common response to reduce city heat mentioned in the lecture?",
      options: ["Build taller buildings", "Increase shade", "Paint roads darker", "Reduce street lighting"], answer: 1,
      difficulty: "medium",
      explanation: "The lecturer says one common response is to increase shade."
    },
    {
      id: "q75",
      partId: "p4",
      type: "listenTrueFalse",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Street trees can lower surface temperatures.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "medium",
      explanation: "The lecturer says street trees can lower surface temperatures."
    },
    {
      id: "q76",
      partId: "p4",
      type: "listenChoice",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Street trees can make ______ more comfortable.",
      options: ["Shopping", "Driving", "Flying", "Walking"], answer: 3,
      difficulty: "easy",
      explanation: "The lecture says trees make walking more comfortable."
    },
    {
      id: "q77",
      partId: "p4",
      type: "listenTrueFalse",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Reflective roofs bounce more sunlight back into the atmosphere.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "medium",
      explanation: "The lecture explains that light-coloured roofs reflect sunlight."
    },
    {
      id: "q78",
      partId: "p4",
      type: "listenFillInTheBlank",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Green roofs can reduce ______ temperatures.",
      answer: ["indoor", "inside"],
      difficulty: "medium",
      explanation: "The lecture says green roofs can reduce indoor temperatures."
    },
    {
      id: "q79",
      partId: "p4",
      type: "listenChoice",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Reducing traffic can lower air ______.",
      options: ["Pressure", "Pollution", "Moisture", "Oxygen"], answer: 1,
      difficulty: "medium",
      explanation: "The lecturer says reduced traffic can lower air pollution."
    },
    {
      id: "q80",
      partId: "p4",
      type: "listenTrueFalse",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Air pollution can sometimes trap heat.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "hard",
      explanation: "The lecture says air pollution sometimes traps heat."
    },
    {
      id: "q81",
      partId: "p4",
      type: "listenTrueFalse",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Green roofs add plants on top of buildings.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "The lecturer describes green roofs as plants on top of buildings."
    },
    {
      id: "q82",
      partId: "p4",
      type: "listenChoice",
      say: P4,
      context: "Part 4: A short lecture about cities and heat.",
      question: "Which measure directly increases shade on streets?",
      options: ["Planting street trees", "Using darker asphalt", "Increasing traffic", "Removing roof surfaces"],
      answer: 0,
      difficulty: "medium",
      explanation: "The lecture describes shade as a key response; street trees provide it."
    },

    // -----------------------------
    // Added questions (to meet min bank/run ratio: 90 for Run=30)
    // -----------------------------
    {
      id: "q83",
      partId: "p1",
      type: "listenFillInTheBlank",
      say: P1B,
      context: "Part 1: A student books an IELTS listening workshop. Complete the information.",
      question: "Write the student's family name.",
      answer: ["Wong", "wong"],
      difficulty: "easy",
      explanation: "The student says: 'Daniel Wong' and spells W-O-N-G."
    },
    {
      id: "q84",
      partId: "p1",
      type: "listenChoice",
      say: P1B,
      context: "Part 1: A student books an IELTS listening workshop.",
      question: "What does the receptionist tell the student to bring?",
      options: ["A laptop", "Headphones", "A passport photo", "A calculator"], answer: 1,
      difficulty: "easy",
      explanation: "The receptionist says: 'Please bring headphones.'"
    },
    {
      id: "q85",
      partId: "p2",
      type: "listenFillInTheBlank",
      say: P2B,
      context: "Part 2: A public transport announcement. Answer the questions.",
      question: "From Monday, route ______ will be diverted.",
      answer: ["5", "five"],
      difficulty: "easy",
      explanation: "The announcement says: 'route 5 will be diverted'."
    },
    {
      id: "q86",
      partId: "p2",
      type: "listenTrueFalse",
      say: P2B,
      context: "Part 2: A public transport announcement.",
      question: "The stop outside Central Park will be closed.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker clearly states the Central Park stop will be closed."
    },
    {
      id: "q87",
      partId: "p3",
      type: "listenChoice",
      say: P3B,
      context: "Part 3: Two students plan a class presentation.",
      question: "What topic do they choose?",
      options: ["Sports training", "Healthy eating", "Volunteering", "Online privacy"], answer: 3,
      difficulty: "easy",
      explanation: "Mia suggests online privacy and Jack agrees."
    },
    {
      id: "q88",
      partId: "p3",
      type: "listenFillInTheBlank",
      say: P3B,
      context: "Part 3: Two students plan a class presentation.",
      question: "They agree to meet at ______.",
      answer: ["4:45", "445", "four forty-five", "four forty five"],
      difficulty: "hard",
      explanation: "Jack says: 'Thursday at 4:45 in the computer room.'"
    },
    {
      id: "q89",
      partId: "p4",
      type: "listenFillInTheBlank",
      say: P4B,
      context: "Part 4: A short lecture about sleep and learning.",
      question: "The strengthening process is called ______.",
      answer: ["consolidation", "memory consolidation"],
      difficulty: "medium",
      explanation: "The lecturer says the process is called consolidation."
    },
    {
      id: "q90",
      partId: "p4",
      type: "listenChoice",
      say: P4B,
      context: "Part 4: A short lecture about sleep and learning.",
      question: "What can delay the release of melatonin?",
      options: ["Using bright screens late at night", "Drinking water in the morning", "Walking to school", "Studying in the afternoon"],
      answer: 0,
      difficulty: "medium",
      explanation: "The lecture says bright screens late at night can delay melatonin."
    },
    {
      id: "q91",
      partId: "p4",
      type: "listenTrueFalse",
      say: P4B,
      context: "Part 4: A short lecture about sleep and learning.",
      question: "Sleep helps the brain organise what we learned during the day.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "The lecture explains that sleep supports memory and learning."
    }
  ];

  // Global export (no build step)


  // Added to normalize this bank to 111 items.
  QUESTIONS.push(
    {
      "id": "q92",
      "partId": "p1",
      "type": "listenFillInTheBlank",
      "say": "Receptionist: Good afternoon, Northside Careers Centre. Student: Hello, I want to join the weekend interview skills workshop. Receptionist: Of course. What is your name? Student: Tran Bao Minh. Receptionist: Thank you. The workshop is on the 8th of June from 2 p.m. to 5 p.m. in Room 21. The fee is 280,000 dong, and you should bring a notebook and one printed CV.",
      "context": "Part 1: A student books a workshop.",
      "question": "Write the student's family name.",
      "answer": "Tran",
      "difficulty": "easy",
      "explanation": "The student says Tran Bao Minh."
    },
    {
      "id": "q93",
      "partId": "p1",
      "type": "listenFillInTheBlank",
      "say": "Receptionist: Good afternoon, Northside Careers Centre. Student: Hello, I want to join the weekend interview skills workshop. Receptionist: Of course. What is your name? Student: Tran Bao Minh. Receptionist: Thank you. The workshop is on the 8th of June from 2 p.m. to 5 p.m. in Room 21. The fee is 280,000 dong, and you should bring a notebook and one printed CV.",
      "context": "Part 1: A student books a workshop.",
      "question": "Write the room number.",
      "answer": [
        "21",
        "room 21"
      ],
      "difficulty": "easy",
      "explanation": "The workshop is in Room 21."
    },
    {
      "id": "q94",
      "partId": "p1",
      "type": "listenChoice",
      "say": "Receptionist: Good afternoon, Northside Careers Centre. Student: Hello, I want to join the weekend interview skills workshop. Receptionist: Of course. What is your name? Student: Tran Bao Minh. Receptionist: Thank you. The workshop is on the 8th of June from 2 p.m. to 5 p.m. in Room 21. The fee is 280,000 dong, and you should bring a notebook and one printed CV.",
      "context": "Part 1: A student books a workshop.",
      "question": "What should the student bring besides a notebook?",
      "options": [
        "A laptop",
        "A printed CV",
        "A passport photo",
        "A textbook"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "The student should bring one printed CV."
    },
    {
      "id": "q95",
      "partId": "p1",
      "type": "listenChoice",
      "say": "Receptionist: Good afternoon, Northside Careers Centre. Student: Hello, I want to join the weekend interview skills workshop. Receptionist: Of course. What is your name? Student: Tran Bao Minh. Receptionist: Thank you. The workshop is on the 8th of June from 2 p.m. to 5 p.m. in Room 21. The fee is 280,000 dong, and you should bring a notebook and one printed CV.",
      "context": "Part 1: A student books a workshop.",
      "question": "How long is the workshop?",
      "options": [
        "Two hours",
        "Three hours",
        "Four hours",
        "Five hours"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "It runs from 2 to 5 p.m."
    },
    {
      "id": "q96",
      "partId": "p1",
      "type": "listenTrueFalse",
      "say": "Receptionist: Good afternoon, Northside Careers Centre. Student: Hello, I want to join the weekend interview skills workshop. Receptionist: Of course. What is your name? Student: Tran Bao Minh. Receptionist: Thank you. The workshop is on the 8th of June from 2 p.m. to 5 p.m. in Room 21. The fee is 280,000 dong, and you should bring a notebook and one printed CV.",
      "context": "Part 1: A student books a workshop.",
      "question": "The workshop takes place on a weekday.",
      "options": [
        "False",
        "True"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "It is a weekend workshop."
    },
    {
      "id": "q97",
      "partId": "p2",
      "type": "listenChoice",
      "say": "Welcome to the Lakeside Science Festival. The robotics show starts at 10:15 in Hall B, while the climate talk begins at 11:00 in the main theatre. Food trucks are beside the east entrance, and reusable water stations are near the information desk. Students with a blue wristband can join the design lab for free.",
      "context": "Part 2: Festival information.",
      "question": "Where does the robotics show happen?",
      "options": [
        "Hall B",
        "The main theatre",
        "The east entrance",
        "The design lab"
      ],
      "answer": 0,
      "difficulty": "easy",
      "explanation": "The robotics show starts in Hall B."
    },
    {
      "id": "q98",
      "partId": "p2",
      "type": "listenFillInTheBlank",
      "say": "Welcome to the Lakeside Science Festival. The robotics show starts at 10:15 in Hall B, while the climate talk begins at 11:00 in the main theatre. Food trucks are beside the east entrance, and reusable water stations are near the information desk. Students with a blue wristband can join the design lab for free.",
      "context": "Part 2: Festival information.",
      "question": "Write the start time of the climate talk.",
      "answer": [
        "11:00",
        "11.00",
        "11"
      ],
      "difficulty": "medium",
      "explanation": "The climate talk begins at 11:00."
    },
    {
      "id": "q99",
      "partId": "p2",
      "type": "listenChoice",
      "say": "Welcome to the Lakeside Science Festival. The robotics show starts at 10:15 in Hall B, while the climate talk begins at 11:00 in the main theatre. Food trucks are beside the east entrance, and reusable water stations are near the information desk. Students with a blue wristband can join the design lab for free.",
      "context": "Part 2: Festival information.",
      "question": "Who can join the design lab for free?",
      "options": [
        "Anyone with headphones",
        "Students with a blue wristband",
        "Only teachers",
        "Children under six"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Students with a blue wristband can join for free."
    },
    {
      "id": "q100",
      "partId": "p2",
      "type": "listenTrueFalse",
      "say": "Welcome to the Lakeside Science Festival. The robotics show starts at 10:15 in Hall B, while the climate talk begins at 11:00 in the main theatre. Food trucks are beside the east entrance, and reusable water stations are near the information desk. Students with a blue wristband can join the design lab for free.",
      "context": "Part 2: Festival information.",
      "question": "Food trucks are beside the east entrance.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "easy",
      "explanation": "That location is stated directly."
    },
    {
      "id": "q101",
      "partId": "p2",
      "type": "listenTrueFalse",
      "say": "Welcome to the Lakeside Science Festival. The robotics show starts at 10:15 in Hall B, while the climate talk begins at 11:00 in the main theatre. Food trucks are beside the east entrance, and reusable water stations are near the information desk. Students with a blue wristband can join the design lab for free.",
      "context": "Part 2: Festival information.",
      "question": "The climate talk starts before the robotics show.",
      "options": [
        "False",
        "True"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "The robotics show starts earlier."
    },
    {
      "id": "q102",
      "partId": "p3",
      "type": "listenChoice",
      "say": "Ava: We need stronger evidence for our presentation on local transport. Ben: Then let's compare bus use before and after the new ticket app. Ava: Good idea. I'll interview ten students on Thursday lunchtime. Ben: I'll make a short online survey and summarise the results. Ava: Great. Let's meet in the media room at 3:40 to combine everything.",
      "context": "Part 3: Two students plan a presentation.",
      "question": "What topic are they investigating?",
      "options": [
        "School lunches",
        "Local transport",
        "Library design",
        "Career choices"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "They are working on local transport."
    },
    {
      "id": "q103",
      "partId": "p3",
      "type": "listenFillInTheBlank",
      "say": "Ava: We need stronger evidence for our presentation on local transport. Ben: Then let's compare bus use before and after the new ticket app. Ava: Good idea. I'll interview ten students on Thursday lunchtime. Ben: I'll make a short online survey and summarise the results. Ava: Great. Let's meet in the media room at 3:40 to combine everything.",
      "context": "Part 3: Two students plan a presentation.",
      "question": "Write the meeting place.",
      "answer": [
        "media room",
        "the media room"
      ],
      "difficulty": "medium",
      "explanation": "They will meet in the media room."
    },
    {
      "id": "q104",
      "partId": "p3",
      "type": "listenChoice",
      "say": "Ava: We need stronger evidence for our presentation on local transport. Ben: Then let's compare bus use before and after the new ticket app. Ava: Good idea. I'll interview ten students on Thursday lunchtime. Ben: I'll make a short online survey and summarise the results. Ava: Great. Let's meet in the media room at 3:40 to combine everything.",
      "context": "Part 3: Two students plan a presentation.",
      "question": "What will Ava do?",
      "options": [
        "Write the survey",
        "Interview ten students",
        "Design the app",
        "Print the slides"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Ava will interview ten students."
    },
    {
      "id": "q105",
      "partId": "p3",
      "type": "listenTrueFalse",
      "say": "Ava: We need stronger evidence for our presentation on local transport. Ben: Then let's compare bus use before and after the new ticket app. Ava: Good idea. I'll interview ten students on Thursday lunchtime. Ben: I'll make a short online survey and summarise the results. Ava: Great. Let's meet in the media room at 3:40 to combine everything.",
      "context": "Part 3: Two students plan a presentation.",
      "question": "Ben will summarise the survey results.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Ben says he will summarise the results."
    },
    {
      "id": "q106",
      "partId": "p3",
      "type": "listenTrueFalse",
      "say": "Ava: We need stronger evidence for our presentation on local transport. Ben: Then let's compare bus use before and after the new ticket app. Ava: Good idea. I'll interview ten students on Thursday lunchtime. Ben: I'll make a short online survey and summarise the results. Ava: Great. Let's meet in the media room at 3:40 to combine everything.",
      "context": "Part 3: Two students plan a presentation.",
      "question": "They plan to meet before lunchtime.",
      "options": [
        "False",
        "True"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "They will meet at 3:40."
    },
    {
      "id": "q107",
      "partId": "p4",
      "type": "listenChoice",
      "say": "In this short lecture, we will look at why some cities create quiet zones. Constant noise can raise stress and make concentration harder, especially near hospitals and schools. One response is to lower traffic speed, because slower vehicles usually create less noise. Another is to use trees and sound-absorbing surfaces, which can soften the effect of traffic without closing roads completely. However, planners must balance quiet with access, since businesses still need deliveries and residents still need transport.",
      "context": "Part 4: A short lecture about quiet zones.",
      "question": "Why are quiet zones created?",
      "options": [
        "To make roads longer",
        "To reduce stress and improve concentration",
        "To stop all deliveries",
        "To increase business opening hours"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "The lecturer links quiet zones to lower stress and better concentration."
    },
    {
      "id": "q108",
      "partId": "p4",
      "type": "listenChoice",
      "say": "In this short lecture, we will look at why some cities create quiet zones. Constant noise can raise stress and make concentration harder, especially near hospitals and schools. One response is to lower traffic speed, because slower vehicles usually create less noise. Another is to use trees and sound-absorbing surfaces, which can soften the effect of traffic without closing roads completely. However, planners must balance quiet with access, since businesses still need deliveries and residents still need transport.",
      "context": "Part 4: A short lecture about quiet zones.",
      "question": "Which measure can soften traffic noise without closing roads?",
      "options": [
        "Removing schools",
        "Using trees and sound-absorbing surfaces",
        "Building more car parks",
        "Painting roads darker"
      ],
      "answer": 1,
      "difficulty": "hard",
      "explanation": "That measure is stated directly."
    },
    {
      "id": "q109",
      "partId": "p4",
      "type": "listenFillInTheBlank",
      "say": "In this short lecture, we will look at why some cities create quiet zones. Constant noise can raise stress and make concentration harder, especially near hospitals and schools. One response is to lower traffic speed, because slower vehicles usually create less noise. Another is to use trees and sound-absorbing surfaces, which can soften the effect of traffic without closing roads completely. However, planners must balance quiet with access, since businesses still need deliveries and residents still need transport.",
      "context": "Part 4: A short lecture about quiet zones.",
      "question": "Write one group named as especially affected by noise.",
      "answer": [
        "schools",
        "hospitals"
      ],
      "difficulty": "medium",
      "explanation": "The lecturer mentions hospitals and schools."
    },
    {
      "id": "q110",
      "partId": "p4",
      "type": "listenTrueFalse",
      "say": "In this short lecture, we will look at why some cities create quiet zones. Constant noise can raise stress and make concentration harder, especially near hospitals and schools. One response is to lower traffic speed, because slower vehicles usually create less noise. Another is to use trees and sound-absorbing surfaces, which can soften the effect of traffic without closing roads completely. However, planners must balance quiet with access, since businesses still need deliveries and residents still need transport.",
      "context": "Part 4: A short lecture about quiet zones.",
      "question": "Slower vehicles usually create less noise.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "easy",
      "explanation": "The lecture says slower vehicles usually create less noise."
    },
    {
      "id": "q111",
      "partId": "p4",
      "type": "listenTrueFalse",
      "say": "In this short lecture, we will look at why some cities create quiet zones. Constant noise can raise stress and make concentration harder, especially near hospitals and schools. One response is to lower traffic speed, because slower vehicles usually create less noise. Another is to use trees and sound-absorbing surfaces, which can soften the effect of traffic without closing roads completely. However, planners must balance quiet with access, since businesses still need deliveries and residents still need transport.",
      "context": "Part 4: A short lecture about quiet zones.",
      "question": "The lecture says access and quiet must be balanced.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Planners must balance both needs."
    }
  );
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
