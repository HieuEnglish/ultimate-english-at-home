/* assets/js/games/4-7/story-stones.js
   Story Stones - Ages 4-7
   
   Build simple sentences by picking the right stone.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
    { text: "The __ is red.", answer: "Apple", options: ["Apple", "Moon", "Grass"], emoji: "🍎" },
    { text: "I see a __.", answer: "Dog", options: ["Dog", "Car", "Sun"], emoji: "🐶" },
    { text: "The __ is big.", answer: "Elephant", options: ["Elephant", "Ant", "Pin"], emoji: "🐘" },
    { text: "The __ shines.", answer: "Sun", options: ["Sun", "Book", "Chair"], emoji: "☀️" },
    { text: "I can __ fast.", answer: "Run", options: ["Run", "Sit", "Sleep"], emoji: "🏃" },
    { text: "The __ says meow.", answer: "Cat", options: ["Cat", "Cow", "Pig"], emoji: "🐱" },
    { text: "The __ is blue.", answer: "Sky", options: ["Sky", "Tree", "Banana"], emoji: "☁️" },
    { text: "A __ can fly.", answer: "Bird", options: ["Bird", "Fish", "Dog"], emoji: "🐦" },
    { text: "I eat __.", answer: "Food", options: ["Food", "Rock", "Toy"], emoji: "🍕" },
    { text: "The __ swims.", answer: "Fish", options: ["Fish", "Cat", "Bird"], emoji: "🐟" },
    { text: "The __ is yellow.", answer: "Banana", options: ["Banana", "Grape", "Berry"], emoji: "🍌" },
    { text: "I ride a __.", answer: "Bike", options: ["Bike", "Tree", "Ball"], emoji: "🚲" },
    { text: "The __ hops.", answer: "Frog", options: ["Frog", "Snake", "Fish"], emoji: "🐸" },
    { text: "I drink __.", answer: "Water", options: ["Water", "Rock", "Sand"], emoji: "💧" },
    { text: "The __ is round.", answer: "Ball", options: ["Ball", "Box", "Stick"], emoji: "⚽" },
    { text: "A __ gives milk.", answer: "Cow", options: ["Cow", "Dog", "Cat"], emoji: "🐄" },
    { text: "The __ is cold.", answer: "Ice", options: ["Ice", "Fire", "Sun"], emoji: "🧊" },
    { text: "I wear a __.", answer: "Shirt", options: ["Shirt", "Book", "Ball"], emoji: "👕" },
    { text: "The __ grows tall.", answer: "Tree", options: ["Tree", "Rock", "Fish"], emoji: "🌳" },
    { text: "I sleep in a __.", answer: "Bed", options: ["Bed", "Car", "Park"], emoji: "🛏️" },
    { text: "The __ is sweet.", answer: "Cake", options: ["Cake", "Rock", "Shoe"], emoji: "🍰" },
    { text: "A __ has wings.", answer: "Butterfly", options: ["Butterfly", "Dog", "Ball"], emoji: "🦋" },
    { text: "I write with a __.", answer: "Pen", options: ["Pen", "Cup", "Hat"], emoji: "🖊️" },
    { text: "The __ is hot.", answer: "Fire", options: ["Fire", "Ice", "Snow"], emoji: "🔥" },
    { text: "I sit on a __.", answer: "Chair", options: ["Chair", "Boat", "Tree"], emoji: "🪑" },
    { text: "The __ barks.", answer: "Dog", options: ["Dog", "Cat", "Fish"], emoji: "🐶" },
    { text: "I read a __.", answer: "Book", options: ["Book", "Cup", "Ball"], emoji: "📖" },
    { text: "The __ is green.", answer: "Grass", options: ["Grass", "Sky", "Sand"], emoji: "🌿" },
    { text: "A __ has four legs.", answer: "Cat", options: ["Cat", "Snake", "Bird"], emoji: "🐱" },
    { text: "I play with a __.", answer: "Toy", options: ["Toy", "Plate", "Lamp"], emoji: "🧸" },
    { text: "The __ is white.", answer: "Cloud", options: ["Cloud", "Fire", "Grass"], emoji: "☁️" },
    { text: "A __ lives in water.", answer: "Fish", options: ["Fish", "Dog", "Bird"], emoji: "🐟" },
    { text: "I eat with a __.", answer: "Spoon", options: ["Spoon", "Shoe", "Hat"], emoji: "🥄" },
    { text: "The __ is soft.", answer: "Pillow", options: ["Pillow", "Rock", "Key"], emoji: "🛏️" },
    { text: "A __ has a shell.", answer: "Turtle", options: ["Turtle", "Dog", "Bird"], emoji: "🐢" },
];

class StoryStonesGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentSentence = null;
        this.options = [];
        this.rounds = 0;
        this.maxRounds = 8;
        this.score = 0;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="river-bg">
                    <div class="water-flow"></div>
                </div>
                
                <div class="game-content">
                    <div class="header">
                        <div class="score-pill">⭐ <span id="score-val">0</span></div>
                    </div>

                    <div class="river-bank">
                        <div class="sentence-card">
                            <div class="image-hint" id="image-hint">❓</div>
                            <div class="sentence-text" id="sentence-text">The ___ is red.</div>
                        </div>
                    </div>
                    
                    <div class="stones-container" id="stones-area"></div>
                    
                    <button class="speaker-btn" id="hear-btn">🔊</button>
                    
                    <div class="character-guide">🐸</div>
                </div>

                <div class="celebration" id="celebration">
                    <span class="celeb-emoji" id="celeb-emoji">🌊</span>
                </div>
            </div>
        `;

        this.injectStyles();
        this.showStartOverlay();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-wrapper {
                position: relative;
                width: 100%;
                height: 600px;
                overflow: hidden;
                border-radius: 24px;
                background: #81ecec;
                font-family: 'Fredoka One', cursive, sans-serif;
            }
            .river-bg {
                position: absolute;
                inset: 0;
                background: linear-gradient(180deg, #81ecec 0%, #74b9ff 100%);
                z-index: 1;
            }
            .water-flow {
                position: absolute;
                width: 100%;
                height: 100%;
                background-image: linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.2) 75%, transparent 75%, transparent);
                background-size: 50px 50px;
                animation: flow 5s linear infinite;
                opacity: 0.3;
            }
            @keyframes flow { from { background-position: 0 0; } to { background-position: 50px 50px; } }
            
            .game-content {
                position: relative;
                z-index: 2;
                height: 100%;
                padding: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            
            .header {
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
            .score-pill {
                background: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                color: #0984e3;
            }
            
            .river-bank {
                margin-top: 40px;
                width: 100%;
                display: flex;
                justify-content: center;
            }
            .sentence-card {
                background: white;
                padding: 20px 40px;
                border-radius: 30px;
                display: flex;
                align-items: center;
                gap: 20px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                min-width: 300px;
                justify-content: center;
                border: 4px solid #fff;
            }
            .image-hint {
                font-size: 50px;
                width: 80px;
                height: 80px;
                background: #f1f2f6;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .sentence-text {
                font-size: 28px;
                color: #2d3436;
            }
            
            .stones-container {
                margin-top: 60px;
                display: flex;
                gap: 20px;
                justify-content: center;
            }
            
            .stone-btn {
                position: relative;
                width: 140px;
                height: 100px;
                background: #95a5a6;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 6px 0 #7f8c8d;
                transition: transform 0.2s;
            }
            .stone-btn::after {
                content: '';
                position: absolute;
                top: 10px;
                left: 20px;
                width: 30px;
                height: 10px;
                background: rgba(255,255,255,0.3);
                border-radius: 10px;
            }
            .stone-btn:hover { transform: translateY(-3px); }
            .stone-btn:active { transform: translateY(3px); box-shadow: none; }
            
            .stone-text {
                color: white;
                font-size: 20px;
                font-weight: bold;
                text-shadow: 0 2px 0 rgba(0,0,0,0.2);
            }
            
            .stone-btn.correct { background: #00b894; box-shadow: 0 6px 0 #00cec9; }
            .stone-btn.wrong { background: #e17055; box-shadow: 0 6px 0 #d63031; }
            
            .character-guide {
                position: absolute;
                bottom: 20px;
                right: 20px;
                font-size: 100px;
                animation: bounce 2s infinite;
            }
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
            
            .speaker-btn {
                margin-top: auto;
                background: white;
                border: none;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                font-size: 30px;
                cursor: pointer;
                box-shadow: 0 4px 0 rgba(0,0,0,0.1);
            }
            
            .celebration {
                position: absolute;
                inset: 0;
                background: rgba(0, 184, 148, 0.2);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
                z-index: 100;
            }
            .celebration.visible { opacity: 1; pointer-events: auto; }
            .celeb-emoji { font-size: 150px; animation: pop 0.5s; }
            @keyframes pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.score = 0;
        this.rounds = 0;

        // Add 3D rocks
        const geometry = new THREE.DodecahedronGeometry(0.5, 0);
        const material = new THREE.MeshLambertMaterial({ color: 0x95a5a6 });
        this.threeHelper.addFloatingObject(geometry, material, 8);

        this.nextRound();

        document.getElementById('hear-btn').onclick = () => this.speakSentence();
    }

    nextRound() {
        if (this.rounds >= this.maxRounds) {
            this.end();
            return;
        }

        this.rounds++;

        const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5);
        this.currentSentence = shuffled[0];

        // Prepare options
        this.options = this.currentSentence.options.sort(() => Math.random() - 0.5);

        this.renderRound();
        setTimeout(() => this.speakSentence(), 500);
    }

    renderRound() {
        document.getElementById('sentence-text').textContent = this.currentSentence.text;
        document.getElementById('image-hint').textContent = this.currentSentence.emoji;

        const stonesArea = document.getElementById('stones-area');
        stonesArea.innerHTML = this.options.map(opt => `
            <div class="stone-btn" data-word="${opt}">
                <div class="stone-text">${opt}</div>
            </div>
        `).join('');

        stonesArea.querySelectorAll('.stone-btn').forEach(btn => {
            btn.onclick = () => this.handlePick(btn);
        });
    }

    speakSentence() {
        // Read "Blank" for underscore
        const spoken = this.currentSentence.text.replace("__", "blank");
        this.speak(spoken);
    }

    handlePick(btn) {
        if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;

        const word = btn.dataset.word;

        if (word === this.currentSentence.answer) {
            // Correct
            btn.classList.add('correct');
            this.addScore(100);
            document.getElementById('score-val').textContent = this.score;

            // Fill in blank
            document.getElementById('sentence-text').textContent = this.currentSentence.text.replace("__", word);

            this.speak(`Correct! ${this.currentSentence.text.replace("__", word)}`);
            this.confetti.explode(null, null, 15);
            this.celebrateMove({ burst: word.toUpperCase() });

            setTimeout(() => this.nextRound(), 2500);
        } else {
            // Wrong
            btn.classList.add('wrong');
            this.speak("Try again.");
            this.coachMove();
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new StoryStonesGame(container, config);
}
