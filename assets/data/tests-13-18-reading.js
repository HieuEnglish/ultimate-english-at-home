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
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
