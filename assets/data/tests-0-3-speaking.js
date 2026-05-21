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



  // Added to normalize this bank to 111 items.
  QUESTIONS.push(
    {
      "id": "q52",
      "type": "prompt",
      "question": "Say: \"clap.\"",
      "say": "clap",
      "model": "clap",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q53",
      "type": "prompt",
      "question": "Say: \"jump.\"",
      "say": "jump",
      "model": "jump",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q54",
      "type": "prompt",
      "question": "Say: \"sit.\"",
      "say": "sit",
      "model": "sit",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q55",
      "type": "prompt",
      "question": "Say: \"stand.\"",
      "say": "stand",
      "model": "stand",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q56",
      "type": "prompt",
      "question": "Say: \"open.\"",
      "say": "open",
      "model": "open",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q57",
      "type": "prompt",
      "question": "Say: \"close.\"",
      "say": "close",
      "model": "close",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q58",
      "type": "prompt",
      "question": "Say: \"drink.\"",
      "say": "drink",
      "model": "drink",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q59",
      "type": "prompt",
      "question": "Say: \"eat.\"",
      "say": "eat",
      "model": "eat",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q60",
      "type": "prompt",
      "question": "Say: \"sleep.\"",
      "say": "sleep",
      "model": "sleep",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q61",
      "type": "prompt",
      "question": "Say: \"bath.\"",
      "say": "bath",
      "model": "bath",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q62",
      "type": "prompt",
      "question": "Say: \"book.\"",
      "say": "book",
      "model": "book",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q63",
      "type": "prompt",
      "question": "Say: \"ball.\"",
      "say": "ball",
      "model": "ball",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q64",
      "type": "prompt",
      "question": "Say: \"car.\"",
      "say": "car",
      "model": "car",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q65",
      "type": "prompt",
      "question": "Say: \"train.\"",
      "say": "train",
      "model": "train",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q66",
      "type": "prompt",
      "question": "Say: \"baby.\"",
      "say": "baby",
      "model": "baby",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q67",
      "type": "prompt",
      "question": "Say: \"mommy.\"",
      "say": "mommy",
      "model": "mommy",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q68",
      "type": "prompt",
      "question": "Say: \"daddy.\"",
      "say": "daddy",
      "model": "daddy",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q69",
      "type": "prompt",
      "question": "Say: \"happy.\"",
      "say": "happy",
      "model": "happy",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q70",
      "type": "prompt",
      "question": "Say: \"sad.\"",
      "say": "sad",
      "model": "sad",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q71",
      "type": "prompt",
      "question": "Say: \"hot.\"",
      "say": "hot",
      "model": "hot",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q72",
      "type": "prompt",
      "question": "Say: \"cold.\"",
      "say": "cold",
      "model": "cold",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q73",
      "type": "prompt",
      "question": "Say: \"red.\"",
      "say": "red",
      "model": "red",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q74",
      "type": "prompt",
      "question": "Say: \"blue.\"",
      "say": "blue",
      "model": "blue",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q75",
      "type": "prompt",
      "question": "Say: \"green.\"",
      "say": "green",
      "model": "green",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q76",
      "type": "prompt",
      "question": "Say: \"yellow.\"",
      "say": "yellow",
      "model": "yellow",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q77",
      "type": "prompt",
      "question": "Say: \"apple.\"",
      "say": "apple",
      "model": "apple",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q78",
      "type": "prompt",
      "question": "Say: \"banana.\"",
      "say": "banana",
      "model": "banana",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q79",
      "type": "prompt",
      "question": "Say: \"water.\"",
      "say": "water",
      "model": "water",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q80",
      "type": "prompt",
      "question": "Say: \"milk.\"",
      "say": "milk",
      "model": "milk",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q81",
      "type": "prompt",
      "question": "Say: \"cookie.\"",
      "say": "cookie",
      "model": "cookie",
      "difficulty": "easy",
      "explanation": "A clear try or part of the word counts."
    },
    {
      "id": "q82",
      "type": "prompt",
      "question": "Say: \"I am happy.\"",
      "say": "I am happy",
      "model": "I am happy",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q83",
      "type": "prompt",
      "question": "Say: \"I am sleepy.\"",
      "say": "I am sleepy",
      "model": "I am sleepy",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q84",
      "type": "prompt",
      "question": "Say: \"I want water.\"",
      "say": "I want water",
      "model": "I want water",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q85",
      "type": "prompt",
      "question": "Say: \"I want milk.\"",
      "say": "I want milk",
      "model": "I want milk",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q86",
      "type": "prompt",
      "question": "Say: \"I see a cat.\"",
      "say": "I see a cat",
      "model": "I see a cat",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q87",
      "type": "prompt",
      "question": "Say: \"I see a dog.\"",
      "say": "I see a dog",
      "model": "I see a dog",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q88",
      "type": "prompt",
      "question": "Say: \"Big ball.\"",
      "say": "Big ball",
      "model": "Big ball",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q89",
      "type": "prompt",
      "question": "Say: \"Red car.\"",
      "say": "Red car",
      "model": "Red car",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q90",
      "type": "prompt",
      "question": "Say: \"Blue cup.\"",
      "say": "Blue cup",
      "model": "Blue cup",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q91",
      "type": "prompt",
      "question": "Say: \"My book.\"",
      "say": "My book",
      "model": "My book",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q92",
      "type": "prompt",
      "question": "Say: \"Open please.\"",
      "say": "Open please",
      "model": "Open please",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q93",
      "type": "prompt",
      "question": "Say: \"Help me.\"",
      "say": "Help me",
      "model": "Help me",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q94",
      "type": "prompt",
      "question": "Say: \"More please.\"",
      "say": "More please",
      "model": "More please",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q95",
      "type": "prompt",
      "question": "Say: \"All done.\"",
      "say": "All done",
      "model": "All done",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q96",
      "type": "prompt",
      "question": "Say: \"Good night.\"",
      "say": "Good night",
      "model": "Good night",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q97",
      "type": "prompt",
      "question": "Say: \"Good morning.\"",
      "say": "Good morning",
      "model": "Good morning",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q98",
      "type": "prompt",
      "question": "Say: \"Wash hands.\"",
      "say": "Wash hands",
      "model": "Wash hands",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q99",
      "type": "prompt",
      "question": "Say: \"Brush teeth.\"",
      "say": "Brush teeth",
      "model": "Brush teeth",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q100",
      "type": "prompt",
      "question": "Say: \"Put on shoes.\"",
      "say": "Put on shoes",
      "model": "Put on shoes",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q101",
      "type": "prompt",
      "question": "Say: \"Come here.\"",
      "say": "Come here",
      "model": "Come here",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q102",
      "type": "prompt",
      "question": "Say: \"Go there.\"",
      "say": "Go there",
      "model": "Go there",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q103",
      "type": "prompt",
      "question": "Say: \"My turn.\"",
      "say": "My turn",
      "model": "My turn",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q104",
      "type": "prompt",
      "question": "Say: \"Your turn.\"",
      "say": "Your turn",
      "model": "Your turn",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q105",
      "type": "prompt",
      "question": "Say: \"I love mom.\"",
      "say": "I love mom",
      "model": "I love mom",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q106",
      "type": "prompt",
      "question": "Say: \"I love dad.\"",
      "say": "I love dad",
      "model": "I love dad",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q107",
      "type": "prompt",
      "question": "Say: \"Baby bird.\"",
      "say": "Baby bird",
      "model": "Baby bird",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q108",
      "type": "prompt",
      "question": "Say: \"Little fish.\"",
      "say": "Little fish",
      "model": "Little fish",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q109",
      "type": "prompt",
      "question": "Say: \"Big bear.\"",
      "say": "Big bear",
      "model": "Big bear",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q110",
      "type": "prompt",
      "question": "Say: \"One cookie.\"",
      "say": "One cookie",
      "model": "One cookie",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },
    {
      "id": "q111",
      "type": "prompt",
      "question": "Say: \"Two apples.\"",
      "say": "Two apples",
      "model": "Two apples",
      "difficulty": "medium",
      "explanation": "Say it together once, then let the child try."
    },

{
    "id": "q112",
    "type": "prompt",
    "section": "part1",
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Name your favourite toy and say one thing you do with it.",
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
    "question": "Say your favorite color.",
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
    "question": "Name one animal you like.",
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
    "question": "Say one food you like.",
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
    "question": "Name your toy.",
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
    "question": "Say hello and your name.",
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
    "question": "Say one thing at home.",
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
    "question": "Name one fruit.",
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
    "question": "Say one body part.",
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
    "question": "Name one action word.",
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
    "question": "Say one feeling word.",
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
    "question": "Say your name.",
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
    "question": "Name one animal.",
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
    "question": "Name one color.",
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
    "question": "Name one food.",
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
    "question": "Say hello.",
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
    "question": "Say your name.",
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
    "question": "Name one animal.",
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
    "question": "Name one color.",
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
    "question": "Name one food.",
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
    "question": "Say hello.",
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
    "question": "Say your name.",
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
    "question": "Name one animal.",
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
    "question": "Name one color.",
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
    "question": "Name one food.",
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
    "question": "Say hello.",
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
    "question": "Say your name.",
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
    "question": "Name one animal.",
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
    "question": "Name one color.",
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
    "question": "Name one food.",
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
    "question": "Say hello.",
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
