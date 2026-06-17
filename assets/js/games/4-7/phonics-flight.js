/* assets/js/games/4-7/phonics-flight.js
   Phonics Flight - Ages 4-7
   
   Fly to the picture that starts with the same sound!
   TTS speaks a word, tap the matching emoji.
   10 rounds.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Word data: letter -> array of {word, emoji} objects
const PHONICS_FLIGHT_DATA = {
    'b': [
        { word: 'ball', emoji: '🏀' },
        { word: 'bird', emoji: '🐦' },
        { word: 'bus', emoji: '🚌' },
        { word: 'bear', emoji: '🐻' },
        { word: 'book', emoji: '📚' },
    ],
    'c': [
        { word: 'cat', emoji: '🐱' },
        { word: 'car', emoji: '🚗' },
        { word: 'cake', emoji: '🎂' },
        { word: 'cow', emoji: '🐄' },
        { word: 'cup', emoji: '🥤' },
    ],
    'd': [
        { word: 'dog', emoji: '🐕' },
        { word: 'duck', emoji: '🦆' },
        { word: 'door', emoji: '🚪' },
        { word: 'drum', emoji: '🥁' },
        { word: 'doll', emoji: '🪆' },
    ],
    'f': [
        { word: 'fish', emoji: '🐟' },
        { word: 'frog', emoji: '🐸' },
        { word: 'flower', emoji: '🌸' },
        { word: 'fan', emoji: '🌀' },
        { word: 'fire', emoji: '🔥' },
    ],
    'h': [
        { word: 'hat', emoji: '🎩' },
        { word: 'house', emoji: '🏠' },
        { word: 'horse', emoji: '🐴' },
        { word: 'hand', emoji: '✋' },
        { word: 'heart', emoji: '❤️' },
    ],
    'm': [
        { word: 'moon', emoji: '🌙' },
        { word: 'mouse', emoji: '🐭' },
        { word: 'milk', emoji: '🥛' },
        { word: 'map', emoji: '🗺️' },
        { word: 'mud', emoji: '🟤' },
    ],
    's': [
        { word: 'sun', emoji: '☀️' },
        { word: 'star', emoji: '⭐' },
        { word: 'snake', emoji: '🐍' },
        { word: 'sock', emoji: '🧦' },
        { word: 'ship', emoji: '🚢' },
    ],
    't': [
        { word: 'tree', emoji: '🌳' },
        { word: 'train', emoji: '🚂' },
        { word: 'tiger', emoji: '🐯' },
        { word: 'top', emoji: '🔝' },
        { word: 'tent', emoji: '⛺' },
    ],
    'g': [
        { word: 'goat', emoji: '🐐' },
        { word: 'grapes', emoji: '🍇' },
        { word: 'game', emoji: '🎮' },
        { word: 'gate', emoji: '🚧' },
        { word: 'girl', emoji: '👧' },
    ],
    'l': [
        { word: 'lion', emoji: '🦁' },
        { word: 'leaf', emoji: '🍃' },
        { word: 'lamp', emoji: '💡' },
        { word: 'leg', emoji: '🦵' },
        { word: 'lollipop', emoji: '🍭' },
    ],
    'n': [
        { word: 'nest', emoji: '🪺' },
        { word: 'nose', emoji: '👃' },
        { word: 'net', emoji: '🥅' },
        { word: 'nail', emoji: '💅' },
        { word: 'night', emoji: '🌙' },
    ],
    'p': [
        { word: 'pig', emoji: '🐷' },
        { word: 'pen', emoji: '🖊️' },
        { word: 'pizza', emoji: '🍕' },
        { word: 'pumpkin', emoji: '🎃' },
        { word: 'pear', emoji: '🍐' },
    ],
    'r': [
        { word: 'rabbit', emoji: '🐰' },
        { word: 'rain', emoji: '🌧️' },
        { word: 'ring', emoji: '💍' },
        { word: 'rocket', emoji: '🚀' },
        { word: 'rose', emoji: '🌹' },
    ],
    'w': [
        { word: 'whale', emoji: '🐋' },
        { word: 'worm', emoji: '🐛' },
        { word: 'window', emoji: '🪟' },
        { word: 'witch', emoji: '🧙' },
        { word: 'water', emoji: '💧' },
    ],
    'j': [
        { word: 'jam', emoji: '🍯' },
        { word: 'jar', emoji: '🫙' },
        { word: 'jet', emoji: '✈️' },
        { word: 'jellyfish', emoji: '🪼' },
        { word: 'jewels', emoji: '💎' },
    ],
};

const SOUNDS = Object.keys(PHONICS_FLIGHT_DATA);

class PhonicsFlightGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: false, hasCombo: true, hasScore: true });
        this.currentWord = null;
        this.currentEmoji = null;
        this.correctSound = null;
        this.rounds = 0;
        this.maxRounds = 10;
        this.correctAnswers = 0;
        this.choices = [];
    }

    async init() {
        this.container.innerHTML = `
            <div class="game-area">
                <div class="flight-header" id="flight-header">
                    <div class="round-display">Round <span id="round-num">0</span>/${this.maxRounds}</div>
                </div>
                <div class="flight-prompt" id="flight-prompt">
                    <span class="prompt-text">Press Start to fly!</span>
                </div>
                <div class="word-card" id="word-card" style="display:none;">
                    <div class="word-emoji" id="word-emoji">🔊</div>
                    <div class="word-info">
                        <span class="word-text" id="word-text"></span>
                    </div>
                    <button class="btn btn--icon speak-btn" id="speak-btn">🔊</button>
                </div>
                <div class="choices-area" id="choices-area"></div>
                <div class="game-feedback" id="game-feedback"></div>
            </div>
        `;

        // Inline styles
        const style = document.createElement('style');
        style.textContent = `
            .flight-header {
                text-align: center;
                padding: 8px 16px;
            }
            .round-display {
                font-size: 14px;
                font-weight: 600;
                color: var(--text2);
                background: var(--surface2);
                display: inline-block;
                padding: 4px 16px;
                border-radius: 20px;
            }
            .flight-prompt {
                text-align: center;
                padding: 16px;
            }
            .prompt-text {
                font-size: 18px;
                font-weight: 700;
                color: var(--text1);
            }
            .word-card {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 16px;
                padding: 20px;
                margin: 0 auto 20px;
                max-width: 400px;
                border-radius: 20px;
                background: linear-gradient(135deg, var(--primary), var(--primary-dark));
                box-shadow: 0 8px 24px rgba(0,0,0,0.2);
            }
            .word-emoji {
                font-size: 48px;
                animation: pulse 1.5s ease-in-out infinite;
            }
            @keyframes pulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.1); }
            }
            .word-info {
                text-align: center;
            }
            .word-text {
                font-size: 28px;
                font-weight: 800;
                color: white;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            .speak-btn {
                background: rgba(255,255,255,0.2);
                border: none;
                font-size: 24px;
                padding: 12px;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.2s ease;
            }
            .speak-btn:hover {
                background: rgba(255,255,255,0.3);
                transform: scale(1.1);
            }
            .choices-area {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 16px;
                padding: 16px;
                max-width: 400px;
                margin: 0 auto;
            }
            .choice-btn {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                padding: 20px 16px;
                border-radius: 20px;
                background: var(--surface2);
                border: 3px solid transparent;
                cursor: pointer;
                transition: all 0.2s ease;
                min-height: 120px;
            }
            .choice-btn:hover {
                transform: translateY(-4px);
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                border-color: var(--primary);
            }
            .choice-btn:active {
                transform: translateY(0);
            }
            .choice-emoji {
                font-size: 48px;
                margin-bottom: 8px;
            }
            .choice-label {
                font-size: 14px;
                font-weight: 600;
                color: var(--text2);
            }
            .choice-btn.is-correct {
                background: rgba(0, 255, 136, 0.2);
                border-color: #00cc6a;
                animation: bounce 0.5s ease;
            }
            .choice-btn.is-wrong {
                background: rgba(255, 95, 95, 0.2);
                border-color: #ff5f5f;
                animation: shake 0.4s ease;
            }
            @keyframes bounce {
                0%, 100% { transform: translateY(0); }
                30% { transform: translateY(-10px); }
                50% { transform: translateY(-5px); }
            }
            @keyframes shake {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-8px); }
                40% { transform: translateX(8px); }
                60% { transform: translateX(-8px); }
                80% { transform: translateX(8px); }
            }
            .feedback-message {
                padding: 12px 20px;
                border-radius: 12px;
                font-weight: 700;
                text-align: center;
                margin-top: 16px;
            }
            .feedback-success { background: rgba(0, 255, 136, 0.15); color: #00cc6a; }
            .feedback-error { background: rgba(255, 95, 95, 0.15); color: #ff5f5f; }
            .game-complete {
                text-align: center;
                padding: 40px 20px;
            }
            .complete-emoji {
                font-size: 72px;
                margin-bottom: 16px;
            }
            .complete-title {
                font-size: 28px;
                font-weight: 800;
                margin-bottom: 8px;
            }
            .complete-score {
                font-size: 20px;
                color: var(--text2);
                margin-bottom: 24px;
            }
            .stars-container {
                font-size: 48px;
                margin-bottom: 24px;
            }
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
        if (this.rounds >= this.maxRounds) {
            this.end();
            return;
        }

        this.rounds++;
        this.updateRoundDisplay();

        // Pick a random sound and word from that sound
        this.correctSound = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
        const words = PHONICS_FLIGHT_DATA[this.correctSound];
        const wordObj = words[Math.floor(Math.random() * words.length)];
        this.currentWord = wordObj.word;
        this.currentEmoji = wordObj.emoji;

        // Pick 3 wrong choices from different sounds
        const wrongSounds = SOUNDS.filter(s => s !== this.correctSound)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const wrongChoices = wrongSounds.map(sound => {
            const opts = PHONICS_FLIGHT_DATA[sound];
            return opts[Math.floor(Math.random() * opts.length)];
        });

        // Create 4 choices: 1 correct + 3 wrong, shuffled
        this.choices = [
            { ...wordObj, isCorrect: true },
            ...wrongChoices.map(w => ({ ...w, isCorrect: false }))
        ].sort(() => Math.random() - 0.5);

        this.renderRound();
        setTimeout(() => this.speakWord(), 500);
    }

    updateRoundDisplay() {
        const roundEl = document.getElementById('round-num');
        if (roundEl) roundEl.textContent = this.rounds;
    }

    renderRound() {
        const promptEl = document.getElementById('flight-prompt');
        const wordCard = document.getElementById('word-card');
        const choicesArea = document.getElementById('choices-area');
        const feedbackEl = document.getElementById('game-feedback');

        promptEl.innerHTML = `<span class="prompt-text">Which picture starts with the same sound?</span>`;

        wordCard.style.display = 'flex';
        document.getElementById('word-text').textContent = this.currentWord;
        document.getElementById('speak-btn').onclick = () => this.speakWord();

        choicesArea.innerHTML = this.choices.map((choice, i) => `
            <button class="choice-btn" data-index="${i}" data-correct="${choice.isCorrect}">
                <span class="choice-emoji">${choice.emoji}</span>
                <span class="choice-label">${choice.word}</span>
            </button>
        `).join('');

        choicesArea.querySelectorAll('.choice-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectChoice(parseInt(btn.dataset.index)));
        });

        feedbackEl.innerHTML = '';
    }

    speakWord() {
        this.speak(this.currentWord, { rate: 0.85, pitch: 1.1 });
    }

    selectChoice(index) {
        if (!this.isRunning) return;

        const choice = this.choices[index];
        const btn = document.querySelector(`[data-index="${index}"]`);
        const isCorrect = choice.isCorrect;

        if (isCorrect) {
            btn.classList.add('is-correct');
            this.incrementCombo();
            this.addScore(100 + (this.combo * 10));
            this.correctAnswers++;
            this.updateScoreDisplay();
            this.showFeedback(`Flying success! "${this.currentWord}" starts with "${this.correctSound.toUpperCase()}"! ✈️`, 'success');
            this.celebrateMove({ type: 'stars' });

            setTimeout(() => {
                if (this.isRunning) this.nextRound();
            }, 1200);
        } else {
            btn.classList.add('is-wrong');
            this.resetCombo();
            this.showFeedback(`Not quite! Listen again...`, 'error');
            this.coachMove();
            this.speakWord();

            setTimeout(() => {
                btn.classList.remove('is-wrong');
            }, 600);
        }
    }

    showFeedback(message, type) {
        const feedbackEl = document.getElementById('game-feedback');
        feedbackEl.innerHTML = `<div class="feedback-message feedback-${type}">${message}</div>`;
    }

    updateScoreDisplay() {
        let hud = this.container.querySelector('.game-hud');
        if (!hud) {
            const header = document.getElementById('flight-header');
            header.insertAdjacentHTML('afterbegin', `
                <div class="game-hud" style="display:flex; gap:20px; justify-content:center;">
                    <div class="hud-item"><span class="hud-label">Score</span><span class="hud-value" data-game-score>0</span></div>
                    <div class="hud-item"><span class="hud-label">Combo</span><span class="hud-value" data-game-combo>0x</span></div>
                </div>
            `);
            hud = this.container.querySelector('.game-hud');
        }
        const scoreEl = hud.querySelector('[data-game-score]');
        if (scoreEl) {
            scoreEl.textContent = this.score;
            Animations.bounce(scoreEl, 1.2, 200);
        }
        const comboEl = hud.querySelector('[data-game-combo]');
        if (comboEl) comboEl.textContent = `${this.combo}x`;
    }

    end() {
        this.isRunning = false;
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }

    showResults(isHighScore) {
        const scorePercent = Math.round((this.correctAnswers / this.maxRounds) * 100);
        const stars = scorePercent >= 90 ? '⭐⭐⭐' : scorePercent >= 70 ? '⭐⭐' : scorePercent >= 50 ? '⭐' : '💪';

        this.container.innerHTML = `
            <div class="game-complete">
                <div class="complete-emoji">${scorePercent >= 70 ? '🎉' : '👍'}</div>
                <div class="complete-title">${scorePercent >= 90 ? 'Amazing!' : scorePercent >= 70 ? 'Great Job!' : 'Good Try!'}</div>
                <div class="complete-score">You got ${this.correctAnswers} out of ${this.maxRounds} correct!</div>
                <div class="stars-container">${stars}</div>
                <button class="btn btn--primary" onclick="location.reload()">Play Again</button>
                ${isHighScore ? '<div class="high-score-badge">🏆 New High Score!</div>' : ''}
            </div>
        `;
    }
}

export function createGame(container, config) {
    return new PhonicsFlightGame(container, config);
}