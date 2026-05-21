/* assets/data/tests-8-10-listening.js
   Question bank: Ages 8–10 • Listening

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-8-10-listening"

   Audio approach:
   - The runner uses the browser's Speech Synthesis (TTS) to read "say".

   Question types used by the runner:
   - listenChoice      (listen, choose 1 option)
   - listenTrueFalse   (look/listen, choose True/False)
   - listenFillInTheBlank (listen, type the missing word or number)

   Content notes:
   - Short dialogues and announcements.
   - Ages 8–10: short, clear, age-appropriate.
*/

(function () {
  "use strict";

  const SLUG = "age-8-10-listening";

  const QUESTIONS = [
    // --- Easy: short classroom instructions ---
    {
      id: "q1",
      type: "listenChoice",
      question: "Listen. What should the students do?",
      say: "Teacher: Please open your books and sit quietly.",
      options: ["Close your books", "Open your books", "Stand up", "Run outside"],
      answer: 1,
      difficulty: "easy",
      explanation: "The teacher says: open your books."
    },
    {
      id: "q2",
      type: "listenChoice",
      question: "Listen. Which page should they turn to?",
      say: "Teacher: Turn to page twelve, please.",
      options: ["Page 10", "Page 11", "Page 12", "Page 13"],
      answer: 2,
      difficulty: "easy",
      explanation: "The teacher says: page twelve."
    },
    {
      id: "q3",
      type: "listenChoice",
      question: "Listen. What is the rule?",
      say: "Teacher: No talking during the test.",
      options: ["No writing", "No listening", "No reading", "No talking"], answer: 3,
      difficulty: "easy",
      explanation: "The rule is: no talking."
    },
    {
      id: "q4",
      type: "listenChoice",
      question: "Listen. What time is practice?",
      say: "Tom: What time is football practice? Mia: At four o'clock.",
      options: ["4:00", "3:00", "5:00", "6:00"], answer: 0,
      difficulty: "easy",
      explanation: "Mia says practice is at four o'clock."
    },
    {
      id: "q5",
      type: "listenChoice",
      question: "Listen. When is Ben's project due?",
      say: "Ben has a science project due on Monday.",
      options: ["Tuesday", "Monday", "Wednesday", "Friday"], answer: 1,
      difficulty: "easy",
      explanation: "Ben says it is due on Monday."
    },
    {
      id: "q6",
      type: "listenChoice",
      question: "Listen. How many apples are there?",
      say: "There are three apples on the table.",
      options: ["Two", "Four", "Three", "Five"], answer: 2,
      difficulty: "easy",
      explanation: "The speaker says: three apples."
    },
    {
      id: "q7",
      type: "listenChoice",
      question: "Listen. Who forgot their lunch?",
      say: "Teacher: Anna forgot her lunch today.",
      options: ["Mia", "Ben", "Tom", "Anna"], answer: 3,
      difficulty: "easy",
      explanation: "The teacher says Anna forgot her lunch."
    },
    {
      id: "q8",
      type: "listenChoice",
      question: "Listen. What does Alex prefer?",
      say: "Alex: I prefer tea, not coffee.",
      options: ["Tea", "Coffee", "Juice", "Milk"], answer: 0,
      difficulty: "easy",
      explanation: "Alex says he prefers tea."
    },
    {
      id: "q9",
      type: "listenChoice",
      question: "Listen. Why should the window be closed?",
      say: "Please close the window because it is cold outside.",
      options: ["It is hot outside", "It is cold outside", "It is noisy inside", "It is dark inside"],
      answer: 1,
      difficulty: "medium",
      explanation: "The speaker says it is cold outside."
    },
    {
      id: "q10",
      type: "listenChoice",
      question: "Listen. What should students bring on the trip?",
      say: "Bring a hat and a bottle of water for the trip.",
      options: ["A video game", "A TV", "A hat and water", "A pillow"], answer: 2,
      difficulty: "easy",
      explanation: "The speaker says: bring a hat and water."
    },

    // --- Medium: short dialogues and simple reasoning ---
    {
      id: "q11",
      type: "listenChoice",
      question: "Listen. What is the weather like?",
      say: "It is raining, so take an umbrella.",
      options: ["Sunny", "Snowy", "Windy", "Raining"], answer: 3,
      difficulty: "easy",
      explanation: "The speaker says it is raining."
    },
    {
      id: "q12",
      type: "listenChoice",
      question: "Listen. Where is the library?",
      say: "The library is next to the cafeteria.",
      options: ["Next to the cafeteria", "Behind the gym", "Across from the park", "Near the bus stop"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says it is next to the cafeteria."
    },
    {
      id: "q13",
      type: "listenChoice",
      question: "Listen. Where should they meet?",
      say: "Let's meet at the front gate after school.",
      options: ["Classroom", "Front gate", "Cafeteria", "Library"], answer: 1,
      difficulty: "easy",
      explanation: "They should meet at the front gate."
    },
    {
      id: "q14",
      type: "listenChoice",
      question: "Listen. Which jacket is cheaper?",
      say: "The red jacket is twenty dollars. The blue jacket is fifteen dollars.",
      options: ["Red jacket", "They are the same price", "Blue jacket", "Not enough information"], answer: 2,
      difficulty: "medium",
      explanation: "Fifteen dollars is cheaper than twenty dollars."
    },
    {
      id: "q15",
      type: "listenChoice",
      question: "Listen. Where were the keys?",
      say: "I found the keys under the sofa.",
      options: ["On the table", "In the bag", "In the fridge", "Under the sofa"], answer: 3,
      difficulty: "medium",
      explanation: "The keys were under the sofa."
    },

    // --- True/False with pictures ---
    {
      id: "q16",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🐬",
      say: "This is a dolphin.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "🐬 is a dolphin."
    },
    {
      id: "q17",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🍌",
      say: "This is an orange.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "easy",
      explanation: "🍌 is a banana, not an orange."
    },
    {
      id: "q18",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🚌",
      say: "This is a train.",
      options: ["False", "True"], answer: 0,
      difficulty: "medium",
      explanation: "🚌 is a bus."
    },
    {
      id: "q19",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🐢",
      say: "This is a turtle.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "🐢 is a turtle."
    },

    // --- Fill in the blank (short) ---
    {
      id: "q20",
      type: "listenFillInTheBlank",
      question: "Type the missing word: I need a _____ to write.",
      say: "I need a pencil to write.",
      answer: ["pencil"],
      difficulty: "easy",
      explanation: "The missing word is pencil."
    },
    {
      id: "q21",
      type: "listenFillInTheBlank",
      question: "Type the number you hear: There are _____ students in the room.",
      say: "There are fourteen students in the room.",
      answer: ["14", "fourteen"],
      difficulty: "medium",
      explanation: "Fourteen = 14."
    },
    {
      id: "q22",
      type: "listenFillInTheBlank",
      question: "Type the missing word: Please speak _____ in the library.",
      say: "Please speak quietly in the library.",
      answer: ["quietly"],
      difficulty: "medium",
      explanation: "Quietly means not loudly."
    },

    // --- Medium: short situations ---
    {
      id: "q23",
      type: "listenChoice",
      question: "Listen. What should you do when you finish?",
      say: "When you finish your work, put your paper on my desk.",
      options: ["Put it on the teacher's desk", "Throw it away", "Hide it", "Take it home"], answer: 0,
      difficulty: "medium",
      explanation: "The teacher says: put it on my desk."
    },
    {
      id: "q24",
      type: "listenChoice",
      question: "Listen. Why did the person drink water?",
      say: "I drank water because I was thirsty.",
      options: ["Because I was hungry", "Because I was thirsty", "Because I was bored", "Because I was sleepy"],
      answer: 1,
      difficulty: "easy",
      explanation: "The speaker says they were thirsty."
    },
    {
      id: "q25",
      type: "listenChoice",
      question: "Listen. Where should the milk go?",
      say: "Please put the milk in the refrigerator.",
      options: ["In the drawer", "On the counter", "In the refrigerator", "In the oven"], answer: 2,
      difficulty: "easy",
      explanation: "Milk should go in the refrigerator."
    },
    {
      id: "q26",
      type: "listenChoice",
      question: "Listen. How many sentences should the homework have?",
      say: "Write five sentences for homework.",
      options: ["Three", "Four", "Six", "Five"], answer: 3,
      difficulty: "medium",
      explanation: "The teacher says: five sentences."
    },
    {
      id: "q27",
      type: "listenChoice",
      question: "Listen. What did Maya buy?",
      say: "Maya bought a new notebook at the store.",
      options: ["A new notebook", "A new phone", "A new bike", "A new hat"],
      answer: 0,
      difficulty: "easy",
      explanation: "Maya bought a new notebook."
    },
    {
      id: "q28",
      type: "listenChoice",
      question: "Listen. When will they visit grandma?",
      say: "We will visit grandma on Saturday morning.",
      options: ["Friday night", "Saturday morning", "Sunday afternoon", "Monday morning"],
      answer: 1,
      difficulty: "medium",
      explanation: "They will visit on Saturday morning."
    },
    {
      id: "q29",
      type: "listenChoice",
      question: "Listen. What should you do first?",
      say: "First, wash your hands. Then eat your snack.",
      options: ["Eat your snack first", "Run outside first", "Wash your hands first", "Call your friend first"], answer: 2,
      difficulty: "medium",
      explanation: "The speaker says: first, wash your hands."
    },
    {
      id: "q30",
      type: "listenFillInTheBlank",
      question: "Type the missing word: My sister is _____ than me.",
      say: "My sister is taller than me.",
      answer: ["taller"],
      difficulty: "easy",
      explanation: "The missing word is taller."
    },
    {
      id: "q31",
      type: "listenChoice",
      question: "Listen. What time does the movie start?",
      say: "The movie starts at six p.m., but we should arrive early.",
      options: ["5 p.m.", "8 p.m.", "7 p.m.", "6 p.m."], answer: 3,
      difficulty: "medium",
      explanation: "The movie starts at six p.m."
    },
    {
      id: "q32",
      type: "listenChoice",
      question: "Listen. How long will the person come back in?",
      say: "Please wait at the corner. I will come in five minutes.",
      options: ["In five minutes", "In fifteen minutes", "In one hour", "Tomorrow"],
      answer: 0,
      difficulty: "medium",
      explanation: "The speaker says: five minutes."
    }
  ];

  // Added questions (append-only)
  QUESTIONS.push(
    {
      id: "q33",
      type: "listenChoice",
      question: "Listen. What should the students write at the top of the page?",
      say: "Teacher: Before you start, please write your name at the top of the page.",
      options: ["The date", "Their name", "Their address", "A phone number"],
      answer: 1,
      difficulty: "easy",
      explanation: "The teacher says to write your name at the top."
    },
    {
      id: "q34",
      type: "listenChoice",
      question: "Listen. What time does art club start?",
      say: "Nina: Does art club start at three? Coach: No, it starts at three thirty.",
      options: ["3:00", "3:15", "3:30", "4:00"],
      answer: 2,
      difficulty: "easy",
      explanation: "The coach says it starts at three thirty."
    },
    {
      id: "q35",
      type: "listenChoice",
      question: "Listen. Which bus should they take?",
      say: "Dad: We need to go to the stadium. Take bus twelve, not bus twenty.",
      options: ["Bus 2", "Bus 22", "Bus 20", "Bus 12"], answer: 3,
      difficulty: "medium",
      explanation: "The speaker says bus twelve."
    },
    {
      id: "q36",
      type: "listenChoice",
      question: "Listen. How much is one ticket?",
      say: "Clerk: One ticket is five dollars. Two tickets are ten dollars.",
      options: ["$5", "$4", "$2", "$10"], answer: 0,
      difficulty: "easy",
      explanation: "One ticket costs five dollars."
    },
    {
      id: "q37",
      type: "listenChoice",
      question: "Listen. When does the library close today?",
      say: "Announcement: The library will close at five o'clock today.",
      options: ["4:00", "5:00", "4:30", "6:00"], answer: 1,
      difficulty: "easy",
      explanation: "The announcement says it closes at five o'clock."
    },
    {
      id: "q38",
      type: "listenChoice",
      question: "Listen. How long should they read?",
      say: "Teacher: Please read quietly for ten minutes, then answer the questions.",
      options: ["5 minutes", "15 minutes", "10 minutes", "20 minutes"], answer: 2,
      difficulty: "easy",
      explanation: "The teacher says: ten minutes."
    },
    {
      id: "q39",
      type: "listenChoice",
      question: "Listen. Where did they see the lost dog?",
      say: "Boy: Have you seen the lost dog? Girl: Yes, I saw it near the river.",
      options: ["On the bus", "At the mall", "Behind the school", "Near the river"], answer: 3,
      difficulty: "medium",
      explanation: "The girl says she saw it near the river."
    },
    {
      id: "q40",
      type: "listenChoice",
      question: "Listen. Which fruit does Alex choose?",
      say: "Alex: Should I get an apple or an orange? Mom: Choose one. Alex: I'll take an orange.",
      options: ["Orange", "Apple", "Banana", "Grapes"], answer: 0,
      difficulty: "easy",
      explanation: "Alex says he will take an orange."
    },
    {
      id: "q41",
      type: "listenChoice",
      question: "Listen. What should the students bring?",
      say: "Teacher: For the test, bring two pencils and an eraser.",
      options: ["One pencil", "Two pencils and an eraser", "A ruler only", "A notebook"],
      answer: 1,
      difficulty: "easy",
      explanation: "The teacher says: two pencils and an eraser."
    },
    {
      id: "q42",
      type: "listenChoice",
      question: "Listen. What day is the meeting now?",
      say: "Text message: The meeting is moved from Monday to Tuesday.",
      options: ["Monday", "Wednesday", "Tuesday", "Friday"], answer: 2,
      difficulty: "medium",
      explanation: "It is moved to Tuesday."
    },
    {
      id: "q43",
      type: "listenChoice",
      question: "Listen. Why will practice be indoors?",
      say: "Coach: It might rain after school, so practice will be indoors today.",
      options: ["Because it is too hot", "Because everyone is late", "Because the field is new", "Because it might rain"], answer: 3,
      difficulty: "medium",
      explanation: "Practice is indoors because it might rain."
    },
    {
      id: "q44",
      type: "listenChoice",
      question: "Listen. Where will the student sit?",
      say: "Teacher: Where would you like to sit? Student: I will sit in the front row.",
      options: ["In the front row", "In the last row", "Outside the room", "On the floor"],
      answer: 0,
      difficulty: "easy",
      explanation: "The student says: in the front row."
    },
    {
      id: "q45",
      type: "listenChoice",
      question: "Listen. What should they use to go upstairs?",
      say: "Mom: The elevator is busy. Let's take the stairs.",
      options: ["A bicycle", "The stairs", "A car", "A skateboard"], answer: 1,
      difficulty: "easy",
      explanation: "Mom says to take the stairs."
    },
    {
      id: "q46",
      type: "listenChoice",
      question: "Listen. What time does the museum open?",
      say: "Guide: The museum opens at nine thirty and closes at four.",
      options: ["9:00", "4:00", "9:30", "4:30"], answer: 2,
      difficulty: "medium",
      explanation: "The guide says it opens at nine thirty."
    },
    {
      id: "q47",
      type: "listenChoice",
      question: "Listen. Where should the ice cream go?",
      say: "Dad: Put the ice cream in the freezer, please.",
      options: ["Under the sink", "On the table", "In the backpack", "In the freezer"], answer: 3,
      difficulty: "easy",
      explanation: "Ice cream goes in the freezer."
    },
    {
      id: "q48",
      type: "listenChoice",
      question: "Listen. What should you do before leaving the room?",
      say: "Teacher: Before you leave, turn off the lights and close the door.",
      options: ["Turn off the lights", "Open the window", "Move the desks", "Start a new page"], answer: 0,
      difficulty: "medium",
      explanation: "The teacher says to turn off the lights (and close the door)."
    },
    {
      id: "q49",
      type: "listenChoice",
      question: "Listen. How long until the game starts?",
      say: "Announcer: The game will start in twenty minutes.",
      options: ["In 2 minutes", "In 20 minutes", "In 10 minutes", "Tomorrow"], answer: 1,
      difficulty: "easy",
      explanation: "The announcer says: twenty minutes."
    },
    {
      id: "q50",
      type: "listenChoice",
      question: "Listen. Which animal are they talking about?",
      say: "Girl: I saw an animal with a very long neck and spots. Boy: That sounds like a giraffe.",
      options: ["Tiger", "Rabbit", "Giraffe", "Duck"], answer: 2,
      difficulty: "medium",
      explanation: "A long neck and spots describes a giraffe."
    },
    {
      id: "q51",
      type: "listenChoice",
      question: "Listen. What should you do if you don't understand?",
      say: "Teacher: If you don't understand the question, raise your hand and ask me.",
      options: ["Close your book", "Skip every question", "Leave the room", "Raise your hand and ask"], answer: 3,
      difficulty: "medium",
      explanation: "The teacher says to raise your hand and ask."
    },
    {
      id: "q52",
      type: "listenChoice",
      question: "Listen. How many cookies are left?",
      say: "Dad: We had eight cookies. Now there are six cookies left.",
      options: ["6", "7", "8", "10"],
      answer: 0,
      difficulty: "easy",
      explanation: "The speaker says there are six cookies left."
    },
    {
      id: "q53",
      type: "listenChoice",
      question: "Listen. What did Sara buy?",
      say: "Sara: I went to the shop after school. I bought a notebook for my new class.",
      options: ["A football", "A notebook", "A sandwich", "A jacket"], answer: 1,
      difficulty: "easy",
      explanation: "Sara says she bought a notebook."
    },
    {
      id: "q54",
      type: "listenChoice",
      question: "Listen. Where is the homework?",
      say: "Ben: I can't find my homework. Mom: Check your backpack pocket. Ben: Oh, it's there!",
      options: ["In the bathroom", "On the kitchen table", "In the backpack pocket", "At the library"], answer: 2,
      difficulty: "medium",
      explanation: "Mom tells Ben to check the backpack pocket."
    },
    {
      id: "q55",
      type: "listenChoice",
      question: "Listen. Which platform should they use?",
      say: "Speaker: The train to Green City will leave from platform two.",
      options: ["Platform 1", "Platform 4", "Platform 3", "Platform 2"], answer: 3,
      difficulty: "medium",
      explanation: "The speaker says platform two."
    },
    {
      id: "q56",
      type: "listenChoice",
      question: "Listen. Which way should they turn?",
      say: "Dad: We are almost there. Turn left at the pharmacy.",
      options: ["Turn left", "Turn right", "Go back", "Stop and wait"],
      answer: 0,
      difficulty: "easy",
      explanation: "Dad says: turn left at the pharmacy."
    },
    {
      id: "q57",
      type: "listenChoice",
      question: "Listen. What is the classroom rule?",
      say: "Teacher: Remember, there is no food in the classroom.",
      options: ["No homework", "No food in the classroom", "No books allowed", "No talking at all times"],
      answer: 1,
      difficulty: "easy",
      explanation: "The rule is: no food in the classroom."
    },
    {
      id: "q58",
      type: "listenChoice",
      question: "Listen. Why does he bring a jacket?",
      say: "Brother: Why are you bringing a jacket? Sister: Because it will be cold tonight.",
      options: ["Because it is too small", "Because it will be sunny", "Because it will be cold", "Because it is new"], answer: 2,
      difficulty: "medium",
      explanation: "She brings a jacket because it will be cold tonight."
    },
    {
      id: "q59",
      type: "listenChoice",
      question: "Listen. What time should they wake up?",
      say: "Mom: Tomorrow, wake up at seven fifteen. We leave at eight.",
      options: ["7:05", "8:15", "7:50", "7:15"], answer: 3,
      difficulty: "medium",
      explanation: "Mom says: seven fifteen."
    },
    {
      id: "q60",
      type: "listenChoice",
      question: "Listen. What are they planning?",
      say: "Liam: Should we bring sandwiches? Ava: Yes, for our class picnic on Friday.",
      options: ["A class picnic", "A music concert", "A football match", "A spelling test"],
      answer: 0,
      difficulty: "easy",
      explanation: "They are planning a class picnic."
    },
    {
      id: "q61",
      type: "listenChoice",
      question: "Listen. Which fruit is cheaper?",
      say: "Shopkeeper: Apples are two dollars. Grapes are three dollars.",
      options: ["Grapes", "Apples", "They cost the same", "The shopkeeper didn't say"], answer: 1,
      difficulty: "medium",
      explanation: "Two dollars is cheaper than three dollars, so apples are cheaper."
    },
    {
      id: "q62",
      type: "listenChoice",
      question: "Listen. What did the student forget?",
      say: "Teacher: Do you have your homework? Student: Oh no, I left it on my desk at home.",
      options: ["A pencil", "A coat", "Homework", "Lunch money"], answer: 2,
      difficulty: "medium",
      explanation: "The student says they left homework at home."
    },
    {
      id: "q63",
      type: "listenChoice",
      question: "Listen. What should you do before crossing the road?",
      say: "Adult: Before you cross, look left and right for cars.",
      options: ["Close your eyes", "Walk backward", "Run as fast as you can", "Look left and right"], answer: 3,
      difficulty: "easy",
      explanation: "You should look left and right before crossing."
    },
    {
      id: "q64",
      type: "listenChoice",
      question: "Listen. What subject is next?",
      say: "Student: What's next after math? Teacher: Science is next period.",
      options: ["Science", "Math", "Art", "Music"], answer: 0,
      difficulty: "easy",
      explanation: "The teacher says science is next."
    },
    {
      id: "q65",
      type: "listenChoice",
      question: "Listen. What should you do first?",
      say: "Cooking teacher: First, wash the rice. Then add water.",
      options: ["Add sugar", "Wash the rice", "Turn on music", "Eat the rice"],
      answer: 1,
      difficulty: "medium",
      explanation: "The teacher says: first, wash the rice."
    },
    {
      id: "q66",
      type: "listenChoice",
      question: "Listen. What did the girl lose?",
      say: "Girl: I can't find my scarf. Boy: Did you leave it on the chair? Girl: Yes, that's where I left it.",
      options: ["Her glasses", "Her shoes", "Her scarf", "Her book"], answer: 2,
      difficulty: "medium",
      explanation: "She says she can't find her scarf."
    },
    {
      id: "q67",
      type: "listenChoice",
      question: "Listen. Where should the class line up?",
      say: "Teacher: Class, line up by the blue door, please.",
      options: ["By the teacher's desk", "By the red door", "By the window", "By the blue door"], answer: 3,
      difficulty: "easy",
      explanation: "The teacher says: by the blue door."
    },
    {
      id: "q68",
      type: "listenChoice",
      question: "Listen. What will they bring to the party?",
      say: "Maya: What should we bring to the party? Sam: Let's bring a card and some balloons.",
      options: ["A card and balloons", "Only a book", "Nothing", "A bicycle"],
      answer: 0,
      difficulty: "medium",
      explanation: "Sam suggests bringing a card and balloons."
    },
    {
      id: "q69",
      type: "listenChoice",
      question: "Listen. Where is the cat sleeping?",
      say: "Boy: Where is the cat? Girl: It's sleeping on the sofa.",
      options: ["Under the bed", "On the sofa", "In the garden", "In the car"], answer: 1,
      difficulty: "easy",
      explanation: "The girl says the cat is sleeping on the sofa."
    },
    {
      id: "q70",
      type: "listenChoice",
      question: "Listen. What should students underline?",
      say: "Teacher: In this paragraph, underline the topic sentence, not every detail.",
      options: ["Every detail", "All the commas", "The topic sentence", "The last word only"], answer: 2,
      difficulty: "hard",
      explanation: "The teacher says to underline the topic sentence."
    },
    {
      id: "q71",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🍓",
      say: "This is a strawberry.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "🍓 is a strawberry."
    },
    {
      id: "q72",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🦁",
      say: "This is a tiger.",
      options: ["False", "True"], answer: 0,
      difficulty: "medium",
      explanation: "🦁 is a lion, not a tiger."
    },
    {
      id: "q73",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🐧",
      say: "This is a penguin.",
      options: ["False", "True"], answer: 1,
      difficulty: "easy",
      explanation: "🐧 is a penguin."
    },
    {
      id: "q74",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🥕",
      say: "This is a potato.",
      options: ["False", "True"], answer: 0,
      difficulty: "easy",
      explanation: "🥕 is a carrot."
    },
    {
      id: "q75",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "🌙",
      say: "This is the sun.",
      options: ["True", "False"],
      answer: 1,
      difficulty: "medium",
      explanation: "🌙 is the moon, not the sun."
    },
    {
      id: "q76",
      type: "listenTrueFalse",
      question: "Look. Listen. True or False?",
      picture: "⛄",
      say: "This is a snowman.",
      options: ["True", "False"],
      answer: 0,
      difficulty: "easy",
      explanation: "⛄ is a snowman."
    },
    {
      id: "q77",
      type: "listenFillInTheBlank",
      question: "Type the missing word: Please sit _____.",
      say: "Please sit down.",
      answer: ["down"],
      difficulty: "easy",
      explanation: "The missing word is down."
    },
    {
      id: "q78",
      type: "listenFillInTheBlank",
      question: "Type the number you hear: There are _____ minutes in an hour.",
      say: "There are sixty minutes in an hour.",
      answer: ["60", "sixty"],
      difficulty: "hard",
      explanation: "Sixty = 60."
    },
    {
      id: "q79",
      type: "listenFillInTheBlank",
      question: "Type the missing word: I will _____ my hands before I eat.",
      say: "I will wash my hands before I eat.",
      answer: ["wash"],
      difficulty: "easy",
      explanation: "The missing word is wash."
    },
    {
      id: "q80",
      type: "listenFillInTheBlank",
      question: "Type the missing word: The dog is _____ the table.",
      say: "The dog is under the table.",
      answer: ["under"],
      difficulty: "medium",
      explanation: "The missing word is under."
    },
    {
      id: "q81",
      type: "listenFillInTheBlank",
      question: "Type the number you hear: We need _____ batteries.",
      say: "We need two batteries.",
      answer: ["2", "two"],
      difficulty: "medium",
      explanation: "Two = 2."
    },
    {
      id: "q82",
      type: "listenFillInTheBlank",
      question: "Type the missing word: Please work _____ during the test.",
      say: "Please work silently during the test.",
      answer: ["silently"],
      difficulty: "hard",
      explanation: "Silently means without talking."
    },
    {
      id: "q83",
      type: "listenChoice",
      question: "Listen. What should the student bring?",
      say: "Teacher: Please bring your raincoat tomorrow. It will rain.",
      options: ["A swimsuit", "A raincoat", "A sandwich", "A toy"], answer: 1,
      difficulty: "easy",
      explanation: "The teacher says: bring your raincoat."
    },
    {
      id: "q84",
      type: "listenChoice",
      question: "Listen. What time is the meeting?",
      say: "The meeting starts at three thirty.",
      options: ["4:30", "3:00", "3:30", "2:30"], answer: 2,
      difficulty: "medium",
      explanation: "Three thirty = 3:30."
    }
  );

  // Global export (no build step)


  // Added to normalize this bank to 111 items.
  QUESTIONS.push(
    {
      "id": "q85",
      "type": "listenChoice",
      "context": "A boy is talking about music club.",
      "question": "What day is the club?",
      "say": "The music club is on Wednesday after school.",
      "options": [
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q86",
      "type": "listenChoice",
      "context": "A teacher gives instructions.",
      "question": "What do students need?",
      "say": "Please bring a ruler and coloured pencils for tomorrow's map task.",
      "options": [
        "A ruler and coloured pencils",
        "A calculator",
        "A dictionary",
        "A lunch box"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q87",
      "type": "listenChoice",
      "context": "Two friends plan a match.",
      "question": "Where will they meet?",
      "say": "Let's meet by the basketball court at half past four.",
      "options": [
        "At the library",
        "At the basketball court",
        "At the bus stop",
        "At the canteen"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q88",
      "type": "listenChoice",
      "context": "A child talks about homework.",
      "question": "Which subject is hardest?",
      "say": "Maths is the hardest for me, but science is my favourite.",
      "options": [
        "Science",
        "English",
        "Maths",
        "Art"
      ],
      "answer": 2,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q89",
      "type": "listenChoice",
      "context": "An announcement at school.",
      "question": "Which room changed?",
      "say": "Drama club has moved from Room 8 to Room 12 today.",
      "options": [
        "Room 4",
        "Room 8",
        "Room 10",
        "Room 12"
      ],
      "answer": 3,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q90",
      "type": "listenChoice",
      "context": "Two friends talk about lunch.",
      "question": "What will they eat?",
      "say": "Let's share noodles and orange juice at lunch.",
      "options": [
        "Rice and water",
        "Noodles and orange juice",
        "Soup and tea",
        "Bread and milk"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q91",
      "type": "listenChoice",
      "context": "A class captain speaks.",
      "question": "When is the clean-up?",
      "say": "Our class clean-up starts at 7:45 on Saturday morning.",
      "options": [
        "7:15",
        "7:30",
        "7:45",
        "8:15"
      ],
      "answer": 2,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q92",
      "type": "listenChoice",
      "context": "A parent leaves a message.",
      "question": "Why is Ben late?",
      "say": "Ben will be late because his dentist appointment finished later than expected.",
      "options": [
        "He missed the bus",
        "He was sick",
        "He had a dentist appointment",
        "He forgot his bag"
      ],
      "answer": 2,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q93",
      "type": "listenChoice",
      "context": "A coach gives advice.",
      "question": "What should players do first?",
      "say": "First stretch your legs, then jog two laps, and finally take a water break.",
      "options": [
        "Stretch",
        "Drink water",
        "Sit down",
        "Kick the ball"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Listen for the key detail."
    },
    {
      "id": "q94",
      "type": "listenFillInTheBlank",
      "context": "A librarian speaks.",
      "question": "Type the day: The books are due on _____.",
      "say": "Please return your library books on Monday before lunch.",
      "answer": [
        "monday"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q95",
      "type": "listenFillInTheBlank",
      "context": "A teacher gives a page number.",
      "question": "Type the page number.",
      "say": "Open your workbook to page thirty-six.",
      "answer": [
        "36",
        "thirty six",
        "thirty-six"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q96",
      "type": "listenFillInTheBlank",
      "context": "A friend leaves a note.",
      "question": "Type the time.",
      "say": "Meet me at 5:20 near the school gate.",
      "answer": [
        "5:20",
        "5.20",
        "five twenty"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q97",
      "type": "listenFillInTheBlank",
      "context": "A student talks about a project.",
      "question": "Type the topic.",
      "say": "Our group project is about recycling in the neighbourhood.",
      "answer": [
        "recycling"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q98",
      "type": "listenFillInTheBlank",
      "context": "A PE teacher speaks.",
      "question": "Type the place.",
      "say": "Today we will practise in the gym because the field is wet.",
      "answer": [
        "gym",
        "the gym"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q99",
      "type": "listenFillInTheBlank",
      "context": "An art teacher speaks.",
      "question": "Type the colour.",
      "say": "Please paint the background light blue, not dark blue.",
      "answer": [
        "light blue"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q100",
      "type": "listenFillInTheBlank",
      "context": "A classmate shares a plan.",
      "question": "Type the month.",
      "say": "We are going to the museum in November.",
      "answer": [
        "november"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q101",
      "type": "listenFillInTheBlank",
      "context": "A shopkeeper speaks.",
      "question": "Type the price.",
      "say": "The notebook costs twelve thousand dong.",
      "answer": [
        "12000",
        "12,000",
        "twelve thousand dong"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q102",
      "type": "listenFillInTheBlank",
      "context": "A coach speaks.",
      "question": "Type the number.",
      "say": "Each team needs seven players for this game.",
      "answer": [
        "7",
        "seven"
      ],
      "difficulty": "medium",
      "explanation": "Type the exact word, time, or number you hear."
    },
    {
      "id": "q103",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The art room is closed after school.",
      "options": [
        "False",
        "True"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },
    {
      "id": "q104",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The weather is windy.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },
    {
      "id": "q105",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The trip starts on Friday.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },
    {
      "id": "q106",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The boy lost his lunch box.",
      "options": [
        "False",
        "True"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },
    {
      "id": "q107",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The class will meet in the hall.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },
    {
      "id": "q108",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The soup is cheaper than the sandwich.",
      "options": [
        "False",
        "True"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },
    {
      "id": "q109",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The girl practises piano every day.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },
    {
      "id": "q110",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The bus leaves at 6:15.",
      "options": [
        "False",
        "True"
      ],
      "answer": 0,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },
    {
      "id": "q111",
      "type": "listenTrueFalse",
      "context": "Listen to the short statement.",
      "question": "Listen. True or False?",
      "say": "The teacher wants a full sentence.",
      "options": [
        "False",
        "True"
      ],
      "answer": 1,
      "difficulty": "medium",
      "explanation": "Compare the spoken sentence with the statement."
    },

{
    "id": "q112",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The class begins at nine fifteen.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q113",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "She brought a green notebook.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q114",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The game starts after lunch.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q115",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Their bus arrives at gate two.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q116",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "He finished the task on Tuesday.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q117",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The library closes at six o clock.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q118",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "We need three bottles of water.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q119",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The concert is next Saturday night.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q120",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The teacher asked for full sentences.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q121",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "They will meet in room fourteen.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},

{
    "id": "q122",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The lesson ends at ten forty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q123",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "He left his notebook on the desk.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q124",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Their practice match is on Wednesday.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q125",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The cafeteria serves pasta today.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q126",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "She needs a ruler and an eraser.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q127",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The train to Central leaves at 4:20.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q128",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "They will visit the museum next month.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q129",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The coach asked everyone to warm up.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q130",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Her presentation topic is climate change.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},
{
    "id": "q131",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The homework has three short questions.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide whether the statement is true."
},

{
    "id": "q132",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The class starts at nine twenty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q133",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The test has five questions.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q134",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "We meet in room fourteen.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q135",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "She brought a blue folder.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q136",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The bus leaves at four ten.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q137",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Practice is on Wednesday.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q138",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Please write full sentences.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q139",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The library closes at six.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q140",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Bring two pencils tomorrow.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q141",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Lunch break is at twelve thirty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q142",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The class starts at nine twenty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q143",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The test has five questions.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q144",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "We meet in room fourteen.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q145",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "She brought a blue folder.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q146",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The bus leaves at four ten.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q147",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Practice is on Wednesday.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q148",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Please write full sentences.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q149",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "The library closes at six.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q150",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Bring two pencils tomorrow.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
},
{
    "id": "q151",
    "type": "listenTrueFalse",
    "context": "Listen to the short statement.",
    "question": "Listen. True or False?",
    "say": "Lunch break is at twelve thirty.",
    "options": [
        "False",
        "True"
    ],
    "answer": 1,
    "difficulty": "medium",
    "explanation": "Decide if the statement is true."
}



  );
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
