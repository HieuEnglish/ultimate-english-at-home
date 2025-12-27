/* assets/data/tests-11-12-speaking.js
   Question bank: Ages 11–12 • Speaking

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-11-12-speaking"

   Notes:
   - Teacher/caregiver reads the prompt. The learner answers out loud.
   - No auto-scoring: teacher marks each prompt as Said / Try again / Skip.
   - Structured + random: the runner selects a different subset from each section.

   Focus (11–12):
   - Longer answers (3–6 sentences), linking words (because, however, for example),
     simple comparisons, and polite interaction (asking / requesting / apologizing).
   - A short "cue card" (long turn) prompt is included to build confidence.
*/

(function () {
  "use strict";

  const SLUG = "age-11-12-speaking";

  // Shared rubric (classroom-friendly, not IELTS banding)
  const RUBRIC = {
    criteria: {
      task: {
        good: "Answers the prompt clearly and adds relevant details/examples.",
        developing: "Answers but details are limited or repetitive.",
        needsWork: "Does not answer clearly; needs a lot of support."
      },
      fluency: {
        good: "Speaks in connected sentences with only short pauses.",
        developing: "Pauses often, but can continue with prompts.",
        needsWork: "Very hesitant; mostly single words or stops."
      },
      language: {
        good: "Uses mostly correct grammar and a range of common vocabulary.",
        developing: "Some grammar mistakes; vocabulary is basic but understandable.",
        needsWork: "Many errors that block understanding."
      },
      pronunciation: {
        good: "Easy to understand most of the time.",
        developing: "Sometimes unclear; repeats help.",
        needsWork: "Hard to understand; many words unclear."
      },
      interaction: {
        good: "Responds naturally; can ask/answer follow-up questions politely.",
        developing: "Responds but needs support to continue.",
        needsWork: "Struggles to interact or needs constant prompting."
      }
    },
    checks: {
      minSentences: 3,
      encourageBecause: true,
      encourageLinkers: true
    }
  };

  const QUESTIONS = [
    // -------------------------
    // WARM-UP (personal + school)
    // -------------------------
    {
      id: "w1",
      type: "prompt",
      section: "warmup",
      question: "Introduce yourself: name, age, and one hobby.",
      say: "My name is Alex. I am twelve years old. In my free time, I like playing badminton and reading comics.",
      model: "My name is ____. I am ____. In my free time, I like ____.",
      difficulty: "easy",
      explanation: "Aim for 3 sentences. Add one extra detail about your hobby.",
      targets: ["3 sentences", "Hobby + extra detail"],
      rubric: RUBRIC
    },
    {
      id: "w2",
      type: "prompt",
      section: "warmup",
      question: "What is one subject you are good at? Why?",
      say: "I am good at English because I practice every day and I enjoy learning new words. I also watch short videos in English.",
      model: "I am good at ____ because ____.",
      difficulty: "medium",
      explanation: "Use ‘because’ and give one example.",
      targets: ["Use because", "Give an example"],
      rubric: RUBRIC
    },
    {
      id: "w3",
      type: "prompt",
      section: "warmup",
      question: "Describe your daily routine after school (3–5 sentences).",
      say: "After school, I usually go home and have a snack. Then I do my homework for about an hour. After that, I help my parents a little and I relax by listening to music.",
      model: "After school, I usually ____. Then I ____. After that, I ____.",
      difficulty: "medium",
      explanation: "Use time words: usually, then, after that.",
      targets: ["3–5 sentences", "Time words"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "w4",
      type: "prompt",
      section: "warmup",
      question: "Tell me about your best friend (4 sentences).",
      say: "My best friend is Lan. She is friendly and hardworking. We study together and sometimes we play games after school. I like her because she always helps me when I have problems.",
      model: "My best friend is ____. He/She is ____. We ____. I like him/her because ____.",
      difficulty: "medium",
      explanation: "Include one personality word and one reason.",
      targets: ["4 sentences", "Personality word", "Reason"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "w5",
      type: "prompt",
      section: "warmup",
      question: "Do you prefer studying alone or with a partner? Why?",
      say: "I prefer studying with a partner because we can share ideas and check our answers. However, for difficult subjects I sometimes study alone to focus.",
      model: "I prefer ____ because ____. However, ____.",
      difficulty: "hard",
      explanation: "Give one main reason and add one contrast with ‘however’.",
      targets: ["Use because", "Use however"],
      rubric: RUBRIC
    },
    {
      id: "w6",
      type: "prompt",
      section: "warmup",
      question: "What is a small goal you have for this month?",
      say: "My goal this month is to improve my handwriting. I will practice for ten minutes every day, and I will write more carefully in class.",
      model: "My goal this month is to ____. I will ____.",
      difficulty: "medium",
      explanation: "Say the goal and how you will do it.",
      targets: ["Goal", "Plan"],
      rubric: RUBRIC
    },
    {
      id: "w7",
      type: "prompt",
      section: "warmup",
      question: "Tell me about a teacher you like and what makes them a good teacher.",
      say: "I like my science teacher because she explains clearly and she is patient. For example, she repeats difficult ideas and gives simple experiments to help us understand.",
      model: "I like my ____ teacher because ____. For example, ____.",
      difficulty: "hard",
      explanation: "Include an example starting with ‘For example’.",
      targets: ["Give 1 example", "Use ‘For example’"],
      rubric: RUBRIC
    },
    {
      id: "w8",
      type: "prompt",
      section: "warmup",
      question: "What is something you want to learn in the future (a skill)? Why?",
      say: "I want to learn how to cook simple meals because it is useful and I want to help my family. I think it will also make me more independent.",
      model: "I want to learn ____ because ____.",
      difficulty: "medium",
      explanation: "Say the skill and give 2 reasons.",
      targets: ["2 reasons", "Clear sentences"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "w9",
      type: "prompt",
      section: "warmup",
      question: "Would you rather have more free time or less homework? Explain.",
      say: "I would rather have more free time because I can rest and do my hobbies. Too much homework can make students stressed, so a balance is better.",
      model: "I would rather ____ because ____.",
      difficulty: "hard",
      explanation: "Give your choice, one reason, and one extra idea.",
      targets: ["Opinion", "Reason", "Extra idea"],
      rubric: RUBRIC
    },
    {
      id: "w10",
      type: "prompt",
      section: "warmup",
      question: "Ask me one polite question about my weekend.",
      say: "How was your weekend? Did you do anything interesting?",
      model: "How was your weekend? Did you ____?",
      difficulty: "medium",
      explanation: "Use polite tone. Try 2 questions.",
      targets: ["Ask 1–2 questions", "Polite tone"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },

    // -------------------------
    // DESCRIBE (objects/places/people)
    // -------------------------
    {
      id: "d1",
      type: "prompt",
      section: "describe",
      question: "Describe your classroom (size, things you can see, and how it feels).",
      say: "My classroom is medium-sized and bright. There are posters on the walls and a big whiteboard at the front. I feel comfortable there because my classmates are friendly.",
      model: "My classroom is ____. There is/are ____. I feel ____ because ____.",
      difficulty: "medium",
      explanation: "Include 2 things you can see and 1 feeling.",
      targets: ["2 things you can see", "1 feeling", "Use because"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "d2",
      type: "prompt",
      section: "describe",
      question: "Describe a special object you own (what it is, where you got it, why it matters).",
      say: "A special object I own is a small watch from my grandfather. He gave it to me on my birthday. It matters to me because it reminds me of him and I try to take good care of it.",
      model: "A special object I own is ____. I got it from ____. It matters because ____.",
      difficulty: "hard",
      explanation: "Give a short story about how you got it.",
      targets: ["What it is", "Where you got it", "Why it matters"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "d3",
      type: "prompt",
      section: "describe",
      question: "Describe a place you enjoy (park, cafe, library). Say what you do there.",
      say: "I enjoy the local park near my house. It has many trees and a small lake. I usually go there to walk, exercise, and chat with my friends.",
      model: "I enjoy ____. It has ____. I usually go there to ____.",
      difficulty: "medium",
      explanation: "Use ‘usually’ and list 2–3 activities.",
      targets: ["3–4 sentences", "2–3 activities"],
      rubric: RUBRIC
    },
    {
      id: "d4",
      type: "prompt",
      section: "describe",
      question: "Compare two seasons (for example: summer vs winter). Which do you prefer and why?",
      say: "I prefer winter because the weather is cooler and it is easier to sleep. Summer is fun for holidays, but it is often too hot and sweaty.",
      model: "I prefer ____ because ____. ____ is fun, but ____.",
      difficulty: "hard",
      explanation: "Say 1 advantage and 1 disadvantage.",
      targets: ["Comparison", "Use but"],
      rubric: RUBRIC
    },
    {
      id: "d5",
      type: "prompt",
      section: "describe",
      question: "Describe a photo in your mind: a family meal. Who is there and what is happening?",
      say: "In the photo, my family is sitting around a table at dinner time. My dad is serving food and my mom is smiling. Everyone looks happy, and we are talking about our day.",
      model: "In the photo, I can see ____. Someone is ____. Everyone looks ____.",
      difficulty: "medium",
      explanation: "Include 1 present continuous sentence (is/are + -ing).",
      targets: ["Present continuous", "3–5 sentences"],
      rubric: RUBRIC
    },
    {
      id: "d6",
      type: "prompt",
      section: "describe",
      question: "Describe your favourite app or game (what it is and why you like it).",
      say: "My favourite app is a music app because it helps me relax. I like it because I can make playlists and discover new songs. However, I try not to use it too late at night.",
      model: "My favourite app is ____. I like it because ____. However, ____.",
      difficulty: "hard",
      explanation: "Give 2 reasons and add one self-control idea.",
      targets: ["2 reasons", "Use however"],
      rubric: RUBRIC
    },
    {
      id: "d7",
      type: "prompt",
      section: "describe",
      question: "Describe a sport you like and explain the basic rules.",
      say: "I like badminton. You use a racket to hit a shuttlecock over the net. The goal is to make it land in the other side’s court. You need quick movement and good timing.",
      model: "I like ____. The goal is to ____. You need ____.",
      difficulty: "hard",
      explanation: "Explain at least 2 simple rules or steps.",
      targets: ["Explain 2 steps", "Clear verbs"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4, encourageBecause: false } }
    },
    {
      id: "d8",
      type: "prompt",
      section: "describe",
      question: "Describe a book or movie you enjoyed. What happened? Why did you like it?",
      say: "I enjoyed a movie about a brave kid who saves his village. He faces many problems but he never gives up. I liked it because it was exciting and it taught me to be confident.",
      model: "I enjoyed ____. It was about ____. I liked it because ____.",
      difficulty: "hard",
      explanation: "Give a short summary and 1 reason.",
      targets: ["Short summary", "Reason"],
      rubric: RUBRIC
    },

    // -------------------------
    // ROLE-PLAY (polite interaction)
    // -------------------------
    {
      id: "r1",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You want to borrow a book from the library. Ask the librarian politely.",
      say: "Excuse me, could I borrow this book, please? How long can I keep it? Thank you.",
      model: "Excuse me, could I ____? How long can I ____? Thank you.",
      difficulty: "medium",
      explanation: "Use ‘Excuse me’ + ‘could I…?’ and ask one extra question.",
      targets: ["Polite request", "Ask 1 extra question"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "r2",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You are late to class. Apologize to the teacher and explain why.",
      say: "I’m sorry I’m late. The bus was slow because there was heavy traffic. It won’t happen again.",
      model: "I’m sorry I’m late. ____ because ____. It won’t happen again.",
      difficulty: "hard",
      explanation: "Apologize, give a reason, and promise improvement.",
      targets: ["Apology", "Reason", "Promise"],
      rubric: RUBRIC
    },
    {
      id: "r3",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: Your classmate is talking loudly. Ask them to stop politely.",
      say: "Could you please speak more quietly? I’m trying to focus on my work. Thanks.",
      model: "Could you please ____? I’m trying to ____. Thanks.",
      difficulty: "hard",
      explanation: "Be polite and give one reason.",
      targets: ["Polite request", "Reason"],
      rubric: RUBRIC
    },
    {
      id: "r4",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You lost your pencil case. Ask a teacher for help.",
      say: "Excuse me, I can’t find my pencil case. I think I left it in the classroom. Could you help me look for it, please?",
      model: "Excuse me, I can’t find ____. I think ____. Could you ____?",
      difficulty: "medium",
      explanation: "Explain what happened and ask for help.",
      targets: ["Explain", "Ask for help"],
      rubric: RUBRIC
    },
    {
      id: "r5",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: Invite a friend to do something this weekend. Include time and place.",
      say: "Do you want to go to the park this Saturday afternoon? We can meet at 3 p.m. near the entrance.",
      model: "Do you want to ____ this ____? We can meet at ____.",
      difficulty: "medium",
      explanation: "Use ‘Do you want to…?’ and add time + place.",
      targets: ["Invitation", "Time + place"],
      rubric: RUBRIC
    },
    {
      id: "r6",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You bought a snack, but it is expired. Speak to the shop assistant politely.",
      say: "Excuse me, I just bought this snack, but it is expired. Could I exchange it for a new one, please?",
      model: "Excuse me, I bought ____, but ____. Could I ____?",
      difficulty: "hard",
      explanation: "Be polite. State the problem and ask for a solution.",
      targets: ["Problem", "Polite request"],
      rubric: RUBRIC
    },

    // -------------------------
    // LONG TURN (cue card style)
    // -------------------------
    {
      id: "c1",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a time you helped someone.",
      cue: ["Who you helped", "What the problem was", "What you did", "How you felt after"],
      followUps: ["Why is helping others important?", "How can students help in school?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "I helped my younger cousin with his homework last week. He didn’t understand the maths questions, so I explained step by step and gave him an example. After that, he could do the next questions by himself. I felt proud because I helped him feel more confident.",
      model: "I helped ____. The problem was ____. I ____. I felt ____.",
      difficulty: "medium",
      explanation: "Use past tense and include your feelings.",
      targets: ["Past tense", "Feeling words"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c2",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a memorable day at school.",
      cue: ["When it was", "What happened", "Who was involved", "Why you remember it"],
      followUps: ["What makes a school day enjoyable?", "Should schools have more events?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "A memorable day at school for me was our sports day last semester. My class joined many games, and I ran in a relay race with my friends. We practiced before, so we worked well as a team and we won second place. I remember it because everyone cheered and the atmosphere was exciting.",
      model: "A memorable day was ____. We ____. I remember it because ____.",
      difficulty: "hard",
      explanation: "Include 1 result (won/lost/learned something).",
      targets: ["Past tense", "Result"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c3",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Describe a place in your city you like.",
      cue: ["Where it is", "What it looks like", "What you do there", "Why you like it"],
      followUps: ["Do you prefer quiet places or busy places? Why?", "How can cities be better for children?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "A place in my city I like is a small library near the park. It is quiet and bright, and it has many shelves with comics and storybooks. I go there on weekends to read and sometimes to study with friends. I like it because it helps me relax and it is also a good place to focus.",
      model: "A place I like is ____. It is ____. I go there to ____. I like it because ____.",
      difficulty: "medium",
      explanation: "Use describing words and a clear reason.",
      targets: ["Describing words", "Clear reason"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c4",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a hobby you started recently.",
      cue: ["What the hobby is", "How you started it", "How often you do it", "Why you enjoy it"],
      followUps: ["Are hobbies important for students?", "How do hobbies help people?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "I started learning basic drawing recently. I began because I saw online tutorials and wanted to try. I practice about three times a week for twenty minutes. I enjoy it because it is relaxing, and I can improve slowly when I keep practicing.",
      model: "I started ____ recently. I began because ____. I do it ____. I enjoy it because ____.",
      difficulty: "medium",
      explanation: "Include frequency (how often) and one benefit.",
      targets: ["Frequency", "Benefit"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c5",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a book or story you remember.",
      cue: ["What it was", "Who the main character was", "What happened", "Why you remember it"],
      followUps: ["Do you think reading is better than watching videos? Why?", "What kind of stories do young people like?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "I remember a story about a brave boy who travels to find his lost dog. The main character was kind and determined. He faced many challenges, but he kept going and finally found the dog and helped other people too. I remember it because it taught me not to give up when something is important.",
      model: "I remember a story about ____. The main character was ____. In the story, ____. I remember it because ____.",
      difficulty: "hard",
      explanation: "Try to include a simple lesson or message.",
      targets: ["Story summary", "Message/lesson"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c6",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a time you worked as a team.",
      cue: ["What the team activity was", "Who was in your team", "What you did", "Why teamwork was helpful"],
      followUps: ["What makes a good team member?", "Is it better to work alone sometimes?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "I worked as a team on a science project at school. My team had four students, and we shared different jobs. I researched information, while my friends made the poster and practiced the presentation. Teamwork was helpful because we finished faster and our ideas were better when we combined them.",
      model: "I worked as a team on ____. My team had ____. I ____. Teamwork was helpful because ____.",
      difficulty: "hard",
      explanation: "Mention 2 team roles and one benefit.",
      targets: ["2 roles", "Benefit"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },

    // -------------------------
    // DISCUSSION (opinions + reasons)
    // -------------------------
    {
      id: "p1",
      type: "prompt",
      section: "discussion",
      question: "Do you think students should wear school uniforms? Why or why not?",
      say: "I think uniforms can be useful because they make students look equal and reduce pressure about fashion. However, some students want to express themselves, so schools could allow small choices like different jackets.",
      model: "I think ____ because ____. However, ____.",
      difficulty: "hard",
      explanation: "Give 1 reason and 1 counter idea.",
      targets: ["Opinion", "Reason", "However"],
      rubric: RUBRIC
    },
    {
      id: "p2",
      type: "prompt",
      section: "discussion",
      question: "What are the good and bad sides of using phones at school?",
      say: "One good side is that phones can help students learn, for example by using dictionaries or learning apps. A bad side is that phones can distract students and cause cheating. In my opinion, phones should be used only with a teacher’s permission.",
      model: "One good side is ____. A bad side is ____. In my opinion, ____.",
      difficulty: "hard",
      explanation: "Say one benefit, one problem, and your rule.",
      targets: ["Benefit", "Problem", "Suggestion"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "p3",
      type: "prompt",
      section: "discussion",
      question: "Is homework helpful for learning? Explain your opinion.",
      say: "Homework is helpful because it helps students practice and remember lessons. However, too much homework can make students tired and stressed. I think teachers should give short homework that is meaningful.",
      model: "Homework is helpful because ____. However, ____. I think ____.",
      difficulty: "hard",
      explanation: "Use ‘because’ and ‘however’.",
      targets: ["Because", "However", "Clear suggestion"],
      rubric: RUBRIC
    },
    {
      id: "p4",
      type: "prompt",
      section: "discussion",
      question: "What is one way students can help protect the environment at school?",
      say: "One way students can protect the environment is to reduce plastic waste. For example, we can bring reusable water bottles and recycle paper. Small actions can make a big difference if everyone joins.",
      model: "One way is to ____. For example, ____.",
      difficulty: "medium",
      explanation: "Give one action and one example.",
      targets: ["Action", "Example"],
      rubric: RUBRIC
    },
    {
      id: "p5",
      type: "prompt",
      section: "discussion",
      question: "Do you prefer learning from books or videos? Why?",
      say: "I prefer learning from videos because they are easy to understand and show real examples. However, books are better for deep reading and focus, so I use both depending on the topic.",
      model: "I prefer ____ because ____. However, ____.",
      difficulty: "hard",
      explanation: "Give your preference and add a balanced point.",
      targets: ["Preference", "Balanced point"],
      rubric: RUBRIC
    },
    {
      id: "p6",
      type: "prompt",
      section: "discussion",
      question: "What makes a good friend? Name 3 qualities and explain one.",
      say: "A good friend is honest, kind, and reliable. For me, being reliable is important because you can trust that person when you need help or advice.",
      model: "A good friend is ____, ____, and ____. For me, ____ is important because ____.",
      difficulty: "medium",
      explanation: "List 3 qualities and explain 1 with ‘because’.",
      targets: ["3 qualities", "Explain 1 quality"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 3 } }
    },
    {
      id: "p7",
      type: "prompt",
      section: "discussion",
      question: "Should students join clubs or sports teams? Why might it help them?",
      say: "I think students should join clubs or teams because they can make friends and learn teamwork. It also helps them stay healthy and manage their time better.",
      model: "I think students should ____ because ____. It also helps them ____.",
      difficulty: "medium",
      explanation: "Give 2 benefits.",
      targets: ["2 benefits", "Clear sentences"],
      rubric: RUBRIC
    },
    {
      id: "p8",
      type: "prompt",
      section: "discussion",
      question: "Some people say online learning will replace school. Do you agree?",
      say: "I don’t think online learning will completely replace school because students need face-to-face interaction and teachers’ support. However, online learning is useful for extra practice, so I think a mix is best.",
      model: "I (don’t) think ____ because ____. However, ____.",
      difficulty: "hard",
      explanation: "Say agree/disagree and give a balanced conclusion.",
      targets: ["Opinion", "Reason", "Balanced conclusion"],
      rubric: RUBRIC
    },
    {
      id: "p9",
      type: "prompt",
      section: "discussion",
      question: "What should students do when they feel stressed? Give 2 ideas.",
      say: "When students feel stressed, they can talk to someone they trust, like a parent or teacher. They can also take short breaks, exercise, or plan their tasks in small steps.",
      model: "They can ____. They can also ____.",
      difficulty: "medium",
      explanation: "Give two practical ideas.",
      targets: ["2 ideas", "Practical advice"],
      rubric: RUBRIC
    },
    {
      id: "p10",
      type: "prompt",
      section: "discussion",
      question: "Do you think it is important to learn English? How might it help in the future?",
      say: "Yes, I think it is important because English can help us communicate with people from other countries. In the future, it can help with studying, finding jobs, and traveling more confidently.",
      model: "Yes/No, I think it is important because ____. In the future, it can help with ____.",
      difficulty: "medium",
      explanation: "Give 2 future benefits.",
      targets: ["Use because", "2 future benefits"],
      rubric: RUBRIC
    }

    ,

    // -------------------------
    // EXTENDED BANK (more prompts)
    // -------------------------

    {
      id: "w11",
      type: "prompt",
      section: "warmup",
      question: "What do you usually do before school (3–5 sentences)?",
      say: "Before school, I usually wake up at six thirty and get dressed. Then I eat breakfast and check my timetable. After that, I pack my bag carefully and leave the house on time.",
      model: "Before school, I usually ____. Then I ____. After that, I ____.",
      difficulty: "medium",
      explanation: "Use time words and speak in 3–5 connected sentences.",
      targets: ["3–5 sentences", "Time words"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "w12",
      type: "prompt",
      section: "warmup",
      question: "Tell me about a recent achievement. What did you do and how did you feel?",
      say: "Recently, I finished a difficult maths worksheet without help. At first I felt nervous, but I read the instructions carefully and tried each question step by step. When I got the last answer correct, I felt proud and relieved.",
      model: "Recently, I ____. At first, I felt ____, but ____. In the end, I felt ____.",
      difficulty: "hard",
      explanation: "Use past tense and include at least two feeling words.",
      targets: ["Past tense", "2 feeling words"],
      rubric: RUBRIC
    },
    {
      id: "w13",
      type: "prompt",
      section: "warmup",
      question: "If you could change one school rule, what would you change and why?",
      say: "If I could change one rule, I would allow students a longer break time. It would help us relax and return to class with more focus. However, students should still follow rules like keeping the school clean.",
      model: "If I could change one rule, I would ____. It would help because ____. However, ____.",
      difficulty: "hard",
      explanation: "Give your idea, a reason with ‘because’, and one ‘however’ point.",
      targets: ["Use because", "Use however"],
      rubric: RUBRIC
    },
    {
      id: "w14",
      type: "prompt",
      section: "warmup",
      question: "What is your favourite snack? Describe it and say when you usually eat it.",
      say: "My favourite snack is yogurt with fruit. It tastes sweet and fresh, and it keeps me full. I usually eat it after school because it gives me energy before homework.",
      model: "My favourite snack is ____. It tastes ____. I usually eat it ____ because ____.",
      difficulty: "medium",
      explanation: "Describe taste/texture and add a reason.",
      targets: ["Description", "Use because"],
      rubric: RUBRIC
    },
    {
      id: "w15",
      type: "prompt",
      section: "warmup",
      question: "Do you prefer mornings or evenings? Explain with two reasons.",
      say: "I prefer evenings because I can finish my homework and relax. I also like evenings because I can talk with my family and plan the next day. In the morning, I often feel rushed.",
      model: "I prefer ____ because ____. I also like ____ because ____.",
      difficulty: "hard",
      explanation: "Give two reasons and keep your sentences clear.",
      targets: ["2 reasons", "Clear sentences"],
      rubric: RUBRIC
    },
    {
      id: "w16",
      type: "prompt",
      section: "warmup",
      question: "Tell me about a time you solved a problem (4–6 sentences).",
      say: "One time, my group couldn't agree on a project topic. I suggested we list three ideas and vote politely. After we voted, everyone accepted the result and we started working. I learned that calm discussion can save time.",
      model: "One time, ____. I decided to ____. After that, ____. I learned that ____.",
      difficulty: "hard",
      explanation: "Use past tense and include what you learned.",
      targets: ["Past tense", "Lesson learned"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "w17",
      type: "prompt",
      section: "warmup",
      question: "What is one thing you want to improve in English? How will you practice?",
      say: "I want to improve my speaking fluency. I will practice by reading short texts aloud and recording my voice. I will also learn useful linking words so my ideas connect better.",
      model: "I want to improve ____. I will practice by ____. I will also ____.",
      difficulty: "medium",
      explanation: "Say the skill and give two practice methods.",
      targets: ["Goal", "2 practice methods"],
      rubric: RUBRIC
    },
    {
      id: "w18",
      type: "prompt",
      section: "warmup",
      question: "Ask me two polite questions about my work or job.",
      say: "What do you do at your job? What do you like most about it?",
      model: "What do you ____? What do you like most about ____?",
      difficulty: "medium",
      explanation: "Ask two clear questions with polite tone.",
      targets: ["2 questions", "Polite tone"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "w19",
      type: "prompt",
      section: "warmup",
      question: "Describe a healthy habit you have on weekends.",
      say: "On weekends, I try to go for a long walk in the morning. It helps me feel energetic and less stressed. After the walk, I drink more water and I eat a healthier breakfast.",
      model: "On weekends, I try to ____. It helps because ____. After that, I ____.",
      difficulty: "medium",
      explanation: "Say the habit and explain why it helps.",
      targets: ["Habit", "Use because"],
      rubric: RUBRIC
    },
    {
      id: "w20",
      type: "prompt",
      section: "warmup",
      question: "If you had one extra hour each day, what would you do with it? Why?",
      say: "If I had one extra hour each day, I would exercise or learn a new skill. It would be useful because I could stay healthier and improve myself. However, I would still make sure I finish my homework first.",
      model: "If I had one extra hour, I would ____. It would be useful because ____. However, ____.",
      difficulty: "hard",
      explanation: "Use ‘If I had… I would…’ and give a reason.",
      targets: ["Conditional", "Use because", "Use however"],
      rubric: RUBRIC
    },

    // -------------------------
    // DESCRIBE (more topics)
    // -------------------------
    {
      id: "d9",
      type: "prompt",
      section: "describe",
      question: "Describe your bedroom or study area (what you can see and why you like it).",
      say: "My study area is next to a window, so it has natural light. I can see a small desk, a lamp, and a shelf with my books. I like it because it is quiet and it helps me focus on my homework.",
      model: "My study area is ____. I can see ____. I like it because ____.",
      difficulty: "medium",
      explanation: "Name at least three things you can see and add one reason.",
      targets: ["3 things", "Use because"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 4 } }
    },
    {
      id: "d10",
      type: "prompt",
      section: "describe",
      question: "Describe a school event you attended (what happened and why it was memorable).",
      say: "Last month, our class watched a science show in the hall. The presenter did simple experiments with colours and magnets, and everyone was excited. It was memorable because I learned something new and the atmosphere was fun.",
      model: "Last ____, I attended ____. It was memorable because ____.",
      difficulty: "hard",
      explanation: "Use past tense and give a clear reason.",
      targets: ["Past tense", "Reason"],
      rubric: RUBRIC
    },
    {
      id: "d11",
      type: "prompt",
      section: "describe",
      question: "Describe a useful gadget you use (what it does and how it helps you).",
      say: "A useful gadget I use is wireless headphones. They help me listen to lessons and music without disturbing other people. They are useful because I can focus better when there is noise around me.",
      model: "A useful gadget I use is ____. It helps me ____. It is useful because ____.",
      difficulty: "medium",
      explanation: "Explain what it does and one benefit.",
      targets: ["Function", "Benefit"],
      rubric: RUBRIC
    },
    {
      id: "d12",
      type: "prompt",
      section: "describe",
      question: "Compare two ways of traveling to school (for example: bus vs bike). Which is better for you and why?",
      say: "For me, taking the bus is better than riding a bike because it is safer on busy roads. Riding a bike is healthier, but it can be tiring in hot weather. So I choose the bus most days.",
      model: "For me, ____ is better than ____ because ____. ____ is ____, but ____.",
      difficulty: "hard",
      explanation: "Give one advantage and one disadvantage.",
      targets: ["Comparison", "Use because", "Use but"],
      rubric: RUBRIC
    },
    {
      id: "d13",
      type: "prompt",
      section: "describe",
      question: "Describe a meal you remember (what it looked like, tasted like, and why you remember it).",
      say: "I remember a bowl of noodle soup I ate on a family trip. It smelled amazing and tasted rich and spicy. I remember it because we ate together and laughed a lot, so the meal felt special.",
      model: "I remember ____. It looked ____. It tasted ____. I remember it because ____.",
      difficulty: "hard",
      explanation: "Use describing words for smell/taste and add a reason.",
      targets: ["Describing words", "Use because"],
      rubric: RUBRIC
    },
    {
      id: "d14",
      type: "prompt",
      section: "describe",
      question: "Describe an animal you find interesting and explain why.",
      say: "I find dolphins interesting because they are intelligent and social. They communicate with sounds and they can learn tricks quickly. I also like them because they seem friendly and playful.",
      model: "I find ____ interesting because ____. They ____. I also like them because ____.",
      difficulty: "medium",
      explanation: "Give two facts and one reason.",
      targets: ["2 facts", "Use because"],
      rubric: RUBRIC
    },
    {
      id: "d15",
      type: "prompt",
      section: "describe",
      question: "Describe something surprising you saw recently (what it was and how you reacted).",
      say: "Recently, I saw a street performer making bubbles as big as balloons. At first I thought it was a trick, but then I watched carefully and saw how he used a special stick. I felt amazed and I took a photo.",
      model: "Recently, I saw ____. At first, I ____, but then ____. I felt ____.",
      difficulty: "hard",
      explanation: "Tell what happened in order and include your reaction.",
      targets: ["Sequence", "Feeling word"],
      rubric: RUBRIC
    },
    {
      id: "d16",
      type: "prompt",
      section: "describe",
      question: "Describe a poster or sign you have seen at school. What message did it give?",
      say: "I saw a poster near the stairs that said, 'Walk, don't run.' It had a picture of students using the handrail. The message was important because it helps prevent accidents.",
      model: "I saw a poster that said ____. It showed ____. The message was important because ____.",
      difficulty: "medium",
      explanation: "Mention the message and explain why it matters.",
      targets: ["Message", "Use because"],
      rubric: RUBRIC
    },
    {
      id: "d17",
      type: "prompt",
      section: "describe",
      question: "Describe a person who inspires you (who they are and what you learn from them).",
      say: "A person who inspires me is my older sister. She is hardworking and always plans her time well. I learn from her because she doesn't give up when something is difficult, and she stays calm.",
      model: "A person who inspires me is ____. He/She is ____. I learn from him/her because ____.",
      difficulty: "hard",
      explanation: "Include two qualities and one lesson.",
      targets: ["2 qualities", "Lesson"],
      rubric: RUBRIC
    },
    {
      id: "d18",
      type: "prompt",
      section: "describe",
      question: "Describe today's weather and how it affects your plans.",
      say: "Today the weather is hot and sunny, so I feel a little tired outside. I will bring a water bottle and stay in the shade. I prefer cooler weather because it is easier to concentrate.",
      model: "Today it is ____. It affects my plans because ____. I will ____.",
      difficulty: "medium",
      explanation: "Describe the weather, then explain one effect.",
      targets: ["Weather words", "Use because"],
      rubric: RUBRIC
    },

    // -------------------------
    // ROLE-PLAY (more interaction)
    // -------------------------
    {
      id: "r7",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You need more time for an assignment. Ask your teacher politely.",
      say: "Excuse me, could I have one more day to finish the assignment, please? I was sick yesterday, so I couldn't complete it. I will submit it tomorrow. Thank you.",
      model: "Excuse me, could I ____? I ____ so I couldn't ____. I will ____. Thank you.",
      difficulty: "hard",
      explanation: "Make a polite request, give a reason, and promise a plan.",
      targets: ["Polite request", "Reason", "Promise"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "r8",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You want to join a group project. Ask your classmates politely.",
      say: "Hi, could I join your group for the project? I can help with research or making the slides. If it's okay with you, I would like to work together. Thanks.",
      model: "Hi, could I ____? I can help with ____. Thanks.",
      difficulty: "medium",
      explanation: "Ask politely and offer one way you can help.",
      targets: ["Polite request", "Offer help"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "r9",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You missed your bus stop. Speak to the bus driver politely and ask what to do.",
      say: "Excuse me, I think I missed my stop. Could you tell me where I should get off and how I can go back, please? Thank you for your help.",
      model: "Excuse me, I think ____. Could you tell me ____? Thank you.",
      difficulty: "hard",
      explanation: "Explain the problem and ask two polite questions.",
      targets: ["Explain", "2 questions"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "r10",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You are ordering at a café. Ask about ingredients politely.",
      say: "Hello, could I have a chicken sandwich, please? Does it contain nuts or spicy sauce? If it does, could you recommend something mild instead?",
      model: "Hello, could I have ____? Does it contain ____? Could you recommend ____?",
      difficulty: "hard",
      explanation: "Order politely and ask about ingredients.",
      targets: ["Polite order", "Ask about ingredients"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "r11",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You want to return an item to a shop. Explain the problem politely.",
      say: "Excuse me, I bought this notebook yesterday, but several pages are torn. Could I exchange it for a new one, please? I still have the receipt. Thank you.",
      model: "Excuse me, I bought ____, but ____. Could I ____? Thank you.",
      difficulty: "medium",
      explanation: "State the problem clearly and ask for a solution.",
      targets: ["Problem", "Polite request"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "r12",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You need to cancel plans with a friend. Apologize and suggest another time.",
      say: "I'm really sorry, but I can't meet today because I have to help my family. Could we meet tomorrow afternoon instead? I hope that's okay.",
      model: "I'm sorry, but I can't ____ because ____. Could we ____ instead?",
      difficulty: "hard",
      explanation: "Apologize, give a reason, and suggest a new plan.",
      targets: ["Apology", "Reason", "New plan"],
      rubric: RUBRIC
    },
    {
      id: "r13",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: Your neighbour is playing loud music. Ask them to lower it politely.",
      say: "Excuse me, could you please turn the music down a little? I'm trying to study for a test. Thank you for understanding.",
      model: "Excuse me, could you please ____? I'm trying to ____. Thank you.",
      difficulty: "hard",
      explanation: "Be polite and give a clear reason.",
      targets: ["Polite request", "Reason"],
      rubric: RUBRIC
    },
    {
      id: "r14",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: Ask your coach for advice to improve your performance.",
      say: "Coach, could you give me some advice to improve my skills? I want to get better at my footwork. What should I practice at home?",
      model: "Could you give me advice to ____? What should I practice ____?",
      difficulty: "medium",
      explanation: "Ask politely and include two questions.",
      targets: ["2 questions", "Polite tone"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "r15",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You are in a new building. Ask the receptionist for directions politely.",
      say: "Hello, could you tell me how to get to Room 12, please? Should I take the stairs or the lift? Thank you.",
      model: "Hello, could you tell me how to get to ____? Should I ____? Thank you.",
      difficulty: "medium",
      explanation: "Ask for directions and one extra question.",
      targets: ["Directions", "Extra question"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, encourageBecause: false } }
    },
    {
      id: "r16",
      type: "prompt",
      section: "roleplay",
      question: "Role-play: You lost your phone at school. Report it to the school office and describe it.",
      say: "Excuse me, I lost my phone today. It's a black phone with a blue case, and I think I dropped it near the canteen. Could you please help me check the lost and found?",
      model: "Excuse me, I lost ____. It's ____, and I think ____. Could you please ____?",
      difficulty: "hard",
      explanation: "Describe the item and where you last saw it.",
      targets: ["Description", "Location", "Polite request"],
      rubric: RUBRIC
    },

    // -------------------------
    // LONG TURN (more cue cards)
    // -------------------------
    {
      id: "c7",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a time you learned something new outside school.",
      cue: ["What you learned", "Who taught you or how you learned", "What was difficult", "How you felt"],
      followUps: ["Do you prefer learning alone or with others? Why?", "What skills are useful for the future?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "I learned how to ride a bicycle outside school. My uncle taught me in a quiet street near our house. At first, balancing was difficult and I fell a few times, but I kept trying and listened carefully to his advice. After a week, I could ride without help. I felt excited and proud because I didn't give up.",
      model: "I learned ____. I learned it by ____. It was difficult because ____. I felt ____.",
      difficulty: "medium",
      explanation: "Speak for about one minute and use past tense.",
      targets: ["Past tense", "Clear sequence"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c8",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Describe a challenge you faced and how you overcame it.",
      cue: ["What the challenge was", "When it happened", "What you did", "What you learned"],
      followUps: ["Why is it good to face challenges?", "How can teachers help students with challenges?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "A challenge I faced was speaking in front of the class for the first time. It happened last semester during an English presentation. I felt nervous, so I practiced at home and wrote short key words instead of full sentences. During the presentation, I spoke slowly and looked at friendly classmates. In the end, it went well, and I learned that preparation can reduce fear.",
      model: "A challenge I faced was ____. It happened ____. I overcame it by ____. I learned that ____.",
      difficulty: "hard",
      explanation: "Include the steps you took and a lesson.",
      targets: ["Steps", "Lesson"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c9",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a school rule you think is important.",
      cue: ["What the rule is", "Why it exists", "What happens if people ignore it", "Your opinion"],
      followUps: ["Should students help create school rules?", "How can schools be safer?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "An important school rule is walking in the corridors instead of running. The rule exists because the hallways can be crowded and accidents can happen near the stairs. If students run, someone might get hurt or drop their belongings. I agree with this rule because safety is more important than saving a few seconds. Teachers and students should remind each other politely.",
      model: "An important rule is ____. It exists because ____. If people ignore it, ____. In my opinion, ____.",
      difficulty: "medium",
      explanation: "Explain the reason and give a simple consequence.",
      targets: ["Reason", "Consequence"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c10",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Describe a trip you would like to take in the future.",
      cue: ["Where you want to go", "Who you would go with", "What you would do", "Why you want to go"],
      followUps: ["Is it better to travel with family or friends?", "What can we learn from traveling?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "In the future, I would like to visit a coastal city with my family. I want to go because I enjoy the sea and fresh air. We would visit local markets, try seafood, and take photos at the beach. I would also like to learn about the history of the area by visiting museums. I think the trip would be relaxing and meaningful because we could spend quality time together.",
      model: "I would like to go to ____. I would go with ____. We would ____. I want to go because ____.",
      difficulty: "hard",
      explanation: "Use ‘would’ and give 2–3 activities.",
      targets: ["Use would", "Activities"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c11",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about an object that is important to you.",
      cue: ["What it is", "How you got it", "How you use it", "Why it matters"],
      followUps: ["Do you think people buy too many things?", "What makes something valuable?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "An important object to me is a notebook where I write my goals and ideas. I started using it at the beginning of the year after my teacher suggested planning. I use it to write homework reminders and short reflections about my day. It matters because it helps me stay organized and calm. When I feel stressed, I read my notes and remember what I need to do next.",
      model: "An important object is ____. I got it ____. I use it to ____. It matters because ____.",
      difficulty: "medium",
      explanation: "Include how you use it and why it helps you.",
      targets: ["Use it", "Reason"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c12",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Describe a person you admire and explain why.",
      cue: ["Who the person is", "What they do", "A quality you respect", "What you learn from them"],
      followUps: ["Do role models matter for teenagers?", "How can you become a good role model?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "I admire my grandfather because he is calm and hardworking. He takes care of our family and always helps neighbours when they need support. One quality I respect is his patience, because he listens carefully before giving advice. When I talk to him, I learn to stay positive and solve problems step by step. I hope I can be like him in the future.",
      model: "I admire ____. I respect him/her because ____. One quality is ____. I learn to ____.",
      difficulty: "hard",
      explanation: "Include a quality and an example.",
      targets: ["Quality", "Example"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c13",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a mistake you made and what you learned from it.",
      cue: ["What the mistake was", "What happened", "How you fixed it", "What you learned"],
      followUps: ["Is it okay to make mistakes? Why?", "How should people react when someone makes a mistake?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "I once forgot to bring a permission slip for a school trip. Because I didn't check my bag, I had to call my parents and ask them to bring it quickly. I felt embarrassed, but I apologized to my teacher and thanked my parents. After that, I started making a checklist the night before important days. I learned that planning ahead can prevent stress.",
      model: "I once ____. Because ____, ____. I fixed it by ____. I learned that ____.",
      difficulty: "hard",
      explanation: "Use past tense and include what you changed after.",
      targets: ["Past tense", "Lesson"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c14",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Describe a place where you like to relax.",
      cue: ["Where it is", "What it looks like", "What you do there", "Why it helps you"],
      followUps: ["Why do people need quiet time?", "What activities help you relax?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "A place where I like to relax is a small corner in my home near the window. There is a comfortable chair, a plant, and a shelf with books. I sit there to read, listen to calm music, or think about my day. It helps me because the area is quiet and I can breathe more slowly. After a few minutes, I feel more focused and happier.",
      model: "A place I relax is ____. It looks like ____. I go there to ____. It helps because ____.",
      difficulty: "medium",
      explanation: "Use describing words and explain the effect on you.",
      targets: ["Describing words", "Use because"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c15",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Talk about a celebration you enjoyed.",
      cue: ["What the celebration was", "Where it happened", "What you did", "Why it was enjoyable"],
      followUps: ["Why are celebrations important?", "Do you prefer small or big celebrations?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "I enjoyed a family celebration for my cousin's birthday. It happened at our house, and everyone helped prepare food and decorations. We played games, shared stories, and took many photos together. I enjoyed it because the mood was warm and everyone laughed a lot. After the party, I felt grateful because my family spent time together.",
      model: "I enjoyed ____. It happened ____. We ____. I enjoyed it because ____.",
      difficulty: "medium",
      explanation: "Include activities and one feeling at the end.",
      targets: ["Activities", "Feeling"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },
    {
      id: "c16",
      type: "prompt",
      section: "longturn",
      question: "Cue card: Describe a piece of technology you use every day.",
      cue: ["What it is", "How you use it", "One benefit", "One problem"],
      followUps: ["Do you think technology makes life better?", "How can students use technology safely?"],
      timing: { prepSeconds: 30, speakSeconds: 75 },
      say: "A piece of technology I use every day is my smartphone. I use it to message my family, check my schedule, and learn English with short practice videos. One benefit is that it saves time because I can find information quickly. However, a problem is that it can distract me with notifications. To stay focused, I put it away when I study.",
      model: "I use ____. I use it to ____. One benefit is ____. However, one problem is ____.",
      difficulty: "hard",
      explanation: "Give one benefit and one problem, and include ‘however’.",
      targets: ["Benefit", "Problem", "Use however"],
      rubric: { ...RUBRIC, checks: { ...RUBRIC.checks, minSentences: 6 } }
    },

    // -------------------------
    // DISCUSSION (more opinions)
    // -------------------------
    {
      id: "p11",
      type: "prompt",
      section: "discussion",
      question: "Should students do chores at home? Why or why not?",
      say: "Yes, I think students should do chores because it teaches responsibility. For example, washing dishes or cleaning a room helps the family. However, chores should not take too much time, so students can still study and rest.",
      model: "Yes/No, I think ____ because ____. For example, ____. However, ____.",
      difficulty: "hard",
      explanation: "Give a reason, an example, and one ‘however’ point.",
      targets: ["Reason", "Example", "However"],
      rubric: RUBRIC
    },
    {
      id: "p12",
      type: "prompt",
      section: "discussion",
      question: "What are the benefits of doing regular exercise for teenagers?",
      say: "Regular exercise helps teenagers stay healthy and strong. It can also reduce stress and improve sleep. In addition, exercise teaches discipline because you need to practice regularly.",
      model: "Exercise helps because ____. It can also ____. In addition, ____.",
      difficulty: "medium",
      explanation: "Give at least three benefits.",
      targets: ["3 benefits", "Clear sentences"],
      rubric: RUBRIC
    },
    {
      id: "p13",
      type: "prompt",
      section: "discussion",
      question: "Do you think schools should start later in the morning? Explain.",
      say: "I think schools could start later because many students feel sleepy early in the morning. If students sleep more, they might concentrate better in class. However, starting later could make after-school activities finish too late.",
      model: "I think ____ because ____. If ____, ____. However, ____.",
      difficulty: "hard",
      explanation: "Give one reason and one possible problem.",
      targets: ["Use because", "Use however"],
      rubric: RUBRIC
    },
    {
      id: "p14",
      type: "prompt",
      section: "discussion",
      question: "What can students do to reduce screen time? Give two ideas.",
      say: "Students can set a time limit for games and social media. They can also replace screen time with activities like sports, reading, or drawing. Small changes can help them build better habits.",
      model: "They can ____. They can also ____.",
      difficulty: "medium",
      explanation: "Give two practical ideas.",
      targets: ["2 ideas", "Practical advice"],
      rubric: RUBRIC
    },
    {
      id: "p15",
      type: "prompt",
      section: "discussion",
      question: "Is it better to read for fun or read for learning? Why?",
      say: "I think both are important, but reading for fun is a good start because it builds a reading habit. When you enjoy a story, you naturally learn new words. However, reading for learning is necessary when you want deeper knowledge.",
      model: "I think ____ is important because ____. However, ____.",
      difficulty: "hard",
      explanation: "Give your view and include a balanced idea.",
      targets: ["Opinion", "Because", "However"],
      rubric: RUBRIC
    },
    {
      id: "p16",
      type: "prompt",
      section: "discussion",
      question: "Should students volunteer in their community? How can it help them?",
      say: "I think volunteering is helpful because students learn to care about other people. For example, they can help clean a park or support a charity event. Volunteering can also improve confidence and teamwork.",
      model: "I think volunteering is helpful because ____. For example, ____. It can also ____.",
      difficulty: "medium",
      explanation: "Give one example and two benefits.",
      targets: ["Example", "2 benefits"],
      rubric: RUBRIC
    },
    {
      id: "p17",
      type: "prompt",
      section: "discussion",
      question: "What are the good and bad sides of social media for students?",
      say: "Social media can help students stay connected and share ideas. For example, they can join study groups and learn from videos. However, it can waste time and make students compare themselves to others, so using it wisely is important.",
      model: "One good side is ____. For example, ____. However, one bad side is ____.",
      difficulty: "hard",
      explanation: "Mention one benefit, one problem, and one safety idea.",
      targets: ["Benefit", "Problem", "Suggestion"],
      rubric: RUBRIC
    },
    {
      id: "p18",
      type: "prompt",
      section: "discussion",
      question: "Do you think public transport is important for a city? Why?",
      say: "Yes, public transport is important because it helps people travel without needing a car. It can reduce traffic and pollution. If buses and trains are reliable, life becomes easier for many families.",
      model: "Yes/No, it is important because ____. It can ____. If ____, ____.",
      difficulty: "medium",
      explanation: "Give two reasons and one simple result.",
      targets: ["2 reasons", "Result"],
      rubric: RUBRIC
    },
    {
      id: "p19",
      type: "prompt",
      section: "discussion",
      question: "Should schools teach more life skills (like cooking or budgeting)? Why or why not?",
      say: "I think schools should teach some life skills because students will use them in real life. For example, budgeting can help teenagers manage money better. However, schools should balance these lessons with academic subjects.",
      model: "I think schools should ____ because ____. For example, ____. However, ____.",
      difficulty: "hard",
      explanation: "Give a reason, an example, and a balanced point.",
      targets: ["Reason", "Example", "However"],
      rubric: RUBRIC
    },
    {
      id: "p20",
      type: "prompt",
      section: "discussion",
      question: "What is one way to become a more confident speaker in English?",
      say: "One way to become more confident is to practice speaking a little every day. For example, you can describe your day aloud or practice with a friend. If you make mistakes, you should keep going because mistakes are part of learning.",
      model: "One way is to ____. For example, ____. If ____, ____ because ____.",
      difficulty: "medium",
      explanation: "Give one method, one example, and encouraging advice.",
      targets: ["Method", "Example", "Encouragement"],
      rubric: RUBRIC
    }

  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
