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
