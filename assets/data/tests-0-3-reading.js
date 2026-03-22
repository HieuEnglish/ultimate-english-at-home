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
    "id": "q1",
    "type": "multipleChoice",
    "question": "Tap the letter: A",
    "options": [
      "B",
      "A",
      "C",
      "D"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "A looks like a pointy triangle with a line."
  },
  {
    "id": "q2",
    "type": "multipleChoice",
    "question": "Tap the letter: B",
    "options": [
      "D",
      "P",
      "B",
      "R"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "B has two bumps."
  },
  {
    "id": "q3",
    "type": "multipleChoice",
    "question": "Tap the letter: C",
    "options": [
      "O",
      "Q",
      "G",
      "C"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "C is open like a smile."
  },
  {
    "id": "q4",
    "type": "multipleChoice",
    "question": "Tap the letter: M",
    "options": [
      "M",
      "N",
      "W",
      "H"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "M has two mountains."
  },
  {
    "id": "q5",
    "type": "multipleChoice",
    "question": "Tap the letter: S",
    "options": [
      "Z",
      "S",
      "E",
      "G"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "S is a curvy snake shape."
  },
  {
    "id": "q6",
    "type": "multipleChoice",
    "question": "Which word says: MOM",
    "options": [
      "MAN",
      "DAD",
      "MOM",
      "MAP"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "MOM = M-O-M."
  },
  {
    "id": "q7",
    "type": "multipleChoice",
    "question": "Which word says: DAD",
    "options": [
      "DAY",
      "DOG",
      "DOLL",
      "DAD"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "DAD = D-A-D."
  },
  {
    "id": "q8",
    "type": "multipleChoice",
    "question": "Look at the word: CAT. Which picture matches?",
    "options": [
      "🐱",
      "🐶",
      "🐰",
      "🦊"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "CAT matches the cat picture."
  },
  {
    "id": "q9",
    "type": "multipleChoice",
    "question": "Look at the word: DOG. Which picture matches?",
    "options": [
      "🐱",
      "🐶",
      "🐭",
      "🐻"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "DOG matches the dog picture."
  },
  {
    "id": "q10",
    "type": "multipleChoice",
    "question": "Look at the word: SUN. Which picture matches?",
    "options": [
      "🌙",
      "⭐",
      "☀️",
      "☁️"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "SUN matches the sun."
  },
  {
    "id": "q11",
    "type": "multipleChoice",
    "question": "Which is the SAME as: A",
    "options": [
      "b",
      "a",
      "B",
      "A"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "This one is the same big A."
  },
  {
    "id": "q12",
    "type": "multipleChoice",
    "question": "Which is the SAME as: O",
    "options": [
      "O",
      "Q",
      "C",
      "D"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "O is a round circle."
  },
  {
    "id": "q13",
    "type": "multipleChoice",
    "question": "Look at the word: BUS. Which picture matches?",
    "options": [
      "🚗",
      "🚌",
      "🚲",
      "🚂"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "BUS matches the bus."
  },
  {
    "id": "q14",
    "type": "multipleChoice",
    "question": "Look at the word: BALL. Which picture matches?",
    "options": [
      "🎾",
      "⚽",
      "🏀",
      "🏈"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "BALL can be a basketball."
  },
  {
    "id": "q15",
    "type": "multipleChoice",
    "question": "Tap the letter: T",
    "options": [
      "F",
      "L",
      "I",
      "T"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "T has a top line and a long line down."
  },
  {
    "id": "q16",
    "type": "multipleChoice",
    "question": "Tap the letter: E",
    "options": [
      "E",
      "F",
      "P",
      "B"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "E has three lines across."
  },
  {
    "id": "q17",
    "type": "multipleChoice",
    "question": "Tap the letter: L",
    "options": [
      "I",
      "L",
      "T",
      "J"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "L looks like a corner."
  },
  {
    "id": "q18",
    "type": "multipleChoice",
    "question": "Tap the letter: R",
    "options": [
      "P",
      "B",
      "R",
      "K"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "R looks like P with a little leg."
  },
  {
    "id": "q19",
    "type": "multipleChoice",
    "question": "Which word says: HI",
    "options": [
      "HE",
      "BY",
      "IT",
      "HI"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "HI = H-I."
  },
  {
    "id": "q20",
    "type": "multipleChoice",
    "question": "Which word says: NO",
    "options": [
      "NO",
      "ON",
      "GO",
      "OK"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "NO = N-O."
  },
  {
    "id": "q21",
    "type": "multipleChoice",
    "question": "Look at the word: CAR. Which picture matches?",
    "options": [
      "🚌",
      "🚗",
      "🚲",
      "🚂"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "CAR matches the car picture."
  },
  {
    "id": "q22",
    "type": "multipleChoice",
    "question": "Look at the word: APPLE. Which picture matches?",
    "options": [
      "🍇",
      "🍌",
      "🍎",
      "🍓"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "APPLE matches the apple picture."
  },
  {
    "id": "q23",
    "type": "multipleChoice",
    "question": "Look at the word: MILK. Which picture matches?",
    "options": [
      "☕",
      "💧",
      "🧃",
      "🥛"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "MILK matches the milk picture."
  },
  {
    "id": "q24",
    "type": "multipleChoice",
    "question": "Look at the word: BED. Which picture matches?",
    "options": [
      "🛏️",
      "🚪",
      "🪑",
      "🛁"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "BED matches the bed picture."
  },
  {
    "id": "q25",
    "type": "multipleChoice",
    "question": "Tap the first letter in: CAT",
    "options": [
      "A",
      "C",
      "T",
      "B"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "CAT starts with C."
  },
  {
    "id": "q26",
    "type": "multipleChoice",
    "question": "Tap the first letter in: DOG",
    "options": [
      "G",
      "O",
      "D",
      "B"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "DOG starts with D."
  },
  {
    "id": "q27",
    "type": "multipleChoice",
    "question": "Tap the last letter in: DOG",
    "options": [
      "D",
      "O",
      "C",
      "G"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "DOG ends with G."
  },
  {
    "id": "q28",
    "type": "multipleChoice",
    "question": "Which is the SAME as: a",
    "options": [
      "a",
      "A",
      "B",
      "b"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "This one is the same small a."
  },
  {
    "id": "q29",
    "type": "multipleChoice",
    "question": "Tap the letter: o",
    "options": [
      "a",
      "o",
      "c",
      "e"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "o is a small round circle."
  },
  {
    "id": "q30",
    "type": "multipleChoice",
    "question": "Look at the word: MOON. Which picture matches?",
    "options": [
      "☀️",
      "⭐",
      "🌙",
      "☁️"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "MOON matches the moon."
  },
  {
    "id": "q31",
    "type": "multipleChoice",
    "question": "Tap the letter: F",
    "options": [
      "P",
      "E",
      "T",
      "F"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "F has one line down and two lines across."
  },
  {
    "id": "q32",
    "type": "multipleChoice",
    "question": "Tap the letter: G",
    "options": [
      "G",
      "O",
      "C",
      "Q"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "G looks like C with a little line."
  },
  {
    "id": "q33",
    "type": "multipleChoice",
    "question": "Tap the letter: H",
    "options": [
      "N",
      "H",
      "M",
      "A"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "H has two tall lines and a bridge."
  },
  {
    "id": "q34",
    "type": "multipleChoice",
    "question": "Tap the letter: J",
    "options": [
      "I",
      "L",
      "J",
      "T"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "J has a hook at the bottom."
  },
  {
    "id": "q35",
    "type": "multipleChoice",
    "question": "Tap the letter: K",
    "options": [
      "R",
      "B",
      "H",
      "K"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "K has one line and two slanted lines."
  },
  {
    "id": "q36",
    "type": "multipleChoice",
    "question": "Tap the letter: N",
    "options": [
      "N",
      "M",
      "W",
      "H"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "N has a line going across like a slide."
  },
  {
    "id": "q37",
    "type": "multipleChoice",
    "question": "Tap the letter: P",
    "options": [
      "R",
      "P",
      "B",
      "D"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "P has one bump at the top."
  },
  {
    "id": "q38",
    "type": "multipleChoice",
    "question": "Tap the letter: U",
    "options": [
      "V",
      "Y",
      "U",
      "J"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "U looks like a cup shape."
  },
  {
    "id": "q39",
    "type": "multipleChoice",
    "question": "Tap the letter: V",
    "options": [
      "Y",
      "U",
      "W",
      "V"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "V looks like a pointy valley."
  },
  {
    "id": "q40",
    "type": "multipleChoice",
    "question": "Tap the letter: X",
    "options": [
      "X",
      "K",
      "Y",
      "Z"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "X is two lines crossing."
  },
  {
    "id": "q41",
    "type": "multipleChoice",
    "question": "Look at the word: HAT. Which picture matches?",
    "options": [
      "🎩",
      "🧢",
      "👒",
      "🎓"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "HAT matches the hat picture."
  },
  {
    "id": "q42",
    "type": "multipleChoice",
    "question": "Look at the word: CUP. Which picture matches?",
    "options": [
      "🥛",
      "🍪",
      "☕",
      "🍎"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "CUP matches the cup."
  },
  {
    "id": "q43",
    "type": "multipleChoice",
    "question": "Look at the word: BOOK. Which picture matches?",
    "options": [
      "🧸",
      "✏️",
      "🧩",
      "📘"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "BOOK matches the book."
  },
  {
    "id": "q44",
    "type": "multipleChoice",
    "question": "Look at the word: FISH. Which picture matches?",
    "options": [
      "🐟",
      "🐶",
      "🐸",
      "🐱"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "FISH matches the fish."
  },
  {
    "id": "q45",
    "type": "multipleChoice",
    "question": "Look at the word: BIRD. Which picture matches?",
    "options": [
      "🐠",
      "🐦",
      "🐭",
      "🦋"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "BIRD matches the bird."
  },
  {
    "id": "q46",
    "type": "multipleChoice",
    "question": "Look at the word: TREE. Which picture matches?",
    "options": [
      "🍄",
      "🌸",
      "🌳",
      "🌵"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "TREE matches the tree."
  },
  {
    "id": "q47",
    "type": "multipleChoice",
    "question": "Look at the word: STAR. Which picture matches?",
    "options": [
      "☁️",
      "🌙",
      "☀️",
      "⭐"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "STAR matches the star."
  },
  {
    "id": "q48",
    "type": "multipleChoice",
    "question": "Look at the word: CAKE. Which picture matches?",
    "options": [
      "🎂",
      "🍕",
      "🍪",
      "🍎"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "CAKE matches the cake."
  },
  {
    "id": "q49",
    "type": "multipleChoice",
    "question": "Look at the word: TRAIN. Which picture matches?",
    "options": [
      "🚌",
      "🚂",
      "🚗",
      "✈️"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "TRAIN matches the train."
  },
  {
    "id": "q50",
    "type": "multipleChoice",
    "question": "Look at the word: BOAT. Which picture matches?",
    "options": [
      "🚲",
      "🚗",
      "🚤",
      "🚂"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "BOAT matches the boat."
  },
  {
    "id": "q51",
    "type": "multipleChoice",
    "question": "Which is the SAME as: b",
    "options": [
      "B",
      "p",
      "d",
      "b"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "This one is the same small b."
  },
  {
    "id": "q52",
    "type": "multipleChoice",
    "question": "Which is the SAME as: D",
    "options": [
      "D",
      "O",
      "B",
      "P"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "D has one big curve."
  },
  {
    "id": "q53",
    "type": "multipleChoice",
    "question": "Which word says: YES",
    "options": [
      "YET",
      "YES",
      "YOU",
      "YAM"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "YES = Y-E-S."
  },
  {
    "id": "q54",
    "type": "multipleChoice",
    "question": "Which word says: GO",
    "options": [
      "DO",
      "NO",
      "GO",
      "SO"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "GO = G-O."
  },
  {
    "id": "q55",
    "type": "multipleChoice",
    "question": "Which word says: UP",
    "options": [
      "IP",
      "PU",
      "OP",
      "UP"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "UP = U-P."
  },
  {
    "id": "q56",
    "type": "multipleChoice",
    "question": "Which word says: ME",
    "options": [
      "ME",
      "WE",
      "MY",
      "MA"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "ME = M-E."
  },
  {
    "id": "q57",
    "type": "multipleChoice",
    "question": "Tap the first letter in: BUS",
    "options": [
      "U",
      "B",
      "S",
      "D"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "BUS starts with B."
  },
  {
    "id": "q58",
    "type": "multipleChoice",
    "question": "Tap the first letter in: MILK",
    "options": [
      "L",
      "I",
      "M",
      "K"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "MILK starts with M."
  },
  {
    "id": "q59",
    "type": "multipleChoice",
    "question": "Tap the last letter in: CAT",
    "options": [
      "C",
      "A",
      "D",
      "T"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "CAT ends with T."
  },
  {
    "id": "q60",
    "type": "multipleChoice",
    "question": "Tap the last letter in: SUN",
    "options": [
      "N",
      "S",
      "U",
      "T"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "SUN ends with N."
  },
  {
    "id": "q61",
    "type": "multipleChoice",
    "question": "Tap the middle letter in: MOM",
    "options": [
      "M",
      "O",
      "D",
      "A"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "MOM has O in the middle."
  },
  {
    "id": "q62",
    "type": "multipleChoice",
    "question": "Look at the word: EGG. Which picture matches?",
    "options": [
      "🍞",
      "🍎",
      "🥚",
      "🥛"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "EGG matches the egg."
  },
  {
    "id": "q63",
    "type": "multipleChoice",
    "question": "Look at the word: ICE. Which picture matches?",
    "options": [
      "☀️",
      "🔥",
      "💧",
      "🧊"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "ICE matches the ice cube."
  },
  {
    "id": "q64",
    "type": "multipleChoice",
    "question": "Tap the first letter in: FISH",
    "options": [
      "F",
      "I",
      "S",
      "H"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "FISH starts with F."
  },
  {
    "id": "q65",
    "type": "multipleChoice",
    "question": "Tap the last letter in: FISH",
    "options": [
      "F",
      "H",
      "S",
      "I"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "FISH ends with H."
  },
  {
    "id": "q66",
    "type": "multipleChoice",
    "question": "Tap the first letter in: HAT",
    "options": [
      "T",
      "A",
      "H",
      "B"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "HAT starts with H."
  },
  {
    "id": "q67",
    "type": "multipleChoice",
    "question": "Tap the last letter in: HAT",
    "options": [
      "H",
      "A",
      "D",
      "T"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "HAT ends with T."
  },
  {
    "id": "q68",
    "type": "multipleChoice",
    "question": "Which is the SAME as: m",
    "options": [
      "m",
      "n",
      "M",
      "w"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "This one is the same small m."
  },
  {
    "id": "q69",
    "type": "multipleChoice",
    "question": "Which is the SAME as: R",
    "options": [
      "K",
      "R",
      "P",
      "B"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "R has a bump and a little leg."
  },
  {
    "id": "q70",
    "type": "multipleChoice",
    "question": "Tap the letter: y",
    "options": [
      "v",
      "g",
      "y",
      "j"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "y goes down like a tail."
  },
  {
    "id": "q71",
    "type": "multipleChoice",
    "question": "Tap the letter: p",
    "options": [
      "q",
      "b",
      "d",
      "p"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "p has a stick and one bump."
  },
  {
    "id": "q72",
    "type": "multipleChoice",
    "question": "Tap the letter: t",
    "options": [
      "t",
      "l",
      "f",
      "i"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "t has a little line across."
  },
  {
    "id": "q73",
    "type": "multipleChoice",
    "question": "Look at the word: SHOE. Which picture matches?",
    "options": [
      "🧦",
      "👟",
      "🧤",
      "🧢"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "SHOE matches the shoe."
  },
  {
    "id": "q74",
    "type": "multipleChoice",
    "question": "Look at the word: SOCK. Which picture matches?",
    "options": [
      "👖",
      "👟",
      "🧦",
      "🧥"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "SOCK matches the sock."
  },
  {
    "id": "q75",
    "type": "multipleChoice",
    "question": "Look at the word: DOLL. Which picture matches?",
    "options": [
      "🧸",
      "⚽",
      "🚗",
      "🪆"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "DOLL matches the doll."
  },
  {
    "id": "q76",
    "type": "multipleChoice",
    "question": "Look at the word: TOY. Which picture matches?",
    "options": [
      "🧸",
      "🍎",
      "📘",
      "🚗"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "TOY matches the toy."
  },
  {
    "id": "q77",
    "type": "multipleChoice",
    "question": "Look at the word: BANANA. Which picture matches?",
    "options": [
      "🍎",
      "🍌",
      "🍇",
      "🍓"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "BANANA matches the banana."
  },
  {
    "id": "q78",
    "type": "multipleChoice",
    "question": "Look at the word: BREAD. Which picture matches?",
    "options": [
      "🥞",
      "🍚",
      "🍞",
      "🥐"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "BREAD matches the bread."
  },
  {
    "id": "q79",
    "type": "multipleChoice",
    "question": "Look at the word: WATER. Which picture matches?",
    "options": [
      "☕",
      "🥛",
      "🧃",
      "💧"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "WATER matches the water drop."
  },
  {
    "id": "q80",
    "type": "multipleChoice",
    "question": "Look at the word: HOUSE. Which picture matches?",
    "options": [
      "🏠",
      "🏫",
      "🏥",
      "🏢"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "HOUSE matches the house."
  },
  {
    "id": "q81",
    "type": "multipleChoice",
    "question": "Tap the letter: T",
    "options": [
      "I",
      "T",
      "L",
      "F"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "T has a line on top and a line down."
  },
  {
    "id": "q82",
    "type": "multipleChoice",
    "question": "Which picture shows a duck?",
    "options": [
      "🦁",
      "🦆",
      "🐵",
      "🐢"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Duck = 🦆"
  },
  {
    "id": "q83",
    "type": "multipleChoice",
    "question": "Which picture shows a lion?",
    "options": [
      "🐯",
      "🐵",
      "🦁",
      "🐻"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Lion = 🦁"
  },
  {
    "id": "q84",
    "type": "multipleChoice",
    "question": "Which picture shows a monkey?",
    "options": [
      "🐵",
      "🦁",
      "🐸",
      "🐢"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Monkey = 🐵"
  },
  {
    "id": "q85",
    "type": "multipleChoice",
    "question": "Which picture shows a turtle?",
    "options": [
      "🐟",
      "🐢",
      "🐦",
      "🐵"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Turtle = 🐢"
  },
  {
    "id": "q86",
    "type": "multipleChoice",
    "question": "Which picture shows a orange?",
    "options": [
      "🍊",
      "🍎",
      "🍐",
      "🍇"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Orange = 🍊"
  },
  {
    "id": "q87",
    "type": "multipleChoice",
    "question": "Which picture shows a grapes?",
    "options": [
      "🍎",
      "🍐",
      "🍇",
      "🍊"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Grapes = 🍇"
  },
  {
    "id": "q88",
    "type": "multipleChoice",
    "question": "Which picture shows a pear?",
    "options": [
      "🍎",
      "🍐",
      "🍊",
      "🍇"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Pear = 🍐"
  },
  {
    "id": "q89",
    "type": "multipleChoice",
    "question": "Which picture shows a bread?",
    "options": [
      "🥚",
      "🧀",
      "🍞",
      "🍎"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Bread = 🍞"
  },
  {
    "id": "q90",
    "type": "multipleChoice",
    "question": "Which picture shows a egg?",
    "options": [
      "🍞",
      "🧀",
      "🥚",
      "🍊"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Egg = 🥚"
  },
  {
    "id": "q91",
    "type": "multipleChoice",
    "question": "Which picture shows a cheese?",
    "options": [
      "🍞",
      "🧀",
      "🥚",
      "🍇"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Cheese = 🧀"
  },
  {
    "id": "q92",
    "type": "multipleChoice",
    "question": "Which picture shows a chair?",
    "options": [
      "🚪",
      "🪑",
      "🛏️",
      "🎩"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Chair = 🪑"
  },
  {
    "id": "q93",
    "type": "multipleChoice",
    "question": "Which picture shows a door?",
    "options": [
      "🚪",
      "🪑",
      "🛏️",
      "🧦"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Door = 🚪"
  },
  {
    "id": "q94",
    "type": "multipleChoice",
    "question": "Which picture shows a bed?",
    "options": [
      "🪑",
      "🚪",
      "🛏️",
      "🧦"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Bed = 🛏️"
  },
  {
    "id": "q95",
    "type": "multipleChoice",
    "question": "Which picture shows a sock?",
    "options": [
      "👟",
      "🎩",
      "🧦",
      "🧤"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Sock = 🧦"
  },
  {
    "id": "q96",
    "type": "multipleChoice",
    "question": "Which picture shows a hat?",
    "options": [
      "🎩",
      "🧦",
      "🧤",
      "👟"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Hat = 🎩"
  },
  {
    "id": "q97",
    "type": "multipleChoice",
    "question": "Which picture shows a glove?",
    "options": [
      "🧦",
      "🧤",
      "👟",
      "🎩"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Glove = 🧤"
  },
  {
    "id": "q98",
    "type": "multipleChoice",
    "question": "Which picture shows a eye?",
    "options": [
      "👂",
      "👁️",
      "👃",
      "👄"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Eye = 👁️"
  },
  {
    "id": "q99",
    "type": "multipleChoice",
    "question": "Which picture shows a ear?",
    "options": [
      "👁️",
      "👂",
      "👃",
      "👄"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Ear = 👂"
  },
  {
    "id": "q100",
    "type": "multipleChoice",
    "question": "Which picture shows a nose?",
    "options": [
      "👂",
      "👃",
      "👁️",
      "👄"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Nose = 👃"
  },
  {
    "id": "q101",
    "type": "multipleChoice",
    "question": "Which picture shows a star?",
    "options": [
      "☀️",
      "⭐",
      "🌙",
      "☁️"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Star = ⭐"
  },
  {
    "id": "q102",
    "type": "multipleChoice",
    "question": "Which picture shows a square?",
    "options": [
      "🟦",
      "🔺",
      "⚪",
      "⭐"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Square = 🟦"
  },
  {
    "id": "q103",
    "type": "multipleChoice",
    "question": "Which picture shows a triangle?",
    "options": [
      "🔺",
      "🟦",
      "⚪",
      "⭐"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Triangle = 🔺"
  },
  {
    "id": "q104",
    "type": "multipleChoice",
    "question": "Which picture shows a flower?",
    "options": [
      "🌸",
      "🌳",
      "☀️",
      "⭐"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Flower = 🌸"
  },
  {
    "id": "q105",
    "type": "multipleChoice",
    "question": "Which picture shows a tree?",
    "options": [
      "🌸",
      "🌳",
      "☀️",
      "🌙"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Tree = 🌳"
  },
  {
    "id": "q106",
    "type": "multipleChoice",
    "question": "Which picture shows a bus?",
    "options": [
      "🚆",
      "🚌",
      "⛵",
      "✈️"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Bus = 🚌"
  },
  {
    "id": "q107",
    "type": "multipleChoice",
    "question": "Which picture shows a train?",
    "options": [
      "🚌",
      "🚆",
      "⛵",
      "✈️"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Train = 🚆"
  },
  {
    "id": "q108",
    "type": "multipleChoice",
    "question": "Which picture shows a boat?",
    "options": [
      "🚌",
      "🚆",
      "⛵",
      "✈️"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Boat = ⛵"
  },
  {
    "id": "q109",
    "type": "multipleChoice",
    "question": "Which picture shows a plane?",
    "options": [
      "🚌",
      "✈️",
      "🚆",
      "⛵"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Plane = ✈️"
  },
  {
    "id": "q110",
    "type": "multipleChoice",
    "question": "Which picture shows a sun?",
    "options": [
      "🌙",
      "☀️",
      "⭐",
      "☁️"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Sun = ☀️"
  },
  {
    "id": "q111",
    "type": "multipleChoice",
    "question": "Which picture shows a moon?",
    "options": [
      "🌙",
      "☀️",
      "⭐",
      "☁️"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Moon = 🌙"
  }
];
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
