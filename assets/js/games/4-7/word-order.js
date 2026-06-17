/* assets/js/games/4-7/word-order.js
   Word Order - Ages 4-7
   Grammar game: arrange words to form a correct sentence.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
    "The cat runs.",
    "Dog eats bone.",
    "Bird flies high.",
    "Fish swims in water.",
    "Sun shines bright.",
    "Moon glows at night.",
    "Rain falls down.",
    "Wind blows soft.",
    "Tree grows tall.",
    "Kids play outside."
];

class WordOrderGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.round = 0;
        this.maxRounds = 5;
        this.sentence = "";
        this.words = [];
        this.selectedWords = [];
        this.correctOrder = [];
    }

    async init() {
        await super.init();
        // Insert HUD
        this.container.insertAdjacentHTML('beforeend', this.renderHUD());

        // Create game UI
        this.container.innerHTML += `
            <div class="word-order-game">
                <div class="wo-instructions">
                    <p>Tap the words in the correct order to make a sentence!</p>
                </div>
                <div class="wo-target" id="wo-target"></div>
                <div class="wo-tiles" id="wo-tiles"></div>
                <div class="wo-feedback" id="wo-feedback"></div>
            </div>
        `;

        // Bind click events on tiles container (delegate)
        this.container.querySelector('#wo-tiles').addEventListener('click', (e) => {
            if (e.target.classList.contains('wo-tile')) {
                const word = e.target.dataset.word;
                this.selectWord(word);
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

        // Pick a random sentence
        const idx = Math.floor(Math.random() * SENTENCES.length);
        this.sentence = SENTENCES[idx];
        this.words = this.sentence.split(' ');
        this.correctOrder = [...this.words];
        this.selectedWords = [];

        // Shuffle words for display
        const shuffled = this.words.slice();
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        this.displayWords(shuffled);
        this.updateFeedback('', 'info');
        // Show target sentence after a short delay? We'll hide initially.
        document.getElementById('wo-target').textContent = ''; // blank until solved
    }

    displayWords(wordList) {
        const container = this.container.querySelector('#wo-tiles');
        container.innerHTML = '';
        wordList.forEach((word, index) => {
            const tile = document.createElement('div');
            tile.className = 'wo-tile';
            tile.dataset.word = word;
            tile.dataset.index = index;
            tile.textContent = word;
            container.appendChild(tile);
        });
    }

    selectWord(word) {
        // Prevent selecting more words than needed
        if (this.selectedWords.length >= this.words.length) return;
        this.selectedWords.push(word);
        this.updateFeedback(`Selected: ${this.selectedWords.join(' ')}`, 'info');

        // If we have selected all words, check
        if (this.selectedWords.length === this.words.length) {
            this.checkSentence();
        }
    }

    checkSentence() {
        const joined = this.selectedWords.join(' ');
        const isCorrect = joined === this.sentence;
        const feedbackEl = this.container.querySelector('#wo-feedback');

        if (isCorrect) {
            this.incrementCombo();
            const earned = this.addScore(150);
            this.showScoreBurst(`+${earned}`);
            this.showEngineFeedback('Correct!', 'success', 800);
            this.updateFeedback(`👍 ${this.sentence}`, 'success');
            // Reveal target sentence
            document.getElementById('wo-target').textContent = `Sentence: ${this.sentence}`;
            // Disable further clicks
            this.container.querySelectorAll('.wo-tile').forEach(t => t.style.pointerEvents = 'none');
        } else {
            this.resetCombo();
            this.pulseStage('error');
            this.showEngineFeedback('Try again', 'warning', 800);
            this.updateFeedback(`❌ Not quite. Try again.`, 'warning');
            // Reset selection
            this.selectedWords = [];
            setTimeout(() => {
                this.updateFeedback('', 'info');
            }, 800);
        }

        // Increment round and load next after delay
        this.round++;
        setTimeout(() => {
            this.resetSelection();
            this.loadRound();
        }, 1500);
    }

    resetSelection() {
        this.selectedWords = [];
        // Re-enable tiles
        this.container.querySelectorAll('.wo-tile').forEach(t => {
            t.style.pointerEvents = 'auto';
            t.style.opacity = '1';
        });
    }

    updateFeedback(message, kind = 'info') {
        const el = this.container.querySelector('#wo-feedback');
        el.textContent = message;
        el.className = `wo-feedback is-${kind}`;
    }

    cleanup() {
        super.cleanup();
    }
}

export function createGame(container, config) {
    return new WordOrderGame(container, config);
}