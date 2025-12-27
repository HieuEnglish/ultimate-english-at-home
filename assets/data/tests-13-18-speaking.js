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
    ,

    // -------------------------
    // PART 1 (INTERVIEW) — additional prompts
    // -------------------------
    {
      id: "p1-25",
      type: "prompt",
      section: "part1",
      question: "How do you usually celebrate your birthday?",
      model: "I usually celebrate my birthday with my family, and we have a simple meal together. Sometimes my friends send messages or we meet for dessert. I like it because it feels relaxed and personal.",
      say: "I usually celebrate my birthday with my family, and we have a simple meal together. Sometimes my friends send messages or we meet for dessert. I like it because it feels relaxed and personal.",
      difficulty: "easy",
      explanation: "Describe what you do and add one reason you enjoy it.",
      targets: ["2–4 sentences", "Reason"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-26",
      type: "prompt",
      section: "part1",
      question: "What local food would you recommend to a visitor? Why?",
      model: "I would recommend a popular local noodle dish because it is tasty and not too expensive. It also shows local flavours and ingredients. Visitors can try it at small restaurants to get the best experience.",
      say: "I would recommend a popular local noodle dish because it is tasty and not too expensive. It also shows local flavours and ingredients. Visitors can try it at small restaurants to get the best experience.",
      difficulty: "medium",
      explanation: "Name one food, explain why, and add a practical detail.",
      targets: ["Recommendation", "Reason + detail"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-27",
      type: "prompt",
      section: "part1",
      question: "Do you prefer group activities or doing things alone? Why?",
      model: "I prefer group activities because I feel more motivated when I share goals with others. For example, studying with a friend helps me stay focused. However, I still enjoy doing some hobbies alone when I need quiet time.",
      say: "I prefer group activities because I feel more motivated when I share goals with others. For example, studying with a friend helps me stay focused. However, I still enjoy doing some hobbies alone when I need quiet time.",
      difficulty: "medium",
      explanation: "Give your preference, a reason, and one contrast using 'however'.",
      targets: ["Because", "However", "Example"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-28",
      type: "prompt",
      section: "part1",
      question: "Is there a school subject you find difficult? What do you do about it?",
      model: "I find mathematics difficult sometimes because the problems can be complex and I make small mistakes. To improve, I practise a little every day and review my errors carefully. If I still don’t understand, I ask my teacher or a friend for help.",
      say: "I find mathematics difficult sometimes because the problems can be complex and I make small mistakes. To improve, I practise a little every day and review my errors carefully. If I still don’t understand, I ask my teacher or a friend for help.",
      difficulty: "hard",
      explanation: "Describe the difficulty and give 2 strategies you use.",
      targets: ["Challenge", "2 strategies"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-29",
      type: "prompt",
      section: "part1",
      question: "How do you stay healthy during a busy week?",
      model: "During busy weeks, I try to sleep enough and drink plenty of water. I also do short exercise, like stretching or a quick walk, because it helps my energy. If I plan my meals, it is easier to avoid unhealthy snacks.",
      say: "During busy weeks, I try to sleep enough and drink plenty of water. I also do short exercise, like stretching or a quick walk, because it helps my energy. If I plan my meals, it is easier to avoid unhealthy snacks.",
      difficulty: "medium",
      explanation: "Give 2–3 habits and one short example.",
      targets: ["2–3 habits", "Example"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-30",
      type: "prompt",
      section: "part1",
      question: "Do you enjoy art or creative activities? Why/why not?",
      model: "Yes, I enjoy creative activities because they help me relax and express ideas. For example, I like simple drawing or design tasks when I have free time. Even if I’m not perfect, the process feels satisfying.",
      say: "Yes, I enjoy creative activities because they help me relax and express ideas. For example, I like simple drawing or design tasks when I have free time. Even if I’m not perfect, the process feels satisfying.",
      difficulty: "easy",
      explanation: "Give your view, a reason, and one example activity.",
      targets: ["Reason", "Example"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-31",
      type: "prompt",
      section: "part1",
      question: "How often do you use public transport? What do you think of it?",
      model: "I use public transport several times a week because it is convenient and cheaper than taxis. In general, it is reliable, but it can be crowded at rush hour. I think it would be better if the schedule was more frequent.",
      say: "I use public transport several times a week because it is convenient and cheaper than taxis. In general, it is reliable, but it can be crowded at rush hour. I think it would be better if the schedule was more frequent.",
      difficulty: "hard",
      explanation: "Give frequency, one positive point, one negative point, and a suggestion.",
      targets: ["Frequency", "Pros/cons", "Suggestion"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-32",
      type: "prompt",
      section: "part1",
      question: "What do you like to do on weekends?",
      model: "On weekends, I usually catch up on rest and spend time with friends or family. If I have homework, I try to finish it early so I can relax later. Sometimes I also go for a walk to clear my mind.",
      say: "On weekends, I usually catch up on rest and spend time with friends or family. If I have homework, I try to finish it early so I can relax later. Sometimes I also go for a walk to clear my mind.",
      difficulty: "easy",
      explanation: "Use 'usually' and add one extra detail.",
      targets: ["Routine language", "Extra detail"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-33",
      type: "prompt",
      section: "part1",
      question: "What is a small goal you have for the next month?",
      model: "A small goal I have is to improve my time management. I want to start assignments earlier so I don’t rush at the last minute. To do that, I will make a simple weekly plan and follow it.",
      say: "A small goal I have is to improve my time management. I want to start assignments earlier so I don’t rush at the last minute. To do that, I will make a simple weekly plan and follow it.",
      difficulty: "medium",
      explanation: "State the goal, explain why, and add a clear plan.",
      targets: ["Goal", "Reason", "Plan"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-34",
      type: "prompt",
      section: "part1",
      question: "Do you enjoy learning about history? Why/why not?",
      model: "I enjoy history because it helps me understand how societies change over time. It also explains why certain traditions and rules exist today. If the lessons include stories and real examples, it becomes much more interesting.",
      say: "I enjoy history because it helps me understand how societies change over time. It also explains why certain traditions and rules exist today. If the lessons include stories and real examples, it becomes much more interesting.",
      difficulty: "medium",
      explanation: "Give your view and 1–2 reasons. Add a condition if possible.",
      targets: ["Opinion", "Reasons", "Condition"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-35",
      type: "prompt",
      section: "part1",
      question: "What do you do to save money?",
      model: "To save money, I try to track my spending and avoid buying things impulsively. For example, I compare prices online and wait a day before deciding. I also set a small weekly budget for snacks and entertainment.",
      say: "To save money, I try to track my spending and avoid buying things impulsively. For example, I compare prices online and wait a day before deciding. I also set a small weekly budget for snacks and entertainment.",
      difficulty: "hard",
      explanation: "Give 2 strategies and one concrete example.",
      targets: ["2 strategies", "Example"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-36",
      type: "prompt",
      section: "part1",
      question: "Do you prefer sending messages or making phone calls? Why?",
      model: "I prefer sending messages because it is quick and I can reply when I’m free. Phone calls are useful for urgent problems, but they can interrupt people. So I choose messages for most situations.",
      say: "I prefer sending messages because it is quick and I can reply when I’m free. Phone calls are useful for urgent problems, but they can interrupt people. So I choose messages for most situations.",
      difficulty: "medium",
      explanation: "Give a preference, a reason, and one exception.",
      targets: ["Preference", "Reason", "Exception"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-37",
      type: "prompt",
      section: "part1",
      question: "What is your favourite festival or holiday? Why do you like it?",
      model: "My favourite holiday is the new year celebration because it brings families together. I like it because the atmosphere feels hopeful and people share good wishes. It’s also a chance to rest and set new goals.",
      say: "My favourite holiday is the new year celebration because it brings families together. I like it because the atmosphere feels hopeful and people share good wishes. It’s also a chance to rest and set new goals.",
      difficulty: "easy",
      explanation: "Name the festival/holiday and give 2 reasons.",
      targets: ["2 reasons", "Personal detail"],
      rubric: RUBRIC_P1
    },
    {
      id: "p1-38",
      type: "prompt",
      section: "part1",
      question: "Do you think your city is a good place for young people? Why/why not?",
      model: "I think it is mostly a good place for young people because there are many schools, cafés, and activities. However, it can be expensive, and traffic can be stressful. If the city improved public spaces and transport, it would be even better.",
      say: "I think it is mostly a good place for young people because there are many schools, cafés, and activities. However, it can be expensive, and traffic can be stressful. If the city improved public spaces and transport, it would be even better.",
      difficulty: "hard",
      explanation: "Give a balanced view with 1 advantage, 1 disadvantage, and one suggestion.",
      targets: ["Balanced view", "Suggestion"],
      rubric: RUBRIC_P1
    },

    // -------------------------
    // PART 2 (CUE CARD) — new topics
    // -------------------------
    {
      id: "p2-health-01",
      type: "prompt",
      section: "part2",
      topicId: "health",
      question: "Describe a healthy habit you have developed.",
      cue: ["What the habit is", "When you started it", "Why you decided to do it", "What results you have noticed"],
      model:
        "A healthy habit I have developed is going for a short walk every day. I started it a few months ago when I realised I was sitting for too long. I decided to do it because it is simple, free, and it improves my mood. Usually I walk for about twenty minutes after dinner, and I try to leave my phone in my pocket. At first it felt boring, but I began to notice small benefits quickly. For example, I sleep more easily and my mind feels clearer when I study. It also gives me time to think about my day and reduce stress. Overall, it is an easy habit that has a surprisingly positive effect.",
      say:
        "A healthy habit I have developed is going for a short walk every day. I started it a few months ago when I realised I was sitting for too long. I decided to do it because it is simple, free, and it improves my mood. Usually I walk for about twenty minutes after dinner, and I try to leave my phone in my pocket. At first it felt boring, but I began to notice small benefits quickly. For example, I sleep more easily and my mind feels clearer when I study. It also gives me time to think about my day and reduce stress. Overall, it is an easy habit that has a surprisingly positive effect.",
      difficulty: "medium",
      explanation: "Speak for 1–2 minutes: explain the habit, your reasons, and the results.",
      targets: ["8+ sentences", "Reasons + results"],
      rubric: RUBRIC_P2
    },
    {
      id: "p2-culture-01",
      type: "prompt",
      section: "part2",
      topicId: "culture",
      question: "Describe a cultural event you attended or would like to attend.",
      cue: ["What the event is", "Where and when it happens", "What people do there", "Why it is meaningful"],
      model:
        "A cultural event I would like to attend is a traditional lantern festival. It usually happens in the evening in a historic area where the streets are decorated with colourful lights. People walk around, take photos, and buy local snacks while listening to music. I would like to go because it feels different from everyday life and it shows local traditions in a beautiful way. Another reason is that it brings the community together, including families and tourists. I think events like this help people feel proud of their culture. They also support small businesses because many local shops get more customers. If I had the chance, I would go with friends so we could explore and learn more about the history behind it.",
      say:
        "A cultural event I would like to attend is a traditional lantern festival. It usually happens in the evening in a historic area where the streets are decorated with colourful lights. People walk around, take photos, and buy local snacks while listening to music. I would like to go because it feels different from everyday life and it shows local traditions in a beautiful way. Another reason is that it brings the community together, including families and tourists. I think events like this help people feel proud of their culture. They also support small businesses because many local shops get more customers. If I had the chance, I would go with friends so we could explore and learn more about the history behind it.",
      difficulty: "medium",
      explanation: "Describe the event clearly and explain why it matters to people.",
      targets: ["8+ sentences", "Description + meaning"],
      rubric: RUBRIC_P2
    },
    {
      id: "p2-transport-01",
      type: "prompt",
      section: "part2",
      topicId: "transport",
      question: "Describe a memorable journey you have taken.",
      cue: ["Where you went", "How you travelled", "What happened during the trip", "Why you remember it"],
      model:
        "A memorable journey I took was a weekend trip to a coastal town with my family. We travelled by train, which was comfortable and gave us a nice view of the countryside. During the trip, we talked, listened to music, and planned what we would do when we arrived. When we reached the town, the weather was sunny and the sea looked amazing. We tried local seafood and walked along the beach in the late afternoon. What I remember most is the feeling of freedom because the schedule was relaxed and we were not rushing. I also enjoyed the train ride because it felt safer and less stressful than driving in traffic. Overall, it was memorable because it combined a pleasant journey with quality time together.",
      say:
        "A memorable journey I took was a weekend trip to a coastal town with my family. We travelled by train, which was comfortable and gave us a nice view of the countryside. During the trip, we talked, listened to music, and planned what we would do when we arrived. When we reached the town, the weather was sunny and the sea looked amazing. We tried local seafood and walked along the beach in the late afternoon. What I remember most is the feeling of freedom because the schedule was relaxed and we were not rushing. I also enjoyed the train ride because it felt safer and less stressful than driving in traffic. Overall, it was memorable because it combined a pleasant journey with quality time together.",
      difficulty: "easy",
      explanation: "Tell the story in order and explain why it stayed in your memory.",
      targets: ["8+ sentences", "Sequencing", "Reason"],
      rubric: RUBRIC_P2
    },
    {
      id: "p2-community-01",
      type: "prompt",
      section: "part2",
      topicId: "community",
      question: "Describe a place in your community where people like to meet.",
      cue: ["What the place is", "Who goes there", "What people do there", "Why it is important"],
      model:
        "A place in my community where people like to meet is a small neighbourhood café. People of different ages go there, including students, office workers, and families. Some people meet friends to chat, while others study or work quietly on laptops. In the evenings, it becomes more social and you can hear conversations and laughter. I think it is important because it gives people a comfortable space outside home and school. It also helps the neighbourhood feel friendly because you often see familiar faces. In addition, local cafés support small businesses and create jobs. For me, it is a useful place to relax and feel connected to the community.",
      say:
        "A place in my community where people like to meet is a small neighbourhood café. People of different ages go there, including students, office workers, and families. Some people meet friends to chat, while others study or work quietly on laptops. In the evenings, it becomes more social and you can hear conversations and laughter. I think it is important because it gives people a comfortable space outside home and school. It also helps the neighbourhood feel friendly because you often see familiar faces. In addition, local cafés support small businesses and create jobs. For me, it is a useful place to relax and feel connected to the community.",
      difficulty: "hard",
      explanation: "Describe the place, then explain why it matters to the community.",
      targets: ["8+ sentences", "Description + importance"],
      rubric: RUBRIC_P2
    },

    // -------------------------
    // PART 3 (DISCUSSION) — new topicId groups
    // -------------------------
    // Health
    {
      id: "p3-health-01",
      type: "prompt",
      section: "part3",
      topicId: "health",
      question: "Why do some teenagers find it difficult to maintain a healthy lifestyle?",
      model:
        "Many teenagers find it difficult because they have busy schedules with school, homework, and activities. In addition, fast food is cheap and convenient, so it is an easy choice. Another factor is sleep, because screens and stress can reduce rest. To be healthier, teenagers often need better routines and support from family and schools.",
      say:
        "Many teenagers find it difficult because they have busy schedules with school, homework, and activities. In addition, fast food is cheap and convenient, so it is an easy choice. Another factor is sleep, because screens and stress can reduce rest. To be healthier, teenagers often need better routines and support from family and schools.",
      difficulty: "medium",
      explanation: "Give several causes and suggest one improvement.",
      targets: ["Causes", "Suggestion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-health-02",
      type: "prompt",
      section: "part3",
      topicId: "health",
      question: "Do you think schools should provide more health education? Why?",
      model:
        "Yes, because health education helps students make informed decisions about food, exercise, and mental wellbeing. For example, students could learn how to read nutrition labels and manage stress. However, schools should keep it practical and age-appropriate. If students understand the reasons behind healthy habits, they are more likely to follow them.",
      say:
        "Yes, because health education helps students make informed decisions about food, exercise, and mental wellbeing. For example, students could learn how to read nutrition labels and manage stress. However, schools should keep it practical and age-appropriate. If students understand the reasons behind healthy habits, they are more likely to follow them.",
      difficulty: "hard",
      explanation: "Give reasons, an example, and one condition.",
      targets: ["Reason", "Example", "Condition"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-health-03",
      type: "prompt",
      section: "part3",
      topicId: "health",
      question: "How important is sleep compared to diet and exercise?",
      model:
        "Sleep is extremely important because it affects mood, memory, and concentration. Even if someone eats well and exercises, lack of sleep can reduce performance and increase stress. Diet and exercise are still essential, but sleep often supports both because it helps the body recover. In my view, the best approach is balance, but teenagers especially need enough sleep.",
      say:
        "Sleep is extremely important because it affects mood, memory, and concentration. Even if someone eats well and exercises, lack of sleep can reduce performance and increase stress. Diet and exercise are still essential, but sleep often supports both because it helps the body recover. In my view, the best approach is balance, but teenagers especially need enough sleep.",
      difficulty: "hard",
      explanation: "Compare the three factors and give your view.",
      targets: ["Comparison", "Opinion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-health-04",
      type: "prompt",
      section: "part3",
      topicId: "health",
      question: "What can families do to encourage healthier eating at home?",
      model:
        "Families can encourage healthier eating by planning simple meals and keeping healthy snacks available. Cooking together can also teach teenagers useful skills and make them more interested in food. Another step is limiting sugary drinks at home. Of course, it is important not to be too strict, but consistent habits can make a big difference.",
      say:
        "Families can encourage healthier eating by planning simple meals and keeping healthy snacks available. Cooking together can also teach teenagers useful skills and make them more interested in food. Another step is limiting sugary drinks at home. Of course, it is important not to be too strict, but consistent habits can make a big difference.",
      difficulty: "medium",
      explanation: "Give 2–3 actions and a balanced comment.",
      targets: ["Actions", "Balance"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-health-05",
      type: "prompt",
      section: "part3",
      topicId: "health",
      question: "How can people manage stress more effectively?",
      model:
        "People can manage stress by organising tasks and setting realistic goals, so problems feel more controllable. Exercise and sleep also help because they improve mood and energy. In addition, talking to someone you trust can reduce pressure. If stress becomes serious, professional support is important because long-term stress can affect health.",
      say:
        "People can manage stress by organising tasks and setting realistic goals, so problems feel more controllable. Exercise and sleep also help because they improve mood and energy. In addition, talking to someone you trust can reduce pressure. If stress becomes serious, professional support is important because long-term stress can affect health.",
      difficulty: "hard",
      explanation: "Give strategies and mention when extra support is needed.",
      targets: ["Strategies", "Support"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-health-06",
      type: "prompt",
      section: "part3",
      topicId: "health",
      question: "Should governments regulate advertising for unhealthy food aimed at young people?",
      model:
        "Some regulation makes sense because advertising can influence young people’s choices, especially when it uses attractive images and celebrity marketing. If the goal is public health, governments can limit ads during children’s programs or require clear warnings. However, companies will argue about freedom and profit, so rules need to be fair and realistic. In my opinion, protecting young consumers is more important than allowing unlimited marketing.",
      say:
        "Some regulation makes sense because advertising can influence young people’s choices, especially when it uses attractive images and celebrity marketing. If the goal is public health, governments can limit ads during children’s programs or require clear warnings. However, companies will argue about freedom and profit, so rules need to be fair and realistic. In my opinion, protecting young consumers is more important than allowing unlimited marketing.",
      difficulty: "hard",
      explanation: "Discuss both sides and give a clear opinion.",
      targets: ["Both sides", "Opinion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-health-07",
      type: "prompt",
      section: "part3",
      topicId: "health",
      question: "What is the best way to encourage teenagers to exercise more?",
      model:
        "The best way is to make exercise enjoyable and social, rather than forcing it. For example, team sports, dance classes, or walking with friends can feel fun. Schools can also offer more choices instead of only one sport. When teenagers find an activity they like, they are more likely to continue.",
      say:
        "The best way is to make exercise enjoyable and social, rather than forcing it. For example, team sports, dance classes, or walking with friends can feel fun. Schools can also offer more choices instead of only one sport. When teenagers find an activity they like, they are more likely to continue.",
      difficulty: "medium",
      explanation: "Give an approach, examples, and a reason it works.",
      targets: ["Approach", "Examples", "Reason"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-health-08",
      type: "prompt",
      section: "part3",
      topicId: "health",
      question: "How might technology both help and harm people’s health?",
      model:
        "Technology can help health through fitness trackers, online medical advice, and educational content. For example, an app can remind people to drink water or move regularly. However, it can also harm health by increasing screen time and reducing sleep. In addition, too much online information can cause worry. So the benefits are real, but people need good habits and limits.",
      say:
        "Technology can help health through fitness trackers, online medical advice, and educational content. For example, an app can remind people to drink water or move regularly. However, it can also harm health by increasing screen time and reducing sleep. In addition, too much online information can cause worry. So the benefits are real, but people need good habits and limits.",
      difficulty: "hard",
      explanation: "Give benefits and drawbacks with an example, then conclude.",
      targets: ["Pros/cons", "Example", "Conclusion"],
      rubric: RUBRIC_P3
    },

    // Culture
    {
      id: "p3-culture-01",
      type: "prompt",
      section: "part3",
      topicId: "culture",
      question: "Why is it important to preserve traditional culture?",
      model:
        "Preserving traditional culture is important because it gives people a sense of identity and history. It also helps communities feel connected across generations. For example, traditional music or festivals can teach values and stories. Without preservation, culture can become weaker and people may feel less connected to their roots.",
      say:
        "Preserving traditional culture is important because it gives people a sense of identity and history. It also helps communities feel connected across generations. For example, traditional music or festivals can teach values and stories. Without preservation, culture can become weaker and people may feel less connected to their roots.",
      difficulty: "medium",
      explanation: "Explain importance and give one example.",
      targets: ["Reasons", "Example"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-culture-02",
      type: "prompt",
      section: "part3",
      topicId: "culture",
      question: "How does globalisation influence local culture?",
      model:
        "Globalisation influences local culture by spreading international music, fashion, and food quickly. This can be positive because people learn from each other and have more choices. However, it can also reduce local traditions if young people only follow global trends. A balanced approach is to enjoy global culture while still protecting local languages and customs.",
      say:
        "Globalisation influences local culture by spreading international music, fashion, and food quickly. This can be positive because people learn from each other and have more choices. However, it can also reduce local traditions if young people only follow global trends. A balanced approach is to enjoy global culture while still protecting local languages and customs.",
      difficulty: "hard",
      explanation: "Discuss positives and negatives and propose balance.",
      targets: ["Pros/cons", "Balanced view"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-culture-03",
      type: "prompt",
      section: "part3",
      topicId: "culture",
      question: "Do you think young people are less interested in traditional events than in the past?",
      model:
        "In some cases, yes, because young people have many modern entertainment options and busy schedules. Social media also changes how they spend free time. However, if traditional events are presented in an engaging way, young people can still enjoy them. For example, festivals that include interactive activities and modern elements often attract more teenagers.",
      say:
        "In some cases, yes, because young people have many modern entertainment options and busy schedules. Social media also changes how they spend free time. However, if traditional events are presented in an engaging way, young people can still enjoy them. For example, festivals that include interactive activities and modern elements often attract more teenagers.",
      difficulty: "hard",
      explanation: "Give a trend, reasons, and one solution.",
      targets: ["Trend", "Reasons", "Solution"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-culture-04",
      type: "prompt",
      section: "part3",
      topicId: "culture",
      question: "What can schools do to help students understand culture better?",
      model:
        "Schools can help by including cultural topics in language and history classes. They can also organise events such as cultural days, performances, or museum visits. Another idea is project work where students research traditions and present them. Practical experiences make culture easier to understand than only reading about it.",
      say:
        "Schools can help by including cultural topics in language and history classes. They can also organise events such as cultural days, performances, or museum visits. Another idea is project work where students research traditions and present them. Practical experiences make culture easier to understand than only reading about it.",
      difficulty: "medium",
      explanation: "Provide 2–3 actions and explain why they help.",
      targets: ["Actions", "Reason"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-culture-05",
      type: "prompt",
      section: "part3",
      topicId: "culture",
      question: "Are museums still important in the modern world? Why/why not?",
      model:
        "Museums are still important because they protect historical objects and teach people about the past. They also offer experiences that online information cannot fully replace, such as seeing real artefacts. However, museums need to be interactive and accessible to attract young visitors. If they use technology and good storytelling, they can stay relevant.",
      say:
        "Museums are still important because they protect historical objects and teach people about the past. They also offer experiences that online information cannot fully replace, such as seeing real artefacts. However, museums need to be interactive and accessible to attract young visitors. If they use technology and good storytelling, they can stay relevant.",
      difficulty: "medium",
      explanation: "Give reasons and one suggestion for improvement.",
      targets: ["Reasons", "Suggestion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-culture-06",
      type: "prompt",
      section: "part3",
      topicId: "culture",
      question: "How can social media change the way culture is shared?",
      model:
        "Social media can share culture quickly because people post videos of festivals, food, and daily life. This can increase interest and tourism. However, it can also create a shallow image if people only show the most attractive parts. To share culture responsibly, creators should add context and respect traditions rather than only chasing views.",
      say:
        "Social media can share culture quickly because people post videos of festivals, food, and daily life. This can increase interest and tourism. However, it can also create a shallow image if people only show the most attractive parts. To share culture responsibly, creators should add context and respect traditions rather than only chasing views.",
      difficulty: "hard",
      explanation: "Mention benefits, risks, and responsible behaviour.",
      targets: ["Benefits", "Risks", "Advice"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-culture-07",
      type: "prompt",
      section: "part3",
      topicId: "culture",
      question: "Should governments spend public money on arts and culture?",
      model:
        "Governments should spend some public money on arts and culture because it improves quality of life and protects national identity. Cultural events can also bring economic benefits through tourism. However, budgets are limited, so spending should be balanced with essential services like healthcare and education. In my opinion, moderate funding with clear goals is reasonable.",
      say:
        "Governments should spend some public money on arts and culture because it improves quality of life and protects national identity. Cultural events can also bring economic benefits through tourism. However, budgets are limited, so spending should be balanced with essential services like healthcare and education. In my opinion, moderate funding with clear goals is reasonable.",
      difficulty: "hard",
      explanation: "Discuss benefits, limits, and give an opinion.",
      targets: ["Benefits", "Limits", "Opinion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-culture-08",
      type: "prompt",
      section: "part3",
      topicId: "culture",
      question: "How can people avoid cultural stereotypes when meeting foreigners?",
      model:
        "People can avoid stereotypes by treating individuals as unique instead of assuming they are the same as a group. Asking respectful questions and listening carefully can help. It is also useful to learn basic facts, but we should stay open-minded. When people travel or study abroad, real conversations usually break stereotypes quickly.",
      say:
        "People can avoid stereotypes by treating individuals as unique instead of assuming they are the same as a group. Asking respectful questions and listening carefully can help. It is also useful to learn basic facts, but we should stay open-minded. When people travel or study abroad, real conversations usually break stereotypes quickly.",
      difficulty: "medium",
      explanation: "Give strategies and one real-life example.",
      targets: ["Strategies", "Example"],
      rubric: RUBRIC_P3
    },

    // Transport
    {
      id: "p3-transport-01",
      type: "prompt",
      section: "part3",
      topicId: "transport",
      question: "Why do many people still prefer private cars in cities?",
      model:
        "Many people prefer private cars because they feel more comfortable and flexible. They can travel directly without waiting, and they can carry bags easily. In addition, some public transport systems are crowded or unreliable. However, car use creates congestion, so better public options could change behaviour.",
      say:
        "Many people prefer private cars because they feel more comfortable and flexible. They can travel directly without waiting, and they can carry bags easily. In addition, some public transport systems are crowded or unreliable. However, car use creates congestion, so better public options could change behaviour.",
      difficulty: "medium",
      explanation: "Give reasons and mention one consequence.",
      targets: ["Reasons", "Consequence"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-transport-02",
      type: "prompt",
      section: "part3",
      topicId: "transport",
      question: "What are the best ways to reduce traffic congestion?",
      model:
        "To reduce congestion, cities can improve public transport so it is fast, clean, and frequent. They can also encourage cycling by building safe lanes. Another method is pricing, such as charging cars to enter the city centre. A combination of these strategies is usually more effective than only one.",
      say:
        "To reduce congestion, cities can improve public transport so it is fast, clean, and frequent. They can also encourage cycling by building safe lanes. Another method is pricing, such as charging cars to enter the city centre. A combination of these strategies is usually more effective than only one.",
      difficulty: "hard",
      explanation: "Give 2–3 solutions and explain why a mix is best.",
      targets: ["Solutions", "Explanation"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-transport-03",
      type: "prompt",
      section: "part3",
      topicId: "transport",
      question: "Do you think cycling should be encouraged more in cities? Why?",
      model:
        "Yes, because cycling reduces pollution and can improve public health. It can also save space compared to cars. However, it is only realistic if the city provides safe cycle lanes and good road design. Without safety, many people will not feel confident to cycle.",
      say:
        "Yes, because cycling reduces pollution and can improve public health. It can also save space compared to cars. However, it is only realistic if the city provides safe cycle lanes and good road design. Without safety, many people will not feel confident to cycle.",
      difficulty: "medium",
      explanation: "Give reasons and one condition.",
      targets: ["Reasons", "Condition"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-transport-04",
      type: "prompt",
      section: "part3",
      topicId: "transport",
      question: "How might electric vehicles change transport in the future?",
      model:
        "Electric vehicles could reduce air pollution in cities because they produce fewer emissions while driving. They may also reduce noise, which improves quality of life. However, the benefits depend on how electricity is produced and whether charging stations are available. Over time, costs may fall and EVs may become more common.",
      say:
        "Electric vehicles could reduce air pollution in cities because they produce fewer emissions while driving. They may also reduce noise, which improves quality of life. However, the benefits depend on how electricity is produced and whether charging stations are available. Over time, costs may fall and EVs may become more common.",
      difficulty: "hard",
      explanation: "Mention advantages and limitations.",
      targets: ["Advantages", "Limitations"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-transport-05",
      type: "prompt",
      section: "part3",
      topicId: "transport",
      question: "Should city centres have more car-free zones?",
      model:
        "Car-free zones can be very positive because they reduce pollution and make streets safer for walking. They also create more space for cafés, parks, and community events. However, some businesses worry about deliveries and access for older people. A good plan would include public transport, delivery times, and disabled access.",
      say:
        "Car-free zones can be very positive because they reduce pollution and make streets safer for walking. They also create more space for cafés, parks, and community events. However, some businesses worry about deliveries and access for older people. A good plan would include public transport, delivery times, and disabled access.",
      difficulty: "hard",
      explanation: "Discuss pros/cons and suggest practical solutions.",
      targets: ["Pros/cons", "Solutions"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-transport-06",
      type: "prompt",
      section: "part3",
      topicId: "transport",
      question: "How does transport affect people’s opportunities in life?",
      model:
        "Transport affects opportunities because it determines how easily people can reach schools, jobs, and services. If transport is cheap and reliable, people have more choices and can save time. On the other hand, poor transport can limit education and work options, especially for low-income communities. So transport is not only about travel, but also about equality.",
      say:
        "Transport affects opportunities because it determines how easily people can reach schools, jobs, and services. If transport is cheap and reliable, people have more choices and can save time. On the other hand, poor transport can limit education and work options, especially for low-income communities. So transport is not only about travel, but also about equality.",
      difficulty: "hard",
      explanation: "Explain cause-and-effect and include a fairness point.",
      targets: ["Cause/effect", "Fairness"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-transport-07",
      type: "prompt",
      section: "part3",
      topicId: "transport",
      question: "What problems can crowded public transport cause?",
      model:
        "Crowded public transport can cause discomfort and stress, especially during hot weather or long trips. It can also reduce safety and make delays worse when people cannot board easily. For students and workers, this can lead to tiredness and lateness. Improving frequency and management could reduce these problems.",
      say:
        "Crowded public transport can cause discomfort and stress, especially during hot weather or long trips. It can also reduce safety and make delays worse when people cannot board easily. For students and workers, this can lead to tiredness and lateness. Improving frequency and management could reduce these problems.",
      difficulty: "medium",
      explanation: "Mention problems, impact, and one improvement.",
      targets: ["Problems", "Impact", "Improvement"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-transport-08",
      type: "prompt",
      section: "part3",
      topicId: "transport",
      question: "How might remote work change transport patterns?",
      model:
        "Remote work could reduce commuting because fewer people need to travel every day. This may lower congestion and pollution during peak hours. However, people might still travel for meetings or choose to live further from city centres, which could create new patterns. Overall, remote work may make transport demand more flexible.",
      say:
        "Remote work could reduce commuting because fewer people need to travel every day. This may lower congestion and pollution during peak hours. However, people might still travel for meetings or choose to live further from city centres, which could create new patterns. Overall, remote work may make transport demand more flexible.",
      difficulty: "medium",
      explanation: "Make 2 points and include a possible drawback.",
      targets: ["2 points", "Possible drawback"],
      rubric: RUBRIC_P3
    },

    // Community
    {
      id: "p3-community-01",
      type: "prompt",
      section: "part3",
      topicId: "community",
      question: "Why are community spaces important in modern cities?",
      model:
        "Community spaces are important because they help people connect and reduce loneliness. They also provide safe areas for young people to study, exercise, or join activities. For example, libraries and parks can support learning and wellbeing. In crowded cities, shared spaces can improve social life and make neighbourhoods friendlier.",
      say:
        "Community spaces are important because they help people connect and reduce loneliness. They also provide safe areas for young people to study, exercise, or join activities. For example, libraries and parks can support learning and wellbeing. In crowded cities, shared spaces can improve social life and make neighbourhoods friendlier.",
      difficulty: "medium",
      explanation: "Explain benefits and give an example.",
      targets: ["Benefits", "Example"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-community-02",
      type: "prompt",
      section: "part3",
      topicId: "community",
      question: "How can young people contribute to their local community?",
      model:
        "Young people can contribute by volunteering, joining clean-up events, or helping older neighbours. They can also participate in clubs that organise community projects. In addition, young people can share ideas through school or local meetings. Even small actions, when done regularly, can improve the community.",
      say:
        "Young people can contribute by volunteering, joining clean-up events, or helping older neighbours. They can also participate in clubs that organise community projects. In addition, young people can share ideas through school or local meetings. Even small actions, when done regularly, can improve the community.",
      difficulty: "medium",
      explanation: "Give 2–3 examples and a concluding idea.",
      targets: ["Examples", "Conclusion"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-community-03",
      type: "prompt",
      section: "part3",
      topicId: "community",
      question: "What can local governments do to improve safety in neighbourhoods?",
      model:
        "Local governments can improve safety by improving lighting and maintaining public areas. They can also support community policing and quick reporting systems. Another approach is creating safe public spaces where people feel comfortable. When residents trust the system, they are more likely to cooperate and prevent problems.",
      say:
        "Local governments can improve safety by improving lighting and maintaining public areas. They can also support community policing and quick reporting systems. Another approach is creating safe public spaces where people feel comfortable. When residents trust the system, they are more likely to cooperate and prevent problems.",
      difficulty: "hard",
      explanation: "Give practical methods and explain why trust matters.",
      targets: ["Methods", "Explanation"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-community-04",
      type: "prompt",
      section: "part3",
      topicId: "community",
      question: "Do you think people are becoming more isolated today? Why?",
      model:
        "In some ways, yes, because many interactions happen online and people are busy with work and study. This can reduce face-to-face communication and weaken neighbourhood relationships. However, isolation is not unavoidable because communities can organise events and shared activities. If people make small efforts to connect, social life can improve.",
      say:
        "In some ways, yes, because many interactions happen online and people are busy with work and study. This can reduce face-to-face communication and weaken neighbourhood relationships. However, isolation is not unavoidable because communities can organise events and shared activities. If people make small efforts to connect, social life can improve.",
      difficulty: "hard",
      explanation: "Explain causes and give a solution.",
      targets: ["Causes", "Solution"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-community-05",
      type: "prompt",
      section: "part3",
      topicId: "community",
      question: "What kinds of community events are most beneficial?",
      model:
        "Events that bring different groups together are usually most beneficial, such as clean-up days, sports tournaments, or cultural festivals. These events build relationships and make people feel proud of their area. They can also support local businesses if shops and cafés participate. The most important thing is that events are inclusive and affordable.",
      say:
        "Events that bring different groups together are usually most beneficial, such as clean-up days, sports tournaments, or cultural festivals. These events build relationships and make people feel proud of their area. They can also support local businesses if shops and cafés participate. The most important thing is that events are inclusive and affordable.",
      difficulty: "medium",
      explanation: "Give examples and explain what makes them effective.",
      targets: ["Examples", "Effectiveness"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-community-06",
      type: "prompt",
      section: "part3",
      topicId: "community",
      question: "Should schools require students to do community service?",
      model:
        "Community service can be valuable because it teaches responsibility and empathy. If it is required, it ensures that all students experience it, not only those who already volunteer. However, forcing people can reduce motivation, so schools should offer choices and explain the purpose. In my opinion, a flexible requirement with options is a good compromise.",
      say:
        "Community service can be valuable because it teaches responsibility and empathy. If it is required, it ensures that all students experience it, not only those who already volunteer. However, forcing people can reduce motivation, so schools should offer choices and explain the purpose. In my opinion, a flexible requirement with options is a good compromise.",
      difficulty: "hard",
      explanation: "Discuss pros/cons and give a balanced recommendation.",
      targets: ["Pros/cons", "Recommendation"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-community-07",
      type: "prompt",
      section: "part3",
      topicId: "community",
      question: "How can communities support people during emergencies?",
      model:
        "Communities can support people by sharing information quickly and helping vulnerable residents, such as older people or families with small children. Local groups can organise supplies and safe shelters. Schools and community centres can also become support points. Clear communication and cooperation are essential because emergencies require fast action.",
      say:
        "Communities can support people by sharing information quickly and helping vulnerable residents, such as older people or families with small children. Local groups can organise supplies and safe shelters. Schools and community centres can also become support points. Clear communication and cooperation are essential because emergencies require fast action.",
      difficulty: "hard",
      explanation: "Give examples and explain the importance of coordination.",
      targets: ["Examples", "Coordination"],
      rubric: RUBRIC_P3
    },
    {
      id: "p3-community-08",
      type: "prompt",
      section: "part3",
      topicId: "community",
      question: "Are online communities as valuable as local communities?",
      model:
        "Online communities can be valuable because they connect people with similar interests across distance. They can provide support and information, especially for niche hobbies or learning. However, local communities are important for practical help and real-life connection. In my view, online communities are a useful addition, but they cannot fully replace local relationships.",
      say:
        "Online communities can be valuable because they connect people with similar interests across distance. They can provide support and information, especially for niche hobbies or learning. However, local communities are important for practical help and real-life connection. In my view, online communities are a useful addition, but they cannot fully replace local relationships.",
      difficulty: "medium",
      explanation: "Compare both types and give a clear conclusion.",
      targets: ["Comparison", "Conclusion"],
      rubric: RUBRIC_P3
    }
  ];

  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
