/* assets/data/tests-0-3-listening.js
   Question bank: Ages 0–3 • Listening (very early listening / word recognition)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-0-3-listening"

   Notes:
   - This is caregiver-led. The child taps a picture after hearing a word.
   - Audio is produced by the runner using the browser's Speech Synthesis (TTS).
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-listening";

  const QUESTIONS = [
    {
      id: "q1",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "cat",
      options: ["🐱", "🐶", "🐰", "🦊"],
      answer: 0,
      difficulty: "easy",
      explanation: "Cat = 🐱"
    },
    {
      id: "q2",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "dog",
      options: ["🐱", "🐶", "🐭", "🐻"],
      answer: 1,
      difficulty: "easy",
      explanation: "Dog = 🐶"
    },
    {
      id: "q3",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "bird",
      options: ["🐦", "🐟", "🐸", "🐢"],
      answer: 0,
      difficulty: "easy",
      explanation: "Bird = 🐦"
    },
    {
      id: "q4",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "fish",
      options: ["🐦", "🐟", "🦋", "🐞"],
      answer: 1,
      difficulty: "easy",
      explanation: "Fish = 🐟"
    },
    {
      id: "q5",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "cow",
      options: ["🐷", "🐮", "🐴", "🐑"],
      answer: 1,
      difficulty: "easy",
      explanation: "Cow = 🐮"
    },
    {
      id: "q6",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "ball",
      options: ["⚽", "🚗", "🧸", "🍎"],
      answer: 0,
      difficulty: "easy",
      explanation: "Ball = ⚽"
    },
    {
      id: "q7",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "car",
      options: ["🚗", "🚲", "✈️", "🚂"],
      answer: 0,
      difficulty: "easy",
      explanation: "Car = 🚗"
    },
    {
      id: "q8",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "apple",
      options: ["🍎", "🍌", "🍇", "🍓"],
      answer: 0,
      difficulty: "easy",
      explanation: "Apple = 🍎"
    },
    {
      id: "q9",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "banana",
      options: ["🍎", "🍌", "🍐", "🥝"],
      answer: 1,
      difficulty: "easy",
      explanation: "Banana = 🍌"
    },
    {
      id: "q10",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "milk",
      options: ["🥛", "💧", "🧃", "☕"],
      answer: 0,
      difficulty: "easy",
      explanation: "Milk = 🥛"
    },
    {
      id: "q11",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "water",
      options: ["💧", "🥛", "🍹", "🧃"],
      answer: 0,
      difficulty: "easy",
      explanation: "Water = 💧"
    },
    {
      id: "q12",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "nose",
      options: ["👃", "👂", "👁️", "🦷"],
      answer: 0,
      difficulty: "easy",
      explanation: "Nose = 👃"
    },
    {
      id: "q13",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "ear",
      options: ["👃", "👂", "🖐️", "🦶"],
      answer: 1,
      difficulty: "easy",
      explanation: "Ear = 👂"
    },
    {
      id: "q14",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "red",
      options: ["🔴", "🔵", "🟢", "🟡"],
      answer: 0,
      difficulty: "easy",
      explanation: "Red = 🔴"
    },
    {
      id: "q15",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "blue",
      options: ["🔵", "🔴", "🟢", "🟡"],
      answer: 0,
      difficulty: "easy",
      explanation: "Blue = 🔵"
    },
    {
      id: "q16",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "green",
      options: ["🔴", "🔵", "🟢", "🟡"],
      answer: 2,
      difficulty: "easy",
      explanation: "Green = 🟢"
    },
    {
      id: "q17",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "yellow",
      options: ["🔴", "🔵", "🟢", "🟡"],
      answer: 3,
      difficulty: "easy",
      explanation: "Yellow = 🟡"
    },
    {
      id: "q18",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "sun",
      options: ["☀️", "🌙", "⭐", "☁️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Sun = ☀️"
    },
    {
      id: "q19",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "moon",
      options: ["☀️", "🌙", "⭐", "🌈"],
      answer: 1,
      difficulty: "easy",
      explanation: "Moon = 🌙"
    },
    {
      id: "q20",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "star",
      options: ["⭐", "🌙", "☀️", "☁️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Star = ⭐"
    },
    {
      id: "q21",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "duck",
      options: ["🦆", "🐔", "🐦", "🐧"],
      answer: 0,
      difficulty: "easy",
      explanation: "Duck = 🦆"
    },
    {
      id: "q22",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "lion",
      options: ["🦁", "🐯", "🐻", "🐵"],
      answer: 0,
      difficulty: "easy",
      explanation: "Lion = 🦁"
    },
    {
      id: "q23",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "train",
      options: ["🚂", "🚗", "🚲", "✈️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Train = 🚂"
    },
    {
      id: "q24",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "book",
      options: ["📖", "🧸", "🖍️", "⚽"],
      answer: 0,
      difficulty: "easy",
      explanation: "Book = 📖"
    },
    {
      id: "q25",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "shoe",
      options: ["👟", "👒", "🧦", "🧤"],
      answer: 0,
      difficulty: "easy",
      explanation: "Shoe = 👟"
    },
    {
      id: "q26",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "eye",
      options: ["👁️", "👂", "👃", "🦷"],
      answer: 0,
      difficulty: "easy",
      explanation: "Eye = 👁️"
    },
    {
      id: "q27",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "mouth",
      options: ["👄", "👁️", "👂", "👃"],
      answer: 0,
      difficulty: "easy",
      explanation: "Mouth = 👄"
    },
    {
      id: "q28",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "hand",
      options: ["🖐️", "🦶", "👂", "👃"],
      answer: 0,
      difficulty: "easy",
      explanation: "Hand = 🖐️"
    },
    {
      id: "q29",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "foot",
      options: ["🦶", "🖐️", "👂", "👁️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Foot = 🦶"
    },
    {
      id: "q30",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "baby",
      options: ["👶", "👧", "👦", "👵"],
      answer: 0,
      difficulty: "easy",
      explanation: "Baby = 👶"
    },
    {
      id: "q31",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "pig",
      options: ["🐷", "🐮", "🐴", "🐑"],
      answer: 0,
      difficulty: "easy",
      explanation: "Pig = 🐷"
    },
    {
      id: "q32",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "horse",
      options: ["🐴", "🐷", "🐰", "🐶"],
      answer: 0,
      difficulty: "easy",
      explanation: "Horse = 🐴"
    },
    {
      id: "q33",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "sheep",
      options: ["🐑", "🐮", "🐷", "🐔"],
      answer: 0,
      difficulty: "easy",
      explanation: "Sheep = 🐑"
    },
    {
      id: "q34",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "frog",
      options: ["🐸", "🐢", "🐍", "🦎"],
      answer: 0,
      difficulty: "easy",
      explanation: "Frog = 🐸"
    },
    {
      id: "q35",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "turtle",
      options: ["🐢", "🐸", "🐟", "🐞"],
      answer: 0,
      difficulty: "easy",
      explanation: "Turtle = 🐢"
    },
    {
      id: "q36",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "bear",
      options: ["🐻", "🦁", "🐵", "🐯"],
      answer: 0,
      difficulty: "easy",
      explanation: "Bear = 🐻"
    },
    {
      id: "q37",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "monkey",
      options: ["🐵", "🐻", "🐶", "🐱"],
      answer: 0,
      difficulty: "easy",
      explanation: "Monkey = 🐵"
    },
    {
      id: "q38",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "tiger",
      options: ["🐯", "🦁", "🐻", "🐱"],
      answer: 0,
      difficulty: "easy",
      explanation: "Tiger = 🐯"
    },
    {
      id: "q39",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "rabbit",
      options: ["🐰", "🐭", "🐹", "🦊"],
      answer: 0,
      difficulty: "easy",
      explanation: "Rabbit = 🐰"
    },
    {
      id: "q40",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "fox",
      options: ["🦊", "🐰", "🐻", "🐯"],
      answer: 0,
      difficulty: "easy",
      explanation: "Fox = 🦊"
    },
    {
      id: "q41",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "chicken",
      options: ["🐔", "🦆", "🐦", "🐧"],
      answer: 0,
      difficulty: "easy",
      explanation: "Chicken = 🐔"
    },
    {
      id: "q42",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "penguin",
      options: ["🐧", "🐦", "🐔", "🦆"],
      answer: 0,
      difficulty: "easy",
      explanation: "Penguin = 🐧"
    },
    {
      id: "q43",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "elephant",
      options: ["🐘", "🦒", "🦓", "🦏"],
      answer: 0,
      difficulty: "easy",
      explanation: "Elephant = 🐘"
    },
    {
      id: "q44",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "giraffe",
      options: ["🦒", "🐘", "🦓", "🦏"],
      answer: 0,
      difficulty: "easy",
      explanation: "Giraffe = 🦒"
    },
    {
      id: "q45",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "zebra",
      options: ["🦓", "🦒", "🐘", "🦏"],
      answer: 0,
      difficulty: "easy",
      explanation: "Zebra = 🦓"
    },
    {
      id: "q46",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "camel",
      options: ["🐪", "🐴", "🦒", "🐘"],
      answer: 0,
      difficulty: "easy",
      explanation: "Camel = 🐪"
    },
    {
      id: "q47",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "snake",
      options: ["🐍", "🦎", "🐸", "🐢"],
      answer: 0,
      difficulty: "easy",
      explanation: "Snake = 🐍"
    },
    {
      id: "q48",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "butterfly",
      options: ["🦋", "🐞", "🐝", "🐜"],
      answer: 0,
      difficulty: "easy",
      explanation: "Butterfly = 🦋"
    },
    {
      id: "q49",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "bee",
      options: ["🐝", "🐞", "🦋", "🐜"],
      answer: 0,
      difficulty: "easy",
      explanation: "Bee = 🐝"
    },
    {
      id: "q50",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "ant",
      options: ["🐜", "🐝", "🐞", "🦋"],
      answer: 0,
      difficulty: "easy",
      explanation: "Ant = 🐜"
    },
    {
      id: "q51",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "spider",
      options: ["🕷️", "🐜", "🐞", "🦋"],
      answer: 0,
      difficulty: "easy",
      explanation: "Spider = 🕷️"
    },
    {
      id: "q52",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "tree",
      options: ["🌳", "🌸", "🌵", "🍀"],
      answer: 0,
      difficulty: "easy",
      explanation: "Tree = 🌳"
    },
    {
      id: "q53",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "flower",
      options: ["🌸", "🍎", "⭐", "🚗"],
      answer: 0,
      difficulty: "easy",
      explanation: "Flower = 🌸"
    },
    {
      id: "q54",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "leaf",
      options: ["🍃", "⭐", "🍎", "🚗"],
      answer: 0,
      difficulty: "easy",
      explanation: "Leaf = 🍃"
    },
    {
      id: "q55",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "rain",
      options: ["🌧️", "☀️", "❄️", "🌈"],
      answer: 0,
      difficulty: "easy",
      explanation: "Rain = 🌧️"
    },
    {
      id: "q56",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "cloud",
      options: ["☁️", "🌧️", "☀️", "🌙"],
      answer: 0,
      difficulty: "easy",
      explanation: "Cloud = ☁️"
    },
    {
      id: "q57",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "snow",
      options: ["❄️", "🌧️", "☀️", "🔥"],
      answer: 0,
      difficulty: "easy",
      explanation: "Snow = ❄️"
    },
    {
      id: "q58",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "fire",
      options: ["🔥", "💧", "❄️", "🌧️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Fire = 🔥"
    },
    {
      id: "q59",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "ice",
      options: ["🧊", "🔥", "💧", "☀️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Ice = 🧊"
    },
    {
      id: "q60",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "cookie",
      options: ["🍪", "🍎", "🍞", "🧀"],
      answer: 0,
      difficulty: "easy",
      explanation: "Cookie = 🍪"
    },
    {
      id: "q61",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "bread",
      options: ["🍞", "🍪", "🥚", "🍌"],
      answer: 0,
      difficulty: "easy",
      explanation: "Bread = 🍞"
    },
    {
      id: "q62",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "egg",
      options: ["🥚", "🍞", "🍪", "🍇"],
      answer: 0,
      difficulty: "easy",
      explanation: "Egg = 🥚"
    },
    {
      id: "q63",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "cheese",
      options: ["🧀", "🥛", "🍎", "🍪"],
      answer: 0,
      difficulty: "easy",
      explanation: "Cheese = 🧀"
    },
    {
      id: "q64",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "juice",
      options: ["🧃", "🥛", "💧", "☕"],
      answer: 0,
      difficulty: "easy",
      explanation: "Juice = 🧃"
    },
    {
      id: "q65",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "cup",
      options: ["🥤", "🍽️", "🥄", "🧸"],
      answer: 0,
      difficulty: "easy",
      explanation: "Cup = 🥤"
    },
    {
      id: "q66",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "spoon",
      options: ["🥄", "🍴", "🧸", "🧦"],
      answer: 0,
      difficulty: "easy",
      explanation: "Spoon = 🥄"
    },
    {
      id: "q67",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "plate",
      options: ["🍽️", "🥄", "🥤", "🧸"],
      answer: 0,
      difficulty: "easy",
      explanation: "Plate = 🍽️"
    },
    {
      id: "q68",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "chair",
      options: ["🪑", "🛏️", "🚪", "🧸"],
      answer: 0,
      difficulty: "easy",
      explanation: "Chair = 🪑"
    },
    {
      id: "q69",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "bed",
      options: ["🛏️", "🪑", "🛁", "🚽"],
      answer: 0,
      difficulty: "easy",
      explanation: "Bed = 🛏️"
    },
    {
      id: "q70",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "bath",
      options: ["🛁", "🚗", "🧸", "🛏️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Bath = 🛁"
    },
    {
      id: "q71",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "toilet",
      options: ["🚽", "🛁", "🪑", "🛏️"],
      answer: 0,
      difficulty: "easy",
      explanation: "Toilet = 🚽"
    },
    {
      id: "q72",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "soap",
      options: ["🧼", "🪥", "🧻", "🧴"],
      answer: 0,
      difficulty: "easy",
      explanation: "Soap = 🧼"
    },
    {
      id: "q73",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "toothbrush",
      options: ["🪥", "🧼", "🧻", "🍴"],
      answer: 0,
      difficulty: "easy",
      explanation: "Toothbrush = 🪥"
    },
    {
      id: "q74",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "tissue",
      options: ["🧻", "🧼", "🪥", "🧴"],
      answer: 0,
      difficulty: "easy",
      explanation: "Tissue = 🧻"
    },
    {
      id: "q75",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "hat",
      options: ["🧢", "👟", "🧦", "🧤"],
      answer: 0,
      difficulty: "easy",
      explanation: "Hat = 🧢"
    },
    {
      id: "q76",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "shirt",
      options: ["👕", "👖", "🧦", "👟"],
      answer: 0,
      difficulty: "easy",
      explanation: "Shirt = 👕"
    },
    {
      id: "q77",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "pants",
      options: ["👖", "👕", "🧦", "👒"],
      answer: 0,
      difficulty: "easy",
      explanation: "Pants = 👖"
    },
    {
      id: "q78",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "sock",
      options: ["🧦", "👟", "🧤", "👒"],
      answer: 0,
      difficulty: "easy",
      explanation: "Sock = 🧦"
    },
    {
      id: "q79",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "circle",
      options: ["⭕", "⬛", "🔺", "⭐"],
      answer: 0,
      difficulty: "easy",
      explanation: "Circle = ⭕"
    },
    {
      id: "q80",
      type: "listenChoice",
      question: "Listen. Tap the picture.",
      say: "heart",
      options: ["❤️", "⭐", "☀️", "🍎"],
      answer: 0,
      difficulty: "easy",
      explanation: "Heart = ❤️"
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
