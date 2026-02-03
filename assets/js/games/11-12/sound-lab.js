/* assets/js/games/11-12/sound-lab.js
   Sound Lab - Ages 11-12
   
   Analyze sound waves to distinguish minimal pairs (e.g. Ship vs Sheep).
   Uses Text-to-Speech to generate audio.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const MINIMAL_PAIRS = [
    { word1: "Ship", word2: "Sheep", pronunciation: "Short 'i' vs Long 'ee'" },
    { word1: "Fit", word2: "Feet", pronunciation: "Short 'i' vs Long 'ee'" },
    { word1: "Full", word2: "Fool", pronunciation: "Short 'u' vs Long 'oo'" },
    { word1: "Bat", word2: "Bet", pronunciation: "'a' vs 'e'" },
    { word1: "Bad", word2: "Bed", pronunciation: "'a' vs 'e'" },
    { word1: "Cut", word2: "Cat", pronunciation: "'u' vs 'a'" },
    { word1: "Tree", word2: "Three", pronunciation: "'tr' vs 'th'" },
    { word1: "Sing", word2: "Thing", pronunciation: "'s' vs 'th'" },
    { word1: "Fan", word2: "Van", pronunciation: "'f' vs 'v'" },
    { word1: "Sip", word2: "Zip", pronunciation: "'s' vs 'z'" },
    { word1: "Right", word2: "Light", pronunciation: "'r' vs 'l'" },
    { word1: "Glass", word2: "Grass", pronunciation: "'l' vs 'r'" },
    { word1: "Boat", word2: "Vote", pronunciation: "'b' vs 'v'" },
    { word1: "Heart", word2: "Hut", pronunciation: "Long 'a' vs Short 'u'" },
    { word1: "Dark", word2: "Duck", pronunciation: "Long 'a' vs Short 'u'" }
];

class SoundLabGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: false });
        this.currentPair = null;
        this.correctWord = null;
        this.rounds = 0;
        this.score = 0;
        this.correctAnswers = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="sound-lab-game">
        <div class="lab-header">
          <div class="lab-title">🎚️ Sound Lab</div>
          <div class="lab-subtitle">Distinguish the sounds!</div>
        </div>

        <div class="oscilloscope-display">
          <div class="scope-screen">
            <div class="wave" id="wave-visual"></div>
            <div class="play-indicator" id="play-indicator">▶️ Playing...</div>
          </div>
          <div class="control-knobs">
             <div class="knob"></div>
             <div class="knob"></div>
             <div class="knob"></div>
          </div>
        </div>

        <div class="lab-controls">
          <button class="lab-btn play-btn" id="replay-btn">
            <span class="btn-icon">🔊</span> Check Sound
          </button>
        </div>

        <div class="options-container" id="options-container">
          <!-- Buttons injected here -->
        </div>

        <div class="game-feedback" id="game-feedback"></div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .sound-lab-game {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #2d3436;
        border-radius: 20px;
        color: white;
        font-family: 'Courier New', monospace;
      }

      .lab-header { text-align: center; margin-bottom: 20px; }
      .lab-title { font-size: 24px; font-weight: bold; color: #00cec9; text-shadow: 0 0 10px rgba(0,206,201,0.5); }
      .lab-subtitle { font-size: 14px; color: #b2bec3; margin-top: 5px; }

      .oscilloscope-display {
        background: #000;
        border: 4px solid #636e72;
        border-radius: 10px;
        padding: 10px;
        margin-bottom: 24px;
        position: relative;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.8);
      }

      .scope-screen {
        height: 120px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background: radial-gradient(circle, #001a1a 0%, #000 100%);
        border: 1px solid #004d40;
      }
      
      .grid-lines {
        position: absolute; inset: 0;
        background-image: linear-gradient(rgba(0,255,100,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,100,0.1) 1px, transparent 1px);
        background-size: 20px 20px;
      }

      .wave {
        width: 100%;
        height: 2px;
        background: #00b894;
        box-shadow: 0 0 8px #00b894;
        transform: scaleY(1);
        transition: transform 0.1s;
      }
      
      .wave.active {
        animation: waveAnim 0.5s ease-in-out infinite; 
      }

      @keyframes waveAnim {
        0% { transform: scaleY(1); }
        50% { transform: scaleY(20); background: #55efc4; }
        100% { transform: scaleY(1); }
      }

      .play-indicator {
        position: absolute;
        top: 10px; right: 10px;
        font-size: 12px;
        color: #00b894;
        opacity: 0;
      }
      .play-indicator.visible { opacity: 1; animation: blink 1s infinite; }

      @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }

      .control-knobs {
        display: flex; gap: 15px; margin-top: 10px; justify-content: center;
      }
      .knob {
        width: 30px; height: 30px;
        border-radius: 50%;
        background: linear-gradient(135deg, #b2bec3, #636e72);
        border: 2px solid #2d3436;
        box-shadow: 0 2px 5px rgba(0,0,0,0.5);
      }

      .lab-controls { display: flex; justify-content: center; margin-bottom: 30px; }
      
      .lab-btn {
        padding: 15px 30px;
        border-radius: 8px;
        border: none;
        font-family: inherit;
        font-weight: bold;
        font-size: 16px;
        background: #0984e3;
        color: white;
        cursor: pointer;
        display: flex; align-items: center; gap: 10px;
        transition: all 0.2s;
        box-shadow: 0 4px 0 #074e85;
      }
      .lab-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #074e85; }
      .lab-btn:hover { background: #74b9ff; }

      .options-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
      }

      .option-btn {
        background: #dfe6e9;
        color: #2d3436;
        border: none;
        padding: 20px;
        font-size: 24px;
        font-weight: bold;
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s;
        border: 3px solid transparent;
      }
      .option-btn:hover { transform: translateY(-3px); background: #fff; }
      
      .option-btn.correct { background: #55efc4; border-color: #00b894; color: #00604b; }
      .option-btn.wrong { background: #ff7675; border-color: #d63031; color: #690505; }

      .game-feedback {
        margin-top: 20px;
        min-height: 40px;
        text-align: center;
        font-weight: bold;
        color: #fab1a0;
      }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.nextRound();

        document.getElementById('replay-btn').onclick = () => this.playSound();
    }

    nextRound() {
        if (this.rounds >= 10) {
            this.end();
            return;
        }

        this.rounds++;
        this.resetUI();

        // Pick random pair
        this.currentPair = MINIMAL_PAIRS[Math.floor(Math.random() * MINIMAL_PAIRS.length)];

        // Pick one as correct
        const isFirst = Math.random() < 0.5;
        this.correctWord = isFirst ? this.currentPair.word1 : this.currentPair.word2;
        const otherWord = isFirst ? this.currentPair.word2 : this.currentPair.word1;

        // Render buttons
        const container = document.getElementById('options-container');
        container.innerHTML = '';

        const btn1 = this.createOptionBtn(isFirst ? this.correctWord : otherWord);
        const btn2 = this.createOptionBtn(isFirst ? otherWord : this.correctWord);

        // Randomize button order visualy if needed, but logic above creates layout. 
        // Actually, let's just shuffle the buttons array to random slots
        const buttons = [btn1, btn2].sort(() => Math.random() - 0.5);
        buttons.forEach(btn => container.appendChild(btn));

        // Wait a moment then play sound
        setTimeout(() => this.playSound(), 500);
    }

    createOptionBtn(text) {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = text;
        btn.onclick = () => this.checkAnswer(btn, text);
        return btn;
    }

    resetUI() {
        document.getElementById('game-feedback').innerHTML = '';
        const wave = document.getElementById('wave-visual');
        wave.classList.remove('active');
    }

    playSound() {
        if (window.UEAH_TTS) {
            const wave = document.getElementById('wave-visual');
            const indicator = document.getElementById('play-indicator');

            wave.classList.add('active');
            indicator.classList.add('visible');

            window.UEAH_TTS.speak(this.correctWord, { rate: 0.8 });

            // Turn off visuals after approx duration
            setTimeout(() => {
                wave.classList.remove('active');
                indicator.classList.remove('visible');
            }, 1000);
        }
    }

    checkAnswer(btn, selectedText) {
        if (this.isProcessing) return;
        this.isProcessing = true;

        const isCorrect = selectedText === this.correctWord;
        const feedback = document.getElementById('game-feedback');

        if (isCorrect) {
            btn.classList.add('correct');
            feedback.textContent = `Correct! (${this.currentPair.pronunciation})`;
            feedback.style.color = '#55efc4';
            this.score += 100;
            this.correctAnswers++;
            this.incrementCombo();
            if (this.combo >= 3) this.confetti.explode(null, null, 20);
        } else {
            btn.classList.add('wrong');
            feedback.textContent = `Target was: ${this.correctWord}`;
            feedback.style.color = '#ff7675';
            this.resetCombo();

            // Highlight correct one
            document.querySelectorAll('.option-btn').forEach(b => {
                if (b.textContent === this.correctWord) b.classList.add('correct');
            });
        }

        setTimeout(() => {
            this.isProcessing = false;
            this.nextRound();
        }, 2000);
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new SoundLabGame(container, config);
}
