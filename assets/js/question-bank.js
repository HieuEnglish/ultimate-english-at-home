/* assets/js/question-bank.js
   Central Question Repository for IELTS Runner & Campaign Mode.
   
   Structure:
   - level: 1-5 (approx A1, A2, B1, B2, C1/Advanced)
   - type: 'vocab' | 'grammar' | 'spelling' | 'listening'
   - question: Text prompt
   - answer: Correct string
   - distractors: Array of wrong strings
*/

export const MASTER_QUESTION_BANK = [
    // --- LEVEL 1 (A1 / Ages 0-5) ---
    { level: 1, type: "spelling", question: "🍎", answer: "Apple", distractors: ["Aple", "Aplle"] },
    { level: 1, type: "spelling", question: "🐶", answer: "Dog", distractors: ["Bog", "Dug"] },
    { level: 1, type: "vocab", question: "Opposite of 'Big'", answer: "Small", distractors: ["Tall", "Fat"] },
    { level: 1, type: "grammar", question: "She ___ playing.", answer: "is", distractors: ["are", "am"] },
    { level: 1, type: "vocab", question: "Color of the sky?", answer: "Blue", distractors: ["Green", "Red"] },
    { level: 1, type: "spelling", question: "🐱", answer: "Cat", distractors: ["Kat", "Cot"] },
    { level: 1, type: "vocab", question: "I eat ___.", answer: "Food", distractors: ["Car", "Sky"] },
    { level: 1, type: "grammar", question: "They ___ happy.", answer: "are", distractors: ["is", "am"] },
    { level: 1, type: "spelling", question: "🐟", answer: "Fish", distractors: ["Fis", "Fesh"] },
    { level: 1, type: "vocab", question: "We sleep in a ___.", answer: "Bed", distractors: ["Chair", "Table"] },
    { level: 1, type: "grammar", question: "I ___ a student.", answer: "am", distractors: ["is", "are"] },
    { level: 1, type: "vocab", question: "Opposite of 'Hot'", answer: "Cold", distractors: ["Warm", "Fast"] },
    { level: 1, type: "spelling", question: "🌞", answer: "Sun", distractors: ["Son", "San"] },
    { level: 1, type: "vocab", question: "A baby cat is a ___.", answer: "Kitten", distractors: ["Puppy", "Cub"] },
    { level: 1, type: "grammar", question: "He ___ my friend.", answer: "is", distractors: ["are", "am"] },
    { level: 1, type: "vocab", question: "We drink ___.", answer: "Water", distractors: ["Sand", "Paper"] },
    { level: 1, type: "spelling", question: "🐻", answer: "Bear", distractors: ["Beer", "Bare"] },
    { level: 1, type: "vocab", question: "Opposite of 'Up'", answer: "Down", distractors: ["Left", "Right"] },
    { level: 1, type: "grammar", question: "We ___ going home.", answer: "are", distractors: ["is", "am"] },
    { level: 1, type: "vocab", question: "A baby dog is a ___.", answer: "Puppy", distractors: ["Kitten", "Calf"] },
    { level: 1, type: "spelling", question: "🌙", answer: "Moon", distractors: ["Mone", "Mune"] },
    { level: 1, type: "vocab", question: "We write with a ___.", answer: "Pen", distractors: ["Cup", "Hat"] },
    { level: 1, type: "grammar", question: "It ___ raining.", answer: "is", distractors: ["are", "am"] },
    { level: 1, type: "vocab", question: "Opposite of 'Happy'", answer: "Sad", distractors: ["Glad", "Fun"] },
    { level: 1, type: "spelling", question: "🐸", answer: "Frog", distractors: ["Forg", "Frug"] },

    // --- LEVEL 2 (A2 / Ages 6-9) ---
    { level: 2, type: "grammar", question: "Yesterday, I ___ to school.", answer: "walked", distractors: ["walk", "walking"] },
    { level: 2, type: "vocab", question: "A place to read books.", answer: "Library", distractors: ["Kitchen", "Gym"] },
    { level: 2, type: "spelling", question: "Eight - Three = ?", answer: "Five", distractors: ["Fighve", "Fiv"] },
    { level: 2, type: "vocab", question: "Sisters and Brothers are...", answer: "Siblings", distractors: ["Parents", "Cousins"] },
    { level: 2, type: "grammar", question: "He doesn't ___ pizza.", answer: "like", distractors: ["likes", "liking"] },
    { level: 2, type: "spelling", question: "Correct spelling?", answer: "Because", distractors: ["Becoz", "Becuse"] },
    { level: 2, type: "vocab", question: "Very cold water.", answer: "Ice", distractors: ["Steam", "Rain"] },
    { level: 2, type: "grammar", question: "She ___ to the park every day.", answer: "goes", distractors: ["go", "going"] },
    { level: 2, type: "vocab", question: "The opposite of 'fast'.", answer: "Slow", distractors: ["Quick", "Loud"] },
    { level: 2, type: "spelling", question: "Correct spelling?", answer: "Friend", distractors: ["Freind", "Frend"] },
    { level: 2, type: "grammar", question: "We ___ playing in the park.", answer: "were", distractors: ["was", "is"] },
    { level: 2, type: "vocab", question: "A doctor works in a ___.", answer: "Hospital", distractors: ["School", "Farm"] },
    { level: 2, type: "grammar", question: "There ___ two cats on the sofa.", answer: "are", distractors: ["is", "was"] },
    { level: 2, type: "vocab", question: "You wear this on your head.", answer: "Hat", distractors: ["Shoe", "Glove"] },
    { level: 2, type: "spelling", question: "Correct spelling?", answer: "Elephant", distractors: ["Elefant", "Elephent"] },
    { level: 2, type: "vocab", question: "A person who teaches.", answer: "Teacher", distractors: ["Doctor", "Farmer"] },
    { level: 2, type: "grammar", question: "I ___ homework last night.", answer: "did", distractors: ["do", "doing"] },
    { level: 2, type: "vocab", question: "You wear these on your feet.", answer: "Shoes", distractors: ["Gloves", "Hats"] },
    { level: 2, type: "spelling", question: "Correct spelling?", answer: "Beautiful", distractors: ["Beautifull", "Beutiful"] },
    { level: 2, type: "grammar", question: "She ___ not come yesterday.", answer: "did", distractors: ["does", "do"] },
    { level: 2, type: "vocab", question: "The opposite of 'old'.", answer: "Young", distractors: ["New", "Small"] },
    { level: 2, type: "spelling", question: "Correct spelling?", answer: "Wednesday", distractors: ["Wendsday", "Wensday"] },
    { level: 2, type: "vocab", question: "A very tall building.", answer: "Skyscraper", distractors: ["Cottage", "Tent"] },
    { level: 2, type: "grammar", question: "Can you ___ me the time?", answer: "tell", distractors: ["told", "telling"] },
    { level: 2, type: "vocab", question: "The season after summer.", answer: "Autumn", distractors: ["Spring", "Winter"] },

    // --- LEVEL 3 (B1 / Ages 10-12) ---
    { level: 3, type: "grammar", question: "If it rains, we ___ inside.", answer: "will stay", distractors: ["stayed", "staying"] },
    { level: 3, type: "vocab", question: "Synonym for 'Difficult'", answer: "Hard", distractors: ["Easy", "Soft"] },
    { level: 3, type: "spelling", question: "Missing letter: G_ant", answer: "i", distractors: ["e", "y"] },
    { level: 3, type: "grammar", question: "I have ___ this movie.", answer: "seen", distractors: ["saw", "see"] },
    { level: 3, type: "vocab", question: "Someone who flies a plane.", answer: "Pilot", distractors: ["Driver", "Chef"] },
    { level: 3, type: "grammar", question: "She is ___ than her sister.", answer: "taller", distractors: ["more tall", "tallest"] },
    { level: 3, type: "vocab", question: "To 'repair' something means to ___.", answer: "Fix", distractors: ["Break", "Lose"] },
    { level: 3, type: "grammar", question: "They have been living here ___ 2015.", answer: "since", distractors: ["for", "from"] },
    { level: 3, type: "vocab", question: "Antonym for 'Ancient'", answer: "Modern", distractors: ["Old", "Classic"] },
    { level: 3, type: "spelling", question: "Correct spelling?", answer: "February", distractors: ["Febuary", "Febrary"] },
    { level: 3, type: "grammar", question: "She ___ her homework when I called.", answer: "was doing", distractors: ["did", "does"] },
    { level: 3, type: "vocab", question: "A person who studies stars.", answer: "Astronomer", distractors: ["Astrologer", "Astronaut"] },
    { level: 3, type: "grammar", question: "I wish I ___ taller.", answer: "were", distractors: ["was", "am"] },
    { level: 3, type: "vocab", question: "To 'postpone' is to ___.", answer: "Delay", distractors: ["Cancel", "Rush"] },
    { level: 3, type: "spelling", question: "Correct spelling?", answer: "Necessary", distractors: ["Neccessary", "Necesary"] },
    { level: 3, type: "vocab", question: "Synonym for 'Brave'", answer: "Courageous", distractors: ["Scared", "Nervous"] },
    { level: 3, type: "grammar", question: "He ___ already finished his work.", answer: "has", distractors: ["have", "had"] },
    { level: 3, type: "vocab", question: "A group of fish is called a ___.", answer: "School", distractors: ["Pack", "Flock"] },
    { level: 3, type: "spelling", question: "Correct spelling?", answer: "Definitely", distractors: ["Definately", "Definatly"] },
    { level: 3, type: "grammar", question: "If I ___ you, I would study harder.", answer: "were", distractors: ["was", "am"] },
    { level: 3, type: "vocab", question: "Antonym for 'Generous'", answer: "Stingy", distractors: ["Kind", "Wealthy"] },
    { level: 3, type: "grammar", question: "She asked me ___ I liked the book.", answer: "whether", distractors: ["weather", "that"] },
    { level: 3, type: "vocab", question: "A person who writes books.", answer: "Author", distractors: ["Reader", "Editor"] },
    { level: 3, type: "spelling", question: "Correct spelling?", answer: "Environment", distractors: ["Enviroment", "Enviornment"] },
    { level: 3, type: "grammar", question: "You ___ to brush your teeth twice a day.", answer: "ought", distractors: ["should", "must"] },

    // --- LEVEL 4 (B2 / Ages 13-15) ---
    { level: 4, type: "vocab", question: "Synonym: 'Essential'", answer: "Necessary", distractors: ["Optional", "Extra"] },
    { level: 4, type: "grammar", question: "He asked me where ___.", answer: "I was", distractors: ["was I", "am I"] },
    { level: 4, type: "spelling", question: "Choose the correct one.", answer: "Embarrass", distractors: ["Embarass", "Embaras"] },
    { level: 4, type: "grammar", question: "By 2030, we ___ arrived.", answer: "will have", distractors: ["had", "have"] },
    { level: 4, type: "vocab", question: "To 'give up' means...", answer: "Quit", distractors: ["Start", "Win"] },
    { level: 4, type: "vocab", question: "Antonym: 'Generous'", answer: "Selfish", distractors: ["Kind", "Rich"] },
    { level: 4, type: "grammar", question: "Neither John ___ Mary.", answer: "nor", distractors: ["or", "and"] },
    { level: 4, type: "vocab", question: "'Break the ice' means...", answer: "Start a conversation", distractors: ["Freeze water", "Cause trouble"] },
    { level: 4, type: "grammar", question: "She ___ here for three years now.", answer: "has been", distractors: ["is", "was"] },
    { level: 4, type: "vocab", question: "'Ubiquitous' means...", answer: "Found everywhere", distractors: ["Very rare", "Invisible"] },
    { level: 4, type: "spelling", question: "Correct spelling?", answer: "Accommodate", distractors: ["Accomodate", "Acomodate"] },
    { level: 4, type: "grammar", question: "I'd rather you ___ later.", answer: "came", distractors: ["come", "coming"] },
    { level: 4, type: "vocab", question: "'Hit the nail on the head' means...", answer: "Be exactly right", distractors: ["Use a hammer", "Make a mistake"] },
    { level: 4, type: "grammar", question: "Not only did he win, ___ he set a record.", answer: "but", distractors: ["and", "so"] },
    { level: 4, type: "vocab", question: "A 'consensus' is...", answer: "General agreement", distractors: ["A debate", "A census count"] },
    { level: 4, type: "spelling", question: "Correct spelling?", answer: "Occurrence", distractors: ["Occurence", "Ocurrence"] },
    { level: 4, type: "vocab", question: "'Bite the bullet' means...", answer: "Face something difficult", distractors: ["Eat something hard", "Be aggressive"] },
    { level: 4, type: "grammar", question: "Hardly ___ she arrived when it started raining.", answer: "had", distractors: ["has", "did"] },
    { level: 4, type: "vocab", question: "'Meticulous' means...", answer: "Very careful and precise", distractors: ["Careless", "Fast"] },
    { level: 4, type: "spelling", question: "Correct spelling?", answer: "Privilege", distractors: ["Priviledge", "Privelege"] },
    { level: 4, type: "grammar", question: "She insisted ___ paying the bill.", answer: "on", distractors: ["for", "to"] },
    { level: 4, type: "vocab", question: "'Burning the midnight oil' means...", answer: "Working late", distractors: ["Cooking at night", "Wasting fuel"] },
    { level: 4, type: "grammar", question: "I wish I ___ started earlier.", answer: "had", distractors: ["have", "would"] },
    { level: 4, type: "vocab", question: "A 'dilemma' is...", answer: "A difficult choice", distractors: ["An easy task", "A type of illness"] },
    { level: 4, type: "spelling", question: "Correct spelling?", answer: "Mischievous", distractors: ["Mischevious", "Mischievious"] },

    // --- LEVEL 5 (C1 / Advanced) ---
    { level: 5, type: "vocab", question: "Ephemeral means...", answer: "Short-lived", distractors: ["Eternal", "Heavy"] },
    { level: 5, type: "grammar", question: "Had I known, I ___ gone.", answer: "would have", distractors: ["will have", "would"] },
    { level: 5, type: "spelling", question: "Correct spelling?", answer: "Entrepreneur", distractors: ["Entreprenur", "Enterpreneur"] },
    { level: 5, type: "vocab", question: "A 'plethora' is...", answer: "A lot", distractors: ["A few", "A disease"] },
    { level: 5, type: "grammar", question: "Scarcely had he left ___ it rained.", answer: "when", distractors: ["than", "then"] },
    { level: 5, type: "vocab", question: "To 'scrutinize' is to...", answer: "Examine", distractors: ["Ignore", "Touch"] },
    { level: 5, type: "spelling", question: "Correct spelling?", answer: "Bureaucracy", distractors: ["Bereaucracy", "Buraucracy"] },
    { level: 5, type: "vocab", question: "'Ameliorate' means...", answer: "Improve", distractors: ["Worsen", "Measure"] },
    { level: 5, type: "grammar", question: "Under no circumstances ___ leave early.", answer: "should you", distractors: ["you should", "you will"] },
    { level: 5, type: "vocab", question: "'Pragmatic' means...", answer: "Practical", distractors: ["Idealistic", "Dramatic"] },
    { level: 5, type: "spelling", question: "Correct spelling?", answer: "Conscientious", distractors: ["Consciencious", "Consientious"] },
    { level: 5, type: "grammar", question: "So difficult was the test ___ nobody passed.", answer: "that", distractors: ["which", "what"] },
    { level: 5, type: "vocab", question: "'Exacerbate' means to ___.", answer: "Make worse", distractors: ["Solve", "Celebrate"] },
    { level: 5, type: "vocab", question: "'Juxtapose' means to ___.", answer: "Place side by side", distractors: ["Separate", "Hide"] },
    { level: 5, type: "grammar", question: "Little ___ he know about the surprise.", answer: "did", distractors: ["does", "was"] },
    { level: 5, type: "spelling", question: "Correct spelling?", answer: "Onomatopoeia", distractors: ["Onomatapoeia", "Onomatopeia"] },
    { level: 5, type: "vocab", question: "A 'dichotomy' is a ___.", answer: "Division into two", distractors: ["Type of book", "Medical tool"] },
    { level: 5, type: "grammar", question: "Were it not ___ his help, I'd have failed.", answer: "for", distractors: ["of", "to"] },
    { level: 5, type: "vocab", question: "'Perfunctory' means...", answer: "Done without care", distractors: ["Done perfectly", "Done slowly"] },
    { level: 5, type: "grammar", question: "No sooner had she arrived ___ she left.", answer: "than", distractors: ["when", "that"] },
    { level: 5, type: "vocab", question: "'Surreptitious' means...", answer: "Done secretly", distractors: ["Done loudly", "Done openly"] },
    { level: 5, type: "spelling", question: "Correct spelling?", answer: "Acquaintance", distractors: ["Aquaintance", "Acquantance"] },
    { level: 5, type: "vocab", question: "'Obfuscate' means to ___.", answer: "Make unclear", distractors: ["Clarify", "Delete"] },
    { level: 5, type: "grammar", question: "Only after finishing ___ he realize his mistake.", answer: "did", distractors: ["had", "was"] },
    { level: 5, type: "vocab", question: "'Laconic' means...", answer: "Using few words", distractors: ["Very talkative", "Very emotional"] },
    { level: 5, type: "spelling", question: "Correct spelling?", answer: "Connoisseur", distractors: ["Connoiseur", "Conoisseur"] },
    { level: 5, type: "vocab", question: "'Equivocal' means...", answer: "Ambiguous", distractors: ["Clear", "Equal"] },
];

export function getQuestionsForLevel(level) {
    return MASTER_QUESTION_BANK.filter(q => q.level === level);
}

export function getRandomQuestion(minLevel = 1, maxLevel = 5) {
    const pool = MASTER_QUESTION_BANK.filter(q => q.level >= minLevel && q.level <= maxLevel);
    if (!pool.length) return MASTER_QUESTION_BANK[0];
    return pool[Math.floor(Math.random() * pool.length)];
}
