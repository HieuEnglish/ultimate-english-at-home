/* assets/js/games/4-7/sound-match.js
   Sound Match - Ages 4-7
   Listening game: listen to the word and pick the matching picture.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const WORD_PAIRS = [
    { word: 'cat', emoji: '🐱' },
    { word: 'dog', emoji: '🐕' },
    { word: 'bird', emoji: '🐦' },
    { word: 'fish', emoji: '🐟' },
    { word: 'cat', emoji: '🐱' },
    { word: 'sun', emoji: '☀️' },
    { word: 'tree', emoji: '🌳' },
    { word: 'car', emoji: '🚗' },
    { word: 'book', emoji: '📚' },
    { word: 'ball', emoji: '⚽' },
    { word: 'apple', emoji: '🍎' },
    { word: 'moon', emoji: '🌙' },
    { word: 'star', emoji: '⭐' },
    { word: 'frog', emoji: '🐸' },
    { word: 'duck', emoji: '🦆' },
    { word: 'cow', emoji: '🐮' },
    { word: 'pig', emoji: '🐷' },
    { word: 'bee', emoji: '🐝' },
    { word: 'egg', emoji: '🥚' },
];

class SoundMatchGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.round = 0;
        this.maxRounds = 5;
        this.targetWord = null;
        this.options = []; // array of emojis
        this.correctIndex = null;
    }

    async init() {
        await super.init();
        // Insert HUD (score/combo)
        this.container.insertAdjacentHTML('beforeend', this.renderHUD());

        // Create game UI
        this.container.innerHTML += `
            <div class="sound-match-game">
                <div class="sm-instructions">
                    <p>Listen to the word and tap the matching picture!</p>
                </div>
                <div class="sm-speaker">
                    <button id="sm-play-button" aria-label="Play word">
                        🔊
                    </button>
                </div>
                <div class="sm-options" id="sm-options">
                    <!-- Options will be injected here -->
                </div>
                <div class="sm-feedback" id="sm-feedback"></div>
            </div>
        `;

        // Bind events
        this.container.querySelector('#sm-play-button').addEventListener('click', () => this.playWord());
        this.container.querySelector('#sm-options').addEventListener('click', (e) => {
            if (e.target.classList.contains('sm-option')) {
                const index = Number(e.target.dataset.index);
                this.handleOptionClick(index);
            }
        });
    }

    start() {
        super.start();
        this.loadRound();
    }

    loadRound() {
        if (this.round >= this.maxRounds) {
            this.end();
            return;
        }

        // Pick a random word pair
        const pair = this.pickFromBag(WORD_PAIRS, 'word-pairs');
        this.targetWord = pair.word;
        this.correctEmoji = pair.emoji;

        // Generate three options: one correct, two random different emojis
        const allEmojis = WORD_PAIRS.map(p => p.emoji);
        // Remove correct emoji from pool for distractors
        const distractorsPool = allEmojis.filter(e => e !== this.correctEmoji);
        // Shuffle and pick two
        const shuffled = distractorsPool.sort(() => 0.5 - Math.random());
        this.options = [this.correctEmoji, shuffled[0], shuffled[1]];
        // Shuffle options order
        this.options.sort(() => 0.5 - Math.random());

        // Determine correct index
        this.correctIndex = this.options.indexOf(this.correctEmoji);

        // Update UI
        this.updateOptionsUI();
        this.updateFeedback('', 'info');
        // Play word after short delay
        setTimeout(() => this.playWord(), 500);
    }

    playWord() {
        if ('speechSynthesis' in window) {
            const utter = new SpeechSynthesisUtterance(this.targetWord);
            utter.lang = 'en-US';
            utter.rate = 0.9;
            window.speechSynthesis.speak(utter);
        } else {
            // Fallback: show text
            this.updateFeedback(`(Audio not supported) Word: ${this.targetWord}`, 'info');
        }
    }

    updateOptionsUI() {
        const optionsContainer = this.container.querySelector('#sm-options');
        optionsContainer.innerHTML = '';
        this.options.forEach((emoji, index) => {
            const btn = document.createElement('button');
            btn.className = 'sm-option';
            btn.dataset.index = index;
            btn.innerHTML = `<span class="sm-emoji">${emoji}</span>`;
            optionsContainer.appendChild(btn);
        });
    }

    handleOptionClick(index) {
        // Disable further clicks during feedback
        this.container.querySelectorAll('.sm-option').forEach(btn => btn.disabled = true);

        const isCorrect = index === this.correctIndex;
        const feedbackEl = this.container.querySelector('#sm-feedback');

        if (isCorrect) {
            this.incrementCombo();
            const earned = this.addScore(100);
            this.showScoreBurst(`+${earned}`);
            this.showEngineFeedback('Correct!', 'success', 800);
            this.updateFeedback(`👍 Correct! ${this.targetWord}`, 'success');
            // Animate correct option
            const btn = this.container.querySelector(`.sm-option[data-index="${index}"]`);
            btn.style.transform = 'scale(1.2)';
            setTimeout(() => btn.style.transform = '', 300);
        } else {
            this.resetCombo();
            this.pulseStage('error');
            this.showEngineFeedback('Try again', 'warning', 800);
            this.updateFeedback(`❌ Try again. Listen for "${this.targetWord}".`, 'warning');
            // Animate wrong option
            const btn = this.container.querySelector(`.sm-option[data-index="${index}"]`);
            btn.style.borderColor = 'rgba(255,107,107,.5)';
            setTimeout(() => btn.style.borderColor = '', 300);
        }

        // Increment round and load next after delay
        this.round++;
        setTimeout(() => this.loadRound(), 1500);
    }

    updateFeedback(message, kind = 'info') {
        const el = this.container.querySelector('#sm-feedback');
        el.textContent = message;
        el.className = `sm-feedback is-${kind}`;
    }

    // Optional: cleanup any speech synthesis
    cleanup() {
        super.cleanup();
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    }
}

export function createGame(container, config) {
    return new SoundMatchGame(container, config);
}
