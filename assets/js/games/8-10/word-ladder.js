/* assets/js/games/8-10/word-ladder.js
   Word Ladder - Ages 8-10
   
   Start at bottom rung (Start Word), climb to top (End Word).
   Change one letter at a time.
   E.g. CAT -> BAT -> BIT -> SIT
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const LADDERS = [
    { start: "CAT", end: "DOG", steps: ["COT", "DOT"], hint: "Sleep on a..." },
    // This is hard to gen dynamically properly without dictionary.
    // Let's use PRE-DEFINED chains where user fills in the missing step.

    {
        title: "Animals",
        chain: [
            { word: "CAT", type: "fixed" },
            { word: "BAT", type: "input", hint: "Flying night animal" },
            { word: "BAG", type: "input", hint: "Put groceries in it" },
            { word: "BUG", type: "fixed" }
        ]
    },
    {
        title: "Heat to Cold",
        chain: [
            { word: "HOT", type: "fixed" },
            { word: "DOT", type: "input", hint: "A small circle" },
            { word: "DOG", type: "input", hint: "Man's best friend" },
            { word: "LOG", type: "input", hint: "Part of a tree" },
            { word: "COLD", type: "fixed" } // Wait, LOG to COLD is 2 chars change. Ladder rules usually 1. 
            // Log -> Cog -> Cold (add L)?
            // Let's stick to true Word Ladder rules: Change 1 letter.
        ]
    },
    // Simple 3 letter chains for 8-10yo
    {
        title: "Pig to Sty",
        chain: [
            { word: "PIG", type: "fixed" },
            { word: "BIG", type: "input", hint: "Opposite of small" },
            { word: "BAG", type: "input", hint: "Paper or plastic?" },
            { word: "BAY", type: "input", hint: "Body of water" },
            { word: "SAY", type: "input", hint: "Speak" },
            { word: "STY", type: "fixed" }
            // BAY->SAY->STY? Yes.
        ]
    }
];

// Re-defining data structure for better gameplay
const LEVELS = [
    {
        start: "CAT",
        end: "DOG",
        rungs: [
            { word: "CAT", status: "locked" },
            { word: "___", answer: "COT", hint: "Baby's bed" },
            { word: "___", answer: "DOT", hint: "A small point" },
            { word: "DOG", status: "locked" }
        ]
    },
    {
        start: "MAN",
        end: "BOY",
        rungs: [
            { word: "MAN", status: "locked" },
            { word: "___", answer: "BAN", hint: "To forbid" },
            { word: "___", answer: "BAY", hint: "Where the ocean meets land" },
            { word: "BOY", status: "locked" }
        ]
    },
    {
        start: "FISH",
        end: "DISH",
        rungs: [
            { word: "FISH", status: "locked" },
            { word: "____", answer: "WISH", hint: "Make a..." },
            { word: "DISH", status: "locked" }
        ]
    }
];

class WordLadderGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentLevel = 0;
        this.currentRungIndex = 1; // Start at first unknown rung
    }

    async init() {
        this.container.innerHTML = `
      <div class="game-wrapper ladder-theme">
        <div class="sky-bg"></div>
        <div class="ladder-container" id="ladder-container"></div>
        
        <div class="controls-area">
           <div class="hint-display" id="hint-display">Solving...</div>
           <div class="keyboard" id="keyboard"></div>
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
        background: #87CEEB;
        position: relative; overflow: hidden;
        display: flex; flex-direction: column;
        font-family: 'Courier New', monospace;
      }
      
      .sky-bg {
        position: absolute; inset: 0;
        background: linear-gradient(#87CEEB, #E0F7FA);
        z-index: 0;
      }
      
      .ladder-container {
        flex: 1; z-index: 10;
        display: flex; flex-direction: column-reverse; /* Bottom up */
        justify-content: center; align-items: center;
        gap: 20px;
        padding-bottom: 20px;
      }
      
      .rung {
        width: 200px; height: 60px;
        background: #8B4513;
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        color: white; font-weight: bold; font-size: 28px; letter-spacing: 5px;
        box-shadow: 0 5px 10px rgba(0,0,0,0.3);
        position: relative;
      }
      .rung::before, .rung::after {
        content: ''; position: absolute; top: -30px; bottom: -30px; width: 10px; background: #5D4037; z-index: -1;
      }
      .rung::before { left: 10px; }
      .rung::after { right: 10px; }
      
      .rung.active {
        background: #D2691E;
        border: 2px solid yellow;
        animation: pulse 1s infinite alternate;
      }
      @keyframes pulse { from { transform: scale(1); } to { transform: scale(1.05); } }
      
      .rung.locked { background: #5D4037; color: #aaa; }
      .rung.done { background: #2E7D32; }
      
      .controls-area {
        z-index: 20; background: white; padding: 20px;
        border-top: 4px solid #aaa;
      }
      
      .hint-display {
        text-align: center; font-size: 18px; color: #2c3e50; margin-bottom: 20px;
        font-weight: bold; font-family: sans-serif;
      }
      
      .keyboard {
        display: flex; flex-wrap: wrap; justify-content: center; gap: 5px;
      }
      .key {
        width: 40px; height: 40px; background: #ecf0f1; border: 1px solid #bdc3c7;
        border-radius: 4px; font-weight: bold; cursor: pointer;
        display: flex; align-items: center; justify-content: center;
      }
      .key:hover { background: #bdc3c7; }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.currentLevel = 0;
        this.setupKeyboard();
        this.loadLevel();
    }

    setupKeyboard() {
        // Standard QWERTY or A-Z? Let's do A-Z for simplicity
        const keys = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const kb = document.getElementById('keyboard');
        kb.innerHTML = keys.map(k => `<div class="key" data-key="${k}">${k}</div>`).join('') +
            `<div class="key" data-key="DEL">🔙</div>`;

        kb.querySelectorAll('.key').forEach(k => {
            k.onclick = () => this.handleKey(k.dataset.key);
        });
    }

    loadLevel() {
        if (this.currentLevel >= LEVELS.length) {
            this.showResults(true);
            return;
        }

        this.levelData = JSON.parse(JSON.stringify(LEVELS[this.currentLevel])); // Deep copy

        // Find first unknown
        this.currentRungIndex = this.levelData.rungs.findIndex(r => !r.status || r.status !== 'locked');
        if (this.currentRungIndex === -1) {
            // Level done?
            this.currentLevel++;
            this.loadLevel();
            return;
        }

        // Init input state
        this.userInput = "";

        this.renderLadder();
    }

    renderLadder() {
        const container = document.getElementById('ladder-container');
        container.innerHTML = this.levelData.rungs.map((rung, i) => {
            let content = rung.word;
            let className = "rung";

            if (rung.status === 'locked') {
                className += " locked";
            } else if (i < this.currentRungIndex) {
                className += " done";
                content = rung.answer; // Show answer if done
            } else if (i === this.currentRungIndex) {
                className += " active";
                // Show placeholders + user input
                const len = rung.answer.length;
                const filled = this.userInput.padEnd(len, '_');
                content = filled;
            } else {
                content = "?".repeat(rung.answer.length);
            }

            return `<div class="${className}">${content}</div>`;
        }).join('');

        // Hint
        const currentRung = this.levelData.rungs[this.currentRungIndex];
        document.getElementById('hint-display').textContent = `Hint: ${currentRung.hint}`;
    }

    handleKey(key) {
        const targetLen = this.levelData.rungs[this.currentRungIndex].answer.length;

        if (key === 'DEL') {
            this.userInput = this.userInput.slice(0, -1);
        } else {
            if (this.userInput.length < targetLen) {
                this.userInput += key;
            }
        }

        this.renderLadder();

        if (this.userInput.length === targetLen) {
            this.checkAnswer();
        }
    }

    checkAnswer() {
        const target = this.levelData.rungs[this.currentRungIndex].answer;
        if (this.userInput === target) {
            // Correct
            this.playSound('success');
            this.levelData.rungs[this.currentRungIndex].word = target; // Fix it
            this.currentRungIndex++;
            this.userInput = "";

            // Check if level complete (next is locked end word)
            if (this.levelData.rungs[this.currentRungIndex].status === 'locked') {
                setTimeout(() => {
                    this.addScore(300);
                    this.currentLevel++;
                    this.loadLevel();
                }, 1000);
            } else {
                this.renderLadder();
            }
        } else {
            // Wrong - shake
            const activeRung = this.container.querySelector('.rung.active');
            Animations.shake(activeRung);
            setTimeout(() => {
                this.userInput = "";
                this.renderLadder();
            }, 500);
        }
    }
}

export function createGame(container, config) {
    return new WordLadderGame(container, config);
}
