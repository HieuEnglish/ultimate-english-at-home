/* assets/js/games/4-7/phonics-pop.js
   Phonics Pop - Ages 4-7
   
   Pop the balloon with the right starting sound!
   Timed game with floating balloons.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Words grouped by starting sound
const PHONICS_WORDS = {
    'b': ['ball', 'bat', 'bed', 'book', 'bus', 'box'],
    'c': ['cat', 'car', 'cup', 'cow', 'cake', 'coat'],
    'd': ['dog', 'door', 'duck', 'desk', 'doll', 'drum'],
    'f': ['fish', 'frog', 'fan', 'foot', 'flag', 'fork'],
    'h': ['hat', 'house', 'hand', 'horse', 'hen', 'hill'],
    'm': ['moon', 'mouse', 'man', 'map', 'milk', 'mop'],
    's': ['sun', 'star', 'sock', 'snake', 'soap', 'ship'],
    't': ['tree', 'top', 'ten', 'train', 'tiger', 'tent'],
    'g': ['goat', 'gate', 'game', 'gift', 'girl', 'gold'],
    'l': ['lion', 'lamp', 'leaf', 'leg', 'lock', 'log'],
    'n': ['net', 'nest', 'nose', 'nut', 'nail', 'nine'],
    'p': ['pig', 'pen', 'pan', 'pot', 'pin', 'pear'],
    'r': ['rat', 'rain', 'ring', 'rock', 'rope', 'rug'],
    'w': ['web', 'wig', 'win', 'worm', 'wall', 'well'],
    'j': ['jam', 'jar', 'jet', 'jug', 'jump', 'joy'],
};

const SOUNDS = Object.keys(PHONICS_WORDS);

class PhonicsPopGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 60 });
        this.currentWord = null;
        this.correctSound = null;
        this.balloons = [];
        this.rounds = 0;
        this.correctAnswers = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="game-area">
        <div class="phonics-prompt" id="phonics-prompt">
          <span class="prompt-text">Press Start to play!</span>
        </div>
        <div class="word-display" id="word-display" style="display:none;">
          <span class="word-text"></span>
          <button class="btn btn--small speak-btn">🔊</button>
        </div>
        <div class="balloon-area" id="balloon-area"></div>
        <div class="game-feedback" id="game-feedback"></div>
      </div>
    `;

        // Add styles
        const style = document.createElement('style');
        style.textContent = `
      .phonics-prompt {
        text-align: center;
        margin-bottom: 16px;
      }
      .prompt-text {
        font-size: 18px;
        font-weight: 700;
      }
      .word-display {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin: 16px 0;
        padding: 16px;
        border-radius: 16px;
        background: var(--surface2);
      }
      .word-text {
        font-size: 32px;
        font-weight: 800;
        text-transform: uppercase;
      }
      .balloon-area {
        display: flex;
        justify-content: center;
        gap: 20px;
        flex-wrap: wrap;
        padding: 20px;
        min-height: 200px;
      }
      .balloon {
        display: flex;
        flex-direction: column;
        align-items: center;
        cursor: pointer;
        transition: transform 0.2s ease;
        animation: float 2s ease-in-out infinite;
      }
      .balloon:nth-child(2) { animation-delay: 0.2s; }
      .balloon:nth-child(3) { animation-delay: 0.4s; }
      .balloon:nth-child(4) { animation-delay: 0.6s; }
      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-15px); }
      }
      .balloon:hover {
        transform: scale(1.15);
      }
      .balloon-body {
        width: 80px;
        height: 100px;
        border-radius: 50% 50% 50% 50% / 60% 60% 40% 40%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 28px;
        font-weight: 800;
        color: white;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        position: relative;
      }
      .balloon-body::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 50%;
        transform: translateX(-50%);
        width: 0;
        height: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 12px solid inherit;
      }
      .balloon-string {
        width: 2px;
        height: 40px;
        background: #999;
      }
      .balloon.is-correct {
        animation: popCorrect 0.3s ease forwards;
      }
      .balloon.is-wrong {
        animation: shake 0.3s ease;
      }
      @keyframes popCorrect {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.5); opacity: 0.5; }
        100% { transform: scale(0); opacity: 0; }
      }
      .feedback-message {
        padding: 12px 20px;
        border-radius: 12px;
        font-weight: 700;
        text-align: center;
        margin-top: 12px;
      }
      .feedback-success { background: rgba(0, 255, 136, 0.15); color: #00cc6a; }
      .feedback-error { background: rgba(255, 95, 95, 0.15); color: #ff5f5f; }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.correctAnswers = 0;
        this.nextRound();
    }

    nextRound() {
        if (!this.isRunning) return;

        this.rounds++;

        // Pick a random sound and word
        this.correctSound = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
        const words = PHONICS_WORDS[this.correctSound];
        this.currentWord = words[Math.floor(Math.random() * words.length)];

        // Pick 3 wrong sounds
        const wrongSounds = SOUNDS.filter(s => s !== this.correctSound)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        this.balloons = [this.correctSound, ...wrongSounds].sort(() => Math.random() - 0.5);

        this.renderRound();
        setTimeout(() => this.speakWord(), 300);
    }

    renderRound() {
        const promptEl = document.getElementById('phonics-prompt');
        const wordDisplay = document.getElementById('word-display');
        const balloonArea = document.getElementById('balloon-area');
        const feedbackEl = document.getElementById('game-feedback');

        promptEl.innerHTML = `<span class="prompt-text">What sound does this word start with?</span>`;

        wordDisplay.style.display = 'flex';
        wordDisplay.querySelector('.word-text').textContent = this.currentWord;
        wordDisplay.querySelector('.speak-btn').onclick = () => this.speakWord();

        // Balloon colors
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#95e1d3', '#f38181', '#aa96da'];

        balloonArea.innerHTML = this.balloons.map((sound, i) => `
      <div class="balloon" data-sound="${sound}">
        <div class="balloon-body" style="background: ${colors[i % colors.length]}; border-bottom-color: ${colors[i % colors.length]}">
          ${sound.toUpperCase()}
        </div>
        <div class="balloon-string"></div>
      </div>
    `).join('');

        balloonArea.querySelectorAll('.balloon').forEach(balloon => {
            balloon.addEventListener('click', () => this.popBalloon(balloon, balloon.dataset.sound));
        });

        feedbackEl.innerHTML = '';
    }

    speakWord() {
        this.speak(this.currentWord, { rate: 0.8 });
    }

    popBalloon(element, sound) {
        const isCorrect = sound === this.correctSound;

        if (isCorrect) {
            element.classList.add('is-correct');
            this.incrementCombo();
            this.addScore(100);
            this.correctAnswers++;
            this.updateScoreDisplay();
            this.showFeedback(`🎈 Pop! "${this.currentWord}" starts with "${this.correctSound}"!`, 'success');
            this.celebrateMove({ burst: this.correctSound.toUpperCase() });

            setTimeout(() => {
                if (this.isRunning) this.nextRound();
            }, 1000);
        } else {
            element.classList.add('is-wrong');
            this.resetCombo();
            this.showFeedback(`Try again! Listen to the word...`, 'error');
            this.coachMove();
            this.speakWord();

            setTimeout(() => element.classList.remove('is-wrong'), 500);
        }
    }

    showFeedback(message, type) {
        const feedbackEl = document.getElementById('game-feedback');
        feedbackEl.innerHTML = `<div class="feedback-message feedback-${type}">${message}</div>`;
    }

    onTimerTick(remaining) {
        super.onTimerTick(remaining);
    }

    updateScoreDisplay() {
        let hud = this.container.querySelector('.game-hud');
        if (!hud) {
            const gameArea = this.container.querySelector('.game-area');
            gameArea.insertAdjacentHTML('afterbegin', `
        <div class="game-hud">
          <div class="hud-score"><span class="hud-label">Score</span><span class="hud-value" data-game-score>${this.score}</span></div>
          <div class="hud-combo"><span class="hud-value" data-game-combo>${this.combo}x</span><span class="hud-label">Combo</span></div>
          <div class="hud-timer"><span class="hud-label">Time</span><span class="hud-value" data-game-timer>1:00</span></div>
        </div>
      `);
            hud = this.container.querySelector('.game-hud');
        }
        const scoreEl = hud.querySelector('[data-game-score]');
        if (scoreEl) { scoreEl.textContent = this.score; Animations.bounce(scoreEl, 1.2, 200); }
        const comboEl = hud.querySelector('[data-game-combo]');
        if (comboEl) { comboEl.textContent = `${this.combo}x`; }
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new PhonicsPopGame(container, config);
}
