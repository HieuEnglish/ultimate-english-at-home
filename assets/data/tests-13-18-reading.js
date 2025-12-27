/* assets/data/tests-13-18-reading.js
   Question bank: Ages 13–18 • Reading (IELTS-inspired)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-13-18-reading"

   Notes:
   - 3 passages (P1–P3). Questions are grouped by passageId.
   - True/False/Not Given is represented as multipleChoice.
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-reading";

  const P1 =
    "Passage 1: The Micro-forest Experiment. " +
    "Paragraph A: In crowded cities, planting a large park is often impossible. Some communities are experimenting with micro-forests: small, tightly planted patches of trees and shrubs that fit into leftover spaces such as road corners or unused school grounds. Supporters say the goal is not decoration but creating a tiny ecosystem that offers shade, habitat, and a calmer feeling on a busy street. " +
    "Paragraph B: The method is simple in theory but demanding in practice. Planners choose mainly native species, improve the soil with compost, and plant many saplings close together. A thick layer of mulch helps the ground stay moist, and the area is protected while roots establish. During the first dry season, careful watering is essential, because young trees have not yet developed deep roots. " +
    "Paragraph C: Early reports can sound impressive: leaves appear quickly, insects return, and the space looks greener than a lawn. However, critics warn that quick success stories do not automatically prove long-term value. A micro-forest might thrive in one neighbourhood and struggle in another, depending on heat, soil quality, and ongoing care. In addition, planting a few dense patches is not the same as restoring a large woodland. " +
    "Paragraph D: For many projects, the most important ingredient is people. When residents help plant, label species, and monitor growth, they are more likely to protect the site from damage and report problems early. In this sense, a micro-forest is as much a community project as an environmental one. Still, it works best as part of a wider plan that includes clean transport and other forms of urban cooling.";

  const P2 =
    "Passage 2: Sleep, Screens, and Study. " +
    "Paragraph A: Many teenagers notice that they feel alert later at night and struggle to wake up early. This is not only a habit; during adolescence, the body clock often shifts so that sleepiness arrives later. When school starts early, students can build up sleep debt, which may affect mood, attention, and motivation. " +
    "Paragraph B: Sleep is also when the brain organises what was learned during the day. Deep sleep supports the strengthening of facts and skills, while REM sleep is linked to processing emotions and making connections. This does not mean that study is useless without perfect sleep, but it suggests that cramming late into the night can reduce how much information becomes stable. " +
    "Paragraph C: Researchers who study learning often recommend a few practical strategies: review in shorter sessions across several days, keep wake-up times steady, and use short naps carefully. A nap that is too long can leave someone groggy, while a short nap can refresh attention. Caffeine late in the day and bright screens close to bedtime can both delay sleepiness for some people. " +
    "Paragraph D: Because of these patterns, some schools have tested later start times. Supporters argue that it improves attendance and reduces tiredness in morning classes. Others point to transport, sports schedules, and family routines as obstacles. The debate shows that scientific findings do not automatically become policy; they have to fit real lives and local systems.";

  const P3 =
    "Passage 3: Repair Cafes and the Circular Economy. " +
    "Paragraph A: On a Saturday morning, a community hall fills with broken items: headphones with loose wires, toasters that no longer heat, and backpacks with torn straps. At a repair cafe, volunteers help visitors diagnose problems and attempt a fix. The atmosphere is practical and friendly, and the goal is learning as much as saving money. " +
    "Paragraph B: Supporters argue that repair builds skills and reduces waste, especially when it stops an item being thrown away after a small failure. Yet repair is not always simple. Modern products can be glued shut, and replacing a part may require special tools. In addition, very cheap new products can make repair seem irrational, even when the environmental cost is higher than the price suggests. " +
    "Paragraph C: These obstacles connect to a wider movement often called the right to repair. Campaigners want access to affordable parts, manuals, and software tools so owners can fix what they buy. Some manufacturers respond that uncontrolled repairs could be unsafe and that sharing detailed designs may reveal protected information. As a result, laws in different places try to balance safety, competition, and consumer rights. " +
    "Paragraph D: Repair cafes alone cannot transform an economy, but they highlight a bigger idea: materials should stay in circulation for longer. Designers talk about modular phones, standard screws, and a repairability score that rewards products that are easy to open and maintain.";

  const QUESTIONS = [
    // Passage 1 (p1)
    {
      id: "q1",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph A?",
      options: [
        "A new kind of tiny urban woodland",
        "How sleep changes during adolescence",
        "Why repairs are always cheaper",
        "The history of city transport"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A introduces micro-forests as small ecosystems in leftover city spaces."
    },
    {
      id: "q2",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph B?",
      options: [
        "How micro-forests are planted and protected",
        "Why teenagers prefer studying at night",
        "How to buy cheaper electronics",
        "Reasons forests are not needed in cities"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph B describes choosing species, improving soil, using mulch, and watering early on."
    },
    {
      id: "q3",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "According to the passage, why is watering important at the beginning?",
      options: [
        "Young trees have not yet developed deep roots",
        "Mulch prevents any water reaching the soil",
        "Native species cannot survive rain",
        "Watering is needed only to remove insects"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph B explains that young trees need careful watering while roots establish."
    },
    {
      id: "q4",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Choose the correct option (True / False / Not Given): The method relies mainly on native species.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph B states that planners choose mainly native species."
    },
    {
      id: "q5",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Choose the correct option (True / False / Not Given): The passage says micro-forests always cost less than traditional parks.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "Cost comparisons are not discussed in the passage."
    },
    {
      id: "q6",
      passageId: "p1",
      type: "fillInTheBlank",
      passage: P1,
      question: "Sentence completion: A thick layer of ______ helps the ground stay moist.",
      answer: "mulch",
      difficulty: "easy",
      explanation: "Paragraph B uses the word 'mulch'."
    },
    {
      id: "q7",
      passageId: "p1",
      type: "fillInTheBlank",
      passage: P1,
      question: "Sentence completion: When residents help to ______ growth, they are more likely to protect the site.",
      answer: ["monitor", "track"],
      difficulty: "medium",
      explanation: "Paragraph D says residents may help monitor growth."
    },
    {
      id: "q8",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "In Paragraph C, what do critics mainly warn about?",
      options: [
        "Quick success stories do not prove long-term value",
        "Trees should never be planted close together",
        "Cities should stop planting any greenery",
        "Only imported species can survive in micro-forests"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph C says early reports can sound impressive but do not automatically prove long-term value."
    },

    // Passage 2 (p2)
    {
      id: "q9",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Which statement best summarises Passage 2?",
      options: [
        "Teen sleep patterns affect learning, and practical study habits can help",
        "Caffeine is the only reason students are tired",
        "Later school starts always solve academic problems",
        "Sleep research is irrelevant to teenagers"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage links teen sleep patterns to learning and offers practical strategies."
    },
    {
      id: "q10",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "According to Paragraph A, why do many teenagers struggle with early mornings?",
      options: [
        "Their body clock often shifts later during adolescence",
        "They stop needing sleep as they grow",
        "They become allergic to morning light",
        "They learn best only before sunrise"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A explains a biological shift in the body clock."
    },
    {
      id: "q11",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "In which paragraph does the writer mention obstacles to changing school start times?",
      options: ["A", "B", "C", "D"],
      answer: 3,
      difficulty: "medium",
      explanation: "Paragraph D mentions transport, sports schedules, and family routines."
    },
    {
      id: "q12",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Choose the correct option (True / False / Not Given): Bright screens close to bedtime can delay sleepiness for some people.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph C states that bright screens close to bedtime can delay sleepiness for some people."
    },
    {
      id: "q13",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Choose the correct option (True / False / Not Given): The passage states that all teenagers need exactly eight hours of sleep.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "No exact number of hours is given."
    },
    {
      id: "q14",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: Sleep debt is the gap between sleep you get and sleep you ______.",
      answer: "need",
      difficulty: "easy",
      explanation: "Paragraph A describes sleep debt as accumulated lack of needed sleep."
    },
    {
      id: "q15",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: The passage suggests keeping wake-up times ______.",
      answer: ["consistent", "steady"],
      difficulty: "medium",
      explanation: "Paragraph C recommends keeping wake-up times steady."
    },
    {
      id: "q16",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "What is the writer's overall message in Passage 2?",
      options: [
        "Science can guide habits, but real-life constraints also matter",
        "Students should always study late to build discipline",
        "Schools are the only cause of sleep problems",
        "Changing routines is impossible"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph D shows that findings have to fit real lives and local systems."
    },

    // Passage 3 (p3)
    {
      id: "q17",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "What is a repair cafe, according to Paragraph A?",
      options: [
        "A community event where volunteers help fix broken items",
        "A factory that produces replacement parts",
        "A shop that sells only brand-new devices",
        "A place where tools are banned"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A describes volunteers helping visitors diagnose problems and attempt a fix."
    },
    {
      id: "q18",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which problem is mentioned in Paragraph B?",
      options: [
        "Some products are glued shut and need special tools",
        "Repairs are illegal in most cities",
        "Volunteers refuse to share skills",
        "New products never break"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph B notes that modern products can be glued shut and may require special tools."
    },
    {
      id: "q19",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Choose the correct option (True / False / Not Given): Very cheap new products can make repair seem irrational.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph B states this directly."
    },
    {
      id: "q20",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Choose the correct option (True / False / Not Given): Some manufacturers worry that uncontrolled repairs could be unsafe.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C mentions safety as a concern."
    },
    {
      id: "q21",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: A circular economy aims to keep materials in ______ for longer.",
      answer: ["circulation", "use"],
      difficulty: "medium",
      explanation: "Paragraph D says materials should stay in circulation for longer."
    },
    {
      id: "q22",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: The passage mentions a repairability ______ that rewards products that are easy to open.",
      answer: "score",
      difficulty: "easy",
      explanation: "Paragraph D uses the phrase 'repairability score'."
    },
    {
      id: "q23",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph mentions manuals and software tools?",
      options: ["A", "B", "C", "D"],
      answer: 2,
      difficulty: "medium",
      explanation: "Paragraph C mentions manuals and software tools for repair."
    },
    {
      id: "q24",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which statement best reflects the writer's view in Passage 3?",
      options: [
        "Repair helps, but broader design and policy changes are also needed",
        "Repair is pointless because products are too complex",
        "Right-to-repair always reduces safety",
        "Repair cafes should replace all shops"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "The passage presents repair as useful but not sufficient on its own."
    }
    ,

    // Added questions (append-only): q25–q74

    // Passage 1 (p1) — additional
    {
      id: "q25",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph C?",
      options: [
        "Why early results may not prove long-term success",
        "A guide to choosing the best school timetable",
        "An argument for removing all city trees",
        "How to replace parks with parking spaces"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph C warns that quick success stories do not automatically prove long-term value."
    },
    {
      id: "q26",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph D?",
      options: [
        "Community involvement as a key factor",
        "Why lawns are better than trees",
        "The history of composting in Europe",
        "How to grow imported plants indoors"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph D focuses on residents planting, labelling species, monitoring growth, and protecting the site."
    },
    {
      id: "q27",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "In which paragraph is compost mentioned?",
      options: ["A", "B", "C", "D"],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph B mentions improving the soil with compost."
    },
    {
      id: "q28",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Choose the correct option (True / False / Not Given): Micro-forests are planted with many saplings close together.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph B says planners plant many saplings close together."
    },
    {
      id: "q29",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Choose the correct option (True / False / Not Given): The passage claims that planting a few dense patches is the same as restoring a large woodland.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph C states that dense patches are not the same as restoring a large woodland."
    },
    {
      id: "q30",
      passageId: "p1",
      type: "fillInTheBlank",
      passage: P1,
      question: "Sentence completion: Micro-forests can fit into leftover spaces such as road corners or unused ______ grounds.",
      answer: "school",
      difficulty: "easy",
      explanation: "Paragraph A mentions unused school grounds as an example."
    },
    {
      id: "q31",
      passageId: "p1",
      type: "fillInTheBlank",
      passage: P1,
      question: "Sentence completion: The area is protected while ______ establish.",
      answer: ["roots", "the roots"],
      difficulty: "easy",
      explanation: "Paragraph B explains the area is protected while roots establish."
    },
    {
      id: "q32",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "In Paragraph B, the phrase 'roots establish' most nearly means roots _____.",
      options: [
        "become strong and settled",
        "are removed from the soil",
        "change into flowers",
        "stop growing completely"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "The context suggests roots need time to take hold and grow effectively."
    },
    {
      id: "q33",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Why does the writer say a micro-forest works best as part of a wider plan?",
      options: [
        "Because it should be combined with clean transport and other cooling measures",
        "Because micro-forests cannot survive without imported trees",
        "Because residents are not allowed to visit parks",
        "Because watering is never required in cities"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph D says micro-forests work best as part of a wider plan including clean transport and urban cooling."
    },
    {
      id: "q34",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Which factor is NOT mentioned as affecting whether a micro-forest thrives?",
      options: [
        "Local heat",
        "Soil quality",
        "Ongoing care",
        "The phase of the moon"
      ],
      answer: 3,
      difficulty: "easy",
      explanation: "Paragraph C mentions heat, soil quality, and ongoing care, but not the moon."
    },
    {
      id: "q35",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "According to Paragraph D, what is one benefit of residents helping to label species and monitor growth?",
      options: [
        "They are more likely to protect the site and report problems early",
        "They can legally remove trees for firewood",
        "They no longer need any watering during dry seasons",
        "They guarantee that all insects will disappear"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph D links community involvement to protection and early problem reporting."
    },
    {
      id: "q36",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "In which paragraph does the writer mention reporting problems early?",
      options: ["A", "B", "C", "D"],
      answer: 3,
      difficulty: "medium",
      explanation: "Paragraph D mentions residents reporting problems early."
    },
    {
      id: "q37",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Choose the correct option (True / False / Not Given): The passage suggests that micro-forests can provide habitat for insects.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C mentions insects returning, and Paragraph A mentions habitat as part of the ecosystem idea."
    },
    {
      id: "q38",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "What do critics mainly emphasise about early 'impressive' reports?",
      options: [
        "They do not automatically prove long-term value",
        "They show micro-forests always fail",
        "They prove micro-forests are identical to parks",
        "They demonstrate that lawns are better"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph C warns that quick success stories are not the same as long-term evidence."
    },
    {
      id: "q39",
      passageId: "p1",
      type: "fillInTheBlank",
      passage: P1,
      question: "Sentence completion: During the first dry season, careful ______ is essential.",
      answer: "watering",
      difficulty: "easy",
      explanation: "Paragraph B says careful watering is essential during the first dry season."
    },
    {
      id: "q40",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Choose the correct option (True / False / Not Given): The passage provides a list of specific cities where micro-forests have been most successful.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "No city list is provided; the passage stays general."
    },
    {
      id: "q41",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Why are residents who help plant more likely to protect the micro-forest site?",
      options: [
        "Their involvement creates a sense of responsibility and ownership",
        "They are paid to guard the site every night",
        "They receive free public transport tickets",
        "They are required to plant trees for school grades"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph D suggests involvement makes residents more likely to protect the site and act when issues appear."
    },
    {
      id: "q42",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "In which paragraph is the idea that the goal is 'not decoration' mentioned?",
      options: ["A", "B", "C", "D"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A says the goal is not decoration but creating a tiny ecosystem."
    },

    // Passage 2 (p2) — additional
    {
      id: "q43",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Matching headings: Which heading best matches Paragraph B?",
      options: [
        "How sleep helps the brain store learning",
        "Why teenagers need less sleep than adults",
        "How to replace homework with naps",
        "The history of school uniforms"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph B explains how deep sleep and REM sleep support memory and processing."
    },
    {
      id: "q44",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Matching headings: Which heading best matches Paragraph C?",
      options: [
        "Practical habits that support sleep and learning",
        "Why morning classes should be cancelled",
        "How to drink more caffeine safely",
        "Why screens improve sleep quality"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C lists strategies such as spaced review, steady wake-up times, and careful naps."
    },
    {
      id: "q45",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: Deep sleep supports the strengthening of facts and ______.",
      answer: "skills",
      difficulty: "easy",
      explanation: "Paragraph B says deep sleep supports strengthening of facts and skills."
    },
    {
      id: "q46",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: REM sleep is linked to processing emotions and making ______.",
      answer: ["connections", "links"],
      difficulty: "medium",
      explanation: "Paragraph B connects REM sleep with making connections."
    },
    {
      id: "q47",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Choose the correct option (True / False / Not Given): The passage suggests late-night alertness in teenagers is only a habit.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph A says this is not only a habit; the body clock often shifts later."
    },
    {
      id: "q48",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "In which paragraph does the writer advise using short naps carefully?",
      options: ["A", "B", "C", "D"],
      answer: 2,
      difficulty: "easy",
      explanation: "Paragraph C discusses naps and warns that long naps can leave someone groggy."
    },
    {
      id: "q49",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "According to Paragraph C, what can happen if a nap is too long?",
      options: [
        "It can leave someone feeling groggy",
        "It guarantees perfect memory for exams",
        "It makes wake-up times unnecessary",
        "It stops the body clock from changing"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C warns that a nap that is too long can leave someone groggy."
    },
    {
      id: "q50",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Choose the correct option (True / False / Not Given): Caffeine late in the day can delay sleepiness for some people.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph C states that caffeine late in the day can delay sleepiness for some people."
    },
    {
      id: "q51",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Which study strategy is recommended by researchers in the passage?",
      options: [
        "Review in shorter sessions across several days",
        "Study only once, the night before the test",
        "Skip review and rely on naps",
        "Change wake-up times every day"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph C recommends reviewing in shorter sessions across several days."
    },
    {
      id: "q52",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "What does Paragraph B suggest about cramming late into the night?",
      options: [
        "It may reduce how much information becomes stable",
        "It always improves long-term memory",
        "It replaces the need for sleep",
        "It is better than reviewing over several days"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph B suggests late cramming can reduce how much information becomes stable."
    },
    {
      id: "q53",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: When school starts early, students can build up sleep ______.",
      answer: "debt",
      difficulty: "easy",
      explanation: "Paragraph A uses the phrase 'sleep debt'."
    },
    {
      id: "q54",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: Supporters of later start times argue it improves ______.",
      answer: "attendance",
      difficulty: "medium",
      explanation: "Paragraph D says supporters argue it improves attendance."
    },
    {
      id: "q55",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Choose the correct option (True / False / Not Given): The passage states that later start times solve all school scheduling problems.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "The passage notes obstacles, but does not claim the change solves all problems."
    },
    {
      id: "q56",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "In which paragraph does the writer emphasise that research findings must fit real lives and local systems?",
      options: ["A", "B", "C", "D"],
      answer: 3,
      difficulty: "medium",
      explanation: "Paragraph D says scientific findings do not automatically become policy and must fit local systems."
    },
    {
      id: "q57",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "In Paragraph A, the word 'motivation' is closest in meaning to",
      options: [
        "the desire to do something",
        "the temperature of a room",
        "the time shown on a clock",
        "a type of screen"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "In context, motivation refers to willingness or drive to work and learn."
    },
    {
      id: "q58",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Which statement best describes the purpose of Passage 2?",
      options: [
        "To explain teen sleep patterns and discuss habits and policy choices",
        "To argue that sleep has no connection to learning",
        "To prove that caffeine is always harmful",
        "To show that school debates are never influenced by science"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage explains biological patterns, learning effects, strategies, and the debate about start times."
    },
    {
      id: "q59",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: Bright screens close to bedtime can delay ______ for some people.",
      answer: "sleepiness",
      difficulty: "easy",
      explanation: "Paragraph C says bright screens close to bedtime can delay sleepiness."
    },
    {
      id: "q60",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Choose the correct option (True / False / Not Given): The passage says study is useless without perfect sleep.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "hard",
      explanation: "Paragraph B says this does not mean study is useless without perfect sleep."
    },

    // Passage 3 (p3) — additional
    {
      id: "q61",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: At a repair cafe, the atmosphere is practical and ______.",
      answer: "friendly",
      difficulty: "easy",
      explanation: "Paragraph A describes the atmosphere as practical and friendly."
    },
    {
      id: "q62",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: The goal is learning as much as saving ______.",
      answer: "money",
      difficulty: "easy",
      explanation: "Paragraph A says the goal is learning as much as saving money."
    },
    {
      id: "q63",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which item is specifically mentioned as being brought to a repair cafe in Paragraph A?",
      options: [
        "A bicycle with a broken chain",
        "A toaster that no longer heats",
        "A laptop with a missing keyboard",
        "A television with a cracked screen"
      ],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph A lists examples including toasters that no longer heat."
    },
    {
      id: "q64",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Choose the correct option (True / False / Not Given): Visitors come to repair cafes only to save money.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph A says the goal is learning as much as saving money, not only saving money."
    },
    {
      id: "q65",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Campaigners want access to affordable ______ so owners can fix what they buy.",
      answer: "parts",
      difficulty: "medium",
      explanation: "Paragraph C says campaigners want access to affordable parts."
    },
    {
      id: "q66",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Choose the correct option (True / False / Not Given): Some manufacturers worry that sharing detailed designs may reveal protected information.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph C mentions concerns about revealing protected information."
    },
    {
      id: "q67",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: The passage suggests the environmental cost can be higher than the ______ suggests.",
      answer: "price",
      difficulty: "medium",
      explanation: "Paragraph B contrasts environmental cost with the low price of very cheap new products."
    },
    {
      id: "q68",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "According to Paragraph C, laws in different places try to balance",
      options: [
        "safety, competition, and consumer rights",
        "sports schedules, homework, and uniforms",
        "weather forecasts, transport, and holidays",
        "tree planting, composting, and watering"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C says laws try to balance safety, competition, and consumer rights."
    },
    {
      id: "q69",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which design choice would most directly make products easier to open and maintain, according to Paragraph D?",
      options: [
        "Using standard screws",
        "Sealing devices permanently with glue",
        "Requiring unique tools for each brand",
        "Removing manuals from the internet"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph D mentions standard screws as a design choice that supports repair."
    },
    {
      id: "q70",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Choose the correct option (True / False / Not Given): The passage suggests repair cafes alone can transform an economy.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph D states that repair cafes alone cannot transform an economy."
    },
    {
      id: "q71",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "In Paragraph B, the word 'irrational' most nearly means",
      options: [
        "not sensible",
        "very fashionable",
        "extremely loud",
        "completely invisible"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "In context, repair can seem irrational when it does not seem like a sensible choice."
    },
    {
      id: "q72",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Designers talk about ______ phones and standard screws.",
      answer: "modular",
      difficulty: "easy",
      explanation: "Paragraph D mentions modular phones as an example."
    },
    {
      id: "q73",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "What is the main aim of the 'right to repair' movement in the passage?",
      options: [
        "To give owners access to parts, manuals, and tools to fix products",
        "To prevent anyone from opening a device",
        "To replace all repair work with recycling",
        "To make products cheaper by removing safety checks"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C explains that campaigners want access to parts, manuals, and software tools so owners can repair."
    },
    {
      id: "q74",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "What broader idea do repair cafes highlight in Paragraph D?",
      options: [
        "Materials should stay in circulation for longer",
        "Broken items should always be thrown away",
        "Repair is only useful for old technologies",
        "Cities should stop using community halls"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph D says repair cafes highlight the idea that materials should stay in circulation for longer."
    }

  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
