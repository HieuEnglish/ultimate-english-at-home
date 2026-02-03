/* assets/js/games/13-18/tone-tuner.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

class ToneTuner extends GameBase {
    async init() {
        await this.init3D();

        this.scenarios = [
            {
                context: "Emailing a professor about a late assignment.",
                target: "Formal / Academic",
                options: [
                    { text: "Yo, I'll hit you up with that paper tomorrow. My bad!", tone: "Slang" },
                    { text: "I am writing to request an extension for my submission due to unforeseen circumstances.", tone: "Formal" },
                    { text: "Hey professor, can I send the work tomorrow? I was sick.", tone: "Neutral" },
                    { text: "Submission is delayed. Expect delivery in 24 hours.", tone: "Robotic" }
                ],
                correct: "Formal"
            },
            {
                context: "Texting a close friend to see if they're coming to the party.",
                target: "Informal / Slang",
                options: [
                    { text: "I am inquiring about your attendance at the social gathering this evening.", tone: "Professional" },
                    { text: "Are you coming to the party tonight?", tone: "Neutral" },
                    { text: "U comin tonite? Gonna b lit!", tone: "Informal" },
                    { text: "Please confirm your arrival for the 8 PM event.", tone: "Formal" }
                ],
                correct: "Informal"
            },
            {
                context: "Writing a 'Thank You' note to your grandmother for a gift.",
                target: "Warm / Polite",
                options: [
                    { text: "Thanks for the stuff, it's cool.", tone: "Casual" },
                    { text: "Receipt of gift acknowledged. Appreciation expressed.", tone: "Analytical" },
                    { text: "Thank you so much for the lovely gift, Grandma! I really appreciate your kindness.", tone: "Warm" },
                    { text: "The item has been received and integrated into my collection.", tone: "Robotic" }
                ],
                correct: "Warm"
            },
            {
                context: "A job interview: explaining why you want the position.",
                target: "Professional / Enthusiastic",
                options: [
                    { text: "I am highly motivated to contribute to your team and grow within this role.", tone: "Professional" },
                    { text: "I just need a job to pay the bills, honestly.", tone: "Blunt" },
                    { text: "Give me the job and I'll work hard, I guess.", tone: "Passive" },
                    { text: "Looking for a gig with good vibes and decent pay.", tone: "Casual" }
                ],
                correct: "Professional"
            },
            {
                context: "Asking a boss for a pay rise.",
                target: "Assertive / Professional",
                options: [
                    { text: "Hey, can you give me more money?", tone: "Casual" },
                    { text: "I've been here a while, so I think I deserve a raise.", tone: "Vague" },
                    { text: "Based on my performance and increased responsibilities, I would like to discuss a salary review.", tone: "Assertive" },
                    { text: "I'll quit if I don't get paid more starting Monday.", tone: "Aggressive" }
                ],
                correct: "Assertive"
            }
        ];

        this.currentQ = 0;
        this.score = 0;
        this.shuffled = this.shuffle([...this.scenarios]);

        this.setupUI();
        this.setupScene();
    }

    setupUI() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #121212; color: #e0e0e0; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; overflow: hidden;">
                <!-- Tuner Header -->
                <div style="padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #333; background: #1a1a1a; z-index: 10;">
                    <div style="font-size: 24px; font-weight: 800; color: #bb86fc;">🎛️ TONE TUNER</div>
                    <div style="display: flex; gap: 30px;">
                        <div style="color: #03dac6;">LEVEL: <span id="level-num">1</span>/5</div>
                        <div style="color: #03dac6;">AMPLITUDE: <span id="score">0</span></div>
                    </div>
                </div>

                <!-- Main Mixer Area -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 20px; position: relative;">
                    
                    <!-- Context Display -->
                    <div id="context-box" style="background: #252525; border-radius: 12px; padding: 30px; width: 90%; max-width: 700px; border: 1px solid #444; margin-bottom: 30px; text-align: center; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 10;">
                        <div style="color: #03dac6; font-size: 14px; font-weight: bold; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 2px;">Scenario Context</div>
                        <h2 id="scenario-text" style="font-size: 24px; font-weight: 400; line-height: 1.4; color: #fff;">
                            Loading scenario...
                        </h2>
                        <div style="margin-top: 20px; padding: 10px; background: rgba(187, 134, 252, 0.1); border-radius: 5px; border: 1px dashed #bb86fc;">
                            REQUIRED TONE: <span id="target-tone" style="font-weight: bold; color: #bb86fc;">FORMAL</span>
                        </div>
                    </div>

                    <!-- Options Grid -->
                    <div id="options-container" style="display: grid; grid-template-columns: 1fr; gap: 15px; width: 90%; max-width: 700px; z-index: 10;">
                        <!-- Buttons injected here -->
                    </div>

                </div>

                <!-- Feedback Bar -->
                <div id="feedback" style="height: 60px; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: bold; transition: all 0.3s; opacity: 0;">
                    PERFECT FREQUENCY MATCH!
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.9); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <div style="font-size: 100px; margin-bottom: 20px;">🔊</div>
                    <h1 style="font-size: 48px; color: #bb86fc; margin: 0;">TONE TUNER</h1>
                    <p style="font-size: 18px; max-width: 500px; margin: 20px 0 40px 0; opacity: 0.8;">It's not just what you say, it's how you say it. Adjust your tone to match the right social frequency.</p>
                    <button id="start-btn" style="padding: 18px 50px; border: none; background: #bb86fc; color: #121212; font-size: 22px; font-weight: 800; cursor: pointer; border-radius: 50px; box-shadow: 0 10px 30px rgba(187, 134, 252, 0.3);">POWER ON</button>
                </div>
            </div>
            <style>
                .tone-opt {
                    background: #252525; border: 1px solid #444; border-radius: 8px; padding: 20px; text-align: left; cursor: pointer; transition: all 0.2s; color: #e0e0e0; font-size: 16px;
                }
                .tone-opt:hover { background: #333; border-color: #bb86fc; transform: translateX(10px); }
                .tone-opt:active { transform: scale(0.98); }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => this.startGame();
    }

    setupScene() {
        // Mixing board elements (spheres and cylinders)
        const knobGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 32);
        const knobMat = new THREE.MeshPhongMaterial({ color: 0x444444 });
        this.threeHelper.addFloatingObject(knobGeo, knobMat, 10);

        // Neon lines
        const lineGeo = new THREE.PlaneGeometry(0.1, 100);
        const lineMat = new THREE.MeshBasicMaterial({ color: 0xbb86fc, transparent: true, opacity: 0.2 });
        const line = new THREE.Mesh(lineGeo, lineMat);
        line.position.set(0, 0, -20);
        this.threeHelper.scene.add(line);
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.loadScenario();
    }

    loadScenario() {
        if (this.currentQ >= this.shuffled.length) {
            this.endGame();
            return;
        }

        const q = this.shuffled[this.currentQ];
        this.container.querySelector('#level-num').textContent = this.currentQ + 1;
        this.container.querySelector('#scenario-text').textContent = q.context;
        this.container.querySelector('#target-tone').textContent = q.target.toUpperCase();

        const container = this.container.querySelector('#options-container');
        container.innerHTML = '';

        const options = this.shuffle([...q.options]);
        options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'tone-opt';
            btn.textContent = opt.text;
            btn.onclick = () => this.handleAnswer(opt.tone, q.correct, btn);
            container.appendChild(btn);
        });
    }

    handleAnswer(selectedTone, correctTone, btn) {
        const feedback = this.container.querySelector('#feedback');
        feedback.style.opacity = '1';

        if (selectedTone === correctTone) {
            this.score += 300;
            this.container.querySelector('#score').textContent = this.score;
            btn.style.borderColor = '#03dac6';
            btn.style.background = 'rgba(3, 218, 198, 0.1)';
            feedback.textContent = 'SIGNAL MATCHED: CLEAR RECEPTION';
            feedback.style.color = '#03dac6';

            setTimeout(() => {
                feedback.style.opacity = '0';
                this.currentQ++;
                this.loadScenario();
            }, 1500);
        } else {
            btn.style.borderColor = '#cf6679';
            btn.style.background = 'rgba(207, 102, 121, 0.1)';
            feedback.textContent = 'SIGNAL INTERFERENCE: WRONG FREQUENCY';
            feedback.style.color = '#cf6679';

            setTimeout(() => {
                feedback.style.opacity = '0';
            }, 1000);
        }
    }

    endGame() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #121212; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <h1 style="font-size: 60px; color: #bb86fc;">Signal Optimized! 📡</h1>
                <p style="font-size: 32px; margin-top: -20px;">Social Amplitude: ${this.score}</p>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; border-radius: 30px; background: #bb86fc; color: #121212; border: none; font-size: 20px; font-weight: 800; cursor: pointer;">New Session</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; border-radius: 30px; background: transparent; border: 2px solid white; color: white; font-size: 20px; font-weight: 800; cursor: pointer;">Sign Off</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new ToneTuner(container, config);
}
