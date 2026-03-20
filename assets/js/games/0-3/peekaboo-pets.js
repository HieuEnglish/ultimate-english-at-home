/* assets/js/games/0-3/peekaboo-pets.js
   Peekaboo Pets - Ages 0-3
   
   A simple hiding game where animals hide behind bushes/boxes.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const PETS = [
    { name: "Dog", emoji: "🐶" },
    { name: "Cat", emoji: "🐱" },
    { name: "Mouse", emoji: "🐭" },
    { name: "Bunny", emoji: "🐰" },
    { name: "Fox", emoji: "🦊" },
    { name: "Bear", emoji: "🐻" },
    { name: "Panda", emoji: "🐼" },
    { name: "Koala", emoji: "🐨" },
    { name: "Tiger", emoji: "🐯" },
    { name: "Lion", emoji: "🦁" },
    { name: "Monkey", emoji: "🐒" },
    { name: "Penguin", emoji: "🐧" },
    { name: "Elephant", emoji: "🐘" },
    { name: "Giraffe", emoji: "🦒" },
    { name: "Whale", emoji: "🐳" },
    { name: "Dolphin", emoji: "🐬" },
    { name: "Owl", emoji: "🦉" },
    { name: "Frog", emoji: "🐸" },
    { name: "Turtle", emoji: "🐢" },
    { name: "Hamster", emoji: "🐹" },
];

class PeekabooPetsGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentPet = null;
        this.options = [];
        this.rounds = 0;
        this.maxRounds = 8;
        this.isRevealing = false;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="bg-forest"></div>
                
                <div class="game-content">
                    <div class="header">
                        <div class="score-pill">⭐ <span id="score-val">0</span></div>
                        <h1 class="guide-text" id="guide-text">Who is hiding?</h1>
                    </div>

                    <div class="hiding-spots" id="hiding-spots"></div>

                    <div class="controls">
                        <button class="icon-btn" id="hear-btn">🔊</button>
                    </div>
                </div>
                
                <!-- Celebration Overlay -->
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
                background: linear-gradient(180deg, #81ecec 0%, #00b894 100%);
                font-family: 'Fredoka One', cursive, sans-serif;
            }
            .bg-forest {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 200px;
                background: #55efc4;
                border-radius: 50% 50% 0 0 / 20px 20px 0 0;
                opacity: 0.5;
            }
            .game-content {
                position: relative;
                z-index: 2;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            .header {
                margin-top: 20px;
                text-align: center;
            }
            .score-pill {
                background: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
                color: #e67e22;
                display: inline-block;
                margin-bottom: 10px;
                box-shadow: 0 4px 0 rgba(0,0,0,0.1);
            }
            .guide-text {
                font-size: 32px;
                color: white;
                text-shadow: 0 2px 4px rgba(0,0,0,0.2);
                background: rgba(0,0,0,0.2);
                padding: 10px 20px;
                border-radius: 12px;
            }
            .hiding-spots {
                flex: 1;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 30px;
                perspective: 1000px;
            }
            .hiding-card {
                width: 140px;
                height: 140px;
                position: relative;
                cursor: pointer;
                transition: transform 0.3s;
                transform-style: preserve-3d;
            }
            .hiding-card:hover { transform: scale(1.05); }
            .hiding-card.revealed { transform: rotateY(180deg); }
            
            .card-face {
                position: absolute;
                width: 100%;
                height: 100%;
                backface-visibility: hidden;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 20px;
                font-size: 80px;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            }
            .card-front {
                background: #ffeaa7; /* Bush/Box bg */
                z-index: 2;
                border: 4px solid #fab1a0;
            }
            .card-back {
                background: white;
                transform: rotateY(180deg);
                border: 4px solid #74b9ff;
            }
            
            .controls {
                margin-bottom: 30px;
            }
            .icon-btn {
                width: 60px;
                height: 60px;
                font-size: 30px;
                border-radius: 50%;
                border: none;
                background: white;
                cursor: pointer;
                box-shadow: 0 4px 0 #b2bec3;
                transition: transform 0.1s;
            }
            .icon-btn:active { transform: translateY(4px); box-shadow: none; }

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
            .celeb-emoji { font-size: 120px; animation: bounce 1s infinite; }
            
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.score = 0;

        // Add 3D elements (trees)
        const geometry = new THREE.ConeGeometry(0.8, 2, 8);
        const material = new THREE.MeshLambertMaterial({ color: 0x00b894 });
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
        this.isRevealing = false;

        // Pick 3 random pets
        const shuffled = [...PETS].sort(() => Math.random() - 0.5);
        this.options = shuffled.slice(0, 3);
        // Pick one as target
        this.currentPet = this.options[Math.floor(Math.random() * this.options.length)];

        this.renderRound();
        setTimeout(() => this.speakInstruction(), 600);
    }

    renderRound() {
        const spots = document.getElementById('hiding-spots');
        const guide = document.getElementById('guide-text');

        guide.textContent = `Where is the ${this.currentPet.name}?`;

        spots.innerHTML = this.options.map((pet, index) => `
            <div class="hiding-card" data-index="${index}">
                <div class="card-face card-front">🌳</div>
                <div class="card-face card-back">${pet.emoji}</div>
            </div>
        `).join('');

        spots.querySelectorAll('.hiding-card').forEach(card => {
            card.onclick = () => this.handleCardClick(card);
        });
    }

    speakInstruction() {
        this.speak(`Where is the ${this.currentPet.name}?`);
    }

    handleCardClick(card) {
        if (this.isRevealing) return;

        const index = parseInt(card.dataset.index);
        const pet = this.options[index];

        // Reveal
        card.classList.add('revealed');

        if (pet.name === this.currentPet.name) {
            // Correct
            this.isRevealing = true;
            this.addScore(100);
            document.getElementById('score-val').textContent = this.score;
            this.speak(`Found the ${pet.name}!`);
            this.confetti.explode(null, null, 15);
            this.celebrateMove({ burst: pet.emoji || pet.name.toUpperCase() });

            setTimeout(() => {
                this.nextRound();
            }, 2000);
        } else {
            // Wrong
            this.speak(`That is a ${pet.name}. Try again!`);
            this.coachMove(`That is the ${pet.name}. Keep looking for the hiding pet.`);
            setTimeout(() => {
                card.classList.remove('revealed');
            }, 1500);
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new PeekabooPetsGame(container, config);
}
