/* assets/js/games/8-10/verb-viper.js
   Verb Viper - Ages 8-10
   
   Snake game. Eat the Verbs, avoid the Nouns/Adjectives!
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const WORD_POOL = [
    { text: "Run", type: "verb" },
    { text: "Jump", type: "verb" },
    { text: "Sleep", type: "verb" },
    { text: "Eat", type: "verb" },
    { text: "Dance", type: "verb" },
    { text: "Sing", type: "verb" },
    { text: "Play", type: "verb" },
    { text: "Read", type: "verb" },
    { text: "Swim", type: "verb" },
    { text: "Fly", type: "verb" },
    { text: "Write", type: "verb" },
    { text: "Draw", type: "verb" },
    { text: "Climb", type: "verb" },
    { text: "Think", type: "verb" },
    { text: "Build", type: "verb" },

    { text: "Table", type: "noun" },
    { text: "Cat", type: "noun" },
    { text: "Apple", type: "noun" },
    { text: "House", type: "noun" },
    { text: "Book", type: "noun" },
    { text: "River", type: "noun" },
    { text: "Cloud", type: "noun" },
    { text: "Mountain", type: "noun" },

    { text: "Blue", type: "adj" },
    { text: "Happy", type: "adj" },
    { text: "Slow", type: "adj" },
    { text: "Big", type: "adj" },
    { text: "Bright", type: "adj" },
    { text: "Quiet", type: "adj" },
    { text: "Soft", type: "adj" },
];

class VerbViperGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.snake = [];
        this.direction = { x: 1, y: 0 }; // Moving right
        this.nextDirection = { x: 1, y: 0 };
        this.food = null;
        this.gridSize = 20; // 20x20 grid
        this.tileSize = 25; // px
        this.tickSpeed = 200; // ms
        this.gameLoopId = null;
        this.score = 0;
        this.isGameOver = false;
    }

    async init() {
        this.container.innerHTML = `
            <div class="game-wrapper viper-theme">
                <div class="jungle-bg"></div>
                
                <div class="game-content">
                    <div class="header">
                        <div class="score-display">Verbs Eaten: <span id="score-val">0</span></div>
                        <div class="instruction">Eat only VERBS!</div>
                        <div class="dpad">
                            <button id="btn-up">⬆️</button>
                            <div class="h-btns">
                                <button id="btn-left">⬅️</button>
                                <button id="btn-right">➡️</button>
                            </div>
                            <button id="btn-down">⬇️</button>
                        </div>
                    </div>

                    <div class="game-board" id="game-board"></div>
                </div>

                <div class="start-overlay" id="start-overlay">
                    <button class="start-btn" id="start-btn">START</button>
                </div>
            </div>
        `;

        this.injectStyles();
        document.getElementById('start-btn').onclick = () => this.startGame();

        // Touch controls
        document.getElementById('btn-up').onclick = () => this.changeDirection(0, -1);
        document.getElementById('btn-down').onclick = () => this.changeDirection(0, 1);
        document.getElementById('btn-left').onclick = () => this.changeDirection(-1, 0);
        document.getElementById('btn-right').onclick = () => this.changeDirection(1, 0);

        // Keyboard controls
        window.addEventListener('keydown', this.handleKey.bind(this));
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-wrapper {
                width: 100%; height: 600px;
                background: #00b894;
                position: relative; overflow: hidden;
                border-radius: 20px;
                font-family: 'Courier New', monospace;
            }
            .jungle-bg {
                position: absolute; inset: 0;
                background-image: 
                    radial-gradient(#55efc4 10%, transparent 11%),
                    radial-gradient(#55efc4 10%, transparent 11%);
                background-size: 60px 60px;
                background-position: 0 0, 30px 30px;
                opacity: 0.3;
            }
            
            .game-content {
                position: relative; z-index: 10;
                height: 100%; display: flex; flex-direction: column; align-items: center;
                padding: 10px;
            }
            
            .header {
                width: 100%; display: flex; justify-content: space-between; align-items: center;
                margin-bottom: 10px;
            }
            .score-display {
                background: white; padding: 5px 15px; border-radius: 10px;
                font-weight: bold; color: #00b894;
            }
            .instruction {
                font-weight: bold; color: white; background: #d63031; padding: 5px 10px; border-radius: 5px;
            }
            
            .game-board {
                width: 500px; height: 400px;
                background: rgba(0,0,0,0.2);
                border: 4px solid #006266;
                position: relative;
            }
            
            .cell {
                position: absolute; width: 25px; height: 25px;
                display: flex; align-items: center; justify-content: center;
                font-size: 20px;
            }
            .snake-body {
                background: #f1c40f; border-radius: 4px;
                border: 1px solid #f39c12;
            }
            .snake-head {
                background: #e67e22; border-radius: 4px; z-index: 2;
                border: 1px solid #d35400;
            }
            
            .food-item {
                width: auto; height: auto;
                background: white; padding: 2px 5px; border-radius: 5px;
                font-size: 14px; font-weight: bold; white-space: nowrap;
                transform: translate(-50%, -50%);
                z-index: 5;
            }
            .food-item.verb { color: #00b894; border: 2px solid #00b894; }
            .food-item.noun { color: #0984e3; border: 2px solid #0984e3; }
            .food-item.adj { color: #e17055; border: 2px solid #e17055; }
            
            .start-overlay {
                position: absolute; inset: 0; background: rgba(0,0,0,0.7);
                display: flex; align-items: center; justify-content: center; z-index: 50;
            }
            .start-btn {
                font-size: 30px; padding: 20px 40px; background: #00cec9; border: none;
                border-radius: 10px; color: white; font-weight: bold; cursor: pointer;
            }

            .dpad {
                display: flex; flex-direction: column; align-items: center; gap: 5px;
            }
            .h-btns { display: flex; gap: 20px; }
            .dpad button {
                width: 40px; height: 40px; border-radius: 50%; border: none; font-size: 20px;
                background: white; cursor: pointer;
            }
        `;
        this.container.appendChild(style);
    }

    handleKey(e) {
        switch (e.key) {
            case 'ArrowUp': this.changeDirection(0, -1); break;
            case 'ArrowDown': this.changeDirection(0, 1); break;
            case 'ArrowLeft': this.changeDirection(-1, 0); break;
            case 'ArrowRight': this.changeDirection(1, 0); break;
        }
    }

    changeDirection(x, y) {
        // Prevent 180 turn
        if (this.direction.x + x === 0 && this.direction.y + y === 0) return;
        this.nextDirection = { x, y };
    }

    startGame() {
        document.getElementById('start-overlay').style.display = 'none';
        this.isGameOver = false;
        this.score = 0;
        document.getElementById('score-val').textContent = '0';

        // Init snake
        this.snake = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 }
        ];
        this.direction = { x: 1, y: 0 };
        this.nextDirection = { x: 1, y: 0 };

        this.spawnFood();
        this.loop();
    }

    spawnFood() {
        // Random pos inside grid (20x16)
        // Board is 500x400. tile is 25.
        // cols = 20, rows = 16
        const cols = 20;
        const rows = 16;

        let valid = false;
        let pos = { x: 0, y: 0 };

        while (!valid) {
            pos.x = Math.floor(Math.random() * cols);
            pos.y = Math.floor(Math.random() * rows);

            // checks collision with snake
            valid = !this.snake.some(s => s.x === pos.x && s.y === pos.y);
        }

        const wordData = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)];
        this.food = { ...pos, ...wordData };
        this.render();
    }

    loop() {
        if (this.isGameOver) return;

        setTimeout(() => {
            this.update();
            this.render();
            requestAnimationFrame(() => this.loop());
        }, this.tickSpeed);
    }

    update() {
        this.direction = this.nextDirection;
        const head = { x: this.snake[0].x + this.direction.x, y: this.snake[0].y + this.direction.y };

        // Walls check (wrap or die? Let's die for challenge)
        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 16) {
            this.gameOver();
            return;
        }

        // Self check
        if (this.snake.some(s => s.x === head.x && s.y === head.y)) {
            this.gameOver();
            return;
        }

        this.snake.unshift(head);

        // Food check
        if (this.food && head.x === this.food.x && head.y === this.food.y) {
            if (this.food.type === 'verb') {
                // Good!
                this.score++;
                document.getElementById('score-val').textContent = this.score;
                this.playSound('eat');
                this.celebrateMove({ burst: this.food.text.toUpperCase(), duration: 700 });
                this.spawnFood();
                // Don't pop tail = grow
            } else {
                // Bad!
                this.playSound('error');
                this.coachMove();
                this.gameOver();
            }
        } else {
            this.snake.pop(); // Move
        }
    }

    render() {
        const board = document.getElementById('game-board');
        board.innerHTML = '';

        // Render Snake
        this.snake.forEach((seg, i) => {
            const el = document.createElement('div');
            el.className = i === 0 ? 'cell snake-head' : 'cell snake-body';
            el.style.left = (seg.x * this.tileSize) + 'px';
            el.style.top = (seg.y * this.tileSize) + 'px';
            board.appendChild(el);
        });

        // Render Food
        if (this.food) {
            const el = document.createElement('div');
            el.className = `cell food-item ${this.food.type}`;
            // Adjust position for bigger box centered
            el.style.left = (this.food.x * this.tileSize + 12.5) + 'px';
            el.style.top = (this.food.y * this.tileSize + 12.5) + 'px';
            el.textContent = this.food.text;
            board.appendChild(el);
        }
    }

    gameOver() {
        this.isGameOver = true;
        this.playSound('gameover');
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new VerbViperGame(container, config);
}
