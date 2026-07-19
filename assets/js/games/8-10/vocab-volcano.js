/* assets/js/games/8-10/vocab-volcano.js
   Vocab Volcano - Ages 8-10
   
   Stop the volcano from erupting by choosing the correct definition!
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const VOCAB_DATA = [
    { word: "Obsolete", correct: "No longer used", options: ["Very popular", "Shiny and new", "Broken"] },
    { word: "Luminous", correct: "Giving off light", options: ["Heavy and dark", "Loud and noisy", "Soft and fluffy"] },
    { word: "Velocity", correct: "Speed in a direction", options: ["Heavy weight", "Bright color", "Loud sound"] },
    { word: "Habitat", correct: "Natural home", options: ["Bad habit", "Type of hat", "Shopping mall"] },
    { word: "Equivalent", correct: "Equal in value", options: ["Different", "Larger", "Smaller"] },
    { word: "Narrate", correct: "To tell a story", options: ["To sleep", "To eat quickly", "To run fast"] },
    { word: "Detect", correct: "To discover", options: ["To hide", "To protect", "To destroy"] },
    { word: "Abandon", correct: "Leave behind", options: ["Pick up", "Hold tight", "Build up"] },
    { word: "Massive", correct: "Huge", options: ["Tiny", "Invisible", "Weak"] },
    { word: "Ancient", correct: "Very old", options: ["Young", "Future", "Modern"] },
    { word: "Fragile", correct: "Easily broken", options: ["Very strong", "Very heavy", "Very fast"] },
    { word: "Curious", correct: "Eager to learn", options: ["Sleepy", "Angry", "Bored"] },
    { word: "Genuine", correct: "Real and true", options: ["Fake", "Borrowed", "Stolen"] },
    { word: "Peculiar", correct: "Strange or odd", options: ["Normal", "Common", "Simple"] },
    { word: "Vanish", correct: "Disappear", options: ["Appear", "Grow", "Shine"] },
    { word: "Triumph", correct: "Great victory", options: ["Big loss", "Sad moment", "Small step"] },
    { word: "Cautious", correct: "Careful", options: ["Reckless", "Brave", "Fast"] },
    { word: "Expand", correct: "Make bigger", options: ["Shrink", "Delete", "Freeze"] },
    { word: "Observe", correct: "Watch carefully", options: ["Ignore", "Break", "Hide"] },
    { word: "Vibrant", correct: "Full of energy", options: ["Dull", "Quiet", "Dark"] },
];

class VocabVolcanoGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.lavaLevel = 0; // 0 to 100
        this.maxLava = 100;
        this.lavaSpeed = 0.05; // Rise per frame
        this.score = 0;
        this.isErupting = false;
        this.currentQuestion = null;
    }

    async init() {
        this.container.innerHTML = `
            <div class="game-wrapper volcano-theme">
                <div class="sky-bg"></div>
                <div class="volcano-bg">
                    <div class="volcano-mountain"></div>
                    <div class="lava-column" id="lava-column"></div>
                </div>
                
                <div class="game-content">
                    <div class="header">
                         <div class="danger-meter">Lava Level: <span id="lava-val">0</span>%</div>
                         <div class="score-pill">Score: <span id="score-val">0</span></div>
                    </div>

                    <div class="question-box" id="question-box">
                        <div class="word-display" id="word-display">WORD</div>
                        <div class="timer-bar"><div class="bar-fill" id="timer-fill"></div></div>
                    </div>

                    <div class="options-grid" id="options-grid"></div>
                </div>

                <div class="fail-overlay" id="fail-overlay">
                    <div class="eruption-emoji">🌋</div>
                    <h1>ERUPTION!</h1>
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
                font-family: 'Rubik', sans-serif;
            }
            .sky-bg {
                position: absolute; inset: 0;
                background: linear-gradient(#fab1a0, #2d3436);
            }
            
            .volcano-bg {
                position: absolute; bottom: 0; left: 0; right: 0; height: 400px;
                display: flex; justify-content: center;
            }
            .volcano-mountain {
                width: 0; height: 0;
                border-left: 200px solid transparent;
                border-right: 200px solid transparent;
                border-bottom: 300px solid #636e72;
                position: absolute; bottom: 0;
            }
            .lava-column {
                position: absolute; bottom: 0; width: 60px;
                height: 0%; /* Grows */
                background: linear-gradient(to top, #d63031, #ff7675);
                box-shadow: 0 0 20px #d63031;
                transition: height 0.1s linear;
                z-index: 5;
            }
            
            .game-content {
                position: relative; z-index: 10;
                height: 100%; padding: 20px;
                display: flex; flex-direction: column; align-items: center;
            }
            
            .header {
                width: 100%; display: flex; justify-content: space-between;
                color: white; font-weight: bold; font-size: 20px;
            }
            .danger-meter { color: #ff7675; }
            
            .question-box {
                margin-top: 40px;
                background: white; padding: 20px 40px;
                border-radius: 15px; text-align: center;
                box-shadow: 0 10px 20px rgba(0,0,0,0.3);
                border: 4px solid #fdcb6e;
                animation: float 3s infinite ease-in-out;
            }
            @keyframes float { 0, 100% {transform:translateY(0);} 50% {transform:translateY(-10px);} }
            
            .word-display { font-size: 36px; font-weight: 900; color: #2d3436; margin-bottom: 10px; }
            
            .options-grid {
                margin-top: 40px;
                display: grid; grid-template-columns: 1fr 1fr; gap: 20px;
                width: 100%; max-width: 600px;
            }
            
            .option-btn {
                background: rgba(255,255,255,0.9);
                padding: 20px; border-radius: 10px;
                font-size: 18px; color: #2d3436; font-weight: bold;
                border: none; cursor: pointer;
                box-shadow: 0 5px 0 #b2bec3;
                transition: transform 0.1s;
            }
            .option-btn:hover { background: white; transform: translateY(-2px); }
            .option-btn:active { transform: translateY(2px); box-shadow: none; }
            
            .option-btn.correct { background: #00b894; color: white; box-shadow: 0 5px 0 #00a884; }
            .option-btn.wrong { background: #d63031; color: white; box-shadow: 0 5px 0 #c0392b; opacity: 0.5; }

            .fail-overlay {
                position: absolute; inset: 0; background: rgba(214, 48, 49, 0.9);
                display: flex; flex-direction: column; align-items: center; justify-content: center;
                color: white; z-index: 50;
                opacity: 0; pointer-events: none; transition: opacity 0.5s;
            }
            .fail-overlay.visible { opacity: 1; pointer-events: auto; }
            .eruption-emoji { font-size: 100px; animation: shake 0.5s infinite; }
            @keyframes shake { 0%, 100% {transform:translateX(0);} 25% {transform:translateX(-10px);} 75% {transform:translateX(10px);} }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.score = 0;
        this.lavaLevel = 0;
        this.isErupting = false;
        this.nextQuestion();
        this.gameLoop();
    }

    gameLoop() {
        if (this.isErupting) return;

        // Lava rises
        this.lavaLevel += this.lavaSpeed * (1 + (this.score / 1000)); // Gets harder

        const lavaEl = document.getElementById('lava-column');
        const lavaVal = document.getElementById('lava-val');

        if (lavaEl) lavaEl.style.height = Math.min(100, this.lavaLevel * 3) + '%'; // Multiply for visual height relative to column
        if (lavaVal) lavaVal.textContent = Math.floor(this.lavaLevel);

        if (this.lavaLevel >= 100) {
            this.erupt();
        } else {
            requestAnimationFrame(() => this.gameLoop());
        }
    }

    nextQuestion() {
        const data = this.pickFromBag(VOCAB_DATA, 'vocabulary');
        this.currentQuestion = data;

        document.getElementById('word-display').textContent = data.word;

        const opts = [data.correct, ...data.options].sort(() => Math.random() - 0.5);
        const grid = document.getElementById('options-grid');

        grid.replaceChildren();
        opts.forEach((opt) => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'option-btn';
            btn.dataset.text = String(opt);
            btn.textContent = String(opt);
            btn.onclick = () => this.handleAnswer(btn, btn.dataset.text === data.correct);
            grid.appendChild(btn);
        });
    }

    handleAnswer(btn, isCorrect) {
        if (isCorrect) {
            // Correct
            btn.classList.add('correct');
            this.playSound('success');

            // Lower lava
            this.lavaLevel = Math.max(0, this.lavaLevel - 20); // Relief

            this.addScore(100);
            document.getElementById('score-val').textContent = this.score;

            this.confetti.explode(btn, null, 10);
            this.celebrateMove({ burst: btn.dataset.text.toUpperCase(), duration: 700 });

            setTimeout(() => this.nextQuestion(), 1000);
        } else {
            // Wrong
            btn.classList.add('wrong');
            this.playSound('error');

            // Raise lava!
            this.lavaLevel += 15;
            Animations.shake(document.querySelector('.game-wrapper'));
            this.coachMove();
        }
    }

    erupt() {
        this.isErupting = true;
        document.getElementById('fail-overlay').classList.add('visible');
        this.playSound('explosion'); // Hypothetical sound
        setTimeout(() => {
            this.end();
            this.showResults(this.saveScore());
        }, 2500);
    }
}

export function createGame(container, config) {
    return new VocabVolcanoGame(container, config);
}
