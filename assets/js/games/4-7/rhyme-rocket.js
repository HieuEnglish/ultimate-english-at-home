/* assets/js/games/4-7/rhyme-rocket.js
   Rhyme Rocket - Ages 4-7
   
   Help the rocket blast off by finding rhyming words!
   Visuals: Space launch pad, animated rocket, dark sky.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const RHYME_SETS = [
    { target: "Cat", options: ["Hat", "Dog", "Fish"], correct: "Hat", emoji: "🐱" },
    { target: "Bear", options: ["Chair", "Ball", "Sun"], correct: "Chair", emoji: "🐻" },
    { target: "House", options: ["Mouse", "Tree", "Car"], correct: "Mouse", emoji: "🏠" },
    { target: "Star", options: ["Car", "Book", "Pig"], correct: "Car", emoji: "⭐" },
    { target: "Fox", options: ["Box", "Pen", "Bed"], correct: "Box", emoji: "🦊" },
    { target: "Cake", options: ["Snake", "Cup", "Hat"], correct: "Snake", emoji: "🍰" },
    { target: "Tree", options: ["Bee", "Dog", "Top"], correct: "Bee", emoji: "🌳" },
    { target: "Moon", options: ["Spoon", "Cat", "Run"], correct: "Spoon", emoji: "🌙" },
    { target: "Fish", options: ["Dish", "Bear", "One"], correct: "Dish", emoji: "🐟" },
    { target: "Frog", options: ["Dog", "Log", "Cat"], correct: "Log", emoji: "🐸" },
];

class RhymeRocketGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentRound = 0;
        this.score = 0;
        this.fuelLevel = 0;
        this.maxFuel = 5; // Launch after 5 correct
    }

    async init() {
        this.container.innerHTML = `
      <div class="game-wrapper space-theme">
        <!-- Background -->
        <div class="stars-bg"></div>
        <div class="planet"></div>
        
        <!-- Game Area -->
        <div class="launch-pad">
          <div class="rocket-container">
            <div class="rocket" id="rocket">🚀</div>
            <div class="exhaust" id="exhaust"></div>
          </div>
          <div class="fuel-tank">
             <div class="fuel-liquid" id="fuel-liquid"></div>
             <div class="fuel-markers">
               <span>100%</span>
               <span>50%</span>
               <span>0%</span>
             </div>
          </div>
        </div>

        <div class="control-panel">
           <div class="monitor-screen">
              <div class="target-display">
                <div class="target-emoji" id="target-emoji">❓</div>
                <div class="target-text" id="target-text">...</div>
              </div>
              <div class="prompt-text">What rhymes with this?</div>
           </div>
           
           <div class="options-grid" id="options-grid"></div>
        </div>
        
        <div class="celebration-overlay" id="launch-overlay">
           <div class="launch-msg">BLAST OFF! 🚀</div>
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
        width: 100%; height: 600px;
        background: radial-gradient(circle at center, #2c3e50 0%, #000000 100%);
        border-radius: 20px;
        position: relative; overflow: hidden;
        color: white;
        font-family: 'Fredoka One', cursive, sans-serif;
        display: flex; flex-direction: column;
      }
      
      .stars-bg {
        position: absolute; inset: 0;
        background-image: 
            radial-gradient(white 1px, transparent 1px),
            radial-gradient(white 1px, transparent 1px);
        background-size: 50px 50px;
        background-position: 0 0, 25px 25px;
        opacity: 0.5;
        z-index: 0;
      }
      
      .planet {
        position: absolute; top: -50px; right: -50px;
        width: 150px; height: 150px;
        background: #e67e22; border-radius: 50%;
        box-shadow: inset -20px -20px 40px rgba(0,0,0,0.5);
        opacity: 0.8;
      }

      /* Launch Pad Area */
      .launch-pad {
        flex: 1;
        display: flex; justify-content: center; align-items: flex-end;
        position: relative; z-index: 2;
        padding-bottom: 20px;
      }
      
      .rocket-container {
        position: relative;
        width: 100px; height: 150px;
        display: flex; justify-content: center;
        transition: transform 2s ease-in;
      }
      .rocket { font-size: 100px; filter: drop-shadow(0 0 10px rgba(255,255,255,0.3)); z-index: 2; }
      
      .exhaust {
        position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%);
        width: 20px; height: 0;
        background: linear-gradient(to bottom, #f1c40f, #e74c3c);
        border-radius: 10px;
        opacity: 0.8;
        transition: height 0.3s;
      }
      .exhaust.active { height: 100px; animation: flicker 0.1s infinite; }
      @keyframes flicker { 0% { opacity: 0.8; transform: translateX(-50%) scale(1); } 50% { opacity: 1; transform: translateX(-50%) scale(1.1); } 100% { opacity: 0.8; transform: translateX(-50%) scale(1); } }
      
      /* Fuel Tank */
      .fuel-tank {
        position: absolute; left: 20px; bottom: 20px;
        width: 40px; height: 200px;
        border: 3px solid #bdc3c7;
        border-radius: 20px;
        background: rgba(0,0,0,0.5);
        overflow: hidden;
      }
      .fuel-liquid {
        position: absolute; bottom: 0; left: 0; right: 0;
        height: 0%;
        background: linear-gradient(to top, #27ae60, #2ecc71);
        transition: height 0.5s ease-out;
      }
      .fuel-markers {
        position: absolute; right: 2px; top: 0; bottom: 0;
        display: flex; flex-direction: column; justify-content: space-between;
        font-size: 10px; color: rgba(255,255,255,0.5);
        padding: 5px 0;
      }

      /* Controls */
      .control-panel {
        background: #34495e;
        padding: 20px;
        border-top: 4px solid #7f8c8d;
        z-index: 10;
        display: flex; align-items: center; gap: 20px;
      }
      
      .monitor-screen {
        background: #ecf0f1;
        border-radius: 12px;
        padding: 10px 20px;
        color: #2c3e50;
        min-width: 150px;
        text-align: center;
        border: 4px solid #95a5a6;
      }
      .target-emoji { font-size: 40px; }
      .target-text { font-size: 24px; font-weight: bold; color: #e74c3c; }
      .prompt-text { font-size: 14px; color: #7f8c8d; margin-top: 5px; }

      .options-grid {
        flex: 1;
        display: flex; gap: 15px; justify-content: center;
      }
      
      .option-btn {
        background: #2980b9;
        color: white;
        border: none;
        padding: 15px 30px;
        border-radius: 12px;
        font-size: 20px;
        font-family: inherit;
        cursor: pointer;
        box-shadow: 0 5px 0 #1c5980;
        transition: transform 0.1s;
      }
      .option-btn:hover { background: #3498db; }
      .option-btn:active { transform: translateY(5px); box-shadow: 0 0 0; }
      
      .option-btn.correct { background: #27ae60; box-shadow: 0 5px 0 #1e8449; }
      .option-btn.wrong { background: #c0392b; box-shadow: 0 5px 0 #922b21; opacity: 0.6; }

      /* Launch Overlay */
      .celebration-overlay {
        position: absolute; inset: 0;
        background: rgba(0,0,0,0.8);
        display: flex; align-items: center; justify-content: center;
        z-index: 100;
        opacity: 0; pointer-events: none;
        transition: opacity 0.5s;
      }
      .celebration-overlay.active { opacity: 1; pointer-events: all; }
      .launch-msg {
        font-size: 60px; color: #f1c40f; text-shadow: 0 0 20px #e67e22;
        animation: scaleUp 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      @keyframes scaleUp { from { transform: scale(0); } to { transform: scale(1); } }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.score = 0;
        this.fuelLevel = 0;
        this.updateFuel();
        this.nextRound();
    }

    nextRound() {
        if (this.fuelLevel >= this.maxFuel) {
            this.launchSequence();
            return;
        }

        // Pick random set
        this.currentSet = RHYME_SETS[Math.floor(Math.random() * RHYME_SETS.length)];

        // Render
        document.getElementById('target-emoji').textContent = this.currentSet.emoji;
        document.getElementById('target-text').textContent = this.currentSet.target;

        const optionsEl = document.getElementById('options-grid');
        const shuffledOptions = [...this.currentSet.options].sort(() => Math.random() - 0.5);

        optionsEl.innerHTML = shuffledOptions.map(opt => `
            <button class="option-btn" data-word="${opt}">${opt}</button>
        `).join('');

        optionsEl.querySelectorAll('.option-btn').forEach(btn => {
            btn.onclick = () => this.checkAnswer(btn, btn.dataset.word);
        });
    }

    checkAnswer(btn, word) {
        if (word === this.currentSet.correct) {
            // Correct
            btn.classList.add('correct');
            this.playSound('success');

            // Add Fuel
            this.fuelLevel++;
            this.updateFuel();

            // Confetti
            this.confetti.explode(btn, null, 10);

            setTimeout(() => this.nextRound(), 1000);
        } else {
            // Wrong
            btn.classList.add('wrong');
            this.speak("Try again");
        }
    }

    updateFuel() {
        const pct = (this.fuelLevel / this.maxFuel) * 100;
        document.getElementById('fuel-liquid').style.height = `${pct}%`;

        // Mini engine spurts as fuel adds
        if (this.fuelLevel > 0) {
            const exhaust = document.getElementById('exhaust');
            exhaust.style.height = '30px';
            setTimeout(() => { exhaust.style.height = '0'; }, 300);
        }
    }

    launchSequence() {
        // Big launch
        document.getElementById('exhaust').classList.add('active');
        this.playSound('launch'); // Mock sound call

        // Shake screen
        this.container.style.animation = "shake 0.5s infinite";

        // Fly up
        setTimeout(() => {
            document.getElementById('rocket').style.transform = "translateY(-600px)";
        }, 1000);

        // Show overlay
        setTimeout(() => {
            this.container.style.animation = "";
            document.getElementById('launch-overlay').classList.add('active');
            this.saveScore(500); // Max score + bonus
        }, 2000);

        // New game after delay
        setTimeout(() => {
            // Reset? Or just end? Let's show final score screen
            this.showResults(true);
        }, 3500);
    }

    // Simple helper if not in engine
    playSound(type) {
        // Placeholder for sound
    }
}

export function createGame(container, config) {
    return new RhymeRocketGame(container, config);
}
