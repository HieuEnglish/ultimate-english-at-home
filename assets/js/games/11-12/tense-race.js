/* assets/js/games/11-12/tense-race.js
   Tense Race - Ages 11-12
   
   Convert sentences to different tenses!
   Fast-paced grammar practice.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Sentence transformations
const TENSE_CHALLENGES = [
  {
    base: "She plays tennis",
    tense: "Past Simple",
    answer: "She played tennis"
  },
  {
    base: "They are eating dinner",
    tense: "Past Continuous",
    answer: "They were eating dinner"
  },
  {
    base: "I go to school",
    tense: "Present Perfect",
    answer: "I have gone to school"
  },
  {
    base: "He writes a letter",
    tense: "Future Simple",
    answer: "He will write a letter"
  },
  {
    base: "We watch TV",
    tense: "Past Simple",
    answer: "We watched TV"
  },
  {
    base: "She reads books",
    tense: "Present Continuous",
    answer: "She is reading books"
  },
  {
    base: "They study English",
    tense: "Present Perfect",
    answer: "They have studied English"
  },
  {
    base: "I cook dinner",
    tense: "Past Continuous",
    answer: "I was cooking dinner"
  },
];

class TenseRaceGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 90 });
    this.currentChallenge = null;
    this.rounds = 0;
    this.correctAnswers = 0;
    this.userInput = '';
  }

  async init() {
    await this.init3D();
    this.container.innerHTML = `
      <div class="game-area tense-race-game">
        <div class="race-header">
          <span class="race-title">⏱️ Tense Race!</span>
        </div>
        <div class="challenge-box" id="challenge-box">
          <div class="base-sentence" id="base-sentence"></div>
          <div class="target-tense" id="target-tense"></div>
        </div>
        <div class="answer-input-area">
          <input type="text" class="answer-input" id="answer-input" placeholder="Type the converted sentence..." autocomplete="off">
          <button class="btn btn--primary submit-btn" id="submit-btn">Submit</button>
        </div>
        <div class="game-feedback" id="game-feedback"></div>
        <div class="game-progress" id="game-progress"></div>
      </div>
    `;

    const style = document.createElement('style');
    style.textContent = `
      .tense-race-game { max-width: 550px; margin: 0 auto; }
      .race-header { text-align: center; margin-bottom: 20px; }
      .race-title { font-size: 22px; font-weight: 700; }
      .challenge-box {
        padding: 24px;
        border-radius: 16px;
        background: var(--surface);
        border: 2px solid var(--border);
        text-align: center;
        margin-bottom: 20px;
      }
      .base-sentence {
        font-size: 22px;
        font-weight: 700;
        margin-bottom: 12px;
      }
      .target-tense {
        display: inline-block;
        padding: 8px 16px;
        border-radius: 999px;
        background: rgba(255, 230, 70, 0.15);
        border: 1px solid rgba(255, 230, 70, 0.35);
        font-size: 14px;
        font-weight: 600;
      }
      .answer-input-area {
        display: flex;
        gap: 12px;
        margin-bottom: 16px;
      }
      .answer-input {
        flex: 1;
        padding: 14px 18px;
        border-radius: 12px;
        border: 2px solid var(--border);
        background: var(--surface);
        font-size: 16px;
        color: var(--text);
        outline: none;
        transition: border-color 0.2s ease;
      }
      .answer-input:focus {
        border-color: var(--accent);
      }
      .submit-btn {
        padding: 14px 24px;
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
    this.showStartOverlay();
  }

  start() {
    this.rounds = 0;
    this.correctAnswers = 0;
    this.createRaceTrack();
    this.nextRound();

    // Focus input
    document.getElementById('answer-input').focus();

    // Submit handlers
    document.getElementById('submit-btn').onclick = () => this.submitAnswer();
    document.getElementById('answer-input').onkeydown = (e) => {
      if (e.key === 'Enter') this.submitAnswer();
    };
  }

  createRaceTrack() {
    // Scrolling Grid/Road
    const geometry = new THREE.PlaneGeometry(20, 40, 20, 20);
    const material = new THREE.MeshBasicMaterial({
      color: 0x4a69bd,
      wireframe: true,
      transparent: true,
      opacity: 0.3
    });

    const road = new THREE.Mesh(geometry, material);
    road.rotation.x = -Math.PI / 2 + 0.2; // Tilted slightly
    road.position.y = -2;
    this.threeHelper.scene.add(road);

    // Stars/Particles passing by
    const starGeo = new THREE.BufferGeometry();
    const starCount = 200;
    const positions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }

    starGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 }));
    this.threeHelper.scene.add(stars);

    this.trackSpeed = 0.05;

    this.threeHelper.objects.push({
      isObject3D: false,
      update: () => {
        // Scroll effect
        road.position.z = (road.position.z + this.trackSpeed) % 2;
        // Stars movement
        const pos = stars.geometry.attributes.position.array;
        for (let i = 0; i < starCount; i++) {
          pos[i * 3 + 2] += this.trackSpeed * 5;
          if (pos[i * 3 + 2] > 5) pos[i * 3 + 2] = -15;
        }
        stars.geometry.attributes.position.needsUpdate = true;

        // Return to normal speed
        if (this.trackSpeed > 0.05) this.trackSpeed *= 0.98;

        return true;
      }
    });
  }

  nextRound() {
    if (!this.isRunning) return;

    this.rounds++;
    this.updateProgress();

    // Pick random challenge
    const shuffled = [...TENSE_CHALLENGES].sort(() => Math.random() - 0.5);
    this.currentChallenge = shuffled[0];

    this.renderRound();
  }

  renderRound() {
    const baseEl = document.getElementById('base-sentence');
    const tenseEl = document.getElementById('target-tense');
    const inputEl = document.getElementById('answer-input');
    const feedbackEl = document.getElementById('game-feedback');

    baseEl.textContent = `"${this.currentChallenge.base}"`;
    tenseEl.textContent = `Convert to: ${this.currentChallenge.tense}`;
    inputEl.value = '';
    inputEl.focus();
    feedbackEl.innerHTML = '';
  }

  submitAnswer() {
    const inputEl = document.getElementById('answer-input');
    const userAnswer = inputEl.value.trim().toLowerCase();
    const correctAnswer = this.currentChallenge.answer.toLowerCase();

    // Allow minor variations (punctuation, capitalization)
    const isCorrect = userAnswer === correctAnswer ||
      userAnswer.replace(/[.,!?]/g, '') === correctAnswer.replace(/[.,!?]/g, '');

    if (isCorrect) {
      this.incrementCombo();
      this.addScore(100);
      this.correctAnswers++;
      this.updateScoreDisplay();
      this.showFeedback('🎉 Correct!', 'success');

      // Visual Boost
      this.trackSpeed = 0.5; // Boost speed!
      this.threeHelper.createExplosion(0x00ff88);

      setTimeout(() => this.nextRound(), 1000);
    } else {
      this.resetCombo();
      this.showFeedback(`Not quite. Answer: "${this.currentChallenge.answer}"`, 'error');
      setTimeout(() => this.nextRound(), 2000);
    }
  }

  showFeedback(message, type) {
    const feedbackEl = document.getElementById('game-feedback');
    feedbackEl.innerHTML = `<div class="feedback-message feedback-${type}">${message}</div>`;
  }

  updateProgress() {
    const progressEl = document.getElementById('game-progress');
    if (progressEl) {
      progressEl.innerHTML = `
        <div class="progress-text">Sentences: ${this.correctAnswers} correct</div>
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
          <div class="hud-timer"><span class="hud-label">Time</span><span class="hud-value" data-game-timer>1:30</span></div>
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
    if (this.correctAnswers >= 10) this.addScore(500);
    const isHighScore = this.saveScore();
    this.showResults(isHighScore);
  }
}

export function createGame(container, config) {
  return new TenseRaceGame(container, config);
}
