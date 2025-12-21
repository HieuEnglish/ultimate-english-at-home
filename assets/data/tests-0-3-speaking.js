/* assets/data/tests-0-3-speaking.js
   Question bank: Ages 0–3 • Speaking (early sounds, single words, simple phrases)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-0-3-speaking"

   Notes:
   - This is caregiver-led. There is no auto-scoring.
   - The runner can play a model phrase using the browser's Speech Synthesis (TTS).
   - Caregiver marks each prompt as Said / Try again / Skip.
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-speaking";

  const QUESTIONS = [
    {
      id: "q1",
      type: "prompt",
      question: "Wave and say: Hi!",
      say: "Hi",
      model: "👋 Hi!",
      difficulty: "easy",
      explanation: "Any attempt is great. Smiles and sounds count."
    },
    {
      id: "q2",
      type: "prompt",
      question: "Say: Bye-bye!",
      say: "Bye-bye",
      model: "👋 Bye-bye!",
      difficulty: "easy",
      explanation: "Model it first. Let your child copy."
    },
    {
      id: "q3",
      type: "prompt",
      question: "Say: Yes.",
      say: "Yes",
      model: "✅ Yes",
      difficulty: "easy",
      explanation: "Accept any clear sound (e.g., 'yeh')."
    },
    {
      id: "q4",
      type: "prompt",
      question: "Say: No.",
      say: "No",
      model: "❌ No",
      difficulty: "easy",
      explanation: "Keep it playful—no pressure."
    },
    {
      id: "q5",
      type: "prompt",
      question: "Make a cat sound.",
      say: "Meow",
      model: "🐱 meow",
      difficulty: "easy",
      explanation: "Animal sounds are excellent early speaking practice."
    },
    {
      id: "q6",
      type: "prompt",
      question: "Make a dog sound.",
      say: "Woof",
      model: "🐶 woof",
      difficulty: "easy",
      explanation: "If needed, do it together: you first, then your child."
    },
    {
      id: "q7",
      type: "prompt",
      question: "Make a cow sound.",
      say: "Moo",
      model: "🐮 moo",
      difficulty: "easy",
      explanation: "Praise effort—even a quiet sound counts."
    },
    {
      id: "q8",
      type: "prompt",
      question: "Say the word: Ball.",
      say: "Ball",
      model: "⚽ ball",
      difficulty: "easy",
      explanation: "Point to a real ball if you have one."
    },
    {
      id: "q9",
      type: "prompt",
      question: "Say the word: Car.",
      say: "Car",
      model: "🚗 car",
      difficulty: "easy",
      explanation: "Let them try, then repeat it clearly once."
    },
    {
      id: "q10",
      type: "prompt",
      question: "Say the word: Apple.",
      say: "Apple",
      model: "🍎 apple",
      difficulty: "easy",
      explanation: "If 'apple' is hard, accept 'ap' or 'a-po'."
    },
    {
      id: "q11",
      type: "prompt",
      question: "Point to your nose and say: Nose.",
      say: "Nose",
      model: "👃 nose",
      difficulty: "medium",
      explanation: "Add actions: touch the body part while saying the word."
    },
    {
      id: "q12",
      type: "prompt",
      question: "Point to your eyes and say: Eyes.",
      say: "Eyes",
      model: "👀 eyes",
      difficulty: "medium",
      explanation: "If plural is hard, accept 'eye'."
    },
    {
      id: "q13",
      type: "prompt",
      question: "Say: Thank you.",
      say: "Thank you",
      model: "🙏 thank you",
      difficulty: "medium",
      explanation: "Try one word at a time: 'thank' then 'you'."
    },
    {
      id: "q14",
      type: "prompt",
      question: "Say: Please.",
      say: "Please",
      model: "✨ please",
      difficulty: "medium",
      explanation: "You can shorten to 'pleez'—clarity improves with time."
    },
    {
      id: "q15",
      type: "prompt",
      question: "Say a 2-word phrase: Big ball.",
      say: "Big ball",
      model: "⚽ big ball",
      difficulty: "hard",
      explanation: "If two words are hard, accept just 'ball' today."
    },
    {
      id: "q16",
      type: "prompt",
      question: "Say a 2-word phrase: My car.",
      say: "My car",
      model: "🚗 my car",
      difficulty: "hard",
      explanation: "Encourage pointing while speaking: 'my' + object."
    },
    {
      id: "q17",
      type: "prompt",
      question: "Answer the question: What's your name?",
      say: "What's your name?",
      model: "🧒 My name is ____",
      difficulty: "hard",
      explanation: "Caregiver: ask the question. Any name attempt is OK."
    },
    {
      id: "q18",
      type: "prompt",
      question: "Say a short sentence: I like milk.",
      say: "I like milk",
      model: "🥛 I like milk",
      difficulty: "hard",
      explanation: "If needed, break it: 'I like' + 'milk'."
    }
  ];

  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
