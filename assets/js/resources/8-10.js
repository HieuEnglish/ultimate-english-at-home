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
          ageCheck:
            "Good for 8–10 (use level filters to avoid books that are too easy/too hard). 🎯"
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
