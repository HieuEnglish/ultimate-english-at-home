/* assets/js/games/4-7/rhyme-time.js
   Rhyme Time - Ages 4-7
   
   Select the pictures/words that rhyme with the target.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const RHYMES = [
    { target: "Cat", emoji: "🐱", matches: ["Bat", "Hat", "Mat", "Rat"], wrong: ["Dog", "Pig", "Sun", "Bed"] },
    { target: "Dog", emoji: "🐶", matches: ["Log", "Frog", "Fog"], wrong: ["Cat", "Bug", "Pen", "Car"] },
    { target: "Sun", emoji: "☀️", matches: ["Run", "Bun", "Fun"], wrong: ["Moon", "Sad", "Fit", "Top"] },
    { target: "Bed", emoji: "🛏️", matches: ["Red", "Fed", "Sled"], wrong: ["Bad", "Bit", "Pot", "Bug"] },
    { target: "Car", emoji: "🚗", matches: ["Star", "Jar", "Far"], wrong: ["Bus", "Cat", "Dig", "Cut"] },
    { target: "Pig", emoji: "🐷", matches: ["Wig", "Dig", "Big"], wrong: ["Pot", "Pan", "Leg", "Bag"] },
    { target: "Pen", emoji: "🖊️", matches: ["Hen", "Ten", "Men"], wrong: ["Pin", "Pan", "Can", "Top"] },
    { target: "Box", emoji: "📦", matches: ["Fox", "Sox"], wrong: ["Big", "Bag", "Six", "Bus"] },
    { target: "Cake", emoji: "🍰", matches: ["Lake", "Make", "Shake"], wrong: ["Cup", "Dog", "Sit", "Run"] },
    { target: "Ball", emoji: "⚽", matches: ["Tall", "Wall", "Fall"], wrong: ["Bat", "Big", "Bed", "Cup"] },
    { target: "Moon", emoji: "🌙", matches: ["Spoon", "Soon", "Noon"], wrong: ["Sun", "Star", "Man", "Fan"] },
    { target: "Ring", emoji: "💍", matches: ["Sing", "King", "Wing"], wrong: ["Ran", "Rug", "Ram", "Red"] },
    { target: "Boat", emoji: "⛵", matches: ["Coat", "Goat", "Float"], wrong: ["Bus", "Bat", "Bag", "Bed"] },
    { target: "Bug", emoji: "🐛", matches: ["Rug", "Mug", "Hug"], wrong: ["Bag", "Bad", "Bit", "Bin"] },
    { target: "Tree", emoji: "🌳", matches: ["Bee", "See", "Free"], wrong: ["Top", "Tip", "Tap", "Tin"] },
];

class RhymeTimeGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentRhyme = null;
        this.options = [];
        this.rounds = 0;
        this.maxRounds = 8;
        this.score = 0;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="clock-bg">
                    <div class="clock-face"></div>
                </div>
                
                <div class="game-content">
                    <div class="header">
                        <div class="score-pill">⭐ <span id="score-val">0</span></div>
                        <div class="timer">⏰</div>
                    </div>

                    <div class="center-stage">
                        <div class="target-card">
                            <div class="target-emoji" id="target-emoji">🐱</div>
                            <div class="target-word" id="target-word">CAT</div>
                        </div>
                        <h2 class="instruction">Find rhymes for <span id="rhyme-target-text">CAT</span>!</h2>
                    </div>

                    <div class="options-grid" id="options-grid"></div>
                    
                    <button class="speak-btn" id="hear-btn">🔊</button>
                </div>
                
                 <div class="celebration" id="celebration">
                    <span class="celeb-emoji" id="celeb-emoji">🎶</span>
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
                background: linear-gradient(135deg, #a29bfe 0%, #6c5ce7 100%);
                font-family: 'Fredoka One', cursive, sans-serif;
            }
            .clock-bg {
                position: absolute;
                inset: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0.1;
            }
            .clock-face {
                width: 400px;
                height: 400px;
                border: 20px solid white;
                border-radius: 50%;
            }
            
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
                justify-content: space-between;
                align-items: center;
            }
            .score-pill {
                background: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                color: #6c5ce7;
            }
            .timer {
                font-size: 30px;
                animation: tick 1s infinite;
            }
            @keyframes tick { 50% { transform: rotate(10deg); } }
            
            .center-stage {
                margin-top: 20px;
                text-align: center;
            }
            .target-card {
                background: white;
                width: 120px;
                height: 140px;
                margin: 0 auto 10px;
                border-radius: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                box-shadow: 0 10px 0 rgba(0,0,0,0.2);
                transform: rotate(-5deg);
                border: 4px solid #fab1a0;
            }
            .target-emoji { font-size: 60px; }
            .target-word { font-size: 20px; margin-top: 5px; color: #2d3436; text-transform: uppercase; }
            
            .instruction {
                color: white;
                font-size: 24px;
                text-shadow: 0 2px 0 rgba(0,0,0,0.2);
            }
            
            .options-grid {
                margin-top: 30px;
                display: flex;
                gap: 15px;
                flex-wrap: wrap;
                justify-content: center;
                max-width: 600px;
            }
            .rhyme-option {
                background: white;
                padding: 15px 25px;
                border-radius: 15px;
                font-size: 20px;
                cursor: pointer;
                box-shadow: 0 5px 0 rgba(0,0,0,0.1);
                border: 2px solid transparent;
                transition: transform 0.2s;
            }
            .rhyme-option:hover { transform: scale(1.05); }
            .rhyme-option:active { transform: translateY(2px); box-shadow: 0 3px 0 rgba(0,0,0,0.1); }
            
            .rhyme-option.correct { background: #55efc4; color: white; border-color: #00b894; }
            .rhyme-option.wrong { background: #ff7675; color: white; opacity: 0.6; }
            
            .speak-btn {
                margin-top: auto;
                background: #fab1a0;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 0 #e17055;
                color: white;
            }
            
            .celebration {
                position: absolute;
                inset: 0;
                background: rgba(255,255,255,0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
                z-index: 100;
            }
            .celebration.visible { opacity: 1; pointer-events: auto; }
            .celeb-emoji { font-size: 150px; animation: bounce 1s infinite; }
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.score = 0;
        this.rounds = 0;

        // Add 3D notes
        const geometry = new THREE.TorusKnotGeometry(0.5, 0.2, 64, 8);
        const material = new THREE.MeshToonMaterial({ color: 0xfab1a0 });
        this.threeHelper.addFloatingObject(geometry, material, 5);

        this.nextRound();

        document.getElementById('hear-btn').onclick = () => this.speakInstruction();
    }

    nextRound() {
        if (this.rounds >= this.maxRounds) {
            this.end();
            return;
        }

        this.rounds++;

        const shuffled = [...RHYMES].sort(() => Math.random() - 0.5);
        this.currentRhyme = shuffled[0];

        // Pick 1 correct, 3 wrong
        const correct = this.currentRhyme.matches[Math.floor(Math.random() * this.currentRhyme.matches.length)];
        const wrongs = this.currentRhyme.wrong.sort(() => Math.random() - 0.5).slice(0, 3);

        this.options = [correct, ...wrongs].sort(() => Math.random() - 0.5);

        this.renderRound();
        setTimeout(() => this.speakInstruction(), 500);
    }

    renderRound() {
        document.getElementById('target-emoji').textContent = this.currentRhyme.emoji;
        document.getElementById('target-word').textContent = this.currentRhyme.target;
        document.getElementById('rhyme-target-text').textContent = this.currentRhyme.target;

        const grid = document.getElementById('options-grid');
        grid.innerHTML = this.options.map(word => `
            <button class="rhyme-option" data-word="${word}">${word}</button>
        `).join('');

        grid.querySelectorAll('.rhyme-option').forEach(btn => {
            btn.onclick = () => this.handlePick(btn);
        });
    }

    speakInstruction() {
        this.speak(`What rhymes with ${this.currentRhyme.target}?`);
    }

    handlePick(btn) {
        if (btn.classList.contains('correct') || btn.classList.contains('wrong')) return;

        const word = btn.dataset.word;
        const isMatch = this.currentRhyme.matches.includes(word);

        if (isMatch) {
            // Correct
            btn.classList.add('correct');
            this.addScore(100);
            document.getElementById('score-val').textContent = this.score;

            this.speak(`Yes! ${word} rhymes with ${this.currentRhyme.target}!`);
            this.confetti.explode(null, null, 10);

            setTimeout(() => this.nextRound(), 1500);
        } else {
            // Wrong
            btn.classList.add('wrong');
            this.speak("Doesn't rhyme!");
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new RhymeTimeGame(container, config);
}
