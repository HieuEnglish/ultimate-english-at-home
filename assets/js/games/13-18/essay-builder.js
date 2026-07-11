/* assets/js/games/13-18/essay-builder.js
   Essay Builder - Ages 13-18
   
   Advanced grammar: order paragraphs to build essays!
   Practice logical flow and coherence.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Essays with shuffled paragraphs
const ESSAYS = [
    {
        topic: "The Importance of Reading",
        paragraphs: [
            { id: 1, text: "Reading is one of the most valuable skills a person can develop. It opens doors to knowledge and imagination." },
            { id: 2, text: "Furthermore, reading improves vocabulary and writing abilities. The more we read, the better we communicate." },
            { id: 3, text: "Additionally, reading reduces stress and provides an escape from daily pressures. It exercises the brain and improves focus." },
            { id: 4, text: "In conclusion, developing a reading habit benefits everyone. It enhances education, reduces stress, and expands horizons." }
        ]
    },
    {
        topic: "Technology in Education",
        paragraphs: [
            { id: 1, text: "Technology has transformed how students learn in the modern classroom. Digital tools provide new opportunities for education." },
            { id: 2, text: "Online resources give students access to information from around the world. They can research topics and collaborate with peers globally." },
            { id: 3, text: "However, technology also presents challenges. Students must learn to distinguish reliable sources from misinformation." },
            { id: 4, text: "Overall, when used wisely, technology enhances learning. Schools must teach digital literacy alongside traditional subjects." }
        ]
    },
    {
        topic: "Environmental Protection",
        paragraphs: [
            { id: 1, text: "Our planet faces serious environmental challenges. Climate change and pollution threaten ecosystems worldwide." },
            { id: 2, text: "Individual actions can make a difference. Reducing waste, recycling, and conserving energy all help protect the environment." },
            { id: 3, text: "Governments and businesses also have responsibilities. They must create policies that prioritize sustainability." },
            { id: 4, text: "Together, we can create a cleaner future. Environmental protection requires effort from everyone in society." }
        ]
    },
    {
        topic: "The Value of Critical Thinking",
        paragraphs: [
            { id: 1, text: "Critical thinking is an essential skill in the modern information age. It allows people to evaluate claims and make informed decisions." },
            { id: 2, text: "Without critical thinking, individuals are vulnerable to misinformation and manipulation. They may accept ideas without questioning their validity." },
            { id: 3, text: "Schools play a crucial role in developing this skill. Encouraging debate, analysis, and evidence-based reasoning prepares students for real-world challenges." },
            { id: 4, text: "Ultimately, a society that values critical thinking is more democratic and resilient. Informed citizens are the foundation of a healthy democracy." }
        ]
    },
    {
        topic: "Mental Health Awareness",
        paragraphs: [
            { id: 1, text: "Mental health is just as important as physical health, yet it remains widely misunderstood and stigmatized in many cultures." },
            { id: 2, text: "Research shows that one in four people will experience a mental health issue in their lifetime. Early intervention and support are key to recovery." },
            { id: 3, text: "Schools and workplaces must create environments where people feel safe discussing their mental well-being without fear of judgment." },
            { id: 4, text: "In summary, raising awareness and reducing stigma around mental health is not just compassionate but necessary for a healthier society." }
        ]
    }
];

class EssayBuilderGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentEssay = null;
        this.shuffledParagraphs = [];
        this.userOrder = [];
        this.rounds = 0;
        this.correctAnswers = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="game-area essay-game">
        <div class="essay-header">
          <span class="essay-title">📝 Essay Builder</span>
          <span class="essay-subtitle">Arrange the paragraphs in logical order</span>
        </div>
        <div class="essay-topic" id="essay-topic"></div>
        <div class="paragraph-list" id="paragraph-list"></div>
        <div class="essay-controls">
          <button class="btn btn--small clear-btn">🔄 Reset</button>
          <button class="btn btn--primary submit-btn">✓ Check Order</button>
        </div>
        <div class="game-feedback" id="game-feedback"></div>
        <div class="game-progress" id="game-progress"></div>
      </div>
    `;

        const style = document.createElement('style');
        style.textContent = `
      .essay-game { max-width: 650px; margin: 0 auto; }
      .essay-header { text-align: center; margin-bottom: 16px; }
      .essay-title { font-size: 20px; font-weight: 700; display: block; }
      .essay-subtitle { font-size: 14px; color: var(--muted); }
      .essay-topic {
        text-align: center;
        padding: 12px 20px;
        border-radius: 12px;
        background: rgba(107, 102, 255, 0.1);
        border: 1px solid rgba(107, 102, 255, 0.3);
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 18px;
      }
      .paragraph-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin-bottom: 20px;
      }
      .paragraph-item {
        display: flex;
        gap: 12px;
        padding: 14px 16px;
        border-radius: 12px;
        background: var(--surface);
        border: 2px solid var(--border);
        cursor: grab;
        transition: all 0.2s ease;
      }
      .paragraph-item:hover {
        border-color: var(--accent);
        transform: translateX(4px);
      }
      .paragraph-item.selected {
        border-color: var(--accent);
        background: rgba(107, 102, 255, 0.1);
      }
      .paragraph-item.placed {
        opacity: 0.5;
        cursor: default;
      }
      .paragraph-number {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background: var(--accent);
        color: white;
        font-weight: 700;
        font-size: 14px;
        flex-shrink: 0;
      }
      .paragraph-text {
        flex: 1;
        font-size: 14px;
        line-height: 1.5;
      }
      .paragraph-item.correct {
        border-color: #00ff88;
        background: rgba(0, 255, 136, 0.1);
      }
      .paragraph-item.incorrect {
        border-color: #ff5f5f;
        background: rgba(255, 95, 95, 0.1);
      }
      .essay-controls {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .feedback-message {
        padding: 12px 20px;
        border-radius: 12px;
        font-weight: 700;
        text-align: center;
      }
      .feedback-success { background: rgba(0, 255, 136, 0.15); color: #00cc6a; }
      .feedback-error { background: rgba(255, 95, 95, 0.15); color: #ff5f5f; }
      .progress-bar { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; margin-top: 16px; }
      .progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); transition: width 0.3s ease; }
      .progress-text { font-size: 12px; color: var(--muted); text-align: center; margin-top: 8px; }
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
        if (this.rounds >= 3) {
            this.end();
            return;
        }

        this.rounds++;
        this.userOrder = [];
        this.updateProgress();

        // Pick random essay
        const shuffled = [...ESSAYS].sort(() => Math.random() - 0.5);
        this.currentEssay = shuffled[0];
        this.shuffledParagraphs = [...this.currentEssay.paragraphs].sort(() => Math.random() - 0.5);

        this.renderRound();
    }

    renderRound() {
        const topicEl = document.getElementById('essay-topic');
        const listEl = document.getElementById('paragraph-list');
        const feedbackEl = document.getElementById('game-feedback');

        topicEl.textContent = `📌 Topic: ${this.currentEssay.topic}`;

        // Render paragraphs in user order, or shuffled if not yet ordered
        const toRender = this.userOrder.length > 0
            ? this.userOrder.map(id => this.shuffledParagraphs.find(p => p.id === id))
            : this.shuffledParagraphs;

        listEl.replaceChildren();
        toRender.forEach((paragraph) => {
            const item = document.createElement('button');
            item.type = 'button';
            item.className = `paragraph-item ${this.userOrder.includes(paragraph.id) ? 'selected' : ''}`;
            item.dataset.id = String(paragraph.id);
            const number = document.createElement('span');
            number.className = 'paragraph-number';
            number.textContent = String(this.userOrder.indexOf(paragraph.id) + 1 || '?');
            const text = document.createElement('span');
            text.className = 'paragraph-text';
            text.textContent = String(paragraph.text);
            item.append(number, text);
            item.addEventListener('click', () => this.toggleParagraph(parseInt(item.dataset.id)));
            listEl.appendChild(item);
        });

        // Controls
        document.querySelector('.clear-btn').onclick = () => {
            this.userOrder = [];
            this.renderRound();
        };
        document.querySelector('.submit-btn').onclick = () => this.checkOrder();

        feedbackEl.innerHTML = '';
    }

    toggleParagraph(id) {
        if (this.userOrder.includes(id)) {
            // Remove and all after
            const idx = this.userOrder.indexOf(id);
            this.userOrder = this.userOrder.slice(0, idx);
        } else {
            this.userOrder.push(id);
        }
        this.renderRound();
    }

    checkOrder() {
        if (this.userOrder.length !== this.currentEssay.paragraphs.length) {
            this.showFeedback('Click all paragraphs in order first!', 'error');
            return;
        }

        const correctOrder = this.currentEssay.paragraphs.map(p => p.id);
        const isCorrect = this.userOrder.join(',') === correctOrder.join(',');

        // Highlight correct/incorrect
        const listEl = document.getElementById('paragraph-list');
        listEl.querySelectorAll('.paragraph-item').forEach((item, i) => {
            const id = parseInt(item.dataset.id);
            const correctPosition = correctOrder.indexOf(id);
            if (this.userOrder.indexOf(id) === correctPosition) {
                item.classList.add('correct');
            } else {
                item.classList.add('incorrect');
            }
        });

        if (isCorrect) {
            this.incrementCombo();
            this.addScore(200);
            this.correctAnswers++;
            this.updateScoreDisplay();
            this.celebrateMove({ burst: 'FLOW', duration: 700 });
            this.showFeedback('🎉 Perfect essay order!', 'success');
        } else {
            this.resetCombo();
            this.coachMove();
            this.showFeedback('Not quite. Study the correct order!', 'error');
        }

        setTimeout(() => this.nextRound(), 2500);
    }

    showFeedback(message, type) {
        const feedbackEl = document.getElementById('game-feedback');
        feedbackEl.innerHTML = `<div class="feedback-message feedback-${type}">${message}</div>`;
    }

    updateProgress() {
        const progressEl = document.getElementById('game-progress');
        if (progressEl) {
            const percent = (this.rounds / 3) * 100;
            progressEl.innerHTML = `
        <div class="progress-bar"><div class="progress-fill" style="width: ${percent}%"></div></div>
        <div class="progress-text">Essay ${this.rounds} of 3 • Correct: ${this.correctAnswers}</div>
      `;
        }
    }

    updateScoreDisplay() {
        let hud = this.container.querySelector('.game-hud');
        if (!hud) {
            const gameArea = this.container.querySelector('.game-area');
            gameArea.insertAdjacentHTML('afterbegin', `
        <div class="game-hud">
          <div class="hud-score"><span class="hud-label">Score</span><span class="hud-value" data-game-score>${this.score}</span></div>
          <div class="hud-combo"><span class="hud-value" data-game-combo>${this.combo}x</span><span class="hud-label">Combo</span></div>
        </div>
      `);
        }
        const scoreEl = this.container.querySelector('[data-game-score]');
        if (scoreEl) { scoreEl.textContent = this.score; Animations.bounce(scoreEl, 1.2, 200); }
        const comboEl = this.container.querySelector('[data-game-combo]');
        if (comboEl) { comboEl.textContent = `${this.combo}x`; }
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();
        if (this.correctAnswers === 3) this.addScore(500);
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new EssayBuilderGame(container, config);
}
