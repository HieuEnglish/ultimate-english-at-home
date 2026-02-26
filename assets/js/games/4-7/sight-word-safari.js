/* assets/js/games/4-7/sight-word-safari.js
   Sight Word Safari - Ages 4-7
   
   Identify common sight words held by safari animals.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SIGHT_WORDS = [
    "the", "of", "and", "a", "to", "in", "is", "you", "that", "it",
    "he", "was", "for", "on", "are", "as", "with", "his", "they", "I",
    "at", "be", "this", "have", "from", "or", "one", "had", "by", "word",
    "but", "not", "what", "all", "were", "we", "when", "your", "can", "said",
    "she", "do", "how", "if", "will", "up", "her", "him", "has", "look",
    "go", "come", "make", "like", "just", "over", "such", "take", "than", "them"
];

const ANIMALS = [
    { name: "Lion", emoji: "🦁" },
    { name: "Elephant", emoji: "🐘" },
    { name: "Zebra", emoji: "🦓" },
    { name: "Giraffe", emoji: "🦒" },
    { name: "Monkey", emoji: "🐒" },
    { name: "Tiger", emoji: "🐅" },
    { name: "Hippo", emoji: "🦛" },
    { name: "Rhino", emoji: "🦏" },
    { name: "Parrot", emoji: "🦜" },
    { name: "Gorilla", emoji: "🦍" },
    { name: "Flamingo", emoji: "🦩" },
    { name: "Crocodile", emoji: "🐊" },
    { name: "Snake", emoji: "🐍" },
    { name: "Eagle", emoji: "🦅" },
];

class SightWordSafariGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentWord = null;
        this.options = [];
        this.rounds = 0;
        this.maxRounds = 10;
        this.score = 0;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="safari-bg">
                    <div class="sun"></div>
                    <div class="grass"></div>
                </div>
                
                <div class="game-content">
                    <div class="header-board">
                        <div class="score-box">⭐ <span id="score-val">0</span></div>
                        <div class="timer-box" id="timer-box">60s</div>
                    </div>
                    
                    <div class="instruction-panel">
                        <button class="speak-btn" id="hear-btn">🔊</button>
                        <div class="target-word-display">Find: <span id="target-word" class="blur-text">???</span></div>
                    </div>

                    <div class="animal-grid" id="animal-grid"></div>
                </div>
                
                <div class="celebration" id="celebration">
                    <span class="celeb-emoji" id="celeb-emoji">🌟</span>
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
                background: linear-gradient(180deg, #87CEEB 0%, #E0F6FF 60%, #eccc68 60%, #ff6b81 100%);
                font-family: 'Fredoka One', cursive, sans-serif;
            }
            .safari-bg {
                position: absolute;
                inset: 0;
                z-index: 1;
            }
            .sun {
                position: absolute;
                top: 40px;
                right: 40px;
                width: 80px;
                height: 80px;
                background: #f1c40f;
                border-radius: 50%;
                box-shadow: 0 0 40px #f39c12;
            }
            .grass {
                position: absolute;
                bottom: 0;
                width: 100%;
                height: 30%;
                background: linear-gradient(180deg, #27ae60 0%, #2ecc71 100%);
                clip-path: polygon(0 20%, 5% 0, 10% 20%, 15% 0, 20% 20%, 25% 0, 30% 20%, 35% 0, 40% 20%, 45% 0, 50% 20%, 55% 0, 60% 20%, 65% 0, 70% 20%, 75% 0, 80% 20%, 85% 0, 90% 20%, 95% 0, 100% 20%, 100% 100%, 0 100%);
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
            
            .header-board {
                width: 100%;
                display: flex;
                justify-content: space-between;
                font-size: 24px;
                color: #2c3e50;
                margin-bottom: 20px;
            }
            .score-box {
                background: white;
                padding: 10px 20px;
                border-radius: 15px;
                box-shadow: 0 4px 0 rgba(0,0,0,0.1);
            }
            .timer-box {
                background: #ff7675;
                color: white;
                padding: 10px 20px;
                border-radius: 15px;
                box-shadow: 0 4px 0 #d63031;
            }
            
            .instruction-panel {
                background: rgba(255,255,255,0.9);
                padding: 15px 30px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                gap: 20px;
                margin-bottom: 30px;
                box-shadow: 0 8px 16px rgba(0,0,0,0.1);
            }
            .speak-btn {
                background: #0984e3;
                color: white;
                border: none;
                width: 50px;
                height: 50px;
                border-radius: 50%;
                font-size: 24px;
                cursor: pointer;
                box-shadow: 0 4px 0 #74b9ff;
            }
            .speak-btn:active { transform: translateY(2px); box-shadow: none; }
            
            .target-word-display {
                font-size: 32px;
                color: #2d3436;
            }
            .blur-text {
                filter: blur(5px);
                transition: filter 0.5s;
            }
            .blur-text.revealed { filter: blur(0); color: #00b894; }
            
            .animal-grid {
                display: flex;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
                max-width: 800px;
            }
            
            .animal-card {
                position: relative;
                width: 140px;
                height: 160px;
                cursor: pointer;
                transition: transform 0.2s;
            }
            .animal-card:hover { transform: scale(1.1); }
            
            .animal-emoji {
                font-size: 80px;
                text-align: center;
                filter: drop-shadow(0 5px 5px rgba(0,0,0,0.2));
            }
            .word-sign {
                background: white;
                border: 3px solid #2d3436;
                border-radius: 10px;
                padding: 5px 10px;
                text-align: center;
                font-size: 20px;
                font-weight: bold;
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 100px;
                box-shadow: 0 4px 0 rgba(0,0,0,0.1);
            }
            
            .animal-card.correct .animal-emoji { animation: bounce 1s infinite; }
            .animal-card.correct .word-sign { background: #55efc4; border-color: #00b894; }
            .animal-card.wrong .animal-emoji { opacity: 0.5; }
            
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
            
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
            .celeb-emoji { font-size: 150px; animation: spin 1s infinite; }
            @keyframes spin { 100% { transform: rotate(360deg); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.score = 0;
        this.rounds = 0;

        // Add 3D trees
        const geometry = new THREE.CylinderGeometry(0.5, 0.5, 4);
        const material = new THREE.MeshLambertMaterial({ color: 0x8e44ad });
        this.threeHelper.addFloatingObject(geometry, material, 3);

        // Timer if needed, but for now just show rounds
        document.getElementById('timer-box').style.display = 'none';

        this.nextRound();

        document.getElementById('hear-btn').onclick = () => this.speakWord();
    }

    nextRound() {
        if (this.rounds >= this.maxRounds) {
            this.end();
            return;
        }

        this.rounds++;
        const targetElement = document.getElementById('target-word');
        targetElement.classList.remove('revealed');
        targetElement.textContent = "???";

        // Pick random sight word
        this.currentWord = SIGHT_WORDS[Math.floor(Math.random() * SIGHT_WORDS.length)];

        // Generate options (1 correct + 3 wrong)
        const wrongWords = SIGHT_WORDS.filter(w => w !== this.currentWord)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        this.options = [this.currentWord, ...wrongWords].sort(() => Math.random() - 0.5);

        // Assign animals to words
        const roundAnimals = [...ANIMALS].sort(() => Math.random() - 0.5).slice(0, 4);

        this.renderRound(roundAnimals);

        setTimeout(() => this.speakWord(), 500);
    }

    renderRound(roundAnimals) {
        const grid = document.getElementById('animal-grid');
        grid.innerHTML = this.options.map((word, index) => `
            <div class="animal-card" data-word="${word}">
                <div class="animal-emoji">${roundAnimals[index].emoji}</div>
                <div class="word-sign">${word}</div>
            </div>
        `).join('');

        grid.querySelectorAll('.animal-card').forEach(card => {
            card.onclick = () => this.handlePick(card);
        });
    }

    speakWord() {
        this.speak(`Find the word: ${this.currentWord}`);
    }

    handlePick(card) {
        if (card.classList.contains('correct') || card.classList.contains('wrong')) return;

        const word = card.dataset.word;

        if (word === this.currentWord) {
            // Correct
            card.classList.add('correct');
            this.addScore(100);
            document.getElementById('score-val').textContent = this.score;
            document.getElementById('target-word').textContent = this.currentWord;
            document.getElementById('target-word').classList.add('revealed');

            this.threeHelper.createExplosion('#55efc4');
            this.confetti.explode(null, null, 10);
            this.speak("Great job!");

            setTimeout(() => this.nextRound(), 1500);
        } else {
            // Wrong
            card.classList.add('wrong');
            this.speak("Try again.");
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new SightWordSafariGame(container, config);
}
