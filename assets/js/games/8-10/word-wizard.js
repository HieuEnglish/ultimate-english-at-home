/* assets/js/games/8-10/word-wizard.js
   Word Wizard - Ages 8-10
   
   Battle monsters by casting spelling spells!
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const SPELLS = [
    { word: "MYSTERY", hint: "Something unknown" },
    { word: "ANCIENT", hint: "Very old" },
    { word: "KNIGHT", hint: "Warrior in armor" },
    { word: "CASTLE", hint: "King's home" },
    { word: "DRAGON", hint: "Fire breather" },
    { word: "MAGIC", hint: "Supernatural power" },
    { word: "SHIELD", hint: "Protection gear" },
    { word: "FOREST", hint: "Many trees" },
    { word: "CRYSTAL", hint: "Shiny stone" },
    { word: "LEGEND", hint: "Famous story" },
    { word: "POTION", hint: "Magical drink" },
    { word: "THRONE", hint: "Royal seat" },
    { word: "WIZARD", hint: "Spell caster" },
    { word: "TEMPLE", hint: "Sacred place" },
    { word: "SCROLL", hint: "Written roll" },
    { word: "SHADOW", hint: "Dark outline" },
    { word: "SILVER", hint: "Shiny metal" },
    { word: "GOBLIN", hint: "Small creature" },
    { word: "VOYAGE", hint: "Long journey" },
    { word: "RIDDLE", hint: "Brain puzzle" },
];

class WordWizardGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.currentSpell = null;
        this.inputBuffer = "";
    }

    async init() {
        this.container.innerHTML = `
            <div class="game-wrapper wizard-theme">
                <div class="dungeon-bg"></div>
                
                <div class="battle-scene">
                    <div class="character player">
                        <div class="health-bar"><div class="hp-fill" id="player-hp" style="width:100%"></div></div>
                        <div class="avatar">🧙‍♂️</div>
                        <div class="effect-box" id="player-effect"></div>
                    </div>
                    
                    <div class="vs-badge">VS</div>
                    
                    <div class="character monster">
                        <div class="health-bar"><div class="hp-fill" id="monster-hp" style="width:100%"></div></div>
                        <div class="avatar" id="monster-avatar">🐲</div>
                        <div class="effect-box" id="monster-effect"></div>
                    </div>
                </div>

                <div class="spell-book">
                    <div class="spell-hint" id="spell-hint">GET READY!</div>
                    <div class="spell-display" id="spell-display"></div>
                </div>
                
                <div class="keyboard-area" id="keyboard"></div>

                <div class="celebration" id="celebration">
                    <div class="celeb-content">
                        <div class="celeb-icon">🏆</div>
                        <div class="celeb-text">VICTORY!</div>
                    </div>
                </div>
            </div>
        `;

        this.injectStyles();
        this.start();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-wrapper {
                width: 100%; height: 600px;
                background: #2d3436;
                position: relative; overflow: hidden;
                border-radius: 20px;
                font-family: 'MedievalSharp', cursive, serif;
                color: white;
            }
            .dungeon-bg {
                position: absolute; inset: 0;
                background-image: radial-gradient(circle at 50% 50%, #636e72 10%, #2d3436 80%);
                opacity: 0.5;
            }
            
            .battle-scene {
                position: relative; z-index: 10;
                height: 350px;
                display: flex; justify-content: space-around; align-items: center;
                padding-top: 40px;
            }
            
            .character {
                display: flex; flex-direction: column; align-items: center;
                position: relative;
            }
            .avatar {
                font-size: 100px;
                filter: drop-shadow(0 0 20px rgba(0,0,0,0.5));
                transition: transform 0.2s;
            }
            .health-bar {
                width: 100px; height: 10px; background: #636e72;
                border-radius: 5px; margin-bottom: 10px; overflow: hidden;
                border: 2px solid #2d3436;
            }
            .hp-fill {
                height: 100%; background: #00b894;
                transition: width 0.3s;
            }
            .monster .hp-fill { background: #d63031; }
            
            .vs-badge {
                font-size: 40px; font-weight: bold; color: #fdcb6e;
                text-shadow: 0 0 10px #d63031;
            }
            
            .effect-box {
                position: absolute; top: 50%; left: 50%;
                transform: translate(-50%, -50%);
                font-size: 60px; pointer-events: none;
                opacity: 0; transition: opacity 0.2s;
            }
            
            .spell-book {
                position: relative; z-index: 10;
                background: rgba(0,0,0,0.6);
                padding: 10px;
                text-align: center;
                border-top: 4px solid #fdcb6e;
                height: 100px;
            }
            .spell-hint { color: #fab1a0; font-size: 18px; margin-bottom: 5px; }
            .spell-display {
                font-family: 'Courier New', monospace;
                font-size: 36px; letter-spacing: 5px; font-weight: bold;
                color: #ffeaa7; text-shadow: 0 0 10px #fdcb6e;
            }
            .spell-char.done { color: #55efc4; }
            .spell-char.error { color: #ff7675; }
            
            .keyboard-area {
                position: relative; z-index: 10;
                display: flex; justify-content: center; flex-wrap: wrap; gap: 5px;
                padding: 10px; background: rgba(0,0,0,0.8);
                height: 150px; overflow-y: auto;
            }
            .key-btn {
                width: 40px; height: 45px;
                background: #6c5ce7; border: 2px solid #a29bfe;
                color: white; border-radius: 5px;
                font-size: 18px; font-weight: bold; cursor: pointer;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 4px 0 #4834d4;
            }
            .key-btn:active { transform: translateY(2px); box-shadow: none; }
            .key-btn.used { opacity: 0.5; background: #2d3436; }

            .celebration {
                position: absolute; inset: 0; z-index: 50;
                background: rgba(0,0,0,0.8);
                display: flex; align-items: center; justify-content: center;
                opacity: 0; pointer-events: none; transition: opacity 0.5s;
            }
            .celebration.visible { opacity: 1; pointer-events: auto; }
            .celeb-content { text-align: center; animation: zoomIn 0.5s; }
            @keyframes zoomIn { from { transform: scale(0); } to { transform: scale(1); } }
            .celeb-icon { font-size: 80px; margin-bottom: 10px; }
            .celeb-text { font-size: 40px; color: #fdcb6e; }
        `;
        // Load font
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=MedievalSharp&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);

        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.playerHealth = 100;
        this.monsterHealth = 100;
        this.setupKeyboard();
        this.nextTurn();
    }

    setupKeyboard() {
        const kb = document.getElementById('keyboard');
        const keys = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('');
        kb.innerHTML = keys.map(k => `<div class="key-btn" data-key="${k}">${k}</div>`).join('');

        kb.querySelectorAll('.key-btn').forEach(btn => {
            btn.onclick = () => this.handleInput(btn.dataset.key);
        });
    }

    nextTurn() {
        if (this.monsterHealth <= 0) {
            this.endGame(true);
            return;
        }
        if (this.playerHealth <= 0) {
            this.endGame(false);
            return;
        }

        const spell = SPELLS[Math.floor(Math.random() * SPELLS.length)];
        this.currentSpell = spell;
        this.inputBuffer = "";

        document.getElementById('spell-hint').textContent = `Hint: ${spell.hint}`;
        this.renderWord();

        // Monster attacks periodically? Or just turn based?
        // Let's make it timed: if you take too long, monster bites.
        // For now, simple spelling.
    }

    renderWord() {
        const display = document.getElementById('spell-display');
        display.innerHTML = this.currentSpell.word.split('').map((char, i) => {
            let className = "spell-char";
            if (i < this.inputBuffer.length) {
                if (this.inputBuffer[i] === char) className += " done";
                else className += " error";
            }
            return `<span class="${className}">${i < this.inputBuffer.length ? this.inputBuffer[i] : '_'}</span>`;
        }).join('');
    }

    handleInput(char) {
        if (this.inputBuffer.length < this.currentSpell.word.length) {
            this.inputBuffer += char;
            this.renderWord();

            // Validate correctness immediately? 
            // Or wait for full word?
            // Let's validate immediately
            const currentIndex = this.inputBuffer.length - 1;
            const expected = this.currentSpell.word[currentIndex];

            if (char === expected) {
                // Good
                this.playSound('click');

                if (this.inputBuffer.length === this.currentSpell.word.length) {
                    this.castSpell();
                }
            } else {
                // Bad - remove wrong char
                this.playSound('error');
                this.inputBuffer = this.inputBuffer.slice(0, -1);
                // Feedback
                Animations.shake(document.getElementById('spell-display'));
                this.takeDamage(10);
            }
        }
    }

    castSpell() {
        this.playSound('success');

        // Visuals
        const pEffect = document.getElementById('player-effect');
        pEffect.textContent = '✨';
        pEffect.style.opacity = 1;
        pEffect.animate([
            { transform: 'translate(-50%, -50%) scale(1)' },
            { transform: 'translate(200%, -50%) scale(3)' } // Move to monster
        ], { duration: 500 }).onfinish = () => {
            pEffect.style.opacity = 0;
            this.damageMonster(20);
        };

        setTimeout(() => this.nextTurn(), 1500);
    }

    damageMonster(amount) {
        this.monsterHealth = Math.max(0, this.monsterHealth - amount);
        document.getElementById('monster-hp').style.width = this.monsterHealth + '%';
        Animations.shake(document.querySelector('.monster'));

        // Confetti
        this.confetti.explode(document.querySelector('.monster'), null, 10);
    }

    takeDamage(amount) {
        this.playerHealth = Math.max(0, this.playerHealth - amount);
        document.getElementById('player-hp').style.width = this.playerHealth + '%';
        Animations.shake(document.querySelector('.player'));
        document.getElementById('monster-avatar').animate([
            { transform: 'translateX(0)' },
            { transform: 'translateX(-50px)' },
            { transform: 'translateX(0)' }
        ], { duration: 300 });

        if (this.playerHealth <= 0) setTimeout(() => this.endGame(false), 500);
    }

    endGame(win) {
        if (win) {
            document.querySelector('#celebration .celeb-text').textContent = "VICTORY!";
            document.querySelector('#celebration .celeb-icon').textContent = "🏆";
            document.getElementById('celebration').classList.add('visible');
            this.saveScore(1000);
        } else {
            document.querySelector('#celebration .celeb-text').textContent = "DEFEAT";
            document.querySelector('#celebration .celeb-icon').textContent = "💀";
            document.getElementById('celebration').classList.add('visible');
        }
    }
}

export function createGame(container, config) {
    return new WordWizardGame(container, config);
}
