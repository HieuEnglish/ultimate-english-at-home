/* assets/data/tests-4-7-listening.js
   Question bank: Ages 4–7 • Listening

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-4-7-listening"

   Audio approach:
   - The runner uses the browser's Speech Synthesis (TTS) to read "say".

   Question types used by the runner:
   - listenChoice    (listen, choose 1 option)
   - listenTrueFalse (look at a picture, listen to a sentence, choose True/False)

   Content notes:
   - Familiar topics (animals, school, colours, food, actions).
   - Short phrases and simple sentences.
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-listening";

  const QUESTIONS = [
    // --- Easy: single words ---
    {
      id: "q1",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "cat",
      options: ["🐱", "🐶", "🐰", "🐻"],
      answer: 0,
      difficulty: "easy",
      explanation: "Cat = 🐱"
    },
    {
      id: "q2",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "bus",
      options: ["🚗", "🚌", "🚲", "🚂"],
      answer: 1,
      difficulty: "easy",
      explanation: "Bus = 🚌"
    },
    {
      id: "q3",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "apple",
      options: ["🍎", "🍌", "🍇", "🍓"],
      answer: 0,
      difficulty: "easy",
      explanation: "Apple = 🍎"
    },
    {
      id: "q4",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "pencil",
      options: ["✏️", "📚", "🧽", "🧃"],
      answer: 0,
      difficulty: "easy",
      explanation: "A pencil is ✏️"
    },
    {
      id: "q5",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "teacher",
      options: ["👩‍🏫", "👮", "👩‍⚕️", "🧑‍🍳"],
      answer: 0,
      difficulty: "easy",
      explanation: "A teacher can be 👩‍🏫"
    },

    // --- Medium: colours + objects (short phrases) ---
    {
      id: "q6",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "red ball",
      options: ["🔴⚽", "🔵⚽", "🔴🚗", "🔵🚗"],
      answer: 0,
      difficulty: "medium",
      explanation: "Red ball = 🔴⚽"
    },
    {
      id: "q7",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "blue car",
      options: ["🔴🚗", "🔵🚗", "🔴🚲", "🔵🚲"],
      answer: 1,
      difficulty: "medium",
      explanation: "Blue car = 🔵🚗"
    },
    {
      id: "q8",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "green apple",
      options: ["🍏", "🍎", "🍌", "🍓"],
      answer: 0,
      difficulty: "medium",
      explanation: "Green apple = 🍏"
    },
    {
      id: "q9",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "yellow banana",
      options: ["🍎", "🍌", "🍇", "🥝"],
      answer: 1,
      difficulty: "medium",
      explanation: "Banana = 🍌"
    },

    // --- Medium: simple actions ---
    {
      id: "q10",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "clap your hands",
      options: ["👏", "🛌", "🍽️", "🏃"],
      answer: 0,
      difficulty: "medium",
      explanation: "Clap = 👏"
    },
    {
      id: "q11",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "run",
      options: ["🏃", "😴", "📖", "🧼"],
      answer: 0,
      difficulty: "easy",
      explanation: "Run = 🏃"
    },
    {
      id: "q12",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "sleep",
      options: ["😴", "🏃", "🧃", "✏️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Sleep = 😴"
    },

    // --- Medium: short sentences (choose picture-like option) ---
    {
      id: "q13",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I am hungry.",
      options: ["😋🍽️", "😴🛌", "😊🎈", "😢💧"],
      answer: 0,
      difficulty: "medium",
      explanation: "Hungry = want food."
    },
    {
      id: "q14",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I am happy.",
      options: ["😊🎈", "😢💧", "😴🛌", "😋🍽️"],
      answer: 0,
      difficulty: "medium",
      explanation: "Happy = 😊"
    },
    {
      id: "q15",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "Open the book.",
      options: ["📖✅", "📕❌", "🧼👐", "🍎✅"],
      answer: 0,
      difficulty: "medium",
      explanation: "Open book = 📖"
    },

    // --- Hard: True/False with a picture context ---
    {
      id: "q16",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🌧️",
      say: "It is raining.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "hard",
      explanation: "🌧️ means rain."
    },
    {
      id: "q17",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "☀️",
      say: "It is raining.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "hard",
      explanation: "☀️ means sunny, not raining."
    },
    {
      id: "q18",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "❄️",
      say: "It is cold.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "hard",
      explanation: "❄️ means cold."
    },
    {
      id: "q19",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🚌",
      say: "This is a car.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "hard",
      explanation: "🚌 is a bus, not a car."
    },
    {
      id: "q20",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🐟",
      say: "This is a fish.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "hard",
      explanation: "🐟 is a fish."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
