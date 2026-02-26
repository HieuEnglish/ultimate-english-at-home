/* assets/js/games/4-7/word-detective.js
   Word Detective - Ages 4-7
   
   Fill in the missing letter to complete the word.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const CASES = [
    { word: "CAT", missingIndex: 0, image: "🐱", options: ["C", "B", "R"] },
    { word: "DOG", missingIndex: 2, image: "🐶", options: ["G", "B", "T"] },
    { word: "SUN", missingIndex: 1, image: "☀️", options: ["U", "A", "O"] },
    { word: "BUS", missingIndex: 0, image: "🚌", options: ["B", "P", "S"] },
    { word: "FOX", missingIndex: 2, image: "🦊", options: ["X", "S", "K"] },
    { word: "POT", missingIndex: 1, image: "🍯", options: ["O", "U", "I"] },
    { word: "MAP", missingIndex: 2, image: "🗺️", options: ["P", "T", "D"] },
    { word: "WEB", missingIndex: 0, image: "🕸️", options: ["W", "R", "L"] },
    { word: "NET", missingIndex: 0, image: "🥅", options: ["N", "M", "B"] },
    { word: "PIG", missingIndex: 1, image: "🐷", options: ["I", "E", "A"] },
    { word: "HAT", missingIndex: 0, image: "🎩", options: ["H", "B", "M"] },
    { word: "BED", missingIndex: 2, image: "🛏️", options: ["D", "T", "N"] },
    { word: "CUP", missingIndex: 1, image: "🥤", options: ["U", "A", "O"] },
    { word: "PEN", missingIndex: 2, image: "🖊️", options: ["N", "T", "D"] },
    { word: "BOX", missingIndex: 0, image: "📦", options: ["B", "F", "D"] },
    { word: "EGG", missingIndex: 0, image: "🥚", options: ["E", "A", "O"] },
    { word: "JAM", missingIndex: 1, image: "🫙", options: ["A", "U", "I"] },
    { word: "BEE", missingIndex: 2, image: "🐝", options: ["E", "A", "O"] },
    { word: "COW", missingIndex: 0, image: "🐄", options: ["C", "D", "G"] },
    { word: "ANT", missingIndex: 1, image: "🐜", options: ["N", "M", "L"] },
];

class WordDetectiveGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentCase = null;
        this.options = [];
        this.rounds = 0;
        this.maxRounds = 8;
        this.score = 0;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="brick-bg"></div>
                
                <div class="game-content">
                    <div class="header">
                         <div class="score-badge">🕵️ <span id="score-val">0</span></div>
                    </div>

                    <div class="case-file">
                        <div class="clue-image" id="clue-image">❓</div>
                        <div class="word-puzzle" id="word-puzzle">
                            <span class="letter">C</span>
                            <span class="letter missing">?</span>
                            <span class="letter">T</span>
                        </div>
                    </div>
                    
                    <div class="magnifying-center">
                        <div class="glass-rim"></div>
                    </div>

                    <div class="evidence-room" id="options-row"></div>
                    
                    <button class="speak-btn" id="hear-btn">🔊</button>
                    
                    <div class="detective-avatar">🕵️‍♀️</div>
                </div>

                <div class="celebration" id="celebration">
                    <span class="celeb-emoji" id="celeb-emoji">🔍</span>
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
                background: #2d3436;
                font-family: 'Fredoka One', cursive, sans-serif;
            }
            .brick-bg {
                position: absolute;
                inset: 0;
                background-image: 
                    linear-gradient(335deg, rgba(0,0,0,0.2) 23px, transparent 23px),
                    linear-gradient(155deg, rgba(0,0,0,0.2) 23px, transparent 23px),
                    linear-gradient(335deg, rgba(0,0,0,0.2) 23px, transparent 23px),
                    linear-gradient(155deg, rgba(0,0,0,0.2) 23px, transparent 23px);
                background-size: 58px 58px;
                background-color: #636e72;
                opacity: 0.5;
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
                justify-content: flex-start;
            }
            .score-badge {
                background: #fdcb6e;
                color: #2d3436;
                padding: 8px 16px;
                border-radius: 8px;
                font-size: 20px;
                border: 2px solid #2d3436;
            }
            
            .case-file {
                margin-top: 30px;
                background: #f1f2f6;
                padding: 20px;
                border-radius: 10px;
                transform: rotate(-2deg);
                box-shadow: 5px 5px 0 #2d3436;
                text-align: center;
                width: 280px;
                position: relative;
                z-index: 5;
            }
            .case-file::before {
                content: 'TOP SECRET';
                position: absolute;
                top: -10px;
                left: 50%;
                transform: translateX(-50%);
                background: #d63031;
                color: white;
                font-size: 12px;
                padding: 4px 8px;
                border-radius: 4px;
            }
            .clue-image { font-size: 80px; margin-bottom: 20px; }
            .word-puzzle { display: flex; justify-content: center; gap: 10px; }
            .letter {
                font-size: 40px;
                width: 50px;
                border-bottom: 4px solid #2d3436;
                color: #2d3436;
            }
            .letter.missing { color: #d63031; }
            
            .evidence-room {
                margin-top: 50px;
                display: flex;
                gap: 20px;
            }
            .clue-option {
                width: 80px;
                height: 80px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 30px;
                color: #2d3436;
                cursor: pointer;
                border: 4px solid #dfe6e9;
                box-shadow: 0 4px 0 #b2bec3;
                transition: transform 0.2s;
            }
            .clue-option:hover { transform: scale(1.1); border-color: #74b9ff; }
            .clue-option:active { transform: scale(0.9); }
            
            .clue-option.correct { background: #55efc4; border-color: #00b894; color: white; }
            .clue-option.wrong { background: #ff7675; border-color: #d63031; opacity: 0.5; }
            
            .detective-avatar {
                position: absolute;
                bottom: 0;
                right: 20px;
                font-size: 120px;
            }
            
            .speaker-btn {
                margin-top: auto;
                background: #74b9ff;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 10px;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 0 #0984e3;
                color: white;
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
            .celeb-emoji { font-size: 150px; animation: pulse 0.5s infinite; }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.score = 0;
        this.rounds = 0;

        // Add 3D magnifying glass parts?
        const geometry = new THREE.TorusGeometry(1, 0.1, 16, 100);
        const material = new THREE.MeshStandardMaterial({ color: 0xffda79, metalness: 0.5 });
        this.threeHelper.addFloatingObject(geometry, material, 5);

        this.nextRound();

        document.getElementById('hear-btn').onclick = () => this.speakWord();
    }

    nextRound() {
        if (this.rounds >= this.maxRounds) {
            this.end();
            return;
        }

        this.rounds++;

        const shuffled = [...CASES].sort(() => Math.random() - 0.5);
        this.currentCase = shuffled[0];
        this.options = this.currentCase.options.sort(() => Math.random() - 0.5);

        this.renderRound();
        setTimeout(() => this.speakWord(), 500);
    }

    renderRound() {
        document.getElementById('clue-image').textContent = this.currentCase.image;

        const puzzle = document.getElementById('word-puzzle');
        const chars = this.currentCase.word.split('');

        puzzle.innerHTML = chars.map((char, index) => {
            if (index === this.currentCase.missingIndex) {
                return `<span class="letter missing" id="missing-slot">?</span>`;
            }
            return `<span class="letter">${char}</span>`;
        }).join('');

        const optionsRow = document.getElementById('options-row');
        optionsRow.innerHTML = this.options.map(opt => `
            <div class="clue-option" data-char="${opt}">${opt}</div>
        `).join('');

        optionsRow.querySelectorAll('.clue-option').forEach(opt => {
            opt.onclick = () => this.handlePick(opt);
        });
    }

    speakWord() {
        // Speak the partial word? Or usually just the full word to guide them.
        this.speak(`Spell ${this.currentCase.word}`);
    }

    handlePick(opt) {
        if (opt.classList.contains('correct') || opt.classList.contains('wrong')) return;

        const char = opt.dataset.char;
        const correctChar = this.currentCase.word[this.currentCase.missingIndex];

        if (char === correctChar) {
            // Correct
            opt.classList.add('correct');
            this.addScore(100);
            document.getElementById('score-val').textContent = this.score;
            document.getElementById('missing-slot').textContent = char;
            document.getElementById('missing-slot').style.color = '#00b894';

            this.speak(`Correct! ${this.currentCase.word}`);
            this.confetti.explode(null, null, 10);

            setTimeout(() => this.nextRound(), 1500);
        } else {
            // Wrong
            opt.classList.add('wrong');
            this.speak("Try again.");
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new WordDetectiveGame(container, config);
}
