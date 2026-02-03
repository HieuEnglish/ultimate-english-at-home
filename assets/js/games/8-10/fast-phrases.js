/* assets/js/games/8-10/fast-phrases.js
   Fast Phrases - Ages 8-10
   
   MODERN CONSTRUCTION THEME
   "Build" the sentence by stacking brick-words!
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const SENTENCES = [
  { sentence: "The dog is running", emoji: "🐕💨" },
  { sentence: "I like red apples", emoji: "😋🍎" },
  { sentence: "She is reading a book", emoji: "👧📖" },
  { sentence: "The sun is shining bright", emoji: "☀️😎" },
  { sentence: "He plays football well", emoji: "👦⚽" },
  { sentence: "We go to school daily", emoji: "🚌🏫" },
  { sentence: "The cat sleeps all day", emoji: "🐱💤" },
  { sentence: "dolphins can swim fast", emoji: "🐬🌊" },
  { sentence: "I drink water often", emoji: "🥤💧" },
  { sentence: "They are happy friends", emoji: "👫😄" },
];

class FastPhrasesGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 120 });
    this.currentSentence = null;
    this.words = [];
    this.selectedWords = [];
    this.rounds = 0;
    this.correctAnswers = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper builder-theme">
        <!-- Site Header (Blueprint style) -->
        <div class="site-header-bar">
          <div class="blueprint-title">🏗️ SENTENCE BUILDER</div>
          <div class="stats-panel">
            <div class="stat-box">⭐ <span data-game-score>0</span></div>
            <div class="stat-box">⏱️ <span data-game-timer>2:00</span></div>
          </div>
        </div>

        <div class="construction-site">
          <!-- The Wall (Answer Area) -->
          <div class="wall-frame">
            <div class="wall-label">CONSTRUCTION ZONE</div>
            <div class="brick-wall" id="brick-wall"></div>
            <div class="wall-base"></div>
          </div>

          <!-- Crane/Supply Area (Word Bank) -->
          <div class="supply-zone">
            <div class="crane-label">SUPPLY MATERIALS</div>
            <div class="supply-depot" id="supply-depot"></div>
          </div>
        </div>
        
        <div class="control-panel">
           <button class="tool-btn reset-btn" id="reset-btn">🔨 DEMOLISH</button>
           <div class="hint-display" id="hint-display"></div>
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
        padding: 20px;
        background: #2c3e50; /* Dark blueprint blue/grey */
        border-radius: 12px;
        font-family: 'Russo One', sans-serif; /* Blocky font */
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        color: white;
        position: relative;
        overflow: hidden;
      }
      
      /* Blueprint Grid Background */
      .game-wrapper::before {
        content: ''; position: absolute; inset: 0;
        background-image: 
          linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px);
        background-size: 20px 20px;
        z-index: 0;
        pointer-events: none;
      }

      .site-header-bar {
        position: relative; z-index: 2;
        display: flex; justify-content: space-between; align-items: center;
        margin-bottom: 20px; padding: 10px;
        border-bottom: 2px solid #f1c40f;
        background: rgba(0,0,0,0.2);
      }
      
      .blueprint-title { font-size: 24px; color: #f1c40f; text-shadow: 2px 2px 0 #000; letter-spacing: 1px; }
      
      .stats-panel { display: flex; gap: 15px; }
      .stat-box { font-size: 20px; font-weight: bold; background: #34495e; padding: 5px 15px; border-radius: 4px; border: 1px solid #7f8c8d; }

      .construction-site {
        position: relative; z-index: 2;
        display: flex; flex-direction: column; gap: 30px;
        padding: 10px;
      }
      
      /* Wall Area */
      .wall-frame {
        background: rgba(255,255,255,0.1);
        padding: 20px;
        border-radius: 8px;
        min-height: 140px;
        display: flex; flex-direction: column; align-items: center;
        border: 2px dashed #95a5a6;
      }
      .wall-label { font-size: 14px; color: #95a5a6; margin-bottom: 10px; letter-spacing: 2px; }
      
      .brick-wall {
        display: flex; flex-wrap: wrap; justify-content: center; gap: 4px;
        min-height: 60px; width: 100%;
      }
      
      .brick {
        background: #e67e22;
        color: white;
        padding: 12px 20px;
        font-size: 18px;
        border-radius: 4px;
        border-bottom: 4px solid #d35400;
        border-right: 4px solid #d35400;
        border-top: 1px solid #f39c12;
        border-left: 1px solid #f39c12;
        cursor: pointer;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.2);
        animation: dropIn 0.3s ease-out;
        position: relative;
      }
      .brick::after { /* Mortar look? Or slight texture */
        content: ''; position: absolute; top: 2px; left: 2px; right: 2px; height: 3px; 
        background: rgba(255,255,255,0.1); border-radius: 2px;
      }
      .brick:hover { transform: translateY(-2px); filter: brightness(1.1); }
      
      @keyframes dropIn { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

      .wall-base {
        width: 100%; height: 10px; background: #7f8c8d; margin-top: 10px; border-radius: 4px;
      }
      
      /* Supply Zone */
      .supply-zone {
        background: rgba(0,0,0,0.3);
        padding: 20px;
        border-radius: 8px;
        border: 2px solid #576574;
      }
      .crane-label { font-size: 14px; color: #bdc3c7; margin-bottom: 15px; text-transform: uppercase; }
      
      .supply-depot {
        display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;
      }
      
      .supply-item {
        background: #95a5a6;
        color: #ecf0f1;
        padding: 10px 18px;
        font-size: 16px;
        border-radius: 4px;
        border: 2px solid #7f8c8d;
        cursor: pointer;
        transition: all 0.2s;
      }
      .supply-item:hover { background: #bdc3c7; color: #2c3e50; transform: scale(1.05); }
      .supply-item.used { opacity: 0; pointer-events: none; transform: scale(0); }
      
      /* Controls */
      .control-panel {
        margin-top: 20px;
        display: flex; justify-content: space-between; align-items: center;
        position: relative; z-index: 2;
      }
      .tool-btn {
        background: #c0392b; color: white; padding: 10px 20px; border: none; border-radius: 6px;
        font-family: inherit; font-size: 16px; cursor: pointer; border-bottom: 4px solid #a93226;
      }
      .tool-btn:active { transform: translateY(2px); border-bottom-width: 0; margin-top: 4px; }
      
      .hint-display { font-size: 20px; }
      
      /* Animations */
      .brick.cementing { animation: cement 0.5s ease; border-color: #27ae60; background: #2ecc71; }
      @keyframes cement { 
        0% { transform: scale(1); } 
        50% { transform: scale(1.1); } 
        100% { transform: scale(1); } 
      }
      
      .brick.wrong { background: #e74c3c; border-color: #c0392b; animation: shake 0.4s; }
      @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.correctAnswers = 0;
    this.nextRound();

    document.getElementById('reset-btn').onclick = () => this.demolish();
  }

  nextRound() {
    if (!this.isRunning) return;
    this.rounds++;
    this.selectedWords = [];

    // Pick random sentence
    const shuffled = [...SENTENCES].sort(() => Math.random() - 0.5);
    this.currentSentence = shuffled[0];

    this.renderRound();
  }

  renderRound() {
    const wall = document.getElementById('brick-wall');
    const depot = document.getElementById('supply-depot');
    const hint = document.getElementById('hint-display');

    wall.innerHTML = '';
    hint.textContent = this.currentSentence.emoji; // Show emoji as "blueprint spec"

    // Prepare Supply
    const words = this.currentSentence.sentence.split(' ').sort(() => Math.random() - 0.5);

    depot.innerHTML = words.map((word, i) => `
            <button class="supply-item" data-word="${word}" data-id="${i}">${word}</button>
        `).join('');

    depot.querySelectorAll('.supply-item').forEach(btn => {
      btn.onclick = () => this.placeBrick(btn);
    });
  }

  placeBrick(supplyBtn) {
    const word = supplyBtn.dataset.word;
    this.selectedWords.push(word);
    supplyBtn.classList.add('used');

    const wall = document.getElementById('brick-wall');
    const brick = document.createElement('div');
    brick.className = 'brick';
    brick.textContent = word;
    brick.onclick = () => {
      // Remove functionality? Or just stick to demolish?
      // Let's keep it simple: Demolish button resets.
    };
    wall.appendChild(brick);

    // Check Answer
    const targetWords = this.currentSentence.sentence.split(' ');
    if (this.selectedWords.length === targetWords.length) {
      this.checkStructuralIntegrity();
    }
  }

  demolish() {
    this.selectedWords = [];
    const wall = document.getElementById('brick-wall');
    wall.innerHTML = ''; // Crash sound would be cool here

    // Reset supply
    document.querySelectorAll('.supply-item').forEach(btn => {
      btn.classList.remove('used');
    });
  }

  checkStructuralIntegrity() {
    const attempt = this.selectedWords.join(' ');
    const correct = this.currentSentence.sentence;

    if (attempt === correct) {
      // Success
      this.incrementCombo();
      this.addScore(100);
      this.correctAnswers++;

      // Cementing animation
      document.querySelectorAll('.brick').forEach((b, i) => {
        setTimeout(() => b.classList.add('cementing'), i * 100);
      });

      this.confetti.explode(null, null, 20);

      setTimeout(() => this.nextRound(), 1500);

    } else {
      // Collapse
      this.resetCombo();
      this.speak("Structure unstable!");

      document.querySelectorAll('.brick').forEach(b => b.classList.add('wrong'));

      setTimeout(() => {
        this.demolish();
      }, 1000);
    }
  }

  end() {
    this.isRunning = false;
    this.endTime = Date.now();
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new FastPhrasesGame(container, config);
}
