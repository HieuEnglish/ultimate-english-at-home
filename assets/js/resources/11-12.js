/* assets/js/resources/11-12.js
   Age 11–12 resource data pack.
   Do NOT host files in repo — only external links.
*/
(function () {
  const AGE = "11-12";

  const DATA = {
    packs: {
      "11-12/reading": {
        title: "11–12 Reading 📖✨",
        overview:
          "A flexible reading program that builds comprehension, vocabulary, inference, and reading stamina using short daily passages, weekly close-reading texts, and graded news/story read-alongs for mixed-ability classes.",
        objectives: [
          "Strengthen comprehension + background knowledge through consistent passage routines.",
          "Improve close reading (annotation, inference, theme) using higher-quality texts and questions.",
          "Develop main idea, detail, vocab-in-context, and inference using adaptive practice.",
          "Build news reading fluency with leveled articles and opinion sharing.",
          "Increase confidence with graded stories + read-along and short written summaries."
        ],
        materials: [
          "Device + internet (optional printer) and a notebook for summaries/vocab.",
          "Core platforms to rotate: ReadWorks, ReadTheory, CommonLit, Khan Academy (Grade 5/6 Reading & Vocab).",
          "Extra reading options (leveled + ESL-friendly): LearnEnglish Kids, LearnEnglish Teens (B1 graded).",
          "News + discussion: Breaking News English, News in Levels.",
          "Read-along stories/dialogues: VOA American Stories, Storynory.",
          "Comprehension organizers: ReadWriteThink Student Interactives (Story Map, etc.)."
        ],
        bestSetSlug: "best-set-bundle-plan-11-12-reading"
      },

      "11-12/listening": {
        title: "11–12 Listening 🎧📚",
        overview:
          "A listening routine for ages 11–12 that builds confidence + comprehension using short ESL videos/stories, levelled teen listening lessons, listening quizzes, audio stories, and simple news listening—following a consistent “gist → details → notes → retell” process.",
        objectives: [
          "Listen for main idea (gist) first, then listen again for details.",
          "Build vocabulary in context from stories/videos and real-life listening topics.",
          "Improve exam-style comprehension with “before listening” tasks + question sets.",
          "Practice shadowing (repeat after audio) to improve speed and accuracy.",
          "Speak after listening: retell stories/news clearly (4–6 sentences or 3-sentence summary)."
        ],
        materials: [
          "Device + internet (tablet/laptop/phone) and headphones if possible.",
          "A notebook (or notes app) to write 5 key words / 5 useful phrases.",
          "Listening sources to rotate: LearnEnglish Kids, LearnEnglish Teens, Randall’s ESL Lab, ELLLO, Storynory, News in Levels (+ optional PBS Kids / TED-Ed)."
        ],
        bestSetSlug: "best-set-mini-pack-11-12-listening"
      },

      "11-12/writing": {
        title: "11–12 Writing ✍️",
        overview:
          "A structured writing mini-pack that helps students write clearer texts by using model examples → guided drafting → grammar accuracy → paragraph structure → revision. It combines teen-friendly writing lessons, creative prompts, and feedback tools to build both confidence and quality.",
        objectives: [
          "Write common A2–B1 text types (messages/chats/emails/short paragraphs; longer connected writing for stronger learners).",
          "Improve organization using planning tools (intro → ideas → details → conclusion) and linking words.",
          "Increase sentence accuracy (punctuation + structure) and turn correct sentences into a paragraph.",
          "Build the habit of revising: submit writing, fix key issues, and resubmit to improve."
        ],
        materials: [
          "Notebook or writing folder (for drafts + “before vs after” versions).",
          "Device + internet access for: LearnEnglish Kids/Teens writing, Quill Grammar, 826 Digital prompts, ReadWriteThink organizers/tools, Write & Improve.",
          "Optional: printer (for worksheets / saving final drafts).",
          "Optional editing tools (only after drafting): LanguageTool or Hemingway Editor."
        ],
        bestSetSlug: "best-set-mini-pack-11-12-writing"
      }
    },

    // Each resource must have unique slug per age+skill.
    resources: [
      // =========================
      // 11–12 READING
      // =========================
      {
        age: AGE,
        skill: "reading",
        slug: "readworks-article-a-day",
        title: "ReadWorks — Article-A-Day & Passages 🗞️📚",
        link: "https://www.readworks.org/article-a-day",
        format: "site",
        description: "Reading passages + routine (digital/print).",
        details: {
          type: "Reading passages + routine (digital/print)",
          teaches: "Comprehension; Vocabulary; Background knowledge; Reading stamina.",
          howTo: [
            "Pick an Article-A-Day set (topic your class likes).",
            "Students read (or listen if available) and underline key facts.",
            "Write 2–3 ‘Book of Knowledge’ takeaways.",
            "Quick pair-share + 1 class summary sentence."
          ],
          whyTopPick: "A short daily routine that builds knowledge quickly and is easy to run.",
          freeAccess: "Free resources; free account is used for assigning/tracking in classrooms.",
          ageCheck: "Great fit for 11–12 (choose grade-appropriate sets for your learners)."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "commonlit-library",
        title: "CommonLit — Text Library (Grades 3–12) 📚🧠",
        link: "https://www.commonlit.org/en/library",
        format: "site",
        description: "Online text library + questions/annotations.",
        details: {
          type: "Online text library + questions/annotations",
          teaches: "Close reading; Inference; Theme; Nonfiction comprehension.",
          howTo: [
            "Filter by grade / Lexile / topic.",
            "Assign 1 text + 1 short discussion question.",
            "Students annotate 3 key lines + write a 3-sentence summary.",
            "Complete built-in comprehension questions."
          ],
          whyTopPick: "High-quality texts across many levels in one place with built-in supports.",
          freeAccess: "Free account required for full classroom assigning/tracking features.",
          ageCheck: "11–12 fits well (use 5th–6th grade and up as needed)."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "readtheory-adaptive-reading",
        title: "ReadTheory — Adaptive Reading Practice 🧩📈",
        link: "https://readtheory.org/",
        format: "site",
        description: "Adaptive reading quizzes + passages.",
        time: "10–15 min",
        focus: "adaptive comprehension",
        details: {
          type: "Adaptive reading quizzes + passages",
          teaches: "Main idea; Detail; Vocab-in-context; Inference.",
          howTo: [
            "Learner takes placement quiz.",
            "Do 10–15 minutes/day (3–5 short passages).",
            "Track weak question types (inference/detail).",
            "Re-read 1 passage and highlight evidence."
          ],
          whyTopPick: "Automatically adjusts difficulty—excellent for mixed-level classes.",
          freeAccess: "Free account available (core practice usable).",
          ageCheck: "Works well for 11–12; keep sessions short to avoid fatigue."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "khan-academy-5th-reading-vocab",
        title: "Khan Academy — Grade 5 Reading & Vocab 🧠📚",
        link: "https://www.khanacademy.org/ela/5th-grade-reading-and-vocab",
        format: "site",
        description: "Interactive reading lessons + vocab practice.",
        level: "Grade 5",
        details: {
          type: "Interactive reading lessons + vocab practice",
          teaches: "Text structure; Author’s purpose; Claims/evidence; Vocabulary.",
          howTo: [
            "Pick 1 unit per week (theme students like).",
            "Read 1 article + answer practice questions.",
            "Do 1 vocab set (5–10 mins).",
            "Finish with a 1-minute oral summary."
          ],
          whyTopPick: "Clear progression + strong skills practice for grades 5–6.",
          freeAccess: "Always-free learning library.",
          ageCheck: "Direct match for 11–12 (grade 5 content)."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "khan-academy-6th-reading-vocab",
        title: "Khan Academy — Grade 6 Reading & Vocab 🧠📚",
        link: "https://www.khanacademy.org/ela/6th-grade-reading-and-vocab",
        format: "site",
        description: "Interactive reading lessons + vocab practice.",
        level: "Grade 6",
        details: {
          type: "Interactive reading lessons + vocab practice",
          teaches: "Text structure; Author’s purpose; Claims/evidence; Vocabulary.",
          howTo: [
            "Pick 1 unit per week (theme students like).",
            "Read 1 article + answer practice questions.",
            "Do 1 vocab set (5–10 mins).",
            "Finish with a 1-minute oral summary."
          ],
          whyTopPick: "Strong Grade 6 alignment for 11–12 reading skills.",
          freeAccess: "Always-free learning library.",
          ageCheck: "Direct match for 11–12 (grade 6 content)."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "learnenglishkids-reading-practice",
        title: "British Council — LearnEnglish Kids (Reading Practice) 🐣📖",
        link: "https://learnenglishkids.britishcouncil.org/read-write/reading-practice",
        format: "site",
        description: "Short texts + activities/worksheets.",
        details: {
          type: "Short texts + activities/worksheets",
          teaches: "Comprehension; Vocabulary; Story understanding.",
          howTo: [
            "Choose a story/reading at the right difficulty.",
            "Pre-teach 5 key words.",
            "Read + do tasks (matching/true-false/etc.).",
            "Retell in 5 sentences (or comic strip)."
          ],
          whyTopPick: "Friendly ESL scaffolding with ready-made tasks and worksheets.",
          freeAccess: "Free to use online (login mainly for posting comments).",
          ageCheck: "Suitable for 11–12—pick harder texts for stronger readers."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "learnenglishteens-b1-graded-reading",
        title: "British Council — LearnEnglish Teens (B1 Graded Reading) 🧑‍🎓📚",
        link: "https://learnenglishteens.britishcouncil.org/study-break/reading-zone/b1-graded-reading",
        format: "site",
        level: "B1",
        description: "B1 stories/articles + exercises.",
        details: {
          type: "B1 stories/articles + exercises",
          teaches: "B1 reading; Gist/detail; Vocabulary.",
          howTo: [
            "Pick 1 text/week.",
            "Do the preparation task first.",
            "Read + complete exercises.",
            "Write 5 ‘new word’ sentences."
          ],
          whyTopPick: "Level-based reading that feels more grown-up for advanced 11–12 learners.",
          freeAccess: "Free to read/do tasks; login mainly for posting comments.",
          ageCheck: "Great for advanced 11–12 / early secondary; preview topics as needed."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "breaking-news-english",
        title: "Breaking News English — Graded News Lessons 🗞️✅",
        link: "https://breakingnewsenglish.com/",
        format: "site",
        description: "News article + multi-level readings + worksheets.",
        focus: "news reading",
        details: {
          type: "News article + multi-level readings + worksheets",
          teaches: "Skimming/scanning; Vocabulary; Comprehension; Discussion prep.",
          howTo: [
            "Choose Level 0–6 (match your class).",
            "Read once for gist, once for details.",
            "Do 10-minute vocab + 10-minute questions.",
            "Finish with 2-minute opinion share."
          ],
          whyTopPick: "Ready-to-print news lessons at multiple levels with built-in tasks.",
          freeAccess: "Core lessons and PDFs are free on the site.",
          ageCheck: "Works for 11–12 if you choose school-safe topics and suitable levels."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "news-in-levels-reading",
        title: "News in Levels — Same News, 3 Reading Levels 📰🎚️",
        link: "https://www.newsinlevels.com/",
        format: "site",
        description: "Graded news (Level 1/2/3) + audio option.",
        focus: "graded news",
        details: {
          type: "Graded news (Level 1/2/3) + audio option",
          teaches: "Reading fluency; Core vocabulary; Current-events comprehension.",
          howTo: [
            "Read Level 1 → Level 2 → Level 3 over 3 days.",
            "Highlight repeated words across levels.",
            "Write 3 facts + 1 opinion.",
            "Optional: listen after reading for pronunciation."
          ],
          whyTopPick: "Built-in differentiation using the same topic across three levels.",
          freeAccess: "Free website access (ad-supported).",
          ageCheck: "Good for 11–12; preview news topics for sensitivity."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "voa-american-stories-voa-learning-english",
        title: "VOA Learning English — American Stories 🇺🇸📖",
        link: "https://learningenglish.voanews.com/z/1581",
        format: "site",
        description: "Short stories with text + audio.",
        details: {
          type: "Short stories with text + audio",
          teaches: "Narrative reading; Vocabulary; Comprehension (intermediate).",
          howTo: [
            "Read the story first (no audio).",
            "Mark unknown words (max 8).",
            "Re-read while listening for fluency.",
            "Write a 4-sentence plot summary."
          ],
          whyTopPick: "Classic-style stories adapted for English learners with audio support.",
          freeAccess: "Free texts and audio on VOA Learning English.",
          ageCheck: "Good for strong 11–12 readers; preview themes (some classics can be darker)."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "storyweaver-11-12",
        title: "StoryWeaver (Pratham Books) — Free Online Books 🌍📚",
        link: "https://storyweaver.org.in/",
        format: "site",
        description: "Online story library (read online; often downloadable).",
        details: {
          type: "Online story library (read online; often downloadable)",
          teaches: "Reading for pleasure; Vocabulary; Story patterns.",
          howTo: [
            "Filter by age/length/genre.",
            "Pick 1 story + 5 key words.",
            "Read + answer ‘Somebody–Wanted–But–So–Then’.",
            "Optional: download/print for homework."
          ],
          whyTopPick: "Huge free library with choice—supports independent reading motivation.",
          freeAccess: "Read online for free (account can help with saving/downloads).",
          ageCheck: "11–12 works well; select longer/harder stories for stronger readers."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "storynory-read-along",
        title: "Storynory — Read-Along Stories (Text + Audio) 🎧📖",
        link: "https://www.storynory.com/",
        format: "site",
        description: "Stories with on-page text + audio.",
        details: {
          type: "Stories with on-page text + audio",
          teaches: "Reading fluency; Narrative comprehension; Vocabulary in context.",
          howTo: [
            "Read the first half silently.",
            "Listen to the same part and track with your eyes/finger.",
            "Finish reading silently + write a 5-sentence summary.",
            "Discuss moral/lesson + new words."
          ],
          whyTopPick: "Read-along format supports fluency without feeling ‘babyish’.",
          freeAccess: "Free access on-site (no paywall for listening/reading).",
          ageCheck: "Good for 11–12 (choose classics/myths; preview for scary themes)."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "readwritethink-student-interactives",
        title: "ReadWriteThink — Student Interactives (Comprehension Tools) 🧩🗺️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives",
        format: "site",
        description: "Graphic organizers (story map, timeline, etc.).",
        focus: "organizers",
        details: {
          type: "Graphic organizers (story map, timeline, etc.)",
          teaches: "Summarizing; Sequencing; Character/problem/solution; Text structure.",
          howTo: [
            "Read any story/article.",
            "Fill a Story Map or organizer.",
            "Turn the organizer into a 1-paragraph summary.",
            "Share with a partner and improve 1 sentence."
          ],
          whyTopPick: "Makes comprehension visible and easy to assess with low prep.",
          freeAccess: "Free online tools.",
          ageCheck: "Great for 11–12; supports independent reading tasks."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "project-gutenberg",
        title: "Project Gutenberg — Free eBooks Library 📚🌐",
        link: "https://www.gutenberg.org/",
        format: "site",
        description: "Free eBooks (read online / download).",
        details: {
          type: "Free eBooks (read online / download)",
          teaches: "Extensive reading; Classic literature exposure; Vocabulary growth.",
          howTo: [
            "Choose a shorter book or graded-friendly classic.",
            "Read 10 minutes/day.",
            "Mark 5 unfamiliar words/week.",
            "Write a 1-paragraph weekly ‘book reaction’."
          ],
          whyTopPick: "Massive legal free library for sustained reading.",
          freeAccess: "Free public-domain eBooks.",
          ageCheck: "Best for advanced 11–12 with support; pick simpler titles and preview themes."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "standard-ebooks",
        title: "Standard Ebooks — Clean, Well-Formatted Classics 📘✨",
        link: "https://standardebooks.org/",
        format: "site",
        description: "Public-domain eBooks (high-quality formatting).",
        details: {
          type: "Public-domain eBooks (high-quality formatting)",
          teaches: "Longer reading; Vocabulary; Reading enjoyment.",
          howTo: [
            "Pick a short classic (or short-story collection).",
            "Read 2–3 pages/day.",
            "Keep a ‘best quote’ notebook line.",
            "Weekly: write a 5-sentence reflection."
          ],
          whyTopPick: "Often easier to read on phones/tablets than scanned PDFs.",
          freeAccess: "Free public-domain ebooks.",
          ageCheck: "For stronger 11–12 readers; preview difficulty and themes."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "loc-free-to-use-classic-childrens-books",
        title: "Library of Congress — Free to Use & Reuse: Classic Children’s Books 🏛️📖",
        link: "https://www.loc.gov/free-to-use/classic-childrens-books/",
        format: "site",
        description: "Public-domain classics (online page-turn style).",
        details: {
          type: "Public-domain classics (online page-turn style)",
          teaches: "Reading stamina; Classic vocabulary; Story structure.",
          howTo: [
            "Pick one title.",
            "Read 2–3 pages + note 3 interesting words.",
            "Retell the scene in your own words.",
            "Optional: draw a scene snapshot."
          ],
          whyTopPick: "High-quality scanned originals—great for a ‘real book’ feel.",
          freeAccess: "Free to use/reuse collection.",
          ageCheck: "11–12 friendly, but language can be challenging—use short chunks."
        }
      },
      {
        age: AGE,
        skill: "reading",
        slug: "best-set-bundle-plan-11-12-reading",
        title: "Best “Set” (Bundle Plan) 🎒📚✅",
        link: "",
        format: "other",
        isBestSet: true,
        description: "Weekly routine bundle for 11–12 Reading.",
        time: "20–30 min/day",
        focus: "routine + differentiation",
        bundleItems: [
          "readworks-article-a-day",
          "readtheory-adaptive-reading",
          "news-in-levels-reading",
          "commonlit-library",
          "readwritethink-student-interactives",
          "voa-american-stories-voa-learning-english"
        ],
        details: {
          type: "Weekly routine bundle",
          teaches: "Daily reading stamina; Skills practice; Differentiation for mixed levels.",
          howTo: [
            "Goal: 20–30 minutes/day, 5 days/week (level-flexible).",
            "1) ReadWorks Article-A-Day — 10 mins/day (Mon–Thu).",
            "2) ReadTheory — 10 mins/day (Mon–Fri).",
            "3) News in Levels — 1 article/week across 3 days (Level 1→2→3).",
            "4) CommonLit — 1 text/week + questions (Friday).",
            "5) ReadWriteThink Story Map — Friday wrap-up (map + paragraph summary).",
            "6) Weekend choice (strong readers): VOA American Stories or Storynory read-along."
          ],
          whyTopPick: "Blends routine practice, adaptive differentiation, and one weekly close-reading task.",
          freeAccess: "All items include free access options (some require free accounts).",
          ageCheck: "Designed for 11–12 and mixed-ability ESL classes."
        }
      },

      // =========================
      // 11–12 LISTENING
      // =========================
      {
        age: AGE,
        skill: "listening",
        slug: "learnenglishkids-listen-watch-11-12",
        title: "LearnEnglish Kids — Listen & Watch (British Council) 🧒🎧",
        link: "https://learnenglishkids.britishcouncil.org/listen-watch",
        format: "site",
        description: "Videos + songs + short stories + poems (+ printables).",
        details: {
          type: "Videos + songs + short stories + poems (+ printables)",
          teaches: "Listening for gist/details; Vocabulary in context.",
          howTo: [
            "Pick Songs / Short stories / Video zone.",
            "Listen once (no pausing) for the main idea.",
            "Listen again and do the activity/worksheet.",
            "Retell the story in 4–6 sentences."
          ],
          whyTopPick: "Kid-safe ESL listening with built-in practice and extension tasks.",
          freeAccess: "Free website access (account optional for comments).",
          ageCheck: "Good fit for 11–12—choose harder videos/stories for older learners."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "learnenglishteens-listening",
        title: "LearnEnglish Teens — Listening (British Council) 🧑‍🎓🎧",
        link: "https://learnenglishteens.britishcouncil.org/skills/listening",
        format: "site",
        description: "Levelled listening lessons + activities.",
        details: {
          type: "Levelled listening lessons + activities",
          teaches: "Real-life listening; Exam-style comprehension.",
          howTo: [
            "Choose a lesson near your level.",
            "Do the ‘before listening’ task.",
            "Listen + answer questions.",
            "Note 5 useful phrases."
          ],
          whyTopPick: "More ‘grown-up’ topics that suit 11–12 moving toward teen content.",
          freeAccess: "Free website access.",
          ageCheck: "Appropriate for older kids; preview topics if sensitive themes appear."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "randalls-esl-lab",
        title: "Randall’s ESL Cyber Listening Lab (ESL-Lab) 🎧📝",
        link: "https://www.esl-lab.com/",
        format: "site",
        description: "Listening quizzes (Easy / Intermediate / Difficult).",
        details: {
          type: "Listening quizzes (Easy / Intermediate / Difficult)",
          teaches: "Everyday listening; Question answering; Listening strategies.",
          howTo: [
            "Start at Easy (or Intermediate if strong).",
            "Listen once for gist.",
            "Do the quiz.",
            "Re-listen and shadow 5 lines."
          ],
          whyTopPick: "Clear levels + lots of structured listening practice.",
          freeAccess: "Free website access (some pages may show ads).",
          ageCheck: "Works well for 11–12; choose school-friendly topics."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "elllo-listening-library",
        title: "ELLLO — English Listening Lesson Library Online 🌍📝",
        link: "https://www.elllo.org/",
        format: "site",
        description: "Listening lessons with transcript + quiz.",
        details: {
          type: "Listening lessons with transcript + quiz",
          teaches: "Listening fluency; Vocabulary; Comprehension strategies.",
          howTo: [
            "Choose a beginner/intermediate conversation.",
            "Listen → read transcript → listen again.",
            "Do the interactive quiz.",
            "Record yourself copying ~30 seconds (optional)."
          ],
          whyTopPick: "Huge free library; many lessons include transcript + quiz for support.",
          freeAccess: "Free lessons on-site.",
          ageCheck: "Mixed topics (kids–adult). Adult/teacher should preview and select."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "voa-lets-learn-english-level-1",
        title: "VOA Learning English — Let’s Learn English (Level 1) 🇺🇸🎧",
        link: "https://learningenglish.voanews.com/p/5644.html",
        format: "site",
        description: "Video lessons + printables.",
        details: {
          type: "Video lessons + printables",
          teaches: "Clear beginner listening; Daily-life vocabulary.",
          howTo: [
            "Watch a lesson video.",
            "Write 8 new words with meanings.",
            "Rewatch and pause to repeat key lines (shadowing).",
            "Do worksheets if available."
          ],
          whyTopPick: "Structured course style with clear speech designed for learners.",
          freeAccess: "Free website access.",
          ageCheck: "Family-friendly everyday topics; good for 11–12 beginners."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "americanenglish-voa-american-stories",
        title: "VOA American Stories (AmericanEnglish) 🇺🇸📖🎧",
        link: "https://americanenglish.state.gov/resources/voa-american-stories",
        format: "site",
        description: "Short stories with audio/video + quizzes.",
        details: {
          type: "Short stories with audio/video + quizzes",
          teaches: "Story listening; Narrative vocabulary; Inference.",
          howTo: [
            "Pick a story (start with easier ones).",
            "Listen and track characters/setting/problem.",
            "Do the quiz activities.",
            "Give a 1-minute story summary."
          ],
          whyTopPick: "Designed for English learners; includes audio + quizzes for checking understanding.",
          freeAccess: "Free government resource page.",
          ageCheck: "Some classic stories can be spooky/older; preview first."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "storynory-audio-stories-11-12",
        title: "Storynory — Free Audio Stories for Kids 🧒✨",
        link: "https://www.storynory.com/",
        format: "site",
        description: "Audio stories + text (fairy tales, myths, originals).",
        details: {
          type: "Audio stories + text (fairy tales, myths, originals)",
          teaches: "Listening comprehension; Story vocabulary; Sequencing.",
          howTo: [
            "Choose a story category (Fairy Tales / Myths / Educational).",
            "Read along while listening.",
            "Write 5 new words + 1 sentence each.",
            "Answer: ‘What happened first/next/last?’"
          ],
          whyTopPick: "Kid-focused audio stories with read-along text support.",
          freeAccess: "Free access on-site.",
          ageCheck: "Strong fit for 11–12 (choose longer/older stories)."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "news-in-levels-listening",
        title: "News in Levels 📰🎧",
        link: "https://www.newsinlevels.com/",
        format: "site",
        description: "News at Level 1/2/3 (+ exercises) with audio.",
        details: {
          type: "News at Level 1/2/3 (+ exercises) with audio",
          teaches: "Listening + reading on the same topic; Retelling.",
          howTo: [
            "Start with Level 1 or 2.",
            "Listen, then read.",
            "Do the exercises.",
            "Tell the news in 3 sentences."
          ],
          whyTopPick: "Adjustable difficulty makes it easy to match 11–12 levels.",
          freeAccess: "Free website access (ad-supported).",
          ageCheck: "News can include serious topics; adult/teacher should select safe articles."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "breaking-news-english-multi-speed-listening",
        title: "Breaking News English — Multi-Speed Listening 🗞️🎚️",
        link: "https://breakingnewsenglish.com/multi-speed-listening.html",
        format: "site",
        description: "Listening at multiple speeds + activities.",
        details: {
          type: "Listening at multiple speeds + activities",
          teaches: "Listening fluency (slow → fast); Key vocabulary; Opinion speaking.",
          howTo: [
            "Listen at the slowest speed for gist.",
            "Increase speed and repeat.",
            "Do the online activities/quizzes.",
            "Debate a simple opinion question."
          ],
          whyTopPick: "Speed control is excellent for building confidence and fluency.",
          freeAccess: "Site provides free ESL/EFL listening lessons.",
          ageCheck: "News themes vary; adult/teacher should pre-check topics."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "listen-a-minute",
        title: "Listen A Minute ⏱️🎧",
        link: "https://listenaminute.com/",
        format: "site",
        description: "60-second listenings + handouts + quizzes.",
        details: {
          type: "60-second listenings + handouts + quizzes",
          teaches: "Short focused listening; Gap-fills; Spelling + vocab.",
          howTo: [
            "Listen twice (no reading).",
            "Read the text and underline unknown words.",
            "Do 1 quiz.",
            "Speak for 30 seconds: ‘My opinion is…’"
          ],
          whyTopPick: "Perfect for quick daily practice across many topics.",
          freeAccess: "Site provides free handouts + MP3 + quizzes.",
          ageCheck: "Some topics can be adult; teacher must choose safe topics."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "englishclub-listening",
        title: "EnglishClub — Listening 🧩🎧",
        link: "https://www.englishclub.com/listening/",
        format: "site",
        description: "Listening guides + quizzes + easy audio practice.",
        details: {
          type: "Listening guides + quizzes + easy audio practice",
          teaches: "Listening strategies; Listening comprehension; Useful expressions.",
          howTo: [
            "Use ‘Listening Quizzes’ or ‘Listen & Learn’.",
            "Listen → answer → check.",
            "Copy 5 useful expressions.",
            "Make 3 sentences using the expressions."
          ],
          whyTopPick: "Clear ESL listening hub with multiple practice paths.",
          freeAccess: "Free website access.",
          ageCheck: "Generally suitable; preview pages because it’s a broad ESL site."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "eslvideo-listening-quizzes",
        title: "ESLvideo.com — Listening Quizzes 📺✅",
        link: "https://www.eslvideo.com/",
        format: "site",
        description: "Video-based listening quizzes (often from YouTube).",
        details: {
          type: "Video-based listening quizzes (often from YouTube)",
          teaches: "Listening for details; Fast feedback via quizzes.",
          howTo: [
            "Search for kid-safe topics (animals, school, science, sports).",
            "Watch once → then take the quiz.",
            "Rewatch and pause to repeat key phrases.",
            "Write 5 answers in full sentences."
          ],
          whyTopPick: "High engagement; quiz format keeps focus.",
          freeAccess: "Site accessible without a paid gate (accounts may be used for saving/creating).",
          ageCheck: "User-generated content; adult supervision + preview required."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "pbs-kids-podcasts",
        title: "PBS KIDS Podcasts 🧒🎙️",
        link: "https://pbskids.org/videos/podcasts",
        format: "site",
        description: "Kids podcasts (short episodes).",
        details: {
          type: "Kids podcasts (short episodes)",
          teaches: "Listening stamina; Everyday vocabulary; Story sequencing.",
          howTo: [
            "Pick one episode (8–13 minutes).",
            "Pause 3 times to note key words.",
            "Retell the episode in order.",
            "Act out 1 short scene/dialogue."
          ],
          whyTopPick: "High-quality, age-appropriate audio for children.",
          freeAccess: "Episode list playable on-site.",
          ageCheck: "Designed for kids; good for 11–12 as ‘fun listening’."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "ted-ed-youtube",
        title: "TED-Ed (YouTube) 🎓📺",
        link: "https://www.youtube.com/@TEDEd",
        format: "video",
        description: "Short animated lessons (science/history/ideas).",
        details: {
          type: "Short animated lessons (science/history/ideas)",
          teaches: "Listening to explanations; Academic vocabulary; Summarizing.",
          howTo: [
            "Choose a topic the student likes.",
            "Watch with English subtitles ON.",
            "Write 5 key words + a 2–3 sentence summary.",
            "Explain the idea to a parent/friend."
          ],
          whyTopPick: "Motivating content for curious learners; great for CLIL-style listening.",
          freeAccess: "Free-to-watch channel (YouTube access required).",
          ageCheck: "YouTube ads/comments risk; use Restricted Mode and adult supervision."
        }
      },
      {
        age: AGE,
        skill: "listening",
        slug: "best-set-mini-pack-11-12-listening",
        title: "Best “Set” (5-day mini-pack for 11–12 Listening) 🎧📅",
        link: "",
        format: "other",
        isBestSet: true,
        description: "Weekly routine bundle (about 20 minutes/day) for 11–12 Listening.",
        time: "~20 min/day",
        focus: "gist → details → retell",
        bundleItems: [
          "learnenglishkids-listen-watch-11-12",
          "randalls-esl-lab",
          "elllo-listening-library",
          "storynory-audio-stories-11-12",
          "news-in-levels-listening",
          "pbs-kids-podcasts"
        ],
        details: {
          type: "Weekly routine bundle",
          teaches: "Gist → details listening process; Vocabulary capture; Retell speaking after listening.",
          howTo: [
            "Goal: ~20 minutes/day.",
            "Mon: LearnEnglish Kids (Listen & Watch) → 1 song or short story.",
            "Tue: Randall’s ESL-Lab → 1 quiz + shadow 5 lines.",
            "Wed: ELLLO → 1 lesson + transcript + quiz.",
            "Thu: Storynory → 1 story + first/next/last retell.",
            "Fri: News in Levels → Level 1/2 audio + 3-sentence summary.",
            "Weekend (optional): PBS KIDS podcast → retell + act out 1 scene.",
            "Simple routine: (1) Listen for gist → (2) Listen for details → (3) Note 5 words → (4) Retell."
          ],
          whyTopPick: "Consistent structure across varied sources keeps practice predictable and progress measurable.",
          freeAccess: "All items include free access options (some may show ads).",
          ageCheck: "Designed for 11–12 with teacher/parent topic selection."
        }
      },

      // =========================
      // 11–12 WRITING
      // =========================
      {
        age: AGE,
        skill: "writing",
        slug: "learnenglishkids-writing-practice",
        title: "Writing practice — LearnEnglish Kids (British Council) ✅✏️",
        link: "https://learnenglishkids.britishcouncil.org/read-write/writing-practice",
        format: "site",
        description: "Writing models + practice tasks + printables.",
        focus: "models + structure",
        details: {
          type: "Writing models + practice tasks + printables",
          teaches: "Short text types (messages, descriptions, stories) + structure.",
          howTo: [
            "Choose Level 3 for 11–12 (or the level that matches ability).",
            "Read the example text.",
            "Copy the structure and write your own version.",
            "Print a worksheet for extra practice (optional)."
          ],
          whyTopPick: "Clear models + guided practice in a kid-safe environment.",
          freeAccess: "Fully usable free; account only for posting comments.",
          ageCheck: "Designed for kids; great for 11–12 ESL/EFL (some tasks may feel easy for strong writers)."
        },
        level: "A2–B1"
      },
      {
        age: AGE,
        skill: "writing",
        slug: "learnenglishteens-a2-writing",
        title: "A2 Writing — LearnEnglish Teens (British Council) ✅🖊️",
        link: "https://learnenglishteens.britishcouncil.org/skills/writing/a2-writing",
        format: "site",
        description: "Model texts + exercises.",
        level: "A2",
        focus: "emails + chats + paragraphs",
        details: {
          type: "Model texts + exercises",
          teaches: "Emails, chats, short paragraphs, basic organization.",
          howTo: [
            "Choose a lesson (e.g., “A chat”).",
            "Do the preparation task.",
            "Study the model text.",
            "Write your own version using the same format."
          ],
          whyTopPick: "Perfect level match for many 11–12 learners (pre-intermediate).",
          freeAccess: "Lessons are accessible free; login mainly for commenting.",
          ageCheck: "Teen site; generally suitable for advanced 11–12 with adult/teacher topic preview."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "learnenglishteens-b1-writing",
        title: "B1 Writing — LearnEnglish Teens (British Council) ✅📝",
        link: "https://learnenglishteens.britishcouncil.org/skills/writing/b1-writing",
        format: "site",
        description: "Intermediate writing lessons + tasks.",
        level: "B1",
        focus: "longer connected writing",
        details: {
          type: "Intermediate writing lessons + tasks",
          teaches: "Blogs, CVs, opinions, longer connected writing.",
          howTo: [
            "Pick one lesson (e.g., “A blog”).",
            "Copy 5 useful phrases from the model.",
            "Write a new text using those phrases.",
            "Self-check with the task questions."
          ],
          whyTopPick: "Strong model-based writing that pushes better students.",
          freeAccess: "Accessible free; login mainly for commenting.",
          ageCheck: "Appropriate for advanced 11–12; preview lesson topics."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "learnenglish-a2-writing",
        title: "A2 Writing — LearnEnglish (British Council) ✅✍️",
        link: "https://learnenglish.britishcouncil.org/skills/writing/a2-writing",
        format: "site",
        description: "Writing lessons with tips + tasks.",
        level: "A2",
        focus: "model → tips → practice",
        details: {
          type: "Writing lessons with tips + tasks",
          teaches: "Notes, messages, profiles, emails; structure + accuracy.",
          howTo: [
            "Do the preparation task.",
            "Read the model + writing tips.",
            "Write your own version (same topic, new details).",
            "Use the tasks as a checklist."
          ],
          whyTopPick: "Very clear “model → tips → practice” progression.",
          freeAccess: "Free website practice (no paywall seen).",
          ageCheck: "General audience; content is typically safe, but adult guidance is recommended."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "write-and-improve",
        title: "Write & Improve (University of Cambridge) 🧠✍️",
        link: "https://writeandimprove.com/",
        format: "site",
        description: "Auto-feedback writing tool (draft → feedback → revise).",
        focus: "revision",
        details: {
          type: "Auto-feedback writing tool",
          teaches: "Drafting + revising with feedback; CEFR-linked results.",
          howTo: [
            "Choose a task (or make your own).",
            "Write and submit.",
            "Fix 3–5 issues and resubmit.",
            "Save “before vs after” to track improvement."
          ],
          whyTopPick: "Real revision practice (the #1 habit that improves writing).",
          freeAccess: "Stated as FREE by the site.",
          ageCheck: "Suitable with teacher/parent supervision (accounts + writing uploads = privacy)."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "quill-grammar",
        title: "Quill Grammar (Quill.org) ✍️✅",
        link: "https://www.quill.org/tools/grammar",
        format: "site",
        description: "Short sentence-writing activities (about 10 minutes).",
        time: "10 min",
        focus: "sentence accuracy",
        details: {
          type: "Short sentence-writing activities",
          teaches: "Sentence accuracy (punctuation, structure) to support better paragraphs.",
          howTo: [
            "Run one activity.",
            "Copy 3 corrected sentences into a notebook.",
            "Combine them into 1 short paragraph.",
            "Quick teacher check."
          ],
          whyTopPick: "Fast, focused writing accuracy practice (great for ESL).",
          freeAccess: "Quill describes itself as a free literacy tool; activities accessible via the platform.",
          ageCheck: "Designed for schools; appropriate for 11–12 with teacher/guardian setup."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "826-digital",
        title: "826 Digital — Writing prompts & lessons 🧠📝",
        link: "https://826digital.com/",
        format: "site",
        description: "Prompt library + lesson packs (free account).",
        time: "10–15 min",
        focus: "ideas + drafting",
        details: {
          type: "Prompt library + lesson packs",
          teaches: "Creative + informational writing (ideas, drafting, voice).",
          howTo: [
            "Sign up for a free account.",
            "Filter by grade and choose a prompt/lesson.",
            "Write for 10–15 minutes (timer).",
            "Revise using a checklist (capitalization, punctuation, detail)."
          ],
          whyTopPick: "Huge bank of high-quality prompts that actually make kids want to write.",
          freeAccess: "Requires a free account; resource library is positioned as free.",
          ageCheck: "K–12; teacher should preview topics (some themes for older grades exist)."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "readwritethink-comic-creator",
        title: "Comic Creator — ReadWriteThink 🎨✍️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/comic-creator",
        format: "site",
        description: "Writing tool for dialogue + captions.",
        focus: "narrative + dialogue",
        details: {
          type: "Writing tool (dialogue + captions)",
          teaches: "Narrative writing, dialogue punctuation, sequencing.",
          howTo: [
            "Plan a 6-panel story (beginning → problem → ending).",
            "Add captions + speech bubbles.",
            "Check punctuation (quotes, question marks).",
            "Share/read aloud."
          ],
          whyTopPick: "Low-stress writing that still builds real skills.",
          freeAccess: "Free web interactive (no paid gate shown).",
          ageCheck: "Classroom tool for kids; suitable for 11–12."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "readwritethink-essay-map",
        title: "Essay Map — ReadWriteThink 📝✅",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/essay",
        format: "site",
        description: "Graphic organizer for expository writing.",
        focus: "structure",
        details: {
          type: "Graphic organizer (expository writing)",
          teaches: "Paragraph/essay structure (intro, ideas, details, conclusion).",
          howTo: [
            "Choose topic + 3 main ideas.",
            "Add 2–3 supporting details each.",
            "Turn the map into paragraphs.",
            "Add linking words (first, because, however)."
          ],
          whyTopPick: "Fixes “messy writing” by forcing clear structure.",
          freeAccess: "Free interactive organizer.",
          ageCheck: "Suitable for 11–12 (especially strong/advanced)."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "readwritethink-persuasion-map",
        title: "Persuasion Map — ReadWriteThink 🗣️✍️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/persuasion",
        format: "site",
        description: "Argument organizer for persuasive writing.",
        focus: "persuasion",
        details: {
          type: "Argument organizer (persuasive writing)",
          teaches: "Claim → reasons → evidence → conclusion.",
          howTo: [
            "Write a clear opinion (claim).",
            "Add 3 reasons + examples.",
            "Draft 4 paragraphs from the map.",
            "Check for strong linking words (because, so, therefore)."
          ],
          whyTopPick: "Makes persuasive writing easy and logical.",
          freeAccess: "Free interactive; can print/email/save output.",
          ageCheck: "Great for 11–12 debates/opinions; keep topics age-appropriate."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "readwritethink-letter-generator",
        title: "Letter Generator — ReadWriteThink 📨✍️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/letter-generator",
        format: "site",
        description: "Template-based writing tool (letters).",
        focus: "real-world formats",
        details: {
          type: "Template-based writing tool",
          teaches: "Friendly/business letter format + clear paragraphs.",
          howTo: [
            "Choose friendly letter.",
            "Fill each part (greeting, body, closing).",
            "Add 3 detail sentences in the body.",
            "Print/finalize."
          ],
          whyTopPick: "Teaches real-world writing formats quickly.",
          freeAccess: "Free interactive (no paid gate shown).",
          ageCheck: "Suitable for 11–12; adult support if emailing/saving."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "readwritethink-postcard-creator",
        title: "Postcard Creator — ReadWriteThink 🖼️✍️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/postcard-creator",
        format: "site",
        description: "Short-form writing template (postcards).",
        focus: "short descriptive writing",
        details: {
          type: "Short-form writing template",
          teaches: "Short descriptive writing + correct layout.",
          howTo: [
            "Pick a place (real or imaginary).",
            "Write 4–6 sentences (what you did, what you saw, feelings).",
            "Add 3 adjectives + 2 past tense verbs.",
            "Print and share."
          ],
          whyTopPick: "Perfect length for 11–12 (quick wins).",
          freeAccess: "Free interactive template.",
          ageCheck: "Kid-appropriate classroom tool."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "purdue-owl-grades-7-12-writing",
        title: "Purdue OWL — Grades 7–12 Writing Resources 📚✅",
        link: "https://owl.purdue.edu/owl/resources/writing_instructors/grades_7_12_instructors_and_students/index.html",
        format: "site",
        description: "Writing guides + strategies (planning, paragraphs, revision).",
        focus: "writing strategies",
        details: {
          type: "Writing guides + strategies",
          teaches: "Planning, paragraphs, essays, revision habits.",
          howTo: [
            "Pick one skill (e.g., introductions, outlines, revision).",
            "Apply it to today’s writing task.",
            "Use the page as a checklist.",
            "Rewrite 1 paragraph to improve it."
          ],
          whyTopPick: "Serious “how to write better” support for stronger 11–12 students.",
          freeAccess: "Open-access Purdue OWL pages.",
          ageCheck: "Written for grades 7–12; works well for advanced 11–12 with guidance."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "teachingenglish-kids-and-writing",
        title: "Kids and writing — TeachingEnglish (British Council) 🧑‍🏫✍️",
        link: "https://www.teachingenglish.org.uk/professional-development/teachers/knowing-subject/kids-and-writing",
        format: "site",
        description: "Teacher guide with practical writing activity ideas.",
        focus: "classroom tasks",
        details: {
          type: "Teacher guide (activity ideas)",
          teaches: "Practical writing tasks (reviews, postcards, instructions, emails).",
          howTo: [
            "Choose 1 activity type (postcard / review / instructions).",
            "Give a simple writing frame (sentence starters).",
            "Write a first draft.",
            "Quick edit: capitals, punctuation, 3 “detail words”."
          ],
          whyTopPick: "Easy-to-run writing activities that fit kids perfectly.",
          freeAccess: "Free article access.",
          ageCheck: "Specifically for children; appropriate with adult facilitation."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "test-english-a2-writing",
        title: "A2 Writing Exercises — Test-English ✍️✅",
        link: "https://test-english.com/writing/a2/",
        format: "site",
        description: "A2 writing tasks + practice pages.",
        level: "A2",
        focus: "formats + practice",
        details: {
          type: "Writing tasks + practice pages",
          teaches: "Common A2 formats (emails, postcards, short essays).",
          howTo: [
            "Pick one task (e.g., postcard).",
            "Copy the structure (opening → details → closing).",
            "Write your version (80–120 words).",
            "Check: verbs, connectors, punctuation."
          ],
          whyTopPick: "Lots of ready-made A2 writing tasks in one place.",
          freeAccess: "Page is accessible free without login (ads may exist).",
          ageCheck: "Generally suitable; adult supervision recommended for web browsing/ads."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "google-applied-digital-skills",
        title: "Applied Digital Skills — Google (middle school+) 💻📝",
        link: "https://grow.google/applied-digital-skills/",
        format: "site",
        description: "Free video-based lessons + projects with real-world writing output.",
        focus: "functional writing",
        details: {
          type: "Free video-based lessons + projects",
          teaches: "Real-world writing in docs (emails, plans, reports, presentations).",
          howTo: [
            "Choose a lesson with writing output (Docs-based).",
            "Follow steps to create the document.",
            "Use the rubric/checklist.",
            "Improve wording for clarity."
          ],
          whyTopPick: "Functional writing that matches school + life skills.",
          freeAccess: "Described as free of charge.",
          ageCheck: "Listed as middle school–high school; suitable for 11–12 with adult oversight."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "languagetool",
        title: "LanguageTool (basic grammar check) ✅🔎",
        link: "https://languagetool.org/",
        format: "site",
        description: "Grammar/spelling checker for final editing (after drafting).",
        focus: "editing",
        details: {
          type: "Grammar/spelling checker tool",
          teaches: "Editing habits (fixing errors + improving clarity).",
          howTo: [
            "Paste the student paragraph.",
            "Fix only the “must-fix” errors first (spelling/punctuation).",
            "Rewrite 2 sentences in simpler English.",
            "Re-check once."
          ],
          whyTopPick: "Strong support for editing without building full dependence.",
          freeAccess: "Free basic use available (advanced features may be paid).",
          ageCheck: "Use with adult supervision (privacy + data entry)."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "hemingway-editor",
        title: "Hemingway Editor (web editor) ✂️✅",
        link: "https://hemingwayapp.com/",
        format: "site",
        description: "Clarity/readability editor for shorter, clearer sentences.",
        focus: "clarity",
        details: {
          type: "Clarity/readability editing tool",
          teaches: "Shorter, clearer sentences; reducing wordiness.",
          howTo: [
            "Paste writing into the editor.",
            "Fix 2–3 “hard to read” sentences.",
            "Replace 5 weak words with stronger ones.",
            "Final read aloud."
          ],
          whyTopPick: "Great for improving clarity fast (especially for ESL).",
          freeAccess: "Web editor supports pasting and editing directly.",
          ageCheck: "Suitable with supervision (don’t paste personal info)."
        }
      },
      {
        age: AGE,
        skill: "writing",
        slug: "best-set-mini-pack-11-12-writing",
        title: "Best “Set” (11–12 Writing mini-pack) 🎒🗓️",
        link: "",
        format: "other",
        isBestSet: true,
        description: "Weekly plan (25–35 min/session): model writing + prompt drafting + sentence accuracy + planning tools + revision.",
        time: "25–35 min/session",
        focus: "model → draft → revise",
        bundleItems: [
          "learnenglishteens-a2-writing",
          "826-digital",
          "quill-grammar",
          "readwritethink-essay-map",
          "readwritethink-persuasion-map",
          "write-and-improve",
          "readwritethink-postcard-creator",
          "languagetool",
          "hemingway-editor"
        ],
        details: {
          type: "Weekly mini-pack",
          teaches: "Clear writing through models, planning, accuracy practice, and revision.",
          howTo: [
            "Mon: LearnEnglish Teens A2 Writing — model text + write your version.",
            "Tue: 826 Digital — 10–15 min prompt draft + add 5 detail words.",
            "Wed: Quill Grammar — 1 short activity → turn corrected sentences into a paragraph.",
            "Thu: ReadWriteThink (Essay Map or Persuasion Map) — plan → draft 4 paragraphs.",
            "Fri: Write & Improve — submit → revise → resubmit (track improvement).",
            "Weekend (optional): Postcard Creator — 6–8 sentence “mini writing” (quick win).",
            "Editing add-on: Use LanguageTool or Hemingway for a final clean-up (only after drafting)."
          ],
          whyTopPick: "Balanced mix of models, creativity, structure, and revision in a simple weekly rhythm.",
          freeAccess: "Uses free resources; some tools require a free account.",
          ageCheck: "Suitable for 11–12 with teacher/parent topic selection and privacy supervision."
        }
      }
    ]
  };

  // Register into the global store (router lazy-loads this file)
  if (window.UEAH_RESOURCES_STORE && typeof window.UEAH_RESOURCES_STORE.add === "function") {
    window.UEAH_RESOURCES_STORE.add(DATA);
  } else {
    // Fail softly if store isn't loaded for some reason
    window.UEAH_RESOURCES_DATA_FALLBACK = DATA;
  }
})();
