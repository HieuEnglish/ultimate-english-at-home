/* assets/js/games/0-3/color-match.js
   Color Match - Ages 0-3
   
   MODERN TABLET LAYOUT VERSION
   Tablet frame style with central color display and options below.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const COLORS = [
  { name: "red", hex: "#ff6b6b", emoji: "🔴" },
  { name: "blue", hex: "#74b9ff", emoji: "🔵" },
  { name: "green", hex: "#55efc4", emoji: "🟢" },
  { name: "yellow", hex: "#ffeaa7", emoji: "🟡" },
  { name: "purple", hex: "#a29bfe", emoji: "🟣" },
  { name: "orange", hex: "#fdcb6e", emoji: "🟠" },
  { name: "pink", hex: "#fd79a8", emoji: "💗" },
  { name: "brown", hex: "#b97a57", emoji: "🟤" },
  { name: "black", hex: "#2d3436", emoji: "⚫" },
  { name: "white", hex: "#dfe6e9", emoji: "⚪" },
  { name: "gray", hex: "#b2bec3", emoji: "🩶" },
  { name: "cyan", hex: "#00cec9", emoji: "💎" },
];

class ColorMatchGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentColor = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.correctAnswers = 0;
  }

  async init() {
    await this.init3D(); // Initialize Three.js

    this.container.innerHTML = `
      <div class="game-wrapper">
        <!-- Magic Background -->
        <div class="magic-bg">
          <div class="sparkles-bg"></div>
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
                <span class="title-text">COLORS</span>
                <span class="title-icon">🎨</span>
              </div>
              <div class="header-right">
                <div class="score-pill">⭐ <span id="score-val">0</span></div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="main-stage">
              <!-- Central Character/Target -->
              <div class="target-display">
                <div class="paint-splat" id="target-splat"></div>
                <div class="character-guide" id="guide-char">🎨</div>
              </div>
              
              <!-- Color Options Row -->
              <div class="options-row" id="options-row"></div>
            </div>
            
            <!-- Bottom Bar -->
            <div class="bottom-bar">
               <div class="sentence-box">
                <span id="instruction-text" class="sentence-text">Find the RED one!</span>
              </div>
              <button class="action-btn speaker-btn" id="hear-btn">🔊</button>
            </div>

          </div>
        </div>
        
        <!-- Celebration Overlay -->
        <div class="celebration" id="celebration">
            <span class="celeb-emoji" id="celeb-emoji">🎉</span>
        </div>
      </div>
    `;

    this.injectStyles();
    this.showStartOverlay(); // Changed from this.start()
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
        background: linear-gradient(135deg, #a8edea 0%, #fed6e3 100%); /* Pastel gradient */
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka One', cursive, sans-serif;
      }
      
      .magic-bg { position: absolute; inset: 0; pointer-events: none; }
      .bubble {
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.4);
        animation: floatUp 15s linear infinite;
      }
      .b1 { width: 100px; height: 100px; left: 10%; bottom: -100px; animation-delay: 0s; }
      .b2 { width: 60px; height: 60px; left: 40%; bottom: -100px; animation-delay: -5s; }
      .b3 { width: 150px; height: 150px; left: 80%; bottom: -100px; animation-delay: -10s; }
      
      @keyframes floatUp {
        transform: translateY(-800px) rotate(360deg);
      }

      /* Tablet Frame (reused style with variations) */
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
        background: #f7f1e3; /* Warm off-white page background */
        border-radius: 30px;
        border: 4px solid #d1ccc0;
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
        font-size: 28px; 
        font-weight: 900; 
        letter-spacing: 2px;
        color: #ff6b6b;
      }
      
      .icon-btn {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: #f1f2f6;
        border: none;
        font-size: 20px;
        cursor: pointer;
      }
      
      .score-pill {
        background: #ffeaa7;
        padding: 8px 16px;
        border-radius: 20px;
        font-weight: bold;
        color: #d35400;
        display: flex;
        align-items: center;
        gap: 6px;
      }
      
      .main-stage {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
      }
      
      .target-display {
        position: relative;
        width: 180px;
        height: 180px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 30px;
      }
      
      .paint-splat {
        position: absolute;
        inset: 0;
        background: currentColor;
        mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.5C93.4,8.1,81.8,20.5,70.5,30.4C59.1,40.3,48,47.7,37.1,53.8C26.2,59.9,15.5,64.7,3.6,58.4C-8.2,52.1,-21.2,34.7,-33.5,20.8C-45.8,7,-57.4,-3.3,-60.8,-17.1C-64.2,-30.9,-59.4,-48.1,-48.5,-56.3C-37.6,-64.5,-20.6,-63.7,-5.7,-53.8C9.2,-43.9,28.7,-25,44.7,-76.4Z' transform='translate(100 100)' /%3E%3C/svg%3E");
        -webkit-mask-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M44.7,-76.4C58.9,-69.2,71.8,-59.1,81.6,-46.6C91.4,-34.1,98.2,-19.2,95.8,-5.5C93.4,8.1,81.8,20.5,70.5,30.4C59.1,40.3,48,47.7,37.1,53.8C26.2,59.9,15.5,64.7,3.6,58.4C-8.2,52.1,-21.2,34.7,-33.5,20.8C-45.8,7,-57.4,-3.3,-60.8,-17.1C-64.2,-30.9,-59.4,-48.1,-48.5,-56.3C-37.6,-64.5,-20.6,-63.7,-5.7,-53.8C9.2,-43.9,28.7,-25,44.7,-76.4Z' transform='translate(100 100)' /%3E%3C/svg%3E");
        mask-size: contain;
        -webkit-mask-size: contain;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        mask-position: center;
        -webkit-mask-position: center;
        transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      
      .character-guide {
        font-size: 60px;
        z-index: 2;
        animation: bounce 2s infinite;
      }
      
      .options-row {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
        justify-content: center;
      }
      
      .color-btn {
        width: 80px;
        height: 80px;
        border-radius: 20px;
        border: 4px solid white;
        box-shadow: 0 8px 15px rgba(0,0,0,0.1);
        cursor: pointer;
        transition: transform 0.2s;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 0; /* hide text if any */
      }
      .color-btn:hover { transform: scale(1.1) rotate(5deg); }
      .color-btn:active { transform: scale(0.9); }
      .color-btn.correct { border-color: #55efc4; transform: scale(1.1); }
      .color-btn.wrong { opacity: 0.5; transform: scale(0.9); }
      
      .bottom-bar {
        height: 80px;
        background: white;
        border-top: 2px solid #eee;
        display: flex;
        align-items: center;
        padding: 0 20px;
        gap: 15px;
      }
      
      .sentence-box {
        flex: 1;
        text-align: center;
      }
      .sentence-text {
        font-size: 22px;
        font-weight: bold;
        color: #2d3436;
      }
      
      .speaker-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #74b9ff;
        border: none;
        color: white;
        font-size: 24px;
        cursor: pointer;
        box-shadow: 0 4px 0 #0984e3;
      }
      .speaker-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 #0984e3; }
      
      .celebration {
        position: absolute;
        inset: 0;
        background: rgba(255,255,255,0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.3s;
        z-index: 100;
        border-radius: 24px;
      }
      .celebration.visible { opacity: 1; pointer-events: auto; }
      .celeb-emoji { font-size: 100px; animation: spin 1s infinite; }
      
      @keyframes spin { 0% { transform: rotate(0deg) scale(1); } 50% { transform: rotate(180deg) scale(1.2); } 100% { transform: rotate(360deg) scale(1); } }
      @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    this.rounds = 0;
    this.score = 0;

    // Add floating 3D spheres
    const geometry = new THREE.SphereGeometry(0.5, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      shininess: 100,
      transparent: true,
      opacity: 0.8
    });
    this.threeHelper.addFloatingObject(geometry, material, 8);

    this.nextRound();

    document.getElementById('hear-btn').onclick = () => this.speakColor();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) {
      this.end();
      return;
    }

    this.rounds++;

    const shuffled = [...COLORS].sort(() => Math.random() - 0.5);
    this.currentColor = shuffled[0];
    this.options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5); // 4 options

    this.renderRound();

    setTimeout(() => this.speakColor(), 500);
  }

  renderRound() {
    const splat = document.getElementById('target-splat');
    splat.style.backgroundColor = this.currentColor.hex;
    splat.style.transform = `scale(0)`;
    setTimeout(() => splat.style.transform = `scale(1) rotate(${Math.random() * 360}deg)`, 50);

    document.getElementById('instruction-text').textContent = `Find the ${this.currentColor.name.toUpperCase()} one!`;
    document.getElementById('guide-char').textContent = '🎨';

    const optionsRow = document.getElementById('options-row');
    optionsRow.innerHTML = this.options.map(color => `
      <div class="color-btn" style="background-color: ${color.hex}" data-color="${color.name}">
      </div>
    `).join('');

    optionsRow.querySelectorAll('.color-btn').forEach(btn => {
      btn.onclick = () => this.checkColor(btn, btn.dataset.color);
    });
  }

  speakColor() {
    this.speak(this.currentColor.name);
  }

  checkColor(btn, colorName) {
    if (colorName === this.currentColor.name) {
      // Correct
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      btn.classList.add('correct');
      document.getElementById('guide-char').textContent = '🤩';

      // 3D Explosion
      this.threeHelper.createExplosion(this.currentColor.hex);

      // Fallback/Dual confetti
      this.confetti.explode(null, null, 10);

      setTimeout(() => this.nextRound(), 1000);
    } else {
      // Wrong
      btn.classList.add('wrong');
      document.getElementById('guide-char').textContent = '🤔';
      this.speak("Try again");
    }
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new ColorMatchGame(container, config);
}
