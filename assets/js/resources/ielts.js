/* global window */
/**
 * Category pack: IELTS
 * This file is lazy-loaded by assets/js/resources-store.js when visiting
 * /resources/ielts (and child routes).
 *
 * Source: IELTS Reading/Listening/Writing/Speaking DOCX packs (emojis preserved).
 * External resources only — do not host documents in this repo.
 */
(() => {
  "use strict";

  const DATA = {
    age: "ielts",
    packs: {
      "ielts/reading": {
        title: "IELTS Reading 📖",
        subtitle: "60 minutes • 3 sections • 40 questions",
        overview: [
          "⏱️ Time: 60 minutes total.",
          "🧩 Structure: 3 sections, 40 questions.",
          "🎯 Skills: skimming for gist, scanning for details, opinions/attitudes, writer’s views, locating information quickly.",
          "🧑‍🎓 Academic: texts from books/journals/magazines/newspapers (more academic tone).",
          "🧾 General Training: everyday + workplace texts (notices, ads, handbooks, newspapers).",
          "🧮 Scoring: 1 mark per correct answer, converted to band score.",
          "🧩 Common question types: multiple choice; TF/NG; matching headings/information/features/sentence endings; sentence/summary completion; short answers.",
          "🧾 Materials: timer, answer sheet, pen/pencil, error log, vocabulary notebook, stable browser/device.",
          "🪜 Practice loop: timed passage (10–20 min) → review by question type → redo wrong questions after 1–2 days → weekly full 60-minute test."
        ],
      },
      "ielts/listening": {
        title: "IELTS Listening 🎧",
        subtitle: "4 parts • 40 questions • audio once",
        overview: [
          "🧩 Format: 4 parts, 40 questions; you hear each recording once.",
          "🔎 Topics: conversation + monologue (social → academic).",
          "⏱️ Timing: ~30 minutes audio; paper test includes extra time to transfer answers (varies by delivery).",
          "🧠 Skills: main ideas, specific information, attitudes/opinion, purpose, following idea development."
        ],
      },
      "ielts/writing": {
        title: "IELTS Writing ✍️",
        subtitle: "2 tasks • 60 minutes • Task 2 counts double",
        overview: [
          "🧩 Format: 2 tasks in 60 minutes (Academic + General Training).",
          "⚖️ Task 2 is worth twice as much as Task 1.",
          "🧾 Task 1: Academic = describe data/diagram/map/process. General Training = write a letter.",
          "🧠 Task 2: Essay (opinion/discussion/problem-solution/advantage-disadvantage).",
          "📈 Scoring: Task achievement/response, Coherence & Cohesion, Lexical Resource, Grammar."
        ],
      },
      "ielts/speaking": {
        title: "IELTS Speaking 🗣️",
        subtitle: "3 parts • 11–14 minutes • face-to-face",
        overview: [
          "🧩 Format: 3 parts (Part 1 interview, Part 2 long turn, Part 3 discussion).",
          "⏱️ Time: 11–14 minutes total; face-to-face with a certified examiner (recorded).",
          "✅ Scoring: Fluency & Coherence, Lexical Resource, Grammar Range & Accuracy, Pronunciation.",
          "✅ See the resources below for practice materials."
        ],
      },
    },
    resources: [
      {
        age: "ielts",
        skill: "reading",
        slug: "british-council-free-ielts-reading-practice-tests-hub",
        title: "🏛️ British Council — Free IELTS Reading practice tests (hub) 🧩📚",
        description: "🎯 Full-format Reading practice under time limits ⏱️",
        link: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/reading",
        format: "site",
        details: {
          type: "🧰 Practice test hub (Academic + GT) 📝",
          teaches: "🎯 Full-format Reading practice under time limits ⏱️",
          howTo: [
            "🪜 1️⃣ Choose Academic or General Training ✅",
            "2️⃣ Set a 60-minute timer ⏱️",
            "3️⃣ Do all 3 sections, then check answers 📌",
          ],
          whyTopPick: "⭐ Official-quality practice, clear format 🏅",
          freeAccess: "🆓 Fully free; some extra materials mention signup 🔓 Take IELTS",
          ageCheck: "👤 Appropriate for teens/adults; exam-style topics 📘",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "british-council-academic-reading-full-practice-test",
        title: "🏛️ British Council — Academic Reading full practice test 🧑‍🎓📄",
        description: "🎯 Real Academic passage flow + pacing ⏱️",
        link: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/reading/academic",
        format: "site",
        details: {
          type: "🧰 Full practice paper (40 Qs) 📝",
          teaches: "🎯 Real Academic passage flow + pacing ⏱️",
          howTo: [
            "🪜 1️⃣ Start Section 1 → 2 → 3 in order 🔁",
            "2️⃣ Spend ~20 minutes per passage ⏲️",
            "3️⃣ Mark mistakes and redo weak question types 🧠",
          ],
          whyTopPick: "⭐ Timed, exam-faithful structure ✅",
          freeAccess: "🆓 Free online + mentions offline download option 📄 Take IELTS",
          ageCheck: "👤 Suitable 13–18+; academic topics 📚",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "british-council-general-training-reading-full-practice-test",
        title: "🏛️ British Council — General Training Reading full practice test 🧾📰",
        description: "🎯 GT text types (notices, workplace, general interest) 🧭",
        link: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/reading/general-training",
        format: "site",
        details: {
          type: "🧰 Full practice test (3 parts) 📝",
          teaches: "🎯 GT text types (notices, workplace, general interest) 🧭",
          howTo: [
            "🪜 1️⃣ Move quickly between the 3 web pages 🔄",
            "2️⃣ Time the full test (60 minutes) ⏱️",
            "3️⃣ Review errors by question type (TFNG, matching, gaps) 🧩",
          ],
          whyTopPick: "⭐ Official-style GT reading workflow ✅",
          freeAccess: "🆓 Free online + offline download mentioned 📄 Take IELTS",
          ageCheck: "👤 Appropriate 13–18+; everyday topics 📰",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "british-council-official-reading-answer-sheet-pdf",
        title: "🧾 British Council — Official Reading answer sheet (PDF) 📝📄",
        description: "🎯 Bubble/transfer habit + handwriting speed ✍️",
        link: "https://takeielts.britishcouncil.org/sites/default/files/reading-test.pdf",
        format: "pdf",
        details: {
          type: "🧰 Printable answer sheet 📄",
          teaches: "🎯 Bubble/transfer habit + handwriting speed ✍️",
          howTo: [
            "🪜 1️⃣ Print 2–5 copies 🖨️",
            "2️⃣ Practice transferring answers at the end 🧠",
            "3️⃣ Track recurring mistakes (spelling, word limits) ✅",
          ],
          whyTopPick: "⭐ Makes practice feel like test day 🎯",
          freeAccess: "🆓 Fully free PDF 🔓 Take IELTS",
          ageCheck: "👤 Safe for all exam learners 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "british-council-academic-reading-answers-pdf-key",
        title: "✅ British Council — Academic Reading answers (PDF key) 🔍📄",
        description: "🎯 Self-checking accuracy + strict spelling rules ✍️",
        link: "https://takeielts.britishcouncil.org/sites/default/files/bc_ac_reading_1_answers.pdf",
        format: "pdf",
        details: {
          type: "🧰 Answer key PDF ✅",
          teaches: "🎯 Self-checking accuracy + strict spelling rules ✍️",
          howTo: [
            "🪜 1️⃣ Mark wrong answers ❌",
            "2️⃣ Write why you missed it (keyword trap / paraphrase / word limit) 🧠",
            "3️⃣ Redo only the missed questions 48 hours later 🔁",
          ],
          whyTopPick: "⭐ Fast feedback loop for improvement ⚡",
          freeAccess: "🆓 Fully free PDF 🔓 Take IELTS",
          ageCheck: "👤 Safe for 13–18+ 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-liz-true-false-not-given-strategy-lesson",
        title: "🧠 IELTS Liz — True/False/Not Given strategy lesson 🧩📌",
        description: "🎯 TFNG approach + common traps (keyword matching) ⚠️",
        link: "https://ieltsliz.com/ielts-reading-true-false-not-given/",
        format: "site",
        details: {
          type: "🧰 Strategy lesson page 🧠",
          teaches: "🎯 TFNG approach + common traps (keyword matching) ⚠️",
          howTo: [
            "🪜 1️⃣ Read strategy + examples 📖",
            "2️⃣ Apply to 10 TFNG questions from a test 📄",
            "3️⃣ Log mistakes in error-log 🧾",
          ],
          whyTopPick: "⭐ Clear, beginner-friendly strategy guidance ✅",
          freeAccess: "🆓 Free page; some optional paid resources elsewhere 🔓 IELTS Liz",
          ageCheck: "👤 Teen/adult friendly 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-liz-matching-headings-strategy",
        title: "🧠 IELTS Liz — Matching Headings strategy 🧩🗂️",
        description: "🎯 Heading-matching logic + how to avoid topic traps 🧠",
        link: "https://ieltsliz.com/ielts-reading-matching-headings/",
        format: "site",
        details: {
          type: "🧰 Strategy lesson page 🧠",
          teaches: "🎯 Heading-matching logic + how to avoid topic traps 🧠",
          howTo: [
            "🪜 1️⃣ Read the strategy ✅",
            "2️⃣ Do a matching headings task timed (10–12 min) ⏱️",
            "3️⃣ Review wrong headings and paraphrase clues 🧠",
          ],
          whyTopPick: "⭐ Targets one of the hardest IELTS Reading types 🎯",
          freeAccess: "🆓 Free page; optional paid resources elsewhere 🔓 IELTS Liz",
          ageCheck: "👤 Teen/adult friendly 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-liz-summary-completion-strategy",
        title: "🧠 IELTS Liz — Summary completion strategy 🧩📝",
        description: "🎯 Gaps/summary logic + word limit discipline ✅",
        link: "https://ieltsliz.com/ielts-reading-summary-completion/",
        format: "site",
        details: {
          type: "🧰 Strategy lesson page 🧠",
          teaches: "🎯 Gaps/summary logic + word limit discipline ✅",
          howTo: [
            "🪜 1️⃣ Read the rules (word limits, grammar fit) 📌",
            "2️⃣ Attempt 1 summary completion under time ⏱️",
            "3️⃣ Check answers + note paraphrases 🧠",
          ],
          whyTopPick: "⭐ Covers a very common IELTS Reading question type 🧾",
          freeAccess: "🆓 Free page; optional paid content elsewhere 🔓 IELTS Liz",
          ageCheck: "👤 Teen/adult friendly 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-liz-ielts-reading-tips",
        title: "🧠 IELTS Liz — Tips for Reading speed & time management ⏱️📈",
        description: "🎯 Pacing plan (20-20-20) + skimming/scanning guidance ⏱️",
        link: "https://ieltsliz.com/ielts-reading-tips/",
        format: "site",
        details: {
          type: "🧰 Tips + strategy page ⏱️",
          teaches: "🎯 Pacing plan (20-20-20) + skimming/scanning guidance ⏱️",
          howTo: [
            "🪜 1️⃣ Read timing tips 📖",
            "2️⃣ Apply to 1 full test with strict timing ⏱️",
            "3️⃣ Adjust pacing based on error log 📈",
          ],
          whyTopPick: "⭐ Helps stop running out of time (common issue) ⚡",
          freeAccess: "🆓 Free page 🔓 IELTS Liz",
          ageCheck: "👤 Teen/adult friendly 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-org-sample-test-questions-academic-gt",
        title: "🏢 IELTS.org — Sample test questions (Academic + GT) 📄✅",
        description: "🎯 Official sample questions + downloadable tasks 🗂️",
        link: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions",
        format: "site",
        details: {
          type: "🧰 Official sample question hub 🗂️",
          teaches: "🎯 Official sample questions + downloadable tasks 🗂️",
          howTo: [
            "🪜 1️⃣ Pick Academic or GT sample tasks 📄",
            "2️⃣ Time a task segment ⏱️",
            "3️⃣ Review with answer sheet and log errors 🧾",
          ],
          whyTopPick: "⭐ Authentic IELTS-style wording and tasks ✅",
          freeAccess: "🆓 Free to access; sample files downloadable 🔓 IELTS",
          ageCheck: "👤 13–18+ / adult 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-org-academic-sample-tasks-pdf",
        title: "🏢 IELTS.org — Academic sample tasks PDF (easy downloads) 🧑‍🎓📄",
        description: "🎯 Authentic Academic reading materials from IELTS.org 🧑‍🎓",
        link: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions/academic-test",
        format: "site",
        details: {
          type: "🧰 Official download page 🗂️",
          teaches: "🎯 Authentic Academic reading materials from IELTS.org 🧑‍🎓",
          howTo: [
            "🪜 1️⃣ Download Academic tasks 📄",
            "2️⃣ Use the official answer sheet 📝",
            "3️⃣ Repeat tasks weekly with timing ⏱️",
          ],
          whyTopPick: "⭐ Clean official access point ✅",
          freeAccess: "🆓 Free downloads listed 🔓 IELTS",
          ageCheck: "👤 13–18+ / adult 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-org-general-training-sample-tasks-pdf",
        title: "🏢 IELTS.org — General Training sample tasks PDF (easy downloads) 🧾📄",
        description: "🎯 Authentic GT reading materials from IELTS.org 🧾",
        link: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions/general-training-test",
        format: "site",
        details: {
          type: "🧰 Official download page 🗂️",
          teaches: "🎯 Authentic GT reading materials from IELTS.org 🧾",
          howTo: [
            "🪜 1️⃣ Download GT Reading sample tasks 📄",
            "2️⃣ Use the official answer sheet 📝",
            "3️⃣ Repeat tasks weekly with timing ⏱️",
          ],
          whyTopPick: "⭐ Clean official access point ✅",
          freeAccess: "🆓 Free downloads listed 🔓 IELTS",
          ageCheck: "👤 13–18+ 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "idp-ielts-india-ielts-reading-test",
        title: "🆔 IDP IELTS India — IELTS Reading task sets (Academic/GT) 📘🧾",
        description: "🎯 Practice materials + guidance for Reading tasks 📌",
        link: "https://www.ieltsidpindia.com/ielts-reading-test",
        format: "site",
        details: {
          type: "🧰 Practice + guidance page 📘",
          teaches: "🎯 Practice materials + guidance for Reading tasks 📌",
          howTo: [
            "🪜 1️⃣ Review question types 🧠",
            "2️⃣ Do a practice set 📄",
            "3️⃣ Track mistakes by type 🧾",
          ],
          whyTopPick: "⭐ Provider-style explanation + practice links ✅",
          freeAccess: "🆓 Free page 🔓 IDP IELTS India",
          ageCheck: "👤 Teen/adult 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-com-au-prepare-article-ielts-reading-practice-tests",
        title: "🧪 IELTS+1 — IELTS Reading Practice Tests (Academic & GT) 🧩📚",
        description: "🎯 Multiple practice tests + answer keys 🧾",
        link: "https://ielts.com.au/australia/prepare/article-ielts-reading-practice-tests",
        format: "site",
        details: {
          type: "🧰 Practice tests + guidance page 🧩",
          teaches: "🎯 Multiple practice tests + answer keys 🧾",
          howTo: [
            "🪜 1️⃣ Choose a test set 📄",
            "2️⃣ Time yourself (60 min) ⏱️",
            "3️⃣ Check answers and log errors 🧠",
          ],
          whyTopPick: "⭐ Straightforward practice sets + official provider branding ✅",
          freeAccess: "🆓 Free access via webpage 🔓 IELTS+1",
          ageCheck: "👤 Teen/adult 👤",
        },
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "youpass-vn-ielts-reading",
        title: "📚 YouPass VN — Free IELTS Reading practice platform (Vietnam-focused) 🧾📚",
        description: "🎯 Extra test sets + explanations + vocabulary tracking 🧠",
        link: "https://youpass.vn/ielts/reading",
        format: "site",
        details: {
          type: "🧰 Practice platform with explanations (Vietnamese UI) 🖥️",
          teaches: "🎯 Extra test sets + explanations + vocabulary tracking 🧠",
          howTo: [
            "🪜 1️⃣ Choose a test set by question type 🧩",
            "2️⃣ Practice timed ⏱️",
            "3️⃣ Save new vocabulary into the built-in notebook 🗂️",
          ],
          whyTopPick: "⭐ Convenient extra practice for VN learners 🇻🇳",
          freeAccess: "🆓 Described as free practice platform on page 🔓 YouPass VN",
          ageCheck: "👤 13–18+; standard exam topics 📘",
        },
      },

      {
        age: "ielts",
        skill: "reading",
        slug: "mini-ielts-free-practice",
        title: "Mini-IELTS — Free Reading Practice Tests ⏱️📖",
        description: "🎯 Huge collection of short, free IELTS Reading passages to practice on the go.",
        link: "https://mini-ielts.com/",
        format: "site",
        details: {
          type: "🧰 Shorter practice test snippets",
          teaches: "🎯 Realistic exam questions and pacing without needing a full 60 minutes",
          howTo: [
            "🪜 ① Choose a topic or question type you struggle with",
            "② Set a 10-15 minute timer per passage",
            "③ Check your score instantly and review the text for paraphrases"
          ],
          whyTopPick: "⭐ Perfect for daily practice when you don't have a full hour.",
          freeAccess: "💸 Web access is completely free.",
          ageCheck: "👤 Teen/Adult; standard IELTS texts."
        }
      },

      {
        age: "ielts",
        skill: "listening",
        slug: "ielts-org-ielts-academic-format-listening",
        title: "🎧 IELTS.org — Listening Test Format 🧾",
        description: "🎯 Exact test structure + what to expect",
        link: "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-listening",
        format: "site",
        details: {
          teaches: "🎯 Exact test structure + what to expect",
          howTo: [
            "🪜 ✅ Read parts + question types",
            "✅ Note common traps (spelling, word limits)",
            "✅ Use as your “rules reference” before every practice",
          ],
          whyTopPick: "⭐ Official source for format accuracy",
          freeAccess: "💸 Fully free, no account",
          ageCheck: "👤 18+ friendly; exam-focused, safe",
        },
      },
      {
        age: "ielts",
        skill: "listening",
        slug: "ielts-org-ielts-listening-sample-tasks-2023-pdf",
        title: "📄 IELTS.org — Listening Sample Tasks (2023 PDF) 🧪",
        description: "🎯 Multiple IELTS listening task types + tapescripts + answers",
        link: "https://ielts.org/cdn/Sample-tests/ielts-listening-sample-tasks-2023.pdf",
        format: "pdf",
        details: {
          type: "📄 Official PDF practice pack",
          teaches: "🎯 Multiple IELTS listening task types + tapescripts + answers",
          howTo: [
            "🪜 ✅ Do 1 task under time",
            "✅ Check answers",
            "✅ Use tapescripts to find why you missed it",
          ],
          whyTopPick: "⭐ Authentic content + includes tapescripts for review",
          freeAccess: "💸 Fully free PDF",
          ageCheck: "👤 Teen/adult; safe content",
        },
      },
      {
        age: "ielts",
        skill: "listening",
        slug: "ielts-org-listening-answer-sheet-sample-pdf",
        title: "📝 IELTS.org — Listening Answer Sheet (Sample PDF) 📄",
        description: "🎯 Practice transferring answers + spelling accuracy",
        link: "https://ielts.org/-/media/pdfs/listening-answer-sheet.ashx",
        format: "site",
        details: {
          type: "📄 Printable answer sheet",
          teaches: "🎯 Practice transferring answers + spelling accuracy",
          howTo: [
            "🪜 ✅ Print 2–5 copies",
            "✅ Practice transfer at the end of Section 4",
            "✅ Track recurring spelling/plural errors",
          ],
          whyTopPick: "⭐ Makes practice closer to real test day",
          freeAccess: "💸 Fully free download",
          ageCheck: "👤 Safe for all ages",
        },
      },
      {
        age: "ielts",
        skill: "listening",
        slug: "ielts-liz-ielts-listening",
        title: "🧠 IELTS Liz — Listening Tips & Common Traps 🎧⚠️",
        description: "🎯 Traps, spelling, plural forms, word limits, prediction",
        link: "https://ieltsliz.com/ielts-listening/",
        format: "site",
        details: {
          type: "🧠 Strategy/tips hub",
          teaches: "🎯 Traps, spelling, plural forms, word limits, prediction",
          howTo: [
            "🪜 ✅ Read 1 tip section",
            "✅ Apply to a practice test",
            "✅ Add 3 mistakes to error log",
          ],
          whyTopPick: "⭐ Clear explanations + fast fixes for common mistakes",
          freeAccess: "💸 Free website content",
          ageCheck: "👤 Teen/adult friendly",
        },
      },
      {
        age: "ielts",
        skill: "listening",
        slug: "ieltsidpindia-com-ielts-listening-test",
        title: "🎧 IDP IELTS India — IELTS Listening practice resources 📌",
        description: "🎯 Overview + practice links for IELTS Listening",
        link: "https://www.ieltsidpindia.com/ielts-listening-test",
        format: "site",
        details: {
          type: "🧾 Practice resources page",
          teaches: "🎯 Overview + practice links for IELTS Listening",
          howTo: [
            "🪜 ✅ Review question types",
            "✅ Do 1 practice set",
            "✅ Track raw score /40",
          ],
          whyTopPick: "⭐ Provider-branded guidance + practice materials",
          freeAccess: "💸 Free webpage access",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "listening",
        slug: "takeielts-britishcouncil-listening-section-1",
        title: "🇬🇧 British Council — Free Listening practice tests (Parts 1–4) 🎧",
        description: "🎯 Sectioned practice test with audio + answers",
        link: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/listening/section-1",
        format: "site",
        details: {
          type: "🧾 Practice test sections",
          teaches: "🎯 Sectioned practice test with audio + answers",
          howTo: [
            "🪜 ✅ Do Section 1 timed",
            "✅ Review with tapescript",
            "✅ Repeat weak question types",
          ],
          whyTopPick: "⭐ Official-style listening practice with real pacing",
          freeAccess: "💸 Free webpage access",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "listening",
        slug: "bbc-learning-english-6-minute-english-youtube-playlist",
        title: "📺 BBC Learning English — “6 Minute English” Playlist (YouTube) 🎧",
        description: "🎯 Short listening practice with real topics + vocab",
        link: "https://www.youtube.com/playlist?list=PLcetZ6gSk96_FECppW4DA1e7P9ET6n",
        format: "video",
        details: {
          type: "📺 Video playlist",
          teaches: "🎯 Short listening practice with real topics + vocab",
          howTo: [
            "🪜 ✅ Watch 1 episode",
            "✅ Note 5 new phrases",
            "✅ Replay and shadow key lines",
          ],
          whyTopPick: "⭐ Short + repeatable listening practice",
          freeAccess: "💸 Free on YouTube",
          ageCheck: "👤 Teen/adult",
        },
      },

      {
        age: "ielts",
        skill: "listening",
        slug: "bbc-global-news-podcast",
        title: "BBC Global News Podcast 🌍📻",
        description: "🎯 High-level vocabulary and global accents perfect for IELTS Part 4 training.",
        link: "https://www.bbc.co.uk/programmes/p02nq0gn/episodes/downloads",
        format: "podcast",
        details: {
          type: "📻 Daily News Podcast",
          teaches: "🎯 Advanced vocabulary, British/global accents, sustained listening stamina",
          howTo: [
            "🪜 ① Listen to one 30-minute episode actively",
            "② Note down 5 unfamiliar academic words",
            "③ Try to summarize the top 3 news stories aloud"
          ],
          whyTopPick: "⭐ Excellent off-screen preparation for the toughest parts of the listening exam.",
          freeAccess: "💸 Free on all podcast apps.",
          ageCheck: "👤 Real world news; may contain heavy topics."
        }
      },

      {
        age: "ielts",
        skill: "listening",
        slug: "ielts-up-listening-practice-tests",
        title: "IELTS Up — Free Listening Practice Tests 🎧🧪",
        description: "🎯 Full IELTS Listening mock tests with audio, answers, and explanations.",
        link: "https://ielts-up.com/listening/ielts-listening-practice.html",
        format: "site",
        details: {
          type: "🧪 Full practice tests with audio + answer keys",
          teaches: "🎯 All 4 parts of the IELTS Listening test under timed conditions",
          howTo: [
            "🪜 ① Choose a practice test ✅",
            "② Listen to all 4 parts with headphones 🎧",
            "③ Check answers and note your raw score /40 📊",
            "④ Re-do weak sections after 2 days 🔁"
          ],
          whyTopPick: "⭐ Full-length listening tests that closely match real exam difficulty.",
          freeAccess: "💸 Free to access online.",
          ageCheck: "👤 Teen/adult; standard IELTS content."
        }
      },

      {
        age: "ielts",
        skill: "listening",
        slug: "ielts-buddy-listening-tips",
        title: "IELTS Buddy — Listening Tips & Practice 🎧💡",
        description: "🎯 Question-type strategies and practice exercises for IELTS Listening.",
        link: "https://www.ieltsbuddy.com/ielts-listening.html",
        format: "site",
        details: {
          type: "🧠 Strategy lessons + exercises",
          teaches: "🎯 Strategies for each question type (matching, maps, MCQ, gap-fill)",
          howTo: [
            "🪜 ① Choose a question type you struggle with 🎯",
            "② Read the strategy tips carefully 📖",
            "③ Do the practice exercise ✅",
            "④ Apply the strategy in a full test 🔁"
          ],
          whyTopPick: "⭐ Practical question-type strategies that translate to real test gains.",
          freeAccess: "💸 Free website content.",
          ageCheck: "👤 Teen/adult friendly."
        }
      },

      {
        age: "ielts",
        skill: "listening",
        slug: "cambridge-ielts-listening-youtube",
        title: "Cambridge IELTS Listening Tests — YouTube 🎧📺",
        description: "🎯 Full Cambridge IELTS listening test audio for realistic practice.",
        link: "https://www.youtube.com/results?search_query=cambridge+ielts+listening+test",
        format: "video",
        details: {
          type: "📺 Full test audio on YouTube",
          teaches: "🎯 Realistic exam pacing and audio quality experience",
          howTo: [
            "🪜 ① Search for a Cambridge IELTS test number (e.g. 15, 16, 17) 🔎",
            "② Play the full test with headphones 🎧",
            "③ Write answers on paper (simulates real test) ✍️",
            "④ Check against published answer keys ✅"
          ],
          whyTopPick: "⭐ The gold standard for IELTS listening practice.",
          freeAccess: "💸 Free on YouTube (search for specific test numbers).",
          ageCheck: "👤 Teen/adult; standard exam content."
        }
      },

      {
        age: "ielts",
        skill: "listening",
        slug: "ted-talks-ielts-listening",
        title: "TED Talks — Academic Listening Practice 🎓🎧",
        description: "🎯 Advanced listening practice with academic topics that mirror IELTS Part 3/4 difficulty.",
        link: "https://www.ted.com/talks",
        format: "video",
        details: {
          type: "🎓 Academic talks + subtitles",
          teaches: "🎯 Academic vocabulary, sustained listening, and note-taking skills",
          howTo: [
            "🪜 ① Choose a 10–15 minute talk on a topic you find interesting 🎯",
            "② Watch without subtitles first 👂",
            "③ Note 5–10 academic words ✍️",
            "④ Re-watch with subtitles to check understanding ✅"
          ],
          whyTopPick: "⭐ Builds the academic listening stamina needed for IELTS Part 3 and 4.",
          freeAccess: "💸 Free to watch on ted.com.",
          ageCheck: "👤 Teen/adult; previewing topics recommended."
        }
      },

      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-org-writing-test-resources",
        title: "IELTS.org — Writing test preparation resources 🏛️📚",
        description: "🎯 What each task requires + how to meet the prompt (Academic + GT).",
        link: "https://ielts.org/take-a-test/preparation-resources/writing-test-resources",
        format: "site",
        details: {
          teaches: "🎯 What each task requires + how to meet the prompt (Academic + GT).",
          howTo: [
            "🪜 ① Read Task 1 + Task 2 requirements ② Copy the example structure ③ Write your answer ④ Compare against the guidance/examples.",
          ],
          whyTopPick: "⭐ Official, task-focused explanations with practical examples.",
          freeAccess: "💸 Fully free, no account noted. IELTS",
          ageCheck: "👤 Best for 13–18+ / adults; some prompts may include mature topics.",
        },
      },
      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-org-ielts-academic-format-writing",
        title: "IELTS.org — IELTS Academic Writing format 🧩📝",
        description: "🎯 Test structure + timings (Task 1 + Task 2).",
        link: "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-writing",
        format: "site",
        details: {
          teaches: "🎯 Test structure + timings (Task 1 + Task 2).",
          howTo: [
            "🪜 ✅ Read once as your rules reference",
            "✅ Use it to plan time split (Task 1 vs Task 2)",
          ],
          whyTopPick: "⭐ Official format accuracy",
          freeAccess: "💸 Fully free page",
          ageCheck: "👤 Teen/adult; exam-focused",
        },
      },
      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-org-ielts-writing-sample-tasks-2023-pdf",
        title: "IELTS.org — Writing Sample Tasks 2023 (PDF) 🧪📄",
        description: "🎯 Official Task 1 + Task 2 prompts (Academic + GT).",
        link: "https://ielts.org/cdn/Sample-tests/ielts-writing-sample-tasks-2023.pdf",
        format: "pdf",
        details: {
          type: "📄 Official PDF tasks",
          teaches: "🎯 Official Task 1 + Task 2 prompts (Academic + GT).",
          howTo: [
            "🪜 ✅ Pick 1 Task 1 prompt and write in 20 minutes",
            "✅ Pick 1 Task 2 prompt and write in 40 minutes",
            "✅ Compare to band descriptors / model answers where available",
          ],
          whyTopPick: "⭐ Official prompts to practise under time",
          freeAccess: "💸 Fully free PDF",
          ageCheck: "👤 Teen/adult; exam topics",
        },
      },
      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-org-official-sample-test-questions-academic-gt",
        title: "IELTS.org — Official sample test questions (Academic + GT) 🧪📄",
        description: "🎯 Official sample questions + downloadable tasks.",
        link: "https://ielts.org/take-a-test/preparation-resources/sample-test-questions",
        format: "site",
        details: {
          teaches: "🎯 Official sample questions + downloadable tasks.",
          howTo: [
            "🪜 ✅ Choose Writing samples",
            "✅ Time yourself",
            "✅ Check against descriptors",
          ],
          whyTopPick: "⭐ Official question bank",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-liz-ielts-writing-task-1",
        title: "IELTS Liz — Writing Task 1 lessons 🧾📈",
        description: "🎯 Task 1 structure + language + common mistakes.",
        link: "https://ieltsliz.com/ielts-writing-task-1-lessons-and-tips/",
        format: "site",
        details: {
          type: "🧠 Lesson hub",
          teaches: "🎯 Task 1 structure + language + common mistakes.",
          howTo: [
            "🪜 ✅ Read 1 lesson",
            "✅ Write 1 Task 1 answer",
            "✅ Fix 3 errors and rewrite",
          ],
          whyTopPick: "⭐ Clear explanations for Task 1 success",
          freeAccess: "💸 Free site content",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-liz-ielts-writing-task-2",
        title: "IELTS Liz — Writing Task 2 lessons 🧠✍️",
        description: "🎯 Task 2 essay types + structure + vocab/grammar tips.",
        link: "https://ieltsliz.com/ielts-writing-task-2/",
        format: "site",
        details: {
          type: "🧠 Lesson hub",
          teaches: "🎯 Task 2 essay types + structure + vocab/grammar tips.",
          howTo: [
            "🪜 ✅ Choose 1 essay type",
            "✅ Write in 40 minutes",
            "✅ Rewrite using feedback checklist",
          ],
          whyTopPick: "⭐ Strong fundamentals for Task 2",
          freeAccess: "💸 Free site content",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-advantage-task-2-essay-structures",
        title: "IELTS Advantage — Task 2 essay structures 🧱🧠",
        description: "🎯 Essay structure templates + strategy.",
        link: "https://www.ieltsadvantage.com/ielts-writing-task-2/",
        format: "site",
        details: {
          type: "🧠 Strategy page",
          teaches: "🎯 Essay structure templates + strategy.",
          howTo: [
            "🪜 ✅ Pick a structure template",
            "✅ Plan in 5 minutes",
            "✅ Write in 35 minutes",
          ],
          whyTopPick: "⭐ Clear, structured Task 2 guidance",
          freeAccess: "💸 Free webpage access",
          ageCheck: "👤 Teen/adult",
        },
      },

      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-simon-writing-tips",
        title: "IELTS Simon — Writing Task 1 & 2 Tips 📝🧑‍🏫",
        description: "🎯 Extremely clear, band 9 model answers from an ex-examiner.",
        link: "https://ielts-simon.study/",
        format: "site",
        details: {
          type: "🧠 Strategy and Model Essay hub",
          teaches: "🎯 Simplicity, clarity, and precise sentence structures that examiners want to see",
          howTo: [
            "🪜 ① Read a Band 9 model for Task 1 or 2",
            "② Analyze the paragraph structure and linking words",
            "③ Rewrite a similar prompt using that exact structure"
          ],
          whyTopPick: "⭐ Strips away complex vocabulary myths to show clear, logical writing.",
          freeAccess: "💸 Free blog archive available online.",
          ageCheck: "👤 Suitable for all IELTS candidates."
        }
      },

      {
        age: "ielts",
        skill: "writing",
        slug: "write-and-improve-ielts",
        title: "Cambridge Write & Improve — IELTS Writing Feedback ✍️🤖",
        description: "🎯 Free AI-powered writing tool from Cambridge with IELTS-specific tasks and instant CEFR-level feedback.",
        link: "https://writeandimprove.com/",
        format: "site",
        details: {
          type: "✍️ AI writing feedback tool",
          teaches: "🎯 Self-correction, grammar accuracy, and vocabulary range for IELTS writing",
          howTo: [
            "🪜 ① Select an IELTS-style writing task 🎯",
            "② Write your response in the editor ✍️",
            "③ Submit for instant AI feedback 🤖",
            "④ Revise and resubmit to improve your level 📈"
          ],
          whyTopPick: "⭐ Instant, unlimited feedback on your writing — perfect for daily practice.",
          freeAccess: "💸 Free to use (Cambridge).",
          ageCheck: "👤 Suitable for all IELTS candidates."
        }
      },

      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-buddy-writing-task-2",
        title: "IELTS Buddy — Writing Task 2 Model Essays 📝🏆",
        description: "🎯 Model essays with analysis for every common Task 2 essay type.",
        link: "https://www.ieltsbuddy.com/ielts-writing-task-2.html",
        format: "site",
        details: {
          type: "📝 Model essays + analysis",
          teaches: "🎯 Essay structure, linking words, and vocabulary for high band scores",
          howTo: [
            "🪜 ① Read a model essay for your target essay type 📖",
            "② Analyze the paragraph structure and transitions 🧠",
            "③ Write your own essay on a similar topic ✍️",
            "④ Compare your structure against the model 🔍"
          ],
          whyTopPick: "⭐ Clear, structured models that show exactly how to organize essays.",
          freeAccess: "💸 Free website content.",
          ageCheck: "👤 Teen/adult IELTS candidates."
        }
      },

      {
        age: "ielts",
        skill: "writing",
        slug: "grammarly-writing-assistant",
        title: "Grammarly — Free Writing Assistant 📝✅",
        description: "🎯 Free grammar and spelling checker useful for proofreading IELTS practice essays.",
        link: "https://www.grammarly.com/",
        format: "site",
        details: {
          type: "📝 Grammar/spelling checker tool",
          teaches: "🎯 Spotting grammar errors, improving clarity, and building self-editing habits",
          howTo: [
            "🪜 ① Write your IELTS essay in a notebook first ✍️",
            "② Type it into Grammarly to check errors 💻",
            "③ Review each correction and understand why 🧠",
            "④ Rewrite the corrected version by hand for memory 🔁"
          ],
          whyTopPick: "⭐ Helps build self-editing awareness before test day.",
          freeAccess: "💸 Free tier available (premium features are paid).",
          ageCheck: "👤 Suitable for all IELTS candidates."
        }
      },

      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-org-ielts-academic-format-speaking",
        title: "🗣️ IELTS.org — IELTS Academic Speaking format 📘",
        description: "🎯 Exact structure + what happens in each part",
        link: "https://ielts.org/take-a-test/test-types/ielts-academic-test/ielts-academic-format-speaking",
        format: "site",
        details: {
          type: "🧾 Official overview",
          teaches: "🎯 Exact structure + what happens in each part",
          howTo: [
            "🪜 ① Read once 📖 ② Note timing per part ⏱️ ③ Use as your “rules checklist” before practice ✅",
          ],
          whyTopPick: "⭐ Official and format-accurate",
          freeAccess: "💸 Fully free, no account",
          ageCheck: "👤 18+ safe; exam-focused content",
        },
      },
      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-org-ielts-speaking-sample-tasks-2023-pdf",
        title: "📄 IELTS.org — Speaking Sample Tasks 2023 (PDF) 🧪",
        description: "🎯 Realistic Part 1/2/3 style prompts",
        link: "https://ielts.org/cdn/Sample-tests/ielts-speaking-sample-tasks-2023.pdf",
        format: "pdf",
        details: {
          type: "📄 Official PDF prompts + sample interaction",
          teaches: "🎯 Realistic Part 1/2/3 style prompts",
          howTo: [
            "🪜 ① Choose 1 set ✅ ② Record answers 🎙️ ③ Re-do 48h later for improvement 🔁",
          ],
          whyTopPick: "⭐ Closest to real test phrasing",
          freeAccess: "💸 Fully free PDF",
          ageCheck: "👤 18+ safe",
        },
      },
      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-org-demystifying-the-ielts-speaking-test",
        title: "🧠 IELTS.org — Demystifying the IELTS Speaking test 🧾",
        description: "🎯 Understanding the exam + how it’s assessed",
        link: "https://ielts.org/news-and-insights/demystifying-the-ielts-speaking-test",
        format: "site",
        details: {
          type: "🧾 Official article",
          teaches: "🎯 Understanding the exam + how it’s assessed",
          howTo: [
            "🪜 ① Read once 📖 ② Note key scoring points ✅ ③ Apply to your next speaking practice 🎙️",
          ],
          whyTopPick: "⭐ Clear explanation from official source",
          freeAccess: "💸 Fully free page",
          ageCheck: "👤 Teen/adult; safe",
        },
      },
      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-liz-ielts-speaking",
        title: "🗣️ IELTS Liz — IELTS Speaking lessons (Parts 1–3) ✅🗣️",
        description: "🎯 Strategy + question types + common mistakes",
        link: "https://ieltsliz.com/ielts-speaking/",
        format: "site",
        details: {
          type: "🧠 Lessons hub",
          teaches: "🎯 Strategy + question types + common mistakes",
          howTo: [
            "🪜 ① Choose 1 lesson ✅ ② Do 1 speaking topic practice 🎙️ ③ Record + self-check 🔁",
          ],
          whyTopPick: "⭐ Clear lessons and exam-style guidance",
          freeAccess: "💸 Free site content",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-advantage-speaking",
        title: "IELTS Advantage — Speaking tips + band score strategy 🗣️📈",
        description: "🎯 Speaking strategy + how to improve band score",
        link: "https://www.ieltsadvantage.com/ielts-speaking/",
        format: "site",
        details: {
          type: "🧠 Strategy page",
          teaches: "🎯 Speaking strategy + how to improve band score",
          howTo: [
            "🪜 ① Read tips ✅ ② Practice 1 Part 2 talk ⏱️ ③ Re-record with improvements 🔁",
          ],
          whyTopPick: "⭐ Clear band-focused advice",
          freeAccess: "💸 Free webpage",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "speaking",
        slug: "takeielts-speaking-part-2",
        title: "🇬🇧 British Council — Speaking Part 2 (cue card practice) 🗣️⏱️",
        description: "🎯 Cue card practice + timing habits",
        link: "https://takeielts.britishcouncil.org/take-ielts/prepare/free-ielts-english-practice-tests/speaking",
        format: "site",
        details: {
          type: "🧾 Practice + guidance page",
          teaches: "🎯 Cue card practice + timing habits",
          howTo: [
            "🪜 ① Pick 1 cue card ✅ ② Plan for 1 minute 📝 ③ Speak 2 minutes ⏱️ ④ Repeat 3 times 🔁",
          ],
          whyTopPick: "⭐ Practical Part 2 repetition system",
          freeAccess: "💸 Free webpage access",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "speaking",
        slug: "british-council-vietnam-ielts-pronunciation-video-assessment-focus",
        title: "🇬🇧 British Council Vietnam — IELTS Pronunciation video (assessment focus) 🗣️",
        description: "🎯 Pronunciation features assessed in IELTS",
        link: "https://www.britishcouncil.vn/en/english/ielts/practice/pronunciation",
        format: "site",
        details: {
          type: "🧾 Video/explanation page",
          teaches: "🎯 Pronunciation features assessed in IELTS",
          howTo: [
            "🪜 ① Watch once 🎥 ② Note 3 pronunciation targets 🎯 ③ Record + compare 🔁",
          ],
          whyTopPick: "⭐ Clear assessment focus from British Council",
          freeAccess: "💸 Free page",
          ageCheck: "👤 Teen/adult",
        },
      },
      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-speaking-for-success-podcast",
        title: "IELTS Speaking for Success Podcast 🎙️🏆",
        description: "🎯 Fun, unscripted model answers to the latest IELTS speaking topics.",
        link: "https://successwithielts.com/podcast",
        format: "podcast",
        details: {
          type: "📻 Specialized Exam Podcast",
          teaches: "🎯 Natural idiomatic language, high-level vocabulary, and fluency",
          howTo: [
            "🪜 ① Listen to an episode on a specific topic",
            "② Note the 'Band 9' vocabulary highlighted by the hosts",
            "③ Try answering the exact same questions with those words"
          ],
          whyTopPick: "⭐ Keeps speaking practice engaging while delivering high-value vocabulary.",
          freeAccess: "💸 Main episodes are free on Spotify/Apple Podcasts.",
          ageCheck: "👤 Suitable for all IELTS candidates."
        }
      },

      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-speaking-assistant-app",
        title: "IELTS Speaking Assistant — Free Practice App 📱🗣️",
        description: "🎯 Mobile app with real IELTS speaking questions, timer, and recording feature.",
        link: "https://play.google.com/store/search?q=ielts+speaking+assistant&c=apps",
        format: "app",
        details: {
          type: "📱 Speaking practice app",
          teaches: "🎯 Timed speaking practice for Parts 1, 2, and 3 with self-recording",
          howTo: [
            "🪜 ① Install a free IELTS speaking app 📲",
            "② Choose a Part 2 cue card topic 🎯",
            "③ Plan for 1 minute, speak for 2 minutes ⏱️",
            "④ Listen back and note areas to improve 🔁"
          ],
          whyTopPick: "⭐ Convenient daily speaking practice anytime, anywhere.",
          freeAccess: "💸 Free versions available (check your app store).",
          ageCheck: "👤 Teen/adult; standard IELTS topics."
        }
      },

      {
        age: "ielts",
        skill: "speaking",
        slug: "youglish-pronunciation-practice",
        title: "YouGlish — Pronunciation Practice with Real Videos 🎥🗣️",
        description: "🎯 Search any English word to see how native speakers pronounce it in real YouTube videos.",
        link: "https://youglish.com/",
        format: "site",
        details: {
          type: "🎥 Pronunciation video search tool",
          teaches: "🎯 Natural pronunciation, word stress, and intonation patterns",
          howTo: [
            "🪜 ① Search a word you often mispronounce 🔎",
            "② Watch 3–5 clips to hear different speakers 🎥",
            "③ Shadow (say it at the same time) each clip 🗣️",
            "④ Record yourself and compare 🎙️"
          ],
          whyTopPick: "⭐ Authentic pronunciation examples from real speech contexts.",
          freeAccess: "💸 Free to use (YouTube-based).",
          ageCheck: "👤 Suitable for all IELTS candidates."
        }
      },

      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-speaking-topics-blog",
        title: "IELTS Liz — Common Speaking Topics & Questions 🗣️📋",
        description: "🎯 Extensive list of common IELTS Speaking Part 1/2/3 questions sorted by topic.",
        link: "https://ieltsliz.com/ielts-speaking-topics/",
        format: "site",
        details: {
          type: "📋 Topic-based question bank",
          teaches: "🎯 Preparing answers for common exam topics and building topic vocabulary",
          howTo: [
            "🪜 ① Choose 1 topic per day (work, study, technology, etc.) 🎯",
            "② Answer each question aloud for 30–60 seconds 🗣️",
            "③ Record yourself and listen back 🎙️",
            "④ Note 5 useful vocabulary items per topic ✍️"
          ],
          whyTopPick: "⭐ Covers the most commonly tested speaking topics with clear organization.",
          freeAccess: "💸 Free website content.",
          ageCheck: "👤 Teen/adult."
        }
      },

      {
        age: "ielts",
        skill: "speaking",
        slug: "sounds-right-ipa-chart-app",
        title: "Sounds Right — Interactive IPA Pronunciation Chart 🔤🗣️",
        description: "🎯 British Council's free interactive phonemic chart for mastering English sounds.",
        link: "https://learnenglish.britishcouncil.org/content/sounds-right",
        format: "app",
        details: {
          type: "🔤 Interactive phonemic chart + app",
          teaches: "🎯 Individual English sounds, stress patterns, and connected speech",
          howTo: [
            "🪜 ① Tap a sound to hear it clearly 🔊",
            "② Practice 3 target sounds per session 🎯",
            "③ Use example words to practise in context 🗣️",
            "④ Record and compare your pronunciation 🎙️"
          ],
          whyTopPick: "⭐ The official British Council pronunciation tool — trusted and free.",
          freeAccess: "💸 Free app/web tool (British Council).",
          ageCheck: "👤 Suitable for all IELTS candidates."
        }
      },
      {
        age: "ielts",
        skill: "reading",
        slug: "ielts-reading-cambridge-activities-for-learners",
        title: "Cambridge English - Activities for Learners (Reading)",
        description: "Supplementary free reading practice for building speed, gist, and detail handling between full IELTS tests.",
        link: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/?skill=reading",
        format: "site",
        details: {
          type: "Free supplementary skill hub",
          teaches: "Reading for gist, details, and vocabulary in context",
          howTo: [
            "Pick one B1-C1 reading task between full IELTS practices.",
            "Time yourself lightly, then review question errors.",
            "Write down useful paraphrases after each activity."
          ],
          whyTopPick: "Good filler practice when you do not want a full test.",
          freeAccess: "Free Cambridge English activities.",
          ageCheck: "Teen/adult; useful as extra skill practice."
        }
      },
      {
        age: "ielts",
        skill: "listening",
        slug: "ielts-listening-cambridge-activities-for-learners",
        title: "Cambridge English - Activities for Learners (Listening)",
        description: "Supplementary free listening practice for catching key words, details, and meaning before full IELTS listening sets.",
        link: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/?skill=listening",
        format: "site",
        details: {
          type: "Free supplementary skill hub",
          teaches: "Main ideas, detail listening, and replay review habits",
          howTo: [
            "Choose one short listening task at B1-C1 level.",
            "Listen once for meaning and once for details.",
            "Note any phrases you missed and replay them."
          ],
          whyTopPick: "Useful short practice on busy days.",
          freeAccess: "Free Cambridge English activities.",
          ageCheck: "Teen/adult; useful as extra listening work."
        }
      },
      {
        age: "ielts",
        skill: "writing",
        slug: "ielts-writing-american-english-developing-writing",
        title: "American English - Developing Writing",
        description: "A free writing resource for building clearer sentences and paragraphs that support IELTS writing accuracy.",
        link: "https://americanenglish.state.gov/resources/developing-writing",
        format: "site",
        details: {
          type: "Supplementary writing resource",
          teaches: "Sentence control, organization, and clarity",
          howTo: [
            "Use one short task as a warm-up before IELTS Task 1 or Task 2.",
            "Revise one paragraph for linking and grammar accuracy.",
            "Compare the first draft with the improved version."
          ],
          whyTopPick: "Helpful for building clean writing habits outside test mode.",
          freeAccess: "Free American English resource.",
          ageCheck: "Teen/adult; suitable for IELTS preparation."
        }
      },
      {
        age: "ielts",
        skill: "speaking",
        slug: "ielts-speaking-american-english-more-dialogs-everyday-use",
        title: "American English - More Dialogs for Everyday Use",
        description: "Free role-play dialogues that help IELTS learners build fluency, natural phrasing, and response speed in spoken English.",
        link: "https://americanenglish.state.gov/resources/more-dialogs-everyday-use",
        format: "site",
        details: {
          type: "Supplementary speaking resource",
          teaches: "Fluency, natural responses, and everyday phrase control",
          howTo: [
            "Practice one dialogue aloud twice.",
            "Paraphrase one line in your own words.",
            "Add one follow-up answer to extend the turn."
          ],
          whyTopPick: "Useful speaking fluency work beyond direct exam prompts.",
          freeAccess: "Free American English resource.",
          ageCheck: "Teen/adult; suitable for IELTS preparation."
        }
      }
    ],
  };

  if (window.UEAH_RESOURCES_STORE && typeof window.UEAH_RESOURCES_STORE.add === "function") {
    window.UEAH_RESOURCES_STORE.add(DATA);
  }
})();
