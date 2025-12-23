/* assets/data/tests-8-10-listening.js
   Question bank: Ages 8–10 • Listening

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-8-10-listening"

   Audio approach:
   - The runner uses the browser's Speech Synthesis (TTS) to read "say".

   Question types used by the runner:
   - listenChoice      (listen, choose 1 option)
   - listenTrueFalse   (look/listen, choose True/False)
   - listenFillInTheBlank (listen, type the missing word or number)

   Content notes:
   - Short dialogues and announcements.
   - Everyday topics: school, hobbies, weather, directions, numbers.
   - Mix of easy/medium/hard for Ages 8–10.
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-listening";

  const QUESTIONS = [
    // --- Easy: short classroom instructions ---
    {
      id: "q1",
      type: "listenChoice",
      question: "Listen. What should the students do?",
      say: "Please close your books and look at the board.",
      options: [
        "Close books and look at the board",
        "Open books and start reading",
        "Go outside for break",
        "Draw a picture in your notebook"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker says: close your books and look at the board."
    },
    {
      id: "q2",
      type: "listenChoice",
      question: "Listen. Which page should they turn to?",
      say: "Turn to page thirty, please.",
      options: ["Page 13", "Page 30", "Page 3", "Page 40"],
      answer: 1,
      difficulty: "easy",
      explanation: "Thirty = 30."
    },
    {
      id: "q3",
      type: "listenChoice",
      question: "Listen. What is the rule?",
      say: "Please don't run in the hallway.",
      options: [
        "Don't run in the hallway",
        "Don't talk in class",
        "Don't eat lunch",
        "Don't open the window"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker says: don't run in the hallway."
    },

    // --- Easy: times and days ---
    {
      id: "q4",
      type: "listenChoice",
      question: "Listen. What time is practice?",
      say: "Tom: What time is football practice? Mia: At four o'clock.",
      options: ["3:00", "4:00", "5:00", "6:00"],
      answer: 1,
      difficulty: "easy",
      explanation: "Mia says practice is at four o'clock."
    },
    {
      id: "q5",
      type: "listenChoice",
      question: "Listen. When is Ben's project due?",
      say: "Ben has a science project due on Monday.",
      options: ["Friday", "Sunday", "Monday", "Tuesday"],
      answer: 2,
      difficulty: "easy",
      explanation: "Due on Monday means the deadline is Monday."
    },

    // --- Easy: numbers ---
    {
      id: "q6",
      type: "listenChoice",
      question: "Listen. How many apples are there?",
      say: "There are three apples in the bag.",
      options: ["Two", "Three", "Four", "Five"],
      answer: 1,
      difficulty: "easy",
      explanation: "Three apples = 3."
    },

    // --- Medium: simple dialogues ---
    {
      id: "q7",
      type: "listenChoice",
      question: "Listen. Who forgot their lunch?",
      say: "I forgot my lunch. Can I share yours?",
      options: ["The speaker", "The teacher", "A friend", "No one"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says: I forgot my lunch."
    },
    {
      id: "q8",
      type: "listenChoice",
      question: "Listen. What does Alex prefer?",
      say: "Tina: Do you like carrots? Alex: No, I prefer peas.",
      options: ["Carrots", "Peas", "Potatoes", "Tomatoes"],
      answer: 1,
      difficulty: "medium",
      explanation: "Alex says: I prefer peas."
    },
    {
      id: "q9",
      type: "listenChoice",
      question: "Listen. Why should the window be closed?",
      say: "Please close the window. It's cold.",
      options: ["Because it's cold", "Because it's noisy", "Because it's dark", "Because it's hot"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says it is cold."
    },

    // --- Medium: short announcements ---
    {
      id: "q10",
      type: "listenChoice",
      question: "Listen. What should students bring on the trip?",
      say: "Our class trip is on Friday. Bring a hat and some water.",
      options: ["A hat and water", "A phone and headphones", "A toy and candy", "A ball and gloves"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says: bring a hat and some water."
    },
    {
      id: "q11",
      type: "listenChoice",
      question: "Listen. What is the weather like?",
      say: "The weather will be sunny this afternoon.",
      options: ["Sunny", "Rainy", "Snowy", "Windy"],
      answer: 0,
      difficulty: "easy",
      explanation: "Sunny means there will be sun."
    },

    // --- Medium: directions/places ---
    {
      id: "q12",
      type: "listenChoice",
      question: "Listen. Where is the library?",
      say: "The library is next to the park.",
      options: ["Next to the park", "Behind the school", "Across from the hospital", "Inside the mall"],
      answer: 0,
      difficulty: "medium",
      explanation: "Next to = beside."
    },
    {
      id: "q13",
      type: "listenChoice",
      question: "Listen. Where should they meet?",
      say: "Let's meet at the gate at ten.",
      options: ["At the gate", "At the bus stop", "At the classroom", "At the café"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says: meet at the gate."
    },

    // --- Medium: comparisons ---
    {
      id: "q14",
      type: "listenChoice",
      question: "Listen. Which jacket is cheaper?",
      say: "The red jacket is cheaper than the blue one.",
      options: ["The red jacket", "The blue jacket", "They are the same price", "It doesn't say"],
      answer: 0,
      difficulty: "medium",
      explanation: "Cheaper than means it costs less."
    },

    // --- Hard: short story comprehension ---
    {
      id: "q15",
      type: "listenChoice",
      question: "Listen. Where were the keys?",
      say: "Ava couldn't find her keys. She looked in her bag and on the table. Finally, she found them under the sofa.",
      options: ["In her bag", "On the table", "Under the sofa", "In the kitchen"],
      answer: 2,
      difficulty: "hard",
      explanation: "The last sentence says she found them under the sofa."
    },

    // --- True/False with simple picture context ---
    {
      id: "q16",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🐬",
      say: "This is a dolphin.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "🐬 is a dolphin."
    },
    {
      id: "q17",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🍌",
      say: "This is an apple.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "easy",
      explanation: "🍌 is a banana, not an apple."
    },
    {
      id: "q18",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🚌",
      say: "This is a train.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "medium",
      explanation: "🚌 is a bus."
    },
    {
      id: "q19",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🧊",
      say: "Ice is cold.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "Ice is cold."
    },

    // --- Fill in the blank (spelling + numbers) ---
    {
      id: "q20",
      type: "listenFillInTheBlank",
      question: "Type the missing word: I need a _____ to write.",
      say: "I need a pencil to write.",
      answer: ["pencil"],
      difficulty: "easy",
      explanation: "The missing word is pencil."
    },
    {
      id: "q21",
      type: "listenFillInTheBlank",
      question: "Type the number you hear: There are _____ students in the room.",
      say: "There are fourteen students in the room.",
      answer: ["14", "fourteen"],
      difficulty: "medium",
      explanation: "Fourteen = 14."
    },
    {
      id: "q22",
      type: "listenFillInTheBlank",
      question: "Type the missing word: Please speak _____ in the library.",
      say: "Please speak quietly in the library.",
      answer: ["quietly"],
      difficulty: "medium",
      explanation: "Quietly means not loudly."
    },

    // --- More listening comprehension ---
    {
      id: "q23",
      type: "listenChoice",
      question: "Listen. What should you do when you finish?",
      say: "When you finish, put your name at the top of the page.",
      options: [
        "Write your name at the top",
        "Draw a picture on the page",
        "Fold the page in half",
        "Give the page to a friend"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker says: put your name at the top of the page."
    },
    {
      id: "q24",
      type: "listenChoice",
      question: "Listen. Why did the person drink water?",
      say: "I was thirsty, so I drank some water.",
      options: ["They were thirsty", "They were sleepy", "They were cold", "They were late"],
      answer: 0,
      difficulty: "easy",
      explanation: "Thirsty means you need a drink."
    },
    {
      id: "q25",
      type: "listenChoice",
      question: "Listen. Where should the milk go?",
      say: "Put the milk in the fridge, not in the cupboard.",
      options: ["In the fridge", "In the cupboard", "On the table", "In the sink"],
      answer: 0,
     difficulty: "easy",
      explanation: "Fridge keeps milk cold."
    },
    {
      id: "q26",
      type: "listenChoice",
      question: "Listen. How many sentences should the homework have?",
      say: "For homework, write three sentences about your favourite animal.",
      options: ["One", "Two", "Three", "Four"],
      answer: 2,
      difficulty: "medium",
      explanation: "The speaker says: write three sentences."
    },
    {
      id: "q27",
      type: "listenChoice",
      question: "Listen. What did Maya buy?",
      say: "Maya bought two notebooks and one ruler.",
      options: [
        "Two notebooks and one ruler",
        "One notebook and two rulers",
        "Two rulers and one notebook",
        "One notebook and one ruler"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Two notebooks + one ruler."
    },
    {
      id: "q28",
      type: "listenChoice",
      question: "Listen. When will they visit grandma?",
      say: "Dad said, 'We will visit grandma after dinner.'",
      options: ["Before school", "After dinner", "At midnight", "During lunch"],
      answer: 1,
      difficulty: "medium",
      explanation: "After dinner is the time."
    },
    {
      id: "q29",
      type: "listenChoice",
      question: "Listen. What should you do first?",
      say: "First, wash your hands. Then, you can eat.",
      options: ["Wash your hands", "Start eating", "Go outside", "Do your homework"],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker says: first, wash your hands."
    },
    {
      id: "q30",
      type: "listenFillInTheBlank",
      question: "Type the missing word: My sister is _____ than me.",
      say: "My sister is taller than me.",
      answer: ["taller"],
      difficulty: "easy",
      explanation: "The missing word is taller."
    },
    {
      id: "q31",
      type: "listenChoice",
      question: "Listen. What time does the movie start?",
      say: "The movie starts at six p.m., but we should arrive early.",
      options: ["5 p.m.", "6 p.m.", "7 p.m.", "8 p.m."],
      answer: 1,
      difficulty: "medium",
      explanation: "The movie starts at six p.m."
    },
    {
      id: "q32",
      type: "listenChoice",
      question: "Listen. How long will the person come back in?",
      say: "Please wait at the corner. I will come in five minutes.",
      options: ["In five minutes", "In fifteen minutes", "In one hour", "Tomorrow"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says: five minutes."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
