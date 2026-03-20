/* assets/js/games/4-7/picture-bingo.js
   Bingo Bash (Picture Bingo) - Ages 4-7
   
   Classic Bingo. 3x3 Grid. 
   Voice says a word, player clicks the matching picture.
   Get 3 in a row/col/diag to win round.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const BINGO_ITEMS = [
    { word: "Cat", emoji: "🐱" },
    { word: "Dog", emoji: "🐕" },
    { word: "Car", emoji: "🚗" },
    { word: "Sun", emoji: "☀️" },
    { word: "Tree", emoji: "🌳" },
    { word: "Book", emoji: "📚" },
    { word: "Ball", emoji: "⚽" },
    { word: "Apple", emoji: "🍎" },
    { word: "Pizza", emoji: "🍕" },
    { word: "Fish", emoji: "🐟" },
    { word: "Hat", emoji: "🎩" },
    { word: "Bed", emoji: "🛏️" },
    { word: "Moon", emoji: "🌙" },
    { word: "Star", emoji: "⭐" },
    { word: "Frog", emoji: "🐸" },
    { word: "Duck", emoji: "🦆" },
    { word: "Bird", emoji: "🐦" },
    { word: "Cake", emoji: "🍰" },
    { word: "Cup", emoji: "🥤" },
    { word: "Bus", emoji: "🚌" },
    { word: "Bee", emoji: "🐝" },
    { word: "Egg", emoji: "🥚" },
    { word: "Fox", emoji: "🦊" },
    { word: "Bear", emoji: "🐻" },
    { word: "Pig", emoji: "🐷" },
];

class PictureBingoGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.gridSize = 3;
        this.currentCard = []; // Array of items on the card
        this.markedIndices = []; // Indices marked by user
        this.targetHistory = []; // Words called
        this.currentTarget = null;
    }

    async init() {
        this.container.innerHTML = `
      <div class="game-wrapper bingo-theme">
        <div class="bingo-header">
           <div class="bingo-ball-display">
              <div class="ball" id="current-ball">?</div>
              <div class="ball-text" id="ball-text">Listen...</div>
           </div>
           <button class="call-btn" id="replay-btn">🔊 Repeat</button>
        </div>
        
        <div class="bingo-card" id="bingo-card">
           <!-- 3x3 Grid -->
        </div>
        
        <div class="bingo-status" id="bingo-status">Mark the picture!</div>
      </div>
    `;

        this.injectStyles();
        this.start();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .game-wrapper {
        width: 100%; height: 550px;
        background: #f1c40f;
        background-image: radial-gradient(#f39c12 20%, transparent 20%);
        background-size: 20px 20px;
        border-radius: 20px;
        display: flex; flex-direction: column; align-items: center;
        padding: 20px;
        font-family: 'Fredoka One', cursive, sans-serif;
      }
      
      .bingo-header {
        display: flex; align-items: center; gap: 20px;
        margin-bottom: 20px;
      }
      
      .bingo-ball-display {
        background: white; border: 4px solid #c0392b;
        border-radius: 50%;
        width: 100px; height: 100px;
        display: flex; flex-direction: column; align-items: center; justify-content: center;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
      }
      .ball { font-size: 40px; }
      .ball-text { font-size: 14px; color: #7f8c8d; font-weight: bold; }
      
      .call-btn {
        background: #3498db; color: white; border: none;
        padding: 10px 20px; border-radius: 20px;
        font-size: 16px; font-weight: bold;
        cursor: pointer; box-shadow: 0 4px 0 #2980b9;
      }
      .call-btn:active { transform: translateY(4px); box-shadow: none; }
      
      .bingo-card {
        background: white;
        padding: 15px;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        display: grid;
        grid-template-columns: repeat(3, 100px);
        grid-template-rows: repeat(3, 100px);
        gap: 10px;
      }
      
      .bingo-cell {
        background: #ecf0f1;
        border: 2px dashed #bdc3c7;
        border-radius: 8px;
        display: flex; align-items: center; justify-content: center;
        font-size: 50px;
        cursor: pointer;
        position: relative;
        transition: transform 0.1s;
      }
      .bingo-cell:hover { transform: scale(1.05); border-color: #3498db; }
      
      .bingo-marker {
        position: absolute; inset: 0;
        background: rgba(231, 76, 60, 0.8);
        border-radius: 50%;
        margin: 10px;
        transform: scale(0);
        transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .bingo-cell.marked .bingo-marker { transform: scale(1); }
      
      .bingo-status {
        margin-top: 20px; font-size: 24px; color: #c0392b; font-weight: bold;
        background: white; padding: 5px 20px; border-radius: 20px;
      }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.generateCard();
        document.getElementById('replay-btn').onclick = () => {
            if (this.currentTarget) this.speak(this.currentTarget.word);
        };
        this.nextCall();
    }

    generateCard() {
        // Pick 9 unique items
        const shuffled = [...BINGO_ITEMS].sort(() => Math.random() - 0.5);
        this.currentCard = shuffled.slice(0, 9);
        this.markedIndices = [];
        this.targetHistory = [];

        const cardEl = document.getElementById('bingo-card');
        cardEl.innerHTML = this.currentCard.map((item, i) => `
            <div class="bingo-cell" data-index="${i}">
               ${item.emoji}
               <div class="bingo-marker"></div>
            </div>
        `).join('');

        cardEl.querySelectorAll('.bingo-cell').forEach(cell => {
            cell.onclick = () => this.handleCellClick(cell);
        });
    }

    nextCall() {
        // Filter items that are ON the card but NOT yet marked
        const availableTargets = this.currentCard.filter((item, i) => !this.markedIndices.includes(i));

        if (availableTargets.length === 0) {
            // Should verify win before this, but safe fallback
            this.end();
            return;
        }

        // Pick one
        this.currentTarget = availableTargets[Math.floor(Math.random() * availableTargets.length)];

        document.getElementById('current-ball').textContent = "🔊";
        document.getElementById('ball-text').textContent = "Listen...";
        this.speak(this.currentTarget.word);
    }

    handleCellClick(cell) {
        const index = parseInt(cell.dataset.index);
        const item = this.currentCard[index];

        if (this.markedIndices.includes(index)) return; // Already marked

        if (item.word === this.currentTarget.word) {
            // Correct
            this.markCell(index, cell);
            this.celebrateMove({ burst: item.emoji || item.word.toUpperCase() });
            this.checkWin();
        } else {
            // Wrong
            cell.style.backgroundColor = "#ffcccc";
            setTimeout(() => {
                cell.style.backgroundColor = "#ecf0f1";
            }, 400);
            this.speak("Try again!");
            this.coachMove();
        }
    }

    markCell(index, cell) {
        this.markedIndices.push(index);
        cell.classList.add('marked');
        this.playSound('pop'); // mock
    }

    checkWin() {
        // Check rows, cols, diags
        const wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
            [0, 4, 8], [2, 4, 6]           // Diags
        ];

        const hasBingo = wins.some(line => line.every(idx => this.markedIndices.includes(idx)));

        if (hasBingo) {
            this.doBingo();
        } else {
            setTimeout(() => this.nextCall(), 1000);
        }
    }

    doBingo() {
        document.getElementById('bingo-status').textContent = "BINGO!!!";
        document.getElementById('current-ball').textContent = "🎉";

        this.confetti.explode(document.getElementById('bingo-card'), null, 50);
        this.addScore(500);

        setTimeout(() => {
            this.showResults(this.saveScore());
        }, 3000);
    }
}

export function createGame(container, config) {
    return new PictureBingoGame(container, config);
}
