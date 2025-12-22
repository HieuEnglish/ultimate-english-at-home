/* assets/data/tests-13-18-speaking.js
   Question bank: Ages 13–18 • Speaking (IELTS-inspired)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-13-18-speaking"

   Notes:
   - Part 1: short interview-style questions (2–4 sentences)
   - Part 2: cue card long turn (1–2 minutes suggested)
   - Part 3: deeper discussion questions linked by topicId
*/

(function () {
  "use strict";

  const SLUG = "age-13-18-speaking";

  const RUBRIC_BASE = {
    criteria: {
      task: {
        good: "Answers directly and extends ideas with reasons/examples.",
        developing: "Answers but ideas are short or not well supported.",
        needsWork: "Struggles to answer or ideas are unclear."
      },
      fluency: {
        good: "Speaks smoothly with natural pauses.",
        developing: "Some hesitation, but can keep going.",
        needsWork: "Frequent stops; needs a lot of support."
      },
      language: {
        good: "Uses a good range of vocabulary and mostly accurate grammar.",
        developing: "Vocabulary/grammar is basic; mistakes sometimes affect clarity.",
        needsWork: "Many errors that block understanding."
      },
      pronunciation: {
        good: "Generally clear and easy to understand.",
        developing: "Occasionally unclear; repeats help.",
        needsWork: "Often hard to understand."
      },
      coherence: {
        good: "Ideas are organised with linking words (because, however, for example).",
        developing: "Some organisation but linking is limited.",
        needsWork: "Ideas are not connected; hard to follow."
      }
    },
    checks: {
      minSentences: 2,
      encourageBecause: true,
      encourageLinkers: true
    }
  };

  const RUBRIC_P1 = { ...RUBRIC_BASE, checks: { ...RUBRIC_BASE.checks, minSentences: 2 } };
  const RUBRIC_P2 = { ...RUBRIC_BASE, checks: { ...RUBRIC_BASE.checks, minSentences: 8 } };
  const RUBRIC_P3 = { ...RUBRIC_BASE, checks: { ...RUBRIC_BASE.checks, minSentences: 4 } };

  const QUESTIONS = [
    // -------------------------
    // PART 1 (INTERVIEW)
    // -------------------------
    {
      id: "p1-01",
      type: "prompt",
      section: "part1",
      question: "Do you work or study? What do you like about it?",
      model: "I’m currently studying. I like it because it helps me build skills for the future, and I enjoy learning new things with my classmates.",
      say: "I’m currently studying. I like it because it helps me build skills for the future, and I enjoy learning new things with my classmates.",
      difficulty: "easy",
      explanation: "Answer clearly, then add one reason and one extra detail.",
      targets: ["2–4 sentences", "Reason + detail"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-02",
      type: "prompt",
      section: "part1",
      question: "What do you usually do in the evenings?",
      model: "In the evenings, I usually finish homework and then relax. For example, I might watch a short video or talk to my family before sleeping.",
      say: "In the evenings, I usually finish homework and then relax. For example, I might watch a short video or talk to my family before sleeping.",
      difficulty: "easy",
      explanation: "Use ‘usually’ and include a small example.",
      targets: ["Routine language", "Example"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-03",
      type: "prompt",
      section: "part1",
      question: "Do you prefer studying alone or with others? Why?",
      model: "I prefer studying with others because we can share ideas and check answers. However, when I need deep focus, I study alone for a short time.",
      say: "I prefer studying with others because we can share ideas and check answers. However, when I need deep focus, I study alone for a short time.",
      difficulty: "medium",
      explanation: "Give your preference, a reason, and a contrast (however).",
      targets: ["Because", "However"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-04",
      type: "prompt",
      section: "part1",
      question: "What kind of music do you like? When do you listen to it?",
      model: "I like pop music because it’s energetic and easy to enjoy. I usually listen to it while travelling or when I need motivation to study.",
      say: "I like pop music because it’s energetic and easy to enjoy. I usually listen to it while travelling or when I need motivation to study.",
      difficulty: "easy",
      explanation: "Say the type, a reason, and a time you listen.",
      targets: ["Preference + reason", "Time phrase"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-05",
      type: "prompt",
      section: "part1",
      question: "Do you enjoy reading? What do you like to read?",
      model: "Yes, I enjoy reading because it helps me relax and learn new vocabulary. I like short novels and non-fiction about science or technology.",
      say: "Yes, I enjoy reading because it helps me relax and learn new vocabulary. I like short novels and non-fiction about science or technology.",
      difficulty: "medium",
      explanation: "Include one benefit of reading and one type of text.",
      targets: ["Benefit", "Type of reading"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-06",
      type: "prompt",
      section: "part1",
      question: "What is your favourite place in your city? Why?",
      model: "My favourite place is a park near my home because it’s quiet and green. I go there to walk, clear my mind, and sometimes meet friends.",
      say: "My favourite place is a park near my home because it’s quiet and green. I go there to walk, clear my mind, and sometimes meet friends.",
      difficulty: "medium",
      explanation: "Name the place, give a reason, and say what you do there.",
      targets: ["Place + reason", "Activities"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-07",
      type: "prompt",
      section: "part1",
      question: "Do you like cooking? What dish would you like to learn?",
      model: "I don’t cook a lot, but I want to learn a simple pasta dish. It seems practical, and I think it would be useful when I’m busy.",
      say: "I don’t cook a lot, but I want to learn a simple pasta dish. It seems practical, and I think it would be useful when I’m busy.",
      difficulty: "easy",
      explanation: "Be honest. Add one reason it’s useful.",
      targets: ["Desire", "Reason"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-08",
      type: "prompt",
      section: "part1",
      question: "How often do you use social media? Is it helpful or distracting?",
      model: "I use social media most days, but I try to limit it. It can be helpful for information, but it’s distracting if I use it without a plan.",
      say: "I use social media most days, but I try to limit it. It can be helpful for information, but it’s distracting if I use it without a plan.",
      difficulty: "hard",
      explanation: "Give a balanced view: one benefit and one drawback.",
      targets: ["Benefit + drawback", "Balanced opinion"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-09",
      type: "prompt",
      section: "part1",
      question: "Do you like travelling? Where would you like to go in the future?",
      model: "Yes, I like travelling because it helps me experience different cultures. In the future, I’d like to visit Japan to see the cities and try local food.",
      say: "Yes, I like travelling because it helps me experience different cultures. In the future, I’d like to visit Japan to see the cities and try local food.",
      difficulty: "easy",
      explanation: "Say where, and give one specific reason.",
      targets: ["Future plan", "Specific reason"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-10",
      type: "prompt",
      section: "part1",
      question: "What skill would you like to improve this year? Why?",
      model: "I’d like to improve my speaking skills because it will help me feel more confident in presentations and interviews. I plan to practise regularly with friends.",
      say: "I’d like to improve my speaking skills because it will help me feel more confident in presentations and interviews. I plan to practise regularly with friends.",
      difficulty: "medium",
      explanation: "Name the skill, give a reason, and add a plan.",
      targets: ["Reason", "Simple plan"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-11",
      type: "prompt",
      section: "part1",
      question: "Do you prefer watching films at home or at the cinema? Why?",
      model: "I prefer watching at home because it’s cheaper and more comfortable. However, the cinema is better for big action films because the sound is amazing.",
      say: "I prefer watching at home because it’s cheaper and more comfortable. However, the cinema is better for big action films because the sound is amazing.",
      difficulty: "medium",
      explanation: "Choose one, but mention a contrast too.",
      targets: ["Preference", "However/contrast"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-12",
      type: "prompt",
      section: "part1",
      question: "What do you do when you feel stressed?",
      model: "When I feel stressed, I try to organise my tasks and take short breaks. For example, I might go for a walk or listen to calm music for ten minutes.",
      say: "When I feel stressed, I try to organise my tasks and take short breaks. For example, I might go for a walk or listen to calm music for ten minutes.",
      difficulty: "hard",
      explanation: "Give 2 strategies and one example.",
      targets: ["2 strategies", "Example"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-13",
      type: "prompt",
      section: "part1",
      question: "Do you think teenagers should have a part-time job? Why/why not?",
      model: "I think it can be a good idea because it teaches responsibility and time management. However, school should still be the priority, so the hours should be limited.",
      say: "I think it can be a good idea because it teaches responsibility and time management. However, school should still be the priority, so the hours should be limited.",
      difficulty: "hard",
      explanation: "Give an opinion, a reason, and a condition/limit.",
      targets: ["Opinion", "Condition"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-14",
      type: "prompt",
      section: "part1",
      question: "Do you enjoy sports or exercise? What benefits do you notice?",
      model: "Yes, I enjoy exercise because it helps my health and mood. I notice I can focus better after a short workout, and I sleep more easily.",
      say: "Yes, I enjoy exercise because it helps my health and mood. I notice I can focus better after a short workout, and I sleep more easily.",
      difficulty: "easy",
      explanation: "Mention 2 benefits and a personal effect.",
      targets: ["2 benefits", "Personal effect"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-15",
      type: "prompt",
      section: "part1",
      question: "Do you like learning languages? What makes it difficult?",
      model: "Yes, I like it because it opens new opportunities. The difficult part is remembering vocabulary and pronunciation, so I need regular practice.",
      say: "Yes, I like it because it opens new opportunities. The difficult part is remembering vocabulary and pronunciation, so I need regular practice.",
      difficulty: "medium",
      explanation: "Say what’s hard and how you handle it.",
      targets: ["Challenge", "Solution"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-16",
      type: "prompt",
      section: "part1",
      question: "What kind of apps do you use most often? Why?",
      model: "I use messaging and study apps most often because they help me communicate and stay organised. For example, I use a calendar app to track deadlines.",
      say: "I use messaging and study apps most often because they help me communicate and stay organised. For example, I use a calendar app to track deadlines.",
      difficulty: "medium",
      explanation: "Mention 2 types of apps and one example.",
      targets: ["2 app types", "Example"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-17",
      type: "prompt",
      section: "part1",
      question: "Do you prefer mornings or evenings? Why?",
      model: "I prefer evenings because I feel more relaxed and creative. In the morning I can work, but it takes me time to feel fully awake.",
      say: "I prefer evenings because I feel more relaxed and creative. In the morning I can work, but it takes me time to feel fully awake.",
      difficulty: "easy",
      explanation: "Give one reason and a small comparison.",
      targets: ["Reason", "Comparison"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-18",
      type: "prompt",
      section: "part1",
      question: "What is one thing you would change about your school? Why?",
      model: "I would add more project-based learning because it makes lessons more practical. Students can work in teams and build real skills.",
      say: "I would add more project-based learning because it makes lessons more practical. Students can work in teams and build real skills.",
      difficulty: "hard",
      explanation: "Suggest a change and explain the benefit.",
      targets: ["Suggestion", "Benefit"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-19",
      type: "prompt",
      section: "part1",
      question: "Do you like shopping? What do you usually buy?",
      model: "I don’t shop very often, but I sometimes buy clothes or small tech accessories. I usually compare prices online before I buy anything.",
      say: "I don’t shop very often, but I sometimes buy clothes or small tech accessories. I usually compare prices online before I buy anything.",
      difficulty: "easy",
      explanation: "Keep it natural and add one habit (usually).",
      targets: ["Natural answer", "Habit word"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-20",
      type: "prompt",
      section: "part1",
      question: "What’s a popular hobby among teenagers in your country?",
      model: "A popular hobby is creating content online, like short videos or photos. It’s popular because it’s fun, social, and easy to share with friends.",
      say: "A popular hobby is creating content online, like short videos or photos. It’s popular because it’s fun, social, and easy to share with friends.",
      difficulty: "medium",
      explanation: "Mention the hobby and why it’s popular.",
      targets: ["Hobby", "Reason"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-21",
      type: "prompt",
      section: "part1",
      question: "Do you prefer to plan your day or be spontaneous? Why?",
      model: "I prefer planning because it helps me manage schoolwork and avoid stress. However, I still leave some free time for unexpected things.",
      say: "I prefer planning because it helps me manage schoolwork and avoid stress. However, I still leave some free time for unexpected things.",
      difficulty: "hard",
      explanation: "Give your preference and one balance point.",
      targets: ["Preference", "Balance"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-22",
      type: "prompt",
      section: "part1",
      question: "How do you usually get to school or work?",
      model: "I usually get there by bus because it’s affordable and convenient. If the weather is nice, I sometimes walk part of the way.",
      say: "I usually get there by bus because it’s affordable and convenient. If the weather is nice, I sometimes walk part of the way.",
      difficulty: "easy",
      explanation: "Mention the transport and a reason; add an alternative.",
      targets: ["Transport", "Reason"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-23",
      type: "prompt",
      section: "part1",
      question: "Do you like taking photos? What do you photograph?",
      model: "Yes, I like taking photos, especially of food and places. I take them to remember moments and share them with friends.",
      say: "Yes, I like taking photos, especially of food and places. I take them to remember moments and share them with friends.",
      difficulty: "easy",
      explanation: "Say what you photograph and why.",
      targets: ["What + why"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-24",
      type: "prompt",
      section: "part1",
      question: "What kind of weather do you enjoy most? Why?",
      model: "I enjoy cool, sunny weather because it’s comfortable and I can go outside easily. Rainy weather is relaxing, but it can limit activities.",
      say: "I enjoy cool, sunny weather because it’s comfortable and I can go outside easily. Rainy weather is relaxing, but it can limit activities.",
      difficulty: "medium",
      explanation: "Give a reason and compare briefly.",
      targets: ["Reason", "Comparison"],
      rubric: RUBRIC_P1
    },

    // -------------------------
    // PART 2 (CUE CARD) — topicId links to Part 3
    // -------------------------
    {
      id: "p2-tech-01",
      type: "prompt",
      section: "part2",
      topicId: "technology",
      question: "Describe a piece of technology you use every day.",
      cue: ["What it is", "How you use it", "Why you use it so often", "How it could be improved"],
      model:
        "One piece of technology I use every day is my smartphone. I mainly use it for communication, studying, and navigation. I use it so often because it saves time and keeps me connected with people. However, it can be distracting, so I try to control notifications. If it could be improved, I would like a longer battery life and fewer ads in apps.",
      say:
        "One piece of technology I use every day is my smartphone. I mainly use it for communication, studying, and navigation. I use it so often because it saves time and keeps me connected with people. However, it can be distracting, so I try to control notifications. If it could be improved, I would like a longer battery life and fewer ads in apps.",
      difficulty: "medium",
      explanation: "Aim for a longer answer: describe, explain reasons, and add one opinion.",
      targets: ["8+ sentences", "Reasons + opinion"],
      rubric: RUBRIC_P2
    },
    {
      id: "p2-edu-01",
      type: "prompt",
      section: "part2",
      topicId: "education",
      question: "Describe a teacher who has influenced you.",
      cue: ["Who the teacher is", "What they teach", "What they did that helped you", "Why this influence matters"],
      model:
        "A teacher who influenced me is my English teacher. She teaches communication skills and encourages students to speak confidently. She helped me by giving clear feedback and showing me how to practise effectively. For example, she suggested small daily habits like reading short texts and summarising them. This influence matters because it improved my confidence and made learning feel more achievable.",
      say:
        "A teacher who influenced me is my English teacher. She teaches communication skills and encourages students to speak confidently. She helped me by giving clear feedback and showing me how to practise effectively. For example, she suggested small daily habits like reading short texts and summarising them. This influence matters because it improved my confidence and made learning feel more achievable.",
      difficulty: "medium",
      explanation: "Include a concrete example of what the teacher did.",
      targets: ["Example", "Impact"],
      rubric: RUBRIC_P2
    },
    {
      id: "p2-env-01",
      type: "prompt",
      section: "part2",
      topicId: "environment",
      question: "Describe something you do to be more environmentally friendly.",
      cue: ["What you do", "When you started doing it", "Why you decided to do it", "How easy or difficult it is"],
      model:
        "One thing I do is reduce single-use plastic by carrying a reusable bottle and bag. I started doing it after learning about ocean pollution. I decided to do it because it’s a simple habit that can reduce waste over time. It’s mostly easy, but sometimes I forget, so I try to keep these items in my backpack.",
      say:
        "One thing I do is reduce single-use plastic by carrying a reusable bottle and bag. I started doing it after learning about ocean pollution. I decided to do it because it’s a simple habit that can reduce waste over time. It’s mostly easy, but sometimes I forget, so I try to keep these items in my backpack.",
      difficulty: "easy",
      explanation: "Explain your reason and one challenge.",
      targets: ["Reason", "Challenge"],
      rubric: RUBRIC_P2
    },
    {
      id: "p2-work-01",
      type: "prompt",
      section: "part2",
      topicId: "work",
      question: "Describe a job you would like to have in the future.",
      cue: ["What the job is", "What skills you need", "Why you want it", "What challenges it might have"],
      model:
        "A job I would like to have is working as a software developer. I would need strong problem-solving skills and the ability to learn continuously. I want it because I enjoy building useful tools and technology. The challenge is that it requires discipline and constant practice because the industry changes quickly. However, I think that challenge is motivating.",
      say:
        "A job I would like to have is working as a software developer. I would need strong problem-solving skills and the ability to learn continuously. I want it because I enjoy building useful tools and technology. The challenge is that it requires discipline and constant practice because the industry changes quickly. However, I think that challenge is motivating.",
      difficulty: "hard",
      explanation: "Include skills + challenges + your attitude.",
      targets: ["Skills", "Challenges", "Opinion"],
      rubric: RUBRIC_P2
    },

    // -------------------------
    // PART 3 (DISCUSSION) — topicId must match Part 2
    // -------------------------
    // Technology
    {
      id: "p3-tech-01",
      type: "prompt",
      section: "part3",
      topicId: "technology",
      question: "How has technology changed the way people communicate?",
      model:
        "Technology has made communication faster and more convenient because we can message instantly. However, it can reduce face-to-face interaction, so people may misunderstand each other more easily. Overall, it’s useful if we use it responsibly.",
      say:
        "Technology has made communication faster and more convenient because we can message instantly. However, it can reduce face-to-face interaction, so people may misunderstand each other more easily. Overall, it’s useful if we use it responsibly.",
      difficulty: "medium",
      explanation: "Give examples and compare past vs present.",
      targets: ["Comparison", "Example"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-tech-02",
      type: "prompt",
      section: "part3",
      topicId: "technology",
      question: "Do you think people depend too much on smartphones? Why?",
      model:
        "In many cases, yes, because smartphones are used for everything from navigation to entertainment. This dependence can reduce attention and productivity. On the other hand, phones are helpful tools, so the key is balance and self-control.",
      say:
        "In many cases, yes, because smartphones are used for everything from navigation to entertainment. This dependence can reduce attention and productivity. On the other hand, phones are helpful tools, so the key is balance and self-control.",
      difficulty: "hard",
      explanation: "Give a balanced answer and a clear conclusion.",
      targets: ["Pros/cons", "Conclusion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-tech-03",
      type: "prompt",
      section: "part3",
      topicId: "technology",
      question: "Should schools use more technology in the classroom?",
      model:
        "Schools should use more technology because it can make lessons more interactive and personalised. For example, students can practise skills with apps and get instant feedback. However, teachers need clear rules to avoid distractions.",
      say:
        "Schools should use more technology because it can make lessons more interactive and personalised. For example, students can practise skills with apps and get instant feedback. However, teachers need clear rules to avoid distractions.",
      difficulty: "hard",
      explanation: "Support your opinion with one example and one condition.",
      targets: ["Example", "Condition"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-tech-04",
      type: "prompt",
      section: "part3",
      topicId: "technology",
      question: "What are the risks of using AI tools for studying?",
      model:
        "AI tools can be helpful for explanations, but the risk is that students may rely on them and stop thinking deeply. Another risk is incorrect information. Therefore, students should verify sources and use AI as support, not a replacement.",
      say:
        "AI tools can be helpful for explanations, but the risk is that students may rely on them and stop thinking deeply. Another risk is incorrect information. Therefore, students should verify sources and use AI as support, not a replacement.",
      difficulty: "hard",
      explanation: "Mention at least 2 risks and one solution.",
      targets: ["2 risks", "Solution"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-tech-05",
      type: "prompt",
      section: "part3",
      topicId: "technology",
      question: "How can people reduce screen time in daily life?",
      model:
        "People can reduce screen time by setting app limits and turning off unnecessary notifications. They can also replace screen habits with activities like exercise or reading. Most importantly, they need a clear routine and goals.",
      say:
        "People can reduce screen time by setting app limits and turning off unnecessary notifications. They can also replace screen habits with activities like exercise or reading. Most importantly, they need a clear routine and goals.",
      difficulty: "medium",
      explanation: "Give 2–3 practical strategies.",
      targets: ["Practical strategies"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-tech-06",
      type: "prompt",
      section: "part3",
      topicId: "technology",
      question: "Do you think online friendships are as real as offline ones?",
      model:
        "Online friendships can be real because people can support each other and share experiences. However, offline friendships may feel stronger because you meet in person and build trust through daily life. In my view, both can be meaningful, depending on honesty and effort.",
      say:
        "Online friendships can be real because people can support each other and share experiences. However, offline friendships may feel stronger because you meet in person and build trust through daily life. In my view, both can be meaningful, depending on honesty and effort.",
      difficulty: "hard",
      explanation: "Compare, then give your view.",
      targets: ["Comparison", "Opinion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-tech-07",
      type: "prompt",
      section: "part3",
      topicId: "technology",
      question: "Should governments regulate social media more strictly?",
      model:
        "Some regulation is necessary to reduce harmful content and protect privacy. However, too much control can limit freedom of expression. A balanced approach could focus on transparency and safety, especially for young users.",
      say:
        "Some regulation is necessary to reduce harmful content and protect privacy. However, too much control can limit freedom of expression. A balanced approach could focus on transparency and safety, especially for young users.",
      difficulty: "hard",
      explanation: "Present both sides and suggest a balanced approach.",
      targets: ["Both sides", "Balanced suggestion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-tech-08",
      type: "prompt",
      section: "part3",
      topicId: "technology",
      question: "How might technology change education in the next 10 years?",
      model:
        "Education may become more personalised with adaptive learning platforms that match a student’s level. Classes might include more online components and flexible schedules. However, teachers will still be essential for motivation and critical thinking.",
      say:
        "Education may become more personalised with adaptive learning platforms that match a student’s level. Classes might include more online components and flexible schedules. However, teachers will still be essential for motivation and critical thinking.",
      difficulty: "medium",
      explanation: "Make 2 predictions and add one caution.",
      targets: ["Predictions", "Caution"],
      rubric: RUBRIC_P3
    },

    // Education
    {
      id: "p3-edu-01",
      type: "prompt",
      section: "part3",
      topicId: "education",
      question: "What makes a teacher effective?",
      model:
        "An effective teacher explains clearly and understands students’ needs. They also give useful feedback and encourage participation. For example, they might use examples and check understanding often.",
      say:
        "An effective teacher explains clearly and understands students’ needs. They also give useful feedback and encourage participation. For example, they might use examples and check understanding often.",
      difficulty: "medium",
      explanation: "Give 2–3 qualities and one example.",
      targets: ["Qualities", "Example"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-edu-02",
      type: "prompt",
      section: "part3",
      topicId: "education",
      question: "Should exams be the main way to measure students’ ability?",
      model:
        "Exams are useful because they are standardised and easy to compare. However, they don’t always measure creativity or teamwork. A better system would combine exams with projects and presentations.",
      say:
        "Exams are useful because they are standardised and easy to compare. However, they don’t always measure creativity or teamwork. A better system would combine exams with projects and presentations.",
      difficulty: "hard",
      explanation: "Discuss limitations and propose an alternative.",
      targets: ["Limitations", "Alternative"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-edu-03",
      type: "prompt",
      section: "part3",
      topicId: "education",
      question: "How can schools reduce student stress?",
      model:
        "Schools can reduce stress by balancing homework and giving clear deadlines. They can also teach time management and provide counselling support. In addition, activities like sports and clubs can improve wellbeing.",
      say:
        "Schools can reduce stress by balancing homework and giving clear deadlines. They can also teach time management and provide counselling support. In addition, activities like sports and clubs can improve wellbeing.",
      difficulty: "hard",
      explanation: "Provide 3 practical ideas.",
      targets: ["3 ideas"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-edu-04",
      type: "prompt",
      section: "part3",
      topicId: "education",
      question: "Do you think students should learn financial skills at school?",
      model:
        "Yes, because financial skills help students make better decisions in adult life. For example, they should learn budgeting, saving, and understanding basic contracts. It’s practical knowledge that many people need.",
      say:
        "Yes, because financial skills help students make better decisions in adult life. For example, they should learn budgeting, saving, and understanding basic contracts. It’s practical knowledge that many people need.",
      difficulty: "medium",
      explanation: "Give a reason and one example topic.",
      targets: ["Reason", "Example"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-edu-05",
      type: "prompt",
      section: "part3",
      topicId: "education",
      question: "What are the advantages and disadvantages of online learning?",
      model:
        "Online learning is flexible and can save travel time. However, it may reduce interaction and motivation for some students. A mixed system could keep flexibility while still supporting social learning.",
      say:
        "Online learning is flexible and can save travel time. However, it may reduce interaction and motivation for some students. A mixed system could keep flexibility while still supporting social learning.",
      difficulty: "medium",
      explanation: "Give 1 advantage, 1 disadvantage, and a solution.",
      targets: ["Pros/cons", "Solution"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-edu-06",
      type: "prompt",
      section: "part3",
      topicId: "education",
      question: "How can students become more independent learners?",
      model:
        "Students can become independent by setting goals and planning study time. They should also review mistakes and ask questions when they don’t understand. Over time, small habits build confidence and responsibility.",
      say:
        "Students can become independent by setting goals and planning study time. They should also review mistakes and ask questions when they don’t understand. Over time, small habits build confidence and responsibility.",
      difficulty: "medium",
      explanation: "Mention habits and long-term benefits.",
      targets: ["Habits", "Benefits"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-edu-07",
      type: "prompt",
      section: "part3",
      topicId: "education",
      question: "Should schools focus more on creativity or practical skills?",
      model:
        "Both are important. Creativity helps students solve new problems, while practical skills help them function in real life. Schools could combine them through projects where students create something useful.",
      say:
        "Both are important. Creativity helps students solve new problems, while practical skills help them function in real life. Schools could combine them through projects where students create something useful.",
      difficulty: "hard",
      explanation: "Discuss both sides and propose a combined approach.",
      targets: ["Both sides", "Combined approach"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-edu-08",
      type: "prompt",
      section: "part3",
      topicId: "education",
      question: "How does a supportive teacher influence a student’s future?",
      model:
        "A supportive teacher can increase a student’s confidence and motivation. This can lead to better performance and more ambitious goals. For example, encouragement can help students try opportunities they would otherwise avoid.",
      say:
        "A supportive teacher can increase a student’s confidence and motivation. This can lead to better performance and more ambitious goals. For example, encouragement can help students try opportunities they would otherwise avoid.",
      difficulty: "hard",
      explanation: "Explain impact + one example.",
      targets: ["Impact", "Example"],
      rubric: RUBRIC_P3
    },

    // Environment
    {
      id: "p3-env-01",
      type: "prompt",
      section: "part3",
      topicId: "environment",
      question: "What are the most effective ways to reduce plastic waste?",
      model:
        "The most effective ways include reducing single-use plastics and improving recycling systems. Governments can also encourage companies to use sustainable packaging. In daily life, people can carry reusable bottles and bags.",
      say:
        "The most effective ways include reducing single-use plastics and improving recycling systems. Governments can also encourage companies to use sustainable packaging. In daily life, people can carry reusable bottles and bags.",
      difficulty: "medium",
      explanation: "Give solutions at individual and policy levels.",
      targets: ["Individual + policy"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-env-02",
      type: "prompt",
      section: "part3",
      topicId: "environment",
      question: "Should companies be responsible for environmental damage? Why?",
      model:
        "Yes, because companies often produce large amounts of waste and emissions. If they are responsible, they have an incentive to change their processes. However, governments must enforce rules to make responsibility meaningful.",
      say:
        "Yes, because companies often produce large amounts of waste and emissions. If they are responsible, they have an incentive to change their processes. However, governments must enforce rules to make responsibility meaningful.",
      difficulty: "hard",
      explanation: "Explain responsibility and enforcement.",
      targets: ["Reason", "Condition"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-env-03",
      type: "prompt",
      section: "part3",
      topicId: "environment",
      question: "How can cities become greener without hurting daily life?",
      model:
        "Cities can become greener by improving public transport and creating more parks. They can also plant trees and design shaded streets to reduce heat. Planning is important so changes stay convenient for residents.",
      say:
        "Cities can become greener by improving public transport and creating more parks. They can also plant trees and design shaded streets to reduce heat. Planning is important so changes stay convenient for residents.",
      difficulty: "medium",
      explanation: "Give 2–3 city solutions and a planning note.",
      targets: ["Solutions", "Planning"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-env-04",
      type: "prompt",
      section: "part3",
      topicId: "environment",
      question: "Do small actions by individuals really matter for the environment?",
      model:
        "Small actions matter because millions of people doing them can create big change. However, large industries also have a major impact, so individual action should be combined with policy and corporate responsibility.",
      say:
        "Small actions matter because millions of people doing them can create big change. However, large industries also have a major impact, so individual action should be combined with policy and corporate responsibility.",
      difficulty: "hard",
      explanation: "Balance individual and systemic change.",
      targets: ["Balance", "Conclusion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-env-05",
      type: "prompt",
      section: "part3",
      topicId: "environment",
      question: "What role should schools play in environmental education?",
      model:
        "Schools should teach environmental awareness because habits form early. They can also run practical projects like recycling programs or clean-up events. This makes the topic real instead of only theoretical.",
      say:
        "Schools should teach environmental awareness because habits form early. They can also run practical projects like recycling programs or clean-up events. This makes the topic real instead of only theoretical.",
      difficulty: "medium",
      explanation: "Mention knowledge + practical actions.",
      targets: ["Knowledge", "Actions"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-env-06",
      type: "prompt",
      section: "part3",
      topicId: "environment",
      question: "Is it better to focus on renewable energy or reducing consumption?",
      model:
        "Both are important. Renewable energy reduces emissions, while reducing consumption lowers overall demand and waste. A smart approach would combine cleaner energy with more efficient lifestyles.",
      say:
        "Both are important. Renewable energy reduces emissions, while reducing consumption lowers overall demand and waste. A smart approach would combine cleaner energy with more efficient lifestyles.",
      difficulty: "hard",
      explanation: "Compare and propose a combined strategy.",
      targets: ["Comparison", "Combined strategy"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-env-07",
      type: "prompt",
      section: "part3",
      topicId: "environment",
      question: "What environmental problems do you notice in your local area?",
      model:
        "In my local area, I notice more traffic pollution and litter in some places. These problems can affect health and make the city less attractive. Better public awareness and stronger rules could help.",
      say:
        "In my local area, I notice more traffic pollution and litter in some places. These problems can affect health and make the city less attractive. Better public awareness and stronger rules could help.",
      difficulty: "medium",
      explanation: "Mention a problem, impact, and solution.",
      targets: ["Problem", "Impact", "Solution"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-env-08",
      type: "prompt",
      section: "part3",
      topicId: "environment",
      question: "Do you think climate anxiety is becoming more common? Why?",
      model:
        "Yes, because people see more news about extreme weather and long-term risks. When problems feel large, it can create stress. However, education and action can help people feel more in control.",
      say:
        "Yes, because people see more news about extreme weather and long-term risks. When problems feel large, it can create stress. However, education and action can help people feel more in control.",
      difficulty: "hard",
      explanation: "Explain causes and one positive response.",
      targets: ["Cause", "Response"],
      rubric: RUBRIC_P3
    },

    // Work
    {
      id: "p3-work-01",
      type: "prompt",
      section: "part3",
      topicId: "work",
      question: "What skills will be most important for jobs in the future?",
      model:
        "In the future, problem-solving and communication will remain important. People will also need digital skills and the ability to learn quickly. Adaptability matters because industries change fast.",
      say:
        "In the future, problem-solving and communication will remain important. People will also need digital skills and the ability to learn quickly. Adaptability matters because industries change fast.",
      difficulty: "medium",
      explanation: "Give 3 skills and a reason for one of them.",
      targets: ["3 skills", "Reason"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-work-02",
      type: "prompt",
      section: "part3",
      topicId: "work",
      question: "Do you think remote work is good for society? Why/why not?",
      model:
        "Remote work can be good because it saves commuting time and offers flexibility. However, it can reduce teamwork and social connection. A hybrid model may be best for many jobs.",
      say:
        "Remote work can be good because it saves commuting time and offers flexibility. However, it can reduce teamwork and social connection. A hybrid model may be best for many jobs.",
      difficulty: "hard",
      explanation: "Give pros/cons and a balanced conclusion.",
      targets: ["Pros/cons", "Conclusion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-work-03",
      type: "prompt",
      section: "part3",
      topicId: "work",
      question: "Should young people change jobs often or stay loyal to one company?",
      model:
        "Changing jobs can help people gain experience and higher salaries. However, staying loyal can build deep expertise and trust. It depends on career goals and opportunities available.",
      say:
        "Changing jobs can help people gain experience and higher salaries. However, staying loyal can build deep expertise and trust. It depends on career goals and opportunities available.",
      difficulty: "hard",
      explanation: "Discuss both and say ‘it depends’ with criteria.",
      targets: ["Both sides", "Criteria"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-work-04",
      type: "prompt",
      section: "part3",
      topicId: "work",
      question: "How can schools prepare students for the workplace?",
      model:
        "Schools can teach communication, teamwork, and time management through projects. They can also offer internships or career talks. Practical experience helps students understand real expectations.",
      say:
        "Schools can teach communication, teamwork, and time management through projects. They can also offer internships or career talks. Practical experience helps students understand real expectations.",
      difficulty: "medium",
      explanation: "Give 2–3 practical methods.",
      targets: ["Practical methods"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-work-05",
      type: "prompt",
      section: "part3",
      topicId: "work",
      question: "Is work-life balance more important now than in the past?",
      model:
        "It seems more important now because people face constant connectivity and higher stress. In the past, work and personal life were more separated for many jobs. Today, balance helps protect mental health and productivity.",
      say:
        "It seems more important now because people face constant connectivity and higher stress. In the past, work and personal life were more separated for many jobs. Today, balance helps protect mental health and productivity.",
      difficulty: "hard",
      explanation: "Compare past and present, then give reasons.",
      targets: ["Past vs present", "Reasons"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-work-06",
      type: "prompt",
      section: "part3",
      topicId: "work",
      question: "Do you think salaries should be equal for all jobs? Why/why not?",
      model:
        "No, because different jobs require different skills, training, and responsibility. However, salaries should still be fair and allow people to live with dignity. Minimum wage and worker protections can help.",
      say:
        "No, because different jobs require different skills, training, and responsibility. However, salaries should still be fair and allow people to live with dignity. Minimum wage and worker protections can help.",
      difficulty: "hard",
      explanation: "Explain why differences exist, then mention fairness.",
      targets: ["Explanation", "Fairness"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-work-07",
      type: "prompt",
      section: "part3",
      topicId: "work",
      question: "What are the benefits of doing volunteer work for teenagers?",
      model:
        "Volunteer work helps teenagers build empathy and social skills. It can also improve their CV and give them real-world experience. For example, working in a community project teaches teamwork and responsibility.",
      say:
        "Volunteer work helps teenagers build empathy and social skills. It can also improve their CV and give them real-world experience. For example, working in a community project teaches teamwork and responsibility.",
      difficulty: "medium",
      explanation: "Give benefits and one example.",
      targets: ["Benefits", "Example"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-work-08",
      type: "prompt",
      section: "part3",
      topicId: "work",
      question: "How might automation affect future employment?",
      model:
        "Automation may replace some routine jobs, which can be challenging for workers. However, it can also create new jobs that require new skills. Society may need retraining programs to help people adapt.",
      say:
        "Automation may replace some routine jobs, which can be challenging for workers. However, it can also create new jobs that require new skills. Society may need retraining programs to help people adapt.",
      difficulty: "hard",
      explanation: "Mention risks, opportunities, and a solution.",
      targets: ["Risks", "Opportunities", "Solution"],
      rubric: RUBRIC_P3
    }
  ];

  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
