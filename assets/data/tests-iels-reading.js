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

  // -----------------------------
  // Passage 3 (additional 50 questions)
  // -----------------------------
  QUESTIONS.push(
    {
      id: "q41",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Matching headings: Which heading best matches Paragraph C?",
      options: [
        "Fish passage is disrupted and reservoir water can change river conditions",
        "How rivers naturally form deserts",
        "Why dams always increase oxygen levels",
        "A method for recycling wastewater into drinking water"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C focuses on blocked migration, limits of fish ladders, and colder/low-oxygen releases."
    },
    {
      id: "q42",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Matching headings: Which heading best matches Paragraph F?",
      options: [
        "When modification is enough and when removal becomes practical",
        "Why reservoirs should be expanded in all regions",
        "A claim that dams never require repairs",
        "How cognitive offloading improves exam scores"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph F contrasts upgrading/modifying dams with situations where removal is the best option."
    },
    {
      id: "q43",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Matching headings: Which heading best matches Paragraph G?",
      options: [
        "Long-term indicators used to judge restoration success",
        "A guarantee that restoration is immediate",
        "How to design a fish ladder in five steps",
        "An argument that sediment never moves downstream"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph G explains that success is tracked over years using several ecological measures."
    },

    {
      id: "q44",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph mentions that dams were built to generate electricity, control floods, and store water?",
      options: ["A", "B", "C", "D", "E", "F", "G"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A lists the traditional purposes of dams."
    },
    {
      id: "q45",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph explains that dams trap sediment in reservoirs and may lead to erosion downstream?",
      options: ["A", "B", "C", "D", "E", "F", "G"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph B describes sediment trapping, reduced capacity, and downstream erosion."
    },
    {
      id: "q46",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph states that fish ladders may not work for every species or flow condition?",
      options: ["A", "B", "C", "D", "E", "F", "G"],
      answer: 2,
      difficulty: "easy",
      explanation: "Paragraph C notes fish ladders may not suit every species or flow condition."
    },
    {
      id: "q47",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph mentions that water released from the bottom of a reservoir can be colder and lower in oxygen?",
      options: ["A", "B", "C", "D", "E", "F", "G"],
      answer: 2,
      difficulty: "medium",
      explanation: "Paragraph C explains how deep-reservoir releases can alter temperature and oxygen."
    },
    {
      id: "q48",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph describes how released sediment can increase turbidity for months after removal?",
      options: ["A", "B", "C", "D", "E", "F", "G"],
      answer: 3,
      difficulty: "easy",
      explanation: "Paragraph D explains the short-term turbidity problem following removal."
    },
    {
      id: "q49",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph mentions phased removal or sediment management to reduce the shock of removal?",
      options: ["A", "B", "C", "D", "E", "F", "G"],
      answer: 3,
      difficulty: "medium",
      explanation: "Paragraph D says planning can include phased removal or sediment management."
    },
    {
      id: "q50",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph discusses boating, lakeside property value, and local conflicts over benefits?",
      options: ["A", "B", "C", "D", "E", "F", "G"],
      answer: 4,
      difficulty: "easy",
      explanation: "Paragraph E describes social trade-offs and conflicts."
    },
    {
      id: "q51",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which paragraph suggests that modifying a dam can sometimes be enough?",
      options: ["A", "B", "C", "D", "E", "F", "G"],
      answer: 5,
      difficulty: "easy",
      explanation: "Paragraph F lists modification options such as turbine upgrades and adjusted flow releases."
    },
    {
      id: "q52",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "In Paragraph B, the phrase “sediment-starved” most nearly means:",
      options: [
        "lacking the normal supply of sediment",
        "full of extra oxygen and nutrients",
        "blocked by a new fish ladder",
        "protected from erosion by thicker banks"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "If sediment is trapped behind a dam, the downstream river has too little sediment."
    },
    {
      id: "q53",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "In Paragraph E, why do outcomes of dam-removal debates differ from place to place?",
      options: [
        "Because local communities value different benefits and costs",
        "Because dams are always removed in the same way",
        "Because only ecologists are involved in decisions",
        "Because reservoirs never affect property values"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph E says conflicts are common and outcomes depend on local priorities."
    },
    {
      id: "q54",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "According to Paragraph F, removal can be the most practical long-term choice when a dam is:",
      options: [
        "unsafe, too costly to repair, or delivers minimal services",
        "newly built and at peak performance",
        "located in a city with high rainfall",
        "used mainly to trap sediment for construction"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph F lists safety, repair cost, and low service as reasons for removal."
    },
    {
      id: "q55",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which of the following is NOT mentioned in Paragraph G as a way to measure restoration success?",
      options: [
        "Fish returns",
        "Riverbank vegetation",
        "Water temperature",
        "Noise levels near the river"
      ],
      answer: 3,
      difficulty: "medium",
      explanation: "Paragraph G lists ecological indicators like fish returns, vegetation, temperature, and channel features—not noise."
    },

    {
      id: "q56",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Many dams built in the twentieth century are now aging.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A states that many structures are now aging."
    },
    {
      id: "q57",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Engineers and ecologists consider dam removal only because it is always cheaper than repairing a dam.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "The passage gives several reasons to consider removal, but does not claim it is always cheaper."
    },
    {
      id: "q58",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: A dam interrupts a river’s natural sediment flow.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph B explains that a dam interrupts sediment movement."
    },
    {
      id: "q59",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Trapped sediment can increase reservoir storage capacity over time.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph B says trapped material can reduce storage capacity."
    },
    {
      id: "q60",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: A sediment-starved river below a dam may erode its banks and riverbed.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph B describes erosion below a dam when sediment is trapped upstream."
    },
    {
      id: "q61",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Fish ladders work equally well for all species and all flow conditions.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph C states fish ladders may not suit every species or flow condition."
    },
    {
      id: "q62",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Water released from the bottom of a deep reservoir can be warmer than water in a free-flowing river.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph C says bottom releases can be colder than a free-flowing river."
    },
    {
      id: "q63",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Water released from the bottom of a deep reservoir can be lower in oxygen.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph C mentions releases can be lower in oxygen than a free-flowing river."
    },
    {
      id: "q64",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: After a dam is removed, turbidity may increase for months.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph D says turbidity can increase for months as stored sediment moves downstream."
    },
    {
      id: "q65",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Increased turbidity can temporarily harm fish.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph D notes turbidity can temporarily harm fish."
    },
    {
      id: "q66",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Towns downstream always benefit immediately from dam removal.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph D says removal can reduce water quality for towns downstream, at least temporarily."
    },
    {
      id: "q67",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Planning for dam removal sometimes includes phased removal to reduce the shock.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph D explicitly mentions phased removal or sediment management."
    },
    {
      id: "q68",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Reservoirs always provide more recreation opportunities than a restored natural river corridor.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "Paragraph E discusses different views but does not make an absolute comparison."
    },
    {
      id: "q69",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Some communities welcome dam removal because it can restore fisheries.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph E says some welcome restored fisheries and new recreation."
    },
    {
      id: "q70",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Conflicts about dam removal are uncommon because most people agree on priorities.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph E states that conflicts are common."
    },
    {
      id: "q71",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: In some cases, modifying a dam can improve conditions downstream.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph F describes modifications like adjusting flow and habitat projects."
    },
    {
      id: "q72",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Turbines can be upgraded and flow releases can be adjusted.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph F lists turbine upgrades and adjusted flow releases."
    },
    {
      id: "q73",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Dam removal is the only long-term option discussed in the passage.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph F notes that modification can be enough in some cases."
    },
    {
      id: "q74",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Scientists expect a restored river system to be exactly identical to the pre-dam river.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph G says a restored system is rarely identical to what existed before the dam."
    },
    {
      id: "q75",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Success after dam removal is usually measured over years rather than weeks.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph G says success is usually measured over years rather than weeks."
    },

    {
      id: "q76",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: During the twentieth century, dams were built to generate ______.",
      hint: "Write ONE word from the passage.",
      answer: ["electricity"],
      difficulty: "easy",
      explanation: "Paragraph A lists electricity generation as a key reason dams were built."
    },
    {
      id: "q77",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Dams were also built to store water for farms and ______.",
      hint: "Write ONE word from the passage.",
      answer: ["cities"],
      difficulty: "easy",
      explanation: "Paragraph A mentions storing water for farms and cities."
    },
    {
      id: "q78",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Some experts are considering a solution that once seemed extreme: removing a dam ______.",
      hint: "Write ONE word from the passage.",
      answer: ["entirely"],
      difficulty: "medium",
      explanation: "Paragraph A describes removing a dam entirely."
    },
    {
      id: "q79",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Rivers naturally carry ______—sand, gravel, and organic material.",
      hint: "Write ONE word from the passage.",
      answer: ["sediment"],
      difficulty: "easy",
      explanation: "Paragraph B defines sediment and gives examples."
    },
    {
      id: "q80",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: A dam interrupts sediment flow, often trapping sediment in a ______.",
      hint: "Write ONE word from the passage.",
      answer: ["reservoir"],
      difficulty: "easy",
      explanation: "Paragraph B says a dam often traps sediment in a reservoir."
    },
    {
      id: "q81",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: The sediment-starved river below may erode its banks and ______.",
      hint: "Write ONE word from the passage.",
      answer: ["riverbed"],
      difficulty: "medium",
      explanation: "Paragraph B states that the river may erode its banks and riverbed."
    },
    {
      id: "q82",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Species that migrate to ______ can be blocked by dams.",
      hint: "Write ONE word from the passage.",
      answer: ["spawn"],
      difficulty: "easy",
      explanation: "Paragraph C describes fish that migrate to spawn."
    },
    {
      id: "q83",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Fish ladders may not suit every species or every flow ______.",
      hint: "Write ONE word from the passage.",
      answer: ["condition", "conditions"],
      difficulty: "hard",
      explanation: "Paragraph C mentions that fish ladders may not suit every flow condition."
    },
    {
      id: "q84",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Water released from the bottom of a deep reservoir can be colder and lower in ______.",
      hint: "Write ONE word from the passage.",
      answer: ["oxygen"],
      difficulty: "easy",
      explanation: "Paragraph C notes that bottom releases can be lower in oxygen."
    },
    {
      id: "q85",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: After removal, stored sediment may move downstream, increasing ______ for months.",
      hint: "Write ONE word from the passage.",
      answer: ["turbidity"],
      difficulty: "medium",
      explanation: "Paragraph D says turbidity can increase for months after removal."
    },
    {
      id: "q86",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Increased turbidity can reduce water ______ for towns downstream.",
      hint: "Write ONE word from the passage.",
      answer: ["quality"],
      difficulty: "easy",
      explanation: "Paragraph D mentions reduced water quality for towns downstream."
    },
    {
      id: "q87",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Planning often includes phased removal or sediment ______ to reduce the shock.",
      hint: "Write ONE word from the passage.",
      answer: ["management"],
      difficulty: "medium",
      explanation: "Paragraph D uses the phrase “sediment management”."
    },
    {
      id: "q88",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Reservoirs provide boating and lakeside property ______.",
      hint: "Write ONE word from the passage.",
      answer: ["value"],
      difficulty: "easy",
      explanation: "Paragraph E mentions lakeside property value."
    },
    {
      id: "q89",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Removal can be the most practical long-term ______ when a dam is unsafe or too costly to repair.",
      hint: "Write ONE word from the passage.",
      answer: ["choice"],
      difficulty: "medium",
      explanation: "Paragraph F says removal can be the most practical long-term choice under certain conditions."
    },
    {
      id: "q90",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Scientists may track fish returns, riverbank ______, and water temperature.",
      hint: "Write ONE word from the passage.",
      answer: ["vegetation"],
      difficulty: "easy",
      explanation: "Paragraph G lists riverbank vegetation as one of the measures of success."
    }
  );

  // -----------------------------
  // Passage 3 (additional 30 questions) — q91–q120 (to reach bank size 120 for Run=40)
  // -----------------------------
  QUESTIONS.push(
    // Multiple choice (12)
    {
      id: "q91",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Why are engineers and ecologists increasingly considering dam removal?",
      options: [
        "Many dams are aging and some provide less benefit than before",
        "Most dams are newly built and highly efficient",
        "Rivers cannot carry sediment without dams",
        "Fish ladders have completely solved migration problems"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A mentions aging structures and reduced benefits as key drivers."
    },
    {
      id: "q92",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which list correctly identifies materials included in river sediment in Paragraph B?",
      options: [
        "sand, gravel, and organic material",
        "salt, clay, and plastic",
        "water, oxygen, and carbon dioxide",
        "plants, fish, and insects"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph B defines sediment as sand, gravel, and organic material."
    },
    {
      id: "q93",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "What is one consequence of sediment being trapped behind a dam?",
      options: [
        "The reservoir may lose storage capacity over time",
        "The downstream river always becomes deeper and wider",
        "Fish ladders become unnecessary",
        "Water quality downstream always improves immediately"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph B says trapped material can reduce storage capacity."
    },
    {
      id: "q94",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "According to Paragraph C, water released from the bottom of a deep reservoir can be:",
      options: [
        "colder and lower in oxygen",
        "warmer and higher in oxygen",
        "identical in temperature and oxygen to a free-flowing river",
        "saltier because of reverse osmosis"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph C states bottom releases can be colder and lower in oxygen."
    },
    {
      id: "q95",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "What short-term effect may occur after a dam is removed?",
      options: [
        "Increased turbidity for months",
        "Immediate elimination of all sediment downstream",
        "Instantly clearer water for towns downstream",
        "Permanent prevention of erosion below the former dam site"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph D says turbidity may increase for months."
    },
    {
      id: "q96",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which option best describes the purpose of phased removal or sediment management in Paragraph D?",
      options: [
        "To reduce the shock of sudden sediment movement downstream",
        "To guarantee that turbidity will never increase",
        "To increase boating revenue during removal",
        "To replace turbines with fish ladders"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph D says planning includes these methods to reduce the shock."
    },
    {
      id: "q97",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which benefit is mentioned as a reason some communities welcome dam removal?",
      options: [
        "Restored fisheries",
        "Higher reservoir walls",
        "More trapped sediment for construction",
        "Guaranteed identical restoration to the pre-dam river"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph E lists restored fisheries among the welcomed benefits."
    },
    {
      id: "q98",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "What does Paragraph E suggest about conflicts over dam removal?",
      options: [
        "Conflicts are common and outcomes depend on local priorities",
        "Conflicts are rare because priorities are the same everywhere",
        "Conflicts happen only when fish ladders are missing",
        "Conflicts disappear once turbidity is measured"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph E explicitly says conflicts are common and outcomes vary with priorities."
    },
    {
      id: "q99",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which modification is specifically mentioned as an alternative to removal in Paragraph F?",
      options: [
        "Upgrading turbines",
        "Building a reservoir behind the dam",
        "Installing reverse osmosis systems in the river",
        "Removing all sediment from the watershed"
      ],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph F mentions turbine upgrades as one modification."
    },
    {
      id: "q100",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which factor is NOT listed in Paragraph F as a reason removal might be the most practical choice?",
      options: [
        "The dam is unsafe",
        "The dam is too costly to repair",
        "The dam delivers minimal services",
        "The dam provides excellent benefits and is cheap to maintain"
      ],
      answer: 3,
      difficulty: "medium",
      explanation: "Paragraph F gives the first three as reasons; the last option contradicts that list."
    },
    {
      id: "q101",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which pair of features does Paragraph G say the river may re-form after restoration?",
      options: [
        "pools and gravel beds",
        "reservoirs and turbines",
        "fish ladders and floodgates",
        "pipes and filtration barriers"
      ],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph G mentions pools and gravel beds."
    },
    {
      id: "q102",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "Which statement best matches Paragraph G’s view of a restored river system?",
      options: [
        "It may regain many natural functions even if it is not identical to the pre-dam river",
        "It will quickly become identical in every detail to the pre-dam river",
        "It cannot regain any natural functions once a dam has existed",
        "It will always lose fish returns for decades"
      ],
      answer: 0,
      difficulty: "hard",
      explanation: "Paragraph G says the restored system is rarely identical but can regain many functions."
    },

    // True / False / Not Given (10)
    {
      id: "q103",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: The passage states that many dams were built during the twentieth century.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph A begins: “During the twentieth century, dams were built...”"
    },
    {
      id: "q104",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Many dams now provide more benefit than they once did.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph A says some provide less benefit than they once did."
    },
    {
      id: "q105",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: The passage claims that dam removal is instantly beneficial.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph D states removal is not instantly beneficial."
    },
    {
      id: "q106",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Sediment released after removal may reduce water quality for towns downstream.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph D says turbidity can reduce water quality for towns downstream."
    },
    {
      id: "q107",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: The passage says phased removal guarantees there will be no turbidity increase.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "Paragraph D says phased removal can reduce the shock; it does not guarantee no turbidity."
    },
    {
      id: "q108",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: Reservoirs can provide boating opportunities.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "easy",
      explanation: "Paragraph E says reservoirs provide boating."
    },
    {
      id: "q109",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: All communities prefer restored rivers to reservoirs.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "easy",
      explanation: "Paragraph E shows different preferences; some worry about losing reservoir benefits."
    },
    {
      id: "q110",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: The passage says habitat projects can improve conditions downstream of a dam.",
      options: ["True", "False", "Not Given"],
      answer: 0,
      difficulty: "medium",
      explanation: "Paragraph F states habitat projects can improve conditions downstream."
    },
    {
      id: "q111",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: If a dam is unsafe, the passage says it must be removed in every case.",
      options: ["True", "False", "Not Given"],
      answer: 2,
      difficulty: "hard",
      explanation: "Paragraph F lists unsafe dams as a reason removal can be practical, but does not say it must happen in every case."
    },
    {
      id: "q112",
      passageId: "p3",
      type: "multipleChoice",
      passage: P3,
      question: "True / False / Not Given: The passage states that scientists measure restoration success only by counting fish.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "Paragraph G lists multiple measures (vegetation, temperature, channel changes, etc.)."
    },

    // Fill in the blank (8)
    {
      id: "q113",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Dams were built to control ______.",
      hint: "Write ONE word from the passage.",
      answer: ["floods"],
      difficulty: "easy",
      explanation: "Paragraph A lists controlling floods."
    },
    {
      id: "q114",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: A dam can trap sediment in a ______.",
      hint: "Write ONE word from the passage.",
      answer: ["reservoir"],
      difficulty: "easy",
      explanation: "Paragraph B says sediment is often trapped in a reservoir."
    },
    {
      id: "q115",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: The sediment-starved river below a dam may erode its banks and ______.",
      hint: "Write ONE word from the passage.",
      answer: ["riverbed"],
      difficulty: "medium",
      explanation: "Paragraph B mentions erosion of banks and riverbed."
    },
    {
      id: "q116",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Water released from the bottom of a deep reservoir can be colder and lower in ______.",
      hint: "Write ONE word from the passage.",
      answer: ["oxygen"],
      difficulty: "easy",
      explanation: "Paragraph C uses the phrase “lower in oxygen”."
    },
    {
      id: "q117",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: After removal, sediment may move downstream, increasing ______ for months.",
      hint: "Write ONE word from the passage.",
      answer: ["turbidity"],
      difficulty: "medium",
      explanation: "Paragraph D states turbidity may increase for months."
    },
    {
      id: "q118",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Others welcome new recreation along a natural river ______.",
      hint: "Write ONE word from the passage.",
      answer: ["corridor"],
      difficulty: "medium",
      explanation: "Paragraph E mentions a natural river corridor."
    },
    {
      id: "q119",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: Turbines can be ______.",
      hint: "Write ONE word from the passage.",
      answer: ["upgraded"],
      difficulty: "easy",
      explanation: "Paragraph F says turbines can be upgraded."
    },
    {
      id: "q120",
      passageId: "p3",
      type: "fillInTheBlank",
      passage: P3,
      question: "Sentence completion: The river may re-form pools and gravel ______.",
      hint: "Write ONE word from the passage.",
      answer: ["beds"],
      difficulty: "easy",
      explanation: "Paragraph G mentions pools and gravel beds."
    }
  );

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
