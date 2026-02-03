/* assets/js/games/0-3/fruit-basket.js
   Fruit Basket - Ages 0-3
   
   Pick the requested fruit from the picnic basket.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const FRUITS = [
    { name: "Apple", emoji: "🍎", color: "#fab1a0" },
    { name: "Banana", emoji: "🍌", color: "#ffeaa7" },
    { name: "Grapes", emoji: "🍇", color: "#a29bfe" },
    { name: "Orange", emoji: "🍊", color: "#fab1a0" },
    { name: "Strawberry", emoji: "🍓", color: "#ff7675" },
    { name: "Watermelon", emoji: "🍉", color: "#55efc4" },
    { name: "Lemon", emoji: "🍋", color: "#ffeaa7" },
    { name: "Peach", emoji: "🍑", color: "#fab1a0" },
    { name: "Pineapple", emoji: "🍍", color: "#ffeaa7" },
    { name: "Cherry", emoji: "🍒", color: "#ff7675" },
    { name: "Pear", emoji: "🍐", color: "#55efc4" }
];

class FruitBasketGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentFruit = null;
        this.options = [];
        this.rounds = 0;
        this.maxRounds = 8;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="bg-pattern"></div>
                
                <div class="basket-container">
                    <div class="header-board">
                        <div class="score-tag">⭐ <span id="score-val">0</span></div>
                        <h2 class="instruction-text" id="instruction-text">Pick the...</h2>
                    </div>

                    <div class="fruit-grid" id="fruit-grid"></div>
                    
                    <button class="speaker-btn" id="hear-btn">🔊</button>
                    
                    <div class="picnic-basket-img">🧺</div>
                </div>
                
                <!-- Celebration -->
                <div class="celebration" id="celebration">
                    <span class="celeb-emoji" id="celeb-emoji">🎉</span>
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
            .bg-pattern {
                position: absolute;
                inset: 0;
                background-image: 
                    repeating-linear-gradient(45deg, #d63031 25%, transparent 25%, transparent 75%, #d63031 75%, #d63031), 
                    repeating-linear-gradient(45deg, #d63031 25%, #ffffff 25%, #ffffff 75%, #d63031 75%, #d63031);
                background-color: #ffffff;
                background-size: 60px 60px;
                opacity: 0.1;
                background-position: 0 0, 30px 30px;
            }
            .basket-container {
                position: relative;
                z-index: 2;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            .header-board {
                background: white;
                padding: 15px 30px;
                border-radius: 20px;
                box-shadow: 0 8px 0 rgba(0,0,0,0.1);
                text-align: center;
                margin-top: 20px;
                border: 4px solid #fdcb6e;
                width: 90%;
                max-width: 500px;
            }
            .score-tag {
                font-size: 18px;
                color: #e17055;
                margin-bottom: 5px;
            }
            .instruction-text {
                font-size: 32px;
                color: #2d3436;
                margin: 0;
            }
            .fruit-grid {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 20px;
                flex-wrap: wrap;
                margin: 30px 0;
                width: 100%;
                max-width: 600px;
            }
            .fruit-item {
                width: 120px;
                height: 120px;
                font-size: 80px;
                background: white;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 8px 15px rgba(0,0,0,0.1);
                border: 4px solid white;
                transition: transform 0.2s;
            }
            .fruit-item:hover { transform: scale(1.1) rotate(5deg); }
            .fruit-item:active { transform: scale(0.9); }
            .fruit-item.correct { border-color: #00b894; background: #55efc4; }
            .fruit-item.wrong { opacity: 0.5; filter: grayscale(1); }
            
            .picnic-basket-img {
                font-size: 100px;
                margin-bottom: -20px;
                filter: drop-shadow(0 10px 10px rgba(0,0,0,0.2));
            }
            
            .speaker-btn {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 60px;
                height: 60px;
                font-size: 30px;
                border-radius: 50%;
                border: none;
                background: #74b9ff;
                color: white;
                cursor: pointer;
                box-shadow: 0 4px 0 #0984e3;
            }
            .speaker-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #0984e3; }
            
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
            .celeb-emoji { font-size: 150px; animation: pop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
            
            @keyframes pop { 0% { transform: scale(0); } 100% { transform: scale(1); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.score = 0;

        // Add 3D apples falling
        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshPhongMaterial({ color: 0xff7675 });
        this.threeHelper.addFloatingObject(geometry, material, 10);

        this.nextRound();

        document.getElementById('hear-btn').onclick = () => this.speakInstruction();
    }

    nextRound() {
        if (this.rounds >= this.maxRounds) {
            this.end();
            return;
        }

        this.rounds++;

        const shuffled = [...FRUITS].sort(() => Math.random() - 0.5);
        this.currentFruit = shuffled[0];

        // Pick 3 options including correct one
        this.options = shuffled.slice(0, 3).sort(() => Math.random() - 0.5);

        this.renderRound();
        setTimeout(() => this.speakInstruction(), 500);
    }

    renderRound() {
        const grid = document.getElementById('fruit-grid');
        const text = document.getElementById('instruction-text');

        text.textContent = `Pick the ${this.currentFruit.name}`;

        grid.innerHTML = this.options.map(fruit => `
            <div class="fruit-item" data-name="${fruit.name}">
                ${fruit.emoji}
            </div>
        `).join('');

        grid.querySelectorAll('.fruit-item').forEach(item => {
            item.onclick = () => this.handlePick(item);
        });
    }

    speakInstruction() {
        this.speak(`Pick the ${this.currentFruit.name}`);
    }

    handlePick(item) {
        if (item.classList.contains('correct') || item.classList.contains('wrong')) return;

        const name = item.dataset.name;

        if (name === this.currentFruit.name) {
            // Correct
            item.classList.add('correct');
            this.addScore(100);
            document.getElementById('score-val').textContent = this.score;
            this.threeHelper.createExplosion(this.currentFruit.color);
            this.confetti.explode(null, null, 10);
            this.speak("Yummy!");

            setTimeout(() => this.nextRound(), 1500);
        } else {
            // Wrong
            item.classList.add('wrong');
            this.speak("Try again!");
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new FruitBasketGame(container, config);
}
