/* assets/js/resources/4-7.js
   Age 4–7 resource data pack.
   Do NOT host files in repo — only external links.
*/
(function () {
  const DATA = {
    packs: {
      "4-7/reading": {
        title: "4–7 Reading 📚✨🌈",
        overview:
          "A simple 4–7 reading routine built around short daily practice (about 12–18 minutes/day) using one phonics game, one short book, and one reading game, with steady repetition to build confidence and reduce frustration.",
        objectives: [
          "Build early reading foundations: letters, sounds, simple words, and read-aloud books.",
          "Improve reading confidence and fluency through re-reading the same book for 3–5 days.",
          "Strengthen comprehension with simple story reading and leveled practice texts.",
          "Practice decoding using short, skill-based “I can read this” texts (optional)."
        ],
        materials: [
          "Device (tablet/phone/laptop) for reading apps, eBooks, and games.",
          "Core reading sources (choose a few): Khan Academy Kids, Oxford Owl Free eBook Library (free account), Unite for Literacy, PBS KIDS Reading Games.",
          "Optional printing: 1 decodable text (Reading Universe)."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-4-7-reading"
      },

      "4-7/listening": {
        title: "4–7 Listening 🎧🧒✨",
        overview:
          "A short, repeatable listening routine for ages 4–7 that builds understanding through songs, short story videos/read-alouds, and simple listening games. The focus is on hearing key words, following along with pictures, and answering quick comprehension questions in 10–15 minutes a day.",
        objectives: [
          "Understand key words and simple meaning in songs and short stories.",
          "Improve basic comprehension using quick prompts (Who? Where? What? / What happened?).",
          "Practice listening + matching (pointing to pictures, selecting correct answers) to strengthen focus and accuracy."
        ],
        materials: [
          "Device + internet (or offline audio); optional headphones/speaker.",
          "Core routine resources: Dream English MP3 (song), Oxford Owl Storyteller and/or Storyline Online (story listening), MES Games and/or 123Listening (listening practice).",
          "Optional extras (weekend/variety): PBS KIDS Podcasts, Unite for Literacy narrated books."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-4-7-listening"
      },

      "4-7/writing": {
        title: "4–7 Writing ✍️🧒📄",
        overview:
          "A short, low-frustration 4–7 writing routine that builds handwriting confidence through pre-writing lines/curves, letter tracing, simple sentence work, and real-life writing (labels/lists/signs). It uses small daily sessions with lots of repetition.",
        objectives: [
          "Strengthen fine-motor control and pencil control (lines/curves → letters).",
          "Improve letter formation by repeating the same letters across the week.",
          "Build early writing output from words → short sentences (with drawing support).",
          "Practice “real writing” for meaning (labels, lists, simple signs/messages)."
        ],
        materials: [
          "Pencil + crayons/markers, paper (plus optional wide-line paper).",
          "2–3 printable worksheet pages per week (don’t overprint).",
          "Optional digital practice (short only): Khan Academy Kids tracing/creating.",
          "Optional “real writing corner” setup (paper + markers) for lists/labels.",
          "Optional “quick tip” support: Vroom 1 tip/day."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-4-7-writing"
      },

      "4-7/speaking": {
        title: "4–7 Speaking 🗣️✨",
        overview:
          "A short, repeatable 4–7 speaking routine focused on pronunciation, rhythm/chanting, and simple conversation through kid-friendly stories, songs, and speaking games. The goal is high repetition in small daily bursts to build confidence and clearer speech.",
        objectives: [
          "Improve clear pronunciation of target sounds/words through guided repeat-after-me practice.",
          "Build confidence speaking in rhythm and chunks (chants, action songs).",
          "Use simple sentence frames (e.g., “It’s a…” “I see…” “I like…”).",
          "Answer basic speaking prompts (Who/Where/What happened?) and practice short retells.",
          "Talk about emotions with basic language (e.g., “I feel…” “because…”)."
        ],
        materials: [
          "Device + internet (tablet/phone/laptop), optional headphones/speaker.",
          "LearnEnglish Kids (British Council): Speak, Sounds, Grammar Chants, optional Tongue Twisters.",
          "Simple speaking games (Games4ESL / ESL activity bank PDF).",
          "Printable picture cards (10–12 flashcards for the week).",
          "Optional weekend resources: Storyline Online (retell), Sesame Workshop feelings story."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-4-7-speaking"
      }
    },

    // Each resource must have unique slug per age+skill (keep globally unique to be safe).
    resources: [
      // =========================
      // 4–7 READING
      // =========================
      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-khan-academy-kids",
        title: "Khan Academy Kids 🧸📖✨",
        link: "https://www.khanacademy.org/kids",
        format: "app",
        description:
          "Free learning app with books + early reading/phonics activities to build letters, sounds, simple words, and read-aloud habits.",
        details: {
          type: "App (books + phonics/reading activities) 📱🎧📘",
          teaches: "Early reading foundations: letters, sounds, simple words, and read-aloud books. 🔤👂📚",
          howTo: [
            "Open “Books” (or a reading path). 📚➡️",
            "Read 1 short book together (point to words/pictures). 👀👉📖",
            "Re-read the same book for 3–5 days to build speed + confidence. 🔁⭐"
          ],
          whyTopPick: "Strong all-in-one option (books + early reading) for short daily practice. ⭐",
          freeAccess: "Free to use (app install required). 🆓📲",
          ageCheck: "Strong fit for 4–7; caregiver helps keep it calm + focused. 👨‍👩‍👧🧘"
        },
        focus: "books, early reading foundations",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-oxford-owl-free-ebook-library",
        title: "Oxford Owl — FREE eBook Library 🦉📘✨",
        link: "https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/",
        format: "site",
        description:
          "Free early-reader eBooks (login required) that support confidence, fluency, and story comprehension.",
        details: {
          type: "eBooks (early readers) 📚🌟",
          teaches: "Early reading confidence + story comprehension. 🗣️🧠📖",
          howTo: [
            "Create a free parent account and log in. 🔐👨‍👩‍👧",
            "Choose the easiest levels first. 🎯",
            "Do “adult reads 1 page → child reads 1 page” (or echo-read together). 👂➡️📖"
          ],
          whyTopPick: "Trusted publisher with a structured early reading progression. ⭐🏗️",
          freeAccess: "Free, but registration/login required. 🆓🔐",
          ageCheck: "Best fit for 5–7; for 4-year-olds choose the simplest books and read together. 👀🤝"
        },
        focus: "leveled ebooks, fluency",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-unite-for-literacy",
        title: "Unite for Literacy — Free Books Online 🌍📚💛",
        link: "https://www.uniteforliteracy.com/free-books-online/home",
        format: "site",
        description:
          "Digital picture books (often narrated) that support vocabulary, enjoyment, and shared reading routines without sign-up.",
        details: {
          type: "Digital picture books (often narrated) 📖🔊",
          teaches: "Vocabulary + reading enjoyment + optional listen-to-reading support. 🧠💬🎧",
          howTo: [
            "Pick a theme (animals/food/community). 🐶🍎🏘️",
            "Point + read 1–2 pages at a time (keep it easy). 👆📄",
            "Re-read the same book all week for confidence. 🔁🗓️"
          ],
          whyTopPick: "Fast to use: no registration/passwords needed. ⭐⚡",
          freeAccess: "Free to access. 🆓✅",
          ageCheck: "Great for 4–7; caregiver support helps with pacing and attention. 🧑‍🏫⏱️"
        },
        focus: "shared reading, vocabulary",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-british-council-reading-practice",
        title: "British Council — LearnEnglish Kids: Reading Practice 🇬🇧📖🎮",
        link: "https://learnenglishkids.britishcouncil.org/read-write/reading-practice",
        format: "site",
        description:
          "Leveled reading texts with games and printables to support comprehension, vocabulary, and early literacy skills.",
        details: {
          type: "Leveled readings + games + printables 🎯🧩🖨️",
          teaches: "Reading comprehension + vocabulary + simple literacy skills. 🧠📚",
          howTo: [
            "Start at Level 1. 🥇",
            "Do: read → play 1 game → print 1 mini activity (optional). 📖➡️🎮➡️🖨️",
            "Repeat the same text twice in the week. 🔁🗓️"
          ],
          whyTopPick: "Built-in “read + game + print” loop keeps motivation high. ⭐🔄",
          freeAccess: "Free to access/use. 🆓✅",
          ageCheck: "Strong for 5–7; for 4-year-olds use as shared reading. 👨‍👩‍👧📖"
        },
        focus: "leveled practice + games",
        time: "8–12 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-pbs-kids-reading-games",
        title: "PBS KIDS — Reading Games Topic Page 🎮📚⭐",
        link: "https://pbskids.org/games/reading-games",
        format: "site",
        description:
          "Reading and story games that build letter/word skills and comprehension through short, playful practice.",
        details: {
          type: "Reading/story games 🕹️📖",
          teaches: "Letter/word practice + storytelling + comprehension through play. 🔤🎭🧠",
          howTo: [
            "Pick ONE game for the week (don’t bounce around). 1️⃣🗓️",
            "Play 5–7 minutes only. ⏱️✅",
            "After playing, ask: “Who?” “Where?” “What happened?” 👤📍❓"
          ],
          whyTopPick: "Reputable kids platform with many reading-focused games in one place. ⭐🏆",
          freeAccess: "Free to play on the site. 🆓🎮",
          ageCheck: "Good for 4–7; adult support helps avoid over-clicking/overstimulation. 👀🧘"
        },
        focus: "reading games, comprehension prompts",
        time: "5–7 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-reading-bear",
        title: "Reading Bear 🐻🔤🎯",
        link: "https://www.readingbear.org/",
        format: "site",
        description:
          "Phonics practice that moves from letter sounds to blending and early word reading (best in short daily sessions).",
        details: {
          type: "Phonics practice (web) 🧩💻",
          teaches: "Letter sounds → blending → early word reading. 🔤➡️📖",
          howTo: [
            "Do 1 phonics/sound section per day (about 5 minutes). 📅⏱️",
            "Listen → say the sound → read 3 words. 🎧🗣️📖",
            "End by re-reading the easiest words for confidence. ⭐🔁"
          ],
          whyTopPick: "Clear phonics path for short daily decoding practice. ⭐✅",
          freeAccess: "Free to access; optional login may exist for tracking. 🆓🔓",
          ageCheck: "Excellent for 4–7; keep sessions short and positive. ⏱️🙂"
        },
        focus: "phonics, blending",
        time: "5 min",
        level: "independent or caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-teach-your-monster-to-read",
        title: "Teach Your Monster to Read 👾📖🚀",
        link: "https://www.teachyourmonster.org/teachyourmonstertoread",
        format: "game",
        description:
          "Phonics and early reading game that practices blending/segmenting, early sight words, and simple sentences.",
        details: {
          type: "Phonics + early reading game 🎮🔤",
          teaches: "Phonics, blending/segmenting, early sight words, simple sentences. 🧠📚",
          howTo: [
            "Use a laptop/desktop for the web version when possible. 💻✅",
            "Play 5–10 minutes. ⏱️🎯",
            "Repeat the same stage until it feels easy (then move on). 🔁🙂"
          ],
          whyTopPick: "Motivating phonics game with step-by-step progression. ⭐🎮",
          freeAccess: "Website version is accessible; availability can vary by device/platform. 🆓⚠️",
          ageCheck: "Great for 5–7; for 4-year-olds do shorter, guided play. 👀🤝"
        },
        focus: "phonics game, motivation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-sesame-workshop-storybook-example",
        title: "Sesame Workshop — Free Storybooks (read online or print) 🧡📘🖨️",
        link: "https://sesameworkshop.org/resources/elmos-big-feelings/",
        format: "site",
        description:
          "Storybooks that support story language and “talk about the story” moments, often with read-online and printable/download options.",
        details: {
          type: "Storybooks (online + printable) 📖📥",
          teaches: "Story language + vocabulary + discussion prompts. 💬🧠",
          howTo: [
            "Read together 1 page at a time. 👨‍👩‍👧📖",
            "Ask 1 simple question: “How does ___ feel?” 😊😟",
            "Print a favorite for bedtime re-reads (if available). 🌙🔁🖨️"
          ],
          whyTopPick: "Easy to reuse for re-reading and simple comprehension talk. ⭐✅",
          freeAccess: "Free to access on the site; print/download options may vary by item. 🆓📥",
          ageCheck: "Fits 4–7; preview themes if your child is sensitive. 👀❤️"
        },
        focus: "shared story reading, discussion",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-lets-read-asia",
        title: "Let’s Read — Free Digital Library (Asia Foundation) 📚🌏📱",
        link: "https://www.letsreadasia.org/",
        format: "site",
        description:
          "Large free digital library (many languages) that supports early reading habit and vocabulary through short books.",
        details: {
          type: "Digital books + app (many languages) 📱📖",
          teaches: "Early reading habit + vocabulary through lots of short books. 📚💬",
          howTo: [
            "Pick 1 very short book (5–10 pages). 🎯",
            "Re-read it 3 times in the week. 🔁🗓️",
            "Download favorites for offline reading (if using the app). 📲⬇️"
          ],
          whyTopPick: "Big library with short books that are easy to repeat. ⭐🔁",
          freeAccess: "Free to access; offline features depend on platform/app. 🆓⚠️",
          ageCheck: "Great for 4–7; adult chooses the simplest books for younger readers. 👨‍👩‍👧✅"
        },
        focus: "short books, repetition",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-storybooks-canada",
        title: "Storybooks Canada (multilingual + narration) 🇨🇦📖🔊",
        link: "https://www.storybookscanada.ca/",
        format: "site",
        description:
          "Free digital books with audio and multiple languages to support reading confidence, comprehension, and home-language support.",
        details: {
          type: "Free digital books (multiple languages + audio) 🔊📚",
          teaches: "Reading confidence + comprehension (plus home-language support). 🧠🌍",
          howTo: [
            "Choose the easiest level first. 🥇",
            "Read in English first, then replay with narration. 🎧📖",
            "Repeat the same 2 books all week. 🔁2️⃣"
          ],
          whyTopPick: "Audio + multilingual support for smoother practice. ⭐🌍🎧",
          freeAccess: "Free to access and use. 🆓✅",
          ageCheck: "Very good for 5–7; younger kids do shared reading. 👀🤝"
        },
        focus: "leveled stories, audio support",
        time: "8–12 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-topmarks-letters-and-sounds",
        title: "Topmarks — Letters & Sounds (5–7) 🔤🎮🧠",
        link: "https://www.topmarks.co.uk/english-games/5-7-years/letters-and-sounds",
        format: "site",
        description:
          "Quick phonics and letters/sounds mini-games that fit short daily practice.",
        details: {
          type: "Phonics/letters games list 🕹️📋",
          teaches: "Letter-sound work + early word skills via mini-games. 🔤➡️📖",
          howTo: [
            "Pick 1 game that matches what they’re learning (letters/sounds). 🎯✅",
            "Play 5 minutes. ⏱️",
            "Finish by reading 5 words aloud together. 📖🗣️"
          ],
          whyTopPick: "Fast practice that fits common phonics routines. ⭐🏫✨",
          freeAccess: "Free to access/play on the website. 🆓🎮",
          ageCheck: "Best for 5–7; adult helps keep it on-task. 👀✅"
        },
        focus: "phonics mini-games",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-reading-universe-decodable-texts",
        title: "Reading Universe — Free Decodable Texts (by phonics skill) 🧾✅📚",
        link: "https://readinguniverse.org/article/explore-teaching-topics/word-recognition/phonics/decodable-texts-for-each-phonics-skill",
        format: "site",
        description:
          "Skill-by-skill decodable texts (often printable) for quick “I can read this!” decoding practice tied to specific phonics targets.",
        details: {
          type: "Decodable texts (by phonics skill) 🖨️📄",
          teaches: "Decoding practice tied to specific phonics skills (confidence-building). ⭐🔤",
          howTo: [
            "Choose ONE phonics skill (e.g., short a CVC). 1️⃣🎯",
            "Print 1 short decodable (if available) and read it 2–3 times. 🖨️🔁📖",
            "After reading, circle the target sound/words. ✍️⭕"
          ],
          whyTopPick: "Skill-by-skill structure makes progress visible quickly. ⭐📈",
          freeAccess: "Free to access; printing depends on the linked materials. 🆓⚠️🖨️",
          ageCheck: "Perfect for 5–7; for 4-year-olds do echo reading + very short sessions. 👂🤝⏱️"
        },
        focus: "decoding, targeted phonics",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-abcya-reading-games",
        title: "ABCya — Reading & Phonics Games 🎮🔤",
        link: "https://www.abcya.com/grades/prek/reading",
        format: "game",
        description:
          "Fun, colorful phonics and reading games that practice letter sounds, blending, and sight words in short, focused sessions.",
        details: {
          type: "Phonics + reading games 🎮🔤",
          teaches: "Letter sounds, blending, sight words, and reading basics. 🔤➡️📖",
          howTo: [
            "Choose a phonics or reading game. 🎯",
            "Play 5–10 minutes only. ⏱️",
            "Say the sounds/words out loud while playing. 🗣️🔊",
            "Repeat the same game for a week. 🔁📅"
          ],
          whyTopPick: "Engaging games that kids enjoy returning to for practice. ⭐🎮",
          freeAccess: "Free games available (some premium content exists). 🆓⚠️",
          ageCheck: "Great for 4–7; adult helps navigate. 🧒👀"
        },
        focus: "phonics games, sight words",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-room-to-read-literacy-cloud",
        title: "Room to Read — Literacy Cloud 🌍📚",
        link: "https://literacycloud.org/",
        format: "site",
        description:
          "Free digital library of diverse, illustrated storybooks with read-aloud audio and multiple languages.",
        details: {
          type: "Digital storybook library + audio 📚🎧",
          teaches: "Shared reading, early vocabulary, and story comprehension. 📖🧠",
          howTo: [
            "Browse by age/level and pick a short book. 🎯📖",
            "Use the read-aloud audio feature. 🎧",
            "Re-read the same book 3 times across the week. 🔁📅",
            "Ask: 'What was your favorite part?' ❓❤️"
          ],
          whyTopPick: "Beautiful illustrations and strong multilingual support. ⭐🌍",
          freeAccess: "Free to access with account. 🆓🔐",
          ageCheck: "Excellent for 4–7. ✅"
        },
        focus: "digital library, multilingual",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-international-childrens-digital-library",
        title: "International Children's Digital Library 🌐📚🧒",
        link: "http://en.childrenslibrary.org/",
        format: "site",
        description:
          "Free collection of children's books from around the world in many languages; great for shared reading and cultural exposure.",
        details: {
          type: "Digital children's book library 📚🌍",
          teaches: "Reading enjoyment, cultural awareness, and early literacy. 📖❤️",
          howTo: [
            "Search for simple picture books by age. 🔎📖",
            "Read 1–2 short books together. 📖🤝",
            "Point to pictures and name objects. 👉🖼️",
            "Save favorites and re-read later. ❤️🔁"
          ],
          whyTopPick: "Unique global collection not found on other platforms. ⭐🌐",
          freeAccess: "Free to access. 🆓✅",
          ageCheck: "Good for 4–7 with caregiver selection. 🧒👀"
        },
        focus: "global stories, shared reading",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "best-set-recommended-bundle-for-4-7-reading",
        title: "Best “Set” (bundle + simple weekly plan for 4–7 Reading) 🗓️📚✨",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "Goal: 12–18 minutes/day, steady repetition, low frustration. Daily routine: 1 phonics game + 1 short book + 1 reading game, repeating the same choices across the week.",
        bundleItems: [
          "4-7-reading-reading-bear",
          "4-7-reading-teach-your-monster-to-read",
          "4-7-reading-unite-for-literacy",
          "4-7-reading-pbs-kids-reading-games",
          "4-7-reading-oxford-owl-free-ebook-library",
          "4-7-reading-reading-universe-decodable-texts",
          "4-7-reading-lets-read-asia"
        ],
        details: {
          type: "Recommended bundle 🧺",
          teaches: "Phonics + fluency + comprehension through short, repeatable practice. 🔤🔁🧠",
          howTo: [
            "Mon–Fri (12–18 min/day): Phonics game (5–7 min) — Reading Bear OR Teach Your Monster (repeat the SAME choice all week). 🔤⏱️🔁",
            "Mon–Fri: One book (5 min) — Unite for Literacy (pick ONE book and re-read 3–5 days). 📖🔁⭐",
            "Mon–Fri: Reading game (3–5 min) — PBS KIDS Reading Games (pick ONE game all week). 🎮1️⃣🗓️",
            "Optional bedtime (5 min): Oxford Owl eBook (same book for 3 nights). 🦉🌙🔁",
            "Weekend add-on (optional): Reading Universe decodable (print/read 2×) OR Let’s Read (download 2 favorites). 🖨️✅🔁 / 📥📚"
          ],
          whyTopPick: "Repeat the same few items until they feel easy (less frustration, more confidence). ⭐🙂",
          freeAccess: "Uses free resources; some require login/app install; some print/download options vary. 🆓⚠️",
          ageCheck: "Designed for 4–7 with short sessions and caregiver support. 🧒🧑‍🏫"
        },
        focus: "routine, repetition, confidence",
        time: "12–18 min/day",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-storyberries",
        title: "Storyberries — Free 5 Minute Stories 🍓📖",
        link: "https://www.storyberries.com/",
        format: "site",
        description:
          "A large collection of free, short, and engaging stories designed for quick reading sessions and bedtime.",
        details: {
          type: "Digital stories (text + audio) 📱🔊",
          teaches: "Early reading fluency, comprehension, and vocabulary. 📖🧠",
          howTo: [
            "Select '5 Min Stories'. ⏱️",
            "Read one story together, alternating pages if the child is ready. 🤝📖",
            "Discuss the story using simple questions at the end. ❓💬"
          ],
          whyTopPick: "Huge variety of free, high-quality stories filterable by age and length. ⭐📚",
          freeAccess: "Free to read online. 🆓✅",
          ageCheck: "Great for 4-7 shared reading. 👨‍👩‍👧"
        },
        focus: "short stories, shared reading",
        time: "5–10 min",
        level: "caregiver-led"
      },

      // =========================
      // 4–7 LISTENING
      // =========================
      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-british-council-listen-watch",
        title: "LearnEnglish Kids (British Council) — Listen & Watch 🎶📺🇬🇧",
        link: "https://learnenglishkids.britishcouncil.org/listen-watch",
        format: "site",
        description:
          "Songs, short stories, videos, and printable activities that build listening for key words and simple story meaning.",
        details: {
          type: "Songs + short stories + videos + printable activities 🎵📖📺📝",
          teaches: "Listening for key words, rhythms, and simple story meaning. 👂🗝️🥁📚",
          howTo: [
            "Pick 1 song for the week. 🎵📅",
            "Do listen → point → repeat (1–2 target words). 👂👉🔁🗣️",
            "Optional: use one printable follow-up (keep it under 5 minutes). 📝⏱️✅"
          ],
          whyTopPick: "High-quality ESL listening content with built-in follow-ups. ⭐🎯",
          freeAccess: "Free to access/use on the site. 🆓✅",
          ageCheck: "Good for 4–7; adult help recommended for navigation. 🧒👀🧑‍🏫"
        },
        focus: "songs + short listening practice",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-pbs-kids-podcasts",
        title: "PBS KIDS Podcasts 🎙️🐾📻",
        link: "https://pbskids.org/videos/podcasts",
        format: "audio",
        description:
          "Kid-friendly podcast episodes that support listening to short narratives and answering quick comprehension questions.",
        details: {
          type: "Audio podcast episodes 🎧🧒",
          teaches: "Listening to short narratives + “what happened?” comprehension. 👂📖❓",
          howTo: [
            "Choose an episode (start with 5–8 minutes). 🎧⏱️",
            "Pause once to ask: “Who?” “Where?” “What happened?” ⏸️❓👤📍",
            "Replay the same episode later in the week. 🔁📅"
          ],
          whyTopPick: "Screen-light listening with familiar characters. ⭐🎧",
          freeAccess: "Free to stream on PBS KIDS. 🆓📻",
          ageCheck: "Co-listen for best learning and pacing. 🧒👀🤝"
        },
        focus: "podcast listening + comprehension prompts",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-pbs-kids-video-app",
        title: "PBS KIDS Video App 📱🐾📺",
        link: "https://pbskids.org/apps/pbs-kids-video",
        format: "app",
        description:
          "Child-focused streaming app for short episodes/clips that can support listening through stories and show-based vocabulary.",
        details: {
          type: "Streaming app (episodes/clips) 📺🧒🛡️",
          teaches: "Listening through stories, routines, and show-based vocabulary. 👂📚🔁🗣️",
          howTo: [
            "Pick one calm show/series and stick to it for a week. 😌📺📅",
            "Watch 5–10 minutes only. ⏱️🛑",
            "After watching, repeat 3 short phrases together. 🗣️🔁3️⃣"
          ],
          whyTopPick: "Convenient, kid-focused place to find clips/episodes. ⭐",
          freeAccess: "Free to install/use (availability varies by region/app store). 🆓⚠️",
          ageCheck: "Good for 4–7; keep sessions short to avoid overstimulation. 🧒⏱️😌"
        },
        focus: "story listening via clips",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-khan-academy-kids",
        title: "Khan Academy Kids 🐻📚🎧",
        link: "https://www.khanacademy.org/kids",
        format: "app",
        description:
          "Stories and activities that support listening to instructions and story listening with simple echoing routines.",
        details: {
          type: "Free learning app (stories, activities) 📱📖🧩",
          teaches: "Listening to instructions + story listening + early vocabulary. 👂✅📚🗣️",
          howTo: [
            "Use “Books/Stories” for listening time. 📖🎧",
            "Pause each page: child points → adult says the word → child repeats. ⏸️👉🗣️🔁",
            "Stop at 10 minutes. ⏱️🛑"
          ],
          whyTopPick: "High-quality early learning content that’s easy to repeat. ⭐🔁",
          freeAccess: "Free to use (app install required). 🆓📲",
          ageCheck: "Appropriate for kids; 4–7 fits well. 🧒✅"
        },
        focus: "story listening + echo",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-duolingo-abc",
        title: "Duolingo ABC 🔤🦉🎧",
        link: "https://www.duolingo.com/abc",
        format: "app",
        description:
          "Kids literacy app that includes listening to sounds/phonics and following simple instructions.",
        details: {
          type: "Kids literacy app (listening + phonics) 📱🔤👂",
          teaches: "Listening to sounds/phonics + simple instructions and story-style content. 👂🔊✅📖",
          howTo: [
            "Do 1 short lesson. 1️⃣⏱️",
            "Repeat the same lesson the next day (confidence + speed). 🔁📅💪",
            "Say the sounds/words out loud together. 🗣️🔊🤝"
          ],
          whyTopPick: "Very short lessons that fit daily routines. ⭐⏱️",
          freeAccess: "App access varies by platform/region; check your device store. 🆓⚠️",
          ageCheck: "Designed for early learners; good fit for 4–7. 🧒🎒"
        },
        focus: "phonics listening, short lessons",
        time: "3–7 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-oxford-owl-storyteller-videos",
        title: "Oxford Owl — Storyteller Videos 📖🎥🦉",
        link: "https://home.oxfordowl.co.uk/storyteller-videos/",
        format: "video",
        description:
          "Story videos read by storytellers that support listening to story language, sequencing, and repeated phrases.",
        details: {
          type: "Story videos read by storytellers 📺📚",
          teaches: "Listening to story language, sequencing, and repeated phrases. 👂📖🔁",
          howTo: [
            "Choose a story (aim ~10 minutes). 📖⏱️",
            "Pause 2–3 times to ask: “What happened?” ⏸️❓🔁",
            "Rewatch once later in the week. 🔁📅"
          ],
          whyTopPick: "Clear storytelling structure for listening practice. ⭐🏗️",
          freeAccess: "Accessible on the site (availability can change). 🆓⚠️",
          ageCheck: "Good for 4–7 with adult selection. 🧒👀🧑‍🏫"
        },
        focus: "story listening, comprehension pauses",
        time: "7–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-storyline-online",
        title: "Storyline Online (SAG-AFTRA Foundation) 🎬📚👂",
        link: "https://storylineonline.net/",
        format: "video",
        description:
          "Read-aloud book videos that build listening comprehension and recognition of story vocabulary.",
        details: {
          type: "Read-aloud book videos 📺📖",
          teaches: "Listening to natural English + story comprehension + vocabulary. 👂🗣️📚✅",
          howTo: [
            "Pick a familiar topic book. 📖❤️",
            "Watch 5–8 minutes; pause for 2 picture questions. ⏱️⏸️❓2️⃣",
            "Replay the same video later in the week. 🔁📅"
          ],
          whyTopPick: "High-quality read-alouds that work well with pause-and-talk routines. ⭐",
          freeAccess: "Free to access on the official site. 🆓✅",
          ageCheck: "Suitable for 4–7; co-view recommended. 🧒👀🤝"
        },
        focus: "read-aloud listening",
        time: "5–8 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-unite-for-literacy-narration",
        title: "Unite for Literacy — Free Books with Narration 🖼️🔊📚",
        link: "https://www.uniteforliteracy.com/free-books-online/home",
        format: "site",
        description:
          "Narrated picture books that support listening + picture-based vocabulary and quick pointing tasks.",
        details: {
          type: "Digital picture books (many with narration) 📖🖼️🎧",
          teaches: "Listening + picture-based vocabulary + print awareness. 👂🖼️🗣️🔤",
          howTo: [
            "Open 1 short topic book. 1️⃣📖",
            "Listen once; replay and point to 5 target words. 👂🔁👉5️⃣",
            "Repeat the same book all week. 🔁📅"
          ],
          whyTopPick: "Short, simple books with narration support. ⭐🎧",
          freeAccess: "Free to access. 🆓✅",
          ageCheck: "Strong for 4–7; adult chooses the level/topic. 🧒🧑‍🏫🎯"
        },
        focus: "narrated books, pointing",
        time: "5–8 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-dream-english-mp3-downloads",
        title: "Dream English — Free Song MP3 Downloads 🎵⬇️🎧",
        link: "https://www.dreamenglish.com/topicnurseryrhymes",
        format: "download",
        description:
          "Downloadable kids songs for offline listening practice (great for repetition and action language).",
        details: {
          type: "Downloadable kids songs (MP3) 🎶⬇️",
          teaches: "Listening through repetition + action language. 👂🔁🕺",
          howTo: [
            "Download 3–5 songs for offline use. ⬇️3️⃣–5️⃣📱",
            "Play audio-only during play/clean-up. 🎧🧸🧹",
            "Add 1 action per key word (jump/stop/clap). 🕺✋👏"
          ],
          whyTopPick: "Offline audio reduces autoplay/ads risk. ⭐🚫📺",
          freeAccess: "Page offers downloads (availability can vary). 🆓⚠️⬇️",
          ageCheck: "Great for 4–7 with movement. 🧒🕺✅"
        },
        focus: "songs, repetition, movement",
        time: "3–5 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-123listening",
        title: "123 Listening — Listening Tests + Worksheets 📝🔊👂",
        link: "https://www.123listening.com/",
        format: "site",
        description:
          "Theme-based listening tasks with matching/worksheets (ESL style) for identifying specific words.",
        details: {
          type: "Listening exercises + printable worksheets 🎧📝",
          teaches: "Listening for specific words (colors, animals, food, classroom vocab). 👂🗝️🎨🐶🍎",
          howTo: [
            "Pick a theme (animals/food/house). 🐶🍎🏠",
            "Listen once; child points to pictures. 👂👉🖼️",
            "Do the matching worksheet (keep it under 5 minutes). 📝⏱️✅"
          ],
          whyTopPick: "Ready-made ESL listening practice with matching tasks. ⭐🧩",
          freeAccess: "Free to access; printing/download depends on item. 🆓⚠️",
          ageCheck: "Strong for 5–7; age 4 is best fully caregiver-led. 🧒🧑‍🏫"
        },
        focus: "listening + matching",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-mes-games",
        title: "MES Games — Listening Activities 🎮👂🧒",
        link: "https://www.mes-games.com/",
        format: "site",
        description:
          "Simple ESL game formats that practice listening + vocabulary matching.",
        details: {
          type: "Online ESL games (includes listening activities) 🎮🎧",
          teaches: "Listening + vocabulary matching through simple game formats. 👂🗣️🧩",
          howTo: [
            "Choose a vocabulary set. 🎯📚",
            "Turn volume on; do 1–2 games only. 🔊1️⃣–2️⃣🎮",
            "Repeat the same set for a week. 🔁📅"
          ],
          whyTopPick: "Quick, low-prep listening practice. ⭐⚡",
          freeAccess: "Free to access; site experience can vary by device/browser. 🆓⚠️",
          ageCheck: "Use with adult supervision (web navigation/ads vary). 🧒👀⚠️"
        },
        focus: "listening games, matching",
        time: "3–7 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-games-to-learn-english",
        title: "Games to Learn English — “Listen and Click” Style Games 🖱️🔊🎮",
        link: "https://www.gamestolearnenglish.com/",
        format: "site",
        description:
          "Simple web games where children listen for a word and click the matching picture.",
        details: {
          type: "Free web games 🎮",
          teaches: "Listening for words and selecting the matching picture. 👂🗣️👉🖼️",
          howTo: [
            "Choose a simple set. 🎯✅",
            "Do 5 correct answers then stop (keep it fun). ✅5️⃣🛑🎉",
            "Re-do the same set next day. 🔁📅"
          ],
          whyTopPick: "Very simple mechanics that fit young learners. ⭐🧒",
          freeAccess: "Free to access (site experience can vary). 🆓⚠️",
          ageCheck: "Adult supervision recommended (general web). 🧑‍🏫👀⚠️"
        },
        focus: "listen + click matching",
        time: "3–5 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-fun-kids-podcasts",
        title: "Fun Kids Podcasts (UK) 🎧🇬🇧🧒",
        link: "https://www.funkidslive.com/podcasts/",
        format: "podcast",
        description:
          "Kids podcast hub (free episodes available) for extra listening variety and short comprehension talk.",
        details: {
          type: "Kids podcast hub 🎙️",
          teaches: "Listening to short episodes + general comprehension. 👂📖✅",
          howTo: [
            "Pick a show and play 5–10 minutes. 🎧⏱️",
            "Ask 2 questions: “What was the best part?” “What did you learn?” ❓2️⃣⭐📚",
            "Replay favorite episodes. 🔁❤️"
          ],
          whyTopPick: "Large catalog for variety (good as a weekend option). ⭐🎧",
          freeAccess: "Free episodes available; site may promote upgrades. 🆓⚠️",
          ageCheck: "Preview topics for age 4; otherwise good for 4–7. 🧒👀✅"
        },
        focus: "podcasts, comprehension",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-sesame-street-official-videos",
        title: "Sesame Street — Official Videos 🌈📺🎵",
        link: "https://www.sesamestreet.org/videos",
        format: "video",
        description:
          "Songs and clips that support listening to everyday words, feelings, routines, and simple songs.",
        details: {
          type: "Songs/clips 🎶🎬",
          teaches: "Everyday words, feelings, routines, and repeatable phrases. 👂🗣️😊🔁",
          howTo: [
            "Choose 1 song clip. 1️⃣🎵",
            "Pause to repeat 3 key words. ⏸️🗣️3️⃣",
            "Rewatch the same clip tomorrow. 🔁📅"
          ],
          whyTopPick: "Very engaging with clear language and music. ⭐🎶✅",
          freeAccess: "Free to watch on the official page. 🆓📺",
          ageCheck: "Good for 4–7; co-view recommended. 🧒👀🤝"
        },
        focus: "songs, repeated phrases",
        time: "5–8 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-youtube-supervised-options",
        title: "YouTube Channels (Supervised options) 📺⚠️👀",
        link: "https://www.youtube.com/",
        format: "video",
        description:
          "Optional: use supervised mode/curated playlists for repeatable clips (avoid autoplay).",
        details: {
          type: "Video listening (supervised) 🎧📺",
          teaches: "Song/story listening with repeatable clips. 🎶📖🔁",
          howTo: [
            "Use supervised mode / curated playlists only. 👀✅📜",
            "Turn off autoplay where possible. 🛑▶️",
            "Keep to 5–10 minutes max. ⏱️✅"
          ],
          whyTopPick: "Easy access on almost any device (when supervised carefully). ⭐📱💻",
          freeAccess: "Free to watch (platform policies/ads vary). 🆓⚠️",
          ageCheck: "Requires active parent settings/monitoring. 👶⚙️👀",
          otherLinks: [
            "https://www.youtube.com/sesamestreet",
            "https://www.youtube.com/storylineonline"
          ]
        },
        focus: "optional supervised listening",
        time: "5–10 min",
        level: "supervised"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "best-set-recommended-bundle-for-4-7-listening",
        title: "Best “Set” (recommended bundle for 4–7 Listening) 🗂️✅✨",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "Goal: 10–15 minutes/day, repeatable, low-prep. Daily routine: one offline song, one story listen (video/read-aloud), and one short listening game. Weekend: one podcast or narrated book repeat.",
        bundleItems: [
          "4-7-listening-dream-english-mp3-downloads",
          "4-7-listening-oxford-owl-storyteller-videos",
          "4-7-listening-storyline-online",
          "4-7-listening-mes-games",
          "4-7-listening-123listening",
          "4-7-listening-pbs-kids-podcasts",
          "4-7-listening-unite-for-literacy-narration"
        ],
        details: {
          type: "Recommended bundle 🧺",
          teaches: "Key-word listening + story comprehension + listening-to-match accuracy through repetition. 👂🗝️📖✅",
          howTo: [
            "Mon–Fri (10–15 min/day): Song (3 min) — Dream English MP3 (download 1–2 songs; repeat all week). 🎵⬇️🔁",
            "Mon–Fri: Story listening (7–10 min) — Oxford Owl Storyteller OR Storyline Online (pause 2–3× for “Who/Where/What happened?”). 📖⏸️❓",
            "Mon–Fri: Listening game (3–5 min) — MES Games OR 123Listening (one theme all week). 🎮📝🔁",
            "Weekend (pick 1): PBS KIDS Podcast (5–10 min) OR Unite for Literacy narrated book (repeat a favorite). 🎙️📚🔊🔁"
          ],
          whyTopPick: "Very repeatable structure: same song + same story + same theme game all week. ⭐🔁",
          freeAccess: "Uses free resources; some are apps; web experiences can vary by device/region. 🆓⚠️",
          ageCheck: "Designed for 4–7 with short sessions and caregiver support. 🧒🧑‍🏫"
        },
        focus: "routine, repetition, comprehension",
        time: "10–15 min/day",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-julies-library",
        title: "Julie's Library (Podcast) 🎙️📚",
        link: "https://www.julieslibraryshow.org/",
        format: "podcast",
        description:
          "Julie Andrews and her daughter read their favorite children's books, offering wonderful storytelling and rich language listening.",
        details: {
          type: "Storytelling podcast 🎧🎙️",
          teaches: "Listening comprehension, expressive reading, and story structure. 👂🎭📖",
          howTo: [
            "Pick a short episode. 🎧",
            "Listen together in the car or during quiet time. 🚗😌",
            "Ask your child to draw their favorite part while listening. 🖍️👂"
          ],
          whyTopPick: "Beautifully narrated stories that instantly engage young listeners. ⭐✨",
          freeAccess: "Free to stream on the site or via podcast apps. 🆓📱",
          ageCheck: "Perfect for ages 4-7. 🧒"
        },
        focus: "story listening, rich vocabulary",
        time: "10-20 min",
        level: "caregiver-led"
      },

      // =========================
      // 4–7 WRITING
      // =========================
      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-khan-academy-kids",
        title: "Khan Academy Kids 🐻✏️",
        link: "https://www.khanacademy.org/kids",
        format: "app",
        description:
          "Free learning app with tracing/drawing/early writing activities to build letter tracing and fine-motor confidence.",
        details: {
          type: "Free learning app (tracing, drawing, early writing) 📱",
          teaches: "Letter tracing, early spelling/writing tasks, fine-motor confidence. ✍️🔤💪",
          howTo: [
            "Open Create / tracing activities. ✍️",
            "Do 5 minutes max (stop while it’s fun). ⏱️",
            "Repeat the same letters for a whole week. 🔁"
          ],
          whyTopPick: "Consistent, kid-friendly writing practice inside a structured app. 🌟",
          freeAccess: "Free to access/use (app install required). ✅🆓📲",
          ageCheck: "Great fit for 4–7; adult sets boundaries for screen time. 👀🧑‍🧒"
        },
        focus: "digital tracing, fine motor",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-british-council-writing",
        title: "LearnEnglish Kids (British Council) — Writing practice 🧩📝",
        link: "https://learnenglishkids.britishcouncil.org/skills/writing",
        format: "site",
        description:
          "Online practice and printable-style activities for ESL-friendly writing (words → short sentences).",
        details: {
          type: "Online practice + printable-style activities 🌐",
          teaches: "Simple writing tasks for young learners (words → short sentences). ✍️➡️📝",
          howTo: [
            "Pick 1 easy topic (e.g., “about me”). 👤",
            "Do 1 activity, then copy 3–5 words onto paper. ✍️3️⃣–5️⃣",
            "Reuse the same topic 2–3 times that week. 🔁"
          ],
          whyTopPick: "Purpose-built for young English learners. 🎯",
          freeAccess: "Free to use on the site. ✅🆓",
          ageCheck: "4–7 appropriate; caregiver support for navigation/typing. 🧑‍🧒👀"
        },
        focus: "ESL writing, short outputs",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-worksheetfun-alphabet-printable",
        title: "WorksheetFun — Alphabet tracing / handwriting printables 🔤🖍️",
        link: "https://www.worksheetfun.com/tag/alphabet-printable/",
        format: "printable",
        description:
          "Printable tracing and handwriting worksheets to practice letter formation (trace → write).",
        details: {
          type: "Printable tracing/handwriting worksheets 🧾",
          teaches: "Letter formation practice (trace → write). 🔤✍️",
          howTo: [
            "Print 2–3 pages only. 🖨️",
            "Trace once, then write the same letter 3 times. ✍️3️⃣",
            "Circle the “best one.” ⭐"
          ],
          whyTopPick: "Lots of simple, repeatable tracing sheets. 🔁",
          freeAccess: "Free to access/print (site experience can vary). ✅🆓⚠️",
          ageCheck: "Good for 4–7; supervise due to ads/links common on free worksheet sites. 👀⚠️"
        },
        focus: "letter tracing",
        time: "4–6 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-superstar-worksheets",
        title: "Superstar Worksheets — Free writing/sentence worksheets 🧠✍️",
        link: "https://superstarworksheets.com/",
        format: "printable",
        description:
          "Printable worksheets for handwriting and early sentence writing (often includes draw + write formats).",
        details: {
          type: "Printable worksheets (handwriting, sentences, draw + write) 🧾",
          teaches: "Early sentence writing + handwriting practice. 📝✍️",
          howTo: [
            "Choose 1 worksheet (don’t binge-print). 🖨️",
            "Do “trace → write → draw.” 🎨✍️",
            "Read the sentence aloud at the end. 🗣️"
          ],
          whyTopPick: "Clear, classroom-style worksheets with direct PDFs. ✅",
          freeAccess: "Free printable PDFs are accessible (site content varies). ✅🆓⚠️",
          ageCheck: "Great for 5–7; 4-year-olds do “draw + label” with adult help. 🧒🧑‍🧒"
        },
        focus: "sentences, draw + write",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-kidzone-prewriting",
        title: "KidZone — Pre-writing / tracing practice 🌀✋",
        link: "https://www.kidzone.ws/prek_wrksht/",
        format: "printable",
        description:
          "Printable pre-writing sheets for pencil control patterns (lines, curves, shapes) before letters.",
        details: {
          type: "Printable pre-writing worksheets 🧾",
          teaches: "Pencil control (lines, curves, shapes) → readiness for letters. ➖➰➡️🔤",
          howTo: [
            "Pick 1 pattern page (lines or curves). ➖➰",
            "Trace slowly with a chunky pencil. ✏️",
            "Do 3 minutes, then stop. ⏱️"
          ],
          whyTopPick: "Strong “before letters” skill-building for young kids. 💪",
          freeAccess: "Free to access/print. ✅🆓",
          ageCheck: "Very suitable for 4–6; adult supervision recommended. 👀🧑‍🧒"
        },
        focus: "pre-writing patterns",
        time: "3 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-dltk-kids",
        title: "DLTK — Printable writing paper / handwriting supports 📄✍️",
        link: "https://www.dltk-kids.com/",
        format: "printable",
        description:
          "Printable writing paper and early writing tools (including wide-line options) to help spacing and first sentences.",
        details: {
          type: "Printable writing paper / early writing tools 🧾",
          teaches: "Better spacing and line use (useful for first sentences). 📏",
          howTo: [
            "Print wide-line paper. 📄",
            "Write 1 short sentence (“I like cats.”). ✍️",
            "Add 1 picture that matches. 🐱🎨"
          ],
          whyTopPick: "Quick way to make writing feel structured at home. 🏫✨",
          freeAccess: "Free site access (ad-supported; content varies). ✅🆓⚠️",
          ageCheck: "4–7 appropriate; supervise browsing/ads. 👀⚠️"
        },
        focus: "wide-line paper, spacing",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-pbs-parents",
        title: "PBS Parents — Home writing ideas 👨‍👩‍👧‍👦📝",
        link: "https://www.pbs.org/parents/",
        format: "site",
        description:
          "Parent-friendly ideas that support writing development through real routines (labels, lists, messages).",
        details: {
          type: "Parent-friendly activity ideas 🌐",
          teaches: "Age-appropriate writing development + simple at-home routines. 🏠✍️",
          howTo: [
            "Pick 1 idea (labels, lists, messages). 🏷️🛒💬",
            "Do it during a real routine (snack / toys). 🍎🧸",
            "Keep it short and positive. 😊"
          ],
          whyTopPick: "Practical, low-prep routines for families. ✅",
          freeAccess: "Free to access. ✅🆓",
          ageCheck: "Adult-led content; safe and appropriate with guidance. 🧑‍🧒"
        },
        focus: "real-life writing routines",
        time: "2–5 min",
        level: "parent tips"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-naeyc-support-writing-home",
        title: "NAEYC — Support Writing at Home 🏠✍️",
        link: "https://www.naeyc.org/our-work/families/support-writing-home",
        format: "site",
        description:
          "Family guidance that encourages “real writing” through play (notes, lists, signs, pretend writing).",
        details: {
          type: "Family guidance + activity ideas 📄",
          teaches: "Real writing through play (notes, lists, signs, pretend). 📝🛒🏷️",
          howTo: [
            "Set up a “writing corner” (paper + markers). 🖍️📄",
            "Model 1 real task (“shopping list”). 🛒",
            "Let the child copy/try their version. ✍️"
          ],
          whyTopPick: "Developmentally realistic early-childhood approach. 🌟",
          freeAccess: "Free webpage. ✅🆓",
          ageCheck: "Great for 4–7; adult guidance recommended. 👀🧑‍🧒"
        },
        focus: "writing corner, real tasks",
        time: "2–5 min",
        level: "parent tips"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-national-literacy-trust-free-resources",
        title: "National Literacy Trust — Free resources 📚📝",
        link: "https://literacytrust.org.uk/free-resources/",
        format: "site",
        description:
          "Free family-friendly packs and activities (varies by topic) that can include labels, captions, and simple sentence writing.",
        details: {
          type: "Free activity packs/resources (varies by topic) 🧾",
          teaches: "Early literacy activities that can include writing tasks (labels, captions, simple sentences). 🏷️📝",
          howTo: [
            "Choose 1 short activity. 🧩",
            "Do it 10 minutes max. ⏱️",
            "Repeat weekly with a new theme. 🔁"
          ],
          whyTopPick: "Reputable literacy organization with family-friendly materials. ✅",
          freeAccess: "Free downloads/resources available. ✅🆓⬇️",
          ageCheck: "Suitable for children; adult-led selection. 🧑‍🧒👀"
        },
        focus: "family resources, writing activities",
        time: "10 min",
        level: "parent tips"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-vroom-mobile",
        title: "Vroom — Quick daily “brain building” tips 🧠✨",
        link: "https://www.vroom.org/mobile",
        format: "site",
        description:
          "Micro-activities that support fine-motor and routine habits that help writing (short daily tips).",
        details: {
          type: "Micro-activities (site/app tips) 📱",
          teaches: "Fine-motor + routine habits that support writing readiness. ✍️💪🔁",
          howTo: [
            "Pick 1 tip/day. 🗓️",
            "Do it during routine time (getting dressed, meals). 👕🍽️",
            "Repeat favorites all week. 🔁"
          ],
          whyTopPick: "Extremely low prep—easy to sustain. ✅",
          freeAccess: "Free to access. ✅🆓",
          ageCheck: "Strong for 4–7 with caregiver-led routines. 🧑‍🧒"
        },
        focus: "quick tips, fine motor",
        time: "2 min",
        level: "parent tips"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-readwritethink-postcard-creator",
        title: "ReadWriteThink — Postcard Creator 📨✍️",
        link: "https://www.readwritethink.org/classroom-resources/student-interactives/postcard-creator",
        format: "interactive",
        description:
          "Interactive tool for writing short real-world messages (greeting, message, closing) and printing/saving.",
        details: {
          type: "Interactive writing tool (type + print) 💻🖨️",
          teaches: "Short message writing: greeting, message, closing. 📨📝",
          howTo: [
            "Write 1–2 short sentences (“Hi… I like…”). ✍️",
            "Add a simple picture. 🖼️",
            "Print or screenshot to keep. 📄"
          ],
          whyTopPick: "Real-world writing in a fun format. 🌟",
          freeAccess: "Free to use. ✅🆓",
          ageCheck: "Best for 6–7; 4–5 need adult typing help. 🧑‍🧒⌨️"
        },
        focus: "short messages, real writing",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-kindergartenworksheetsandgames-sentence-cut-paste",
        title: "Simple sentence cut-and-paste (free printable) ✂️🧩✍️",
        link: "https://www.kindergartenworksheetsandgames.com/farm-sentences-worksheets/",
        format: "printable",
        description:
          "Cut-and-paste sentence building that supports word order and copying a full sentence neatly.",
        details: {
          type: "Printable sentence-building worksheet (cut → order → write) 🧾",
          teaches: "Word order + copying a full sentence neatly. 🧩➡️✍️",
          howTo: [
            "Cut out words. ✂️",
            "Put them in order. 🧩",
            "Copy the full sentence onto lines. ✍️"
          ],
          whyTopPick: "Clear bridge from single words to full sentences. 🌉",
          freeAccess: "Free printable link provided on the page (site experience can vary). ✅🆓⚠️",
          ageCheck: "Great for 5–7; adult supervision recommended (scissors + ads/links). 👀⚠️"
        },
        focus: "sentence building, handwriting",
        time: "10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-ict-games-handwriting",
        title: "ICT Games — Handwriting & Letter Formation ✍️🔤",
        link: "https://www.ictgames.com/mobilePage/literacy.html",
        format: "game",
        description:
          "Free online handwriting and literacy games that help young learners practice letter formation and early writing skills.",
        details: {
          type: "Handwriting + letter games 🎮✍️",
          teaches: "Letter formation, pencil control (digital), and early writing confidence. 🔤✍️",
          howTo: [
            "Choose a letter formation or writing game. 🎯",
            "Trace letters on screen (or on paper alongside). 💻✍️",
            "Practice the same 3–5 letters all week. 🔁3️⃣–️5️⃣",
            "Keep sessions short (5–7 minutes). ⏱️✅"
          ],
          whyTopPick: "Playful approach to handwriting that keeps kids motivated. ⭐🎮",
          freeAccess: "Free to play on the site. 🆓✅",
          ageCheck: "Great for 4–7. ✅"
        },
        focus: "handwriting, letter formation",
        time: "5–7 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-topmarks-writing-games",
        title: "Topmarks — Writing & Spelling Games (5–7) 🔤🎮",
        link: "https://www.topmarks.co.uk/english-games/5-7-years/writing-and-spelling",
        format: "game",
        description:
          "Quick spelling and writing mini-games that fit naturally into short daily writing practice routines.",
        details: {
          type: "Spelling + writing games 🎮✍️",
          teaches: "Spelling patterns, word building, and early writing skills. 🔤🧩",
          howTo: [
            "Pick 1 game that matches what they're learning. 🎯",
            "Play 5 minutes. ⏱️",
            "Write 3 words on paper after playing. ✍️3️⃣",
            "Repeat the same game all week. 🔁📅"
          ],
          whyTopPick: "Quick, focused games that match common phonics routines. ⭐⚡",
          freeAccess: "Free to play on the site. 🆓✅",
          ageCheck: "Best for 5–7; younger kids need caregiver help. 🧒🤝"
        },
        focus: "spelling games, word building",
        time: "5–7 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-starfall-write-a-word",
        title: "Starfall — Write-a-Word Activities ⭐✍️",
        link: "https://www.starfall.com/h/index-kindergarten.php",
        format: "site",
        description:
          "Free interactive writing and phonics activities where kids build words, trace letters, and practice early sentence skills.",
        details: {
          type: "Interactive word-building + writing 💻✍️",
          teaches: "Word construction, letter-sound connections, and early sentence writing. 🔤➡️📝",
          howTo: [
            "Start with the 'Learn to Read' writing activities. 📖✍️",
            "Build 5–10 words by clicking letters/sounds. 🔤🔟",
            "Write the words on paper afterward. ✍️📝",
            "Keep sessions under 10 minutes. ⏱️✅"
          ],
          whyTopPick: "Ad-free environment with clear phonics-to-writing progression. ⭐🛡️",
          freeAccess: "Free sections available without login. 🆓✅",
          ageCheck: "Perfect for 4–7 with caregiver support. 🧒🤝"
        },
        focus: "word building, phonics writing",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "best-set-recommended-bundle-for-4-7-writing",
        title: "Best “Set” (bundle + simple weekly plan for 4–7 Writing) 🗓️✍️",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "Goal: 10–15 minutes/day, lots of repetition, low frustration. Daily: warm-up patterns → letter practice → sentence/draw → real-life writing. Weekend: one fun message task + one parent micro-upgrade.",
        bundleItems: [
          "4-7-writing-kidzone-prewriting",
          "4-7-writing-worksheetfun-alphabet-printable",
          "4-7-writing-superstar-worksheets",
          "4-7-writing-naeyc-support-writing-home",
          "4-7-writing-readwritethink-postcard-creator",
          "4-7-writing-pbs-parents",
          "4-7-writing-vroom-mobile"
        ],
        details: {
          type: "Recommended bundle 🧺",
          teaches: "Handwriting confidence via patterns → letters → short sentences + meaningful writing. ➖➰➡️🔤➡️📝",
          howTo: [
            "Mon–Fri: Warm-up (3 min) — KidZone pre-writing lines/curves. ➖➰⏱️",
            "Mon–Fri: Letters (4 min) — WorksheetFun tracing (same 3 letters all week). 🔤✍️🔁",
            "Mon–Fri: Sentence (5 min) — Superstar Worksheets “trace/write + draw”; read aloud at end. 🧾🎨🗣️",
            "Mon–Fri: Real-life writing (2 min) — NAEYC idea (labels/list/sign: “TOYS”, “MILK”). 🏷️🛒",
            "Weekend: Fun digital task (5–10 min) — ReadWriteThink Postcard Creator (thank you / hello message). 📨✨",
            "Weekend: Parent micro-upgrade (2 min) — PBS Parents idea → apply immediately. 👨‍👩‍👧‍👦📝"
          ],
          whyTopPick: "Short blocks + repetition keeps handwriting practice calm and sustainable. ⭐🙂",
          freeAccess: "Uses free resources; some worksheet sites may be ad-supported; print selectively. 🆓⚠️",
          ageCheck: "Designed for 4–7 with caregiver support and short sessions. 🧒🧑‍🏫"
        },
        focus: "handwriting, sentences, real writing",
        time: "10–15 min/day",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-pobble-365",
        title: "Pobble 365 — Daily Picture Prompts 🖼️✍️",
        link: "https://pobble365.com/",
        format: "site",
        description:
          "Provides a stunning new image every day with simple sentence-starter prompts to inspire short writing practice.",
        details: {
          type: "Visual writing prompts 🖼️📝",
          teaches: "Creative thinking, sentence construction, and descriptive writing. 🧠✍️",
          howTo: [
            "Look at today's picture together. 👀",
            "Talk about what you see using the prompting questions. 🗣️❓",
            "Write 1-2 simple sentences describing the picture. 📝✍️"
          ],
          whyTopPick: "Incredible visuals that naturally prompt kids to talk and write. ⭐🖼️",
          freeAccess: "Free daily image and prompts. 🆓✅",
          ageCheck: "Best for 5-7; for 4-year-olds, do oral storytelling instead of writing. 🗣️🧒"
        },
        focus: "sentence writing, creative prompts",
        time: "5-10 min",
        level: "caregiver-led"
      },

      // =========================
      // 4–7 SPEAKING (new)
      // =========================
      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-british-council-speak",
        title: "LearnEnglish Kids (British Council) — Speak 🚀🧩",
        link: "https://learnenglishkids.britishcouncil.org/speak-spell/speak",
        format: "site",
        description:
          "Kid-focused speaking practice with stories, pronunciation activities, and simple games/printables.",
        details: {
          type: "Stories + pronunciation practice + games/printables 📖🗣️🧩",
          teaches: "Saying English sounds/words clearly (guided speaking practice). 👄✅",
          howTo: [
            "Pick 1 short “Sam & Pam” story. 🎬",
            "Pause → repeat the target sound/word together. ⏸️👄🔁",
            "Do 1 quick game/printable after (optional). ✅"
          ],
          whyTopPick: "Built specifically for kids’ pronunciation practice. ⭐",
          freeAccess: "Free to access/use; login only needed for optional site features. 🆓🔓",
          ageCheck: "Great for 4–7 with adult support for pacing. 👨‍👩‍👧‍👦"
        },
        focus: "pronunciation, repeat-after-me",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-british-council-sounds",
        title: "LearnEnglish Kids (British Council) — Sounds (action songs) 🎶👣",
        link: "https://learnenglishkids.britishcouncil.org/speak-spell/sounds",
        format: "site",
        description:
          "Action songs and sound practice that build speaking through echoing short lines and repeating sound patterns.",
        details: {
          type: "Action songs + games/printables 🎶🧩🖨️",
          teaches: "Speaking through sing-along + repeating sound patterns. 🎤🔁",
          howTo: [
            "Play 1 song (keep it short). ⏱️",
            "Listen once → echo one line. 👂➡️🗣️",
            "Add actions for meaning (TPR). 🤸"
          ],
          whyTopPick: "Easy “copy me” speaking for young learners. ⭐",
          freeAccess: "Free to access/use. 🆓✅",
          ageCheck: "Very suitable for 4–7 (high energy). ⚡"
        },
        focus: "echo speaking, action songs",
        time: "3–7 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-british-council-grammar-chants",
        title: "LearnEnglish Kids (British Council) — Grammar chants 🎤📣",
        link: "https://learnenglishkids.britishcouncil.org/grammar-vocabulary/grammar-chants",
        format: "site",
        description:
          "Chants that build speaking confidence through rhythm and repeatable chunks (questions/answers).",
        details: {
          type: "Chants + games/printables 🎤🧩🖨️",
          teaches: "Speaking in rhythm (natural chunks like questions/answers). 👄🎵",
          howTo: [
            "Play 1 chant. 🎧",
            "Clap the beat. 👏",
            "Repeat the same chant daily for a week. 📅🔁"
          ],
          whyTopPick: "Chunks + rhythm = fast confidence boost. ⭐",
          freeAccess: "Free to access/use. 🆓✅",
          ageCheck: "Best for 5–7; simplify for 4s (shorter repeats). 👶➡️🧒"
        },
        focus: "rhythm, chunks",
        time: "2–5 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-british-council-tongue-twisters",
        title: "LearnEnglish Kids (British Council) — Tongue twisters 😛⚡",
        link: "https://learnenglishkids.britishcouncil.org/fun-games/tongue-twisters",
        format: "site",
        description:
          "Fun pronunciation practice that builds clear sounds and mouth movement without worksheets.",
        details: {
          type: "Pronunciation practice (speaking) 🗣️",
          teaches: "Clear sounds, mouth movement, speed control. 👄🎯",
          howTo: [
            "Pick 1 easy twister. 🧩",
            "Say it slow → medium → fast. 🐢➡️🐇",
            "Make it a “best try” game (no pressure). 🏆"
          ],
          whyTopPick: "Fun pronunciation practice that feels like a game. ⭐",
          freeAccess: "Free to access/use. 🆓✅",
          ageCheck: "Works best 6–7; choose the simplest for 4–5. 🎯"
        },
        focus: "pronunciation, mouth movement",
        time: "2–4 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-british-council-fun-games",
        title: "LearnEnglish Kids (British Council) — Fun & games hub 🎲😄",
        link: "https://learnenglishkids.britishcouncil.org/fun-games",
        format: "site",
        description:
          "A hub of kid-friendly activities (games/jokes) that can be used for simple speaking performance and repeatable lines.",
        details: {
          type: "Games + jokes (speaking-friendly options) 🎲😄",
          teaches: "Speaking for fun: repeating lines, telling jokes, simple performance. 🎭🗣️",
          howTo: [
            "Choose 1 “tell it to a friend” joke. 😄",
            "Practice together (you model first). 🪞",
            "Child performs for family/class. 🎭"
          ],
          whyTopPick: "Turns speaking into play (lower anxiety). ⭐",
          freeAccess: "Free to access/use. 🆓✅",
          ageCheck: "Preview content and help with meaning for younger kids. 👀"
        },
        focus: "performance speaking, confidence",
        time: "5–8 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-teachingenglish-kids-and-speaking",
        title: "TeachingEnglish (British Council) — Kids and speaking ideas 🧑‍🏫🗣️",
        link: "https://www.teachingenglish.org.uk/professional-development/teachers/knowing-subject/kids-and-speaking",
        format: "site",
        description:
          "Practical activity ideas for running short, playful speaking practice with kids.",
        details: {
          type: "Activity ideas/lesson guidance 📄",
          teaches: "Speaking practice structures (routines, prompts, pairwork-style ideas). 🗣️✅",
          howTo: [
            "Pick 1 activity idea. ✅",
            "Run it 5–10 minutes. ⏱️",
            "Repeat weekly with new vocab. 🔁"
          ],
          whyTopPick: "Very practical “do-this-tomorrow” speaking ideas. ⭐",
          freeAccess: "Free webpage. 🆓✅",
          ageCheck: "Choose the most playful/short activities for 4–7. 🎈"
        },
        focus: "teacher/parent speaking routines",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-games4esl-kindergarten-games",
        title: "Games4ESL — Kindergarten ESL games (speaking-heavy) 🎮🧒",
        link: "https://games4esl.com/esl-kindergarten-games/",
        format: "site",
        description:
          "Fast, low-prep speaking games (e.g., Simon Says, What’s missing, I Spy) that create lots of repetition.",
        details: {
          type: "Speaking games list 🎲🗣️",
          teaches: "Speaking through commands, guessing, and Q&A patterns. 🗣️❓✅",
          howTo: [
            "Pick 1 game (no prep). ✅",
            "Use 6–10 target words. 🧠",
            "Play 8 minutes, stop while it’s fun. ⏱️🛑🙂"
          ],
          whyTopPick: "Quick repetitions with simple rules (great for daily speaking bursts). ⭐",
          freeAccess: "Free to read/use. 🆓✅",
          ageCheck: "Great for 4–7; adult leads the rules. 👨‍👩‍👧‍👦"
        },
        focus: "speaking games, repetition",
        time: "5–8 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-esl-game-activity-book-pdf",
        title: "Game and Activity book (PDF) — ESL speaking games 📘🗣️",
        link: "https://fredpoole.github.io/eslMaterial/Game%20and%20Activity%20book.pdf",
        format: "download",
        description:
          "Downloadable PDF with a large bank of ESL games, including many suitable for ages 4–8 (e.g., I spy).",
        details: {
          type: "Downloadable PDF (game instructions) 📄⬇️",
          teaches: "Speaking via classic games and repeatable prompts. 🗣️🔁",
          howTo: [
            "Search inside the PDF for “Age: 4–8”. 🔎",
            "Pick 1 game (e.g., “I spy…”). 👀",
            "Reuse the same game all week with new vocab. 🔁"
          ],
          whyTopPick: "One download = months of speaking game ideas. ⭐📘",
          freeAccess: "Free to download (hosted externally). 🆓⬇️",
          ageCheck: "Adult supervision for movement games (safe space). 🧠✅"
        },
        focus: "activity bank, speaking games",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-kids-flashcards",
        title: "Kids Flashcards — printable picture cards 🃏🗣️",
        link: "https://kids-flashcards.com/",
        format: "printable",
        description:
          "Free printable picture flashcards for naming, describing, and sentence frames like “It’s a… / I see… / I like…”.",
        details: {
          type: "Printable flashcards (PDF) 🖨️🃏",
          teaches: "Naming, describing, and sentence-frame speaking. 🗣️✅",
          howTo: [
            "Print 10 cards (keep sets small). 🖨️🔟",
            "Play “What is it?” + “What color?” 🎨❓",
            "Add “I like / I don’t like…” for 6–7. 👍👎"
          ],
          whyTopPick: "Simple visuals = instant speaking prompts. ⭐",
          freeAccess: "Free downloads; no registration needed. 🆓✅",
          ageCheck: "Great for 4–7; keep sets small to avoid overload. 🎯"
        },
        focus: "flashcard speaking prompts",
        time: "3–7 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-pbs-kids-songs",
        title: "PBS KIDS — Songs & sing-alongs (echo speaking) 🎵🗣️",
        link: "https://pbskids.org/videos/songs",
        format: "video",
        description:
          "Short song clips that support speaking through sing-along and echoing lines with pauses.",
        details: {
          type: "Song clips + sing-along videos 🎶🎬",
          teaches: "Pronunciation + rhythm + common phrases via echoing lines. 👄🎵🔁",
          howTo: [
            "Choose 1 sing-along. 🎤",
            "Watch 30s → pause → repeat 1 line. ⏸️🔁",
            "Reuse the same clip for a week. 📅"
          ],
          whyTopPick: "Short clips = easy daily routine. ⭐⏱️",
          freeAccess: "Free to watch on PBS KIDS. 🆓✅",
          ageCheck: "Good for 4–7; adult supervises screen time. 👀"
        },
        focus: "echo speaking, rhythm",
        time: "3–6 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-sesame-workshop-resources",
        title: "Sesame Workshop — free games & storybooks 📚🎮",
        link: "https://sesameworkshop.org/resources/",
        format: "site",
        description:
          "Storybooks and activities that support speaking through retell, role-play, and feelings vocabulary (adult-selected).",
        details: {
          type: "Storybooks + games + activities 📚🎮",
          teaches: "Speaking through story retell, feelings words, role-play. 🎭🗣️😊",
          howTo: [
            "Pick 1 storybook/game suitable for ages 3–6. 🎯",
            "Read/play together. 🤝",
            "Do a 1-minute retell: “First… then… finally…”. 🧩"
          ],
          whyTopPick: "Reputable library of age-tagged resources. ⭐",
          freeAccess: "Free to access; download options vary by item. 🆓⚠️",
          ageCheck: "Strong for 4–7; preview topics (some are “tough topics”). 👀"
        },
        focus: "retell, role-play, feelings",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-elmos-big-feelings",
        title: "Sesame Workshop — “Elmo’s Big Feelings” 😃📖",
        link: "https://sesameworkshop.org/resources/elmos-big-feelings/",
        format: "download",
        description:
          "A story resource that supports speaking about emotions using simple frames like “I feel… because…”.",
        details: {
          type: "Storybook (read online / download) 📖⬇️",
          teaches: "Emotions language: “I feel…”, “because…”, “I can…”. 😊💬",
          howTo: [
            "Read together. 📖",
            "Stop on each page: “How does Elmo feel?” 😃😢",
            "Child answers with 1–2 words → grow into a sentence. 🌱🗣️"
          ],
          whyTopPick: "Excellent for building feelings vocabulary and simple explanations. ⭐",
          freeAccess: "Free to access; download options available on page. 🆓⬇️",
          ageCheck: "Good for 4–7 with gentle support. 🤝"
        },
        focus: "feelings talk, sentence frames",
        time: "5–8 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-storyline-online-retell",
        title: "Storyline Online — retelling practice 🎬🗣️",
        link: "https://storylineonline.net/",
        format: "video",
        description:
          "Read-aloud videos that are ideal for speaking via retell prompts (Who/Where/What happened?) and simple role-play.",
        details: {
          type: "Read-aloud videos 📺📖",
          teaches: "Speaking via retell and short answers to prompts. 🗣️❓",
          howTo: [
            "Watch 3–6 minutes. 🎥",
            "Ask 3 questions: “Who? Where? What happened?” ❓❓❓",
            "Act out 1 scene (simple role-play). 🎭"
          ],
          whyTopPick: "Retelling is one of the best speaking builders at 4–7. ⭐",
          freeAccess: "Free to access on the official site. 🆓✅",
          ageCheck: "Choose shorter/calmer books for 4–5. 🧸"
        },
        focus: "retell, role-play",
        time: "6–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-super-simple-songs",
        title: "Super Simple Songs — sing-along speaking 🎶👄",
        link: "https://supersimple.com/super-simple-songs/",
        format: "site",
        description:
          "Repeatable action songs that build pronunciation and basic phrases through high repetition.",
        details: {
          type: "Songs/videos 🎶🎬",
          teaches: "Pronunciation + basic phrases through repetition. 👄🔁",
          howTo: [
            "Pick 1 action song. 🕺",
            "Echo 1 line at a time. 🔁",
            "Reuse daily for a week. 📅"
          ],
          whyTopPick: "Very repeatable = fast speaking confidence. ⭐🔁",
          freeAccess: "Free to browse (some playback may link out). 🆓⚠️",
          ageCheck: "Great for 4–7; supervise if it links out to video platforms. 👀"
        },
        focus: "songs, repetition, phrases",
        time: "3–6 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-asha-activities",
        title: "ASHA — Activities to encourage speech & language 🧠🗣️",
        link: "https://www.asha.org/public/speech/development/activities-to-encourage-speech-and-language-development/",
        format: "site",
        description:
          "Everyday activity ideas to encourage speech and language through role-play, describing, predicting, and recounting.",
        details: {
          type: "Parent/teacher activity list 📄",
          teaches: "Speaking through role-play, describing, predicting, recounting. 🗣️🎭🧠",
          howTo: [
            "Pick 1 idea (e.g., role-play “house”). 🏠",
            "Model 2 short sentences. 🪞",
            "Child repeats/changes 1 word (swap practice). 🔄"
          ],
          whyTopPick: "Practical, real-life speaking ideas that work without screens. ⭐",
          freeAccess: "Free webpage. 🆓✅",
          ageCheck: "Adapt language to simple sentences for 4–7. 🎯"
        },
        focus: "home speaking routines",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-esl-kids-games-online",
        title: "ESL Kids Games — online games (use as speaking prompts) 💻🗣️",
        link: "https://www.eslkidsgames.com/online-esl-games",
        format: "site",
        description:
          "Online games that can become speaking practice if you add “say it out loud” routines before clicking.",
        details: {
          type: "Online games 🎮",
          teaches: "Speaking through reading aloud + sentence frames (It’s a…, I see…). 🗣️✅",
          howTo: [
            "You read the instructions aloud. 📣",
            "Child says answers before clicking. 🗣️",
            "Add “Say it in a sentence” (It’s a…, I see…). ✅"
          ],
          whyTopPick: "Quick practice when you need something instant. ⚡",
          freeAccess: "Free to access/play (ad-supported; site experience varies). 🆓⚠️",
          ageCheck: "Adult supervision recommended (ads/links). 👀⚠️"
        },
        focus: "speaking prompts + games",
        time: "3–7 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-khan-academy-kids-prompts",
        title: "Khan Academy Kids — storytelling prompts 🧸📱🗣️",
        link: "https://www.khanacademy.org/kids",
        format: "app",
        description:
          "Use the app’s stories/activities with caregiver prompts (“What do you see?” “What happens next?”) to elicit full sentences.",
        details: {
          type: "Free learning app (caregiver-led prompts) 📱",
          teaches: "Speaking through picture/story talk and simple prediction. 👀➡️🗣️",
          howTo: [
            "Choose a book/activity in the app. 📚",
            "Pause and ask: “What do you see?” “What happens next?” 👀➡️",
            "Encourage 1 full sentence (even simple). ✅"
          ],
          whyTopPick: "Easy way to turn story time into speaking practice. ⭐",
          freeAccess: "Free to use (app install required). 🆓📲",
          ageCheck: "Great for 4–7 with caregiver-led questions. 👨‍👩‍👧‍👦"
        },
        focus: "picture talk, sentence frames",
        time: "5–8 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "best-set-recommended-bundle-for-4-7-speaking",
        title: "Best “Set” (bundle + simple weekly plan for 4–7 Speaking) 🗓️🗣️",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "Goal: 10–15 minutes/day of high-repeat speaking. Daily: chant warm-up → pronunciation/story repeat → flashcard talk → one speaking game. Weekend: retell practice + feelings talk.",
        bundleItems: [
          "4-7-speaking-british-council-grammar-chants",
          "4-7-speaking-british-council-speak",
          "4-7-speaking-kids-flashcards",
          "4-7-speaking-games4esl-kindergarten-games",
          "4-7-speaking-esl-game-activity-book-pdf",
          "4-7-speaking-storyline-online-retell",
          "4-7-speaking-elmos-big-feelings"
        ],
        details: {
          type: "Recommended bundle 🧺",
          teaches: "Pronunciation + rhythm + sentence frames + retelling through short, repeatable practice. 👄🎵🗣️",
          howTo: [
            "Mon–Fri (10–15 min/day): Warm-up chant (2 min) — British Council Grammar Chants (repeat the SAME chant all week). 🎤🔁",
            "Mon–Fri: Pronunciation/story (5 min) — British Council “Speak” (pause + repeat target sound/word). 🚀⏸️👄",
            "Mon–Fri: Flashcard talk (3 min) — Kids Flashcards (“It’s a… / I see… / I like…”). 🃏🗣️",
            "Mon–Fri: Game (3–5 min) — One speaking game from Games4ESL or the ESL Game & Activity Book (repeat all week). 🎲🔁",
            "Weekend (pick 1–2): Retell (8–10 min) — Storyline Online (Who/Where/What happened?). 🎬❓",
            "Weekend: Feelings talk (5–8 min) — Sesame Workshop “Elmo’s Big Feelings” (I feel… because…). 😃💬"
          ],
          whyTopPick: "High repetition, same few items all week = faster confidence and clearer speech. ⭐🔁",
          freeAccess: "Uses free resources; some are apps/PDFs; web experiences can vary by device. 🆓⚠️",
          ageCheck: "Designed for 4–7 with adult-led pacing and short sessions. 🧒🧑‍🏫"
        },
        focus: "speaking confidence, repetition",
        time: "10–15 min/day",
        level: "caregiver-led"
      },
      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-cbeebies-bedtime",
        title: "BBC CBeebies Bedtime Stories 📺🌙🗣️",
        link: "https://www.bbc.co.uk/iplayer/episodes/b00jdlm2/cbeebies-bedtime-stories",
        format: "video",
        description:
          "Calm, high-quality stories read aloud by familiar faces. Excellent for echo-speaking and discussing characters before sleep.",
        details: {
          type: "Video read-alouds 📺📖",
          teaches: "Pacing, expressive speaking, and vocabulary through imitation. 🗣️🎭",
          howTo: [
            "Watch a story before bedtime. 🌙",
            "Pause occasionally and have your child repeat a fun phrase or sound effect. ⏸️🗣️",
            "Ask them to recount the main event of the story. ❓🧠"
          ],
          whyTopPick: "Very calming format with expressive reading models. ⭐😌",
          freeAccess: "Free to stream (may require BBC iPlayer depending on region or use their YouTube). 🆓📺",
          ageCheck: "Great for 4-7 shared wind-down time. 🧒🌙"
        },
        focus: "expressive speaking, retell",
        time: "5-10 min",
        level: "caregiver-led"
      },
      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-reading-rockets-tips-for-parents-of-preschoolers",
        title: "Reading Rockets - Reading Tips for Parents of Preschoolers",
        link: "https://www.readingrockets.org/topics/activities/articles/reading-tips-parents-preschoolers",
        format: "site",
        description:
          "Short parent tips for picture walks, print awareness, and fun book routines before formal reading starts.",
        details: {
          type: "Parent tip sheet",
          teaches: "Vocabulary, book handling, and early comprehension habits.",
          howTo: [
            "Preview the cover and pictures before reading.",
            "Ask one easy question per page such as 'What do you see?'",
            "Reread favorite books to build confidence."
          ],
          whyTopPick: "Friendly guidance that is easy to use at home.",
          freeAccess: "Free article on Reading Rockets.",
          ageCheck: "Good fit for preschool and early primary ages."
        },
        focus: "picture talk, rereading, comprehension",
        time: "5-10 min",
        level: "caregiver-led"
      },
      {
        age: "4-7",
        skill: "listening",
        slug: "4-7-listening-cambridge-activities-for-learners",
        title: "Cambridge English - Activities for Learners (Listening)",
        link: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/?skill=listening",
        format: "site",
        description:
          "Free listening practice page with short activities; adults can choose the easiest A1-A2 tasks for this age.",
        details: {
          type: "Skill activity hub",
          teaches: "Listening for key words, short details, and simple meaning.",
          howTo: [
            "Open the listening filter and choose a short basic activity.",
            "Play it once for overall meaning and once for details.",
            "Finish with one oral retell or picture-pointing task."
          ],
          whyTopPick: "Large free library with filters for easier tasks.",
          freeAccess: "Free Cambridge English activities.",
          ageCheck: "Works best with adult guidance for 4-7."
        },
        focus: "short listening, key words, repeat play",
        time: "5-8 min",
        level: "caregiver-led"
      },
      {
        age: "4-7",
        skill: "writing",
        slug: "4-7-writing-crayola-free-coloring-pages",
        title: "Crayola - Free Coloring Pages",
        link: "https://www.crayola.com/free-coloring-pages/",
        format: "site",
        description:
          "Printable coloring pages that work well for tracing, labeling, and short sentence writing with young learners.",
        details: {
          type: "Printable pages",
          teaches: "Pencil control, labeling, and simple sentence follow-up.",
          howTo: [
            "Print one page your child likes.",
            "Add one label or short sentence after coloring.",
            "Use dotted models first if your child still needs tracing."
          ],
          whyTopPick: "Easy to reuse for many themes and interests.",
          freeAccess: "Free printable pages on Crayola.",
          ageCheck: "Good fit for 4-7 with adult support for writing."
        },
        focus: "tracing, labeling, short writing",
        time: "5-10 min",
        level: "caregiver-led"
      },
      {
        age: "4-7",
        skill: "speaking",
        slug: "4-7-speaking-cambridge-activities-for-learners",
        title: "Cambridge English - Activities for Learners (Speaking)",
        link: "https://www.cambridgeenglish.org/learning-english/activities-for-learners/?skill=speaking",
        format: "site",
        description:
          "Free speaking page with short tasks; adults can pick simple A1-A2 prompts for repeating, naming, and short answers.",
        details: {
          type: "Skill activity hub",
          teaches: "Short responses, sentence frames, and speaking confidence.",
          howTo: [
            "Choose one very short speaking activity.",
            "Model the answer first, then let your child copy it.",
            "Repeat the same task later in the week for fluency."
          ],
          whyTopPick: "Flexible source for quick home speaking practice.",
          freeAccess: "Free Cambridge English activities.",
          ageCheck: "Best used with adult support for 4-7."
        },
        focus: "short answers, repetition, fluency",
        time: "5-8 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "booktrust-storybooks-and-games-4-7-reading",
        title: "BookTrust Storybooks and Games",
        link: "https://www.booktrust.org.uk/how-we-help/have-fun-at-home/storybooks-and-games/",
        format: "site",
        description:
          "Online stories, read-aloud videos, and simple book games.",
        details: {
          type: "stories and games 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "free-children-stories-4-7-reading",
        title: "Free Children Stories",
        link: "https://www.freechildrenstories.com/",
        format: "site",
        description:
          "Free short stories for different child age groups.",
        details: {
          type: "stories 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "storyline-online-library-4-7-reading",
        title: "Storyline Online Library",
        link: "https://storylineonline.net/library/",
        format: "site",
        description:
          "Actors read picture books with activity guides.",
        details: {
          type: "read-aloud stories 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "unite-for-literacy-library-4-7-reading",
        title: "Unite for Literacy Library",
        link: "https://www.uniteforliteracy.com/",
        format: "site",
        description:
          "Short picture books with audio narration options.",
        details: {
          type: "picture books 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "british-council-learnenglish-kids-4-7-reading",
        title: "British Council LearnEnglish Kids",
        link: "https://learnenglishkids.britishcouncil.org/",
        format: "site",
        description:
          "Free games, songs, stories, videos, grammar, and vocabulary.",
        details: {
          type: "ESL activities 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "cambridge-english-activities-for-children-4-7-reading",
        title: "Cambridge English Activities for Children",
        link: "https://www.cambridgeenglish.org/learning-english/parents-and-children/activities-for-children/",
        format: "site",
        description:
          "Free Pre-A1, A1, and A2 activities for young learners.",
        details: {
          type: "exam-aligned activities 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "esleschool-starters-4-7-reading",
        title: "ESLeSchool Starters",
        link: "https://www.esleschool.com/starters/",
        format: "site",
        description:
          "Starter-level practice, quizzes, and young learner tasks.",
        details: {
          type: "young learner ESL 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "games-to-learn-english-4-7-reading",
        title: "Games to Learn English",
        link: "https://www.gamestolearnenglish.com/",
        format: "site",
        description:
          "Simple games for vocabulary, spelling, questions, and sentences.",
        details: {
          type: "interactive games 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "learnenglish-kids-listen-and-watch-4-7-reading",
        title: "LearnEnglish Kids Listen and Watch",
        link: "https://learnenglishkids.britishcouncil.org/listen-watch",
        format: "site",
        description:
          "Songs, stories, videos, games, and printable activities.",
        details: {
          type: "songs and videos 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "mes-english-flashcards-4-7-reading",
        title: "MES English Flashcards",
        link: "https://www.mes-english.com/flashcards.php",
        format: "site",
        description:
          "Printable flashcards for vocabulary, speaking, and matching games.",
        details: {
          type: "flashcards 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "natgeo-kids-english-primary-resources-4-7-reading",
        title: "NatGeo Kids English Primary Resources",
        link: "https://www.natgeokids.com/uk/teacher-category/english/",
        format: "site",
        description:
          "English primary resources for reading, writing, vocabulary, and talk.",
        details: {
          type: "teacher resources 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "national-geographic-kids-4-7-reading",
        title: "National Geographic Kids",
        link: "https://kids.nationalgeographic.com/",
        format: "site",
        description:
          "High-interest animals, science, history, videos, and quizzes.",
        details: {
          type: "articles and quizzes 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "national-geographic-kids-little-kids-4-7-reading",
        title: "National Geographic Kids Little Kids",
        link: "https://kids.nationalgeographic.com/little-kids/topic/littlekids",
        format: "site",
        description:
          "Short animal videos and picture-led content for talk practice.",
        details: {
          type: "videos and animals 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "pbs-kids-games-4-7-reading",
        title: "PBS Kids Games",
        link: "https://pbskids.org/games",
        format: "site",
        description:
          "Child-friendly games using simple vocabulary and instructions.",
        details: {
          type: "educational games 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "pbs-super-why-4-7-reading",
        title: "PBS Super Why",
        link: "https://pbskids.org/superwhy",
        format: "site",
        description:
          "Games for alphabet, rhyming, spelling, and comprehension.",
        details: {
          type: "literacy games 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "sesame-street-games-4-7-reading",
        title: "Sesame Street Games",
        link: "https://pbskids.org/sesame/all-games",
        format: "site",
        description:
          "Very young learner games with simple words and routines.",
        details: {
          type: "preschool games 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "booktrust-storybooks-and-games-4-7-listening",
        title: "BookTrust Storybooks and Games",
        link: "https://www.booktrust.org.uk/how-we-help/have-fun-at-home/storybooks-and-games/",
        format: "site",
        description:
          "Online stories, read-aloud videos, and simple book games.",
        details: {
          type: "stories and games 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "british-council-learnenglish-kids-4-7-listening",
        title: "British Council LearnEnglish Kids",
        link: "https://learnenglishkids.britishcouncil.org/",
        format: "site",
        description:
          "Free games, songs, stories, videos, grammar, and vocabulary.",
        details: {
          type: "ESL activities 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "cambridge-english-activities-for-children-4-7-listening",
        title: "Cambridge English Activities for Children",
        link: "https://www.cambridgeenglish.org/learning-english/parents-and-children/activities-for-children/",
        format: "site",
        description:
          "Free Pre-A1, A1, and A2 activities for young learners.",
        details: {
          type: "exam-aligned activities 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "cambridge-sing-and-learn-4-7-listening",
        title: "Cambridge Sing and Learn",
        link: "https://www.cambridgeenglish.org/learning-english/parents-and-children/activities-for-children/sing-and-learn/",
        format: "site",
        description:
          "Simple songs for vocabulary, listening, and pronunciation.",
        details: {
          type: "songs 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "esleschool-starters-4-7-listening",
        title: "ESLeSchool Starters",
        link: "https://www.esleschool.com/starters/",
        format: "site",
        description:
          "Starter-level practice, quizzes, and young learner tasks.",
        details: {
          type: "young learner ESL 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "free-children-stories-4-7-listening",
        title: "Free Children Stories",
        link: "https://www.freechildrenstories.com/",
        format: "site",
        description:
          "Free short stories for different child age groups.",
        details: {
          type: "stories 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "mes-english-flashcards-4-7-listening",
        title: "MES English Flashcards",
        link: "https://www.mes-english.com/flashcards.php",
        format: "site",
        description:
          "Printable flashcards for vocabulary, speaking, and matching games.",
        details: {
          type: "flashcards 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "national-geographic-kids-4-7-listening",
        title: "National Geographic Kids",
        link: "https://kids.nationalgeographic.com/",
        format: "site",
        description:
          "High-interest animals, science, history, videos, and quizzes.",
        details: {
          type: "articles and quizzes 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "national-geographic-kids-little-kids-4-7-listening",
        title: "National Geographic Kids Little Kids",
        link: "https://kids.nationalgeographic.com/little-kids/topic/littlekids",
        format: "site",
        description:
          "Short animal videos and picture-led content for talk practice.",
        details: {
          type: "videos and animals 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "pbs-kids-games-4-7-listening",
        title: "PBS Kids Games",
        link: "https://pbskids.org/games",
        format: "site",
        description:
          "Child-friendly games using simple vocabulary and instructions.",
        details: {
          type: "educational games 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "pbs-kids-videos-4-7-listening",
        title: "PBS Kids Videos",
        link: "https://pbskids.org/videos",
        format: "site",
        description:
          "Safe children’s videos for listening and retelling practice.",
        details: {
          type: "videos 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "pbs-super-why-4-7-listening",
        title: "PBS Super Why",
        link: "https://pbskids.org/superwhy",
        format: "site",
        description:
          "Games for alphabet, rhyming, spelling, and comprehension.",
        details: {
          type: "literacy games 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "listening",
        slug: "sesame-street-games-4-7-listening",
        title: "Sesame Street Games",
        link: "https://pbskids.org/sesame/all-games",
        format: "site",
        description:
          "Very young learner games with simple words and routines.",
        details: {
          type: "preschool games 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      ,

      {
        age: "4-7",
        skill: "listening",
        slug: "storyberries-4-7-listening",
        title: "Storyberries",
        link: "https://www.storyberries.com/",
        format: "site",
        description:
          "Free online stories, poems, audio books, and fairy tales.",
        details: {
          type: "story library 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "british-council-learnenglish-kids-4-7-writing",
        title: "British Council LearnEnglish Kids",
        link: "https://learnenglishkids.britishcouncil.org/",
        format: "site",
        description:
          "Free games, songs, stories, videos, grammar, and vocabulary.",
        details: {
          type: "ESL activities 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "cambridge-english-activities-for-children-4-7-writing",
        title: "Cambridge English Activities for Children",
        link: "https://www.cambridgeenglish.org/learning-english/parents-and-children/activities-for-children/",
        format: "site",
        description:
          "Free Pre-A1, A1, and A2 activities for young learners.",
        details: {
          type: "exam-aligned activities 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "esleschool-starters-4-7-writing",
        title: "ESLeSchool Starters",
        link: "https://www.esleschool.com/starters/",
        format: "site",
        description:
          "Starter-level practice, quizzes, and young learner tasks.",
        details: {
          type: "young learner ESL 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "free-children-stories-4-7-writing",
        title: "Free Children Stories",
        link: "https://www.freechildrenstories.com/",
        format: "site",
        description:
          "Free short stories for different child age groups.",
        details: {
          type: "stories 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "games-to-learn-english-4-7-writing",
        title: "Games to Learn English",
        link: "https://www.gamestolearnenglish.com/",
        format: "site",
        description:
          "Simple games for vocabulary, spelling, questions, and sentences.",
        details: {
          type: "interactive games 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "mes-english-flashcards-4-7-writing",
        title: "MES English Flashcards",
        link: "https://www.mes-english.com/flashcards.php",
        format: "site",
        description:
          "Printable flashcards for vocabulary, speaking, and matching games.",
        details: {
          type: "flashcards 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "natgeo-kids-english-primary-resources-4-7-writing",
        title: "NatGeo Kids English Primary Resources",
        link: "https://www.natgeokids.com/uk/teacher-category/english/",
        format: "site",
        description:
          "English primary resources for reading, writing, vocabulary, and talk.",
        details: {
          type: "teacher resources 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "national-geographic-kids-4-7-writing",
        title: "National Geographic Kids",
        link: "https://kids.nationalgeographic.com/",
        format: "site",
        description:
          "High-interest animals, science, history, videos, and quizzes.",
        details: {
          type: "articles and quizzes 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "pbs-super-why-4-7-writing",
        title: "PBS Super Why",
        link: "https://pbskids.org/superwhy",
        format: "site",
        description:
          "Games for alphabet, rhyming, spelling, and comprehension.",
        details: {
          type: "literacy games 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "storyberries-4-7-writing",
        title: "Storyberries",
        link: "https://www.storyberries.com/",
        format: "site",
        description:
          "Free online stories, poems, audio books, and fairy tales.",
        details: {
          type: "story library 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "storyline-online-library-4-7-writing",
        title: "Storyline Online Library",
        link: "https://storylineonline.net/library/",
        format: "site",
        description:
          "Actors read picture books with activity guides.",
        details: {
          type: "read-aloud stories 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "booktrust-storybooks-and-games-4-7-writing",
        title: "BookTrust Storybooks and Games",
        link: "https://www.booktrust.org.uk/how-we-help/have-fun-at-home/storybooks-and-games/",
        format: "site",
        description:
          "Online stories, read-aloud videos, and simple book games.",
        details: {
          type: "stories and games 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "cambridge-sing-and-learn-4-7-writing",
        title: "Cambridge Sing and Learn",
        link: "https://www.cambridgeenglish.org/learning-english/parents-and-children/activities-for-children/sing-and-learn/",
        format: "site",
        description:
          "Simple songs for vocabulary, listening, and pronunciation.",
        details: {
          type: "songs 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "learnenglish-kids-listen-and-watch-4-7-writing",
        title: "LearnEnglish Kids Listen and Watch",
        link: "https://learnenglishkids.britishcouncil.org/listen-watch",
        format: "site",
        description:
          "Songs, stories, videos, games, and printable activities.",
        details: {
          type: "songs and videos 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "national-geographic-kids-little-kids-4-7-writing",
        title: "National Geographic Kids Little Kids",
        link: "https://kids.nationalgeographic.com/little-kids/topic/littlekids",
        format: "site",
        description:
          "Short animal videos and picture-led content for talk practice.",
        details: {
          type: "videos and animals 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "writing",
        slug: "pbs-kids-games-4-7-writing",
        title: "PBS Kids Games",
        link: "https://pbskids.org/games",
        format: "site",
        description:
          "Child-friendly games using simple vocabulary and instructions.",
        details: {
          type: "educational games 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "cambridge-sing-and-learn-4-7-speaking",
        title: "Cambridge Sing and Learn",
        link: "https://www.cambridgeenglish.org/learning-english/parents-and-children/activities-for-children/sing-and-learn/",
        format: "site",
        description:
          "Simple songs for vocabulary, listening, and pronunciation.",
        details: {
          type: "songs 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "mes-english-flashcards-4-7-speaking",
        title: "MES English Flashcards",
        link: "https://www.mes-english.com/flashcards.php",
        format: "site",
        description:
          "Printable flashcards for vocabulary, speaking, and matching games.",
        details: {
          type: "flashcards 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "pbs-kids-videos-4-7-speaking",
        title: "PBS Kids Videos",
        link: "https://pbskids.org/videos",
        format: "site",
        description:
          "Safe children’s videos for listening and retelling practice.",
        details: {
          type: "videos 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "storyline-online-library-4-7-speaking",
        title: "Storyline Online Library",
        link: "https://storylineonline.net/library/",
        format: "site",
        description:
          "Actors read picture books with activity guides.",
        details: {
          type: "read-aloud stories 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "booktrust-storybooks-and-games-4-7-speaking",
        title: "BookTrust Storybooks and Games",
        link: "https://www.booktrust.org.uk/how-we-help/have-fun-at-home/storybooks-and-games/",
        format: "site",
        description:
          "Online stories, read-aloud videos, and simple book games.",
        details: {
          type: "stories and games 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "british-council-learnenglish-kids-4-7-speaking",
        title: "British Council LearnEnglish Kids",
        link: "https://learnenglishkids.britishcouncil.org/",
        format: "site",
        description:
          "Free games, songs, stories, videos, grammar, and vocabulary.",
        details: {
          type: "ESL activities 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "cambridge-english-activities-for-children-4-7-speaking",
        title: "Cambridge English Activities for Children",
        link: "https://www.cambridgeenglish.org/learning-english/parents-and-children/activities-for-children/",
        format: "site",
        description:
          "Free Pre-A1, A1, and A2 activities for young learners.",
        details: {
          type: "exam-aligned activities 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "esleschool-starters-4-7-speaking",
        title: "ESLeSchool Starters",
        link: "https://www.esleschool.com/starters/",
        format: "site",
        description:
          "Starter-level practice, quizzes, and young learner tasks.",
        details: {
          type: "young learner ESL 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "free-children-stories-4-7-speaking",
        title: "Free Children Stories",
        link: "https://www.freechildrenstories.com/",
        format: "site",
        description:
          "Free short stories for different child age groups.",
        details: {
          type: "stories 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "games-to-learn-english-4-7-speaking",
        title: "Games to Learn English",
        link: "https://www.gamestolearnenglish.com/",
        format: "site",
        description:
          "Simple games for vocabulary, spelling, questions, and sentences.",
        details: {
          type: "interactive games 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "learnenglish-kids-listen-and-watch-4-7-speaking",
        title: "LearnEnglish Kids Listen and Watch",
        link: "https://learnenglishkids.britishcouncil.org/listen-watch",
        format: "site",
        description:
          "Songs, stories, videos, games, and printable activities.",
        details: {
          type: "songs and videos 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "natgeo-kids-english-primary-resources-4-7-speaking",
        title: "NatGeo Kids English Primary Resources",
        link: "https://www.natgeokids.com/uk/teacher-category/english/",
        format: "site",
        description:
          "English primary resources for reading, writing, vocabulary, and talk.",
        details: {
          type: "teacher resources 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "national-geographic-kids-4-7-speaking",
        title: "National Geographic Kids",
        link: "https://kids.nationalgeographic.com/",
        format: "site",
        description:
          "High-interest animals, science, history, videos, and quizzes.",
        details: {
          type: "articles and quizzes 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "national-geographic-kids-little-kids-4-7-speaking",
        title: "National Geographic Kids Little Kids",
        link: "https://kids.nationalgeographic.com/little-kids/topic/littlekids",
        format: "site",
        description:
          "Short animal videos and picture-led content for talk practice.",
        details: {
          type: "videos and animals 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "pbs-kids-games-4-7-speaking",
        title: "PBS Kids Games",
        link: "https://pbskids.org/games",
        format: "site",
        description:
          "Child-friendly games using simple vocabulary and instructions.",
        details: {
          type: "educational games 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "pbs-super-why-4-7-speaking",
        title: "PBS Super Why",
        link: "https://pbskids.org/superwhy",
        format: "site",
        description:
          "Games for alphabet, rhyming, spelling, and comprehension.",
        details: {
          type: "literacy games 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
      },

      {
        age: "4-7",
        skill: "speaking",
        slug: "sesame-street-games-4-7-speaking",
        title: "Sesame Street Games",
        link: "https://pbskids.org/sesame/all-games",
        format: "site",
        description:
          "Very young learner games with simple words and routines.",
        details: {
          type: "preschool games 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 🧒 keep activities playful and visual."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "8–15 min",
        level: "guided"
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
