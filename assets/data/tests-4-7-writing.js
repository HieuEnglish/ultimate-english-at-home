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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing letter: C _ T",
      answer: "a",
      difficulty: "easy",
      explanation: "C-A-T spells CAT."
    },
    {
      id: "q4",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing letter: D O _",
      answer: "g",
      difficulty: "easy",
      explanation: "D-O-G spells DOG."
    },
    {
      id: "q5",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best capital letter: ___ am Sam.",
      options: ["I", "i", "A", "S"],
      answer: 0,
      difficulty: "easy",
      explanation: "A sentence starts with a capital letter."
    },
    {
      id: "q6",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct sentence.",
      options: ["i can run", "I can run.", "I can Run", "I can run"],
      answer: 1,
      difficulty: "medium",
      explanation: "Use a capital letter and a full stop."
    },
    {
      id: "q7",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best word: I ___ happy.",
      options: ["are", "is", "am", "be"], answer: 2,
      difficulty: "easy",
      explanation: "We say: I am happy."
    },
    {
      id: "q8",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Which one has spaces between words?",
      options: ["Ilikecats.", "I-like-cats.", "I likecats.", "I like cats."], answer: 3,
      difficulty: "medium",
      explanation: "Words need spaces: I / like / cats."
    },
    {
      id: "q9",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best end mark: Are you ready__",
      options: ["?", ".", "!", ","], answer: 0,
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: I like ___ (🐶).",
      answer: ["dog", "dogs"],
      difficulty: "medium",
      explanation: "Dog / dogs are both OK here."
    },
    {
      id: "q12",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Write the word for this picture: ☀️",
      answer: "sun",
      difficulty: "easy",
      explanation: "☀️ = sun."
    },
    {
      id: "q13",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best order.",
      options: ["I school go.", "I go to school.", "Go I school.", "School go I."], answer: 1,
      difficulty: "medium",
      explanation: "Correct order: I go to school."
    },
    {
      id: "q14",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing letter: _at (🐱)",
      answer: "c",
      difficulty: "easy",
      explanation: "Cat starts with C."
    },
    {
      id: "q15",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct punctuation: I have a dog__",
      options: ["!", "?", ".", ";"], answer: 2,
      difficulty: "medium",
      explanation: "A statement ends with a full stop."
    },
    {
      id: "q16",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Which word is spelled correctly?",
      options: ["skool", "shcool", "scool", "school"], answer: 3,
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing letter: F _ S H",
      answer: "i",
      difficulty: "easy",
      explanation: "F-I-S-H spells FISH."
    },
    {
      id: "q23",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best end mark: Wow__",
      options: ["!", "?", ".", ","], answer: 0,
      difficulty: "medium",
      explanation: "We use ! to show strong feeling."
    },
    {
      id: "q24",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best capital letter: ___e is my dad.",
      options: ["h", "H", "E", "e"], answer: 1,
      difficulty: "easy",
      explanation: "A sentence starts with a capital letter."
    },
    {
      id: "q25",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct sentence.",
      options: ["We are happy", "we are happy.", "We are happy.", "We are Happy."],
      answer: 2,
      difficulty: "medium",
      explanation: "Use a capital letter and a full stop."
    },
    {
      id: "q28",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing letter: h _ t (a hat)",
      answer: "a",
      difficulty: "easy",
      explanation: "h-a-t spells hat."
    },
    {
      id: "q29",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing letter: r _ n",
      answer: "u",
      difficulty: "easy",
      explanation: "r-u-n spells run."
    },
    {
      id: "q30",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Which one has the best spacing?",
      options: ["Ilikerice.", "I like  rice.", "I likeRice.", "I like rice."], answer: 3,
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best word: She ___ a cat.",
      options: ["has", "have", "am", "are"], answer: 0,
      difficulty: "medium",
      explanation: "We say: She has."
    },
    {
      id: "q33",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best word: They ___ play.",
      options: ["cans", "can", "is", "am"], answer: 1,
      difficulty: "medium",
      explanation: "We say: They can play."
    },
    {
      id: "q34",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Add -s for plural: two cat__",
      answer: "s",
      difficulty: "medium",
      explanation: "Two cats = add s."
    },
    {
      id: "q35",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: I have ___ apple.",
      answer: "an",
      difficulty: "medium",
      explanation: "We use an before a vowel sound (a, e, i, o, u)."
    },
    {
      id: "q36",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best word: I see ___ dog.",
      options: ["the", "an", "a", "to"], answer: 2,
      difficulty: "easy",
      explanation: "We say: a dog."
    },
    {
      id: "q37",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Which sentence is a question?",
      options: ["You like ice cream.", "Like ice cream.", "I like ice cream!", "Do you like ice cream?"], answer: 3,
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Add the missing end mark: I like books__",
      answer: ".",
      difficulty: "easy",
      explanation: "A statement ends with a full stop."
    },
    {
      id: "q40",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct way to write this day: ___",
      options: ["Monday", "monday", "MONday", "MonDay"], answer: 0,
      difficulty: "medium",
      explanation: "Days start with a capital letter: Monday."
    },
    {
      id: "q41",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best way to write this name: ___",
      options: ["tom", "Tom", "TOM.", "tom."],
      answer: 1,
      difficulty: "easy",
      explanation: "Names start with a capital letter."
    },
    {
      id: "q44",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: ___ name is Ana.",
      answer: ["My", "my"],
      difficulty: "medium",
      explanation: "We say: My name is Ana."
    },
    {
      id: "q45",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct sentence.",
      options: ["My name is ana.", "my name is Ana.", "My name is Ana.", "My name is Ana"], answer: 2,
      difficulty: "medium",
      explanation: "Use capitals for the first word and the name, plus a full stop."
    },
    {
      id: "q46",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best word: I ___ two cats.",
      options: ["is", "has", "am", "have"], answer: 3,
      difficulty: "medium",
      explanation: "We say: I have two cats."
    },
    {
      id: "q49",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Which word is spelled correctly?",
      options: ["friend", "frend", "freind", "firend"], answer: 0,
      difficulty: "hard",
      explanation: "The correct spelling is friend."
    },
    {
      id: "q50",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best punctuation: Hello__ Mom!",
      options: [".", ",", "?", "!"],
      answer: 1,
      difficulty: "medium",
      explanation: "After Hello, we often use a comma."
    },
    {
      id: "q53",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Add the missing comma: Hello _ Dad.",
      answer: ",",
      difficulty: "medium",
      explanation: "We write: Hello, Dad."
    },
    {
      id: "q54",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: I ___ 6 years old.",
      answer: "am",
      difficulty: "easy",
      explanation: "We say: I am 6 years old."
    },
    {
      id: "q55",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best end mark: Stop__",
      options: [".", "?", ",", "!"], answer: 3,
      difficulty: "medium",
      explanation: "We use ! when we want someone to stop strongly."
    },
    {
      id: "q58",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing letter: _ook (a book)",
      answer: "b",
      difficulty: "easy",
      explanation: "b-o-o-k spells book."
    },
    {
      id: "q59",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Which word is spelled correctly?",
      options: ["apple", "aplpe", "aple", "appel"], answer: 0,
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best sentence with and.",
      options: ["I like apples andbananas.", "I like apples and bananas.", "I like apples, and bananas.", "I like apples And bananas."], answer: 1,
      difficulty: "medium",
      explanation: "Use spaces and a lowercase and in the middle."
    },
    {
      id: "q62",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: I like apples ___ bananas.",
      answer: "and",
      difficulty: "easy",
      explanation: "And joins two things."
    },
    {
      id: "q63",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best word: The cat is ___ the box.",
      options: ["at", "on", "in", "to"], answer: 2,
      difficulty: "medium",
      explanation: "In means inside."
    },
    {
      id: "q64",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best sentence.",
      options: ["Because I like it.", "I like it, because it is fun.", "I like it Because it is fun.", "I like it because it is fun."], answer: 3,
      difficulty: "hard",
      explanation: "Because goes in the middle here, and we do not need a comma."
    },
    {
      id: "q67",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Write the missing capital letter: _ love my dog.",
      answer: "I",
      difficulty: "medium",
      explanation: "The word I is always a capital letter."
    },
    {
      id: "q68",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Add the missing end mark: Let's play__",
      answer: ".",
      difficulty: "easy",
      explanation: "A sentence ends with a full stop."
    },
    {
      id: "q71",
      type: "prompt",
      question: "Write 1 sentence about your favourite animal.",
      model: "I like ____.",
      difficulty: "medium",
      explanation: "Use a capital letter and a full stop."
    }
  ];

  // Global export (no build step)


  // Added to normalize this bank to 111 items.
  QUESTIONS.push(
    {
      "id": "q72",
      "type": "prompt",
      "question": "Write your favourite animal word.",
      "model": "cat",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q73",
      "type": "prompt",
      "question": "Write your favourite food word.",
      "model": "rice",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q74",
      "type": "prompt",
      "question": "Copy the word: SUN",
      "model": "SUN",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q75",
      "type": "prompt",
      "question": "Copy the word: BOOK",
      "model": "BOOK",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q76",
      "type": "prompt",
      "question": "Copy the sentence: I like juice.",
      "model": "I like juice.",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q77",
      "type": "prompt",
      "question": "Write 3 colour words.",
      "model": "red, blue, green",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q78",
      "type": "prompt",
      "question": "Write 3 animal words.",
      "model": "cat, dog, fish",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q79",
      "type": "prompt",
      "question": "Write a sentence about your bag.",
      "model": "I have a blue bag.",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q80",
      "type": "prompt",
      "question": "Write a sentence about your favourite food.",
      "model": "I like noodles.",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q81",
      "type": "prompt",
      "question": "Write a question to your friend.",
      "model": "How are you?",
      "difficulty": "easy",
      "explanation": "Use clear letters and spaces."
    },
    {
      "id": "q82",
      "type": "fillInTheBlank",
      "question": "Fill in the missing letter: B _ G",
      "answer": "a",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q83",
      "type": "fillInTheBlank",
      "question": "Fill in the missing letter: S _ N",
      "answer": "u",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q84",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: I am ____.",
      "answer": "happy",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q85",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: The sky is ____.",
      "answer": "blue",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q86",
      "type": "fillInTheBlank",
      "question": "Fill in the missing letter: c _ p",
      "answer": "u",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q87",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: We sit on a ____.",
      "answer": "chair",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q88",
      "type": "fillInTheBlank",
      "question": "Fill in the missing letter: d _ g",
      "answer": "o",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q89",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: I see a ____.",
      "answer": "bird",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q90",
      "type": "fillInTheBlank",
      "question": "Fill in the missing letter: p _ n",
      "answer": "e",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q91",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: I like to ____.",
      "answer": "play",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q92",
      "type": "fillInTheBlank",
      "question": "Fill in the missing letter: sh _ e",
      "answer": "o",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q93",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: It is ____ today.",
      "answer": "sunny",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q94",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: My name is ____.",
      "answer": "Sam",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q95",
      "type": "fillInTheBlank",
      "question": "Fill in the missing letter: tr _ e",
      "answer": "e",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q96",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: A cat can ____.",
      "answer": "run",
      "difficulty": "easy",
      "explanation": "Think about the missing word or letter."
    },
    {
      "id": "q97",
      "type": "multipleChoice",
      "question": "Choose the correct sentence.",
      "options": [
        "i am tom",
        "I am Tom.",
        "I Am Tom",
        "I am tom"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q98",
      "type": "multipleChoice",
      "question": "Choose the best capital letter: ___ like apples.",
      "options": [
        "i",
        "I",
        "L",
        "A"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q99",
      "type": "multipleChoice",
      "question": "Choose the best end mark: What is your name__",
      "options": [
        ".",
        "!",
        ",",
        "?"
      ],
      "answer": 3,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q100",
      "type": "multipleChoice",
      "question": "Choose the best word: We ____ books.",
      "options": [
        "read",
        "reads",
        "reading",
        "reads."
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q101",
      "type": "multipleChoice",
      "question": "Which one has spaces?",
      "options": [
        "Ihaveaball.",
        "I have a ball.",
        "Ihave a ball.",
        "I haveaball."
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q102",
      "type": "multipleChoice",
      "question": "Choose the correct word order.",
      "options": [
        "I school go.",
        "Go I school.",
        "I go to school.",
        "School I go."
      ],
      "answer": 2,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q103",
      "type": "multipleChoice",
      "question": "Choose the best word: The dog is ____.",
      "options": [
        "blue",
        "happy",
        "run",
        "book"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q104",
      "type": "multipleChoice",
      "question": "Choose the correct sentence.",
      "options": [
        "She like cats.",
        "She likes cats.",
        "She liking cats.",
        "She likes Cats"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q105",
      "type": "multipleChoice",
      "question": "Choose the correct punctuation: I have two pens__",
      "options": [
        ".",
        "?",
        ",",
        ":"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q106",
      "type": "multipleChoice",
      "question": "Choose the best word: A baby cat is a ____.",
      "options": [
        "puppy",
        "kitten",
        "cub",
        "calf"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q107",
      "type": "multipleChoice",
      "question": "Choose the best sentence start.",
      "options": [
        "because I am tired.",
        "I am tired because",
        "Because I am tired, I sleep.",
        "I tired am."
      ],
      "answer": 2,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q108",
      "type": "multipleChoice",
      "question": "Choose the correct plural word.",
      "options": [
        "books",
        "bookes",
        "boox",
        "book"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q109",
      "type": "multipleChoice",
      "question": "Choose the best word: We wash our ____.",
      "options": [
        "mouth",
        "hands",
        "rain",
        "music"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q110",
      "type": "multipleChoice",
      "question": "Choose the correct sentence.",
      "options": [
        "The sun is hot.",
        "the sun is hot.",
        "The Sun is hot",
        "The sun is Hot"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },
    {
      "id": "q111",
      "type": "multipleChoice",
      "question": "Choose the best punctuation: Stop__",
      "options": [
        "?",
        "!",
        ".",
        ","
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Choose the clearest writing form."
    },

{
    "id": "q112",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q113",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q114",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q115",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q116",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q117",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q118",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q119",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q120",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q121",
    "type": "prompt",
    "question": "Write one short sentence about your family.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},

{
    "id": "q122",
    "type": "prompt",
    "question": "Trace letter C and say a word that starts with C.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q123",
    "type": "prompt",
    "question": "Draw a sun and say one sentence about it.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q124",
    "type": "prompt",
    "question": "Say your name and write the first letter.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q125",
    "type": "prompt",
    "question": "Draw your favorite food and name it.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q126",
    "type": "prompt",
    "question": "Trace letter D and clap the sounds in dog.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q127",
    "type": "prompt",
    "question": "Draw a ball and say its color.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q128",
    "type": "prompt",
    "question": "Write one short sentence about your pet.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q129",
    "type": "prompt",
    "question": "Draw your house and label one room.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q130",
    "type": "prompt",
    "question": "Say two action words you can do.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q131",
    "type": "prompt",
    "question": "Write one sentence: I like ____.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},

{
    "id": "q132",
    "type": "prompt",
    "question": "Say the letter and draw one matching object.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q133",
    "type": "prompt",
    "question": "Write one short sentence about your day.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q134",
    "type": "prompt",
    "question": "Draw your favorite animal and label it.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q135",
    "type": "prompt",
    "question": "Write: I like ____.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q136",
    "type": "prompt",
    "question": "Say three words you know.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q137",
    "type": "prompt",
    "question": "Trace a letter and say its sound.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q138",
    "type": "prompt",
    "question": "Draw your home and name one room.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q139",
    "type": "prompt",
    "question": "Write one sentence about school.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q140",
    "type": "prompt",
    "question": "Say one color and one food.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q141",
    "type": "prompt",
    "question": "Write your name clearly.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q142",
    "type": "prompt",
    "question": "Say the letter and draw one matching object.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q143",
    "type": "prompt",
    "question": "Write one short sentence about your day.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q144",
    "type": "prompt",
    "question": "Draw your favorite animal and label it.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q145",
    "type": "prompt",
    "question": "Write: I like ____.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q146",
    "type": "prompt",
    "question": "Say three words you know.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q147",
    "type": "prompt",
    "question": "Trace a letter and say its sound.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q148",
    "type": "prompt",
    "question": "Draw your home and name one room.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q149",
    "type": "prompt",
    "question": "Write one sentence about school.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q150",
    "type": "prompt",
    "question": "Say one color and one food.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q151",
    "type": "prompt",
    "question": "Write your name clearly.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
}



  );
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
