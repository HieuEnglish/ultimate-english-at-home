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

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
