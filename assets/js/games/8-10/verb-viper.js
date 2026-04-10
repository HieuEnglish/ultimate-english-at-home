/* assets/js/games/8-10/verb-viper.js
   Verb Viper - Ages 8-10

   Senior pass:
   - Reworked into a dependable grid chase with clear grammar pickups
   - Better learning feedback and less brittle snake logic
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const WORD_POOL = [
  { text: 'Run', type: 'verb' }, { text: 'Jump', type: 'verb' }, { text: 'Sleep', type: 'verb' },
  { text: 'Eat', type: 'verb' }, { text: 'Dance', type: 'verb' }, { text: 'Sing', type: 'verb' },
  { text: 'Play', type: 'verb' }, { text: 'Read', type: 'verb' }, { text: 'Swim', type: 'verb' },
  { text: 'Fly', type: 'verb' }, { text: 'Write', type: 'verb' }, { text: 'Draw', type: 'verb' },
  { text: 'Climb', type: 'verb' }, { text: 'Think', type: 'verb' },
  { text: 'Table', type: 'noun' }, { text: 'Cat', type: 'noun' }, { text: 'Apple', type: 'noun' },
  { text: 'House', type: 'noun' }, { text: 'Book', type: 'noun' }, { text: 'River', type: 'noun' },
  { text: 'Blue', type: 'adj' }, { text: 'Happy', type: 'adj' }, { text: 'Slow', type: 'adj' }, { text: 'Big', type: 'adj' },
];

class VerbViperGame extends GameBase {
  constructor(container, config) {
    super(container, { ...config, hasTimer: true, timerDuration: 75 });
    this.snake = [];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.food = null;
    this.gridCols = 12;
    this.gridRows = 10;
    this.tickSpeed = 220;
    this.loopTimer = null;
    this.isGameOver = false;
  }

  async init() {
    this.container.innerHTML = `
      <div class="vv-game">
        <div class="vv-panel">
          <div class="vv-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Verb Viper</div>
              <div class="subtitle">Eat verbs. Avoid nouns and adjectives.</div>
            </div>
            <div class="pill">⏱️ <span id="timer-val">1:15</span></div>
          </div>

          <div class="helper" id="helper-text">Use arrow keys or buttons to chase the correct word.</div>
          <div class="game-board" id="game-board"></div>
          <div class="dpad">
            <button id="btn-up">⬆️</button>
            <div class="h-btns"><button id="btn-left">⬅️</button><button id="btn-right">➡️</button></div>
            <button id="btn-down">⬇️</button>
          </div>
        </div>
      </div>
    `;

    this.injectStyles();
    document.getElementById('btn-up').onclick = () => this.changeDirection(0, -1);
    document.getElementById('btn-down').onclick = () => this.changeDirection(0, 1);
    document.getElementById('btn-left').onclick = () => this.changeDirection(-1, 0);
    document.getElementById('btn-right').onclick = () => this.changeDirection(1, 0);
    this.boundKey = (e) => this.handleKey(e);
    window.addEventListener('keydown', this.boundKey);
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .vv-game{height:600px;overflow:hidden;border-radius:24px;background:linear-gradient(180deg,#00b894 0%,#006266 100%);font-family:'Fredoka One',cursive,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px}.vv-panel{width:min(760px,96%);background:rgba(255,255,255,.9);border-radius:34px;border:5px solid #fff;box-shadow:0 18px 40px rgba(0,0,0,.15);padding:22px;display:flex;flex-direction:column;gap:16px}.vv-topbar{display:flex;align-items:center;gap:12px}.pill{background:#fff0a6;color:#8d6500;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:32px;color:#006266}.subtitle{font-size:14px;color:#607d8b}.helper{background:#fff8e6;border:3px solid #ffe2a5;border-radius:20px;padding:12px 16px;text-align:center;font-size:20px;color:#465a65}
      .game-board{display:grid;grid-template-columns:repeat(12,1fr);gap:6px;background:rgba(0,0,0,.08);padding:10px;border-radius:18px}.cell{aspect-ratio:1;background:rgba(255,255,255,.65);border-radius:10px;position:relative;display:flex;align-items:center;justify-content:center}.snake-head,.snake-body,.food-chip{position:absolute;inset:4px;border-radius:10px;display:flex;align-items:center;justify-content:center}.snake-head{background:#e67e22;color:#fff;font-size:20px}.snake-body{background:#f1c40f}.food-chip{background:#fff;padding:4px 6px;inset:auto;min-width:44px;min-height:32px;font-size:12px;font-weight:800;border:3px solid}.food-chip.verb{color:#00b894;border-color:#00b894}.food-chip.noun{color:#0984e3;border-color:#0984e3}.food-chip.adj{color:#e17055;border-color:#e17055}
      .dpad{display:flex;flex-direction:column;align-items:center;gap:6px}.h-btns{display:flex;gap:18px}.dpad button{width:48px;height:48px;border:none;border-radius:50%;background:#fff;font-size:22px;cursor:pointer;box-shadow:0 4px 0 rgba(0,0,0,.08)}
    `;
    this.container.appendChild(style);
  }

  handleKey(e) {
    if (e.key === 'ArrowUp') this.changeDirection(0, -1);
    if (e.key === 'ArrowDown') this.changeDirection(0, 1);
    if (e.key === 'ArrowLeft') this.changeDirection(-1, 0);
    if (e.key === 'ArrowRight') this.changeDirection(1, 0);
  }

  start() {
    super.start();
    this.isGameOver = false;
    this.score = 0;
    document.getElementById('score-val').textContent = '0';
    this.snake = [{ x: 3, y: 5 }, { x: 2, y: 5 }, { x: 1, y: 5 }];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.spawnFood();
    this.render();
    this.scheduleTick();
  }

  scheduleTick() {
    clearTimeout(this.loopTimer);
    this.loopTimer = setTimeout(() => {
      this.update();
      if (!this.isGameOver) this.scheduleTick();
    }, this.tickSpeed);
  }

  changeDirection(x, y) {
    if (this.direction.x + x === 0 && this.direction.y + y === 0) return;
    this.nextDirection = { x, y };
  }

  spawnFood() {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * this.gridCols), y: Math.floor(Math.random() * this.gridRows) };
    } while (this.snake.some((s) => s.x === pos.x && s.y === pos.y));
    const wordData = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
    this.food = { ...pos, ...wordData };
  }

  update() {
    if (this.isGameOver) return;
    this.direction = this.nextDirection;
    const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

    if (head.x < 0 || head.x >= this.gridCols || head.y < 0 || head.y >= this.gridRows) return this.gameOver('You hit the wall.');
    if (this.snake.some((s) => s.x === head.x && s.y === head.y)) return this.gameOver('You crashed into yourself.');

    this.snake.unshift(head);

    if (this.food && head.x === this.food.x && head.y === this.food.y) {
      if (this.food.type === 'verb') {
        this.incrementCombo();
        this.addScore(120);
        document.getElementById('score-val').textContent = this.score;
        document.getElementById('helper-text').textContent = `${this.food.text} is a verb. Great catch!`;
        this.celebrateMove({ burst: this.food.text.toUpperCase(), duration: 800 });
        this.spawnFood();
      } else {
        this.resetCombo();
        return this.gameOver(`${this.food.text} is not a verb.`);
      }
    } else {
      this.snake.pop();
    }

    this.render();
  }

  render() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    for (let y = 0; y < this.gridRows; y += 1) {
      for (let x = 0; x < this.gridCols; x += 1) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        const snakeIndex = this.snake.findIndex((s) => s.x === x && s.y === y);
        if (snakeIndex === 0) cell.innerHTML = '<div class="snake-head">🐍</div>';
        else if (snakeIndex > 0) cell.innerHTML = '<div class="snake-body"></div>';
        else if (this.food && this.food.x === x && this.food.y === y) cell.innerHTML = `<div class="food-chip ${this.food.type}">${this.food.text}</div>`;
        board.appendChild(cell);
      }
    }
  }

  gameOver(message) {
    this.isGameOver = true;
    clearTimeout(this.loopTimer);
    this.coachMove(message, 1100);
    setTimeout(() => this.showResults(this.saveScore()), 900);
  }

  onTimerTick(remaining) {
    document.getElementById('timer-val').textContent = this.formatTime(remaining);
    super.onTimerTick(remaining);
  }

  cleanup() {
    super.cleanup();
    clearTimeout(this.loopTimer);
    window.removeEventListener('keydown', this.boundKey);
  }
}

export function createGame(container, config) {
  return new VerbViperGame(container, config);
}
