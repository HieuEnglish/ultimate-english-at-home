/* assets/data/tests-8-10-writing.js
   Question bank: Ages 8–10 • Writing

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-8-10-writing"

   Content notes:
   - Short, age-appropriate writing tasks.
   - Mix of objective items (capitalization, punctuation, grammar) and prompts (paragraphs, emails, stories).
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-writing";

  const QUESTIONS = [
    // --- Objective: punctuation / grammar / word choice ---
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
      explanation: "A question needs a question mark."
    },
    {
      id: "q5",
      type: "multipleChoice",
      question: "Choose the correct verb: Yesterday, we ____ to the museum.",
      options: ["go", "goes", "went", "going"],
      answer: 2,
      difficulty: "easy",
      explanation: "Yesterday shows the past. The past tense of go is went."
    },
    {
      id: "q6",
      type: "fillInTheBlank",
      question: "Fill in the word: Please ____ the door quietly.",
      answer: ["close", "shut"],
      acceptedAnswers: ["close", "shut"],
      difficulty: "easy",
      explanation: "Close (or shut) means to move the door to the closed position."
    },
    {
      id: "q7",
      type: "multipleChoice",
      question: "Which word is spelled correctly?",
      options: ["becaus", "because", "becose", "beacuse"],
      answer: 1,
      difficulty: "easy",
      explanation: "Because is the correct spelling."
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
        "To school I walked.",
        "I walked to school.",
        "I to school walked.",
        "Walked I to school."
      ],
      answer: 1,
      difficulty: "medium",
      explanation: "The natural order is Subject + Verb + Object/Place."
    },
    {
      id: "q10",
      type: "fillInTheBlank",
      question: "Fill in the plural word: One child, two ____.",
      answer: ["children"],
      acceptedAnswers: ["children"],
      difficulty: "medium",
      explanation: "Child becomes children in the plural."
    },
    {
      id: "q11",
      type: "multipleChoice",
      question: "Choose the best ending: We turned off the lights and ____.",
      options: ["go to bed", "went to bed", "going to bed", "goes to bed"],
      answer: 1,
      difficulty: "medium",
      explanation: "Turned is past tense, so the next verb should be past: went."
    },
    {
      id: "q12",
      type: "fillInTheBlank",
      question: "Fill in the sequencing word: ____, wash your hands. Next, dry them.",
      answer: ["first"],
      acceptedAnswers: ["first"],
      difficulty: "easy",
      explanation: "First shows the first step."
    },
    {
      id: "q13",
      type: "multipleChoice",
      question: "Choose the best linking word: I was tired, ____ I went to bed early.",
      options: ["because", "so", "but", "or"],
      answer: 1,
      difficulty: "easy",
      explanation: "So shows a result."
    },
    {
      id: "q14",
      type: "multipleChoice",
      question: "Choose the correct pronoun: Sara and I went to the shop. ____ bought ice cream.",
      options: ["He", "She", "We", "They"],
      answer: 2,
      difficulty: "easy",
      explanation: "Sara and I = we."
    },
    {
      id: "q15",
      type: "multipleChoice",
      question: "Choose the best word: I wanted to play outside, ____ it started to rain.",
      options: ["because", "but", "so", "and"],
      answer: 1,
      difficulty: "easy",
      explanation: "But shows a contrast."
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
      question: "Describe this scene in 4–6 sentences: A sunny park with a lake, two children feeding ducks, and a person riding a bike.",
      model: "In the park, I can see ____. The weather is ____.",
      difficulty: "medium",
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
        "Write a short story (5–8 sentences). Start with: 'When I opened the old book, a map fell out…' Include a problem and a solution.",
      model: "When I opened the old book, ____. Then ____.",
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
      explanation: "Keep events in order. End with a solution."
    },
    {
      id: "q22",
      type: "prompt",
      question:
        "Do you think students should have homework every day? Write 4–6 sentences and give at least two reasons.",
      model: "I think ____. First, ____. Also, ____. Because ____.",
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
      explanation: "State your opinion and support it with reasons."
    },
    {
      id: "q23",
      type: "prompt",
      question:
        "Write a postcard from a trip. Include: where you are, the weather, and one activity you did.",
      model: "Dear ____,\nI am in ____. The weather is ____. Today I ____.\nFrom, ____",
      difficulty: "medium",
      rubric: {
        minWords: 40,
        minSentences: 4,
        criteria: {
          organization: "Greeting + details + closing",
          ideas: "Place + weather + activity",
          language: "Simple past or present tense used correctly",
          punctuation: "Capitals, commas, end punctuation"
        }
      },
      explanation: "Include all three details: place, weather, activity."
    },
    {
      id: "q24",
      type: "prompt",
      question:
        "Write a short dialogue (at least 4 lines) between two friends planning a game after school. Use questions.",
      model: "A: Do you want to ____?\nB: Yes, I can ____.\nA: What time ____?\nB: ____.",
      difficulty: "hard",
      rubric: {
        minWords: 35,
        minSentences: 4,
        mustIncludeAny: [["?"], ["do you", "can you", "what time"]],
        criteria: {
          organization: "Lines labeled A/B (or names)",
          ideas: "Plan + time + place",
          language: "Question forms are correct",
          punctuation: "Question marks for questions"
        }
      },
      explanation: "Use at least two questions with question marks."
    },
    {
      id: "q25",
      type: "prompt",
      passage:
        "Our class started a recycling project. We put new bins in the hallway for paper, plastic, and cans. After two weeks, we collected many items and the room looked cleaner. The teacher said our project helped the school.",
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
        "Write a short review of a book or movie you know. Give it a rating out of 5 stars and explain why.",
      model: "I watched/read ____. It was ____. I give it ____/5 stars because ____.",
      difficulty: "medium",
      rubric: {
        minWords: 45,
        minSentences: 4,
        mustIncludeAny: [["/5", "stars"]],
        criteria: {
          organization: "Title + opinion + rating + reason",
          ideas: "At least 2 details about what you liked/didn't like",
          language: "Clear sentences",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Include the title, your rating, and at least one reason."
    },

    // --- Extra objective items ---
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

    // --- Added questions (append-only) ---
    ,
    {
      id: "q29",
      type: "multipleChoice",
      question: "Choose the best concluding sentence for a paragraph about keeping a classroom clean.",
      options: [
        "That is why cleaning is important.",
        "Some students like pizza.",
        "My pencil is blue.",
        "Yesterday was Tuesday."
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "A concluding sentence wraps up the main idea."
    },
    {
      id: "q30",
      type: "multipleChoice",
      question: "Choose the correct punctuation: I can't wait to see the show__",
      options: [
        ".",
        "?",
        "!",
        ","
      ],
      answer: 2,
      difficulty: "easy",
      explanation: "An exclamation mark (!) shows strong excitement."
    },
    {
      id: "q31",
      type: "multipleChoice",
      question: "Choose the best title for a paragraph about a class recycling project.",
      options: [
        "Our Recycling Project",
        "My New Shoes",
        "A Scary Movie",
        "Winter Holidays"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "A title should match the topic of the paragraph."
    },
    {
      id: "q32",
      type: "multipleChoice",
      question: "Choose the correct verb: Yesterday, I ____ my grandma.",
      options: [
        "visit",
        "visited",
        "visiting",
        "visits"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "Yesterday shows the past, so use visited."
    },
    {
      id: "q33",
      type: "multipleChoice",
      question: "Choose the correct subject-verb pair: My friends ____ to the park.",
      options: [
        "go",
        "goes",
        "going",
        "wentted"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Friends is plural, so we say go."
    },
    {
      id: "q34",
      type: "multipleChoice",
      question: "Choose the best word: I like ice cream, ____ I don't eat it every day.",
      options: [
        "and",
        "but",
        "because",
        "so"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "But shows a contrast."
    },
    {
      id: "q35",
      type: "multipleChoice",
      question: "Choose the correct word: Please put the books ____ the shelf.",
      options: [
        "on",
        "in",
        "at",
        "to"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "We put books on a shelf."
    },
    {
      id: "q36",
      type: "multipleChoice",
      question: "Choose the correct word: ____ going to the museum on Saturday.",
      options: [
        "Their",
        "There",
        "They're",
        "Theirs"
      ],
      answer: 2,
      difficulty: "hard",
      explanation: "They're means 'they are'."
    },
    {
      id: "q37",
      type: "multipleChoice",
      question: "Choose the best sentence.",
      options: [
        "we went to the beach.",
        "We went to the beach",
        "We went to the beach.",
        "We Went to the beach."
      ],
      answer: 2,
      difficulty: "easy",
      explanation: "A correct sentence starts with a capital letter and ends with a full stop."
    },
    {
      id: "q38",
      type: "multipleChoice",
      question: "Choose the correct pronoun: This is Anna. ____ is my cousin.",
      options: [
        "He",
        "She",
        "They",
        "We"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "Use she for a girl/woman."
    },
    {
      id: "q39",
      type: "multipleChoice",
      question: "Choose the best word: The puppy was very ____ (cute).",
      options: [
        "slowly",
        "cute",
        "cuteness",
        "cutely"
      ],
      answer: 1,
      difficulty: "medium",
      explanation: "We need an adjective to describe the puppy."
    },
    {
      id: "q40",
      type: "multipleChoice",
      question: "Choose the sentence with correct commas in a list.",
      options: [
        "I bought apples bananas and grapes.",
        "I bought apples, bananas and grapes.",
        "I bought apples, bananas, and grapes.",
        "I bought apples bananas, and grapes."
      ],
      answer: 2,
      difficulty: "medium",
      explanation: "Use commas to separate items in a list."
    },
    {
      id: "q41",
      type: "multipleChoice",
      question: "Choose the best transition word: First, mix the flour. ____, add the water.",
      options: [
        "Finally",
        "Next",
        "Because",
        "Suddenly"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "Next shows the next step."
    },
    {
      id: "q42",
      type: "multipleChoice",
      question: "Choose the correct sentence with an apostrophe.",
      options: [
        "Its raining today.",
        "It's raining today.",
        "Its' raining today.",
        "It s raining today."
      ],
      answer: 1,
      difficulty: "hard",
      explanation: "It's means 'it is'."
    },
    {
      id: "q43",
      type: "multipleChoice",
      question: "Choose the best word order.",
      options: [
        "Always I brush my teeth.",
        "I always brush my teeth.",
        "I brush my teeth always.",
        "Brush my teeth I always."
      ],
      answer: 1,
      difficulty: "medium",
      explanation: "In English, 'always' usually comes before the main verb."
    },
    {
      id: "q44",
      type: "multipleChoice",
      question: "Choose the best closing for a friendly letter.",
      options: [
        "Because I said so.",
        "Sincerely, Your teacher",
        "From, your friend",
        "The end."
      ],
      answer: 2,
      difficulty: "medium",
      explanation: "A friendly letter/message often ends with a closing like 'From,'."
    },
    {
      id: "q45",
      type: "multipleChoice",
      question: "Choose the correct question word: ____ is your favourite subject?",
      options: [
        "What",
        "When",
        "Where",
        "Why"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "We ask 'What is your favourite subject?'."
    },
    {
      id: "q46",
      type: "multipleChoice",
      question: "Choose the best sentence to add a reason.",
      options: [
        "I like reading.",
        "I like reading because it is relaxing.",
        "I like reading so it is relaxing.",
        "Because I like reading."
      ],
      answer: 1,
      difficulty: "medium",
      explanation: "Use because to give a reason in the same sentence."
    },
    {
      id: "q47",
      type: "multipleChoice",
      question: "Choose the correct comparative: This puzzle is ____ than the last one.",
      options: [
        "hard",
        "harder",
        "hardest",
        "more hard"
      ],
      answer: 1,
      difficulty: "medium",
      explanation: "Harder compares two things."
    },
    {
      id: "q48",
      type: "multipleChoice",
      question: "Choose the best ending: After the storm, the sky became ____.",
      options: [
        "clear",
        "clearly",
        "clears",
        "cleared"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "We need an adjective: clear."
    },
    {
      id: "q49",
      type: "fillInTheBlank",
      question: "Fill in the linking word: I wore a jacket ____ it was cold.",
      answer: [
        "because"
      ],
      acceptedAnswers: [
        "because"
      ],
      difficulty: "easy",
      explanation: "Because gives the reason."
    },
    {
      id: "q50",
      type: "fillInTheBlank",
      question: "Fill in the best word: I wanted to play, ____ it started to rain.",
      answer: [
        "but"
      ],
      acceptedAnswers: [
        "but"
      ],
      difficulty: "easy",
      explanation: "But shows a contrast."
    },
    {
      id: "q51",
      type: "fillInTheBlank",
      question: "Fill in the sequencing word: First, open the box. ____, take out the toy.",
      answer: [
        "then"
      ],
      acceptedAnswers: [
        "then"
      ],
      difficulty: "easy",
      explanation: "Then shows the next step."
    },
    {
      id: "q52",
      type: "fillInTheBlank",
      question: "Write the contraction for 'cannot':",
      answer: [
        "can't",
        "cant"
      ],
      acceptedAnswers: [
        "can't",
        "cant"
      ],
      difficulty: "medium",
      explanation: "Cannot becomes can't."
    },
    {
      id: "q53",
      type: "fillInTheBlank",
      question: "Fill in the correct past tense: Today I walk. Yesterday I ____.",
      answer: [
        "walked"
      ],
      acceptedAnswers: [
        "walked"
      ],
      difficulty: "easy",
      explanation: "Add -ed for regular past tense: walked."
    },
    {
      id: "q54",
      type: "fillInTheBlank",
      question: "Fill in the plural: One leaf, two ____.",
      answer: [
        "leaves"
      ],
      acceptedAnswers: [
        "leaves"
      ],
      difficulty: "hard",
      explanation: "Leaf changes to leaves in the plural."
    },
    {
      id: "q55",
      type: "fillInTheBlank",
      question: "Fill in the word: My brother and I ____ going to the park.",
      answer: [
        "are"
      ],
      acceptedAnswers: [
        "are"
      ],
      difficulty: "medium",
      explanation: "With 'my brother and I' (we), use are."
    },
    {
      id: "q56",
      type: "fillInTheBlank",
      question: "Fill in the word: Please write ____ (not messy).",
      answer: [
        "neatly"
      ],
      acceptedAnswers: [
        "neatly"
      ],
      difficulty: "medium",
      explanation: "Neatly means with clean handwriting."
    },
    {
      id: "q57",
      type: "fillInTheBlank",
      question: "Fill in the possessive: This is my ____ book. (the book of my sister)",
      answer: [
        "sister's"
      ],
      acceptedAnswers: [
        "sister's"
      ],
      difficulty: "hard",
      explanation: "Sister's shows the book belongs to one sister."
    },
    {
      id: "q58",
      type: "fillInTheBlank",
      question: "Fill in the word: I ____ (feel) excited about the trip.",
      answer: [
        "feel"
      ],
      acceptedAnswers: [
        "feel"
      ],
      difficulty: "easy",
      explanation: "Use the base verb: feel."
    },
    {
      id: "q59",
      type: "trueFalse",
      question: "A paragraph should have a topic sentence that tells the main idea.",
      options: [
        "True",
        "False"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "A topic sentence helps the reader understand the paragraph."
    },
    {
      id: "q60",
      type: "trueFalse",
      question: "In dialogue, we use quotation marks around the words someone says.",
      options: [
        "True",
        "False"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Quotation marks show spoken words in writing."
    },
    {
      id: "q61",
      type: "trueFalse",
      question: "A full stop (.) is used at the end of a question.",
      options: [
        "True",
        "False"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "Questions end with a question mark (?)."
    },
    {
      id: "q62",
      type: "prompt",
      question: "Write a paragraph (5–7 sentences) about your favourite place. Include: where it is, what you see, and how you feel there.",
      model: "My favourite place is ____. It is ____. I can see ____. I feel ____ there.",
      difficulty: "easy",
      rubric: {
        minWords: 55,
        minSentences: 5,
        criteria: {
          ideas: "Clear place + at least 3 details (where/what/feelings)",
          organization: "Topic sentence + details + ending",
          language: "Simple correct grammar and spelling",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Start with a topic sentence. End with a finishing sentence."
    },
    {
      id: "q63",
      type: "prompt",
      question: "Write instructions (4–6 sentences): How to take care of a pet (dog, cat, fish, etc.). Use sequencing words (First/Next/Then/Finally).",
      model: "First, ____. Next, ____. Then, ____. Finally, ____.",
      difficulty: "medium",
      rubric: {
        minWords: 40,
        minSentences: 4,
        mustIncludeAny: [
          [
            "first"
          ],
          [
            "next"
          ],
          [
            "then"
          ],
          [
            "finally"
          ]
        ],
        criteria: {
          organization: "Steps are in the correct order",
          clarity: "Each step is easy to understand",
          language: "Uses action verbs (feed, clean, walk)",
          punctuation: "Commas after sequencing words"
        }
      },
      explanation: "Use short steps. Include food, safety, and cleaning."
    },
    {
      id: "q64",
      type: "prompt",
      question: "Write a short diary entry (4–6 sentences) about a day you felt proud.",
      model: "Dear Diary,\nToday I ____.\nI felt proud because ____.\nFrom, ____",
      difficulty: "medium",
      rubric: {
        minWords: 45,
        minSentences: 4,
        mustIncludeAny: [
          [
            "dear"
          ],
          [
            "because"
          ]
        ],
        criteria: {
          ideas: "What happened + why you felt proud",
          organization: "Diary greeting + events + feeling",
          language: "Past tense where needed",
          punctuation: "Capitals, commas, full stops"
        }
      },
      explanation: "Explain what you did and why it mattered."
    },
    {
      id: "q65",
      type: "prompt",
      question: "Write a story (6–9 sentences) about a lost item that you find again. Include: where you lost it and how you found it.",
      model: "I lost my ____. I looked ____. Then I ____.",
      difficulty: "hard",
      rubric: {
        minWords: 70,
        minSentences: 6,
        criteria: {
          organization: "Beginning + problem + solution + ending",
          ideas: "Where/when + actions + feelings",
          language: "Past tense verbs (lost, looked, found)",
          punctuation: "Clear sentences with capitals and full stops"
        }
      },
      explanation: "Keep events in time order. Use then/after that."
    },
    {
      id: "q66",
      type: "prompt",
      question: "Write a short opinion paragraph (4–6 sentences): Should kids have a bedtime on school nights? Give two reasons.",
      model: "I think kids should/should not ____. First, ____. Also, ____. In conclusion, ____.",
      difficulty: "hard",
      rubric: {
        minWords: 55,
        minSentences: 4,
        mustIncludeAny: [
          [
            "first",
            "also",
            "because",
            "for example"
          ]
        ],
        criteria: {
          ideas: "Clear opinion + at least 2 reasons",
          organization: "Uses linking words and an ending sentence",
          language: "Correct simple grammar",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "State your opinion clearly and support it with reasons."
    },
    {
      id: "q67",
      type: "prompt",
      question: "Write a description (4–6 sentences) of a rainy day. Use at least three describing words (adjectives).",
      model: "It was a ____ day. The sky was ____. I felt ____.",
      difficulty: "easy",
      rubric: {
        minWords: 40,
        minSentences: 4,
        criteria: {
          ideas: "Weather + what you see/hear + feelings",
          organization: "Separate sentences with clear meaning",
          language: "Uses adjectives (grey, wet, loud)",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Use describing words to make your writing clear."
    },
    {
      id: "q68",
      type: "prompt",
      question: "Write a friendly message to invite a friend to your house. Include: what you will do, when, and a closing.",
      model: "Hi ____!\nDo you want to ____ on ____?\nWe can ____.\nFrom, ____",
      difficulty: "medium",
      rubric: {
        minWords: 35,
        minSentences: 3,
        mustIncludeAny: [
          [
            "hi",
            "hello"
          ],
          [
            "from",
            "bye",
            "see you"
          ]
        ],
        criteria: {
          organization: "Greeting + invite + closing",
          ideas: "At least 2 details (when/what)",
          language: "Simple correct sentences",
          punctuation: "Capitals, commas, end punctuation"
        }
      },
      explanation: "Be polite and include a clear time or day."
    },
    {
      id: "q69",
      type: "prompt",
      question: "Write a short dialogue (at least 6 lines) between a customer and a shopkeeper buying a gift.",
      model: "Customer: Hello.\nShopkeeper: Hi! Can I help you?\nCustomer: I want ____.\nShopkeeper: ____.\nCustomer: ____.\nShopkeeper: ____.",
      difficulty: "hard",
      rubric: {
        minWords: 55,
        minSentences: 6,
        criteria: {
          organization: "Clear speaker labels and turns",
          ideas: "Gift + price or colour/size + ending",
          language: "Uses polite phrases (please, thank you)",
          punctuation: "Colons and sentence punctuation"
        }
      },
      explanation: "Use Customer/Shopkeeper on each line. Add please and thank you."
    },
    {
      id: "q70",
      type: "prompt",
      question: "Write a summary (2–4 sentences) of this paragraph:\n\n\"Our class started a reading challenge. We read for 15 minutes every day and wrote one sentence about each book. After two weeks, many students said reading felt easier and more fun.\"",
      model: "The class ____. They ____.",
      difficulty: "medium",
      rubric: {
        minWords: 30,
        minSentences: 2,
        criteria: {
          ideas: "Main idea (reading challenge) + one key detail",
          concision: "Short and focused",
          language: "Clear sentences",
          punctuation: "Capitals and full stops"
        }
      },
      explanation: "Use your own words. Do not copy the whole paragraph."
    },
    {
      id: "q71",
      type: "prompt",
      question: "Write a paragraph (5–7 sentences) about a small act of kindness you did or saw. Include: who, what happened, and the result.",
      model: "One day, I ____. I helped ____. After that, ____.",
      difficulty: "medium",
      rubric: {
        minWords: 55,
        minSentences: 5,
        criteria: {
          ideas: "Who/what/why + result",
          organization: "Events in order",
          language: "Past tense where needed",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Explain the result (how someone felt or what changed)."
    },
    {
      id: "q72",
      type: "prompt",
      question: "Write a compare paragraph (4–6 sentences): Compare cats and dogs. Include one similarity and two differences.",
      model: "Cats and dogs are both ____. Cats ____, but dogs ____. Also, ____.",
      difficulty: "hard",
      rubric: {
        minWords: 55,
        minSentences: 4,
        mustIncludeAny: [
          [
            "both"
          ],
          [
            "but"
          ]
        ],
        criteria: {
          ideas: "1 similarity + 2 differences",
          organization: "Uses comparing words (both, but)",
          language: "Clear sentences",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Use both and but to compare."
    },
    {
      id: "q73",
      type: "prompt",
      question: "Write a short book or movie review (5–7 sentences). Include: the title, what it is about, and your rating out of 5 stars.",
      model: "I watched/read ____. It is about ____. I liked ____. I give it ____/5 stars.",
      difficulty: "medium",
      rubric: {
        minWords: 60,
        minSentences: 5,
        mustIncludeAny: [
          [
            "stars",
            "/5"
          ]
        ],
        criteria: {
          ideas: "Title + short summary + opinion + rating",
          organization: "Sentences in a clear order",
          language: "Uses opinion words (fun, exciting, boring)",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Explain one reason for your rating."
    },
    {
      id: "q74",
      type: "prompt",
      question: "Write a paragraph (4–6 sentences) that includes one question. Topic: Your dream weekend.",
      model: "My dream weekend is ____. I will ____. What about you?",
      difficulty: "hard",
      rubric: {
        minWords: 45,
        minSentences: 4,
        mustIncludeAny: [
          [
            "?"
          ]
        ],
        criteria: {
          ideas: "Plans + details (where/with who/what)",
          organization: "Clear sentences",
          language: "Future words (will, going to)",
          punctuation: "Includes a correct question mark"
        }
      },
      explanation: "Include at least one question sentence with a question mark."
    },
    {
      id: "q75",
      type: "prompt",
      question: "Write an ending to this story (4–6 sentences):\n\n\"Nora heard a strange sound outside her window. She grabbed a flashlight and walked slowly to the door.\"",
      model: "Nora ____.",
      difficulty: "hard",
      rubric: {
        minWords: 50,
        minSentences: 4,
        criteria: {
          organization: "Clear ending with a solution",
          ideas: "Explains the sound and what happens next",
          language: "Past tense verbs",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Decide what made the sound and how the story ends."
    },
    {
      id: "q76",
      type: "prompt",
      question: "Write a set of classroom rules (4–6 sentences). Use must or mustn't at least twice.",
      model: "We must ____. We mustn't ____. We must ____.",
      difficulty: "hard",
      rubric: {
        minWords: 40,
        minSentences: 4,
        mustIncludeAny: [
          [
            "must"
          ],
          [
            "mustn't",
            "mustnt"
          ]
        ],
        criteria: {
          ideas: "At least 4 clear rules",
          organization: "One rule per sentence",
          language: "Uses must/mustn't correctly",
          punctuation: "Capitals and full stops"
        }
      },
      explanation: "Keep rules short and clear. Use must/mustn't."
    },
    {
      id: "q77",
      type: "prompt",
      question: "Write a short paragraph (5–7 sentences) explaining how to stay safe during a storm.",
      model: "During a storm, you should ____. Also, ____.",
      difficulty: "medium",
      rubric: {
        minWords: 55,
        minSentences: 5,
        mustIncludeAny: [
          [
            "because",
            "so"
          ]
        ],
        criteria: {
          ideas: "At least 3 safety tips with reasons",
          organization: "Tips are clear and separate",
          language: "Uses should for advice",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Give advice and include a reason using because or so."
    },
    {
      id: "q78",
      type: "prompt",
      question: "Write a 5–7 sentence paragraph with a clear topic sentence and a concluding sentence. Topic: Why reading is helpful.",
      model: "Reading is helpful because ____. First, ____. Also, ____. In conclusion, ____.",
      difficulty: "hard",
      rubric: {
        minWords: 60,
        minSentences: 5,
        mustIncludeAny: [
          [
            "first"
          ],
          [
            "also"
          ],
          [
            "in conclusion"
          ]
        ],
        criteria: {
          ideas: "Topic sentence + at least 2 reasons + concluding sentence",
          organization: "Logical order with linking words",
          language: "Correct simple grammar",
          punctuation: "Capitals and end punctuation"
        }
      },
      explanation: "Start with the main idea. End by restating your point in a new way."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
