/* assets/js/resources/11-12.js
   UEAH Resources Store — Age 11–12
   Skills included in this file:
   - Reading
   - Listening
*/
(function () {
  const AGE = "11-12";

  const PACKS = {
    [`${AGE}/reading`]: {
      age: AGE,
      skill: "Reading",
      title: "11–12 Reading 📖✨",
      overview:
        "A flexible reading program that builds comprehension, vocabulary, inference, and reading stamina using short daily passages, weekly close-reading texts, and graded news/story read-alongs for mixed-ability classes.",
      objectives: [
        "Strengthen comprehension + background knowledge through consistent passage routines.",
        "Improve close reading (annotation, inference, theme) using higher-quality texts and questions.",
        "Develop main idea, detail, vocab-in-context, and inference using adaptive practice.",
        "Build news reading fluency with leveled articles and opinion sharing.",
        "Increase confidence with graded stories + read-along and short written summaries.",
      ],
      materials: [
        "Device + internet (optional printer) and a notebook for summaries/vocab.",
        "Core platforms to rotate: ReadWorks, ReadTheory, CommonLit, Khan Academy (Grade 5/6 Reading & Vocab).",
        "Extra reading options (leveled + ESL-friendly): LearnEnglish Kids, LearnEnglish Teens (B1 graded).",
        "News + discussion: Breaking News English, News in Levels.",
        "Read-along stories/dialogues: VOA American Stories, Storynory.",
        "Comprehension organizers: ReadWriteThink Student Interactives (Story Map, etc.).",
      ],
      bestSetSlug: "best-set-bundle-plan-11-12-reading",
    },

    [`${AGE}/listening`]: {
      age: AGE,
      skill: "Listening",
      title: "11–12 Listening 🎧📚",
      overview:
        "A listening routine for ages 11–12 that builds confidence + comprehension using short ESL videos/stories, levelled teen listening lessons, listening quizzes, audio stories, and simple news listening—following a consistent “gist → details → notes → retell” process.",
      objectives: [
        "Listen for main idea (gist) first, then listen again for details.",
        "Build vocabulary in context from stories/videos and real-life listening topics.",
        "Improve exam-style comprehension with “before listening” tasks + question sets.",
        "Practice shadowing (repeat after audio) to improve speed and accuracy.",
        "Speak after listening: retell stories/news clearly (4–6 sentences or 3-sentence summary).",
      ],
      materials: [
        "Device + internet (tablet/laptop/phone) and headphones if possible.",
        "A notebook (or notes app) to write 5 key words / 5 useful phrases.",
        "Listening sources to rotate: LearnEnglish Kids, LearnEnglish Teens, Randall’s ESL Lab, ELLLO, Storynory, News in Levels (+ optional PBS Kids / TED-Ed).",
      ],
      bestSetSlug: "best-set-mini-pack-11-12-listening",
    },
  };

  const RESOURCES = {
    // ---------------------------
    // 11–12 READING — TOP PICKS
    // ---------------------------
    "readworks-article-a-day": {
      age: AGE,
      skill: "Reading",
      title: "ReadWorks — Article-A-Day & Passages 🗞️📚",
      link: "https://www.readworks.org/article-a-day",
      type: "Reading passages + routine (digital/print)",
      teaches: [
        "Comprehension",
        "Vocabulary",
        "Background knowledge",
        "Reading stamina",
      ],
      howTo: [
        "Pick an Article-A-Day set (topic your class likes).",
        "Students read (or listen if available) and underline key facts.",
        "Write 2–3 ‘Book of Knowledge’ takeaways.",
        "Quick pair-share + 1 class summary sentence.",
      ],
      whyTopPick:
        "A short daily routine that builds knowledge quickly and is easy to run.",
      freeAccess:
        "Free resources; free account is used for assigning/tracking in classrooms.",
      ageCheck:
        "Great fit for 11–12 (choose grade-appropriate sets for your learners).",
    },

    "commonlit-library": {
      age: AGE,
      skill: "Reading",
      title: "CommonLit — Text Library (Grades 3–12) 📚🧠",
      link: "https://www.commonlit.org/en/library",
      type: "Online text library + questions/annotations",
      teaches: ["Close reading", "Inference", "Theme", "Nonfiction comprehension"],
      howTo: [
        "Filter by grade / Lexile / topic.",
        "Assign 1 text + 1 short discussion question.",
        "Students annotate 3 key lines + write a 3-sentence summary.",
        "Complete built-in comprehension questions.",
      ],
      whyTopPick:
        "High-quality texts across many levels in one place with built-in supports.",
      freeAccess:
        "Free account required for full classroom assigning/tracking features.",
      ageCheck: "11–12 fits well (use 5th–6th grade and up as needed).",
    },

    "readtheory-adaptive-reading": {
      age: AGE,
      skill: "Reading",
      title: "ReadTheory — Adaptive Reading Practice 🧩📈",
      link: "https://readtheory.org/",
      type: "Adaptive reading quizzes + passages",
      teaches: ["Main idea", "Detail", "Vocab-in-context", "Inference"],
      howTo: [
        "Learner takes placement quiz.",
        "Do 10–15 minutes/day (3–5 short passages).",
        "Track weak question types (inference/detail).",
        "Re-read 1 passage and highlight evidence.",
      ],
      whyTopPick:
        "Automatically adjusts difficulty—excellent for mixed-level classes.",
      freeAccess: "Free account available (core practice usable).",
      ageCheck: "Works well for 11–12; keep sessions short to avoid fatigue.",
    },

    "khan-academy-5th-reading-vocab": {
      age: AGE,
      skill: "Reading",
      title: "Khan Academy — Grade 5 Reading & Vocab 🧠📚",
      link: "https://www.khanacademy.org/ela/5th-grade-reading-and-vocab",
      type: "Interactive reading lessons + vocab practice",
      teaches: [
        "Text structure",
        "Author’s purpose",
        "Claims/evidence",
        "Vocabulary",
      ],
      howTo: [
        "Pick 1 unit per week (theme students like).",
        "Read 1 article + answer practice questions.",
        "Do 1 vocab set (5–10 mins).",
        "Finish with a 1-minute oral summary.",
      ],
      whyTopPick: "Clear progression + strong skills practice for grades 5–6.",
      freeAccess: "Always-free learning library.",
      ageCheck: "Direct match for 11–12 (grade 5 content).",
    },

    "khan-academy-6th-reading-vocab": {
      age: AGE,
      skill: "Reading",
      title: "Khan Academy — Grade 6 Reading & Vocab 🧠📚",
      link: "https://www.khanacademy.org/ela/6th-grade-reading-and-vocab",
      type: "Interactive reading lessons + vocab practice",
      teaches: [
        "Text structure",
        "Author’s purpose",
        "Claims/evidence",
        "Vocabulary",
      ],
      howTo: [
        "Pick 1 unit per week (theme students like).",
        "Read 1 article + answer practice questions.",
        "Do 1 vocab set (5–10 mins).",
        "Finish with a 1-minute oral summary.",
      ],
      whyTopPick: "Strong Grade 6 alignment for 11–12 reading skills.",
      freeAccess: "Always-free learning library.",
      ageCheck: "Direct match for 11–12 (grade 6 content).",
    },

    "learnenglishkids-reading-practice": {
      age: AGE,
      skill: "Reading",
      title: "British Council — LearnEnglish Kids (Reading Practice) 🐣📖",
      link: "https://learnenglishkids.britishcouncil.org/read-write/reading-practice",
      type: "Short texts + activities/worksheets",
      teaches: ["Comprehension", "Vocabulary", "Story understanding"],
      howTo: [
        "Choose a story/reading at the right difficulty.",
        "Pre-teach 5 key words.",
        "Read + do tasks (matching/true-false/etc.).",
        "Retell in 5 sentences (or comic strip).",
      ],
      whyTopPick:
        "Friendly ESL scaffolding with ready-made tasks and worksheets.",
      freeAccess: "Free to use online (login mainly for posting comments).",
      ageCheck:
        "Suitable for 11–12—pick harder texts for stronger readers.",
    },

    "learnenglishteens-b1-graded-reading": {
      age: AGE,
      skill: "Reading",
      title: "British Council — LearnEnglish Teens (B1 Graded Reading) 🧑‍🎓📚",
      link: "https://learnenglishteens.britishcouncil.org/study-break/reading-zone/b1-graded-reading",
      type: "B1 stories/articles + exercises",
      teaches: ["B1 reading", "Gist/detail", "Vocabulary"],
      howTo: [
        "Pick 1 text/week.",
        "Do the preparation task first.",
        "Read + complete exercises.",
        "Write 5 ‘new word’ sentences.",
      ],
      whyTopPick:
        "Level-based reading that feels more grown-up for advanced 11–12 learners.",
      freeAccess: "Free to read/do tasks; login mainly for posting comments.",
      ageCheck:
        "Great for advanced 11–12 / early secondary; preview topics as needed.",
    },

    "breaking-news-english": {
      age: AGE,
      skill: "Reading",
      title: "Breaking News English — Graded News Lessons 🗞️✅",
      link: "https://breakingnewsenglish.com/",
      type: "News article + multi-level readings + worksheets",
      teaches: ["Skimming/scanning", "Vocabulary", "Comprehension", "Discussion prep"],
      howTo: [
        "Choose Level 0–6 (match your class).",
        "Read once for gist, once for details.",
        "Do 10-minute vocab + 10-minute questions.",
        "Finish with 2-minute opinion share.",
      ],
      whyTopPick:
        "Ready-to-print news lessons at multiple levels with built-in tasks.",
      freeAccess: "Core lessons and PDFs are free on the site.",
      ageCheck:
        "Works for 11–12 if you choose school-safe topics and suitable levels.",
    },

    "news-in-levels-reading": {
      age: AGE,
      skill: "Reading",
      title: "News in Levels — Same News, 3 Reading Levels 📰🎚️",
      link: "https://www.newsinlevels.com/",
      type: "Graded news (Level 1/2/3) + audio option",
      teaches: ["Reading fluency", "Core vocabulary", "Current-events comprehension"],
      howTo: [
        "Read Level 1 → Level 2 → Level 3 over 3 days.",
        "Highlight repeated words across levels.",
        "Write 3 facts + 1 opinion.",
        "Optional: listen after reading for pronunciation.",
      ],
      whyTopPick:
        "Built-in differentiation using the same topic across three levels.",
      freeAccess: "Free website access (ad-supported).",
      ageCheck:
        "Good for 11–12; preview news topics for sensitivity.",
    },

    "voa-american-stories-voa-learning-english": {
      age: AGE,
      skill: "Reading",
      title: "VOA Learning English — American Stories 🇺🇸📖",
      link: "https://learningenglish.voanews.com/z/1581",
      type: "Short stories with text + audio",
      teaches: ["Narrative reading", "Vocabulary", "Comprehension (intermediate)"],
      howTo: [
        "Read the story first (no audio).",
        "Mark unknown words (max 8).",
        "Re-read while listening for fluency.",
        "Write a 4-sentence plot summary.",
      ],
      whyTopPick:
        "Classic-style stories adapted for English learners with audio support.",
      freeAccess: "Free texts and audio on VOA Learning English.",
      ageCheck:
        "Good for strong 11–12 readers; preview themes (some classics can be darker).",
    },

    "storyweaver-11-12": {
      age: AGE,
      skill: "Reading",
      title: "StoryWeaver (Pratham Books) — Free Online Books 🌍📚",
      link: "https://storyweaver.org.in/",
      type: "Online story library (read online; often downloadable)",
      teaches: ["Reading for pleasure", "Vocabulary", "Story patterns"],
      howTo: [
        "Filter by age/length/genre.",
        "Pick 1 story + 5 key words.",
        "Read + answer ‘Somebody–Wanted–But–So–Then’.",
        "Optional: download/print for homework.",
      ],
      whyTopPick:
        "Huge free library with choice—supports independent reading motivation.",
      freeAccess: "Read online for free (account can help with saving/downloads).",
      ageCheck:
        "11–12 works well; select longer/harder stories for stronger readers.",
    },

    "storynory-read-along": {
      age: AGE,
      skill: "Reading",
      title: "Storynory — Read-Along Stories (Text + Audio) 🎧📖",
      link: "https://www.storynory.com/",
      type: "Stories with on-page text + audio",
      teaches: ["Reading fluency", "Narrative comprehension", "Vocabulary in context"],
      howTo: [
        "Read the first half silently.",
        "Listen to the same part and track with your eyes/finger.",
        "Finish reading silently + write a 5-sentence summary.",
        "Discuss moral/lesson + new words.",
      ],
      whyTopPick:
        "Read-along format supports fluency without feeling ‘babyish’.",
      freeAccess: "Free access on-site (no paywall for listening/reading).",
      ageCheck:
        "Good for 11–12 (choose classics/myths; preview for scary themes).",
    },

    "readwritethink-student-interactives": {
      age: AGE,
      skill: "Reading",
      title: "ReadWriteThink — Student Interactives (Comprehension Tools) 🧩🗺️",
      link: "https://www.readwritethink.org/classroom-resources/student-interactives",
      type: "Graphic organizers (story map, timeline, etc.)",
      teaches: [
        "Summarizing",
        "Sequencing",
        "Character/problem/solution",
        "Text structure",
      ],
      howTo: [
        "Read any story/article.",
        "Fill a Story Map or organizer.",
        "Turn the organizer into a 1-paragraph summary.",
        "Share with a partner and improve 1 sentence.",
      ],
      whyTopPick:
        "Makes comprehension visible and easy to assess with low prep.",
      freeAccess: "Free online tools.",
      ageCheck: "Great for 11–12; supports independent reading tasks.",
    },

    "project-gutenberg": {
      age: AGE,
      skill: "Reading",
      title: "Project Gutenberg — Free eBooks Library 📚🌐",
      link: "https://www.gutenberg.org/",
      type: "Free eBooks (read online / download)",
      teaches: ["Extensive reading", "Classic literature exposure", "Vocabulary growth"],
      howTo: [
        "Choose a shorter book or graded-friendly classic.",
        "Read 10 minutes/day.",
        "Mark 5 unfamiliar words/week.",
        "Write a 1-paragraph weekly ‘book reaction’.",
      ],
      whyTopPick: "Massive legal free library for sustained reading.",
      freeAccess: "Free public-domain eBooks.",
      ageCheck:
        "Best for advanced 11–12 with support; pick simpler titles and preview themes.",
    },

    "standard-ebooks": {
      age: AGE,
      skill: "Reading",
      title: "Standard Ebooks — Clean, Well-Formatted Classics 📘✨",
      link: "https://standardebooks.org/",
      type: "Public-domain eBooks (high-quality formatting)",
      teaches: ["Longer reading", "Vocabulary", "Reading enjoyment"],
      howTo: [
        "Pick a short classic (or short-story collection).",
        "Read 2–3 pages/day.",
        "Keep a ‘best quote’ notebook line.",
        "Weekly: write a 5-sentence reflection.",
      ],
      whyTopPick:
        "Often easier to read on phones/tablets than scanned PDFs.",
      freeAccess: "Free public-domain ebooks.",
      ageCheck:
        "For stronger 11–12 readers; preview difficulty and themes.",
    },

    "loc-free-to-use-classic-childrens-books": {
      age: AGE,
      skill: "Reading",
      title:
        "Library of Congress — Free to Use & Reuse: Classic Children’s Books 🏛️📖",
      link: "https://www.loc.gov/free-to-use/classic-childrens-books/",
      type: "Public-domain classics (online page-turn style)",
      teaches: ["Reading stamina", "Classic vocabulary", "Story structure"],
      howTo: [
        "Pick one title.",
        "Read 2–3 pages + note 3 interesting words.",
        "Retell the scene in your own words.",
        "Optional: draw a scene snapshot.",
      ],
      whyTopPick:
        "High-quality scanned originals—great for a ‘real book’ feel.",
      freeAccess: "Free to use/reuse collection.",
      ageCheck:
        "11–12 friendly, but language can be challenging—use short chunks.",
    },

    // Reading best set
    "best-set-bundle-plan-11-12-reading": {
      age: AGE,
      skill: "Reading",
      title: "Best “Set” (Bundle Plan) 🎒📚✅",
      link: "",
      type: "Weekly routine bundle",
      teaches: [
        "Daily reading stamina",
        "Skills practice",
        "Differentiation for mixed levels",
      ],
      howTo: [
        "Goal: 20–30 minutes/day, 5 days/week (level-flexible).",
        "1) ReadWorks Article-A-Day — 10 mins/day (Mon–Thu).",
        "2) ReadTheory — 10 mins/day (Mon–Fri).",
        "3) News in Levels — 1 article/week across 3 days (Level 1→2→3).",
        "4) CommonLit — 1 text/week + questions (Friday).",
        "5) ReadWriteThink Story Map — Friday wrap-up (map + paragraph summary).",
        "6) Weekend choice (strong readers): VOA American Stories or Storynory read-along.",
      ],
      whyTopPick:
        "Blends routine practice, adaptive differentiation, and one weekly close-reading task.",
      freeAccess: "All items include free access options (some require free accounts).",
      ageCheck: "Designed for 11–12 and mixed-ability ESL classes.",
      bundleItems: [
        "readworks-article-a-day",
        "readtheory-adaptive-reading",
        "news-in-levels-reading",
        "commonlit-library",
        "readwritethink-student-interactives",
        "voa-american-stories-voa-learning-english",
      ],
    },

    // ---------------------------
    // 11–12 LISTENING — TOP PICKS
    // ---------------------------
    "learnenglishkids-listen-watch-11-12": {
      age: AGE,
      skill: "Listening",
      title: "LearnEnglish Kids — Listen & Watch (British Council) 🧒🎧",
      link: "https://learnenglishkids.britishcouncil.org/listen-watch",
      type: "Videos + songs + short stories + poems (+ printables)",
      teaches: ["Listening for gist/details", "Vocabulary in context"],
      howTo: [
        "Pick Songs / Short stories / Video zone.",
        "Listen once (no pausing) for the main idea.",
        "Listen again and do the activity/worksheet.",
        "Retell the story in 4–6 sentences.",
      ],
      whyTopPick:
        "Kid-safe ESL listening with built-in practice and extension tasks.",
      freeAccess: "Free website access (account optional for comments).",
      ageCheck:
        "Good fit for 11–12—choose harder videos/stories for older learners.",
    },

    "learnenglishteens-listening": {
      age: AGE,
      skill: "Listening",
      title: "LearnEnglish Teens — Listening (British Council) 🧑‍🎓🎧",
      link: "https://learnenglishteens.britishcouncil.org/skills/listening",
      type: "Levelled listening lessons + activities",
      teaches: ["Real-life listening", "Exam-style comprehension"],
      howTo: [
        "Choose a lesson near your level.",
        "Do the ‘before listening’ task.",
        "Listen + answer questions.",
        "Note 5 useful phrases.",
      ],
      whyTopPick:
        "More ‘grown-up’ topics that suit 11–12 moving toward teen content.",
      freeAccess: "Free website access.",
      ageCheck:
        "Appropriate for older kids; preview topics if sensitive themes appear.",
    },

    "randalls-esl-lab": {
      age: AGE,
      skill: "Listening",
      title: "Randall’s ESL Cyber Listening Lab (ESL-Lab) 🎧📝",
      link: "https://www.esl-lab.com/",
      type: "Listening quizzes (Easy / Intermediate / Difficult)",
      teaches: ["Everyday listening", "Question answering", "Listening strategies"],
      howTo: [
        "Start at Easy (or Intermediate if strong).",
        "Listen once for gist.",
        "Do the quiz.",
        "Re-listen and shadow 5 lines.",
      ],
      whyTopPick: "Clear levels + lots of structured listening practice.",
      freeAccess: "Free website access (some pages may show ads).",
      ageCheck: "Works well for 11–12; choose school-friendly topics.",
    },

    "elllo-listening-library": {
      age: AGE,
      skill: "Listening",
      title: "ELLLO — English Listening Lesson Library Online 🌍📝",
      link: "https://www.elllo.org/",
      type: "Listening lessons with transcript + quiz",
      teaches: ["Listening fluency", "Vocabulary", "Comprehension strategies"],
      howTo: [
        "Choose a beginner/intermediate conversation.",
        "Listen → read transcript → listen again.",
        "Do the interactive quiz.",
        "Record yourself copying ~30 seconds (optional).",
      ],
      whyTopPick:
        "Huge free library; many lessons include transcript + quiz for support.",
      freeAccess: "Free lessons on-site.",
      ageCheck:
        "Mixed topics (kids–adult). Adult/teacher should preview and select.",
    },

    "voa-lets-learn-english-level-1": {
      age: AGE,
      skill: "Listening",
      title: "VOA Learning English — Let’s Learn English (Level 1) 🇺🇸🎧",
      link: "https://learningenglish.voanews.com/p/5644.html",
      type: "Video lessons + printables",
      teaches: ["Clear beginner listening", "Daily-life vocabulary"],
      howTo: [
        "Watch a lesson video.",
        "Write 8 new words with meanings.",
        "Rewatch and pause to repeat key lines (shadowing).",
        "Do worksheets if available.",
      ],
      whyTopPick:
        "Structured course style with clear speech designed for learners.",
      freeAccess: "Free website access.",
      ageCheck:
        "Family-friendly everyday topics; good for 11–12 beginners.",
    },

    "americanenglish-voa-american-stories": {
      age: AGE,
      skill: "Listening",
      title: "VOA American Stories (AmericanEnglish) 🇺🇸📖🎧",
      link: "https://americanenglish.state.gov/resources/voa-american-stories",
      type: "Short stories with audio/video + quizzes",
      teaches: ["Story listening", "Narrative vocabulary", "Inference"],
      howTo: [
        "Pick a story (start with easier ones).",
        "Listen and track characters/setting/problem.",
        "Do the quiz activities.",
        "Give a 1-minute story summary.",
      ],
      whyTopPick:
        "Designed for English learners; includes audio + quizzes for checking understanding.",
      freeAccess: "Free government resource page.",
      ageCheck:
        "Some classic stories can be spooky/older; preview first.",
    },

    "storynory-audio-stories-11-12": {
      age: AGE,
      skill: "Listening",
      title: "Storynory — Free Audio Stories for Kids 🧒✨",
      link: "https://www.storynory.com/",
      type: "Audio stories + text (fairy tales, myths, originals)",
      teaches: ["Listening comprehension", "Story vocabulary", "Sequencing"],
      howTo: [
        "Choose a story category (Fairy Tales / Myths / Educational).",
        "Read along while listening.",
        "Write 5 new words + 1 sentence each.",
        "Answer: ‘What happened first/next/last?’",
      ],
      whyTopPick: "Kid-focused audio stories with read-along text support.",
      freeAccess: "Free access on-site.",
      ageCheck: "Strong fit for 11–12 (choose longer/older stories).",
    },

    "news-in-levels-listening": {
      age: AGE,
      skill: "Listening",
      title: "News in Levels 📰🎧",
      link: "https://www.newsinlevels.com/",
      type: "News at Level 1/2/3 (+ exercises) with audio",
      teaches: ["Listening + reading on the same topic", "Retelling"],
      howTo: [
        "Start with Level 1 or 2.",
        "Listen, then read.",
        "Do the exercises.",
        "Tell the news in 3 sentences.",
      ],
      whyTopPick:
        "Adjustable difficulty makes it easy to match 11–12 levels.",
      freeAccess: "Free website access (ad-supported).",
      ageCheck:
        "News can include serious topics; adult/teacher should select safe articles.",
    },

    "breaking-news-english-multi-speed-listening": {
      age: AGE,
      skill: "Listening",
      title: "Breaking News English — Multi-Speed Listening 🗞️🎚️",
      link: "https://breakingnewsenglish.com/multi-speed-listening.html",
      type: "Listening at multiple speeds + activities",
      teaches: ["Listening fluency (slow → fast)", "Key vocabulary", "Opinion speaking"],
      howTo: [
        "Listen at the slowest speed for gist.",
        "Increase speed and repeat.",
        "Do the online activities/quizzes.",
        "Debate a simple opinion question.",
      ],
      whyTopPick:
        "Speed control is excellent for building confidence and fluency.",
      freeAccess: "Site provides free ESL/EFL listening lessons.",
      ageCheck:
        "News themes vary; adult/teacher should pre-check topics.",
    },

    "listen-a-minute": {
      age: AGE,
      skill: "Listening",
      title: "Listen A Minute ⏱️🎧",
      link: "https://listenaminute.com/",
      type: "60-second listenings + handouts + quizzes",
      teaches: ["Short focused listening", "Gap-fills", "Spelling + vocab"],
      howTo: [
        "Listen twice (no reading).",
        "Read the text and underline unknown words.",
        "Do 1 quiz.",
        "Speak for 30 seconds: ‘My opinion is…’",
      ],
      whyTopPick: "Perfect for quick daily practice across many topics.",
      freeAccess: "Site provides free handouts + MP3 + quizzes.",
      ageCheck:
        "Some topics can be adult; teacher must choose safe topics.",
    },

    "englishclub-listening": {
      age: AGE,
      skill: "Listening",
      title: "EnglishClub — Listening 🧩🎧",
      link: "https://www.englishclub.com/listening/",
      type: "Listening guides + quizzes + easy audio practice",
      teaches: ["Listening strategies", "Listening comprehension", "Useful expressions"],
      howTo: [
        "Use ‘Listening Quizzes’ or ‘Listen & Learn’.",
        "Listen → answer → check.",
        "Copy 5 useful expressions.",
        "Make 3 sentences using the expressions.",
      ],
      whyTopPick: "Clear ESL listening hub with multiple practice paths.",
      freeAccess: "Free website access.",
      ageCheck:
        "Generally suitable; preview pages because it’s a broad ESL site.",
    },

    "eslvideo-listening-quizzes": {
      age: AGE,
      skill: "Listening",
      title: "ESLvideo.com — Listening Quizzes 📺✅",
      link: "https://www.eslvideo.com/",
      type: "Video-based listening quizzes (often from YouTube)",
      teaches: ["Listening for details", "Fast feedback via quizzes"],
      howTo: [
        "Search for kid-safe topics (animals, school, science, sports).",
        "Watch once → then take the quiz.",
        "Rewatch and pause to repeat key phrases.",
        "Write 5 answers in full sentences.",
      ],
      whyTopPick: "High engagement; quiz format keeps focus.",
      freeAccess:
        "Site accessible without a paid gate (accounts may be used for saving/creating).",
      ageCheck:
        "User-generated content; adult supervision + preview required.",
    },

    "pbs-kids-podcasts": {
      age: AGE,
      skill: "Listening",
      title: "PBS KIDS Podcasts 🧒🎙️",
      link: "https://pbskids.org/videos/podcasts",
      type: "Kids podcasts (short episodes)",
      teaches: ["Listening stamina", "Everyday vocabulary", "Story sequencing"],
      howTo: [
        "Pick one episode (8–13 minutes).",
        "Pause 3 times to note key words.",
        "Retell the episode in order.",
        "Act out 1 short scene/dialogue.",
      ],
      whyTopPick: "High-quality, age-appropriate audio for children.",
      freeAccess: "Episode list playable on-site.",
      ageCheck: "Designed for kids; good for 11–12 as ‘fun listening’.",
    },

    "ted-ed-youtube": {
      age: AGE,
      skill: "Listening",
      title: "TED-Ed (YouTube) 🎓📺",
      link: "https://www.youtube.com/@TEDEd",
      type: "Short animated lessons (science/history/ideas)",
      teaches: ["Listening to explanations", "Academic vocabulary", "Summarizing"],
      howTo: [
        "Choose a topic the student likes.",
        "Watch with English subtitles ON.",
        "Write 5 key words + a 2–3 sentence summary.",
        "Explain the idea to a parent/friend.",
      ],
      whyTopPick: "Motivating content for curious learners; great for CLIL-style listening.",
      freeAccess: "Free-to-watch channel (YouTube access required).",
      ageCheck:
        "YouTube ads/comments risk; use Restricted Mode and adult supervision.",
    },

    // Listening best set
    "best-set-mini-pack-11-12-listening": {
      age: AGE,
      skill: "Listening",
      title: "Best “Set” (5-day mini-pack for 11–12 Listening) 🎧📅",
      link: "",
      type: "Weekly routine bundle",
      teaches: [
        "Gist → details listening process",
        "Vocabulary capture",
        "Retell speaking after listening",
      ],
      howTo: [
        "Goal: ~20 minutes/day.",
        "Mon: LearnEnglish Kids (Listen & Watch) → 1 song or short story.",
        "Tue: Randall’s ESL-Lab → 1 quiz + shadow 5 lines.",
        "Wed: ELLLO → 1 lesson + transcript + quiz.",
        "Thu: Storynory → 1 story + first/next/last retell.",
        "Fri: News in Levels → Level 1/2 audio + 3-sentence summary.",
        "Weekend (optional): PBS KIDS podcast → retell + act out 1 scene.",
        "Simple routine: (1) Listen for gist → (2) Listen for details → (3) Note 5 words → (4) Retell.",
      ],
      whyTopPick:
        "Consistent structure across varied sources keeps practice predictable and progress measurable.",
      freeAccess: "All items include free access options (some may show ads).",
      ageCheck: "Designed for 11–12 with teacher/parent topic selection.",
      bundleItems: [
        "learnenglishkids-listen-watch-11-12",
        "randalls-esl-lab",
        "elllo-listening-library",
        "storynory-audio-stories-11-12",
        "news-in-levels-listening",
        "pbs-kids-podcasts",
      ],
    },
  };

  // Register into the global store
  window.UEAH_RESOURCES_STORE = window.UEAH_RESOURCES_STORE || {};
  window.UEAH_RESOURCES_STORE.add = window.UEAH_RESOURCES_STORE.add || function (payload) {
    window.UEAH_RESOURCES_STORE.data = window.UEAH_RESOURCES_STORE.data || {
      packs: {},
      resources: {},
    };
    Object.assign(window.UEAH_RESOURCES_STORE.data.packs, payload.packs || {});
    Object.assign(window.UEAH_RESOURCES_STORE.data.resources, payload.resources || {});
  };

  window.UEAH_RESOURCES_STORE.add({
    packs: PACKS,
    resources: RESOURCES,
  });
})();
