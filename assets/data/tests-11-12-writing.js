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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best topic sentence for a paragraph about keeping the school clean.",
      options: [
        "My friend has a blue backpack and a red pencil case.",
        "Keeping our school clean helps everyone feel comfortable and safe.",
        "Yesterday was Tuesday, and I ate noodles for lunch.",
        "Some animals live in the ocean, and some live on land."
      ], answer: 1,
      points: 1,
      difficulty: "easy",
      explanation: "A topic sentence introduces the main idea of the paragraph."
    },
    {
      id: "q2",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best linking word: I wanted to go outside, ____ it started to rain.",
      options: ["because", "and", "so", "but"], answer: 3,
      points: 1,
      difficulty: "easy",
      explanation: "‘But’ shows contrast between two ideas."
    },
    {
      id: "q4",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best verb form: Last night, I ____ my homework before dinner.",
      options: ["finished", "finish", "finishing", "will finish"], answer: 0,
      points: 1,
      difficulty: "easy",
      explanation: "‘Last night’ signals past tense: finished."
    },
    {
      id: "q6",
      type: "trueFalse",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question:
        "Choose the best order of these sentences to make a clear paragraph.\n\nA) Finally, we checked our answers.\nB) First, we read the questions carefully.\nC) Then, we wrote our ideas in short notes.",
      options: ["A → B → C", "C → B → A", "B → C → A", "B → A → C"], answer: 2,
      points: 1,
      difficulty: "medium",
      explanation: "A clear sequence is: First → Then → Finally."
    },
    {
      id: "q8",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Which sentence is NOT a run-on sentence?",
      options: [
        "I like reading I read every night.",
        "I like reading I read every night, I learn new words.",
        "I like reading I read every night I learn new words.",
        "I like reading; I read every night."
      ], answer: 3,
      points: 1,
      difficulty: "hard",
      explanation: "A semicolon (;) can correctly join two related complete sentences."
    },
    {
      id: "q9",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
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
,

    // -----------------------------
    // Objective (grammar + organization) — Additional practice
    // -----------------------------
    {
      id: "q17",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best supporting sentence for a paragraph about recycling at school.",
      options: [
        "Winter is colder than summer.",
        "I watched a funny video after dinner.",
        "My cousin lives in a different city.",
        "Recycling bins in the hallways make it easy to sort paper and plastic."
      ], answer: 3,
      points: 1,
      difficulty: "easy",
      explanation: "A supporting sentence should give a detail related to recycling at school."
    },
    {
      id: "q18",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the sentence with correct punctuation.",
      options: [
        "On Monday, we visited the museum.", 
        "On Monday we visited the museum.",
        "On monday we visited the museum",
        "on Monday, we visited the museum"
      ], answer: 0,
      points: 1,
      difficulty: "easy",
      explanation: "Use a capital letter for Monday and a comma after the opening time phrase, then end with a full stop."
    },
    {
      id: "q19",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best linking word: ____ it was late, we finished the poster.",
      options: ["Because", "Although", "So", "And"],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation: "‘Although’ shows contrast (late, but still finished)."
    },
    {
      id: "q20",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: I studied carefully; ____, I felt prepared for the quiz.",
      answer: "therefore",
      acceptedAnswers: ["therefore"],
      points: 1,
      difficulty: "medium",
      explanation: "‘Therefore’ shows a result of studying carefully."
    },
    {
      id: "q21",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best verb form: Each of the students ____ a role in the project.",
      options: ["have", "are", "has", "were"], answer: 2,
      points: 1,
      difficulty: "medium",
      explanation: "‘Each’ is singular, so we use ‘has’."
    },
    {
      id: "q22",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct word: Rita and Sam forgot ____ tickets.",
      options: ["there", "them", "they're", "their"], answer: 3,
      points: 1,
      difficulty: "easy",
      explanation: "‘Their’ shows possession (tickets belong to them)."
    },
    {
      id: "q23",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: My brother is ____ than me.",
      answer: "taller",
      acceptedAnswers: ["taller"],
      points: 1,
      difficulty: "easy",
      explanation: "Use the comparative form ‘taller’ to compare two people."
    },
    {
      id: "q24",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best form: This puzzle is ____ than the last one.",
      options: ["easier", "easy", "easiest", "more easy"], answer: 0,
      points: 1,
      difficulty: "medium",
      explanation: "Use the comparative form ‘easier’ when comparing two things."
    },
    {
      id: "q25",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best word: She spoke ____ so everyone could hear.",
      options: ["clear", "clearly", "clearness", "clearest"],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation: "An adverb describes how she spoke: ‘clearly’."
    },
    {
      id: "q26",
      type: "trueFalse",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "A formal email usually includes a subject line.",
      options: ["True", "False"],
      answer: 0,
      points: 1,
      difficulty: "easy",
      explanation: "A subject line helps the reader understand the topic quickly."
    },
    {
      id: "q27",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best sentence to support this topic sentence: ‘Pocket parks improve neighbourhoods.’",
      options: [
        "I bought a new notebook yesterday.",
        "My favourite snack is popcorn.",
        "Some people prefer rainy weather.",
        "They provide shade and a place to rest, even in small spaces."
      ], answer: 3,
      points: 1,
      difficulty: "medium",
      explanation: "A supporting sentence should explain how pocket parks improve neighbourhoods."
    },
    {
      id: "q28",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct word: ____ going to be a test tomorrow.",
      options: ["There", "Their", "They're", "Them"], answer: 0,
      points: 1,
      difficulty: "easy",
      explanation: "Use ‘There’ to talk about something existing or happening."
    },
    {
      id: "q29",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the sentence with correct commas.",
      options: [
        "I packed apples bananas and oranges.",
        "I packed apples, bananas, and oranges.",
        "I packed apples, bananas and, oranges.",
        "I packed, apples bananas, and oranges."
      ], answer: 1,
      points: 1,
      difficulty: "medium",
      explanation: "Commas separate items in a list."
    },
    {
      id: "q30",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: I finished early; ____, I helped my partner.",
      answer: ["so", "as a result"],
      acceptedAnswers: ["so", "as a result"],
      points: 1,
      difficulty: "hard",
      explanation: "These linkers show a result: finished early → helped partner."
    },
    {
      id: "q31",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best sentence to avoid repeating the noun.",
      options: [
        "The bike was new. The bike was very fast.",
        "The bike was new, the bike was very fast.",
        "The bike was new, and it was very fast.",
        "The bike was new. It it was very fast."
      ], answer: 2,
      points: 1,
      difficulty: "medium",
      explanation: "Use a pronoun (‘it’) to avoid repeating the noun."
    },
    {
      id: "q32",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best concluding sentence for a paragraph about exercise.",
      options: [
        "Yesterday I watched a movie.",
        "Exercise is a word with seven letters.",
        "My shoes are on the floor.",
        "In conclusion, regular exercise keeps your body strong and your mind focused."
      ], answer: 3,
      points: 1,
      difficulty: "easy",
      explanation: "A conclusion summarizes the main idea of the paragraph."
    },
    {
      id: "q33",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question:
        "Choose the best order for a polite email.\n\nA) Thank you for your time.\nB) Dear Mr. Tan,\nC) Could you please explain the homework?\nD) I missed class because I was sick.",
      options: ["B → D → C → A", "B → C → D → A", "D → B → C → A", "B → A → D → C"],
      answer: 0,
      points: 1,
      difficulty: "hard",
      explanation: "A polite email usually goes: greeting → reason → request/question → closing."
    },
    {
      id: "q34",
      type: "trueFalse",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Supporting sentences should relate to the topic sentence.",
      options: ["False", "True"], answer: 1,
      points: 1,
      difficulty: "easy",
      explanation: "Supporting sentences must develop the main idea introduced by the topic sentence."
    },
    {
      id: "q35",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the sentence with consistent tense.",
      options: [
        "I walk to school yesterday and I saw my friend.",
        "I walk to school yesterday and I see my friend.",
        "I walked to school yesterday and I saw my friend.",
        "I walked to school yesterday and I see my friend."
      ], answer: 2,
      points: 1,
      difficulty: "medium",
      explanation: "‘Yesterday’ needs past tense: walked, saw."
    },
    {
      id: "q36",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: I have ____ my project already.",
      answer: "finished",
      acceptedAnswers: ["finished"],
      points: 1,
      difficulty: "medium",
      explanation: "Present perfect uses ‘have’ + past participle: have finished."
    },
    {
      id: "q37",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best word for a formal email: I would like to ____ for your advice.",
      options: ["wanna ask", "ask politely", "ask kindly", "ask"], answer: 3,
      points: 1,
      difficulty: "medium",
      explanation: "‘Ask’ is clear and appropriate; ‘wanna’ is informal."
    },
    {
      id: "q38",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct sentence.",
      options: [
        "It's raining outside today.",
        "Its raining outside today.",
        "Its' raining outside today.",
        "Its raining, outside today."
      ], answer: 0,
      points: 1,
      difficulty: "medium",
      explanation: "‘It’s’ means ‘it is’."
    },
    {
      id: "q39",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: If it ____ tomorrow, we will stay inside.",
      answer: "rains",
      acceptedAnswers: ["rains"],
      points: 1,
      difficulty: "medium",
      explanation: "In the first conditional, use present simple after ‘if’: if it rains…"
    },
    {
      id: "q40",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best transition word: I enjoy science. For example, ____.",
      options: [
        "I forgot my pencil yesterday",
        "I often do experiments at home",
        "football is played on grass",
        "winter is my favourite season"
      ],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation: "An example should match the idea of enjoying science."
    },
    {
      id: "q41",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the correct preposition: I am interested ____ joining the art club.",
      options: ["on", "at", "in", "for"], answer: 2,
      points: 1,
      difficulty: "easy",
      explanation: "We say ‘interested in’."
    },
    {
      id: "q42",
      type: "trueFalse",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "A summary should include every small detail from the original text.",
      options: ["True", "False"],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation: "A summary focuses on the main ideas, not every detail."
    },
    {
      id: "q43",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the best way to join the sentences: The girl is my cousin. She won the race.",
      options: [
        "The girl who won the race is my cousin.",
        "The girl is my cousin she won the race.",
        "The girl is my cousin, she won the race.",
        "The girl won the race, and she my cousin."
      ],
      answer: 0,
      points: 1,
      difficulty: "hard",
      explanation: "A relative clause (‘who won the race’) joins the ideas correctly."
    },
    {
      id: "q44",
      type: "fillInTheBlank",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Fill in the missing word: Please ____ your name at the top of the page.",
      answer: "write",
      acceptedAnswers: ["write"],
      points: 1,
      difficulty: "easy",
      explanation: "‘Write your name’ is the correct instruction."
    },
    {
      id: "q45",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Choose the most polite request.",
      options: [
        "Give me the worksheet now.",
        "Could you please give me the worksheet when you have time?",
        "Can you give me the worksheet?",
        "Worksheet."
      ], answer: 1,
      points: 1,
      difficulty: "medium",
      explanation: "Using ‘Could you please…’ sounds more polite and respectful."
    },
    {
      id: "q46",
      type: "multipleChoice",
      passage: "Use the sentence and nearby prompt details to choose the best answer.",
      question: "Which sentence uses a comma correctly after an introductory word?",
      options: [
        "However I still finished my work.",
        "However I still, finished my work.",
        "However, I still finished my work.",
        "However, I still, finished my work."
      ], answer: 2,
      points: 1,
      difficulty: "medium",
      explanation: "A comma usually follows transition words at the beginning of a sentence."
    },

    // -----------------------------
    // Writing tasks (auto-checkable requirements + rubric guidance) — Additional practice
    // -----------------------------
    {
      id: "q47",
      type: "prompt",
      question:
        "Write an email to the school librarian to reserve a book you want to borrow.\n\nInclude:\n• a greeting\n• the book title\n• a reason you want the book\n• ONE question\n• a polite closing\n\nWrite 70–110 words.",
      difficulty: "medium",
      explanation: "Be polite and clear. Include the book title and your question.",
      rubric: {
        checks: [
          { id: "minWords", label: "70+ words", type: "minWords", value: 70 },
          { id: "maxWords", label: "110 words or fewer", type: "maxWords", value: 110 },
          {
            id: "hasGreeting",
            label: "Has a greeting (Dear/Hi/Hello)",
            type: "includesAny",
            value: ["dear", "hi", "hello"]
          },
          {
            id: "mentionsReserve",
            label: "Mentions reserving/borrowing",
            type: "includesAny",
            value: ["reserve", "borrow", "hold"]
          },
          {
            id: "hasQuestion",
            label: "Includes at least 1 question mark (?)",
            type: "minCharCount",
            value: { char: "?", min: 1 }
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
              meets: "Clear greeting, purpose, question, and closing.",
              developing: "Some parts are unclear or missing.",
              needsWork: "Hard to follow; missing key parts."
            }
          },
          {
            name: "Language Accuracy",
            descriptors: {
              meets: "Mostly correct sentences and polite tone.",
              developing: "Some errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q48",
      type: "essay",
      question:
        "Write ONE paragraph answering this question:\n\nShould students have homework every day?\n\nUse this structure (include the exact starters):\n• In my opinion, …\n• First, …\n• Also, …\n• Finally, …\n\nWrite 90–140 words.",
      difficulty: "hard",
      explanation: "Give a clear opinion and support it with reasons.",
      rubric: {
        checks: [
          { id: "minWords", label: "90+ words", type: "minWords", value: 90 },
          { id: "maxWords", label: "140 words or fewer", type: "maxWords", value: 140 },
          {
            id: "includesStarters",
            label: "Includes all starters (In my opinion / First / Also / Finally)",
            type: "includesAll",
            value: ["in my opinion", "first", "also", "finally"]
          },
          { id: "endsPunct", label: "Ends with punctuation (. ! ?)", type: "endsWithAny", value: [".", "!", "?"] }
        ],
        criteria: [
          {
            name: "Task Completion",
            descriptors: {
              meets: "Clear opinion with at least 2 reasons.",
              developing: "Opinion is present but reasons are weak or unclear.",
              needsWork: "Does not answer the question clearly."
            }
          },
          {
            name: "Cohesion",
            descriptors: {
              meets: "Ideas connect smoothly with simple linking words.",
              developing: "Some linking, but connections are sometimes unclear.",
              needsWork: "Ideas feel disconnected or confusing."
            }
          }
        ]
      }
    },
    {
      id: "q49",
      type: "prompt",
      question:
        "Write instructions: How to prepare for a class presentation.\n\nInclude the exact words:\n• First, …\n• Next, …\n• Then, …\n• Finally, …\n\nWrite 80–120 words.",
      difficulty: "medium",
      explanation: "Use clear steps and simple, helpful advice.",
      rubric: {
        checks: [
          { id: "minWords", label: "80+ words", type: "minWords", value: 80 },
          { id: "maxWords", label: "120 words or fewer", type: "maxWords", value: 120 },
          {
            id: "includesSteps",
            label: "Includes First / Next / Then / Finally",
            type: "includesAll",
            value: ["first", "next", "then", "finally"]
          },
          { id: "endsPunct", label: "Ends with punctuation (. ! ?)", type: "endsWithAny", value: [".", "!", "?"] }
        ],
        criteria: [
          {
            name: "Clarity",
            descriptors: {
              meets: "Steps are easy to follow and clearly written.",
              developing: "Some steps are unclear or missing details.",
              needsWork: "Instructions are confusing or incomplete."
            }
          },
          {
            name: "Language",
            descriptors: {
              meets: "Uses correct imperatives and simple vocabulary.",
              developing: "Some grammar errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q50",
      type: "essay",
      question:
        "Write ONE paragraph about this statement:\n\nSchool uniforms are a good idea.\n\nUse this structure (include the exact starters):\n• I agree/disagree that …\n• One reason is …\n• Another reason is …\n• In conclusion, …\n\nWrite 90–140 words.",
      difficulty: "hard",
      explanation: "State your position and give two reasons.",
      rubric: {
        checks: [
          { id: "minWords", label: "90+ words", type: "minWords", value: 90 },
          { id: "maxWords", label: "140 words or fewer", type: "maxWords", value: 140 },
          {
            id: "includesStarters",
            label: "Includes all starters (agree/disagree / One reason is / Another reason is / In conclusion)",
            type: "includesAll",
            value: ["agree", "one reason is", "another reason is", "in conclusion"]
          },
          { id: "endsPunct", label: "Ends with punctuation (. ! ?)", type: "endsWithAny", value: [".", "!", "?"] }
        ],
        criteria: [
          {
            name: "Arguments",
            descriptors: {
              meets: "Two clear reasons support the position.",
              developing: "Reasons are present but not well explained.",
              needsWork: "Reasons are missing or unrelated."
            }
          },
          {
            name: "Cohesion",
            descriptors: {
              meets: "Uses linking words and logical order.",
              developing: "Some linking, but ideas may jump.",
              needsWork: "Ideas are hard to follow."
            }
          }
        ]
      }
    },
    {
      id: "q51",
      type: "prompt",
      question:
        "Write a short story. Start with this exact sentence:\n\nThe map had one sentence written in red ink.\n\nInclude ALL of these words somewhere: suddenly, carefully, at last.\nWrite 120–170 words.",
      difficulty: "hard",
      explanation: "Use past tense and build a clear sequence of events.",
      rubric: {
        checks: [
          { id: "minWords", label: "120+ words", type: "minWords", value: 120 },
          { id: "maxWords", label: "170 words or fewer", type: "maxWords", value: 170 },
          {
            id: "startsWith",
            label: "Starts with the required first sentence",
            type: "startsWith",
            value: "the map had one sentence written in red ink"
          },
          {
            id: "requiredWords",
            label: "Includes suddenly / carefully / at last",
            type: "includesAll",
            value: ["suddenly", "carefully", "at last"]
          }
        ],
        criteria: [
          {
            name: "Story Development",
            descriptors: {
              meets: "Clear beginning, middle, and ending.",
              developing: "Events are mostly clear, but ending is weak.",
              needsWork: "Story is confusing or incomplete."
            }
          },
          {
            name: "Grammar",
            descriptors: {
              meets: "Mostly correct past tense and sentences.",
              developing: "Some errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q52",
      type: "essay",
      passage:
        "A compost bucket can reduce waste at school by turning food scraps into soil. At first, students may throw the wrong items in, so clear signs and help from adults or volunteers are important. When the compost is ready, it can be used in gardens to grow plants.",
      question:
        "Write a summary of the text in 40–60 words. Include TWO key ideas.\n\nTip: Do not copy whole sentences.",
      difficulty: "medium",
      explanation: "Include the main purpose of composting and one important detail about how it works.",
      rubric: {
        checks: [
          { id: "minWords", label: "40+ words", type: "minWords", value: 40 },
          { id: "maxWords", label: "60 words or fewer", type: "maxWords", value: 60 },
          {
            id: "mentionsCompost",
            label: "Mentions compost/food scraps",
            type: "includesAny",
            value: ["compost", "food", "scrap", "soil"]
          },
          {
            id: "mentionsHelpOrGarden",
            label: "Mentions signs/help OR gardens/plants",
            type: "includesAny",
            value: ["sign", "help", "volunteer", "garden", "plant", "grow"]
          }
        ],
        criteria: [
          {
            name: "Summary Quality",
            descriptors: {
              meets: "Main idea + 1 detail in your own words.",
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
    },
    {
      id: "q53",
      type: "prompt",
      question:
        "Write a welcome message to a new student in your class.\n\nInclude:\n• a greeting\n• ONE question\n• TWO friendly suggestions using 'can' (for example: 'You can sit with us…')\n• a warm closing\n\nWrite 70–110 words.",
      difficulty: "medium",
      explanation: "Be friendly and supportive. Keep your message clear.",
      rubric: {
        checks: [
          { id: "minWords", label: "70+ words", type: "minWords", value: 70 },
          { id: "maxWords", label: "110 words or fewer", type: "maxWords", value: 110 },
          {
            id: "hasGreeting",
            label: "Has a greeting (Hi/Hello)",
            type: "includesAny",
            value: ["hi", "hello"]
          },
          {
            id: "mentionsWelcome",
            label: "Uses the word welcome",
            type: "includesAny",
            value: ["welcome"]
          },
          {
            id: "hasQuestion",
            label: "Includes at least 1 question mark (?)",
            type: "minCharCount",
            value: { char: "?", min: 1 }
          },
          {
            id: "usesCan",
            label: "Uses 'can' at least once",
            type: "includesAny",
            value: [" can "]
          },
          {
            id: "hasClosing",
            label: "Has a closing (From/See you/Best)",
            type: "includesAny",
            value: ["from", "see you", "best"]
          }
        ],
        criteria: [
          {
            name: "Tone",
            descriptors: {
              meets: "Warm, welcoming, and encouraging.",
              developing: "Mostly friendly but some parts feel unclear.",
              needsWork: "Not welcoming or hard to understand."
            }
          },
          {
            name: "Organization",
            descriptors: {
              meets: "Greeting, message, question, and closing are clear.",
              developing: "Some parts are missing or out of order.",
              needsWork: "Hard to follow."
            }
          }
        ]
      }
    },
    {
      id: "q54",
      type: "essay",
      question:
        "Write about a class trip you enjoyed. Write TWO short paragraphs.\n\nYou must include these headings exactly:\nParagraph 1: What happened\nParagraph 2: What I learned\n\nWrite 110–160 words.",
      difficulty: "medium",
      explanation: "Describe the trip clearly, then explain what you learned or how you felt.",
      rubric: {
        checks: [
          { id: "minWords", label: "110+ words", type: "minWords", value: 110 },
          { id: "maxWords", label: "160 words or fewer", type: "maxWords", value: 160 },
          {
            id: "hasHeadings",
            label: "Includes both headings (Paragraph 1 / Paragraph 2)",
            type: "includesAll",
            value: ["paragraph 1:", "paragraph 2:"]
          },
          { id: "endsPunct", label: "Ends with punctuation (. ! ?)", type: "endsWithAny", value: [".", "!", "?"] }
        ],
        criteria: [
          {
            name: "Content",
            descriptors: {
              meets: "Explains what happened and what was learned.",
              developing: "Covers both parts but one is weak.",
              needsWork: "Missing one part or unclear details."
            }
          },
          {
            name: "Organization",
            descriptors: {
              meets: "Two clear paragraphs with logical order.",
              developing: "Paragraphs exist but ideas may mix.",
              needsWork: "No clear paragraphing."
            }
          }
        ]
      }
    },
    {
      id: "q55",
      type: "prompt",
      question:
        "Write an email to your teacher apologizing for submitting homework late.\n\nInclude:\n• a greeting\n• an apology (sorry/apologize)\n• the reason\n• what you will do next\n• a polite closing\n\nWrite 70–110 words.",
      difficulty: "medium",
      explanation: "Be honest and polite. Explain what you will do next.",
      rubric: {
        checks: [
          { id: "minWords", label: "70+ words", type: "minWords", value: 70 },
          { id: "maxWords", label: "110 words or fewer", type: "maxWords", value: 110 },
          {
            id: "hasGreeting",
            label: "Has a greeting (Dear/Hi/Hello)",
            type: "includesAny",
            value: ["dear", "hi", "hello"]
          },
          {
            id: "hasApology",
            label: "Includes an apology (sorry/apologize)",
            type: "includesAny",
            value: ["sorry", "apolog"]
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
            name: "Appropriacy",
            descriptors: {
              meets: "Polite tone with clear reason and next step.",
              developing: "Tone is mostly polite but details are unclear.",
              needsWork: "Unclear message or inappropriate tone."
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
      id: "q56",
      type: "essay",
      question:
        "Write ONE persuasive paragraph: How can our school reduce plastic waste?\n\nYou must include these linking phrases exactly:\n• For example, …\n• As a result, …\n\nWrite 100–150 words.",
      difficulty: "hard",
      explanation: "Give practical suggestions and explain the result.",
      rubric: {
        checks: [
          { id: "minWords", label: "100+ words", type: "minWords", value: 100 },
          { id: "maxWords", label: "150 words or fewer", type: "maxWords", value: 150 },
          {
            id: "includesPhrases",
            label: "Includes ‘For example’ and ‘As a result’",
            type: "includesAll",
            value: ["for example", "as a result"]
          },
          { id: "endsPunct", label: "Ends with punctuation (. ! ?)", type: "endsWithAny", value: [".", "!", "?"] }
        ],
        criteria: [
          {
            name: "Persuasion",
            descriptors: {
              meets: "Clear suggestions with convincing explanations.",
              developing: "Some suggestions but reasons are unclear.",
              needsWork: "Few ideas or not persuasive."
            }
          },
          {
            name: "Cohesion",
            descriptors: {
              meets: "Ideas connect logically with linking words.",
              developing: "Some linking but flow is uneven.",
              needsWork: "Ideas are disconnected."
            }
          }
        ]
      }
    },
    {
      id: "q57",
      type: "prompt",
      question:
        "Write a short dialogue (conversation) between a student and a coach about joining a sports team.\n\nRequirements:\n• Use the speaker labels ‘Student:’ and ‘Coach:’\n• Include at least ONE question\n• Include a polite closing line\n\nWrite 90–140 words.",
      difficulty: "medium",
      explanation: "Make the conversation realistic and easy to follow.",
      rubric: {
        checks: [
          { id: "minWords", label: "90+ words", type: "minWords", value: 90 },
          { id: "maxWords", label: "140 words or fewer", type: "maxWords", value: 140 },
          {
            id: "hasLabels",
            label: "Includes Student: and Coach:",
            type: "includesAll",
            value: ["student:", "coach:"]
          },
          {
            id: "hasQuestion",
            label: "Includes at least 1 question mark (?)",
            type: "minCharCount",
            value: { char: "?", min: 1 }
          },
          {
            id: "hasPolite",
            label: "Includes a polite closing (thank you/thanks)",
            type: "includesAny",
            value: ["thank you", "thanks"]
          }
        ],
        criteria: [
          {
            name: "Dialogue",
            descriptors: {
              meets: "Speakers are clear and the conversation makes sense.",
              developing: "Mostly clear but some parts feel unrealistic.",
              needsWork: "Hard to follow or missing speaker labels."
            }
          },
          {
            name: "Language",
            descriptors: {
              meets: "Uses polite, correct sentences.",
              developing: "Some errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q58",
      type: "essay",
      passage:
        "Many students read on screens every day because screens are convenient and allow quick searching. However, notifications can interrupt concentration, and some readers focus better on paper. Some teachers suggest using screens for quick research but choosing paper for longer reading that needs deep attention.",
      question:
        "Write a summary of the text in 45–65 words. Include TWO key ideas.\n\nTip: Do not copy whole sentences.",
      difficulty: "medium",
      explanation: "Mention one advantage of screens and one reason paper can help.",
      rubric: {
        checks: [
          { id: "minWords", label: "45+ words", type: "minWords", value: 45 },
          { id: "maxWords", label: "65 words or fewer", type: "maxWords", value: 65 },
          {
            id: "mentionsScreen",
            label: "Mentions screens (screen/online/search)",
            type: "includesAny",
            value: ["screen", "online", "search"]
          },
          {
            id: "mentionsFocus",
            label: "Mentions focus/distraction OR paper",
            type: "includesAny",
            value: ["focus", "distract", "paper", "attention"]
          }
        ],
        criteria: [
          {
            name: "Summary Quality",
            descriptors: {
              meets: "Two key ideas are clear and mostly in your own words.",
              developing: "One idea is clear but the other is weak or copied.",
              needsWork: "Missing key ideas or too much copied."
            }
          },
          {
            name: "Clarity",
            descriptors: {
              meets: "Clear, readable sentences.",
              developing: "Some unclear parts but meaning is understandable.",
              needsWork: "Hard to understand."
            }
          }
        ]
      }
    },
    {
      id: "q59",
      type: "prompt",
      question:
        "Write a postcard to your cousin about a festival you visited.\n\nInclude ALL of these words somewhere: bright, loud, delicious.\nWrite 70–110 words.",
      difficulty: "medium",
      explanation: "Use descriptive language and a friendly tone.",
      rubric: {
        checks: [
          { id: "minWords", label: "70+ words", type: "minWords", value: 70 },
          { id: "maxWords", label: "110 words or fewer", type: "maxWords", value: 110 },
          {
            id: "requiredWords",
            label: "Includes bright / loud / delicious",
            type: "includesAll",
            value: ["bright", "loud", "delicious"]
          },
          {
            id: "hasGreeting",
            label: "Has a greeting (Hi/Hello/Dear)",
            type: "includesAny",
            value: ["hi", "hello", "dear"]
          }
        ],
        criteria: [
          {
            name: "Description",
            descriptors: {
              meets: "Clear details that help the reader imagine the festival.",
              developing: "Some details, but description is limited.",
              needsWork: "Very few details or unclear."
            }
          },
          {
            name: "Tone",
            descriptors: {
              meets: "Friendly and appropriate for a postcard.",
              developing: "Mostly friendly but a little unclear.",
              needsWork: "Tone is not friendly or not suitable."
            }
          }
        ]
      }
    },
    {
      id: "q60",
      type: "essay",
      question:
        "Write ONE paragraph answering this question:\n\nShould pets be allowed in apartments?\n\nUse these linking phrases exactly:\n• On the one hand, …\n• On the other hand, …\n• In my view, …\n\nWrite 100–150 words.",
      difficulty: "hard",
      explanation: "Show both sides, then give your opinion.",
      rubric: {
        checks: [
          { id: "minWords", label: "100+ words", type: "minWords", value: 100 },
          { id: "maxWords", label: "150 words or fewer", type: "maxWords", value: 150 },
          {
            id: "includesPhrases",
            label: "Includes all phrases (On the one hand / On the other hand / In my view)",
            type: "includesAll",
            value: ["on the one hand", "on the other hand", "in my view"]
          },
          { id: "endsPunct", label: "Ends with punctuation (. ! ?)", type: "endsWithAny", value: [".", "!", "?"] }
        ],
        criteria: [
          {
            name: "Balance",
            descriptors: {
              meets: "Mentions both sides and gives a clear opinion.",
              developing: "Two sides are present but opinion is weak.",
              needsWork: "Only one side or unclear opinion."
            }
          },
          {
            name: "Cohesion",
            descriptors: {
              meets: "Ideas connect logically and smoothly.",
              developing: "Some linking but flow is uneven.",
              needsWork: "Hard to follow."
            }
          }
        ]
      }
    },
    {
      id: "q61",
      type: "prompt",
      question:
        "Write a list of rules for group work in class.\n\nRequirements:\n• Write 5 rules\n• Number them 1–5\n• Use polite language (should / please)\n\nWrite 70–120 words.",
      difficulty: "medium",
      explanation: "Rules should be clear, positive, and easy to follow.",
      rubric: {
        checks: [
          { id: "minWords", label: "70+ words", type: "minWords", value: 70 },
          { id: "maxWords", label: "120 words or fewer", type: "maxWords", value: 120 },
          {
            id: "hasNumbers",
            label: "Includes 1, 2, 3, 4, 5",
            type: "includesAll",
            value: ["1", "2", "3", "4", "5"]
          },
          {
            id: "politeWords",
            label: "Uses polite language (please/should)",
            type: "includesAny",
            value: ["please", "should"]
          }
        ],
        criteria: [
          {
            name: "Practicality",
            descriptors: {
              meets: "Rules are useful and relevant to group work.",
              developing: "Some rules are useful but some are unclear.",
              needsWork: "Rules are not helpful or confusing."
            }
          },
          {
            name: "Language",
            descriptors: {
              meets: "Mostly correct grammar and clear wording.",
              developing: "Some errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q62",
      type: "essay",
      question:
        "Compare two hobbies you enjoy. Write TWO short paragraphs.\n\nYou must include these headings exactly:\nHobby A:\nHobby B:\n\nWrite 110–160 words.",
      difficulty: "medium",
      explanation: "Explain what you do in each hobby and why you like it.",
      rubric: {
        checks: [
          { id: "minWords", label: "110+ words", type: "minWords", value: 110 },
          { id: "maxWords", label: "160 words or fewer", type: "maxWords", value: 160 },
          {
            id: "hasHeadings",
            label: "Includes Hobby A and Hobby B headings",
            type: "includesAll",
            value: ["hobby a:", "hobby b:"]
          },
          { id: "endsPunct", label: "Ends with punctuation (. ! ?)", type: "endsWithAny", value: [".", "!", "?"] }
        ],
        criteria: [
          {
            name: "Comparison",
            descriptors: {
              meets: "Describes both hobbies clearly with at least one comparison.",
              developing: "Describes both, but comparison is weak.",
              needsWork: "One hobby is missing or unclear."
            }
          },
          {
            name: "Organization",
            descriptors: {
              meets: "Two paragraphs are clear and separate.",
              developing: "Paragraphs exist but ideas mix.",
              needsWork: "No clear paragraphing."
            }
          }
        ]
      }
    },
    {
      id: "q63",
      type: "prompt",
      question:
        "Write a short review of a place you visited (a park, café, museum, etc.).\n\nRequirements:\n• Start with ‘Rating:’ and give a score (for example: Rating: 4/5)\n• Include ONE reason using ‘because’\n• End with a recommendation\n\nWrite 80–120 words.",
      difficulty: "medium",
      explanation: "Include clear opinions and supporting reasons.",
      rubric: {
        checks: [
          { id: "minWords", label: "80+ words", type: "minWords", value: 80 },
          { id: "maxWords", label: "120 words or fewer", type: "maxWords", value: 120 },
          {
            id: "hasRating",
            label: "Starts with Rating:",
            type: "includesAny",
            value: ["rating:"]
          },
          {
            id: "hasBecause",
            label: "Uses ‘because’",
            type: "includesAny",
            value: ["because"]
          },
          {
            id: "hasRecommend",
            label: "Includes a recommendation (recommend / should visit)",
            type: "includesAny",
            value: ["recommend", "should visit", "you should"]
          }
        ],
        criteria: [
          {
            name: "Opinion + Support",
            descriptors: {
              meets: "Opinion is clear and supported with reasons.",
              developing: "Opinion is present but support is limited.",
              needsWork: "Opinion is unclear or unsupported."
            }
          },
          {
            name: "Language",
            descriptors: {
              meets: "Mostly correct sentences and clear meaning.",
              developing: "Some errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q64",
      type: "essay",
      question:
        "Write a formal letter to your principal about creating a quiet study room at school.\n\nYou must include these exact lines:\n• Dear Principal,\n• Yours sincerely,\n\nWrite 100–150 words.",
      difficulty: "hard",
      explanation: "Give clear reasons and a polite suggestion.",
      rubric: {
        checks: [
          { id: "minWords", label: "100+ words", type: "minWords", value: 100 },
          { id: "maxWords", label: "150 words or fewer", type: "maxWords", value: 150 },
          {
            id: "hasLines",
            label: "Includes Dear Principal and Yours sincerely",
            type: "includesAll",
            value: ["dear principal", "yours sincerely"]
          },
          {
            id: "hasRequest",
            label: "Mentions a request (please / could)",
            type: "includesAny",
            value: ["please", "could"]
          }
        ],
        criteria: [
          {
            name: "Formality",
            descriptors: {
              meets: "Formal tone with correct letter format.",
              developing: "Mostly formal but some informal language.",
              needsWork: "Not formal or missing key format parts."
            }
          },
          {
            name: "Organization",
            descriptors: {
              meets: "Clear purpose, reasons, and polite closing.",
              developing: "Some parts are unclear or missing.",
              needsWork: "Hard to follow."
            }
          }
        ]
      }
    },
    {
      id: "q65",
      type: "prompt",
      question:
        "Write a short story. Start with this exact sentence:\n\nI found a key in my pocket that wasn't mine.\n\nInclude ALL of these words somewhere: nervous, carefully, relieved.\nWrite 120–170 words.",
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
            value: "i found a key in my pocket that wasn't mine"
          },
          {
            id: "requiredWords",
            label: "Includes nervous / carefully / relieved",
            type: "includesAll",
            value: ["nervous", "carefully", "relieved"]
          }
        ],
        criteria: [
          {
            name: "Story Development",
            descriptors: {
              meets: "Clear events with a satisfying ending.",
              developing: "Events are mostly clear, but ending is weak.",
              needsWork: "Story is confusing or incomplete."
            }
          },
          {
            name: "Grammar",
            descriptors: {
              meets: "Mostly correct past tense and sentences.",
              developing: "Some tense errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    },
    {
      id: "q66",
      type: "essay",
      passage:
        "A group of students built a simple solar oven from a box. They used foil to reflect sunlight and plastic to trap warm air. After their first test warmed slowly, they tilted the box toward the sun and used a wind shield. The oven became hotter and was able to melt chocolate, even though it was not hot enough to bake bread.",
      question:
        "Write a summary of the text in 50–70 words. Include TWO key ideas.\n\nTip: Do not copy whole sentences.",
      difficulty: "medium",
      explanation: "Mention how the oven was built and what change improved it.",
      rubric: {
        checks: [
          { id: "minWords", label: "50+ words", type: "minWords", value: 50 },
          { id: "maxWords", label: "70 words or fewer", type: "maxWords", value: 70 },
          {
            id: "mentionsSolar",
            label: "Mentions solar/sunlight",
            type: "includesAny",
            value: ["solar", "sun", "sunlight"]
          },
          {
            id: "mentionsMaterials",
            label: "Mentions foil/plastic/heat",
            type: "includesAny",
            value: ["foil", "plastic", "heat", "warm"]
          }
        ],
        criteria: [
          {
            name: "Summary Quality",
            descriptors: {
              meets: "Two key ideas are clear and mostly in your own words.",
              developing: "One idea is clear but the other is weak or copied.",
              needsWork: "Missing key ideas or too much copied."
            }
          },
          {
            name: "Clarity",
            descriptors: {
              meets: "Clear, readable sentences.",
              developing: "Some unclear parts but overall meaning is understandable.",
              needsWork: "Hard to understand."
            }
          }
        ]
      }
    },
    {
      id: "q67",
      type: "prompt",
      question:
        "Write a paragraph (90–120 words) giving advice to a new student at your school. Include at least THREE tips and one reason using because.\n\nTip: Use linking words (First, Also, Finally).",
      difficulty: "medium",
      explanation: "Give clear tips and support one of them with a reason.",
      rubric: {
        checks: [
          { id: "minWords", label: "90+ words", type: "minWords", value: 90 },
          { id: "maxWords", label: "120 words or fewer", type: "maxWords", value: 120 },
          {
            id: "hasBecause",
            label: "Uses because",
            type: "includesAny",
            value: ["because"]
          },
          {
            id: "hasLinkers",
            label: "Uses linking words (First / Also / Finally)",
            type: "includesAny",
            value: ["first", "also", "finally"]
          }
        ],
        criteria: [
          {
            name: "Content",
            descriptors: {
              meets: "Three or more useful tips with at least one reason.",
              developing: "Two tips or tips are not specific.",
              needsWork: "Advice is unclear or missing."
            }
          },
          {
            name: "Language",
            descriptors: {
              meets: "Mostly correct sentences and polite advice.",
              developing: "Some errors but meaning is clear.",
              needsWork: "Many errors make meaning unclear."
            }
          }
        ]
      }
    }

  ];

  // Global export (no build step)


  // Added to normalize this bank to 111 items.
  QUESTIONS.push(
    {
      "id": "q68",
      "type": "multipleChoice",
      "question": "Choose the best thesis sentence for an essay about school uniforms.",
      "options": [
        "School uniforms are made of cloth.",
        "School uniforms can be useful because they reduce distraction and create a sense of belonging.",
        "Some students wear shoes to school.",
        "My bag is black and blue."
      ],
      "answer": 1,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q69",
      "type": "fillInTheBlank",
      "question": "Fill in the best linker: I wanted to join the club; ____, I had another class at the same time.",
      "answer": "however",
      "acceptedAnswers": [
        "however"
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q70",
      "type": "multipleChoice",
      "question": "Choose the best formal closing for an email.",
      "options": [
        "See ya!",
        "Write back soon!!!",
        "Best regards,",
        "Later,"
      ],
      "answer": 2,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q71",
      "type": "fillInTheBlank",
      "question": "True or False: A paragraph should usually stay focused on one main idea.",
      "answer": 1,
      "acceptedAnswers": [
        1
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q72",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: A sentence that explains your opinion is called a supporting ____.",
      "answer": "reason",
      "acceptedAnswers": [
        "reason"
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q73",
      "type": "multipleChoice",
      "question": "Choose the clearest topic sentence.",
      "options": [
        "Clean rivers are important because they protect wildlife and public health.",
        "Rivers have water and boats sometimes.",
        "I saw a river last summer.",
        "Many things in nature are interesting."
      ],
      "answer": 0,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q74",
      "type": "multipleChoice",
      "question": "Choose the best word: We should save electricity ____ it helps the environment.",
      "options": [
        "but",
        "because",
        "although",
        "unless"
      ],
      "answer": 1,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q75",
      "type": "fillInTheBlank",
      "question": "Fill in the best transition: ____, students should also learn how to manage time.",
      "answer": "in addition",
      "acceptedAnswers": [
        "in addition"
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q76",
      "type": "multipleChoice",
      "question": "Choose the sentence with correct punctuation.",
      "options": [
        "First we made a plan, then we started.",
        "First, we made a plan then we started",
        "first, we made a plan, then we started.",
        "First we made a plan then we started"
      ],
      "answer": 0,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q77",
      "type": "multipleChoice",
      "question": "Choose the best word order.",
      "options": [
        "Important is teamwork in projects.",
        "Teamwork is important in projects.",
        "Is teamwork important in projects.",
        "Teamwork important is in projects."
      ],
      "answer": 1,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q78",
      "type": "fillInTheBlank",
      "question": "True or False: A conclusion should repeat every detail from the body paragraphs.",
      "answer": 0,
      "acceptedAnswers": [
        0
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q79",
      "type": "fillInTheBlank",
      "question": "Fill in the best word: The writer should ____ both sides before giving an opinion.",
      "answer": "consider",
      "acceptedAnswers": [
        "consider"
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q80",
      "type": "multipleChoice",
      "question": "Choose the best sentence for a polite request.",
      "options": [
        "Can you please explain the last question again?",
        "Explain the question now.",
        "I don't get it, fix it.",
        "Tell me the answer."
      ],
      "answer": 0,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q81",
      "type": "fillInTheBlank",
      "question": "Fill in the missing word: A short title should be clear and ____.",
      "answer": "relevant",
      "acceptedAnswers": [
        "relevant"
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q82",
      "type": "multipleChoice",
      "question": "Choose the best evidence sentence.",
      "options": [
        "For example, our school library became busier after reading clubs started.",
        "Libraries are buildings and books are paper.",
        "I think books are good because yes.",
        "Many students know many things."
      ],
      "answer": 0,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q83",
      "type": "multipleChoice",
      "question": "Choose the most academic option.",
      "options": [
        "Many teenagers are keen to use shared study spaces.",
        "Lots of teens are super into shared study spaces.",
        "Teens kinda like study spaces.",
        "Shared study spaces are cool stuff."
      ],
      "answer": 0,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q84",
      "type": "fillInTheBlank",
      "question": "True or False: A topic sentence should introduce the paragraph's main idea.",
      "answer": 1,
      "acceptedAnswers": [
        1
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q85",
      "type": "fillInTheBlank",
      "question": "Fill in the best word: A strong paragraph needs a clear topic sentence and supporting ____.",
      "answer": "details",
      "acceptedAnswers": [
        "details"
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q86",
      "type": "multipleChoice",
      "question": "Choose the best transition for a result.",
      "options": [
        "as a result",
        "for example",
        "meanwhile",
        "in contrast"
      ],
      "answer": 0,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q87",
      "type": "multipleChoice",
      "question": "Choose the best sentence: One reason public parks matter is that they give children a safe place to play.",
      "options": [
        "One reason public parks matter is that they give children a safe place to play.",
        "Parks matter because parks matter.",
        "Public parks because children play.",
        "Children safe place parks play."
      ],
      "answer": 0,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q88",
      "type": "fillInTheBlank",
      "question": "Fill in the best word: A writer should ____ ideas before writing.",
      "answer": "organize",
      "acceptedAnswers": [
        "organize"
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q89",
      "type": "multipleChoice",
      "question": "Choose the best punctuation: Students should arrive early__ they can find their seats.",
      "options": [
        ";",
        ",",
        ".",
        ":"
      ],
      "answer": 1,
      "points": 1,
      "difficulty": "medium",
      "explanation": "Choose the strongest writing option."
    },
    {
      "id": "q90",
      "type": "fillInTheBlank",
      "question": "True or False: Every email to a teacher should begin with slang.",
      "answer": 0,
      "acceptedAnswers": [
        0
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q91",
      "type": "fillInTheBlank",
      "question": "Fill in the best word: To restate your view at the end is to write a clear ____.",
      "answer": "conclusion",
      "acceptedAnswers": [
        "conclusion"
      ],
      "points": 1,
      "difficulty": "medium",
      "explanation": "Write the key academic word."
    },
    {
      "id": "q92",
      "type": "prompt",
      "question": "Write an email to your principal suggesting one improvement for the school library. Include a greeting, your reason, and a polite closing. Write 90-140 words.",
      "difficulty": "hard",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q93",
      "type": "prompt",
      "question": "Write a paragraph explaining whether group projects are helpful for students. Include one example. Write 90-130 words.",
      "difficulty": "medium",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q94",
      "type": "prompt",
      "question": "Write a short article for younger students about how to prepare for a test. Write 100-150 words.",
      "difficulty": "hard",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q95",
      "type": "prompt",
      "question": "Write an email thanking a coach or teacher for helping you improve. Write 80-120 words.",
      "difficulty": "medium",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q96",
      "type": "prompt",
      "question": "Write a paragraph about one environmental problem in your area and one realistic solution. Write 90-140 words.",
      "difficulty": "hard",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q97",
      "type": "prompt",
      "question": "Write a message to a friend persuading them to join a school event. Write 80-120 words.",
      "difficulty": "medium",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q98",
      "type": "prompt",
      "question": "Write a short article about a skill schools should teach more often. Write 100-150 words.",
      "difficulty": "hard",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q99",
      "type": "prompt",
      "question": "Write a paragraph describing a memorable community activity you took part in. Write 90-130 words.",
      "difficulty": "medium",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q100",
      "type": "prompt",
      "question": "Write a short formal note asking for permission to use a classroom after school. Write 70-110 words.",
      "difficulty": "hard",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q101",
      "type": "prompt",
      "question": "Write a short opinion paragraph about whether homework should be different on weekends. Write 90-140 words.",
      "difficulty": "medium",
      "explanation": "Organize your ideas clearly and keep a polite tone when needed.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "80+ words",
            "type": "minWords",
            "value": 80
          },
          {
            "id": "usesLinker",
            "label": "Uses a linker (because/however/for example)",
            "type": "includesAny",
            "value": [
              "because",
              "however",
              "for example",
              "in addition"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Clear beginning, development, and ending.",
              "developing": "Mostly clear but uneven.",
              "needsWork": "Hard to follow."
            }
          },
          {
            "name": "Language Accuracy",
            "descriptors": {
              "meets": "Mostly correct sentences and punctuation.",
              "developing": "Some errors, meaning clear.",
              "needsWork": "Frequent errors."
            }
          }
        ]
      }
    },
    {
      "id": "q102",
      "type": "essay",
      "question": "Write one opinion essay: Should schools start later in the morning? Give reasons and examples. Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q103",
      "type": "essay",
      "question": "Write one opinion essay: Is it better for students to learn from mistakes or from examples? Explain. Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q104",
      "type": "essay",
      "question": "Write one opinion essay: Should every student take part in one community service activity each year? Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q105",
      "type": "essay",
      "question": "Write one opinion essay: Are school competitions more helpful or more stressful? Explain your view. Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q106",
      "type": "essay",
      "question": "Write one opinion essay: Should students have more choice in what they read in class? Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q107",
      "type": "essay",
      "question": "Write one opinion essay: Is online communication helping or hurting friendships? Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q108",
      "type": "essay",
      "question": "Write one opinion essay: Should schools spend more money on sports or on arts? Explain. Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q109",
      "type": "essay",
      "question": "Write one opinion essay: Is it important for teenagers to learn basic money skills early? Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q110",
      "type": "essay",
      "question": "Write one opinion essay: Should class presentations be done in groups or alone? Explain. Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    },
    {
      "id": "q111",
      "type": "essay",
      "question": "Write one opinion essay: Is travelling a good way for students to learn? Write 110-160 words.",
      "difficulty": "hard",
      "explanation": "State a clear opinion, give reasons, and support them with examples.",
      "rubric": {
        "checks": [
          {
            "id": "minWords",
            "label": "110+ words",
            "type": "minWords",
            "value": 110
          },
          {
            "id": "position",
            "label": "States a position",
            "type": "includesAny",
            "value": [
              "i think",
              "in my opinion",
              "i believe",
              "should"
            ]
          },
          {
            "id": "example",
            "label": "Includes an example",
            "type": "includesAny",
            "value": [
              "for example",
              "for instance",
              "such as"
            ]
          }
        ],
        "criteria": [
          {
            "name": "Ideas",
            "descriptors": {
              "meets": "Clear opinion with support.",
              "developing": "Opinion present but support is limited.",
              "needsWork": "Opinion unclear or unsupported."
            }
          },
          {
            "name": "Organization",
            "descriptors": {
              "meets": "Logical paragraph flow.",
              "developing": "Some structure but uneven.",
              "needsWork": "Weak organization."
            }
          }
        ]
      }
    }
  );
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
