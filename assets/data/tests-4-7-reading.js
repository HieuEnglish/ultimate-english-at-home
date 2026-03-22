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
    "id": "q1",
    "type": "multipleChoice",
    "question": "Which picture shows a cat?",
    "options": [
      "🐶",
      "🐱",
      "🐰",
      "🐻"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "A cat says ‘meow’."
  },
  {
    "id": "q2",
    "type": "multipleChoice",
    "question": "Which picture shows a bus?",
    "options": [
      "🚗",
      "🚲",
      "🚌",
      "🚂"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "A bus carries many people."
  },
  {
    "id": "q3",
    "type": "multipleChoice",
    "question": "Choose the word: DOG",
    "options": [
      "DOLL",
      "DIG",
      "DOT",
      "DOG"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "DOG = D-O-G."
  },
  {
    "id": "q4",
    "type": "multipleChoice",
    "question": "Which word is a colour?",
    "options": [
      "red",
      "run",
      "cat",
      "jump"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Red is a colour."
  },
  {
    "id": "q5",
    "type": "multipleChoice",
    "question": "Which word rhymes with CAT?",
    "options": [
      "dog",
      "hat",
      "sun",
      "car"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Cat and hat sound the same at the end."
  },
  {
    "id": "q6",
    "type": "multipleChoice",
    "passage": "Read: I like apples.",
    "question": "What do I like?",
    "options": [
      "cars",
      "bananas",
      "apples",
      "cats"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "The sentence says ‘I like apples.’"
  },
  {
    "id": "q7",
    "type": "multipleChoice",
    "question": "Choose the best word: I ___ to school.",
    "options": [
      "going",
      "goes",
      "went",
      "go"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "We say: ‘I go to school.’"
  },
  {
    "id": "q8",
    "type": "multipleChoice",
    "question": "Choose the correct sentence.",
    "options": [
      "I have a dog.",
      "i have a dog",
      "I Have a dog",
      "I have a Dog"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "A sentence starts with a capital letter and ends with a full stop."
  },
  {
    "id": "q9",
    "type": "multipleChoice",
    "question": "Which word means the same as BIG?",
    "options": [
      "small",
      "large",
      "sad",
      "thin"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Big and large mean the same."
  },
  {
    "id": "q10",
    "type": "multipleChoice",
    "question": "Read the word: BOOK. Which picture matches?",
    "options": [
      "🍎",
      "⚽",
      "📚",
      "🚌"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "A book is something you read."
  },
  {
    "id": "q11",
    "type": "multipleChoice",
    "passage": "Mia has two pets: a cat and a fish.",
    "question": "How many pets does Mia have?",
    "options": [
      "one",
      "four",
      "three",
      "two"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Cat + fish = two pets."
  },
  {
    "id": "q12",
    "type": "multipleChoice",
    "passage": "Ben is at the park. He plays on the swing.",
    "question": "Where is Ben?",
    "options": [
      "At the park",
      "At school",
      "At home",
      "At the shop"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "The sentence says he is at the park."
  },
  {
    "id": "q13",
    "type": "multipleChoice",
    "passage": "It is raining. Kim uses an umbrella.",
    "question": "What does Kim use?",
    "options": [
      "a ball",
      "an umbrella",
      "a hat",
      "a kite"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "An umbrella helps in the rain."
  },
  {
    "id": "q14",
    "type": "multipleChoice",
    "passage": "Dad cooks eggs. Mom makes toast.",
    "question": "Who makes toast?",
    "options": [
      "Dad",
      "Ben",
      "Mom",
      "Mia"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "Mom makes toast."
  },
  {
    "id": "q15",
    "type": "trueFalse",
    "question": "A bird has wings.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Birds use wings to fly."
  },
  {
    "id": "q16",
    "type": "trueFalse",
    "question": "A fish can fly.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Fish swim in water."
  },
  {
    "id": "q17",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: C _ T (a pet)",
    "answer": "a",
    "difficulty": "medium",
    "explanation": "C-A-T spells CAT."
  },
  {
    "id": "q18",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: D _ G (an animal)",
    "answer": "o",
    "difficulty": "medium",
    "explanation": "D-O-G spells DOG."
  },
  {
    "id": "q19",
    "type": "multipleChoice",
    "question": "Choose the best word: The sun is ___.",
    "options": [
      "cold",
      "hot",
      "sad",
      "thin"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "The sun is hot."
  },
  {
    "id": "q20",
    "type": "multipleChoice",
    "question": "Which sentence tells you to be quiet?",
    "options": [
      "I am hungry.",
      "Let's play!",
      "Please be quiet.",
      "Thank you."
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "‘Please be quiet.’ means ‘Do not make noise.’"
  },
  {
    "id": "q21",
    "type": "multipleChoice",
    "question": "Which picture shows an apple?",
    "options": [
      "🍪",
      "🍌",
      "🥕",
      "🍎"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "An apple is a fruit."
  },
  {
    "id": "q22",
    "type": "multipleChoice",
    "question": "Which picture shows a pencil?",
    "options": [
      "✏️",
      "📚",
      "🍎",
      "🚲"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "A pencil is for writing."
  },
  {
    "id": "q23",
    "type": "multipleChoice",
    "question": "Choose the word: SUN",
    "options": [
      "SON",
      "SUN",
      "SUNN",
      "SAN"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "SUN = S-U-N."
  },
  {
    "id": "q24",
    "type": "multipleChoice",
    "question": "Which word is an animal?",
    "options": [
      "run",
      "blue",
      "frog",
      "happy"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "A frog is an animal."
  },
  {
    "id": "q25",
    "type": "multipleChoice",
    "question": "Which word rhymes with DOG?",
    "options": [
      "tree",
      "cat",
      "sun",
      "log"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "Dog and log sound the same at the end."
  },
  {
    "id": "q26",
    "type": "multipleChoice",
    "passage": "Read: I see a big tree.",
    "question": "What do I see?",
    "options": [
      "a tree",
      "a car",
      "a fish",
      "a cake"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The sentence says ‘I see a big tree.’"
  },
  {
    "id": "q27",
    "type": "multipleChoice",
    "passage": "Lia eats rice. She drinks water.",
    "question": "What does Lia drink?",
    "options": [
      "milk",
      "water",
      "juice",
      "soup"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "It says she drinks water."
  },
  {
    "id": "q28",
    "type": "multipleChoice",
    "question": "Choose the best word: He ___ fast.",
    "options": [
      "running",
      "run",
      "runs",
      "ran"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "We say: ‘He runs fast.’"
  },
  {
    "id": "q29",
    "type": "multipleChoice",
    "question": "Choose the best word: They ___ happy.",
    "options": [
      "be",
      "is",
      "am",
      "are"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "We say: ‘They are happy.’"
  },
  {
    "id": "q30",
    "type": "multipleChoice",
    "question": "Choose the correct sentence.",
    "options": [
      "We play outside.",
      "we play outside.",
      "We play outside",
      "We Play outside."
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "It starts with a capital letter and ends with a full stop."
  },
  {
    "id": "q31",
    "type": "multipleChoice",
    "question": "Which word means the same as HAPPY?",
    "options": [
      "angry",
      "glad",
      "tired",
      "cold"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Happy and glad mean the same."
  },
  {
    "id": "q32",
    "type": "multipleChoice",
    "question": "Read the word: MILK. Which picture matches?",
    "options": [
      "🍇",
      "🍞",
      "🥛",
      "🧃"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "Milk is a drink."
  },
  {
    "id": "q33",
    "type": "multipleChoice",
    "passage": "Read: This is my mom.",
    "question": "Who is it?",
    "options": [
      "teacher",
      "dad",
      "brother",
      "mom"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "The sentence says ‘my mom.’"
  },
  {
    "id": "q34",
    "type": "multipleChoice",
    "passage": "Sam has 3 balloons: red, blue, and green.",
    "question": "How many balloons does Sam have?",
    "options": [
      "three",
      "two",
      "one",
      "four"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "It says Sam has 3 balloons."
  },
  {
    "id": "q35",
    "type": "multipleChoice",
    "passage": "The dog is under the table.",
    "question": "Where is the dog?",
    "options": [
      "On the table",
      "Under the table",
      "In the bed",
      "In the water"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "‘Under’ means below something."
  },
  {
    "id": "q36",
    "type": "trueFalse",
    "question": "A chair is for sitting.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "We sit on a chair."
  },
  {
    "id": "q37",
    "type": "trueFalse",
    "question": "The word ‘I’ starts with a capital letter.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "We write ‘I’ with a capital letter."
  },
  {
    "id": "q38",
    "type": "trueFalse",
    "question": "A snake has legs.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Snakes do not have legs."
  },
  {
    "id": "q39",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: B _ D (you sleep in it)",
    "answer": "e",
    "difficulty": "medium",
    "explanation": "B-E-D spells BED."
  },
  {
    "id": "q40",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: F _ SH (it swims)",
    "answer": "i",
    "difficulty": "medium",
    "explanation": "F-I-S-H spells FISH."
  },
  {
    "id": "q41",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: I ___ water.",
    "answer": "drink",
    "difficulty": "medium",
    "explanation": "We say: ‘I drink water.’"
  },
  {
    "id": "q42",
    "type": "multipleChoice",
    "question": "Which picture shows a book?",
    "options": [
      "🍪",
      "📖",
      "🎈",
      "🚪"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "A book is something you read."
  },
  {
    "id": "q43",
    "type": "multipleChoice",
    "question": "Which word is a fruit?",
    "options": [
      "chair",
      "car",
      "banana",
      "rain"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "A banana is a fruit."
  },
  {
    "id": "q44",
    "type": "multipleChoice",
    "question": "Which word has the same first sound as BALL?",
    "options": [
      "fish",
      "cat",
      "sun",
      "bat"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "Ball and bat start with the /b/ sound."
  },
  {
    "id": "q45",
    "type": "multipleChoice",
    "question": "Choose the best word: She ___ a song.",
    "options": [
      "sings",
      "sing",
      "singing",
      "sung"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "We say: ‘She sings a song.’"
  },
  {
    "id": "q46",
    "type": "multipleChoice",
    "question": "Choose the best word: I have ___ orange.",
    "options": [
      "a",
      "an",
      "the",
      "some"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "We use ‘an’ before a vowel sound: an orange."
  },
  {
    "id": "q47",
    "type": "multipleChoice",
    "passage": "It is cold. Tom wears a coat.",
    "question": "What does Tom wear?",
    "options": [
      "shoes",
      "a hat",
      "a coat",
      "shorts"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "The sentence says Tom wears a coat."
  },
  {
    "id": "q48",
    "type": "multipleChoice",
    "passage": "Nora is in the kitchen. She eats soup.",
    "question": "Where is Nora?",
    "options": [
      "At school",
      "In the bedroom",
      "At the park",
      "In the kitchen"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "It says Nora is in the kitchen."
  },
  {
    "id": "q49",
    "type": "multipleChoice",
    "question": "Which sign means STOP?",
    "options": [
      "🛑",
      "➡️",
      "✅",
      "♻️"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "The stop sign is 🛑."
  },
  {
    "id": "q50",
    "type": "multipleChoice",
    "question": "Which word is a place?",
    "options": [
      "blue",
      "school",
      "eat",
      "small"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "School is a place."
  },
  {
    "id": "q51",
    "type": "multipleChoice",
    "passage": "Read: The cat is small.",
    "question": "What is small?",
    "options": [
      "the car",
      "the dog",
      "the cat",
      "the house"
    ],
    "answer": 2,
    "difficulty": "easy",
    "explanation": "The sentence says the cat is small."
  },
  {
    "id": "q52",
    "type": "multipleChoice",
    "question": "Choose the correct plural: one cat, two ___.",
    "options": [
      "cat's",
      "cat",
      "cates",
      "cats"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "We add -s to make ‘cats’."
  },
  {
    "id": "q53",
    "type": "multipleChoice",
    "question": "Which word is the opposite of HOT?",
    "options": [
      "cold",
      "warm",
      "big",
      "fast"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "Hot and cold are opposites."
  },
  {
    "id": "q54",
    "type": "trueFalse",
    "question": "A week has 7 days.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "There are 7 days in a week."
  },
  {
    "id": "q55",
    "type": "trueFalse",
    "question": "The word ‘and’ means ‘plus’.",
    "options": [
      "True",
      "False"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "‘And’ joins things together."
  },
  {
    "id": "q56",
    "type": "trueFalse",
    "question": "A triangle has 4 sides.",
    "options": [
      "True",
      "False"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "A triangle has 3 sides."
  },
  {
    "id": "q57",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: S _ N (in the sky)",
    "answer": "u",
    "difficulty": "medium",
    "explanation": "S-U-N spells SUN."
  },
  {
    "id": "q58",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: The dog is ___ the box. (inside)",
    "answer": "in",
    "difficulty": "medium",
    "explanation": "‘In’ means inside."
  },
  {
    "id": "q59",
    "type": "multipleChoice",
    "passage": "Amy has a brother. His name is Max.",
    "question": "What is the brother’s name?",
    "options": [
      "Max",
      "Sam",
      "Ben",
      "Tom"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "It says his name is Max."
  },
  {
    "id": "q60",
    "type": "multipleChoice",
    "passage": "The kite is yellow. It is in the sky.",
    "question": "What colour is the kite?",
    "options": [
      "green",
      "yellow",
      "red",
      "blue"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "The sentence says the kite is yellow."
  },
  {
    "id": "q61",
    "type": "multipleChoice",
    "question": "Which sentence is a question?",
    "options": [
      "It is raining.",
      "I like pizza.",
      "Where is my bag?",
      "Come here."
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "A question ends with a question mark."
  },
  {
    "id": "q62",
    "type": "multipleChoice",
    "question": "Choose the best word: ___ you like milk?",
    "options": [
      "Doing",
      "Does",
      "Did",
      "Do"
    ],
    "answer": 3,
    "difficulty": "hard",
    "explanation": "We say: ‘Do you like milk?’"
  },
  {
    "id": "q63",
    "type": "multipleChoice",
    "passage": "Read: Please wash your hands.",
    "question": "What should you do?",
    "options": [
      "Wash your hands",
      "Eat candy",
      "Jump high",
      "Go to sleep"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "The sentence tells you to wash your hands."
  },
  {
    "id": "q64",
    "type": "multipleChoice",
    "question": "Which word is spelled correctly?",
    "options": [
      "freind",
      "friend",
      "frend",
      "friand"
    ],
    "answer": 1,
    "difficulty": "hard",
    "explanation": "The correct spelling is ‘friend’."
  },
  {
    "id": "q65",
    "type": "multipleChoice",
    "passage": "Zoe has a blue dress and red shoes.",
    "question": "What colour are Zoe’s shoes?",
    "options": [
      "green",
      "blue",
      "red",
      "black"
    ],
    "answer": 2,
    "difficulty": "medium",
    "explanation": "It says Zoe has red shoes."
  },
  {
    "id": "q66",
    "type": "multipleChoice",
    "question": "Read the word: CLOCK. Which picture matches?",
    "options": [
      "🧃",
      "🛏️",
      "🧸",
      "🕒"
    ],
    "answer": 3,
    "difficulty": "easy",
    "explanation": "A clock tells the time."
  },
  {
    "id": "q67",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: I ___ my teeth at night.",
    "answer": "brush",
    "difficulty": "medium",
    "explanation": "We say: ‘I brush my teeth.’"
  },
  {
    "id": "q68",
    "type": "multipleChoice",
    "passage": "Dad drives the car. The car is green.",
    "question": "What colour is the car?",
    "options": [
      "green",
      "red",
      "blue",
      "yellow"
    ],
    "answer": 0,
    "difficulty": "medium",
    "explanation": "It says the car is green."
  },
  {
    "id": "q69",
    "type": "multipleChoice",
    "question": "Which word is a verb (action)?",
    "options": [
      "chair",
      "jump",
      "yellow",
      "baby"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Jump is an action word."
  },
  {
    "id": "q70",
    "type": "multipleChoice",
    "passage": "Read: The puppy is hungry. It wants food.",
    "question": "Why does the puppy want food?",
    "options": [
      "It is wet",
      "It is sleepy",
      "It is hungry",
      "It is angry"
    ],
    "answer": 2,
    "difficulty": "hard",
    "explanation": "Hungry means it needs food."
  },
  {
    "id": "q71",
    "type": "multipleChoice",
    "passage": "Read: Mia has a red hat. She wears it in the sun.",
    "question": "Why does Mia wear the hat?",
    "options": [
      "Because it is night",
      "Because it is snowing",
      "Because she is hungry",
      "Because it is sunny"
    ],
    "answer": 3,
    "difficulty": "medium",
    "explanation": "She wears it in the sun, so it is sunny."
  },
  {
    "id": "q72",
    "type": "multipleChoice",
    "question": "Which word means very small?",
    "options": [
      "tiny",
      "tall",
      "loud",
      "slow"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q73",
    "type": "multipleChoice",
    "question": "Choose the best word: The fish can ___.",
    "options": [
      "fly",
      "swim",
      "hop",
      "sing"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q74",
    "type": "multipleChoice",
    "question": "Which picture matches the word APPLE?",
    "options": [
      "🍎",
      "🍌",
      "🥕",
      "🧦"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q75",
    "type": "multipleChoice",
    "question": "Choose the best sentence.",
    "options": [
      "The dog are big.",
      "The dog is big.",
      "Dog the is big.",
      "The big are dog."
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q76",
    "type": "multipleChoice",
    "question": "Which word rhymes with SUN?",
    "options": [
      "book",
      "run",
      "tree",
      "dog"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q77",
    "type": "multipleChoice",
    "question": "Choose the colour word.",
    "options": [
      "jump",
      "purple",
      "table",
      "smile"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q78",
    "type": "multipleChoice",
    "question": "Which sentence is a question?",
    "options": [
      "I like cake.",
      "Where is my bag?",
      "Run to the gate.",
      "The bus is late."
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q79",
    "type": "multipleChoice",
    "question": "Choose the best word: I ___ to school every day.",
    "options": [
      "go",
      "goes",
      "going",
      "gone"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q80",
    "type": "multipleChoice",
    "question": "Which word means the same as HAPPY?",
    "options": [
      "glad",
      "sad",
      "cold",
      "quiet"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q81",
    "type": "multipleChoice",
    "question": "Which picture shows something you can read?",
    "options": [
      "🎈",
      "📘",
      "🧦",
      "🍎"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q82",
    "type": "multipleChoice",
    "question": "Choose the best word: A baby dog is a ___.",
    "options": [
      "kitten",
      "puppy",
      "calf",
      "cub"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q83",
    "type": "multipleChoice",
    "question": "Which sentence has a capital letter and full stop?",
    "options": [
      "we like music",
      "We like music.",
      "We like Music",
      "we like music."
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q84",
    "type": "multipleChoice",
    "question": "Choose the best word: Birds have two ___.",
    "options": [
      "wings",
      "wheels",
      "fins",
      "seats"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q85",
    "type": "multipleChoice",
    "question": "Which word belongs with school?",
    "options": [
      "eraser",
      "pillow",
      "shampoo",
      "blanket"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q86",
    "type": "multipleChoice",
    "question": "Choose the best ending: Please open the ___.",
    "options": [
      "rain",
      "door",
      "banana",
      "tiger"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q87",
    "type": "multipleChoice",
    "question": "Which word is a place?",
    "options": [
      "park",
      "green",
      "happy",
      "under"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q88",
    "type": "multipleChoice",
    "question": "Which word means the opposite of HOT?",
    "options": [
      "warm",
      "cold",
      "big",
      "fast"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q89",
    "type": "multipleChoice",
    "question": "Choose the best word: We wear ___ on our feet.",
    "options": [
      "gloves",
      "shoes",
      "hats",
      "scarves"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q90",
    "type": "multipleChoice",
    "question": "Read: \"The bus is late.\" What is late?",
    "options": [
      "The train",
      "The bus",
      "The dog",
      "The bell"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q91",
    "type": "multipleChoice",
    "question": "Which word can you eat?",
    "options": [
      "sandwich",
      "pencil",
      "socks",
      "door"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Choose the best answer."
  },
  {
    "id": "q92",
    "type": "trueFalse",
    "question": "A book has pages.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q93",
    "type": "trueFalse",
    "question": "A banana is blue.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q94",
    "type": "trueFalse",
    "question": "Children can play in a park.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q95",
    "type": "trueFalse",
    "question": "A teacher drives a train in class.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q96",
    "type": "trueFalse",
    "question": "Winter is usually cold.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q97",
    "type": "trueFalse",
    "question": "A fish walks to school.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q98",
    "type": "trueFalse",
    "question": "A rainbow has colours.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q99",
    "type": "trueFalse",
    "question": "You can sleep in a chair better than a bed.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q100",
    "type": "trueFalse",
    "question": "A pencil can help you write.",
    "options": [
      "False",
      "True"
    ],
    "answer": 1,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q101",
    "type": "trueFalse",
    "question": "A bus is smaller than a pencil.",
    "options": [
      "False",
      "True"
    ],
    "answer": 0,
    "difficulty": "easy",
    "explanation": "Read the sentence carefully."
  },
  {
    "id": "q102",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: C _ KE",
    "answer": "a",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q103",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: I drink ____.",
    "answer": "water",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q104",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: _ ish (an animal in water)",
    "answer": "f",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q105",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: The sun is very ____.",
    "answer": "hot",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q106",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: tr _ e",
    "answer": "e",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q107",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: We read a ____.",
    "answer": "book",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q108",
    "type": "fillInTheBlank",
    "question": "Fill in the missing letter: sh _ e",
    "answer": "o",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q109",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: A cat says ____.",
    "answer": "meow",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q110",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: I see the moon at ____.",
    "answer": "night",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  },
  {
    "id": "q111",
    "type": "fillInTheBlank",
    "question": "Fill in the missing word: We wear a coat when it is ____.",
    "answer": "cold",
    "difficulty": "medium",
    "explanation": "Think about the word carefully."
  }
];
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
