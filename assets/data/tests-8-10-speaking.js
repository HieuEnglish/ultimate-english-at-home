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

  // Added prompts (append-only)
  QUESTIONS.push(
    {
      id: "w8",
      type: "prompt",
      section: "warmup",
      question: "What is your favourite season? Why? 🌸☀️🍂❄️",
      say: "My favourite season is winter because I like cool weather and warm drinks.",
      model: "My favourite season is ____ because ____.",
      difficulty: "medium",
      explanation: "Encourage a reason with ‘because’. Offer seasons if needed.",
      targets: ["Use ‘because’", "Give 1 reason", "Full sentence"],
      rubric: RUBRIC
    },
    {
      id: "w9",
      type: "prompt",
      section: "warmup",
      question: "Tell me your morning routine (2–3 sentences). ⏰",
      say: "In the morning, I wake up at six thirty. I brush my teeth and eat breakfast.",
      model: "In the morning, I ____. Then I ____.",
      difficulty: "medium",
      explanation: "Aim for 2–3 actions. Accept simple verbs.",
      targets: ["2–3 sentences", "Use ‘then’", "Daily verbs"],
      rubric: RUBRIC
    },
    {
      id: "w10",
      type: "prompt",
      section: "warmup",
      question: "What book do you like? Tell me one thing about it. 📖",
      say: "I like Harry Potter. It is about a boy who learns magic at school.",
      model: "I like ____. It is about ____.",
      difficulty: "medium",
      explanation: "Any book/story is OK. The second sentence can be very simple.",
      targets: ["2 sentences", "Topic + detail"],
      rubric: RUBRIC
    },
    {
      id: "w11",
      type: "prompt",
      section: "warmup",
      question: "What chores do you do at home? Tell me two. 🧹",
      say: "I wash the dishes and tidy my room.",
      model: "At home, I ____ and ____.",
      difficulty: "easy",
      explanation: "Two simple chores are enough. Prompt with pictures/gestures if needed.",
      targets: ["Name 2 chores", "Use ‘and’"],
      rubric: RUBRIC
    },
    {
      id: "w12",
      type: "prompt",
      section: "warmup",
      question: "What do you want to be in the future? Why? 🚀",
      say: "I want to be a doctor because I want to help people.",
      model: "I want to be a ____ because ____.",
      difficulty: "medium",
      explanation: "Offer jobs: teacher, doctor, artist, athlete, engineer.",
      targets: ["Use ‘because’", "Give 1 reason", "Use ‘want to be’"],
      rubric: RUBRIC
    },
    {
      id: "w13",
      type: "prompt",
      section: "warmup",
      question: "What makes you feel excited? (2 sentences) 🎉",
      say: "I feel excited when I play games with my friends. It is fun and makes me smile.",
      model: "I feel excited when ____. It makes me ____.",
      difficulty: "medium",
      explanation: "Encourage a time clause ‘when…’.",
      targets: ["2 sentences", "Feeling word", "Clear example"],
      rubric: RUBRIC
    },
    {
      id: "w14",
      type: "prompt",
      section: "warmup",
      question: "What are you good at? Give one example. 💪",
      say: "I am good at drawing. I can draw animals and cartoons.",
      model: "I am good at ____. For example, I ____.",
      difficulty: "medium",
      explanation: "Support with skills: drawing, running, singing, maths, helping others.",
      targets: ["Use ‘good at’", "Give 1 example"],
      rubric: RUBRIC
    },
    {
      id: "w15",
      type: "prompt",
      section: "warmup",
      question: "Where would you like to travel? What would you do there? ✈️",
      say: "I would like to travel to Da Nang. I would swim in the sea and eat seafood.",
      model: "I would like to travel to ____. I would ____.",
      difficulty: "hard",
      explanation: "Encourage ‘would like to’ + 1 activity.",
      targets: ["Use ‘would’", "2 sentences", "Activity detail"],
      rubric: RUBRIC
    },
    {
      id: "w16",
      type: "prompt",
      section: "warmup",
      question: "If you could join one club at school, which club would you choose? Why? 🎭",
      say: "I would choose the art club because I like painting and making posters.",
      model: "I would choose ____ because ____.",
      difficulty: "hard",
      explanation: "Offer clubs: art, music, football, science, chess.",
      targets: ["Use ‘because’", "Make a choice"],
      rubric: RUBRIC
    },
    {
      id: "w17",
      type: "prompt",
      section: "warmup",
      question: "What do you do when you don’t understand a lesson? 🤔",
      say: "When I don’t understand, I raise my hand and ask the teacher. Then I practise at home.",
      model: "When I don’t understand, I ____. Then I ____.",
      difficulty: "hard",
      explanation: "Encourage a helpful strategy and one extra step.",
      targets: ["Use ‘when’", "Give 2 actions", "Problem-solving"],
      rubric: RUBRIC
    },
    {
      id: "d8",
      type: "prompt",
      section: "describe",
      question: "Describe your favourite drink (taste + when you drink it). 🥤",
      say: "My favourite drink is orange juice. It is sweet and fresh. I drink it after school.",
      model: "My favourite drink is ____. It tastes ____. I drink it ____.",
      difficulty: "medium",
      explanation: "Prompt for taste words: sweet, sour, cold, refreshing.",
      targets: ["3 sentences", "Taste word", "Time phrase"],
      rubric: RUBRIC
    },
    {
      id: "d9",
      type: "prompt",
      section: "describe",
      question: "Describe a festival or special day you enjoy. 🎆",
      say: "I enjoy Tet. My family cleans the house and we eat special food. I feel happy because we are together.",
      model: "I enjoy ____. We ____. I feel ____ because ____.",
      difficulty: "hard",
      explanation: "Encourage 2 activities + a feeling + a reason.",
      targets: ["Use ‘because’", "Say 3–4 sentences", "Festival activities"],
      rubric: RUBRIC
    },
    {
      id: "d10",
      type: "prompt",
      section: "describe",
      question: "Describe how you get to school (2–3 steps). 🚶‍♂️🚌",
      say: "I walk to the bus stop. Then I take the bus to school. I get off near the gate.",
      model: "I ____. Then I ____. I ____.",
      difficulty: "medium",
      explanation: "Encourage sequencing: first/then/after that.",
      targets: ["2–3 steps", "Use sequencing words"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "d11",
      type: "prompt",
      section: "describe",
      question: "Imagine a beach. Describe it (3–4 sentences). 🏖️",
      say: "The beach is sunny and bright. I can hear the waves. People are swimming and playing volleyball.",
      model: "The beach is ____. I can hear ____. People are ____.",
      difficulty: "medium",
      explanation: "Encourage 1 sound and 1 present continuous action.",
      targets: ["Say 3 things", "Use ‘is/are + -ing’", "Describing words"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "d12",
      type: "prompt",
      section: "describe",
      question: "Describe a robot you would like to have. What can it do? 🤖",
      say: "I want a small robot helper. It can clean my room and carry my books. It would save time.",
      model: "I want a ____ robot. It can ____ and ____.",
      difficulty: "hard",
      explanation: "Encourage can + 2 actions. Optional: would help/save time.",
      targets: ["Use ‘can’", "Give 2 abilities", "Clear description"],
      rubric: RUBRIC
    },
    {
      id: "d13",
      type: "prompt",
      section: "describe",
      question: "Describe a simple experiment you know (2–4 sentences). 🧪",
      say: "I mixed vinegar and baking soda. It made bubbles and foam. It looked like a small volcano.",
      model: "I ____. It ____. I saw ____.",
      difficulty: "hard",
      explanation: "Any safe experiment is fine. Focus on steps and what happened.",
      targets: ["Past verbs", "Explain what happened", "2–4 sentences"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "d14",
      type: "prompt",
      section: "describe",
      question: "Describe your favourite place in your city/town. 🗺️",
      say: "My favourite place is the library. It is quiet and clean. I like it because I can read and learn.",
      model: "My favourite place is ____. It is ____. I like it because ____.",
      difficulty: "medium",
      explanation: "Encourage location + 2 describing words + reason.",
      targets: ["Use ‘because’", "3 sentences", "Describing words"],
      rubric: RUBRIC
    },
    {
      id: "d15",
      type: "prompt",
      section: "describe",
      question: "Describe your dream house (rooms + one special thing). 🏠",
      say: "My dream house is big and bright. It has three bedrooms and a garden. I want a small reading corner by the window.",
      model: "My dream house is ____. It has ____. I want ____.",
      difficulty: "hard",
      explanation: "Prompt for rooms and one special feature.",
      targets: ["3 sentences", "Rooms vocabulary", "One special feature"],
      rubric: RUBRIC
    },
    {
      id: "d16",
      type: "prompt",
      section: "describe",
      question: "Describe a superhero you invent (looks + power). 🦸",
      say: "My superhero wears a blue cape and a mask. She can fly and move very fast. She helps people in danger.",
      model: "My superhero wears ____. He/She can ____. He/She ____.",
      difficulty: "hard",
      explanation: "Encourage 2 abilities using can.",
      targets: ["Use ‘can’", "3 sentences", "Creative details"],
      rubric: RUBRIC
    },
    {
      id: "d17",
      type: "prompt",
      section: "describe",
      question: "Describe a healthy lunch you would pack for school. 🍱",
      say: "I would pack rice, chicken, and vegetables. I would also bring a banana. It is healthy because it has protein and vitamins.",
      model: "I would pack ____, ____, and ____. It is healthy because ____.",
      difficulty: "hard",
      explanation: "Encourage 3 items + reason.",
      targets: ["3 food items", "Use ‘because’", "Use ‘would’"],
      rubric: RUBRIC
    },
    {
      id: "d18",
      type: "prompt",
      section: "describe",
      question: "Describe your classroom (objects + where they are). 🪑",
      say: "There are many desks in the middle. The teacher’s desk is in front of the board. My bag is under my chair.",
      model: "There are ____. The ____ is ____. My ____ is ____.",
      difficulty: "hard",
      explanation: "Encourage ‘There are…’ + prepositions (in front of, next to, under).",
      targets: ["Use ‘There is/are’", "Use 2 place words", "3 sentences"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "d19",
      type: "prompt",
      section: "describe",
      question: "Compare two animals (cat and dog). Say one same thing and one different thing. 🐱🐶",
      say: "Cats and dogs are both animals and they can be pets. Cats are usually quiet, but dogs are often more active.",
      model: "Cats and dogs are both ____. Cats ____, but dogs ____.",
      difficulty: "hard",
      explanation: "Support with words: quiet, friendly, active, independent.",
      targets: ["Use ‘both’", "Use ‘but’", "2–3 sentences"],
      rubric: RUBRIC
    },
    {
      id: "d20",
      type: "prompt",
      section: "describe",
      question: "Describe a stormy day (what you see/hear). 🌧️",
      say: "The sky is dark and the wind is strong. I can hear thunder. People are running to stay dry.",
      model: "The sky is ____. I can hear ____. People are ____.",
      difficulty: "medium",
      explanation: "Encourage 1 sound + 1 action in -ing.",
      targets: ["Use describing words", "Use ‘is/are + -ing’", "3 sentences"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "d21",
      type: "prompt",
      section: "describe",
      question: "Describe a scene at a busy market (3–4 sentences). 🧺",
      say: "The market is crowded and noisy. I can smell grilled food. People are buying fruit and carrying bags.",
      model: "The market is ____. I can smell ____. People are ____.",
      difficulty: "hard",
      explanation: "Prompt for senses: see/hear/smell.",
      targets: ["3–4 sentences", "Use sense words", "Use ‘is/are + -ing’"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "d22",
      type: "prompt",
      section: "describe",
      question: "Describe a problem you had and how you solved it (2–4 sentences). 🔍",
      say: "I lost my pencil case at school. I checked my desk and asked my friend. In the end, I found it in my bag.",
      model: "I had a problem: ____. I ____. In the end, ____.",
      difficulty: "hard",
      explanation: "Encourage problem + 2 actions + ending.",
      targets: ["Problem + solution", "Use past verbs", "2–4 sentences"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s6",
      type: "prompt",
      section: "story",
      question: "Tell me about a time you felt scared (3 sentences). 😨",
      say: "One night, I heard a loud noise. I felt scared, but I called my dad. He checked and everything was safe.",
      model: "One time, I ____. I felt scared because ____. In the end, ____.",
      difficulty: "hard",
      explanation: "Encourage a clear ending to show the problem is solved.",
      targets: ["3 sentences", "Use ‘because’", "Beginning–end"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: true } }
    },
    {
      id: "s7",
      type: "prompt",
      section: "story",
      question: "Continue the story: ‘After school, I saw a tiny kitten…’ 🐾",
      say: "After school, I saw a tiny kitten near the gate. It looked hungry, so I gave it some food. Then I asked an adult to help it.",
      model: "I saw ____. I ____. Then I ____.",
      difficulty: "hard",
      explanation: "Support with verbs: saw, helped, fed, asked, took.",
      targets: ["3 sentences", "Use past verbs", "Clear ending"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s8",
      type: "prompt",
      section: "story",
      question: "Tell a story using these words: library • whisper • mystery. 🕵️",
      say: "In the library, my friend and I heard a whisper. We followed the sound and found a hidden note in a book. The mystery was just a funny message from our teacher.",
      model: "In the library, I ____. I heard a whisper. In the end, ____.",
      difficulty: "hard",
      explanation: "Make sure the learner uses all 3 words.",
      targets: ["Use all 3 words", "3 sentences", "Past verbs"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s9",
      type: "prompt",
      section: "story",
      question: "Tell me about a time you learned something new. 🧠",
      say: "I learned to ride a bike. At first I fell, but I tried again. After a few days, I could ride by myself.",
      model: "I learned to ____. At first, ____. After that, ____.",
      difficulty: "medium",
      explanation: "Encourage ‘at first’ + ‘after that’.",
      targets: ["3 sentences", "Sequencing words", "Past verbs"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s10",
      type: "prompt",
      section: "story",
      question: "Tell a story about losing something and finding it. 🔑",
      say: "I lost my key at home. I looked in my pockets and under the sofa. Finally, I found it in my jacket.",
      model: "I lost ____. I looked ____. Finally, I ____.",
      difficulty: "medium",
      explanation: "Encourage ‘finally’ for the ending.",
      targets: ["3 sentences", "Use ‘finally’", "Past verbs"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s11",
      type: "prompt",
      section: "story",
      question: "Tell me about a fun day with your family (3–4 sentences). 👨‍👩‍👧‍👦",
      say: "Last month, my family went to the zoo. We saw elephants and took photos. We ate lunch together and laughed a lot.",
      model: "We went to ____. We ____. Then we ____.",
      difficulty: "medium",
      explanation: "Encourage at least 3 actions.",
      targets: ["3–4 sentences", "Past time words", "Add details"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s12",
      type: "prompt",
      section: "story",
      question: "Continue: ‘The teacher gave us a challenge…’ 🏆",
      say: "The teacher gave us a challenge to build the tallest tower with paper. My team worked together and tested many ideas. In the end, our tower stood for one minute and we felt proud.",
      model: "The teacher gave us a challenge to ____. We ____. In the end, ____.",
      difficulty: "hard",
      explanation: "Encourage teamwork words: team, together, share, help.",
      targets: ["3 sentences", "Beginning–end", "Teamwork words"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s13",
      type: "prompt",
      section: "story",
      question: "Tell a story using first, then, and finally. Topic: making noodles. 🍜",
      say: "First, I boiled water. Then I cooked the noodles and added vegetables. Finally, I ate them and they were delicious.",
      model: "First, ____. Then, ____. Finally, ____.",
      difficulty: "medium",
      explanation: "Check that the learner uses all three sequencing words.",
      targets: ["Use first/then/finally", "3 sentences", "Clear steps"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s14",
      type: "prompt",
      section: "story",
      question: "Tell a story about helping the environment. ♻️",
      say: "One day, I saw plastic on the ground. I picked it up and put it in the recycling bin. After that, my friends helped me clean the area.",
      model: "I saw ____. I ____. After that, ____.",
      difficulty: "medium",
      explanation: "Encourage action verbs: pick up, recycle, reuse, save water.",
      targets: ["3 sentences", "Helpful action", "Past verbs"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s15",
      type: "prompt",
      section: "story",
      question: "Tell a story about a mistake you made and what you learned. ✅",
      say: "I forgot my homework once. My teacher reminded me to plan better. After that, I used a homework list every day.",
      model: "I made a mistake: ____. Then ____. After that, I learned ____.",
      difficulty: "hard",
      explanation: "Focus on learning and improvement.",
      targets: ["3 sentences", "Use ‘learned’", "Clear ending"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s16",
      type: "prompt",
      section: "story",
      question: "Continue: ‘The power went out during dinner…’ 💡",
      say: "The power went out during dinner and the room became dark. We used a flashlight and told funny stories. When the lights came back, we cheered.",
      model: "The power went out and ____. We ____. When it came back, ____.",
      difficulty: "medium",
      explanation: "Encourage a clear middle action and ending.",
      targets: ["3 sentences", "Problem + solution", "Past verbs"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "s17",
      type: "prompt",
      section: "story",
      question: "Tell a short story about a dream you had (real or imagined). 🌙",
      say: "I dreamed I could fly over my city. I saw bright lights and tiny cars below. When I woke up, I felt surprised and happy.",
      model: "I dreamed that ____. I saw ____. When I woke up, ____.",
      difficulty: "hard",
      explanation: "Any imaginative story is fine.",
      targets: ["3 sentences", "Use past verbs", "Clear details"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: false } }
    },
    {
      id: "o9",
      type: "prompt",
      section: "opinion",
      question: "Should children use phones at school? Why or why not? 📱",
      say: "I think children should not use phones in class because it is distracting. However, phones can be useful for learning sometimes.",
      model: "I think ____. Because ____. However, ____.",
      difficulty: "hard",
      explanation: "Encourage 1 main opinion + 1 extra idea.",
      targets: ["Use ‘because’", "Opinion + support", "Add 1 extra idea"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: true } }
    },
    {
      id: "o10",
      type: "prompt",
      section: "opinion",
      question: "City or countryside: which is better for children? Why? 🏙️🌾",
      say: "I think the countryside is better because it is quiet and there is more fresh air. Children can play outside more.",
      model: "I think ____ is better because ____. Also, ____.",
      difficulty: "hard",
      explanation: "Encourage 2 reasons.",
      targets: ["Give 2 reasons", "Use ‘because’"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: true } }
    },
    {
      id: "o11",
      type: "prompt",
      section: "opinion",
      question: "Which is better for short trips: bike or bus? Why? 🚲🚌",
      say: "For short trips, I prefer a bike because it is healthy and fun. But if it is raining, a bus is better.",
      model: "I prefer ____ because ____. But ____.",
      difficulty: "hard",
      explanation: "Encourage contrast with ‘but’.",
      targets: ["Use ‘because’", "Add contrast", "Clear choice"],
      rubric: RUBRIC
    },
    {
      id: "o12",
      type: "prompt",
      section: "opinion",
      question: "Should school break time be longer? Why? ⏳",
      say: "I think break time should be longer because students need time to rest. It also helps us focus better in class.",
      model: "I think ____. Because ____. Also, ____.",
      difficulty: "hard",
      explanation: "Aim for two reasons.",
      targets: ["Give 2 reasons", "Use ‘because’"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: true } }
    },
    {
      id: "o13",
      type: "prompt",
      section: "opinion",
      question: "How can you solve an argument with a friend? Give 2 ideas. 🗣️",
      say: "I can solve an argument by listening first and speaking calmly. I can also say sorry if I am wrong.",
      model: "I can solve it by ____ and ____. I can also ____.",
      difficulty: "medium",
      explanation: "Encourage two actions: listen, calm voice, say sorry, share, take turns.",
      targets: ["Give 2 ideas", "Use ‘can’"],
      rubric: { ...RUBRIC, checks: { minSentences: 2, encourageBecause: false } }
    },
    {
      id: "o14",
      type: "prompt",
      section: "opinion",
      question: "Which pet is easier to take care of: a fish or a dog? Why? 🐟🐶",
      say: "I think a fish is easier because it needs less space and it is quiet. A dog needs more time for walks.",
      model: "I think ____ is easier because ____. Also, ____.",
      difficulty: "hard",
      explanation: "Encourage compare with one extra detail.",
      targets: ["Use ‘because’", "Compare two things", "2–3 sentences"],
      rubric: RUBRIC
    },
    {
      id: "o15",
      type: "prompt",
      section: "opinion",
      question: "Should we eat vegetables every day? Why? 🥦",
      say: "Yes, we should eat vegetables every day because they help us stay healthy. They also give us vitamins.",
      model: "We should ____ because ____. Also, ____.",
      difficulty: "medium",
      explanation: "Encourage health reasons.",
      targets: ["Use ‘should’", "Give 2 reasons", "Use ‘because’"],
      rubric: { ...RUBRIC, checks: { minSentences: 2, encourageBecause: true } }
    },
    {
      id: "o16",
      type: "prompt",
      section: "opinion",
      question: "If you could have one superpower, which one would you choose? Why? ✨",
      say: "I would choose the power to fly because I could travel quickly and see new places. It would be exciting.",
      model: "I would choose ____ because ____. Also, ____.",
      difficulty: "hard",
      explanation: "Encourage 2 reasons.",
      targets: ["Use ‘would’", "Use ‘because’", "Give reasons"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: true } }
    },
    {
      id: "o17",
      type: "prompt",
      section: "opinion",
      question: "What is the best way to learn English? Give 2 tips. 🇬🇧",
      say: "I think the best way is to practise every day and listen to English songs. Also, speaking with friends helps.",
      model: "The best way is to ____ and ____. Also, ____.",
      difficulty: "hard",
      explanation: "Encourage two practical tips.",
      targets: ["Give 2 tips", "Use ‘and/also’", "Clear advice"],
      rubric: { ...RUBRIC, checks: { minSentences: 2, encourageBecause: false } }
    },
    {
      id: "o18",
      type: "prompt",
      section: "opinion",
      question: "Should students wear school uniforms? Why or why not? 👕",
      say: "I think uniforms are good because they are simple and everyone looks the same. However, some students want to show their style.",
      model: "I think ____. Because ____. However, ____.",
      difficulty: "hard",
      explanation: "Encourage one main opinion and one extra idea.",
      targets: ["Use ‘because’", "Add ‘however’ idea", "3 sentences"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: true } }
    },
    {
      id: "o19",
      type: "prompt",
      section: "opinion",
      question: "Playing outside or playing video games: which is better? Why? 🏃‍♂️🎮",
      say: "I think playing outside is better because it is healthy and I can play with friends. Video games are fun, but too much is not good.",
      model: "I think ____ is better because ____. But ____.",
      difficulty: "hard",
      explanation: "Encourage 2 reasons + a balance idea.",
      targets: ["Give reasons", "Use ‘because’", "Add balance idea"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: true } }
    },
    {
      id: "o20",
      type: "prompt",
      section: "opinion",
      question: "How can we be kind online? Give 2 actions. 💻",
      say: "We can be kind online by using polite words and not sharing mean comments. We can also help if someone is being bullied.",
      model: "We can be kind by ____ and ____. We can also ____.",
      difficulty: "hard",
      explanation: "Keep it safe and simple: polite words, no mean comments, tell an adult.",
      targets: ["Give 2 actions", "Use ‘can’", "Online safety"],
      rubric: { ...RUBRIC, checks: { minSentences: 2, encourageBecause: false } }
    },
    {
      id: "o21",
      type: "prompt",
      section: "opinion",
      question: "What is the most important school subject? Why? 🏫",
      say: "I think English is the most important because it helps me communicate with people around the world. It also helps me read many books.",
      model: "I think ____ is the most important because ____. Also, ____.",
      difficulty: "hard",
      explanation: "Encourage 2 reasons and accept any subject choice.",
      targets: ["Use ‘because’", "Give 2 reasons", "Clear opinion"],
      rubric: { ...RUBRIC, checks: { minSentences: 3, encourageBecause: true } }
    }
  );

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
