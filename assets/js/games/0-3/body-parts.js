/* assets/js/games/0-3/body-parts.js
   Body Parts Game - Ages 0-3
   
   MODERN TABLET LAYOUT VERSION
   Tablet frame style with central character and body part buttons.
   Theme: "My Body" - joyful, learning focused.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const BODY_PARTS = [
  { name: "head", emoji: "🙂", label: "Head" },
  { name: "eyes", emoji: "👀", label: "Eyes" },
  { name: "nose", emoji: "👃", label: "Nose" },
  { name: "mouth", emoji: "👄", label: "Mouth" },
  { name: "ears", emoji: "👂", label: "Ears" },
  { name: "hands", emoji: "🖐️", label: "Hands" },
  { name: "feet", emoji: "🦶", label: "Feet" },
  { name: "tummy", emoji: "👕", label: "Tummy" },
  { name: "hair", emoji: "💇", label: "Hair" },
  { name: "teeth", emoji: "🦷", label: "Teeth" },
  { name: "tongue", emoji: "👅", label: "Tongue" },
  { name: "fingers", emoji: "☝️", label: "Fingers" },
  { name: "knees", emoji: "🦵", label: "Knees" },
  { name: "shoulders", emoji: "🤷", label: "Shoulders" },
  { name: "arms", emoji: "💪", label: "Arms" },
  { name: "legs", emoji: "🦿", label: "Legs" },
  { name: "chin", emoji: "😊", label: "Chin" },
  { name: "cheeks", emoji: "😳", label: "Cheeks" },
  { name: "elbows", emoji: "🦾", label: "Elbows" },
  { name: "back", emoji: "🔙", label: "Back" },
  { name: "neck", emoji: "🦒", label: "Neck" },
  { name: "thumbs", emoji: "👍", label: "Thumbs" },
  { name: "toes", emoji: "🦶", label: "Toes" },
  { name: "hips", emoji: "🕺", label: "Hips" },
  { name: "wrists", emoji: "⌚", label: "Wrists" },
  { name: "ankles", emoji: "🦿", label: "Ankles" },
  { name: "eyebrows", emoji: "🤨", label: "Eyebrows" },
  { name: "forehead", emoji: "🧠", label: "Forehead" },
  { name: "lips", emoji: "👄", label: "Lips" },
  { name: "belly button", emoji: "⭕", label: "Belly Button" },
];

class BodyPartsGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentPart = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.correctAnswers = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper">
        <!-- Room Background -->
        <div class="room-bg">
          <div class="pattern-wall"></div>
          <div class="floor"></div>
          <div class="plant p1">🌿</div>
          <div class="toy t1">🧸</div>
        </div>

        <!-- Tablet Frame -->
        <div class="tablet-frame">
          <div class="tablet-screen">
            <!-- Header -->
            <div class="screen-header">
              <div class="header-left">
                <button class="icon-btn home-btn">🏠</button>
              </div>
              <div class="header-title">
                <span class="title-text">MY BODY</span>
                <span class="title-icon">🧍</span>
              </div>
              <div class="header-right">
                <div class="score-pill">⭐ <span id="score-val">0</span></div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="main-stage">
              <!-- Central Character -->
              <div class="character-display">
                <div class="main-char" id="main-char">🧍</div>
                <div class="speech-bubble" id="speech-bubble">Touch my nose!</div>
              </div>
              
              <!-- Body Part Buttons -->
              <div class="parts-grid" id="parts-grid"></div>
            </div>
            
            <!-- Bottom Bar -->
            <div class="bottom-bar">
               <div class="sentence-box">
                <span id="instruction-text" class="sentence-text">Listen carefully!</span>
              </div>
              <button class="action-btn speaker-btn" id="hear-btn">🔊</button>
            </div>

          </div>
        </div>
        
        <!-- Celebration Overlay -->
        <div class="celebration" id="celebration">
            <span class="celeb-emoji" id="celeb-emoji">🌟</span>
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
        position: relative;
        width: 100%;
        height: 600px;
        overflow: hidden;
        border-radius: 24px;
        background: #f0f3f5;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka One', cursive, sans-serif;
      }
      
      .room-bg { position: absolute; inset: 0; pointer-events: none; }
      .pattern-wall {
        position: absolute; top: 0; left: 0; right: 0; height: 70%;
        background-color: #ffeaa7;
        background-image: radial-gradient(#fdcb6e 15%, transparent 16%);
        background-size: 20px 20px;
        opacity: 0.3;
      }
      .floor {
        position: absolute; bottom: 0; left: 0; right: 0; height: 30%;
        background: #fab1a0;
        border-top: 4px solid #e17055;
      }
      .plant { position: absolute; bottom: 50px; left: 20px; font-size: 60px; transform: rotate(10deg); }
      .toy { position: absolute; bottom: 30px; right: 40px; font-size: 50px; transform: rotate(-10deg); }

      /* Tablet Frame (Standardized) */
      .tablet-frame {
        position: relative;
        width: 640px;
        height: 500px;
        background: white;
        border-radius: 40px;
        padding: 12px;
        box-shadow: 0 20px 50px rgba(0,0,0,0.2);
        z-index: 10;
      }
      
      .tablet-screen {
        width: 100%;
        height: 100%;
        background: #e3f2fd;
        border-radius: 30px;
        border: 4px solid #b3e5fc;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      
      .screen-header {
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 20px;
        background: white;
        border-bottom: 2px solid #eee;
      }
      
      .title-text { 
        font-size: 26px; 
        font-weight: 900; 
        color: #0984e3;
      }
      
      .icon-btn {
        width: 44px; height: 44px;
        border-radius: 50%; background: #f1f2f6; border: none; font-size: 20px; cursor: pointer;
      }
      
      .score-pill {
        background: #fab1a0; padding: 6px 14px; border-radius: 20px; font-weight: bold; color: white;
      }
      
      /* Main Content */
      .main-stage {
        flex: 1;
        display: flex;
        justify-content: space-between;
        padding: 20px 30px;
        align-items: center;
      }
      
      .character-display {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
      }
      
      .main-char {
        font-size: 140px;
        animation: breathe 3s ease-in-out infinite;
      }
      @keyframes breathe { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.03); } }
      
      .speech-bubble {
        background: white;
        padding: 10px 20px;
        border-radius: 20px;
        position: absolute;
        top: -10px;
        right: 10px;
        font-size: 14px;
        font-weight: bold;
        box-shadow: 0 4px 10px rgba(0,0,0,0.1);
        animation: float 2s ease-in-out infinite;
      }
      .speech-bubble::after {
        content: ''; position: absolute; bottom: -8px; left: 20px;
        border-width: 8px 8px 0; border-style: solid; border-color: white transparent;
      }
      
      .parts-grid {
        flex: 1.2;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        max-width: 320px;
      }
      
      .part-btn {
        aspect-ratio: 1;
        background: white;
        border: 3px solid #dfe6e9;
        border-radius: 16px;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transition: transform 0.1s;
        box-shadow: 0 4px 0 rgba(0,0,0,0.1);
      }
      .part-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,0.1); }
      .part-btn:hover { border-color: #74b9ff; }
      
      .part-emoji { font-size: 32px; margin-bottom: 2px; }
      .part-label { font-size: 11px; color: #636e72; font-weight: bold; text-transform: uppercase; }
      
      .part-btn.correct { background: #55efc4; border-color: #00b894; color: white; }
      .part-btn.wrong { background: #ff7675; border-color: #d63031; animation: shake 0.4s; }
      
      @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }

      .bottom-bar {
        height: 70px;
        background: white;
        border-top: 2px solid #eee;
        display: flex;
        align-items: center;
        padding: 0 20px;
        gap: 15px;
      }
      
      .sentence-box { flex: 1; text-align: center; }
      .sentence-text { font-size: 18px; font-weight: bold; color: #2d3436; }
      
      .speaker-btn {
        width: 50px; height: 50px; border-radius: 50%;
        background: #0984e3; color: white; border: none; font-size: 24px; cursor: pointer;
      }
      .speaker-btn:active { transform: scale(0.95); }
      
      .celebration {
        position: absolute; inset: 0; background: rgba(255,255,255,0.8);
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity 0.3s;
        z-index: 100; border-radius: 24px;
      }
      .celebration.visible { opacity: 1; }
      .celeb-emoji { font-size: 100px; animation: bounce 1s infinite; }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.score = 0;
    this.nextRound();

    document.getElementById('hear-btn').onclick = () => this.speakPrompt();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) {
      this.end();
      return;
    }

    this.rounds++;

    const shuffled = [...BODY_PARTS].sort(() => Math.random() - 0.5);
    this.currentPart = shuffled[0];

    // Show 6 options (correct + 5 random)
    const others = [...BODY_PARTS].filter(p => p !== this.currentPart).sort(() => Math.random() - 0.5).slice(0, 5);
    this.options = [this.currentPart, ...others].sort(() => Math.random() - 0.5);

    this.renderRound();

    setTimeout(() => this.speakPrompt(), 600);
  }

  renderRound() {
    document.getElementById('instruction-text').textContent = `Touch your ${this.currentPart.label}!`;
    document.getElementById('speech-bubble').textContent = `Use your ${this.currentPart.label}!`;
    document.getElementById('main-char').textContent = '🧍';

    const grid = document.getElementById('parts-grid');
    grid.innerHTML = this.options.map(part => `
      <button class="part-btn" data-part="${part.name}">
        <span class="part-emoji">${part.emoji}</span>
        <span class="part-label">${part.label}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.part-btn').forEach(btn => {
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.part);
    });
  }

  speakPrompt() {
    this.speak(`Touch your ${this.currentPart.name}`);
  }

  checkAnswer(btn, partName) {
    if (partName === this.currentPart.name) {
      // Correct
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      btn.classList.add('correct');
      document.getElementById('main-char').textContent = '🤗';

      this.confetti.explode(null, null, 30);
      setTimeout(() => this.nextRound(), 1200);
    } else {
      // Wrong
      btn.classList.add('wrong');
      this.speak("Try again");
    }
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new BodyPartsGame(container, config);
}
