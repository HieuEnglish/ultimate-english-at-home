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
    },

    // -----------------------------
    // Task 1 variants (Academic-style) — Added
    // -----------------------------
    {
      id: "t1-v4",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The line chart description below shows the percentage of electricity generated from four sources in one country between 2005 and 2025.\n\n" +
        "Percent of electricity generation\n" +
        "• Coal: 2005 = 55% | 2010 = 48% | 2015 = 40% | 2020 = 32% | 2025 = 25%\n" +
        "• Gas: 2005 = 20% | 2010 = 22% | 2015 = 24% | 2020 = 23% | 2025 = 20%\n" +
        "• Wind: 2005 = 5% | 2010 = 10% | 2015 = 16% | 2020 = 22% | 2025 = 28%\n" +
        "• Solar: 2005 = 2% | 2010 = 4% | 2015 = 8% | 2020 = 15% | 2025 = 22%\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v5",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The bar chart description below shows the number of commuters using four transport modes in a city in 2012 and 2022.\n\n" +
        "Number of commuters (thousands)\n" +
        "• Bus: 2012 = 38 | 2022 = 44\n" +
        "• Train: 2012 = 22 | 2022 = 35\n" +
        "• Car: 2012 = 55 | 2022 = 48\n" +
        "• Bicycle: 2012 = 12 | 2022 = 20\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v6",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The pie chart descriptions below show how an average household spent its monthly budget in 1995 and 2025.\n\n" +
        "Percent of monthly spending\n" +
        "1995: Housing 25% | Food 20% | Transport 15% | Utilities 10% | Leisure 10% | Savings 20%\n" +
        "2025: Housing 32% | Food 15% | Transport 12% | Utilities 8% | Leisure 13% | Savings 20%\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v7",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The map descriptions below show changes to a small town centre between 2000 and 2020.\n\n" +
        "2000\n" +
        "• A central square with a fountain\n" +
        "• A bus station on the north side\n" +
        "• Two small car parks (east and west)\n" +
        "• A row of shops on the south side\n\n" +
        "2020\n" +
        "• The bus station was replaced by a public garden\n" +
        "• The eastern car park became a supermarket\n" +
        "• The western car park was expanded and a cycle lane was added around the square\n" +
        "• The row of shops was extended to include a café and a pharmacy\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v8",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The process description below shows how plastic bottles are recycled into new products.\n\n" +
        "Stages\n" +
        "1) Bottles are collected from bins and recycling centres\n" +
        "2) They are sorted by plastic type and colour\n" +
        "3) Bottles are washed to remove labels and dirt\n" +
        "4) They are crushed into small flakes\n" +
        "5) Flakes are melted and formed into pellets\n" +
        "6) Pellets are used to manufacture new items such as clothing fibres and packaging\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v9",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The table below shows the number of international students (in thousands) from three regions who studied in a country in 2010 and 2020.\n\n" +
        "International students (thousands)\n" +
        "• Asia: 2010 = 120 | 2020 = 210\n" +
        "• Europe: 2010 = 75 | 2020 = 88\n" +
        "• Africa: 2010 = 30 | 2020 = 55\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v10",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The chart descriptions below show the number of visitors to two museums and their total ticket revenue in 2015 and 2023.\n\n" +
        "Visitors (thousands)\n" +
        "• Museum A: 2015 = 420 | 2023 = 510\n" +
        "• Museum B: 2015 = 380 | 2023 = 360\n\n" +
        "Ticket revenue (million dollars)\n" +
        "• Museum A: 2015 = 6.3 | 2023 = 9.2\n" +
        "• Museum B: 2015 = 5.7 | 2023 = 6.0\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v11",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The diagram description below shows how a typical solar panel system provides electricity for a home.\n\n" +
        "Stages\n" +
        "1) Sunlight hits solar panels on the roof, producing DC electricity\n" +
        "2) A converter changes DC electricity into AC electricity\n" +
        "3) Electricity is used by household appliances\n" +
        "4) Excess electricity is sent to the power grid through a meter\n" +
        "5) When production is low, electricity is drawn from the grid\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v12",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The bar chart description below shows average monthly rainfall in two cities over a year.\n\n" +
        "Average rainfall (mm)\n" +
        "• City X: Jan 48 | Apr 62 | Jul 90 | Oct 75\n" +
        "• City Y: Jan 80 | Apr 55 | Jul 40 | Oct 95\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v13",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The table below shows the percentage of residents who held a library membership in four age groups in 2005 and 2020.\n\n" +
        "Percent with library membership\n" +
        "• 0–15: 2005 = 42% | 2020 = 55%\n" +
        "• 16–24: 2005 = 35% | 2020 = 31%\n" +
        "• 25–54: 2005 = 28% | 2020 = 34%\n" +
        "• 55+: 2005 = 30% | 2020 = 48%\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v14",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The line chart description below shows smartphone ownership in three age groups from 2011 to 2021.\n\n" +
        "Percent owning a smartphone\n" +
        "• Age 18–29: 2011 = 45% | 2016 = 78% | 2021 = 92%\n" +
        "• Age 30–49: 2011 = 30% | 2016 = 65% | 2021 = 85%\n" +
        "• Age 50+: 2011 = 12% | 2016 = 35% | 2021 = 60%\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v15",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The map descriptions below show changes to a university campus between 1990 and 2020.\n\n" +
        "1990\n" +
        "• One main lecture hall in the centre\n" +
        "• A small library to the east\n" +
        "• Car park in the south\n" +
        "• Sports field in the west\n\n" +
        "2020\n" +
        "• A science building was added north of the lecture hall\n" +
        "• The library was expanded and a computer lab was built beside it\n" +
        "• The car park was reduced and a bus stop was added\n" +
        "• The sports field was replaced by a sports centre and two tennis courts\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v16",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The process description below shows how coffee is produced from beans and prepared for sale in shops.\n\n" +
        "Stages\n" +
        "1) Coffee beans are harvested and dried\n" +
        "2) Beans are roasted at high temperature\n" +
        "3) Roasted beans are cooled and ground\n" +
        "4) Ground coffee is packaged and transported to retailers\n" +
        "5) In cafés, coffee is brewed with hot water and served\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v17",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The table below shows carbon dioxide emissions (in million tonnes) from four sectors in a country in 2000 and 2020.\n\n" +
        "CO2 emissions (million tonnes)\n" +
        "• Transport: 2000 = 120 | 2020 = 150\n" +
        "• Industry: 2000 = 180 | 2020 = 130\n" +
        "• Power generation: 2000 = 210 | 2020 = 160\n" +
        "• Residential: 2000 = 70 | 2020 = 75\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v18",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The bar chart description below shows the number of books borrowed (in thousands) from a public library in five genres in 2012 and 2022.\n\n" +
        "Books borrowed (thousands)\n" +
        "• Fiction: 2012 = 120 | 2022 = 140\n" +
        "• Non-fiction: 2012 = 70 | 2022 = 60\n" +
        "• Children’s: 2012 = 90 | 2022 = 110\n" +
        "• Science: 2012 = 40 | 2022 = 55\n" +
        "• History: 2012 = 50 | 2022 = 45\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v19",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The line chart description below shows average house prices (in thousands of dollars) in three cities between 2010 and 2020.\n\n" +
        "Average house price (thousand dollars)\n" +
        "• City A: 2010 = 210 | 2015 = 260 | 2020 = 310\n" +
        "• City B: 2010 = 180 | 2015 = 200 | 2020 = 240\n" +
        "• City C: 2010 = 150 | 2015 = 190 | 2020 = 205\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v20",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The chart description below shows survey results about customer satisfaction with three services at a bank in 2016 and 2024.\n\n" +
        "Percent satisfied\n" +
        "• Waiting time: 2016 = 62% | 2024 = 78%\n" +
        "• Staff helpfulness: 2016 = 75% | 2024 = 80%\n" +
        "• Online banking: 2016 = 55% | 2024 = 85%\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v21",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The pie chart descriptions below show sources of drinking water for rural households in 2000 and 2020.\n\n" +
        "Percent of households by water source\n" +
        "2000: Well 45% | River 30% | Piped supply 15% | Bottled 10%\n" +
        "2020: Well 25% | River 12% | Piped supply 50% | Bottled 13%\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v22",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The table below shows average weekly working hours for full-time employees in four industries in 2008 and 2023.\n\n" +
        "Average hours per week\n" +
        "• Healthcare: 2008 = 41 | 2023 = 44\n" +
        "• Manufacturing: 2008 = 45 | 2023 = 40\n" +
        "• Retail: 2008 = 38 | 2023 = 36\n" +
        "• IT: 2008 = 40 | 2023 = 42\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v23",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The process description below shows how an online purchase is completed and delivered to a customer.\n\n" +
        "Stages\n" +
        "1) Customer places an order and pays online\n" +
        "2) The retailer checks stock availability\n" +
        "3) The item is picked and packed in a warehouse\n" +
        "4) A delivery label is printed and attached\n" +
        "5) The parcel is transported to a local depot\n" +
        "6) The parcel is delivered to the customer and a confirmation message is sent\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v24",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The map descriptions below show how a public park was redeveloped between 2005 and 2025.\n\n" +
        "2005\n" +
        "• Large open grass area in the centre\n" +
        "• A small playground in the northeast\n" +
        "• A single footpath from west to east\n" +
        "• A pond in the south\n\n" +
        "2025\n" +
        "• The playground was expanded and a café was added nearby\n" +
        "• The pond was replaced by a community garden\n" +
        "• A circular running track was built around the park\n" +
        "• A new bicycle parking area was installed at the western entrance\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v25",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The bar chart description below shows the number of adults learning three languages at a community centre in 2015 and 2021.\n\n" +
        "Number of learners\n" +
        "• English: 2015 = 160 | 2021 = 220\n" +
        "• Spanish: 2015 = 140 | 2021 = 150\n" +
        "• Mandarin: 2015 = 60 | 2021 = 130\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v26",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The line chart description below shows the unemployment rate in a country from 2012 to 2022.\n\n" +
        "Unemployment rate\n" +
        "• 2012 = 8.5% | 2014 = 7.2% | 2016 = 6.0% | 2018 = 5.1% | 2020 = 9.0% | 2022 = 4.8%\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v27",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The table below shows average daily calorie intake (in calories) for men and women in three meals.\n\n" +
        "Average calories per day\n" +
        "• Breakfast: Men 420 | Women 350\n" +
        "• Lunch: Men 650 | Women 520\n" +
        "• Dinner: Men 780 | Women 620\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },
    {
      id: "t1-v28",
      type: "essay",
      taskNumber: 1,
      recommendedTimeMin: 20,
      minWords: 150,
      notes:
        "Write a report for a university lecturer. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.",
      question:
        "The process description below shows how a city metro card is purchased and used for travel.\n\n" +
        "Stages\n" +
        "1) A customer chooses a travel card type at a machine or ticket office\n" +
        "2) The card is paid for and activated\n" +
        "3) The customer adds credit (top-up) to the card\n" +
        "4) The card is tapped at entry gates and the fare is deducted automatically\n" +
        "5) The remaining balance can be checked online or at a station machine\n\n" +
        "Write at least 150 words.",
      rubric: TASK1_RUBRIC
    },

    // -----------------------------
    // Task 2 variants (Essay) — Added
    // -----------------------------
    {
      id: "t2-v4",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Some people believe higher education should be free for all students, while others think students should pay for university themselves.\n\n" +
        "Discuss both views and give your own opinion.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v5",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Social media companies should limit access for teenagers to reduce the risk of harm.\n\n" +
        "To what extent do you agree or disagree?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v6",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Some people think the best way to reduce crime is to give longer prison sentences. Others believe education and job training are more effective.\n\n" +
        "Discuss both views and give your own opinion.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v7",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Protecting the environment is mainly the responsibility of governments, not individuals.\n\n" +
        "Do you agree or disagree?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v8",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Hosting international sports events can bring benefits, but it can also cause problems.\n\n" +
        "Do the advantages outweigh the disadvantages?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v9",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Modern technology has reduced face-to-face communication between people.\n\n" +
        "Is this a positive or negative development?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v10",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Some people believe zoos are cruel and should be closed. Others think zoos play an important role in conservation.\n\n" +
        "Discuss both views and give your own opinion.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v11",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Advertising aimed at children should be banned.\n\n" +
        "To what extent do you agree or disagree?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v12",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "In some countries, children are taught several subjects in a foreign language.\n\n" +
        "What are the advantages and disadvantages of this approach?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v13",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Governments should provide more financial support to encourage the use of renewable energy.\n\n" +
        "Do you agree or disagree?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v14",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Many public libraries are now offering digital services as well as physical books.\n\n" +
        "Should governments continue to fund public libraries? Give reasons for your answer.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v15",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Fast fashion makes clothing cheaper and more available, but it may have negative effects.\n\n" +
        "Do the advantages outweigh the disadvantages?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v16",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Some people think employees should work fewer hours each week to improve quality of life. Others believe working longer hours helps the economy.\n\n" +
        "Discuss both views and give your own opinion.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v17",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Taking a gap year before starting university is becoming more popular.\n\n" +
        "What are the advantages and disadvantages for young people?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v18",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Online shopping has changed the way people buy products.\n\n" +
        "What effects does this have on local shops and on the environment?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v19",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Artificial intelligence is increasingly used to support teaching and learning.\n\n" +
        "Do the advantages of using AI in education outweigh the disadvantages?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v20",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Urban areas are growing rapidly, and many people are moving away from rural communities.\n\n" +
        "What problems does this cause, and what solutions can you suggest?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v21",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Tourism can create jobs and improve infrastructure, but it can also damage local culture and the environment.\n\n" +
        "Discuss both views and give your own opinion.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v22",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Many countries are moving towards a cashless society where people pay mainly by card or phone.\n\n" +
        "Is this a positive or negative development?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v23",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "In some cities, old buildings are being replaced with new housing and offices.\n\n" +
        "Should governments protect historic buildings, even if it limits development?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v24",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Some people think governments should spend more money on sports facilities, while others believe the arts deserve more support.\n\n" +
        "Discuss both views and give your own opinion.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v25",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Schools should teach students more about mental health and how to manage stress.\n\n" +
        "To what extent do you agree or disagree?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v26",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "To reduce waste, some governments are introducing bans on single-use plastic products.\n\n" +
        "What are the advantages and disadvantages of this policy?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v27",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "Some people believe governments should spend money exploring space, while others think this money should be used to solve problems on Earth.\n\n" +
        "Discuss both views and give your own opinion.\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    },
    {
      id: "t2-v28",
      type: "essay",
      taskNumber: 2,
      recommendedTimeMin: 40,
      minWords: 250,
      notes:
        "Give reasons for your answer and include any relevant examples from your own knowledge or experience.",
      question:
        "In many countries, immigration has increased significantly in recent years.\n\n" +
        "What are the main reasons for this, and is it generally a positive or negative development?\n\n" +
        "Write at least 250 words.",
      rubric: TASK2_RUBRIC
    }
  ];

  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = BANK;
})();
