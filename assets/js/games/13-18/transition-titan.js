/* assets/js/games/13-18/transition-titan.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

const TRANSITION_LEVELS = [
    {
        premise: "Many people believe that artificial intelligence will lead to mass unemployment.",
        conclusion: "evidence suggests it will create new roles in sectors we haven't yet imagined.",
        options: [
            { text: "However", type: "Contrast", correct: true },
            { text: "Furthermore", type: "Addition", correct: false },
            { text: "In conclusion", type: "Summary", correct: false }
        ]
    },
    {
        premise: "The study found a direct correlation between exercise and mental health.",
        conclusion: "doctors are increasingly prescribing physical activity for stress management.",
        options: [
            { text: "Consequently", type: "Causality", correct: true },
            { text: "On the other hand", type: "Contrast", correct: false },
            { text: "Similarly", type: "Comparison", correct: false }
        ]
    },
    {
        premise: "Renewable energy costs have plummeted over the last decade.",
        conclusion: "it is now more profitable than traditional fossil fuels in many regions.",
        options: [
            { text: "Moreover", type: "Addition", correct: true },
            { text: "Alternatively", type: "Choice", correct: false },
            { text: "Nevertheless", type: "Contrast", correct: false }
        ]
    },
    {
        premise: "The company invested heavily in employee training programs.",
        conclusion: "productivity and employee satisfaction increased significantly.",
        options: [
            { text: "As a result", type: "Causality", correct: true },
            { text: "In contrast", type: "Contrast", correct: false },
            { text: "Meanwhile", type: "Time", correct: false }
        ]
    },
    {
        premise: "Some critics argue that standardized testing limits creativity in schools.",
        conclusion: "others maintain that it ensures accountability and consistent standards.",
        options: [
            { text: "On the other hand", type: "Contrast", correct: true },
            { text: "Therefore", type: "Causality", correct: false },
            { text: "In addition", type: "Addition", correct: false }
        ]
    },
    {
        premise: "The city suffered from severe air pollution for decades.",
        conclusion: "residents began planting trees and advocating for stricter emission laws.",
        options: [
            { text: "In response", type: "Reaction", correct: true },
            { text: "Similarly", type: "Comparison", correct: false },
            { text: "For instance", type: "Example", correct: false }
        ]
    }
];

class TransitionTitan extends GameBase {
    async init() {
        await this.init3D();
        this.currentLvl = 0;
        this.score = 0;
        this.shuffledLevels = this.shuffle([...TRANSITION_LEVELS]);

        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #0b0e14; color: #00f2ff; font-family: 'Courier New', monospace; display: flex; flex-direction: column; overflow: hidden; border: 4px solid #00f2ff; box-shadow: inset 0 0 20px #00f2ff;">
                <!-- Cyber Header -->
                <div style="background: rgba(0,0,0,0.8); padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #00f2ff;">
                    <div style="font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00f2ff;">[ TRANSITION_TITAN.v1 ]</div>
                    <div style="display: flex; gap: 40px; font-weight: bold;">
                        <div>BRIDGE: <span id="lvl-num">1</span>/3</div>
                        <div>STABILITY: <span id="score">0</span></div>
                    </div>
                </div>

                <!-- Simulation Area -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; position: relative;">
                    
                    <!-- Idea Blocks -->
                    <div style="display: flex; align-items: center; gap: 20px; width: 100%; max-width: 900px;">
                        <div id="premise-block" style="flex: 1; background: rgba(0,242,255,0.05); border: 2px solid #00f2ff; padding: 25px; border-radius: 8px; font-size: 20px; line-height: 1.4;">
                            ...
                        </div>
                        
                        <div style="width: 150px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                            <div style="height: 4px; width: 100%; background: #00f2ff; box-shadow: 0 0 10px #00f2ff;"></div>
                            <div id="transition-portal" style="width: 120px; height: 60px; border: 2px dashed #00f2ff; margin: 10px 0; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #ff00ff; transition: all 0.3s;">
                                [ CONNECT ]
                            </div>
                            <div style="height: 4px; width: 100%; background: #00f2ff; box-shadow: 0 0 10px #00f2ff;"></div>
                        </div>

                        <div id="conclusion-block" style="flex: 1; background: rgba(0,242,255,0.05); border: 2px solid #00f2ff; padding: 25px; border-radius: 8px; font-size: 20px; line-height: 1.4;">
                            ...
                        </div>
                    </div>

                    <!-- Options -->
                    <div id="options-container" style="margin-top: 60px; display: flex; gap: 20px;">
                        <!-- Buttons injected here -->
                    </div>

                </div>

                <!-- Footer -->
                <div style="background: rgba(0,0,0,0.8); padding: 10px; text-align: center; color: #555; font-size: 12px;">
                    ESTABLISH LOGICAL CONNECTIVITY BETWEEN DISPARATE CONCEPTUAL NODES.
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.95); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: #00f2ff; padding: 40px;">
                    <div style="font-size: 100px; margin-bottom: 20px; text-shadow: 0 0 20px #00f2ff;">🌉</div>
                    <h1 style="font-size: 50px; margin: 0; text-shadow: 0 0 10px #00f2ff;">TRANSITION TITAN</h1>
                    <p style="font-size: 20px; max-width: 500px; margin: 20px 0 40px 0; color: #008c95;">A masterpiece of writing is a master of flow. Choose the correct transitions to bridge the gap between ideas.</p>
                    <button id="start-btn" style="padding: 18px 60px; border: 4px solid #00f2ff; background: transparent; color: #00f2ff; font-size: 22px; font-weight: bold; cursor: pointer; text-transform: uppercase; box-shadow: 0 0 15px #00f2ff;">INITIALIZE LINKAGE</button>
                </div>
            </div>
            <style>
                .cyber-btn {
                    padding: 15px 30px; background: rgba(0,242,255,0.1); border: 2px solid #00f2ff; color: #00f2ff; font-family: 'Courier New', monospace; font-size: 18px; font-weight: bold; cursor: pointer; transition: all 0.2s;
                }
                .cyber-btn:hover { background: #00f2ff; color: #000; box-shadow: 0 0 20px #00f2ff; }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => {
            this.container.querySelector('#start-overlay').style.display = 'none';
            this.start();
        };
    }

    start() {
        super.start();
        this.loadLevel();
    }

    loadLevel() {
        if (this.currentLvl >= this.shuffledLevels.length) {
            this.end();
            return;
        }

        const lvl = this.shuffledLevels[this.currentLvl];
        this.container.querySelector('#lvl-num').textContent = this.currentLvl + 1;
        this.container.querySelector('#premise-block').textContent = lvl.premise;
        this.container.querySelector('#conclusion-block').textContent = lvl.conclusion;
        this.container.querySelector('#transition-portal').textContent = "[ CONNECT ]";
        this.container.querySelector('#transition-portal').style.color = "#ff00ff";

        const container = this.container.querySelector('#options-container');
        container.innerHTML = '';

        lvl.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'cyber-btn';
            btn.textContent = opt.text;
            btn.onclick = () => this.handleConnection(opt, btn);
            container.appendChild(btn);
        });
    }

    handleConnection(opt, btn) {
        const portal = this.container.querySelector('#transition-portal');
        portal.textContent = opt.text.toUpperCase();

        if (opt.correct) {
            this.score += 300;
            portal.style.color = "#00f2ff";
            portal.style.borderStyle = "solid";
            this.container.querySelector('#score').textContent = this.score;
            this.speak("Connection established. Flow optimized.");

            setTimeout(() => {
                this.currentLvl++;
                this.loadLevel();
            }, 2000);
        } else {
            portal.style.color = "#ff4444";
            this.speak("Error. Logical disconnect detected.");
            Animations.shake(portal);
        }
    }

    end() {
        super.end();
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #0b0e14; color: #00f2ff; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; font-family: 'Courier New', monospace; border: 4px solid #00f2ff;">
                <h1 style="font-size: 60px; text-shadow: 0 0 20px #00f2ff;">LINKAGE COMPLETE</h1>
                <p style="font-size: 32px; margin-top: -20px;">System Integrity: ${this.score}</p>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; border: 2px solid #00f2ff; background: transparent; color: #00f2ff; font-size: 18px; font-weight: bold; cursor: pointer;">REBOOT SESSION</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; border: 2px solid white; background: transparent; color: white; font-size: 18px; font-weight: bold; cursor: pointer;">TERMINATE</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new TransitionTitan(container, config);
}
