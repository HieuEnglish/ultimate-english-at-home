/* assets/js/resources/8-10.js
   Age 8–10 resource data pack.
   Do NOT host files in repo — only external links.
*/
(function () {
  const DATA = {
    packs: {
      "8-10/reading": {
        title: "8–10 Reading 📚✨",
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
          "Optional story libraries for extra variety: FreeKidsBooks, Monkey Pen, Global Storybooks, Storyberries."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-8-10-reading"
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
        bestSetSlug: "best-set-recommended-bundle-for-8-10-listening"
      },

      "8-10/writing": {
        title: "8–10 Writing ✍️🧒📚✨",
        overview:
          "This guide supports 8–10 writing development by combining printable worksheets, interactive story prompts/games, creative story-building tools, and grammar + feedback platforms into a simple weekly routine.",
        objectives: [
          "Strengthen handwriting, spelling, and vocabulary through printable tasks.",
          "Build creative writing (ideas, sequencing, linking sentences) using story dice and prompt generators."
        ],
        materials: [
          "Pencil/pen + notebook (or writing paper), plus optional colouring pencils for planning/illustration.",
          "Printer (helpful for worksheets), or write answers into a notebook instead.",
          "Device with internet for: British Council worksheets, story dice/prompt tools, sentence-builder grammar games.",
          "Optional accounts (for feedback/tracking): Cambridge Write & Improve and Quill."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-8-10-writing"
      },

      "8-10/speaking": {
        title: "8–10 Speaking 🗣️✨",
        overview:
          "A short, repeatable weekly speaking routine for 8–10 year-old ESL learners. It builds pronunciation, clarity, confidence, and longer speaking turns using kid-friendly speaking games, short videos, storytelling prompts, and one “performance” task each week.",
        objectives: [
          "Improve pronunciation + clear sounds through guided practice and repetition.",
          "Build speech rhythm and clarity with short tongue twister routines.",
          "Develop speaking fluency by describing, retelling, and sharing opinions in short, structured tasks.",
          "Increase confidence with weekly output (joke performance / mini-speech / recorded speaking)."
        ],
        materials: [
          "Device with internet (tablet/laptop/phone).",
          "Optional headphones for clearer model audio.",
          "Optional: simple notebook for speaking notes (5-bullet plan), plus a timer.",
          "Core sites/apps used in this guide (rotate): LearnEnglish Kids Speak & Spell, Tongue Twisters, Jokes, Video Zone, Story Maker 1/2, LearnEnglish Sounds Right (app), Cambridge activities, NeoK12 public speaking.",
          "Optional extras: ChatterPix Kids app, Conversation Starters PDF, ELT Buzz story generator, English Heritage story dice, British Council drama games (offline)."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-8-10-speaking"
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
        title: "StoryWeaver (Digital Library) 📚🖼️",
        link: "https://storyweaver.org.in/",
        format: "site",
        description:
          "Free illustrated storybooks with optional audio and printable PDF downloads; great for vocabulary and comprehension.",
        details: {
          type: "Digital library (storybooks + printable PDFs) 📖🖨️",
          teaches:
            "Rich vocabulary, comprehension, and cultural awareness through illustrated stories. 🌍🧠",
          howTo: [
            "Browse by age/level or search a topic. 🔎",
            "Open a story and click “Read”. 📖",
            "Optional: use audio narration or download/print PDF. 🎧⬇️🖨️",
            "Do a 2-minute talk: Who? Where? What happened? ❓❓❓"
          ],
          whyTopPick:
            "Huge free library with audio + print options and strong story variety. ⭐",
          freeAccess: "Free to read; many books are downloadable/printable. 🆓✅",
          ageCheck:
            "Strong fit for 8–10 (use filters like 7–8 / 9–10 to match level). 🎯"
        },
        focus: "illustrated stories, vocabulary, comprehension",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-unite-for-literacy",
        title: "Unite for Literacy (Online Picture Books) 📚🌟",
        link: "https://www.uniteforliteracy.com/free-books-online/home",
        format: "site",
        description:
          "Free illustrated books with narration and language options; excellent for comprehension + confidence.",
        details: {
          type: "Illustrated eBooks with audio narration 🎧📖",
          teaches:
            "Basic reading skills, vocabulary, and content knowledge via simple stories. 🗣️📚",
          howTo: [
            "Browse by Topic (animals, nature, community). 🐾🌿🏙️",
            "Read once silently, then replay with narration if helpful. 📖🎧",
            "Pick 5 words to explain/act out. 🗝️🗣️",
            "Re-read the same book 2–3 times that week. 🔁"
          ],
          whyTopPick:
            "No login, easy navigation, and strong audio support for ESL readers. ⭐",
          freeAccess: "Free access; no login required. 🆓✅",
          ageCheck:
            "Made for younger readers, but many topics still work well for 8–10. 🎯"
        },
        focus: "audio-supported reading, confidence",
        time: "8–15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-oxford-owl-free-ebook-library",
        title: "Oxford Owl (OUP eBook Library) 🦉📘",
        link: "https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/",
        format: "site",
        description:
          "High-quality leveled readers and phonics-linked books from Oxford University Press (free after signup).",
        details: {
          type: "Leveled eBook library (OUP) 📚📈",
          teaches:
            "Decodable phonics stories, fiction/nonfiction, comprehension support. 🔤🧠",
          howTo: [
            "Create a free parent account and log in. 🔐",
            "Filter by age/level and pick an achievable book. 🎯",
            "Read a short section, then do a quick summary (1–2 sentences). 📝",
            "Optional: use audio if available, then re-read independently. 🎧➡️📖"
          ],
          whyTopPick:
            "Trusted school-style leveled readers with clear progression. ⭐",
          freeAccess: "Free library access after signup/login. 🆓🔐",
          ageCheck: "Good for 8–10 (use level filters to match ability). 🎯"
        },
        focus: "leveled readers, decoding, progression",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-british-council-reading-practice",
        title: "British Council — LearnEnglish Kids: Reading Practice 🇬🇧📖",
        link: "https://learnenglishkids.britishcouncil.org/read-write/reading-practice",
        format: "site",
        description:
          "Short readings with games/quizzes and printables to boost comprehension and vocabulary.",
        details: {
          type: "Interactive reading texts + games + printables 🎮🖨️",
          teaches: "Reading comprehension and vocabulary through graded tasks. 🧠📚",
          howTo: [
            "Choose a Level 1–3 reading. 🎚️",
            "Read the text online. 📖",
            "Play the comprehension game/quiz. 🎮✅",
            "Optional: print 1 worksheet for extra practice. 🖨️"
          ],
          whyTopPick:
            "Professional ESL tasks that combine reading + immediate practice. ⭐",
          freeAccess:
            "Free to use; registration only needed for posting comments. 🆓🔓",
          ageCheck: "Excellent fit for 8–10 and upper-primary ESL. 🎯"
        },
        focus: "comprehension practice, quizzes",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-storyline-online",
        title: "Storyline Online (Video Read-Alouds) 🎬📖",
        link: "https://storylineonline.net/",
        format: "video",
        description:
          "High-quality read-aloud videos with optional activity guides; great for vocabulary and story understanding.",
        details: {
          type: "Read-aloud videos + activity guides 📺⬇️",
          teaches:
            "Listening-to-reading support, fluency modelling, vocabulary in context. 🎧🗣️📚",
          howTo: [
            "Watch 5–10 minutes of a story video. 🎥⏱️",
            "Pause 2–3 times for: Who? Where? What happened? ⏸️❓",
            "Replay key parts and repeat tricky sentences (shadow reading). 🗣️🔁",
            "Optional: use the downloadable activity guide. 📄✅"
          ],
          whyTopPick:
            "Very engaging read-alouds with strong narration and classroom-friendly extras. ⭐",
          freeAccess: "Free to stream on the official site. 🆓✅",
          ageCheck:
            "Many books suit 8–10 (some may feel easy—use as fluency/vocab support). 🎯"
        },
        focus: "fluency model, story comprehension",
        time: "8–15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-english-e-reader",
        title: "English e-Reader (Graded Readers) 📚🎯",
        link: "https://english-e-reader.net/",
        format: "site",
        description:
          "Large library of graded readers by CEFR level (often with downloads and audio).",
        details: {
          type: "Graded readers library (A1–C2) 📘📈",
          teaches:
            "Progressive reading practice with level control (vocab/grammar in context). 🎚️🧠",
          howTo: [
            "Choose a level (A1/A2 for easier; B1 for stronger readers). 🎚️",
            "Pick a short title and read 1–2 pages/day. 📖",
            "Optional: use audio if available, then re-read silently. 🎧➡️📖",
            "Write a 2-sentence summary. 📝2️⃣"
          ],
          whyTopPick:
            "Level choice makes it easy to match mixed abilities. ⭐",
          freeAccess: "Free to read online; downloads/audio vary by title. 🆓⚠️",
          ageCheck:
            "Not age-labeled—choose titles with kid-appropriate themes. 👀🎯"
        },
        focus: "graded levels, independent reading",
        time: "10–20 min",
        level: "independent"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-freechildrenstories",
        title: "Free Children’s Stories (Age 8–10 section) 📖✨",
        link: "https://www.freechildrenstories.com/",
        format: "site",
        description:
          "Original and classic stories organized by age, often with audio/podcast links.",
        details: {
          type: "Story site (read + listen options) 🎧📘",
          teaches:
            "Reading for enjoyment + vocabulary growth through varied story themes. 🧠📚",
          howTo: [
            "Find the Age 8–10 category on the site. 🎯",
            "Pick one story and read it in two sittings. ⏱️",
            "Underline 5 new words and explain them. ✍️🗝️",
            "Optional: listen to the narration/podcast version. 🎧"
          ],
          whyTopPick: "Age categories make it easy for kids to choose. ⭐",
          freeAccess: "Free to access; media links may vary by story. 🆓⚠️",
          ageCheck: "Use the 8–10 section for best match. ✅"
        },
        focus: "reading for fun, vocabulary",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-freekidsbooks",
        title: "FreeKidsBooks.org (Digital Children’s Library) 📚🧒",
        link: "https://www.freekidsbooks.org/",
        format: "site",
        description:
          "Large collection of free children’s books (read online or download).",
        details: {
          type: "Digital library (online + PDF/EPUB downloads) 📖⬇️",
          teaches:
            "General literacy and content knowledge via fiction/nonfiction books. 📚🧠",
          howTo: [
            "Browse by Age (e.g., 6–9 / 8–10) or Subject. 🎯",
            "Open a book to read online or download for offline. 📖⬇️",
            "Read 10–15 minutes. ⏱️",
            "Do a quick ‘beginning/middle/end’ retell. 🧩"
          ],
          whyTopPick:
            "Big variety of genres and formats for different interests. ⭐",
          freeAccess: "Free to read/download (site experience varies). 🆓⚠️",
          ageCheck: "Choose age categories to keep it appropriate. 🎯"
        },
        focus: "variety library, downloads",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-monkeypen-free-stories",
        title: "Monkey Pen (Free Stories for Kids) 🐒📖",
        link: "https://monkeypen.com/pages/free-stories-for-kids",
        format: "site",
        description:
          "Free illustrated PDF storybooks; easy to open and read with minimal setup.",
        details: {
          type: "PDF storybooks 📄📚",
          teaches:
            "Reading practice with picture support + simple story structure. 🖼️🧠",
          howTo: [
            "Open the Free Stories page and pick a title. 🎯",
            "Read the PDF on screen (or print if you want). 💻🖨️",
            "Choose 3 ‘good sentences’ and copy them neatly. ✍️3️⃣",
            "Retell the story in 4 sentences. 📝4️⃣"
          ],
          whyTopPick:
            "Low friction: click → PDF opens → start reading. ⭐",
          freeAccess: "Free titles available on the site. 🆓✅",
          ageCheck:
            "Works for 8–10 (choose picture-rich stories for lower readers). 🎯"
        },
        focus: "pdf stories, easy access",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-globalstorybooks",
        title: "Global Storybooks (Multilingual Stories) 🌍📘",
        link: "https://globalstorybooks.net/",
        format: "site",
        description:
          "Multilingual story collections that can support ESL bridging and comprehension checking.",
        details: {
          type: "Multilingual story library 📚🌐",
          teaches:
            "Reading comprehension and cross-language support (toggle languages). 🌍🧠",
          howTo: [
            "Pick a story and read in English first. 📖🇬🇧",
            "Check meaning using the second language if available. 🌐✅",
            "Pick 6 useful words and make sentences. 📝6️⃣",
            "Repeat the same story later in the week for fluency. 🔁"
          ],
          whyTopPick:
            "Language toggles can reduce frustration and support understanding. ⭐",
          freeAccess: "Free to access; downloadable options vary by collection. 🆓⚠️",
          ageCheck: "Good for 8–10; choose stories with age-appropriate topics. 🎯"
        },
        focus: "bilingual support, comprehension",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-storyberries",
        title: "Storyberries (Online Storybooks) 🍓📖",
        link: "https://www.storyberries.com/",
        format: "site",
        description:
          "Free stories with many themes; some include audio and discussion guides.",
        details: {
          type: "Story site (read + some audio) 📖🎧",
          teaches:
            "Reading for pleasure, vocabulary, and theme-based comprehension. 🧠📚",
          howTo: [
            "Choose Ages 7–12 or a theme. 🎯",
            "Read one story and note 5 new words. 🗝️5️⃣",
            "Optional: use the audio button when available. 🎧",
            "Answer: What was the problem? How was it solved? ❓✅"
          ],
          whyTopPick:
            "Lots of engaging stories and themes that keep motivation high. ⭐",
          freeAccess: "Free to read; some extras may be optional. 🆓✅",
          ageCheck: "Ages 7–12 section fits 8–10 well. ✅"
        },
        focus: "reading for enjoyment, themes",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-readworks",
        title: "ReadWorks — Free Reading Passages 📚🧠",
        link: "https://www.readworks.org/",
        format: "site",
        description:
          "Huge library of free, high-quality reading comprehension passages with questions and vocabulary support.",
        details: {
          type: "Reading passages + comprehension questions 📝🧠",
          teaches: "Deep reading comprehension, vocabulary, and answering text-based questions. 📖✅",
          howTo: [
            "Create a free parent/student account. 🔐",
            "Pick a passage based on interest or grade level. 🎯",
            "Read the text closely and complete the 5-7 questions that follow. 📝",
            "Review answers together to discuss meaning. 🗣️🤝"
          ],
          whyTopPick: "Extensive, highly educational content used in classrooms worldwide. ⭐🏫",
          freeAccess: "Free to use (requires account creation). 🆓🔐",
          ageCheck: "Excellent for ages 8-10 to build rigorous reading skills. 🧒"
        },
        focus: "reading comprehension, text analysis",
        time: "15-20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-news-in-levels",
        title: "News in Levels — Leveled News Articles 📰🎚️",
        link: "https://www.newsinlevels.com/",
        format: "site",
        description:
          "Real news rewritten at three difficulty levels with audio support; great for building reading confidence with current topics.",
        details: {
          type: "Leveled news articles + audio 📰🎧",
          teaches:
            "Reading comprehension, vocabulary in context, and real-world knowledge. 🧠🌍",
          howTo: [
            "Pick a news story and start at Level 1. 🎚️",
            "Read once, then listen with audio support. 📖🎧",
            "Try Level 2 if Level 1 feels easy. 📈",
            "Write 3 new words + meanings. ✍️3️⃣"
          ],
          whyTopPick: "Real news simplified for learners with clear level progression. ⭐",
          freeAccess: "Free to access (ads may appear). 🆓⚠️",
          ageCheck: "Good for 8–10; preview topics for age-appropriateness. 🎯"
        },
        focus: "leveled reading, current events",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-commonlit",
        title: "CommonLit — Free Reading Passages & Activities 📚🧠",
        link: "https://www.commonlit.org/",
        format: "site",
        description:
          "High-quality reading passages with guided questions, annotations, and vocabulary support for building comprehension skills.",
        details: {
          type: "Reading passages + comprehension questions 📝🧠",
          teaches:
            "Close reading, inference, main idea, and vocabulary in context. 📖✅",
          howTo: [
            "Filter by grade level and interest topic. 🎯🔎",
            "Read the passage and highlight key information. ✨📖",
            "Answer the guided questions using text evidence. ✅📝",
            "Discuss 1 opinion question with a parent. 🗣️💬"
          ],
          whyTopPick: "Professional-quality texts with built-in comprehension scaffolding. ⭐",
          freeAccess: "Many texts free; full features may require educator account. 🆓🔐",
          ageCheck: "Excellent for 8–10 with teacher/parent guidance. 🎯"
        },
        focus: "close reading, text analysis",
        time: "15–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-readtheory",
        title: "ReadTheory — Adaptive Reading Quizzes 📈📖",
        link: "https://readtheory.org/",
        format: "site",
        description:
          "Adaptive reading comprehension platform that adjusts difficulty based on performance; tracks progress over time.",
        details: {
          type: "Adaptive reading quizzes + progress tracking 📈✅",
          teaches:
            "Reading comprehension, inference, and vocabulary with personalized difficulty. 🧠📚",
          howTo: [
            "Create a free student account. 🆓👤",
            "Complete 1–2 short passages per session. 📖⏱️",
            "Review wrong answers to understand mistakes. 🔎❌➡️✅",
            "Check your level progress weekly. 📈📅"
          ],
          whyTopPick: "Self-adjusting difficulty keeps practice productive and motivating. ⭐📈",
          freeAccess: "Free access with account. 🆓✅",
          ageCheck: "Great for 8–10; supports independent practice. 🎯"
        },
        focus: "adaptive practice, comprehension",
        time: "10–15 min",
        level: "independent"
      },

      {
        age: "8-10",
        skill: "reading",
        slug: "best-set-recommended-bundle-for-8-10-reading",
        title: "Best Set — 6-Week ESL Reading Plan 🗓️📚✨",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "A simple 6-week rotation using a mix of leveled readers, story libraries, and interactive practice to build vocabulary, comprehension, and confidence.",
        bundleItems: [
          "8-10-reading-oxford-owl-free-ebook-library",
          "8-10-reading-unite-for-literacy",
          "8-10-reading-british-council-reading-practice",
          "8-10-reading-storyline-online",
          "8-10-reading-english-e-reader",
          "8-10-reading-freekidsbooks",
          "8-10-reading-freechildrenstories",
          "8-10-reading-storyberries",
          "8-10-reading-monkeypen-free-stories",
          "8-10-reading-globalstorybooks",
          "8-10-reading-storyweaver"
        ],
        details: {
          type: "Recommended rotation plan 🧭",
          teaches:
            "Vocabulary + comprehension + decoding support through varied, repeatable reading practice. 🔤🧠📚",
          howTo: [
            "Week 1 (Foundations): Oxford Owl + Unite for Literacy (2 reads + 1 short quiz on British Council). 📘📖✅",
            "Week 2 (Video + Comprehension): Storyline Online + British Council Reading Practice. 🎬🇬🇧",
            "Week 3 (Leveled Readers): English e-Reader + Oxford Owl (match themes, adjust level). 🎚️📘",
            "Week 4 (Free Story Sites): FreeKidsBooks + FreeChildrenStories (end with 4-sentence summary). ✍️4️⃣",
            "Week 5 (Fun + Review): Storyberries + Monkey Pen (add a vocab game or mini-quiz). 🎮🗝️",
            "Week 6 (Project/Showcase): Global Storybooks + StoryWeaver (retell/role-play favorite scenes). 🎭"
          ],
          whyTopPick:
            "Rotation prevents boredom while still repeating key skills each week. ⭐🔁",
          freeAccess:
            "Uses free resources; some require signup (Oxford Owl) and some offer optional downloads. 🆓⚠️",
          ageCheck:
            "Designed for 8–10; choose levels that feel achievable to keep confidence high. 🎯🙂"
        },
        focus: "6-week plan, balanced reading sources",
        time: "3 sessions/week (10–20 min each)",
        level: "caregiver-led or independent"
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
        format: "audio",
        description:
          "Free narrated audio stories (fairy tales, myths, poems) often with text to follow along.",
        details: {
          type: "Audio stories (podcast-style) 🎙️",
          teaches:
            "Listening comprehension, vocabulary, and narrative structure. 🧠🗣️",
          howTo: [
            "Pick a category (Fairy Tales / Myths). 🧚‍♂️🏛️",
            "Listen 10–15 minutes while following the text if helpful. 🎧📄",
            "Pause once to predict what happens next. ⏸️🔮",
            "After: beginning/middle/end retell in 3 sentences. 🧩3️⃣"
          ],
          whyTopPick:
            "High-quality narration with rich language and kid-friendly topics. ⭐",
          freeAccess: "Free to access; no sign-up required. 🆓✅",
          ageCheck: "Good for 8–10 (choose shorter stories for lower listeners). 🎯"
        },
        focus: "audio stories, narrative structure",
        time: "10–15 min",
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
          "Read-aloud videos that support listening comprehension, vocabulary, and fluency modelling.",
        details: {
          type: "Video read-alouds (audio + visuals) 📺",
          teaches:
            "Listening + story comprehension; supports fluency through modelling. 👂📚",
          howTo: [
            "Choose a story and watch 8–12 minutes. 🎥⏱️",
            "Use subtitles when helpful. 🔤",
            "Stop 2 times: explain 1 new word; predict the next event. ⏸️🗝️🔮",
            "Do 3 quick questions: Who? Where? What happened? ❓❓❓"
          ],
          whyTopPick: "Very engaging and easy to run as a routine. ⭐",
          freeAccess: "Free to stream. 🆓✅",
          ageCheck: "Good for 8–10 (some titles are easier—use for fluency). 🎯"
        },
        focus: "listening + comprehension pauses",
        time: "10–15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-storyberries-radio",
        title: "Storyberries Radio (Audiobook Playlists) 📚🎧",
        link: "https://storyberries.com/radio",
        format: "audio",
        description:
          "Audiobook playlists for kids (great for longer listening and bedtime routines).",
        details: {
          type: "Audiobook playlists 🎧",
          teaches:
            "Listening stamina, vocabulary in context, and story understanding. 🧠📚",
          howTo: [
            "Choose Ages 7–12 playlist. 🎯",
            "Listen 10–20 minutes (or longer during quiet time). ⏱️",
            "After: name 3 events from the story. 🧩3️⃣",
            "Repeat the same playlist later in the week. 🔁"
          ],
          whyTopPick:
            "Great for building listening stamina with calm, story-based audio. ⭐",
          freeAccess: "Free to stream (no login required). 🆓✅",
          ageCheck: "Ages 7–12 playlists fit 8–10 well. ✅"
        },
        focus: "stamina, audio stories",
        time: "10–20+ min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-circle-round",
        title: "Circle Round (Folktale Podcast) 🌍🎧",
        link: "https://www.wbur.org/podcasts/circleround",
        format: "podcast",
        description:
          "Folktales from around the world (short episodes) with built-in discussion starters.",
        details: {
          type: "Podcast episodes (folktales) 🎙️",
          teaches:
            "Listening comprehension + morals/themes + cultural vocabulary. 🌍🧠",
          howTo: [
            "Pick a 10–15 minute episode. ⏱️",
            "Pause once to explain a new culture word. ⏸️🗝️",
            "After: What lesson did the story teach? 🧠✅",
            "Optional: use the discussion questions if provided. ❓"
          ],
          whyTopPick:
            "Professional production keeps kids engaged while hearing fluent English. ⭐",
          freeAccess: "Free (podcast). 🆓✅",
          ageCheck: "Ideal for 8–10 for full engagement. 🎯"
        },
        focus: "folktales, themes, discussion",
        time: "10–15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-greeking-out",
        title: "NatGeo Kids — Greeking Out (Myth Podcast) 🏛️🎧",
        link: "https://www.nationalgeographic.com/podcasts/greeking-out/",
        format: "podcast",
        description:
          "Greek mythology stories for kids; great for adventurous listening and new vocabulary.",
        details: {
          type: "Podcast (myth stories) 🎙️",
          teaches:
            "Listening comprehension and myth vocabulary (gods, heroes, quests). 🗣️🏛️",
          howTo: [
            "Choose an episode and listen together. 🎧",
            "Pause when needed to explain a tricky word. ⏸️🗝️",
            "After: name 2 characters and the main problem. 👤👤❓",
            "Optional: draw a scene from the story. 🎨"
          ],
          whyTopPick: "High-interest topics keep motivation strong. ⭐",
          freeAccess: "Free to stream as a podcast. 🆓✅",
          ageCheck: "Best for 8–10 (especially confident listeners). 🎯"
        },
        focus: "myths, rich vocabulary",
        time: "10–20 min",
        level: "caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-wow-in-the-world",
        title: "Wow in the World (Science Podcast) 🔬🎧",
        link: "https://tinkercast.com/podcasts/wow-in-the-world/",
        format: "podcast",
        description:
          "Science and tech podcast for kids with humor and sound effects; strong for vocabulary and curiosity.",
        details: {
          type: "Podcast (science topics) 🎙️",
          teaches:
            "Listening + science vocabulary + explaining ideas in simple language. 🧠🔬🗣️",
          howTo: [
            "Pick a topic episode (space/animals/body). 🪐🐾🧠",
            "Listen 10–17 minutes with headphones. 🎧",
            "Pause to define 2 new science words. ⏸️🗝️2️⃣",
            "After: child explains the topic in 3 sentences. 📝3️⃣"
          ],
          whyTopPick:
            "Highly engaging format makes longer listening feel easier. ⭐",
          freeAccess: "Free (podcast platforms; site access may vary). 🆓⚠️",
          ageCheck: "Great fit for 8–10. ✅"
        },
        focus: "science listening, new vocabulary",
        time: "10–17 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-gamestolearnenglish",
        title: "GamesToLearnEnglish — Listening Games 🎮🔊",
        link: "https://www.gamestolearnenglish.com/",
        format: "game",
        description:
          "Interactive listening-and-matching games (listen then click/drag) with immediate feedback.",
        details: {
          type: "Interactive web games 🎮",
          teaches:
            "Listening for words/phrases + matching accuracy and speed. 👂✅",
          howTo: [
            "Choose a topic (food/animals/weather). 🐶🍎🌦️",
            "Play 5–8 minutes (headphones help). 🎧⏱️",
            "Say answers out loud before clicking. 🗣️🖱️",
            "Repeat the same topic 2–3 times that week. 🔁"
          ],
          whyTopPick:
            "Fast, high-repetition listening practice with instant correction. ⭐",
          freeAccess: "Free to access; web experience can vary. 🆓⚠️",
          ageCheck: "Suitable for 8–10; adult help for instructions if needed. 👀"
        },
        focus: "listening + matching",
        time: "5–8 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-pbs-odd-squadcast",
        title: "PBS KIDS — The Odd Squadcast 🕵️🎧",
        link: "https://pbskids.org/videos/playlist/the-odd-squadcast",
        format: "audio",
        description:
          "Mystery-style audio episodes that encourage active listening and problem solving.",
        details: {
          type: "Audio episodes (mystery) 🎧",
          teaches:
            "Listening for clues, following instructions, and story details. 🧠🗣️",
          howTo: [
            "Play one episode (7–10 minutes). ⏱️",
            "Pause once: What clue did we hear? ⏸️🕵️",
            "After: summarize the solution in 2 sentences. 📝2️⃣"
          ],
          whyTopPick:
            "Turns listening into a game—great for attention and engagement. ⭐",
          freeAccess: "Free to stream on PBS KIDS. 🆓✅",
          ageCheck: "Works well for 8–10 (especially kids who like mysteries). 🎯"
        },
        focus: "active listening, story details",
        time: "7–10 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-pbs-arthur-podcast",
        title: "PBS KIDS — The Arthur Podcast 🎧📚",
        link: "https://pbskids.org/videos/arthur/the-arthur-podcast",
        format: "audio",
        description:
          "Longer story episodes (about 15–17 minutes) that build listening stamina and narrative comprehension.",
        details: {
          type: "Audio story episodes 🎧",
          teaches:
            "Listening stamina, narrative structure, and social vocabulary. 🧠🗣️",
          howTo: [
            "Play 15–17 minutes (or split into 2 parts). ⏱️",
            "After: identify beginning/middle/end. 🧩",
            "Retell using 5 key words from the episode. 🗝️5️⃣"
          ],
          whyTopPick:
            "Longer episodes are perfect for building stamina and story tracking. ⭐",
          freeAccess: "Free to stream on PBS KIDS. 🆓✅",
          ageCheck: "Good fit for 8–10. ✅"
        },
        focus: "stamina, narrative comprehension",
        time: "15–17 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-british-council-listen-watch",
        title: "British Council — LearnEnglish Kids: Listen & Watch 🎶📺🇬🇧",
        link: "https://learnenglishkids.britishcouncil.org/listen-watch",
        format: "site",
        description:
          "Songs, videos, and short stories designed for ESL listening with optional follow-up activities.",
        details: {
          type: "Songs + short videos + activities 🎵📺📝",
          teaches:
            "Vocabulary, grammar patterns, and listening comprehension through media. 👂🧠",
          howTo: [
            "Pick one song or short story video for the week. 1️⃣🗓️",
            "Listen once, then replay and shadow one line at a time. 🔁🗣️",
            "Optional: do one printable follow-up. 🖨️✅"
          ],
          whyTopPick:
            "Safe, curriculum-aligned ESL media built for kids. ⭐",
          freeAccess: "Free to access/use. 🆓✅",
          ageCheck: "Great for 8–10. ✅"
        },
        focus: "songs/videos, shadowing",
        time: "10–15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-smash-boom-best",
        title: "Smash Boom Best (Debate Podcast) 🎤🥊🎧",
        link: "https://www.smashboom.org/",
        format: "podcast",
        description:
          "A clever and hilarious debate podcast for kids that teaches listeners how to defend their opinions using facts.",
        details: {
          type: "Debate-style educational podcast 🎙️🧠",
          teaches: "Active listening, critical thinking, forming arguments, and advanced vocabulary. 🗣️⚖️",
          howTo: [
            "Pick a fun debate topic (e.g., Cats vs. Dogs, Pizza vs. Tacos). 🍕🌮",
            "Listen to the two sides present their arguments. 🎧👂",
            "Pause and ask: 'Who is winning and why?' ⏸️❓",
            "Vote on the winner at the end! 🗳️"
          ],
          whyTopPick: "Highly engaging format that pushes listeners to evaluate what they hear. ⭐🥊",
          freeAccess: "Free to stream on their site or any podcast app. 🆓✅",
          ageCheck: "Perfect for 8-10s developing critical thinking. 🎯"
        },
        focus: "argumentative listening, critical thinking",
        time: "20-30 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-elllo",
        title: "ELLLO — English Listening Library Online 🌍🎧",
        link: "https://elllo.org/",
        format: "site",
        description:
          "Huge library of short listening lessons with quizzes and transcripts featuring speakers from around the world.",
        details: {
          type: "Short listening lessons + quizzes + transcripts 🎧📝",
          teaches:
            "Listening comprehension, exposure to different accents, and useful phrases. 👂🌍",
          howTo: [
            "Pick a topic (food, hobbies, travel, school). 🎯",
            "Listen once for the main idea. 🎧",
            "Do the quiz and check answers. ✅",
            "Repeat 3 key sentences aloud. 🗣️🔁"
          ],
          whyTopPick: "Huge variety of topics and accents for real-world listening practice. ⭐",
          freeAccess: "Free to access. 🆓✅",
          ageCheck: "Suitable for 8–10; pick kid-friendly topics. 🎯"
        },
        focus: "accents, short listening",
        time: "8–12 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-listen-a-minute",
        title: "Listen A Minute — 1-Minute Listening Lessons ⏱️🎧",
        link: "https://listenaminute.com/",
        format: "site",
        description:
          "Ultra-short listening lessons (1 minute each) with quizzes and discussion questions; perfect for quick daily practice.",
        details: {
          type: "1-minute audio clips + quizzes 🎧⏱️",
          teaches:
            "Short, focused listening practice with quick comprehension checks. 👂✅",
          howTo: [
            "Pick 1 topic that interests you. 🎯",
            "Listen 2–3 times (it's only 1 minute!). 🔁",
            "Answer the quiz questions. ✅",
            "Read the text aloud once for fluency. 🗣️"
          ],
          whyTopPick: "Super quick format is perfect for daily micro-practice. ⭐⏱️",
          freeAccess: "Free to access. 🆓✅",
          ageCheck: "Great for 8–10; easy to fit into any schedule. ✅"
        },
        focus: "micro-listening, quick practice",
        time: "5–8 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-ted-ed-student-talks",
        title: "TED-Ed — Lessons Worth Sharing 🎓🎧",
        link: "https://ed.ted.com/lessons",
        format: "video",
        description:
          "Animated educational videos with built-in comprehension questions; great for learning about science, history, and language.",
        details: {
          type: "Animated educational videos + quizzes 🎥🧠",
          teaches:
            "Listening comprehension, academic vocabulary, and critical thinking. 🎧📚",
          howTo: [
            "Search for a kid-friendly topic (animals, space, inventions). 🔎",
            "Watch the 3–5 minute video. 🎥⏱️",
            "Answer the 'Think' questions. 🧠✅",
            "Explain the main idea in your own words. 🗣️💬"
          ],
          whyTopPick: "Beautiful animations keep kids engaged while building real knowledge. ⭐",
          freeAccess: "Free to access and use. 🆓✅",
          ageCheck: "Choose age-appropriate topics; many are perfect for 8–10. 🎯"
        },
        focus: "academic listening, critical thinking",
        time: "8–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-esl-lab",
        title: "Randall's ESL Cyber Listening Lab 🎙️📝",
        link: "https://www.esl-lab.com/",
        format: "site",
        description:
          "Listening quizzes at Easy, Intermediate, and Difficult levels covering everyday English scenarios.",
        details: {
          type: "Listening quizzes by difficulty level 🎧✅",
          teaches:
            "Everyday listening comprehension and question answering. 👂🗣️",
          howTo: [
            "Start at the Easy level. 🎚️",
            "Listen and answer the quiz questions. 🎧✅",
            "Replay and take notes on key words. 🔁📝",
            "Retell the situation in your own words. 🗣️"
          ],
          whyTopPick: "Tons of topics with built-in quizzes at clear difficulty levels. ⭐",
          freeAccess: "Free to access (ads may appear). 🆓⚠️",
          ageCheck: "Generally appropriate for 8–10; supervise browsing. 👀"
        },
        focus: "everyday listening, quizzes",
        time: "10–15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "listening",
        slug: "best-set-recommended-bundle-for-8-10-listening",
        title: "Best Set — 5-Week Listening Plan 🎒🎧✨",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "A simple weekly rotation mixing songs, games, story podcasts, and longer episodes to build vocabulary, comprehension, and listening stamina.",
        bundleItems: [
          "8-10-listening-british-council-listen-watch",
          "8-10-listening-gamestolearnenglish",
          "8-10-listening-storynory",
          "8-10-listening-wow-in-the-world",
          "8-10-listening-storyberries-radio",
          "8-10-listening-circle-round",
          "8-10-listening-pbs-arthur-podcast",
          "8-10-listening-pbs-odd-squadcast",
          "8-10-listening-greeking-out",
          "8-10-listening-storyline-online"
        ],
        details: {
          type: "Recommended plan 🧭",
          teaches:
            "Comprehension + vocabulary growth + stamina via consistent listening routines. 👂📈",
          howTo: [
            "Week 1: British Council song + GamesToLearnEnglish listening game + Storynory story. 🎵🎮📚",
            "Week 2: Wow in the World + Storyberries Radio (longer listen) + a short PBS episode. 🔬🎧📺",
            "Week 3: Circle Round folktale + Arthur Podcast (stamina) + British Council short story. 🌍🎧🇬🇧",
            "Week 4: Greeking Out myth + listening game theme repeat + Storyline Online (pause + talk). 🏛️🎮🎬",
            "Week 5: Repeat favorites + do a “mini presentation” (child retells 60 seconds). 🔁🗣️"
          ],
          whyTopPick:
            "Balanced mix keeps kids engaged while steadily increasing listening length. ⭐",
          freeAccess:
            "All links are free resources; access may vary by region/platform. 🆓⚠️",
          ageCheck:
            "Designed for 8–10; simplify by shortening episodes for lower listeners. 🎯"
        },
        focus: "weekly rotation, stamina, comprehension",
        time: "3 sessions/week (10–17 min each)",
        level: "caregiver-led"
      },

      // =========================
      // 8–10 WRITING
      // =========================
      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-british-council-worksheets",
        title: "British Council — LearnEnglish Kids: Worksheets 🧩🖨️",
        link: "https://learnenglishkids.britishcouncil.org/print-make/worksheets",
        format: "printable",
        description:
          "Free printable worksheets (PDF) for vocabulary, grammar, and themed writing tasks (e.g., poems, puzzles, short responses).",
        details: {
          type: "Printable worksheets (PDF) 📄🖨️",
          teaches:
            "Writing practice + vocabulary and grammar through themed tasks. 🧠🔤",
          howTo: [
            "Browse and pick 1 worksheet (don’t overprint). 1️⃣🖨️",
            "Complete in notebook or on the printout. ✍️",
            "Underline 5 useful words and use them in new sentences. 🗝️5️⃣",
            "Keep total time to 15 minutes. ⏱️"
          ],
          whyTopPick:
            "Trusted, well-designed ESL activities that are easy to use at home or class. ⭐",
          freeAccess: "Free to access; no login needed for worksheets. 🆓✅",
          ageCheck: "Very suitable for 8–10. 🎯"
        },
        focus: "printable writing tasks, vocab/grammar",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-eslkidsgames-story-dice",
        title: "ESL Kids Games — Story Dice Online 🎲📖",
        link: "https://www.eslkidsgames.com/esl-story-dice-online",
        format: "interactive",
        description:
          "Interactive dice that generate pictures to inspire stories; great for sequencing and linking sentences.",
        details: {
          type: "Interactive writing/storytelling tool 🎮🧩",
          teaches:
            "Creative writing, sentence linking, and story sequencing. 🧠🧵",
          howTo: [
            "Roll the dice. 🎲",
            "Use 3 images for beginning, 3 for middle, 3 for end. 3️⃣/3️⃣/3️⃣",
            "Write 6–10 sentences connecting all images. ✍️",
            "Read it aloud once at the end. 🗣️"
          ],
          whyTopPick:
            "Instant ideas + high engagement; perfect for reluctant writers. ⭐",
          freeAccess: "Free to use; no signup. 🆓✅",
          ageCheck: "Great for 8–10 (A1–A2 writers can do shorter stories). 🎯"
        },
        focus: "creative writing, sequencing",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-eslkidsgames-prompt-generator",
        title: "ESL Kids Games — Who/What/Where/When Prompt Generator 🎲🧠",
        link: "https://www.eslkidsgames.com/writing-prompt-generator-who-what-where-and-when",
        format: "interactive",
        description:
          "Random prompt builder (Who/What/Where/When) to spark story ideas, ideal for ESL writers.",
        details: {
          type: "Interactive story prompt tool 🔎🧩",
          teaches:
            "Story planning, idea generation, and writing with required elements. ✨",
          howTo: [
            "Click Who/What/Where/When to generate a full prompt. 👤➡️🎬➡️🏝️➡️🕒",
            "Write 1 paragraph that uses every element. 📝",
            "Add 3 linking words: first/then/finally. 🔗",
            "Share/read aloud. 🗣️"
          ],
          whyTopPick:
            "Stops writer’s block fast and keeps prompts simple for ESL. ⭐",
          freeAccess: "Free to use; no login. 🆓✅",
          ageCheck: "Strong fit for 8–10 (A1–A2). 🎯"
        },
        focus: "prompt writing, planning",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-kidsacademy-3rd-grade-worksheets",
        title: "Kids Academy — 3rd Grade Writing Worksheets 🖨️✍️",
        link: "https://www.kidsacademy.mobi/printable-worksheets/third-grade/writing/",
        format: "printable",
        description:
          "Printable Grade 3 writing worksheets (spelling, grammar, short tasks) that reinforce writing mechanics and vocabulary.",
        details: {
          type: "Printable worksheets (PDF) 📄🖨️",
          teaches:
            "Writing mechanics: spelling, grammar, short responses, and vocabulary reinforcement. 🔤🧠",
          howTo: [
            "Pick one worksheet and print (or copy tasks into notebook). 🖨️/📒",
            "Complete the short task set. ✅",
            "Rewrite 5 answers as full sentences. 📝5️⃣",
            "Keep the work neat and readable. ✍️"
          ],
          whyTopPick:
            "Short, structured tasks that build consistency and accuracy. ⭐",
          freeAccess:
            "Some materials are free; availability can vary by worksheet/page. 🆓⚠️",
          ageCheck: "Designed for Grade 3 (around 8–9), ideal for 8–10. 🎯"
        },
        focus: "handwriting + spelling/grammar",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-eslgamesplus-sentence-games",
        title: "ESL Games Plus — Sentence Builder / Grammar Games 🧱🎮",
        link: "https://www.eslgamesplus.com/fun-games/",
        format: "game",
        description:
          "Self-paced grammar games that support sentence building (drag/drop and quick checks).",
        details: {
          type: "Interactive grammar/sentence games 🎮🧩",
          teaches:
            "Sentence structure and grammar patterns (e.g., comparatives, prepositions). 🧠🔤",
          howTo: [
            "Choose one sentence/grammar game and play 8–10 minutes. ⏱️",
            "Say the correct sentence out loud before submitting. 🗣️✅",
            "Write 5 example sentences using the same structure. ✍️5️⃣",
            "Repeat the same structure next day for mastery. 🔁"
          ],
          whyTopPick:
            "Fast feedback makes grammar practice feel like a game, not a worksheet. ⭐",
          freeAccess: "Free to access; site experience can vary. 🆓⚠️",
          ageCheck: "Good for 8–10 (A2–B1 structures with support). 🎯"
        },
        focus: "sentence structure, grammar patterns",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-write-and-improve",
        title: "Cambridge — Write & Improve 📋✍️",
        link: "https://writeandimprove.com/",
        format: "tool",
        description:
          "Online writing practice with automated feedback on grammar, vocabulary, and clarity (CEFR aligned).",
        details: {
          type: "Online writing tool (feedback) 💻✅",
          teaches:
            "Revising and improving writing quality through feedback and resubmission. 📈",
          howTo: [
            "Create an account (free) and choose a short task. 🔐",
            "Write a paragraph and submit. 📝➡️✅",
            "Fix highlighted issues and resubmit once. 🔁",
            "Save your ‘best version’ in your notebook. 📒⭐"
          ],
          whyTopPick:
            "Immediate feedback supports faster improvement and clearer writing habits. ⭐",
          freeAccess: "Free to use (account required). 🆓🔐",
          ageCheck:
            "Best for stronger 8–10 writers (upper end of the range). 🎯"
        },
        focus: "feedback, editing",
        time: "10–20 min",
        level: "independent (with guidance)"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-scholastic-story-starters",
        title: "Scholastic — Story Starters 🚀📝",
        link: "https://www.scholastic.com/teachers/story-starters/",
        format: "interactive",
        description:
          "Genre-based writing starter generator (Adventure/Fantasy/Sci-Fi) to beat writer’s block.",
        details: {
          type: "Interactive prompt generator 🎲💻",
          teaches:
            "Creative writing ideas, openings, and sustained writing from a starter. ✨",
          howTo: [
            "Pick a theme (Adventure/Fantasy/Sci-Fi). 🎭",
            "Generate a prompt and write 1 page (or 1 paragraph for lower writers). 📝",
            "Add a clear ending sentence. ✅",
            "Optional: illustrate the best scene. 🎨"
          ],
          whyTopPick:
            "Simple prompts that feel exciting and age-appropriate. ⭐",
          freeAccess: "Free to access (site availability can vary). 🆓⚠️",
          ageCheck: "Great fit for 8–10. 🎯"
        },
        focus: "creative prompts, sustained writing",
        time: "10–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-imagine-forest-story-creator",
        title: "Imagine Forest — Story Creator 📝🌳",
        link: "https://www.imagineforest.com/picture-book-creator",
        format: "tool",
        description:
          "Guided story-building tool that supports planning and writing step-by-step (often with download/print options).",
        details: {
          type: "Online story-making tool 🧩💻",
          teaches:
            "Narrative structure, planning, and building a story in steps. 🏗️📖",
          howTo: [
            "Start a new story and choose a simple structure. 🧱",
            "Write 3 sections: beginning/middle/end. 🧩",
            "Re-read and improve 2 sentences. ✍️2️⃣",
            "Optional: export/print if available. 🖨️"
          ],
          whyTopPick:
            "Adds structure for beginners while still being creative and fun. ⭐",
          freeAccess:
            "Free to access; ads/feature availability can vary. 🆓⚠️",
          ageCheck: "Works well for 8–10. ✅"
        },
        focus: "guided story writing, structure",
        time: "15–25 min",
        level: "independent (with light guidance)"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-splashlearn-writing-games",
        title: "SplashLearn — Writing Games & Worksheets 📱✍️",
        link: "https://www.splashlearn.com/ela/writing-games",
        format: "site",
        description:
          "Mixed interactive practice and printable-friendly resources that support writing foundations (spelling, sentences, writing routines).",
        details: {
          type: "Games + practice resources (web/app) 🎮🖨️",
          teaches:
            "Foundational writing skills (sentence practice, spelling habits, writing routines). ✍️🧠",
          howTo: [
            "Pick one short writing activity/game. 🎯",
            "Do 8–10 minutes max. ⏱️",
            "Write 5 sentences using the same pattern/vocab. ✍️5️⃣",
            "Stop while confidence is high. ⭐"
          ],
          whyTopPick:
            "Game-like practice supports consistency without feeling like heavy homework. ⭐",
          freeAccess:
            "Some content is free; access can vary by activity/account. 🆓⚠️",
          ageCheck: "Fits 8–10 (Grade 3–4 level). 🎯"
        },
        focus: "writing practice routines",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-quill",
        title: "Quill.org — Interactive Writing & Grammar ✍️🧩",
        link: "https://www.quill.org/",
        format: "tool",
        description:
          "Nonprofit writing/grammar practice platform with instant feedback (sentence combining, proofreading, grammar).",
        details: {
          type: "Online writing practice platform 💻✅",
          teaches:
            "Editing, grammar, sentence combining, and clarity through feedback. 🧠🔤",
          howTo: [
            "Create a free teacher/parent account and set up a learner. 🔐",
            "Assign one short activity (sentence combining or proofreading). ✅",
            "Complete 10–15 minutes. ⏱️",
            "Copy 3 corrected sentences into a notebook. ✍️3️⃣"
          ],
          whyTopPick:
            "Polished, research-based activities with strong feedback and tracking. ⭐",
          freeAccess:
            "Free to use (account setup required). 🆓🔐",
          ageCheck:
            "Best for stronger 8–10 writers; choose simpler activities at first. 🎯"
        },
        focus: "grammar + editing feedback",
        time: "10–15 min",
        level: "independent (with setup)"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-trading-card-creator",
        title: "ReadWriteThink — Trading Card Creator 🎴✍️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/trading-card-creator",
        format: "interactive",
        description:
          "Interactive tool that prompts kids to write short, descriptive summaries to create trading cards for characters, places, or objects.",
        details: {
          type: "Interactive summarization tool 💻📝",
          teaches: "Summarizing, descriptive writing, and identifying key traits. 🧠✍️",
          howTo: [
            "Choose a topic (a favorite book character, an animal, or historical figure). 👤",
            "Answer the short prompts to describe the topic. 📝",
            "Download or print the finished trading card. 🖨️✅",
            "Create a whole deck over time! 🃏"
          ],
          whyTopPick: "Turns writing summaries into a fun, gamified collecting activity. ⭐🎴",
          freeAccess: "Free to use online. 🆓✅",
          ageCheck: "Great for 8-10 for practicing concise descriptions. 🎯"
        },
        focus: "summarizing, descriptive writing",
        time: "10-15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-write-and-improve",
        title: "Cambridge Write & Improve — AI Writing Feedback ✍️🤖",
        link: "https://writeandimprove.com/",
        format: "site",
        description:
          "Free AI-powered writing tool from Cambridge that gives instant feedback on your writing with level indicators.",
        details: {
          type: "AI writing feedback tool ✍️🤖",
          teaches:
            "Writing accuracy, grammar, vocabulary range, and self-correction habits. 📝✅",
          howTo: [
            "Choose a writing task (or use your own topic). 🎯",
            "Write a short paragraph (5–8 sentences). ✍️",
            "Submit and read the AI feedback. 🤖📋",
            "Revise and resubmit to improve your score. 🔁📈"
          ],
          whyTopPick: "Instant, personalized feedback that teaches self-revision. ⭐🤖",
          freeAccess: "Free to use (Cambridge). 🆓✅",
          ageCheck: "Great for 8–10 with adult guidance on topics. 🎯"
        },
        focus: "writing feedback, self-correction",
        time: "15–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-quill-grammar",
        title: "Quill.org — Free Grammar & Writing Practice 📝🎯",
        link: "https://www.quill.org/",
        format: "site",
        description:
          "Interactive grammar and writing exercises that build sentence construction, combining, and proofreading skills.",
        details: {
          type: "Interactive grammar + sentence exercises 📝✅",
          teaches:
            "Sentence structure, grammar accuracy, and proofreading. ✍️🧠",
          howTo: [
            "Create a free student account. 🆓👤",
            "Start with sentence combining activities. 🧩",
            "Complete 1–2 short exercises per session. ⏱️",
            "Review corrections and try again. 🔁✅"
          ],
          whyTopPick: "Focused grammar practice with immediate correction. ⭐",
          freeAccess: "Free to use. 🆓✅",
          ageCheck: "Well-suited for 8–10 learners. 🎯"
        },
        focus: "grammar, sentence building",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-readwritethink-interactives",
        title: "ReadWriteThink — Writing Interactives & Printables 🧩✍️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives",
        format: "site",
        description:
          "Interactive writing tools (story maps, letter generators, comic creators) plus printable organizers for planning writing.",
        details: {
          type: "Interactive writing tools + printable organizers 🧩📄",
          teaches:
            "Writing planning, story structure, and creative composition. 📝🎨",
          howTo: [
            "Pick a tool (Story Map, Comic Creator, Letter Generator). 🎯",
            "Use it to plan or draft a short piece. 📝",
            "Print your work (or save it digitally). 🖨️💾",
            "Share your finished piece with someone. 🗣️🤝"
          ],
          whyTopPick: "Makes writing fun through interactive, visual tools. ⭐🎨",
          freeAccess: "Free to access and use. 🆓✅",
          ageCheck: "Excellent for 8–10. ✅"
        },
        focus: "creative writing, planning",
        time: "15–20 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-826-digital",
        title: "826 Digital — Creative Writing Prompts & Lessons 🎭✍️",
        link: "https://826digital.com/",
        format: "site",
        description:
          "Fun, imaginative writing lessons and prompts from the 826 National network that spark creative storytelling.",
        details: {
          type: "Creative writing lessons + prompts 🎭📝",
          teaches:
            "Creative thinking, storytelling, descriptive writing, and voice. ✍️💭",
          howTo: [
            "Browse the lesson library and pick one that looks fun. 🎯🎭",
            "Follow the guided prompts to write your story. 📝",
            "Read your story aloud to someone. 🗣️👂",
            "Optional: illustrate your favorite scene. 🎨🖼️"
          ],
          whyTopPick: "Highly creative prompts that make writing feel exciting. ⭐🎭",
          freeAccess: "Free to access. 🆓✅",
          ageCheck: "Perfect for 8–10 creative writers. ✅"
        },
        focus: "creative writing, storytelling",
        time: "15–25 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "writing",
        slug: "best-set-recommended-bundle-for-8-10-writing",
        title: "Best Set (Bundle + Weekly Plan) 🗓️✍️📚✨",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "A balanced weekly routine mixing handwriting/vocab, creative prompts, sentence building, and (optional) feedback tools.",
        bundleItems: [
          "8-10-writing-british-council-worksheets",
          "8-10-writing-kidsacademy-3rd-grade-worksheets",
          "8-10-writing-eslkidsgames-story-dice",
          "8-10-writing-eslkidsgames-prompt-generator",
          "8-10-writing-scholastic-story-starters",
          "8-10-writing-imagine-forest-story-creator",
          "8-10-writing-eslgamesplus-sentence-games",
          "8-10-writing-write-and-improve",
          "8-10-writing-quill",
          "8-10-writing-splashlearn-writing-games"
        ],
        details: {
          type: "Recommended weekly plan 🧺",
          teaches:
            "Neat writing + vocab/grammar + creative writing structure + revision habits. ✍️🔤🧠",
          howTo: [
            "Monday — Handwriting & Vocabulary: 1 printable worksheet (British Council or Kids Academy) + write answers neatly. 🖨️✍️",
            "Tuesday — Storytelling Fun: Story Dice → write 6–10 sentences (First/Next/Finally). 🎲🧵",
            "Wednesday — Prompt Writing: Scholastic Story Starters OR Who/What/Where/When prompt → write 1 paragraph/page. 📝",
            "Thursday — Sentence Practice: ESL Games Plus sentence/grammar game → write 5 matching example sentences. 🧱5️⃣",
            "Friday — Digital Story Creator or Feedback: Imagine Forest story creator OR Cambridge Write & Improve (one paragraph + revise). 💻🔁",
            "Optional (any day): Quill activity (10–15 min) for editing/grammar feedback. ✅"
          ],
          whyTopPick:
            "Covers mechanics + creativity + structure + revision without overloading any single day. ⭐",
          freeAccess:
            "Uses free sites; some items require accounts or have limited free content. 🆓⚠️",
          ageCheck:
            "Designed for 8–10; shorten writing length for lower writers and increase feedback tools for stronger writers. 🎯"
        },
        focus: "weekly routine, balanced writing skills",
        time: "15–25 min/day (Mon–Fri)",
        level: "independent (with light support)"
      },

      // =========================
      // 8–10 SPEAKING
      // =========================
      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-learnenglishkids-speak",
        title: "LearnEnglish Kids — Speak (Speak & Spell) 🧑‍🏫🗣️",
        link: "https://learnenglishkids.britishcouncil.org/speak-spell/speak",
        format: "site",
        description:
          "Kid-friendly speaking practice with clear models and short tasks to improve pronunciation and confidence.",
        details: {
          type: "Speaking practice (models + activities) 🎮🧩",
          teaches:
            "Pronunciation practice + saying words/sounds clearly. 🔤🗣️",
          howTo: [
            "Choose 1 activity (keep it short). 1️⃣⏱️",
            "Pick 5 target words and copy them aloud clearly. 🗣️5️⃣",
            "Repeat the same activity 2–3 times this week. 🔁"
          ],
          whyTopPick:
            "Made specifically for children learning English; easy to reuse in short sessions. ⭐",
          freeAccess:
            "Free to use; some community features may require login. 🆓⚠️",
          ageCheck:
            "Safe for 8–10; short sessions work best. 🎯"
        },
        focus: "pronunciation, clarity",
        time: "5–10 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-learnenglishkids-tongue-twisters",
        title: "LearnEnglish Kids — Tongue Twisters 👅⚡",
        link: "https://learnenglishkids.britishcouncil.org/fun-games/tongue-twisters",
        format: "site",
        description:
          "Audio-supported tongue twisters for rhythm, clarity, and tricky sounds.",
        details: {
          type: "Listen + repeat speaking practice 🎧🔁",
          teaches:
            "Clarity, rhythm, and tricky sounds (fast + fun). 🗣️🎵",
          howTo: [
            "Play one twister. 🎧",
            "Repeat slowly 3 times (clear sounds). 🐢3️⃣",
            "Repeat faster 3 times (keep it playful). 🚀3️⃣"
          ],
          whyTopPick:
            "Instant pronunciation practice with built-in audio modelling. ⭐",
          freeAccess: "Free webpage/audio. 🆓✅",
          ageCheck:
            "Great for 8–10; stop before frustration. 🎯🙂"
        },
        focus: "rhythm, articulation",
        time: "2–5 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-learnenglishkids-jokes",
        title: "LearnEnglish Kids — Jokes (Tell-a-joke speaking) 😄🎤",
        link: "https://learnenglishkids.britishcouncil.org/fun-games/jokes",
        format: "site",
        description:
          "Short jokes that are perfect for weekly speaking performance and confidence building.",
        details: {
          type: "Reading + speaking performance 🎭🗣️",
          teaches:
            "Natural phrases, timing, and confidence speaking in front of someone. 🧠🎤",
          howTo: [
            "Pick 1 short joke. 1️⃣😂",
            "Practice reading it aloud twice (slow then normal). 🗣️🔁",
            "Tell it to someone or record once. 🎤"
          ],
          whyTopPick:
            "Clear weekly outcome: perform something short and fun. ⭐",
          freeAccess: "Free to access. 🆓✅",
          ageCheck:
            "Kid-focused; adult can preview if needed. 👀✅"
        },
        focus: "confidence, performance",
        time: "5–10 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-learnenglishkids-video-zone",
        title: "LearnEnglish Kids — Video Zone (Watch → discuss → speak) 🎥🗣️",
        link: "https://learnenglishkids.britishcouncil.org/listen-watch/video-zone",
        format: "video",
        description:
          "Short videos that naturally lead into speaking: discussion, opinions, and retelling.",
        details: {
          type: "Short videos + activities 📺📝",
          teaches:
            "Speaking through retelling, opinions, and discussion prompts. 💬🧠",
          howTo: [
            "Watch 1 short video. 🎥",
            "Answer 3 simple questions aloud. ❓3️⃣",
            "Retell the video in 3 sentences (beginning/middle/end). 🧩3️⃣"
          ],
          whyTopPick:
            "Clean, structured “watch + respond” flow. ⭐",
          freeAccess: "Free to watch/use. 🆓✅",
          ageCheck: "8–10 appropriate; adult help if needed. 🎯"
        },
        focus: "retell, opinions",
        time: "8–12 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-learnenglishkids-story-maker-1",
        title: "LearnEnglish Kids — Story Maker 1 (Create → read aloud) 🧙📖",
        link: "https://learnenglishkids.britishcouncil.org/fun-games/games/story-maker-1",
        format: "interactive",
        description:
          "Interactive story maker that supports storytelling and speaking turns (read aloud + retell).",
        details: {
          type: "Interactive story generator 🎮📖",
          teaches:
            "Storytelling, sequencing, and expressive speaking. 🗣️🏗️",
          howTo: [
            "Build a story in the game. 🎮",
            "Read it aloud with expression. 🎭🗣️",
            "Optional: retell without reading (1 minute). ⏱️"
          ],
          whyTopPick:
            "Speaking + creativity with very low prep. ⭐",
          freeAccess: "Free to play/use. 🆓✅",
          ageCheck: "Strong fit for 8–10; help with harder words if needed. 🎯"
        },
        focus: "storytelling, sequencing",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-learnenglishkids-story-maker-2",
        title: "LearnEnglish Kids — Story Maker 2 (Step-up) 📖🎲",
        link: "https://learnenglishkids.britishcouncil.org/fun-games/games/story-maker-2",
        format: "interactive",
        description:
          "A slightly harder story maker for longer speaking turns and clearer story structure.",
        details: {
          type: "Interactive story generator 🎮📚",
          teaches:
            "Longer speaking turns and story structure (beginning–middle–end). 🧩🗣️",
          howTo: [
            "Create the story. 🎮",
            "Practice a beginning–middle–end retell. 🧩",
            "Do a 60-second performance to a partner. 🎤⏱️"
          ],
          whyTopPick:
            "Natural progression from Story Maker 1 for stronger speakers. ⭐",
          freeAccess: "Free to play/use. 🆓✅",
          ageCheck: "Best for confident 8–10 learners. 🎯"
        },
        focus: "longer speaking turns, structure",
        time: "10–15 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-sounds-right-app-ios",
        title: "LearnEnglish Sounds Right (Pronunciation app) 🔤🎧",
        link: "https://apps.apple.com/vn/app/learnenglish-sounds-right/id387588128",
        format: "app",
        description:
          "Phonemic chart app with model audio for English sounds (quick, focused pronunciation practice).",
        details: {
          type: "Pronunciation chart app 📲🎙️",
          teaches:
            "English sounds with model audio (great for tricky vowel/consonant clarity). 🔊",
          howTo: [
            "Tap one sound and copy it 5 times. 🔤🗣️5️⃣",
            "Put the sound into 3 example words (adult chooses). 🧠3️⃣",
            "Record and replay once to check clarity (optional). 🎤🔁"
          ],
          whyTopPick:
            "Fast, distraction-light sound practice; ideal for 2-minute drills. ⭐",
          freeAccess:
            "App listing and availability can vary by store/region. 🆓⚠️",
          ageCheck:
            "Good for 8–10 with guidance (symbols can be optional). 🎯"
        },
        focus: "sounds, pronunciation clarity",
        time: "2–5 min",
        level: "caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-cambridge-activities-for-children",
        title: "Cambridge English — Activities for Children 🎯🗣️",
        link: "https://www.cambridgeenglish.org/learning-english/parents-and-children/activities-for-children/",
        format: "site",
        description:
          "Levelled activities (Pre-A1/A1/A2) that can be used for speaking practice with short, structured answers.",
        details: {
          type: "Levelled activities (kid ESL) 🧩📚",
          teaches:
            "Speaking practice inside kid-friendly, levelled tasks. 🗣️📈",
          howTo: [
            "Choose a level (Pre-A1/A1 works well). 🎯",
            "Do 1 activity. ✅",
            "Say answers aloud + add one extra sentence. 💬➕1️⃣",
            "Repeat with the same format next week. 🔁"
          ],
          whyTopPick:
            "Levelled content supports mixed-ability speaking. ⭐",
          freeAccess: "Public activity pages (availability can vary). 🆓⚠️",
          ageCheck: "Designed for children; adult support helps. 🎯"
        },
        focus: "structured speaking, levelled practice",
        time: "8–12 min",
        level: "caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-neok12-public-speaking",
        title: "NeoK12 — Public Speaking for Kids 🎤🧠",
        link: "https://www.neok12.com/Public-Speaking.htm",
        format: "site",
        description:
          "Videos and lessons that focus directly on speaking structure and delivery (simple mini-speeches).",
        details: {
          type: "Curated video lessons 📺🧑‍🏫",
          teaches:
            "Speaking structure and delivery basics (confidence, clarity, organization). 🗣️🏗️",
          howTo: [
            "Watch 1 short lesson. 🎥",
            "Make a 5-bullet plan. 📝5️⃣",
            "Give a 60-second talk (record if possible). 🎤⏱️"
          ],
          whyTopPick:
            "Direct focus on speaking skills, not just vocabulary. ⭐",
          freeAccess: "Public access site; content may vary. 🆓⚠️",
          ageCheck: "Good for 8–10; adult helps choose topics. 🎯"
        },
        focus: "mini-speeches, confidence",
        time: "10–15 min",
        level: "caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-chatterpix-kids-ios",
        title: "ChatterPix Kids (Optional speaking output) 🖼️🗣️",
        link: "https://apps.apple.com/us/app/chatterpix-duck-duck-moose/id734038526",
        format: "app",
        description:
          "Record short speaking turns by making a photo ‘talk’ (fun output with low reading load).",
        details: {
          type: "Creative recording app 🎙️📸",
          teaches:
            "Short speaking turns, pronunciation practice, confidence through replay. 🎤🔁",
          howTo: [
            "Take a photo. 📸",
            "Record a 10–20 second message. 🗣️⏱️",
            "Replay and improve ONE thing (volume / clear ending sounds). 🔁✅"
          ],
          whyTopPick:
            "Fun weekly output without heavy writing/reading demands. ⭐",
          freeAccess:
            "App availability/pricing can vary by store/region. 🆓⚠️",
          ageCheck:
            "Great for 8–10 with supervision for saving/sharing. 🛡️"
        },
        focus: "recorded speaking, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-conversation-starters-pdf",
        title: "Conversation Starters (Printable PDF) 🗣️📄",
        link: "https://thefamilydinnerproject.org/wp-content/uploads/2020/03/Conversation-Starters_2020.pdf",
        format: "printable",
        description:
          "Printable prompt cards for longer answers, opinions, and storytelling.",
        details: {
          type: "Printable speaking prompts 🖨️",
          teaches:
            "Longer answers, opinions, and personal storytelling. 💬🧠",
          howTo: [
            "Print + cut into a ‘conversation jar’. 🫙✂️",
            "Pick 2 cards/day. 🎴2️⃣",
            "Answer with: ‘Because…’ + one example. ✅"
          ],
          whyTopPick:
            "Offline-friendly, reusable, and very low prep. ⭐",
          freeAccess: "Direct free PDF. 🆓✅",
          ageCheck:
            "Some prompts may be more mature; adult selects kid-friendly cards. 🎯"
        },
        focus: "opinions, longer turns",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-eltbuzz-story-generator",
        title: "ELT Buzz — Story Generator (Visual prompts) 🖼️🎲",
        link: "https://www.eltbuzz.com/storytelling/storygen/",
        format: "tool",
        description:
          "Random visual prompts for describing and building stories (excellent for fluency).",
        details: {
          type: "Speaking prompt tool (visual storytelling) 🧰",
          teaches:
            "Speaking fluency through describing and story-building. 🗣️🧠",
          howTo: [
            "Generate 3–6 images. 🎲🖼️",
            "Say 1 sentence per image. 🗣️",
            "Retell the whole story in 30 seconds. ⏱️"
          ],
          whyTopPick:
            "Works on any device and creates instant speaking tasks. ⭐",
          freeAccess: "Free webpage/tool. 🆓✅",
          ageCheck: "Safe for 8–10; adult supports vocabulary as needed. 🎯"
        },
        focus: "describe, retell, fluency",
        time: "5–10 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-english-heritage-story-dice",
        title: "English Heritage — Story Dice 🎲✨",
        link: "https://storydice.english-heritage.org.uk/",
        format: "tool",
        description:
          "Creative story dice prompts for mini-stories and short performances (great for mixed levels).",
        details: {
          type: "Prompt generator 🎲",
          teaches:
            "Creative speaking through prompts + imagination + short structure. 🗣️🏗️",
          howTo: [
            "Roll prompts. 🎲",
            "Speak a 4-sentence mini-story (or 4 lines). 🗣️4️⃣",
            "Repeat with a new roll. 🔁"
          ],
          whyTopPick:
            "Unique prompts that work well for quick ‘performance’ practice. ⭐",
          freeAccess: "Free web tool. 🆓✅",
          ageCheck:
            "Some prompts may feel ‘older’; adult frames topics and supports vocabulary. 🎯"
        },
        focus: "creative speaking prompts",
        time: "5–10 min",
        level: "independent or caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-british-council-drama-games",
        title: "British Council — Drama games (Offline speaking) 🎭🗣️",
        link: "https://www.britishcouncil.in/blog/theatre-english-children",
        format: "site",
        description:
          "Offline drama/improvisation games to build speaking confidence with minimal screen time.",
        details: {
          type: "Activity ideas (offline speaking games) 📘🎭",
          teaches:
            "Speaking confidence, role-play, and improvisation. 🎭🗣️",
          howTo: [
            "Choose 1 drama game. 🎭1️⃣",
            "Do it for 5–10 minutes. ⏱️",
            "Repeat weekly with the same rules and new words. 🔁"
          ],
          whyTopPick:
            "Great speaking practice without needing screens; easy to run in class. ⭐",
          freeAccess: "Free webpage/article. 🆓✅",
          ageCheck: "Good for 8–10 with adult facilitation. 🎯"
        },
        focus: "confidence, role-play",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-speechling",
        title: "Speechling — Audio Dictation & Speaking Practice 🎙️✅",
        link: "https://speechling.com/",
        format: "site",
        description:
          "A platform focused on speaking fluency where users listen to native speakers, record themselves, and (optionally) get feedback.",
        details: {
          type: "Audio repetition and recording tool 🎧🎤",
          teaches: "Speaking fluency, exact pronunciation, and sentence rhythm. 🗣️📈",
          howTo: [
            "Choose a set of simple sentences or phrases. 🎯",
            "Listen to the native speaker model the sentence. 👂",
            "Record yourself repeating the sentence exactly. 🎤",
            "Compare your waveform to the native speaker's. 📊"
          ],
          whyTopPick: "Highly focused on actual mouth movements and replicating accurate sounds. ⭐",
          freeAccess: "Core repetition and recording features are free (advanced coaching has a premium tier). 🆓⚠️",
          ageCheck: "Better for focused 8-10 learners; adult guidance needed to set up. 🧑‍🏫"
        },
        focus: "pronunciation accuracy, shadowing",
        time: "10-15 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-esl-conversation-questions",
        title: "ITESLJ Conversation Questions for ESL Students 🗣️❓",
        link: "http://iteslj.org/questions/",
        format: "site",
        description:
          "Huge bank of conversation questions sorted by topic; perfect for structured speaking practice with a partner.",
        details: {
          type: "Conversation question bank (by topic) 🗣️📋",
          teaches:
            "Speaking fluency, extending answers, and topic vocabulary. 🗣️🧠",
          howTo: [
            "Pick a topic (animals, food, holidays, sports). 🎯",
            "Take turns asking and answering 5 questions. 🗣️🔁",
            "Try to give 3+ sentence answers. 📝3️⃣",
            "Record yourself answering one question (optional). 🎙️"
          ],
          whyTopPick: "Simple, zero-prep speaking practice with endless topics. ⭐",
          freeAccess: "Free to access. 🆓✅",
          ageCheck: "Good for 8–10; adult picks age-appropriate topics. 🎯"
        },
        focus: "conversation practice, fluency",
        time: "10–15 min",
        level: "caregiver-led"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-baamboozle",
        title: "Baamboozle — Speaking & Quiz Games 🎮🗣️",
        link: "https://www.baamboozle.com/",
        format: "game",
        description:
          "Interactive quiz-style games that can be used for fun speaking practice, vocabulary review, and turn-taking.",
        details: {
          type: "Interactive quiz/speaking games 🎮🗣️",
          teaches:
            "Speaking under fun pressure, vocabulary recall, and quick thinking. 🧠⚡",
          howTo: [
            "Search for an English topic game (vocabulary, grammar). 🔎",
            "Play in turns; say the answer out loud before clicking. 🗣️👆",
            "Use full sentences when giving answers. 📝✅",
            "Keep it to 10 minutes for best focus. ⏱️🎯"
          ],
          whyTopPick: "Gamified format keeps kids motivated to speak. ⭐🎮",
          freeAccess: "Free to play (some premium features exist). 🆓⚠️",
          ageCheck: "Great for 8–10; fun and competitive. ✅"
        },
        focus: "speaking games, vocabulary recall",
        time: "8–12 min",
        level: "caregiver-led or independent"
      },

      {
        age: "8-10",
        skill: "speaking",
        slug: "best-set-recommended-bundle-for-8-10-speaking",
        title: "Best Set (8–10 Speaking bundle + weekly plan) 🗓️🗣️✨",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "Goal: short daily speaking + one weekly ‘performance’. A simple routine that repeats core speaking drills (clarity + fluency) and ends each week with an output task (joke/mini-speech/recording).",
        bundleItems: [
          "8-10-speaking-learnenglishkids-tongue-twisters",
          "8-10-speaking-learnenglishkids-speak",
          "8-10-speaking-eltbuzz-story-generator",
          "8-10-speaking-learnenglishkids-jokes",
          "8-10-speaking-conversation-starters-pdf",
          "8-10-speaking-neok12-public-speaking",
          "8-10-speaking-learnenglishkids-video-zone",
          "8-10-speaking-learnenglishkids-story-maker-1",
          "8-10-speaking-learnenglishkids-story-maker-2",
          "8-10-speaking-english-heritage-story-dice",
          "8-10-speaking-sounds-right-app-ios",
          "8-10-speaking-british-council-drama-games",
          "8-10-speaking-chatterpix-kids-ios",
          "8-10-speaking-cambridge-activities-for-children"
        ],
        details: {
          type: "Recommended weekly routine 🧺",
          teaches:
            "Pronunciation + rhythm + longer speaking turns + confidence through repeated output. 🗣️📈",
          howTo: [
            "Mon–Thu (10–15 min/day): 1) Tongue Twister drill (2 min) → 2) Speak & Spell activity (5 min) → 3) ELT Buzz story images (1 sentence per image). 👅🧑‍🏫🎲",
            "Fri (performance): Tell 1 joke (practice twice → perform/record once). 😄🎤",
            "Weekend (light): Conversation jar (3 cards) + optional 60-second mini-speech (NeoK12 5-bullet plan). 🫙🎤",
            "Optional swap: Use Video Zone or Story Maker (retell beginning/middle/end in 3 sentences). 🎥📖"
          ],
          whyTopPick:
            "Repeatable structure keeps progress steady without needing new prep each day. ⭐🔁",
          freeAccess:
            "Uses free websites; app availability can vary; choose optional tools as needed. 🆓⚠️",
          ageCheck:
            "Designed for 8–10; keep it playful and short for lower-confidence speakers. 🎯🙂"
        },
        focus: "routine, confidence, performance",
        time: "10–15 min/day",
        level: "caregiver-led or independent"
      },
      {
        age: "8-10",
        skill: "reading",
        slug: "8-10-reading-cambridge-activities-for-learners",
        title: "Cambridge English - Activities for Learners (Reading)",
        link: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/?skill=reading",
        format: "site",
        description:
          "A free reading activity hub with short texts and questions; choose basic and independent tasks for this age band.",
        details: {
          type: "Skill activity hub",
          teaches: "Reading for gist, details, and simple vocabulary in context.",
          howTo: [
            "Filter for reading and pick a short activity.",
            "Read once for the main idea and once for the questions.",
            "Review two or three new words after each task."
          ],
          whyTopPick: "Large free bank with clear skill focus.",
          freeAccess: "Free Cambridge English activities.",
          ageCheck: "Good fit for 8-10 with light support if needed."
        },
        focus: "gist, details, vocabulary",
        time: "8-12 min",
        level: "caregiver-led or independent"
      },
      {
        age: "8-10",
        skill: "listening",
        slug: "8-10-listening-cambridge-activities-for-learners",
        title: "Cambridge English - Activities for Learners (Listening)",
        link: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/?skill=listening",
        format: "site",
        description:
          "Short listening tasks with questions and replay options, useful for building attention to key information.",
        details: {
          type: "Skill activity hub",
          teaches: "Listening for main ideas, details, and familiar vocabulary.",
          howTo: [
            "Pick one short listening task.",
            "Listen once without stopping, then replay for answers.",
            "End with a one-sentence summary or quick retell."
          ],
          whyTopPick: "Easy to fit into short daily practice.",
          freeAccess: "Free Cambridge English activities.",
          ageCheck: "Good fit for 8-10."
        },
        focus: "details, replay, retell",
        time: "8-10 min",
        level: "caregiver-led or independent"
      },
      {
        age: "8-10",
        skill: "writing",
        slug: "8-10-writing-cambridge-activities-for-learners",
        title: "Cambridge English - Activities for Learners (Writing)",
        link: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/?skill=writing",
        format: "site",
        description:
          "Free writing activities that help children write short responses, descriptions, and messages with support.",
        details: {
          type: "Skill activity hub",
          teaches: "Sentence building, short messages, and simple paragraph practice.",
          howTo: [
            "Pick one writing activity at the right level.",
            "Draft the answer once, then improve one thing.",
            "Check punctuation and one target grammar point before finishing."
          ],
          whyTopPick: "Simple, focused tasks that are easy to repeat.",
          freeAccess: "Free Cambridge English activities.",
          ageCheck: "Good fit for 8-10 with support as needed."
        },
        focus: "sentence building, short responses",
        time: "10-12 min",
        level: "caregiver-led or independent"
      },
      {
        age: "8-10",
        skill: "speaking",
        slug: "8-10-speaking-american-english-guess-what",
        title: "American English - Guess What? Mime the Words",
        link: "https://americanenglish.state.gov/resources/guess-what-mime-words",
        format: "site",
        description:
          "A free game-based activity that gets children speaking through actions, clues, and quick guessing turns.",
        details: {
          type: "Speaking game activity",
          teaches: "Action words, clear clues, and quick oral responses.",
          howTo: [
            "Choose a few easy words or actions.",
            "Act one out or give a clue while others guess in English.",
            "Swap roles so every child gets a speaking turn."
          ],
          whyTopPick: "Playful format that lowers speaking pressure.",
          freeAccess: "Free American English resource.",
          ageCheck: "Good fit for 8-10."
        },
        focus: "clues, action words, turn-taking",
        time: "8-10 min",
        level: "caregiver-led or independent"
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
