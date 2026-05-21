/* assets/data/tests-4-7-speaking.js
   Question bank: Ages 4–7 • Speaking

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-4-7-speaking"

   Notes:
   - Caregiver/teacher reads the prompt. The learner answers out loud.
   - No auto-scoring: caregiver marks each prompt as Said / Try again / Skip.
   - Use model answers as examples; any similar answer is OK.
*/

(function () {
  "use strict";

  const SLUG = "age-4-7-speaking";

  const QUESTIONS = [
    {
      id: "q1",
      type: "prompt",
      question: "Say hello and tell your name. 👋",
      say: "Hello. My name is Minh.",
      model: "Hello. My name is Minh.",
      difficulty: "easy",
      explanation: "Change the name to your own name."
    },
    {
      id: "q2",
      type: "prompt",
      question: "How old are you? 🎂",
      say: "I am five years old.",
      model: "I am ___ years old.",
      difficulty: "easy",
      explanation: "Say your age. It’s OK to say just the number."
    },
    {
      id: "q3",
      type: "prompt",
      question: "How are you today? 🙂",
      say: "I am happy today.",
      model: "I am happy / sad / tired / excited.",
      difficulty: "easy",
      explanation: "Pick one feeling word."
    },
    {
      id: "q4",
      type: "prompt",
      question: "What is your favourite colour? 🎨",
      say: "My favourite colour is blue.",
      model: "My favourite colour is ____.",
      difficulty: "easy",
      explanation: "Use the full sentence if you can."
    },
    {
      id: "q5",
      type: "prompt",
      question: "Name these animals: 🐶 🐱 🐰 🐻",
      say: "Dog. Cat. Rabbit. Bear.",
      model: "Dog / Cat / Rabbit / Bear",
      difficulty: "easy",
      explanation: "Say one or more animals."
    },
    {
      id: "q6",
      type: "prompt",
      question: "Say a short sentence about an animal. 🐶",
      say: "This is a dog. It is big.",
      model: "This is a ____. It is ____.",
      difficulty: "medium",
      explanation: "Use one describing word: big, small, fast, cute."
    },
    {
      id: "q7",
      type: "prompt",
      question: "What do you like to eat? 🍎",
      say: "I like apples.",
      model: "I like ____.",
      difficulty: "easy",
      explanation: "Any food is OK."
    },
    {
      id: "q8",
      type: "prompt",
      question: "What do you like to play? 🧸⚽",
      say: "I like to play football.",
      model: "I like to play ____.",
      difficulty: "medium",
      explanation: "Use a toy, sport, or game."
    },
    {
      id: "q9",
      type: "prompt",
      question: "Say three classroom things. ✏️📚🧃",
      say: "Pencil. Book. Eraser.",
      model: "pencil • book • eraser",
      difficulty: "easy",
      explanation: "Say any 3 words."
    },
    {
      id: "q10",
      type: "prompt",
      question: "Make a sentence: “I have …” 🎒",
      say: "I have a bag.",
      model: "I have a ____.",
      difficulty: "easy",
      explanation: "Say something you have."
    },
    {
      id: "q11",
      type: "prompt",
      question: "Count from 1 to 10. 🔢",
      say: "One, two, three, four, five, six, seven, eight, nine, ten.",
      model: "1 2 3 4 5 6 7 8 9 10",
      difficulty: "easy",
      explanation: "Slow is fine. You can stop early if needed."
    },
    {
      id: "q12",
      type: "prompt",
      question: "What can you do? Choose one. 🏃‍♂️🧠",
      say: "I can run.",
      model: "I can run / jump / swim / sing.",
      difficulty: "medium",
      explanation: "Use “I can …” + a verb."
    },
    {
      id: "q13",
      type: "prompt",
      question: "Where is the ball? ⚽ (in / on / under)",
      say: "The ball is under the table.",
      model: "The ball is in / on / under ____.",
      difficulty: "medium",
      explanation: "Use one place word: in, on, under."
    },
    {
      id: "q14",
      type: "prompt",
      question: "Talk about your family. 👨‍👩‍👧‍👦",
      say: "I have a mom and a dad.",
      model: "I have a ____.",
      difficulty: "medium",
      explanation: "You can say: mom, dad, brother, sister, grandma."
    },
    {
      id: "q15",
      type: "prompt",
      question: "What do you do in the morning? ☀️",
      say: "I brush my teeth.",
      model: "I ____ in the morning.",
      difficulty: "medium",
      explanation: "Examples: wake up, wash, eat breakfast, go to school."
    },
    {
      id: "q16",
      type: "prompt",
      question: "Describe your favourite toy. 🧸",
      say: "It is small and red.",
      model: "It is ____ and ____.",
      difficulty: "hard",
      explanation: "Use two describing words: big/small, red/blue, new/old."
    },
    {
      id: "q17",
      type: "prompt",
      question: "Tell a short story (2–3 sentences). 📖",
      say: "I went to the park. I played on the slide. I was happy.",
      model: "I went to ____. I ____. I felt ____.",
      difficulty: "hard",
      explanation: "Any short story is OK. Keep it simple."
    },
    {
      id: "q18",
      type: "prompt",
      question: "Ask a question to your teacher. ❓",
      say: "Can I go to the toilet, please?",
      model: "Can I ____ , please?",
      difficulty: "hard",
      explanation: "Examples: Can I drink water? Can you help me?"
    },
    {
      id: "q19",
      type: "prompt",
      question: "What is your favourite animal and why? 🐼",
      say: "My favourite animal is a panda because it is cute.",
      model: "My favourite animal is ____ because ____.",
      difficulty: "hard",
      explanation: "You can say: because it is cute / big / funny / fast."
    },
    {
      id: "q20",
      type: "prompt",
      question: "Say a polite sentence. 🙏",
      say: "Thank you. You are welcome.",
      model: "Please. / Thank you. / Sorry.",
      difficulty: "easy",
      explanation: "Practise polite words."
    }
  ];

  // Added prompts (append-only)
  QUESTIONS.push(
    {
      id: "q21",
      type: "prompt",
      question: "Say the alphabet from A to F. 🔤",
      say: "A, B, C, D, E, F.",
      model: "A, B, C, D, E, F.",
      difficulty: "easy",
      explanation: "Say the letters slowly and clearly."
    },
    {
      id: "q22",
      type: "prompt",
      question: "Say the numbers 11 to 20. 🔢",
      say: "Eleven, twelve, thirteen, fourteen, fifteen, sixteen, seventeen, eighteen, nineteen, twenty.",
      model: "11 12 13 14 15 16 17 18 19 20",
      difficulty: "medium",
      explanation: "You can point to the numbers as you say them."
    },
    {
      id: "q23",
      type: "prompt",
      question: "Say three fruits. 🍌🍎🍇",
      say: "Banana. Apple. Grapes.",
      model: "banana • apple • grapes",
      difficulty: "easy",
      explanation: "Any 3 fruits are OK."
    },
    {
      id: "q24",
      type: "prompt",
      question: "What is the weather today? ☀️🌧️",
      say: "It is sunny today.",
      model: "It is sunny / rainy / cloudy / windy today.",
      difficulty: "easy",
      explanation: "Choose one weather word."
    },
    {
      id: "q25",
      type: "prompt",
      question: "What is your favourite drink? 🥛",
      say: "My favourite drink is milk.",
      model: "My favourite drink is ____.",
      difficulty: "easy",
      explanation: "Any drink is OK."
    },
    {
      id: "q26",
      type: "prompt",
      question: "Tell me about your school. 🏫",
      say: "My school is big. I like my teacher.",
      model: "My school is ____. I like ____.",
      difficulty: "medium",
      explanation: "Say 1–2 short sentences."
    },
    {
      id: "q27",
      type: "prompt",
      question: "What do you do at break time? ⏰",
      say: "I play with my friends.",
      model: "I ____ at break time.",
      difficulty: "medium",
      explanation: "Examples: play, talk, eat, drink water."
    },
    {
      id: "q28",
      type: "prompt",
      question: "Say two things in your bag. 🎒",
      say: "A pencil and a book.",
      model: "A ____ and a ____.",
      difficulty: "easy",
      explanation: "Any 2 school things are OK."
    },
    {
      id: "q29",
      type: "prompt",
      question: "Describe your shoes. 👟",
      say: "My shoes are black.",
      model: "My shoes are ____.",
      difficulty: "medium",
      explanation: "Use a colour word: black, white, red, blue."
    },
    {
      id: "q30",
      type: "prompt",
      question: "Make a sentence with “and”. ➕",
      say: "I like apples and bananas.",
      model: "I like ____ and ____.",
      difficulty: "medium",
      explanation: "Use two foods, toys, or colours."
    },
    {
      id: "q31",
      type: "prompt",
      question: "Make a sentence with “but”. 🔁",
      say: "I like cats, but I do not like spiders.",
      model: "I like ____, but I do not like ____.",
      difficulty: "hard",
      explanation: "Use “but” to show two different ideas."
    },
    {
      id: "q32",
      type: "prompt",
      question: "Say one thing you like and one thing you don’t like. 👍👎",
      say: "I like pizza. I don't like onions.",
      model: "I like ____. I don't like ____.",
      difficulty: "medium",
      explanation: "Any examples are OK."
    },
    {
      id: "q33",
      type: "prompt",
      question: "Where do you sleep? 🛏️",
      say: "I sleep in my bed.",
      model: "I sleep in / on ____.",
      difficulty: "easy",
      explanation: "Use a simple place word: in or on."
    },
    {
      id: "q34",
      type: "prompt",
      question: "Say three body parts. 👂👃👄",
      say: "Head. Hand. Foot.",
      model: "head • hand • foot",
      difficulty: "easy",
      explanation: "Any 3 body parts are OK."
    },
    {
      id: "q35",
      type: "prompt",
      question: "Say three clothes. 👕👖🧢",
      say: "T-shirt. Pants. Hat.",
      model: "T-shirt • pants • hat",
      difficulty: "easy",
      explanation: "Any 3 clothes are OK."
    },
    {
      id: "q36",
      type: "prompt",
      question: "What are you wearing today? 👚",
      say: "I am wearing a blue shirt.",
      model: "I am wearing a ____ ____.",
      difficulty: "medium",
      explanation: "Say colour + clothing (blue shirt, red dress)."
    },
    {
      id: "q37",
      type: "prompt",
      question: "Talk about your best friend. 🧡",
      say: "My best friend is Lan. She is kind.",
      model: "My best friend is ____. He/She is ____.",
      difficulty: "hard",
      explanation: "Use one kind word: kind, funny, nice, helpful."
    },
    {
      id: "q38",
      type: "prompt",
      question: "Ask your friend to play, politely. 🤝",
      say: "Can you play with me, please?",
      model: "Can you ____ with me, please?",
      difficulty: "hard",
      explanation: "Use please at the end."
    },
    {
      id: "q39",
      type: "prompt",
      question: "Ask for help, politely. 🙋",
      say: "Can you help me, please?",
      model: "Can you help me, please?",
      difficulty: "medium",
      explanation: "Say it with a friendly voice."
    },
    {
      id: "q40",
      type: "prompt",
      question: "Tell a short story about a lost toy (2–3 sentences). 🧸",
      say: "I lost my teddy. I looked under the bed. I found it!",
      model: "I lost my ____. I looked ____. I found it!",
      difficulty: "hard",
      explanation: "Keep it short. Any story is OK."
    },
    {
      id: "q41",
      type: "prompt",
      question: "Describe this picture: 🏠🌳🐦",
      say: "I see a house. I see a tree. I see a bird.",
      model: "I see a ____. I see a ____. I see a ____.",
      difficulty: "medium",
      explanation: "Say what you see."
    },
    {
      id: "q42",
      type: "prompt",
      question: "Where is the cat? 🐱 (in / on / under)",
      say: "The cat is on the chair.",
      model: "The cat is in / on / under ____.",
      difficulty: "medium",
      explanation: "Use one place word: in, on, under."
    },
    {
      id: "q43",
      type: "prompt",
      question: "Give directions to the door. 🚪",
      say: "Go straight. Turn left.",
      model: "Go straight. Turn left / right.",
      difficulty: "hard",
      explanation: "Use two direction sentences."
    },
    {
      id: "q44",
      type: "prompt",
      question: "What do you do after dinner? 🍽️",
      say: "I take a shower and go to bed.",
      model: "I ____ after dinner.",
      difficulty: "medium",
      explanation: "Examples: do homework, brush teeth, watch TV, sleep."
    },
    {
      id: "q45",
      type: "prompt",
      question: "What did you do yesterday? 🗓️",
      say: "Yesterday, I played with my friends.",
      model: "Yesterday, I ____.",
      difficulty: "hard",
      explanation: "Use one verb: played, watched, visited, cooked."
    },
    {
      id: "q46",
      type: "prompt",
      question: "Say three days of the week. 📅",
      say: "Monday, Tuesday, Wednesday.",
      model: "Monday • Tuesday • Wednesday",
      difficulty: "medium",
      explanation: "Any 3 days are OK."
    },
    {
      id: "q47",
      type: "prompt",
      question: "Say the four seasons. 🌸☀️🍂❄️",
      say: "Spring, summer, autumn, winter.",
      model: "spring • summer • autumn • winter",
      difficulty: "hard",
      explanation: "Say them slowly. Autumn can also be called fall."
    },
    {
      id: "q48",
      type: "prompt",
      question: "Describe your room with two words. 🏠",
      say: "My room is clean and quiet.",
      model: "My room is ____ and ____.",
      difficulty: "hard",
      explanation: "Use two describing words: clean, messy, big, small, quiet."
    },
    {
      id: "q49",
      type: "prompt",
      question: "Make a sentence: “There is …” 🧃",
      say: "There is a juice on the table.",
      model: "There is a ____ on the ____.",
      difficulty: "medium",
      explanation: "Use any object and place."
    },
    {
      id: "q50",
      type: "prompt",
      question: "Make a sentence: “I want …” 🍪",
      say: "I want a cookie, please.",
      model: "I want ____ , please.",
      difficulty: "easy",
      explanation: "Add please to be polite."
    },
    {
      id: "q51",
      type: "prompt",
      question: "Role-play: Ask for a snack. 🍎",
      say: "Can I have an apple, please?",
      model: "Can I have a/an ____ , please?",
      difficulty: "medium",
      explanation: "Use Can I have… to ask politely."
    },
    {
      id: "q52",
      type: "prompt",
      question: "Tell your favourite animal and what it can do. 🐬",
      say: "My favourite animal is a dolphin. It can swim fast.",
      model: "My favourite animal is ____. It can ____.",
      difficulty: "hard",
      explanation: "Use can + a verb (run, swim, jump, fly)."
    },
    {
      id: "q53",
      type: "prompt",
      question: "Say two feelings and when you feel them. 🙂😴",
      say: "I feel happy when I play. I feel tired at night.",
      model: "I feel ____ when ____. I feel ____ when ____.",
      difficulty: "hard",
      explanation: "Feelings: happy, sad, tired, excited, angry."
    },
    {
      id: "q54",
      type: "prompt",
      question: "Say three action words (verbs). 🏃‍♀️👏🕺",
      say: "Run. Jump. Clap.",
      model: "run • jump • clap",
      difficulty: "easy",
      explanation: "Any 3 action words are OK."
    },
    {
      id: "q55",
      type: "prompt",
      question: "Say the opposite word: big → ___",
      say: "Small.",
      model: "big → small",
      difficulty: "medium",
      explanation: "Opposites are words that mean the opposite."
    },
    {
      id: "q56",
      type: "prompt",
      question: "Say the opposite word: hot → ___",
      say: "Cold.",
      model: "hot → cold",
      difficulty: "medium",
      explanation: "Hot and cold are opposites."
    },
    {
      id: "q57",
      type: "prompt",
      question: "Say a sentence with “because”. 💡",
      say: "I like ice cream because it is sweet.",
      model: "I like ____ because ____.",
      difficulty: "hard",
      explanation: "Because tells the reason."
    },
    {
      id: "q58",
      type: "prompt",
      question: "What will you do tomorrow? 🌈",
      say: "Tomorrow, I will go to school.",
      model: "Tomorrow, I will ____.",
      difficulty: "medium",
      explanation: "Use will + a verb (play, go, visit, study)."
    },
    {
      id: "q59",
      type: "prompt",
      question: "Say three animals that live in water. 🌊",
      say: "Fish. Dolphin. Turtle.",
      model: "fish • dolphin • turtle",
      difficulty: "medium",
      explanation: "Any 3 water animals are OK."
    },
    {
      id: "q60",
      type: "prompt",
      question: "Say three things you see in a kitchen. 🍳",
      say: "Plate. Spoon. Cup.",
      model: "plate • spoon • cup",
      difficulty: "medium",
      explanation: "Any 3 kitchen things are OK."
    },
    {
      id: "q61",
      type: "prompt",
      question: "Role-play: Buy ice cream (2 lines). 🍦",
      say: "Hello. Can I have chocolate ice cream, please?",
      model: "Hello. Can I have ____ ice cream, please?",
      difficulty: "hard",
      explanation: "Say hello first, then ask politely."
    },
    {
      id: "q62",
      type: "prompt",
      question: "Ask a “wh-” question. ❓",
      say: "Where is my book?",
      model: "What / Where / Who is ____?",
      difficulty: "hard",
      explanation: "Use What, Where, or Who."
    },
    {
      id: "q63",
      type: "prompt",
      question: "Describe what the boy is doing: 🧒🏃",
      say: "He is running.",
      model: "He is ____-ing.",
      difficulty: "hard",
      explanation: "Use is + verb-ing (running, jumping, eating)."
    },
    {
      id: "q64",
      type: "prompt",
      question: "Tell a story with first, then, last. 🧩",
      say: "First I woke up. Then I ate breakfast. Last I went to school.",
      model: "First ____. Then ____. Last ____.",
      difficulty: "hard",
      explanation: "Use three short parts: first, then, last."
    },
    {
      id: "q65",
      type: "prompt",
      question: "Talk about your weekend (1–2 sentences). 🎈",
      say: "On the weekend, I visited my grandma. I played games.",
      model: "On the weekend, I ____. I ____.",
      difficulty: "hard",
      explanation: "Use simple past if you can: visited, played, watched."
    },
    {
      id: "q66",
      type: "prompt",
      question: "Spell your name out loud. 🔤",
      say: "M-I-N-H.",
      model: "(Spell your name): A-N-A",
      difficulty: "hard",
      explanation: "Say each letter one by one."
    },
    {
      id: "q67",
      type: "prompt",
      question: "Compare two things: Which is bigger? 🐘🐭",
      say: "The elephant is bigger than the mouse.",
      model: "The ____ is bigger than the ____.",
      difficulty: "hard",
      explanation: "Use bigger/smaller to compare."
    },
    {
      id: "q68",
      type: "prompt",
      question: "Describe a silly monster (2 sentences). 👾",
      say: "It is green. It has three eyes.",
      model: "It is ____. It has ____ eyes.",
      difficulty: "hard",
      explanation: "Use a colour and a number."
    },
    {
      id: "q69",
      type: "prompt",
      question: "Say a sentence to say sorry. 🙇",
      say: "I'm sorry. It was an accident.",
      model: "I'm sorry. / Sorry!",
      difficulty: "medium",
      explanation: "Use sorry when you make a mistake."
    },
    {
      id: "q70",
      type: "prompt",
      question: "Say goodbye and a nice wish. 👋",
      say: "Goodbye! Have a nice day!",
      model: "Goodbye! Have a nice day!",
      difficulty: "easy",
      explanation: "Speak clearly and smile."
    },
    {
      id: "q71",
      type: "prompt",
      question: "Ask for help politely. 🆘",
      say: "Can you help me, please?",
      model: "Can you help me, please?",
      difficulty: "medium",
      explanation: "Use please to be polite."
    }
  );


  // Global export (no build step)


  // Added to normalize this bank to 111 items.
  QUESTIONS.push(
    {
      "id": "q72",
      "type": "prompt",
      "question": "Tell me your favourite animal and one reason.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q73",
      "type": "prompt",
      "question": "Say 3 fruits you like.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q74",
      "type": "prompt",
      "question": "What do you do in the morning before school?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q75",
      "type": "prompt",
      "question": "Tell me 2 things in your classroom.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q76",
      "type": "prompt",
      "question": "What is your favourite toy or game?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q77",
      "type": "prompt",
      "question": "Say a sentence about your mum or dad.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q78",
      "type": "prompt",
      "question": "What colour is your school bag?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q79",
      "type": "prompt",
      "question": "What do you like to drink?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q80",
      "type": "prompt",
      "question": "Count from 10 to 1.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q81",
      "type": "prompt",
      "question": "Tell me about your best friend.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q82",
      "type": "prompt",
      "question": "What can a bird do?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q83",
      "type": "prompt",
      "question": "What can a fish do?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q84",
      "type": "prompt",
      "question": "Say 2 foods you eat at lunch.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q85",
      "type": "prompt",
      "question": "What do you do at the park?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q86",
      "type": "prompt",
      "question": "Tell me about a rainy day.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q87",
      "type": "prompt",
      "question": "What is your favourite day of the week?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q88",
      "type": "prompt",
      "question": "Say 3 body parts.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q89",
      "type": "prompt",
      "question": "What do you wear on your feet?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q90",
      "type": "prompt",
      "question": "Tell me about your favourite book.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q91",
      "type": "prompt",
      "question": "What do you see in the sky in the day?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q92",
      "type": "prompt",
      "question": "What do you see in the sky at night?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q93",
      "type": "prompt",
      "question": "Say 3 classroom actions: read, write, listen, sit, stand.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q94",
      "type": "prompt",
      "question": "What is in your pencil case?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q95",
      "type": "prompt",
      "question": "Tell me about your bedroom.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q96",
      "type": "prompt",
      "question": "What game do you play with your friends?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q97",
      "type": "prompt",
      "question": "What do you do after dinner?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q98",
      "type": "prompt",
      "question": "Tell me one rule in your classroom.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q99",
      "type": "prompt",
      "question": "What animal is big and strong?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q100",
      "type": "prompt",
      "question": "What animal is small and cute?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q101",
      "type": "prompt",
      "question": "Tell me about your favourite colour.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q102",
      "type": "prompt",
      "question": "What do you do on the weekend?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q103",
      "type": "prompt",
      "question": "Say a sentence with \"I can...\".",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q104",
      "type": "prompt",
      "question": "Say a sentence with \"I like...\".",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q105",
      "type": "prompt",
      "question": "Tell me about your teacher.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q106",
      "type": "prompt",
      "question": "What do you bring to school?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q107",
      "type": "prompt",
      "question": "Tell me one thing that makes you happy.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q108",
      "type": "prompt",
      "question": "Say 3 things in the kitchen.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q109",
      "type": "prompt",
      "question": "What is your favourite song or rhyme?",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q110",
      "type": "prompt",
      "question": "Tell me about a family trip.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "medium",
      "explanation": "Any clear, age-appropriate answer is OK."
    },
    {
      "id": "q111",
      "type": "prompt",
      "question": "Say hello, ask \"How are you?\", and answer it.",
      "say": "Use 1 to 3 short sentences.",
      "model": "Use 1 to 3 short sentences.",
      "difficulty": "easy",
      "explanation": "Any clear, age-appropriate answer is OK."
    },

{
    "id": "q112",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q113",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q114",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q115",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q116",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q117",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q118",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q119",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q120",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q121",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favourite day of the week and why you like it.",
    "model": "Sample answer with a clear idea, a reason, and a short example.",
    "say": "Sample answer with a clear idea, a reason, and a short example.",
    "difficulty": "easy",
    "explanation": "State your opinion and support it.",
    "targets": [
        "Reason",
        "Example"
    ]
},

{
    "id": "q122",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your morning routine.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q123",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite game.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q124",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your classroom.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q125",
    "type": "prompt",
    "section": "part1",
    "question": "Tell me about a family member.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q126",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your best friend.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q127",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite food.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q128",
    "type": "prompt",
    "section": "part1",
    "question": "Describe a rainy day activity.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q129",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about a place you visited.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q130",
    "type": "prompt",
    "section": "part1",
    "question": "Describe a pet you know.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q131",
    "type": "prompt",
    "section": "part1",
    "question": "Tell me about your weekend.",
    "model": "Sample answer: clear opinion, one reason, and one example.",
    "say": "Sample answer: clear opinion, one reason, and one example.",
    "difficulty": "easy",
    "explanation": "Answer directly and support your idea.",
    "targets": [
        "Reason",
        "Example"
    ]
},

{
    "id": "q132",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite toy.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q133",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your classroom.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q134",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your best friend.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q135",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your weekend.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q136",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite food.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q137",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite toy.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q138",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your classroom.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q139",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your best friend.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q140",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your weekend.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q141",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite food.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q142",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite toy.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q143",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your classroom.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q144",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your best friend.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q145",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your weekend.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q146",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite food.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q147",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite toy.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q148",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your classroom.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q149",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your best friend.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q150",
    "type": "prompt",
    "section": "part1",
    "question": "Describe your weekend.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
},
{
    "id": "q151",
    "type": "prompt",
    "section": "part1",
    "question": "Talk about your favorite food.",
    "model": "Sample answer: clear opinion + reason + example.",
    "say": "Sample answer: clear opinion + reason + example.",
    "difficulty": "easy",
    "explanation": "Answer directly, then support with a reason.",
    "targets": [
        "Reason",
        "Example"
    ]
}



  );
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
