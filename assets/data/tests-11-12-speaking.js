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
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
