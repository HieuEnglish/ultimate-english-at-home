/* assets/js/games/11-12/grammar-gladiator.js
   Grammar Gladiator - Ages 11-12
   
   Identify the part of speech to attack/defend in the arena!
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const ROUNDS = [
    { type: "Adjectives", options: ["Quickly", "Red", "House", "Softly"], correct: ["Red"], hint: "Describes a noun" },
    { type: "Adverbs", options: ["Loudly", "Big", "Run", "Cat"], correct: ["Loudly"], hint: "Describes an action (usually ends in -ly)" },
    { type: "Proper Nouns", options: ["London", "city", "dog", "Fido"], correct: ["London", "Fido"], hint: "Specific names (Capitalized)" },
    { type: "Conjunctions", options: ["And", "The", "Jump", "But"], correct: ["And", "But"], hint: "Connects words or phrases" },
    { type: "Prepositions", options: ["Under", "Yellow", "Walk", "Over"], correct: ["Under", "Over"], hint: "Position or relation" }
];

class GrammarGladiatorGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 90 });
        this.playerHP = 100;
        this.enemyHP = 100;
        this.currentRound = null;
        this.roundIndex = 0;
    }

    async init() {
        this.container.innerHTML = `
            <div class="game-wrapper gladiator-theme">
                <div class="colosseum-bg"></div>
                
                <div class="arena-scene">
                    <div class="fighter player">
                        <div class="hp-bar"><div class="hp-fill" id="player-hp" style="width:100%"></div></div>
                        <div class="sprite">🛡️</div>
                    </div>
                    
                    <div class="fighter enemy">
                        <div class="hp-bar"><div class="hp-fill" id="enemy-hp" style="width:100%"></div></div>
                        <div class="sprite">👹</div>
                    </div>
                </div>

                <div class="command-deck">
                    <div class="round-info">ATTACK WITH: <span id="target-type" class="highlight">???</span></div>
                    <div class="grid-options" id="options-grid"></div>
                </div>

                <div class="start-overlay" id="start-overlay">
                    <div class="roman-title">GRAMMAR GLADIATOR</div>
                    <button class="start-btn" id="start-btn">ENTER ARENA</button>
                </div>
            </div>
        `;

        this.injectStyles();
        document.getElementById('start-btn').onclick = () => this.startBattle();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-wrapper {
                width: 100%; height: 600px;
                background: #b2bec3;
                position: relative; overflow: hidden;
                border-radius: 20px;
                font-family: 'Cinzel', serif;
            }
            .colosseum-bg {
                position: absolute; inset: 0;
                background: radial-gradient(#dfe6e9 10%, #636e72 90%);
                opacity: 0.5;
            }
            
            .arena-scene {
                position: absolute; top: 0; left: 0; right: 0; height: 350px;
                display: flex; justify-content: space-around; align-items: flex-end;
                padding-bottom: 50px;
            }
            
            .fighter { display: flex; flex-direction: column; align-items: center; }
            .sprite { font-size: 100px; transition: transform 0.2s; filter: drop-shadow(0 10px 5px rgba(0,0,0,0.4)); }
            .hp-bar { width: 100px; height: 10px; background: #2d3436; border: 2px solid white; margin-bottom: 10px; }
            .hp-fill { height: 100%; background: #00b894; transition: width 0.3s; }
            .enemy .hp-fill { background: #d63031; }
            
            .command-deck {
                position: absolute; bottom: 0; left: 0; right: 0; height: 250px;
                background: rgba(45, 52, 54, 0.95);
                border-top: 5px solid #fdcb6e;
                padding: 20px; text-align: center;
            }
            
            .round-info { color: #ffeaa7; font-size: 24px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px; }
            .highlight { color: #0984e3; font-weight: bold; }
            
            .grid-options {
                display: flex; flex-wrap: wrap; justify-content: center; gap: 15px;
            }
            
            .arena-btn {
                padding: 15px 30px; font-size: 18px; font-weight: bold;
                background: #636e72; color: white; border: 2px solid #b2bec3;
                cursor: pointer; transition: all 0.2s; font-family: inherit;
            }
            .arena-btn:hover { background: #fdcb6e; color: #2d3436; transform: scale(1.05); }
            .arena-btn.correct { background: #00b894; border-color: #00b894; }
            .arena-btn.wrong { background: #d63031; border-color: #d63031; }
            
            .start-overlay {
                position: absolute; inset: 0; background: rgba(0,0,0,0.8);
                display: flex; flex-direction: column; align-items: center; justify-content: center; z-index: 50;
            }
            .roman-title {
                font-size: 50px; color: #fdcb6e; text-shadow: 0 5px 0 #d63031;
                margin-bottom: 30px; letter-spacing: 5px; font-weight: bold;
            }
            .start-btn {
                padding: 20px 50px; font-size: 24px; background: #d63031; color: white;
                border: 4px solid #fdcb6e; cursor: pointer; font-weight: bold;
            }
            
            /* Damage anims */
            .hit { animation: shake 0.5s; filter: sepia(1) hue-rotate(-50deg) saturate(5); }
            @keyframes shake { 0%, 100% {transform:translateX(0);} 25% {transform:translateX(-10px);} 75% {transform:translateX(10px);} }
        `;

        // Font
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        this.container.appendChild(style);
    }

    startBattle() {
        document.getElementById('start-overlay').style.display = 'none';
        super.start();
        this.playerHP = 100;
        this.enemyHP = 100;
        this.nextTurn();
    }

    nextTurn() {
        if (this.enemyHP <= 0) {
            this.endGame(true);
            return;
        }
        if (this.playerHP <= 0) {
            this.endGame(false);
            return;
        }

        const data = ROUNDS[Math.floor(Math.random() * ROUNDS.length)];
        this.currentRound = data;

        document.getElementById('target-type').textContent = data.type;

        // Generate grid
        const grid = document.getElementById('options-grid');
        grid.innerHTML = data.options.sort(() => Math.random() - 0.5).map(opt => `
            <button class="arena-btn" data-word="${opt}">${opt}</button>
        `).join('');

        grid.querySelectorAll('.arena-btn').forEach(btn => {
            btn.onclick = () => this.handleAttack(btn);
        });
    }

    handleAttack(btn) {
        const word = btn.dataset.word;
        const isCorrect = this.currentRound.correct.includes(word);

        if (isCorrect) {
            btn.classList.add('correct');
            this.playSound('sword');

            // Anim
            const player = this.container.querySelector('.player .sprite');
            player.animate([
                { transform: 'translateX(0)' },
                { transform: 'translateX(200px) rotate(20deg)' },
                { transform: 'translateX(0)' }
            ], { duration: 500 });

            // Damage enemy
            setTimeout(() => {
                this.enemyHP = Math.max(0, this.enemyHP - 25);
                document.getElementById('enemy-hp').style.width = this.enemyHP + '%';
                this.container.querySelector('.enemy .sprite').classList.add('hit');
                setTimeout(() => this.container.querySelector('.enemy .sprite').classList.remove('hit'), 500);
            }, 250);

            this.addScore(100);

            setTimeout(() => this.nextTurn(), 1000);

        } else {
            btn.classList.add('wrong');
            this.playSound('shield_block'); // Or error

            // Enemy attacks back!
            setTimeout(() => {
                const enemy = this.container.querySelector('.enemy .sprite');
                enemy.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-200px) rotate(-20deg)' },
                    { transform: 'translateX(0)' }
                ], { duration: 500 });

                setTimeout(() => {
                    this.playerHP = Math.max(0, this.playerHP - 20);
                    document.getElementById('player-hp').style.width = this.playerHP + '%';
                    this.container.querySelector('.player .sprite').classList.add('hit');
                    setTimeout(() => this.container.querySelector('.player .sprite').classList.remove('hit'), 500);

                    if (this.playerHP <= 0) setTimeout(() => this.endGame(false), 500);
                }, 250);
            }, 500);
        }
    }

    endGame(win) {
        this.end();
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new GrammarGladiatorGame(container, config);
}
