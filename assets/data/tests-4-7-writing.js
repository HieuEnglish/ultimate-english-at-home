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
    ,
    {
      id: "q21",
      type: "prompt",
      question: "Copy the word: FISH",
      model: "FISH",
      difficulty: "easy",
      explanation: "Write the letters clearly. Leave spaces between letters."
    },
    {
      id: "q22",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: F _ S H",
      answer: "i",
      difficulty: "easy",
      explanation: "F-I-S-H spells FISH."
    },
    {
      id: "q23",
      type: "multipleChoice",
      question: "Choose the best end mark: Wow__",
      options: [".", "?", "!", ","],
      answer: 2,
      difficulty: "medium",
      explanation: "We use ! to show strong feeling."
    },
    {
      id: "q24",
      type: "multipleChoice",
      question: "Choose the best capital letter: ___e is my dad.",
      options: ["H", "h", "E", "e"],
      answer: 0,
      difficulty: "easy",
      explanation: "A sentence starts with a capital letter."
    },
    {
      id: "q25",
      type: "fillInTheBlank",
      question: "Fill in the missing word: I can ___ (jump).",
      answer: "jump",
      difficulty: "easy",
      explanation: "The action word is jump."
    },
    {
      id: "q26",
      type: "prompt",
      question: "Copy the sentence.",
      model: "We are friends.",
      difficulty: "medium",
      explanation: "Start with a capital letter and end with a full stop."
    },
    {
      id: "q27",
      type: "multipleChoice",
      question: "Choose the correct sentence.",
      options: ["We are happy", "we are happy.", "We are happy.", "We are Happy."],
      answer: 2,
      difficulty: "medium",
      explanation: "Use a capital letter and a full stop."
    },
    {
      id: "q28",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: h _ t (a hat)",
      answer: "a",
      difficulty: "easy",
      explanation: "h-a-t spells hat."
    },
    {
      id: "q29",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: r _ n",
      answer: "u",
      difficulty: "easy",
      explanation: "r-u-n spells run."
    },
    {
      id: "q30",
      type: "multipleChoice",
      question: "Which one has the best spacing?",
      options: ["Ilikerice.", "I like rice.", "I likeRice.", "I like  rice."],
      answer: 1,
      difficulty: "medium",
      explanation: "Words need one space between them."
    },
    {
      id: "q31",
      type: "prompt",
      question: "Write one sentence that starts with: I can ...",
      model: "I can ____.",
      difficulty: "easy",
      explanation: "Start with a capital I and end with a full stop."
    },
    {
      id: "q32",
      type: "multipleChoice",
      question: "Choose the best word: She ___ a cat.",
      options: ["have", "has", "am", "are"],
      answer: 1,
      difficulty: "medium",
      explanation: "We say: She has."
    },
    {
      id: "q33",
      type: "multipleChoice",
      question: "Choose the best word: They ___ play.",
      options: ["can", "cans", "is", "am"],
      answer: 0,
      difficulty: "medium",
      explanation: "We say: They can play."
    },
    {
      id: "q34",
      type: "fillInTheBlank",
      question: "Add -s for plural: two cat__",
      answer: "s",
      difficulty: "medium",
      explanation: "Two cats = add s."
    },
    {
      id: "q35",
      type: "fillInTheBlank",
      question: "Fill in the missing word: I have ___ apple.",
      answer: "an",
      difficulty: "medium",
      explanation: "We use an before a vowel sound (a, e, i, o, u)."
    },
    {
      id: "q36",
      type: "multipleChoice",
      question: "Choose the best word: I see ___ dog.",
      options: ["a", "an", "the", "to"],
      answer: 0,
      difficulty: "easy",
      explanation: "We say: a dog."
    },
    {
      id: "q37",
      type: "multipleChoice",
      question: "Which sentence is a question?",
      options: ["You like ice cream.", "Do you like ice cream?", "I like ice cream!", "Like ice cream."],
      answer: 1,
      difficulty: "medium",
      explanation: "A question ends with a question mark (?)."
    },
    {
      id: "q38",
      type: "prompt",
      question: "Write a question to a friend.",
      model: "Do you like ____?",
      difficulty: "hard",
      explanation: "Start with a capital letter and end with ?"
    },
    {
      id: "q39",
      type: "fillInTheBlank",
      question: "Add the missing end mark: I like books__",
      answer: ".",
      difficulty: "easy",
      explanation: "A statement ends with a full stop."
    },
    {
      id: "q40",
      type: "multipleChoice",
      question: "Choose the correct way to write this day: ___",
      options: ["monday", "Monday", "MONday", "MonDay"],
      answer: 1,
      difficulty: "medium",
      explanation: "Days start with a capital letter: Monday."
    },
    {
      id: "q41",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: M _ M (mother)",
      answer: "o",
      difficulty: "medium",
      explanation: "M-O-M spells MOM."
    },
    {
      id: "q42",
      type: "prompt",
      question: "Copy the word: PLEASE",
      model: "PLEASE",
      difficulty: "easy",
      explanation: "Write the letters clearly."
    },
    {
      id: "q43",
      type: "multipleChoice",
      question: "Choose the best way to write this name: ___",
      options: ["tom", "Tom", "TOM.", "tom."],
      answer: 1,
      difficulty: "easy",
      explanation: "Names start with a capital letter."
    },
    {
      id: "q44",
      type: "fillInTheBlank",
      question: "Fill in the missing word: ___ name is Ana.",
      answer: ["My", "my"],
      difficulty: "medium",
      explanation: "We say: My name is Ana."
    },
    {
      id: "q45",
      type: "multipleChoice",
      question: "Choose the correct sentence.",
      options: ["My name is Ana.", "my name is Ana.", "My name is ana.", "My name is Ana"],
      answer: 0,
      difficulty: "medium",
      explanation: "Use capitals for the first word and the name, plus a full stop."
    },
    {
      id: "q46",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: p _ n (write tool)",
      answer: "e",
      difficulty: "easy",
      explanation: "p-e-n spells pen."
    },
    {
      id: "q47",
      type: "prompt",
      question: "Write the word for this picture: 🐶",
      model: "dog",
      difficulty: "easy",
      explanation: "Write the word dog."
    },
    {
      id: "q48",
      type: "multipleChoice",
      question: "Choose the best word: I ___ two cats.",
      options: ["have", "has", "am", "is"],
      answer: 0,
      difficulty: "medium",
      explanation: "We say: I have two cats."
    },
    {
      id: "q49",
      type: "multipleChoice",
      question: "Which word is spelled correctly?",
      options: ["frend", "friend", "freind", "firend"],
      answer: 1,
      difficulty: "hard",
      explanation: "The correct spelling is friend."
    },
    {
      id: "q50",
      type: "fillInTheBlank",
      question: "Fill in the missing letters: fr _ _ nd",
      answer: "ie",
      difficulty: "hard",
      explanation: "f-r-i-e-n-d spells friend."
    },
    {
      id: "q51",
      type: "prompt",
      question: "Write two sentences about your family.",
      model: "I have ____. I love ____.",
      difficulty: "hard",
      explanation: "Start each sentence with a capital letter and end with a full stop."
    },
    {
      id: "q52",
      type: "multipleChoice",
      question: "Choose the best punctuation: Hello__ Mom!",
      options: [".", ",", "?", "!"],
      answer: 1,
      difficulty: "medium",
      explanation: "After Hello, we often use a comma."
    },
    {
      id: "q53",
      type: "fillInTheBlank",
      question: "Add the missing comma: Hello _ Dad.",
      answer: ",",
      difficulty: "medium",
      explanation: "We write: Hello, Dad."
    },
    {
      id: "q54",
      type: "fillInTheBlank",
      question: "Fill in the missing word: I ___ 6 years old.",
      answer: "am",
      difficulty: "easy",
      explanation: "We say: I am 6 years old."
    },
    {
      id: "q55",
      type: "multipleChoice",
      question: "Choose the best word: He ___ tall.",
      options: ["are", "am", "is", "be"],
      answer: 2,
      difficulty: "medium",
      explanation: "We say: He is tall."
    },
    {
      id: "q56",
      type: "prompt",
      question: "Copy the sentence.",
      model: "Can I have water, please?",
      difficulty: "hard",
      explanation: "Start with a capital letter and end with a question mark."
    },
    {
      id: "q57",
      type: "multipleChoice",
      question: "Choose the best end mark: Stop__",
      options: [".", "?", "!", ","],
      answer: 2,
      difficulty: "medium",
      explanation: "We use ! when we want someone to stop strongly."
    },
    {
      id: "q58",
      type: "fillInTheBlank",
      question: "Fill in the missing letter: _ook (a book)",
      answer: "b",
      difficulty: "easy",
      explanation: "b-o-o-k spells book."
    },
    {
      id: "q59",
      type: "multipleChoice",
      question: "Which word is spelled correctly?",
      options: ["aplpe", "apple", "aple", "appel"],
      answer: 1,
      difficulty: "easy",
      explanation: "The correct spelling is apple."
    },
    {
      id: "q60",
      type: "prompt",
      question: "Write a list: 3 things you want to buy.",
      model: "____, ____, ____",
      difficulty: "medium",
      explanation: "Use commas and spaces between items."
    },
    {
      id: "q61",
      type: "multipleChoice",
      question: "Choose the best sentence with and.",
      options: ["I like apples and bananas.", "I like apples andbananas.", "I like apples, and bananas.", "I like apples And bananas."],
      answer: 0,
      difficulty: "medium",
      explanation: "Use spaces and a lowercase and in the middle."
    },
    {
      id: "q62",
      type: "fillInTheBlank",
      question: "Fill in the missing word: I like apples ___ bananas.",
      answer: "and",
      difficulty: "easy",
      explanation: "And joins two things."
    },
    {
      id: "q63",
      type: "multipleChoice",
      question: "Choose the best word: The cat is ___ the box.",
      options: ["in", "on", "at", "to"],
      answer: 0,
      difficulty: "medium",
      explanation: "In means inside."
    },
    {
      id: "q64",
      type: "fillInTheBlank",
      question: "Fill in the missing word: The ball is ___ the box.",
      answer: "in",
      difficulty: "easy",
      explanation: "In means inside."
    },
    {
      id: "q65",
      type: "prompt",
      question: "Write one sentence with a reason. Use: because",
      model: "I like ____ because ____.",
      difficulty: "hard",
      explanation: "Start with a capital letter and end with a full stop."
    },
    {
      id: "q66",
      type: "multipleChoice",
      question: "Choose the best sentence.",
      options: ["Because I like it.", "I like it because it is fun.", "I like it Because it is fun.", "I like it, because it is fun."],
      answer: 1,
      difficulty: "hard",
      explanation: "Because goes in the middle here, and we do not need a comma."
    },
    {
      id: "q67",
      type: "fillInTheBlank",
      question: "Write the missing capital letter: _ love my dog.",
      answer: "I",
      difficulty: "medium",
      explanation: "The word I is always a capital letter."
    },
    {
      id: "q68",
      type: "multipleChoice",
      question: "Choose the best sentence.",
      options: ["I can't swim.", "I cant swim.", "i can't swim.", "I can't swim"],
      answer: 0,
      difficulty: "hard",
      explanation: "Use a capital I, an apostrophe in can't, and a full stop."
    },
    {
      id: "q69",
      type: "prompt",
      question: "Write a short note to a friend.",
      model: "Hi ____. Let's play.",
      difficulty: "hard",
      explanation: "Start with Hi, use a comma after the name, and end with a full stop."
    },
    {
      id: "q70",
      type: "fillInTheBlank",
      question: "Add the missing end mark: Let's play__",
      answer: ".",
      difficulty: "easy",
      explanation: "A sentence ends with a full stop."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
