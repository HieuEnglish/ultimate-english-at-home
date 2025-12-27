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
    ,

    // -----------------------------
    // Part 5: Mixed practice (extra questions)
    // -----------------------------
    {
      id: "q49",
      type: "listenChoice",
      context: "Two classmates are arranging a place to work on a poster.",
      question: "Listen. Where will they meet?",
      say: "Noah: Let's meet in the computer lab after lunch. Ava: Okay, I'll save a seat near the printers.",
      options: ["In the computer lab", "In the library", "In the gym", "In the music room"],
      answer: 0,
      difficulty: "easy",
      explanation: "They agree to meet in the computer lab."
    },
    {
      id: "q50",
      type: "listenChoice",
      context: "A teacher explains what will be on a quiz.",
      question: "Listen. What will the quiz cover?",
      say: "Tomorrow's geography quiz covers rivers and mountains, not the climate section.",
      options: ["Rivers and mountains", "Only climate", "Famous explorers", "Map symbols only"],
      answer: 0,
      difficulty: "easy",
      explanation: "The teacher says it covers rivers and mountains."
    },
    {
      id: "q51",
      type: "listenFillInTheBlank",
      context: "A student reads an after-school notice.",
      question: "Type the time: The debate club starts at _____.",
      say: "Debate club begins at four fifty in the hall, and it ends at five forty.",
      answer: ["4:50", "4.50", "four fifty", "four fifty pm", "four fifty p.m."],
      difficulty: "medium",
      explanation: "Four fifty = 4:50."
    },
    {
      id: "q52",
      type: "listenChoice",
      context: "A student asks to borrow something.",
      question: "Listen. What does the student want to borrow?",
      say: "Could I borrow your stapler for a minute? I need to attach these pages.",
      options: ["A stapler", "A ruler", "A calculator", "A marker"],
      answer: 0,
      difficulty: "easy",
      explanation: "The student asks to borrow a stapler."
    },
    {
      id: "q53",
      type: "listenChoice",
      context: "A parent leaves a message for the school.",
      question: "Listen. Why will Mei miss first period?",
      say: "Hello, this is Mei's dad. She won't be in first period because she has a dentist appointment.",
      options: ["She has a dentist appointment", "She missed the bus", "She is on a holiday", "She forgot her timetable"],
      answer: 0,
      difficulty: "medium",
      explanation: "The reason is a dentist appointment."
    },
    {
      id: "q54",
      type: "listenFillInTheBlank",
      context: "A music teacher gives practice information.",
      question: "Type the day: The rehearsal is on _____.",
      say: "The choir rehearsal is on Tuesday after school in the music room.",
      answer: ["tuesday"],
      difficulty: "easy",
      explanation: "The rehearsal is on Tuesday."
    },
    {
      id: "q55",
      type: "listenChoice",
      context: "A student describes a presentation problem.",
      question: "Listen. What can you infer?",
      say: "The projector kept flickering, so we presented without any slides.",
      options: ["The projector wasn't working properly", "The class had no electricity all day", "The students forgot to make slides", "The teacher cancelled the presentation"],
      answer: 0,
      difficulty: "hard",
      explanation: "If they presented without slides because it flickered, the projector had a problem."
    },
    {
      id: "q56",
      type: "listenChoice",
      context: "A shop clerk explains a discount.",
      question: "Listen. How much do students pay?",
      say: "The workbook costs twelve dollars, but students pay ten with the discount.",
      options: ["$10", "$12", "$8", "$14"],
      answer: 0,
      difficulty: "medium",
      explanation: "With the discount, students pay ten dollars."
    },
    {
      id: "q57",
      type: "listenFillInTheBlank",
      context: "A school office introduces a tutor.",
      question: "Type the surname: The tutor is Mr _____.",
      say: "Your new tutor is Mr Harris. That's H-A-R-R-I-S.",
      answer: ["harris"],
      difficulty: "medium",
      explanation: "The surname spelled out is Harris."
    },
    {
      id: "q58",
      type: "listenChoice",
      context: "Two friends talk about bus stops.",
      question: "Listen. Where should Mina get off?",
      say: "Mina: Should I get off at the museum? Theo: No, get off at the Central Park stop. It's closer.",
      options: ["Central Park stop", "Museum stop", "Station stop", "School stop"],
      answer: 0,
      difficulty: "medium",
      explanation: "Theo says the Central Park stop is closer."
    },
    {
      id: "q59",
      type: "listenChoice",
      context: "A hallway reminder.",
      question: "Listen. Which behaviour is not allowed?",
      say: "Please walk in the corridors. Running near the stairs is not allowed.",
      options: ["Running in the corridors", "Walking in the corridors", "Holding the handrail", "Speaking quietly"],
      answer: 0,
      difficulty: "easy",
      explanation: "Running near the stairs is not allowed."
    },
    {
      id: "q60",
      type: "listenFillInTheBlank",
      context: "A teacher gives writing instructions.",
      question: "Type the number: Write _____ sentences in your summary.",
      say: "Write three sentences in your summary, not a whole paragraph.",
      answer: ["3", "three"],
      difficulty: "easy",
      explanation: "The teacher asks for three sentences."
    },
    {
      id: "q61",
      type: "listenChoice",
      context: "A teacher talks about optional homework.",
      question: "Choose the correct option (True / False / Not Given). The speaker says the homework is required.",
      say: "Homework is optional this week. Do it if you want extra practice.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "If homework is optional, it is not required."
    },
    {
      id: "q62",
      type: "listenChoice",
      context: "Two students discuss printing.",
      question: "Listen. Which option is cheaper?",
      say: "We can print the posters in colour, but black and white is cheaper.",
      options: ["Black and white printing", "Colour printing", "Laminating the posters", "Printing nothing"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says black and white is cheaper."
    },
    {
      id: "q63",
      type: "listenFillInTheBlank",
      context: "A morning announcement.",
      question: "Type the time: Assembly begins at _____.",
      say: "Assembly begins at eight forty, so please be seated by eight thirty-five.",
      answer: ["8:40", "8.40", "eight forty", "eight forty am", "eight forty a.m."],
      difficulty: "medium",
      explanation: "Eight forty = 8:40."
    },
    {
      id: "q64",
      type: "listenFillInTheBlank",
      context: "A student remembers a locker code.",
      question: "Type the code: The locker code is _____.",
      say: "My locker code is seven two nine.",
      answer: ["729", "7 2 9", "seven two nine", "seven-two-nine"],
      difficulty: "medium",
      explanation: "Seven two nine = 729."
    },
    {
      id: "q65",
      type: "listenChoice",
      context: "A teacher explains how to submit homework.",
      question: "Listen. Where should students submit the assignment?",
      say: "Please submit your assignment on Google Classroom by six p.m., not by email.",
      options: ["On Google Classroom", "By email", "On paper only", "By phone message"],
      answer: 0,
      difficulty: "medium",
      explanation: "The teacher says to submit it on Google Classroom."
    },
    {
      id: "q66",
      type: "listenChoice",
      context: "A station announcement.",
      question: "Listen. How long is the delay?",
      say: "Attention passengers: the train is delayed by twenty minutes due to a signal problem.",
      options: ["20 minutes", "2 minutes", "12 minutes", "30 minutes"],
      answer: 0,
      difficulty: "medium",
      explanation: "The announcement says twenty minutes."
    },
    {
      id: "q67",
      type: "listenFillInTheBlank",
      context: "A sports notice.",
      question: "Type the date: The tournament is on the _____ of June.",
      say: "The basketball tournament is on the fourteenth of June.",
      answer: ["14", "14th", "fourteenth"],
      difficulty: "medium",
      explanation: "The date mentioned is the fourteenth (14th)."
    },
    {
      id: "q68",
      type: "listenChoice",
      context: "A coach gives an update.",
      question: "Listen. Why is the match cancelled?",
      say: "Today's football match is cancelled because the field is too wet to play on safely.",
      options: ["The field is too wet", "Not enough players arrived", "The referee is late", "The goals are missing"],
      answer: 0,
      difficulty: "medium",
      explanation: "It is cancelled because the field is too wet."
    },
    {
      id: "q69",
      type: "listenChoice",
      context: "A quick café order.",
      question: "Listen. What is the total cost?",
      say: "Two muffins are two dollars each, so altogether that's four dollars.",
      options: ["$4", "$2", "$6", "$8"],
      answer: 0,
      difficulty: "easy",
      explanation: "Two dollars plus two dollars equals four."
    },
    {
      id: "q70",
      type: "listenChoice",
      context: "A field trip reminder.",
      question: "Listen. What should students bring?",
      say: "Bring a reusable water bottle for the trip. There will be refill stations, but no plastic cups.",
      options: ["A reusable water bottle", "A plastic cup", "A football", "A sleeping bag"],
      answer: 0,
      difficulty: "easy",
      explanation: "Students should bring a reusable water bottle."
    },
    {
      id: "q71",
      type: "listenChoice",
      context: "A short inference statement.",
      question: "Listen. What is most likely true?",
      say: "I turned the handle, but the door wouldn't move at all. I think it's locked.",
      options: ["The door is locked", "The door is made of glass", "The handle is brand new", "The speaker is outdoors in a storm"],
      answer: 0,
      difficulty: "medium",
      explanation: "If the door won't move and they think it's locked, it is likely locked."
    },
    {
      id: "q72",
      type: "listenFillInTheBlank",
      context: "A safety instruction about meeting points.",
      question: "Type the place: Meet at the _____.",
      say: "If we get separated, meet at the main entrance.",
      answer: ["main entrance", "the main entrance", "entrance"],
      difficulty: "medium",
      explanation: "The meeting point is the main entrance."
    },
    {
      id: "q73",
      type: "listenChoice",
      context: "A teacher gives note-taking advice.",
      question: "Listen. Which tip is given?",
      say: "Use headings and bullet points. It helps you find information later.",
      options: ["Use headings and bullet points", "Write every word exactly", "Only draw pictures", "Use full paragraphs only"],
      answer: 0,
      difficulty: "medium",
      explanation: "The teacher recommends headings and bullet points."
    },
    {
      id: "q74",
      type: "listenChoice",
      context: "A library rule is explained.",
      question: "Listen. How long can students borrow a book?",
      say: "You can borrow a book for two weeks. If you need longer, renew it online.",
      options: ["Two weeks", "Two days", "One month", "One year"],
      answer: 0,
      difficulty: "easy",
      explanation: "The rule is two weeks."
    },
    {
      id: "q75",
      type: "listenFillInTheBlank",
      context: "More library rules.",
      question: "Type the number: You can borrow up to _____ books at once.",
      say: "Students can borrow up to five books at once.",
      answer: ["5", "five"],
      difficulty: "easy",
      explanation: "The maximum is five books."
    },
    {
      id: "q76",
      type: "listenChoice",
      context: "Ticket information is announced.",
      question: "Choose the correct option (True / False / Not Given). The speaker says the event is free.",
      say: "Tickets are five dollars at the door, or four dollars if you buy online.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "If tickets cost money, the event is not free."
    },
    {
      id: "q77",
      type: "listenChoice",
      context: "An energy-saving announcement at school.",
      question: "Listen. What does the speaker suggest?",
      say: "Before you leave the classroom, switch off the lights and close the windows.",
      options: ["Switch off lights and close windows", "Turn on every light", "Open all doors and leave them", "Leave computers running overnight"],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker suggests switching off lights and closing windows."
    },
    {
      id: "q78",
      type: "listenChoice",
      context: "A voice message from a friend.",
      question: "Listen. When should the listener call back?",
      say: "Hi! I can't talk right now. Please call me back after seven o'clock.",
      options: ["After 7:00", "Before 7:00", "At exactly 6:00", "Tomorrow morning only"],
      answer: 0,
      difficulty: "medium",
      explanation: "They say to call back after seven o'clock."
    },
    {
      id: "q79",
      type: "listenFillInTheBlank",
      context: "The same voice message.",
      question: "Type the hour: Call back after _____.",
      say: "Call me back after seven, please.",
      answer: ["7", "7pm", "7 p.m.", "seven", "seven o'clock", "after seven"],
      difficulty: "medium",
      explanation: "The message says after seven."
    },
    {
      id: "q80",
      type: "listenChoice",
      context: "Directions are given in town.",
      question: "Listen. Where should the person turn?",
      say: "Cross the bridge, then take the second right. The café is on the corner.",
      options: ["Take the second right after the bridge", "Take the first left before the bridge", "Turn back at the bridge", "Go straight past two bridges"],
      answer: 0,
      difficulty: "medium",
      explanation: "The instruction is to take the second right after crossing the bridge."
    },
    {
      id: "q81",
      type: "listenChoice",
      context: "A station announcement about a coach.",
      question: "Listen. Which platform is the coach leaving from?",
      say: "The coach to Lakeside will depart from platform four in five minutes.",
      options: ["Platform 4", "Platform 2", "Platform 14", "Platform 40"],
      answer: 0,
      difficulty: "medium",
      explanation: "It says platform four."
    },
    {
      id: "q82",
      type: "listenFillInTheBlank",
      context: "The same announcement is repeated.",
      question: "Type the platform number: Platform _____.",
      say: "Please go to platform four for the coach to Lakeside.",
      answer: ["4", "four"],
      difficulty: "easy",
      explanation: "Platform four = 4."
    },
    {
      id: "q83",
      type: "listenChoice",
      context: "Recycling instructions are explained.",
      question: "Listen. Where should glass bottles go?",
      say: "Glass bottles go in the green bin. Plastic bottles go in the yellow bin.",
      options: ["In the green bin", "In the yellow bin", "In the paper bin", "In general waste"],
      answer: 0,
      difficulty: "medium",
      explanation: "Glass bottles go in the green bin."
    },
    {
      id: "q84",
      type: "listenChoice",
      context: "A short story about oversleeping.",
      question: "Listen. Why was the speaker late?",
      say: "I set three alarms, but I turned them off in my sleep and overslept.",
      options: ["They turned off the alarms and overslept", "The bus left early", "They forgot their shoes", "Their phone was stolen"],
      answer: 0,
      difficulty: "hard",
      explanation: "They overslept because they turned off the alarms."
    },
    {
      id: "q85",
      type: "listenChoice",
      context: "Customer service explains a word.",
      question: "Listen. What does 'refund' mean?",
      say: "If the shirt doesn't fit, you can return it for a refund, which means you get your money back.",
      options: ["You get your money back", "You pay extra money", "You keep the item forever", "You exchange your name"],
      answer: 0,
      difficulty: "medium",
      explanation: "A refund means your money is returned."
    },
    {
      id: "q86",
      type: "listenChoice",
      context: "A sports coach gives advice.",
      question: "Listen. What is the coach's main message?",
      say: "Always warm up before you run. It helps prevent injuries.",
      options: ["Warm up to prevent injuries", "Run as fast as possible immediately", "Skip stretching every time", "Drink no water during sports"],
      answer: 0,
      difficulty: "easy",
      explanation: "The coach says warming up helps prevent injuries."
    },
    {
      id: "q87",
      type: "listenFillInTheBlank",
      context: "A school sports schedule is announced.",
      question: "Type the month: The race is in _____.",
      say: "The cross-country race is in October, when the weather is cooler.",
      answer: ["october"],
      difficulty: "easy",
      explanation: "The month mentioned is October."
    },
    {
      id: "q88",
      type: "listenChoice",
      context: "Shop opening hours are announced.",
      question: "Choose the correct option (True / False / Not Given). The speaker says the shop opens at 9:00.",
      say: "We open at nine thirty and close at six.",
      options: ["True", "False", "Not Given"],
      answer: 1,
      difficulty: "medium",
      explanation: "If it opens at 9:30, it does not open at 9:00."
    },
    {
      id: "q89",
      type: "listenFillInTheBlank",
      context: "The same shop hours.",
      question: "Type the opening time: The shop opens at _____.",
      say: "The shop opens at nine thirty.",
      answer: ["9:30", "9.30", "nine thirty", "half past nine", "nine thirty am", "nine thirty a.m."],
      difficulty: "medium",
      explanation: "Nine thirty = 9:30."
    },
    {
      id: "q90",
      type: "listenChoice",
      context: "An outdoor trip safety reminder.",
      question: "Listen. What should students bring?",
      say: "For the outdoor trip, bring a hat and sunscreen. We'll be outside for most of the day.",
      options: ["A hat and sunscreen", "A winter coat and gloves", "A skateboard", "A candle and matches"],
      answer: 0,
      difficulty: "easy",
      explanation: "They should bring a hat and sunscreen."
    },
    {
      id: "q91",
      type: "listenChoice",
      context: "A meeting point is clarified.",
      question: "Listen. Which gate will they meet at?",
      say: "Let's meet at Gate B, not Gate A. Gate A is for arrivals.",
      options: ["Gate B", "Gate A", "Gate C", "Gate D"],
      answer: 0,
      difficulty: "medium",
      explanation: "They will meet at Gate B."
    },
    {
      id: "q92",
      type: "listenFillInTheBlank",
      context: "The same meeting point is repeated.",
      question: "Type the letter: Meet at Gate _____.",
      say: "Meet me at Gate B.",
      answer: ["b", "B"],
      difficulty: "easy",
      explanation: "The gate letter is B."
    },
    {
      id: "q93",
      type: "listenTrueFalse",
      picture: "🎻",
      question: "Look. Listen. True or False?",
      say: "This is a violin.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "🎻 represents a violin."
    },
    {
      id: "q94",
      type: "listenTrueFalse",
      picture: "🍎",
      question: "Look. Listen. True or False?",
      say: "This is a banana.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "easy",
      explanation: "🍎 is an apple, not a banana."
    },
    {
      id: "q95",
      type: "listenTrueFalse",
      picture: "🧭",
      question: "Look. Listen. True or False?",
      say: "This is a compass.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "🧭 represents a compass."
    },
    {
      id: "q96",
      type: "listenTrueFalse",
      picture: "🧯",
      question: "Look. Listen. True or False?",
      say: "This is a fire extinguisher.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "🧯 represents a fire extinguisher."
    },
    {
      id: "q97",
      type: "listenChoice",
      context: "A student talks about catching the last bus.",
      question: "Listen. What is most likely true?",
      say: "It's six oh five, the last bus leaves at six ten, and I'm still ten minutes away.",
      options: ["They will miss the last bus", "They will catch the last bus easily", "The last bus leaves at six fifty", "They are already on the bus"],
      answer: 0,
      difficulty: "hard",
      explanation: "If the bus leaves in 5 minutes and they need 10 minutes, they will miss it."
    },
    {
      id: "q98",
      type: "listenFillInTheBlank",
      context: "Travel information is given.",
      question: "Type the time: The last bus leaves at _____.",
      say: "The last bus leaves at six ten.",
      answer: ["6:10", "6.10", "six ten", "six ten pm", "six ten p.m."],
      difficulty: "medium",
      explanation: "Six ten = 6:10."
    }
  ];

  // Global export (no build step)
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
