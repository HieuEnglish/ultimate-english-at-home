/* assets/data/tests-4-7-writing.js
   Question bank: Ages 4–7 • Writing

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-4-7-writing"

   Content notes:
   - Focus: early writing habits (letters, spacing, capitals, punctuation).
   - Mix of:
     - prompt (free writing / copy practice)
     - fillInTheBlank (missing letters / words)
     - multipleChoice (choose the best writing form)
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-writing";

  const QUESTIONS = [
    {
      id: "q1",
      type: "prompt",
      question: "Write your name.",
      model: "My name is ____.",
      difficulty: "easy",
      explanation: "Try to start with a capital letter. Any spelling is OK."
    },
    {
      id: "q2",
      type: "prompt",
      question: "Copy the word: CAT",
      model: "CAT",
      difficulty: "easy",
      explanation: "Use big letters. Keep spaces between letters."
    },
    {
      id: "q3",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: C _ T",
      answer: "a",
      difficulty: "easy",
      explanation: "C-A-T spells CAT."
    },
    {
      id: "q4",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: D O _",
      answer: "g",
      difficulty: "easy",
      explanation: "D-O-G spells DOG."
    },
    {
      id: "q5",
      type: "multipleChoice",
      question: "Choose the best capital letter: ___ am Sam.",
      options: ["I", "i", "A", "S"],
      answer: 0,
      difficulty: "easy",
      explanation: "A sentence starts with a capital letter."
    },
    {
      id: "q6",
      type: "multipleChoice",
      question: "Choose the correct sentence.",
      options: ["i can run", "I can run.", "I can Run", "I can run"],
      answer: 1,
      difficulty: "medium",
      explanation: "Use a capital letter and a full stop."
    },
    {
      id: "q7",
      type: "multipleChoice",
      question: "Choose the best word: I ___ happy.",
      options: ["am", "is", "are", "be"],
      answer: 0,
      difficulty: "easy",
      explanation: "We say: I am happy."
    },
    {
      id: "q8",
      type: "multipleChoice",
      question: "Which one has spaces between words?",
      options: ["Ilikecats.", "I like cats.", "I likecats.", "I-like-cats."],
      answer: 1,
      difficulty: "medium",
      explanation: "Words need spaces: I / like / cats."
    },
    {
      id: "q9",
      type: "multipleChoice",
      question: "Choose the best end mark: Are you ready__",
      options: [".", "?", "!", ","],
      answer: 1,
      difficulty: "medium",
      explanation: "A question ends with a question mark (?)."
    },
    {
      id: "q10",
      type: "prompt",
      question: "Copy the sentence.",
      model: "I like apples.",
      difficulty: "easy",
      explanation: "Start with a capital letter and use spaces."
    },
    {
      id: "q11",
      type: "fillInTheBlank",
      question: "Fill in the missing word: I like ___ (🐶).",
      answer: ["dog", "dogs"],
      difficulty: "medium",
      explanation: "Dog / dogs are both OK here."
    },
    {
      id: "q12",
      type: "fillInTheBlank",
      question: "Write the word for this picture: ☀️",
      answer: "sun",
      difficulty: "easy",
      explanation: "☀️ = sun."
    },
    {
      id: "q13",
      type: "multipleChoice",
      question: "Choose the best order.",
      options: ["I school go.", "Go I school.", "I go to school.", "School go I."],
      answer: 2,
      difficulty: "medium",
      explanation: "Correct order: I go to school."
    },
    {
      id: "q14",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: _at (🐱)",
      answer: "c",
      difficulty: "easy",
      explanation: "Cat starts with C."
    },
    {
      id: "q15",
      type: "multipleChoice",
      question: "Choose the correct punctuation: I have a dog__",
      options: [".", "?", "!", ";"],
      answer: 0,
      difficulty: "medium",
      explanation: "A statement ends with a full stop."
    },
    {
      id: "q16",
      type: "multipleChoice",
      question: "Which word is spelled correctly?",
      options: ["skool", "school", "scool", "shcool"],
      answer: 1,
      difficulty: "hard",
      explanation: "The correct spelling is school."
    },
    {
      id: "q17",
      type: "prompt",
      question: "Write one sentence about your favourite animal. Start with: I like …",
      model: "I like ____.",
      difficulty: "medium",
      explanation: "Use a capital letter and a full stop."
    },
    {
      id: "q18",
      type: "prompt",
      question: "Write a short list: 3 foods you like.",
      model: "apples, ____, ____",
      difficulty: "hard",
      explanation: "Use commas and spaces (example: apples, rice, fish)."
    },
    {
      id: "q19",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: b _ ll (a toy)",
      answer: "a",
      difficulty: "easy",
      explanation: "b-a-ll spells ball."
    },
    {
      id: "q20",
      type: "prompt",
      question: "Write a thank-you sentence.",
      model: "Thank you, Mom.",
      difficulty: "medium",
      explanation: "Start with a capital letter and end with a full stop."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
