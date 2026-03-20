/* assets/data/tests-8-10-reading.js
   Question bank: Ages 8–10 • Reading

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-8-10-reading"

   Content notes:
   - Short passages (2–6 sentences) with comprehension questions.
   - “Choose a heading” tasks.
   - Vocabulary-in-context and basic grammar.
   - Age-appropriate topics (school, hobbies, nature, daily life).
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-reading";

  const QUESTIONS = [
    {
      id: "q1",
      type: "multipleChoice",
      passage:
        "Linh forgot her water bottle at home. At break time, her friend Maya shared her bottle with Linh. Linh thanked Maya and promised to bring an extra bottle tomorrow.",
      question: "Why did Maya share her bottle?",
      options: [
        "Because Linh was late to class",
        "Because Maya had no water",
        "Because the teacher told her to",
        "Because Linh forgot hers"
      ], answer: 3,
      difficulty: "easy",
      explanation: "The passage says Linh forgot her bottle at home, so Maya shared."
    },
    {
      id: "q2",
      type: "multipleChoice",
      passage:
        "Linh forgot her water bottle at home. At break time, her friend Maya shared her bottle with Linh. Linh thanked Maya and promised to bring an extra bottle tomorrow.",
      question: "What will Linh do tomorrow?",
      options: ["Bring an extra bottle", "Buy a new bag", "Skip break time", "Ask the teacher for water"],
      answer: 0,
      difficulty: "easy",
      explanation: "Linh promised to bring an extra bottle tomorrow."
    },
    {
      id: "q3",
      type: "multipleChoice",
      passage:
        "On Saturday, Amir visited a small museum with his family. He liked the room with old maps because he enjoys learning about different countries. Before leaving, he bought a postcard of a world map.",
      question: "Which heading fits the passage best?",
      options: ["Cooking at Home", "A Trip to the Museum", "A Rainy School Day", "A Football Match"], answer: 1,
      difficulty: "easy",
      explanation: "The passage is about visiting a museum."
    },
    {
      id: "q4",
      type: "multipleChoice",
      passage:
        "On Saturday, Amir visited a small museum with his family. He liked the room with old maps because he enjoys learning about different countries. Before leaving, he bought a postcard of a world map.",
      question: "Why did Amir like the room with old maps?",
      options: [
        "He was looking for his family",
        "He wanted to draw maps",
        "He enjoys learning about countries",
        "He needed a place to sit"
      ], answer: 2,
      difficulty: "medium",
      explanation: "The text says he enjoys learning about different countries."
    },
    {
      id: "q5",
      type: "trueFalse",
      passage:
        "On Saturday, Amir visited a small museum with his family. He liked the room with old maps because he enjoys learning about different countries. Before leaving, he bought a postcard of a world map.",
      question: "Amir bought a postcard before he left.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "The last sentence says he bought a postcard before leaving."
    },
    {
      id: "q6",
      type: "multipleChoice",
      passage:
        "Sora trained for a short race. She ran three times a week and stretched after each run. On race day, she felt nervous, but she remembered to breathe slowly. She finished the race and smiled.",
      question: "What did Sora do after each run?",
      options: ["She stretched", "She ate candy", "She took a long nap", "She watched a movie"],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage says she stretched after each run."
    },
    {
      id: "q7",
      type: "multipleChoice",
      passage:
        "Sora trained for a short race. She ran three times a week and stretched after each run. On race day, she felt nervous, but she remembered to breathe slowly. She finished the race and smiled.",
      question: "The word 'nervous' is closest in meaning to…",
      options: ["hungry", "worried", "sleepy", "angry"], answer: 1,
      difficulty: "medium",
      explanation: "Nervous means worried or a little scared."
    },
    {
      id: "q8",
      type: "multipleChoice",
      passage:
        "Sora trained for a short race. She ran three times a week and stretched after each run. On race day, she felt nervous, but she remembered to breathe slowly. She finished the race and smiled.",
      question: "Which sentence is true?",
      options: [
        "Sora quit the race",
        "Sora did not stretch at all",
        "Sora trained three times a week",
        "Sora forgot to breathe"
      ], answer: 2,
      difficulty: "medium",
      explanation: "The passage says she ran three times a week."
    },
    {
      id: "q9",
      type: "fillInTheBlank",
      question: "Fill in the word: I ______ my homework before dinner.",
      answer: ["do", "finish"],
      difficulty: "easy",
      explanation: "Both 'do' and 'finish' can work, depending on the sentence."
    },
    {
      id: "q10",
      type: "multipleChoice",
      passage:
        "At the library, Jia looked for a book about space. The librarian showed her a shelf with science books. Jia chose a book with photos of planets and read quietly for twenty minutes.",
      question: "Where was Jia?",
      options: ["At a restaurant", "At the zoo", "At the beach", "At the library"], answer: 3,
      difficulty: "easy",
      explanation: "The first sentence says 'At the library'."
    },
    {
      id: "q11",
      type: "multipleChoice",
      passage:
        "At the library, Jia looked for a book about space. The librarian showed her a shelf with science books. Jia chose a book with photos of planets and read quietly for twenty minutes.",
      question: "What kind of book did Jia choose?",
      options: [
        "A book with photos of planets",
        "A book about cooking",
        "A comic about superheroes",
        "A story about pirates"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "She chose a book with photos of planets."
    },
    {
      id: "q12",
      type: "multipleChoice",
      passage:
        "At the library, Jia looked for a book about space. The librarian showed her a shelf with science books. Jia chose a book with photos of planets and read quietly for twenty minutes.",
      question: "How long did Jia read?",
      options: ["Two minutes", "Twenty minutes", "One hour", "All day"], answer: 1,
      difficulty: "easy",
      explanation: "The passage says she read for twenty minutes."
    },
    {
      id: "q13",
      type: "multipleChoice",
      passage:
        "The class planted seeds in small cups. Every day, they added a little water and put the cups near the window. After one week, tiny green leaves appeared.",
      question: "Which heading is best?",
      options: ["Building a Robot", "Buying New Shoes", "Growing a Plant", "A Day at the Cinema"], answer: 2,
      difficulty: "easy",
      explanation: "The passage describes planting seeds and seeing leaves."
    },
    {
      id: "q14",
      type: "trueFalse",
      passage:
        "The class planted seeds in small cups. Every day, they added a little water and put the cups near the window. After one week, tiny green leaves appeared.",
      question: "The class watered the seeds every day.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "It says 'Every day, they added a little water'."
    },
    {
      id: "q15",
      type: "multipleChoice",
      passage:
        "The class planted seeds in small cups. Every day, they added a little water and put the cups near the window. After one week, tiny green leaves appeared.",
      question: "Where did they put the cups?",
      options: ["Near the window", "Inside a box", "Under the bed", "In the fridge"],
      answer: 0,
      difficulty: "medium",
      explanation: "They put the cups near the window for light."
    },
    {
      id: "q16",
      type: "multipleChoice",
      passage:
        "Niko wanted to save money for a new skateboard. He decided to do small jobs at home, like washing dishes and watering plants. After two weeks, he counted his coins and felt proud.",
      question: "Why did Niko do small jobs at home?",
      options: [
        "To buy a new phone",
        "To save money for a skateboard",
        "To skip homework",
        "To become a teacher"
      ], answer: 1,
      difficulty: "medium",
      explanation: "He wanted to save money for a skateboard."
    },
    {
      id: "q17",
      type: "multipleChoice",
      passage:
        "Niko wanted to save money for a new skateboard. He decided to do small jobs at home, like washing dishes and watering plants. After two weeks, he counted his coins and felt proud.",
      question: "The word 'proud' means…",
      options: ["confused", "tired", "happy with yourself", "bored"], answer: 2,
      difficulty: "medium",
      explanation: "Proud means you feel good about what you did."
    },
    {
      id: "q18",
      type: "fillInTheBlank",
      question: "Fill in the missing word: Please read ______ before you answer.",
      answer: ["carefully", "slowly"],
      difficulty: "medium",
      explanation: "In reading tests, you should read carefully (and often slowly)."
    },
    {
      id: "q19",
      type: "multipleChoice",
      passage:
        "During a storm, the power went out for ten minutes. Kai lit a small flashlight and sat with his sister in the living room. When the lights came back, they both cheered.",
      question: "What did Kai use when the power went out?",
      options: ["A bicycle", "A fan", "A computer", "A flashlight"], answer: 3,
      difficulty: "easy",
      explanation: "He lit a small flashlight."
    },
    {
      id: "q20",
      type: "trueFalse",
      passage:
        "During a storm, the power went out for ten minutes. Kai lit a small flashlight and sat with his sister in the living room. When the lights came back, they both cheered.",
      question: "The power was out for one hour.",
      options: ["False", "True"], answer: 0,
      difficulty: "easy",
      explanation: "It was out for ten minutes, not one hour."
    },
    {
      id: "q21",
      type: "multipleChoice",
      passage:
        "Mina joined the art club. In the first meeting, the teacher asked everyone to draw something that made them feel calm. Mina drew a beach at sunset and used soft colours.",
      question: "What did Mina draw?",
      options: ["A busy city", "A beach at sunset", "A scary monster", "A fast car"], answer: 1,
      difficulty: "easy",
      explanation: "The passage says she drew a beach at sunset."
    },
    {
      id: "q22",
      type: "multipleChoice",
      passage:
        "Mina joined the art club. In the first meeting, the teacher asked everyone to draw something that made them feel calm. Mina drew a beach at sunset and used soft colours.",
      question: "Why did the teacher ask students to draw?",
      options: [
        "To finish maths homework",
        "To copy a picture from the wall",
        "To draw something that made them feel calm",
        "To clean the classroom"
      ], answer: 2,
      difficulty: "medium",
      explanation: "The teacher asked for something that made them feel calm."
    },
    {
      id: "q23",
      type: "multipleChoice",
      passage:
        "A koala sleeps for many hours each day. It saves energy because it eats eucalyptus leaves, which are not very high in energy. When it is awake, it slowly climbs and looks for more leaves.",
      question: "Why does the koala sleep so much?",
      options: [
        "To learn to fly",
        "Because it is always sick",
        "Because it is afraid of leaves",
        "To save energy"
      ], answer: 3,
      difficulty: "medium",
      explanation: "The passage explains it sleeps to save energy."
    },
    {
      id: "q24",
      type: "multipleChoice",
      passage:
        "A koala sleeps for many hours each day. It saves energy because it eats eucalyptus leaves, which are not very high in energy. When it is awake, it slowly climbs and looks for more leaves.",
      question: "What does 'high in energy' mean here?",
      options: ["It gives a lot of energy", "It tastes very sweet", "It is very loud", "It is very cold"],
      answer: 0,
      difficulty: "hard",
      explanation: "Food that is 'high in energy' gives the body more energy."
    },
    {
      id: "q25",
      type: "fillInTheBlank",
      passage:
        "A koala sleeps for many hours each day. It saves energy because it eats eucalyptus leaves, which are not very high in energy.",
      question: "Fill in the missing word: The koala eats ______ leaves.",
      answer: ["eucalyptus"],
      difficulty: "hard",
      explanation: "The passage says it eats eucalyptus leaves."
    }
  ];

  // Added questions (append-only)
  QUESTIONS.push(
    {
      id: "q26",
      type: "multipleChoice",
      passage:
        "Rina made a paper airplane using a clean sheet of paper. It flew to the left at first, so she folded one wing again. Then she added a small piece of tape to the nose. After school, she tested it in the hallway and it glided far.",
      question: "Which heading fits the passage best?",
      options: [
        "A Broken Bicycle",
        "Testing a Paper Airplane",
        "A Rainy Picnic",
        "A New Puppy"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The passage is about making and testing a paper airplane."
    },
    {
      id: "q27",
      type: "multipleChoice",
      passage:
        "Rina made a paper airplane using a clean sheet of paper. It flew to the left at first, so she folded one wing again. Then she added a small piece of tape to the nose. After school, she tested it in the hallway and it glided far.",
      question: "Why did Rina change the wing?",
      options: [
        "Because the paper was wet",
        "Because she lost the tape",
        "Because it flew to the left",
        "Because the teacher asked her to"
      ], answer: 2,
      difficulty: "easy",
      explanation: "It flew to the left at first, so she folded one wing again."
    },
    {
      id: "q28",
      type: "multipleChoice",
      passage:
        "Rina made a paper airplane using a clean sheet of paper. It flew to the left at first, so she folded one wing again. Then she added a small piece of tape to the nose. After school, she tested it in the hallway and it glided far.",
      question: "The word 'glided' is closest in meaning to…",
      options: [
        "fell quickly",
        "spun loudly",
        "stopped suddenly",
        "moved smoothly"
      ], answer: 3,
      difficulty: "medium",
      explanation: "Glided means moved smoothly through the air."
    },
    {
      id: "q29",
      type: "trueFalse",
      passage:
        "Rina made a paper airplane using a clean sheet of paper. It flew to the left at first, so she folded one wing again. Then she added a small piece of tape to the nose. After school, she tested it in the hallway and it glided far.",
      question: "Rina tested the airplane in the hallway.",
      options: [
        "True",
        "False"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage says she tested it in the hallway after school."
    },
    {
      id: "q30",
      type: "multipleChoice",
      passage:
        "A desert is a very dry place, so it does not get much rain. Some plants, like cactus, can store water in their thick stems. Many desert animals rest during the hot day and come out at night when it is cooler.",
      question: "Why can cactus live in the desert?",
      options: [
        "It grows under the sea",
        "It stores water in its stem",
        "It makes its own rain",
        "It needs snow to grow"
      ],
      answer: 1,
      difficulty: "medium",
      explanation: "The passage says cactus can store water in thick stems."
    },
    {
      id: "q31",
      type: "multipleChoice",
      passage:
        "A desert is a very dry place, so it does not get much rain. Some plants, like cactus, can store water in their thick stems.",
      question: "The word 'dry' means…",
      options: [
        "full of plants",
        "very loud",
        "not wet",
        "made of metal"
      ], answer: 2,
      difficulty: "easy",
      explanation: "Dry means not wet."
    },
    {
      id: "q32",
      type: "trueFalse",
      passage:
        "A desert is a very dry place, so it does not get much rain.",
      question: "Deserts get a lot of rain.",
      options: [
        "True",
        "False"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "The passage says deserts do not get much rain."
    },
    {
      id: "q33",
      type: "multipleChoice",
      passage:
        "A desert is a very dry place, so it does not get much rain. Some plants, like cactus, can store water in their thick stems. Many desert animals rest during the hot day and come out at night when it is cooler.",
      question: "Which heading is best?",
      options: [
        "Life in the Desert",
        "Building a Snowman",
        "A Day at the Pool",
        "Making a Sandwich"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage explains desert weather, plants, and animals."
    },
    {
      id: "q34",
      type: "fillInTheBlank",
      passage:
        "Some plants, like cactus, can store water in their thick stems.",
      question: "Fill in the missing word: A cactus can store ______ in its stem.",
      answer: [
        "water"
      ],
      difficulty: "medium",
      explanation: "The sentence says cactus can store water."
    },
    {
      id: "q35",
      type: "multipleChoice",
      passage:
        "Leo helped his grandma bake bread. First, they mixed flour, water, and yeast in a bowl. Then Leo kneaded the dough until it felt smooth. They waited for the dough to rise, and the kitchen smelled warm and sweet.",
      question: "Why did they wait after kneading the dough?",
      options: [
        "To make the bowl colder",
        "To let the dough rise",
        "To wash the flour away",
        "To make the bread smaller"
      ],
      answer: 1,
      difficulty: "medium",
      explanation: "They waited for the dough to rise."
    },
    {
      id: "q36",
      type: "multipleChoice",
      passage:
        "Leo helped his grandma bake bread. First, they mixed flour, water, and yeast in a bowl. Then Leo kneaded the dough until it felt smooth. They waited for the dough to rise, and the kitchen smelled warm and sweet.",
      question: "How did the kitchen smell?",
      options: [
        "Cold and wet",
        "Loud and bright",
        "Warm and sweet",
        "Dirty and dusty"
      ], answer: 2,
      difficulty: "easy",
      explanation: "The passage says the kitchen smelled warm and sweet."
    },
    {
      id: "q37",
      type: "multipleChoice",
      passage:
        "Then Leo kneaded the dough until it felt smooth.",
      question: "The word 'kneaded' means…",
      options: [
        "to freeze in ice",
        "to cut with scissors",
        "to paint with a brush",
        "to push and fold"
      ], answer: 3,
      difficulty: "hard",
      explanation: "Kneading dough means pushing and folding it again and again."
    },
    {
      id: "q38",
      type: "trueFalse",
      passage:
        "Leo helped his grandma bake bread. They waited for the dough to rise, and the kitchen smelled warm and sweet. When the bread was ready, they ate it with jam.",
      question: "Leo and his grandma ate the bread with jam.",
      options: [
        "True",
        "False"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The last sentence says they ate it with jam."
    },
    {
      id: "q39",
      type: "multipleChoice",
      passage:
        "The class started a recycling project at school. They put new bins in the hallway and made signs for paper, plastic, and cans. Each day, the students sorted the rubbish into the correct bin. After a month, the hallway looked cleaner.",
      question: "What did the class do each day?",
      options: [
        "They painted the hallway",
        "They sorted rubbish into bins",
        "They closed the bins forever",
        "They threw everything away"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "The passage says the students sorted rubbish into the correct bin each day."
    },
    {
      id: "q40",
      type: "multipleChoice",
      passage:
        "The class started a recycling project at school. They put new bins in the hallway and made signs for paper, plastic, and cans. Each day, the students sorted the rubbish into the correct bin. After a month, the hallway looked cleaner.",
      question: "Which heading fits the passage best?",
      options: [
        "Learning to Play Chess",
        "A Trip to the Aquarium",
        "A School Recycling Project",
        "A New Pair of Shoes"
      ], answer: 2,
      difficulty: "easy",
      explanation: "The passage describes a recycling project at school."
    },
    {
      id: "q41",
      type: "trueFalse",
      passage:
        "They made signs for paper, plastic, and cans.",
      question: "The signs helped students know which bin to use.",
      options: [
        "False",
        "True"
      ], answer: 1,
      difficulty: "medium",
      explanation: "Signs show what belongs in each bin."
    },
    {
      id: "q42",
      type: "multipleChoice",
      passage:
        "Each day, the students sorted the rubbish into the correct bin.",
      question: "The word 'sorted' means…",
      options: [
        "put into groups",
        "mixed together",
        "threw into the air",
        "hid under a desk"
      ], answer: 0,
      difficulty: "medium",
      explanation: "Sorted means put things into groups."
    },
    {
      id: "q43",
      type: "fillInTheBlank",
      passage:
        "They made signs for paper, plastic, and cans.",
      question: "Fill in the missing word: One bin was for ______.",
      answer: [
        "paper",
        "plastic",
        "cans"
      ],
      difficulty: "medium",
      explanation: "The passage lists paper, plastic, and cans as categories."
    },
    {
      id: "q44",
      type: "multipleChoice",
      passage:
        "Mia went to a night market with her dad. The street was bright with lanterns and the air smelled like grilled food. Mia bought a cup of sugarcane juice and shared some grilled corn with her dad. When it got crowded, she held his hand.",
      question: "What did Mia buy to drink?",
      options: [
        "Hot chocolate",
        "Sugarcane juice",
        "Orange soup",
        "Plain water only"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The passage says Mia bought a cup of sugarcane juice."
    },
    {
      id: "q45",
      type: "multipleChoice",
      passage:
        "Mia went to a night market with her dad. The street was bright with lanterns and the air smelled like grilled food. Mia bought a cup of sugarcane juice and shared some grilled corn with her dad. When it got crowded, she held his hand.",
      question: "Why did Mia hold her dad's hand?",
      options: [
        "Because it was raining",
        "Because she was carrying a book",
        "Because it got crowded",
        "Because she wanted to run away"
      ], answer: 2,
      difficulty: "medium",
      explanation: "She held his hand when it got crowded."
    },
    {
      id: "q46",
      type: "trueFalse",
      passage:
        "The street was bright with lanterns and the air smelled like grilled food.",
      question: "The market was dark and quiet.",
      options: [
        "True",
        "False"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "It was bright, so it was not dark in the passage."
    },
    {
      id: "q47",
      type: "multipleChoice",
      passage:
        "When it got crowded, she held his hand.",
      question: "The word 'crowded' means…",
      options: [
        "full of people",
        "full of snow",
        "very empty",
        "very silent"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Crowded means there are many people."
    },
    {
      id: "q48",
      type: "multipleChoice",
      passage:
        "Mia went to a night market with her dad. The street was bright with lanterns and the air smelled like grilled food.",
      question: "Which heading is best?",
      options: [
        "A Quiet Library",
        "A Busy Night Market",
        "A Mountain Snowstorm",
        "A New Classroom Rule"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The passage describes a night market."
    },
    {
      id: "q49",
      type: "fillInTheBlank",
      passage:
        "When it got crowded, she held his hand.",
      question: "Fill in the missing word: Mia held her dad's ______.",
      answer: [
        "hand"
      ],
      difficulty: "easy",
      explanation: "The sentence says she held his hand."
    },
    {
      id: "q50",
      type: "multipleChoice",
      passage:
        "Sea turtles lay their eggs in warm sand. When the babies hatch, they quickly crawl toward the ocean. They move fast because birds and crabs may try to catch them. Once in the water, they swim away to safer places.",
      question: "Why do baby turtles crawl quickly to the ocean?",
      options: [
        "Because they are late for school",
        "Because the sand is made of ice",
        "Because predators may catch them",
        "Because they want to build a nest"
      ],
      answer: 2,
      difficulty: "medium",
      explanation: "The passage says birds and crabs may try to catch them."
    },
    {
      id: "q51",
      type: "trueFalse",
      passage:
        "When the babies hatch, they quickly crawl toward the ocean.",
      question: "The baby turtles move toward the ocean.",
      options: [
        "False",
        "True"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The passage says they crawl toward the ocean."
    },
    {
      id: "q52",
      type: "multipleChoice",
      passage:
        "They move fast because birds and crabs may try to catch them.",
      question: "The word 'predators' is closest in meaning to…",
      options: [
        "animals that hunt",
        "tiny plants",
        "clean water",
        "safe homes"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Predators are animals that hunt other animals."
    },
    {
      id: "q53",
      type: "multipleChoice",
      passage:
        "Sea turtles lay their eggs in warm sand. When the babies hatch, they quickly crawl toward the ocean.",
      question: "Which heading fits the passage best?",
      options: [
        "How to Draw a Turtle",
        "Baby Turtles to the Sea",
        "A Snowy Winter Day",
        "Making a Paper Boat"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The passage is about baby turtles hatching and going to the ocean."
    },
    {
      id: "q54",
      type: "fillInTheBlank",
      passage:
        "When the babies hatch, they quickly crawl toward the ocean.",
      question: "Fill in the missing word: The babies crawl toward the ______.",
      answer: [
        "ocean",
        "sea"
      ],
      difficulty: "easy",
      explanation: "They crawl toward the ocean/sea."
    },
    {
      id: "q55",
      type: "multipleChoice",
      passage:
        "Sea otters often sleep while floating on their backs. Sometimes they hold hands with another otter so they do not drift apart. They may also wrap themselves in kelp, which works like a soft blanket in the water.",
      question: "Why do some otters hold hands when they sleep?",
      options: [
        "To learn a new dance",
        "To catch fish faster",
        "So they do not drift apart",
        "So they can fly"
      ], answer: 2,
      difficulty: "medium",
      explanation: "The passage says they hold hands so they do not drift apart."
    },
    {
      id: "q56",
      type: "trueFalse",
      passage:
        "Sea otters often sleep while floating on their backs.",
      question: "Sea otters sleep while floating on their backs.",
      options: [
        "False",
        "True"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The first sentence states this clearly."
    },
    {
      id: "q57",
      type: "multipleChoice",
      passage:
        "Sometimes they hold hands with another otter so they do not drift apart.",
      question: "The word 'drift' means…",
      options: [
        "move slowly away",
        "jump up and down",
        "make a loud noise",
        "turn into stone"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Drift means to move slowly away, especially on water."
    },
    {
      id: "q58",
      type: "multipleChoice",
      passage:
        "Sea otters often sleep while floating on their backs. Sometimes they hold hands with another otter so they do not drift apart. They may also wrap themselves in kelp.",
      question: "Which heading is best?",
      options: [
        "How to Build a Boat",
        "Otters Staying Together",
        "A Fast Basketball Game",
        "Cleaning a Bedroom"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The passage explains how otters stay together while sleeping."
    },
    {
      id: "q59",
      type: "fillInTheBlank",
      passage:
        "They may also wrap themselves in kelp.",
      question: "Fill in the missing word: Otters may wrap themselves in ______.",
      answer: [
        "kelp",
        "seaweed"
      ],
      difficulty: "medium",
      explanation: "Kelp is a type of seaweed mentioned in the passage."
    },
    {
      id: "q60",
      type: "multipleChoice",
      passage:
        "Ben and his aunt walked up a mountain trail early in the morning. They carried water, a map, and some snacks. Halfway up, they saw dark clouds and heard thunder. They decided to turn back to stay safe.",
      question: "Why did Ben and his aunt turn back?",
      options: [
        "They forgot the map",
        "They wanted to buy ice cream",
        "They saw dark clouds and heard thunder",
        "They could not find any snacks"
      ], answer: 2,
      difficulty: "medium",
      explanation: "Dark clouds and thunder can mean a storm, so they turned back."
    },
    {
      id: "q61",
      type: "multipleChoice",
      passage:
        "Ben and his aunt walked up a mountain trail early in the morning. They carried water, a map, and some snacks.",
      question: "What did they bring with them?",
      options: [
        "A bicycle and a helmet",
        "Only a phone and a hat",
        "A tent and a stove",
        "Water, a map, and snacks"
      ], answer: 3,
      difficulty: "easy",
      explanation: "The passage lists water, a map, and some snacks."
    },
    {
      id: "q62",
      type: "trueFalse",
      passage:
        "Halfway up, they saw dark clouds and heard thunder. They decided to turn back to stay safe.",
      question: "Ben and his aunt reached the top of the mountain.",
      options: [
        "False",
        "True"
      ], answer: 0,
      difficulty: "easy",
      explanation: "They turned back halfway up, so they did not reach the top."
    },
    {
      id: "q63",
      type: "multipleChoice",
      passage:
        "Ben and his aunt walked up a mountain trail early in the morning.",
      question: "The word 'trail' means…",
      options: [
        "a sandwich",
        "a path",
        "a storm",
        "a pocket"
      ], answer: 1,
      difficulty: "easy",
      explanation: "A trail is a path you walk on."
    },
    {
      id: "q64",
      type: "multipleChoice",
      passage:
        "Ben and his aunt walked up a mountain trail early in the morning. Halfway up, they saw dark clouds and heard thunder. They decided to turn back to stay safe.",
      question: "Which heading fits the passage best?",
      options: [
        "Learning to Swim",
        "A New Video Game",
        "A Safe Mountain Walk",
        "A Trip to the Dentist"
      ], answer: 2,
      difficulty: "easy",
      explanation: "The passage is about hiking and turning back to stay safe."
    },
    {
      id: "q65",
      type: "fillInTheBlank",
      passage:
        "Halfway up, they saw dark clouds and heard thunder.",
      question: "Fill in the missing word: They saw ______ clouds.",
      answer: [
        "dark"
      ],
      difficulty: "easy",
      explanation: "The sentence says they saw dark clouds."
    },
    {
      id: "q66",
      type: "multipleChoice",
      passage:
        "Ben got on the city bus to go to football practice. He usually paid by tapping his bus card, but today he forgot it at home. The driver smiled and said Ben could pay with coins this time. Ben promised to keep his card in his bag tomorrow.",
      question: "Where was Ben going?",
      options: [
        "To a museum",
        "To a birthday party",
        "To the beach",
        "To football practice"
      ], answer: 3,
      difficulty: "easy",
      explanation: "The passage says he was going to football practice."
    },
    {
      id: "q67",
      type: "multipleChoice",
      passage:
        "He usually paid by tapping his bus card, but today he forgot it at home. The driver smiled and said Ben could pay with coins this time.",
      question: "What did the driver allow Ben to do?",
      options: [
        "Pay with coins this time",
        "Ride for free forever",
        "Drive the bus",
        "Take the bus card home"
      ], answer: 0,
      difficulty: "medium",
      explanation: "The driver said Ben could pay with coins this time."
    },
    {
      id: "q68",
      type: "trueFalse",
      passage:
        "The driver smiled and said Ben could pay with coins this time.",
      question: "The driver was kind to Ben.",
      options: [
        "False",
        "True"
      ], answer: 1,
      difficulty: "medium",
      explanation: "Smiling and allowing coins shows kindness."
    },
    {
      id: "q69",
      type: "multipleChoice",
      passage:
        "He usually paid by tapping his bus card.",
      question: "The word 'tapping' means…",
      options: [
        "running far",
        "sleeping deeply",
        "touching quickly",
        "eating loudly"
      ], answer: 2,
      difficulty: "easy",
      explanation: "To tap a card means to touch it quickly to a reader."
    },
    {
      id: "q70",
      type: "multipleChoice",
      passage:
        "Ben got on the city bus to go to football practice. He usually paid by tapping his bus card, but today he forgot it at home.",
      question: "Which heading is best?",
      options: [
        "A Snowy Camp Trip",
        "A Lost Library Book",
        "A Cooking Lesson",
        "Forgetting a Bus Card"
      ], answer: 3,
      difficulty: "easy",
      explanation: "The passage is about forgetting a bus card and paying another way."
    },
    {
      id: "q71",
      type: "fillInTheBlank",
      passage:
        "Ben promised to keep his card in his bag tomorrow.",
      question: "Fill in the missing word: Ben will keep his card in his ______.",
      answer: [
        "bag"
      ],
      difficulty: "easy",
      explanation: "The passage says he will keep his card in his bag."
    },
    {
      id: "q72",
      type: "fillInTheBlank",
      question: "Fill in the missing word: I look for key ______ when I read.",
      answer: [
        "words"
      ],
      difficulty: "medium",
      explanation: "Key words help you find important information."
    },
    {
      id: "q73",
      type: "multipleChoice",
      question: "Which word is a synonym for 'quickly'?",
      options: [
        "fast",
        "slowly",
        "carefully",
        "quietly"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Fast means quickly."
    },
    {
      id: "q74",
      type: "trueFalse",
      question: "A title can help you guess what a passage is about.",
      options: [
        "False",
        "True"
      ], answer: 1,
      difficulty: "easy",
      explanation: "The title often tells the topic of the passage."
    },
    {
      id: "q75",
      type: "multipleChoice",
      passage:
        "Sam fed his dog, took him for a walk, and then cleaned the water bowl.",
      question: "Which sentence is the best summary?",
      options: [
        "Sam fell asleep in class.",
        "Sam bought a new dog.",
        "Sam took care of his dog.",
        "Sam painted a picture."
      ], answer: 2,
      difficulty: "medium",
      explanation: "The passage shows Sam doing several jobs to care for his dog."
    },
    {
      id: "q76",
      type: "multipleChoice",
      passage:
        "Linh packed her bag the night before. In the morning, she left early and arrived on time.",
      question: "Why did Linh arrive on time?",
      options: [
        "She stayed up all night playing games",
        "She missed the bus",
        "She went back home for lunch",
        "She packed her bag and left early"
      ], answer: 3,
      difficulty: "easy",
      explanation: "The passage says she packed her bag and left early, so she arrived on time."
    },
    {
      id: "q77",
      type: "fillInTheBlank",
      passage:
        "Please put the glass on the table, not on the edge.",
      question: "Fill in the missing word: Put the glass on the ______.",
      answer: ["table"],
      difficulty: "easy",
      explanation: "The sentence says: on the table."
    }
  );

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
