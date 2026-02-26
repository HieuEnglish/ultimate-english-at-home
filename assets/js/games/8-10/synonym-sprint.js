/* assets/js/games/8-10/synonym-sprint.js
   Synonym Sprint - Ages 8-10
   
   Endless runner style game. Character runs, hurdles appear with a word.
   Tap the correct synonym to jump over the hurdle!
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const SYNONYM_DATA = [
  { word: "Happy", synonyms: ["Joyful", "Glad", "Cheerful"], antonyms: ["Sad", "Angry", "Bored"] },
  { word: "Big", synonyms: ["Huge", "Large", "Giant"], antonyms: ["Small", "Tiny", "Little"] },
  { word: "Fast", synonyms: ["Quick", "Rapid", "Swift"], antonyms: ["Slow", "Lazy", "Late"] },
  { word: "Smart", synonyms: ["Clever", "Wise", "Bright"], antonyms: ["Dumb", "Silly", "Dull"] },
  { word: "Beautiful", synonyms: ["Pretty", "Lovely", "Stunning"], antonyms: ["Ugly", "Gross", "Plain"] },
  { word: "Difficult", synonyms: ["Hard", "Tough", "Tricky"], antonyms: ["Easy", "Simple", "Light"] },
  { word: "Start", synonyms: ["Begin", "Launch", "Open"], antonyms: ["End", "Stop", "Finish"] },
  { word: "Scared", synonyms: ["Afraid", "Frightened", "Terrified"], antonyms: ["Brave", "Calm", "Bold"] },
  { word: "Strong", synonyms: ["Powerful", "Mighty", "Tough"], antonyms: ["Weak", "Frail", "Soft"] },
  { word: "Angry", synonyms: ["Furious", "Mad", "Upset"], antonyms: ["Calm", "Happy", "Peaceful"] },
  { word: "Cold", synonyms: ["Chilly", "Freezing", "Icy"], antonyms: ["Hot", "Warm", "Burning"] },
  { word: "Old", synonyms: ["Ancient", "Aged", "Elderly"], antonyms: ["Young", "New", "Fresh"] },
  { word: "Loud", synonyms: ["Noisy", "Booming", "Roaring"], antonyms: ["Quiet", "Silent", "Soft"] },
  { word: "Rich", synonyms: ["Wealthy", "Affluent", "Loaded"], antonyms: ["Poor", "Broke", "Needy"] },
  { word: "Brave", synonyms: ["Courageous", "Bold", "Fearless"], antonyms: ["Scared", "Timid", "Cowardly"] },
];

class SynonymSprintGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 90 });
    this.distance = 0;
    this.speed = 1;
    this.score = 0;
    this.isRunningGame = false;
    this.hurdleAnimId = null;
    this.hurdleStartTime = null;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper sprint-theme">
        <div class="sky-layer">
            <div class="cloud c1">☁️</div>
            <div class="cloud c2">☁️</div>
        </div>
        <div class="ground-layer"></div>
        
        <div class="runner-character" id="runner">🏃</div>
        
        <div class="hurdle-container" id="hurdle-container">
           <!-- Hurdle visual -->
           <div class="hurdle" id="hurdle">
              <div class="hurdle-sign" id="hurdle-word">Word</div>
              <div class="hurdle-wood">🚧</div>
           </div>
        </div>

        <div class="ui-overlay">
           <div class="score-board">Distance: <span id="dist-val">0</span>m</div>
           <div class="options-dock" id="options-dock">
              <!-- Buttons go here -->
           </div>
        </div>
        
        <div class="start-overlay" id="start-overlay">
           <button class="start-btn" id="start-run-btn">START RUNNING</button>
        </div>
      </div>
    `;

    this.injectStyles();
    document.getElementById('start-run-btn').onclick = () => this.startRun();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .game-wrapper {
        width: 100%; height: 500px;
        background: #81ecec;
        border-radius: 20px;
        position: relative; overflow: hidden;
        font-family: 'Verdana', sans-serif;
        user-select: none;
      }
      
      .sky-layer { position: absolute; top: 0; bottom: 100px; width: 100%; }
      .cloud { position: absolute; font-size: 50px; opacity: 0.8; animation: moveCloud linear infinite; }
      .c1 { top: 20px; animation-duration: 20s; }
      .c2 { top: 60px; animation-duration: 25s; animation-delay: -10s; }
      @keyframes moveCloud { from { left: 100%; } to { left: -100px; } }
      
      .ground-layer {
        position: absolute; bottom: 0; height: 100px; width: 100%;
        background: #00b894;
        border-top: 10px solid #55efc4;
      }
      
      .runner-character {
        position: absolute; bottom: 80px; left: 50px;
        font-size: 80px;
        z-index: 10;
        transition: bottom 0.3s ease-out;
        transform: scaleX(-1); /* Face right */
      }
      .runner-character.jump { bottom: 250px; }
      
      .hurdle-container {
        position: absolute; bottom: 80px; right: -150px;
        width: 100px; height: 150px;
        display: flex; align-items: flex-end; justify-content: center;
        /* Animation handled by JS for smoothness */
      }
      
      .hurdle {
        display: flex; flex-direction: column; align-items: center;
      }
      .hurdle-wood { font-size: 60px; }
      .hurdle-sign {
        background: #d63031; color: white;
        padding: 5px 10px; border-radius: 4px; border: 2px solid white;
        font-weight: bold; font-size: 18px; margin-bottom: -10px; z-index: 2;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      }
      
      .ui-overlay {
        position: absolute; inset: 0; pointer-events: none;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 20px;
      }
      .score-board {
        font-size: 24px; font-weight: bold; color: #2d3436; 
        background: rgba(255,255,255,0.8); padding: 5px 15px; border-radius: 20px;
        align-self: flex-start;
      }
      
      .options-dock {
        pointer-events: auto;
        display: flex; gap: 20px; justify-content: center; margin-bottom: 20px;
      }
      
      .sprint-btn {
        background: white; border: 4px solid #0984e3;
        color: #0984e3; font-weight: bold; font-size: 18px;
        padding: 15px 30px; border-radius: 30px;
        cursor: pointer; box-shadow: 0 5px 0 #74b9ff;
        transition: transform 0.1s;
      }
      .sprint-btn:active { transform: translateY(4px); box-shadow: none; }
      .sprint-btn:hover { background: #e3f2fd; }
      
      /* Start Overlay */
      .start-overlay {
        position: absolute; inset: 0; background: rgba(0,0,0,0.6);
        display: flex; align-items: center; justify-content: center; z-index: 50;
      }
      .start-btn {
        font-size: 30px; padding: 20px 40px; background: #fdcb6e; border: none;
        border-radius: 10px; font-weight: 900; color: #d35400; cursor: pointer;
        box-shadow: 0 10px 0 #e67e22;
      }
      .start-btn:active { transform: translateY(5px); box-shadow: 0 5px 0 #e67e22; }
    `;
    this.container.appendChild(style);
  }

  startRun() {
    document.getElementById('start-overlay').style.display = 'none';
    super.start();
    this.isRunningGame = true;
    this.distance = 0;
    this.gameLoop();
    this.spawnHurdle();
  }

  gameLoop() {
    if (!this.isRunningGame) return;

    this.distance += 0.1;
    document.getElementById('dist-val').textContent = Math.floor(this.distance);

    requestAnimationFrame(() => this.gameLoop());
  }

  spawnHurdle() {
    if (!this.isRunningGame) return;

    const hurdleCont = document.getElementById('hurdle-container');
    // Reset position to right (offscreen)
    hurdleCont.style.right = '-20%';

    // Pick word
    const data = SYNONYM_DATA[Math.floor(Math.random() * SYNONYM_DATA.length)];
    this.currentData = data;

    document.getElementById('hurdle-word').textContent = data.word;

    // Prepare options
    const correct = data.synonyms[0];
    const wrong = data.antonyms[0];

    const opts = [correct, wrong].sort(() => Math.random() - 0.5);
    const dock = document.getElementById('options-dock');

    dock.innerHTML = opts.map(word => `
           <button class="sprint-btn" data-word="${word}">${word}</button>
        `).join('');

    dock.querySelectorAll('.sprint-btn').forEach(btn => {
      btn.onclick = () => this.jump(btn, btn.dataset.word === correct);
    });

    // Use requestAnimationFrame for smoothness
    this.hurdleStartTime = null;
    this.animateHurdle();
  }

  animateHurdle() {
    if (!this.isRunningGame) return;

    const hurdleCont = document.getElementById('hurdle-container');
    if (!this.hurdleStartTime) this.hurdleStartTime = performance.now();

    // Speed increases with distance/score basically
    const duration = Math.max(2000, 3500 - (this.score * 0.5));
    const progress = (performance.now() - this.hurdleStartTime) / duration;

    if (progress < 1) {
      // Move from right (-20%) to left (120%)
      const currentPos = -20 + (progress * 140);
      hurdleCont.style.right = currentPos + '%';

      // Checking collision
      // Visual collision happens when right is approx 75% to 85%
      // (Since left align is at 50px, which is small %, so right side is huge %)
      if (progress > 0.75 && progress < 0.82) {
        const runner = document.getElementById('runner');
        if (!runner.classList.contains('jump')) {
          this.hitObstacle();
          return;
        }
      }

      this.hurdleAnimId = requestAnimationFrame(() => this.animateHurdle());
    } else {
      // Done, respawn
      this.spawnHurdle();
    }
  }

  jump(btn, isCorrect) {
    if (!isCorrect) {
      btn.style.backgroundColor = '#ff7675';
      btn.style.borderColor = '#d63031';
      return; // Don't jump
    }

    // Jump!
    const runner = document.getElementById('runner');
    runner.classList.add('jump');

    this.addScore(100);
    this.confetti.explode(btn, null, 10);

    setTimeout(() => {
      runner.classList.remove('jump');
      // We don't need to manually spawn next hurdle, the animation loop handles it
    }, 600);
  }

  hitObstacle() {
    this.isRunningGame = false;
    cancelAnimationFrame(this.hurdleAnimId);

    // Crash animation
    const runner = document.getElementById('runner');
    runner.textContent = '💥';
    this.speak("Oh no!");

    setTimeout(() => {
      this.end(); // GameBase end
      this.showResults(this.saveScore());
    }, 1500);
  }
}

export function createGame(container, config) {
  return new SynonymSprintGame(container, config);
}
