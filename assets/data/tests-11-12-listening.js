/* assets/data/tests-11-12-listening.js
   Question bank: Ages 11–12 • Listening

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-11-12-listening"

   Audio approach:
   - The runner uses the browser's Speech Synthesis (TTS) to read "say".

   Question types used by the runner:
   - listenChoice
   - listenTrueFalse
   - listenFillInTheBlank

   Content notes (Ages 11–12):
   - Longer utterances (1–3 sentences) and more detail-dense tasks.
   - Simplified exam-style listening: times, dates, prices, names, directions,
     short talks, and inference from context.

   Implementation notes:
   - Runner shuffles questions and option order on each attempt.
   - listenFillInTheBlank answers are arrays of acceptable responses.
*/

(function () {
  "use strict";

  const SLUG = "age-11-12-listening";

  const QUESTIONS = [
    // -----------------------------
    // Part 1: School life (dialogues)
    // -----------------------------
    {
      id: "q1",
      type: "listenChoice",
      context: "Two students are planning a study session.",
      question: "Listen. Where will they meet?",
      say: "Emma: Let's meet in the library, near the history shelves. Liam: Great. I'll be there.",
      options: ["In the library", "In the gym", "In the cafeteria", "Outside the main gate"],
      answer: 0,
      difficulty: "easy",
      explanation: "Emma says they will meet in the library near the history shelves."
    },
    {
      id: "q2",
      type: "listenChoice",
      context: "A teacher gives homework instructions.",
      question: "Listen. What must students bring tomorrow?",
      say: "Please bring your science notebook and a ruler tomorrow. You won't need your textbook.",
      options: ["A science notebook and a ruler", "A textbook and coloured pencils", "A calculator and headphones", "A map and a dictionary"],
      answer: 0,
      difficulty: "easy",
      explanation: "The teacher mentions a science notebook and a ruler."
    },
    {
      id: "q3",
      type: "listenFillInTheBlank",
      context: "A student checks the club timetable.",
      question: "Type the time: The chess club starts at _____.",
      say: "Chess club starts at three fifteen, right after the last bell.",
      answer: ["3:15", "3.15", "three fifteen", "three fifteen pm", "three fifteen p.m."],
      difficulty: "medium",
      explanation: "Three fifteen = 3:15."
    },
    {
      id: "q4",
      type: "listenChoice",
      context: "Two friends talk about a missing item.",
      question: "Listen. What did Sofia lose?",
      say: "Sofia: I can't find my bus card. I had it this morning, but now it's gone.",
      options: ["Her bus card", "Her phone", "Her keys", "Her lunch money"],
      answer: 0,
      difficulty: "easy",
      explanation: "Sofia says she can't find her bus card."
    },
    {
      id: "q5",
      type: "listenChoice",
      context: "A student calls the school office.",
      question: "Listen. Why is the student calling?",
      say: "Hello, this is Jordan. I'm going to be late because my bus broke down on the highway.",
      options: ["Their bus broke down", "They forgot their homework", "They feel sick", "They missed the alarm"],
      answer: 0,
      difficulty: "medium",
      explanation: "Jordan says the bus broke down."
    },
    {
      id: "q6",
      type: "listenChoice",
      context: "Two students discuss a timetable change.",
      question: "Listen. What changed?",
      say: "Mia: Our maths test was moved from Friday to Monday. Ben: Oh no, that's sooner than I thought.",
      options: ["The maths test date", "The lunch menu", "The school uniform", "The bus route"],
      answer: 0,
      difficulty: "medium",
      explanation: "They say the maths test was moved from Friday to Monday."
    },
    {
      id: "q7",
      type: "listenChoice",
      context: "A teacher explains a rule.",
      question: "Listen. Which behaviour is not allowed?",
      say: "Remember, phones must stay in your bag during class. You can use them at break time.",
      options: ["Using phones during class", "Using phones during break", "Keeping phones in your bag", "Turning phones off"],
      answer: 0,
      difficulty: "easy",
      explanation: "Phones must stay in bags during class."
    },
    {
      id: "q8",
      type: "listenFillInTheBlank",
      context: "A teacher gives a deadline.",
      question: "Type the day: The permission slip is due on _____.",
      say: "Please return the permission slip by Thursday. If you forget, you can't join the trip.",
      answer: ["thursday"],
      difficulty: "easy",
      explanation: "The teacher says: by Thursday."
    },
    {
      id: "q9",
      type: "listenChoice",
      context: "Two students plan a group project.",
      question: "Listen. What will they do first?",
      say: "First we'll choose the topic, then we'll split the research, and finally we'll make the slides.",
      options: ["Choose the topic", "Make the slides", "Present to the class", "Write the bibliography"],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker says the first step is choosing the topic."
    },
    {
      id: "q10",
      type: "listenChoice",
      context: "A student talks about a problem.",
      question: "Listen. What can you infer?",
      say: "I left my umbrella at home, and now my shoes are completely soaked.",
      options: ["It is raining", "It is snowing", "It is very hot", "It is windy"],
      answer: 0,
      difficulty: "hard",
      explanation: "If shoes are soaked and an umbrella is needed, it is likely raining."
    },
    {
      id: "q11",
      type: "listenChoice",
      context: "Two students talk about after-school plans.",
      question: "Listen. Why can't Kai come to the game?",
      say: "Kai: I'd love to come, but I have piano practice at the same time. I'll join you next week.",
      options: ["He has piano practice", "He is sick", "He forgot the location", "He doesn't like football"],
      answer: 0,
      difficulty: "medium",
      explanation: "Kai says he has piano practice at the same time."
    },
    {
      id: "q12",
      type: "listenFillInTheBlank",
      context: "A class announcement.",
      question: "Type the room number: The meeting is in Room _____.",
      say: "The student council meeting is in Room twelve, next to the art room.",
      answer: ["12", "twelve"],
      difficulty: "easy",
      explanation: "Room twelve = 12."
    },

    // -----------------------------
    // Part 2: Community notices (announcements)
    // -----------------------------
    {
      id: "q13",
      type: "listenChoice",
      context: "An announcement about a charity run.",
      question: "Listen. What is the main purpose of the announcement?",
      say: "This Saturday we're holding a charity run to raise money for the local animal shelter. Everyone is welcome.",
      options: ["To invite people to a charity run", "To advertise a new sports shop", "To cancel a school event", "To explain a homework assignment"],
      answer: 0,
      difficulty: "easy",
      explanation: "It invites people to a charity run for the animal shelter."
    },
    {
      id: "q14",
      type: "listenFillInTheBlank",
      context: "Details of the charity run.",
      question: "Type the day: The event is on _____.",
      say: "The charity run is on Saturday morning, starting at nine.",
      answer: ["saturday"],
      difficulty: "easy",
      explanation: "The speaker says Saturday morning."
    },
    {
      id: "q15",
      type: "listenFillInTheBlank",
      context: "A poster is read out loud.",
      question: "Type the time: The run starts at _____.",
      say: "Registration opens at eight thirty, and the run starts at nine o'clock.",
      answer: ["9:00", "9", "9am", "9 a.m.", "nine", "nine o'clock"],
      difficulty: "medium",
      explanation: "The run starts at nine o'clock."
    },
    {
      id: "q16",
      type: "listenChoice",
      context: "A radio notice about the library.",
      question: "Listen. When will the library close today?",
      say: "Due to staff training, the library will close at five forty-five this evening.",
      options: ["5:45", "5:15", "6:45", "4:45"],
      answer: 0,
      difficulty: "medium",
      explanation: "The notice says five forty-five."
    },
    {
      id: "q17",
      type: "listenChoice",
      context: "A notice about a sports centre.",
      question: "Listen. Which facility is closed?",
      say: "The swimming pool is closed for repairs this week, but the gym is open as usual.",
      options: ["The swimming pool", "The gym", "The café", "The reception desk"],
      answer: 0,
      difficulty: "easy",
      explanation: "It says the swimming pool is closed for repairs."
    },
    {
      id: "q18",
      type: "listenChoice",
      context: "A museum ticket message.",
      question: "Listen. How much does a student ticket cost?",
      say: "Tickets are eight dollars for adults, six dollars for students, and children under five are free.",
      options: ["$6", "$8", "$5", "$10"],
      answer: 0,
      difficulty: "medium",
      explanation: "Students pay six dollars."
    },
    {
      id: "q19",
      type: "listenChoice",
      context: "A school canteen announcement.",
      question: "Listen. What change is mentioned?",
      say: "Starting next week, the canteen will stop selling fizzy drinks and will offer fruit juice instead.",
      options: ["Fizzy drinks will be replaced by fruit juice", "The canteen will close at lunchtime", "Students must bring their own plates", "Only sandwiches will be sold"],
      answer: 0,
      difficulty: "medium",
      explanation: "It says fizzy drinks will stop and fruit juice will be offered instead."
    },
    {
      id: "q20",
      type: "listenChoice",
      context: "A phone message about a delivery.",
      question: "Listen. What should the listener do?",
      say: "Your parcel is at reception. Please bring an ID card to collect it.",
      options: ["Bring an ID card to reception", "Call the delivery driver", "Pay extra money online", "Wait at the front gate"],
      answer: 0,
      difficulty: "easy",
      explanation: "The message says to bring an ID card to reception."
    },
    {
      id: "q21",
      type: "listenChoice",
      context: "A simple exam-style statement.",
      question: "Choose the correct option (True / False / Not Given). The speaker says parking is free.",
      say: "Parking is available behind the building. Please pay at the machine before you leave.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "hard",
      explanation: "If you must pay at a machine, it is not free."
    },
    {
      id: "q22",
      type: "listenChoice",
      context: "A short warning announcement.",
      question: "Listen. What should people do during the storm?",
      say: "A strong storm is expected tonight. Please stay indoors and keep away from tall trees.",
      options: ["Stay indoors and avoid tall trees", "Go swimming to stay safe", "Leave windows open for fresh air", "Walk under trees for shelter"],
      answer: 0,
      difficulty: "medium",
      explanation: "The advice is to stay indoors and keep away from tall trees."
    },

    // -----------------------------
    // Part 3: Short talks (school-style mini lectures)
    // -----------------------------
    {
      id: "q23",
      type: "listenChoice",
      context: "A teacher explains a science experiment.",
      question: "Listen. What is the first step?",
      say: "First, measure one cup of water. Then add a spoon of salt and stir until it disappears.",
      options: ["Measure one cup of water", "Add sugar to the water", "Heat the water immediately", "Put the mixture in the freezer"],
      answer: 0,
      difficulty: "easy",
      explanation: "The first step is measuring one cup of water."
    },
    {
      id: "q24",
      type: "listenChoice",
      context: "A teacher explains why the salt disappears.",
      question: "Listen. What does 'dissolves' mean here?",
      say: "When salt dissolves, it mixes into the water so you can't see it anymore.",
      options: ["It mixes into the water", "It becomes louder", "It breaks the cup", "It turns into ice"],
      answer: 0,
      difficulty: "easy",
      explanation: "Dissolves means it mixes into the water."
    },
    {
      id: "q25",
      type: "listenChoice",
      context: "A short talk about reading habits.",
      question: "Listen. What is the speaker recommending?",
      say: "If you only have ten minutes, read a short article instead of scrolling on your phone. Small reading habits add up.",
      options: ["Read short articles regularly", "Stop reading completely", "Only read very long books", "Use your phone more"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker recommends reading short articles in small time slots."
    },
    {
      id: "q26",
      type: "listenChoice",
      context: "A talk about recycling at school.",
      question: "Listen. Which item should NOT go in the paper bin?",
      say: "Put clean paper in the paper bin. Food-covered boxes should go in the general waste.",
      options: ["A pizza box with food on it", "A clean worksheet", "A newspaper", "A paper bag"],
      answer: 0,
      difficulty: "medium",
      explanation: "Food-covered boxes should go in general waste."
    },
    {
      id: "q27",
      type: "listenFillInTheBlank",
      context: "A talk about a school exhibition.",
      question: "Type the month: The exhibition is in _____.",
      say: "The art exhibition will be held in March, right before the spring holiday.",
      answer: ["march"],
      difficulty: "easy",
      explanation: "The speaker says March."
    },
    {
      id: "q28",
      type: "listenChoice",
      context: "A teacher describes an upcoming quiz.",
      question: "Listen. What should students focus on?",
      say: "The quiz will focus on vocabulary from Unit Five, especially the words about the environment.",
      options: ["Vocabulary from Unit Five", "History dates from Unit One", "Maths formulas", "Spelling of classmates' names"],
      answer: 0,
      difficulty: "easy",
      explanation: "It focuses on Unit Five vocabulary about the environment."
    },
    {
      id: "q29",
      type: "listenChoice",
      context: "A short story.",
      question: "Listen. Why did the speaker miss the bus?",
      say: "I ran to the bus stop, but the bus left early today. Next time I'll arrive five minutes sooner.",
      options: ["The bus left early", "The bus was cancelled", "The bus stop moved", "The speaker got lost in the city"],
      answer: 0,
      difficulty: "medium",
      explanation: "The bus left early today."
    },
    {
      id: "q30",
      type: "listenChoice",
      context: "A short story with inference.",
      question: "Listen. What can you infer about the speaker?",
      say: "I studied all week, but when I saw the first question, my mind went blank for a moment.",
      options: ["They felt nervous during the test", "They didn't study at all", "They forgot to bring a pen", "They finished the test very quickly"],
      answer: 0,
      difficulty: "hard",
      explanation: "‘My mind went blank’ suggests nervousness or stress."
    },
    {
      id: "q31",
      type: "listenFillInTheBlank",
      context: "A school office message with a name.",
      question: "Type the surname: The new club leader is Ms _____.",
      say: "Our new club leader is Ms Patel. That's P-A-T-E-L.",
      answer: ["patel"],
      difficulty: "medium",
      explanation: "The surname is Patel."
    },
    {
      id: "q32",
      type: "listenFillInTheBlank",
      context: "A short instruction including a number.",
      question: "Type the number: Bring _____ photos for the form.",
      say: "Please bring two passport photos for the form, not one.",
      answer: ["2", "two"],
      difficulty: "easy",
      explanation: "The speaker says two photos."
    },
    {
      id: "q33",
      type: "listenChoice",
      context: "A teacher explains note-taking.",
      question: "Listen. Which tip is given?",
      say: "Write key words, not full sentences. You can add details after you finish listening.",
      options: ["Write key words instead of full sentences", "Write everything word for word", "Don't write anything", "Only write the title"],
      answer: 0,
      difficulty: "medium",
      explanation: "The tip is to write key words."
    },
    {
      id: "q34",
      type: "listenChoice",
      context: "A mini talk about sleep.",
      question: "Listen. What is the main point?",
      say: "Getting enough sleep helps your memory. If you stay up too late, studying becomes less effective.",
      options: ["Sleep helps memory and learning", "Studying late is always best", "Coffee is better than sleep", "Memory cannot be improved"],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker explains that sleep helps memory and learning."
    },

    // -----------------------------
    // Part 4: Directions + practical info
    // -----------------------------
    {
      id: "q35",
      type: "listenChoice",
      context: "A student asks for directions to a building.",
      question: "Listen. Where should the student turn?",
      say: "Walk past the pharmacy, then turn left at the traffic lights. The building is on your right.",
      options: ["Left at the traffic lights", "Right at the traffic lights", "Left at the pharmacy", "Right at the pharmacy"],
      answer: 0,
      difficulty: "medium",
      explanation: "The instructions say: turn left at the traffic lights."
    },
    {
      id: "q36",
      type: "listenChoice",
      context: "Directions continue.",
      question: "Listen. Which place do they walk past?",
      say: "Walk past the pharmacy, then turn left at the traffic lights.",
      options: ["A pharmacy", "A bakery", "A post office", "A hospital"],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker says walk past the pharmacy."
    },
    {
      id: "q37",
      type: "listenChoice",
      context: "A bus announcement.",
      question: "Listen. What should passengers do?",
      say: "This is the final stop. Please take all your belongings with you as you leave the bus.",
      options: ["Take all belongings", "Stay seated until tomorrow", "Change buses immediately", "Pay again at the front"],
      answer: 0,
      difficulty: "easy",
      explanation: "Passengers are told to take their belongings."
    },
    {
      id: "q38",
      type: "listenChoice",
      context: "A booking phone call.",
      question: "Listen. Which day is the appointment?",
      say: "The next available appointment is on the twelfth of May, at two thirty.",
      options: ["12 May", "2 May", "15 May", "20 May"],
      answer: 0,
      difficulty: "hard",
      explanation: "The appointment is on the twelfth of May."
    },
    {
      id: "q39",
      type: "listenFillInTheBlank",
      context: "The same booking call.",
      question: "Type the time: The appointment is at _____.",
      say: "Your appointment is at two thirty in the afternoon.",
      answer: ["2:30", "2.30", "two thirty", "half past two", "two thirty pm", "two thirty p.m."],
      difficulty: "medium",
      explanation: "Two thirty = 2:30."
    },
    {
      id: "q40",
      type: "listenChoice",
      context: "A short conversation about price.",
      question: "Listen. What is the total cost?",
      say: "The sandwich is three dollars and the drink is two dollars. Altogether that's five dollars.",
      options: ["$5", "$3", "$2", "$6"],
      answer: 0,
      difficulty: "easy",
      explanation: "Three plus two equals five."
    },
    {
      id: "q41",
      type: "listenChoice",
      context: "A note about a new password.",
      question: "Listen. Which password should be used?",
      say: "Use the password green bird. That's two words: green, bird.",
      options: ["green bird", "greenbird", "greenboard", "green birdd"],
      answer: 0,
      difficulty: "hard",
      explanation: "The speaker says the password is two words: green bird."
    },
    {
      id: "q42",
      type: "listenFillInTheBlank",
      context: "A note about the password.",
      question: "Type the password: _____.",
      say: "The password is green bird, two words.",
      answer: ["green bird", "greenbird"],
      difficulty: "hard",
      explanation: "Acceptable answers include “green bird” (two words) and “greenbird”."
    },
    {
      id: "q43",
      type: "listenChoice",
      context: "A short talk about being punctual.",
      question: "Listen. What does the speaker suggest?",
      say: "If you think you'll arrive at nine, aim for eight fifty-five. That way you're on time even with small delays.",
      options: ["Arrive a few minutes early", "Arrive exactly at nine", "Arrive ten minutes late", "Cancel the plan"],
      answer: 0,
      difficulty: "medium",
      explanation: "The suggestion is to aim a few minutes early."
    },
    {
      id: "q44",
      type: "listenChoice",
      context: "Exam-style inference.",
      question: "Listen. What is most likely true?",
      say: "I tried calling twice, but it went straight to voicemail. I'll send a message instead.",
      options: ["The person is not answering the phone", "The phone battery is fully charged", "The caller is at the cinema", "The person answered immediately"],
      answer: 0,
      difficulty: "hard",
      explanation: "Straight to voicemail suggests the person didn't answer."
    },

    // -----------------------------
    // Quick True/False (light variety)
    // -----------------------------
    {
      id: "q45",
      type: "listenTrueFalse",
      picture: "🧪",
      question: "Look. Listen. True or False?",
      say: "This is a test tube.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "🧪 represents a test tube."
    },
    {
      id: "q46",
      type: "listenTrueFalse",
      picture: "📚",
      question: "Look. Listen. True or False?",
      say: "These are shoes.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "easy",
      explanation: "📚 represents books, not shoes."
    },
    {
      id: "q47",
      type: "listenTrueFalse",
      picture: "🚌",
      question: "Look. Listen. True or False?",
      say: "This is a bus.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "🚌 is a bus."
    },
    {
      id: "q48",
      type: "listenTrueFalse",
      picture: "⏰",
      question: "Look. Listen. True or False?",
      say: "This is a clock.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "⏰ represents a clock/alarm."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
