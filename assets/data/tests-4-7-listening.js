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
  {
    "id": "q1",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "cat",
    "options": [
      "🐰",
      "🐶",
      "🐱",
      "🦊"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Cat = 🐱"
  },
  {
    "id": "q2",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "bus",
    "options": [
      "🚗",
      "🚂",
      "🚲",
      "🚌"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "Bus = 🚌"
  },
  {
    "id": "q3",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "apple",
    "options": [
      "🍎",
      "🍌",
      "🍇",
      "🍓"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Apple = 🍎"
  },
  {
    "id": "q4",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "pencil",
    "options": [
      "📚",
      "✏️",
      "🧸",
      "🎈"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Pencil = ✏️"
  },
  {
    "id": "q5",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "teacher",
    "options": [
      "👩‍⚕️",
      "👮",
      "👩‍🏫",
      "🧑‍🍳"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "A teacher can be 👩‍🏫"
  },
  {
    "id": "q6",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "red ball",
    "options": [
      "🔵🚗",
      "🔵⚽",
      "🔴🚗",
      "🔴⚽"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Red ball = 🔴⚽"
  },
  {
    "id": "q7",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "blue car",
    "options": [
      "🔵🚗",
      "🔴🚗",
      "🔵⚽",
      "🔴⚽"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Blue car = 🔵🚗"
  },
  {
    "id": "q8",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "green apple",
    "options": [
      "🍎",
      "🍏",
      "🍌",
      "🍊"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Green apple = 🍏"
  },
  {
    "id": "q9",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "yellow banana",
    "options": [
      "🍇",
      "🍎",
      "🍌",
      "🍉"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "Yellow banana = 🍌"
  },
  {
    "id": "q10",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "clap your hands",
    "options": [
      "🫶",
      "👋",
      "🤫",
      "👏"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Clap = 👏"
  },
  {
    "id": "q11",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "run",
    "options": [
      "🏃",
      "🧍",
      "🛌",
      "🧘"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Run = 🏃"
  },
  {
    "id": "q12",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "sleep",
    "options": [
      "🏃",
      "💤",
      "👏",
      "🎤"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Sleep = 💤"
  },
  {
    "id": "q13",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "I am hungry.",
    "options": [
      "🧊",
      "😴",
      "🍽️",
      "🎈"
    ],
    "answer": 2,
    "difficulty": "hard",
    "explanation": "Hungry → food 🍽️"
  },
  {
    "id": "q14",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "I am happy.",
    "options": [
      "😴",
      "😢",
      "😡",
      "😄"
    ],
    "answer": 3,
    "difficulty": "hard",
    "explanation": "Happy = 😄"
  },
  {
    "id": "q15",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "Open the book.",
    "options": [
      "📖",
      "✏️",
      "🧸",
      "🖍️"
    ],
    "answer": 0,
    "difficulty": "hard",
    "explanation": "Open the book = 📖"
  },
  {
    "id": "q16",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🌧️",
    "say": "It is raining.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "hard",
    "explanation": "🌧️ means rain."
  },
  {
    "id": "q17",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "☀️",
    "say": "It is raining.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "hard",
    "explanation": "☀️ means sunny, not raining."
  },
  {
    "id": "q18",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "❄️",
    "say": "It is cold.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "hard",
    "explanation": "❄️ means cold."
  },
  {
    "id": "q19",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🚗",
    "say": "This is a car.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "difficulty": "hard",
    "explanation": "🚗 is a car."
  },
  {
    "id": "q20",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🐟",
    "say": "This is a fish.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "hard",
    "explanation": "🐟 is a fish."
  },
  {
    "id": "q21",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "dog",
    "options": [
      "🐰",
      "🐱",
      "🐶",
      "🦊"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Dog = 🐶"
  },
  {
    "id": "q22",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "bird",
    "options": [
      "🐸",
      "🐟",
      "🐭",
      "🐦"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "Bird = 🐦"
  },
  {
    "id": "q23",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "frog",
    "options": [
      "🐸",
      "🐍",
      "🦋",
      "🐢"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Frog = 🐸"
  },
  {
    "id": "q24",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "lion",
    "options": [
      "🐯",
      "🦁",
      "🐵",
      "🐶"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Lion = 🦁"
  },
  {
    "id": "q25",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "elephant",
    "options": [
      "🐴",
      "🦒",
      "🐘",
      "🐄"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Elephant = 🐘"
  },
  {
    "id": "q26",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "house",
    "options": [
      "🏪",
      "🏫",
      "🏥",
      "🏠"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "House = 🏠"
  },
  {
    "id": "q27",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "school",
    "options": [
      "🏫",
      "🏠",
      "🏥",
      "🏨"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "School = 🏫"
  },
  {
    "id": "q28",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "milk",
    "options": [
      "🧃",
      "🥛",
      "☕",
      "🍵"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Milk = 🥛"
  },
  {
    "id": "q29",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "water",
    "options": [
      "🍵",
      "🥤",
      "🚰",
      "🥛"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Water = 🚰"
  },
  {
    "id": "q30",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "shoes",
    "options": [
      "🧤",
      "🧦",
      "🧢",
      "👟"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "Shoes = 👟"
  },
  {
    "id": "q31",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "hat",
    "options": [
      "🧢",
      "👟",
      "🧣",
      "🧤"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Hat = 🧢"
  },
  {
    "id": "q32",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "kite",
    "options": [
      "🎈",
      "🪁",
      "🧸",
      "🚗"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Kite = 🪁"
  },
  {
    "id": "q33",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "ice cream",
    "options": [
      "🍉",
      "🍪",
      "🍦",
      "🍎"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Ice cream = 🍦"
  },
  {
    "id": "q34",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "bed",
    "options": [
      "🛁",
      "🪑",
      "🚽",
      "🛏️"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "Bed = 🛏️"
  },
  {
    "id": "q35",
    "type": "listenChoice",
    "question": "Listen. Choose the picture.",
    "say": "star",
    "options": [
      "⭐",
      "🌙",
      "☀️",
      "🌧️"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Star = ⭐"
  },
  {
    "id": "q36",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "pink flower",
    "options": [
      "🌼",
      "🌸",
      "🌹",
      "🌻"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Pink flower = 🌸"
  },
  {
    "id": "q37",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "yellow flower",
    "options": [
      "🌸",
      "🌹",
      "🌼",
      "🌻"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "Yellow flower = 🌼"
  },
  {
    "id": "q38",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "red heart",
    "options": [
      "💛",
      "💙",
      "💚",
      "❤️"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Red heart = ❤️"
  },
  {
    "id": "q39",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "blue heart",
    "options": [
      "💙",
      "❤️",
      "💚",
      "💛"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Blue heart = 💙"
  },
  {
    "id": "q40",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "green heart",
    "options": [
      "❤️",
      "💚",
      "💙",
      "💛"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Green heart = 💚"
  },
  {
    "id": "q41",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "yellow heart",
    "options": [
      "❤️",
      "💙",
      "💛",
      "💚"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "Yellow heart = 💛"
  },
  {
    "id": "q42",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "blue fish",
    "options": [
      "🔴🐱",
      "🔴🐟",
      "🔵🐱",
      "🔵🐟"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Blue fish = 🔵🐟"
  },
  {
    "id": "q43",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "green frog",
    "options": [
      "🟢🐸",
      "🔴🐸",
      "🟢🐶",
      "🔴🐶"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Green frog = 🟢🐸"
  },
  {
    "id": "q44",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "yellow duck",
    "options": [
      "🔵🦆",
      "🟡🦆",
      "🟡🐸",
      "🔵🐸"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Yellow duck = 🟡🦆"
  },
  {
    "id": "q45",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "red ladybug",
    "options": [
      "🔴🦋",
      "🔵🐞",
      "🔴🐞",
      "🔵🦋"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "Red ladybug = 🔴🐞"
  },
  {
    "id": "q46",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "green tree",
    "options": [
      "🔴🌵",
      "🔴🌳",
      "🟢🌵",
      "🟢🌳"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Green tree = 🟢🌳"
  },
  {
    "id": "q47",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "blue boat",
    "options": [
      "🔵⛵",
      "🔴⛵",
      "🔵🚗",
      "🔴🚗"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Blue boat = 🔵⛵"
  },
  {
    "id": "q48",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "yellow star",
    "options": [
      "🔵⭐",
      "🟡⭐",
      "🟡🌙",
      "🔵🌙"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Yellow star = 🟡⭐"
  },
  {
    "id": "q49",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "red balloon",
    "options": [
      "🔴🪁",
      "🔵🎈",
      "🔴🎈",
      "🔵🪁"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "Red balloon = 🔴🎈"
  },
  {
    "id": "q50",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "two apples",
    "options": [
      "🍏🍏",
      "🍎",
      "🍎🍎🍎",
      "🍎🍎"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Two apples = 🍎🍎"
  },
  {
    "id": "q51",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "swim",
    "options": [
      "🏊",
      "💃",
      "🚴",
      "🧘"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Swim = 🏊"
  },
  {
    "id": "q52",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "dance",
    "options": [
      "🏊",
      "💃",
      "🚴",
      "🧘"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Dance = 💃"
  },
  {
    "id": "q53",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "sing",
    "options": [
      "✍️",
      "📖",
      "🎤",
      "🍽️"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "Sing = 🎤"
  },
  {
    "id": "q54",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "read",
    "options": [
      "🍽️",
      "✍️",
      "🎤",
      "📖"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Read = 📖"
  },
  {
    "id": "q55",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "write",
    "options": [
      "✍️",
      "📖",
      "🎤",
      "🏊"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Write = ✍️"
  },
  {
    "id": "q56",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "eat",
    "options": [
      "🥤",
      "🍽️",
      "🛌",
      "📖"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Eat = 🍽️"
  },
  {
    "id": "q57",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "drink",
    "options": [
      "🛌",
      "🍽️",
      "🥤",
      "🚲"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "Drink = 🥤"
  },
  {
    "id": "q58",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "wash your hands",
    "options": [
      "📖",
      "🍽️",
      "🛏️",
      "🧼👐"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Wash your hands = 🧼👐"
  },
  {
    "id": "q59",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "open the door",
    "options": [
      "🚪➡️",
      "🪟",
      "📕",
      "🧸"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Open the door = 🚪➡️"
  },
  {
    "id": "q60",
    "type": "listenChoice",
    "question": "Listen. Choose the action.",
    "say": "close your eyes",
    "options": [
      "👀",
      "🙈",
      "👂",
      "👄"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Close your eyes = 🙈"
  },
  {
    "id": "q61",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "I am sad.",
    "options": [
      "😡",
      "😄",
      "😢",
      "😴"
    ],
    "answer": 2,
    "difficulty": "hard",
    "explanation": "Sad = 😢"
  },
  {
    "id": "q62",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "I am tired.",
    "options": [
      "😢",
      "😄",
      "😡",
      "😴"
    ],
    "answer": 3,
    "difficulty": "hard",
    "explanation": "Tired = 😴"
  },
  {
    "id": "q63",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "I am angry.",
    "options": [
      "😡",
      "😄",
      "😢",
      "😴"
    ],
    "answer": 0,
    "difficulty": "hard",
    "explanation": "Angry = 😡"
  },
  {
    "id": "q64",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "I am scared.",
    "options": [
      "😄",
      "😱",
      "😢",
      "😡"
    ],
    "answer": 1,
    "difficulty": "hard",
    "explanation": "Scared = 😱"
  },
  {
    "id": "q65",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "I like ice cream.",
    "options": [
      "🥗",
      "🍕",
      "🍦",
      "🍎"
    ],
    "answer": 2,
    "difficulty": "hard",
    "explanation": "Ice cream = 🍦"
  },
  {
    "id": "q66",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🐶",
    "say": "This is a dog.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "hard",
    "explanation": "🐶 is a dog."
  },
  {
    "id": "q67",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🐱",
    "say": "This is a dog.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "hard",
    "explanation": "🐱 is a cat, not a dog."
  },
  {
    "id": "q68",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🍌",
    "say": "This is a banana.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "hard",
    "explanation": "🍌 is a banana."
  },
  {
    "id": "q69",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🍉",
    "say": "This is an apple.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "hard",
    "explanation": "🍉 is a watermelon, not an apple."
  },
  {
    "id": "q70",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🚲",
    "say": "This is a bike.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "hard",
    "explanation": "🚲 is a bike."
  },
  {
    "id": "q71",
    "type": "listenChoice",
    "question": "Listen. Choose the best answer.",
    "say": "jump",
    "options": [
      "🧒‍🦱⬆️",
      "🧒‍🦱😴",
      "🧒‍🦱🍽️",
      "🧒‍🦱🧼"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Jump = go up off the ground."
  },
  {
    "id": "q72",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the umbrella.",
    "options": [
      "☂️",
      "🪁",
      "🚆",
      "🎒"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The correct picture is ☂️."
  },
  {
    "id": "q73",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the kite.",
    "options": [
      "☂️",
      "🪁",
      "🚆",
      "🎂"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The correct picture is 🪁."
  },
  {
    "id": "q74",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the train.",
    "options": [
      "🚆",
      "🚌",
      "⛵",
      "✈️"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The correct picture is 🚆."
  },
  {
    "id": "q75",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the sandwich.",
    "options": [
      "🎂",
      "🥪",
      "🍌",
      "🥕"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The correct picture is 🥪."
  },
  {
    "id": "q76",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the rabbit.",
    "options": [
      "🦆",
      "🐱",
      "🐰",
      "🐟"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "The correct picture is 🐰."
  },
  {
    "id": "q77",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the carrot.",
    "options": [
      "🥕",
      "🍌",
      "🍎",
      "🥪"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The correct picture is 🥕."
  },
  {
    "id": "q78",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the clock.",
    "options": [
      "🎒",
      "⏰",
      "✏️",
      "🚆"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The correct picture is ⏰."
  },
  {
    "id": "q79",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the backpack.",
    "options": [
      "🎒",
      "✏️",
      "👟",
      "⏰"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The correct picture is 🎒."
  },
  {
    "id": "q80",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the teacher.",
    "options": [
      "👩‍🏫",
      "👟",
      "🐰",
      "🚌"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The correct picture is 👩‍🏫."
  },
  {
    "id": "q81",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the playground.",
    "options": [
      "🏫",
      "🎂",
      "🛝",
      "🚜"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "The correct picture is 🛝."
  },
  {
    "id": "q82",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the banana.",
    "options": [
      "🍎",
      "🍌",
      "🥕",
      "🎂"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The correct picture is 🍌."
  },
  {
    "id": "q83",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the bus.",
    "options": [
      "🚆",
      "⛵",
      "🚌",
      "✈️"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "The correct picture is 🚌."
  },
  {
    "id": "q84",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the pencil.",
    "options": [
      "✏️",
      "🎒",
      "👟",
      "🚌"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The correct picture is ✏️."
  },
  {
    "id": "q85",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the shoes.",
    "options": [
      "🎩",
      "👟",
      "🧦",
      "🧤"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The correct picture is 👟."
  },
  {
    "id": "q86",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the flower.",
    "options": [
      "🌳",
      "🌸",
      "☀️",
      "⭐"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The correct picture is 🌸."
  },
  {
    "id": "q87",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the cake.",
    "options": [
      "🎂",
      "🥪",
      "🍎",
      "🍌"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The correct picture is 🎂."
  },
  {
    "id": "q88",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the duck.",
    "options": [
      "🦁",
      "🦆",
      "🐵",
      "🐢"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The correct picture is 🦆."
  },
  {
    "id": "q89",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the moon.",
    "options": [
      "☀️",
      "🌙",
      "⭐",
      "☁️"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The correct picture is 🌙."
  },
  {
    "id": "q90",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the bed.",
    "options": [
      "🪑",
      "🚪",
      "🛏️",
      "🧦"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "The correct picture is 🛏️."
  },
  {
    "id": "q91",
    "type": "listenChoice",
    "question": "Listen and choose.",
    "say": "Point to the farm.",
    "options": [
      "🏫",
      "🚌",
      "🚜",
      "✈️"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "The correct picture is 🚜."
  },
  {
    "id": "q92",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "☀️",
    "say": "It is sunny.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q93",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🌧️",
    "say": "It is raining.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q94",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🚌",
    "say": "This is a bike.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q95",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🐱",
    "say": "This is a fish.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q96",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🍎",
    "say": "This is a banana.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q97",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🐱",
    "say": "This is a cat.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q98",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "📚",
    "say": "These are books.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q99",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🎒",
    "say": "This is a kite.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q100",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🚌",
    "say": "This is a bus.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q101",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🏫",
    "say": "This is a school.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q102",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🧀",
    "say": "This is bread.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q103",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🌳",
    "say": "This is a tree.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q104",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "👟",
    "say": "These are socks.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q105",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "⏰",
    "say": "This is a clock.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q106",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "⚽",
    "say": "This is a football.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q107",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🧸",
    "say": "This is a teddy bear.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q108",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "⛵",
    "say": "This is a plane.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q109",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🥕",
    "say": "This is a carrot.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q110",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🐰",
    "say": "This is a rabbit.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },
  {
    "id": "q111",
    "type": "listenTrueFalse",
    "question": "Look. Listen. True or False?",
    "picture": "🍇",
    "say": "These are grapes.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Compare the picture and sentence carefully."
  },

{
    "id": "q112",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The class begins at nine fifteen.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q113",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "She brought a green notebook.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q114",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The game starts after lunch.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q115",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Their bus arrives at gate two.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q116",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "He finished the task on Tuesday.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q117",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The library closes at six o clock.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q118",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "We need three bottles of water.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q119",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The concert is next Saturday night.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q120",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The teacher asked for full sentences.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q121",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "They will meet in room fourteen.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},

{
    "id": "q122",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The lesson ends at ten forty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q123",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "He left his notebook on the desk.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q124",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Their practice match is on Wednesday.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q125",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The cafeteria serves pasta today.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q126",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "She needs a ruler and an eraser.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q127",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The train to Central leaves at 4:20.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q128",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "They will visit the museum next month.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q129",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The coach asked everyone to warm up.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q130",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Her presentation topic is climate change.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q131",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The homework has three short questions.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},

{
    "id": "q132",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The class starts at nine twenty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q133",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The test has five questions.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q134",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "We meet in room fourteen.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q135",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "She brought a blue folder.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q136",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The bus leaves at four ten.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q137",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Practice is on Wednesday.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q138",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Please write full sentences.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q139",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The library closes at six.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q140",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Bring two pencils tomorrow.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q141",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Lunch break is at twelve thirty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q142",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The class starts at nine twenty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q143",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The test has five questions.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q144",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "We meet in room fourteen.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q145",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "She brought a blue folder.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q146",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The bus leaves at four ten.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q147",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Practice is on Wednesday.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q148",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Please write full sentences.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q149",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The library closes at six.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q150",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Bring two pencils tomorrow.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q151",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Lunch break is at twelve thirty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
}



];
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
