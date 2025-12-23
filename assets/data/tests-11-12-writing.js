/* assets/data/tests-11-12-writing.js
   Question bank: Ages 11–12 • Writing

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-11-12-writing"

   Content notes:
   - Focus: sentence accuracy, paragraph organization, linking words,
     basic email/letter format, and short multi-paragraph writing.
   - Mix of:
     - multipleChoice / trueFalse (objective)
     - fillInTheBlank (objective)
     - essay / prompt (free response; auto-checkable requirements)
*/

(function () {
  "use strict";

  const SLUG = "age-11-12-writing";

  const QUESTIONS = [
    // -----------------------------
    // Objective (grammar + organization)
    // -----------------------------
    {
      id: "q1",
      type: "multipleChoice",
      question: "Choose the best topic sentence for a paragraph about keeping the school clean.",
      options: [
        "Keeping our school clean helps everyone feel comfortable and safe.",
        "My friend has a blue backpack and a red pencil case.",
        "Yesterday was Tuesday, and I ate noodles for lunch.",
        "Some animals live in the ocean, and some live on land."
      ],
      answer: 0,
      points: 1,
      difficulty: "easy",
      explanation: "A topic sentence introduces the main idea of the paragraph."
    },
    {
      id: "q2",
      type: "multipleChoice",
      question: "Choose the sentence with correct capitalization and punctuation.",
      options: [
        "after school, we played football in the park",
        "After school we played football in the park.",
        "After school, we played football in the park.",
        "after School, we played Football in the park."
      ],
      answer: 2,
      points: 1,
      difficulty: "easy",
      explanation: "Start with a capital letter and use commas and full stops correctly."
    },
    {
      id: "q3",
      type: "multipleChoice",
      question: "Choose the best linking word: I wanted to go outside, ____ it started to rain.",
      options: ["because", "but", "so", "and"],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation: "‘But’ shows contrast between two ideas."
    },
    {
      id: "q4",
      type: "fillInTheBlank",
      question: "Fill in the missing word: I stayed home ____ I was feeling sick.",
      answer: "because",
      acceptedAnswers: ["because"],
      points: 1,
      difficulty: "easy",
      explanation: "‘Because’ introduces a reason."
    },
    {
      id: "q5",
      type: "multipleChoice",
      question: "Choose the best verb form: Last night, I ____ my homework before dinner.",
      options: ["finish", "finished", "finishing", "will finish"],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation: "‘Last night’ signals past tense: finished."
    },
    {
      id: "q6",
      type: "trueFalse",
      question: "A conclusion should introduce a new main idea.",
      options: ["True", "False"],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation: "A conclusion summarizes and finishes the main idea instead of adding a new one."
    },
    {
      id: "q7",
      type: "multipleChoice",
      question:
        "Choose the best order of these sentences to make a clear paragraph.\n\nA) Finally, we checked our answers.\nB) First, we read the questions carefully.\nC) Then, we wrote our ideas in short notes.",
      options: ["B → C → A", "C → B → A", "A → B → C", "B → A → C"],
      answer: 0,
      points: 1,
      difficulty: "medium",
      explanation: "A clear sequence is: First → Then → Finally."
    },
    {
      id: "q8",
      type: "multipleChoice",
      question: "Which sentence is NOT a run-on sentence?",
      options: [
        "I like reading I read every night.",
        "I like reading; I read every night.",
        "I like reading I read every night I learn new words.",
        "I like reading I read every night, I learn new words."
      ],
      answer: 1,
      points: 1,
      difficulty: "hard",
      explanation: "A semicolon (;) can correctly join two related complete sentences."
    },
    {
      id: "q9",
      type: "fillInTheBlank",
      question: "Fill in the missing word: I was tired; ____, I finished the project.",
      answer: ["however", "still"],
      acceptedAnswers: ["however", "still"],
      points: 1,
      difficulty: "hard",
      explanation: "‘However’ / ‘Still’ shows contrast (tired, but continued)."
    },
    {
      id: "q10",
      type: "multipleChoice",
      question: "Choose the best ending sentence for a paragraph about teamwork.",
      options: [
        "In conclusion, teamwork helps people share ideas and finish tasks faster.",
        "Teamwork is a word with eight letters.",
        "My favourite colour is green.",
        "Teamwork means only one person does the job."
      ],
      answer: 0,
      points: 1,
      difficulty: "medium",
      explanation: "A good ending sentence summarizes the paragraph’s main idea."
    },
    {
      id: "q11",
      type: "multipleChoice",
      question: "Choose the best opening for an email to a teacher.",
      options: ["Yo teacher!!!", "Dear Ms. Lee,", "Give me help now.", "Hey, what's up"],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation: "Formal emails usually start with ‘Dear + Name,’"
    },
    {
      id: "q12",
      type: "multipleChoice",
      question: "Choose the best transition word: I studied hard. ____, I did well on the test.",
      options: ["However", "For example", "As a result", "Meanwhile"],
      answer: 2,
      points: 1,
      difficulty: "medium",
      explanation: "‘As a result’ shows a clear cause → effect relationship."
    },

    // -----------------------------
    // Writing tasks (auto-checkable requirements + rubric guidance)
    // -----------------------------
    {
      id: "q13",
      type: "prompt",
      question:
        "Write an email to your teacher asking for help with homework.\n\nInclude:\n• a greeting\n• the reason you need help\n• TWO questions\n• a polite closing\n\nWrite 80–130 words.",
      difficulty: "medium",
      explanation: "Use a clear, polite tone. Keep your message organized.",
      rubric: {
        checks: [
          { id: "minWords", label: "80+ words", type: "minWords", value: 80 },
          { id: "maxWords", label: "130 words or fewer", type: "maxWords", value: 130 },
          {
            id: "hasGreeting",
            label: "Has a greeting (Dear/Hi/Hello)",
            type: "includesAny",
            value: ["dear", "hi", "hello"]
          },
          {
            id: "hasTwoQuestions",
            label: "Includes at least 2 question marks (?)",
            type: "minCharCount",
            value: { char: "?", min: 2 }
          },
          {
            id: "hasClosing",
            label: "Has a closing (Sincerely/Best/Thank you)",
            type: "includesAny",
            value: ["sincerely", "best", "thank you", "thanks"]
          }
        ],
        criteria: [
          {
            name: "Organization",
            descriptors: {
              meets: "Clear opening, purpose, questions, and closing.",
              developing: "Some parts are unclear or missing.",
              needsWork: "Hard to follow; missing key parts."
            }
          },
          {
            name: "Language Accuracy",
            descriptors: {
              meets: "Mostly correct sentences and punctuation.",
              developing: "Some errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q14",
      type: "essay",
      question:
        "Write ONE paragraph about this question:\n\nShould students be allowed to use phones at school?\n\nUse this structure (include the exact starters):\n• In my opinion, …\n• First, …\n• Second, …\n• Finally, …\n\nWrite 90–140 words.",
      difficulty: "hard",
      explanation: "Give 2 reasons and finish with a clear final sentence.",
      rubric: {
        checks: [
          { id: "minWords", label: "90+ words", type: "minWords", value: 90 },
          { id: "maxWords", label: "140 words or fewer", type: "maxWords", value: 140 },
          {
            id: "includesStarters",
            label: "Includes all starters (In my opinion / First / Second / Finally)",
            type: "includesAll",
            value: ["in my opinion", "first", "second", "finally"]
          },
          { id: "endsPunct", label: "Ends with punctuation (. ! ?)", type: "endsWithAny", value: [".", "!", "?"] }
        ],
        criteria: [
          {
            name: "Task Completion",
            descriptors: {
              meets: "Answers the question with a clear opinion and 2 reasons.",
              developing: "Opinion is present but reasons are weak or unclear.",
              needsWork: "Does not answer the question clearly."
            }
          },
          {
            name: "Cohesion",
            descriptors: {
              meets: "Ideas connect smoothly using simple linking words.",
              developing: "Some linking, but connections are sometimes unclear.",
              needsWork: "Ideas feel disconnected or confusing."
            }
          }
        ]
      }
    },
    {
      id: "q15",
      type: "prompt",
      question:
        "Write a short story. Start with this exact sentence:\n\nWhen I opened the box, I couldn't believe what I saw.\n\nInclude ALL of these time words somewhere: first, then, later.\nWrite 120–170 words.",
      difficulty: "hard",
      explanation: "Use past tense and finish with a clear ending.",
      rubric: {
        checks: [
          { id: "minWords", label: "120+ words", type: "minWords", value: 120 },
          { id: "maxWords", label: "170 words or fewer", type: "maxWords", value: 170 },
          {
            id: "startsWith",
            label: "Starts with the required first sentence",
            type: "startsWith",
            value: "when i opened the box, i couldn't believe what i saw"
          },
          {
            id: "timeWords",
            label: "Includes first / then / later",
            type: "includesAll",
            value: ["first", "then", "later"]
          }
        ],
        criteria: [
          {
            name: "Story Development",
            descriptors: {
              meets: "Has a clear beginning, middle, and ending.",
              developing: "Some story events, but ending is weak or unclear.",
              needsWork: "Events are confusing or incomplete."
            }
          },
          {
            name: "Grammar",
            descriptors: {
              meets: "Mostly correct past tense and sentence structure.",
              developing: "Some tense errors but meaning is clear.",
              needsWork: "Many grammar errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q16",
      type: "essay",
      passage:
        "Some students bring reusable water bottles to school. This reduces plastic waste because fewer single-use bottles are thrown away. Reusable bottles can also save money over time. However, bottles must be cleaned regularly to stay hygienic.",
      question:
        "Write a summary of the text in 40–60 words. Include TWO key ideas.\n\nTip: Do not copy whole sentences.",
      difficulty: "medium",
      explanation: "Include the main benefit and one important detail.",
      rubric: {
        checks: [
          { id: "minWords", label: "40+ words", type: "minWords", value: 40 },
          { id: "maxWords", label: "60 words or fewer", type: "maxWords", value: 60 },
          {
            id: "mentionsWaste",
            label: "Mentions reducing plastic waste",
            type: "includesAny",
            value: ["plastic", "waste", "single-use", "single use"]
          },
          {
            id: "mentionsClean",
            label: "Mentions cleaning / hygiene OR saving money",
            type: "includesAny",
            value: ["clean", "hygien", "money", "save"]
          }
        ],
        criteria: [
          {
            name: "Summary Quality",
            descriptors: {
              meets: "Includes main idea + 1 supporting detail in your own words.",
              developing: "Main idea is present but details are unclear or copied.",
              needsWork: "Missing main idea or too much copied text."
            }
          },
          {
            name: "Clarity",
            descriptors: {
              meets: "Clear sentences and accurate meaning.",
              developing: "Some unclear parts but overall meaning is understandable.",
              needsWork: "Hard to understand."
            }
          }
        ]
      }
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
