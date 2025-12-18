/* assets/js/resources/0-3.js
   Age 0–3 resource data pack.
   Do NOT host files in repo — only external links.
*/
(function () {
  const DATA = {
    packs: {
      "0-3/reading": {
        title: "0–3 Reading 📚👶✨",
        overview:
          "This pack supports early reading readiness for ages 0–3 through daily shared reading with an adult. It focuses on routine, repetition, and interaction (pointing, naming, and simple questions) using short board books and picture books.",
        objectives: [
          "Build comfort and interest in books through a predictable daily routine.",
          "Develop early vocabulary by naming familiar objects, animals, and actions in pictures.",
          "Strengthen attention and listening during short story time.",
          "Encourage interaction: pointing, turning pages, copying single words/sounds.",
          "Support early comprehension with very simple “Where is…?” and “What’s that?” prompts."
        ],
        materials: [
          "1–2 board books or simple picture books (preferably with large, clear images).",
          "Quiet reading space (bed, couch, mat) and a consistent daily time.",
          "Optional: real objects/toys that match the book (animal toy, ball, spoon) for quick “show me” moments.",
          "Optional: a small set of picture cards (animals, foods, body parts) for extra practice."
        ],
        // Used for the callout + to keep the “best set” stable.
        bestSetSlug: "best-set-recommended-bundle-for-0-3-reading"
      }
    },

    // Each resource must have unique slug per age+skill.
    resources: [
      {
        age: "0-3",
        skill: "reading",
        slug: "unite-for-literacy-free-online-books",
        title: "Unite for Literacy — Free Online Books 📖",
        link: "https://www.uniteforliteracy.com/free-books-online/home",
        format: "site",
        description:
          "Digital picture books (many with narration) to support print awareness and vocabulary through shared picture-book reading.",
        details: {
          type: "Digital picture books (many with narration) 📖🎧",
          teaches: "Print awareness + vocabulary through shared picture-book reading. 🔤🗣️",
          howTo: [
            "Pick a book with big pictures. 🖼️📖",
            "Point to 3–5 objects per page; name them slowly. 👉🧸🐶🗣️",
            "Re-read the same book all week (toddlers learn via repetition). 🔁📅👶"
          ],
          whyTopPick: "Kid-safe focus (“no logins, ads… just engaging… books”). ⭐🛡️",
          freeAccess: "Fully free; no account needed. 🆓✅",
          ageCheck: "Strong for 0–3 (caregiver-led; short sessions). 👶🧑‍🍼⏱️"
        },
        focus: "early vocabulary, shared reading",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "book-dash-free-cc-picture-books",
        title: "Book Dash — Free CC picture books (read/download) 📖⬇️",
        link: "https://bookdash.org/books/",
        format: "site",
        description:
          "Free picture books (including wordless books) that support “story talk” through naming, describing, and predicting.",
        details: {
          type: "Picture books (incl. wordless books) 📖🖼️",
          teaches: "“Story talk” (naming, describing, predicting) even before children can read text. 🗣️👀🔮",
          howTo: [
            "Start with wordless books: “What do you see?” “Uh-oh!” 👀❓😯",
            "Let the child turn pages; you narrate 1 sentence per page. 👶📖🗣️",
            "Print favorites for offline bedtime reading. 🖨️🌙📖"
          ],
          whyTopPick: "“Read or download… at no cost” + CC license. ⭐🆓",
          freeAccess: "Fully free to read/download. 🆓📖⬇️",
          ageCheck: "Great for 0–3; choose simple, short books. 👶✅"
        },
        focus: "shared reading, picture talk",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "storyweaver-pratham-books-free-stories",
        title: "StoryWeaver (Pratham Books) — free stories to read/download/print 📖⬇️🖨️",
        link: "https://storyweaver.org.in/en/stories",
        format: "site",
        description:
          "Free digital storybooks (multilingual; many printable) to support shared reading routines and early vocabulary.",
        details: {
          type: "Digital storybooks (multilingual; many printable) 🌍📖🖨️",
          teaches: "Shared reading routines + early vocabulary (and home-language support if needed). 📖🗣️🏠",
          howTo: [
            "Filter for very short picture books. 🎛️⏱️📖",
            "Read 2–3 pages, talk about pictures, stop. 📖🗣️🛑",
            "Print a mini “home library” of 5 repeats. 🖨️🏠🔁"
          ],
          whyTopPick: "“FREE to read, download, print and share.” ⭐🆓",
          freeAccess: "Free to use (site-based). 🆓🌐",
          ageCheck: "Suitable with caregiver preview (some stories skew older). 👶👀⚠️",
          otherLinks: ["https://storyweaver.org.in/"]
        },
        focus: "shared reading, multilingual",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "african-storybook-open-access-picture-storybooks",
        title: "African Storybook — open-access picture storybooks (download/print) 📖⬇️🖨️",
        link: "https://www.africanstorybook.org/",
        format: "site",
        description:
          "Open-access picture storybooks (many languages) for picture-based storytelling and early literacy habits.",
        details: {
          type: "Picture storybooks (many languages) 📖🌍",
          teaches: "Picture-based storytelling + early literacy habits. 🖼️📖✅",
          howTo: [
            "Use “Read” to find a short storybook. 📖🔍",
            "Download to read offline or print for bedtime. ⬇️🖨️🌙",
            "Do “point + name + repeat” on each page. 👉🗣️🔁"
          ],
          whyTopPick: "Open access to picture storybooks + offline/print options. ⭐🆓",
          freeAccess: "Free/open access. 🆓✅",
          ageCheck: "Good for 0–3 with adult selection. 👶🧑‍🍼"
        },
        focus: "storytelling, picture talk",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "multilingual-english-storybooks-global-storybooks",
        title: "Multilingual English Storybooks (Global Storybooks) — text + audio 📖🎧🌍",
        link: "https://englishstorybooks.org/",
        format: "site",
        description:
          "Very simple stories (Level 1) with audio and multiple languages to support early reading behaviors (listen, look, repeat).",
        details: {
          type: "Very simple stories (Level 1) with audio + many languages 📖🎧🌍",
          teaches: "Early reading behaviors (listen, look, repeat) with simple text. 🎧👀🔁",
          howTo: [
            "Pick Level 1. 1️⃣📖",
            "Play audio once, then read slowly while pointing to pictures. 🎧➡️📖👉",
            "Re-read the same 2 stories all week. 🔁📅"
          ],
          whyTopPick: "Free OER; designed for families/teachers. ⭐👨‍👩‍👧‍👦",
          freeAccess: "Free to access and use. 🆓✅",
          ageCheck: "Strong for 2–3; for 0–1 keep it to pictures + audio. 👶🖼️🎧"
        },
        focus: "audio support, repetition",
        time: "5–10 min",
        level: "Level 1 / caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "storybooks-canada-text-audio-multilingual",
        title: "Storybooks Canada — text + audio + multilingual support 📖🎧🇨🇦",
        link: "https://www.storybookscanada.ca/",
        format: "site",
        description:
          "Simple stories with audio and multiple languages to support story listening and picture-book routines (useful for EAL families).",
        details: {
          type: "Simple stories with audio + multiple languages 📖🎧🌍",
          teaches: "Story listening + picture-book routines (great for EAL families). 🎧📖🏠",
          howTo: [
            "Choose Level 1. 1️⃣📖",
            "Listen once; then “read” by describing pictures. 🎧➡️🗣️🖼️",
            "Repeat 3 times across the week. 🔁3️⃣📅"
          ],
          whyTopPick: "Free resource with easy Level 1 entry point. ⭐🆓",
          freeAccess: "Free to access and use. 🆓✅",
          ageCheck: "Best for 2–3; caregiver-led for younger. 👶🧑‍🍼"
        },
        focus: "audio support, multilingual",
        time: "5–10 min",
        level: "Level 1 / caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "storyline-online-read-aloud-videos",
        title: "Storyline Online (SAG-AFTRA Foundation) — read-aloud videos 📺📖",
        link: "https://storylineonline.net/",
        format: "video",
        description:
          "Read-aloud videos to support book-handling behaviors (sit, look, follow along) and vocabulary (keep sessions short).",
        details: {
          type: "Read-aloud videos 📺📖",
          teaches: "Book handling behaviors (sit, look, follow along) + vocabulary. 📖👀🗣️",
          howTo: [
            "Choose shorter, calmer stories. ⏱️😌📖",
            "Watch 3–6 minutes; pause to point at pictures on screen. ⏱️⏸️👉🖼️",
            "Rewatch the same video later in the week. 🔁📅"
          ],
          whyTopPick: "High-quality read-alouds; easy for caregivers. ⭐🧑‍🍼",
          freeAccess: "Free to watch on site. 🆓📺",
          ageCheck: "Works for 0–3 with supervision (screen time kept short). 👶👀⏱️"
        },
        focus: "read-aloud, vocabulary",
        time: "3–6 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "worldreader-booksmart-free-literacy-app",
        title: "Worldreader BookSmart — free literacy app for families (0–5) 📱📚",
        link: "https://www.worldreader.org/booksmart/",
        format: "site",
        description:
          "Free app + reading tips/activities to build shared reading habits and early language (caregiver control recommended).",
        details: {
          type: "Free app + reading tips/activities 📱📖",
          teaches: "Shared reading habit + early language/soft skills. 📖🗣️❤️",
          howTo: [
            "Install the free app from the official page. 📲⬇️",
            "Pick 1 short book daily. 📖📅",
            "Use the built-in tips to keep sessions playful. 🎈✅"
          ],
          whyTopPick: "Built for families with children aged 0–5; “Booksmart is free.” ⭐🆓",
          freeAccess: "Free app (check app-store permissions before installing). 🆓⚙️",
          ageCheck: "Appropriate for 0–3 with caregiver control. 👶🧑‍🍼"
        },
        focus: "routine, caregiver tips",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "global-digital-library-free-library-books",
        title: "Global Digital Library — free “Library Books” (CC-licensed) 📚🆓",
        link: "https://digitallibrary.io/",
        format: "site",
        description:
          "Curated collections of free learning resources (includes “Library Books”) for simple early book exposure (preview for toddler level).",
        details: {
          type: "Curated collections of free resources (includes “Library Books”) 🧺📖",
          teaches: "Early book exposure via simple stories/books. 📖👶",
          howTo: [
            "Go to “Library Books” and filter for simplest content. 🔍🎛️📖",
            "Read 1–2 pages; talk about pictures. 📖🗣️🖼️",
            "Save a tiny favorites list (3 books). 💾3️⃣📚"
          ],
          whyTopPick: "Curated collection of free learning resources + CC licensing. ⭐🆓",
          freeAccess: "Free to access. 🆓🌐",
          ageCheck: "Preview content; not all will be toddler-level. 👶👀⚠️"
        },
        focus: "curated books, preview needed",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "oxford-owl-free-ebook-library",
        title: "Oxford Owl — FREE eBook Library (for age 3+) 📖🦉",
        link: "https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/",
        format: "site",
        description:
          "Free eBooks (account required) for the older end of the band (age 3).",
        details: {
          type: "Free eBooks (account required) 📖🔐",
          teaches: "Story sharing and early decoding for older end of your band (age 3). 📖🗣️",
          howTo: [
            "Create a free parent account. 🆓👤",
            "Choose the simplest books; read together. 📖👫",
            "Keep it to 5 minutes and stop while it’s still fun. ⏱️😊"
          ],
          whyTopPick: "Reputable publisher; free library. ⭐📚",
          freeAccess: "Free, but registration/login required. 🆓🔐",
          ageCheck: "Best for 3-year-olds (most content aimed 3–11). 👶3️⃣📚"
        },
        focus: "age 3+, simple ebooks",
        time: "5 min",
        level: "age 3+"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "bookbug-scottish-book-trust",
        title: "Bookbug (Scottish Book Trust) — story-sharing support + free app 🐛📚",
        link: "https://www.scottishbooktrust.com/bookbug",
        format: "site",
        description:
          "Parent-facing reading routines + story-sharing media for babies, toddlers, and pre-schoolers.",
        details: {
          type: "Parent-facing reading routines + story-sharing media 🧑‍🍼📖",
          teaches: "How to share books with babies/toddlers (habits + rhyme/story routines). 👶📖🎶",
          howTo: [
            "Use the site to find “Sharing books”/story media. 🔍📖",
            "Copy 1 routine (pointing, repeating, letting child turn pages). 👉🔁👶📖",
            "Apply it with any picture book you have. 📖✅"
          ],
          whyTopPick:
            "Targeted for “babies, toddlers and pre-schoolers,” and promotes early story sharing. ⭐👶",
          freeAccess:
            "Website content is accessible; app is promoted as free (verify in your app store). 🆓📲✅",
          ageCheck: "Strong for 0–3 (caregiver-led). 👶🧑‍🍼"
        },
        focus: "parent routines, early years",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "pbs-launching-young-readers-parent-tips",
        title: "PBS “Launching Young Readers” — parent tips (printable handouts) 📄📚",
        link: "https://www.pbs.org/launchingreaders/parenttips.html",
        format: "site",
        description:
          "Parent tip sheets with practical guidance for building early reading foundations at home.",
        details: {
          type: "Parent tip sheets 🧑‍🍼📄",
          teaches: "What to do at home to build early reading foundations. 🏠📖",
          howTo: [
            "Pick 1 tip. 1️⃣💡",
            "Use it during your daily book routine (2 minutes). 📖⏱️",
            "Repeat for a week, then switch tips. 🔁📅➡️💡"
          ],
          whyTopPick: "Clear, practical guidance; designed for busy parents. ⭐🧑‍🍼",
          freeAccess: "Free to access. 🆓🌐",
          ageCheck: "Appropriate for early years; caregiver content. 👶🧑‍🍼"
        },
        focus: "caregiver guidance",
        time: "1–2 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "booktrust-storytime",
        title: "BookTrust Storytime — storytime model + author read-aloud links 📖🎤",
        link: "https://www.booktrust.org.uk/how-we-help/programmes/booktrust-storytime/",
        format: "site",
        description:
          "Storytime guidance and read-aloud links to support fun shared reading routines for under-5s (some linked videos may have ads).",
        details: {
          type: "Storytime guidance + embedded read-aloud links 📖📺",
          teaches: "How to make shared reading fun for under-5s. 😊📖👶",
          howTo: [
            "Use the “for families” section and try one read-aloud link. 👨‍👩‍👧‍👦🔗📖",
            "Copy the same routine with your own picture books. 📖✅",
            "Keep sessions short and repeat favorites. ⏱️🔁❤️"
          ],
          whyTopPick:
            "Free to entertain under 5s and includes family resources. ⭐🆓👶",
          freeAccess:
            "Free to access page and linked materials (YouTube links may have ads). 🆓⚠️",
          ageCheck: "Fits 0–3 with adult supervision. 👶👀🧑‍🍼"
        },
        focus: "storytime routines",
        time: "5–10 min",
        level: "caregiver-led"
      },

      // ---------------------------
      // Best Set (featured bundle)
      // ---------------------------
      {
        age: "0-3",
        skill: "reading",
        slug: "best-set-recommended-bundle-for-0-3-reading",
        title: "Best “Set” (recommended bundle for 0–3 Reading) 🧺📚",
        link: "", // intentionally empty: this is a bundle card (no single external link)
        format: "other",
        isBestSet: true,
        description:
          "Daily 10-minute plan (repeat the same content all week): a simple routine using a core picture-book read, a printable option, multilingual audio stories, a short read-aloud video, and one quick parent tip.",
        bundleItems: [
          "unite-for-literacy-free-online-books",
          "book-dash-free-cc-picture-books",
          "multilingual-english-storybooks-global-storybooks",
          "storyline-online-read-aloud-videos",
          "pbs-launching-young-readers-parent-tips"
        ],
        details: {
          type: "Recommended bundle 🧺",
          teaches: "A predictable weekly routine built around repetition and short shared-reading moments. 🔁📅",
          howTo: [
            "Core picture-book routine: Unite for Literacy (1 book/day, re-read all week). 📖🔁",
            "Printable offline option: Book Dash (print 1 book; use at bedtime). 🖨️🌙📖",
            "Multilingual support: English Storybooks Level 1 (pick 2 favorites). 🌍1️⃣📖",
            "Read-aloud video: Storyline Online (2–3x/week, same video repeated). 📺🔁",
            "Parent micro-skill: PBS Launching Young Readers (pick 1 tip and apply it immediately). ⏱️💡➡️"
          ],
          whyTopPick: "Low effort, high repetition, and easy to repeat daily. ⭐",
          freeAccess: "Uses free resources; some may require an app install or have external platform ads. 🆓⚠️",
          ageCheck: "Designed for 0–3 with caregiver supervision. 👶🧑‍🍼"
        },
        focus: "routine, repetition",
        time: "10 min/day",
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
