/* assets/data/tests-iels-writing.js
   Question bank: IELTS Writing (original practice prompts)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "iels-writing"

   Runner selects 1 random Task 1 + 1 random Task 2 each time.
*/

(function () {
  "use strict";

  const SLUG = "iels-writing";

  const TASK1_RUBRIC = {
    criteria: [
      {
        name: "Task Achievement (Task 1)",
        descriptors: {
          "9": "Fully addresses all requirements; presents a clear overview; selects and compares key features appropriately.",
          "7": "Covers the main features and gives an overview; some details may be missing or slightly unclear.",
          "5": "Describes some data but may miss key features; overview may be unclear or absent."
        }
      },
      {
        name: "Coherence & Cohesion",
        descriptors: {
          "9": "Information is logically organised; paragraphs are clear; linking is natural and accurate.",
          "7": "Organisation is mostly clear; some linking may be mechanical or repetitive.",
          "5": "Organisation may be unclear; limited paragraphing or weak linking."
        }
      },
      {
        name: "Lexical Resource",
        descriptors: {
          "9": "Wide, precise vocabulary for trends and comparisons; few errors.",
          "7": "Good range for describing data; occasional awkward word choice.",
          "5": "Limited range; repetition; noticeable word choice/spelling errors."
        }
      },
      {
        name: "Grammar Range & Accuracy",
        descriptors: {
          "9": "Flexible, accurate structures; rare errors.",
          "7": "Mix of simple/complex structures; errors do not reduce understanding.",
          "5": "Mostly simple sentences; frequent errors may affect clarity."
        }
      }
    ]
  };

  const TASK2_RUBRIC = {
    criteria: [
      {
        name: "Task Response (Task 2)",
        descriptors: {
          "9": "Fully addresses all parts; clear position throughout; well-developed ideas with relevant support.",
          "7": "Addresses the task; position is clear; ideas are extended but may be uneven.",
          "5": "Partly addresses the task; position may be unclear; ideas may be underdeveloped."
        }
      },
      {
        name: "Coherence & Cohesion",
        descriptors: {
          "9": "Clear progression; strong paragraphing; cohesive devices are natural and accurate.",
          "7": "Logical progression; paragraphing works; some cohesion may be mechanical.",
          "5": "Weak progression; paragraphing may be limited; cohesion is sometimes confusing."
        }
      },
      {
        name: "Lexical Resource",
        descriptors: {
          "9": "Wide, precise vocabulary; natural collocations; rare errors.",
          "7": "Adequate range; occasional repetition or awkward phrasing.",
          "5": "Limited vocabulary; frequent repetition; errors may distract."
        }
      },
      {
        name: "Grammar Range & Accuracy",
        descriptors: {
          "9": "Varied complex structures; high accuracy.",
          "7": "Some complex structures; errors occur but meaning is clear.",
          "5": "Mostly simple structures; frequent errors reduce clarity."
        }
      }
    ]
  };

  const BANK = [
    // -----------------------------
    // Task 1 variants (Academic-style)
    // -----------------------------
    {
      id: "t1-v1",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The table below shows the percentage of households that owned three items (a car, a computer, and a dishwasher) in one country in 2000 and 2020.\n\n" +
        "Percent of households owning each item\n" +
        "• Car: 2000 = 62% | 2020 = 78%\n" +
        "• Computer: 2000 = 35% | 2020 = 92%\n" +
        "• Dishwasher: 2000 = 18% | 2020 = 54%\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v2",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The chart description below compares average daily time spent on four activities by teenagers in 2010 and 2022.\n\n" +
        "Average minutes per day\n" +
        "• Studying: 2010 = 70 | 2022 = 85\n" +
        "• Social media: 2010 = 25 | 2022 = 110\n" +
        "• Exercise: 2010 = 45 | 2022 = 35\n" +
        "• Part-time work: 2010 = 30 | 2022 = 20\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v3",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The diagram description below shows the stages in producing bottled orange juice.\n\n" +
        "Stages\n" +
        "1) Oranges are washed and sorted\n" +
        "2) Juice is extracted\n" +
        "3) Juice is filtered\n" +
        "4) It is pasteurised (heated briefly)\n" +
        "5) It is cooled and stored in tanks\n" +
        "6) Bottles are cleaned\n" +
        "7) Juice is bottled and sealed\n" +
        "8) Bottles are labelled and delivered to shops\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },

    // -----------------------------
    // Task 2 variants (Essay)
    // -----------------------------
    {
      id: "t2-v1",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Some people think governments should spend more money on public transport, while others believe the money should be used to build more roads.\n\n" +
        "Discuss both views and give your own opinion.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v2",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "In many countries, more and more people are choosing to work from home.\n\n" +
        "Do the advantages of working from home outweigh the disadvantages?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v3",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Some people say that schools should teach practical skills such as cooking and managing money, in addition to academic subjects.\n\n" +
        "To what extent do you agree or disagree?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    }
  ];

  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = BANK;
})();
