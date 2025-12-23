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
        "Because Linh forgot hers",
        "Because Maya had no water",
        "Because the teacher told her to",
        "Because Linh was late to class"
      ],
      answer: 0,
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
      options: ["A Trip to the Museum", "Cooking at Home", "A Rainy School Day", "A Football Match"],
      answer: 0,
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
        "He enjoys learning about countries",
        "He wanted to draw maps",
        "He was looking for his family",
        "He needed a place to sit"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The text says he enjoys learning about different countries."
    },
    {
      id: "q5",
      type: "trueFalse",
      passage:
        "On Saturday, Amir visited a small museum with his family. He liked the room with old maps because he enjoys learning about different countries. Before leaving, he bought a postcard of a world map.",
      question: "Amir bought a postcard before he left.",
      options: ["True", "False"],
      answer: 0,
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
      options: ["worried", "hungry", "sleepy", "angry"],
      answer: 0,
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
        "Sora trained three times a week",
        "Sora did not stretch at all",
        "Sora quit the race",
        "Sora forgot to breathe"
      ],
      answer: 0,
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
      options: ["At the library", "At the zoo", "At the beach", "At a restaurant"],
      answer: 0,
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
      options: ["Twenty minutes", "Two minutes", "One hour", "All day"],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage says she read for twenty minutes."
    },
    {
      id: "q13",
      type: "multipleChoice",
      passage:
        "The class planted seeds in small cups. Every day, they added a little water and put the cups near the window. After one week, tiny green leaves appeared.",
      question: "Which heading is best?",
      options: ["Growing a Plant", "Buying New Shoes", "Building a Robot", "A Day at the Cinema"],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage describes planting seeds and seeing leaves."
    },
    {
      id: "q14",
      type: "trueFalse",
      passage:
        "The class planted seeds in small cups. Every day, they added a little water and put the cups near the window. After one week, tiny green leaves appeared.",
      question: "The class watered the seeds every day.",
      options: ["True", "False"],
      answer: 0,
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
        "To save money for a skateboard",
        "To buy a new phone",
        "To skip homework",
        "To become a teacher"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "He wanted to save money for a skateboard."
    },
    {
      id: "q17",
      type: "multipleChoice",
      passage:
        "Niko wanted to save money for a new skateboard. He decided to do small jobs at home, like washing dishes and watering plants. After two weeks, he counted his coins and felt proud.",
      question: "The word 'proud' means…",
      options: ["happy with yourself", "tired", "confused", "bored"],
      answer: 0,
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
      options: ["A flashlight", "A fan", "A computer", "A bicycle"],
      answer: 0,
      difficulty: "easy",
      explanation: "He lit a small flashlight."
    },
    {
      id: "q20",
      type: "trueFalse",
      passage:
        "During a storm, the power went out for ten minutes. Kai lit a small flashlight and sat with his sister in the living room. When the lights came back, they both cheered.",
      question: "The power was out for one hour.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "easy",
      explanation: "It was out for ten minutes, not one hour."
    },
    {
      id: "q21",
      type: "multipleChoice",
      passage:
        "Mina joined the art club. In the first meeting, the teacher asked everyone to draw something that made them feel calm. Mina drew a beach at sunset and used soft colours.",
      question: "What did Mina draw?",
      options: ["A beach at sunset", "A busy city", "A scary monster", "A fast car"],
      answer: 0,
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
        "To draw something that made them feel calm",
        "To copy a picture from the wall",
        "To finish maths homework",
        "To clean the classroom"
      ],
      answer: 0,
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
        "To save energy",
        "Because it is always sick",
        "Because it is afraid of leaves",
        "To learn to fly"
      ],
      answer: 0,
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

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
