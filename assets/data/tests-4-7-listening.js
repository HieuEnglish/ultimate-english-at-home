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
    // --- Easy: single words (objects/animals) ---
    {
      id: "q1",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "cat",
      options: ["🐰", "🐶", "🐱", "🦊"], answer: 2,
      difficulty: "easy",
      explanation: "Cat = 🐱"
    },
    {
      id: "q2",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "bus",
      options: ["🚗", "🚂", "🚲", "🚌"], answer: 3,
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
      options: ["📚", "✏️", "🧸", "🎈"], answer: 1,
      difficulty: "easy",
      explanation: "Pencil = ✏️"
    },
    {
      id: "q5",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "teacher",
      options: ["👩‍⚕️", "👮", "👩‍🏫", "🧑‍🍳"], answer: 2,
      difficulty: "easy",
      explanation: "A teacher can be 👩‍🏫"
    },

    // --- Medium: colours + objects (short phrases) ---
    {
      id: "q6",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "red ball",
      options: ["🔵🚗", "🔵⚽", "🔴🚗", "🔴⚽"], answer: 3,
      difficulty: "medium",
      explanation: "Red ball = 🔴⚽"
    },
    {
      id: "q7",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "blue car",
      options: ["🔵🚗", "🔴🚗", "🔵⚽", "🔴⚽"],
      answer: 0,
      difficulty: "medium",
      explanation: "Blue car = 🔵🚗"
    },
    {
      id: "q8",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "green apple",
      options: ["🍎", "🍏", "🍌", "🍊"], answer: 1,
      difficulty: "medium",
      explanation: "Green apple = 🍏"
    },
    {
      id: "q9",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "yellow banana",
      options: ["🍇", "🍎", "🍌", "🍉"], answer: 2,
      difficulty: "medium",
      explanation: "Yellow banana = 🍌"
    },

    // --- Medium: actions (single verbs) ---
    {
      id: "q10",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "clap your hands",
      options: ["🫶", "👋", "🤫", "👏"], answer: 3,
      difficulty: "medium",
      explanation: "Clap = 👏"
    },
    {
      id: "q11",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "run",
      options: ["🏃", "🧍", "🛌", "🧘"],
      answer: 0,
      difficulty: "medium",
      explanation: "Run = 🏃"
    },
    {
      id: "q12",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "sleep",
      options: ["🏃", "💤", "👏", "🎤"], answer: 1,
      difficulty: "medium",
      explanation: "Sleep = 💤"
    },

    // --- Hard: short sentences (feelings/needs) ---
    {
      id: "q13",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I am hungry.",
      options: ["🧊", "😴", "🍽️", "🎈"], answer: 2,
      difficulty: "hard",
      explanation: "Hungry → food 🍽️"
    },
    {
      id: "q14",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I am happy.",
      options: ["😴", "😢", "😡", "😄"], answer: 3,
      difficulty: "hard",
      explanation: "Happy = 😄"
    },

    // --- Hard: classroom instructions ---
    {
      id: "q15",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "Open the book.",
      options: ["📖", "✏️", "🧸", "🖍️"],
      answer: 0,
      difficulty: "hard",
      explanation: "Open the book = 📖"
    },

    // --- Hard: listen + True/False (picture + sentence) ---
    {
      id: "q16",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🌧️",
      say: "It is raining.",
      options: ["False", "True"], answer: 1,
      difficulty: "hard",
      explanation: "🌧️ means rain."
    },
    {
      id: "q17",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "☀️",
      say: "It is raining.",
      options: ["False", "True"], answer: 0,
      difficulty: "hard",
      explanation: "☀️ means sunny, not raining."
    },
    {
      id: "q18",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "❄️",
      say: "It is cold.",
      options: ["False", "True"], answer: 1,
      difficulty: "hard",
      explanation: "❄️ means cold."
    },
    {
      id: "q19",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🚗",
      say: "This is a car.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "hard",
      explanation: "🚗 is a car."
    },
    {
      id: "q20",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🐟",
      say: "This is a fish.",
      options: ["False", "True"], answer: 1,
      difficulty: "hard",
      explanation: "🐟 is a fish."
    },

    // --- Easy: more familiar words (single words) ---
    {
      id: "q21",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "dog",
      options: ["🐰", "🐱", "🐶", "🦊"], answer: 2,
      difficulty: "easy",
      explanation: "Dog = 🐶"
    },
    {
      id: "q22",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "bird",
      options: ["🐸", "🐟", "🐭", "🐦"], answer: 3,
      difficulty: "easy",
      explanation: "Bird = 🐦"
    },
    {
      id: "q23",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "frog",
      options: ["🐸", "🐍", "🦋", "🐢"],
      answer: 0,
      difficulty: "easy",
      explanation: "Frog = 🐸"
    },
    {
      id: "q24",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "lion",
      options: ["🐯", "🦁", "🐵", "🐶"], answer: 1,
      difficulty: "easy",
      explanation: "Lion = 🦁"
    },
    {
      id: "q25",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "elephant",
      options: ["🐴", "🦒", "🐘", "🐄"], answer: 2,
      difficulty: "easy",
      explanation: "Elephant = 🐘"
    },
    {
      id: "q26",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "house",
      options: ["🏪", "🏫", "🏥", "🏠"], answer: 3,
      difficulty: "easy",
      explanation: "House = 🏠"
    },
    {
      id: "q27",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "school",
      options: ["🏫", "🏠", "🏥", "🏨"],
      answer: 0,
      difficulty: "easy",
      explanation: "School = 🏫"
    },
    {
      id: "q28",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "milk",
      options: ["🧃", "🥛", "☕", "🍵"], answer: 1,
      difficulty: "easy",
      explanation: "Milk = 🥛"
    },
    {
      id: "q29",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "water",
      options: ["🍵", "🥤", "🚰", "🥛"], answer: 2,
      difficulty: "easy",
      explanation: "Water = 🚰"
    },
    {
      id: "q30",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "shoes",
      options: ["🧤", "🧦", "🧢", "👟"], answer: 3,
      difficulty: "easy",
      explanation: "Shoes = 👟"
    },
    {
      id: "q31",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "hat",
      options: ["🧢", "👟", "🧣", "🧤"],
      answer: 0,
      difficulty: "easy",
      explanation: "Hat = 🧢"
    },
    {
      id: "q32",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "kite",
      options: ["🎈", "🪁", "🧸", "🚗"], answer: 1,
      difficulty: "easy",
      explanation: "Kite = 🪁"
    },
    {
      id: "q33",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "ice cream",
      options: ["🍉", "🍪", "🍦", "🍎"], answer: 2,
      difficulty: "easy",
      explanation: "Ice cream = 🍦"
    },
    {
      id: "q34",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "bed",
      options: ["🛁", "🪑", "🚽", "🛏️"], answer: 3,
      difficulty: "easy",
      explanation: "Bed = 🛏️"
    },
    {
      id: "q35",
      type: "listenChoice",
      question: "Listen. Choose the picture.",
      say: "star",
      options: ["⭐", "🌙", "☀️", "🌧️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Star = ⭐"
    },

    // --- Medium: colours + simple phrases ---
    {
      id: "q36",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "pink flower",
      options: ["🌼", "🌸", "🌹", "🌻"], answer: 1,
      difficulty: "medium",
      explanation: "Pink flower = 🌸"
    },
    {
      id: "q37",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "yellow flower",
      options: ["🌸", "🌹", "🌼", "🌻"], answer: 2,
      difficulty: "medium",
      explanation: "Yellow flower = 🌼"
    },
    {
      id: "q38",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "red heart",
      options: ["💛", "💙", "💚", "❤️"], answer: 3,
      difficulty: "medium",
      explanation: "Red heart = ❤️"
    },
    {
      id: "q39",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "blue heart",
      options: ["💙", "❤️", "💚", "💛"], answer: 0,
      difficulty: "medium",
      explanation: "Blue heart = 💙"
    },
    {
      id: "q40",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "green heart",
      options: ["❤️", "💚", "💙", "💛"], answer: 1,
      difficulty: "medium",
      explanation: "Green heart = 💚"
    },
    {
      id: "q41",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "yellow heart",
      options: ["❤️", "💙", "💛", "💚"], answer: 2,
      difficulty: "medium",
      explanation: "Yellow heart = 💛"
    },
    {
      id: "q42",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "blue fish",
      options: ["🔴🐱", "🔴🐟", "🔵🐱", "🔵🐟"], answer: 3,
      difficulty: "medium",
      explanation: "Blue fish = 🔵🐟"
    },
    {
      id: "q43",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "green frog",
      options: ["🟢🐸", "🔴🐸", "🟢🐶", "🔴🐶"],
      answer: 0,
      difficulty: "medium",
      explanation: "Green frog = 🟢🐸"
    },
    {
      id: "q44",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "yellow duck",
      options: ["🔵🦆", "🟡🦆", "🟡🐸", "🔵🐸"], answer: 1,
      difficulty: "medium",
      explanation: "Yellow duck = 🟡🦆"
    },
    {
      id: "q45",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "red ladybug",
      options: ["🔴🦋", "🔵🐞", "🔴🐞", "🔵🦋"], answer: 2,
      difficulty: "medium",
      explanation: "Red ladybug = 🔴🐞"
    },
    {
      id: "q46",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "green tree",
      options: ["🔴🌵", "🔴🌳", "🟢🌵", "🟢🌳"], answer: 3,
      difficulty: "medium",
      explanation: "Green tree = 🟢🌳"
    },
    {
      id: "q47",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "blue boat",
      options: ["🔵⛵", "🔴⛵", "🔵🚗", "🔴🚗"],
      answer: 0,
      difficulty: "medium",
      explanation: "Blue boat = 🔵⛵"
    },
    {
      id: "q48",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "yellow star",
      options: ["🔵⭐", "🟡⭐", "🟡🌙", "🔵🌙"], answer: 1,
      difficulty: "medium",
      explanation: "Yellow star = 🟡⭐"
    },
    {
      id: "q49",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "red balloon",
      options: ["🔴🪁", "🔵🎈", "🔴🎈", "🔵🪁"], answer: 2,
      difficulty: "medium",
      explanation: "Red balloon = 🔴🎈"
    },
    {
      id: "q50",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "two apples",
      options: ["🍏🍏", "🍎", "🍎🍎🍎", "🍎🍎"], answer: 3,
      difficulty: "medium",
      explanation: "Two apples = 🍎🍎"
    },

    // --- Medium: actions + classroom commands ---
    {
      id: "q51",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "swim",
      options: ["🏊", "💃", "🚴", "🧘"],
      answer: 0,
      difficulty: "medium",
      explanation: "Swim = 🏊"
    },
    {
      id: "q52",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "dance",
      options: ["🏊", "💃", "🚴", "🧘"], answer: 1,
      difficulty: "medium",
      explanation: "Dance = 💃"
    },
    {
      id: "q53",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "sing",
      options: ["✍️", "📖", "🎤", "🍽️"], answer: 2,
      difficulty: "medium",
      explanation: "Sing = 🎤"
    },
    {
      id: "q54",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "read",
      options: ["🍽️", "✍️", "🎤", "📖"], answer: 3,
      difficulty: "medium",
      explanation: "Read = 📖"
    },
    {
      id: "q55",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "write",
      options: ["✍️", "📖", "🎤", "🏊"],
      answer: 0,
      difficulty: "medium",
      explanation: "Write = ✍️"
    },
    {
      id: "q56",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "eat",
      options: ["🥤", "🍽️", "🛌", "📖"], answer: 1,
      difficulty: "medium",
      explanation: "Eat = 🍽️"
    },
    {
      id: "q57",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "drink",
      options: ["🛌", "🍽️", "🥤", "🚲"], answer: 2,
      difficulty: "medium",
      explanation: "Drink = 🥤"
    },
    {
      id: "q58",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "wash your hands",
      options: ["📖", "🍽️", "🛏️", "🧼👐"], answer: 3,
      difficulty: "medium",
      explanation: "Wash your hands = 🧼👐"
    },
    {
      id: "q59",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "open the door",
      options: ["🚪➡️", "🪟", "📕", "🧸"],
      answer: 0,
      difficulty: "medium",
      explanation: "Open the door = 🚪➡️"
    },
    {
      id: "q60",
      type: "listenChoice",
      question: "Listen. Choose the action.",
      say: "close your eyes",
      options: ["👀", "🙈", "👂", "👄"], answer: 1,
      difficulty: "medium",
      explanation: "Close your eyes = 🙈"
    },

    // --- Hard: feelings + short sentences ---
    {
      id: "q61",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I am sad.",
      options: ["😡", "😄", "😢", "😴"], answer: 2,
      difficulty: "hard",
      explanation: "Sad = 😢"
    },
    {
      id: "q62",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I am tired.",
      options: ["😢", "😄", "😡", "😴"], answer: 3,
      difficulty: "hard",
      explanation: "Tired = 😴"
    },
    {
      id: "q63",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I am angry.",
      options: ["😡", "😄", "😢", "😴"],
      answer: 0,
      difficulty: "hard",
      explanation: "Angry = 😡"
    },
    {
      id: "q64",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I am scared.",
      options: ["😄", "😱", "😢", "😡"], answer: 1,
      difficulty: "hard",
      explanation: "Scared = 😱"
    },
    {
      id: "q65",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "I like ice cream.",
      options: ["🥗", "🍕", "🍦", "🍎"], answer: 2,
      difficulty: "hard",
      explanation: "Ice cream = 🍦"
    },

    // --- Hard: True / False ---
    {
      id: "q66",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🐶",
      say: "This is a dog.",
      options: ["False", "True"], answer: 1,
      difficulty: "hard",
      explanation: "🐶 is a dog."
    },
    {
      id: "q67",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🐱",
      say: "This is a dog.",
      options: ["False", "True"], answer: 0,
      difficulty: "hard",
      explanation: "🐱 is a cat, not a dog."
    },
    {
      id: "q68",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🍌",
      say: "This is a banana.",
      options: ["False", "True"], answer: 1,
      difficulty: "hard",
      explanation: "🍌 is a banana."
    },
    {
      id: "q69",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🍉",
      say: "This is an apple.",
      options: ["False", "True"], answer: 0,
      difficulty: "hard",
      explanation: "🍉 is a watermelon, not an apple."
    },
    {
      id: "q70",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🚲",
      say: "This is a bike.",
      options: ["False", "True"], answer: 1,
      difficulty: "hard",
      explanation: "🚲 is a bike."
    },
    {
      id: "q71",
      type: "listenChoice",
      question: "Listen. Choose the best answer.",
      say: "jump",
      options: ["🧒‍🦱⬆️", "🧒‍🦱😴", "🧒‍🦱🍽️", "🧒‍🦱🧼"],
      answer: 0,
      difficulty: "medium",
      explanation: "Jump = go up off the ground."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
