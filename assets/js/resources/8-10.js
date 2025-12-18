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
      },

      "8-10/listening": {
        title: "8–10 Listening 🎧🧒✨",
        overview:
          "A listening program for ages 8–10 that builds comprehension and vocabulary through audio stories, read-aloud videos, podcasts, and interactive listening games, with quick discussion after listening.",
        objectives: [
          "Improve listening comprehension and understanding of story structure (beginning/middle/end).",
          "Grow vocabulary in context (stories, science topics, myths).",
          "Build stamina for 10–17 minute listening tasks and respond to follow-up questions.",
          "Practice active listening: pause, predict, explain new words, and summarize."
        ],
        materials: [
          "Device + internet and (optional) a podcast app; headphones recommended for clarity.",
          "Core resources (rotate): Storynory, Storyline Online, Storyberries Radio, Circle Round, Greeking Out, Wow in the World, GamesToLearnEnglish, PBS KIDS podcasts (Odd Squadcast/Arthur/others)."
        ],
        bestSetSlug: "best-set-5-week-listening-plan-for-8-10"
      }
    },

    // Each resource must have unique slug per age+skill (keep globally unique to be safe).
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
            "Open an age-appropriate section (8–10 / 7–10). 🎯",
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
            "Week 1: Oxford Owl (leveled reader) + Unite for Literacy (topic picture book) + British Council Reading Practice (quiz/game). 📘📖🎮",
            "Week 2: Storyline Online (pause for questions) + British Council Reading Practice + one related Oxford Owl book for reinforcement. 🎬⏸️📘",
            "Week 3: English e-Reader (comfortable level) + Oxford Owl (confidence book on similar theme). 📚🎚️",
            "Week 4: FreeKidsBooks + Free Children’s Stories + quick summary/drawing. 📚✍️🎨",
            "Week 5: Storyberries + Monkey Pen + vocabulary game using story words. 🍓🐒🎮",
            "Week 6: Global Storybooks + StoryWeaver + “reading party” share/retell/role-play. 🌍📚🎉"
          ],
          whyTopPick: "Rotation keeps motivation high while still repeating key skills each week. ⭐🔁",
          freeAccess: "Uses free-to-access resources; some require signup/login; some offer downloads/printables. 🆓⚠️",
          ageCheck: "Designed for 8–10 with flexible leveling. 🎯"
        },
        focus: "6-week structure, motivation, comprehension",
        time: "6 weeks (3 sessions/week)",
        level: "independent or caregiver-led"
      },

      // =========================
      // 8–10 LISTENING
      // =========================
      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-storynory",
        title: "Storynory — Free Audio Stories 🎧📖",
        link: "https://www.storynory.com/",
        format: "podcast",
        description:
          "Free audio stories (fairy tales, myths, poems, originals) with text to follow along.",
        details: {
          type: "Audio stories (podcast episodes) 🎧",
          teaches: "Listening comprehension, vocabulary, narrative structure (beginning/middle/end). 🧠📚",
          howTo: [
            "Open Storynory or subscribe in a podcast app. 📱🎧",
            "Pick a category (Fairy Tales / Myths / etc.). 🧩",
            "Listen while following along with the text; pause for 2 questions. 📖⏸️❓"
          ],
          whyTopPick: "High-quality narration and rich story language that builds vocabulary naturally. ⭐",
          freeAccess: "Free to access; no sign-up required. 🆓✅",
          ageCheck: "Works well for 8–10 (choose slightly longer stories for stronger listeners). 🎯"
        },
        focus: "audio stories, vocabulary",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-storyline-online",
        title: "Storyline Online — Read-Aloud Videos 🎬🎧",
        link: "https://storylineonline.net/",
        format: "video",
        description:
          "Read-aloud videos with strong narration and visuals; great for comprehension and follow-up discussion.",
        details: {
          type: "Video read-alouds 📺📖",
          teaches: "Listening comprehension, vocabulary, and story meaning with visual support. 🧠🗣️",
          howTo: [
            "Choose a book and watch/listen 8–12 minutes. ⏱️",
            "Pause 2–3 times: predict what happens next. ⏸️🔮",
            "After: retell in 3 parts (Beginning/Middle/End). 🧩🗣️"
          ],
          whyTopPick: "Very engaging and easy to build a quick discussion routine around. ⭐",
          freeAccess: "Free to access on the official site. 🆓✅",
          ageCheck: "Good for 8–10; use as a weekly ‘story listening’ anchor. 🎯"
        },
        focus: "read-aloud listening, retell",
        time: "10–15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-storyberries-radio",
        title: "Storyberries — Bedtime Radio 🍓🎧",
        link: "https://www.storyberries.com/radio/",
        format: "audio",
        description:
          "Free audiobook-style playlists for kids (great for building listening stamina).",
        details: {
          type: "Audiobook playlists (stories) 🎧📚",
          teaches: "Listening stamina, vocabulary in context, and story comprehension. 🧠📈",
          howTo: [
            "Open the Radio page and choose an age group (e.g., 7–12). 🎯",
            "Play a playlist during quiet time or bedtime. 🌙🎧",
            "After: ask 3 questions (Who? Problem? Ending?). ❓❓❓"
          ],
          whyTopPick: "Great for longer listening and calm routines. ⭐🌙",
          freeAccess: "Free to stream; no login required. 🆓✅",
          ageCheck: "Excellent fit for 8–10 (pick shorter segments if attention is low). 🎯"
        },
        focus: "audiobooks, stamina",
        time: "10–30 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-circle-round",
        title: "Circle Round — Folktale Podcast 🌍🎧",
        link: "https://www.wbur.org/podcasts/circleround",
        format: "podcast",
        description:
          "Folktale podcast episodes (~10–15 minutes) with strong narration and discussion prompts.",
        details: {
          type: "Podcast (audio folktales) 📻",
          teaches: "Comprehension, morals/values, and cultural vocabulary through global folktales. 🧠🌍",
          howTo: [
            "Pick an episode (aim 10–15 minutes). ⏱️",
            "Pause once to clarify 1–2 new words. ⏸️🆕",
            "Use 2 follow-up questions (What lesson? Favorite part?). ❓⭐"
          ],
          whyTopPick: "Professional audio storytelling that keeps kids engaged. ⭐",
          freeAccess: "Free podcast access. 🆓✅",
          ageCheck: "Strong for 8–10; great weekly routine option. 🎯"
        },
        focus: "folktales, moral lessons, vocabulary",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-greeking-out",
        title: "Nat Geo Kids — Greeking Out 🏛️🎙️",
        link: "https://www.nationalgeographic.com/podcasts/greeking-out/",
        format: "podcast",
        description:
          "Greek mythology podcast stories that build listening comprehension and myth-related vocabulary.",
        details: {
          type: "Podcast (mythology stories) 🎙️",
          teaches: "Listening comprehension + narrative vocabulary (heroes, gods, quests). 🧠⚡",
          howTo: [
            "Choose an episode and listen together. 🎧",
            "Pause to explain 1 tricky part (names/events). ⏸️🧩",
            "Summarize: Who was the hero? What was the challenge? ✅"
          ],
          whyTopPick: "High-interest content for 8–10 who like adventure stories. ⭐",
          freeAccess: "Free podcast streaming (platform availability varies). 🆓⚠️",
          ageCheck: "Best for 8–10; preview episode themes if needed. 👀🎯"
        },
        focus: "myths, vocabulary, story structure",
        time: "10–20 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-wow-in-the-world",
        title: "Wow in the World — Science Podcast 🔬🎧",
        link: "https://tinkercast.com/all-podcasts/wow-in-the-world/",
        format: "podcast",
        description:
          "Science and tech podcast for kids; great for topic vocabulary and listening stamina.",
        details: {
          type: "Podcast (science & tech for kids) 🎙️",
          teaches: "Listening comprehension + science vocabulary in context. 🧠🔬",
          howTo: [
            "Pick an episode with an interesting topic. 🎯",
            "Listen 10–17 minutes; pause for 1 new word explanation. ⏸️🆕",
            "Child draws 1 picture and labels 3 key words. 🎨🏷️3️⃣"
          ],
          whyTopPick: "High motivation + rich vocabulary because kids care about the topic. ⭐",
          freeAccess: "Free to stream as a podcast (platform availability varies). 🆓⚠️",
          ageCheck: "Excellent for 8–10; pick shorter segments if needed. 🎯"
        },
        focus: "science listening, vocabulary",
        time: "10–17 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-games-to-learn-english",
        title: "GamesToLearnEnglish — Listening Games 🎮🔊",
        link: "https://www.gamestolearnenglish.com/",
        format: "site",
        description:
          "Interactive listening/matching games (listen and click/drag) with instant feedback.",
        details: {
          type: "Interactive web games (listening + matching) 🎮",
          teaches: "Vocabulary listening accuracy + matching (fast feedback). 👂✅",
          howTo: [
            "Pick a simple listening topic/game. 🎯",
            "Listen and click/drag the matching picture/answer. 👂👉",
            "Do 8 minutes max; repeat the same game later in the week. ⏱️🔁"
          ],
          whyTopPick: "Quick, effective listening practice with immediate correction avoiding guesswork. ⭐",
          freeAccess: "Free to access; site experience can vary by device/browser. 🆓⚠️",
          ageCheck: "Suitable for 8–10; adult support helps with instructions if needed. 🧑‍🏫"
        },
        focus: "listening accuracy, matching",
        time: "5–10 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-pbs-kids-podcasts-page",
        title: "PBS KIDS — Podcasts Hub 🎙️🐾",
        link: "https://pbskids.org/videos/podcasts",
        format: "audio",
        description:
          "A safe hub for kid-friendly podcast-style listening (great for variety).",
        details: {
          type: "Podcast episodes / audio stories 🎧",
          teaches: "Listening comprehension through familiar characters and short narratives. 👂📖",
          howTo: [
            "Pick one short episode (7–15 minutes). ⏱️",
            "Pause once to predict what happens next. ⏸️🔮",
            "After: retell in 3 parts (Begin/Middle/End). 🧩🗣️"
          ],
          whyTopPick: "Kids stay engaged with familiar worlds, making comprehension easier. ⭐",
          freeAccess: "Free to stream on PBS KIDS. 🆓✅",
          ageCheck: "Good for 8–10; choose the most age-appropriate series/episodes. 🎯"
        },
        focus: "podcast listening, retell",
        time: "7–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-pbs-odd-squadcast-playlist",
        title: "PBS KIDS — The Odd Squadcast (playlist) 🕵️🎧",
        link: "https://pbskids.org/videos/playlist/the-odd-squadcast",
        format: "audio",
        description:
          "Mystery/problem-solving audio episodes that encourage active listening for clues and instructions.",
        details: {
          type: "Audio mystery episodes 🎧🧩",
          teaches: "Active listening, inference, following spoken clues, and problem-solving vocabulary. 🧠🕵️",
          howTo: [
            "Play one episode (about 7–10 minutes). ⏱️",
            "Ask: What was the mystery? What clues did you hear? ❓🧩",
            "Replay and listen for 3 specific details. 🔁3️⃣"
          ],
          whyTopPick: "Makes listening active (kids want to solve the mystery). ⭐",
          freeAccess: "Free to stream on PBS KIDS. 🆓✅",
          ageCheck: "Works well for 8–10; great as a weekly ‘fun listening’ session. 🎯"
        },
        focus: "active listening, inference",
        time: "7–12 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-pbs-arthur-podcast",
        title: "PBS KIDS — The Arthur Podcast 🎧📚",
        link: "https://pbskids.org/videos/arthur/the-arthur-podcast",
        format: "audio",
        description:
          "Longer audio story episodes (often 15–17 minutes) that build stamina and narrative understanding.",
        details: {
          type: "Audio story episodes 🎧",
          teaches: "Listening stamina + comprehension of longer narratives and everyday social vocabulary. 🧠💬",
          howTo: [
            "Choose one episode (aim 15–17 minutes). ⏱️",
            "After: child retells 5 key events (bullet list). 📝5️⃣",
            "Optional: act out one short scene to check understanding. 🎭"
          ],
          whyTopPick: "Great for building stamina with familiar, relatable stories. ⭐",
          freeAccess: "Free to stream on PBS KIDS. 🆓✅",
          ageCheck: "Very good for 8–10; use headphones for clarity. 🎧🎯"
        },
        focus: "longer listening, story structure",
        time: "15–17 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-british-council-listen-watch",
        title: "LearnEnglish Kids (British Council) — Listen & Watch 🎶📺",
        link: "https://learnenglishkids.britishcouncil.org/listen-watch",
        format: "site",
        description:
          "Songs, short stories, videos, and worksheets that support vocabulary and listening comprehension for kids.",
        details: {
          type: "Songs + videos + short stories + printables 🎵📺📝",
          teaches: "Listening for key words, grammar patterns, and story meaning in kid-friendly ESL content. 👂🗝️",
          howTo: [
            "Choose a short story video or a song with clear lyrics. 🎯",
            "Listen once for meaning; replay and note 5 key words. 🔁✍️5️⃣",
            "Optional: do one printable follow-up (keep it short). 📝⏱️"
          ],
          whyTopPick: "Safe, curriculum-style ESL listening with lots of ready content. ⭐",
          freeAccess: "Free to access/use on the site. 🆓✅",
          ageCheck: "Great for 8–10 ESL; pick the more challenging stories for older kids. 🎯"
        },
        focus: "ESL listening, vocabulary",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "best-set-5-week-listening-plan-for-8-10",
        title: "Best Set — 5-Week Listening Plan 🎒🗓️🎧",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "A simple 5-week rotation that mixes songs, listening games, story podcasts, and topic podcasts (science/myths) to build comprehension and stamina.",
        bundleItems: [
          "8-10-listening-british-council-listen-watch",
          "8-10-listening-games-to-learn-english",
          "8-10-listening-storynory",
          "8-10-listening-wow-in-the-world",
          "8-10-listening-storyberries-radio",
          "8-10-listening-circle-round",
          "8-10-listening-pbs-arthur-podcast",
          "8-10-listening-greeking-out",
          "8-10-listening-pbs-odd-squadcast-playlist",
          "8-10-listening-storyline-online"
        ],
        details: {
          type: "Recommended 5-week plan 🧺",
          teaches: "Story comprehension + vocabulary growth + listening stamina with active listening routines. 👂🧠📈",
          howTo: [
            "Week 1: LearnEnglish Kids (song/story) + GamesToLearnEnglish (listening game) + Storynory (story + discussion). 🎶🎮📖",
            "Week 2: Wow in the World (science) + Storyberries Radio (longer listening) + PBS KIDS pick (optional). 🔬🎧🐾",
            "Week 3: Circle Round (folktale) + PBS Arthur (stamina) + LearnEnglish Kids (short story + printable). 🌍🎧📺",
            "Week 4: Greeking Out (mythology) + GamesToLearnEnglish (new topic) + Storyline Online (pause + retell). 🏛️🎮🎬",
            "Week 5: Repeat the best 3 activities from Weeks 1–4 and track improvement (fewer pauses, better retell). 🔁✅"
          ],
          whyTopPick: "Balanced mix: stories + topic podcasts + games, with repeat listening for real improvement. ⭐🔁",
          freeAccess: "Uses free resources; podcast/app availability may vary by platform/region. 🆓⚠️",
          ageCheck: "Designed for 8–10; adjust difficulty by choosing easier/harder episodes. 🎯"
        },
        focus: "rotation plan, stamina, comprehension",
        time: "5 weeks",
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
