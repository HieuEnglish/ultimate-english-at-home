/* assets/js/games/13-18/paragraph-puzzle.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

const PARAGRAPH_CHALLENGES = [
    {
        title: "The Impact of Urban Green Spaces",
        sentences: [
            { text: "Green spaces in urban environments offer significant benefits to residents' well-being.", role: "Topic Sentence", order: 0 },
            { text: "For instance, studies have shown that access to parks can reduce stress and improve mental health.", role: "Evidence", order: 1 },
            { text: "Moreover, these areas act as critical habitats for local biodiversity.", role: "Supporting Detail", order: 2 },
            { text: "Ultimately, urban planning must prioritize the integration of nature to create sustainable cities.", role: "Conclusion", order: 3 }
        ]
    },
    {
        title: "The Role of Technology in Modern Education",
        sentences: [
            { text: "Technology has fundamentally transformed the way students learn and engage with educational content.", role: "Topic Sentence", order: 0 },
            { text: "Digital platforms enable personalized learning experiences that adapt to each student's pace.", role: "Evidence", order: 1 },
            { text: "However, excessive screen time can lead to decreased attention spans and social isolation.", role: "Counterpoint", order: 2 },
            { text: "Therefore, a balanced approach that combines technology with traditional teaching methods is essential.", role: "Conclusion", order: 3 }
        ]
    },
    {
        title: "Climate Change and Individual Responsibility",
        sentences: [
            { text: "While corporations produce the majority of greenhouse gas emissions, individuals also play a critical role.", role: "Topic Sentence", order: 0 },
            { text: "Simple actions like reducing meat consumption and using public transport can collectively make a significant impact.", role: "Evidence", order: 1 },
            { text: "Additionally, consumer choices drive corporate behavior, meaning individual action can influence industry standards.", role: "Supporting Detail", order: 2 },
            { text: "In conclusion, systemic change requires both institutional reform and personal commitment from each citizen.", role: "Conclusion", order: 3 }
        ]
    }
];

class ParagraphPuzzle extends GameBase {
    async init() {
        await this.init3D();
        this.currentQ = 0;
        this.score = 0;

        this.setupUI();
    }

    setupUI() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #121212; color: #00ff88; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; overflow: hidden; border: 10px solid #1a1a1a;">
                <!-- Blueprint Header -->
                <div style="background: #1a1a1a; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #00ff88;">
                    <div style="font-size: 24px; font-weight: 800; letter-spacing: 2px;">IDENT: PARAGRAPH_PUZZLE</div>
                    <div style="display: flex; gap: 40px; font-family: monospace; font-weight: bold;">
                        <div>UNIT: <span id="q-num">1</span>/1</div>
                        <div>INTEGRITY: <span id="score">0</span></div>
                    </div>
                </div>

                <!-- Puzzle Area -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; position: relative;">
                    
                    <div id="blueprint-title" style="margin-bottom: 30px; font-family: monospace; font-size: 14px; opacity: 0.6; text-transform: uppercase;">PROJECT: LOADING...</div>

                    <!-- Scrambled List -->
                    <div id="puzzle-list" style="display: flex; flex-direction: column; gap: 10px; width: 100%; max-width: 800px;">
                        <!-- Sentences injected here -->
                    </div>

                    <button id="verify-btn" style="margin-top: 40px; padding: 15px 50px; background: transparent; border: 2px solid #00ff88; color: #00ff88; font-family: monospace; font-weight: bold; cursor: pointer; text-transform: uppercase; transition: all 0.2s;">Run Integrity Check</button>

                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.95); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #00ff88; padding: 40px;">
                    <div style="font-size: 100px; margin-bottom: 20px;">🏗️</div>
                    <h1 style="font-size: 50px; margin: 0; font-weight: 900;">PARAGRAPH PUZZLE</h1>
                    <p style="font-size: 20px; max-width: 500px; margin: 20px 0 40px 0; color: #008c4a;">Structure is the key to clarity. Drag and drop these sentences into their correct logical order to complete the blueprint.</p>
                    <button id="start-btn" style="padding: 18px 60px; border: 2px solid #00ff88; background: #00ff88; color: #121212; font-size: 22px; font-weight: bold; cursor: pointer; text-transform: uppercase;">Access Interface</button>
                </div>
            </div>
            <style>
                .sentence-node {
                    padding: 20px; background: rgba(0,255,136,0.05); border: 1px solid #00ff88; color: #fff; cursor: move; display: flex; align-items: center; gap: 15px; border-radius: 4px; transition: background 0.2s;
                    user-select: none;
                }
                .sentence-node:hover { background: rgba(0,255,136,0.1); }
                .sentence-node.dragging { opacity: 0.5; background: #00ff88 !important; color: #000; }
                .sentence-node span { font-family: monospace; font-size: 12px; color: #00ff88; background: rgba(0,0,0,0.3); padding: 4px 8px; border-radius: 2px; }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => {
            this.container.querySelector('#start-overlay').style.display = 'none';
            this.start();
        };
    }

    start() {
        super.start();
        this.loadChallenge();
    }

    loadChallenge() {
        const q = PARAGRAPH_CHALLENGES[this.currentQ];
        this.container.querySelector('#blueprint-title').textContent = `PROJECT: ${q.title}`;

        const list = this.container.querySelector('#puzzle-list');
        list.innerHTML = '';

        // Scramble sentences
        const scrambled = [...q.sentences].sort(() => Math.random() - 0.5);

        scrambled.forEach((s, i) => {
            const node = document.createElement('div');
            node.className = 'sentence-node';
            node.draggable = true;
            node.dataset.originalOrder = s.order;
            node.innerHTML = `<span>NODE_${i + 1}</span> ${s.text}`;

            node.addEventListener('dragstart', () => node.classList.add('dragging'));
            node.addEventListener('dragend', () => node.classList.remove('dragging'));

            list.appendChild(node);
        });

        list.addEventListener('dragover', e => {
            e.preventDefault();
            const dragging = list.querySelector('.dragging');
            const afterElement = this.getDragAfterElement(list, e.clientY);
            if (afterElement == null) {
                list.appendChild(dragging);
            } else {
                list.insertBefore(dragging, afterElement);
            }
        });

        this.container.querySelector('#verify-btn').onclick = () => this.verifyOrder();
    }

    getDragAfterElement(container, y) {
        const draggableElements = [...container.querySelectorAll('.sentence-node:not(.dragging)')];
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

    verifyOrder() {
        const nodes = [...this.container.querySelectorAll('.sentence-node')];
        let correctCount = 0;

        nodes.forEach((node, idx) => {
            if (parseInt(node.dataset.originalOrder) === idx) {
                node.style.borderColor = '#00ff88';
                correctCount++;
            } else {
                node.style.borderColor = '#ff4444';
            }
        });

        if (correctCount === nodes.length) {
            this.score += 500;
            this.container.querySelector('#score').textContent = this.score;
            this.speak("System integrity verified. Paragraph structure complete.");
            this.celebrateMove({ burst: 'VERIFIED', duration: 800 });
            setTimeout(() => this.end(), 2000);
        } else {
            this.speak("Logic error detected in sequence. Adjust nodes.");
            this.coachMove();
        }
    }

    end() {
        super.end();
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #121212; color: #00ff88; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; font-family: 'Inter', sans-serif; border: 10px solid #1a1a1a;">
                <h1 style="font-size: 60px; font-weight: 900;">BLUEPRINT FINALIZED</h1>
                <p style="font-size: 32px; margin-top: -20px;">Logic Integrity: ${this.score}</p>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; border: 2px solid #00ff88; background: #00ff88; color: #121212; font-size: 18px; font-weight: bold; cursor: pointer;">REINITIALIZE</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; border: 2px solid white; background: transparent; color: white; font-size: 18px; font-weight: bold; cursor: pointer;">EXIT SYSTEM</button>
                </div>
            </div>
        `;
    }
}

export function createGame(container, config) {
    return new ParagraphPuzzle(container, config);
}
