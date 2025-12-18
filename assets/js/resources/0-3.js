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
      },

      "0-3/listening": {
        title: "0–3 Listening 🎧👶✨",
        overview:
          "This pack supports early listening development for ages 0–3 using short songs, toddler-friendly clips, and calm audio stories, with an emphasis on repetition and caregiver interaction (gestures/pointing) in short daily routines.",
        objectives: [
          "Increase attention to sounds, words, and rhythm (songs/routines).",
          "Build basic receptive vocabulary (e.g., animals, body parts, actions).",
          "Practice responding to simple cues (e.g., “where is…?”, “stop/go”).",
          "Develop turn-taking: listen → pause → copy 1 word/sound.",
          "Establish a calm listening routine (especially bedtime/wind-down)."
        ],
        materials: [
          "Phone/tablet/computer + internet (or downloaded audio for offline use).",
          "A simple weekly playlist (1 routine song + 1 short story + 1 calm audio segment).",
          "Safe playback option (YouTube Kids if using YouTube) + adult supervision.",
          "Simple props for pointing: stuffed toy, a few real objects, or picture cards.",
          "Quiet, comfortable listening space; optional small speaker (low volume)."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-0-3-listening"
      },

      "0-3/writing": {
        title: "0–3 Writing ✍️👶✨",
        overview:
          "This pack builds 0–3 early “writing” readiness through mark-making (scribbles, lines, circles) using short, playful daily routines that strengthen fine-motor control and help children communicate ideas through drawing.",
        objectives: [
          "Support pre-writing stages by practicing scribble → lines → circles (developmentally appropriate targets).",
          "Strengthen early hand skills through frequent, short mark-making sessions.",
          "Build early “stroke language” by narrating simple movements (e.g., up/down, round/round) while the child draws.",
          "Encourage confidence and motivation by celebrating effort and displaying the child’s work."
        ],
        materials: [
          "Chunky crayons/markers and big paper (easy grip, large surface).",
          "1 sensory “mark-making” option: foam tray / water painting outside / chalk.",
          "Washable materials and adult supervision (especially for babies/toddlers).",
          "Optional: a quick daily parent tip from Vroom for extra fine-motor practice in routines."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-0-3-writing"
      }
    },

    // Each resource must have unique slug per age+skill.
    resources: [
      // =========================
      // 0–3 READING (existing)
      // =========================
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

      {
        age: "0-3",
        skill: "reading",
        slug: "best-set-recommended-bundle-for-0-3-reading",
        title: "Best “Set” (recommended bundle for 0–3 Reading) 🧺📚",
        link: "",
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
      },

      // =========================
      // 0–3 LISTENING (existing/new)
      // =========================
      {
        age: "0-3",
        skill: "listening",
        slug: "super-simple-songs-website",
        title: "Super Simple Songs (Website) 🎵",
        link: "https://supersimple.com/super-simple-songs/",
        format: "site",
        description:
          "Toddler-friendly songs/videos that build listening through repetition (actions, routines, basic vocabulary, rhythm).",
        details: {
          type: "Songs/videos (website + links out) 📺🎵",
          teaches: "Listening through repetition (actions, routines, basic vocab, rhythms). 🎧🔁",
          howTo: [
            "Pick 1 song theme (body parts / animals). 🎯🐶",
            "Play 1–2 minutes, pause, repeat key words with gestures. ⏱️⏸️👐",
            "Replay once later the same day (same song). 🔁📅"
          ],
          whyTopPick: "Very simple language + predictable repetition. ⭐✅",
          freeAccess: "Free to browse/play on the site. 🆓🌐",
          ageCheck: "Toddler-friendly; supervise if it opens YouTube (ads). 👶⚠️"
        },
        focus: "songs, routines, repetition",
        time: "2–5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "super-simple-songs-youtube",
        title: "Super Simple Songs (YouTube channel) 📺🎵",
        link: "https://www.youtube.com/user/SuperSimpleSongs",
        format: "video",
        description:
          "Short song videos to practice listening for key words, sounds, and routines.",
        details: {
          type: "Videos 📺",
          teaches: "Listening for key words, sounds, and routines via songs. 🎧🗝️🎶",
          howTo: [
            "Use YouTube Kids if possible. 👶📱",
            "Choose short videos (2–4 min). ⏱️📺",
            "Do “listen → point → copy 1 word” (nose / go / stop). 🎧👉🗣️"
          ],
          whyTopPick: "Easy to access on almost any device. ⭐📱💻",
          freeAccess: "Free to watch (YouTube). 🆓▶️",
          ageCheck: "Adult supervision recommended (ads + autoplay). 👶⚠️"
        },
        focus: "songs, copy 1 word",
        time: "2–4 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "sesame-street-videos-official-site",
        title: "Sesame Street Videos (official site) 📺🌈",
        link: "https://www.sesamestreet.org/videos",
        format: "video",
        description:
          "High-quality clips and songs that support listening with clear speech and simple story contexts.",
        details: {
          type: "Videos/songs 📺🎵",
          teaches: "Listening with clear speech, songs, simple story contexts. 🎧🗣️📖",
          howTo: [
            "Pick a short clip or song. 🎬🎵",
            "Watch together; pause to repeat 1–2 words. 👀⏸️🗣️",
            "Rewatch tomorrow to reinforce. 🔁📅"
          ],
          whyTopPick: "High-quality, child-safe educational content. ⭐🛡️",
          freeAccess: "Free to watch on the official page. 🆓📺",
          ageCheck: "Appropriate for toddlers; co-viewing recommended. 👶👀"
        },
        focus: "songs, clear speech",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "sesame-street-youtube",
        title: "Sesame Street (YouTube channel) 📺🌈",
        link: "https://www.youtube.com/sesamestreet",
        format: "video",
        description:
          "Songs and clips to build listening and early vocabulary through familiar characters.",
        details: {
          type: "Videos/songs 📺🎵",
          teaches: "Listening + early vocab through songs and characters. 🎧🧠🎶",
          howTo: [
            "Use YouTube Kids if available. 👶📱",
            "Start with song compilations; stop after 5–10 minutes. 🎶⏱️🛑",
            "Repeat the same favorite segment for a week. 🔁❤️📅"
          ],
          whyTopPick: "Strong engagement + lots of music-based listening. ⭐🎵",
          freeAccess: "Free to watch (YouTube). 🆓▶️",
          ageCheck: "Supervision needed (ads + autoplay). 👶⚠️"
        },
        focus: "songs, vocab",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "pbs-kids-videos-library",
        title: "PBS KIDS Videos (general library) 📺🧩",
        link: "https://pbskids.org/videos",
        format: "video",
        description:
          "Short episodes and songs to support early listening comprehension and vocabulary.",
        details: {
          type: "Videos 📺",
          teaches: "Listening comprehension via short episodes and songs. 🎧📖🎶",
          howTo: [
            "Choose calm, song-heavy clips. 😌🎵",
            "Ask “Where is…?” while pointing (colors/animals/objects). 👆❓🎨🐻",
            "Keep sessions short (5–8 min). ⏱️✅"
          ],
          whyTopPick: "Reputable kids broadcaster; free streaming library. ⭐📺🆓",
          freeAccess: "Free to watch on PBS KIDS. 🆓📺",
          ageCheck: "Generally toddler-safe; co-view to avoid overstimulation. 👶👀😌"
        },
        focus: "short videos, listening prompts",
        time: "5–8 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "pbs-kids-songs-page",
        title: "PBS KIDS Songs page 🎵🐾",
        link: "https://pbskids.org/videos/songs",
        format: "video",
        description:
          "Very short repeatable songs that support rhythm, repeated phrases, and routine cues.",
        details: {
          type: "Short songs 🎶",
          teaches: "Listening to rhythm, repeated phrases, theme songs. 🎧🥁🔁",
          howTo: [
            "Play 1 song; clap the beat. ▶️👏",
            "Repeat the chorus together. 🔁👫",
            "Use the same song for a week as a routine cue. 🔁📅⏰"
          ],
          whyTopPick: "Very short + repeatable. ⭐⏱️🔁",
          freeAccess: "Free to watch. 🆓📺",
          ageCheck: "Works for 0–3 with caregiver support. 👶🧑‍🍼"
        },
        focus: "songs, rhythm, repetition",
        time: "2–4 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "khan-academy-kids-app",
        title: "Khan Academy Kids 📱🧸",
        link: "https://www.khanacademy.org/kids",
        format: "app",
        description:
          "Free learning app with songs/stories/activities; useful for caregiver-led listening time.",
        details: {
          type: "Free learning app (songs, stories, activities) 📱🎵📖",
          teaches: "Listening to instructions + simple stories/songs (plus early literacy). 🎧✅📚",
          howTo: [
            "Use “Books” or story read-alouds for listening time. 📖🎧",
            "Sit with the child; echo 1–2 words per page. 👶🗣️",
            "Stop after 10 minutes. ⏱️🛑"
          ],
          whyTopPick: "Designed to be free (no ads/subscriptions). ⭐🆓",
          freeAccess: "Free to use (app install required). 🆓📲",
          ageCheck: "Designed for young kids; 0–3 should be caregiver-led. 👶🧑‍🍼"
        },
        focus: "listen & follow, short stories",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "storynory-audio-stories",
        title: "Storynory — free audio stories 🎧📖",
        link: "https://www.storynory.com/",
        format: "audio",
        description:
          "Free audio stories to build gentle listening stamina and vocabulary (choose the shortest options).",
        details: {
          type: "Audio stories 🎧",
          teaches: "Listening stamina through short stories; gentle vocab exposure. 🎧💪🗣️",
          howTo: [
            "Use “Small Stories” for shorter options. 🎯⏱️",
            "Play 2–5 minutes; stop and summarize with gestures. ⏱️🛑👐",
            "Repeat the same story 2–3 times across the week. 🔁📅"
          ],
          whyTopPick: "Large library of free audio stories. ⭐🎧🆓",
          freeAccess: "Free to stream from the site. 🆓🌐",
          ageCheck: "Some stories skew older; preview first and choose short ones. 👶⚠️👀",
          otherLinks: ["https://www.storynory.com/category/fairy-tales/small-stories/"]
        },
        focus: "audio stories, short listening",
        time: "2–5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "little-stories-for-tiny-people-podcast",
        title: "Little Stories for Tiny People 🎧🧸",
        link: "https://www.littlestoriestinypeople.com/",
        format: "podcast",
        description:
          "Podcast stories (calmer episodes work well for bedtime/car rides; use short chunks for toddlers).",
        details: {
          type: "Podcast (stories) 🎧",
          teaches: "Listening to narrative + emotions/vocab. 🎧❤️🗣️",
          howTo: [
            "Choose calmer episodes for bedtime/car rides. 😌🌙🚗",
            "Listen in short chunks (pause often). ⏸️⏱️",
            "Reuse favorite episodes repeatedly (toddlers learn via repetition). 🔁👶"
          ],
          whyTopPick: "High-quality storytelling; easy to play anywhere. ⭐🎧",
          freeAccess: "Free episodes available (premium exists for extras/ad-free). 🆓➕",
          ageCheck: "Best for 2–3 with caregiver; 0–1 use short snippets. 👶🧑‍🍼"
        },
        focus: "calm stories, repetition",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "sleep-tight-stories-podcast",
        title: "Sleep Tight Stories 🌙🎧",
        link: "https://sleeptightstories.org/",
        format: "podcast",
        description:
          "Bedtime podcast designed to be calming; useful for a wind-down listening routine.",
        details: {
          type: "Bedtime podcast 🌙🎧",
          teaches: "Calm listening, routine language, story comprehension. 😌🎧📖",
          howTo: [
            "Use as a nightly routine cue (same time). 🌙⏰",
            "Dim lights; play 5–10 minutes. 💡⬇️⏱️",
            "Ask one simple question after: “More?” / “Sleep?” ❓😴"
          ],
          whyTopPick: "Specifically designed to be calming at bedtime. ⭐🌙",
          freeAccess: "Free listening available (some platforms may upsell). 🆓⚠️",
          ageCheck: "Appropriate for toddlers; supervise device use. 👶📱👀"
        },
        focus: "bedtime routine, calm audio",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "abc-kids-listen-lullabies",
        title: "ABC Kids Listen – Lullabies 🎶😴",
        link: "https://www.abc.net.au/kidslisten/programs/lullabies",
        format: "audio",
        description:
          "Audio lullabies for calm listening and bedtime routine cues (low volume; audio-only).",
        details: {
          type: "Audio program (lullabies) 🎧🎶",
          teaches: "Calm listening, rhythm, bedtime routine language. 😌🥁🌙",
          howTo: [
            "Play during wind-down (same playlist each night). 🌙▶️🔁",
            "Add a repeated phrase: “Sleep time.” 🗣️🔁😴",
            "Keep volume low; no screen needed. 🔉⬇️🚫📺"
          ],
          whyTopPick: "Audio-only environment; built for young kids. ⭐🛡️🎧",
          freeAccess: "Free to stream on the ABC site. 🆓🌐",
          ageCheck: "Strong fit for 0–3 (caregiver-led). 👶🧑‍🍼"
        },
        focus: "lullabies, calm routine",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "abc-kids-listen-bedtime-stories",
        title: "ABC Kids Listen – Bedtime Stories 🌙📖🎧",
        link: "https://www.abc.net.au/kidslisten/programs/bedtime-stories",
        format: "audio",
        description:
          "Audio stories to support simple narrative listening and bedtime vocabulary (use short excerpts for younger children).",
        details: {
          type: "Audio stories 🎧📖",
          teaches: "Listening to simple narratives; bedtime vocabulary. 🎧📚🌙",
          howTo: [
            "Play 1 story; pause halfway to recap with gestures. ▶️⏸️👐",
            "Repeat the same story another day. 🔁📅",
            "Pair with a stuffed toy for “point/listen” moments. 🧸👉🎧"
          ],
          whyTopPick: "High-quality kids audio. ⭐📻",
          freeAccess: "Free to stream. 🆓🎧",
          ageCheck: "Best for toddlers; 0–1 use short excerpts. 👶🧑‍🍼"
        },
        focus: "bedtime stories, calm listening",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "national-literacy-trust-free-resources",
        title: "National Literacy Trust — free early years resources (0–5) 📚👶",
        link: "https://literacytrust.org.uk/free-resources/",
        format: "site",
        description:
          "Caregiver activities and guidance to build talk/listen routines (often no-screen).",
        details: {
          type: "Parent resources/activities (language + listening routines) 🧑‍🍼🧩",
          teaches: "Caregiver-led talk/listen routines (chat/play/read). 🗣️🎧📖",
          howTo: [
            "Download one 0–3 activity idea. ⬇️💡",
            "Do it for 3–5 minutes daily (no screen). ⏱️🚫📺",
            "Repeat weekly. 🔁📅"
          ],
          whyTopPick: "Reputable literacy org; practical for families. ⭐👨‍👩‍👧‍👦",
          freeAccess: "Free resources/downloads available. 🆓⬇️",
          ageCheck: "Built for birth–5; adult-led. 👶🧑‍🍼"
        },
        focus: "caregiver routines, no-screen options",
        time: "3–5 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "unicef-parenting-early-learning",
        title: "UNICEF Parenting — early learning 👶🌍",
        link: "https://www.unicef.org/parenting/topics/early-learning",
        format: "site",
        description:
          "Caregiver guidance for early learning (music + interaction ideas for language and listening).",
        details: {
          type: "Caregiver guidance + embedded media 🧑‍🍼📺",
          teaches: "How to use music and interaction to build early language/listening. 🎶🤝🗣️🎧",
          howTo: [
            "Pick one idea (music + interaction). 🎶🤝",
            "Do a 2-minute “sing + pause” routine daily. 🎤⏸️📅",
            "Keep it playful; repeat often. 🎈🔁"
          ],
          whyTopPick: "Evidence-informed parenting guidance. ⭐📘",
          freeAccess: "Free to access. 🆓🌐",
          ageCheck: "Suitable for 0–3; caregiver content (not toddler-alone). 👶🧑‍🍼"
        },
        focus: "caregiver guidance, sing & pause",
        time: "2–5 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "dream-english-nursery-rhyme-mp3s",
        title: "Dream English — downloadable nursery rhyme MP3s 🎶⬇️",
        link: "https://www.dreamenglish.com/topicnurseryrhymes",
        format: "download",
        description:
          "Downloadable songs for offline listening (reduces ad/screen issues); great for rhythm and repetition.",
        details: {
          type: "Downloadable songs (MP3) 🎵⬇️",
          teaches: "Listening through classic rhymes; repetition + rhythm. 🎧🔁🥁",
          howTo: [
            "Download 3–5 favorite songs for offline use. ⬇️❤️🎶",
            "Play audio-only (no video) during playtime. 🎧🚫📺🧸",
            "Add gestures for key words (bus, wheels, up/down). 🚌👐⬆️⬇️"
          ],
          whyTopPick: "Offline audio reduces ad/screen issues. ⭐🎧🚫📺",
          freeAccess: "Free downloads provided on the page. 🆓⬇️",
          ageCheck: "Very good for 0–3 with caregiver-led actions. 👶🧑‍🍼👐"
        },
        focus: "offline songs, gestures",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "best-set-recommended-bundle-for-0-3-listening",
        title: "Best “Set” (bundle + simple weekly plan for 0–3 Listening) 🧺🎧",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "Short, repeatable exposure (10–15 minutes/day total), mostly caregiver-led: one routine song, one mini story, one calm audio segment, plus a weekend “big fun” co-view clip.",
        bundleItems: [
          "super-simple-songs-website",
          "storynory-audio-stories",
          "abc-kids-listen-lullabies",
          "sesame-street-videos-official-site",
          "national-literacy-trust-free-resources"
        ],
        details: {
          type: "Recommended bundle 🧺",
          teaches: "A calm listening routine built on repetition + simple caregiver interaction. 🔁🧑‍🍼🎧",
          howTo: [
            "Mon–Fri (10–15 min/day): Routine song (2–3 min) — Super Simple Songs (pick ONE song for the whole week). 🎵⏱️🔁",
            "Mon–Fri: Mini-story (3–5 min) — Storynory (choose one short story; repeat all week). 🎧📖🔁",
            "Mon–Fri: Calm audio (5 min) — ABC Kids Listen Lullabies (same segment daily as a cue). 😌🎶⏱️",
            "Weekend (5–10 min): Co-view “big fun” — Sesame Street official videos (pick one song clip; repeat). 📺🎵🔁",
            "Daily micro-skill: Add 2 pauses to point/gesture and let the child copy 1 sound/word. ⏸️👉🗣️"
          ],
          whyTopPick: "Easy weekly structure: same song + same story + same calm audio. ⭐🔁",
          freeAccess: "Uses free resources; some video links may include ads depending on platform. 🆓⚠️",
          ageCheck: "Designed for 0–3 with caregiver supervision. 👶🧑‍🍼"
        },
        focus: "routine, repetition, calm listening",
        time: "10–15 min/day",
        level: "caregiver-led"
      },

      // =========================
      // 0–3 WRITING (new)
      // =========================
      {
        age: "0-3",
        skill: "writing",
        slug: "zero-to-three-learning-to-write-and-draw",
        title: "ZERO TO THREE — Learning to Write and Draw ✍️🖍️",
        link: "https://www.zerotothree.org/resource/distillation/learning-to-write-and-draw/",
        format: "site",
        description:
          "Parent guidance on pre-writing stages (scribbling → lines/patterns) and how to encourage mark-making.",
        details: {
          type: "Parent guide 📘",
          teaches: "“Pre-writing” stages (scribbling → lines/patterns) and how to support them. ✍️➡️〰️",
          howTo: [
            "Match activities to your child’s stage (random scribble vs. controlled scribble). 🎯✍️",
            "Offer chunky crayons/markers and big paper. 🖍️📄",
            "Praise effort and display their “writing.” 🌟🖼️"
          ],
          whyTopPick: "Clear age-banded stages and practical ideas. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Best for ~15 months–3; for 0–12 months do supported mark-making (finger paint, big strokes). 👶🖐️🎨"
        },
        focus: "development stages, mark-making",
        time: "3–5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "pbs-parents-writing-at-age-2",
        title: "PBS KIDS for Parents — Writing at Age 2 ✍️🐾",
        link: "https://www.pbs.org/parents/learn-grow/age-2/literacy/writing",
        format: "site",
        description:
          "Simple parent tips for early writing via scribbling/painting and strengthening hand muscles.",
        details: {
          type: "Parent tips 📋",
          teaches: "Early writing through scribbling/painting and strong hand muscles. ✍️🎨💪",
          howTo: [
            "Keep thick crayons/markers and paper easy to access. 🖍️📄✅",
            "Do a 3-minute “scribble time” daily. ⏱️✍️",
            "Talk about what they made (“line”, “big”, “more”). 🗣️〰️⬆️➕"
          ],
          whyTopPick: "Practical, toddler-specific, quick routines. ⭐👶",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Ideal for ~18 months–3; supervise for mess/safety. 👶🧑‍🍼⚠️"
        },
        focus: "daily scribble routine",
        time: "3 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "montana-pbs-writing-milestone-baby",
        title: "Montana PBS — Writing Milestones (Baby) ✍️👶",
        link: "https://montanapbs.org/parents/readinglanguage/baby/writing_milestone_baby.html",
        format: "site",
        description:
          "Early “writing” as mark-making using washable materials with full caregiver support.",
        details: {
          type: "Parent tips 📋",
          teaches: "Earliest mark-making with washable materials and short sessions. ✍️🧼",
          howTo: [
            "Use washable crayons/paint. 🖍️🎨🧼",
            "Let baby make marks while you hold/steady paper. 👶✍️📄",
            "Keep it under 2–3 minutes. ⏱️✅"
          ],
          whyTopPick: "Good for the youngest end (0–12 months) with caregiver support. ⭐👶",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "0–1 requires full supervision; avoid small parts/caps. 👶⚠️"
        },
        focus: "supported mark-making",
        time: "2–3 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "montana-pbs-writing-milestone-toddler",
        title: "Montana PBS — Writing Milestones (Toddler) ✍️👶",
        link: "https://montanapbs.org/parents/readinglanguage/toddler/writing_milestone_toddler.html",
        format: "site",
        description:
          "Toddler scribbling/lines as meaningful early writing, with ideas for home routines.",
        details: {
          type: "Parent tips 📋",
          teaches: "Scribbling/lines as meaningful early writing and communication. ✍️〰️",
          howTo: [
            "Leave crayons in easy reach (safe, supervised). 🖍️✅",
            "Encourage “pictures, squiggles, lines,” then ask “Tell me!” 🗣️❓",
            "Display their work at eye level. 🖼️👀"
          ],
          whyTopPick: "Clear expectations for toddler scribble development. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Strong for 1–3; caregiver-led. 👶🧑‍🍼"
        },
        focus: "scribbles to lines",
        time: "3–5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "naeyc-support-writing-at-home",
        title: "NAEYC — Support Writing at Home ✍️🏠",
        link: "https://www.naeyc.org/our-work/families/support-writing-home",
        format: "site",
        description:
          "Family-friendly strategies that treat scribbles and mark-making as real writing and communication.",
        details: {
          type: "Parent strategies 📘",
          teaches: "Writing begins with marks/scribbles and play; adults model without pressure. ✍️🧸",
          howTo: [
            "Provide different tools (crayons, paintbrush, sidewalk chalk). 🖍️🖌️🧱",
            "Let your child “write” lists/cards while you model. 📝👶",
            "Accept scribbles as real writing. ✅✍️"
          ],
          whyTopPick: "Developmentally appropriate, play-based guidance. ⭐👨‍👩‍👧‍👦",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Fits 0–3 with adult modeling and supervision. 👶🧑‍🍼"
        },
        focus: "play-based writing",
        time: "3–5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "reading-rockets-writing-basics",
        title: "Reading Rockets — Writing Basics ✍️🚀",
        link: "https://www.readingrockets.org/literacy-home/reading-101-guide-parents/writing-basics",
        format: "site",
        description:
          "Explains why scribbling matters and how early mark-making supports print awareness and writing foundations.",
        details: {
          type: "Parent guide 📘",
          teaches: "Scribbling as early writing; tools, meaning, and print awareness. ✍️🔤",
          howTo: [
            "Point out real-world writing (labels, signs). 👉🏷️🪧",
            "Offer safe tools and let your child imitate. 🖍️👶",
            "Keep it playful and short. 🎈⏱️"
          ],
          whyTopPick: "Clear explanation of why early marks matter. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Great for 2–3; adapt for younger with more modeling. 👶🧑‍🍼"
        },
        focus: "why scribbling matters",
        time: "2–5 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "vroom-free-tips",
        title: "Vroom — Free Tips (1000+ quick activities) 🧠🧩",
        link: "https://www.vroom.org/",
        format: "site",
        description:
          "Low-prep activity ideas that build fine-motor strength and pre-writing readiness during daily routines.",
        details: {
          type: "Activity bank (tips + printable ideas) 📄📱",
          teaches: "Fine-motor + “pre-writing” readiness through everyday routines. ✍️💪",
          howTo: [
            "Pick one tip (or print a few). 📱🖨️",
            "Do 1 tip/day during meals/bath/play (2–5 minutes). 🍽️🛁🧸⏱️",
            "Repeat favorites for a week. 🔁📅"
          ],
          whyTopPick: "Very low prep and designed for birth–5 routines. ⭐👶",
          freeAccess: "Free to access. 🆓🌐",
          ageCheck: "0–3 appropriate; caregiver-led. 👶🧑‍🍼"
        },
        focus: "fine motor, routines",
        time: "2–5 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "nhs-cambs-getting-ready-to-write",
        title: "NHS (Cambs & Peterborough) — Getting ready to write ✍️🏥",
        link: "https://cambspborochildrenshealth.nhs.uk/child-development-and-growing-up/hand-skills/getting-ready-to-write/",
        format: "site",
        description:
          "OT-style activity ideas for mark making using sensory media (foam, chalk, water painting outside).",
        details: {
          type: "OT-style activity ideas 🧩",
          teaches: "Mark making with sensory media and big movements before pencil control. ✍️🎨",
          howTo: [
            "Choose 1 medium (water + brush on pavement; shaving foam tray; chalk). 💧🖌️🧼🧱",
            "Model one stroke (“up/down”, “round”). ⬆️⬇️⭕️",
            "Let the child explore freely for 3–5 minutes. 🎈⏱️"
          ],
          whyTopPick: "Concrete, toddler-appropriate activity list. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Supervise closely; use toddler-safe materials if mouthing is likely. 👶⚠️"
        },
        focus: "sensory mark-making",
        time: "3–5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "nhs-west-suffolk-pre-writing-early-pencil-skills-pdf",
        title: "NHS (West Suffolk) — Pre-Writing / Early Pencil Skills (PDF) ✍️📄",
        link: "https://www.wsh.nhs.uk/CMS-Documents/Services/Integrated-Community-Paediatric-Services-OT/f.-Pre-Writing-Early-Pencil-Skills.pdf",
        format: "pdf",
        description:
          "Printable OT handout: foundations before pencil control and copying simple marks with narrated strokes.",
        details: {
          type: "Printable OT handout 📄",
          teaches: "Foundations before pencil control; copying simple marks with narration. ✍️🗣️",
          howTo: [
            "Start with big movements (arm/shoulder) and large surfaces. 💪📄",
            "Copy their marks and narrate “up/down, round/round.” 🗣️⬆️⬇️⭕️",
            "Gradually introduce simple shapes. 🔺⭕️⬜️"
          ],
          whyTopPick: "Step-by-step and practical for parents. ⭐✅",
          freeAccess: "Free PDF. 🆓📄",
          ageCheck: "Best for ~18 months–3; adapt down with finger painting. 👶🖐️🎨"
        },
        focus: "stroke talk, foundations",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "nhs-uhb-pre-writing-skills-pdf",
        title: "NHS (Solihull / UHB) — Pre-writing skills (PDF) ✍️📄",
        link: "https://childrenscommunitytherapies.uhb.nhs.uk/wp-content/uploads/WEB_DIGITAL_PI24_3087_01-Pre-writing-skills-advice-sheet-copy.pdf",
        format: "pdf",
        description:
          "Printable advice sheet: pre-writing strokes and playful ways to practice them (sensory first, then chunky tools).",
        details: {
          type: "Printable OT advice sheet 📄",
          teaches: "Pre-writing strokes that build toward letters, without letter drilling. ✍️➡️🔤",
          howTo: [
            "Practice strokes in sensory media first (tray, foam, sand). 🧼🏖️",
            "Move to chunky crayons on big paper. 🖍️📄",
            "Keep it playful, not worksheet-heavy. 🎈🚫📄"
          ],
          whyTopPick: "Clear progression from strokes to writing readiness. ⭐✅",
          freeAccess: "Free PDF. 🆓📄",
          ageCheck: "For 2–3 use only a few strokes; under-2 focus on free marks. 👶✅"
        },
        focus: "pre-writing strokes",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "birth-to-5-matters-mark-making-matters-pdf",
        title: "Birth to 5 Matters — Mark Making Matters (PDF) ✍️📄",
        link: "https://birthto5matters.org.uk/wp-content/uploads/2021/03/Mark_Marking_Matters.pdf",
        format: "pdf",
        description:
          "Guidance on why mark-making is meaningful communication and how adults can support it at home.",
        details: {
          type: "Guidance PDF 📄",
          teaches: "Why mark-making is meaningful communication + how to support it. ✍️🗣️",
          howTo: [
            "Skim the overview once. 👀1️⃣",
            "Choose 2 activity ideas that fit your home routines. 2️⃣🏠",
            "Use them consistently for a week. 🔁📅"
          ],
          whyTopPick: "Strong rationale + practical early-years framing. ⭐✅",
          freeAccess: "Free PDF. 🆓📄",
          ageCheck: "Adult-facing; choose toddler-safe materials. 👶🧑‍🍼✅"
        },
        focus: "why marks matter",
        time: "10 min (read once)",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "dfe-help-for-early-years-writing",
        title: "UK DfE — Help for early years providers: Writing ✍️🏛️",
        link: "https://help-for-early-years-providers.education.gov.uk/areas-of-learning/literacy/writing",
        format: "site",
        description:
          "Official guidance emphasizing mark making first, hand-eye coordination, and finger strength (adaptable for home use).",
        details: {
          type: "Guidance page 📘",
          teaches: "Mark making first; build hand-eye coordination and finger strength. ✍️👁️✋💪",
          howTo: [
            "Use a “mark making first” approach. ✅✍️",
            "Set up a simple “mark station” (paper + chunky tool). 📄🖍️",
            "Rotate surfaces (paper, cardboard, chalk outdoors). 📄📦🧱🌤️"
          ],
          whyTopPick: "Clear framework aligned to early years practice. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Suitable framework for 0–3 with caregiver adaptation. 👶🧑‍🍼"
        },
        focus: "framework, mark station",
        time: "5 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "bbc-tiny-happy-people-spring-pack-pdf",
        title: "BBC Tiny Happy People — Spring Pack (PDF) 🌸📄",
        link: "https://teach.files.bbci.co.uk/tiny-happy-people/THP%20SPRING%20PACK_ONLINE_0403.pdf",
        format: "pdf",
        description:
          "Printable activity pack with play-based early learning ideas (including mark-making style activities).",
        details: {
          type: "Activity pack (printable) 📄",
          teaches: "Play-based early learning + mark-making activities. 🧸✍️",
          howTo: [
            "Print only the pages you need. 🖨️✅",
            "Do 1 activity, 5 minutes max. 1️⃣⏱️",
            "Talk while making marks (“long line”, “dots”, “again”). 🗣️〰️•🔁"
          ],
          whyTopPick: "Ready-to-use family activities in one pack. ⭐✅",
          freeAccess: "Free PDF download. 🆓⬇️",
          ageCheck: "Appropriate for under-5s; supervise crafts. 👶🧑‍🍼⚠️"
        },
        focus: "printable activities",
        time: "5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "pregnancy-birth-baby-learning-to-draw-and-write",
        title: "Pregnancy, Birth and Baby (Australia) — learning how to draw and write ✍️🖍️",
        link: "https://www.pregnancybirthbaby.org.au/toddler-development-learning-how-to-draw-and-write",
        format: "site",
        description:
          "Developmental overview of progression from scribbles to circles/outlines with practical guidance for parents.",
        details: {
          type: "Parent guidance 📘",
          teaches: "Typical progression from scribbles to circles/outlines and beyond. ✍️➡️⭕️",
          howTo: [
            "Check what “stage” your toddler is in. 🎯👶",
            "Offer suitable tools and simple prompts (no letter drilling). 🖍️✅🚫🔤",
            "Keep sessions short and frequent. ⏱️🔁"
          ],
          whyTopPick: "Clear developmental overview and expectations. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Best for ~2+; for younger focus on sensory mark-making. 👶🎨"
        },
        focus: "development milestones",
        time: "5 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "aap-healthychildren-scribble-time-handwriting-foundations",
        title: "HealthyChildren.org (AAP) — “Allow for scribble time” ✍️🧠",
        link: "https://www.healthychildren.org/English/family-life/Media/Pages/The-Importance-of-Handwriting-in-the-Digital-Age.aspx",
        format: "site",
        description:
          "Pediatric advice emphasizing scribble/shape practice before letters to build handwriting foundations.",
        details: {
          type: "Parent advice (AAP) 📘",
          teaches: "Scribble/trace shapes before letters; shape copying builds foundations. ✍️⭕️➡️🔤",
          howTo: [
            "Do 2–3 minutes of scribble time daily. 📅⏱️✍️",
            "Trace big shapes with finger first, then chunky crayon. 👆⭕️➡️🖍️",
            "Stop before frustration. 🛑😊"
          ],
          whyTopPick: "Simple “before letters” message from a pediatric source. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Works best for 2–3; under-2 keep it sensory and large-scale. 👶🎨"
        },
        focus: "scribble time, shapes",
        time: "2–3 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "best-set-recommended-bundle-for-0-3-writing",
        title: "Best “Set” (recommended bundle for 0–3 Writing) 🧺✍️",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "A repeatable 10-minute routine, 5 days/week (repeat for 1–2 weeks): stage target + sensory marks + scribble station + stroke talk + 1 parent micro-tip.",
        bundleItems: [
          "zero-to-three-learning-to-write-and-draw",
          "nhs-cambs-getting-ready-to-write",
          "pbs-parents-writing-at-age-2",
          "nhs-west-suffolk-pre-writing-early-pencil-skills-pdf",
          "vroom-free-tips"
        ],
        details: {
          type: "Recommended bundle 🧺",
          teaches: "Fine-motor strength + mark-making progression (scribble → lines → circles) through short, playful routines. ✍️💪🔁",
          howTo: [
            "Development target (1 min): ZERO TO THREE stage check → pick today’s goal (scribble / lines / circles). 🎯✍️",
            "Sensory mark-making (3 min): NHS “Getting ready to write” (foam tray / water painting / chalk). 🎨💧🧱⏱️",
            "Scribble station (3 min): PBS idea — thick crayons/markers + big paper. 🖍️📄⏱️",
            "Stroke talk (2 min): West Suffolk NHS PDF — copy their marks and narrate “up/down, round/round.” 🗣️⬆️⬇️⭕️",
            "Parent micro-tip (1 min): Vroom — do one fine-motor/hand activity in a normal routine. ✋💪⏱️"
          ],
          whyTopPick: "Very repeatable, low prep, and supports real developmental stages. ⭐🔁",
          freeAccess: "Uses free resources (some are PDFs). 🆓📄",
          ageCheck: "Designed for 0–3 with close supervision and washable materials. 👶🧑‍🍼"
        },
        focus: "mark-making routine, fine motor",
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
