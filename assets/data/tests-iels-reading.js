/* assets/data/tests-iels-reading.js
   Question bank: IELTS Reading (original practice)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "iels-reading"

   Notes:
   - 3 passages (P1–P3). Questions are in passage order.
   - True/False/Not Given is represented as multipleChoice.
*/

(function () {
  "use strict";

  const SLUG = "iels-reading";

  const P1 = (
    "Passage 1: Turning Wastewater into Drinking Water\n\n" +
    "Paragraph A: Cities have always depended on nearby rivers, lakes, or underground aquifers. But as populations grow and rainfall becomes less predictable, many regions face a gap between supply and demand. In response, some water authorities are treating wastewater not as a problem to dispose of, but as a resource that can be cleaned and reused.\n\n" +
    "Paragraph B: Conventional wastewater treatment removes solids and reduces harmful bacteria, producing water that is safe to release into the environment. Potable reuse goes further. It adds multiple “barriers” such as microfiltration, reverse osmosis, and advanced oxidation, each designed to remove different classes of contaminants—from microbes to tiny traces of industrial chemicals.\n\n" +
    "Paragraph C: There are two main routes to potable reuse. Indirect potable reuse sends purified water into an environmental “buffer” such as a reservoir or an aquifer before it is withdrawn again for drinking-water treatment. The buffer provides time for additional natural processes and for operators to verify water quality. Direct potable reuse, by contrast, blends treated water into the supply system without a long environmental pause, which requires even more careful monitoring.\n\n" +
    "Paragraph D: Supporters argue that modern technology can achieve extremely high quality. Critics do not usually claim the water will be dirty; instead, they focus on management. A sophisticated plant must be operated and maintained consistently, and sensors must be calibrated and trusted. Because some pollutants are measured in very small quantities, authorities rely on both continuous instruments and regular laboratory checks.\n\n" +
    "Paragraph E: Public reaction can be harder to manage than chemistry. Early projects were sometimes labelled with unhelpful slogans, and opposition grew when communities felt decisions were made behind closed doors. More successful schemes typically invest in transparent communication, tours, and plain-language explanations of the treatment steps. In several places, acceptance rose when people understood that many cities already draw drinking water from rivers that contain upstream discharge.\n\n" +
    "Paragraph F: Potable reuse is not a universal solution. Reverse osmosis uses energy, and concentrate brine must be handled responsibly. Yet, for water-stressed regions, reuse can provide a local, drought-resistant supply that complements conservation, leak reduction, and smarter pricing."
  );

  const P2 = (
    "Passage 2: When Memory Is Outsourced\n\n" +
    "Paragraph A: A phone can remember thousands of contacts, store a calendar, and suggest when to leave for an appointment. Psychologists call this “cognitive offloading”: using tools to reduce the mental effort of remembering and organising. The habit is so common that many people struggle to imagine planning a day without digital reminders.\n\n" +
    "Paragraph B: Experiments suggest that offloading changes what we store in our own minds. In one line of research, people who knew they could look up information later were less likely to remember the details, but more likely to remember where to find it. The brain, it seems, adapts by prioritising “location memory” over “content memory” when a reliable external store is available.\n\n" +
    "Paragraph C: Outsourcing memory is not new. Writing, libraries, and even knots in a rope have helped humans track information for centuries. What is new is speed and scale: searchable notes, automatic backups, and devices that prompt us at precisely the right moment. This convenience can reduce stress, but it can also encourage a fragmented style of attention.\n\n" +
    "Paragraph D: For professionals, external systems can be a genuine advantage. Researchers and designers often keep extensive archives of observations, drafts, and references. By offloading routine details, they may have more mental capacity for problem-solving and creative connections. In these cases, the tool is not a replacement for thinking but a support for it.\n\n" +
    "Paragraph E: The risks are practical as well as psychological. A system can fail, subscriptions can lapse, and privacy can be compromised if sensitive notes are stored carelessly. There is also a learning concern: if students capture everything as photos or raw text but never review or summarise, they may end up with large collections that are rarely used and poorly understood.\n\n" +
    "Paragraph F: A balanced approach treats offloading as a first step, not the final one. Methods such as weekly reviews, short summaries, and spaced recall aim to pull key ideas back into long-term memory. In other words, the device can help capture information, but understanding still requires active work."
  );

  const P3 = (
    "Passage 3: Removing Dams and Restoring Rivers\n\n" +
    "Paragraph A: During the twentieth century, dams were built to generate electricity, control floods, and store water for farms and cities. Many of these structures are now aging, and some provide less benefit than they once did. As a result, engineers and ecologists are increasingly considering a solution that once seemed extreme: removing a dam entirely.\n\n" +
    "Paragraph B: Rivers naturally carry sediment—sand, gravel, and organic material—that shapes channels and builds habitats downstream. A dam interrupts this flow, often trapping sediment in a reservoir. Over time, the trapped material can reduce storage capacity while the sediment-starved river below may erode its banks and riverbed.\n\n" +
    "Paragraph C: Fish are another concern. Species that migrate to spawn can be blocked by dams, and even where fish ladders exist, they may not suit every species or every flow condition. In addition, water released from the bottom of a deep reservoir can be colder and lower in oxygen than a free-flowing river, altering the conditions that aquatic life depends on.\n\n" +
    "Paragraph D: Removal, however, is not instantly beneficial. When a dam comes down, sediment that has built up for decades may move downstream, increasing turbidity for months. This can temporarily harm fish and reduce water quality for towns downstream. Planning therefore often includes phased removal or sediment management to reduce the shock.\n\n" +
    "Paragraph E: Social effects can be as complex as the ecology. Reservoirs provide boating and lakeside property value, and some communities worry about losing these benefits. Others welcome restored fisheries, safer infrastructure, and new recreation along a natural river corridor. Conflicts are common, and outcomes depend on local priorities.\n\n" +
    "Paragraph F: In some cases, modifying a dam is enough. Turbines can be upgraded, flow releases can be adjusted, and habitat projects can improve conditions downstream. But where a dam is unsafe, too costly to repair, or delivers minimal services, removal can be the most practical long-term choice.\n\n" +
    "Paragraph G: Success is usually measured over years rather than weeks. Scientists may track fish returns, riverbank vegetation, water temperature, and how quickly the river re-forms pools and gravel beds. A restored system is rarely identical to the one that existed before the dam, but it can regain many natural functions."
  );

  const QUESTIONS = [
    // -----------------------------
    // Passage 1 (13 questions)
    // -----------------------------
    {
      id: "q1",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph A?",
      options: [
        "Water scarcity pushes cities to reconsider wastewater",
        "Why digital reminders always improve learning",
        "How dams increase fish migration",
        "The history of reverse osmosis in space travel"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A explains the supply–demand gap and the idea of reuse."
    },
    {
      id: "q2",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph B?",
      options: [
        "Multiple treatment barriers target different contaminants",
        "How reservoirs are used for boating tourism",
        "A warning that all sensors are unreliable",
        "Why wastewater should never be released"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph B lists several advanced treatment steps and what they remove."
    },
    {
      id: "q3",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph C?",
      options: [
        "Two routes to potable reuse and the role of an environmental buffer",
        "Pricing policies that reduce household water use",
        "Why brine is always harmless",
        "A comparison of dams and aquifers"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C contrasts indirect and direct potable reuse."
    },
    {
      id: "q4",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph D?",
      options: [
        "Concerns about consistent operation and trustworthy monitoring",
        "How slogans persuade the public",
        "Why microfiltration is unnecessary",
        "A plan to replace laboratories with apps"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph D focuses on management, maintenance, and measurement."
    },
    {
      id: "q5",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Matching headings: Which heading best matches Paragraph E?",
      options: [
        "Public acceptance depends on transparency and communication",
        "A technical guide to brine disposal pipes",
        "Why aquifers remove all pollutants automatically",
        "How to design fish ladders"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph E describes public reaction and strategies that improved acceptance."
    },
    {
      id: "q6",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "True / False / Not Given: Potable reuse adds several treatment steps beyond conventional wastewater treatment.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph B says potable reuse goes further and adds multiple barriers."
    },
    {
      id: "q7",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "True / False / Not Given: Direct potable reuse always uses less energy than indirect potable reuse.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "Energy comparison between direct and indirect reuse is not stated."
    },
    {
      id: "q8",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "True / False / Not Given: Critics mainly argue that treated water from reuse schemes will contain visible dirt.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph D says critics focus on management rather than claiming the water will be dirty."
    },
    {
      id: "q9",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Which paragraph mentions an environmental “buffer” that provides time to verify water quality?",
      options: ["A", "B", "C", "D", "E", "F"],
      answer: 2,
      difficulty: "easy",
      explanation: "Paragraph C explains the buffer in indirect potable reuse."
    },
    {
      id: "q10",
      passageId: "p1",
      type: "multipleChoice",
      passage: P1,
      question: "Which paragraph mentions energy use and the need to handle concentrated brine responsibly?",
      options: ["A", "B", "C", "D", "E", "F"],
      answer: 5,
      difficulty: "medium",
      explanation: "Paragraph F notes energy demands and brine management."
    },
    {
      id: "q11",
      passageId: "p1",
      type: "fillInTheBlank",
      passage: P1,
      question: "Summary completion: Potable reuse often uses reverse osmosis and advanced ______ to remove remaining chemicals.",
      hint: "Write ONE or TWO words from the passage.",
      answer: ["oxidation", "advanced oxidation"],
      difficulty: "medium",
      explanation: "Paragraph B mentions advanced oxidation as a barrier."
    },
    {
      id: "q12",
      passageId: "p1",
      type: "fillInTheBlank",
      passage: P1,
      question: "Sentence completion: Indirect potable reuse sends purified water into a reservoir or ______ before it is treated again for drinking.",
      hint: "Write ONE word from the passage.",
      answer: ["aquifer", "an aquifer"],
      difficulty: "easy",
      explanation: "Paragraph C lists an aquifer as an environmental buffer."
    },
    {
      id: "q13",
      passageId: "p1",
      type: "fillInTheBlank",
      passage: P1,
      question: "Sentence completion: More successful schemes often improve acceptance through transparent ______ and public tours.",
      hint: "Write ONE word from the passage.",
      answer: ["communication"],
      difficulty: "easy",
      explanation: "Paragraph E highlights communication and tours."
    },

    // -----------------------------
    // Passage 2 (13 questions)
    // -----------------------------
    {
      id: "q14",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Which statement best summarises Passage 2?",
      options: [
        "Digital tools can reduce mental load, but learning still needs active review",
        "Outsourcing memory is a new invention of the smartphone era",
        "External memory always damages creativity",
        "People remember more details when they can search later"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "The passage balances benefits of offloading with the need for active understanding."
    },
    {
      id: "q15",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Which paragraph describes research showing people remember where information is stored rather than the details?",
      options: ["A", "B", "C", "D", "E", "F"],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph B describes this shift to location memory."
    },
    {
      id: "q16",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Which paragraph notes that outsourcing memory existed before phones, but today’s systems are faster and searchable?",
      options: ["A", "B", "C", "D", "E", "F"],
      answer: 2,
      difficulty: "medium",
      explanation: "Paragraph C compares older tools with modern scale and speed."
    },
    {
      id: "q17",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "Which paragraph gives examples of professionals using archives to support creative work?",
      options: ["A", "B", "C", "D", "E", "F"],
      answer: 3,
      difficulty: "medium",
      explanation: "Paragraph D discusses researchers/designers using archives."
    },
    {
      id: "q18",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "True / False / Not Given: Cognitive offloading refers to using tools to reduce the effort of remembering and organising.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A defines cognitive offloading in these terms."
    },
    {
      id: "q19",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "True / False / Not Given: People who offload information always remember the content better than those who do not.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "hard",
      explanation: "Paragraph B suggests the opposite for details: people may remember less content."
    },
    {
      id: "q20",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "True / False / Not Given: The passage claims that paper notebooks are more secure than digital notes in every situation.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "The passage discusses privacy risks but makes no blanket claim about paper vs digital security."
    },
    {
      id: "q21",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "True / False / Not Given: Taking photos of notes without reviewing them can lead to large collections that are poorly understood.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph E warns about capturing without review or summarising."
    },
    {
      id: "q22",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: The brain may prioritise “______ memory” over “content memory” when it can rely on an external store.",
      hint: "Write ONE word from the passage.",
      answer: ["location"],
      difficulty: "medium",
      explanation: "Paragraph B uses the phrase “location memory”."
    },
    {
      id: "q23",
      passageId: "p2",
      type: "fillInTheBlank",
      passage: P2,
      question: "Sentence completion: A balanced method includes weekly reviews and spaced ______ to move ideas into long-term memory.",
      hint: "Write ONE word from the passage.",
      answer: ["recall"],
      difficulty: "medium",
      explanation: "Paragraph F mentions spaced recall."
    },
    {
      id: "q24",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "In Paragraph C, what possible downside is linked to modern convenience?",
      options: [
        "It may encourage a fragmented style of attention",
        "It prevents any backups from being created",
        "It makes writing impossible for most people",
        "It eliminates the need for understanding"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C says convenience can encourage fragmented attention."
    },
    {
      id: "q25",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "According to Paragraph E, which is a practical risk of relying on external systems?",
      options: [
        "Subscriptions can lapse and systems can fail",
        "All stored notes become public automatically",
        "Devices cannot store drafts or references",
        "Backups always erase older files"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph E lists failures, lapsed subscriptions, and privacy concerns."
    },
    {
      id: "q26",
      passageId: "p2",
      type: "multipleChoice",
      passage: P2,
      question: "What is the writer’s position overall?",
      options: [
        "Use tools to capture information, but do active work to understand it",
        "Avoid digital tools because they always harm memory",
        "Only professionals benefit from external memory systems",
        "Remembering details is unnecessary in modern life"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph F states capture is helpful, but understanding needs active work."
    },

    // -----------------------------
    // Passage 3 (14 questions)
    // -----------------------------
    {
      id: "q27",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Matching headings: Which heading best matches Paragraph A?",
      options: [
        "A growing interest in removing aging infrastructure",
        "How reverse osmosis removes salt",
        "A guide to building new reservoirs",
        "Why fish ladders always solve migration"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A introduces aging dams and the idea of removal."
    },
    {
      id: "q28",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Matching headings: Which heading best matches Paragraph B?",
      options: [
        "Sediment flow changes and downstream habitat effects",
        "How smartphones replace diaries",
        "The benefits of brine concentration",
        "Why turbidity never affects water quality"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph B explains sediment trapping and downstream erosion."
    },
    {
      id: "q29",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Matching headings: Which heading best matches Paragraph D?",
      options: [
        "Short-term impacts of removal and the need for planning",
        "A claim that removal is instantly beneficial",
        "An argument that reservoirs always increase oxygen",
        "A list of subscription problems"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph D discusses turbidity and careful planning."
    },
    {
      id: "q30",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Matching headings: Which heading best matches Paragraph E?",
      options: [
        "Community trade-offs and conflicting priorities",
        "How sediment is measured in laboratories",
        "Why turbines cannot be upgraded",
        "A new definition of cognitive offloading"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph E describes social conflicts around reservoirs vs restored rivers."
    },
    {
      id: "q31",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "According to the passage, what can trapped sediment do over time?",
      options: [
        "Reduce reservoir storage capacity",
        "Increase fish migration speed",
        "Eliminate downstream erosion",
        "Raise oxygen levels below the dam"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph B says trapped sediment can reduce storage capacity."
    },
    {
      id: "q32",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "What is one limitation of fish ladders mentioned in the passage?",
      options: [
        "They may not suit every species or flow condition",
        "They always block sediment completely",
        "They reduce the height of reservoirs",
        "They can only be built in deserts"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C notes fish ladders may not work for all species/conditions."
    },
    {
      id: "q33",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Why can dam removal temporarily harm fish and water quality downstream?",
      options: [
        "Stored sediment may increase turbidity for months",
        "Reservoirs immediately refill after removal",
        "Turbines stop producing oxygen",
        "Fish ladders become longer"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph D describes sediment release and turbidity."
    },
    {
      id: "q34",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which option best reflects Paragraph F?",
      options: [
        "Sometimes modification is enough, but removal can be best when costs or risks are high",
        "Removal is never practical and should be banned",
        "All dams can be made safe at low cost",
        "Ecological impacts do not matter in decision-making"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph F presents conditions where removal is the practical choice."
    },
    {
      id: "q35",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Dams can trap sediment and alter habitats downstream.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph B explains sediment trapping and downstream effects."
    },
    {
      id: "q36",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: The passage says removal always improves a river within a few days.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph D and G indicate short-term disruption and long timelines."
    },
    {
      id: "q37",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Reservoir boating revenue is the only social factor mentioned in debates about dam removal.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "hard",
      explanation: "Paragraph E mentions multiple social factors, not only boating revenue."
    },
    {
      id: "q38",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Scientists expect a restored river to be exactly identical to the pre-dam river.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph G says a restored system is rarely identical, but can regain functions."
    },
    {
      id: "q39",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: A dam can block fish that migrate to ______.",
      hint: "Write ONE word from the passage.",
      answer: ["spawn"],
      difficulty: "easy",
      explanation: "Paragraph C says species that migrate to spawn can be blocked."
    },
    {
      id: "q40",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Success after removal is often measured over ______ rather than weeks.",
      hint: "Write ONE word from the passage.",
      answer: ["years"],
      difficulty: "easy",
      explanation: "Paragraph G contrasts years with weeks."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();

