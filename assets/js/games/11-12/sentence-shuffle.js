/* assets/js/games/11-12/sentence-shuffle.js
   Sentence Shuffle - Ages 11-12
   
   MODERN MAGNETIC POETRY THEME
   Arrange words on a fridge/whiteboard surface.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
  { sentence: "The children were playing in the garden", grammar: "Past continuous" },
  { sentence: "She has been studying English for three years", grammar: "Present perfect continuous" },
  { sentence: "If it rains tomorrow, we will stay home", grammar: "First conditional" },
  { sentence: "The book was written by a famous author", grammar: "Passive voice" },
  { sentence: "I wish I could speak Spanish fluently", grammar: "Wish + past" },
  { sentence: "Neither the teacher nor the students were ready", grammar: "Neither...nor" },
  { sentence: "By the time we arrived, the movie had started", grammar: "Past perfect" },
  { sentence: "The more you practice, the better you become", grammar: "Comparative structure" },
  { sentence: "Although it was raining, they went for a walk", grammar: "Concessive clause" },
  { sentence: "She asked me where I had been", grammar: "Reported question" },
];

class SentenceShuffleGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 180 });
    this.currentSentence = null;
    this.shuffledWords = [];
    this.selectedWords = [];
    this.rounds = 0;
    this.correctAnswers = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper fridge-theme">
        <div class="fridge-handle"></div>
        <div class="fridge-surface">
          <!-- Top Area: HUD + Hint -->
          <div class="fridge-top">
            <div class="magnet-title">🧲 POETRY</div>
            <div class="sticky-note">
              <span class="note-pin">📌</span>
              <div id="grammar-hint-text">Hint...</div>
            </div>
            <div class="score-display">⭐ <span data-game-score>0</span></div>
          </div>

          <!-- Answer Area (The "Line") -->
          <div class="answer-zone">
            <div class="line-guide"></div>
            <div class="magnet-row" id="magnet-row"></div>
          </div>
          
          <!-- Word Pool (Scattered Magnets) -->
          <div class="scatter-zone" id="scatter-zone"></div>
        </div>
        
        <div class="control-panel">
            <button class="fridge-btn" id="reset-btn">🔄 RESET</button>
            <button class="fridge-btn check-btn" id="check-btn">✅ CHECK</button>
        </div>
      </div>
    `;

    this.injectStyles();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .game-wrapper {
        width: 100%;
        max-width: 800px;
        margin: 0 auto;
        padding: 10px;
        background: #ced6e0; /* Fridge silver/grey */
        border-radius: 20px;
        box-shadow: 
            inset 10px 0 20px rgba(0,0,0,0.05), /* Curved left edge */
            5px 5px 15px rgba(0,0,0,0.2);
        font-family: 'Segoe UI', sans-serif;
        position: relative;
        overflow: hidden;
      }
      
      .fridge-handle {
        position: absolute; left: 10px; top: 100px; bottom: 100px; width: 15px;
        background: linear-gradient(to right, #bdc3c7, #95a5a6, #bdc3c7);
        border-radius: 8px;
        box-shadow: 2px 0 5px rgba(0,0,0,0.2);
        z-index: 5;
      }
      
      .fridge-surface {
        background: #dfe4ea;
        border-radius: 12px;
        min-height: 500px;
        padding: 20px 40px; /* Space for handle */
        display: flex; flex-direction: column; gap: 20px;
        border: 1px solid #fff;
      }
      
      .fridge-top {
        display: flex; justify-content: space-between; align-items: flex-start;
      }
      
      .magnet-title {
        font-weight: 900; color: #2f3542; font-size: 24px;
        text-shadow: 1px 1px 0 rgba(255,255,255,0.5);
        transform: rotate(-2deg);
      }
      
      .sticky-note {
        background: #ffeaa7;
        padding: 15px 20px;
        transform: rotate(2deg);
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        font-family: 'Comic Sans MS', cursive;
        font-size: 14px;
        position: relative;
        max-width: 200px;
      }
      .note-pin { position: absolute; top: -15px; left: 50%; transform: translateX(-50%); font-size: 20px; }
      
      .score-display {
        background: #2f3542; color: #fff; padding: 5px 12px; border-radius: 4px; font-weight: bold;
      }

      /* Answer Zone */
      .answer-zone {
        min-height: 80px;
        position: relative;
        display: flex; align-items: center; justify-content: center;
      }
      .line-guide {
        position: absolute; left: 0; right: 0; bottom: 10px;
        border-bottom: 2px solid rgba(0,0,0,0.1);
      }
      
      .magnet-row {
        display: flex; flex-wrap: wrap; gap: 5px; justify-content: center;
        z-index: 2;
        min-height: 50px; width: 100%;
      }

      /* Scatter Zone */
      .scatter-zone {
        flex: 1;
        background: rgba(0,0,0,0.02);
        border-radius: 8px;
        padding: 20px;
        display: flex; flex-wrap: wrap; justify-content: center; gap: 15px; align-content: flex-start;
      }

      /* The Magnet Tile */
      .magnet-word {
        background: #fff;
        padding: 5px 12px;
        border: 1px solid #7f8c8d;
        box-shadow: 2px 2px 2px rgba(0,0,0,0.15); /* Drop shadow for depth */
        font-size: 16px;
        color: #2c3e50;
        cursor: pointer;
        user-select: none;
        transition: transform 0.1s;
      }
      .magnet-word:hover { transform: scale(1.05); z-index: 10; }
      .magnet-word.placed { box-shadow: 1px 1px 1px rgba(0,0,0,0.1); }
      
      /* Rotations for randomness */
      .rot-1 { transform: rotate(1deg); }
      .rot-2 { transform: rotate(-2deg); }
      .rot-3 { transform: rotate(2deg); }
      .rot-4 { transform: rotate(-1deg); }

      .control-panel {
        display: flex; justify-content: center; gap: 20px; margin-top: 10px;
      }
      .fridge-btn {
        background: #a4b0be; border: 1px solid #747d8c; padding: 8px 16px; border-radius: 4px;
        font-weight: bold; cursor: pointer; color: #2f3542;
      }
      .fridge-btn:hover { background: #ced6e0; }
      .check-btn { background: #2ed573; color: white; border-color: #26af61; }
      .check-btn:hover { background: #26af61; }
      
      /* Feedback */
      .magnet-word.correct { border: 2px solid #2ed573; background: #dff9fb; }
      .magnet-word.wrong { border: 2px solid #ff4757; background: #ffcccc; }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.correctAnswers = 0;
    this.nextRound();

    document.getElementById('reset-btn').onclick = () => this.resetBoard();
    document.getElementById('check-btn').onclick = () => this.checkAnswer();
  }

  nextRound() {
    if (this.rounds >= 8) {
      this.end();
      return;
    }

    this.rounds++;
    this.selectedWords = [];

    const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5);
    this.currentSentence = shuffled[0];
    this.shuffledWords = this.currentSentence.sentence.split(' ').sort(() => Math.random() - 0.5);

    this.renderRound();
  }

  renderRound() {
    document.getElementById('grammar-hint-text').textContent = this.currentSentence.grammar;

    const scatterZone = document.getElementById('scatter-zone');
    const magnetRow = document.getElementById('magnet-row');
    magnetRow.innerHTML = ''; // clear answer area

    scatterZone.innerHTML = this.shuffledWords.map((word, i) => {
      const rotClass = `rot-${(i % 4) + 1}`;
      return `<div class="magnet-word ${rotClass}" data-word="${word}">${word}</div>`;
    }).join('');

    // Add click handlers
    this.bindMagnets();
  }

  bindMagnets() {
    document.querySelectorAll('.magnet-word').forEach(mag => {
      mag.onclick = () => this.moveMagnet(mag);
    });
  }

  moveMagnet(el) {
    const scatterZone = document.getElementById('scatter-zone');
    const magnetRow = document.getElementById('magnet-row');

    if (el.parentElement === scatterZone) {
      // Move to answer row
      magnetRow.appendChild(el);
      el.classList.add('placed');
      // Remove rotation when placed in line
      el.className = 'magnet-word placed';
    } else {
      // Move back to scatter
      scatterZone.appendChild(el);
      el.classList.remove('placed');
      // Re-add random rotation
      const rot = Math.floor(Math.random() * 4) + 1;
      el.classList.add(`rot-${rot}`);
    }
  }

  resetBoard() {
    const magnetRow = document.getElementById('magnet-row');
    const scatterZone = document.getElementById('scatter-zone');

    // Move all back
    Array.from(magnetRow.children).forEach(el => {
      scatterZone.appendChild(el);
      el.classList.remove('placed');
      const rot = Math.floor(Math.random() * 4) + 1;
      el.classList.add(`rot-${rot}`);
    });
  }

  checkAnswer() {
    const magnetRow = document.getElementById('magnet-row');
    const userSentence = Array.from(magnetRow.children).map(el => el.textContent).join(' ');

    if (userSentence === this.currentSentence.sentence) {
      // Correct
      this.incrementCombo();
      this.addScore(150);
      this.correctAnswers++;

      Array.from(magnetRow.children).forEach(el => el.classList.add('correct'));
      this.confetti.explode(null, null, 20);

      setTimeout(() => this.nextRound(), 1500);
    } else {
      this.resetCombo();
      this.speak("Not quite right.");
      Array.from(magnetRow.children).forEach(el => el.classList.add('wrong'));
      setTimeout(() => {
        Array.from(magnetRow.children).forEach(el => el.classList.remove('wrong'));
      }, 1000);
    }
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new SentenceShuffleGame(container, config);
}
