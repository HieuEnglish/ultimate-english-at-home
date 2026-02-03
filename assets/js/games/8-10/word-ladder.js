/* assets/js/games/8-10/word-ladder.js
   Ladder Climber (Word Ladder) - Ages 8-10
   
   Climb the ladder by changing one letter at a time to reach the target word.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const LEVELS = [
    {
        start: "CAT",
        end: "DOG",
        rungs: [
            { word: "CAT", type: "start", hint: "Start here" },
            { word: "COT", type: "input", hint: "A baby sleeps in a..." },
            { word: "DOT", type: "input", hint: "A small circle" },
            { word: "DOG", type: "end", hint: "Target word!" }
        ]
    },
    {
        start: "COLD",
        end: "WARM",
        rungs: [
            { word: "COLD", type: "start", hint: "Start here" },
            { word: "CORD", type: "input", hint: "A rope or wire" },
            { word: "WARD", type: "input", hint: "Hospital section" },
            { word: "WARM", type: "end", hint: "Target word!" }
        ]
    },
    {
        start: "HEAD",
        end: "TAIL",
        rungs: [
            { word: "HEAD", type: "start", hint: "Top of your body" },
            { word: "HEAL", type: "input", hint: "To get better" },
            { word: "TEAL", type: "input", hint: "Blue-green color" },
            { word: "TELL", type: "input", hint: "Speak or say" },
            { word: "TALL", type: "input", hint: "Opposite of short" },
            { word: "TAIL", type: "end", hint: "Target word!" }
        ]
    },
    {
        start: "LION",
        end: "BEAR",
        rungs: [
            { word: "LION", type: "start", hint: "King of the jungle" },
            { word: "LOON", type: "input", hint: "A water bird" },
            { word: "LOOK", type: "input", hint: "See with eyes" },
            { word: "BOOK", type: "input", hint: "Read a..." },
            { word: "BOOT", type: "input", hint: "Wear on foot" },
            { word: "BOAT", type: "input", hint: "Travel on water" },
            { word: "BEAT", type: "input", hint: "Rhythm of music" },
            { word: "BEAR", type: "end", hint: "Target word!" }
        ]
    }
];

class LadderClimberGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentLevelIndex = 0;
        this.currentRungIndex = 1; // Start input at 1
    }

    async init() {
        this.container.innerHTML = `
            <div class="game-wrapper ladder-theme">
                <div class="sky-bg">
                     <div class="cloud c1">☁️</div>
                     <div class="cloud c2">☁️</div>
                </div>
                
                <div class="game-content">
                    <div class="header">
                         <div class="level-badge">Level <span id="level-num">1</span></div>
                         <div class="score-badge">⭐ <span id="score-val">0</span></div>
                    </div>

                    <div class="ladder-area" id="ladder-area">
                        <!-- Rungs generated here -->
                    </div>

                    <div class="controls-area">
                         <div class="hint-box" id="hint-box">Hint: ...</div>
                         <div class="keyboard" id="keyboard"></div>
                    </div>
                </div>
                
                <div class="climber-avatar" id="climber">🧗</div>

                <div class="celebration" id="celebration">
                    <span class="celeb-emoji">🚩</span>
                    <span class="celeb-text">LEVEL COMPLETE!</span>
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
                background: linear-gradient(#4facfe 0%, #00f2fe 100%);
                position: relative; overflow: hidden;
                border-radius: 20px;
                font-family: 'Courier New', monospace;
            }
            .sky-bg { position: absolute; inset: 0; pointer-events: none; }
            .cloud { position: absolute; font-size: 60px; opacity: 0.6; animation: drift 30s linear infinite; }
            .c1 { top: 50px; left: -100px; }
            .c2 { top: 150px; left: -200px; animation-delay: -15s; }
            @keyframes drift { to { transform: translateX(800px); } }

            .game-content {
                position: relative; z-index: 10;
                height: 100%; display: flex; flex-direction: column;
                padding: 20px;
            }
            
            .header {
                display: flex; justify-content: space-between;
                font-family: 'Fredoka One', sans-serif;
            }
            .level-badge, .score-badge {
                background: white; padding: 5px 15px; border-radius: 20px;
                font-size: 20px; color: #0984e3; box-shadow: 0 4px 0 rgba(0,0,0,0.1);
            }

            .ladder-area {
                flex: 1; display: flex; flex-direction: column-reverse; /* Bottom up */
                justify-content: center; align-items: center;
                gap: 10px; margin-bottom: 20px;
            }

            .rung-container {
                position: relative;
                width: 240px; height: 50px;
                background: #e17055;
                border-radius: 5px;
                display: flex; align-items: center; justify-content: center;
                box-shadow: 0 5px 0 #d35400;
            }
            .rung-container::before, .rung-container::after {
                content: ''; position: absolute; top: -10px; bottom: -20px; width: 15px; background: #636e72; z-index: -1;
            }
            .rung-container::before { left: 10px; }
            .rung-container::after { right: 10px; }

            .rung-text {
                font-size: 28px; font-weight: bold; color: white; letter-spacing: 5px;
            }
            
            .rung-container.current {
                background: #fdcb6e; box-shadow: 0 5px 0 #e1b12c;
                transform: scale(1.1);
                z-index: 5;
            }
            .rung-container.done { background: #00b894; box-shadow: 0 5px 0 #00a884; }
            .rung-container.locked { background: #b2bec3; box-shadow: 0 5px 0 #636e72; opacity: 0.7; }

            .controls-area {
                background: rgba(255,255,255,0.9);
                padding: 15px; border-radius: 20px;
                box-shadow: 0 -5px 20px rgba(0,0,0,0.1);
            }

            .hint-box {
                text-align: center; color: #2d3436; font-weight: bold; margin-bottom: 10px;
                font-family: sans-serif; font-size: 16px; min-height: 20px;
            }

            .keyboard {
                display: flex; flex-wrap: wrap; justify-content: center; gap: 5px;
            }
            .key {
                width: 32px; height: 40px; background: white; border: 1px solid #b2bec3;
                border-radius: 5px; display: flex; align-items: center; justify-content: center;
                font-weight: bold; cursor: pointer; color: #2d3436;
                box-shadow: 0 2px 0 #b2bec3; font-family: sans-serif;
            }
            .key:active { transform: translateY(2px); box-shadow: none; }
            .key.wide { width: 60px; background: #ff7675; color: white; border-color: #d63031; }

            .climber-avatar {
                position: absolute; left: 50%; top: 50%;
                font-size: 50px;
                transform: translate(140px, 0); /* To the right of ladder */
                transition: top 0.5s;
                z-index: 20;
            }

            .celebration {
                position: absolute; inset: 0;
                background: rgba(0, 184, 148, 0.9);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                opacity: 0; pointer-events: none; transition: opacity 0.5s; z-index: 50;
            }
            .celebration.visible { opacity: 1; pointer-events: auto; }
            .celeb-emoji { font-size: 100px; animation: bounce 1s infinite; }
            .celeb-text { color: white; font-size: 40px; font-weight: bold; margin-top: 20px; font-family: 'Fredoka One'; }
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.setupKeyboard();
        this.loadLevel();
    }

    setupKeyboard() {
        const kb = document.getElementById('keyboard');
        const rows = [
            "QWERTYUIOP",
            "ASDFGHJKL",
            "ZXCVBNM"
        ];

        let html = "";
        rows.forEach(row => {
            html += `<div style="display:flex; gap:5px; justify-content:center; width:100%; margin-bottom:5px;">`;
            row.split('').forEach(char => {
                html += `<div class="key" data-key="${char}">${char}</div>`;
            });
            html += `</div>`;
        });

        // Add Delete button
        html += `<div style="display:flex; justify-content:center; margin-top:5px;"><div class="key wide" data-key="DEL">BACK</div></div>`;

        kb.innerHTML = html;

        kb.querySelectorAll('.key').forEach(k => {
            k.onclick = () => this.handleInput(k.dataset.key);
        });
    }

    loadLevel() {
        if (this.currentLevelIndex >= LEVELS.length) {
            this.showResults(true);
            return;
        }

        this.level = JSON.parse(JSON.stringify(LEVELS[this.currentLevelIndex]));
        this.currentRungIndex = 1;
        this.currentInput = "";
        this.inputLength = this.level.rungs[0].word.length;

        document.getElementById('level-num').textContent = this.currentLevelIndex + 1;
        this.renderLadder();
        this.updateClimber();
    }

    renderLadder() {
        const container = document.getElementById('ladder-area');

        container.innerHTML = this.level.rungs.map((rung, index) => {
            let content = rung.word;
            let statusClass = "";

            if (index < this.currentRungIndex) {
                statusClass = "done"; // Completed rungs (start or solved)
            } else if (index === this.currentRungIndex) {
                statusClass = "current";
                // Show input placeholders
                content = this.currentInput.padEnd(this.inputLength, '_').split('').join(' ');
            } else {
                statusClass = "locked";
                if (rung.type === 'end') {
                    // Show end word partially or fully? Let's show it fully so they know target
                    content = rung.word;
                } else {
                    content = "? ? ? ?"; // Hidden intermediate
                    content = Array(this.inputLength).fill('?').join(' ');
                }
            }

            return `
                <div class="rung-container ${statusClass}" id="rung-${index}">
                    <div class="rung-text">${content}</div>
                </div>
            `;
        }).join('');

        const currentHint = this.level.rungs[this.currentRungIndex].hint;
        document.getElementById('hint-box').textContent = `Hint: ${currentHint}`;
    }

    updateClimber() {
        // Position climber next to current rung
        // Since flex-direction is column-reverse, visual top is different.
        // Let's just calculate based on index vs total

        const rungs = document.querySelectorAll('.rung-container');
        // Because of flex-reverse, index 0 (start) is at bottom
        // DOM order is top-down logic if we didn't use reverse?
        // Actually map output order is 0..N. 
        // With column-reverse, the first element in DOM (index 0, Start) is at BOTTOM.

        // Let's find the current rung element in DOM
        const targetRung = document.getElementById(`rung-${this.currentRungIndex - 1}`);
        // Climber stands on the PREVIOUS rung (completed one)

        if (targetRung) {
            const rect = targetRung.getBoundingClientRect();
            const wrapperRect = this.container.querySelector('.game-wrapper').getBoundingClientRect();

            // Relative top
            const top = rect.top - wrapperRect.top;

            const avatar = document.getElementById('climber');
            avatar.style.top = (top - 20) + 'px';
        }
    }

    handleInput(key) {
        if (key === 'DEL') {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            if (this.currentInput.length < this.inputLength) {
                this.currentInput += key;
            }
        }

        this.renderLadder();

        if (this.currentInput.length === this.inputLength) {
            this.checkWord();
        }
    }

    checkWord() {
        const target = this.level.rungs[this.currentRungIndex].word; // Although in 'input' type, the 'word' field holds the correct answer in our data structure

        // Wait minor delay for visual input update
        setTimeout(() => {
            if (this.currentInput === target) {
                // Correct
                this.playSound('success');
                this.currentRungIndex++;
                this.currentInput = "";
                this.updateClimber();

                // Check finish
                if (this.currentRungIndex >= this.level.rungs.length - 1) {
                    // Reached target (index = length-1 is the 'end' rung)
                    // Actually, if we solve the one before end, do we need to solve End?
                    // In our data, End is "Target word!". We just stepped on second to last.
                    // Let's move climber to top
                    this.currentRungIndex++;
                    this.updateClimber();

                    this.levelComplete();
                } else {
                    this.renderLadder();
                }
            } else {
                // Wrong
                this.playSound('error');
                const rung = document.querySelector('.rung-container.current');
                Animations.shake(rung);
                this.currentInput = "";
                setTimeout(() => this.renderLadder(), 500);
            }
        }, 200);
    }

    levelComplete() {
        const celeb = document.getElementById('celebration');
        celeb.classList.add('visible');
        this.addScore(500);
        this.confetti.explode(null, null, 20);

        setTimeout(() => {
            celeb.classList.remove('visible');
            this.currentLevelIndex++;
            this.loadLevel();
        }, 2500);
    }
}

export function createGame(container, config) {
    return new LadderClimberGame(container, config);
}
