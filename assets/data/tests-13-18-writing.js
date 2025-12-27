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
    },

    // ------------------------------------------------------------
    // Additional practice (objective + tasks)
    // ------------------------------------------------------------
    {
      id: "q13",
      type: "multipleChoice",
      question:
        "Which sentence best paraphrases this idea?\n\nYoung people spend too much time on their phones.",
      options: [
        "Young people should never use phones.",
        "Young people only use phones for study.",
        "Young people use their phones more than is necessary.",
        "Young people use phones mainly to call their parents."
      ],
      answer: 2,
      points: 1,
      difficulty: "easy",
      explanation:
        "A good paraphrase keeps the meaning (too much time) but changes the wording.",
    },
    {
      id: "q14",
      type: "fillInTheBlank",
      question:
        "Fill in the linking phrase to add an extra point:\n\nPublic transport is often cheaper; ______, it can reduce traffic in city centres.",
      answer: "moreover",
      acceptedAnswers: ["moreover", "in addition", "furthermore"],
      points: 1,
      difficulty: "easy",
      explanation:
        "Moreover / In addition / Furthermore are used to add another supporting point.",
    },
    {
      id: "q15",
      type: "multipleChoice",
      question:
        "Choose the most academic option:",
      options: [
        "A lot of students are really stressed about exams.",
        "Loads of students are stressed about exams.",
        "Many students feel stressed about exams.",
        "Students are kinda stressed about exams."
      ],
      answer: 2,
      points: 1,
      difficulty: "easy",
      explanation:
        "Academic writing prefers neutral words like 'many' and avoids slang (loads/kinda/really)."
    },
    {
      id: "q16",
      type: "trueFalse",
      question:
        "True or False: A clear overview is an important part of an IELTS-style Task 1 report.",
      options: ["True", "False"],
      answer: 0,
      points: 1,
      difficulty: "easy",
      explanation:
        "A Task 1 overview summarises the main trends or key features without small details."
    },
    {
      id: "q17",
      type: "multipleChoice",
      question:
        "Which sentence uses 'despite' correctly?",
      options: [
        "Despite the weather was bad, they played outside.",
        "Despite the bad weather, they played outside.",
        "Despite they played outside, the weather was bad.",
        "Despite of the bad weather, they played outside."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "Despite is followed by a noun phrase (despite the bad weather), not a full clause."
    },
    {
      id: "q18",
      type: "multipleChoice",
      question:
        "Choose the best way to describe a decrease:",
      options: [
        "The number of users rose from 60 to 40.",
        "The number of users fell from 60 to 40.",
        "The number of users grew down from 60 to 40.",
        "The number of users increased under 60 to 40."
      ],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "Use fell/decreased/dropped to describe downward movement."
    },
    {
      id: "q19",
      type: "fillInTheBlank",
      question:
        "Fill in the linking phrase to show result:\n\nTrain tickets became cheaper. ______, more people started travelling by rail.",
      answer: "consequently",
      acceptedAnswers: ["consequently", "as a result", "therefore"],
      points: 1,
      difficulty: "medium",
      explanation:
        "Consequently / As a result / Therefore show cause and effect."
    },
    {
      id: "q20",
      type: "multipleChoice",
      question:
        "Which introduction sentence is best for a Task 1 report?",
      options: [
        "I think the chart is interesting and I will talk about it.",
        "The table compares the percentages of commuters using three types of transport in 2005 and 2025.",
        "This report will explain why people choose different transport methods.",
        "Transport is important for modern life, especially in big cities."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "A Task 1 introduction should paraphrase what the data shows (what, where, when)."
    },
    {
      id: "q21",
      type: "multipleChoice",
      question:
        "Which overview sentence best fits these trends?\n\nPhone ownership increased a lot, laptop ownership increased slightly, and tablet ownership fell.",
      options: [
        "Overall, ownership of all devices increased dramatically.",
        "Overall, phone ownership rose strongly, while tablets became less common and laptops changed only a little.",
        "Overall, phones are better than laptops for teenagers.",
        "Overall, the figures for devices are confusing to read."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "A strong overview summarises the main directions (rise/fall) without opinions."
    },
    {
      id: "q22",
      type: "fillInTheBlank",
      question:
        "Complete the sentence with ONE word:\n\nThe ______ of households with internet access reached 90%.",
      answer: "percentage",
      acceptedAnswers: ["percentage", "proportion", "figure", "rate"],
      points: 1,
      difficulty: "easy",
      explanation:
        "Percentage/proportion/figure/rate are common nouns used to describe data in Task 1."
    },
    {
      id: "q23",
      type: "multipleChoice",
      question:
        "Choose the correct verb form:\n\nThe number of students who travel abroad ____ increasing each year.",
      options: ["are", "is", "were", "have"],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "The subject is 'the number' (singular), so use 'is'."
    },
    {
      id: "q24",
      type: "multipleChoice",
      question:
        "Choose the correctly punctuated sentence:",
      options: [
        "The library which is open 24 hours is popular with students.",
        "The library, which is open 24 hours, is popular with students.",
        "The library, which is open 24 hours is popular with students.",
        "The library which is open 24 hours, is popular with students."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "A non-defining relative clause is separated by commas: 'The library, which..., is...'."
    },
    {
      id: "q25",
      type: "fillInTheBlank",
      question:
        "Fill in a contrast linker:\n\nCar use rose during the period; ______, cycling declined.",
      answer: "in contrast",
      acceptedAnswers: ["in contrast", "by contrast", "however", "nevertheless"],
      points: 1,
      difficulty: "easy",
      explanation:
        "Contrast linkers show an opposing trend or idea."
    },
    {
      id: "q26",
      type: "multipleChoice",
      question:
        "Which sentence is the best thesis statement for an opinion essay?",
      options: [
        "This essay will talk about some ideas about the topic.",
        "In my opinion, governments should invest more in public transport because it reduces congestion and improves air quality.",
        "Public transport is interesting and there are many kinds.",
        "I will describe buses and trains in different countries."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "A thesis statement shows your position and gives the main reasons you will develop."
    },
    {
      id: "q27",
      type: "multipleChoice",
      question:
        "Choose the best topic sentence for a paragraph about volunteering:",
      options: [
        "Volunteering is something that some people do.",
        "Volunteering benefits communities by providing support for people who need help.",
        "I volunteered once and it was interesting.",
        "Volunteering can be hard and sometimes boring."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "A topic sentence should introduce the paragraph's main idea clearly and generally."
    },
    {
      id: "q28",
      type: "trueFalse",
      question:
        "True or False: Contractions (don't, can't) are recommended in formal academic writing.",
      options: ["True", "False"],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "Formal writing usually avoids contractions and uses full forms (do not, cannot)."
    },
    {
      id: "q29",
      type: "fillInTheBlank",
      question:
        "Replace the informal word in brackets with a more formal one:\n\nMany ______ (kids) benefit from regular exercise.",
      answer: "children",
      acceptedAnswers: ["children", "young people", "teenagers"],
      points: 1,
      difficulty: "easy",
      explanation:
        "Academic style avoids informal words like 'kids'."
    },
    {
      id: "q30",
      type: "multipleChoice",
      question:
        "Which sentence correctly describes this comparison?\n\nCar users: 40% | Bus users: 20%",
      options: [
        "There were twice as many car users as bus users.",
        "There were twice as many bus users as car users.",
        "Car users were half of bus users.",
        "Car users and bus users were the same."
      ],
      answer: 0,
      points: 1,
      difficulty: "easy",
      explanation:
        "40% is double 20%, so 'twice as many' is correct."
    },
    {
      id: "q31",
      type: "multipleChoice",
      question:
        "Which sentence is best for a process description (passive voice)?",
      options: [
        "First, you wash the bottles and then you cut them up.",
        "First, the bottles are washed, and then they are cut into small pieces.",
        "First, bottles wash and then cut into pieces.",
        "First, the bottles washed and then cutting them up."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "Process reports often use passive voice to focus on the steps, not the person doing them."
    },
    {
      id: "q32",
      type: "fillInTheBlank",
      question:
        "Fill in a sequencing word:\n\nFirst, the data is collected. ______, it is analysed to identify trends.",
      answer: "next",
      acceptedAnswers: ["next", "then", "after that"],
      points: 1,
      difficulty: "easy",
      explanation:
        "Sequencing words help the reader follow the order of steps."
    },
    {
      id: "q33",
      type: "trueFalse",
      question:
        "True or False: A separate conclusion paragraph is required in Task 1 reports.",
      options: ["True", "False"],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "Task 1 usually needs an introduction, overview, and detail paragraphs (a separate conclusion is not required)."
    },
    {
      id: "q34",
      type: "multipleChoice",
      question:
        "Pick the best reason + example pair to support this claim:\n\nReading regularly improves language skills.",
      options: [
        "Because reading is fun. For example, I like books.",
        "Because it exposes learners to vocabulary and grammar. For example, students who read articles often learn collocations they can use in writing.",
        "Because reading is old. For example, libraries exist.",
        "Because teachers say so. For example, teachers assign reading."
      ],
      answer: 1,
      points: 1,
      difficulty: "hard",
      explanation:
        "Strong support explains the reason and gives a specific example that matches the claim."
    },
    {
      id: "q35",
      type: "fillInTheBlank",
      question:
        "Complete the sentence with ONE adjective:\n\nThere was a ______ increase in the number of online shoppers over the period.",
      answer: "dramatic",
      acceptedAnswers: ["dramatic", "sharp", "significant"],
      points: 1,
      difficulty: "medium",
      explanation:
        "Use adjectives like dramatic/sharp/significant to describe big changes."
    },
    {
      id: "q36",
      type: "multipleChoice",
      question:
        "Which sentence best paraphrases this idea?\n\nGovernments should limit the use of private cars.",
      options: [
        "Governments should ban all transport.",
        "Governments ought to reduce how often people drive their own cars.",
        "Governments should make cars faster.",
        "Governments should encourage people to buy more cars."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "A paraphrase keeps the meaning (limit use) without adding extreme ideas (ban all transport)."
    },
    {
      id: "q37",
      type: "multipleChoice",
      question:
        "Which phrase is most accurate for describing shares in a pie chart?",
      options: [
        "It accounted for 35% of the total.",
        "It went up to 35 years old.",
        "It was 35 people taller.",
        "It increased under 35."
      ],
      answer: 0,
      points: 1,
      difficulty: "easy",
      explanation:
        "Use 'accounted for' to describe proportions of a whole."
    },
    {
      id: "q38",
      type: "fillInTheBlank",
      question:
        "Complete the sentence with ONE word:\n\nBus, car, and bicycle use were 30%, 50%, and 20% ______.",
      answer: "respectively",
      acceptedAnswers: ["respectively"],
      points: 1,
      difficulty: "medium",
      explanation:
        "Respectively shows that each figure matches the items in the same order."
    },
    {
      id: "q39",
      type: "multipleChoice",
      question:
        "Which sentence is correct?",
      options: [
        "Although public transport is cheaper, but many people still drive.",
        "Although public transport is cheaper, many people still drive.",
        "Although public transport is cheaper. Many people still drive.",
        "Although public transport cheaper, many people still drive."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "Do not use 'although' and 'but' together in the same structure."
    },
    {
      id: "q40",
      type: "multipleChoice",
      question:
        "Which sentence is best for academic tone (avoid overgeneralisation)?",
      options: [
        "Teenagers always waste time online.",
        "Teenagers never read books anymore.",
        "Many teenagers tend to spend a considerable amount of time online.",
        "Every teenager is addicted to social media."
      ],
      answer: 2,
      points: 1,
      difficulty: "medium",
      explanation:
        "Words like many/tend to help you avoid absolute claims (always/never/every)."
    },
    {
      id: "q41",
      type: "trueFalse",
      question:
        "True or False: In Task 2, each body paragraph should focus on one main idea.",
      options: ["True", "False"],
      answer: 0,
      points: 1,
      difficulty: "easy",
      explanation:
        "One clear main idea per paragraph makes your essay easier to follow and develop."
    },
    {
      id: "q42",
      type: "fillInTheBlank",
      question:
        "Fill in a phrase to introduce the opposite view:\n\nSome people prefer to study alone. ______, others learn better in groups.",
      answer: "on the other hand",
      acceptedAnswers: ["on the other hand"],
      points: 1,
      difficulty: "easy",
      explanation:
        "On the other hand is used to introduce an alternative or contrasting view."
    },
    {
      id: "q43",
      type: "multipleChoice",
      question:
        "Which sentence is most suitable for Task 1 (objective report)?",
      options: [
        "I believe the government should improve public transport immediately.",
        "The chart indicates that public transport use increased over the period.",
        "Public transport is the best option and everyone should use it.",
        "In my opinion, people who drive are selfish."
      ],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "Task 1 should describe the data objectively without personal opinions."
    },
    {
      id: "q44",
      type: "multipleChoice",
      question:
        "Choose the correct use of 'respectively':",
      options: [
        "The figures were 20 and 30 respectively percent.",
        "The figures were respectively 20% and 30%.",
        "The figures were 20% and 30%, respectively.",
        "The figures respectively were 20% and 30% and 40%."
      ],
      answer: 2,
      points: 1,
      difficulty: "hard",
      explanation:
        "Respectively is often placed after the list of figures to match them to items in order."
    },
    {
      id: "q45",
      type: "fillInTheBlank",
      question:
        "Complete the sentence with ONE noun:\n\nThere was a noticeable ______ in unemployment between 2015 and 2020.",
      answer: "decline",
      acceptedAnswers: ["decline", "drop", "decrease", "fall"],
      points: 1,
      difficulty: "medium",
      explanation:
        "Decline/drop/decrease/fall are common nouns for downward trends in Task 1."
    },
    {
      id: "q46",
      type: "multipleChoice",
      question:
        "Which sentence correctly compares two figures?",
      options: [
        "The 2024 figure was higher that the 2012 figure.",
        "The 2024 figure was higher than the 2012 figure.",
        "The 2024 figure was more higher than the 2012 figure.",
        "The 2024 figure was highest than the 2012 figure."
      ],
      answer: 1,
      points: 1,
      difficulty: "easy",
      explanation:
        "Use 'higher than' (not higher that / more higher / highest than)."
    },
    {
      id: "q47",
      type: "trueFalse",
      question:
        "True or False: It is best to paraphrase the task question in your introduction rather than copying it word-for-word.",
      options: ["True", "False"],
      answer: 0,
      points: 1,
      difficulty: "easy",
      explanation:
        "Paraphrasing shows language control and avoids repetition from the task."
    },
    {
      id: "q48",
      type: "multipleChoice",
      question:
        "Which opening sentence best paraphrases the task statement for an essay about remote work?",
      options: [
        "Working from home is cool and lots of people love it.",
        "These days, more employees are choosing to work from home instead of in traditional offices.",
        "I work from home and it is great for me.",
        "Remote work is when you work far away."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "A strong opening restates the topic formally and clearly without slang or personal stories."
    },
    {
      id: "q49",
      type: "fillInTheBlank",
      question:
        "Fill in a cause-and-effect linker:\n\nPublic transport was improved; ______, traffic congestion decreased.",
      answer: "therefore",
      acceptedAnswers: ["therefore", "as a result", "consequently"],
      points: 1,
      difficulty: "easy",
      explanation:
        "Therefore / As a result / Consequently connect a cause to its effect."
    },
    {
      id: "q50",
      type: "multipleChoice",
      question:
        "Choose the best collocation:",
      options: [
        "Technology plays a role in modern education.",
        "Technology plays a game in modern education.",
        "Technology plays a problem in modern education.",
        "Technology plays a reason in modern education."
      ],
      answer: 0,
      points: 1,
      difficulty: "easy",
      explanation:
        "'Play a role in' is a common academic collocation meaning 'be important in'."
    },
    {
      id: "q51",
      type: "multipleChoice",
      question:
        "Which sentence uses paragraph signposting correctly?",
      options: [
        "Firstly, I will describe my uncle. Secondly, I will finish.",
        "Firstly, I will discuss the main benefits. Secondly, I will consider the drawbacks.",
        "Firstly, benefits. Secondly, because. Finally, so.",
        "Firstly I will discuss benefits, second I will consider drawbacks."
      ],
      answer: 1,
      points: 1,
      difficulty: "medium",
      explanation:
        "Signposting should introduce clear content (benefits/drawbacks) using correct linking words."
    },
    {
      id: "q52",
      type: "fillInTheBlank",
      question:
        "Fill in a contrast linker:\n\nThe bus is slower than the train. ______, it is cheaper.",
      answer: "nevertheless",
      acceptedAnswers: ["nevertheless", "however", "still"],
      points: 1,
      difficulty: "medium",
      explanation:
        "Nevertheless / However / Still introduce a contrast with the previous statement."
    },

    // ------------------------------------------------------------
    // Additional IELTS-inspired Writing Tasks (free response)
    // ------------------------------------------------------------
    {
      id: "q53",
      type: "essay",
      task: "task1",
      question:
        "Writing Task 1 (Report)\n\nYou should spend about 20 minutes on this task.\nWrite at least 150 words.\n\nThe table below shows the percentage of commuters in one city who used three types of transport in 2005 and 2025.\n\n• Car: 55% (2005) → 40% (2025)\n• Bus: 30% (2005) → 35% (2025)\n• Bicycle: 15% (2005) → 25% (2025)\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      difficulty: "hard",
      explanation:
        "Write an overview (main changes) and compare key figures (largest fall/rise). Avoid opinions.",
      rubric: {
        checks: [
          { id: "minWords", label: "150+ words", type: "minWords", value: 150 },
          { id: "maxWords", label: "190 words or fewer (recommended)", type: "maxWords", value: 190 },
          {
            id: "mentionsYears",
            label: "Mentions both years (2005 and 2025)",
            type: "includesAll",
            value: ["2005", "2025"]
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
        ]
      }
    },
    {
      id: "q54",
      type: "essay",
      task: "task1",
      question:
        "Writing Task 1 (Report)\n\nYou should spend about 20 minutes on this task.\nWrite at least 150 words.\n\nThe information below shows the average minutes per day that 13–18-year-olds spent on four activities in 2010 and 2022.\n\nAverage minutes per day\n• Studying: 80 (2010) → 75 (2022)\n• Gaming: 35 (2010) → 55 (2022)\n• Social media: 30 (2010) → 120 (2022)\n• Exercise: 50 (2010) → 40 (2022)\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      difficulty: "hard",
      explanation:
        "Focus on overall trends (biggest increase, decreases) and compare key numbers clearly.",
      rubric: {
        checks: [
          { id: "minWords", label: "150+ words", type: "minWords", value: 150 },
          { id: "maxWords", label: "190 words or fewer (recommended)", type: "maxWords", value: 190 },
          {
            id: "mentionsYears",
            label: "Mentions both years (2010 and 2022)",
            type: "includesAll",
            value: ["2010", "2022"]
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
        ]
      }
    },
    {
      id: "q55",
      type: "essay",
      task: "task1",
      question:
        "Writing Task 1 (Report)\n\nYou should spend about 20 minutes on this task.\nWrite at least 150 words.\n\nThe diagram description below shows how plastic bottles are recycled at a community recycling centre.\n\nStages\n1) Bottles are collected in bins\n2) They are sorted by type and colour\n3) Bottles are crushed and shredded\n4) The pieces are washed and dried\n5) Plastic is melted and formed into pellets\n6) Pellets are used to make new products\n\nSummarise the information by selecting and reporting the main features.",
      difficulty: "hard",
      explanation:
        "Describe the process in order using sequencing language (first/next/finally) and mostly passive voice.",
      rubric: {
        checks: [
          { id: "minWords", label: "150+ words", type: "minWords", value: 150 },
          { id: "maxWords", label: "190 words or fewer (recommended)", type: "maxWords", value: 190 },
          {
            id: "overviewMarker",
            label: "Includes an overview marker (Overall / In general)",
            type: "includesAny",
            value: ["overall", "in general", "generally"]
          },
          {
            id: "sequenceMarker",
            label: "Uses sequencing words (first, next, then, finally)",
            type: "includesAny",
            value: ["first", "next", "then", "after that", "finally"]
          },
          {
            id: "processWord",
            label: "Uses process language (stage, process, step)",
            type: "includesAny",
            value: ["process", "stage", "step"]
          }
        ]
      }
    },
    {
      id: "q56",
      type: "essay",
      task: "task1",
      question:
        "Writing Task 1 (Report)\n\nYou should spend about 20 minutes on this task.\nWrite at least 150 words.\n\nThe descriptions below show changes to a school campus between 2015 and 2025.\n\nIn 2015:\n• A small library was in the centre\n• There was one sports field in the north\n• A car park was next to the entrance (east)\n\nBy 2025:\n• The library was expanded and a study area was added\n• A new gym was built beside the sports field\n• The car park was replaced by a bicycle parking area\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      difficulty: "hard",
      explanation:
        "Give an overview of the biggest changes and compare what was replaced, expanded, or added.",
      rubric: {
        checks: [
          { id: "minWords", label: "150+ words", type: "minWords", value: 150 },
          { id: "maxWords", label: "190 words or fewer (recommended)", type: "maxWords", value: 190 },
          {
            id: "mentionsYears",
            label: "Mentions both years (2015 and 2025)",
            type: "includesAll",
            value: ["2015", "2025"]
          },
          {
            id: "overviewMarker",
            label: "Includes an overview marker (Overall / In general)",
            type: "includesAny",
            value: ["overall", "in general", "generally"]
          },
          {
            id: "changeWord",
            label: "Uses change language (replaced, expanded, added, built)",
            type: "includesAny",
            value: ["replaced", "expanded", "added", "built", "constructed"]
          }
        ]
      }
    },
    {
      id: "q57",
      type: "essay",
      task: "task1",
      question:
        "Writing Task 1 (Report)\n\nYou should spend about 20 minutes on this task.\nWrite at least 150 words.\n\nThe information below shows the percentage of electricity produced from four sources in one country in 2000 and 2020.\n\n• Coal: 55% (2000) → 30% (2020)\n• Gas: 20% (2000) → 25% (2020)\n• Wind/Solar: 5% (2000) → 25% (2020)\n• Hydro: 20% (2000) → 20% (2020)\n\nSummarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      difficulty: "hard",
      explanation:
        "Highlight the main shift (coal down, renewables up) and compare stable vs changing sources.",
      rubric: {
        checks: [
          { id: "minWords", label: "150+ words", type: "minWords", value: 150 },
          { id: "maxWords", label: "190 words or fewer (recommended)", type: "maxWords", value: 190 },
          {
            id: "mentionsYears",
            label: "Mentions both years (2000 and 2020)",
            type: "includesAll",
            value: ["2000", "2020"]
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
        ]
      }
    },
    {
      id: "q58",
      type: "essay",
      task: "task2",
      question:
        "Writing Task 2 (Essay)\n\nYou should spend about 40 minutes on this task.\nWrite at least 250 words.\n\nSome people believe social media does more harm than good for teenagers, while others think it has important benefits.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include relevant examples from your knowledge or experience.",
      difficulty: "hard",
      explanation:
        "Discuss both sides (risks vs benefits) and clearly state your opinion, supported with examples.",
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
        ]
      }
    },
    {
      id: "q59",
      type: "essay",
      task: "task2",
      question:
        "Writing Task 2 (Essay)\n\nYou should spend about 40 minutes on this task.\nWrite at least 250 words.\n\nMany cities are introducing car-free zones in their centres to reduce pollution and congestion.\n\nDo the advantages of this development outweigh the disadvantages?\n\nGive reasons for your answer and include relevant examples from your knowledge or experience.",
      difficulty: "hard",
      explanation:
        "Compare advantages (cleaner air, safer streets) and disadvantages (access, business impact) and decide which is stronger.",
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
        ]
      }
    },
    {
      id: "q60",
      type: "essay",
      task: "task2",
      question:
        "Writing Task 2 (Essay)\n\nYou should spend about 40 minutes on this task.\nWrite at least 250 words.\n\nSome people believe university education should be free for everyone, while others think students should pay tuition fees.\n\nTo what extent do you agree or disagree?\n\nGive reasons for your answer and include relevant examples from your knowledge or experience.",
      difficulty: "hard",
      explanation:
        "State your opinion clearly and develop 2–3 main reasons. Use examples (e.g., funding, fairness, motivation).",
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
        ]
      }
    },
    {
      id: "q61",
      type: "essay",
      task: "task2",
      question:
        "Writing Task 2 (Essay)\n\nYou should spend about 40 minutes on this task.\nWrite at least 250 words.\n\nIn many schools, students are required to wear uniforms.\n\nDiscuss both views and give your own opinion.\n\nGive reasons for your answer and include relevant examples from your knowledge or experience.",
      difficulty: "hard",
      explanation:
        "Discuss benefits (equality, discipline) and drawbacks (freedom, cost), then give your opinion with clear reasons.",
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
        ]
      }
    },
    {
      id: "q62",
      type: "essay",
      task: "task2",
      question:
        "Writing Task 2 (Essay)\n\nYou should spend about 40 minutes on this task.\nWrite at least 250 words.\n\nArtificial intelligence (AI) tools are increasingly used by students to help with homework and learning.\n\nWhat problems might this cause, and what solutions can schools and families use to reduce these problems?\n\nGive reasons for your answer and include relevant examples from your knowledge or experience.",
      difficulty: "hard",
      explanation:
        "Identify 2–3 problems (e.g., dependence, plagiarism, weaker thinking) and give practical solutions (rules, guidance, skill training).",
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
        ]
      }
    }

  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
