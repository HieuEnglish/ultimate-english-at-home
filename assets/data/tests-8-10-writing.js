/* assets/data/tests-8-10-writing.js
   Question bank: Ages 8–10 • Writing

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-8-10-writing"

   Content notes:
   - Mix of objective writing skills (punctuation, spelling, grammar, sentence order).
   - Short writing prompts (3–8 sentences).
   - Prompts include simple auto-check targets (min words/sentences + optional required elements).
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-writing";

  const QUESTIONS = [
    // --- Objective: punctuation / grammar / spelling ---
    {
      id: "q1",
      type: "multipleChoice",
      question: "Choose the best topic sentence for a paragraph about a fun school day.",
      options: [
        "My school is very big and old.",
        "Last Friday was the best day at school because we had a science fair.",
        "Some students like maths and some like art.",
        "Teachers give homework on weekdays."
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "A topic sentence tells the main idea of the paragraph."
    },
    {
      id: "q2",
      type: "multipleChoice",
      question: "Choose the correct capital letter: ___y friend and I played chess.",
      options: ["m", "M", "y", "Y"],
      answer: 1,
      difficulty: "easy",
      explanation: "A sentence starts with a capital letter."
    },
    {
      id: "q3",
      type: "fillInTheBlank",
      question: "Fill in the best word: I went to the park ____ it was sunny.",
      answer: ["because"],
      acceptedAnswers: ["because"],
      difficulty: "easy",
      explanation: "Because gives the reason."
    },
    {
      id: "q4",
      type: "multipleChoice",
      question: "Choose the best punctuation: Where are you going__",
      options: [".", "?", "!", ","],
      answer: 1,
      difficulty: "easy",
      explanation: "Questions end with a question mark (?)."
    },
    {
      id: "q5",
      type: "multipleChoice",
      question: "Choose the correct verb: Yesterday, we ____ to the museum.",
      options: ["go", "went", "gone", "going"],
      answer: 1,
      difficulty: "easy",
      explanation: "Yesterday = past, so we use went."
    },
    {
      id: "q6",
      type: "fillInTheBlank",
      question: "Fill in the word: Please ____ the door quietly.",
      answer: ["close", "shut"],
      acceptedAnswers: ["close", "shut"],
      difficulty: "easy",
      explanation: "Close / shut both work."
    },
    {
      id: "q7",
      type: "multipleChoice",
      question: "Which word is spelled correctly?",
      options: ["bicicle", "bicycle", "bycicle", "bicycel"],
      answer: 1,
      difficulty: "medium",
      explanation: "The correct spelling is bicycle."
    },
    {
      id: "q8",
      type: "trueFalse",
      question: "A sentence should start with a capital letter.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "Capital letters help readers see new sentences."
    },
    {
      id: "q9",
      type: "multipleChoice",
      question: "Choose the best word order.",
      options: [
        "Finished quickly I my homework.",
        "I finished my homework quickly.",
        "I homework finished quickly my.",
        "Quickly I finished homework my."
      ],
      answer: 1,
      difficulty: "medium",
      explanation: "Subject + verb + object is the usual order."
    },
    {
      id: "q10",
      type: "fillInTheBlank",
      question: "Fill in the plural word: One child, two ____.",
      answer: ["children"],
      acceptedAnswers: ["children"],
      difficulty: "medium",
      explanation: "Child → children."
    },
    {
      id: "q11",
      type: "multipleChoice",
      question: "Choose the best ending: We turned off the lights and ____.",
      options: [
        "we sleeped fast",
        "we sleeping fast",
        "we went to sleep quickly",
        "we going sleep"
      ],
      answer: 2,
      difficulty: "medium",
      explanation: "Went to sleep is the correct past form and phrase."
    },
    {
      id: "q12",
      type: "fillInTheBlank",
      question: "Fill in the sequencing word: ____, wash your hands. Next, dry them.",
      answer: ["first"],
      acceptedAnswers: ["first"],
      difficulty: "medium",
      explanation: "First is used to start instructions."
    },
    {
      id: "q13",
      type: "multipleChoice",
      question: "Choose the best linking word: I was tired, ____ I went to bed early.",
      options: ["so", "because", "but", "or"],
      answer: 0,
      difficulty: "medium",
      explanation: "So shows a result."
    },
    {
      id: "q14",
      type: "multipleChoice",
      question: "Choose the correct pronoun: Sara and I went to the shop. ____ bought ice cream.",
      options: ["He", "She", "They", "We"],
      answer: 3,
      difficulty: "easy",
      explanation: "Sara and I = we."
    },
    {
      id: "q15",
      type: "multipleChoice",
      question: "Choose the best word: I wanted to play outside, ____ it started to rain.",
      options: ["and", "but", "because", "so"],
      answer: 1,
      difficulty: "medium",
      explanation: "But shows contrast (wanted to play vs. rain)."
    },
    {
      id: "q16",
      type: "fillInTheBlank",
      question: "Write the contraction for 'do not':",
      answer: ["don't", "dont"],
      acceptedAnswers: ["don't", "dont"],
      difficulty: "hard",
      explanation: "Do not → don't."
    },

    // --- Writing prompts (free response) ---
    {
      id: "q17",
      type: "prompt",
      question: "Write 3–5 sentences about your favourite hobby. Include: what you do, when you do it, and why you like it.",
      model: "I like ____. I usually ____. I like it because ____.",
      difficulty: "easy",
      rubric: {
        minWords: 25,
        minSentences: 3,
        criteria: {
          ideas: "Clear topic + details (what/when/why)",
          organization: "Sentences are in a logical order",
          language: "Simple correct grammar and spelling",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Aim for 3–5 sentences. Use capital letters and full stops."
    },
    {
      id: "q18",
      type: "prompt",
      question:
        "Describe this scene in 4–6 sentences: A sunny park with a lake, two children feeding ducks, and a family having a picnic.",
      model: "In the park, ____.",
      difficulty: "easy",
      rubric: {
        minWords: 35,
        minSentences: 4,
        criteria: {
          ideas: "At least 4 details from the scene",
          organization: "Use separate sentences (not one long sentence)",
          language: "Use describing words (adjectives)",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Include details about people, weather, and what is happening."
    },
    {
      id: "q19",
      type: "prompt",
      question:
        "Write a short email (or message) to a friend about your weekend plan. Include a greeting and a closing.",
      model: "Hi ____,\nThis weekend I will ____.\nFrom, ____",
      difficulty: "medium",
      rubric: {
        minWords: 35,
        minSentences: 3,
        mustIncludeAny: [["hi", "hello"], ["from", "bye", "see you"]],
        criteria: {
          organization: "Greeting + message + closing",
          ideas: "At least 2 details (where/when/with who/what)",
          language: "Correct simple sentences",
          punctuation: "Capitals, commas, full stops"
        }
      },
      explanation: "Try to include where you will go and what you will do."
    },
    {
      id: "q20",
      type: "prompt",
      question:
        "Write instructions: How to make a simple snack (like a sandwich or fruit salad). Use sequencing words (First/Next/Then/Finally).",
      model: "First, ____. Next, ____. Then, ____. Finally, ____.",
      difficulty: "medium",
      rubric: {
        minWords: 35,
        minSentences: 4,
        mustIncludeAny: [["first"], ["next"], ["then"], ["finally"]],
        criteria: {
          organization: "Clear steps in order",
          clarity: "Easy to follow",
          language: "Imperatives (Cut/Mix/Put/Take)",
          punctuation: "Commas after sequencing words"
        }
      },
      explanation: "Write 4–6 steps. Keep each step short and clear."
    },
    {
      id: "q21",
      type: "prompt",
      question:
        "Write a short story (5–8 sentences). Start with: 'When I opened the old book, a tiny map fell out…'",
      model: "When I opened the old book, a tiny map fell out…",
      difficulty: "hard",
      rubric: {
        minWords: 60,
        minSentences: 5,
        criteria: {
          organization: "Beginning + middle + ending",
          ideas: "Characters + a problem + a solution",
          language: "Past tense (found, went, saw)",
          punctuation: "Sentence boundaries are clear"
        }
      },
      explanation: "Give your story an ending. Use past tense verbs."
    },
    {
      id: "q22",
      type: "prompt",
      question:
        "Do you think students should have homework every day? Write 4–6 sentences and give at least 2 reasons.",
      model: "I think ____. First, ____. Second, ____.",
      difficulty: "hard",
      rubric: {
        minWords: 50,
        minSentences: 4,
        mustIncludeAny: [["because", "so", "for example"]],
        criteria: {
          ideas: "Clear opinion + at least 2 reasons",
          organization: "Use linking words (First, Also, Because)",
          language: "Simple correct grammar",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Use linking words like 'First' and 'Also'."
    },
    {
      id: "q23",
      type: "prompt",
      question:
        "Write a postcard from a trip. Include: where you are, the weather, and one activity you did.",
      model: "Dear ____,\nI am in ____. The weather is ____. Today I ____.\nLove, ____",
      difficulty: "medium",
      rubric: {
        minWords: 35,
        minSentences: 3,
        criteria: {
          organization: "Greeting + details + closing",
          ideas: "Place + weather + activity",
          language: "Past tense for activities",
          punctuation: "Commas and full stops"
        }
      },
      explanation: "Keep it friendly and clear."
    },
    {
      id: "q24",
      type: "prompt",
      question:
        "Write a short dialogue (at least 4 lines) between two friends planning a game after school. Include at least one question.",
      model: "A: Do you want to ____?\nB: ____.\nA: What time?\nB: ____.",
      difficulty: "hard",
      rubric: {
        minWords: 30,
        minSentences: 4,
        mustIncludeAny: [["?"], ["a:", "b:"]],
        criteria: {
          organization: "Clear speaker turns",
          ideas: "Time + place + activity",
          language: "Natural questions and answers",
          punctuation: "Question marks for questions"
        }
      },
      explanation: "Use A: and B: (or two names)."
    },
    {
      id: "q25",
      type: "prompt",
      passage:
        "Our class started a recycling project. We placed three boxes in the classroom: paper, plastic, and cans. After two weeks, we collected many items and the room looked cleaner. The teacher said our project helped the school.",
      question: "Write a 2–3 sentence summary of the paragraph.",
      model: "The class ____. They ____.",
      difficulty: "medium",
      rubric: {
        minWords: 25,
        minSentences: 2,
        criteria: {
          ideas: "Includes the main idea (recycling project) and one key detail",
          concision: "Not too long; no extra details",
          language: "Clear sentences",
          punctuation: "Capitals and full stops"
        }
      },
      explanation: "Use your own words. Keep only the most important ideas."
    },
    {
      id: "q26",
      type: "prompt",
      question:
        "Write a short review of a book or movie you know. Give it a rating out of 5 stars (★).",
      model: "I give it ____/5 ★. I liked ____. I recommend it because ____.",
      difficulty: "medium",
      rubric: {
        minWords: 45,
        minSentences: 4,
        mustIncludeAny: [["/5", "★", "stars"]],
        criteria: {
          ideas: "What it is about + your opinion",
          support: "At least 2 reasons/examples",
          language: "Clear sentences",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Include what you liked and one thing that could be better."
    },

    // --- Extra objective items for variety ---
    {
      id: "q27",
      type: "multipleChoice",
      question: "Choose the best linking word: I packed my bag, ____ I checked my homework.",
      options: ["then", "because", "but", "or"],
      answer: 0,
      difficulty: "easy",
      explanation: "Then shows the next step."
    },
    {
      id: "q28",
      type: "fillInTheBlank",
      question: "Fill in the word: Please write ____ (not loud) in the library.",
      answer: ["quietly"],
      acceptedAnswers: ["quietly"],
      difficulty: "easy",
      explanation: "Quietly means not loudly."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
