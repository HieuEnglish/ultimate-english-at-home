/* assets/js/games/4-7/alphabet-soup.js
   Alphabet Soup - Ages 4-7
   
   Find the letters in the soup to spell the word!
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const WORDS = [
    { word: "CAT", image: "🐱" },
    { word: "DOG", image: "🐶" },
    { word: "FISH", image: "🐟" },
    { word: "BIRD", image: "🐦" },
    { word: "FROG", image: "🐸" },
    { word: "DUCK", image: "🦆" },
    { word: "LION", image: "🦁" },
    { word: "BEAR", image: "🐻" },
    { word: "WORM", image: "🪱" },
    { word: "ANT", image: "🐜" },
    { word: "BEE", image: "🐝" }
];

class AlphabetSoupGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentWordObj = null;
        this.targetLetters = [];
        this.foundIndex = 0;
        this.floatingLetters = [];
        this.rounds = 0;
        this.maxRounds = 8;
        this.score = 0;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="tablecloth-bg"></div>
                
                <div class="game-content">
                    <div class="header">
                         <div class="score-tag">⭐ <span id="score-val">0</span></div>
                    </div>

                    <div class="target-board">
                        <div class="target-image" id="target-image">❓</div>
                        <div class="word-slots" id="word-slots"></div>
                    </div>

                    <div class="soup-bowl-container">
                        <div class="soup-bowl">
                            <div class="soup-surface" id="soup-surface"></div>
                        </div>
                        <div class="spoon">🥄</div>
                    </div>
                    
                    <div class="instruction-box">
                        <span id="instruction-text">Find the letters!</span>
                        <button class="speak-btn" id="hear-btn">🔊</button>
                    </div>
                </div>

                <div class="celebration" id="celebration">
                    <span class="celeb-emoji" id="celeb-emoji">🥣</span>
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
                background: #fab1a0;
                font-family: 'Fredoka One', cursive, sans-serif;
            }
            .tablecloth-bg {
                position: absolute;
                inset: 0;
                background-image: repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255, 118, 117, 0.2) 50px, rgba(255, 118, 117, 0.2) 100px),
                                  repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255, 118, 117, 0.2) 50px, rgba(255, 118, 117, 0.2) 100px);
                background-color: #fff;
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
                justify-content: flex-end;
            }
            .score-tag {
                background: white;
                padding: 5px 15px;
                border-radius: 20px;
                border: 2px solid #d63031;
                color: #d63031;
                font-weight: bold;
            }
            
            .target-board {
                background: white;
                padding: 10px 30px;
                border-radius: 20px;
                box-shadow: 0 5px 0 rgba(0,0,0,0.1);
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 20px;
                border: 2px solid #fdcb6e;
            }
            .target-image { font-size: 50px; }
            .word-slots { display: flex; gap: 10px; }
            .letter-slot {
                width: 40px;
                height: 50px;
                border-bottom: 4px solid #2d3436;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 30px;
                color: #2d3436;
            }
            .letter-slot.filled { color: #0984e3; animation: popIn 0.3s; }
            
            @keyframes popIn { 0% { transform: scale(0); } 80% { transform: scale(1.2); } 100% { transform: scale(1); } }
            
            .soup-bowl-container {
                position: relative;
                width: 320px;
                height: 320px;
                margin: 10px 0;
            }
            .soup-bowl {
                width: 100%;
                height: 100%;
                background: white;
                border-radius: 50%;
                border: 15px solid #dfe6e9;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                padding: 10px;
                position: relative;
                overflow: hidden;
            }
            .soup-surface {
                width: 100%;
                height: 100%;
                background: #ffeaa7; /* Soup color */
                border-radius: 50%;
                position: relative;
                box-shadow: inset 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .noodle {
                position: absolute;
                width: 40px;
                height: 40px;
                background: #fab1a0;
                color: #d63031;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 24px;
                font-weight: bold;
                cursor: pointer;
                user-select: none;
                transition: transform 0.2s;
                border: 2px solid rgba(255,255,255,0.4);
                box-shadow: 2px 2px 0 rgba(0,0,0,0.1);
            }
            .noodle:hover { transform: scale(1.2); z-index: 10; }
            .noodle:active { transform: scale(0.9); }
            .noodle.collected {
                transform: scale(0);
                opacity: 0;
                pointer-events: none;
                transition: all 0.5s;
            }
            
            .spoon {
                position: absolute;
                right: -40px;
                top: 50px;
                font-size: 80px;
                transform: rotate(45deg);
                filter: drop-shadow(5px 5px 5px rgba(0,0,0,0.2));
                pointer-events: none;
            }
            
            .instruction-box {
                margin-top: auto;
                background: rgba(255,255,255,0.9);
                padding: 10px 20px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                gap: 15px;
            }
            .speak-btn {
                background: #fdcb6e;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                font-size: 20px;
                cursor: pointer;
            }
            
            .celebration {
                position: absolute;
                inset: 0;
                background: rgba(255,255,255,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
                z-index: 100;
            }
            .celebration.visible { opacity: 1; pointer-events: auto; }
            .celeb-emoji { font-size: 150px; animation: spin 2s infinite linear; }
            @keyframes spin { 100% { transform: rotate(360deg); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.score = 0;
        this.rounds = 0;

        // Add 3D elements (vegetables floating around?)
        const geometry = new THREE.DodecahedronGeometry(0.5);
        const material = new THREE.MeshPhongMaterial({ color: 0x55efc4 });
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
        this.foundIndex = 0;

        const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
        this.currentWordObj = shuffled[0];
        this.targetLetters = this.currentWordObj.word.split('');

        // Create noodle soup content
        // Must include target letters + some distractors
        const distractors = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').sort(() => Math.random() - 0.5).slice(0, 5);
        const soupLetters = [...this.targetLetters, ...distractors].sort(() => Math.random() - 0.5);

        this.renderRound(soupLetters);
        setTimeout(() => this.speakInstruction(), 500);
    }

    renderRound(soupLetters) {
        document.getElementById('target-image').textContent = this.currentWordObj.image;
        const slotsDiv = document.getElementById('word-slots');
        slotsDiv.innerHTML = this.targetLetters.map(() => `<div class="letter-slot"></div>`).join('');

        const soupSurface = document.getElementById('soup-surface');
        soupSurface.innerHTML = '';

        // Place letters randomly in the circle, keeping away from edges
        soupLetters.forEach((char, i) => {
            const noodle = document.createElement('div');
            noodle.className = 'noodle';
            noodle.textContent = char;
            noodle.dataset.char = char;

            // Random pos within circle (approx)
            // Center is 50%, Radius approx 40% to be safe
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 35; // %
            const x = 50 + radius * Math.cos(angle);
            const y = 50 + radius * Math.sin(angle);

            noodle.style.left = `calc(${x}% - 20px)`;
            noodle.style.top = `calc(${y}% - 20px)`;
            noodle.style.transform = `rotate(${Math.random() * 360}deg)`;

            // Add subtle floating animation via CSS or JS loop?
            // JS loop for drift
            this.animateNoodle(noodle, x, y);

            noodle.onclick = (e) => this.handleNoodleClick(noodle, e);
            soupSurface.appendChild(noodle);
        });
    }

    animateNoodle(el, baseX, baseY) {
        // Simple drift
        const seed = Math.random();
        const duration = 2000 + seed * 2000;

        el.animate([
            { transform: `translate(0, 0) rotate(0deg)` },
            { transform: `translate(${Math.sin(seed * 10) * 10}px, ${Math.cos(seed * 10) * 10}px) rotate(${seed * 20}deg)` },
            { transform: `translate(0, 0) rotate(0deg)` }
        ], {
            duration: duration,
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    }

    speakInstruction() {
        this.speak(`Spell the word: ${this.currentWordObj.word}`);
    }

    handleNoodleClick(noodle, e) {
        if (noodle.classList.contains('collected')) return;

        e.stopPropagation();

        const char = noodle.dataset.char;
        const requiredChar = this.targetLetters[this.foundIndex];

        if (char === requiredChar) {
            // Correct letter
            noodle.classList.add('collected');

            const slot = document.getElementById('word-slots').children[this.foundIndex];
            slot.textContent = char;
            slot.classList.add('filled');

            this.foundIndex++;
            this.speak(char); // Speak letter name

            // Check if word complete
            if (this.foundIndex >= this.targetLetters.length) {
                this.addScore(100);
                document.getElementById('score-val').textContent = this.score;
                this.confetti.explode(null, null, 10);
                this.speak(this.currentWordObj.word);
                setTimeout(() => this.nextRound(), 1500);
            }
        } else {
            // Wrong letter
            // Shake effect
            noodle.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(-5px)' },
                { transform: 'translateX(5px)' },
                { transform: 'translateX(0)' }
            ], { duration: 200 });

            // Should we speak "Try again"? Maybe just a sound.
            // this.speak("Try again");
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new AlphabetSoupGame(container, config);
}
