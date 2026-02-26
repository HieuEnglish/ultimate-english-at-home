/* assets/js/games/8-10/word-scramble.js
   Word Scramble - Ages 8-10
   
   MODERN VERSION - Unscramble words against the clock!
   Drag letters into place.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const WORDS = [
    { word: "planet", hint: "Earth is one", category: "🌍" },
    { word: "rocket", hint: "Goes to space", category: "🚀" },
    { word: "jungle", hint: "Dense forest", category: "🌴" },
    { word: "castle", hint: "Kings live here", category: "🏰" },
    { word: "dragon", hint: "Breathes fire", category: "🐉" },
    { word: "wizard", hint: "Does magic", category: "🧙" },
    { word: "pirate", hint: "Sails the seas", category: "🏴‍☠️" },
    { word: "island", hint: "Land in water", category: "🏝️" },
    { word: "frozen", hint: "Very cold", category: "❄️" },
    { word: "sunset", hint: "End of day", category: "🌅" },
    { word: "bridge", hint: "Cross a river", category: "🌉" },
    { word: "garden", hint: "Flowers grow", category: "🌻" },
    { word: "trophy", hint: "Winner gets this", category: "🏆" },
    { word: "desert", hint: "Hot and sandy", category: "🏜️" },
    { word: "forest", hint: "Full of trees", category: "🌲" },
    { word: "mirror", hint: "Shows reflection", category: "🪞" },
    { word: "temple", hint: "Place of worship", category: "⛩️" },
    { word: "guitar", hint: "Musical strings", category: "🎸" },
    { word: "parrot", hint: "Talking bird", category: "🦜" },
    { word: "market", hint: "Buy things here", category: "🏪" },
    { word: "tunnel", hint: "Underground path", category: "🚇" },
    { word: "basket", hint: "Carry things in", category: "🧺" },
    { word: "number", hint: "Count with these", category: "🔢" },
    { word: "silver", hint: "Shiny metal", category: "🥈" },
    { word: "candle", hint: "Light with flame", category: "🕯️" },
];

class WordScrambleGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 90 });
        this.currentWord = null;
        this.scrambled = [];
        this.userAnswer = [];
        this.rounds = 0;
        this.wordsCompleted = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="scramble-game">
        <div class="scramble-bg">
          <div class="grid-lines"></div>
        </div>
        
        <div class="scramble-stage">
          <!-- HUD -->
          <div class="scramble-hud">
            <div class="hud-stat">
              <div class="stat-icon">⭐</div>
              <div class="stat-value" id="stat-score">0</div>
            </div>
            <div class="hud-stat timer-stat">
              <div class="stat-icon">⏱️</div>
              <div class="stat-value" id="stat-timer">1:30</div>
            </div>
            <div class="hud-stat combo-stat" id="combo-stat" style="display:none">
              <div class="stat-icon">🔥</div>
              <div class="stat-value" id="stat-combo">0x</div>
            </div>
          </div>

          <!-- Word info -->
          <div class="word-info">
            <span class="word-category" id="word-category">🌍</span>
            <span class="word-hint" id="word-hint">Loading...</span>
          </div>

          <!-- Answer area -->
          <div class="answer-area" id="answer-area"></div>

          <!-- Scrambled letters -->
          <div class="letter-tray" id="letter-tray"></div>

          <!-- Controls -->
          <div class="scramble-controls">
            <button class="ctrl-btn clear-btn" id="clear-btn">🔄 Clear</button>
            <button class="ctrl-btn hint-btn" id="hint-btn">💡 Hint</button>
          </div>

          <!-- Feedback -->
          <div class="scramble-feedback" id="feedback"></div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .scramble-game {
        position: relative;
        width: 100%;
        min-height: 500px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(135deg, #232526 0%, #414345 100%);
      }
      
      .scramble-bg {
        position: absolute;
        inset: 0;
        opacity: 0.1;
        background-image: 
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 40px 40px;
      }
      
      .scramble-stage {
        position: relative;
        padding: 20px;
        max-width: 500px;
        margin: 0 auto;
      }
      
      .scramble-hud {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-bottom: 20px;
      }
      .hud-stat {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 20px;
        background: rgba(255,255,255,0.1);
        border-radius: 12px;
        border: 1px solid rgba(255,255,255,0.1);
      }
      .stat-icon { font-size: 20px; }
      .stat-value { font-size: 22px; font-weight: 800; color: white; }
      .timer-stat .stat-value { color: #74b9ff; }
      .combo-stat {
        background: linear-gradient(135deg, #ff9f43, #ee5a24);
        animation: comboPulse 0.6s ease infinite;
      }
      @keyframes comboPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
      }
      
      .word-info {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-bottom: 24px;
      }
      .word-category {
        font-size: 40px;
        animation: categoryBounce 2s ease infinite;
      }
      @keyframes categoryBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .word-hint {
        font-size: 18px;
        color: rgba(255,255,255,0.7);
        font-style: italic;
      }
      
      .answer-area {
        display: flex;
        justify-content: center;
        gap: 8px;
        min-height: 70px;
        padding: 16px;
        background: rgba(255,255,255,0.05);
        border: 2px dashed rgba(255,255,255,0.2);
        border-radius: 16px;
        margin-bottom: 20px;
      }
      .answer-slot {
        width: 50px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.1);
        border: 2px solid rgba(255,255,255,0.2);
        border-radius: 12px;
        font-size: 28px;
        font-weight: 800;
        color: white;
        text-transform: uppercase;
      }
      .answer-slot.filled {
        background: linear-gradient(135deg, #6c5ce7, #a55eea);
        border-color: #a55eea;
        animation: slotFill 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .answer-slot.correct {
        background: linear-gradient(135deg, #00b894, #55efc4);
        border-color: #55efc4;
      }
      .answer-slot.wrong {
        background: linear-gradient(135deg, #d63031, #ff7675);
        border-color: #ff7675;
        animation: wrongShake 0.4s ease;
      }
      @keyframes slotFill {
        0% { transform: scale(0.5); }
        60% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }
      @keyframes wrongShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-6px); }
        75% { transform: translateX(6px); }
      }
      
      .letter-tray {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 10px;
        margin-bottom: 20px;
        min-height: 70px;
      }
      .tray-letter {
        width: 50px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(145deg, #ffeaa7, #fdcb6e);
        border-radius: 12px;
        font-size: 28px;
        font-weight: 800;
        color: #2d3436;
        text-transform: uppercase;
        cursor: pointer;
        box-shadow: 0 4px 0 #e17055, 0 6px 15px rgba(0,0,0,0.2);
        transition: all 0.15s ease;
        animation: letterDrop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) backwards;
      }
      .tray-letter:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 0 #e17055, 0 12px 20px rgba(0,0,0,0.3);
      }
      .tray-letter:active {
        transform: translateY(2px);
        box-shadow: 0 2px 0 #e17055;
      }
      .tray-letter.used {
        opacity: 0.3;
        pointer-events: none;
        transform: scale(0.9);
      }
      @keyframes letterDrop {
        0% { transform: translateY(-50px); opacity: 0; }
        100% { transform: translateY(0); opacity: 1; }
      }
      
      .scramble-controls {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .ctrl-btn {
        padding: 12px 24px;
        border-radius: 12px;
        border: none;
        font-size: 15px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .clear-btn {
        background: rgba(255,255,255,0.1);
        color: white;
        border: 1px solid rgba(255,255,255,0.2);
      }
      .clear-btn:hover { background: rgba(255,255,255,0.2); }
      .hint-btn {
        background: linear-gradient(135deg, #74b9ff, #0984e3);
        color: white;
      }
      .hint-btn:hover { transform: scale(1.05); }
      
      .scramble-feedback {
        text-align: center;
        min-height: 30px;
      }
      .feedback-msg {
        display: inline-block;
        padding: 10px 24px;
        border-radius: 50px;
        font-weight: 700;
        animation: feedbackPop 0.3s ease;
      }
      .feedback-success { background: rgba(0,184,148,0.2); color: #55efc4; }
      .feedback-error { background: rgba(214,48,49,0.2); color: #ff7675; }
      @keyframes feedbackPop {
        0% { transform: scale(0); }
        60% { transform: scale(1.1); }
        100% { transform: scale(1); }
      }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.wordsCompleted = 0;
        this.score = 0;
        this.nextWord();
    }

    nextWord() {
        this.rounds++;
        this.userAnswer = [];
        this.usedIndices = [];

        const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
        this.currentWord = shuffled[0];
        this.scrambled = this.currentWord.word.split('').sort(() => Math.random() - 0.5);

        // Make sure it's actually scrambled
        while (this.scrambled.join('') === this.currentWord.word) {
            this.scrambled.sort(() => Math.random() - 0.5);
        }

        this.renderWord();
        this.updateHUD();
    }

    renderWord() {
        document.getElementById('word-category').textContent = this.currentWord.category;
        document.getElementById('word-hint').textContent = this.currentWord.hint;

        // Answer slots
        const answerEl = document.getElementById('answer-area');
        answerEl.innerHTML = this.currentWord.word.split('').map((_, i) => {
            const letter = this.userAnswer[i];
            return `<div class="answer-slot ${letter ? 'filled' : ''}">${letter || ''}</div>`;
        }).join('');

        // Letter tray
        const trayEl = document.getElementById('letter-tray');
        trayEl.innerHTML = this.scrambled.map((letter, i) => {
            const used = this.usedIndices.includes(i);
            return `<button class="tray-letter ${used ? 'used' : ''}" data-index="${i}" 
        style="animation-delay: ${i * 0.05}s" ${used ? 'disabled' : ''}>${letter}</button>`;
        }).join('');

        trayEl.querySelectorAll('.tray-letter:not(.used)').forEach(btn => {
            btn.addEventListener('click', () => this.selectLetter(parseInt(btn.dataset.index)));
        });

        document.getElementById('clear-btn').onclick = () => this.clearAnswer();
        document.getElementById('hint-btn').onclick = () => this.giveHint();
        document.getElementById('feedback').innerHTML = '';
    }

    updateHUD() {
        document.getElementById('stat-score').textContent = this.score;

        const comboEl = document.getElementById('combo-stat');
        if (this.combo > 1) {
            comboEl.style.display = 'flex';
            document.getElementById('stat-combo').textContent = `${this.combo}x`;
        } else {
            comboEl.style.display = 'none';
        }
    }

    selectLetter(index) {
        if (this.userAnswer.length >= this.currentWord.word.length) return;

        this.userAnswer.push(this.scrambled[index]);
        this.usedIndices.push(index);
        this.renderWord();

        if (this.userAnswer.length === this.currentWord.word.length) {
            setTimeout(() => this.checkAnswer(), 300);
        }
    }

    clearAnswer() {
        this.userAnswer = [];
        this.usedIndices = [];
        this.renderWord();
    }

    giveHint() {
        // Show first unrevealed letter
        const nextIndex = this.userAnswer.length;
        if (nextIndex < this.currentWord.word.length) {
            const correctLetter = this.currentWord.word[nextIndex];
            const trayIndex = this.scrambled.findIndex((l, i) => l === correctLetter && !this.usedIndices.includes(i));
            if (trayIndex !== -1) {
                this.selectLetter(trayIndex);
            }
        }
    }

    checkAnswer() {
        const answer = this.userAnswer.join('');
        const isCorrect = answer === this.currentWord.word;
        const slots = document.querySelectorAll('.answer-slot');

        if (isCorrect) {
            this.incrementCombo();
            this.addScore(100);
            this.wordsCompleted++;
            this.updateHUD();

            slots.forEach(s => s.classList.add('correct'));
            this.showFeedback('🎉 Perfect!', 'success');

            if (this.combo >= 3) this.confetti.explode(null, null, 40);

            setTimeout(() => this.nextWord(), 1200);
        } else {
            this.resetCombo();
            slots.forEach(s => s.classList.add('wrong'));
            this.showFeedback('Try again!', 'error');
            this.updateHUD();

            setTimeout(() => this.clearAnswer(), 800);
        }
    }

    showFeedback(text, type) {
        document.getElementById('feedback').innerHTML = `<div class="feedback-msg feedback-${type}">${text}</div>`;
    }

    onTimerTick(remaining) {
        const timerEl = document.getElementById('stat-timer');
        timerEl.textContent = this.formatTime(remaining);
        if (remaining <= 10) timerEl.style.color = '#ff7675';
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();
        if (this.wordsCompleted >= 8) this.addScore(400);
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new WordScrambleGame(container, config);
}
