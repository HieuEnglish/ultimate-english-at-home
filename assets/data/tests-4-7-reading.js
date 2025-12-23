/* assets/data/tests-4-7-reading.js
   Question bank: Ages 4–7 • Reading

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-4-7-reading"

   Content notes:
   - Short sentences and familiar topics (animals, family, school, food).
   - Mix of picture/word matching, simple grammar, and very short comprehension.
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-reading";

  const QUESTIONS = [
    {
      id: "q1",
      type: "multipleChoice",
      question: "Which picture shows a cat?",
      options: ["🐱", "🐶", "🐰", "🐻"],
      answer: 0,
      difficulty: "easy",
      explanation: "A cat says ‘meow’."
    },
    {
      id: "q2",
      type: "multipleChoice",
      question: "Which picture shows a bus?",
      options: ["🚗", "🚌", "🚲", "🚂"],
      answer: 1,
      difficulty: "easy",
      explanation: "A bus carries many people."
    },
    {
      id: "q3",
      type: "multipleChoice",
      question: "Choose the word: DOG",
      options: ["DOG", "DIG", "DOT", "DOLL"],
      answer: 0,
      difficulty: "easy",
      explanation: "DOG = D-O-G."
    },
    {
      id: "q4",
      type: "multipleChoice",
      question: "Which word is a colour?",
      options: ["red", "run", "cat", "jump"],
      answer: 0,
      difficulty: "easy",
      explanation: "Red is a colour."
    },
    {
      id: "q5",
      type: "multipleChoice",
      question: "Which word rhymes with CAT?",
      options: ["hat", "dog", "sun", "car"],
      answer: 0,
      difficulty: "easy",
      explanation: "Cat and hat sound the same at the end."
    },
    {
      id: "q6",
      type: "multipleChoice",
      passage: "Read: I like apples.",
      question: "What do I like?",
      options: ["apples", "bananas", "cars", "cats"],
      answer: 0,
      difficulty: "easy",
      explanation: "The sentence says ‘I like apples.’"
    },
    {
      id: "q7",
      type: "multipleChoice",
      question: "Choose the best word: I ___ to school.",
      options: ["go", "goes", "went", "going"],
      answer: 0,
      difficulty: "medium",
      explanation: "We say: ‘I go to school.’"
    },
    {
      id: "q8",
      type: "multipleChoice",
      question: "Choose the correct sentence.",
      options: ["i have a dog", "I have a dog.", "I Have a dog", "I have a Dog"],
      answer: 1,
      difficulty: "medium",
      explanation: "A sentence starts with a capital letter and ends with a full stop."
    },
    {
      id: "q9",
      type: "multipleChoice",
      question: "Which word means the same as BIG?",
      options: ["large", "small", "sad", "thin"],
      answer: 0,
      difficulty: "medium",
      explanation: "Big and large mean the same."
    },
    {
      id: "q10",
      type: "multipleChoice",
      question: "Read the word: BOOK. Which picture matches?",
      options: ["📚", "⚽", "🍎", "🚌"],
      answer: 0,
      difficulty: "easy",
      explanation: "A book is something you read."
    },
    {
      id: "q11",
      type: "multipleChoice",
      passage: "Mia has two pets: a cat and a fish.",
      question: "How many pets does Mia have?",
      options: ["one", "two", "three", "four"],
      answer: 1,
      difficulty: "medium",
      explanation: "Cat + fish = two pets."
    },
    {
      id: "q12",
      type: "multipleChoice",
      passage: "Ben is at the park. He plays on the swing.",
      question: "Where is Ben?",
      options: ["At the park", "At school", "At home", "At the shop"],
      answer: 0,
      difficulty: "medium",
      explanation: "The sentence says he is at the park."
    },
    {
      id: "q13",
      type: "multipleChoice",
      passage: "It is raining. Kim uses an umbrella.",
      question: "What does Kim use?",
      options: ["an umbrella", "a ball", "a hat", "a kite"],
      answer: 0,
      difficulty: "medium",
      explanation: "An umbrella helps in the rain."
    },
    {
      id: "q14",
      type: "multipleChoice",
      passage: "Dad cooks eggs. Mom makes toast.",
      question: "Who makes toast?",
      options: ["Dad", "Mom", "Ben", "Mia"],
      answer: 1,
      difficulty: "medium",
      explanation: "Mom makes toast."
    },
    {
      id: "q15",
      type: "trueFalse",
      question: "A bird has wings.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "Birds use wings to fly."
    },
    {
      id: "q16",
      type: "trueFalse",
      question: "A fish can fly.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "easy",
      explanation: "Fish swim in water."
    },
    {
      id: "q17",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: C _ T (a pet)",
      answer: "a",
      difficulty: "medium",
      explanation: "C-A-T spells CAT."
    },
    {
      id: "q18",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: D _ G (an animal)",
      answer: "o",
      difficulty: "medium",
      explanation: "D-O-G spells DOG."
    },
    {
      id: "q19",
      type: "multipleChoice",
      question: "Choose the best word: The sun is ___.",
      options: ["hot", "cold", "sad", "thin"],
      answer: 0,
      difficulty: "easy",
      explanation: "The sun is hot."
    },
    {
      id: "q20",
      type: "multipleChoice",
      question: "Which sentence tells you to be quiet?",
      options: ["Please be quiet.", "Let's play!", "I am hungry.", "Thank you."],
      answer: 0,
      difficulty: "medium",
      explanation: "‘Please be quiet.’ means ‘Do not make noise.’"
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
