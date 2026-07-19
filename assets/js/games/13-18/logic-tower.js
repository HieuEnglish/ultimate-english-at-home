/* assets/js/games/13-18/logic-tower.js
   Logic Tower - Ages 13-18
   
   Stack arguments in the correct logical order to build the tower using Drag and Drop.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const LOGIC_PUZZLES = [
    {
        topic: "Deductive Reasoning",
        steps: [
            "All squares are rectangles.",
            "This shape is a square.",
            "Therefore, this shape is a rectangle."
        ]
    }, // 3 steps
    {
        topic: "Scientific Method",
        steps: [
            "Formulate a hypothesis based on observation.",
            "Design and perform an experiment.",
            "Analyze the data collectec.",
            "Draw a conclusion to accept or reject hypothesis."
        ]
    }, // 4 steps
    {
        topic: "Essay Structure",
        steps: [
            "Introduction: Hook and thesis statement.",
            "Body Paragraph 1: First supporting argument.",
            "Body Paragraph 2: Second supporting argument.",
            "Conclusion: Restate thesis and summarize."
        ]
    },
    {
        topic: "Cause and Effect",
        steps: [
            "Heavy rains fell for three days.",
            " The river levels rose rapidly.",
            " The dam could not hold the water.",
            " The town below was flooded."
        ]
    },
    {
        topic: "Conflict Resolution",
        steps: [
            "Identify the source of the conflict.",
            "Listen to both sides of the story.",
            "Find common ground between parties.",
            "Propose a compromise solution.",
            "Agree on a plan of action."
        ]
    }, // 5 steps
    {
        topic: "Baking a Cake",
        steps: [
            "Preheat the oven and grease the pan.",
            "Mix dry and wet ingredients in a bowl.",
            "Pour the batter into the pan.",
            "Bake for 30 minutes until golden.",
            "Let cool and frost the cake."
        ]
    }
];

class LogicTowerGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, hasTimer: true, timerDuration: 180 });
        this.currentPuzzle = null;
        this.shuffledSteps = [];
        this.rounds = 0;
        this.towersBuilt = 0;
    }

    async init() {
        this.container.innerHTML = `
      <div class="tower-game">
        <div class="tower-bg"></div>
        <div class="game-content">
          <div class="tower-header">
            <div class="tower-title">🏯 Logic Tower</div>
            <div class="tower-subtitle" id="puzzle-topic">Topic: ...</div>
          </div>
          
          <div class="play-area">
             <!-- The Building Site (Drop Zone) -->
             <div class="building-site" id="building-site">
                <div class="foundation">BASE</div>
                <div class="tower-slots" id="tower-slots"></div>
                <div class="roof-cap"></div>
             </div>

             <!-- The Supply Yard (Source) -->
             <div class="supply-yard" id="supply-yard"></div>
          </div>

          <div class="tower-controls">
            <button class="btn-check" id="check-btn">🏗️ Build Tower</button>
          </div>
        </div>
        <div class="feedback-toast" id="feedback"></div>
      </div>
    `;
        this.injectStyles();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
      .tower-game {
        position: relative;
        min-height: 600px;
        background: linear-gradient(to bottom, #87CEEB 0%, #E0F7FA 100%);
        border-radius: 20px;
        overflow: hidden;
        font-family: 'Segoe UI', sans-serif;
      }
      .tower-bg {
        position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
        background: #81C784; /* grass */
        z-index: 0;
      }
      .game-content { position: relative; z-index: 1; padding: 20px; }
      
      .tower-header { text-align: center; margin-bottom: 20px; color: #2c3e50; }
      .tower-title { font-size: 28px; font-weight: 900; letter-spacing: 1px; }
      .tower-subtitle { font-size: 16px; font-weight: 600; color: #57606f; background: rgba(255,255,255,0.6); display: inline-block; padding: 5px 15px; border-radius: 15px; margin-top: 5px; }

      .play-area {
        display: flex;
        gap: 20px;
        justify-content: center;
        align-items: flex-end;
        min-height: 400px;
      }

      /* Building Site */
      .building-site {
        width: 320px;
        display: flex;
        flex-direction: column-reverse; /* Build up! */
        align-items: center;
      }
      .foundation {
         width: 340px; height: 30px; background: #5D4037; border-radius: 4px;
         color: #D7CCC8; text-align: center; font-weight: bold; line-height: 30px;
         font-size: 12px;
      }
      .roof-cap {
        width: 0; height: 0; 
        border-left: 160px solid transparent;
        border-right: 160px solid transparent;
        border-bottom: 60px solid #C0392B;
        margin-bottom: -1px;
        opacity: 0.2; /* Ghostly until finished */
        transition: opacity 0.5s;
      }
      .roof-cap.complete { opacity: 1; }
      
      .tower-slots {
        display: flex;
        flex-direction: column-reverse; /* Slot 0 at bottom visually */
        width: 300px;
        min-height: 200px;
        background: rgba(255,255,255,0.2);
        border: 2px dashed rgba(0,0,0,0.1);
        border-radius: 8px 8px 0 0;
        padding-bottom: 2px;
      }

      /* Blocks */
      .block {
        background: #ecf0f1;
        border: 2px solid #95a5a6;
        border-bottom: 4px solid #7f8c8d;
        color: #2c3e50;
        padding: 15px;
        margin: 2px 0;
        border-radius: 6px;
        cursor: grab;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        user-select: none;
        transition: transform 0.2s, background 0.2s;
        position: relative;
      }
      .block:hover { transform: scale(1.02); z-index: 10; }
      .block:active { cursor: grabbing; }
      
      .block.dragging { opacity: 0.5; transform: scale(0.95); }
      
      .block.correct { background: #a8e6cf; border-color: #1abc9c; color: #16a085; }
      .block.wrong { background: #ffcdd2; border-color: #e57373; }

      /* Supply Yard */
      .supply-yard {
        width: 320px;
        min-height: 300px;
        background: rgba(255,255,255,0.5);
        border-radius: 12px;
        padding: 15px;
        border: 2px solid #fff;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }

      .tower-controls { text-align: center; margin-top: 20px; }
      .btn-check {
        background: #e67e22; color: white; border: none; padding: 12px 30px;
        font-size: 18px; font-weight: bold; border-radius: 30px;
        box-shadow: 0 5px 0 #d35400; cursor: pointer; transition: all 0.2s;
      }
      .btn-check:hover { transform: translateY(-3px); box-shadow: 0 8px 0 #d35400; }
      .btn-check:active { transform: translateY(2px); box-shadow: 0 2px 0 #d35400; }

      .feedback-toast {
        position: absolute; top: 20px; left: 50%; transform: translateX(-50%);
        background: rgba(0,0,0,0.8); color: white; padding: 10px 20px; border-radius: 20px;
        opacity: 0; pointer-events: none; transition: opacity 0.3s;
        font-weight: bold;
      }
      .feedback-toast.visible { opacity: 1; }
    `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.towersBuilt = 0;
        this.nextTower();

        document.getElementById('check-btn').onclick = () => this.checkTower();
    }

    nextTower() {
        if (this.rounds >= 5) {
            this.end();
            return;
        }

        this.rounds++;
        this.resetUI();

        // Pick random puzzle
        this.currentPuzzle = this.pickFromBag(LOGIC_PUZZLES, 'puzzles');
        document.getElementById('puzzle-topic').textContent = `Topic: ${this.currentPuzzle.topic}`;

        // Create steps and shuffle
        this.shuffledSteps = [...this.currentPuzzle.steps]
            .map((text, index) => ({ text, originalIndex: index }))
            .sort(() => Math.random() - 0.5);

        // Render to supply yard
        const supplyYard = document.getElementById('supply-yard');
        const towerSlots = document.getElementById('tower-slots');
        supplyYard.innerHTML = '';
        towerSlots.innerHTML = '';

        this.shuffledSteps.forEach((step, i) => {
            const block = this.createBlock(step.text, step.originalIndex);
            supplyYard.appendChild(block);
        });

        this.setupDragDrop();
    }

    createBlock(text, index) {
        const el = document.createElement('div');
        el.className = 'block';
        el.draggable = true;
        el.textContent = text;
        el.dataset.originalIndex = index;
        return el;
    }

    setupDragDrop() {
        const draggables = document.querySelectorAll('.block');
        const containers = [
            document.getElementById('supply-yard'),
            document.getElementById('tower-slots')
        ];

        draggables.forEach(draggable => {
            draggable.addEventListener('dragstart', () => {
                draggable.classList.add('dragging');
            });

            draggable.addEventListener('dragend', () => {
                draggable.classList.remove('dragging');
            });
        });

        containers.forEach(container => {
            container.addEventListener('dragover', e => {
                e.preventDefault();
                const afterElement = this.getDragAfterElement(container, e.clientY);
                const draggable = document.querySelector('.dragging');
                if (afterElement == null) {
                    container.appendChild(draggable);
                } else {
                    container.insertBefore(draggable, afterElement);
                }
            });
        });
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.block:not(.dragging)')];

        return draggableElements.reduce((closest, child) => {
            const box = child.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;
            if (offset < 0 && offset > closest.offset) {
                return { offset: offset, element: child };
            } else {
                return closest;
            }
        }, { offset: Number.NEGATIVE_INFINITY }).element;
    }

    resetUI() {
        document.querySelector('.roof-cap').classList.remove('complete');
    }

    checkTower() {
        const towerSlots = document.getElementById('tower-slots');
        const blocks = Array.from(towerSlots.children);

        // Check if all blocks are used
        if (blocks.length !== this.currentPuzzle.steps.length) {
            this.showFeedback("Use all the blocks!");
            return;
        }

        // The tower slots are flex-direction column-reverse visually, 
        // BUT the DOM order is top-to-bottom in the container.
        // Wait, flex-direction: column-reverse means the last child is at the top? No, last child is at bottom?
        // column-reverse: Main-start is at the bottom. First child is at bottom.
        // So the DOM order [0, 1, 2] renders:
        // 2 (Top)
        // 1
        // 0 (Bottom)
        //
        // Our logic steps depend on reading order.
        // Usually towers are built bottom-up (Base -> 1 -> 2 -> 3).
        // If the puzzle says "First, X", that should be at the bottom (Base).
        // So Step 0 should be first child (Bottom).

        let correct = true;
        blocks.forEach((block, domIndex) => {
            const originalIndex = parseInt(block.dataset.originalIndex);

            // We want DOM index 0 to be Step 0 (Foundation)
            // unless we want Top-Down logic? 
            // Usually step 1 is the base.
            if (originalIndex !== domIndex) {
                correct = false;
                block.classList.add('wrong');
            } else {
                block.classList.add('correct');
            }
        });

        if (correct) {
            this.towersBuilt++;
            this.addScore(200);
            document.querySelector('.roof-cap').classList.add('complete');
            this.showFeedback("Tower Stable! 🎉");
            this.confetti.explode(null, null, 30);
            this.celebrateMove({ burst: 'STABLE', duration: 800 });

            setTimeout(() => this.nextTower(), 2000);
        } else {
            this.showFeedback("Unstable! Structure incorrect.");
            this.resetCombo();
            this.coachMove();
            setTimeout(() => {
                blocks.forEach(b => b.classList.remove('wrong', 'correct'));
            }, 1500);
        }
    }

    showFeedback(msg) {
        const el = document.getElementById('feedback');
        el.textContent = msg;
        el.classList.add('visible');
        setTimeout(() => el.classList.remove('visible'), 2000);
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new LogicTowerGame(container, config);
}
