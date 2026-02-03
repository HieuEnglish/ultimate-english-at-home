/* assets/js/games/8-10/noun-ninja.js
   Noun Ninja - Ages 8-10
   
   Slice the NOUNS! Avoid the other words.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const WORD_LIST = [
    { text: "Apple", type: "noun" },
    { text: "Car", type: "noun" },
    { text: "Dog", type: "noun" },
    { text: "Tree", type: "noun" },
    { text: "Book", type: "noun" },
    { text: "House", type: "noun" },
    { text: "Ball", type: "noun" },
    { text: "Chair", type: "noun" },

    { text: "Run", type: "verb" },
    { text: "Jump", type: "verb" },
    { text: "Fast", type: "adj" },
    { text: "Slow", type: "adj" },
    { text: "Sing", type: "verb" },
    { text: "Blue", type: "adj" },
    { text: "Big", type: "adj" }
];

class NounNinjaGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 60 });
        this.score = 0;
        this.activeWords = [];
        this.gravity = 0.2;
        this.spawnTimer = null;
        this.gameLoopId = null;
    }

    async init() {
        this.container.innerHTML = `
            <div class="game-wrapper ninja-theme">
                <div class="dojo-bg"></div>
                
                <div class="game-content">
                    <div class="header">
                        <div class="score-display">Score: <span id="score-val">0</span></div>
                        <div class="timer">⏰ <span id="timer-val">60</span>s</div>
                    </div>
                    
                    <div class="play-area" id="play-area"></div>
                    
                    <div class="slash-effect" id="slash-effect"></div>
                </div>

                <div class="start-overlay" id="start-overlay">
                    <div class="title">NOUN NINJA</div>
                    <div class="subtitle">Slice ONLY the Nouns!</div>
                    <button class="start-btn" id="start-btn">PLAY</button>
                </div>
            </div>
        `;

        this.injectStyles();
        document.getElementById('start-btn').onclick = () => this.startGame();

        // Mouse trail for slash?
        this.container.onmousemove = (e) => this.handleMouseMove(e);
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-wrapper {
                width: 100%; height: 600px;
                background: #2d3436;
                position: relative; overflow: hidden;
                border-radius: 20px;
                font-family: 'Shojumaru', cursive, sans-serif;
            }
            .dojo-bg {
                position: absolute; inset: 0;
                background-image: repeating-linear-gradient(45deg, #353b48 0px, #353b48 20px, #2f3640 20px, #2f3640 40px);
                opacity: 0.5;
            }
            
            .game-content {
                position: relative; z-index: 10;
                height: 100%; pointer-events: none; /* Clicking passes through */
            }
            .header {
                display: flex; justify-content: space-between; padding: 20px;
                color: #f5f6fa; font-size: 24px;
            }
            
            .play-area {
                position: absolute; inset: 0; pointer-events: auto;
            }
            
            .tossed-word {
                position: absolute;
                padding: 10px 20px;
                color: white; font-weight: bold; font-size: 24px;
                background: #e1b12c; border: 2px solid #fbc531;
                border-radius: 50px;
                cursor: crosshair;
                user-select: none;
                box-shadow: 0 5px 15px rgba(0,0,0,0.3);
            }
            .tossed-word.sliced {
                animation: sliceAnim 0.5s forwards;
                pointer-events: none;
            }
            @keyframes sliceAnim {
                0% { transform: scale(1) rotate(0deg); opacity: 1; }
                50% { transform: scale(1.2) rotate(10deg); background: #44bd32; }
                100% { transform: scale(0) rotate(20deg); opacity: 0; }
            }
            
            .tossed-word.wrong-slice {
                background: #c23616 !important; border-color: #e84118 !important;
                animation: shake 0.5s;
            }
            @keyframes shake { 0%, 100% {transform:translateX(0);} 25% {transform:translateX(-10px);} 75% {transform:translateX(10px);} }
            
            .start-overlay {
                position: absolute; inset: 0; background: rgba(0,0,0,0.8);
                display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 50;
                color: white;
            }
            .title { font-size: 60px; color: #e1b12c; text-shadow: 4px 4px 0 #c23616; margin-bottom: 10px; }
            .subtitle { font-size: 24px; margin-bottom: 30px; color: #dcdde1; }
            .start-btn {
                font-size: 30px; padding: 15px 50px; background: #c23616; color: white;
                border: none; border-radius: 5px; cursor: pointer; font-family: inherit;
                box-shadow: 0 5px 0 #8c270d;
            }
            .start-btn:active { transform: translateY(5px); box-shadow: none; }
            
            .slash-line {
                position: absolute; height: 4px; background: white;
                box-shadow: 0 0 10px white; pointer-events: none; opacity: 0.8;
                transform-origin: left center;
            }
        `;
        // Load font
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Shojumaru&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        this.container.appendChild(style);
    }

    handleMouseMove(e) {
        // Create trail?
        // Implementation simplified for now
    }

    startGame() {
        document.getElementById('start-overlay').style.display = 'none';
        super.start();
        this.score = 0;
        this.activeWords = [];
        this.gameLoop();
        this.spawnLoop();
    }

    spawnLoop() {
        if (!this.active) return; // Engine flag? or check internal

        // Spawn 1-2 words
        if (Math.random() > 0.3) this.spawnWord();

        const nextTime = 1000 + Math.random() * 1000;
        this.spawnTimer = setTimeout(() => this.spawnLoop(), nextTime);
    }

    spawnWord() {
        const data = WORD_LIST[Math.floor(Math.random() * WORD_LIST.length)];

        const el = document.createElement('div');
        el.className = 'tossed-word';
        el.textContent = data.text;

        // Physics props
        const x = 50 + Math.random() * (this.container.offsetWidth - 100);
        const y = this.container.offsetHeight; // Start at bottom

        // Initial velocity (throw up and slightly inward)
        const vx = (this.container.offsetWidth / 2 - x) * 0.01 + (Math.random() - 0.5) * 2;
        const vy = -12 - Math.random() * 5;

        const wordObj = {
            el,
            data,
            x,
            y,
            vx,
            vy,
            rot: 0,
            vrot: (Math.random() - 0.5) * 10
        };

        el.style.left = x + 'px';
        el.style.top = y + 'px';

        // Click/Hover handler for slicing
        el.onmouseenter = () => this.sliceWord(wordObj);
        el.onmousedown = () => this.sliceWord(wordObj); // Touch support approx

        document.getElementById('play-area').appendChild(el);
        this.activeWords.push(wordObj);
    }

    gameLoop() {
        // Physics update
        this.activeWords.forEach((w, i) => {
            w.x += w.vx;
            w.y += w.vy;
            w.vy += this.gravity;
            w.rot += w.vrot;

            w.el.style.left = w.x + 'px';
            w.el.style.top = w.y + 'px';
            w.el.style.transform = `translate(-50%, -50%) rotate(${w.rot}deg)`;

            if (w.y > this.container.offsetHeight + 100) {
                // Out of bounds
                w.el.remove();
                this.activeWords[i] = null;
            }
        });

        this.activeWords = this.activeWords.filter(w => w !== null);

        this.gameLoopId = requestAnimationFrame(() => this.gameLoop());
    }

    sliceWord(w) {
        if (w.sliced) return;
        w.sliced = true;

        if (w.data.type === 'noun') {
            // Good slice
            w.el.classList.add('sliced');
            this.addScore(50);
            this.playSound('slash');
            document.getElementById('score-val').textContent = this.score;
            this.confetti.explode(w.el, null, 5);
        } else {
            // Bad slice
            w.el.classList.add('wrong-slice');
            this.playSound('error');
            this.activeWords = this.activeWords.filter(item => item !== w);
            setTimeout(() => w.el.remove(), 500); // Remove after shake

            // Penalty?
            this.score = Math.max(0, this.score - 50);
            document.getElementById('score-val').textContent = this.score;
        }
    }

    end() {
        super.end();
        cancelAnimationFrame(this.gameLoopId);
        clearTimeout(this.spawnTimer);
        document.getElementById('play-area').innerHTML = '';
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new NounNinjaGame(container, config);
}
