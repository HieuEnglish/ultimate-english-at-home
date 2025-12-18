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
          whyTopPick: "Official messaging emphasizes free access and kid-friendly early learning. ⭐🆓",
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
          whyTopPick: "Trusted publisher with a structured early reading progression. ⭐🏗️📈",
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
          freeAccess: "Fully free; no sign-up required. 🆓🚫📝",
          ageCheck: "Great for 4–7; caregiver support helps with pacing and attention. 🧑‍🏫⏱️"
        },
        focus: "shared reading, vocabulary",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "4-7",
        skill: "reading",
        slug: "4-7-reading-british-council-learnenglish-kids-reading-practice",
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
            "Do: read the text → play 1 game → print 1 mini activity (optional). 📖➡️🎮➡️🖨️",
            "Repeat the same text twice in the week to build confidence. 🔁🗓️"
          ],
          whyTopPick: "Built-in “read + game + print” loop keeps motivation high. ⭐🔄✨",
          freeAccess: "Free to use; some account features may be optional. 🆓✅",
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
          whyTopPick: "Clear phonics path and kid-friendly flow for short practice. ⭐✅",
          freeAccess: "Free to use; optional login may exist for tracking. 🆓🔓",
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
          whyTopPick: "Highly motivating phonics game with step-by-step progression. ⭐🎮",
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
          whyTopPick: "Audio + multilingual support makes practice smoother for many families. ⭐🌍🎧",
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
          "List of quick phonics and letters/sounds mini-games that fit short daily practice.",
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

      // ---------------------------
      // Best Set (featured bundle)
      // ---------------------------
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
          whyTopPick: "Clear weekly structure that reduces overwhelm: repeat the same few things until they feel easy. ⭐🔁🙂",
          freeAccess: "Uses free resources; some require login/app install; some print/download options vary. 🆓⚠️",
          ageCheck: "Designed for 4–7 with short sessions and caregiver support. 👶➡️🧒🧑‍🏫"
        },
        focus: "routine, repetition, confidence",
        time: "12–18 min/day",
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
