/* assets/js/games/4-7/picture-pairs.js
   Picture Pairs - Ages 4-7
   
   Classic memory matching game. Find the matching pairs of cards.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const VOCAB_ITEMS = [
    { word: "Cat", emoji: "🐱", color: "#fab1a0" },
    { word: "Dog", emoji: "🐶", color: "#74b9ff" },
    { word: "Apple", emoji: "🍎", color: "#ff7675" },
    { word: "Car", emoji: "🚗", color: "#a29bfe" },
    { word: "Star", emoji: "⭐", color: "#ffeaa7" },
    { word: "Moon", emoji: "🌙", color: "#fdcb6e" },
    { word: "Flower", emoji: "🌸", color: "#e17055" },
    { word: "Ball", emoji: "⚽", color: "#55efc4" },
    { word: "Bear", emoji: "🐻", color: "#636e72" },
    { word: "Fish", emoji: "🐠", color: "#00cec9" }
];

class PicturePairsGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.cards = [];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.totalPairs = 6; // 6 pairs = 12 cards grid (3x4 or 4x3)
        this.isLocked = false;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="sky-bg">
                    <div class="cloud c1">☁️</div>
                    <div class="cloud c2">☁️</div>
                </div>
                
                <div class="game-content">
                    <div class="header-bar">
                        <div class="level-badge">Level 1</div>
                        <div class="score-display">Pairs: <span id="pairs-count">0</span>/${this.totalPairs}</div>
                    </div>

                    <div class="card-grid" id="card-grid"></div>
                    
                    <div class="message-area" id="messge-area">Find a pair!</div>
                </div>
                
                <div class="celebration" id="celebration">
                    <span class="celeb-text">AWESOME!</span>
                    <span class="celeb-emoji">👯</span>
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
                background: linear-gradient(180deg, #81ecec 0%, #74b9ff 100%);
                font-family: 'Fredoka One', cursive, sans-serif;
                user-select: none;
            }
            .sky-bg {
                position: absolute;
                inset: 0;
                pointer-events: none;
            }
            .cloud {
                position: absolute;
                font-size: 80px;
                opacity: 0.8;
                animation: floatCloud 20s linear infinite;
            }
            .c1 { top: 10%; left: -20%; animation-duration: 25s; }
            .c2 { top: 30%; left: -20%; animation-delay: 10s; animation-duration: 30s; }
            
            @keyframes floatCloud {
                from { transform: translateX(-150px); }
                to { transform: translateX(800px); }
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
            
            .header-bar {
                display: flex;
                justify-content: space-between;
                width: 100%;
                max-width: 600px;
                margin-bottom: 20px;
            }
            .level-badge {
                background: #6c5ce7;
                color: white;
                padding: 8px 16px;
                border-radius: 12px;
                font-size: 18px;
                box-shadow: 0 4px 0 #a29bfe;
            }
            .score-display {
                background: white;
                color: #2d3436;
                padding: 8px 20px;
                border-radius: 20px;
                font-size: 20px;
                font-weight: bold;
                box-shadow: 0 4px 0 rgba(0,0,0,0.1);
            }
            
            .card-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                width: 100%;
                max-width: 500px;
                perspective: 1000px;
            }
            
            .game-card {
                aspect-ratio: 1;
                position: relative;
                cursor: pointer;
                transform-style: preserve-3d;
                transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }
            .game-card:hover { transform: scale(1.05); }
            .game-card.flipped { transform: rotateY(180deg); }
            .game-card.matched { transform: rotateY(180deg) scale(0.95); opacity: 0.8; cursor: default; }
            
            .card-face {
                position: absolute;
                inset: 0;
                backface-visibility: hidden;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            }
            .card-front {
                background: linear-gradient(135deg, #6c5ce7, #a29bfe);
                border: 2px solid white;
            }
            .card-front::after {
                content: "?";
                font-size: 40px;
                color: rgba(255,255,255,0.5);
                font-weight: bold;
            }
            .card-back {
                background: white;
                transform: rotateY(180deg);
                flex-direction: column;
                border: 4px solid #fab1a0;
            }
            .card-emoji { font-size: 40px; }
            .card-word { font-size: 14px; margin-top: 5px; color: #636e72; text-transform: uppercase; letter-spacing: 1px; }
            
            .message-area {
                margin-top: auto;
                background: rgba(255,255,255,0.9);
                padding: 10px 30px;
                border-radius: 20px;
                font-size: 24px;
                color: #2d3436;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            }
            
            .celebration {
                position: absolute;
                inset: 0;
                background: rgba(108, 92, 231, 0.9);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.5s;
                z-index: 100;
                color: white;
            }
            .celebration.visible { opacity: 1; pointer-events: auto; }
            .celeb-text { font-size: 60px; margin-bottom: 20px; animation: popIn 0.5s; }
            .celeb-emoji { font-size: 100px; animation: bounce 1s infinite; }
            
            @keyframes popIn { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.resetGame();

        // Add 3D elements
        const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
        const material = new THREE.MeshNormalMaterial();
        this.threeHelper.addFloatingObject(geometry, material, 15);
    }

    resetGame() {
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.isLocked = false;
        document.getElementById('pairs-count').textContent = '0';

        // Prepare deck
        const items = [...VOCAB_ITEMS].sort(() => Math.random() - 0.5).slice(0, this.totalPairs);
        // Create pairs
        let deck = [...items, ...items];
        // Shuffle
        deck.sort(() => Math.random() - 0.5);

        this.renderGrid(deck);
        this.speak("Find the matching picture pairs!");
    }

    renderGrid(deck) {
        const grid = document.getElementById('card-grid');
        grid.innerHTML = deck.map((item, index) => `
            <div class="game-card" data-index="${index}" data-word="${item.word}">
                <div class="card-face card-front"></div>
                <div class="card-face card-back" style="border-color: ${item.color}">
                    <span class="card-emoji">${item.emoji}</span>
                    <span class="card-word">${item.word}</span>
                </div>
            </div>
        `).join('');

        // Store card data refs
        this.cards = deck;

        // Add listeners
        grid.querySelectorAll('.game-card').forEach(card => {
            card.onclick = () => this.handleCardClick(card);
        });
    }

    handleCardClick(card) {
        if (this.isLocked) return;
        if (card.classList.contains('flipped') || card.classList.contains('matched')) return;

        // Flip card
        const index = parseInt(card.dataset.index);
        card.classList.add('flipped');

        // Play click/flip sound (simulated by speaking or just visual for now, game engine might have SFX later)
        if (window.UEAH_AUDIO && window.UEAH_AUDIO.playClick) window.UEAH_AUDIO.playClick();

        this.flippedCards.push({ element: card, data: this.cards[index] });

        if (this.flippedCards.length === 2) {
            this.checkForMatch();
        } else {
            // First card flipped, speak it? Maybe too noisy.
            // this.speak(this.cards[index].word); 
        }
    }

    checkForMatch() {
        this.isLocked = true;
        const [c1, c2] = this.flippedCards;

        if (c1.data.word === c2.data.word) {
            // Match!
            setTimeout(() => {
                c1.element.classList.add('matched');
                c2.element.classList.add('matched');
                this.matchedPairs++;
                document.getElementById('pairs-count').textContent = this.matchedPairs;
                this.speak(c1.data.word);
                this.confetti.explode(null, null, 10);

                this.flippedCards = [];
                this.isLocked = false;

                if (this.matchedPairs === this.totalPairs) {
                    this.win();
                }
            }, 600);
        } else {
            // No match
            setTimeout(() => {
                c1.element.classList.remove('flipped');
                c2.element.classList.remove('flipped');
                this.flippedCards = [];
                this.isLocked = false;
            }, 1000);
        }
    }

    win() {
        this.addScore(1000);
        setTimeout(() => {
            this.showResults(this.saveScore());
        }, 1000);
    }
}

export function createGame(container, config) {
    return new PicturePairsGame(container, config);
}
