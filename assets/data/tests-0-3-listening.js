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
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
