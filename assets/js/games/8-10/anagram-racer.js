/* assets/js/games/8-10/anagram-racer.js
   Anagram Racer - Ages 8-10

   Tap the scrambled letters in the correct order to build the word!
   10 rounds of word-building fun.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const WORDS = [
    { word: "planet", hint: "Earth orbits this", category: "🌍" },
    { word: "rocket", hint: "Blasts into space", category: "🚀" },
    { word: "castle", hint: "Home of a king", category: "🏰" },
    { word: "dragon", hint: "Breathes fire", category: "🐉" },
    { word: "wizard", hint: "Uses magic", category: "🧙" },
    { word: "pirate", hint: "Sails the seas", category: "🏴‍☠️" },
    { word: "island", hint: "Land surrounded by water", category: "🏝️" },
    { word: "trophy", hint: "Winner's prize", category: "🏆" },
    { word: "garden", hint: "Flowers grow here", category: "🌻" },
    { word: "jungle", hint: "Dense tropical forest", category: "🌴" },
    { word: "bridge", hint: "Crosses a river", category: "🌉" },
    { word: "forest", hint: "Many trees", category: "🌲" },
    { word: "mirror", hint: "Shows your reflection", category: "🪞" },
    { word: "guitar", hint: "Strum it for music", category: "🎸" },
    { word: "market", hint: "Buy and sell goods", category: "🏪" },
    { word: "tunnel", hint: "Goes underground", category: "🚇" },
    { word: "basket", hint: "Carry things in it", category: "🧺" },
    { word: "silver", hint: "Shiny metal", category: "🥈" },
    { word: "candle", hint: "Gives off warm light", category: "🕯️" },
    { word: "rabbit", hint: "Likes to hop", category: "🐰" },
];

class AnagramRacerGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: false });
        this.currentWord = null;
        this.scrambled = [];
        this.selectedIndices = [];
        this.rounds = 0;
        this.correctAnswers = 0;
    }

    async init() {
        this.container.innerHTML = `
            <div class="racer-game">
                <div class="racer-bg">
                    <div class="road-lines"></div>
                </div>

                <div class="racer-stage">
                    <!-- Header -->
                    <div class="racer-hud">
                        <div class="hud-item round-display">
                            <span class="hud-label">Round</span>
                            <span class="hud-value" id="round-num">1</span>
                            <span class="hud-total">/ 10</span>
                        </div>
                        <div class="hud-item score-display">
                            <span class="hud-icon">⭐</span>
                            <span class="hud-value" id="score-val">0</span>
                        </div>
                    </div>

                    <!-- Progress bar -->
                    <div class="progress-track">
                        <div class="progress-fill" id="progress-fill"></div>
                    </div>

                    <!-- Word hint -->
                    <div class="word-info">
                        <span class="word-category" id="word-category">🌍</span>
                        <span class="word-hint" id="word-hint">Loading...</span>
                    </div>

                    <!-- Answer display -->
                    <div class="answer-display" id="answer-display"></div>

                    <!-- Scrambled letters -->
                    <div class="letter-bank" id="letter-bank"></div>

                    <!-- Action buttons -->
                    <div class="racer-controls">
                        <button class="ctrl-btn clear-btn" id="clear-btn">🔄 Clear</button>
                    </div>

                    <!-- Feedback area -->
                    <div class="racer-feedback" id="feedback"></div>
                </div>
            </div>
        `;

        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .racer-game {
                position: relative;
                width: 100%;
                min-height: 520px;
                overflow: hidden;
                border-radius: 24px;
                background: linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
                font-family: 'Fredoka One', 'Nunito', cursive, sans-serif;
            }

            .racer-bg {
                position: absolute;
                inset: 0;
                overflow: hidden;
            }

            .road-lines {
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 120px;
                height: 100%;
                background: repeating-linear-gradient(
                    to bottom,
                    transparent,
                    transparent 30px,
                    rgba(255, 255, 255, 0.1) 30px,
                    rgba(255, 255, 255, 0.1) 50px
                );
                animation: roadMove 1s linear infinite;
            }

            @keyframes roadMove {
                0% { background-position: 0 0; }
                100% { background-position: 0 50px; }
            }

            .racer-stage {
                position: relative;
                padding: 20px;
                max-width: 480px;
                margin: 0 auto;
                z-index: 1;
            }

            .racer-hud {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 16px;
            }

            .hud-item {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .round-display {
                background: rgba(255, 255, 255, 0.1);
                padding: 10px 18px;
                border-radius: 50px;
                border: 2px solid rgba(255, 255, 255, 0.15);
            }

            .hud-label {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.6);
            }

            .hud-value {
                font-size: 28px;
                font-weight: 800;
                color: #f8b500;
            }

            .hud-total {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.4);
            }

            .score-display {
                background: linear-gradient(135deg, #f8b500, #ff6b35);
                padding: 10px 20px;
                border-radius: 50px;
                box-shadow: 0 4px 15px rgba(248, 181, 0, 0.3);
            }

            .hud-icon {
                font-size: 22px;
            }

            .score-display .hud-value {
                font-size: 24px;
                color: white;
            }

            .progress-track {
                height: 8px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                margin-bottom: 24px;
                overflow: hidden;
            }

            .progress-fill {
                height: 100%;
                width: 0%;
                background: linear-gradient(90deg, #00d2d3, #54a0ff);
                border-radius: 10px;
                transition: width 0.4s ease;
            }

            .word-info {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 14px;
                margin-bottom: 20px;
            }

            .word-category {
                font-size: 44px;
                animation: categoryBounce 1.5s ease-in-out infinite;
            }

            @keyframes categoryBounce {
                0%, 100% { transform: translateY(0) rotate(-5deg); }
                50% { transform: translateY(-10px) rotate(5deg); }
            }

            .word-hint {
                font-size: 20px;
                color: rgba(255, 255, 255, 0.75);
                font-style: italic;
            }

            .answer-display {
                display: flex;
                justify-content: center;
                gap: 8px;
                min-height: 70px;
                padding: 16px;
                background: rgba(255, 255, 255, 0.05);
                border: 3px dashed rgba(255, 255, 255, 0.2);
                border-radius: 20px;
                margin-bottom: 20px;
            }

            .answer-slot {
                width: 52px;
                height: 64px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(145deg, #2d3436, #636e72);
                border: 3px solid rgba(255, 255, 255, 0.1);
                border-radius: 14px;
                font-size: 30px;
                font-weight: 800;
                color: white;
                text-transform: uppercase;
                transition: all 0.2s ease;
            }

            .answer-slot.filled {
                background: linear-gradient(145deg, #6c5ce7, #a55eea);
                border-color: #a55eea;
                animation: slotPop 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            }

            .answer-slot.correct {
                background: linear-gradient(145deg, #00b894, #55efc4);
                border-color: #55efc4;
            }

            .answer-slot.wrong {
                background: linear-gradient(145deg, #d63031, #ff7675);
                border-color: #ff7675;
                animation: wrongShake 0.4s ease;
            }

            @keyframes slotPop {
                0% { transform: scale(0.6); }
                60% { transform: scale(1.15); }
                100% { transform: scale(1); }
            }

            @keyframes wrongShake {
                0%, 100% { transform: translateX(0); }
                20% { transform: translateX(-8px); }
                40% { transform: translateX(8px); }
                60% { transform: translateX(-6px); }
                80% { transform: translateX(6px); }
            }

            .letter-bank {
                display: flex;
                justify-content: center;
                flex-wrap: wrap;
                gap: 10px;
                margin-bottom: 20px;
                min-height: 75px;
            }

            .bank-letter {
                width: 55px;
                height: 65px;
                display: flex;
                align-items: center;
                justify-content: center;
                background: linear-gradient(145deg, #ffeaa7, #fdcb6e);
                border-radius: 14px;
                font-size: 28px;
                font-weight: 800;
                color: #2d3436;
                text-transform: uppercase;
                cursor: pointer;
                box-shadow: 0 5px 0 #e17055, 0 8px 20px rgba(0, 0, 0, 0.25);
                transition: all 0.15s ease;
                user-select: none;
            }

            .bank-letter:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 0 #e17055, 0 14px 25px rgba(0, 0, 0, 0.3);
            }

            .bank-letter:active {
                transform: translateY(3px);
                box-shadow: 0 2px 0 #e17055;
            }

            .bank-letter.selected {
                opacity: 0.25;
                transform: scale(0.9);
                pointer-events: none;
            }

            @keyframes letterDrop {
                0% { transform: translateY(-40px) rotate(-10deg); opacity: 0; }
                60% { transform: translateY(5px) rotate(3deg); }
                100% { transform: translateY(0) rotate(0); opacity: 1; }
            }

            .racer-controls {
                display: flex;
                justify-content: center;
                margin-bottom: 16px;
            }

            .ctrl-btn {
                padding: 14px 32px;
                border-radius: 14px;
                border: none;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s ease;
            }

            .clear-btn {
                background: rgba(255, 255, 255, 0.1);
                color: white;
                border: 2px solid rgba(255, 255, 255, 0.2);
            }

            .clear-btn:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.05);
            }

            .racer-feedback {
                text-align: center;
                min-height: 32px;
            }

            .feedback-msg {
                display: inline-block;
                padding: 10px 28px;
                border-radius: 50px;
                font-size: 18px;
                font-weight: 700;
                animation: feedbackPop 0.3s ease;
            }

            .feedback-success {
                background: rgba(0, 184, 148, 0.2);
                color: #55efc4;
            }

            .feedback-error {
                background: rgba(214, 48, 49, 0.2);
                color: #ff7675;
            }

            @keyframes feedbackPop {
                0% { transform: scale(0); opacity: 0; }
                60% { transform: scale(1.15); }
                100% { transform: scale(1); opacity: 1; }
            }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.correctAnswers = 0;
        this.score = 0;
        this.nextRound();
    }

    nextRound() {
        this.rounds++;
        this.selectedIndices = [];

        // Pick a random word
        const shuffledWords = this.shuffleWithBagFirst(WORDS, 'words');
        this.currentWord = shuffledWords[0];

        // Scramble letters
        this.scrambled = this.currentWord.word.split('').sort(() => Math.random() - 0.5);

        // Make sure it's actually scrambled
        while (this.scrambled.join('') === this.currentWord.word) {
            this.scrambled.sort(() => Math.random() - 0.5);
        }

        this.renderRound();
        this.updateHUD();
    }

    renderRound() {
        // Update word info
        document.getElementById('word-category').textContent = this.currentWord.category;
        document.getElementById('word-hint').textContent = this.currentWord.hint;

        // Render answer slots
        const answerEl = document.getElementById('answer-display');
        answerEl.innerHTML = this.currentWord.word.split('').map((_, i) => {
            const selectedIndex = this.selectedIndices[i];
            const letter = selectedIndex !== undefined ? this.scrambled[selectedIndex] : '';
            return `<div class="answer-slot ${letter ? 'filled' : ''}">${letter}</div>`;
        }).join('');

        // Render letter bank
        const bankEl = document.getElementById('letter-bank');
        bankEl.innerHTML = this.scrambled.map((letter, i) => {
            const isSelected = this.selectedIndices.includes(i);
            return `<button class="bank-letter ${isSelected ? 'selected' : ''}"
                data-index="${i}"
                style="animation-delay: ${i * 0.04}s"
                ${isSelected ? 'disabled' : ''}>${letter}</button>`;
        }).join('');

        // Add click handlers
        bankEl.querySelectorAll('.bank-letter:not(.selected)').forEach(btn => {
            btn.addEventListener('click', () => this.selectLetter(parseInt(btn.dataset.index)));
        });

        // Clear button handler
        document.getElementById('clear-btn').onclick = () => this.clearSelection();
        document.getElementById('feedback').innerHTML = '';
    }

    selectLetter(index) {
        if (this.selectedIndices.length >= this.currentWord.word.length) return;
        if (this.selectedIndices.includes(index)) return;

        this.selectedIndices.push(index);
        this.renderRound();

        // Auto-check when all letters are selected
        if (this.selectedIndices.length === this.currentWord.word.length) {
            setTimeout(() => this.checkAnswer(), 400);
        }
    }

    clearSelection() {
        this.selectedIndices = [];
        this.renderRound();
    }

    checkAnswer() {
        const answer = this.selectedIndices.map(i => this.scrambled[i]).join('');
        const isCorrect = answer === this.currentWord.word;
        const slots = document.querySelectorAll('.answer-slot');

        if (isCorrect) {
            this.correctAnswers++;
            this.incrementCombo();
            const baseScore = 100;
            const comboBonus = Math.max(0, (this.combo - 1) * 25);
            this.addScore(baseScore + comboBonus);

            slots.forEach(s => s.classList.add('correct'));
            this.showFeedback('🎉 Correct!', 'success');
            this.celebrateMove({ burst: this.currentWord.word.toUpperCase(), duration: 800 });
            this.confetti.explode(null, null, 20);

            if (this.combo >= 3) {
                this.confetti.explode(null, null, 15);
            }

            this.updateHUD();

            setTimeout(() => {
                if (this.rounds < 10) {
                    this.nextRound();
                } else {
                    this.end();
                }
            }, 1200);
        } else {
            this.resetCombo();
            slots.forEach(s => s.classList.add('wrong'));
            this.showFeedback('Try again!', 'error');
            this.coachMove(`The word was "${this.currentWord.word}". Keep going!`, 1500);

            setTimeout(() => {
                this.selectedIndices = [];
                this.renderRound();
            }, 900);
        }
    }

    updateHUD() {
        document.getElementById('score-val').textContent = this.score;
        document.getElementById('round-num').textContent = this.rounds;
        document.getElementById('progress-fill').style.width = `${(this.rounds / 10) * 100}%`;
    }

    showFeedback(text, type) {
        document.getElementById('feedback').innerHTML = `<div class="feedback-msg feedback-${type}">${text}</div>`;
    }

    end() {
        super.end();
        this.isRunning = false;

        // Bonus for completing all rounds
        if (this.correctAnswers >= 8) {
            this.addScore(200);
        } else if (this.correctAnswers >= 5) {
            this.addScore(100);
        }

        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new AnagramRacerGame(container, config);
}
