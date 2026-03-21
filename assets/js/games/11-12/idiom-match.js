/* assets/js/games/11-12/idiom-match.js
   Idiom Alchemist (was Idiom Match) - Ages 11-12
   
   Mix ingredients (Idiom + Meaning) in a cauldron.
   Theme: Magic/Alchemy Lab.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const RECIPES = [
  { idiom: "Break a leg", meaning: "Good luck", color: "#e74c3c" },
  { idiom: "Piece of cake", meaning: "Very easy", color: "#f1c40f" },
  { idiom: "Spill the beans", meaning: "Tell a secret", color: "#9b59b6" },
  { idiom: "Cold feet", meaning: "Nervous", color: "#3498db" },
  { idiom: "Cost an arm and leg", meaning: "Expensive", color: "#2ecc71" },
  { idiom: "Under the weather", meaning: "Sick", color: "#e67e22" },
  { idiom: "Hit the nail on the head", meaning: "Exactly right", color: "#1abc9c" },
  { idiom: "Let the cat out of the bag", meaning: "Reveal a secret", color: "#d35400" },
  { idiom: "Once in a blue moon", meaning: "Very rarely", color: "#2980b9" },
  { idiom: "Bite the bullet", meaning: "Face something tough", color: "#8e44ad" },
  { idiom: "On cloud nine", meaning: "Extremely happy", color: "#27ae60" },
  { idiom: "A blessing in disguise", meaning: "Good from bad", color: "#c0392b" },
];

class IdiomAlchemistGame extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.recipes = [];
    this.heldItem = null;
    this.score = 0;
  }

  async init() {
    this.container.innerHTML = `
      <div class="game-wrapper alchemy-theme">
        <div class="shelf-area">
           <div class="shelf-label">IDIOM EXTRACTS</div>
           <div class="ingredients" id="idioms-shelf"></div>
        </div>
        
        <div class="lab-bench">
           <div class="cauldron-area">
              <div class="cauldron" id="cauldron">
                 <div class="potion" id="potion"></div>
                 <div class="bubbles">
                    <div class="bubble"></div><div class="bubble"></div><div class="bubble"></div>
                 </div>
              </div>
              <div class="flame">🔥</div>
           </div>
        </div>

        <div class="shelf-area">
           <div class="shelf-label">MEANING POWDERS</div>
           <div class="ingredients" id="meanings-shelf"></div>
        </div>
        
        <div class="msg-scroll" id="status-msg">Drag items to the cauldron to mix!</div>
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
        background: #2c3e50;
        border-radius: 12px;
        display: flex; flex-direction: column; justify-content: space-between;
        padding: 20px;
        font-family: 'Cinzel', serif;
        color: #ecf0f1;
        user-select: none;
      }
      
      .shelf-area {
        background: rgba(0,0,0,0.3);
        padding: 10px; border-radius: 8px; border-bottom: 4px solid #8e44ad;
      }
      .shelf-label { text-align: center; font-size: 14px; margin-bottom: 10px; color: #dcdde1; }
      
      .ingredients {
        display: flex; flex-wrap: wrap; justify-content: center; gap: 10px;
      }
      
      .bottle {
        width: 100px; height: 40px;
        border: 2px solid rgba(255,255,255,0.2);
        background: #34495e;
        display: flex; align-items: center; justify-content: center;
        border-radius: 4px;
        font-size: 12px; text-align: center;
        cursor: pointer;
        transition: transform 0.2s;
        box-shadow: 0 4px 0 rgba(0,0,0,0.5);
      }
      .bottle:hover { transform: translateY(-2px); border-color: white; }
      .bottle.selected { border-color: #f1c40f; box-shadow: 0 0 10px #f1c40f; }
      .bottle.used { opacity: 0; pointer-events: none; }
      
      .lab-bench {
        flex: 1; display: flex; justify-content: center; align-items: center;
      }
      
      .cauldron-area { position: relative; width: 150px; height: 150px; }
      
      .cauldron {
        width: 100%; height: 100%;
        background: #2d3436;
        border-radius: 0 0 50% 50%;
        border: 4px solid #636e72;
        border-top: none;
        position: relative;
        overflow: hidden;
      }
      /* Rim */
      .cauldron::before {
        content: ''; position: absolute; top: 0; left: -10px; right: -10px; height: 20px;
        border: 4px solid #636e72; border-radius: 50%;
        background: #2d3436; z-index: 2;
      }
      
      .potion {
        position: absolute; bottom: 0; left: 0; right: 0;
        height: 80%; background: #2ecc71;
        opacity: 0.8;
        transition: background 0.5s;
      }
      
      .bubbles .bubble {
        position: absolute; background: white; border-radius: 50%; width: 10px; height: 10px;
        bottom: 20px; left: 50%; opacity: 0.6;
        animation: floatBubble 2s infinite;
      }
      .bubbles .bubble:nth-child(2) { left: 40%; animation-delay: 0.5s; }
      .bubbles .bubble:nth-child(3) { left: 60%; animation-delay: 1s; }
      
      @keyframes floatBubble {
        0% { transform: translateY(0); opacity: 0.6; }
        100% { transform: translateY(-100px); opacity: 0; }
      }
      
      .flame { text-align: center; font-size: 40px; margin-top: 10px; animation: flicker 0.2s infinite alternate; }
      @keyframes flicker { from { opacity: 0.8; transform: scale(1); } to { opacity: 1; transform: scale(1.1); } }
      
      .msg-scroll {
        text-align: center; font-size: 18px; color: #f1c40f; 
        text-shadow: 0 0 5px black;
      }
    `;
    this.container.appendChild(style);
  }

  start() {
    super.start();
    // Load ingredients
    this.renderIngredients();
    this.cauldronContents = [];
  }

  renderIngredients() {
    const idiomShelf = document.getElementById('idioms-shelf');
    const meaningShelf = document.getElementById('meanings-shelf');

    let idioms = [...RECIPES];
    let meanings = [...RECIPES].sort(() => Math.random() - 0.5);

    idiomShelf.innerHTML = idioms.map(r => `
            <div class="bottle type-idiom" data-id="${r.idiom}" data-type="idiom">${r.idiom}</div>
        `).join('');

    meaningShelf.innerHTML = meanings.map(r => `
            <div class="bottle type-meaning" data-id="${r.idiom}" data-type="meaning">${r.meaning}</div>
        `).join('');

    this.container.querySelectorAll('.bottle').forEach(b => {
      b.onclick = () => this.addToCauldron(b);
    });
  }

  addToCauldron(el) {
    if (this.cauldronContents.length >= 2) return; // Full

    el.classList.add('used');
    this.cauldronContents.push({
      id: el.dataset.id,
      type: el.dataset.type,
      element: el
    });

    // Visual feedback
    const potion = document.getElementById('potion');
    potion.style.height = this.cauldronContents.length === 1 ? "50%" : "90%";

    if (this.cauldronContents.length === 2) {
      this.mixPotion();
    }
  }

  mixPotion() {
    const [item1, item2] = this.cauldronContents;
    const cauldron = document.getElementById('cauldron');

    setTimeout(() => {
      if (item1.id === item2.id && item1.type !== item2.type) {
        // Success
        this.score += 100;
        document.getElementById('status-msg').textContent = "Gold Created! ✨";
        document.getElementById('potion').style.background = "gold";
        this.confetti.explode(cauldron, null, 20);
        this.celebrateMove({ burst: 'GOLD', duration: 700 });

        // Clear after delay
        setTimeout(() => this.resetCauldron(true), 1500);
      } else {
        // Fail
        document.getElementById('status-msg').textContent = "EXPLOSION! 💥";
        document.getElementById('potion').style.background = "#444";
        Animations.shake(cauldron);
        this.coachMove();

        // Return items
        setTimeout(() => this.resetCauldron(false), 1500);
      }
    }, 500);
  }

  resetCauldron(success) {
    const potion = document.getElementById('potion');
    potion.style.height = "20%"; // low
    potion.style.background = "#2ecc71"; // default green
    document.getElementById('status-msg').textContent = "Mix more ingredients...";

    if (!success) {
      // Restore buttons
      this.cauldronContents.forEach(item => {
        item.element.classList.remove('used');
      });
    }

    this.cauldronContents = [];

    // Check game over
    const remaining = document.querySelectorAll('.bottle:not(.used)').length;
    if (remaining === 0) {
      this.showResults(true);
    }
  }
}

export function createGame(container, config) {
  return new IdiomAlchemistGame(container, config);
}
