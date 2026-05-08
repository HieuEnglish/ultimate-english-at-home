/* assets/js/games-store.js
   UEAH Games Store - Registry of all games with metadata
   
   Provides:
   - Game registry with metadata (slug, title, age, skill, difficulty, emoji)
   - Helpers: getGamesByAge, getGamesByAgeSkill, getGame
*/

(function () {
    "use strict";

    // Game registry - Phase 1 games
    const GAMES = [
        // ========== Age 0-3 (Tap + Listen) ==========
        {
            slug: "tap-the-sound",
            title: "Tap the Sound",
            emoji: "📱",
            age: "0-3",
            skill: "listening",
            difficulty: 1,
            description: "Listen to the sound and tap the right picture!",
            hasTimer: false,
        },
        {
            slug: "action-beats",
            title: "Action Beats",
            emoji: "🎵",
            age: "0-3",
            skill: "listening",
            difficulty: 1,
            description: "Press the buttons to make the DJ dance! Clap, Jump, Wiggle!",
            hasTimer: false,
        },
        {
            slug: "color-match",
            title: "Color Match",
            emoji: "🎨",
            age: "0-3",
            skill: "vocabulary",
            difficulty: 1,
            description: "Match the colors to the magical objects!",
            hasTimer: false,
        },
        {
            slug: "body-parts",
            title: "Body Parts",
            emoji: "👃",
            age: "0-3",
            skill: "vocabulary",
            difficulty: 1,
            description: "Learn body parts with a friendly character!",
            hasTimer: false,
        },
        {
            slug: "animal-sounds",
            title: "Animal Sounds",
            emoji: "🐶",
            age: "0-3",
            skill: "listening",
            difficulty: 1,
            description: "Who says that? Match animals to sounds!",
            hasTimer: false,
        },
        // NEW 0-3 Games
        { slug: "animal-dance", title: "Animal Dance", emoji: "💃🐶", age: "0-3", skill: "listening", difficulty: 1, description: "Dance with animals!", hasTimer: false },
        { slug: "baby-piano", title: "Baby Piano", emoji: "🎹", age: "0-3", skill: "listening", difficulty: 1, description: "Play simple notes.", hasTimer: false },
        { slug: "peekaboo-pets", title: "Peekaboo Pets", emoji: "🫣", age: "0-3", skill: "vocabulary", difficulty: 1, description: "Who is hiding?", hasTimer: false },
        { slug: "fruit-basket", title: "Fruit Basket", emoji: "🍎", age: "0-3", skill: "vocabulary", difficulty: 1, description: "Pick the yummy fruits.", hasTimer: false },
        { slug: "shape-sorter", title: "Shape Sorter", emoji: "🔺", age: "0-3", skill: "vocabulary", difficulty: 1, description: "Match shapes to holes.", hasTimer: false },

        // 4-7 Years
        {
            slug: "picture-bingo",
            title: "Bingo Bash",
            emoji: "🎯",
            age: "4-7",
            skill: "vocabulary",
            difficulty: 2,
            description: "Listen for the word and find it on your Bingo card!",
            hasTimer: false,
        },
        {
            slug: "rhyme-rocket",
            title: "Rhyme Rocket",
            emoji: "🚀",
            age: "4-7",
            skill: "reading",
            difficulty: 2,
            description: "Fuel the rocket by finding rhyming words!",
            hasTimer: false,
        },
        // NEW 4-7 Games
        { slug: "sight-word-safari", title: "Sight Word Safari", emoji: "🦁", age: "4-7", skill: "reading", difficulty: 2, description: "Spot sight words!", hasTimer: true },
        { slug: "story-stones", title: "Story Stones", emoji: "🪨", age: "4-7", skill: "reading", difficulty: 2, description: "Make a sentence.", hasTimer: false },
        { slug: "alphabet-soup", title: "Alphabet Soup", emoji: "🍜", age: "4-7", skill: "spelling", difficulty: 2, description: "Find letters in the soup.", hasTimer: true },
        { slug: "rhyme-time", title: "Rhyme Time", emoji: "🕰️", age: "4-7", skill: "reading", difficulty: 2, description: "Match rhyming pictures.", hasTimer: true },
        { slug: "picture-pairs", title: "Picture Pairs", emoji: "👯", age: "4-7", skill: "vocabulary", difficulty: 2, description: "Find matching pair.", hasTimer: false },
        { slug: "word-detective", title: "Word Detective", emoji: "🕵️‍♀️", age: "4-7", skill: "reading", difficulty: 2, description: "Find the word.", hasTimer: true },

        // ========== Age 4-7 (Early Reading + Spelling) ==========
        {
            slug: "spelling-bee",
            title: "Spelling Bee",
            emoji: "🐝🔤",
            age: "4-7",
            skill: "spelling",
            difficulty: 2,
            description: "See a picture, spell the word!",
            hasTimer: false,
        },
        {
            slug: "concentration",
            title: "Concentration",
            emoji: "🧠🃏",
            age: "4-7",
            skill: "vocabulary",
            difficulty: 2,
            description: "Memory match: words and pictures!",
            hasTimer: false,
        },
        {
            slug: "phonics-pop",
            title: "Phonics Pop",
            emoji: "🔤🎈",
            age: "4-7",
            skill: "spelling",
            difficulty: 2,
            description: "Pop the balloon with the right sound!",
            hasTimer: true,
        },
        {
            slug: "balloon-pop",
            title: "Balloon Pop",
            emoji: "🎈🔤",
            age: "4-7",
            skill: "spelling",
            difficulty: 2,
            description: "Pop balloons to spell words!",
            hasTimer: true,
        },
        {
            slug: "memory-match",
            title: "Memory Match",
            emoji: "🃏🧠",
            age: "4-7",
            skill: "vocabulary",
            difficulty: 2,
            description: "Match matched cards!",
            hasTimer: false,
        },

        // ========== Age 8-10 (Vocab + Sentence Building) ==========
        {
            slug: "hangman",
            title: "Hangman",
            emoji: "🪢🔤",
            age: "8-10",
            skill: "spelling",
            difficulty: 3,
            description: "Guess letters to reveal the word!",
            hasTimer: false,
        },
        {
            slug: "word-search",
            title: "Word Search",
            emoji: "🔎🧩",
            age: "8-10",
            skill: "vocabulary",
            difficulty: 3,
            description: "Find hidden words in the grid!",
            hasTimer: true,
        },
        {
            slug: "word-ladder",
            title: "Ladder Climber",
            emoji: "🪜",
            age: "8-10",
            skill: "spelling",
            difficulty: 3,
            description: "Change one letter at a time to climb the ladder!",
            hasTimer: true,
        },
        {
            slug: "fast-phrases",
            title: "Sentence Builder",
            emoji: "🏗️",
            age: "8-10",
            skill: "grammar",
            difficulty: 3,
            description: "Build a strong wall with correct sentences!",
            hasTimer: true,
        },
        {
            slug: "synonym-sprint",
            title: "Synonym Sprint",
            emoji: "🏃",
            age: "8-10",
            skill: "vocabulary",
            difficulty: 3,
            description: "Race and jump over obstacles by picking synonyms!",
            hasTimer: true,
        },
        {
            slug: "word-scramble",
            title: "Word Scramble",
            emoji: "🔀🔤",
            age: "8-10",
            skill: "spelling",
            difficulty: 3,
            description: "Unscramble the letters!",
            hasTimer: true,
        },
        {
            slug: "speed-typing",
            title: "Speed Typing",
            emoji: "⌨️⚡",
            age: "8-10",
            skill: "grammar",
            difficulty: 3,
            description: "Type words fast!",
            hasTimer: true,
        },
        // NEW 8-10 Games
        { slug: "verb-viper", title: "Verb Viper", emoji: "🐍", age: "8-10", skill: "grammar", difficulty: 3, description: "Catch the correct tense.", hasTimer: true },
        { slug: "noun-ninja", title: "Noun Ninja", emoji: "🗡️", age: "8-10", skill: "grammar", difficulty: 3, description: "Slice the nouns.", hasTimer: true },
        { slug: "word-wizard", title: "Word Wizard", emoji: "🧙", age: "8-10", skill: "spelling", difficulty: 3, description: "Cast spelling spells.", hasTimer: true },
        { slug: "sentence-surgeon", title: "Sentence Surgeon", emoji: "🩺", age: "8-10", skill: "grammar", difficulty: 3, description: "Fix broken sentences.", hasTimer: false },
        { slug: "vocab-volcano", title: "Vocab Volcano", emoji: "🌋", age: "8-10", skill: "vocabulary", difficulty: 3, description: "Don't let lava rise!", hasTimer: true },
        { slug: "antonym-archer", title: "Antonym Archer", emoji: "🏹", age: "8-10", skill: "vocabulary", difficulty: 3, description: "Shoot the opposite.", hasTimer: true },

        // ========== Age 11-12 (Grammar Systems) ==========
        {
            slug: "sentence-shuffle",
            title: "Magnetic Poetry",
            emoji: "🧲",
            age: "11-12",
            skill: "grammar",
            difficulty: 4,
            description: "Arrange the magnets to form correct sentences.",
            hasTimer: true,
        },
        {
            slug: "idiom-match",
            title: "Idiom Alchemist",
            emoji: "🧪",
            age: "11-12",
            skill: "vocabulary",
            difficulty: 4,
            description: "Mix potions by matching idioms to meanings! Don't explode!",
            hasTimer: false,
        },
        {
            slug: "sound-lab",
            title: "Sound Lab",
            emoji: "🎚️",
            age: "11-12",
            skill: "listening",
            difficulty: 4,
            description: "Ship or Sheep? Analyze sound waves to hear the difference.",
            hasTimer: false,
        },
        {
            slug: "tense-race",
            title: "Tense Race",
            emoji: "⏱️",
            age: "11-12",
            skill: "grammar",
            difficulty: 4,
            description: "Convert sentences against the clock.",
            hasTimer: true,
        },
        {
            slug: "code-breaker",
            title: "Code Breaker",
            emoji: "🕵️",
            age: "11-12",
            skill: "reading",
            difficulty: 5,
            description: "Decipher the secret messages using grammar clues!",
            hasTimer: true,
        },
        {
            slug: "grammar-ninja",
            title: "Grammar Ninja",
            emoji: "🥷⚔️",
            age: "11-12",
            skill: "grammar",
            difficulty: 4,
            description: "Slice grammar errors!",
            hasTimer: true,
        },
        {
            slug: "type-racer",
            title: "Type Racer",
            emoji: "🏎️⌨️",
            age: "11-12",
            skill: "grammar",
            difficulty: 4,
            description: "Race cars by typing precision!",
            hasTimer: false,
        },
        // NEW 11-12 Games
        { slug: "grammar-gladiator", title: "Grammar Gladiator", emoji: "🛡️", age: "11-12", skill: "grammar", difficulty: 4, description: "Battle errors.", hasTimer: true },
        { slug: "lyric-listener", title: "Lyric Listener", emoji: "🎧", age: "11-12", skill: "listening", difficulty: 4, description: "Fill missing lyrics.", hasTimer: true },
        { slug: "dictation-dash", title: "Dictation Dash", emoji: "🏃💨", age: "11-12", skill: "listening", difficulty: 4, description: "Type what you hear.", hasTimer: true },
        { slug: "accent-ace", title: "Accent Ace", emoji: "🌍", age: "11-12", skill: "listening", difficulty: 4, description: "Identify accents.", hasTimer: false },
        { slug: "root-racer", title: "Root Racer", emoji: "🌳", age: "11-12", skill: "vocabulary", difficulty: 4, description: "Identify root words.", hasTimer: true },
        { slug: "context-clues", title: "Context Clues", emoji: "🔍", age: "11-12", skill: "vocabulary", difficulty: 4, description: "Guess meaning from context.", hasTimer: true },
        { slug: "phrasal-verb-phantom", title: "Phrasal Phantom", emoji: "👻", age: "11-12", skill: "vocabulary", difficulty: 4, description: "Catch prepositions.", hasTimer: true },

        // ========== Age 13-18 (Speaking + Advanced) ==========
        {
            slug: "essay-builder",
            title: "Essay Builder",
            emoji: "📝✨",
            age: "13-18",
            skill: "grammar",
            difficulty: 5,
            description: "Order paragraphs logically!",
            hasTimer: false,
        },
        {
            slug: "debate-prep",
            title: "Debate Prep",
            emoji: "🎤⚖️",
            age: "13-18",
            skill: "vocabulary",
            difficulty: 5,
            description: "Sort arguments for/against!",
            hasTimer: true,
        },
        {
            slug: "pronunciation-pro",
            title: "Pronunciation Pro",
            emoji: "🎙️✅",
            age: "13-18",
            skill: "speaking",
            difficulty: 5,
            description: "Practice pronunciation with speech recognition!",
            hasTimer: false,
            usesMicrophone: true,
        },
        {
            slug: "vocab-quest",
            title: "Vocab Quest",
            emoji: "⚔️📚",
            age: "13-18",
            skill: "vocabulary",
            difficulty: 5,
            description: "RPG-style vocabulary battles!",
            hasTimer: false,
        },
        {
            slug: "debate-cards",
            title: "Debate Cards",
            emoji: "🗣️",
            age: "13-18",
            skill: "speaking",
            difficulty: 5,
            description: "Swipe to choose your stance on controversial topics.",
            hasTimer: false,
        },
        {
            slug: "logic-tower",
            title: "Logic Tower",
            emoji: "🏯",
            age: "13-18",
            skill: "writing",
            difficulty: 5,
            description: "Stack arguments in the correct logical order to build the tower.",
            hasTimer: false,
        },
        {
            slug: "news-anchor",
            title: "News Anchor",
            emoji: "📺",
            age: "13-18",
            skill: "vocabulary",
            difficulty: 5,
            description: "Deliver the news! Fill in the blanks with professional vocabulary.",
            hasTimer: true,
        },
        // NEW 13-18 Games
        { slug: "debate-duel", title: "Debate Duel", emoji: "🤺", age: "13-18", skill: "speaking", difficulty: 5, description: "Counter arguments.", hasTimer: true },
        { slug: "interview-simulator", title: "Interview Sim", emoji: "🤝", age: "13-18", skill: "speaking", difficulty: 5, description: "Ace the interview.", hasTimer: false },
        { slug: "speech-coach", title: "Speech Coach", emoji: "🗣️", age: "13-18", skill: "speaking", difficulty: 5, description: "Practice pacing.", hasTimer: false },
        { slug: "thesis-thinker", title: "Thesis Thinker", emoji: "🧠", age: "13-18", skill: "writing", difficulty: 5, description: "Draft thesis statements.", hasTimer: false },
        { slug: "transition-titan", title: "Transition Titan", emoji: "🔗", age: "13-18", skill: "writing", difficulty: 5, description: "Pick transition words.", hasTimer: false },
        { slug: "paragraph-puzzle", title: "Paragraph Puzzle", emoji: "🧩", age: "13-18", skill: "writing", difficulty: 5, description: "Order sentences.", hasTimer: false },
        { slug: "news-editor", title: "News Editor", emoji: "📰", age: "13-18", skill: "grammar", difficulty: 5, description: "Correct headlines.", hasTimer: true },
        { slug: "tone-tuner", title: "Tone Tuner", emoji: "🎛️", age: "13-18", skill: "grammar", difficulty: 5, description: "Adjust formality.", hasTimer: false },

        // ========== FEATURED ==========
        {
            slug: "ielts-runner",
            title: "IELTS Sky Quest",
            emoji: "AIR",
            age: "featured",
            skill: "comprehensive",
            difficulty: 5,
            description: "Fly the imported Tiny Skies open world, collect IELTS question markers, and gain or lose points.",
            hasTimer: false,
        },
    ];

    // Get all games for an age group
    function getGamesByAge(age) {
        return GAMES.filter((g) => g.age === age);
    }

    // Get games for age + skill
    function getGamesByAgeSkill(age, skill) {
        return GAMES.filter((g) => g.age === age && g.skill === skill);
    }

    // Get skills that have games for an age
    function getSkillsForAge(age) {
        const games = getGamesByAge(age);
        const skills = [...new Set(games.map((g) => g.skill))];
        return skills;
    }

    // Get a specific game
    function getGame(age, skill, slug) {
        return GAMES.find((g) => g.age === age && g.skill === skill && g.slug === slug) || null;
    }

    // Get game by slug only (for quick lookup)
    function getGameBySlug(slug) {
        return GAMES.find((g) => g.slug === slug) || null;
    }

    // Get all games
    function getAllGames() {
        return [...GAMES];
    }

    // Expose globally
    window.UEAH_GAMES_STORE = {
        getGamesByAge,
        getGamesByAgeSkill,
        getSkillsForAge,
        getGame,
        getGameBySlug,
        getAllGames,
        GAMES,
    };
})();
