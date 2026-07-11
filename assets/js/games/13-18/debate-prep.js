/* assets/js/games/13-18/debate-prep.js
   Debate Prep - Ages 13-18
   
   Advanced vocabulary and argumentation!
   Match arguments to debate positions.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Debate topics with arguments
const DEBATES = [
  {
    topic: "Should school uniforms be mandatory?",
    forArguments: [
      "Uniforms reduce peer pressure and bullying over clothing",
      "They create a sense of belonging and school identity",
      "Students focus more on learning, less on fashion"
    ],
    againstArguments: [
      "Uniforms restrict self-expression and individuality",
      "They place financial burden on some families",
      "There is no proof uniforms improve academic performance"
    ]
  },
  {
    topic: "Should social media have age restrictions?",
    forArguments: [
      "Young people need protection from online predators",
      "Social media can negatively impact mental health",
      "Children should develop real-world social skills first"
    ],
    againstArguments: [
      "Age restrictions are nearly impossible to enforce",
      "Social media offers educational opportunities",
      "Parents should decide, not the government"
    ]
  },
  {
    topic: "Is homework beneficial for students?",
    forArguments: [
      "Homework reinforces what students learn in class",
      "It teaches responsibility and time management",
      "Practice is essential for mastering skills"
    ],
    againstArguments: [
      "Too much homework causes stress and burnout",
      "Students need time for other activities and rest",
      "Quality of learning matters more than quantity"
    ]
  },
  {
    topic: "Should voting age be lowered to sixteen?",
    forArguments: [
      "Young people are directly affected by political decisions",
      "Sixteen-year-olds can work and pay taxes, so they deserve representation",
      "Early voting builds lifelong civic engagement habits"
    ],
    againstArguments: [
      "Most sixteen-year-olds lack sufficient political knowledge",
      "Adolescent brains are still developing decision-making abilities",
      "Lowering the age could make elections more susceptible to manipulation"
    ]
  },
  {
    topic: "Should college education be free for everyone?",
    forArguments: [
      "Free education increases access and reduces inequality",
      "A more educated workforce benefits the entire economy",
      "Students would graduate without crippling debt"
    ],
    againstArguments: [
      "Taxpayers would bear the enormous financial burden",
      "Free tuition could reduce the perceived value of a degree",
      "Trade schools and apprenticeships are equally valuable alternatives"
    ]
  }
];

class DebatePrepGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 120 });
    this.currentDebate = null;
    this.allArguments = [];
    this.categorized = { for: [], against: [] };
    this.rounds = 0;
    this.correctAnswers = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-area debate-game">
        <div class="debate-header">
          <span class="debate-title">🎤 Debate Prep</span>
          <span class="debate-subtitle">Sort arguments into FOR or AGAINST</span>
        </div>
        <div class="debate-topic" id="debate-topic"></div>
        <div class="debate-layout">
          <div class="argument-pool" id="argument-pool">
            <h4>Arguments to Sort:</h4>
            <div class="pool-items" id="pool-items"></div>
          </div>
          <div class="debate-sides">
            <div class="debate-side for-side" data-side="for">
              <h4>👍 FOR</h4>
              <div class="side-items" id="for-items"></div>
            </div>
            <div class="debate-side against-side" data-side="against">
              <h4>👎 AGAINST</h4>
              <div class="side-items" id="against-items"></div>
            </div>
          </div>
        </div>
        <div class="debate-controls">
          <button class="btn btn--small reset-btn">🔄 Reset</button>
          <button class="btn btn--primary check-btn">✓ Check Answers</button>
        </div>
        <div class="game-feedback" id="game-feedback"></div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .debate-game { max-width: 700px; margin: 0 auto; }
      .debate-header { text-align: center; margin-bottom: 16px; }
      .debate-title { font-size: 20px; font-weight: 700; display: block; }
      .debate-subtitle { font-size: 14px; color: var(--muted); }
      .debate-topic {
        text-align: center;
        padding: 14px 20px;
        border-radius: 12px;
        background: var(--surface);
        border: 2px solid var(--accent);
        margin-bottom: 20px;
        font-weight: 700;
        font-size: 16px;
      }
      .debate-layout {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }
      .argument-pool h4, .debate-side h4 {
        margin: 0 0 10px;
        font-size: 14px;
        color: var(--muted);
      }
      .pool-items, .side-items {
        display: flex;
        flex-direction: column;
        gap: 8px;
        min-height: 60px;
      }
      .argument-card {
        padding: 12px 16px;
        border-radius: 10px;
        background: var(--surface);
        border: 2px solid var(--border);
        font-size: 13px;
        cursor: pointer;
        transition: all 0.2s ease;
      }
      .argument-card:hover {
        border-color: var(--accent);
        transform: translateX(4px);
      }
      .argument-card.selected {
        border-color: var(--accent);
        background: rgba(107, 102, 255, 0.1);
      }
      .debate-sides {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
      }
      .debate-side {
        padding: 14px;
        border-radius: 12px;
        background: var(--surface2);
        border: 2px dashed var(--border);
        transition: border-color 0.2s ease;
      }
      .debate-side.active {
        border-color: var(--accent);
        border-style: solid;
      }
      .for-side { border-color: rgba(0, 255, 136, 0.3); }
      .against-side { border-color: rgba(255, 95, 95, 0.3); }
      .for-side.active { border-color: #00ff88; background: rgba(0, 255, 136, 0.05); }
      .against-side.active { border-color: #ff5f5f; background: rgba(255, 95, 95, 0.05); }
      .for-side .argument-card.correct { border-color: #00ff88; }
      .against-side .argument-card.correct { border-color: #00ff88; }
      .argument-card.incorrect { border-color: #ff5f5f; }
      .debate-controls {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin: 16px 0;
      }
      .feedback-message {
        padding: 12px 20px;
        border-radius: 12px;
        font-weight: 700;
        text-align: center;
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
    if (this.rounds >= 2) {
      this.end();
      return;
    }

    this.rounds++;
    this.categorized = { for: [], against: [] };
    this.selectedArgument = null;

    // Pick random debate  
    const shuffled = [...DEBATES].sort(() => Math.random() - 0.5);
    this.currentDebate = shuffled[0];

    // Combine and shuffle arguments
    this.allArguments = [
      ...this.currentDebate.forArguments.map(a => ({ text: a, correct: 'for' })),
      ...this.currentDebate.againstArguments.map(a => ({ text: a, correct: 'against' }))
    ].sort(() => Math.random() - 0.5);

    this.renderRound();
  }

  renderRound() {
    const topicEl = document.getElementById('debate-topic');
    const poolEl = document.getElementById('pool-items');
    const forEl = document.getElementById('for-items');
    const againstEl = document.getElementById('against-items');
    const feedbackEl = document.getElementById('game-feedback');

    topicEl.textContent = this.currentDebate.topic;

    // Pool (uncategorized)
    const uncategorized = this.allArguments.filter(a =>
      !this.categorized.for.includes(a.text) && !this.categorized.against.includes(a.text)
    );

    // Render args as draggables
    poolEl.replaceChildren();
    if (uncategorized.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'empty-pool-msg';
      empty.textContent = 'All sorted! Check answers.';
      poolEl.appendChild(empty);
    } else {
      uncategorized.forEach((argument) => poolEl.appendChild(this.createArgumentCard(argument.text, false)));
    }

    // Categorized (already sorted)
    forEl.replaceChildren(...this.categorized.for.map((text) => this.createArgumentCard(text, true)));
    againstEl.replaceChildren(...this.categorized.against.map((text) => this.createArgumentCard(text, true)));

    // Setup Drag and Drop
    this.setupDragAndDrop();

    // Undo handlers
    [forEl, againstEl].forEach(container => {
      container.querySelectorAll('.undo-btn').forEach(btn => {
        btn.onclick = (e) => {
          e.stopPropagation();
          const text = btn.parentElement.dataset.text;
          const side = container.id === 'for-items' ? 'for' : 'against';
          this.removeFromSide(text, side);
        };
      });
    });

    // Controls
    document.querySelector('.reset-btn').onclick = () => {
      this.categorized = { for: [], against: [] };
      this.renderRound();
    };
    document.querySelector('.check-btn').onclick = () => this.checkAnswers();

    feedbackEl.innerHTML = '';
  }

  setupDragAndDrop() {
    const potentialDraggables = document.querySelectorAll('.argument-card[draggable="true"]');
    const dropZones = document.querySelectorAll('.debate-side');

    potentialDraggables.forEach(card => {
      card.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', card.dataset.text);
        card.classList.add('dragging');
      });
      card.addEventListener('dragend', () => {
        card.classList.remove('dragging');
      });
    });

    dropZones.forEach(zone => {
      zone.addEventListener('dragover', (e) => {
        e.preventDefault();
        zone.classList.add('drag-hover');
      });

      zone.addEventListener('dragleave', () => {
        zone.classList.remove('drag-hover');
      });

      zone.addEventListener('drop', (e) => {
        e.preventDefault();
        zone.classList.remove('drag-hover');
        const text = e.dataTransfer.getData('text/plain');
        const side = zone.dataset.side;

        if (text && !this.categorized.for.includes(text) && !this.categorized.against.includes(text)) {
          this.categorized[side].push(text);
          this.renderRound();
          this.playDropSound();
        }
      });
    });
  }

  createArgumentCard(text, sorted) {
    const card = document.createElement('div');
    card.className = `argument-card ${sorted ? 'sorted' : ''}`;
    card.dataset.text = String(text);
    card.draggable = !sorted;
    if (!sorted) {
      const handle = document.createElement('span');
      handle.className = 'drag-handle';
      handle.textContent = '::';
      handle.setAttribute('aria-hidden', 'true');
      card.append(handle, document.createTextNode(` ${text}`));
    } else {
      card.appendChild(document.createTextNode(`${text} `));
      const undo = document.createElement('button');
      undo.type = 'button';
      undo.className = 'undo-btn';
      undo.textContent = '↩';
      undo.setAttribute('aria-label', `Undo ${text}`);
      card.appendChild(undo);
    }
    return card;
  }

  playDropSound() {
    // Sound effect logic
  }

  removeFromSide(text, side) {
    this.categorized[side] = this.categorized[side].filter(t => t !== text);
    this.renderRound();
  }

  checkAnswers() {
    const totalToSort = this.allArguments.length;
    const totalSorted = this.categorized.for.length + this.categorized.against.length;

    if (totalSorted < totalToSort) {
      this.showFeedback('Sort all arguments first!', 'error');
      return;
    }

    // Check correctness
    let correct = 0;
    this.categorized.for.forEach(text => {
      const arg = this.allArguments.find(a => a.text === text);
      if (arg.correct === 'for') correct++;
    });
    this.categorized.against.forEach(text => {
      const arg = this.allArguments.find(a => a.text === text);
      if (arg.correct === 'against') correct++;
    });

    const isAllCorrect = correct === totalToSort;

    if (isAllCorrect) {
      this.incrementCombo();
      this.addScore(250);
      this.correctAnswers++;
      this.updateScoreDisplay();
      this.celebrateMove({ burst: 'CASE READY', duration: 800 });
      this.showFeedback('🎉 Perfect debate prep!', 'success');
    } else {
      this.resetCombo();
      this.coachMove();
      this.showFeedback(`${correct}/${totalToSort} correct. Study the positions!`, 'error');
    }

    setTimeout(() => this.nextRound(), 2500);
  }

  showFeedback(message, type) {
    const feedbackEl = document.getElementById('game-feedback');
    feedbackEl.innerHTML = `<div class="feedback-message feedback-${type}">${message}</div>`;
  }

  updateScoreDisplay() {
    let hud = this.container.querySelector('.game-hud');
    if (!hud) {
      const gameArea = this.container.querySelector('.game-area');
      gameArea.insertAdjacentHTML('afterbegin', `
        <div class="game-hud">
          <div class="hud-score"><span class="hud-label">Score</span><span class="hud-value" data-game-score>${this.score}</span></div>
          <div class="hud-combo"><span class="hud-value" data-game-combo>${this.combo}x</span><span class="hud-label">Combo</span></div>
          <div class="hud-timer"><span class="hud-label">Time</span><span class="hud-value" data-game-timer>2:00</span></div>
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
    if (this.correctAnswers === 2) this.addScore(500);
    const isHighScore = this.saveScore();
    this.showResults(isHighScore);
  }
}

export function createGame(container, config) {
  return new DebatePrepGame(container, config);
}
