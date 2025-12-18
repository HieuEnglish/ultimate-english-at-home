/* assets/js/resources/8-10.js
   Age 8–10 resource data pack.
   Do NOT host files in repo — only external links.
*/
(function () {
  const DATA = {
    packs: {
      "8-10/reading": {
        title: "8–10 Reading 📚🧠✨",
        overview:
          "A structured 8–10 reading guide that builds reading confidence through free digital libraries, leveled readers, read-aloud videos, and interactive reading practice, organized into a simple 6-week rotation plan.",
        objectives: [
          "Build vocabulary + comprehension using illustrated stories and follow-up discussion.",
          "Strengthen reading foundations (including phonics/decoding) through leveled readers.",
          "Improve reading comprehension using short stories with quizzes/games.",
          "Develop confidence reading graded texts independently (level choice + optional audio support).",
          "Increase motivation by reading for enjoyment using age-appropriate story sites."
        ],
        materials: [
          "Device with internet (tablet/laptop/phone).",
          "Optional printer (for printable PDFs).",
          "Core sites used in this guide (rotate): StoryWeaver, Unite for Literacy, Oxford Owl, British Council LearnEnglish Kids, English e-Reader, Storyline Online.",
          "Optional story libraries for variety: FreeKidsBooks, Monkey Pen, Global Storybooks, Storyberries."
        ],
        bestSetSlug: "best-set-6-week-rotation-for-8-10-reading"
      }
    },

    resources: [
      // =========================
      // 8–10 READING
      // =========================
      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-storyweaver",
        title: "StoryWeaver — Digital Library 📚🖼️",
        link: "https://storyweaver.org.in/",
        format: "site",
        description:
          "A large digital storybook library with illustrated books, often with audio and printable PDF options.",
        details: {
          type: "Digital storybooks (often printable PDFs) 📖🖨️",
          teaches: "Vocabulary, comprehension, and reading for pleasure through illustrated stories. 🧠📚",
          howTo: [
            "Browse by age/level or search by topic. 🔎",
            "Open a story and click “Read Now”. 📖",
            "Optional: use audio narration or download/print a PDF (if available). 🎧⬇️🖨️"
          ],
          whyTopPick: "Great for reading for enjoyment with lots of choice and strong visuals. ⭐",
          freeAccess: "Free to read online; download/print options vary by title. 🆓⚠️",
          ageCheck: "Strong for 8–10 (especially illustrated stories); choose longer texts for confident readers. 🎯"
        },
        focus: "digital library, comprehension, vocabulary",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-unite-for-literacy",
        title: "Unite for Literacy — Online Picture Books 📚🌟",
        link: "https://www.uniteforliteracy.com/free-books-online/home",
        format: "site",
        description:
          "Illustrated picture books (often narrated) that support vocabulary and content knowledge with simple, readable text.",
        details: {
          type: "Illustrated eBooks (often with audio narration) 🎧📖",
          teaches: "Vocabulary + comprehension using short, clear stories and nonfiction topics. 🧠🗣️",
          howTo: [
            "Browse by Topic (animals, science, community, etc.). 🐾🔬",
            "Read on screen; optional: replay audio and shadow-read key lines. 🎧🔁🗣️",
            "Do 3 quick questions: Who/Where/What happened? (or What did you learn?). ❓❓❓"
          ],
          whyTopPick: "Fast to use and great for building meaning through pictures + short text. ⭐",
          freeAccess: "Free to access; no purchase required. 🆓✅",
          ageCheck: "Some books are easy for 8–10, which is perfect for confidence-building or ESL. 🎯"
        },
        focus: "vocabulary, comprehension, picture support",
        time: "8–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-oxford-owl-free-ebook-library",
        title: "Oxford Owl — FREE eBook Library 🦉📘",
        link: "https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/",
        format: "site",
        description:
          "High-quality leveled readers (including phonics/decodable options) to build foundations and fluency.",
        details: {
          type: "Leveled readers (often with audio) 📚🎚️",
          teaches: "Reading foundations, decoding/phonics options, fluency, and comprehension. 🔤🧠",
          howTo: [
            "Create a free account and log in. 🔐",
            "Filter by age/level and start slightly EASY for confidence. ✅",
            "Read 1 chapter/book section; optional: use audio for echo/shadow reading. 🎧🗣️"
          ],
          whyTopPick: "Reliable leveled progression for skill-building and confidence. ⭐🏗️",
          freeAccess: "Free after signup/login. 🆓🔐",
          ageCheck: "Excellent for 8–10 ESL and mixed ability because you can choose easier or harder levels. 🎯"
        },
        focus: "leveled readers, decoding, fluency",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-british-council-reading-practice",
        title: "LearnEnglish Kids (British Council) — Reading Practice 🇬🇧📖",
        link: "https://learnenglishkids.britishcouncil.org/read-write/reading-practice",
        format: "site",
        description:
          "Short texts with interactive games/quizzes and printables to practice comprehension and vocabulary.",
        details: {
          type: "Short stories + quizzes/games + printables 🧩🎮🖨️",
          teaches: "Reading comprehension + vocabulary through short graded texts. 🧠📚",
          howTo: [
            "Pick a suitable level/story. 🎚️",
            "Read the text once for meaning, then again for details. 🔁",
            "Complete the game/quiz; optional: print the worksheet. 🎮🖨️"
          ],
          whyTopPick: "Built-in practice loop (read → quiz → worksheet) makes progress visible. ⭐📈",
          freeAccess: "Free to access/use; registration is optional for extra site features. 🆓🔓",
          ageCheck: "Very good for 8–10 (upper primary ESL-friendly). 🎯"
        },
        focus: "comprehension practice, quizzes",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-english-e-reader",
        title: "English e-Reader — Graded Readers 📚🎯",
        link: "https://english-e-reader.net/",
        format: "site",
        description:
          "Graded reading library by level (A1–C2). Useful for matching text difficulty to the learner.",
        details: {
          type: "Graded eBooks (levelled by proficiency) 📘📈",
          teaches: "Progressive reading practice: vocabulary, grammar patterns, and fluency at the right level. 🧠🔁",
          howTo: [
            "Choose a level (A1/A2/B1…). 🎚️",
            "Pick a short title and read 1–2 pages per session. 📖",
            "Optional: use audio if available, then re-read aloud for fluency. 🎧🗣️"
          ],
          whyTopPick: "Level choice makes it easy for mixed-ability 8–10 learners to succeed. ⭐",
          freeAccess: "Free to read online; download/audio availability varies by title. 🆓⚠️",
          ageCheck: "Not age-filtered—choose kid-appropriate topics and keep levels comfortable. 👀🎯"
        },
        focus: "graded reading, level matching",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-storyline-online",
        title: "Storyline Online — Video Read-Alouds 🎬📖",
        link: "https://storylineonline.net/",
        format: "video",
        description:
          "High-quality read-aloud videos that support comprehension, vocabulary, and fluency through modeled reading.",
        details: {
          type: "Video read-alouds + optional activity guides 📺📝",
          teaches: "Listening-supported comprehension + vocabulary in story context. 🧠🗣️",
          howTo: [
            "Choose a book and watch 5–10 minutes. ⏱️",
            "Pause 2–3 times for quick meaning checks (Who/Where/Why). ⏸️❓",
            "Optional: use an activity/guide if provided on the page. 📝✅"
          ],
          whyTopPick: "Great for comprehension + motivation, especially for reluctant readers. ⭐",
          freeAccess: "Free to access on the official site. 🆓✅",
          ageCheck: "Some books may feel easy for 10-year-olds—use for fluency practice or quick warm-ups. 🎯"
        },
        focus: "read-aloud support, comprehension",
        time: "8–15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-free-children-stories",
        title: "Free Children’s Stories (Stories for Kids) 📖✨",
        link: "https://www.freechildrenstories.com/",
        format: "site",
        description:
          "Story site with age sections and read/listen options for engaging, kid-friendly reading practice.",
        details: {
          type: "Stories (read online) + some listen options 🎧📖",
          teaches: "Reading for enjoyment, story comprehension, and vocabulary through varied themes. 🧠📚",
          howTo: [
            "Open the 8–10 section (or browse by age). 🎯",
            "Read one story; highlight 5 new words. ✍️5️⃣",
            "Talk about the lesson/message in 2–3 sentences. 💬"
          ],
          whyTopPick: "Simple access to age-targeted stories for motivation and variety. ⭐",
          freeAccess: "Free to access; embedded media options can vary by story/page. 🆓⚠️",
          ageCheck: "Good for 8–10; preview topics and choose longer stories for stronger readers. 👀🎯"
        },
        focus: "reading for pleasure, vocabulary",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-freekidsbooks",
        title: "FreeKidsBooks — Digital Children’s Library 📚🧒",
        link: "https://freekidsbooks.org/",
        format: "site",
        description:
          "Downloadable and online children’s books (fiction and nonfiction) with categories by age and topic.",
        details: {
          type: "Digital library (read online / download) 📖⬇️",
          teaches: "General literacy, comprehension, and topic vocabulary (STEM/values/fiction). 🌍🔬",
          howTo: [
            "Browse by Age and choose a book that matches interest. 🎯",
            "Read online or download/print if needed. 📖⬇️🖨️",
            "Do a quick summary: 3 sentences (Beginning/Middle/End). 🧩📝"
          ],
          whyTopPick: "Good variety of story types and topics for building motivation. ⭐",
          freeAccess: "Free to access; download formats/options vary by book. 🆓⚠️",
          ageCheck: "Pick age-appropriate books; some texts may be longer or shorter than expected. 👀🎯"
        },
        focus: "library variety, interest-based reading",
        time: "10–25 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-monkey-pen",
        title: "Monkey Pen — Free Stories for Kids 🐒📖",
        link: "https://monkeypen.com/pages/free-stories-for-kids",
        format: "site",
        description:
          "A curated page of free storybooks, often as easy-to-open PDFs with strong illustrations.",
        details: {
          type: "Storybooks (often PDF) 📄📖",
          teaches: "Reading for enjoyment + comprehension through illustrated narratives. 🧠📚",
          howTo: [
            "Choose one free title and open the PDF. 📄",
            "Read 2–4 pages per session (don’t rush). ⏱️",
            "Ask 3 questions: Who? What happened? What’s the lesson? ❓❓❓"
          ],
          whyTopPick: "PDF format is convenient for classroom/projector or printing. ⭐🖨️",
          freeAccess: "Free titles listed on the page; access can vary by item. 🆓⚠️",
          ageCheck: "Good for 8–10; pick slightly longer books for stronger readers. 🎯"
        },
        focus: "illustrated stories, comprehension talk",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-global-storybooks",
        title: "Global Storybooks — Multilingual Stories 🌍📘",
        link: "https://globalstorybooks.net/",
        format: "site",
        description:
          "A multilingual story platform where learners can compare English with another language to support meaning.",
        details: {
          type: "Multilingual story library (often with download/audio options) 📚🗣️",
          teaches: "Comprehension support via bilingual reading and cross-language checking. 🌐🧠",
          howTo: [
            "Pick a story and read in English first. 🇬🇧📖",
            "Check a second language to confirm meaning (optional). 🌍✅",
            "Retell the story in 4 sentences (First/Then/Then/Finally). 🗣️🧩"
          ],
          whyTopPick: "Helpful for ESL learners who benefit from meaning checks. ⭐",
          freeAccess: "Free to access; features vary by story/collection. 🆓⚠️",
          ageCheck: "Very suitable for 8–10; choose age-appropriate collections and keep it simple. 🎯"
        },
        focus: "bilingual support, retelling",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-storyberries",
        title: "Storyberries — Online Storybooks 🍓📖",
        link: "https://www.storyberries.com/",
        format: "site",
        description:
          "Story site with themed collections and some audio options—useful for reading for pleasure and repeat reading.",
        details: {
          type: "Online stories (some with audio) 📖🎧",
          teaches: "Reading for pleasure, vocabulary growth, and fluency through repeat reading. 📚🔁",
          howTo: [
            "Choose an age/theme collection (e.g., 7–12). 🎯",
            "Read one short story; re-read it aloud the next day. 🗣️🔁",
            "Pick 5 words/phrases to reuse in a sentence. ✍️5️⃣"
          ],
          whyTopPick: "Great for motivation and quick, repeatable reading practice. ⭐",
          freeAccess: "Free to read online; audio/video availability varies by story. 🆓⚠️",
          ageCheck: "Good for 8–10; choose slightly longer stories for stronger readers. 🎯"
        },
        focus: "reading for pleasure, fluency",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "best-set-6-week-rotation-for-8-10-reading",
        title: "Best Set — 6-Week ESL Reading Rotation 🗓️📚✨",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "A simple 6-week rotation combining leveled readers, story libraries, read-aloud video support, and interactive comprehension practice.",
        bundleItems: [
          "8-10-reading-oxford-owl-free-ebook-library",
          "8-10-reading-unite-for-literacy",
          "8-10-reading-british-council-reading-practice",
          "8-10-reading-storyline-online",
          "8-10-reading-english-e-reader",
          "8-10-reading-freekidsbooks",
          "8-10-reading-free-children-stories",
          "8-10-reading-storyberries",
          "8-10-reading-monkey-pen",
          "8-10-reading-global-storybooks",
          "8-10-reading-storyweaver"
        ],
        details: {
          type: "Recommended 6-week plan 🧺",
          teaches: "Vocabulary, comprehension, decoding support, fluency, and reading motivation. 🧠📚",
          howTo: [
            "Week 1 (Foundations): Oxford Owl (leveled reader) + Unite for Literacy (topic picture book) + British Council Reading Practice (short quiz/game). 📘📖🎮",
            "Week 2 (Video + comprehension): Storyline Online (pause for questions) + British Council Reading Practice + one related/easier Oxford Owl book for reinforcement. 🎬⏸️📘",
            "Week 3 (Leveled reading): English e-Reader (choose a comfortable level) + Oxford Owl (confidence book on similar theme). 📚🎚️",
            "Week 4 (Free libraries): FreeKidsBooks (age-appropriate pick) + Free Children’s Stories (read/listen) + quick summary/drawing. 📚✍️🎨",
            "Week 5 (Review + fun): Storyberries (two short stories) + Monkey Pen (one PDF story) + vocabulary game using story words. 🍓🐒🎮",
            "Week 6 (Showcase): Global Storybooks (bilingual support) + StoryWeaver (choice reading) + “Reading party” share/retell/role-play. 🌍📚🎉"
          ],
          whyTopPick: "Rotation keeps motivation high while still repeating key skills each week. ⭐🔁",
          freeAccess: "Uses free-to-access resources; some require signup/login; some offer downloads/printables. 🆓⚠️",
          ageCheck: "Designed for 8–10 with flexible leveling (choose easier texts for ESL confidence). 🎯"
        },
        focus: "6-week structure, motivation, comprehension",
        time: "6 weeks (3 sessions/week)",
        level: "independent or caregiver-led"
      }
    ]
  };

  // Register into the global store (router lazy-loads this file)
  if (window.UEAH_RESOURCES_STORE && typeof window.UEAH_RESOURCES_STORE.add === "function") {
    window.UEAH_RESOURCES_STORE.add(DATA);
  } else {
    window.UEAH_RESOURCES_DATA_FALLBACK = DATA;
  }
})();
