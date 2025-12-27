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
    },
    {
      id: "q15",
      type: "multipleChoice",
      question: "Tap the letter: T",
      options: ["F", "T", "I", "L"],
      answer: 1,
      difficulty: "easy",
      explanation: "T has a top line and a long line down."
    },
    {
      id: "q16",
      type: "multipleChoice",
      question: "Tap the letter: E",
      options: ["E", "F", "P", "B"],
      answer: 0,
      difficulty: "easy",
      explanation: "E has three lines across."
    },
    {
      id: "q17",
      type: "multipleChoice",
      question: "Tap the letter: L",
      options: ["I", "L", "T", "J"],
      answer: 1,
      difficulty: "easy",
      explanation: "L looks like a corner."
    },
    {
      id: "q18",
      type: "multipleChoice",
      question: "Tap the letter: R",
      options: ["P", "R", "B", "K"],
      answer: 1,
      difficulty: "easy",
      explanation: "R looks like P with a little leg."
    },
    {
      id: "q19",
      type: "multipleChoice",
      question: "Which word says: HI",
      options: ["HI", "BY", "IT", "HE"],
      answer: 0,
      difficulty: "easy",
      explanation: "HI = H-I."
    },
    {
      id: "q20",
      type: "multipleChoice",
      question: "Which word says: NO",
      options: ["ON", "NO", "GO", "OK"],
      answer: 1,
      difficulty: "easy",
      explanation: "NO = N-O."
    },
    {
      id: "q21",
      type: "multipleChoice",
      question: "Look at the word: CAR. Which picture matches?",
      options: ["🚗", "🚌", "🚲", "🚂"],
      answer: 0,
      difficulty: "easy",
      explanation: "CAR matches the car picture."
    },
    {
      id: "q22",
      type: "multipleChoice",
      question: "Look at the word: APPLE. Which picture matches?",
      options: ["🍎", "🍌", "🍇", "🍓"],
      answer: 0,
      difficulty: "easy",
      explanation: "APPLE matches the apple picture."
    },
    {
      id: "q23",
      type: "multipleChoice",
      question: "Look at the word: MILK. Which picture matches?",
      options: ["🥛", "💧", "🧃", "☕"],
      answer: 0,
      difficulty: "easy",
      explanation: "MILK matches the milk picture."
    },
    {
      id: "q24",
      type: "multipleChoice",
      question: "Look at the word: BED. Which picture matches?",
      options: ["🛏️", "🚪", "🪑", "🛁"],
      answer: 0,
      difficulty: "easy",
      explanation: "BED matches the bed picture."
    },
    {
      id: "q25",
      type: "multipleChoice",
      question: "Tap the first letter in: CAT",
      options: ["C", "A", "T", "B"],
      answer: 0,
      difficulty: "medium",
      explanation: "CAT starts with C."
    },
    {
      id: "q26",
      type: "multipleChoice",
      question: "Tap the first letter in: DOG",
      options: ["D", "O", "G", "B"],
      answer: 0,
      difficulty: "medium",
      explanation: "DOG starts with D."
    },
    {
      id: "q27",
      type: "multipleChoice",
      question: "Tap the last letter in: DOG",
      options: ["D", "O", "G", "C"],
      answer: 2,
      difficulty: "medium",
      explanation: "DOG ends with G."
    },
    {
      id: "q28",
      type: "multipleChoice",
      question: "Which is the SAME as: a",
      options: ["A", "a", "B", "b"],
      answer: 1,
      difficulty: "medium",
      explanation: "This one is the same small a."
    },
    {
      id: "q29",
      type: "multipleChoice",
      question: "Tap the letter: o",
      options: ["o", "a", "c", "e"],
      answer: 0,
      difficulty: "medium",
      explanation: "o is a small round circle."
    },
    {
      id: "q30",
      type: "multipleChoice",
      question: "Look at the word: MOON. Which picture matches?",
      options: ["☀️", "🌙", "⭐", "☁️"],
      answer: 1,
      difficulty: "medium",
      explanation: "MOON matches the moon."
    }
    ,{
      id: "q31",
      type: "multipleChoice",
      question: "Tap the letter: F",
      options: ["F", "E", "T", "P"],
      answer: 0,
      difficulty: "easy",
      explanation: "F has one line down and two lines across."
    }
    ,{
      id: "q32",
      type: "multipleChoice",
      question: "Tap the letter: G",
      options: ["C", "O", "G", "Q"],
      answer: 2,
      difficulty: "easy",
      explanation: "G looks like C with a little line."
    }
    ,{
      id: "q33",
      type: "multipleChoice",
      question: "Tap the letter: H",
      options: ["N", "H", "M", "A"],
      answer: 1,
      difficulty: "easy",
      explanation: "H has two tall lines and a bridge."
    }
    ,{
      id: "q34",
      type: "multipleChoice",
      question: "Tap the letter: J",
      options: ["I", "J", "L", "T"],
      answer: 1,
      difficulty: "easy",
      explanation: "J has a hook at the bottom."
    }
    ,{
      id: "q35",
      type: "multipleChoice",
      question: "Tap the letter: K",
      options: ["R", "B", "K", "H"],
      answer: 2,
      difficulty: "easy",
      explanation: "K has one line and two slanted lines."
    }
    ,{
      id: "q36",
      type: "multipleChoice",
      question: "Tap the letter: N",
      options: ["N", "M", "W", "H"],
      answer: 0,
      difficulty: "easy",
      explanation: "N has a line going across like a slide."
    }
    ,{
      id: "q37",
      type: "multipleChoice",
      question: "Tap the letter: P",
      options: ["P", "R", "B", "D"],
      answer: 0,
      difficulty: "easy",
      explanation: "P has one bump at the top."
    }
    ,{
      id: "q38",
      type: "multipleChoice",
      question: "Tap the letter: U",
      options: ["V", "U", "Y", "J"],
      answer: 1,
      difficulty: "easy",
      explanation: "U looks like a cup shape."
    }
    ,{
      id: "q39",
      type: "multipleChoice",
      question: "Tap the letter: V",
      options: ["Y", "U", "V", "W"],
      answer: 2,
      difficulty: "easy",
      explanation: "V looks like a pointy valley."
    }
    ,{
      id: "q40",
      type: "multipleChoice",
      question: "Tap the letter: X",
      options: ["K", "X", "Y", "Z"],
      answer: 1,
      difficulty: "easy",
      explanation: "X is two lines crossing."
    }
    ,{
      id: "q41",
      type: "multipleChoice",
      question: "Look at the word: HAT. Which picture matches?",
      options: ["🎩", "🧢", "👒", "🎓"],
      answer: 1,
      difficulty: "easy",
      explanation: "HAT matches the hat picture."
    }
    ,{
      id: "q42",
      type: "multipleChoice",
      question: "Look at the word: CUP. Which picture matches?",
      options: ["☕", "🍪", "🥛", "🍎"],
      answer: 0,
      difficulty: "easy",
      explanation: "CUP matches the cup."
    }
    ,{
      id: "q43",
      type: "multipleChoice",
      question: "Look at the word: BOOK. Which picture matches?",
      options: ["📘", "✏️", "🧩", "🧸"],
      answer: 0,
      difficulty: "easy",
      explanation: "BOOK matches the book."
    }
    ,{
      id: "q44",
      type: "multipleChoice",
      question: "Look at the word: FISH. Which picture matches?",
      options: ["🐟", "🐶", "🐸", "🐱"],
      answer: 0,
      difficulty: "easy",
      explanation: "FISH matches the fish."
    }
    ,{
      id: "q45",
      type: "multipleChoice",
      question: "Look at the word: BIRD. Which picture matches?",
      options: ["🐦", "🐠", "🐭", "🦋"],
      answer: 0,
      difficulty: "easy",
      explanation: "BIRD matches the bird."
    }
    ,{
      id: "q46",
      type: "multipleChoice",
      question: "Look at the word: TREE. Which picture matches?",
      options: ["🌳", "🌸", "🍄", "🌵"],
      answer: 0,
      difficulty: "easy",
      explanation: "TREE matches the tree."
    }
    ,{
      id: "q47",
      type: "multipleChoice",
      question: "Look at the word: STAR. Which picture matches?",
      options: ["⭐", "🌙", "☀️", "☁️"],
      answer: 0,
      difficulty: "easy",
      explanation: "STAR matches the star."
    }
    ,{
      id: "q48",
      type: "multipleChoice",
      question: "Look at the word: CAKE. Which picture matches?",
      options: ["🎂", "🍕", "🍪", "🍎"],
      answer: 0,
      difficulty: "easy",
      explanation: "CAKE matches the cake."
    }
    ,{
      id: "q49",
      type: "multipleChoice",
      question: "Look at the word: TRAIN. Which picture matches?",
      options: ["🚂", "🚌", "🚗", "✈️"],
      answer: 0,
      difficulty: "easy",
      explanation: "TRAIN matches the train."
    }
    ,{
      id: "q50",
      type: "multipleChoice",
      question: "Look at the word: BOAT. Which picture matches?",
      options: ["🚤", "🚗", "🚲", "🚂"],
      answer: 0,
      difficulty: "easy",
      explanation: "BOAT matches the boat."
    }
    ,{
      id: "q51",
      type: "multipleChoice",
      question: "Which is the SAME as: b",
      options: ["B", "b", "d", "p"],
      answer: 1,
      difficulty: "medium",
      explanation: "This one is the same small b."
    }
    ,{
      id: "q52",
      type: "multipleChoice",
      question: "Which is the SAME as: D",
      options: ["O", "D", "B", "P"],
      answer: 1,
      difficulty: "medium",
      explanation: "D has one big curve."
    }
    ,{
      id: "q53",
      type: "multipleChoice",
      question: "Which word says: YES",
      options: ["YES", "YET", "YOU", "YAM"],
      answer: 0,
      difficulty: "medium",
      explanation: "YES = Y-E-S."
    }
    ,{
      id: "q54",
      type: "multipleChoice",
      question: "Which word says: GO",
      options: ["DO", "GO", "NO", "SO"],
      answer: 1,
      difficulty: "easy",
      explanation: "GO = G-O."
    }
    ,{
      id: "q55",
      type: "multipleChoice",
      question: "Which word says: UP",
      options: ["UP", "PU", "OP", "IP"],
      answer: 0,
      difficulty: "medium",
      explanation: "UP = U-P."
    }
    ,{
      id: "q56",
      type: "multipleChoice",
      question: "Which word says: ME",
      options: ["ME", "WE", "MY", "MA"],
      answer: 0,
      difficulty: "medium",
      explanation: "ME = M-E."
    }
    ,{
      id: "q57",
      type: "multipleChoice",
      question: "Tap the first letter in: BUS",
      options: ["B", "U", "S", "D"],
      answer: 0,
      difficulty: "medium",
      explanation: "BUS starts with B."
    }
    ,{
      id: "q58",
      type: "multipleChoice",
      question: "Tap the first letter in: MILK",
      options: ["M", "I", "L", "K"],
      answer: 0,
      difficulty: "medium",
      explanation: "MILK starts with M."
    }
    ,{
      id: "q59",
      type: "multipleChoice",
      question: "Tap the last letter in: CAT",
      options: ["C", "A", "T", "D"],
      answer: 2,
      difficulty: "medium",
      explanation: "CAT ends with T."
    }
    ,{
      id: "q60",
      type: "multipleChoice",
      question: "Tap the last letter in: SUN",
      options: ["N", "S", "U", "T"],
      answer: 0,
      difficulty: "medium",
      explanation: "SUN ends with N."
    }
    ,{
      id: "q61",
      type: "multipleChoice",
      question: "Tap the middle letter in: MOM",
      options: ["M", "O", "D", "A"],
      answer: 1,
      difficulty: "medium",
      explanation: "MOM has O in the middle."
    }
    ,{
      id: "q62",
      type: "multipleChoice",
      question: "Look at the word: EGG. Which picture matches?",
      options: ["🥚", "🍎", "🍞", "🥛"],
      answer: 0,
      difficulty: "easy",
      explanation: "EGG matches the egg."
    }
    ,{
      id: "q63",
      type: "multipleChoice",
      question: "Look at the word: ICE. Which picture matches?",
      options: ["🧊", "🔥", "💧", "☀️"],
      answer: 0,
      difficulty: "medium",
      explanation: "ICE matches the ice cube."
    }
    ,{
      id: "q64",
      type: "multipleChoice",
      question: "Tap the first letter in: FISH",
      options: ["F", "I", "S", "H"],
      answer: 0,
      difficulty: "medium",
      explanation: "FISH starts with F."
    }
    ,{
      id: "q65",
      type: "multipleChoice",
      question: "Tap the last letter in: FISH",
      options: ["F", "I", "S", "H"],
      answer: 3,
      difficulty: "medium",
      explanation: "FISH ends with H."
    }
    ,{
      id: "q66",
      type: "multipleChoice",
      question: "Tap the first letter in: HAT",
      options: ["H", "A", "T", "B"],
      answer: 0,
      difficulty: "medium",
      explanation: "HAT starts with H."
    }
    ,{
      id: "q67",
      type: "multipleChoice",
      question: "Tap the last letter in: HAT",
      options: ["H", "A", "T", "D"],
      answer: 2,
      difficulty: "medium",
      explanation: "HAT ends with T."
    }
    ,{
      id: "q68",
      type: "multipleChoice",
      question: "Which is the SAME as: m",
      options: ["M", "n", "m", "w"],
      answer: 2,
      difficulty: "medium",
      explanation: "This one is the same small m."
    }
    ,{
      id: "q69",
      type: "multipleChoice",
      question: "Which is the SAME as: R",
      options: ["K", "P", "R", "B"],
      answer: 2,
      difficulty: "medium",
      explanation: "R has a bump and a little leg."
    }
    ,{
      id: "q70",
      type: "multipleChoice",
      question: "Tap the letter: y",
      options: ["v", "y", "g", "j"],
      answer: 1,
      difficulty: "medium",
      explanation: "y goes down like a tail."
    }
    ,{
      id: "q71",
      type: "multipleChoice",
      question: "Tap the letter: p",
      options: ["q", "b", "p", "d"],
      answer: 2,
      difficulty: "medium",
      explanation: "p has a stick and one bump."
    }
    ,{
      id: "q72",
      type: "multipleChoice",
      question: "Tap the letter: t",
      options: ["f", "l", "t", "i"],
      answer: 2,
      difficulty: "medium",
      explanation: "t has a little line across."
    }
    ,{
      id: "q73",
      type: "multipleChoice",
      question: "Look at the word: SHOE. Which picture matches?",
      options: ["👟", "🧦", "🧤", "🧢"],
      answer: 0,
      difficulty: "easy",
      explanation: "SHOE matches the shoe."
    }
    ,{
      id: "q74",
      type: "multipleChoice",
      question: "Look at the word: SOCK. Which picture matches?",
      options: ["🧦", "👟", "👖", "🧥"],
      answer: 0,
      difficulty: "easy",
      explanation: "SOCK matches the sock."
    }
    ,{
      id: "q75",
      type: "multipleChoice",
      question: "Look at the word: DOLL. Which picture matches?",
      options: ["🧸", "🪆", "🚗", "⚽"],
      answer: 1,
      difficulty: "easy",
      explanation: "DOLL matches the doll."
    }
    ,{
      id: "q76",
      type: "multipleChoice",
      question: "Look at the word: TOY. Which picture matches?",
      options: ["🧸", "🍎", "📘", "🚗"],
      answer: 0,
      difficulty: "easy",
      explanation: "TOY matches the toy."
    }
    ,{
      id: "q77",
      type: "multipleChoice",
      question: "Look at the word: BANANA. Which picture matches?",
      options: ["🍎", "🍌", "🍇", "🍓"],
      answer: 1,
      difficulty: "easy",
      explanation: "BANANA matches the banana."
    }
    ,{
      id: "q78",
      type: "multipleChoice",
      question: "Look at the word: BREAD. Which picture matches?",
      options: ["🍞", "🍚", "🥞", "🥐"],
      answer: 0,
      difficulty: "medium",
      explanation: "BREAD matches the bread."
    }
    ,{
      id: "q79",
      type: "multipleChoice",
      question: "Look at the word: WATER. Which picture matches?",
      options: ["💧", "🥛", "🧃", "☕"],
      answer: 0,
      difficulty: "medium",
      explanation: "WATER matches the water drop."
    }
    ,{
      id: "q80",
      type: "multipleChoice",
      question: "Look at the word: HOUSE. Which picture matches?",
      options: ["🏠", "🏫", "🏥", "🏢"],
      answer: 0,
      difficulty: "medium",
      explanation: "HOUSE matches the house."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
