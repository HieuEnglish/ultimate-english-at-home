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
      },

      "0-3/speaking": {
        title: "0–3 Speaking 🗣️👶✨",
        overview:
          "This pack supports 0–3 speaking and early communication through caregiver-led “serve and return” turn-taking, short daily talk routines, sing-along imitation, and simple choice questions—repeating the same materials across the week for faster learning.",
        objectives: [
          "Build back-and-forth communication (child “serves” → adult responds → pause for the next turn).",
          "Encourage copying sounds/words/short phrases through repeatable songs and echoing.",
          "Increase everyday functional language using short narration and waiting for attempts.",
          "Prompt first words/choices with simple either/or questions (e.g., “milk or water?”).",
          "Keep goals age-appropriate by choosing a realistic “next step” (gesture → 1 word → 2-word phrase)."
        ],
        materials: [
          "A caregiver for active interaction (not passive watching).",
          "A few toys/objects for play-based talk (cars, dolls, blocks, food items).",
          "Phone/tablet for: one Vroom tip/day + one short sing-along clip/song.",
          "Optional weekly reference: CDC milestones to choose the next target."
        ],
        bestSetSlug: "best-set-recommended-bundle-for-0-3-speaking"
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
        slug: "0-3-reading-storyline-online",
        title: "Storyline Online — Celebrity Read-Alouds 🌟📖",
        link: "https://storylineonline.net/",
        format: "video",
        description:
          "Free videos of celebrated actors reading children's picture books aloud, with beautiful animations. Perfect for shared screen-time reading.",
        details: {
          type: "Video read-alouds of picture books 🎥📖",
          teaches: "Listening comprehension, story vocabulary, and love of books. 👂📚❤️",
          howTo: [
            "Pick a short video together. 🎬🤝",
            "Watch and listen (pause to talk about pictures). ⏸️🗣️",
            "Ask: 'What happened in the story?' 🧠❓",
            "Re-watch the same video a few days later. 🔁📅"
          ],
          whyTopPick: "Celebrity voices + beautiful animations captivate even the youngest listeners. ⭐🌟",
          freeAccess: "Free to stream on the website. 🆓✅",
          ageCheck: "Perfect for 0–3 with caregiver. 👶🧑‍🍼"
        },
        focus: "read-alouds, story enjoyment",
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

      {
        age: "0-3",
        skill: "reading",
        slug: "starfall-free-phonics",
        title: "Starfall — Free Phonics & Reading Sections ⭐📚",
        link: "https://www.starfall.com/h/index-kindergarten.php",
        format: "site",
        description:
          "Free online games and simple digital books that introduce letters, sounds, and early vocabulary.",
        details: {
          type: "Interactive site/app (free sections) 💻📱",
          teaches: "Alphabet basics, sounds, and early word recognition. 🔤🗣️",
          howTo: [
            "Start with the ABCs section. 🔤",
            "Let the child explore the animated letter sounds. 🔊✨",
            "Keep sessions short (5-10 minutes). ⏱️"
          ],
          whyTopPick: "Engaging, ad-free environment for the free sections. ⭐🛡️",
          freeAccess: "Free sections available without login. 🆓✅",
          ageCheck: "Best for 2-3; co-play with a caregiver. 👶🧑‍🍼"
        },
        focus: "phonics basics, letter sounds",
        time: "5-10 min",
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
        link: "https://www.littlestoriestinypepeople.com/",
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

      {
        age: "0-3",
        skill: "listening",
        slug: "cbeebies-radio",
        title: "CBeebies Radio (BBC) 📻🎶",
        link: "https://www.bbc.co.uk/cbeebies/radio",
        format: "audio",
        description:
          "Free audio stories, rhymes, and calming sounds perfect for toddler listening routines.",
        details: {
          type: "Audio platform 📻",
          teaches: "Listening comprehension, music appreciation, and calming down. 🎧🎵😌",
          howTo: [
            "Pick a short audio story or rhyme. 📖🎵",
            "Listen together without any screens. 🚫📺",
            "Use as part of a wind-down routine. 🌙"
          ],
          whyTopPick: "High-quality, screen-free BBC audio for young kids. ⭐📻",
          freeAccess: "Free to stream on the BBC site. 🆓🌐",
          ageCheck: "Ideal for 0-3 (caregiver-led calm listening). 👶🧑‍🍼"
        },
        focus: "calm audio, nursery rhymes",
        time: "5-15 min",
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
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "pbs-kids-printables",
        title: "PBS KIDS Printables & Coloring 🖍️📄",
        link: "https://pbskids.org/games/coloring",
        format: "site",
        description:
          "Free, printable coloring sheets featuring familiar characters to encourage early mark-making and crayon grip.",
        details: {
          type: "Printable coloring pages 🖨️🎨",
          teaches: "Fine motor control, grip strength, and early mark-making via coloring. 🖍️💪",
          howTo: [
            "Print a few familiar character sheets. 🖨️🐻",
            "Provide thick, washable crayons suitable for toddlers. 🖍️✅",
            "Focus on the process of making marks, not staying in the lines. 〰️🎈"
          ],
          whyTopPick: "Familiar characters motivate early holding and scribbling. ⭐🖍️",
          freeAccess: "Free to access and print. 🆓🖨️",
          ageCheck: "2-3 for guided coloring; use large grip crayons. 👶👨‍👩‍👧‍👦"
        },
        focus: "coloring, fine motor grip",
        time: "5-10 min",
        level: "caregiver-led"
      },

      // =========================
      // 0–3 SPEAKING (new)
      // =========================
      {
        age: "0-3",
        skill: "speaking",
        slug: "harvard-serve-and-return-5-steps-parents-caregivers-pdf",
        title: "Harvard — 5 Steps for “Serve and Return” (PDF) 🧠👶📄",
        link: "https://developingchild.harvard.edu/wp-content/uploads/2024/10/HCDC_ServeReturn_for_Parents_Caregivers_2019.pdf",
        format: "pdf",
        description:
          "Printable guide showing how to do back-and-forth “serve and return” turn-taking for early communication (even before words).",
        details: {
          type: "Printable guide (PDF) 📄",
          teaches: "Back-and-forth “turn taking” that builds early communication. 🔁🗣️",
          howTo: [
            "Notice your child’s “serve” (look, sound, reach). 👀🔊✋",
            "Respond right away with a word + face + action. 🗣️🙂👐",
            "Pause and wait for the next “serve.” ⏸️👶"
          ],
          whyTopPick: "Clear, science-based steps that fit birth–3. ⭐🧠",
          freeAccess: "Free PDF. 🆓📄",
          ageCheck: "Ideal for 0–3; caregiver-led. 👶🧑‍🍼"
        },
        focus: "serve and return, turn-taking",
        time: "5 min (read once) + daily practice",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "harvard-serve-and-return-how-to-page",
        title: "Harvard — Serve and Return “How-to” (page + video) 🎥🧠",
        link: "https://developingchild.harvard.edu/resources/videos/how-to-5-steps-for-brain-building-serve-and-return/",
        format: "video",
        description:
          "Short video and guidance demonstrating responsive “talking turns” with babies and toddlers.",
        details: {
          type: "Short video + guidance 🎬📘",
          teaches: "How to do responsive back-and-forth turns during everyday play. 🗣️🔁👶",
          howTo: [
            "Watch once. 👀1️⃣",
            "Practice during play (blocks, peekaboo) for 2–3 minutes. 🧱🙈⏱️",
            "Repeat daily with the same routine. 🔁📅"
          ],
          whyTopPick: "Shows exactly what to do (easy to copy). ⭐✅",
          freeAccess: "Free to view. 🆓👀",
          ageCheck: "0–3 appropriate; co-view. 👶👀"
        },
        focus: "responsive interaction, modeling",
        time: "2–3 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "zero-to-three-tips-on-learning-to-talk",
        title: "ZERO TO THREE — Tips on Learning to Talk 🗣️👶",
        link: "https://www.zerotothree.org/resource/tips-on-learning-to-talk/",
        format: "site",
        description:
          "Practical daily tips to prompt first words through repetition, following the child’s lead, and waiting for responses.",
        details: {
          type: "Parent tip list 📋",
          teaches: "First words through daily talk routines, repetition, and waiting. 🗣️🔁⏸️",
          howTo: [
            "Choose 2 tips (follow interests; repeat simple words). 2️⃣💡",
            "Apply them during meals/bath/play. 🍽️🛁🧸",
            "Keep “talk bursts” short (30–60 seconds). ⏱️✅"
          ],
          whyTopPick: "Everyday, toddler-ready guidance. ⭐🏠",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Built for early childhood; caregiver-led. 👶🧑‍🍼"
        },
        focus: "first words, routines",
        time: "1–3 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "nhs-help-your-baby-learn-to-talk",
        title: "NHS — Help your baby learn to talk 🏥🗣️",
        link: "https://www.nhs.uk/baby/babys-development/play-and-learning/help-your-baby-learn-to-talk/",
        format: "site",
        description:
          "Health-service guidance with simple ways to prompt sounds/words, including tips that work well in routines.",
        details: {
          type: "Parent guidance 🧑‍🍼",
          teaches: "Prompting sounds/words and supporting communication in daily routines. 🗣️✅",
          howTo: [
            "Pick one daily moment (changing, feeding). 🍼👶",
            "Narrate actions with 1–2 word phrases (“up”, “wash”, “more”). 🗣️⬆️🧼➕",
            "Pause to let your child attempt a sound/gesture. ⏸️👶👐"
          ],
          whyTopPick: "Trustworthy, clear, age-aligned advice. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Appropriate for babies and toddlers; caregiver-led. 👶🧑‍🍼"
        },
        focus: "routine narration, pausing",
        time: "1–3 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "naeyc-support-language-development-infants-toddlers",
        title: "NAEYC — 12 Ways to Support Language Development (Infants & Toddlers) 🗣️👶",
        link: "https://www.naeyc.org/our-work/families/support-language-development-infants-and-toddlers",
        format: "site",
        description:
          "Fast, actionable ideas (gestures + simple talk routines) that lead into speaking.",
        details: {
          type: "Parent activity ideas 🧩",
          teaches: "Gestures + short talk routines that support early language and speaking. 👐🗣️",
          howTo: [
            "Choose 1 idea per week (gesture + word; describe what they do). 1️⃣📅",
            "Repeat it in the same routine daily. 🔁📅",
            "Celebrate any attempt (sound/gesture/word). 🎉👶🗣️"
          ],
          whyTopPick: "Developmentally realistic and easy to apply. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Specifically for infants/toddlers. 👶✅"
        },
        focus: "gestures to words",
        time: "2–5 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "asha-activities-encourage-speech-language-development",
        title: "ASHA — Activities to Encourage Speech and Language Development 🗣️🧠",
        link: "https://www.asha.org/public/speech/development/activities-to-encourage-speech-and-language-development/",
        format: "site",
        description:
          "Authoritative play-based ideas for early talking opportunities, short phrases, and simple choice questions.",
        details: {
          type: "Parent activity list 📋",
          teaches: "Play-based talking opportunities + early conversation skills. 🧸🗣️",
          howTo: [
            "Pick one play theme (house, cars, dolls). 🏠🚗🧸",
            "Model short phrases (“car go”, “baby sleep”). 🗣️✅",
            "Offer choices to prompt speech (“milk or water?”). 🥛❓💧"
          ],
          whyTopPick: "Practical guidance that maps to real play. ⭐🧸",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Use simplest activities for 0–3; caregiver-led. 👶🧑‍🍼"
        },
        focus: "choices, short phrases",
        time: "2–5 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "vroom-mobile-app-speaking",
        title: "Vroom — Free daily tips + app 🧠📱",
        link: "https://www.vroom.org/mobile",
        format: "app",
        description:
          "Micro-activities built into daily life, especially “Chat / Take Turns” moments for early communication.",
        details: {
          type: "App + micro-activities 📱🧩",
          teaches: "Back-and-forth “chat/take turns” moments in routines. 🗣️🔁",
          howTo: [
            "Install/open from the official page. 📲⬇️",
            "Do 1 tip/day during mealtime/bathtime/bedtime. 🍽️🛁🌙",
            "Repeat favorite tips (toddlers love repetition). 🔁👶"
          ],
          whyTopPick: "Extremely low prep; designed for birth–5. ⭐👶",
          freeAccess: "Free to access; app install may be optional. 🆓✅",
          ageCheck: "Fits 0–3; caregiver-led. 👶🧑‍🍼"
        },
        focus: "daily talk turns",
        time: "1–2 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "talking-is-teaching-parent-resources",
        title: "Talking Is Teaching — Parent Resources (Talk, Read, Sing) 🗣️📖🎶",
        link: "https://talkingisteaching.org/parent-resources/",
        format: "site",
        description:
          "Printable resources and tips for everyday language routines that support first words and short phrases.",
        details: {
          type: "Printable tips/resources 📄",
          teaches: "Everyday language routines for first words/phrases. 🗣️✅",
          howTo: [
            "Pick a topic (routines, play, early literacy). 🎯",
            "Use one tip per day for a week. 1️⃣📅",
            "Keep it playful; lots of back-and-forth. 🎈🔁🗣️"
          ],
          whyTopPick: "Made for caregivers of young children. ⭐👨‍👩‍👧‍👦",
          freeAccess: "Resources are openly accessible. 🆓🌐",
          ageCheck: "Best with adult guidance. 👶🧑‍🍼"
        },
        focus: "talk-read-sing routines",
        time: "2–5 min",
        level: "parent tips"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "raising-children-network-talking-with-babies-toddlers",
        title: "RaisingChildren.net.au — Talking with babies & toddlers 🗣️👶",
        link: "https://raisingchildren.net.au/babies/connecting-communicating/communicating/talking-with-babies-toddlers",
        format: "site",
        description:
          "Routine-based guidance for responsive chatting, following the child’s lead, and pausing for attempts.",
        details: {
          type: "Parent guide 📘",
          teaches: "Responsive chatting, tuning in, and encouraging attempts. 🗣️👂✅",
          howTo: [
            "Follow your child’s lead in play. 🧸➡️👶",
            "Comment (don’t quiz) using short phrases. 🗣️✅",
            "Pause to invite a response. ⏸️👶"
          ],
          whyTopPick: "Clear, realistic routine-based approach. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Specifically babies/toddlers; caregiver-led. 👶🧑‍🍼"
        },
        focus: "responsive talking",
        time: "2–5 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "gosh-speech-language-development-12-24-months",
        title: "Great Ormond Street Hospital — Speech & language (12–24 months) 🏥🗣️",
        link: "https://www.gosh.nhs.uk/conditions-and-treatments/procedures-and-treatments/speech-and-language-development-12-24-months/",
        format: "site",
        description:
          "Age-banded guidance and activity ideas for stimulating talking around 12–24 months (adaptable younger).",
        details: {
          type: "Parent leaflet/webpage 📄🌐",
          teaches: "What’s typical + activities to stimulate talking in 12–24 months. 🗣️✅",
          howTo: [
            "Find your child’s stage. 🎯",
            "Use suggested activities during play and routines. 🧸🏠",
            "Repeat the same language frames daily. 🔁📅"
          ],
          whyTopPick: "Age-banded guidance with concrete activity ideas. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "Best for 1–2; adapt down for under-1 with gestures/sounds. 👶👐🔊"
        },
        focus: "milestones + activities",
        time: "5 min (read) + daily use",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "cdc-act-early-milestones",
        title: "CDC — Developmental milestones (speech/language reference) 📋🗣️",
        link: "https://www.cdc.gov/act-early/milestones/index.html",
        format: "site",
        description:
          "Milestone reference to keep speaking goals realistic and choose the next target (gesture → 1 word → 2-word phrase).",
        details: {
          type: "Milestone tracker ✅",
          teaches: "What to expect in communication (choose realistic targets). 🎯🗣️",
          howTo: [
            "Check your child’s age band monthly. 📅",
            "Pick 1 “next” communication behavior to encourage. 1️⃣➡️👶",
            "If concerned, follow CDC guidance for next steps. ⚠️✅"
          ],
          whyTopPick: "Helps keep goals age-appropriate. ⭐✅",
          freeAccess: "Free webpages. 🆓🌐",
          ageCheck: "Caregiver resource (birth–5 focus). 👶🧑‍🍼"
        },
        focus: "age-appropriate targets",
        time: "5 min/month",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "hanen-laying-foundation-first-words",
        title: "The Hanen Centre — Laying the Foundation for First Words 🗣️👶",
        link: "https://www.hanen.org/information-tips/laying-the-foundation-for-first-words",
        format: "site",
        description:
          "Evidence-based tips using gesture + voice + pointing to build understanding that leads to first words.",
        details: {
          type: "Parent tips (article) 📘",
          teaches: "Gesture + voice + pointing to support understanding and first words. 👐🗣️👉",
          howTo: [
            "During play, point/hold the item as you name it. 👉🧸🗣️",
            "Add one gesture (come/stop/big/small). 👐✋⬆️⬇️",
            "Pause for imitation (sound/gesture/word). ⏸️👶🗣️"
          ],
          whyTopPick: "Highly actionable “how to” for first words. ⭐✅",
          freeAccess: "Free webpage. 🆓🌐",
          ageCheck: "0–3 friendly; caregiver-led. 👶🧑‍🍼"
        },
        focus: "first words, imitation",
        time: "2–5 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "super-simple-songs-sing-along-speaking",
        title: "Super Simple Songs — sing-along speaking practice 🎤🎵",
        link: "https://supersimple.com/super-simple-songs/",
        format: "video",
        description:
          "Songs/videos for copying sounds/words and simple phrases through repetition and melody.",
        details: {
          type: "Songs/videos 🎵📺",
          teaches: "Copying sounds/words and simple phrases through repetition. 🗣️🔁🎶",
          howTo: [
            "Choose 1 action song (“up/down”, “clap”, animals). 🎵⬆️⬇️👏🐶",
            "You sing; child copies a sound/action. 🎤➡️👶👐",
            "Repeat the same song daily for a week. 🔁📅"
          ],
          whyTopPick: "Very young-learner friendly; repetition is built in. ⭐🎶",
          freeAccess: "Free to access on the site (some videos may link out). 🆓🌐",
          ageCheck: "Great for 0–3 with supervision (screen time/ads if on YouTube). 👶⚠️"
        },
        focus: "sing-along imitation",
        time: "2–3 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "pbs-kids-songs-speaking",
        title: "PBS KIDS — Songs (short, repeatable) 🎶🐾",
        link: "https://pbskids.org/videos/songs",
        format: "video",
        description:
          "Short song clips that help toddlers echo key words (names, greetings, feelings) and sing along.",
        details: {
          type: "Short song clips 🎵",
          teaches: "Singing along + copying key words/lines. 🎤🗣️",
          howTo: [
            "Pick a 30–60s clip. ⏱️🎬",
            "Do “listen once → sing/echo one line.” 🎧➡️🎤",
            "Reuse the same clip all week. 🔁📅"
          ],
          whyTopPick: "Very short and toddler-manageable. ⭐⏱️👶",
          freeAccess: "Free to watch on PBS KIDS. 🆓📺",
          ageCheck: "Appropriate for toddlers; co-view recommended. 👶👀"
        },
        focus: "echoing, short clips",
        time: "1–2 min/day",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "sesame-street-official-videos-talk-along-speaking",
        title: "Sesame Street — Official videos (talk-along routines) 📺🗣️",
        link: "https://www.sesamestreet.org/videos",
        format: "video",
        description:
          "Songs and clips for greeting phrases, feelings words, and imitation through repeatable character routines.",
        details: {
          type: "Videos/songs 📺🎵",
          teaches: "Greeting phrases, feelings words, and imitation through songs. 👋😊🗣️",
          howTo: [
            "Choose a short song clip. 🎵🎬",
            "Pause to copy 1 word (“hello”, “bye”, “happy”). ⏸️🗣️👋",
            "Repeat the same clip 3–4 times across the week. 🔁📅"
          ],
          whyTopPick: "High-quality preschool language content. ⭐✅",
          freeAccess: "Free on the official site. 🆓🌐",
          ageCheck: "Toddler-safe with supervision. 👶👀✅"
        },
        focus: "greetings, feelings, imitation",
        time: "3–5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "best-set-recommended-bundle-for-0-3-speaking",
        title: "Best “Set” (bundle + simple weekly plan for 0–3 Speaking) 🧺🗣️",
        link: "",
        format: "other",
        isBestSet: true,
        description:
          "Daily 10-minute routine (repeat the same materials all week): serve-and-return practice + one Vroom tip + one sing-along + simple choice questions, plus a weekly milestone check to pick the next target.",
        bundleItems: [
          "harvard-serve-and-return-5-steps-parents-caregivers-pdf",
          "vroom-mobile-app-speaking",
          "super-simple-songs-sing-along-speaking",
          "pbs-kids-songs-speaking",
          "asha-activities-encourage-speech-language-development",
          "cdc-act-early-milestones"
        ],
        details: {
          type: "Recommended bundle 🧺",
          teaches: "Turn-taking + imitation + functional first words through repeatable daily routines. 🔁🗣️",
          howTo: [
            "Daily (10 min): 2 min Harvard “Serve and Return” practice during play. ⏱️🧠🗣️",
            "Daily: 2 min ONE Vroom tip (mealtime/bathtime/bedtime). ⏱️🧩",
            "Daily: 3 min ONE sing-along song (Super Simple OR PBS KIDS clip). ⏱️🎤🎶",
            "Daily: 3 min “Choice questions” + short phrases (ASHA idea): “milk/water?”, “car/ball?”. ⏱️❓🗣️",
            "Weekly (5 min): Use CDC milestones to pick a realistic next step (gesture → 1 word → 2-word phrase). 📅🎯"
          ],
          whyTopPick: "Same routine every day → faster learning through repetition. ⭐🔁",
          freeAccess: "Uses free resources; some video platforms may include ads. 🆓⚠️",
          ageCheck: "Designed for 0–3 with active caregiver interaction. 👶🧑‍🍼"
        },
        focus: "serve & return, imitation, choices",
        time: "10 min/day",
        level: "caregiver-led"
      },
      {
        age: "0-3",
        skill: "reading",
        slug: "0-3-reading-reading-rockets-tips-for-parents-of-babies",
        title: "Reading Rockets - Reading Tips for Parents of Babies",
        link: "https://www.readingrockets.org/topics/activities/articles/reading-tips-parents-babies",
        format: "site",
        description:
          "Simple parent tips for making shared reading warm, short, and repeatable with babies and young toddlers.",
        details: {
          type: "Parent tip sheet",
          teaches: "Book routine, naming, pointing, and early language during shared reading.",
          howTo: [
            "Choose one short book and repeat it for several days.",
            "Point to one picture at a time and say the word slowly.",
            "Pause for your child to look, point, or copy a sound."
          ],
          whyTopPick: "Clear, realistic advice for very young children.",
          freeAccess: "Free article on Reading Rockets.",
          ageCheck: "Good fit for 0-3 with caregiver support."
        },
        focus: "shared reading, naming, routine",
        time: "3-5 min",
        level: "caregiver-led"
      },
      {
        age: "0-3",
        skill: "listening",
        slug: "0-3-listening-zero-to-three-language-literacy-12-24-months",
        title: "ZERO TO THREE - Supporting Language and Literacy Skills (12-24 Months)",
        link: "https://www.zerotothree.org/resource/supporting-language-and-literacy-skills-from-12-24-months/",
        format: "site",
        description:
          "A short guide to everyday listening and language routines for toddlers, including songs, naming, and back-and-forth talk.",
        details: {
          type: "Parent guide",
          teaches: "Listening attention, vocabulary growth, and simple follow-along routines.",
          howTo: [
            "Pick one daily routine such as meals, bath, or book time.",
            "Repeat the same words and short phrases each day.",
            "Add pointing, gestures, and pauses so your child can respond."
          ],
          whyTopPick: "Easy to use in normal family routines.",
          freeAccess: "Free article on ZERO TO THREE.",
          ageCheck: "Strong fit for toddlers in the 0-3 range."
        },
        focus: "listening routines, vocabulary, repetition",
        time: "3-5 min",
        level: "caregiver-led"
      },
      {
        age: "0-3",
        skill: "writing",
        slug: "0-3-writing-zero-to-three-developing-early-writing-skills",
        title: "ZERO TO THREE - Developing Early Writing Skills",
        link: "https://www.zerotothree.org/resource/developing-early-writing-skills-gather-round-activities/",
        format: "site",
        description:
          "Play-based ideas for scribbling, drawing, and hand control that match the earliest stages of writing readiness.",
        details: {
          type: "Parent activity guide",
          teaches: "Scribbling, hand strength, and early mark-making habits.",
          howTo: [
            "Offer chunky crayons or washable markers on big paper.",
            "Model one simple movement such as up/down or round/round.",
            "Praise the action and keep sessions very short."
          ],
          whyTopPick: "Practical and developmentally appropriate for toddlers.",
          freeAccess: "Free article on ZERO TO THREE.",
          ageCheck: "Appropriate for 0-3 with close supervision."
        },
        focus: "scribbling, grip, early marks",
        time: "2-5 min",
        level: "caregiver-led"
      },
      {
        age: "0-3",
        skill: "speaking",
        slug: "0-3-speaking-zero-to-three-supporting-language-development",
        title: "ZERO TO THREE - Supporting Language Development",
        link: "https://www.zerotothree.org/resource/supporting-language-development-gather-round-activities/",
        format: "site",
        description:
          "Simple talk ideas that help adults build turn-taking, imitation, and first-word routines during play.",
        details: {
          type: "Parent activity guide",
          teaches: "Serve-and-return talk, imitation, and first words.",
          howTo: [
            "Follow your child's focus during play.",
            "Use one short phrase and repeat it many times.",
            "Pause and wait so your child has a turn to copy or answer."
          ],
          whyTopPick: "Very usable for daily play and routines.",
          freeAccess: "Free article on ZERO TO THREE.",
          ageCheck: "Designed for very young children with adult interaction."
        },
        focus: "turn-taking, imitation, first words",
        time: "3-5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "unite-for-literacy-library-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "booktrust-storybooks-and-games-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "free-children-stories-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "mes-english-flashcards-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "national-geographic-kids-little-kids-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "sesame-street-games-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "pbs-kids-games-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "storyberries-0-3-reading",
        title: "Storyberries",
        link: "https://www.storyberries.com/",
        format: "site",
        description:
          "Free online stories, poems, audio books, and fairy tales.",
        details: {
          type: "story library 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "pbs-kids-videos-0-3-reading",
        title: "PBS Kids Videos",
        link: "https://pbskids.org/videos",
        format: "site",
        description:
          "Safe children’s videos for listening and retelling practice.",
        details: {
          type: "videos 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "esl-fast-0-3-reading",
        title: "ESL Fast",
        link: "https://www.eslfast.com/",
        format: "site",
        description:
          "Short stories and dialogues with audio for learners.",
        details: {
          type: "short stories/dialogues 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "project-gutenberg-0-3-reading",
        title: "Project Gutenberg",
        link: "https://www.gutenberg.org/",
        format: "site",
        description:
          "Public-domain books for advanced reading and response tasks.",
        details: {
          type: "free books 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      ,

      {
        age: "0-3",
        skill: "reading",
        slug: "storyline-online-library-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "agendaweb-english-exercises-0-3-reading",
        title: "AgendaWeb English Exercises",
        link: "https://agendaweb.org/",
        format: "site",
        description:
          "Large index of free English exercises by topic and skill.",
        details: {
          type: "grammar and skills exercises 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "bbc-learning-english-0-3-reading",
        title: "BBC Learning English",
        link: "https://www.bbc.co.uk/learningenglish/",
        format: "site",
        description:
          "Short lessons for pronunciation, grammar, vocabulary, and news English.",
        details: {
          type: "videos and lessons 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "breaking-news-english-0-3-reading",
        title: "Breaking News English",
        link: "https://breakingnewsenglish.com/",
        format: "site",
        description:
          "News lessons with reading, listening, vocabulary, and discussion.",
        details: {
          type: "news lessons 🌐",
          teaches: "Reading comprehension + vocabulary growth 📚🧠",
          howTo: [
            "1️⃣ Read once for gist, then re-read for key details. 👀📖",
            "2️⃣ Highlight 5 useful words and use them in new sentences. 🖍️🧠",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "british-council-learnenglish-kids-0-3-reading",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, vocabulary",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "mes-english-flashcards-0-3-listening",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "national-geographic-kids-little-kids-0-3-listening",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "sesame-street-games-0-3-listening",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "unite-for-literacy-library-0-3-listening",
        title: "Unite for Literacy Library",
        link: "https://www.uniteforliteracy.com/",
        format: "site",
        description:
          "Short picture books with audio narration options.",
        details: {
          type: "picture books 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "booktrust-storybooks-and-games-0-3-listening",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "free-children-stories-0-3-listening",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "pbs-kids-games-0-3-listening",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "storyberries-0-3-listening",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "breaking-news-english-multi-speed-listening-0-3-listening",
        title: "Breaking News English Multi-Speed Listening",
        link: "https://breakingnewsenglish.com/multi-speed-listening.html",
        format: "site",
        description:
          "News listening at different speeds from slow to fast.",
        details: {
          type: "listening practice 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "british-council-listening-0-3-listening",
        title: "British Council Listening",
        link: "https://learnenglish.britishcouncil.org/free-resources/listening",
        format: "site",
        description:
          "Listening activities by level with practical comprehension tasks.",
        details: {
          type: "listening practice 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "elllo-english-listening-0-3-listening",
        title: "ELLLO English Listening",
        link: "https://www.elllo.org/",
        format: "site",
        description:
          "Thousands of listening lessons with scripts, vocabulary, and quizzes.",
        details: {
          type: "listening lessons 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "elllo-lessons-by-level-0-3-listening",
        title: "ELLLO Lessons by Level",
        link: "https://elllo.org/english/levels/index.htm",
        format: "site",
        description:
          "Listening lessons organised by CEFR level.",
        details: {
          type: "graded listening 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "listen-a-minute-0-3-listening",
        title: "Listen A Minute",
        link: "https://listenaminute.com/",
        format: "site",
        description:
          "One-minute listening texts with simple exercises.",
        details: {
          type: "short listening 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "randall-easy-listening-0-3-listening",
        title: "Randall Easy Listening",
        link: "https://www.esl-lab.com/easy/",
        format: "site",
        description:
          "Easy listening topics for routines, family, and daily life.",
        details: {
          type: "easy listening 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "randall-intermediate-listening-0-3-listening",
        title: "Randall Intermediate Listening",
        link: "https://www.esl-lab.com/intermediate/",
        format: "site",
        description:
          "Intermediate listening quizzes with discussion and vocabulary.",
        details: {
          type: "intermediate listening 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "randall-s-esl-cyber-listening-lab-0-3-listening",
        title: "Randall’s ESL Cyber Listening Lab",
        link: "https://www.esl-lab.com/",
        format: "site",
        description:
          "Everyday listening quizzes with vocabulary and discussion tasks.",
        details: {
          type: "listening quizzes 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "agendaweb-english-exercises-0-3-listening",
        title: "AgendaWeb English Exercises",
        link: "https://agendaweb.org/",
        format: "site",
        description:
          "Large index of free English exercises by topic and skill.",
        details: {
          type: "grammar and skills exercises 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "bbc-learning-english-0-3-listening",
        title: "BBC Learning English",
        link: "https://www.bbc.co.uk/learningenglish/",
        format: "site",
        description:
          "Short lessons for pronunciation, grammar, vocabulary, and news English.",
        details: {
          type: "videos and lessons 🌐",
          teaches: "Listening comprehension + repeat-after-me fluency 🎧🗣️",
          howTo: [
            "1️⃣ Listen once for gist, then replay and note key words. 🎧📝",
            "2️⃣ Shadow key phrases and repeat 2–3 times for clarity. 🔁🗣️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "comprehension, pronunciation",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "mes-english-flashcards-0-3-writing",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "free-children-stories-0-3-writing",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "storyberries-0-3-writing",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "national-geographic-kids-little-kids-0-3-writing",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "sesame-street-games-0-3-writing",
        title: "Sesame Street Games",
        link: "https://pbskids.org/sesame/all-games",
        format: "site",
        description:
          "Very young learner games with simple words and routines.",
        details: {
          type: "preschool games 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "unite-for-literacy-library-0-3-writing",
        title: "Unite for Literacy Library",
        link: "https://www.uniteforliteracy.com/",
        format: "site",
        description:
          "Short picture books with audio narration options.",
        details: {
          type: "picture books 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "booktrust-storybooks-and-games-0-3-writing",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "pbs-kids-games-0-3-writing",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "pbs-kids-videos-0-3-writing",
        title: "PBS Kids Videos",
        link: "https://pbskids.org/videos",
        format: "site",
        description:
          "Safe children’s videos for listening and retelling practice.",
        details: {
          type: "videos 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      ,

      {
        age: "0-3",
        skill: "writing",
        slug: "english-for-everyone-reading-0-3-writing",
        title: "English for Everyone Reading",
        link: "https://englishforeveryone.org/Topics/Reading-Comprehension.html",
        format: "site",
        description:
          "Printable reading comprehension worksheets for many grade levels.",
        details: {
          type: "worksheets 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "purdue-owl-0-3-writing",
        title: "Purdue OWL",
        link: "https://owl.purdue.edu/owl/general_writing/",
        format: "site",
        description:
          "Reliable guides for paragraphs, essays, citations, and style.",
        details: {
          type: "writing guide 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "agendaweb-english-exercises-0-3-writing",
        title: "AgendaWeb English Exercises",
        link: "https://agendaweb.org/",
        format: "site",
        description:
          "Large index of free English exercises by topic and skill.",
        details: {
          type: "grammar and skills exercises 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "bbc-learning-english-0-3-writing",
        title: "BBC Learning English",
        link: "https://www.bbc.co.uk/learningenglish/",
        format: "site",
        description:
          "Short lessons for pronunciation, grammar, vocabulary, and news English.",
        details: {
          type: "videos and lessons 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "breaking-news-english-0-3-writing",
        title: "Breaking News English",
        link: "https://breakingnewsenglish.com/",
        format: "site",
        description:
          "News lessons with reading, listening, vocabulary, and discussion.",
        details: {
          type: "news lessons 🌐",
          teaches: "Guided writing practice + clearer sentence construction ✍️🧩",
          howTo: [
            "1️⃣ Follow one prompt and produce a short written response. ✍️📄",
            "2️⃣ Revise once for grammar, once for clarity, then submit. ✅✍️",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "writing",
        slug: "british-council-learnenglish-kids-0-3-writing",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "sentence building, written output",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "mes-english-flashcards-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "national-geographic-kids-little-kids-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "pbs-kids-videos-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "sesame-street-games-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "unite-for-literacy-library-0-3-speaking",
        title: "Unite for Literacy Library",
        link: "https://www.uniteforliteracy.com/",
        format: "site",
        description:
          "Short picture books with audio narration options.",
        details: {
          type: "picture books 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "booktrust-storybooks-and-games-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "free-children-stories-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "pbs-kids-games-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "storyberries-0-3-speaking",
        title: "Storyberries",
        link: "https://www.storyberries.com/",
        format: "site",
        description:
          "Free online stories, poems, audio books, and fairy tales.",
        details: {
          type: "story library 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "bbc-learning-english-youtube-0-3-speaking",
        title: "BBC Learning English YouTube",
        link: "https://www.youtube.com/user/bbclearningenglish",
        format: "site",
        description:
          "Weekly English videos for listening and pronunciation practice.",
        details: {
          type: "videos 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "cambridge-sing-and-learn-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "elllo-english-listening-0-3-speaking",
        title: "ELLLO English Listening",
        link: "https://www.elllo.org/",
        format: "site",
        description:
          "Thousands of listening lessons with scripts, vocabulary, and quizzes.",
        details: {
          type: "listening lessons 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "storyline-online-library-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "agendaweb-english-exercises-0-3-speaking",
        title: "AgendaWeb English Exercises",
        link: "https://agendaweb.org/",
        format: "site",
        description:
          "Large index of free English exercises by topic and skill.",
        details: {
          type: "grammar and skills exercises 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "bbc-learning-english-0-3-speaking",
        title: "BBC Learning English",
        link: "https://www.bbc.co.uk/learningenglish/",
        format: "site",
        description:
          "Short lessons for pronunciation, grammar, vocabulary, and news English.",
        details: {
          type: "videos and lessons 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "breaking-news-english-0-3-speaking",
        title: "Breaking News English",
        link: "https://breakingnewsenglish.com/",
        format: "site",
        description:
          "News lessons with reading, listening, vocabulary, and discussion.",
        details: {
          type: "news lessons 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "breaking-news-english-multi-speed-listening-0-3-speaking",
        title: "Breaking News English Multi-Speed Listening",
        link: "https://breakingnewsenglish.com/multi-speed-listening.html",
        format: "site",
        description:
          "News listening at different speeds from slow to fast.",
        details: {
          type: "listening practice 🌐",
          teaches: "Speaking fluency + confidence in real communication 🗣️✨",
          howTo: [
            "1️⃣ Use one prompt and record/perform a short spoken response. 🗣️🎙️",
            "2️⃣ Retell in your own words and focus on clear delivery. 🧠💬",
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "british-council-learnenglish-kids-0-3-speaking",
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
            "3️⃣ Keep practice regular (2–3 times/week). 👶 short, parent-led sessions are best."
          ],
          whyTopPick: "Public student-facing resource with reliable free access. ⭐",
          freeAccess: "Free (no account required). 🆓✅",
          ageCheck: "Age-fit confirmed for this band with normal guidance. ✅"
        },
        focus: "fluency, confidence",
        time: "5–10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "listening",
        slug: "pathways-rhyming-and-singing-baby",
        title: "Pathways - Rhyming and Singing Help Baby Learn",
        link: "https://pathways.org/rhyming-and-singing-helps-baby-learn/",
        format: "article",
        description:
          "Simple song and rhyme ideas for bedtime, feeding, and play.",
        details: {
          type: "caregiver guide",
          teaches: "Listening, early words, rhythm, and parent-child turn-taking.",
          howTo: [
            "Choose one short rhyme or song for a daily routine.",
            "Repeat it slowly and pause for the child to copy a sound or gesture.",
            "Use the same song for several days so it becomes familiar."
          ],
          whyTopPick: "Strong fit for babies and toddlers because practice happens through normal routines.",
          freeAccess: "Free article page; no required sign-up for the content.",
          ageCheck: "Best for 0-2 and still useful across the 0-3 pack with caregiver support."
        },
        focus: "songs, listening, early words",
        time: "3-5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "speaking",
        slug: "pathways-narrating-your-day",
        title: "Pathways - Narrating Your Day",
        link: "https://pathways.org/narrating-your-day/",
        format: "article",
        description:
          "Parent tips for turning daily routines into natural talk time.",
        details: {
          type: "caregiver guide",
          teaches: "Speaking readiness, vocabulary, comprehension, and fluency through daily talk.",
          howTo: [
            "Pick one routine such as dressing, snack time, or bath time.",
            "Say short sentences about what is happening.",
            "Pause often so the child can gesture, vocalize, or try a word."
          ],
          whyTopPick: "Very practical for early speaking because it does not require worksheets or screen time.",
          freeAccess: "Free article page; no required sign-up for the content.",
          ageCheck: "Best for 0-2; appropriate for the full 0-3 pack as parent-led language practice."
        },
        focus: "daily talk, vocabulary",
        time: "3-5 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "reach-out-and-read-milestones",
        title: "Reach Out and Read - Read With Your Child Milestones",
        link: "https://reachoutandread.org/read-with-your-child-milestones/",
        format: "guide",
        description:
          "Milestone-based shared reading tips for babies, toddlers, and families.",
        details: {
          type: "family reading guide",
          teaches: "Shared reading, vocabulary, attention, and early comprehension.",
          howTo: [
            "Check the milestone guidance for the child's age.",
            "Read one short book together and point to pictures.",
            "Use one simple question such as 'What is that?' or 'Where is it?'"
          ],
          whyTopPick: "Clear parent guidance for what shared reading can look like at each early age.",
          freeAccess: "Free public family page.",
          ageCheck: "Strong fit for 0-3 because all practice is caregiver-led."
        },
        focus: "shared reading, milestones",
        time: "5-10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "start-with-a-book-early-activities",
        title: "Start with a Book",
        link: "https://www.startwithabook.org/",
        format: "site",
        description:
          "Book-linked activities that help parents turn read-alouds into talk and play.",
        details: {
          type: "activity hub",
          teaches: "Reading routines, vocabulary, comprehension, and topic-based talk.",
          howTo: [
            "Choose a simple topic the child already knows.",
            "Read or look through one related book idea together.",
            "Do one short play or talk activity from the topic page."
          ],
          whyTopPick: "Useful for families who want more ideas after reading a picture book.",
          freeAccess: "Free public site; no required sign-up for main content.",
          ageCheck: "Use only the simplest activities for 0-3; best with adult selection."
        },
        focus: "read-alouds, topic talk",
        time: "5-10 min",
        level: "caregiver-led"
      },

      {
        age: "0-3",
        skill: "reading",
        slug: "international-childrens-digital-library",
        title: "International Children's Digital Library",
        link: "https://www.icdlbooks.org/",
        format: "site",
        description:
          "Free picture-book library for parent-and-child shared reading.",
        details: {
          type: "digital library",
          teaches: "Shared reading, vocabulary, picture talk, and early comprehension.",
          howTo: [
            "Choose a short picture-led book.",
            "Talk about the pictures more than the printed words.",
            "Repeat the same book several times during the week."
          ],
          whyTopPick: "Adds a large free book library with a strong picture-book focus.",
          freeAccess: "Free children's book access on the public site.",
          ageCheck: "Appropriate for 0-3 when an adult chooses short visual books."
        },
        focus: "picture books, shared reading",
        time: "5-10 min",
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
