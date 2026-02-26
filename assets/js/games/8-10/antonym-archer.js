/* assets/js/games/8-10/antonym-archer.js
   Antonym Archer - Ages 8-10
   
   Shoot the target that shows the antonym (opposite)!
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const ARCHER_DATA = [
    { word: "Hot", antonym: "Cold", distractors: ["Warm", "Boiling", "Spicy"] },
    { word: "Happy", antonym: "Sad", distractors: ["Glad", "Funny", "Joy"] },
    { word: "Fast", antonym: "Slow", distractors: ["Quick", "Rapid", "Run"] },
    { word: "Up", antonym: "Down", distractors: ["High", "Above", "Sky"] },
    { word: "Day", antonym: "Night", distractors: ["Sun", "Light", "Noon"] },
    { word: "Big", antonym: "Small", distractors: ["Large", "Huge", "Giant"] },
    { word: "Hard", antonym: "Soft", distractors: ["Tough", "Solid", "Rock"] },
    { word: "Start", antonym: "End", distractors: ["Begin", "Go", "First"] },
    { word: "Win", antonym: "Lose", distractors: ["Victory", "Champ", "Medal"] },
    { word: "Friend", antonym: "Enemy", distractors: ["Pal", "Buddy", "Mate"] },
    { word: "Light", antonym: "Dark", distractors: ["Bright", "Glow", "Shine"] },
    { word: "Young", antonym: "Old", distractors: ["New", "Fresh", "Junior"] },
    { word: "Rich", antonym: "Poor", distractors: ["Wealthy", "Loaded", "Fancy"] },
    { word: "Loud", antonym: "Quiet", distractors: ["Noisy", "Boom", "Roar"] },
    { word: "Brave", antonym: "Cowardly", distractors: ["Bold", "Heroic", "Daring"] },
    { word: "Full", antonym: "Empty", distractors: ["Packed", "Loaded", "Stuffed"] },
    { word: "Open", antonym: "Closed", distractors: ["Wide", "Free", "Clear"] },
    { word: "Strong", antonym: "Weak", distractors: ["Mighty", "Power", "Tough"] },
    { word: "Wet", antonym: "Dry", distractors: ["Damp", "Moist", "Soaked"] },
    { word: "Love", antonym: "Hate", distractors: ["Adore", "Like", "Care"] },
];

class AntonymArcherGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 60 });
        this.score = 0;
        this.arrows = 10;
        this.currentTargets = [];
        this.targetAnimId = null;
        this.lastSpawn = 0;
    }

    async init() {
        this.container.innerHTML = `
            <div class="game-wrapper archer-theme">
                <div class="bg-forest"></div>
                
                <div class="game-content">
                    <div class="header">
                        <div class="info-pill">Target Antonym for: <span id="target-word" class="highlight">???</span></div>
                        <div class="info-pill">Score: <span id="score-val">0</span></div>
                        <div class="info-pill">Arrows: <span id="arrow-val">10</span></div>
                    </div>

                    <div class="range-area" id="range-area">
                        <!-- Targets appear here -->
                    </div>

                    <div class="bow-area">
                        <div class="bow" id="bow">🏹</div>
                    </div>
                </div>
                
                <div class="start-overlay" id="start-overlay">
                    <button class="start-btn" id="start-btn">READY AIM FIRE!</button>
                </div>
            </div>
        `;

        this.injectStyles();
        document.getElementById('start-btn').onclick = () => this.startRound();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-wrapper {
                width: 100%; height: 600px;
                background: #55efc4;
                position: relative; overflow: hidden;
                border-radius: 20px;
                font-family: 'Verdana', sans-serif;
                cursor: crosshair;
            }
            .bg-forest {
                position: absolute; inset: 0;
                background: linear-gradient(#81ecec 0%, #00b894 80%);
            }
            .bg-forest::after {
                content: '🌲 🌳 🌲 🌳';
                position: absolute; bottom: 100px; width: 100%; text-align: center;
                font-size: 80px; opacity: 0.3; letter-spacing: 50px;
            }
            
            .game-content {
                position: relative; z-index: 10; height: 100%;
                display: flex; flex-direction: column;
            }
            
            .header {
                display: flex; justify-content: space-between; padding: 20px;
            }
            .info-pill {
                background: rgba(255,255,255,0.9); padding: 10px 20px;
                border-radius: 20px; font-weight: bold; color: #2d3436;
                box-shadow: 0 4px 0 rgba(0,0,0,0.1);
            }
            .highlight { color: #d63031; font-size: 1.2em; text-transform: uppercase; }
            
            .range-area {
                flex: 1; position: relative; overflow: hidden;
            }
            
            .target {
                position: absolute; top: 50px; left: -100px;
                width: 80px; height: 80px;
                background: white; border-radius: 50%;
                border: 10px solid #d63031;
                display: flex; align-items: center; justify-content: center;
                font-weight: bold; color: #2d3436;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                cursor: pointer;
                user-select: none;
            }
            .target::before {
                content: ''; position: absolute; inset: 10px; border: 5px solid white; border-radius: 50%;
                background: #d63031; z-index: -1;
            }
            .target-text { z-index: 2; background: rgba(255,255,255,0.8); padding: 2px 5px; border-radius: 4px; }
            
            .bow-area {
                height: 120px; display: flex; justify-content: center; align-items: flex-end;
                padding-bottom: 20px; pointer-events: none;
            }
            .bow { font-size: 100px; transform: rotate(-45deg); transition: transform 0.1s; }
            
            .start-overlay {
                position: absolute; inset: 0; background: rgba(0,0,0,0.6);
                display: flex; align-items: center; justify-content: center; z-index: 50;
            }
            .start-btn {
                font-size: 30px; padding: 20px 40px; background: #fab1a0; border: none;
                border-radius: 10px; font-weight: 900; color: #d63031; cursor: pointer;
                box-shadow: 0 10px 0 #e17055;
            }
            .start-btn:active { transform: translateY(5px); box-shadow: 0 5px 0 #e17055; }
            
            .hit-effect {
                position: absolute; font-size: 40px; pointer-events: none;
                animation: popUp 0.5s forwards;
            }
            @keyframes popUp { 0% { opacity:1; transform:translateY(0); } 100% { opacity:0; transform:translateY(-50px); } }
        `;
        this.container.appendChild(style);

        // Follow mouse with bow
        this.container.onmousemove = (e) => {
            const bow = document.getElementById('bow');
            if (bow) {
                const rect = this.container.getBoundingClientRect();
                const x = e.clientX - rect.left - (rect.width / 2);
                const angle = (x / rect.width) * 90; // Tilt range
                bow.style.transform = `rotate(${-45 + angle}deg)`;
            }
        };
    }

    startRound() {
        document.getElementById('start-overlay').style.display = 'none';
        super.start();
        this.score = 0;
        this.arrows = 10;
        document.getElementById('arrow-val').textContent = this.arrows;

        this.pickNewWord();
        this.gameLoop();
    }

    pickNewWord() {
        const data = ARCHER_DATA[Math.floor(Math.random() * ARCHER_DATA.length)];
        this.currentData = data;
        document.getElementById('target-word').textContent = data.word;
    }

    gameLoop() {
        if (this.arrows <= 0) {
            this.end();
            return;
        }

        const now = performance.now();
        if (now - this.lastSpawn > 1500) { // Spawn every 1.5s
            this.spawnTarget();
            this.lastSpawn = now;
        }

        this.updateTargets();
        this.targetAnimId = requestAnimationFrame(() => this.gameLoop());
    }

    spawnTarget() {
        const isCorrect = Math.random() > 0.6; // 40% chance of correct target
        const word = isCorrect ? this.currentData.antonym : this.currentData.distractors[Math.floor(Math.random() * this.currentData.distractors.length)];

        const target = document.createElement('div');
        target.className = 'target';
        target.innerHTML = `<span class="target-text">${word}</span>`;
        target.dataset.word = word;
        target.dataset.isCorrect = isCorrect;

        // Random height
        const top = 50 + Math.random() * 200;
        target.style.top = top + 'px';

        // Reset left
        target.style.left = '-100px';

        // Store speed
        target.speed = 2 + Math.random() * 2;

        document.getElementById('range-area').appendChild(target);
        this.currentTargets.push(target);

        target.onmousedown = (e) => this.shootTarget(target, e);
    }

    updateTargets() {
        const rangeWidth = this.container.offsetWidth;

        this.currentTargets.forEach((t, i) => {
            const currentLeft = parseFloat(t.style.left) || -100;
            const newLeft = currentLeft + t.speed;
            t.style.left = newLeft + 'px';

            if (newLeft > rangeWidth) {
                // Remove
                t.remove();
                this.currentTargets[i] = null;
            }
        });

        this.currentTargets = this.currentTargets.filter(t => t !== null);
    }

    shootTarget(target, e) {
        if (this.arrows <= 0) return;

        // Visual arrow hit?
        // Just immediate feedback for now

        this.arrows--;
        document.getElementById('arrow-val').textContent = this.arrows;

        const isCorrect = target.dataset.isCorrect === 'true';

        // Effect
        const effect = document.createElement('div');
        effect.className = 'hit-effect';
        effect.style.left = target.style.left;
        effect.style.top = target.style.top;

        if (isCorrect) {
            effect.textContent = '🎯 +100';
            this.score += 100;
            document.getElementById('score-val').textContent = this.score;
            this.playSound('success');
            this.confetti.explode(target, null, 10);

            // Pick new word
            this.pickNewWord();
        } else {
            effect.textContent = '❌';
            this.playSound('error');
        }

        this.container.querySelector('.range-area').appendChild(effect);
        setTimeout(() => effect.remove(), 1000);

        // Remove target
        target.remove();
        this.currentTargets = this.currentTargets.filter(t => t !== target);

        if (this.arrows <= 0) {
            cancelAnimationFrame(this.targetAnimId);
            setTimeout(() => this.end(), 1000);
        }
    }

    end() {
        cancelAnimationFrame(this.targetAnimId);
        // Clear targets
        document.getElementById('range-area').innerHTML = '';
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new AntonymArcherGame(container, config);
}
