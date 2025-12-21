/* assets/data/tests-0-3-reading.js
   Question bank: Ages 0–3 • Reading (pre-reading / symbol recognition)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-0-3-reading"
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-reading";

  /**
   * NOTE:
   * - For ages 0–3, "reading" is pre-reading: recognising letters, simple words, and picture-word matching.
   * - Keep prompts short and visual.
   */

  const QUESTIONS = [
    {
      id: "q1",
      type: "multipleChoice",
      question: "Tap the letter: A",
      options: ["A", "B", "C", "D"],
      answer: 0,
      difficulty: "easy",
      explanation: "A looks like a pointy triangle with a line."
    },
    {
      id: "q2",
      type: "multipleChoice",
      question: "Tap the letter: B",
      options: ["D", "P", "B", "R"],
      answer: 2,
      difficulty: "easy",
      explanation: "B has two bumps."
    },
    {
      id: "q3",
      type: "multipleChoice",
      question: "Tap the letter: C",
      options: ["O", "C", "G", "Q"],
      answer: 1,
      difficulty: "easy",
      explanation: "C is open like a smile."
    },
    {
      id: "q4",
      type: "multipleChoice",
      question: "Tap the letter: M",
      options: ["W", "N", "M", "H"],
      answer: 2,
      difficulty: "easy",
      explanation: "M has two mountains."
    },
    {
      id: "q5",
      type: "multipleChoice",
      question: "Tap the letter: S",
      options: ["S", "Z", "E", "G"],
      answer: 0,
      difficulty: "easy",
      explanation: "S is a curvy snake shape."
    },
    {
      id: "q6",
      type: "multipleChoice",
      question: "Which word says: MOM",
      options: ["MOM", "DAD", "MAN", "MAP"],
      answer: 0,
      difficulty: "easy",
      explanation: "MOM = M-O-M."
    },
    {
      id: "q7",
      type: "multipleChoice",
      question: "Which word says: DAD",
      options: ["DAD", "DOG", "DOLL", "DAY"],
      answer: 0,
      difficulty: "easy",
      explanation: "DAD = D-A-D."
    },
    {
      id: "q8",
      type: "multipleChoice",
      question: "Look at the word: CAT. Which picture matches?",
      options: ["🐱", "🐶", "🐰", "🦊"],
      answer: 0,
      difficulty: "easy",
      explanation: "CAT matches the cat picture."
    },
    {
      id: "q9",
      type: "multipleChoice",
      question: "Look at the word: DOG. Which picture matches?",
      options: ["🐱", "🐶", "🐭", "🐻"],
      answer: 1,
      difficulty: "easy",
      explanation: "DOG matches the dog picture."
    },
    {
      id: "q10",
      type: "multipleChoice",
      question: "Look at the word: SUN. Which picture matches?",
      options: ["🌙", "⭐", "☀️", "☁️"],
      answer: 2,
      difficulty: "easy",
      explanation: "SUN matches the sun."
    },
    {
      id: "q11",
      type: "multipleChoice",
      question: "Which is the SAME as: A",
      options: ["A", "a", "B", "b"],
      answer: 0,
      difficulty: "medium",
      explanation: "This one is the same big A."
    },
    {
      id: "q12",
      type: "multipleChoice",
      question: "Which is the SAME as: O",
      options: ["Q", "O", "C", "D"],
      answer: 1,
      difficulty: "medium",
      explanation: "O is a round circle."
    },
    {
      id: "q13",
      type: "multipleChoice",
      question: "Look at the word: BUS. Which picture matches?",
      options: ["🚗", "🚲", "🚌", "🚂"],
      answer: 2,
      difficulty: "medium",
      explanation: "BUS matches the bus."
    },
    {
      id: "q14",
      type: "multipleChoice",
      question: "Look at the word: BALL. Which picture matches?",
      options: ["🎾", "⚽", "🏀", "🏈"],
      answer: 2,
      difficulty: "medium",
      explanation: "BALL can be a basketball."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
