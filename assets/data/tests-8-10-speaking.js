/* assets/data/tests-8-10-speaking.js
   Question bank: Ages 8–10 • Speaking

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-8-10-speaking"

   Notes:
   - Teacher/caregiver reads the prompt. The learner answers out loud.
   - The runner marks each prompt as Said / Try again / Skip (no IELTS banding).
   - The runner will build a structured test by picking prompts from sections.
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-speaking";

  // Shared rubric (simple, classroom-friendly)
  const RUBRIC = {
    criteria: {
      task: {
        good: "Answers the prompt and adds at least one extra detail.",
        developing: "Answers but with few details.",
        needsWork: "Does not answer or needs a lot of support."
      },
      fluency: {
        good: "Speaks in phrases/sentences with only short pauses.",
        developing: "Stops often but can continue with support.",
        needsWork: "Very hesitant; mostly single words."
      },
      language: {
        good: "Uses mostly correct grammar and a few varied words.",
        developing: "Some mistakes; vocabulary is basic but understandable.",
        needsWork: "Many mistakes that block understanding."
      },
      pronunciation: {
        good: "Easy to understand most of the time.",
        developing: "Sometimes unclear; repeats help.",
        needsWork: "Hard to understand."
      }
    },
    // Optional targets a teacher can quickly check (not auto-scored).
    checks: {
      minSentences: 2,
      encourageBecause: true
    }
  };

  const QUESTIONS = [
    // -------------------------
    // WARM-UP
    // -------------------------
    {
      id: "w1",
      type: "prompt",
      section: "warmup",
      question: "Say hello. Tell me your name and your grade. 👋",
      say: "Hello. My name is Alex. I am in grade four.",
      model: "Hello. My name is ____. I am in grade ____.",
      difficulty: "easy",
      explanation: "Encourage 2 sentences. If needed, point to a number for the grade.",
      targets: ["2 sentences", "Speak clearly", "Look at the listener"],
      rubric: RUBRIC
    },
    {
      id: "w2",
      type: "prompt",
      section: "warmup",
      question: "Where do you live? (city/town) 🏙️",
      say: "I live in Ho Chi Minh City.",
      model: "I live in ____.",
      difficulty: "easy",
      explanation: "Any place name is OK. Accept ‘near…’ answers.",
      targets: ["Full sentence", "Place word"],
      rubric: RUBRIC
    },
    {
      id: "w3",
      type: "prompt",
      section: "warmup",
      question: "What is your favourite school subject? Why? 📚",
      say: "My favourite subject is science because I like experiments.",
      model: "My favourite subject is ____ because ____.",
      difficulty: "medium",
      explanation: "Prompt with ‘because’. Offer choices: English, Maths, Science, Art, PE.",
      targets: ["Use ‘because’", "Give 1 reason"],
      rubric: RUBRIC
    },
    {
      id: "w4",
      type: "prompt",
      section: "warmup",
      question: "Tell me about your best friend (2–3 sentences). 🧑‍🤝‍🧑",
      say: "My best friend is Lan. She is kind and funny. We play games together.",
      model: "My best friend is ____. He/She is ____. We ____ together.",
      difficulty: "medium",
      explanation: "Encourage describing words: kind, funny, smart, friendly.",
      targets: ["2–3 sentences", "1 describing word"],
      rubric: RUBRIC
    },
    {
      id: "w5",
      type: "prompt",
      section: "warmup",
      question: "What do you do after school? (Tell me 2 things.) 🕓",
      say: "After school, I do my homework and then I play football.",
      model: "After school, I ____ and then I ____.",
      difficulty: "medium",
      explanation: "Aim for 2 actions. Accept simple verbs.",
      targets: ["2 actions", "Use ‘and/then’"],
      rubric: RUBRIC
    },
    {
      id: "w6",
      type: "prompt",
      section: "warmup",
      question: "What is in your school bag? Name 3 things. 🎒",
      say: "In my bag, I have a pencil case, a notebook, and a water bottle.",
      model: "I have ____, ____, and ____.",
      difficulty: "easy",
      explanation: "Let the learner point to items if needed.",
      targets: ["3 items", "Use ‘and’"],
      rubric: RUBRIC
    },
    {
      id: "w7",
      type: "prompt",
      section: "warmup",
      question: "Do you prefer morning or evening? Why? 🌅🌙",
      say: "I prefer the morning because I feel fresh and ready.",
      model: "I prefer ____ because ____.",
      difficulty: "medium",
      explanation: "Help with ideas: fresh, quiet, more time, less homework.",
      targets: ["Use ‘because’", "Give 1 reason"],
      rubric: RUBRIC
    },

    // -------------------------
    // DESCRIBE
    // -------------------------
    {
      id: "d1",
      type: "prompt",
      section: "describe",
      question: "Imagine a park. Describe what you can see. 🌳",
      say: "I can see trees and a lake. Some children are playing. There is a dog near a bench.",
      model: "I can see ____. There is/are ____. Someone is ____.",
      difficulty: "medium",
      explanation: "Encourage ‘There is/There are’ + 1 present continuous sentence.",
      targets: ["Say 3 things", "Use ‘There is/are’", "Use ‘is/are + -ing’"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: false }
      }
    },
    {
      id: "d2",
      type: "prompt",
      section: "describe",
      question: "Describe your bedroom (or your favourite room). 🛏️",
      say: "My room is small but tidy. I have a bed and a desk. I keep my books on a shelf.",
      model: "My room is ____. I have ____. I keep ____.",
      difficulty: "medium",
      explanation: "Prompt for size + 2 objects + where they are.",
      targets: ["2–3 sentences", "Use describing word"],
      rubric: RUBRIC
    },
    {
      id: "d3",
      type: "prompt",
      section: "describe",
      question: "Choose an animal. Describe it (looks + what it can do). 🐯",
      say: "I choose a tiger. It is big and orange with black stripes. It can run fast.",
      model: "I choose a ____. It is ____. It can ____.",
      difficulty: "medium",
      explanation: "Encourage 1 colour/size word + 1 ability: can run, can climb, can fly.",
      targets: ["1 describing word", "Use ‘can’"],
      rubric: RUBRIC
    },
    {
      id: "d4",
      type: "prompt",
      section: "describe",
      question: "Describe your favourite food. 🍜",
      say: "My favourite food is pho. It is hot and tasty. I like it because the soup is delicious.",
      model: "My favourite food is ____. It is ____. I like it because ____.",
      difficulty: "medium",
      explanation: "Encourage 2 describing words: hot, sweet, spicy, crunchy, tasty.",
      targets: ["Use ‘because’", "2 describing words"],
      rubric: RUBRIC
    },
    {
      id: "d5",
      type: "prompt",
      section: "describe",
      question: "Describe a person you admire (family member, teacher, athlete). ⭐",
      say: "I admire my mom. She works hard and helps me every day. I admire her because she is kind.",
      model: "I admire ____. He/She ____. I admire him/her because ____.",
      difficulty: "hard",
      explanation: "Support with verbs: helps, teaches, works, trains, listens.",
      targets: ["2–3 sentences", "Use ‘because’"],
      rubric: RUBRIC
    },
    {
      id: "d6",
      type: "prompt",
      section: "describe",
      question: "Describe your school (2–4 sentences). 🏫",
      say: "My school is big and busy. There are many classrooms and a playground. I like my school because my teachers are friendly.",
      model: "My school is ____. There is/are ____. I like it because ____.",
      difficulty: "medium",
      explanation: "Encourage ‘There are…’ for rooms/places.",
      targets: ["Use ‘There is/are’", "Use ‘because’"],
      rubric: RUBRIC
    },
    {
      id: "d7",
      type: "prompt",
      section: "describe",
      question: "Describe your favourite game or sport and how to play it. ⚽",
      say: "My favourite sport is football. You kick the ball and try to score a goal. You need teamwork.",
      model: "My favourite game is ____. You ____ and ____.",
      difficulty: "hard",
      explanation: "Encourage simple steps: first/then.",
      targets: ["Explain 2 steps", "Use ‘first/then’"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: false }
      }
    },

    // -------------------------
    // STORY
    // -------------------------
    {
      id: "s1",
      type: "prompt",
      section: "story",
      question: "Tell me about your last weekend (3 sentences). 🗓️",
      say: "Last weekend, I visited my grandma. We ate lunch together. I played with my cousin.",
      model: "Last weekend, I ____. Then I ____. After that, I ____.",
      difficulty: "medium",
      explanation: "Encourage past time words: last weekend, yesterday, on Saturday.",
      targets: ["3 sentences", "Past time words"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: false }
      }
    },
    {
      id: "s2",
      type: "prompt",
      section: "story",
      question: "Continue the story: ‘On my way to school, I found…’ 🎒",
      say: "On my way to school, I found a small wallet on the road. I picked it up and looked for the owner. I gave it to a teacher.",
      model: "I found ____. I ____. In the end, I ____.",
      difficulty: "hard",
      explanation: "Support with verbs: found, picked up, saw, helped, returned.",
      targets: ["Beginning–middle–end", "Use past verbs"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: false }
      }
    },
    {
      id: "s3",
      type: "prompt",
      section: "story",
      question: "Tell a story using these words: rain • umbrella • friend. ☔",
      say: "One day it started to rain. I forgot my umbrella, but my friend shared hers with me. We walked home together.",
      model: "It started to ____. I ____. My friend ____.",
      difficulty: "hard",
      explanation: "Make sure they use all 3 words. Any story is OK.",
      targets: ["Use all 3 words", "3 sentences"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: false }
      }
    },
    {
      id: "s4",
      type: "prompt",
      section: "story",
      question: "Tell me about a time you helped someone. 🤝",
      say: "I helped my classmate with homework. I explained the answers and we finished together. She thanked me.",
      model: "I helped ____. I ____. He/She felt ____.",
      difficulty: "medium",
      explanation: "Encourage feeling words: happy, thankful, proud.",
      targets: ["3 sentences", "1 feeling word"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: false }
      }
    },
    {
      id: "s5",
      type: "prompt",
      section: "story",
      question: "Tell a story about a surprise (real or imagined). 🎁",
      say: "On my birthday, my family surprised me with a cake. I was very excited. We took photos and laughed.",
      model: "One day, I got a surprise. It was ____. I felt ____.",
      difficulty: "hard",
      explanation: "Support with feelings: excited, shocked, happy.",
      targets: ["3 sentences", "Use past verbs"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: false }
      }
    },

    // -------------------------
    // OPINION / DISCUSSION
    // -------------------------
    {
      id: "o1",
      type: "prompt",
      section: "opinion",
      question: "Which is better: reading books or watching movies? Why? 📖🎬",
      say: "I think reading books is better because I can imagine the story. Also, books help my vocabulary.",
      model: "I think ____ is better because ____. Also, ____.",
      difficulty: "hard",
      explanation: "Aim for 2 reasons. Accept either side.",
      targets: ["Give 2 reasons", "Use ‘because’"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: true }
      }
    },
    {
      id: "o2",
      type: "prompt",
      section: "opinion",
      question: "Should students have homework every day? Why or why not? 📝",
      say: "I think students should have a little homework because it helps us practise. But too much homework is tiring.",
      model: "I think ____. Because ____. However, ____.",
      difficulty: "hard",
      explanation: "Encourage balance: ‘a little’ vs ‘too much’.",
      targets: ["Give 1 reason", "Add 1 extra idea"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 3, encourageBecause: true }
      }
    },
    {
      id: "o3",
      type: "prompt",
      section: "opinion",
      question: "What are 2 good classroom rules? Explain why. 🧑‍🏫",
      say: "Two good rules are: listen when someone is speaking and keep the classroom clean. These rules help everyone learn.",
      model: "Two good rules are ____ and ____. These rules help because ____.",
      difficulty: "hard",
      explanation: "Support with ideas: be polite, raise your hand, don’t shout.",
      targets: ["Name 2 rules", "Say why"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 2, encourageBecause: true }
      }
    },
    {
      id: "o4",
      type: "prompt",
      section: "opinion",
      question: "Would you rather have a pet or no pet? Why? 🐶",
      say: "I would rather have a pet because it is fun and I can learn responsibility. I would choose a small dog.",
      model: "I would rather ____ because ____. I would choose ____.",
      difficulty: "medium",
      explanation: "Encourage 1 reason + 1 example pet.",
      targets: ["Use ‘because’", "Give 1 example"],
      rubric: RUBRIC
    },
    {
      id: "o5",
      type: "prompt",
      section: "opinion",
      question: "If you could change one thing at your school, what would it be? Why? 🔧",
      say: "I would add more sports time because it helps us stay healthy and happy.",
      model: "I would change ____. Because ____.",
      difficulty: "hard",
      explanation: "Prompt for a simple change: more clubs, better food, bigger library.",
      targets: ["Use ‘would’", "Use ‘because’"],
      rubric: RUBRIC
    },
    {
      id: "o6",
      type: "prompt",
      section: "opinion",
      question: "What is the best way to stay healthy? Give 2 ideas. 🥗",
      say: "I think the best way is to eat healthy food and exercise regularly. Also, we should sleep early.",
      model: "The best way is to ____ and ____. Also, ____.",
      difficulty: "medium",
      explanation: "Encourage 2 ideas: food, exercise, sleep, water.",
      targets: ["Give 2 ideas", "Use ‘and/also’"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 2, encourageBecause: false }
      }
    },
    {
      id: "o7",
      type: "prompt",
      section: "opinion",
      question: "Team sports or individual sports: which do you prefer? Why? 🏀",
      say: "I prefer team sports because I like working with friends. We can help each other.",
      model: "I prefer ____ because ____.",
      difficulty: "medium",
      explanation: "Support with reasons: teamwork, fun, improving skills.",
      targets: ["Use ‘because’", "Give 1 reason"],
      rubric: RUBRIC
    },
    {
      id: "o8",
      type: "prompt",
      section: "opinion",
      question: "What can children do to help the environment? Give 2 actions. 🌍",
      say: "Children can recycle and use less plastic. We can also turn off lights to save energy.",
      model: "Children can ____ and ____. We can also ____.",
      difficulty: "hard",
      explanation: "Offer verbs: recycle, reuse, save water, plant trees.",
      targets: ["Give 2 actions", "Use ‘can’"],
      rubric: {
        ...RUBRIC,
        checks: { minSentences: 2, encourageBecause: false }
      }
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
