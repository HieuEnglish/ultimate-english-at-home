/* global window */
/**
 * Age pack: 13–18
 * This file is auto-consumed by the SPA router (assets/js/app.js) via UEAH_RESOURCES_STORE.
 */
(() => {
  "use strict";

  const DATA = {
    age: "13-18",
    packs: {
      "13-18/reading": {
        title: "13–18 Reading 📖✨",
        overview:
          "📌 A structured 13–18 Reading routine that builds teen reading skills through levelled texts, adaptive practice, graded news, and evidence-based responses, with a consistent weekly plan and a short daily summary add-on. 🗓️⏱️📝",
        objectives: [
          "🎯 Improve gist + detail reading and overall comprehension. ✅📚",
          "🎯 Grow vocabulary by tracking new words and using them in short summaries. 🧠📝📈",
          "🎯 Practice evidence-based answers (“answer + evidence”). 🔎📌✅",
          "🎯 Build fluency through repeated, level-appropriate reading (news + longer texts). 📰📖🔁",
          "🎯 Develop independent study habits via a repeatable weekly plan (25–40 mins/day). 🗓️⏱️💪"
        ],
        materials: [
          "🧰 LearnEnglish Teens Reading (levelled texts + exercises) ✅🧑‍🎓",
          "🧰 ReadTheory (adaptive practice + review mistakes) 📈🧠",
          "🧰 Breaking News English (graded news lessons + discussion) ⚡🗞️",
          "🧰 CommonLit (texts + questions; “answer + evidence”) 🏫📚",
          "🧰 News in Levels (3-level news reading + vocab/fluency routine) 🌍📰",
          "🧰 VOA American Stories (read + listen; theme + retell) 📖🎧",
          "🧰 ReadWriteThink Notetaker (main idea → details → summary paragraph) 📝🗂️"
        ]
      },

      "13-18/listening": {
        title: "13–18 Listening 🏆🎧",
        overview:
          "🎧 A teen listening resource pack that builds real-life comprehension and exam-style listening through levelled lessons, podcasts, and news/academic listening, with a consistent routine: gist → detail → task → retell/summarize. 🧠✅🔁🗣️📝",
        objectives: [
          "🎯 Understand main ideas and key details from short and medium listening texts across levels/topics. ✅🎧",
          "🎯 Improve listening fluency (including speed control) using graded and multi-speed practice. 🐢🐇📈",
          "🎯 Build vocabulary through note-taking tasks (keywords, facts, useful phrases). 📝🧩📌",
          "🎯 Develop speaking output from listening: retell, mini-talk summaries, brief “news briefing” summaries, and reaction recordings. 🗣️🎙️📰"
        ],
        materials: [
          "🧰 LearnEnglish Teens — Listening (British Council) 🎧✅",
          "🧰 ELLLO (audio/video + transcript + quiz) 🌍🎧🧩",
          "🧰 VOA Learning English + VOA Podcast 📰🎧📻",
          "🧰 Randall’s ESL Cyber Listening Lab (ESL-Lab) 🎧🧪",
          "🧰 Breaking News English (multi-speed listening) ⚡🐢🐇🎧",
          "🧰 News in Levels (reading + listening) 🗞️🎧",
          "🧰 TED-Ed lessons (video listening + ideas) 🎬🧠",
          "🧰 BBC Learning English (6 Minute English + Learning English from the News) ⏲️📰🎧"
        ]
      },

      "13-18/writing": {
        title: "13–18 Writing 🧑‍🎓✍️",
        overview:
          "✍️ A teen writing practice pack focused on building clear, organized paragraphs and essays (argument/expository) while improving grammar, style, and self-editing. Activities use short models + planning tools + revision loops so students can write better drafts for school and exams. 🧠🧱🔁✅",
        objectives: [
          "🎯 Write clear paragraphs with a topic sentence, support, and conclusion 🧱✅",
          "🎯 Plan and structure short essays (intro → body → conclusion) 🗺️📝",
          "🎯 Use stronger academic/functional phrases (linking, comparing, concluding) 🧾📈",
          "🎯 Improve accuracy (sentence structure, punctuation, verb tense) ✅✍️",
          "🎯 Revise drafts using feedback tools and checklists 🔁🧰✅",
          "🎯 Build confidence and speed through regular short writing practice 💪⏱️✍️"
        ],
        materials: [
          "📱💻🌐 Device + internet (phone/tablet/laptop)",
          "📝📄 Writing notebook or Google Doc / Word doc",
          "🖨️📑 Optional: printer for planners/checklists"
        ]
      },

      "13-18/speaking": {
        title: "13–18 Speaking 🗣️✨",
        overview:
          "🗣️ A curated set of teen-appropriate speaking resources and routines to build real-life communication skills (opinions, advice, everyday situations) plus fluency, pronunciation, and confidence through repeatable practice and short speaking tasks. 🔁🎯🎙️✅",
        objectives: [
          "🎯 Improve fluency and longer answers (smoother speaking + better detail). 🗣️📈",
          "🎯 Build practical speaking for real situations (functional language + common topics). 🛍️🗺️💬",
          "🎯 Strengthen test-style speaking skills (coherence, structured responses, clear delivery). 🎓✅🧠",
          "🎯 Develop discussion/debate skills (reasons, counterarguments, polite responses). ⚖️💡🤝",
          "🎯 Improve pronunciation accuracy with quick daily drills. 🔤🔊⚡"
        ],
        materials: [
          "📱💻🌐 Phone/laptop + internet, headphones, and a microphone (phone mic is fine) 🎧🎙️",
          "📓 Notebook (new phrases, errors to fix, weekly targets) 📝🎯",
          "🌐 Core tools/websites: LearnEnglish Teens Speaking, LearnEnglish Speaking, Speak & Improve, Cambridge speaking activities, Kialo Edu, Everyday Conversations, Wheel of Names, Sounds Right phonemic chart 🔁🧠✅"
        ]
      }
    },

    resources: [
      // =========================
      // 13–18 READING 📖✨
      // =========================
      {
        age: "13-18",
        skill: "reading",
        slug: "learnenglishteens-reading",
        title: "📚 Reading — LearnEnglish Teens (British Council) ✅🧑‍🎓",
        description: "Levelled reading texts + interactive exercises ✅",
        link: "https://learnenglishteens.britishcouncil.org/skills/reading",
        format: "site",
        level: "A2–B2",
        focus: "comprehension, vocab, tests",
        details: {
          type: "Levelled reading texts + interactive exercises ✅🧩",
          teaches: "Reading for school/tests + vocabulary building 📈📚",
          howTo: [
            "1️⃣ 🎚️ Choose a level (A2–B2)",
            "2️⃣ 👀 Read once for gist (no dictionary) 🚫📖",
            "3️⃣ ✅ Do the tasks/exercises 📝",
            "4️⃣ ✍️ Write a 3–5 sentence summary + 5 new words 🧠📝"
          ],
          whyTopPick: "Teen-focused, organised by level, with built-in practice. ⭐🌟",
          freeAccess: "Free site access (login mainly for posting). 🆓💬",
          ageCheck: "Designed for teens; generally appropriate. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "learnenglishteens-reading-zone",
        title: "📰 Reading Zone — LearnEnglish Teens (British Council) 📖✅",
        description: "Stories/articles/reviews + activities 🧠",
        link: "https://learnenglishteens.britishcouncil.org/study-break/reading-zone",
        format: "site",
        focus: "enjoyable reading, comprehension, vocab",
        details: {
          type: "Stories/articles/reviews + activities 🧠🧩",
          teaches: "Enjoyable reading + comprehension + new vocabulary 📚✨",
          howTo: [
            "1️⃣ 🎚️ Pick your level 🎯",
            "2️⃣ 📌 Choose a text that interests you 💡",
            "3️⃣ ✅ Do the activities 📝",
            "4️⃣ 🗣️ Discuss: “main idea + your opinion” 💬"
          ],
          whyTopPick: "Learner-written texts at 3 levels + vocabulary activities. ⭐💡",
          freeAccess: "Free access (account mainly for comments). 🆓💬",
          ageCheck: "Teen-safe overall; quick topic preview recommended. 🔍✅"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "commonlit-grades-6-12-text-library",
        title: "🏫 CommonLit (Grades 6–12 Text Library) 📚✅",
        description: "Fiction/nonfiction texts + questions + classroom tools 📝",
        link: "https://www.commonlit.org/",
        format: "site",
        focus: "close reading, inference, evidence",
        details: {
          type: "Fiction/nonfiction texts + questions + classroom tools 📝🧩",
          teaches: "Close reading, inference, evidence-based answers 🔎📌",
          howTo: [
            "1️⃣ 🧑‍🏫 Create a free teacher account 🆓",
            "2️⃣ 🔎 Filter texts by grade/topic 🎯",
            "3️⃣ ✅ Assign reading + questions 📝",
            "4️⃣ ✍️ Require “answer + text evidence” ✅📌"
          ],
          whyTopPick:
            "Strong secondary reading library; CommonLit states it will remain free for teachers/students. ⭐🌟",
          freeAccess:
            "Free account; core reading library is positioned as free (premium options may exist). 🆓🔓",
          ageCheck: "Built for grades 6–12; great for teens. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "readworks-passages-library",
        title: "📄 ReadWorks — Passages Library 🗞️✅",
        description: "Thousands of fiction/nonfiction passages + supports 📚",
        link: "https://www.readworks.org/books/passages",
        format: "site",
        focus: "comprehension, vocab, knowledge",
        details: {
          type: "Passage bank (fiction + nonfiction) 📚🧩",
          teaches: "Comprehension + vocabulary + knowledge building 🧠📈",
          howTo: [
            "1️⃣ 🧑‍🏫 Make a free educator/parent account 🆓",
            "2️⃣ 🔎 Pick a passage set by grade/topic 🎯",
            "3️⃣ 👀 Read + underline key details ✍️",
            "4️⃣ ✍️ Summary + 3 comprehension questions 📝✅"
          ],
          whyTopPick: "Reliable free passage bank; good for mixed levels. ⭐🎯",
          freeAccess: "ReadWorks promotes a FREE account and “thousands of free passages.” 🆓📚",
          ageCheck: "K–12 coverage; select teen-grade passages. ✅🎚️"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "readtheory-adaptive-reading-practice",
        title: "📈 ReadTheory — Adaptive Reading Practice 🧠✅",
        description: "Adaptive passages + quizzes 📊",
        link: "https://readtheory.org/",
        format: "site",
        level: "K–12 (adaptive)",
        time: "10–15 min/day",
        focus: "main idea, inference, detail, vocab-in-context",
        details: {
          type: "Adaptive passages + quizzes 📊🧩",
          teaches: "Main idea, inference, vocab-in-context, detail reading 🔎✅",
          howTo: [
            "1️⃣ 🎚️ Take placement/diagnostic 🧪",
            "2️⃣ ⏱️ Practice 10–15 minutes/day 📅",
            "3️⃣ ✅ Review wrong answers (find the evidence) 🔍📌",
            "4️⃣ 📝 Track 1 weak skill weekly 📈"
          ],
          whyTopPick: "Auto-leveling helps teen classes with mixed ability. ⭐📈",
          freeAccess: "Site states “It’s free” and promotes free sign-up. 🆓✅",
          ageCheck: "K–12 + ESL use; suitable for teens. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "breaking-news-english-7-level-news-lessons",
        title: "🗞️ Breaking News English — 7-Level News Lessons ⚡✅",
        description: "Graded news readings + activities + printable PDFs 📄",
        link: "https://breakingnewsenglish.com/",
        format: "site",
        focus: "skimming, scanning, vocab, discussion",
        details: {
          type: "Graded news readings + activities + printable PDFs 📄🧩",
          teaches: "Skimming/scanning, vocab, comprehension, discussion prompts 🧠💬",
          howTo: [
            "1️⃣ 🎚️ Choose Level 3–6 for most teens 🎯",
            "2️⃣ 👀 Read for gist → then detail 🔁",
            "3️⃣ ✅ Do 5–10 minutes of tasks ⏱️📝",
            "4️⃣ 🗣️ 2-minute opinion using 1–2 facts from the text 💬📌"
          ],
          whyTopPick: "“Free lessons in 7 levels” makes differentiation easy. ⭐📈",
          freeAccess: "Site provides many free lessons + PDFs/activities. 🆓📄",
          ageCheck: "News can be serious; teacher preview recommended. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "news-in-levels-same-news-in-3-levels",
        title: "🌍 News in Levels — Same News in 3 Levels 📰✅",
        description: "Graded news reading (and listening option) 🎧",
        link: "https://www.newsinlevels.com/",
        format: "site",
        time: "Daily routine (re-read next day)",
        focus: "fluency, vocab, news",
        details: {
          type: "Graded news reading (and listening option) 🎧🧩",
          teaches: "Fluency + vocab growth with built-in leveling 📈🗞️",
          howTo: [
            "1️⃣ 🎚️ Choose Level 1/2/3 (many teens use 2–3) 🎯",
            "2️⃣ 🖍️ Highlight repeated keywords 🔁",
            "3️⃣ ✍️ Write 3 facts + 1 opinion 📝💬",
            "4️⃣ 🔁 Re-read next day for speed ⏱️📈"
          ],
          whyTopPick: "Clear “3 levels” system; fast to assign. ⭐⚡",
          freeAccess: "Website is accessible and readable free (ad-supported). 🆓📢",
          ageCheck: "World news can be sensitive; preview topics. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "voa-american-stories",
        title: "📖🎧 American Stories — VOA Learning English ✅",
        description: "Adapted short stories (read + listen) 📚",
        link: "https://learningenglish.voanews.com/z/1581",
        format: "site",
        focus: "narrative comprehension, literature vocab",
        details: {
          type: "Adapted short stories (read + listen) 📚🎧",
          teaches: "Narrative comprehension + literature vocabulary 🧠📖",
          howTo: [
            "1️⃣ 👀 Read first for meaning ✅",
            "2️⃣ 🧩 Mark 8 useful new words 📝",
            "3️⃣ 🎧 Listen while following text 🔁",
            "4️⃣ ✍️ Write: plot summary + “lesson/theme” 🧠✨"
          ],
          whyTopPick: "Classic-style stories adapted for intermediate learners. ⭐🌟",
          freeAccess: "VOA Learning English pages are accessible free. 🆓✅",
          ageCheck: "Good for teens; preview darker themes in some classics. 🔍⚠️"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "american-english-ebooks",
        title: "📱 American English eBooks (U.S. State Dept.) 📚✅",
        description: "Free graded readers/eBooks (EPUB/MOBI) 📲",
        link: "https://americanenglish.state.gov/ebooks",
        format: "site",
        time: "10–15 min/day",
        focus: "extensive reading, vocab, confidence",
        details: {
          type: "Free graded readers/eBooks (EPUB/MOBI) 📲🧩",
          teaches: "Extensive reading + vocabulary + confidence 📈📚",
          howTo: [
            "1️⃣ 📥 Download a graded reader (EPUB/MOBI) 📲",
            "2️⃣ ⏱️ Read 10–15 min/day 🗓️",
            "3️⃣ 📝 Keep a weekly “5 useful words” log 🧠",
            "4️⃣ 🗣️ Weekly book chat: character/problem/solution 💬"
          ],
          whyTopPick: "Legit free downloads, great for teen devices. ⭐📲",
          freeAccess: "Page explicitly says free e-books are available in EPUB/MOBI. 🆓📥",
          ageCheck: "Teen-appropriate; choose titles by maturity/level. ✅🎚️"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "project-gutenberg-free-ebooks-library",
        title: "📚 Project Gutenberg — Free eBooks Library 🆓✅",
        description: "Public-domain books (read online/download) 📥",
        link: "https://www.gutenberg.org/",
        format: "site",
        time: "1 chapter/week",
        focus: "stamina, classic vocab",
        details: {
          type: "Public-domain books (read online/download) 📥🧩",
          teaches: "Longer reading stamina + classic vocabulary 🧠📖",
          howTo: [
            "1️⃣ 🔎 Pick a short classic/short stories 📘",
            "2️⃣ 📌 Read 1 chapter/week 🗓️",
            "3️⃣ ✍️ Write a 6-sentence recap 📝",
            "4️⃣ 🧩 Save 5 strong phrases 💡"
          ],
          whyTopPick: "Huge legal free library (site lists 75,000+). ⭐📚",
          freeAccess: "Site describes itself as “Free eBooks.” 🆓✅",
          ageCheck: "Classics can include mature themes; curate choices. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "standard-ebooks-clean-free-classics",
        title: "✨ Standard Ebooks — Clean, Free Public-Domain eBooks 📘✅",
        description: "Professionally formatted classics (free) 📲",
        link: "https://standardebooks.org/",
        format: "site",
        time: "10 min/day",
        focus: "comfortable extensive reading",
        details: {
          type: "Professionally formatted classics (free) 📲🧩",
          teaches: "Comfortable extensive reading on phones/tablets 📱📖",
          howTo: [
            "1️⃣ 📚 Pick a teen-suitable classic ✅",
            "2️⃣ ⏱️ Read 10 minutes/day 🗓️",
            "3️⃣ 📝 Copy 1 “best sentence” daily ✨",
            "4️⃣ ✍️ Weekly reflection paragraph 🧠📝"
          ],
          whyTopPick: "Better formatting than many scans; easy on devices. ⭐✅",
          freeAccess: "Describes itself as free and public-domain focused. 🆓📘",
          ageCheck: "Curate titles for maturity and difficulty. 🔍🎚️"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "read-gov-classic-books-online",
        title: "🏛️ Classic Books Online — Read.gov (Library of Congress) 📖✅",
        description: "Classic books to read online 📚",
        link: "https://www.read.gov/books/",
        format: "site",
        focus: "classic reading, cultural literacy",
        details: {
          type: "Classic books to read online 📚🧩",
          teaches: "Classic reading practice + cultural literacy 🧠🏛️",
          howTo: [
            "1️⃣ 📌 Choose a classic with short chapters 📘",
            "2️⃣ 📝 Note 3 key events per chapter ✅",
            "3️⃣ ✍️ Write a 5-bullet summary 📝🔹",
            "4️⃣ 🗣️ Discuss theme + character decisions 💬"
          ],
          whyTopPick: "Stable, official classic book hub. ⭐🏛️",
          freeAccess: "Digitized classics available for online reading. 🆓✅",
          ageCheck: "Some classics are heavy; teacher curation recommended. ⚠️📚"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "loc-open-access-books",
        title: "📚 Open Access Books — Library of Congress ✅📖",
        description: "Contemporary open-access eBooks (wide subjects) 📘",
        link: "https://www.loc.gov/collections/open-access-books/about-this-collection/",
        format: "site",
        focus: "academic reading, topic vocab",
        details: {
          type: "Contemporary open-access eBooks (wide subjects) 📘🧩",
          teaches: "Academic reading + topic vocabulary (history/tech/etc.) 🎓🧠",
          howTo: [
            "1️⃣ 🔎 Pick a topic book your teens care about 🎯",
            "2️⃣ 🧾 Use headings to outline sections 🗂️",
            "3️⃣ ✍️ Summarize each section in 2 sentences 📝",
            "4️⃣ ✅ Make 5 “reading questions” and answer them ❓✅"
          ],
          whyTopPick: "High-quality, legal OA books across subjects. ⭐🌟",
          freeAccess: "Collection is described as open access / no restrictions (for included titles). 🆓🔓",
          ageCheck: "Best for older/stronger teens; complexity varies. 🎚️✅"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "ck12-flexbooks-academic-reading",
        title: "📘 CK-12 FlexBooks (Academic Reading) 🧠✅",
        description: "Digital textbooks (science/math/etc.) 📚",
        link: "https://ck12.org/fbbrowse/",
        format: "site",
        focus: "academic text structure, subject vocab",
        details: {
          type: "Digital textbooks (science/math/etc.) 📚🧩",
          teaches: "Academic text structure + subject vocabulary 🎓🏫",
          howTo: [
            "1️⃣ 🎯 Pick a subject section (e.g., Biology) 🧬",
            "2️⃣ 📝 “Main idea + 3 details” per page/section ✅",
            "3️⃣ 🧩 Build a mini glossary (10 terms/week) 📚",
            "4️⃣ ✅ Do any practice questions if present 📝"
          ],
          whyTopPick: "Real school-style reading that prepares teens for content classes. ⭐🏫",
          freeAccess: "CK-12 describes a library of free online textbooks/resources. 🆓📚",
          ageCheck: "Appropriate for teens; difficulty is higher (good for advanced). 🎚️💪"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "englishforeveryone-reading-comprehension-worksheets",
        title: "🧾 Reading Comprehension Worksheets — EnglishForEveryone 📄✅",
        description: "Printable passages + questions 🖨️",
        link: "https://englishforeveryone.org/Topics/Reading-Comprehension.html",
        format: "site",
        focus: "inference, tone, details",
        details: {
          type: "Printable passages + questions 🖨️📄",
          teaches: "Comprehension skills (inference, tone, details) 🔎✅",
          howTo: [
            "1️⃣ 🖨️ Print (or read onscreen) 1 passage 📄",
            "2️⃣ ✅ Answer questions 📝",
            "3️⃣ 🔍 Prove answers by underlining evidence 📌",
            "4️⃣ ✍️ Write a short summary paragraph 🧠📝"
          ],
          whyTopPick: "Quick, printable practice with lots of passages. ⭐⚡",
          freeAccess: "Page lists its reading worksheets openly (ad-supported site). 🆓📢",
          ageCheck: "Suitable for teens; standard web ads—supervision advised. 🛡️✅"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "readwritethink-notetaker",
        title: "📝 ReadWriteThink Notetaker (After-reading tool) ✅🧠",
        description: "Note/outline organizer for reading & writing 🗂️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/readwritethink-notetaker",
        format: "site",
        focus: "main idea, details, summaries, evidence",
        details: {
          type: "Note/outline organizer for reading & writing 🗂️🧩",
          teaches: "Summarising + organising key ideas 📌📝",
          howTo: [
            "1️⃣ 👀 Read any article/story 📖",
            "2️⃣ 📝 Fill main idea → details in the tool 🗂️",
            "3️⃣ ✍️ Turn notes into a summary paragraph 🧠📝",
            "4️⃣ ✅ Highlight the evidence sentences used 📌✅"
          ],
          whyTopPick: "Makes comprehension visible and easy to assess. ⭐✅",
          freeAccess: "Free student interactive. 🆓✅",
          ageCheck: "Works well for 13–18 school reading. ✅🏫"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "readwritethink-story-map",
        title: "🗺️ Story Map (ReadWriteThink) 📖✅",
        description: "Graphic organizer for stories 🧩",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/story",
        format: "site",
        focus: "narrative comprehension",
        details: {
          type: "Graphic organizer for stories 🧩🗺️",
          teaches: "Character/setting/conflict/resolution understanding 🧠📖",
          howTo: [
            "1️⃣ 📌 Read a short story 📖",
            "2️⃣ 🗺️ Fill character + conflict + resolution 🧩",
            "3️⃣ ✍️ Write a summary using the map 📝",
            "4️⃣ 🗣️ Explain the “turning point” 💬"
          ],
          whyTopPick: "Strong structure for narrative comprehension. ⭐🌟",
          freeAccess: "Free interactive tool. 🆓✅",
          ageCheck: "Suitable for teens; great for lower-level readers too. ✅🎚️"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "readwritethink-venn-diagram",
        title: "⭕ Venn Diagram (ReadWriteThink) 🔁✅",
        description: "Compare/contrast organizer 🧠",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/venn-diagram",
        format: "site",
        focus: "compare/contrast, evidence-based writing",
        details: {
          type: "Compare/contrast organizer 🧠⭕",
          teaches: "Comparing texts/ideas logically (evidence-based) 📌🔎",
          howTo: [
            "1️⃣ 📚 Read two short texts on the same topic 🧩",
            "2️⃣ ⭕ Fill similarities/differences 🔁",
            "3️⃣ ✍️ Write a compare/contrast paragraph 📝",
            "4️⃣ ✅ Include 1 quote/fact from each text 📌✅"
          ],
          whyTopPick: "Perfect for exam-style compare tasks. ⭐🎯",
          freeAccess: "Free interactive tool with print option. 🆓🖨️",
          ageCheck: "Appropriate for 13–18. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "lit2go-classic-literature",
        title: "Lit2Go — Classic Literature & Poems 📖🎧",
        description: "Free online collection of stories and poems in audio format with printable text.",
        link: "https://etc.usf.edu/lit2go/",
        format: "site",
        focus: "classic literature, reading stamina",
        details: {
          type: "Audiobooks + printable reading passages 📚🎧",
          teaches: "Reading classic literature, understanding complex themes, and poetry appreciation 🧠📖",
          howTo: [
            "1️⃣ 🔎 Browse by author, genre, or readability level (Flesch-Kincaid) 🎯",
            "2️⃣ 🎧 Listen to the audio while reading the text passage 📖",
            "3️⃣ 📝 Note down interesting historical vocabulary 📌",
            "4️⃣ 🗣️ Write a brief character analysis or summary ✍️"
          ],
          whyTopPick: "Excellent for bridging the gap to high school English literature demands. ⭐📚",
          freeAccess: "Provided free by the Florida Center for Instructional Technology. 🆓✅",
          ageCheck: "Classic texts can contain dated language/themes; requires some maturity. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "reading",
        slug: "best-set-bundle-13-18-reading",
        title: "Best “Set” (Recommended Bundle) 🎒📚✅",
        description: "Weekly plan (25–40 mins/day) 🗓️⏱️ + daily summary add-on 📝",
        link: "",
        format: "other",
        time: "25–40 mins/day",
        focus: "comprehension, vocab, evidence, fluency",
        notes: "Use the resources above in a simple weekly rotation + 5-minute daily Notetaker summary add-on.",
        details: {
          type: "Weekly plan 🗓️⏱️ + daily add-on 📝✅",
          teaches:
            "Consistent teen reading practice: levelled texts + adaptive skills + graded news + evidence-based responses + summaries 📚🧠📈",
          howTo: [
            "Weekly plan (25–40 mins/day) 🗓️⏱️",
            "Mon 🟦: LearnEnglish Teens Reading — 1 text + exercises ✅🧑‍🎓",
            "Tue 🟩: ReadTheory — 10–15 mins adaptive practice + error review 📈🧠",
            "Wed 🟨: Breaking News English — 1 lesson (Level 4–6) + discussion 🗞️💬",
            "Thu 🟧: CommonLit — 1 text + “answer + evidence” responses 🏫📌✅",
            "Fri 🟥: News in Levels — focus on fluency + vocab 🌍📰📈",
            "Weekend 🌈: American Stories (VOA) — story + theme sentence + retell 📖🎧🗣️",
            "Daily add-on (5 mins) 📝: ReadWriteThink Notetaker for summaries ✅🗂️"
          ],
          whyTopPick: "Repeatable routine that balances skills + real reading + evidence-based answers. ⭐🎯",
          freeAccess: "Built from free-access sites listed above (some may be ad-supported). 🆓📢",
          ageCheck: "Designed for teens; preview news/classic themes when needed. ✅⚠️"
        },
        isBestSet: true,
        bundleItems: [
          "learnenglishteens-reading",
          "readtheory-adaptive-reading-practice",
          "breaking-news-english-7-level-news-lessons",
          "commonlit-grades-6-12-text-library",
          "news-in-levels-same-news-in-3-levels",
          "voa-american-stories",
          "readwritethink-notetaker"
        ]
      },

      // =========================
      // 13–18 LISTENING 🏆🎧
      // =========================
      {
        age: "13-18",
        skill: "listening",
        slug: "learnenglishteens-listening",
        title: "🎧 LearnEnglish Teens — Listening (British Council) 🎧✅",
        description: "Interactive listening lessons + exercises 📝",
        link: "https://learnenglishteens.britishcouncil.org/skills/listening",
        format: "site",
        focus: "real-life listening, exam-style comprehension",
        details: {
          type: "Interactive listening lessons + exercises 📝🧩",
          teaches: "Real-life listening + exam-style comprehension (by level) ✅🎯",
          howTo: [
            "1️⃣ ✅ Open the Listening page and choose your level/topic 🎚️📌",
            "2️⃣ 🎧 Listen once (no pausing) for gist 🚫⏸️",
            "3️⃣ 🔁 Listen again + do the tasks/questions ✅📝",
            "4️⃣ 🗣️ Check answers, then retell the audio in 3–5 sentences 🧠🗣️"
          ],
          whyTopPick: "Teen-focused topics + structured practice by level. ⭐🌟",
          freeAccess: "Fully free on the site (no payment shown). 🆓✅",
          ageCheck: "Designed for teens; preview topics if needed. 🔍✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "elllo-english-listening-lesson-library-online",
        title: "🌍 ELLLO (English Listening Lesson Library Online) 🎧",
        description: "Audio/video lessons + transcript + quiz 🧩",
        link: "https://www.elllo.org/",
        format: "site",
        focus: "global accents, conversation, vocab-in-context",
        details: {
          type: "Audio/video lessons + transcript + quiz 🎧🧩✅",
          teaches: "Global accents, everyday conversation, vocabulary in context 🌎🗣️📚",
          howTo: [
            "1️⃣ 🔎 Pick a level/topic (or search a keyword) 🎚️🔍",
            "2️⃣ 🎧 Listen once → then read the transcript 📄",
            "3️⃣ ✅ Do the quiz + review wrong answers 🔁📝",
            "4️⃣ 🗣️ Shadow (repeat with the speaker) for 60 seconds ⏱️🔁"
          ],
          whyTopPick: "Massive library with transcripts + quizzes. ⭐📚",
          freeAccess: "States “free listening lessons” and usable without paying. 🆓✅",
          ageCheck: "Teen-appropriate overall; preview some topics. 🔍✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "voa-learning-english",
        title: "📰 VOA Learning English (Voice of America) 🎧",
        description: "News + audio/video learning programs 🗞️",
        link: "https://learningenglish.voanews.com/",
        format: "site",
        focus: "clear American English listening, vocab, comprehension",
        details: {
          type: "News + audio/video learning programs 🗞️🎧🧩",
          teaches: "Clear American English listening + vocabulary + comprehension 🧠✅",
          howTo: [
            "1️⃣ 🧭 Choose a program (news, culture, science, etc.) 🎯",
            "2️⃣ 🎧 Listen first → then read along (if available) 📄",
            "3️⃣ ✍️ Write 5 key words + 2 key facts you heard 📝📌",
            "4️⃣ 🗣️ Summarize out loud in 30–60 seconds 🎙️⏱️"
          ],
          whyTopPick: "Authentic, learner-friendly audio at a slower pace. ⭐✅",
          freeAccess: "Free to access on VOA Learning English site. 🆓✅",
          ageCheck: "Mostly teen-safe; news topics can be serious—preview when needed. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "voa-learning-english-podcast",
        title: "🎙️ VOA Learning English Podcast 📻📰",
        description: "Podcast episodes (news/feature-style) 🧩",
        link: "https://learningenglish.voanews.com/z/1689",
        format: "site",
        focus: "listening fluency, key vocabulary, regular episodes",
        details: {
          type: "Podcast episodes (news/feature-style) 📻📰🧩",
          teaches: "Listening fluency + key vocabulary through regular episodes ✅📈",
          howTo: [
            "1️⃣ 🎧 Play today’s episode ▶️",
            "2️⃣ ✍️ Do a short dictation (write 3–5 sentences you hear) 📝",
            "3️⃣ 🔁 Replay and fix your spelling/grammar ✅✍️",
            "4️⃣ 🗣️ Record a 1-minute reaction summary 🎙️⏱️"
          ],
          whyTopPick: "Consistent, bite-sized practice with fresh content. ⭐🔁",
          freeAccess: "Free access via VOA page. 🆓✅",
          ageCheck: "Fine for teens; preview if a topic is heavy. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "randalls-esl-cyber-listening-lab",
        title: "🎧 Randall’s ESL Cyber Listening Lab (ESL-Lab) 🧪",
        description: "Listening quizzes by level 📝",
        link: "https://www.esl-lab.com/",
        format: "site",
        focus: "test-style listening, practical comprehension",
        details: {
          type: "Listening quizzes by level 📝🎧🧩",
          teaches: "Practical listening comprehension + test-style questions ✅🎯",
          howTo: [
            "1️⃣ 🎚️ Choose Easy/Intermediate/Difficult 🎯",
            "2️⃣ 🎧 Listen and answer the quiz questions ✅📝",
            "3️⃣ ✅ Check answers and replay tricky parts 🔁",
            "4️⃣ 🗣️ Practice “repeat + respond” 🔁💬"
          ],
          whyTopPick: "Clear structure + targeted quiz practice. ⭐🎯",
          freeAccess: "Site is accessible and usable without paying. 🆓✅",
          ageCheck: "Teen-appropriate; preview themes if needed. 🔍✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "breaking-news-english-multi-speed-listening",
        title: "⚡ Breaking News English — Multi-Speed Listening 🏃‍♂️🎧",
        description: "News listening at multiple speeds 🧠",
        link: "https://breakingnewsenglish.com/multi-speed-listening.html",
        format: "site",
        focus: "speed control, news vocab, comprehension",
        details: {
          type: "News listening at multiple speeds 🐢🐇🎧🧩",
          teaches: "Listening speed control + news vocabulary + comprehension ✅📈",
          howTo: [
            "1️⃣ 🐢 Start slower to catch meaning ✅",
            "2️⃣ 🐇 Increase speed step-by-step 🔁📈",
            "3️⃣ ✅ Do lesson activities/questions 📝",
            "4️⃣ 🗣️ 2-minute discussion/debate 💬⏱️"
          ],
          whyTopPick: "Same content in multiple speeds—perfect progression. ⭐📈",
          freeAccess: "Many free materials (also promotes paid extras). 🆓📢",
          ageCheck: "News can be serious—preview recommended. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "news-in-levels-reading-and-listening",
        title: "🗞️ News in Levels (Reading + Listening) 🎧",
        description: "News stories at 3 levels with listening 🔊",
        link: "https://www.newsinlevels.com/",
        format: "site",
        focus: "leveled listening, vocab, retell",
        details: {
          type: "News at 3 levels with listening 🔊🧩",
          teaches: "Listening comprehension with leveled vocabulary 📚✅",
          howTo: [
            "1️⃣ 🧩 Pick Level 1/2/3 🎚️",
            "2️⃣ 🎧 Listen first → then read 📄",
            "3️⃣ ✍️ Note 8–10 useful words 📝",
            "4️⃣ 🗣️ Retell in 30–60 seconds 🎙️⏱️"
          ],
          whyTopPick: "Same news idea across levels = confidence building. ⭐📈",
          freeAccess: "Usable free (ad-supported). 🆓📢",
          ageCheck: "World news can be sensitive—preview if needed. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "ted-ed-lessons",
        title: "🎬 TED-Ed Lessons (Video-based listening) 🧠",
        description: "Short educational videos + lesson format 🎥",
        link: "https://ed.ted.com/",
        format: "site",
        focus: "academic listening, note-taking, key ideas",
        details: {
          type: "Short educational videos + lesson format 🎥🧩",
          teaches: "Academic listening, note-taking, key idea extraction 📝✅",
          howTo: [
            "1️⃣ 🎯 Choose a topic teens actually like 💡",
            "2️⃣ 🎧 Watch once (no subtitles) for gist 🚫📝",
            "3️⃣ 🔁 Watch again with notes (3 key points + 5 keywords) 📝📌",
            "4️⃣ 🗣️ 60-second mini-talk summary 🎙️⏱️"
          ],
          whyTopPick: "High engagement + “listen for ideas” practice. ⭐🌟",
          freeAccess: "Free to watch; account optional. 🆓✅",
          ageCheck: "Generally teen-appropriate; preview sensitive themes. 🔍✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "englishclub-listening-quizzes",
        title: "🧠 EnglishClub — Listening Quizzes 🎧",
        description: "Listening quizzes + answers ✅",
        link: "https://www.englishclub.com/esl-quizzes/listening/",
        format: "site",
        focus: "listening for detail, quick warmups",
        details: {
          type: "Listening quizzes + answers ✅🎧🧩",
          teaches: "Listening for detail + common conversational understanding 🗣️✅",
          howTo: [
            "1️⃣ 🎧 Play the audio 🔊",
            "2️⃣ ✅ Choose the best answer 📝",
            "3️⃣ 🔁 Replay and catch key words 🔍",
            "4️⃣ ✍️ Write 3 useful phrases 📝💡"
          ],
          whyTopPick: "Quick, low-prep listening checks. ⭐⏱️",
          freeAccess: "Free-access quizzes (ad-supported). 🆓📢",
          ageCheck: "Teen-safe; ads—supervision/ad blocker if needed. 🛡️✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "listen-a-minute-60-second-listenings",
        title: "⏱️ Listen A Minute (60-second listenings) 🎧",
        description: "Very short MP3 listenings + worksheets/quizzes 📝",
        link: "https://listenaminute.com/",
        format: "site",
        focus: "daily reps, gist/detail, shadowing",
        details: {
          type: "Very short MP3 listenings + worksheets/quizzes 📝🎧🧩",
          teaches: "Speedy practice: gist + detail + pronunciation focus 🔁✅",
          howTo: [
            "1️⃣ 🎧 Listen once: main idea 🧠",
            "2️⃣ 🔁 Listen again + quiz ✅📝",
            "3️⃣ 🗣️ Shadow rhythm/linking 🔁",
            "4️⃣ ✍️ 4-sentence opinion response 📝💬"
          ],
          whyTopPick: "Daily “listening reps” without fatigue. ⭐🏋️",
          freeAccess: "Described as free with downloads + MP3/quizzes. 🆓✅",
          ageCheck: "Teen-appropriate; may feel easy for advanced learners. 🎚️✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "manythings-voa-special-english-scripts",
        title: "📻 ManyThings — VOA Special English Text & MP3 🎧",
        description: "Audio + text scripts (VOA style) 📄",
        link: "https://www.manythings.org/voa/scripts/",
        format: "site",
        focus: "read-along listening, vocab in context",
        details: {
          type: "Audio + text scripts (VOA style) 📄🎧🧩",
          teaches: "Listening + read-along + vocabulary in context 🧠✅",
          howTo: [
            "1️⃣ 🎧 Play MP3 while reading 📄",
            "2️⃣ ✍️ Highlight 10 useful words/phrases 📝",
            "3️⃣ 🔁 Replay + read aloud with audio 🗣️🔁",
            "4️⃣ 🗣️ Summarize in 5 bullets 📝🔹"
          ],
          whyTopPick: "Simple read-along listening with clear scripts. ⭐✅",
          freeAccess: "Text + MP3 access without payment. 🆓✅",
          ageCheck: "Older site style/ads—basic supervision recommended. 🛡️✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "learnenglish-british-council-listening-general",
        title: "🌍 LearnEnglish (British Council) — Listening (general) 🎧",
        description: "Listening tasks by level + exercises 📝",
        link: "https://learnenglish.britishcouncil.org/skills/listening",
        format: "site",
        focus: "everyday + academic listening strategies",
        details: {
          type: "Listening tasks by level + exercises 📝🎧🧩",
          teaches: "Everyday + academic listening strategies ✅🧠",
          howTo: [
            "1️⃣ 🎯 Pick level and topic 🎚️📌",
            "2️⃣ 🎧 Gist → detail 🔁",
            "3️⃣ ✅ Do exercises + review mistakes 📝✅",
            "4️⃣ 🗣️ Retell using “First / Then / Finally” 🧩🗣️"
          ],
          whyTopPick: "Clean, structured tasks that scale to higher teens. ⭐📈",
          freeAccess: "Accessible and usable free on site. 🆓✅",
          ageCheck: "Suitable for older teens; generally neutral. ✅🎓"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "bbc-learning-english-6-minute-english-youtube",
        title: "📺 BBC Learning English — 6 Minute English (YouTube) ⏲️",
        description: "Short discussion episodes + vocab 🎙️",
        link: "https://www.youtube.com/playlist?list=PLcetZ6gSk96-FECmH9l7Vlx5VDigvgZpt",
        format: "video",
        focus: "topic vocab, opinions/arguments listening",
        details: {
          type: "Short discussion episodes + vocab 🎙️🎧🧩",
          teaches: "Topic vocabulary + listening for opinions/arguments 🧠✅",
          howTo: [
            "1️⃣ 🎧 Listen once (no captions) 🚫📝",
            "2️⃣ 🔁 Listen again + write 6 new words/phrases ✍️🧠",
            "3️⃣ 🗣️ Paraphrase each speaker’s point 🧩",
            "4️⃣ ✍️ Agree/Disagree + why 💬📝"
          ],
          whyTopPick: "Teen-friendly topics in a short time. ⭐⏱️",
          freeAccess: "Free on YouTube (ads possible). 🆓📢",
          ageCheck: "Generally teen-safe; preview sensitive topics. 🔍✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "bbc-learning-english-from-the-news-youtube",
        title: "📰 BBC Learning English — Learning English from the News (YouTube) 🎧",
        description: "News-based listening + key vocabulary 🗞️",
        link: "https://www.youtube.com/playlist?list=PLcetZ6gSk96-8vlsfui2jrM0CAJ4MfrMT",
        format: "video",
        focus: "news language, headline vocabulary",
        details: {
          type: "News-based listening + key vocabulary 🗞️🎧🧩",
          teaches: "Understanding news language + headline vocabulary ✅🧠",
          howTo: [
            "1️⃣ 🎧 Watch once: main idea 🧠",
            "2️⃣ ✍️ Note headline words + meaning 📝📌",
            "3️⃣ 🔁 Repeat key sentences (pause + copy) 🔁🗣️",
            "4️⃣ 🗣️ 45-second “news briefing” 🎙️⏱️"
          ],
          whyTopPick: "Bridge from ESL listening → real-world news English. ⭐🌉",
          freeAccess: "Free on YouTube (ads possible). 🆓📢",
          ageCheck: "News can be serious—preview recommended. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "bbc-the-english-we-speak-podcast",
        title: "🗣️ BBC Learning English — The English We Speak (Podcast) 🎙️💬",
        description: "Short podcast episodes (everyday expressions) ⚡",
        link:
          "https://podcasts.apple.com/vn/podcast/the-english-we-speak-dip-your-toe-into/id262026989?i=1000662390532&l=vi",
        format: "audio",
        focus: "idioms/phrases, natural pronunciation",
        details: {
          type: "Short podcast episodes (everyday expressions) 💬🎙️🧩",
          teaches: "Real idioms/phrases + natural pronunciation ✅🗣️",
          howTo: [
            "1️⃣ 🎧 Guess meaning from context 🧠",
            "2️⃣ 📌 Write phrase + example sentence ✍️",
            "3️⃣ 🔁 Shadow key lines 🔁🗣️",
            "4️⃣ 🗣️ Use in a 30-second mini-dialogue 🎭⏱️"
          ],
          whyTopPick: "Fast, modern phrases teens hear online. ⭐⚡",
          freeAccess: "Free to listen on podcast platforms. 🆓✅",
          ageCheck: "Teen-appropriate; idioms may need explanation. ✅🧠"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "ted-talks-main",
        title: "TED Talks — Ideas Worth Spreading 🎙️💡",
        description: "Inspiring and educational talks from experts on every topic imaginable.",
        link: "https://www.ted.com/talks",
        format: "video",
        focus: "advanced listening, specialized vocabulary",
        details: {
          type: "Expert presentation videos with interactive transcripts 🎥🌍",
          teaches: "High-level listening comprehension, presentation skills, and diverse accents 🧠📈",
          howTo: [
            "1️⃣ 🔎 Find a talk under 10 minutes on a topic you love 🎯",
            "2️⃣ 🎧 Watch once with English subtitles ON 📝",
            "3️⃣ 🔁 Watch again with subtitles OFF to test understanding 🚫📄",
            "4️⃣ 🗣️ Summarize the speaker's core message in 3 sentences 🎙️"
          ],
          whyTopPick: "The gold standard for exposure to advanced, passionate English speaking. ⭐🌟",
          freeAccess: "Free to stream on TED website or YouTube. 🆓✅",
          ageCheck: "Vast majority are teen-safe; preview topics for relevance. 👦🧑"
        }
      },

      {
        age: "13-18",
        skill: "listening",
        slug: "13-18-listening-podcasts-in-english",
        title: "Podcasts in English — Leveled Listening 🎧📈",
        description: "Short podcast episodes graded by level with downloadable worksheets and vocabulary activities.",
        link: "https://www.podcastsinenglish.com/",
        format: "audio",
        focus: "leveled listening, natural speech, vocabulary",
        details: {
          type: "Graded podcast episodes + worksheets 🎧📝",
          teaches: "Listening comprehension at multiple levels with natural speech patterns 🧠✅",
          howTo: [
            "1️⃣ 🎚️ Choose your level (1–3) 🎯",
            "2️⃣ 🎧 Listen once without the worksheet 👂",
            "3️⃣ 📝 Do the worksheet activities ✅",
            "4️⃣ 🗣️ Summarize the episode in 30 seconds 🎙️⏱️"
          ],
          whyTopPick: "Authentic podcasts graded for learners with ready-made worksheets. ⭐📝",
          freeAccess: "Free podcasts and worksheets available (premium extras exist). 🆓📢",
          ageCheck: "Suitable for teens; preview topics if needed. 🔍✅"
        }
      },

      {
        age: "13-18",
        skill: "listening",
        slug: "13-18-listening-all-ears-english",
        title: "All Ears English Podcast — Natural Conversation 🗣️🎧",
        description: "Popular ESL podcast with fun, natural conversation episodes about everyday English and culture.",
        link: "https://www.allearsenglish.com/episodes/",
        format: "audio",
        focus: "natural English, idioms, conversation skills",
        details: {
          type: "ESL conversation podcast 🗣️🎧",
          teaches: "Natural spoken English, idioms, and real-world conversation strategies 🧠💬",
          howTo: [
            "1️⃣ 🎧 Pick an episode topic that interests you 🎯",
            "2️⃣ 🎧 Listen and note 3 new expressions 📝",
            "3️⃣ 🗣️ Use each expression in a sentence 💬✍️",
            "4️⃣ 🔁 Re-listen in 2 days and test recall 🧠🔁"
          ],
          whyTopPick: "Feels like listening to friends chat — highly engaging for teens. ⭐🗣️",
          freeAccess: "Free on podcast platforms (website has extras). 🆓📢",
          ageCheck: "Teen-friendly; conversational topics. ✅🧑‍🎓"
        }
      },

      {
        age: "13-18",
        skill: "listening",
        slug: "best-set-bundle-13-18-listening",
        title: "Best “Set” (Recommended Bundle) 🎒✅🎧",
        description: "A 6-day weekly listening routine (repeat weekly) 🔁🗓️",
        link: "",
        format: "other",
        focus: "gist → detail → task → retell/summarize",
        notes:
          "Use the resources above in a weekly rotation: structured lessons, transcript-based practice, news at multiple speeds, and academic listening + mini-talk summaries.",
        details: {
          type: "Weekly routine (repeat weekly) 🔁🗓️🎧",
          teaches:
            "Real-life comprehension + exam-style listening with a consistent flow: gist → detail → task → retell/summarize ✅🧠🗣️📝",
          howTo: [
            "A 6-day weekly listening routine (repeat weekly) 🔁🗓️",
            "1️⃣ Mon 🎧: LearnEnglish Teens Listening — 1 lesson + exercises ✅",
            "2️⃣ Tue 🌍: ELLLO — 1 conversation + transcript + quiz + 60s shadowing 🎧📄⏱️",
            "3️⃣ Wed 📰: VOA Learning English — 1 short program + 5-word summary + 2 facts 📝📌",
            "4️⃣ Thu ⚡: Breaking News English Multi-Speed — slow→fast progression + discussion question 🐢🐇💬",
            "5️⃣ Fri 🎬: TED-Ed — 1 video + notes (3 ideas, 5 keywords) + 60s talk 📝🎙️",
            "6️⃣ Sat 🗞️: News in Levels — listen + retell + vocab review 🎧🗣️📚",
            "7️⃣ Sun ⏱️ (optional): Listen A Minute — quick reps + short opinion response 🏋️💬"
          ],
          whyTopPick: "Builds confidence + speed control + speaking output. ⭐📈🗣️",
          freeAccess: "Free-access sites listed above (some ad-supported / YouTube ads). 🆓📢",
          ageCheck: "Designed for teens; preview news-heavy topics when needed. ✅⚠️"
        },
        isBestSet: true,
        bundleItems: [
          "learnenglishteens-listening",
          "elllo-english-listening-lesson-library-online",
          "voa-learning-english",
          "breaking-news-english-multi-speed-listening",
          "ted-ed-lessons",
          "news-in-levels-reading-and-listening",
          "listen-a-minute-60-second-listenings"
        ]
      },

      // =========================
      // 13–18 WRITING 🧑‍🎓✍️
      // =========================
      {
        age: "13-18",
        skill: "writing",
        slug: "learnenglishteens-writing",
        title: "BRITISH COUNCIL — LearnEnglish Teens: Writing ✍️🧑‍🎓",
        description: "Writing lessons + interactive exercises 🖥️",
        link: "https://learnenglishteens.britishcouncil.org/skills/writing",
        format: "site",
        level: "A1–B2",
        focus: "model texts, school/exam writing",
        details: {
          type: "Writing lessons + interactive exercises 🖥️🧩",
          teaches: "Levelled model texts (A1–B2) + tips for common school/exam writing ✍️🧠",
          howTo: [
            "1️⃣ Choose your level ➡️ pick a lesson 📚",
            "2️⃣ Read the model text 👀 then do the tasks ✅",
            "3️⃣ Copy 3–5 useful phrases 🧾 and reuse them in your own paragraph ✍️"
          ],
          whyTopPick: "Teen-focused, level-banded writing with clear models 🧑‍🎓⭐",
          freeAccess: "Fully free pages; account only needed to post comments 🆓🔓",
          ageCheck: "Built for teens; topics generally teen-safe (preview if needed) 🎯🔍"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "write-and-improve-free",
        title: "CAMBRIDGE — Write & Improve (Free) ✍️⚡",
        description: "Auto-feedback writing practice tool 🤖",
        link: "https://writeandimprove.com/free",
        format: "site",
        focus: "draft → feedback → revise loops",
        details: {
          type: "Auto-feedback writing practice tool 🤖🛠️",
          teaches: "Draft → feedback → revise loops + CEFR-linked scoring ✍️✅",
          howTo: ["1️⃣ Pick a task 🗂️", "2️⃣ Write and submit ✍️📤", "3️⃣ Revise + resubmit 🔁✅"],
          whyTopPick: "Fast feedback makes writing practice consistent 🎯⭐",
          freeAccess: "Free tool + free tasks available (optional advanced zones exist) 🆓🔓",
          ageCheck: "Great for 13–18; don’t submit sensitive personal info 🔐✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "quill-interactive-writing-and-grammar",
        title: "QUILL — Interactive Writing & Grammar 🧠✍️",
        description: "Sentence/paragraph writing + feedback activities 🖥️",
        link: "https://www.quill.org/",
        format: "site",
        focus: "grammar-in-writing, sentence combining, proofreading",
        details: {
          type: "Sentence/paragraph writing + feedback activities 🖥️🧩",
          teaches: "Grammar-in-writing, sentence combining, proofreading, structured writing practice 🧾✅",
          howTo: [
            "1️⃣ Create a free teacher/student account 👤🆓",
            "2️⃣ Assign a skill set (transitions/complex sentences) 🧩🎯",
            "3️⃣ Write responses + get instant feedback ✅⚡"
          ],
          whyTopPick: "Strong for building accuracy and clearer sentences 📈⭐",
          freeAccess: "“Free forever” sign-up; optional services exist 🆓🔓",
          ageCheck: "Middle/high school; teacher control keeps it safe 🛡️✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "commonlit-360-writing-lessons",
        title: "COMMONLIT 360 — Writing Lessons (Grades 6–12) 📚✍️",
        description: "Full ELA curriculum with writing lessons 🧑‍🏫",
        link: "https://www.commonlit.org/ela-curriculum",
        format: "site",
        focus: "argument, analysis, evidence-based writing",
        details: {
          type: "Full ELA curriculum with writing lessons 🧑‍🏫🧩",
          teaches: "Argument, analysis, evidence-based writing, structured prompts + scaffolds 🧾✅",
          howTo: [
            "1️⃣ Teacher creates a free educator account 👤🆓",
            "2️⃣ Choose unit/lesson with Writing Lesson 🗂️📝",
            "3️⃣ Assign to students (join without email) ✅📌"
          ],
          whyTopPick: "Complete, classroom-ready writing lessons with scaffolding 🧰⭐",
          freeAccess: "Core access stated as free for teachers/students 🆓🔓",
          ageCheck: "Grades 6–12; preview texts for sensitive themes ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "purdue-owl-grades-7-12-writing-resources",
        title: "PURDUE OWL — Grades 7–12 Writing Resources 🦉✍️",
        description: "Writing guides + skill pages 🧠",
        link:
          "https://owl.purdue.edu/owl/resources/writing_instructors/grades_7_12_instructors_and_students/index.html",
        format: "site",
        focus: "structure, process, research, prewriting",
        details: {
          type: "Writing guides + skill pages 📘🧠",
          teaches: "Prewriting, research writing, structure and process 🧩✅",
          howTo: ["1️⃣ Pick a micro-skill 🎯", "2️⃣ Read tips 📖", "3️⃣ Apply to 1 paragraph ✍️✅"],
          whyTopPick: "Reliable explanations for school writing 🧑‍🎓⭐",
          freeAccess: "Fully free webpages 🌐🆓",
          ageCheck: "Appropriate for teens; teacher-selected pages recommended 📌✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "readwritethink-essay-map",
        title: "READWRITETHINK — Essay Map 🗺️✍️",
        description: "Graphic organizer (interactive) 🖥️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/essay",
        format: "site",
        focus: "essay structure: intro → body → conclusion",
        details: {
          type: "Graphic organizer (interactive) 🖥️🧩",
          teaches: "Intro → main ideas → supporting details → conclusion structure 🧱✅",
          howTo: ["1️⃣ Enter topic + stance 🎯", "2️⃣ Add points + supports 🧾📌", "3️⃣ Export/print + draft 🖨️✍️"],
          whyTopPick: "Makes essay structure repeatable 🔁⭐",
          freeAccess: "Free interactive tool 🌐🆓",
          ageCheck: "Works well for 13–18 essays 🧑‍🎓✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "readwritethink-persuasion-map",
        title: "READWRITETHINK — Persuasion Map 🗺️🗣️",
        description: "Persuasive/argument planner 🖥️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/persuasion",
        format: "site",
        focus: "argument writing: claim → reasons → evidence",
        details: {
          type: "Persuasive/argument planner 🖥️🧩",
          teaches: "Claim + reasons + evidence + conclusion restatement 🧾✅",
          howTo: ["1️⃣ Write claim 🎯", "2️⃣ Add reasons + evidence 📌", "3️⃣ Turn reasons into body paragraphs ✍️🧱"],
          whyTopPick: "Strong scaffold for argument writing 🧠⭐",
          freeAccess: "Free interactive tool 🌐🆓",
          ageCheck: "Teen-safe; choose topics carefully ⚠️📌"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "readwritethink-notetaker-outline-tool",
        title: "READWRITETHINK — Notetaker (Outline Tool) 🗂️📝",
        description: "Outlining + note organisation tool 🧠",
        link:
          "https://www.readwritethink.org/classroom-resources/student-interactives/readwritethink-notetaker",
        format: "site",
        focus: "planning, grouping ideas, outlining",
        details: {
          type: "Outlining + note organisation tool 🧠🧩",
          teaches: "Planning + organising ideas into an outline 📑✅",
          howTo: ["1️⃣ Add headings 🧱", "2️⃣ Paste notes/evidence 📌", "3️⃣ Draft faster with the outline ✍️⚡"],
          whyTopPick: "Helps teens write longer, clearer, organised work 🧭⭐",
          freeAccess: "Free web tool 🌐🆓",
          ageCheck: "Suitable for teen essays/research 📚✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "readwritethink-printing-press",
        title: "READWRITETHINK — Printing Press (Publish Writing) 📰✍️",
        description: "Publishing templates (newspapers/brochures/flyers) 🖥️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/printing-press",
        format: "site",
        focus: "real-world writing formats, audience clarity",
        details: {
          type: "Publishing templates (newspapers/brochures/flyers) 🖥️🧩",
          teaches: "Real-world writing formats + audience-focused clarity 🎯✅",
          howTo: ["1️⃣ Choose template 🗂️", "2️⃣ Draft with headings + short paragraphs 🧱✍️", "3️⃣ Export/print + present 🖨️🎤"],
          whyTopPick: "Motivating “real product” writing 🧰⭐",
          freeAccess: "Free interactive tool 🌐🆓",
          ageCheck: "Teen-safe; teacher sets topic rules 🛡️✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "manchester-academic-phrasebank",
        title: "UNIVERSITY OF MANCHESTER — Academic Phrasebank 🧾🎓",
        description: "Phrase bank + academic writing functions 🧠",
        link: "https://www.phrasebank.manchester.ac.uk/",
        format: "site",
        focus: "academic sentence starters, style",
        details: {
          type: "Phrase bank + academic writing functions 📘🧠",
          teaches: "Academic sentence starters (introducing/comparing/concluding/hedging) ✍️✅",
          howTo: ["1️⃣ Pick section 🧭", "2️⃣ Choose 3–5 phrases 🧩", "3️⃣ Adapt (don’t copy) ✍️✅"],
          whyTopPick: "Boosts academic style quickly 📈⭐",
          freeAccess: "Fully free website 🌐🆓",
          ageCheck: "Best for older teens; coach against copy-paste plagiarism ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "uefap-academic-writing-eap",
        title: "UEFAP — Academic Writing (EAP) 🎓✍️",
        description: "Academic writing guides + exercises 🧠",
        link: "https://www.uefap.org/writing/",
        format: "site",
        focus: "paragraphing, referencing, plagiarism awareness",
        details: {
          type: "Academic writing guides + exercises 📘🧠",
          teaches: "Paragraphing, referencing, academic genres + plagiarism awareness 🧾✅",
          howTo: ["1️⃣ Choose topic 🎯", "2️⃣ Read guidance 📖", "3️⃣ Do 1 exercise + apply to draft ✍️✅"],
          whyTopPick: "Practical academic writing support in one place 🧰⭐",
          freeAccess: "Free site 🌐🆓",
          ageCheck: "Best for exam/academic tracks; teacher guidance helps 🧑‍🏫✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "eap-foundation-academic-style",
        title: "EAP FOUNDATION — Academic Style + Exercises 🧠📘",
        description: "Explanations + checklists + practice exercises 📝",
        link: "https://eapfoundation.com/writing/style/",
        format: "site",
        focus: "formal tone, clarity, academic style",
        details: {
          type: "Explanations + checklists + practice exercises 📝📘",
          teaches: "Formal tone, clarity, academic style rules + practice tasks ✅🧠",
          howTo: ["1️⃣ Read 10 style rules 📋", "2️⃣ Use checklist on draft ✅", "3️⃣ Rewrite 5 sentences ✍️📈"],
          whyTopPick: "Simple rules + immediate practice ⚡⭐",
          freeAccess: "Free pages/exercises 🌐🆓",
          ageCheck: "Good for 14–18; keep tasks short 🧩✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "lumen-learning-intro-to-college-composition",
        title: "LUMEN LEARNING (OER) — Introduction to College Composition 🧱✍️",
        description: "Free open textbook/course modules 🧠",
        link: "https://courses.lumenlearning.com/suny-introtocollegecomp/",
        format: "site",
        focus: "full writing process, essay structures",
        details: {
          type: "Free open textbook/course modules 📚🧠",
          teaches: "Prewrite → draft → revise → proofread + essay structures 🧾✅",
          howTo: ["1️⃣ Pick module 🎯", "2️⃣ Do self-check ✅", "3️⃣ Apply to assignment paragraph ✍️✅"],
          whyTopPick: "Deep, structured skill-building 📈⭐",
          freeAccess: "Open-access OER webpages 🌐🆓",
          ageCheck: "Best for older teens/advanced; teacher selects sections 📌✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "write-the-world-teen-community",
        title: "WRITE THE WORLD — Teen Writing Community (13–19) 🌍✍️",
        description: "Writing community + prompts/competitions 🏆",
        link: "https://writetheworld.org/",
        format: "site",
        focus: "creative writing, peer feedback, revision",
        details: {
          type: "Community + prompts/competitions 🧑‍🤝‍🧑🏆",
          teaches: "Creative writing, peer feedback, revision habits 🔁✅",
          howTo: ["1️⃣ Create account 👤", "2️⃣ Choose prompt 🧩", "3️⃣ Draft → feedback → revise ✍️🔁✅"],
          whyTopPick: "Motivation + authentic audience 🎯⭐",
          freeAccess: "Free community access; optional extras may exist 🆓🔓",
          ageCheck: "13–19; safety rules + no personal details 🛡️🔐"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "young-writers-project-teen-community",
        title: "YOUNG WRITERS PROJECT — Teen Community (13–19) 🧑‍🎨✍️",
        description: "Community publishing + prompts + mentoring vibe 📰",
        link: "https://youngwritersproject.org/",
        format: "site",
        focus: "writing fluency, voice, publishing confidence",
        details: {
          type: "Community publishing + prompts 🧑‍🤝‍🧑📰",
          teaches: "Writing fluency, voice, sharing work, creative confidence 🌱✅",
          howTo: ["1️⃣ Sign up 👤🆓", "2️⃣ Respond/post 🧾✍️", "3️⃣ Comment thoughtfully 💬✅"],
          whyTopPick: "Supportive teen publishing space + inspiration 🧠⭐",
          freeAccess: "Free to join and use 🆓🔓",
          ageCheck: "13–19; school-safe guidelines + privacy reminders 🔐🛡️"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "khan-academy-sat-reading-and-writing",
        title: "KHAN ACADEMY — SAT Reading & Writing Practice 🧠📚",
        description: "Skill practice (grammar + rhetoric) 🖥️",
        link: "https://www.khanacademy.org/test-prep/sat-reading-and-writing",
        format: "site",
        focus: "editing skills: punctuation, transitions, concision",
        details: {
          type: "Skill practice (grammar + rhetoric) 🖥️🧩",
          teaches: "Concision, transitions, sentence boundaries, rhetorical effectiveness ✍️✅",
          howTo: ["1️⃣ Pick skill 🎯", "2️⃣ Do 10–15 questions ✅⏱️", "3️⃣ Apply rule to your writing ✍️🔁"],
          whyTopPick: "Great for exam editing skills 🧪⭐",
          freeAccess: "Free practice access (account optional) 🆓🔓",
          ageCheck: "Ideal for 14–18; exam-focused 🎓✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "languagetool-free-grammar-checker",
        title: "LANGUAGETOOL — Free Grammar Checker 🧠✅",
        description: "Grammar/spelling/punctuation checker ✍️",
        link: "https://languagetool.org/",
        format: "site",
        focus: "self-editing habits, error patterns",
        details: {
          type: "Grammar/spelling/punctuation checker 🛠️✍️",
          teaches: "Self-editing habits (spot errors, fix patterns) 🔁✅",
          howTo: ["1️⃣ Paste paragraph 📋", "2️⃣ Fix 3 error types 🎯", "3️⃣ Keep an error log 📝📌"],
          whyTopPick: "Fast feedback for final drafts ⚡⭐",
          freeAccess: "Free version available 🆓🔓",
          ageCheck: "Teen-friendly; don’t paste private info 🔐✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "hemingway-readability-checker",
        title: "HEMINGWAY — Free Readability Checker 📏✍️",
        description: "Readability + clarity checker 🧠",
        link: "https://hemingwayapp.com/readability-checker",
        format: "site",
        focus: "clearer sentences, simpler wording",
        details: {
          type: "Readability + clarity checker 🛠️🧠",
          teaches: "Shorter sentences, clearer wording, fewer “hard-to-read” parts ✨✅",
          howTo: ["1️⃣ Paste draft 📋", "2️⃣ Split 3 hard sentences ✂️✅", "3️⃣ Simplify 5 words 🧾🔁"],
          whyTopPick: "Improves clarity fast ⚡⭐",
          freeAccess: "Free readability checker online 🌐🆓",
          ageCheck: "Use for editing, not writing it for them ✅✍️"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "evansville-thesis-statement-handout-pdf",
        title: "UNIVERSITY OF EVANSVILLE — Thesis Statement Handout 🎯📄",
        description: "1-page PDF guide 🧠 (thesis rules + examples) ✍️",
        link: "https://www.evansville.edu/writingcenter/downloads/thesis.pdf",
        format: "pdf",
        focus: "thesis statements, essay clarity",
        details: {
          type: "1-page PDF guide 🧠📄",
          teaches: "What a thesis is + do/don’t rules + examples ✍️✅",
          howTo: ["1️⃣ Read examples 👀", "2️⃣ Write 3 thesis options ✍️✍️✍️", "3️⃣ Choose best + outline supports 🧾📌"],
          whyTopPick: "Quick, printable, directly improves essays 🧰⭐",
          freeAccess: "Free PDF download 🌐🆓",
          ageCheck: "Perfect for teen essay classes 🎯✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "nyt-learning-network-writing-prompts",
        title: "NYT Learning Network — Writing Prompts 📰✍️",
        description: "Engaging daily writing prompts and contests based on current events.",
        link: "https://www.nytimes.com/section/learning/student-opinion",
        format: "site",
        focus: "argumentative writing, current events",
        details: {
          type: "Daily argument and opinion prompts 🗞️📝",
          teaches: "Forming opinions, argumentative structure, and engaging hooks 🧠⚖️",
          howTo: [
            "1️⃣ 🎯 Read the daily prompt and the short linked article 📖",
            "2️⃣ 🧠 Form a stance (Agree? Disagree? Why?) 🤔",
            "3️⃣ ✍️ Draft a 150-word response using evidence from the text 📝",
            "4️⃣ ✅ Edit for clarity and post in the comments (if allowed) or save 🗂️"
          ],
          whyTopPick: "Connects writing directly to what is happening in the real world today. 🌍⭐",
          freeAccess: "The Learning Network is accessible for free to students/teachers. 🆓🔓",
          ageCheck: "Highly appropriate for teens forming their own worldview. 🧑‍🎓✅"
        }
      },
      {
        age: "13-18",
        skill: "writing",
        slug: "best-set-bundle-13-18-writing",
        title: "Best “Set” Bundle 🎒✅ (13–18 Writing) 🧩📅",
        description: "3 writing sessions/week + 2 short editing sessions/week (30–45 min) ⏱️✍️",
        link: "",
        format: "other",
        focus: "paragraphs, essays, revision loops, accuracy",
        notes:
          "Goal: 3 writing sessions/week + 2 short editing sessions/week. Use models + planning + revision tools + optional safe publishing.",
        details: {
          type: "Weekly flow 🗓️🪜 + bundle picks 🎒✅",
          teaches:
            "Clear paragraphs + essay structure + revision habits using models, planners, and feedback tools 🧠🧱🔁✅",
          howTo: [
            "Goal 🎯: 3 writing sessions/week + 2 short editing sessions/week (30–45 min each) ⏱️",
            "1️⃣ LearnEnglish Teens Writing 🧑‍🎓✍️ (models + phrases) 📚",
            "2️⃣ Write & Improve ⚡✍️ (draft → feedback → revise) 🔁",
            "3️⃣ ReadWriteThink Essay Map 🗺️🧱 (plan before you write) ✅",
            "4️⃣ Quill ✅🧠 (sentence-level accuracy) 🎯",
            "5️⃣ Purdue OWL 🦉📘 (one micro-skill/week) 📌",
            "6️⃣ LanguageTool 🛠️✅ (final polish) ✨",
            "7️⃣ Publishing option 📰🌍: Write the World or Young Writers Project (safety rules) 🛡️🔐",
            "Weekly flow 🗓️🪜:",
            "• Day 1 🧩: LearnEnglish Teens lesson → copy phrases → paragraph draft ✍️",
            "• Day 2 ⚡: Write & Improve → revise → resubmit 🔁✅",
            "• Day 3 🗺️: Essay Map → write 1 body paragraph 🧱✍️",
            "• Day 4 ✅ (10–15 min): Quill on one error pattern 🎯⏱️",
            "• Day 5 🛠️ (10–15 min): LanguageTool + OWL check → final edit ✅✨",
            "• Weekend 📰 (optional): Post polished piece (class safety rules) 🛡️"
          ],
          whyTopPick: "Balanced: models + planning + feedback + motivation 🎯⭐",
          freeAccess: "Uses free-access tools above (some optional accounts/premium extras may exist) 🆓🔓",
          ageCheck: "Teen-focused; follow privacy rules for publishing + pasted drafts 🔐✅"
        },
        isBestSet: true,
        bundleItems: [
          "learnenglishteens-writing",
          "write-and-improve-free",
          "readwritethink-essay-map",
          "quill-interactive-writing-and-grammar",
          "purdue-owl-grades-7-12-writing-resources",
          "languagetool-free-grammar-checker",
          "write-the-world-teen-community",
          "young-writers-project-teen-community"
        ]
      },

      // =========================
      // 13–18 SPEAKING 🗣️✨
      // =========================
      {
        age: "13-18",
        skill: "speaking",
        slug: "learnenglishteens-speaking",
        title: "🧑‍🎓 Speaking — LearnEnglish Teens (British Council) ✅🗣️",
        description: "Interactive speaking videos + activities (A1–B2) 🎥",
        link: "https://learnenglishteens.britishcouncil.org/skills/speaking",
        format: "site",
        focus: "real-life speaking, fluency, teen topics",
        details: {
          type: "Interactive speaking videos + activities 🎥🧩",
          teaches: "Real-life speaking (shops, advice, opinions) + fluency practice 💬📈",
          howTo: [
            "1️⃣ 🎚️ Pick level (A2–B2 fits most teens) ✅",
            "2️⃣ 👂 Watch and copy key phrases 🔁",
            "3️⃣ 🗣️ Do the speaking task (record or partner) 🎙️👥",
            "4️⃣ ✅ Repeat and improve (pronunciation + longer answers) 🔁📈"
          ],
          whyTopPick: "Built for teens, levelled, ready-to-use. ⭐🌟",
          freeAccess: "Accessible free during this check. 🆓✅",
          ageCheck: "Teen-focused content; generally suitable. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "learnenglish-speaking",
        title: "🗣️ Speaking — LearnEnglish (British Council) 🎯✅",
        description: "Situation-based speaking practice + language chunks 🧠",
        link: "https://learnenglish.britishcouncil.org/skills/speaking",
        format: "site",
        focus: "functional English, real situations, exam prep",
        details: {
          type: "Situation-based speaking practice + language chunks 🧠🧩",
          teaches: "Speaking in different situations (functional English) 🛍️🗺️💬",
          howTo: [
            "1️⃣ 📌 Choose a topic (e.g., giving opinions) 🎯",
            "2️⃣ 🧠 Notice useful phrases 🧾",
            "3️⃣ 🗣️ Do a 60–90 sec talk using 5 phrases 🎙️⏱️",
            "4️⃣ 🔁 Re-record to improve clarity ✅🔁"
          ],
          whyTopPick: "Practical speaking targets for real life + exams. 🎓⭐",
          freeAccess: "Accessible free during this check. 🆓✅",
          ageCheck: "Appropriate for teens; general topics. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "speak-and-improve-cambridge",
        title: "🎤 Speak & Improve (Cambridge) 🤖✅",
        description: "Automated speaking practice + instant feedback 🧠",
        link: "https://speakandimprove.com/",
        format: "site",
        focus: "fluency, coherence, test-style answers",
        details: {
          type: "Automated speaking practice + instant feedback 🤖🎙️",
          teaches: "Speaking fluency, coherence, and test-style answers 📈🎓",
          howTo: [
            "1️⃣ 🎯 Choose a skill or take a full test 🗂️",
            "2️⃣ 🎙️ Record your answer 🎧",
            "3️⃣ ✅ Read the feedback/grade 📊",
            "4️⃣ 🔁 Repeat same prompt aiming +10–20% improvement 📈✅"
          ],
          whyTopPick: "Fast feedback loop for confident teen growth. ⚡⭐",
          freeAccess: "Homepage states it’s free. 🆓✅",
          ageCheck: "Good for 13–18; no personal info in recordings. 🛡️🔐"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "cambridge-activities-for-learners-speaking",
        title: "🧪 Cambridge English — Activities for Learners (Speaking) 🎓✅",
        description: "Short speaking activities by level/time ⏱️",
        link:
          "https://www.cambridgeenglish.org/learning-english/activities-for-learners/?skill=speaking",
        format: "site",
        focus: "exam-style micro-practice, structured speaking",
        details: {
          type: "Short speaking activities by level/time ⏱️🧩",
          teaches: "Exam-style and skill-based speaking micro-practice 🗣️🎯",
          howTo: [
            "1️⃣ 🎚️ Filter by level (B1/B2 for many teens) ✅",
            "2️⃣ ⏱️ Pick 5–10 minute tasks 🗓️",
            "3️⃣ 🗣️ Do “answer + reason + example” ✅📌",
            "4️⃣ 🔁 Swap partners and repeat 👥🔁"
          ],
          whyTopPick: "Quick, credible, structured tasks. 🏛️⭐",
          freeAccess: "Listed as free online activities on Cambridge site. 🆓✅",
          ageCheck: "Suitable for teens; choose appropriate topics. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "kialo-edu-structured-discussion",
        title: "🧭 Kialo Edu — Structured Class Discussion 🗣️🧠",
        description: "Debate/discussion mapping tool (text-based) 🗂️",
        link: "https://www.kialo-edu.com/",
        format: "site",
        focus: "discussion, counterarguments, critical thinking",
        details: {
          type: "Debate/discussion mapping tool (text-based) 🗂️🧩",
          teaches: "Speaking prep (reasons, counterarguments) + critical thinking ⚖️🧠",
          howTo: [
            "1️⃣ 🧩 Post a teen-safe discussion question ❓✅",
            "2️⃣ ➕ Add pros/cons with reasons 📌",
            "3️⃣ 🗣️ Present strongest branch aloud 🎤",
            "4️⃣ 🔁 Add one counterargument + response ⚖️🔁"
          ],
          whyTopPick: "Makes discussion logical and inclusive (helps shy teens). ✅⭐",
          freeAccess: "Site states it’s “free and always will be”. 🆓✅",
          ageCheck: "Great for teens; teacher sets safe topics and rules. 🛡️✅"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "americanenglish-everyday-conversations",
        title: "🗨️ Everyday Conversations (AmericanEnglish / U.S. State Dept.) 🇺🇸✅",
        description: "Dialogues for role-play + small talk 🧑‍🤝‍🧑",
        link: "https://americanenglish.state.gov/resources/everyday-conversations-learning-american-english",
        format: "site",
        focus: "practical conversation, role-play, fluency",
        details: {
          type: "Dialogues for role-play + small talk 🧑‍🤝‍🧑🎭",
          teaches: "Practical conversation skills (shopping, directions, advice) 🛍️🗺️💬",
          howTo: [
            "1️⃣ 🎭 Choose a dialogue 📄",
            "2️⃣ 🗣️ Role-play A/B twice 👥",
            "3️⃣ 🔁 Swap roles + change 3 details (price/time/place) 💵⏰📍",
            "4️⃣ 🎙️ Record the improved version 🎧✅"
          ],
          whyTopPick: "Clean, classroom-safe everyday speaking. ✅⭐",
          freeAccess: "Official resource page + free PDF available. 🆓📄",
          ageCheck: "Middle-school level but great for teens building fluency. 🎯✅"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "americanenglish-dialogs-for-everyday-use-pdf",
        title: "📄 Dialogs for Everyday Use (AmericanEnglish PDF) 🗣️✅",
        description: "Short situational dialogues (printable) 🖨️",
        link: "https://americanenglish.state.gov/files/ae/resource_files/dialogs_for_everyday_use_508.pdf",
        format: "pdf",
        focus: "role-play confidence, repeatable fluency drills",
        details: {
          type: "Short situational dialogues (printable) 🖨️📄",
          teaches: "Real-life speaking patterns + role-play confidence 🎭✅",
          howTo: [
            "1️⃣ ✂️ Cut one dialogue into lines ✂️📄",
            "2️⃣ 🧩 Reorder lines (sequence challenge) 🔁",
            "3️⃣ 🗣️ Perform + add 2 new lines ✍️🎭",
            "4️⃣ ✅ Speed round: 30 seconds, clear speaking ⏱️🗣️"
          ],
          whyTopPick: "Easy to run + repeatable for fluency. 🔁⭐",
          freeAccess: "Official AmericanEnglish PDF. 🆓✅",
          ageCheck: "Teen-appropriate; mostly neutral daily-life topics. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "iteslj-conversation-questions",
        title: "💬 Conversation Questions (I-TESL-J) ✅🗣️",
        description: "Topic question banks for speaking circles 🔄",
        link: "https://iteslj.org/questions/",
        format: "site",
        focus: "extended answers, follow-ups, fluency",
        details: {
          type: "Topic question banks for speaking circles 🔄🧩",
          teaches: "Fluency, follow-up questions, extended answers 🎯🗣️",
          howTo: [
            "1️⃣ 📌 Pick a teen-appropriate topic ✅",
            "2️⃣ 🗣️ 1-minute answer each ⏱️",
            "3️⃣ ❓ Partner asks 2 follow-up questions 🔁",
            "4️⃣ ✅ Switch partners and repeat 👥🔁"
          ],
          whyTopPick: "Huge, simple, no-prep question bank. ⚡⭐",
          freeAccess: "Publicly accessible question pages. 🆓✅",
          ageCheck: "Some topics can be adult/controversial—teacher selects. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "englishclub-talking-point-worksheets",
        title: "🗣️ Conversation Worksheets (EnglishClub “Talking Point”) 📄✅",
        description: "Discussion worksheets + teacher notes 🧑‍🏫",
        link: "https://www.englishclub.com/esl-worksheets/conversation/",
        format: "site",
        focus: "structured discussion, group speaking",
        details: {
          type: "Discussion worksheets + teacher notes 🧑‍🏫📄",
          teaches: "Fluency through structured discussion questions 🧠🗣️",
          howTo: [
            "1️⃣ 📌 Choose a category (Travel/People/Lifestyle etc.) 🗂️",
            "2️⃣ 🗣️ Small-group discussion (8–10 minutes) ⏱️👥",
            "3️⃣ 📝 Groups write 3 best ideas 💡💡💡",
            "4️⃣ 🎤 Group report-out (30 sec each) 🎙️⏱️"
          ],
          whyTopPick: "Ready-made speaking lessons with clear prompts. ✅⭐",
          freeAccess: "Accessible free during this check. 🆓✅",
          ageCheck: "Includes heavier categories (politics/crime)—curate topics. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "tefl-net-talking-point-pdfs",
        title: "📥 Talking Point Lesson Plans (TEFL.net) — Free PDFs 🧑‍🏫✅",
        description: "Discussion-based PDF lesson plans 🗂️",
        link: "https://www.tefl.net/elt/category/talking-point/",
        format: "site",
        focus: "opinion speaking, reasoning, discussion language",
        details: {
          type: "Discussion-based PDF lesson plans 🗂️📄",
          teaches: "Opinion speaking, reasoning, discussion language 💬⚖️",
          howTo: [
            "1️⃣ 📥 Download 1 PDF 📄",
            "2️⃣ 🗣️ Run the discussion stages 🧩",
            "3️⃣ ✅ Teach polite agree/disagree phrases 🤝",
            "4️⃣ 🎤 Quick debate: 60 sec per side ⏱️⚖️"
          ],
          whyTopPick: "Free PDFs + teacher notes + discussion stages. 📌⭐",
          freeAccess: "Page states lesson plans are free to download. 🆓✅",
          ageCheck: "Choose teen-safe topics; preview PDFs. 🔍✅"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "esl-discussions-topic-bank",
        title: "🗯️ ESL Discussions (Huge topic bank + handouts) 🗣️✅",
        description: "Conversation questions + ready handouts 🖨️",
        link: "https://esldiscussions.com/",
        format: "site",
        focus: "longer answers, opinions, follow-ups",
        details: {
          type: "Conversation questions + ready handouts 🖨️🧩",
          teaches: "Longer answers, opinions, follow-up questions 🔁🎯",
          howTo: [
            "1️⃣ 📌 Pick a topic 🎯",
            "2️⃣ 🗣️ Pair discussion (10 minutes) 👥⏱️",
            "3️⃣ ✅ “Use 3 target phrases” challenge 🧾🎯",
            "4️⃣ 🎤 Mini-presentation: “My best answer” 🎙️⭐"
          ],
          whyTopPick: "Extremely large speaking topic bank. 📚⭐",
          freeAccess: "Site is accessible during this check. 🆓✅",
          ageCheck: "Has controversial topics—teacher must filter. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "baamboozle-speaking-games",
        title: "🎮 Baamboozle — Speaking Games/Prompts 🧩🗣️",
        description: "Whole-class speaking games (1 screen) 🖥️",
        link: "https://www.baamboozle.com/games",
        format: "site",
        focus: "quick response speaking, fluency under time",
        details: {
          type: "Whole-class speaking games (1 screen) 🖥️🎮",
          teaches: "Quick response speaking + Q/A speed ⚡🗣️",
          howTo: [
            "1️⃣ 🔎 Search “teen speaking” / “discussion” 🔍",
            "2️⃣ 👥 Teams answer aloud (full sentences only) 🗣️✅",
            "3️⃣ ✅ Rule: “answer + reason” 📌",
            "4️⃣ 🔁 Replay next week for faster fluency 🔁📈"
          ],
          whyTopPick: "Engaging, low-prep speaking practice. 🎯⭐",
          freeAccess: "Platform states games can be played for free. 🆓✅",
          ageCheck: "User-generated prompts—preview before class. ⚠️🔍"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "sounds-right-phonemic-chart",
        title: "🎧 Pronunciation — LearnEnglish Sounds Right (British Council) 🔤✅",
        description: "Free phonemic chart (tap a sound → hear it) 🔊",
        link: "https://learnenglish.britishcouncil.org/apps/learnenglish-sounds-right",
        format: "site",
        focus: "pronunciation accuracy, sound awareness",
        details: {
          type: "Free phonemic chart (tap a sound → hear it) 🔤🔊",
          teaches: "Clear pronunciation + sound awareness for speaking 🗣️✅",
          howTo: [
            "1️⃣ 🔤 Pick 2–3 difficult sounds 🎯",
            "2️⃣ 🔊 Listen + repeat 10 times 🔁",
            "3️⃣ 🧾 Make 5 example words + read aloud 🗣️",
            "4️⃣ 🎙️ Record and compare 🎧✅"
          ],
          whyTopPick: "Simple daily drill that improves speaking fast. ⚡⭐",
          freeAccess: "Described as a free pronunciation chart. 🆓✅",
          ageCheck: "Fully appropriate for teens. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "englishclub-phonemic-chart",
        title: "🔤 Pronunciation — Interactive Phonemic Chart (EnglishClub) ✅🔊",
        description: "Clickable sound chart with example words 🗂️",
        link: "https://www.englishclub.com/pronunciation/phonemic-chart-ia.php",
        format: "site",
        focus: "sound accuracy, quick drills",
        details: {
          type: "Clickable sound chart with example words 🗂️🔊",
          teaches: "Sound accuracy for clearer speaking 🗣️✅",
          howTo: [
            "1️⃣ 🎯 Choose 3 sounds to master 🔤",
            "2️⃣ 🔊 Listen and repeat with example word 🔁",
            "3️⃣ 🗣️ Put words into short sentences ✍️",
            "4️⃣ ✅ Speed drill (clear + fast) 🐢🐇"
          ],
          whyTopPick: "Instant sound practice—no login. ⚡⭐",
          freeAccess: "Publicly accessible during this check. 🆓✅",
          ageCheck: "Appropriate for teens. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "online-voice-recorder-mp3",
        title: "🎙️ Online Voice Recorder (MP3) — Free Recording Tool 🧑‍💻✅",
        description: "Browser voice recorder (save MP3) 🎧",
        link: "https://online-voice-recorder.com/",
        format: "tool",
        focus: "self-check fluency, pronunciation, clarity",
        details: {
          type: "Browser voice recorder (save MP3) 🎧🎙️",
          teaches: "Self-check fluency, pronunciation, clarity 🎯✅",
          howTo: [
            "1️⃣ 🎙️ Record a 60–90 sec response ⏱️",
            "2️⃣ ✅ Listen and note 3 fixes (endings/stress/fillers) 📝",
            "3️⃣ 🔁 Re-record aiming “clearer + longer” 📈",
            "4️⃣ 📁 Save best version weekly 🗓️✅"
          ],
          whyTopPick: "Simple recording workflow for speaking improvement. 🔁⭐",
          freeAccess: "Site states it’s completely free with no hidden charges. 🆓✅",
          ageCheck: "Teen-appropriate; no personal info in recordings. 🛡️🔐"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "esl-lounge-b1-speaking-practice",
        title: "🎯 B1 Speaking Practice (ESL Lounge) — Exam-style 🗣️✅",
        description: "Example speaking tests (B1 PET-style) 🎓",
        link: "https://www.esl-lounge.com/student/b1-preliminary-speaking-practice.php",
        format: "site",
        focus: "turn-taking, paired speaking, structured answers",
        details: {
          type: "Example speaking tests (B1 exam-style) 🎓🧩",
          teaches: "Turn-taking, paired speaking, structured answers 🧠✅",
          howTo: [
            "1️⃣ 👥 Pair students (A/B) 🗣️",
            "2️⃣ ⏱️ Time each part (short + long turn) ✅",
            "3️⃣ ✅ Use a simple rubric (fluency/grammar/vocab/pron) 🧾",
            "4️⃣ 🔁 Repeat same task with improved answers 📈"
          ],
          whyTopPick: "Clear exam-format practice for older teens. 🎯⭐",
          freeAccess: "Page is accessible during this check. 🆓✅",
          ageCheck: "Exam-style prompts are teen-appropriate. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "teachingenglish-secondary-activities-hub",
        title: "🧑‍🏫 TeachingEnglish (British Council) — Secondary Activities Hub ✅📚",
        description: "Teacher-led activities (many for ages 13–17, including speaking) 🗂️",
        link: "https://www.teachingenglish.org.uk/teaching-resources/teaching-secondary/activities",
        format: "site",
        focus: "fluency tasks, classroom speaking routines",
        details: {
          type: "Teacher-led secondary activities hub 🗂️🧑‍🏫",
          teaches: "Fluency tasks, discussion structures, speaking routines 🗣️✅",
          howTo: [
            "1️⃣ 🎚️ Filter by level (A2–B2) ✅",
            "2️⃣ 🗣️ Choose speaking-friendly activities 🎯",
            "3️⃣ ✅ Run with timing + roles ⏱️🎭",
            "4️⃣ 🔁 Reuse weekly for measurable fluency growth 📈"
          ],
          whyTopPick: "Built around secondary learners; includes age tags. 🏫⭐",
          freeAccess: "Accessible during this check. 🆓✅",
          ageCheck: "Activities tagged for ages 13–17. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "wheel-of-names-random-speaker-picker",
        title: "🎡 Wheel of Names — Random Speaker Picker 🎯✅",
        description: "Spinner tool for turn-taking & prompt selection 🔄",
        link: "https://wheelofnames.com/",
        format: "tool",
        focus: "participation, fast speaking under time pressure",
        details: {
          type: "Spinner tool for turn-taking & prompts 🔄🎡",
          teaches: "Participation + quick speaking under time pressure ⏱️🗣️",
          howTo: [
            "1️⃣ 📝 Add names OR speaking prompts 🗂️",
            "2️⃣ 🎡 Spin → student speaks 30–60 sec 🎙️⏱️",
            "3️⃣ ✅ Require “answer + reason + example” 📌",
            "4️⃣ 🔁 Add a follow-up question and repeat ❓🔁"
          ],
          whyTopPick: "Boosts participation fairly and fast. ⚡⭐",
          freeAccess: "Usable without payment during this check. 🆓✅",
          ageCheck: "Fully appropriate for teens. ✅👦🧑"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "toastmasters-youth-leadership",
        title: "Toastmasters — Public Speaking Tips 🎤📈",
        description: "Resources and tips for structuring speeches and managing public speaking anxiety.",
        link: "https://www.toastmasters.org/resources/public-speaking-tips",
        format: "site",
        focus: "public speaking, presentation skills",
        details: {
          type: "Public speaking guidelines and articles 📋🗣️",
          teaches: "Speech structure, body language, vocal variety, and confidence 🧠🌟",
          howTo: [
            "1️⃣ 📖 Read one tip article (e.g., '10 Tips for Public Speaking') 📝",
            "2️⃣ 🎯 Choose one specific technique to focus on (e.g., eye contact or pausing) 👀",
            "3️⃣ 🎙️ Record a 2-minute speech applying that technique ⏱️",
            "4️⃣ 🔁 Review the recording and evaluate your success ✅"
          ],
          whyTopPick: "Brings professional-grade speaking techniques down to an accessible level. ⭐💼",
          freeAccess: "Articles and tips are free to read. 🆓✅",
          ageCheck: "Excellent for older teens preparing for college/work presentations. 🎓✅"
        }
      },
      {
        age: "13-18",
        skill: "speaking",
        slug: "best-set-bundle-13-18-speaking",
        title: "Best “Set” (Recommended Bundle) 🎒🗣️✅",
        description: "Weekly teen speaking plan (20–35 mins/day) 🗓️⏱️",
        link: "",
        format: "other",
        focus: "fluency, functional speaking, debate, pronunciation",
        notes:
          "A repeatable weekly plan mixing teen speaking lessons, test-style prompts, structured discussion, role-plays, and daily pronunciation drills.",
        details: {
          type: "Weekly teen speaking plan (repeat weekly) 🗓️⏱️🔁",
          teaches:
            "Real-life communication + exam-style structure + debate skills + pronunciation through short, repeatable tasks 🗣️🎓⚖️🔤✅",
          howTo: [
            "Weekly plan (20–35 mins/day) 🗓️⏱️",
            "Mon 🟦: LearnEnglish Teens Speaking — 1 lesson + record best answer 🎙️✅",
            "Tue 🟩: Speak & Improve — 2 prompts + improve score/clarity 🔁📈",
            "Wed 🟨: EnglishClub Talking Point — small-group discussion + report-out 🎤👥",
            "Thu 🟧: Cambridge speaking activities — 2 short tasks (5–10 mins) ✅⏱️",
            "Fri 🟥: Kialo Edu — 1 debate question + “claim + reason + counter” 🧠⚖️",
            "Weekend 🌈: Everyday Conversations — role-play + change 3 details 🎭🔁",
            "Daily add-on (5 mins) 🔤: Sounds Right drill (2–3 sounds) 🔊✅"
          ],
          whyTopPick: "Balanced routine: talk more + speak clearer + speak smarter. ⭐🎯",
          freeAccess: "Built from free-access sites/tools above (some optional accounts may exist). 🆓🔓",
          ageCheck: "Teen-focused; curate topics for debates/discussion pages. ✅⚠️"
        },
        isBestSet: true,
        bundleItems: [
          "learnenglishteens-speaking",
          "speak-and-improve-cambridge",
          "englishclub-talking-point-worksheets",
          "cambridge-activities-for-learners-speaking",
          "kialo-edu-structured-discussion",
          "americanenglish-everyday-conversations",
          "sounds-right-phonemic-chart",
          "wheel-of-names-random-speaker-picker"
        ]
      }
    ]
  };

  if (!window.UEAH_RESOURCES_STORE || typeof window.UEAH_RESOURCES_STORE.add !== "function") {
    console.error("UEAH_RESOURCES_STORE is not available. Ensure assets/js/resources-store.js is loaded first.");
    return;
  }

  window.UEAH_RESOURCES_STORE.add(DATA);
})();
