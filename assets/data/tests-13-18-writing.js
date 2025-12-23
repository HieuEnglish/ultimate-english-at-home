/* assets/data/tests-13-18-writing.js
   Question bank: Ages 13–18 • Writing (IELTS-inspired)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-13-18-writing"

   Notes:
   - Structured like IELTS Writing but easier:
     • Task 1 (report): describe data, highlight key features, make comparisons.
     • Task 2 (essay): give a clear opinion, support with reasons and examples.
   - Includes short objective items (linking, formality, grammar) before Tasks 1–2.
   - Essay items include rubric + auto-checkable requirements (word count + key phrases).
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-writing";

  const QUESTIONS = [
    // ------------------------------------------------------------
    // Quick skills check (objective)
    // ------------------------------------------------------------
    {
      id: "q1",
      type: "multipleChoice",
      question:
        "Which sentence best paraphrases this idea?\n\nTeenagers should be given more independence.",
      options: [
        "Teenagers must follow every rule without question.",
        "Teenagers should have more freedom to make their own choices.",
        "Teenagers are too young to make any decisions.",
        "Teenagers should stop depending on their families completely."
      ],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "Whereas (or while) is used to contrast two preferences in one sentence.",
    },
    {
      id: "q2",
      type: "fillInTheBlank",
      question:
        "Fill in the linking word to show contrast:\n\nSome students prefer online learning; ______ others enjoy classroom discussion.",
      answer: "whereas",
      acceptedAnswers: ["whereas", "while"],
      points: 1,
      difficulty: "easy",
      explanation:
        "Whereas (or while) is used to contrast two preferences in one sentence.",
    },
    {
      id: "q3",
      type: "multipleChoice",
      question:
        "Choose the most formal option for academic writing:",
      options: [
        "A lot of people are super into public transport these days.",
        "Many people are very interested in public transport nowadays.",
        "Loads of people love buses and trains now.",
        "People are kinda interested in public transport now."
      ],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "Academic writing avoids slang (super/loads/kinda) and uses neutral vocabulary."
    },
    {
      id: "q4",
      type: "trueFalse",
      question:
        "True or False: In IELTS-style Writing Task 1, you should give your personal opinion about the topic.",
      options: ["True", "False"],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "Task 1 is a report: describe what the data/process shows, not your opinion."
    },
    {
      id: "q5",
      type: "multipleChoice",
      question:
        "Choose the best topic sentence for a paragraph about using bicycles in cities:",
      options: [
        "Bicycles are good because they have wheels.",
        "Many cities are encouraging cycling because it reduces traffic and pollution.",
        "I rode a bicycle yesterday and it was fun.",
        "Some people like bicycles more than cars and buses."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "A topic sentence should be general and clearly introduce the main idea of the paragraph."
    },
    {
      id: "q6",
      type: "fillInTheBlank",
      question:
        "Complete the sentence with ONE word (noun):\n\nThere has been a significant ______ in the number of teenagers using social media.",
      answer: "increase",
      acceptedAnswers: ["increase", "rise", "growth"],
      points: 1,
      difficulty: "medium",
      explanation:
        "Increase, rise, and growth are common Task 1 nouns used to describe upward trends.",
    },
    {
      id: "q7",
      type: "multipleChoice",
      question:
        "Which sentence uses however correctly?",
      options: [
        "However many people prefer buses, trains are faster.",
        "Many people prefer buses however trains are faster.",
        "Many people prefer buses. However, trains are faster.",
        "Many people however prefer buses, trains are faster."
      ],
      answer: 2,
      points: 1,
      difficulty: "medium",
      explanation:
        "However is commonly used after a full stop (or semicolon) and followed by a comma.",
    },
    {
      id: "q8",
      type: "multipleChoice",
      question:
        "Which overview sentence best fits an IELTS-style Task 1 report about the data below?\n\nStudy time rose slightly, social media time rose sharply, exercise fell a little, and part-time work increased.",
      options: [
        "Overall, time spent on studying and part-time work increased, while exercise fell and social media use grew the most.",
        "Overall, teenagers like studying more than exercise.",
        "Overall, exercise is important for teenagers and should be encouraged.",
        "Overall, the data has many numbers which are difficult to understand."
      ],
      answer: 0,
      points: 1,
      difficulty: "medium",
      explanation:
        "An overview summarizes the main trends without opinions or small details."
    },
    {
      id: "q9",
      type: "multipleChoice",
      question:
        "Which sentence is the best concluding sentence for an opinion essay?",
      options: [
        "In conclusion, I strongly believe this change would benefit students and should be introduced gradually.",
        "In conclusion, this topic is interesting and there are many sides to it.",
        "In conclusion, that is what I think about it.",
        "In conclusion, students are students."
      ],
      answer: 0,
      points: 1,
      difficulty: "medium",
      explanation:
        "A strong conclusion restates your position clearly and may suggest a sensible recommendation."
    },
    {
      id: "q10",
      type: "multipleChoice",
      question:
        "Pick the best reason + example pair to support this claim:\n\nSchools should teach more practical life skills.",
      options: [
        "Because it is nice. For example, students like it.",
        "Because it helps students manage real situations. For example, budgeting lessons can teach teenagers how to plan spending and save money.",
        "Because teachers want it. For example, teachers can talk about it.",
        "Because life is long. For example, students have homework."
      ],
      answer: 1,
      points: 1,
      difficulty: "hard",
      explanation:
        "Strong support includes a clear reason and a specific, relevant example."
    },

    // ------------------------------------------------------------
    // IELTS-inspired Writing Tasks (free response)
    // ------------------------------------------------------------
    {
      id: "q11",
      type: "essay",
      task: "task1",
      question:
        "Writing Task 1 (Report)\n\nYou should spend about 20 minutes on this task.\nWrite at least 150 words.\n\nThe information below shows the average hours per week that 15–18-year-olds in one city spent on four activities in 2012 and 2024.\n\n• Studying: 12 hours (2012) → 14 hours (2024)\n• Part-time work: 6 hours (2012) → 8 hours (2024)\n• Social media: 10 hours (2012) → 18 hours (2024)\n• Exercise: 4 hours (2012) → 3 hours (2024)\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      difficulty: "hard",
      explanation:
        "Include an overview (main trends) and support it with a few key comparisons (biggest increase, smallest change, etc.). Do not add personal opinions.",
      rubric: {
        checks: [
          { id: "minWords", label: "150+ words", type: "minWords", value: 150 },
          { id: "maxWords", label: "190 words or fewer (recommended)", type: "maxWords", value: 190 },
          {
            id: "mentionsYears",
            label: "Mentions both years (2012 and 2024)",
            type: "includesAll",
            value: ["2012", "2024"]
          },
          {
            id: "overviewMarker",
            label: "Includes an overview marker (Overall / In general)",
            type: "includesAny",
            value: ["overall", "in general", "generally"]
          },
          {
            id: "comparisonWord",
            label: "Uses comparison/trend language (increase, decrease, higher, lower...)",
            type: "includesAny",
            value: ["increase", "increased", "rise", "rose", "grew", "growth", "decrease", "decreased", "fell", "higher", "lower", "more", "less"]
          }
        ],
        criteria: [
          {
            name: "Task Achievement",
            descriptors: {
              meets:
                "Covers all key features, provides a clear overview, and makes relevant comparisons.",
              developing:
                "Mentions main features but overview/comparisons are limited or unclear.",
              needsWork:
                "Focuses on details without a clear overview, or includes opinions/irrelevant ideas."
            }
          },
          {
            name: "Coherence & Cohesion",
            descriptors: {
              meets:
                "Information is grouped logically; linking words are accurate and varied.",
              developing:
                "Some organization is clear, but linking and paragraphing may be uneven.",
              needsWork:
                "Ideas are difficult to follow; weak paragraphing or linking."
            }
          },
          {
            name: "Lexical Resource",
            descriptors: {
              meets:
                "Uses a good range of trend/comparison vocabulary with few errors.",
              developing:
                "Some range of vocabulary; occasional repetition or word-choice errors.",
              needsWork:
                "Very limited vocabulary; frequent incorrect word choice."
            }
          },
          {
            name: "Grammar Range & Accuracy",
            descriptors: {
              meets:
                "Mix of simple and complex sentences; most grammar is accurate.",
              developing:
                "Some complex sentences but noticeable errors; meaning still clear.",
              needsWork:
                "Frequent grammar errors make meaning unclear."
            }
          }
        ]
      },
      resourceReference:
        "https://ielts.org/for-test-takers/how-is-ielts-scored"
    },
    {
      id: "q12",
      type: "essay",
      task: "task2",
      question:
        "Writing Task 2 (Essay)\n\nYou should spend about 40 minutes on this task.\nWrite at least 250 words.\n\nSome people believe schools should reduce traditional exams and use more continuous assessment (projects, presentations, and coursework).\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include relevant examples from your knowledge or experience.",
      difficulty: "hard",
      explanation:
        "State a clear opinion, use 2–3 main ideas, support each idea with explanation + example, and finish with a clear conclusion.",
      rubric: {
        checks: [
          { id: "minWords", label: "250+ words", type: "minWords", value: 250 },
          { id: "maxWords", label: "330 words or fewer (recommended)", type: "maxWords", value: 330 },
          {
            id: "positionMarker",
            label: "Shows a clear position (I believe / I agree / I disagree)",
            type: "includesAny",
            value: ["i believe", "i agree", "i disagree", "in my opinion", "i think"]
          },
          {
            id: "exampleMarker",
            label: "Includes at least one example marker (for example / for instance)",
            type: "includesAny",
            value: ["for example", "for instance", "such as"]
          },
          {
            id: "conclusionMarker",
            label: "Includes a conclusion marker (In conclusion / To conclude)",
            type: "includesAny",
            value: ["in conclusion", "to conclude", "to sum up", "overall,"]
          }
        ],
        criteria: [
          {
            name: "Task Response",
            descriptors: {
              meets:
                "Addresses the question fully with a clear position and well-supported main ideas.",
              developing:
                "Position is present but ideas may be repetitive, under-developed, or not fully relevant.",
              needsWork:
                "No clear position or ideas are not relevant; insufficient support."
            }
          },
          {
            name: "Coherence & Cohesion",
            descriptors: {
              meets:
                "Clear paragraphing; logical progression; cohesive devices used naturally.",
              developing:
                "Generally organized but linking/paragraphing may be mechanical or uneven.",
              needsWork:
                "Hard to follow; weak paragraphing; limited or inaccurate linking."
            }
          },
          {
            name: "Lexical Resource",
            descriptors: {
              meets:
                "Uses a wide range of vocabulary (education/assessment) with good precision.",
              developing:
                "Adequate vocabulary but with repetition or occasional incorrect word choice.",
              needsWork:
                "Very limited vocabulary; frequent word-choice errors."
            }
          },
          {
            name: "Grammar Range & Accuracy",
            descriptors: {
              meets:
                "Good mix of sentence structures; errors are minor and do not reduce clarity.",
              developing:
                "Some complex structures; noticeable errors but meaning is mostly clear.",
              needsWork:
                "Frequent errors make meaning unclear."
            }
          }
        ]
      },
      resourceReference:
        "https://ielts.org/for-test-takers/ielts-writing-test"
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
