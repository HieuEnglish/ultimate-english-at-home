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
          freeAccess: "Site states it provides free lessons + PDFs/activities. 🆓📄",
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
            "Fri 🟥: News in Levels — same routine, focus on fluency + vocab 🌍📰📈",
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
          ageCheck: "Designed for teens; still preview topics if needed. 🔍✅"
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
          whyTopPick: "Massive library (3,000+ lessons) with transcripts + quizzes. ⭐📚",
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
            "3️⃣ ✅ Check answers and replay the tricky parts 🔁",
            "4️⃣ 🗣️ Practice “repeat + respond” (copy a line, then answer it) 🔁💬"
          ],
          whyTopPick: "Clear structure + lots of targeted quiz practice. ⭐🎯",
          freeAccess: "Site is accessible and lessons are usable without paying. 🆓✅",
          ageCheck: "Teen-appropriate; preview topics (some are adult-life themes). 🔍✅"
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
            "1️⃣ 🐢 Start at a slower speed to catch key meaning ✅",
            "2️⃣ 🐇 Increase speed step-by-step (same text) 🔁📈",
            "3️⃣ ✅ Do the lesson activities/questions 📝",
            "4️⃣ 🗣️ Debate the topic for 2 minutes (agree/disagree) 💬⏱️"
          ],
          whyTopPick: "Same content in 5 speeds—perfect for progression. ⭐📈",
          freeAccess: "Lessons are accessible; site offers many free materials (also promotes paid extras). 🆓💡",
          ageCheck: "News topics may include politics/violence—preview recommended. ⚠️🔍"
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
            "1️⃣ 🧩 Pick Level 1/2/3 (start easier than you think) 🎚️",
            "2️⃣ 🎧 Listen first → then read 📄",
            "3️⃣ ✍️ Note 8–10 new words (only useful ones) 📝",
            "4️⃣ 🗣️ Tell the story in your own words (30–60 seconds) 🎙️⏱️"
          ],
          whyTopPick: "Same news idea across levels = smooth confidence building. ⭐📈",
          freeAccess: "Site is accessible and usable free (ad-supported). 🆓📢",
          ageCheck: "Some world news can be sensitive; preview as needed. ⚠️🔍"
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
            "1️⃣ 🎯 Choose a topic teens actually like (science/psych/history) 💡",
            "2️⃣ 🎧 Watch once (no subtitles) for gist 🚫📝",
            "3️⃣ 🔁 Watch again with notes (3 key points + 5 keywords) 📝📌",
            "4️⃣ 🗣️ Give a 60-second mini-talk summary 🎙️⏱️"
          ],
          whyTopPick: "High engagement + strong “listen for ideas” practice. ⭐🌟",
          freeAccess: "Free to watch lessons; account is optional for saving/creating. 🆓✅",
          ageCheck: "Generally teen-appropriate; preview occasional sensitive themes. 🔍✅"
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
        focus: "listening for detail, quick checks",
        details: {
          type: "Listening quizzes + answers ✅🎧🧩",
          teaches: "Listening for detail + common conversational understanding 🗣️✅",
          howTo: [
            "1️⃣ 🎧 Play the audio question 🔊",
            "2️⃣ ✅ Choose the best answer 📝",
            "3️⃣ 🔁 Replay and catch the key words you missed 🔍",
            "4️⃣ ✍️ Write 3 “useful phrases” you heard 📝💡"
          ],
          whyTopPick: "Quick, low-prep listening checks (great for warmups). ⭐⏱️",
          freeAccess: "Free-access quizzes on site (ad-supported). 🆓📢",
          ageCheck: "Teen-safe; standard web ads—supervision/ad blocker if needed. 🛡️✅"
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
            "1️⃣ 🎧 Listen once and guess the main idea 🧠",
            "2️⃣ 🔁 Listen again and do the quiz ✅📝",
            "3️⃣ 🗣️ Shadow the audio (copy rhythm and linking) 🔁",
            "4️⃣ ✍️ Write a 4-sentence opinion response 📝💬"
          ],
          whyTopPick: "Perfect for daily “listening reps” without fatigue. ⭐🏋️",
          freeAccess: "Described as free with downloads + MP3/quizzes. 🆓✅",
          ageCheck: "Teen-appropriate; some topics may feel easy for advanced learners. 🎚️✅"
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
            "1️⃣ 🎧 Play the MP3 while following the text 📄",
            "2️⃣ ✍️ Highlight 10 useful words/phrases 📝",
            "3️⃣ 🔁 Replay and read aloud with the audio 🗣️🔁",
            "4️⃣ 🗣️ Summarize in 5 bullet points 📝🔹"
          ],
          whyTopPick: "Simple read-along listening with clear scripts. ⭐✅",
          freeAccess: "Page provides text + MP3 access without payment. 🆓✅",
          ageCheck: "Generally safe; older site style/ads—basic supervision recommended. 🛡️✅"
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
            "2️⃣ 🎧 Listen for gist → then detail 🔁",
            "3️⃣ ✅ Do exercises and review mistakes 📝✅",
            "4️⃣ 🗣️ Retell using “First / Then / Finally” 🧩🗣️"
          ],
          whyTopPick: "Clean, structured tasks that scale to higher teens. ⭐📈",
          freeAccess: "Accessible and usable free on site. 🆓✅",
          ageCheck: "Suitable for older teens; content is generally neutral. ✅🎓"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "bbc-learning-english-6-minute-english-youtube",
        title: "📺 BBC Learning English — 6 Minute English (YouTube) ⏲️",
        description: "Short discussion episodes + vocab 🎙️",
        link:
          "https://www.youtube.com/playlist?list=PLcetZ6gSk96-FECmH9l7Vlx5VDigvgZpt",
        format: "video",
        focus: "topic vocab, opinions/arguments listening",
        details: {
          type: "Short discussion episodes + vocab 🎙️🎧🧩",
          teaches: "Topic vocabulary + listening for opinions/arguments 🧠✅",
          howTo: [
            "1️⃣ 🎧 Listen once with no captions 🚫📝",
            "2️⃣ 🔁 Listen again and write 6 new words/phrases ✍️🧠",
            "3️⃣ 🗣️ Pause after each speaker and paraphrase their point 🧩",
            "4️⃣ ✍️ Write a short “Agree/Disagree + why” response 💬📝"
          ],
          whyTopPick: "High-quality teen-friendly topics in short time. ⭐⏱️",
          freeAccess: "Free on YouTube (ads possible). 🆓📢",
          ageCheck: "Generally teen-safe; preview occasional sensitive topics. 🔍✅"
        }
      },
      {
        age: "13-18",
        skill: "listening",
        slug: "bbc-learning-english-from-the-news-youtube",
        title: "📰 BBC Learning English — Learning English from the News (YouTube) 🎧",
        description: "News-based listening + key vocabulary 🗞️",
        link:
          "https://www.youtube.com/playlist?list=PLcetZ6gSk96-8vlsfui2jrM0CAJ4MfrMT",
        format: "video",
        focus: "news language, headline vocabulary",
        details: {
          type: "News-based listening + key vocabulary 🗞️🎧🧩",
          teaches: "Understanding news language + headline vocabulary ✅🧠",
          howTo: [
            "1️⃣ 🎧 Watch once for main idea 🧠",
            "2️⃣ ✍️ Note headline words + meaning 📝📌",
            "3️⃣ 🔁 Rewatch and pause to repeat key sentences 🔁🗣️",
            "4️⃣ 🗣️ Give a 45-second “news briefing” summary 🎙️⏱️"
          ],
          whyTopPick: "Great bridge from ESL listening → real-world news English. ⭐🌉",
          freeAccess: "Free on YouTube (ads possible). 🆓📢",
          ageCheck: "News can include serious topics—preview recommended. ⚠️🔍"
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
            "1️⃣ 🎧 Listen once and guess the meaning from context 🧠",
            "2️⃣ 📌 Write the phrase + your own example sentence ✍️",
            "3️⃣ 🔁 Repeat the episode and shadow key lines 🔁🗣️",
            "4️⃣ 🗣️ Use the phrase in a 30-second mini-dialogue 🎭⏱️"
          ],
          whyTopPick: "Fast, modern phrases teens actually hear online. ⭐⚡",
          freeAccess: "Free to listen on podcast platforms (Apple Podcasts listing). 🆓✅",
          ageCheck: "Teen-appropriate; idioms may need explanation. ✅🧠"
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
            "7️⃣ Sun ⏱️ (optional): Listen A Minute — quick listening “reps” + short opinion response 🏋️💬"
          ],
          whyTopPick: "Simple rotation that builds confidence + speed control + speaking output. ⭐📈🗣️",
          freeAccess: "Built from free-access sites listed above (some may be ad-supported / YouTube ads). 🆓📢",
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
      }
    ]
  };

  if (!window.UEAH_RESOURCES_STORE || typeof window.UEAH_RESOURCES_STORE.add !== "function") {
    console.error("UEAH_RESOURCES_STORE is not available. Ensure assets/js/resources-store.js is loaded first.");
    return;
  }

  window.UEAH_RESOURCES_STORE.add(DATA);
})();
