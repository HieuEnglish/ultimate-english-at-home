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

    // --- LEVEL 2 (A2 / Ages 6-9) ---
    { level: 2, type: "grammar", question: "Yesterday, I ___ to school.", answer: "walked", distractors: ["walk", "walking"] },
    { level: 2, type: "vocab", question: "A place to read books.", answer: "Library", distractors: ["Kitchen", "Gym"] },
    { level: 2, type: "spelling", question: "Eight - Three = ?", answer: "Five", distractors: ["Fighve", "Fiv"] },
    { level: 2, type: "vocab", question: "Sisters and Brothers are...", answer: "Siblings", distractors: ["Parents", "Cousins"] },
    { level: 2, type: "grammar", question: "He doesn't ___ pizza.", answer: "like", distractors: ["likes", "liking"] },
    { level: 2, type: "spelling", question: "Correct spelling?", answer: "Because", distractors: ["Becoz", "Becuse"] },
    { level: 2, type: "vocab", question: "Very cold water.", answer: "Ice", distractors: ["Steam", "Rain"] },

    // --- LEVEL 3 (B1 / Ages 10-12) ---
    { level: 3, type: "grammar", question: "If it rains, we ___ inside.", answer: "will stay", distractors: ["stayed", "staying"] },
    { level: 3, type: "vocab", question: "Synonym for 'Difficult'", answer: "Hard", distractors: ["Easy", "Soft"] },
    { level: 3, type: "spelling", question: "Missing letter: G_ant", answer: "i", distractors: ["e", "y"] },
    { level: 3, type: "grammar", question: "I have ___ this movie.", answer: "seen", distractors: ["saw", "see"] },
    { level: 3, type: "vocab", question: "Someone who flies a plane.", answer: "Pilot", distractors: ["Driver", "Chef"] },
    { level: 3, type: "grammar", question: "More ___ than", answer: "beautiful", distractors: ["beauty", "beautier"] },
    { level: 3, type: "vocab", question: "Use simple ___ complicated.", answer: "vs", distractors: ["or", "and"] },

    // --- LEVEL 4 (B2 / Ages 13-15) ---
    { level: 4, type: "vocab", question: "Synonym: 'Essential'", answer: "Necessary", distractors: ["Optional", "Extra"] },
    { level: 4, type: "grammar", question: "He asked me where ___.", answer: "I was", distractors: ["was I", "am I"] },
    { level: 4, type: "spelling", question: "Choose the correct one.", answer: "Embarrass", distractors: ["Embarass", "Embaras"] },
    { level: 4, type: "grammar", question: "By 2030, we ___ arrived.", answer: "will have", distractors: ["had", "have"] },
    { level: 4, type: "vocab", question: "To 'give up' means...", answer: "Quit", distractors: ["Start", "Win"] },
    { level: 4, type: "vocab", question: "Antonym: 'Generous'", answer: "Selfish", distractors: ["Kind", "Rich"] },
    { level: 4, type: "grammar", question: "Neither John ___ Mary.", answer: "nor", distractors: ["or", "and"] },

    // --- LEVEL 5 (C1 / Advanced) ---
    { level: 5, type: "vocab", question: "Ephemeral means...", answer: "Short-lived", distractors: ["Eternal", "Heavy"] },
    { level: 5, type: "grammar", question: "Had I known, I ___ gone.", answer: "would have", distractors: ["will have", "would"] },
    { level: 5, type: "spelling", question: "Correct spelling?", answer: "Entrepreneur", distractors: ["Entreprenur", "Enterpreneur"] },
    { level: 5, type: "vocab", question: "A 'plethora' is...", answer: "A lot", distractors: ["A few", "A disease"] },
    { level: 5, type: "grammar", question: "Scarcely had he left ___ it rained.", answer: "when", distractors: ["than", "then"] },
    { level: 5, type: "vocab", question: "To 'scrutinize' is to...", answer: "Examine", distractors: ["Ignore", "Touch"] },
    { level: 5, type: "spelling", question: "Correct spelling?", answer: "Bureaucracy", distractors: ["Bereaucracy", "Buraucracy"] }
];

export function getQuestionsForLevel(level) {
    return MASTER_QUESTION_BANK.filter(q => q.level === level);
}

export function getRandomQuestion(minLevel = 1, maxLevel = 5) {
    const pool = MASTER_QUESTION_BANK.filter(q => q.level >= minLevel && q.level <= maxLevel);
    if (!pool.length) return MASTER_QUESTION_BANK[0];
    return pool[Math.floor(Math.random() * pool.length)];
}
