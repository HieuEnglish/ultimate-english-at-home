/* assets/js/games/0-3/animal-sounds.js
   Animal Sounds Match - Ages 0-3
   
   MODERN TABLET LAYOUT VERSION
   Tablet frame style.
   Theme: "The Farm" - nature inspired.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const ANIMALS = [
  { name: "dog", emoji: "🐕", sound: "woof woof" },
  { name: "cat", emoji: "🐱", sound: "meow meow" },
  { name: "cow", emoji: "🐄", sound: "moo moo" },
  { name: "pig", emoji: "🐷", sound: "oink oink" },
  { name: "duck", emoji: "🦆", sound: "quack quack" },
  { name: "sheep", emoji: "🐑", sound: "baa baa" },
  { name: "rooster", emoji: "🐓", sound: "cock-a-doodle-doo" },
];

class AnimalSoundsGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentAnimal = null;
    this.options = [];
    this.rounds = 0;
    this.maxRounds = 8;
    this.correctAnswers = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper">
        <!-- Farm Background -->
        <div class="farm-bg">
          <div class="sky"></div>
          <div class="hills-bg"></div>
          <div class="barn">🏠</div>
          <div class="sun">☀️</div>
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
                <span class="title-text">SOUNDS</span>
                <span class="title-icon">🔊</span>
              </div>
              <div class="header-right">
                <div class="score-pill">⭐ <span id="score-val">0</span></div>
              </div>
            </div>

            <!-- Main Content -->
            <div class="main-stage">
              <!-- Sound Waves / Notes Visual -->
              <div class="sound-visual">
                <div class="note n1">🎵</div>
                <div class="note n2">🎶</div>
                <div class="note n3">🎵</div>
                <div class="big-ear">👂</div>
              </div>
              
              <!-- Animal Buttons -->
              <div class="animals-grid" id="animals-grid"></div>
            </div>
            
            <!-- Bottom Bar -->
            <div class="bottom-bar">
               <div class="sentence-box">
                <span id="instruction-text" class="sentence-text">Who says that?</span>
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
        background: #81ecec;
        display: flex;
        align-items: center;
        justify-content: center;
        font-family: 'Fredoka One', cursive, sans-serif;
      }
      
      .farm-bg { position: absolute; inset: 0; pointer-events: none; }
      .sky { position: absolute; top: 0; height: 60%; width: 100%; background: #81ecec; }
      .hills-bg { 
        position: absolute; bottom: 0; height: 50%; width: 100%; 
        background: #55efc4; border-radius: 100% 100% 0 0; transform: scaleX(1.2);
      }
      .barn { position: absolute; bottom: 100px; right: 50px; font-size: 80px; }
      .sun { position: absolute; top: 30px; left: 30px; font-size: 60px; animation: spin 20s linear infinite; }
      
      @keyframes spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }

      /* Tablet Frame */
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
        background: #fdfcdc;
        border-radius: 30px;
        border: 4px solid #f1c40f;
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
      
      .title-text { font-size: 26px; font-weight: 900; color: #f39c12; }
      
      .icon-btn { width: 44px; height: 44px; border-radius: 50%; background: #fef9e7; border: none; font-size: 20px; cursor: pointer; }
      .score-pill { background: #55efc4; padding: 6px 14px; border-radius: 20px; font-weight: bold; color: #006266; }
      
      /* Main Content */
      .main-stage {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 10px;
      }
      
      .sound-visual {
        height: 120px;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
      }
      .big-ear { font-size: 60px; }
      .note { position: absolute; font-size: 30px; opacity: 0; animation: floatNote 2s infinite; }
      .n1 { animation-delay: 0s; left: 45%; }
      .n2 { animation-delay: 0.5s; left: 50%; }
      .n3 { animation-delay: 1s; left: 55%; }
      
      @keyframes floatNote {
        0% { transform: translateY(0) rotate(0); opacity: 0; }
        20% { opacity: 1; }
        100% { transform: translateY(-50px) rotate(20deg); opacity: 0; }
      }

      .animals-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        width: 100%;
        max-width: 400px;
      }
      
      .animal-btn {
        background: white;
        border: 3px solid #f1c40f;
        border-radius: 20px;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
        transition: transform 0.1s;
        box-shadow: 0 4px 0 rgba(0,0,0,0.1);
      }
      .animal-btn:active { transform: translateY(2px); box-shadow: 0 2px 0 rgba(0,0,0,0.1); }
      .animal-btn:hover { background: #fffdf0; }
      
      .animal-emoji { font-size: 40px; }
      .animal-name { font-size: 20px; font-weight: bold; color: #d35400; text-transform: uppercase; }
      
      .animal-btn.correct { background: #fab1a0; border-color: #e17055; color: white; }
      .animal-btn.wrong { opacity: 0.5; }

      .bottom-bar {
        height: 80px;
        background: white;
        border-top: 2px solid #eee;
        display: flex;
        align-items: center;
        padding: 0 20px;
        gap: 15px;
      }
      
      .sentence-box { flex: 1; text-align: center; }
      .sentence-text { font-size: 18px; font-weight: bold; color: #2d3436; font-style: italic; }
      
      .speaker-btn {
        width: 50px; height: 50px; border-radius: 50%;
        background: #fcd581; color: white; border: none; font-size: 24px; cursor: pointer;
        box-shadow: 0 4px 0 #e67e22;
      }
      .speaker-btn:active { transform: scale(0.95); }
      
      .celebration {
        position: absolute; inset: 0; background: rgba(255,255,255,0.8);
        display: flex; align-items: center; justify-content: center;
        opacity: 0; pointer-events: none; transition: opacity 0.3s;
        z-index: 100;
        border-radius: 24px;
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

    document.getElementById('hear-btn').onclick = () => this.playSound();
  }

  nextRound() {
    if (this.rounds >= this.maxRounds) {
      this.end();
      return;
    }

    this.rounds++;

    const shuffled = [...ANIMALS].sort(() => Math.random() - 0.5);
    this.currentAnimal = shuffled[0];
    // 4 options
    this.options = shuffled.slice(0, 4).sort(() => Math.random() - 0.5);

    this.renderRound();
    setTimeout(() => this.playSound(), 600);
  }

  renderRound() {
    document.getElementById('instruction-text').textContent = 'Who says that?';

    const grid = document.getElementById('animals-grid');
    grid.innerHTML = this.options.map(animal => `
      <button class="animal-btn" data-animal="${animal.name}">
        <span class="animal-emoji">${animal.emoji}</span>
        <span class="animal-name">${animal.name}</span>
      </button>
    `).join('');

    grid.querySelectorAll('.animal-btn').forEach(btn => {
      btn.onclick = () => this.checkAnswer(btn, btn.dataset.animal);
    });
  }

  playSound() {
    this.speak(this.currentAnimal.sound, { rate: 0.8 });
  }

  checkAnswer(btn, animalName) {
    if (animalName === this.currentAnimal.name) {
      // Correct
      this.addScore(100);
      document.getElementById('score-val').textContent = this.score;
      btn.classList.add('correct');
      document.getElementById('instruction-text').textContent = `Correct! It's the ${animalName}!`;

      this.confetti.explode(null, null, 30);
      setTimeout(() => this.nextRound(), 1500);
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
  return new AnimalSoundsGame(container, config);
}
