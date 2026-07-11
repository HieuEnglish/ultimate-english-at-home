/* assets/js/games/4-7/balloon-pop.js
   Balloon Pop - Ages 4-7
   
   MODERN VERSION - Pop balloons with the right letter!
   Fun arcade-style game with floating balloons.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const WORDS = [
  { word: "cat", emoji: "🐱" },
  { word: "dog", emoji: "🐕" },
  { word: "sun", emoji: "☀️" },
  { word: "hat", emoji: "🎩" },
  { word: "cup", emoji: "🥤" },
  { word: "bed", emoji: "🛏️" },
  { word: "pen", emoji: "🖊️" },
  { word: "bus", emoji: "🚌" },
  { word: "box", emoji: "📦" },
  { word: "pig", emoji: "🐷" },
  { word: "fish", emoji: "🐟" },
  { word: "bird", emoji: "🐦" },
  { word: "moon", emoji: "🌙" },
  { word: "star", emoji: "⭐" },
  { word: "frog", emoji: "🐸" },
  { word: "cake", emoji: "🍰" },
  { word: "tree", emoji: "🌳" },
  { word: "book", emoji: "📖" },
  { word: "ball", emoji: "⚽" },
  { word: "duck", emoji: "🦆" },
  { word: "bear", emoji: "🐻" },
  { word: "bee", emoji: "🐝" },
  { word: "fox", emoji: "🦊" },
  { word: "car", emoji: "🚗" },
  { word: "egg", emoji: "🥚" },
  { word: "jam", emoji: "🫙" },
  { word: "map", emoji: "🗺️" },
  { word: "net", emoji: "🥅" },
  { word: "pot", emoji: "🍯" },
  { word: "ant", emoji: "🐜" },
];

const BALLOON_COLORS = ['#ff6b6b', '#74b9ff', '#55efc4', '#ffeaa7', '#a29bfe', '#fd79a8', '#fdcb6e', '#00cec9'];

class BalloonPopGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 60 });
        this.balloons = [];
        this.currentWord = null;
        this.currentLetterIndex = 0;
        this.wordsCompleted = 0;
        this.balloonId = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="balloon-game">
        <div class="balloon-sky" id="balloon-sky"></div>
        
        <div class="balloon-stage">
          <!-- HUD -->
          <div class="balloon-hud">
            <div class="hud-box score-box">
              <span class="hud-icon">⭐</span>
              <span class="hud-num" id="score-num">0</span>
            </div>
            <div class="hud-box timer-box">
              <span class="hud-icon">⏱️</span>
              <span class="hud-num" id="timer-num">1:00</span>
            </div>
            <div class="hud-box words-box">
              <span class="hud-icon">📝</span>
              <span class="hud-num" id="words-num">0</span>
            </div>
          </div>
          
          <!-- Word display -->
          <div class="word-area">
            <div class="word-picture" id="word-picture">🐱</div>
            <div class="word-slots" id="word-slots"></div>
          </div>
          
          <!-- Instruction -->
          <div class="pop-instruction" id="instruction">Pop the letter: <span id="target-letter">C</span></div>
          
          <!-- Balloon container -->
          <div class="balloon-container" id="balloon-container"></div>
        </div>
      </div>
    `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .balloon-game {
        position: relative;
        width: 100%;
        height: 520px;
        overflow: hidden;
        border-radius: 24px;
        background: linear-gradient(180deg, #a8edea 0%, #fed6e3 100%);
      }
      
      .balloon-sky {
        position: absolute;
        inset: 0;
        pointer-events: none;
      }
      
      .balloon-stage {
        position: relative;
        height: 100%;
        padding: 16px;
      }
      
      .balloon-hud {
        display: flex;
        justify-content: center;
        gap: 16px;
        margin-bottom: 12px;
      }
      .hud-box {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: rgba(255,255,255,0.9);
        border-radius: 50px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      }
      .hud-icon { font-size: 20px; }
      .hud-num { font-size: 20px; font-weight: 800; color: #2d3436; }
      
      .word-area {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-bottom: 12px;
      }
      .word-picture {
        font-size: 56px;
        filter: drop-shadow(0 4px 10px rgba(0,0,0,0.2));
        animation: pictureFloat 2s ease-in-out infinite;
      }
      @keyframes pictureFloat {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
      .word-slots {
        display: flex;
        gap: 6px;
      }
      .word-slot {
        width: 40px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(255,255,255,0.8);
        border-radius: 10px;
        font-size: 28px;
        font-weight: 800;
        color: #2d3436;
        text-transform: uppercase;
        box-shadow: 0 3px 10px rgba(0,0,0,0.1);
      }
      .word-slot.filled {
        background: linear-gradient(135deg, #55efc4, #00b894);
        color: white;
        animation: slotFill 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
      }
      @keyframes slotFill {
        0% { transform: scale(0.5); }
        60% { transform: scale(1.2); }
        100% { transform: scale(1); }
      }
      
      .pop-instruction {
        text-align: center;
        font-size: 18px;
        font-weight: 700;
        color: #2d3436;
        margin-bottom: 16px;
      }
      #target-letter {
        display: inline-block;
        width: 36px;
        height: 36px;
        line-height: 36px;
        background: linear-gradient(135deg, #6c5ce7, #a55eea);
        color: white;
        border-radius: 50%;
        font-size: 20px;
        animation: letterPulse 0.8s ease infinite;
      }
      @keyframes letterPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.15); }
      }
      
      .balloon-container {
        position: relative;
        height: 280px;
        overflow: hidden;
      }
      
      .balloon {
        appearance: none;
        border: 0;
        padding: 0;
        background: transparent;
        color: inherit;
        font: inherit;
        position: absolute;
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        animation: balloonFloat linear forwards;
        transition: transform 0.1s ease;
      }
      .balloon:hover { transform: scale(1.1); }
      .balloon-body {
        width: 60px;
        height: 72px;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 800;
        color: white;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        box-shadow: inset -8px -8px 20px rgba(0,0,0,0.15), inset 8px 8px 20px rgba(255,255,255,0.3);
        position: relative;
      }
      .balloon-body::after {
        content: '';
        position: absolute;
        top: 10px;
        left: 15px;
        width: 12px;
        height: 12px;
        background: rgba(255,255,255,0.5);
        border-radius: 50%;
      }
      .balloon-string {
        width: 2px;
        height: 30px;
        background: #aaa;
      }
      @keyframes balloonFloat {
        0% { bottom: -100px; }
        100% { bottom: 350px; }
      }
      
      .balloon.popped .balloon-body {
        animation: pop 0.3s ease forwards;
      }
      @keyframes pop {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(0); opacity: 0; }
      }
      
      .pop-particle {
        position: absolute;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        animation: particleBurst 0.6s ease-out forwards;
        pointer-events: none;
      }
      @keyframes particleBurst {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(var(--tx), var(--ty)) scale(0); opacity: 0; }
      }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.wordsCompleted = 0;
        this.balloons = [];
        this.balloonId = 0;
        this.nextWord();
        this.startBalloons();
    }

    nextWord() {
        const shuffled = [...WORDS].sort(() => Math.random() - 0.5);
        this.currentWord = shuffled[0];
        this.currentLetterIndex = 0;
        this.renderWord();
    }

    renderWord() {
        document.getElementById('word-picture').textContent = this.currentWord.emoji;

        const slotsEl = document.getElementById('word-slots');
        slotsEl.innerHTML = this.currentWord.word.split('').map((letter, i) => {
            const filled = i < this.currentLetterIndex;
            return `<div class="word-slot ${filled ? 'filled' : ''}">${filled ? letter : ''}</div>`;
        }).join('');

        const targetLetter = this.currentWord.word[this.currentLetterIndex];
        document.getElementById('target-letter').textContent = targetLetter?.toUpperCase() || '✓';
        document.getElementById('instruction').innerHTML = targetLetter
            ? `Pop the letter: <span id="target-letter">${targetLetter.toUpperCase()}</span>`
            : 'Great! Next word...';
    }

    startBalloons() {
        this.spawnInterval = setInterval(() => {
            if (this.isRunning) this.spawnBalloon();
        }, 800);
    }

    spawnBalloon() {
        const container = document.getElementById('balloon-container');
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const targetLetter = this.currentWord.word[this.currentLetterIndex]?.toUpperCase();

        // 40% chance to spawn target letter
        const letter = Math.random() < 0.4 && targetLetter
            ? targetLetter
            : letters[Math.floor(Math.random() * letters.length)];

        const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)];
        const left = 10 + Math.random() * 80;
        const duration = 4 + Math.random() * 3;
        const id = this.balloonId++;

        const balloon = document.createElement('button');
        balloon.type = 'button';
        balloon.className = 'balloon';
        balloon.dataset.id = id;
        balloon.dataset.letter = letter;
        balloon.setAttribute('aria-label', `Balloon ${letter}`);
        balloon.style.left = `${left}%`;
        balloon.style.animationDuration = `${duration}s`;
        balloon.innerHTML = `
      <span class="balloon-body" style="background: ${color}">${letter}</span>
      <span class="balloon-string"></span>
    `;

        balloon.addEventListener('click', () => this.popBalloon(balloon, letter));
        container.appendChild(balloon);

        // Remove when animation ends
        setTimeout(() => balloon.remove(), duration * 1000);
    }

    popBalloon(balloon, letter) {
        if (balloon.classList.contains('popped')) return;

        const targetLetter = this.currentWord.word[this.currentLetterIndex]?.toUpperCase();
        const isCorrect = letter === targetLetter;

        balloon.classList.add('popped');
        this.createPopParticles(balloon);

        if (isCorrect) {
            this.incrementCombo();
            this.addScore(50);
            this.currentLetterIndex++;
            this.updateScore();
            this.renderWord();
            this.celebrateMove({ burst: letter });

            // Word complete?
            if (this.currentLetterIndex >= this.currentWord.word.length) {
                this.wordsCompleted++;
                this.addScore(100);
                document.getElementById('words-num').textContent = this.wordsCompleted;

                if (this.combo >= 3) this.confetti.explode(null, null, 30);

                setTimeout(() => this.nextWord(), 800);
            }
        } else {
            this.resetCombo();
            Animations.shake(document.getElementById('word-slots'));
            this.coachMove();
        }
    }

    createPopParticles(balloon) {
        const rect = balloon.getBoundingClientRect();
        const containerRect = document.getElementById('balloon-container').getBoundingClientRect();
        const x = rect.left - containerRect.left + rect.width / 2;
        const y = rect.top - containerRect.top + rect.height / 2;
        const color = balloon.querySelector('.balloon-body').style.background;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'pop-particle';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.background = color;
            particle.style.setProperty('--tx', `${(Math.random() - 0.5) * 100}px`);
            particle.style.setProperty('--ty', `${(Math.random() - 0.5) * 100}px`);
            document.getElementById('balloon-container').appendChild(particle);
            setTimeout(() => particle.remove(), 600);
        }
    }

    updateScore() {
        document.getElementById('score-num').textContent = this.score;
    }

    onTimerTick(remaining) {
        document.getElementById('timer-num').textContent = this.formatTime(remaining);
        if (remaining <= 10) {
            document.getElementById('timer-num').style.color = '#d63031';
        }
    }

    cleanup() {
        super.cleanup();
        if (this.spawnInterval) clearInterval(this.spawnInterval);
    }

    end() {
        this.isRunning = false;
        if (this.spawnInterval) clearInterval(this.spawnInterval);
        this.endTime = Date.now();
        if (this.wordsCompleted >= 5) this.addScore(300);
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new BalloonPopGame(container, config);
}
