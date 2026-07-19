/* assets/js/games/8-10/speed-typing.js
   Speed Typing - Ages 8-10
   
   MODERN VERSION - Type words as fast as you can!
   Arcade-style typing game with power-ups.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const WORDS = [
    "apple", "beach", "cloud", "dream", "eagle", "flame", "globe", "happy",
    "island", "jungle", "kite", "lemon", "magic", "night", "ocean", "piano",
    "queen", "river", "storm", "tiger", "unity", "vivid", "water", "youth",
    "zebra", "arrow", "brain", "candy", "dance", "earth", "frost", "ghost",
    "heart", "image", "jolly", "knife", "light", "music", "noble", "orbit",
    "pearl", "quest", "solar", "train", "ultra", "voice", "wheat", "pixel",
    "blaze", "crisp", "dwarf", "ember", "flute", "grape", "haven", "ivory",
    "joust", "karma", "lunar", "maple",
];

class SpeedTypingGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 60 });
        this.currentWord = '';
        this.typedText = '';
        this.wordsCompleted = 0;
        this.accuracy = 100;
        this.totalChars = 0;
        this.correctChars = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="typing-game">
        <div class="typing-bg">
          <div class="typing-grid"></div>
        </div>
        
        <div class="typing-stage">
          <!-- HUD -->
          <div class="typing-hud">
            <div class="hud-pill timer-pill">
              <span class="pill-icon">⏱️</span>
              <span class="pill-val" id="timer-display">1:00</span>
            </div>
            <div class="hud-pill score-pill">
              <span class="pill-icon">⭐</span>
              <span class="pill-val" id="score-display">0</span>
            </div>
            <div class="hud-pill words-pill">
              <span class="pill-icon">📝</span>
              <span class="pill-val" id="words-display">0</span>
            </div>
          </div>
          
          <!-- Combo display -->
          <div class="combo-zone" id="combo-zone">
            <span class="combo-fire">🔥</span>
            <span class="combo-num" id="combo-num">0</span>
            <span class="combo-text">combo</span>
          </div>
          
          <!-- Word display -->
          <div class="word-zone">
            <div class="word-display" id="word-display"></div>
            <div class="typed-display" id="typed-display"></div>
          </div>
          
          <!-- Input area -->
          <div class="input-zone">
            <input type="text" class="typing-input" id="typing-input" 
              autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
              placeholder="Type here...">
          </div>
          
          <!-- Stats bar -->
          <div class="stats-bar">
            <div class="stat-item">
              <span class="stat-label">WPM</span>
              <span class="stat-val" id="wpm-val">0</span>
            </div>
            <div class="stat-item">
              <span class="stat-label">Accuracy</span>
              <span class="stat-val" id="accuracy-val">100%</span>
            </div>
          </div>
          
          <!-- Power-up bar -->
          <div class="powerup-bar" id="powerup-bar">
            <div class="powerup ready" id="powerup-slow">
              <span class="powerup-icon">🐢</span>
              <span class="powerup-key">1</span>
            </div>
            <div class="powerup ready" id="powerup-skip">
              <span class="powerup-icon">⏭️</span>
              <span class="powerup-key">2</span>
            </div>
            <div class="powerup ready" id="powerup-double">
              <span class="powerup-icon">2️⃣</span>
              <span class="powerup-key">3</span>
            </div>
          </div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .typing-game {
        position: relative;
        width: 100%;
        min-height: 480px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%);
      }
      
      .typing-bg {
        position: absolute;
        inset: 0;
        opacity: 0.1;
        background-image: 
          linear-gradient(rgba(100,100,255,0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(100,100,255,0.1) 1px, transparent 1px);
        background-size: 30px 30px;
      }
      
      .typing-stage {
        position: relative;
        padding: 20px;
        max-width: 500px;
        margin: 0 auto;
      }
      
      .typing-hud {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .hud-pill {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 10px 18px;
        background: rgba(255,255,255,0.1);
        border-radius: 50px;
        border: 1px solid rgba(255,255,255,0.15);
      }
      .pill-icon { font-size: 18px; }
      .pill-val { font-size: 18px; font-weight: 800; color: white; }
      .timer-pill .pill-val { color: #74b9ff; }
      .score-pill .pill-val { color: #feca57; }
      
      .combo-zone {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-bottom: 16px;
        opacity: 0;
        transform: scale(0.8);
        transition: all 0.3s ease;
      }
      .combo-zone.visible {
        opacity: 1;
        transform: scale(1);
      }
      .combo-fire { font-size: 28px; animation: fireWiggle 0.2s ease infinite; }
      @keyframes fireWiggle {
        0%, 100% { transform: rotate(-8deg); }
        50% { transform: rotate(8deg); }
      }
      .combo-num { font-size: 32px; font-weight: 900; color: #ff9f43; }
      .combo-text { font-size: 16px; color: rgba(255,255,255,0.6); }
      
      .word-zone {
        text-align: center;
        padding: 30px 20px;
        background: rgba(255,255,255,0.05);
        border-radius: 20px;
        margin-bottom: 16px;
        min-height: 100px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }
      .word-display {
        font-size: 42px;
        font-weight: 800;
        letter-spacing: 4px;
        margin-bottom: 12px;
      }
      .word-display .letter {
        display: inline-block;
        transition: all 0.15s ease;
      }
      .word-display .letter.correct { color: #55efc4; }
      .word-display .letter.wrong { color: #ff7675; animation: letterShake 0.3s ease; }
      .word-display .letter.current { 
        color: white;
        text-decoration: underline;
        text-decoration-color: #6c5ce7;
        text-underline-offset: 8px;
      }
      .word-display .letter.pending { color: rgba(255,255,255,0.4); }
      @keyframes letterShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-3px); }
        75% { transform: translateX(3px); }
      }
      .typed-display {
        font-size: 20px;
        color: rgba(255,255,255,0.5);
        min-height: 28px;
      }
      
      .input-zone {
        margin-bottom: 16px;
      }
      .typing-input {
        width: 100%;
        padding: 16px 24px;
        font-size: 20px;
        font-weight: 600;
        text-align: center;
        background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255,255,255,0.2);
        border-radius: 16px;
        color: white;
        outline: none;
        transition: all 0.2s ease;
      }
      .typing-input:focus {
        border-color: #6c5ce7;
        box-shadow: 0 0 30px rgba(108, 92, 231, 0.3);
      }
      .typing-input::placeholder { color: rgba(255,255,255,0.3); }
      
      .stats-bar {
        display: flex;
        justify-content: center;
        gap: 40px;
        margin-bottom: 16px;
      }
      .stat-item {
        text-align: center;
      }
      .stat-label { display: block; font-size: 12px; color: rgba(255,255,255,0.5); }
      .stat-val { font-size: 24px; font-weight: 800; color: white; }
      
      .powerup-bar {
        display: flex;
        justify-content: center;
        gap: 16px;
      }
      .powerup {
        position: relative;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        cursor: pointer;
        transition: all 0.2s ease;
        opacity: 0.5;
      }
      .powerup.ready {
        opacity: 1;
        animation: powerupReady 2s ease infinite;
      }
      .powerup.ready:hover { transform: scale(1.1); }
      @keyframes powerupReady {
        0%, 100% { box-shadow: 0 0 0 rgba(108, 92, 231, 0); }
        50% { box-shadow: 0 0 20px rgba(108, 92, 231, 0.5); }
      }
      .powerup-icon { font-size: 24px; }
      .powerup-key {
        position: absolute;
        bottom: -8px;
        right: -8px;
        width: 20px;
        height: 20px;
        background: #6c5ce7;
        border-radius: 50%;
        font-size: 12px;
        font-weight: 700;
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.wordsCompleted = 0;
        this.totalChars = 0;
        this.correctChars = 0;
        this.score = 0;
        this.typedText = '';
        this.powerups = { slow: true, skip: true, double: true };
        this.doublePoints = false;

        this.nextWord();
        this.setupInput();
    }

    nextWord() {
        const shuffled = this.shuffleWithBagFirst(WORDS, 'words');
        this.currentWord = shuffled[0];
        this.typedText = '';
        this.renderWord();

        const input = document.getElementById('typing-input');
        if (input) {
            input.value = '';
            input.focus();
        }
    }

    renderWord() {
        const wordEl = document.getElementById('word-display');
        wordEl.innerHTML = this.currentWord.split('').map((letter, i) => {
            let cls = 'letter ';
            if (i < this.typedText.length) {
                cls += this.typedText[i] === letter ? 'correct' : 'wrong';
            } else if (i === this.typedText.length) {
                cls += 'current';
            } else {
                cls += 'pending';
            }
            return `<span class="${cls}">${letter}</span>`;
        }).join('');

        document.getElementById('typed-display').textContent = this.typedText || '_';

        // Update combo display
        const comboZone = document.getElementById('combo-zone');
        if (this.combo > 1) {
            comboZone.classList.add('visible');
            document.getElementById('combo-num').textContent = this.combo;
        } else {
            comboZone.classList.remove('visible');
        }
    }

    setupInput() {
        const input = document.getElementById('typing-input');

        input.addEventListener('input', (e) => {
            this.typedText = e.target.value.toLowerCase();
            this.renderWord();

            // Check if word complete
            if (this.typedText === this.currentWord) {
                this.completeWord();
            } else if (this.typedText.length >= this.currentWord.length) {
                // Wrong word
                this.wrongWord();
            }
        });

        input.addEventListener('keydown', (e) => {
            if (e.key === '1' && this.powerups.slow) this.usePowerup('slow');
            if (e.key === '2' && this.powerups.skip) this.usePowerup('skip');
            if (e.key === '3' && this.powerups.double) this.usePowerup('double');
        });

        input.focus();
    }

    completeWord() {
        const completedWord = this.currentWord;
        this.wordsCompleted++;
        this.incrementCombo();

        const points = this.doublePoints ? 100 : 50;
        this.addScore(points + this.combo * 10);

        this.correctChars += this.currentWord.length;
        this.totalChars += this.typedText.length;

        document.getElementById('score-display').textContent = this.score;
        document.getElementById('words-display').textContent = this.wordsCompleted;
        this.updateStats();

        if (this.combo >= 5) {
            this.confetti.explode(null, null, 20);
        }

        this.celebrateMove({ burst: completedWord.toUpperCase(), duration: 700 });

        this.nextWord();
    }

    wrongWord() {
        this.resetCombo();
        this.totalChars += this.typedText.length;

        Animations.shake(document.querySelector('.word-zone'));
        this.updateStats();
        this.coachMove();

        setTimeout(() => {
            this.typedText = '';
            document.getElementById('typing-input').value = '';
            this.renderWord();
        }, 300);
    }

    updateStats() {
        const elapsed = (Date.now() - this.startTime) / 1000 / 60; // minutes
        const wpm = Math.round(this.wordsCompleted / Math.max(elapsed, 0.1));
        const accuracy = this.totalChars > 0 ? Math.round((this.correctChars / this.totalChars) * 100) : 100;

        document.getElementById('wpm-val').textContent = wpm;
        document.getElementById('accuracy-val').textContent = `${accuracy}%`;
    }

    usePowerup(type) {
        if (!this.powerups[type]) return;
        this.powerups[type] = false;

        const el = document.getElementById(`powerup-${type}`);
        el.classList.remove('ready');

        switch (type) {
            case 'slow':
                // Skip to next word without penalty
                this.timer.addTime(5);
                break;
            case 'skip':
                this.nextWord();
                break;
            case 'double':
                this.doublePoints = true;
                setTimeout(() => this.doublePoints = false, 10000);
                break;
        }
    }

    onTimerTick(remaining) {
        document.getElementById('timer-display').textContent = this.formatTime(remaining);
        if (remaining <= 10) {
            document.getElementById('timer-display').style.color = '#ff7675';
        }
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();

        if (this.wordsCompleted >= 15) this.addScore(300);
        if (this.maxCombo >= 10) this.addScore(200);

        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new SpeedTypingGame(container, config);
}
