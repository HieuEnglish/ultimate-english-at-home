/* assets/js/games/13-18/thesis-thinker.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

const THESIS_CHALLENGES = [
    {
        topic: "Education",
        claim: "digital textbooks should replace paper ones",
        rationale: "because they are more cost-effective and environmentally friendly",
        feedback: "A strong, debatable thesis focusing on cost and sustainability."
    },
    {
        topic: "Environment",
        claim: "governments must ban single-use plastics",
        rationale: "to prevent irreparable damage to marine ecosystems",
        feedback: "Excellent. This statement includes a clear action and a specific reason."
    },
    {
        topic: "Technology",
        claim: "social media algorithms require strict regulation",
        rationale: "as they currently contribute to increasing social polarization",
        feedback: "A sophisticated thesis addressing a complex modern issue."
    }
];

class ThesisThinker extends GameBase {
    async init() {
        await this.init3D();
        this.currentQ = 0;
        this.score = 0;
        this.shuffledChallenges = this.shuffle([...THESIS_CHALLENGES]);

        this.setupUI();
    }

    setupUI() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #e0d7c6; color: #2c1e14; font-family: 'Times New Roman', serif; display: flex; flex-direction: column; overflow: hidden; border: 20px solid #8b4513; box-sizing: border-box;">
                <!-- Library Header -->
                <div style="background: #5d3a1a; padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; color: #fdf5e6; border-bottom: 2px solid #3d2611;">
                    <div style="font-size: 24px; font-weight: bold; letter-spacing: 1px;">🖋️ THE THESIS LIBRARY</div>
                    <div style="display: flex; gap: 30px; font-family: sans-serif;">
                        <div>ASSIGNMENT: <span id="q-num">1</span>/3</div>
                        <div>CREDITS: <span id="score">0</span></div>
                    </div>
                </div>

                <!-- Thesis Drafting Area -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; gap: 30px;">
                    
                    <div style="background: #fdf5e6; padding: 40px; border-radius: 4px; box-shadow: 5px 5px 15px rgba(0,0,0,0.1); width: 100%; max-width: 800px; border: 1px solid #d2b48c; position: relative;">
                        <div style="position: absolute; top: 10px; right: 20px; color: #d2b48c; font-size: 40px; transform: rotate(10deg); font-family: sans-serif;">A+</div>
                        
                        <div style="font-size: 14px; font-weight: bold; color: #8b4513; margin-bottom: 20px; text-transform: uppercase;">Draft Statement:</div>
                        
                        <div id="thesis-draft" style="font-size: 28px; line-height: 1.6; border-bottom: 2px dashed #d2b48c; padding-bottom: 10px; min-height: 100px;">
                            <span id="part-topic" class="thesis-part">[Topic]</span>, 
                            <span id="part-claim" class="thesis-part">[Claim]</span> 
                            <span id="part-rationale" class="thesis-part">[Rationale]</span>.
                        </div>
                    </div>

                    <!-- Component Selection -->
                    <div style="display: flex; flex-direction: column; gap: 20px; width: 100%; max-width: 800px;">
                        <div id="options-label" style="font-weight: bold; font-family: sans-serif; color: #5d3a1a;">SELECT A CLAIM:</div>
                        <div id="options-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <!-- Buttons injected here -->
                        </div>
                    </div>

                </div>

                <!-- Footer -->
                <div style="background: #5d3a1a; padding: 10px; text-align: center; color: #d2b48c; font-family: sans-serif; font-size: 12px;">
                    Combine a Topic, a Claim, and a Rationale to construct a compelling argument.
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.85); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: white; padding: 40px;">
                    <div style="font-size: 100px; margin-bottom: 20px;">📜</div>
                    <h1 style="font-size: 48px; font-family: 'Times New Roman', serif;">THESIS THINKER</h1>
                    <p style="font-size: 20px; max-width: 500px; margin: 20px 0 40px 0; font-family: sans-serif; opacity: 0.9;">The foundation of any great essay is a strong thesis. Construct effective arguments by selecting the best components.</p>
                    <button id="start-btn" style="padding: 18px 60px; border: none; background: #8b4513; color: white; font-size: 22px; font-weight: bold; cursor: pointer; border-radius: 4px; font-family: sans-serif;">START THE ASSIGNMENT</button>
                </div>
            </div>
            <style>
                .thesis-part { color: #d2b48c; transition: color 0.3s; }
                .thesis-part.active { color: #8b4513; font-weight: bold; }
                .choice-btn {
                    background: #fdf5e6; border: 1px solid #d2b48c; padding: 15px; border-radius: 4px; cursor: pointer; text-align: left; font-family: 'Times New Roman', serif; font-size: 18px; transition: all 0.2s;
                }
                .choice-btn:hover { background: #f5deb3; transform: scale(1.02); }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => {
            this.container.querySelector('#start-overlay').style.display = 'none';
            this.start();
        };
    }

    start() {
        super.start();
        this.loadRound();
    }

    loadRound() {
        if (this.currentQ >= this.shuffledChallenges.length) {
            this.end();
            return;
        }

        const q = this.shuffledChallenges[this.currentQ];
        this.container.querySelector('#q-num').textContent = this.currentQ + 1;

        // Initial state
        this.container.querySelector('#part-topic').textContent = q.topic;
        this.container.querySelector('#part-topic').classList.add('active');
        this.container.querySelector('#part-claim').textContent = "[Select a Claim]";
        this.container.querySelector('#part-claim').classList.remove('active');
        this.container.querySelector('#part-rationale').textContent = "[Select a Rationale]";
        this.container.querySelector('#part-rationale').classList.remove('active');

        this.showClaimSelection();
    }

    showClaimSelection() {
        this.container.querySelector('#options-label').textContent = "SELECT THE BEST CLAIM:";
        const grid = this.container.querySelector('#options-grid');
        grid.innerHTML = '';

        const currentQ = this.shuffledChallenges[this.currentQ];
        const otherQs = this.shuffledChallenges.filter(c => c !== currentQ);

        const claims = this.shuffle([
            currentQ.claim,
            otherQs[0].claim,
            "it might be better if things were different",
            "everyone knows that this is a bad idea"
        ]);

        claims.forEach(claim => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = claim;
            btn.onclick = () => {
                const draft = this.container.querySelector('#part-claim');
                draft.textContent = claim;
                draft.classList.add('active');
                if (claim === currentQ.claim) {
                    this.addScore(100);
                    this.showRationaleSelection();
                } else {
                    this.speak("That claim lacks precision or debated weight. Try again.");
                }
            };
            grid.appendChild(btn);
        });
    }

    showRationaleSelection() {
        this.container.querySelector('#options-label').textContent = "SELECT THE STRONGEST RATIONALE:";
        const grid = this.container.querySelector('#options-grid');
        grid.innerHTML = '';

        const currentQ = this.shuffledChallenges[this.currentQ];
        const otherQs = this.shuffledChallenges.filter(c => c !== currentQ);

        const rationales = this.shuffle([
            currentQ.rationale,
            otherQs[0].rationale,
            "mostly because it would be interesting to see",
            "for many different and varied reasons"
        ]);

        rationales.forEach(rat => {
            const btn = document.createElement('button');
            btn.className = 'choice-btn';
            btn.textContent = rat;
            btn.onclick = () => {
                const draft = this.container.querySelector('#part-rationale');
                draft.textContent = rat;
                draft.classList.add('active');
                if (rat === currentQ.rationale) {
                    this.addScore(200);
                    this.container.querySelector('#score').textContent = this.score;
                    this.speak("Excellent thesis construction!");
                    setTimeout(() => {
                        this.currentQ++;
                        this.loadRound();
                    }, 2000);
                } else {
                    this.speak("This rationale doesn't fully support your claim. Try again.");
                }
            };
            grid.appendChild(btn);
        });
    }

    end() {
        super.end();
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #5d3a1a; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px; font-family: 'Times New Roman', serif;">
                <div style="font-size: 100px; margin-bottom: 20px;">📜</div>
                <h1 style="font-size: 48px;">TERM PAPER APPROVED!</h1>
                <p style="font-size: 24px; margin-bottom: 40px;">Total Academic Credits: ${this.score}</p>
                <div style="display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; background: #8b4513; color: white; border: none; border-radius: 4px; cursor: pointer; font-family: sans-serif; font-weight: bold;">NEW ASSIGNMENT</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; background: transparent; border: 2px solid white; color: white; border-radius: 4px; cursor: pointer; font-family: sans-serif; font-weight: bold;">EXIT LIBRARY</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new ThesisThinker(container, config);
}
