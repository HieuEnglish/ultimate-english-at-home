/* assets/js/games/8-10/word-search.js
   Word Search - Ages 8-10
   
   MODERN CHALKBOARD / NOTEBOOK THEME
   Classic word search loop but with a sleek new UI.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const TOPICS = {
    animals: ['DOG', 'CAT', 'BIRD', 'FISH', 'LION', 'BEAR', 'WOLF', 'TIGER'],
    food: ['APPLE', 'BREAD', 'SOUP', 'MILK', 'CAKE', 'PIZZA', 'RICE', 'EGG'],
    space: ['SUN', 'MOON', 'STAR', 'MARS', 'EARTH', 'COMET', 'ORBIT'],
};

class WordSearchGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 180 });
        this.gridSize = 9;
        this.grid = [];
        this.words = [];
        this.foundWords = [];
        this.selection = [];
        this.isSelecting = false;
        this.startCell = null;
    }

    async init() {
        this.container.innerHTML = `
      <div class="game-wrapper chalkboard-theme">
        <div class="header-bar">
          <div class="chalk-title">📝 WORD SEARCH</div>
          <div class="timer-display">⏱️ <span data-game-timer>3:00</span></div>
          <div class="score-display">✨ <span data-game-score>0</span></div>
        </div>

        <div class="chalkboard-area">
          <!-- The Letters Grid -->
          <div class="grid-frame">
            <div class="grid-container" id="grid-container"></div>
            <div class="selection-line" id="selection-line"></div>
          </div>
          
          <!-- The Word List (Notebook style) -->
          <div class="notebook-panel">
            <div class="notebook-header">WORDS TO FIND</div>
            <div class="word-list" id="word-list"></div>
          </div>
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
        background: #2d3436; /* Dark chalkboard bg */
        border-radius: 20px;
        font-family: 'Patrick Hand', cursive, sans-serif; /* Handwriting font */
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        color: white;
        position: relative;
        overflow: hidden;
      }
      
      .header-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
        border-bottom: 2px dashed rgba(255,255,255,0.2);
        padding-bottom: 10px;
      }
      
      .chalk-title { font-size: 32px; letter-spacing: 2px; text-shadow: 2px 2px 0 rgba(0,0,0,0.5); }
      .timer-display, .score-display { font-size: 24px; font-weight: bold; background: rgba(255,255,255,0.1); padding: 5px 15px; border-radius: 10px; }
      
      .chalkboard-area {
        display: flex;
        gap: 30px;
        align-items: flex-start;
      }
      
      @media (max-width: 600px) {
        .chalkboard-area { flex-direction: column; align-items: center; }
      }

      .grid-frame {
        position: relative;
        background: #363b3d;
        padding: 10px;
        border-radius: 8px;
        border: 4px solid #b2bec3;
        box-shadow: inset 0 0 20px rgba(0,0,0,0.5);
      }
      
      .grid-container {
        display: grid;
        grid-template-columns: repeat(${this.gridSize}, 40px);
        gap: 2px;
        user-select: none;
      }
      
      .grid-cell {
        width: 40px; height: 40px;
        display: flex; align-items: center; justify-content: center;
        font-size: 22px;
        text-transform: uppercase;
        cursor: pointer;
        border-radius: 4px;
        transition: background 0.2s;
        position: relative;
      }
      .grid-cell:hover { background: rgba(255,255,255,0.1); }
      .grid-cell.selected { background: rgba(255, 234, 167, 0.3); color: #ffeaa7; }
      .grid-cell.found { background: #55efc4; color: #2d3436; font-weight: bold; border-radius: 50%; box-shadow: 0 0 10px #55efc4; }

      /* Notebook Styling for Word List */
      .notebook-panel {
        flex: 1;
        min-width: 200px;
        background: #f1f2f6;
        color: #2d3436;
        padding: 20px;
        border-radius: 4px;
        border-left: 6px solid #ff7675; /* Red margin line */
        box-shadow: 5px 5px 15px rgba(0,0,0,0.2);
        transform: rotate(1deg);
        position: relative;
      }
      .notebook-panel::before {
        content: '';
        position: absolute; top: 0; bottom: 0; left: 30px;
        border-left: 1px solid #74b9ff; /* Blue notebook line */
      }
      
      .notebook-header {
        font-size: 20px; font-weight: bold; margin-bottom: 15px; text-decoration: underline; text-align: center;
      }
      
      .word-list {
        display: flex; flex-direction: column; gap: 8px; margin-left: 20px;
      }
      
      .word-item {
        font-size: 18px; letter-spacing: 1px;
        padding-bottom: 2px;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        display: flex; justify-content: space-between;
      }
      .word-item.found {
        text-decoration: line-through; color: #b2bec3;
      }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.foundWords = [];
        this.selection = [];

        // Pick random topic
        const keys = Object.keys(TOPICS);
        const topic = keys[Math.floor(Math.random() * keys.length)];
        this.words = [...TOPICS[topic]];

        this.generateGrid();
        this.renderGame();
    }

    generateGrid() {
        this.grid = Array(this.gridSize).fill(null).map(() => Array(this.gridSize).fill(''));
        this.wordPositions = [];

        // Sort words by length desc to fit long ones first
        const sortedWords = [...this.words].sort((a, b) => b.length - a.length);

        for (const word of sortedWords) {
            this.placeWord(word);
        }

        const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for (let r = 0; r < this.gridSize; r++) {
            for (let c = 0; c < this.gridSize; c++) {
                if (!this.grid[r][c]) {
                    this.grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
    }

    placeWord(word) {
        // Directions: [row, col]
        const directions = [[0, 1], [1, 0], [1, 1], [-1, 1]];

        for (let i = 0; i < 50; i++) {
            const dir = directions[Math.floor(Math.random() * directions.length)];
            const r = Math.floor(Math.random() * this.gridSize);
            const c = Math.floor(Math.random() * this.gridSize);

            if (this.canPlace(word, r, c, dir)) {
                for (let j = 0; j < word.length; j++) {
                    this.grid[r + j * dir[0]][c + j * dir[1]] = word[j];
                }
                return true;
            }
        }
        // If fail to place, we might just skip it (rare with this grid size/word count)
        return false;
    }

    canPlace(word, r, c, dir) {
        if (r + (word.length - 1) * dir[0] >= this.gridSize || r + (word.length - 1) * dir[0] < 0) return false;
        if (c + (word.length - 1) * dir[1] >= this.gridSize || c + (word.length - 1) * dir[1] < 0) return false;

        for (let j = 0; j < word.length; j++) {
            const letter = this.grid[r + j * dir[0]][c + j * dir[1]];
            if (letter !== '' && letter !== word[j]) return false;
        }
        return true;
    }

    renderGame() {
        const gridEl = document.getElementById('grid-container');
        gridEl.innerHTML = this.grid.map((row, r) =>
            row.map((letter, c) => `
                <div class="grid-cell" data-r="${r}" data-c="${c}">${letter}</div>
            `).join('')
        ).join('');

        const listEl = document.getElementById('word-list');
        listEl.innerHTML = this.words.map(w => `<div class="word-item" data-word="${w}">${w}</div>`).join('');

        // Interaction
        this.container.addEventListener('mousedown', (e) => this.handleStart(e));
        this.container.addEventListener('mousemove', (e) => this.handleMove(e));
        this.container.addEventListener('mouseup', () => this.handleEnd());
        // Touch support
        this.container.addEventListener('touchstart', (e) => this.handleStart(e));
        this.container.addEventListener('touchmove', (e) => this.handleMove(e));
        this.container.addEventListener('touchend', () => this.handleEnd());
    }

    getCellFromEvent(e) {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const el = document.elementFromPoint(clientX, clientY);
        if (el && el.classList.contains('grid-cell')) {
            return { r: parseInt(el.dataset.r), c: parseInt(el.dataset.c), el };
        }
        return null;
    }

    handleStart(e) {
        const cell = this.getCellFromEvent(e);
        if (cell) {
            this.isSelecting = true;
            this.startCell = cell;
            this.updateSelection(cell);
            e.preventDefault();
        }
    }

    handleMove(e) {
        if (!this.isSelecting) return;
        const cell = this.getCellFromEvent(e);
        if (cell) {
            this.updateSelection(cell);
        }
    }

    handleEnd() {
        if (!this.isSelecting) return;
        this.isSelecting = false;

        // Check word
        const word = this.selection.map(s => this.grid[s.r][s.c]).join('');
        const revWord = word.split('').reverse().join('');

        if (this.words.includes(word) && !this.foundWords.includes(word)) {
            this.markFound(word, this.selection);
        } else if (this.words.includes(revWord) && !this.foundWords.includes(revWord)) {
            this.markFound(revWord, this.selection);
        }

        this.clearSelection();
    }

    updateSelection(endCell) {
        // Calculate line from start to end
        // Simple bresenham or just constrained updates
        const r1 = this.startCell.r, c1 = this.startCell.c;
        const r2 = endCell.r, c2 = endCell.c;

        // Determine direction
        const dr = r2 - r1;
        const dc = c2 - c1;

        // Enforce 8-way (must be horizontal, vertical, or diagonal)
        if (dr !== 0 && dc !== 0 && Math.abs(dr) !== Math.abs(dc)) return; // Not aligned

        // Calculate steps
        const steps = Math.max(Math.abs(dr), Math.abs(dc));
        const stepR = dr === 0 ? 0 : dr / Math.abs(dr);
        const stepC = dc === 0 ? 0 : dc / Math.abs(dc);

        this.clearSelectionVisuals();
        this.selection = [];

        for (let i = 0; i <= steps; i++) {
            const r = r1 + i * stepR;
            const c = c1 + i * stepC;
            this.selection.push({ r, c });
            const cell = document.querySelector(`.grid-cell[data-r="${r}"][data-c="${c}"]`);
            if (cell) cell.classList.add('selected');
        }
    }

    clearSelectionVisuals() {
        this.container.querySelectorAll('.grid-cell.selected').forEach(el => el.classList.remove('selected'));
    }

    clearSelection() {
        this.clearSelectionVisuals();
        this.selection = [];
    }

    markFound(word, cells) {
        this.foundWords.push(word);

        cells.forEach(pos => {
            const cell = document.querySelector(`.grid-cell[data-r="${pos.r}"][data-c="${pos.c}"]`);
            if (cell) cell.classList.add('found');
        });

        const wordItem = document.querySelector(`.word-item[data-word="${word}"]`);
        if (wordItem) wordItem.classList.add('found');

        this.addScore(100);
        this.updateScoreDisplay();
        this.confetti.explode(null, null, 20);

        if (this.foundWords.length === this.words.length) {
            setTimeout(() => this.end(), 1000);
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new WordSearchGame(container, config);
}
