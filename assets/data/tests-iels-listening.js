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
      context: "Part 3: Complete the n
