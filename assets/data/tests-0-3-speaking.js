/* assets/data/tests-0-3-speaking.js
   Question bank: Ages 0–3 • Speaking (early speech / imitation)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-0-3-speaking"

   Notes:
   - Caregiver-led. Child copies sounds/words/short phrases.
   - No auto-scoring: caregiver marks each prompt as Said / Try again / Skip.
   - Keep it playful. Any attempt (sound, partial word) counts.
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-speaking";

  const QUESTIONS = [
    {
      id: "q1",
      type: "prompt",
      question: "Wave and say hello. 👋",
      say: "Hello",
      model: "👋 Hello",
      difficulty: "easy",
      explanation: "Any hello sound or wave is OK."
    },
    {
      id: "q2",
      type: "prompt",
      question: "Say bye-bye. 👋",
      say: "Bye-bye",
      model: "👋 Bye-bye",
      difficulty: "easy",
      explanation: "If needed, do it together: “bye… bye…”"
    },
    {
      id: "q3",
      type: "prompt",
      question: "Say your name (or try). 🙂",
      say: "My name is",
      model: "My name is ___",
      difficulty: "medium",
      explanation: "If the name is hard, say the first sound only."
    },
    {
      id: "q4",
      type: "prompt",
      question: "Say: “Yes.” ✅",
      say: "Yes",
      model: "✅ Yes",
      difficulty: "easy",
      explanation: "A nod + sound counts."
    },
    {
      id: "q5",
      type: "prompt",
      question: "Say: “No.” ❌",
      say: "No",
      model: "❌ No",
      difficulty: "easy",
      explanation: "A head shake + sound counts."
    },
    {
      id: "q6",
      type: "prompt",
      question: "Say: “Please.” 🙏",
      say: "Please",
      model: "🙏 Please",
      difficulty: "medium",
      explanation: "If it’s hard, try “plee…” or “peas” (approx. is fine)."
    },
    {
      id: "q7",
      type: "prompt",
      question: "Say: “Thank you.” 💛",
      say: "Thank you",
      model: "💛 Thank you",
      difficulty: "medium",
      explanation: "Even “thank” is a great try."
    },
    {
      id: "q8",
      type: "prompt",
      question: "Say: “More.” ➕",
      say: "More",
      model: "➕ More",
      difficulty: "easy",
      explanation: "Great for snack time: ‘more’ + pointing."
    },
    {
      id: "q9",
      type: "prompt",
      question: "Say: “All done.” ✅",
      say: "All done",
      model: "✅ All done",
      difficulty: "medium",
      explanation: "If needed, try “done” only."
    },
    {
      id: "q10",
      type: "prompt",
      question: "Say: “Help.” 🆘",
      say: "Help",
      model: "🆘 Help",
      difficulty: "easy",
      explanation: "Any help sound counts. Model and repeat once."
    },

    {
      id: "q11",
      type: "prompt",
      question: "Make a dog sound. 🐶",
      say: "Woof woof",
      model: "🐶 woof woof",
      difficulty: "easy",
      explanation: "Silly sounds help speech come out."
    },
    {
      id: "q12",
      type: "prompt",
      question: "Make a cat sound. 🐱",
      say: "Meow",
      model: "🐱 meow",
      difficulty: "easy",
      explanation: "Any “m” sound is a win."
    },
    {
      id: "q13",
      type: "prompt",
      question: "Make a cow sound. 🐮",
      say: "Moo",
      model: "🐮 moo",
      difficulty: "easy",
      explanation: "Stretch the sound: “mooooo”."
    },
    {
      id: "q14",
      type: "prompt",
      question: "Make a sheep sound. 🐑",
      say: "Baa",
      model: "🐑 baa",
      difficulty: "easy",
      explanation: "Short and fun. Repeat together."
    },
    {
      id: "q15",
      type: "prompt",
      question: "Make a duck sound. 🦆",
      say: "Quack",
      model: "🦆 quack",
      difficulty: "medium",
      explanation: "If hard, try “kwa” or “quah”."
    },

    {
      id: "q16",
      type: "prompt",
      question: "Say: “Mum / Mom.” 👩",
      say: "Mom",
      model: "👩 mom",
      difficulty: "easy",
      explanation: "Any version is OK: mum/mom/ma."
    },
    {
      id: "q17",
      type: "prompt",
      question: "Say: “Dad.” 👨",
      say: "Dad",
      model: "👨 dad",
      difficulty: "easy",
      explanation: "Even “da” is a good try."
    },
    {
      id: "q18",
      type: "prompt",
      question: "Say: “Baby.” 👶",
      say: "Baby",
      model: "👶 baby",
      difficulty: "easy",
      explanation: "Try “bay” or “ba”."
    },
    {
      id: "q19",
      type: "prompt",
      question: "Say: “Hi, Mum!” 👋",
      say: "Hi mom",
      model: "👋 Hi, Mum!",
      difficulty: "medium",
      explanation: "Two words is great. One word is fine too."
    },
    {
      id: "q20",
      type: "prompt",
      question: "Say: “I love you.” ❤️",
      say: "I love you",
      model: "❤️ I love you",
      difficulty: "hard",
      explanation: "If too hard, try “love you” or “luv oo”."
    },

    {
      id: "q21",
      type: "prompt",
      question: "Point to your nose and say: “nose.” 👃",
      say: "Nose",
      model: "👃 nose",
      difficulty: "easy",
      explanation: "Pointing + sound counts."
    },
    {
      id: "q22",
      type: "prompt",
      question: "Point to your eyes and say: “eyes.” 👀",
      say: "Eyes",
      model: "👀 eyes",
      difficulty: "easy",
      explanation: "You can say “eye” too."
    },
    {
      id: "q23",
      type: "prompt",
      question: "Point to your mouth and say: “mouth.” 👄",
      say: "Mouth",
      model: "👄 mouth",
      difficulty: "medium",
      explanation: "Try “mou” or “ma” if needed."
    },
    {
      id: "q24",
      type: "prompt",
      question: "Point to your head and say: “head.” 🙂",
      say: "Head",
      model: "🙂 head",
      difficulty: "easy",
      explanation: "Tap head and say it together."
    },
    {
      id: "q25",
      type: "prompt",
      question: "Point to your tummy and say: “tummy.” 🤰",
      say: "Tummy",
      model: "🤰 tummy",
      difficulty: "medium",
      explanation: "Any word is OK: tummy/belly."
    },

    {
      id: "q26",
      type: "prompt",
      question: "Say a colour: “red.” 🟥",
      say: "Red",
      model: "🟥 red",
      difficulty: "easy",
      explanation: "Show something red if you can."
    },
    {
      id: "q27",
      type: "prompt",
      question: "Say a colour: “blue.” 🟦",
      say: "Blue",
      model: "🟦 blue",
      difficulty: "easy",
      explanation: "Any attempt is fine."
    },
    {
      id: "q28",
      type: "prompt",
      question: "Say a colour: “green.” 🟩",
      say: "Green",
      model: "🟩 green",
      difficulty: "medium",
      explanation: "If hard, try “g” sound + smile."
    },
    {
      id: "q29",
      type: "prompt",
      question: "Say a colour: “yellow.” 🟨",
      say: "Yellow",
      model: "🟨 yellow",
      difficulty: "hard",
      explanation: "Try “yel” or “yeh-yo”."
    },
    {
      id: "q30",
      type: "prompt",
      question: "Choose one and say it: “big” or “small.” 📏",
      say: "Big",
      model: "big / small",
      difficulty: "medium",
      explanation: "You can show hands wide (big) or close (small)."
    },

    {
      id: "q31",
      type: "prompt",
      question: "Count: “One.” 1️⃣",
      say: "One",
      model: "1 (one)",
      difficulty: "easy",
      explanation: "Say just the word or the number."
    },
    {
      id: "q32",
      type: "prompt",
      question: "Count: “Two.” 2️⃣",
      say: "Two",
      model: "2 (two)",
      difficulty: "easy",
      explanation: "Hold up 2 fingers if you like."
    },
    {
      id: "q33",
      type: "prompt",
      question: "Count: “Three.” 3️⃣",
      say: "Three",
      model: "3 (three)",
      difficulty: "medium",
      explanation: "If hard, try “free” (approx. is OK)."
    },
    {
      id: "q34",
      type: "prompt",
      question: "Say: “Up.” ⬆️",
      say: "Up",
      model: "⬆️ up",
      difficulty: "easy",
      explanation: "Lift hands up while saying it."
    },
    {
      id: "q35",
      type: "prompt",
      question: "Say: “Down.” ⬇️",
      say: "Down",
      model: "⬇️ down",
      difficulty: "easy",
      explanation: "Move hands down while saying it."
    },

    {
      id: "q36",
      type: "prompt",
      question: "Say: “Open.” 📖",
      say: "Open",
      model: "📖 open",
      difficulty: "medium",
      explanation: "Pretend open a book or a box."
    },
    {
      id: "q37",
      type: "prompt",
      question: "Say: “Close.” 📕",
      say: "Close",
      model: "📕 close",
      difficulty: "medium",
      explanation: "Close hands together as you say it."
    },
    {
      id: "q38",
      type: "prompt",
      question: "Say: “Go!” 🟢",
      say: "Go",
      model: "🟢 go!",
      difficulty: "easy",
      explanation: "Great for cars/balls: “Ready… set… go!”"
    },
    {
      id: "q39",
      type: "prompt",
      question: "Say: “Stop!” 🛑",
      say: "Stop",
      model: "🛑 stop!",
      difficulty: "easy",
      explanation: "Use a fun freeze game."
    },
    {
      id: "q40",
      type: "prompt",
      question: "Say: “I want ____.” (choose one word) 🍎",
      say: "I want apple",
      model: "I want ____",
      difficulty: "hard",
      explanation: "If too hard, say just the item: “apple”."
    },

    {
      id: "q41",
      type: "prompt",
      question: "Say: “Water.” 💧",
      say: "Water",
      model: "💧 water",
      difficulty: "medium",
      explanation: "Use at drink time. Any attempt counts."
    },
    {
      id: "q42",
      type: "prompt",
      question: "Say: “Milk.” 🥛",
      say: "Milk",
      model: "🥛 milk",
      difficulty: "easy",
      explanation: "Try “mi” or “m”."
    },
    {
      id: "q43",
      type: "prompt",
      question: "Say: “Apple.” 🍎",
      say: "Apple",
      model: "🍎 apple",
      difficulty: "medium",
      explanation: "If hard, try “ap” or “a”."
    },
    {
      id: "q44",
      type: "prompt",
      question: "Say: “Banana.” 🍌",
      say: "Banana",
      model: "🍌 banana",
      difficulty: "hard",
      explanation: "Try “na-na” (two syllables) if needed."
    },
    {
      id: "q45",
      type: "prompt",
      question: "Say: “Yummy!” 😋",
      say: "Yummy",
      model: "😋 yummy!",
      difficulty: "easy",
      explanation: "Silly faces help confidence."
    },

    {
      id: "q46",
      type: "prompt",
      question: "Make a car sound. 🚗",
      say: "Vroom vroom",
      model: "🚗 vroom vroom",
      difficulty: "easy",
      explanation: "Any engine sound is great."
    },
    {
      id: "q47",
      type: "prompt",
      question: "Make a train sound. 🚂",
      say: "Choo choo",
      model: "🚂 choo choo",
      difficulty: "easy",
      explanation: "Repeat together: “choo… choo…”"
    },
    {
      id: "q48",
      type: "prompt",
      question: "Say: “Ball.” ⚽",
      say: "Ball",
      model: "⚽ ball",
      difficulty: "easy",
      explanation: "Roll a ball and say it once."
    },
    {
      id: "q49",
      type: "prompt",
      question: "Say: “Book.” 📚",
      say: "Book",
      model: "📚 book",
      difficulty: "easy",
      explanation: "Point to a book and label it."
    },
    {
      id: "q50",
      type: "prompt",
      question: "Say: “Good night.” 🌙",
      say: "Good night",
      model: "🌙 good night",
      difficulty: "hard",
      explanation: "If too hard, try “night-night”."
    },
    {
      id: "q51",
      type: "prompt",
      question: "Say: “I want water.” 💧",
      say: "I want water",
      model: "I want water",
      difficulty: "hard",
      explanation: "A shorter try like “want water” is OK."
    }
  ];

  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
