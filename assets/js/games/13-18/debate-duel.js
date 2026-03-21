/* assets/js/games/13-18/debate-duel.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

const DEBATE_SCENARIOS = [
    {
        topic: "Artificial Intelligence in Education",
        argument: "AI will eventually replace teachers entirely because it is more efficient and can personalize learning for every student.",
        options: [
            { text: "Teachers provide emotional support and mentorship that AI cannot replicate.", strength: 3, feedback: "Excellent point on the human element." },
            { text: "AI is just a machine and can't be trusted with children.", strength: 1, feedback: "A bit too emotional; needs more logic." },
            { text: "Personalized learning is good, but social interaction in a classroom is vital for development.", strength: 2, feedback: "Good, focuses on social-emotional learning." }
        ],
        correct: 0
    },
    {
        topic: "Social Media Regulation",
        argument: "Social media companies should not be responsible for what users post, as it violates freedom of speech.",
        options: [
            { text: "Freedom of speech doesn't mean freedom from consequences for platforming harmful content.", strength: 3, feedback: "Strong rebuttal on the 'platform' vs 'speech' distinction." },
            { text: "I think people should just be nicer online anyway.", strength: 1, feedback: "Too idealistic for a formal debate." },
            { text: "Regulation would prevent misinformation which is harmful to democracy.", strength: 2, feedback: "Solid point on societal impact." }
        ],
        correct: 0
    },
    {
        topic: "Space Exploration vs. Earth Issues",
        argument: "We should stop spending billions on space exploration when we have poverty and climate change here on Earth.",
        options: [
            { text: "Space technology leads to inventions that actually help solve Earth's problems, like satellite climate monitoring.", strength: 3, feedback: "Perfect cause-and-effect rebuttal." },
            { text: "Space is cool and we need to find aliens.", strength: 1, feedback: "Not a serious academic argument." },
            { text: "The budget for space is actually very small compared to military spending.", strength: 2, feedback: "Good context, though it shifts the topic slightly." }
        ],
        correct: 0
    },
    {
        topic: "Universal Basic Income",
        argument: "Giving everyone free money will make people lazy and unwilling to work.",
        options: [
            { text: "Pilot programs in Finland and Canada showed most recipients continued working while gaining financial security.", strength: 3, feedback: "Excellent use of real-world evidence." },
            { text: "People deserve free money because life is hard.", strength: 1, feedback: "Lacks logical structure for a formal debate." },
            { text: "UBI could actually boost entrepreneurship since people would have a safety net to take risks.", strength: 2, feedback: "Good economic reasoning." }
        ],
        correct: 0
    },
    {
        topic: "Privacy vs. Security",
        argument: "Governments should have access to all personal data to prevent terrorism and crime.",
        options: [
            { text: "Mass surveillance has historically been used to suppress dissent, not just prevent crime, making it a threat to democracy itself.", strength: 3, feedback: "Strong historical and political rebuttal." },
            { text: "I don't want the government reading my messages.", strength: 1, feedback: "Too personal; needs broader reasoning." },
            { text: "Targeted surveillance with judicial oversight is more effective than mass data collection.", strength: 2, feedback: "Good alternative proposal." }
        ],
        correct: 0
    }
];

class DebateDuel extends GameBase {
    async init() {
        await this.init3D();
        this.currentQ = 0;
        this.score = 0;
        this.persuasion = 50; // 0 to 100
        this.shuffled = this.shuffle([...DEBATE_SCENARIOS]);

        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #2c3e50; color: white; font-family: 'Georgia', serif; display: flex; flex-direction: column; overflow: hidden;">
                <!-- Debate Header -->
                <div style="background: #1a1a1a; padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 5px solid #c0392b;">
                    <div style="font-size: 28px; font-weight: bold; letter-spacing: 2px;">🏛️ HIGH COURT DEBATE</div>
                    <div style="display: flex; gap: 30px; font-family: sans-serif; font-weight: bold;">
                        <div>ROUND: <span id="round-num">1</span>/3</div>
                        <div>SCORE: <span id="score">0</span></div>
                    </div>
                </div>

                <!-- Persuasion Meter -->
                <div style="padding: 10px 40px; background: rgba(0,0,0,0.3); display: flex; align-items: center; gap: 20px;">
                    <div style="font-size: 12px; font-weight: bold; width: 100px;">OPPONENT</div>
                    <div style="flex: 1; height: 20px; background: #444; border-radius: 10px; overflow: hidden; position: relative; border: 2px solid #555;">
                        <div id="persuasion-bar" style="position: absolute; left: 0; top: 0; bottom: 0; width: 50%; background: linear-gradient(90deg, #c0392b, #27ae60); transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);"></div>
                        <div style="position: absolute; left: 50%; top: -5px; bottom: -5px; width: 4px; background: white; transform: translateX(-50%);"></div>
                    </div>
                    <div style="font-size: 12px; font-weight: bold; width: 100px; text-align: right;">YOU</div>
                </div>

                <!-- Main Debate Stage -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; position: relative;">
                    
                    <!-- Opponent Speech Bubble -->
                    <div id="opponent-box" style="background: #ecf0f1; color: #2c3e50; padding: 25px; border-radius: 20px; border-bottom-left-radius: 0; width: 80%; max-width: 600px; margin-bottom: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); transform: translateX(-20px); opacity: 0; transition: all 0.5s;">
                        <div style="font-weight: bold; color: #c0392b; margin-bottom: 5px;">OPPONENT ARGUMENT:</div>
                        <div id="opponent-text" style="font-size: 20px; font-style: italic; line-height: 1.5;">...</div>
                    </div>

                    <!-- Options -->
                    <div id="options-container" style="display: flex; flex-direction: column; gap: 15px; width: 90%; max-width: 800px;">
                        <!-- Buttons injected here -->
                    </div>

                    <!-- Feedback -->
                    <div id="feedback-text" style="margin-top: 30px; font-size: 22px; font-weight: bold; color: #27ae60; height: 30px; opacity: 0; transition: opacity 0.3s; font-family: sans-serif;">
                        Excellent Rebuttal!
                    </div>
                </div>

                <!-- Footer -->
                <div style="background: #1a1a1a; padding: 15px; text-align: center; font-size: 14px; color: #95a5a6; font-family: sans-serif;">
                    Select the most logically sound and persuasive counter-argument.
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.95); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px;">
                    <div style="font-size: 120px; margin-bottom: 20px;">🏛️</div>
                    <h1 style="font-size: 50px; color: #f1c40f; margin: 0; letter-spacing: 5px;">DEBATE DUEL</h1>
                    <p style="font-size: 22px; max-width: 600px; margin: 20px 0 40px 0; color: #bdc3c7; line-height: 1.6;">Victory isn't about being loud; it's about being logical. Rebut your opponent's claims with the strongest counter-arguments.</p>
                    <button id="start-btn" style="padding: 20px 60px; border: none; background: #c0392b; color: white; font-size: 24px; font-weight: bold; cursor: pointer; border-radius: 4px; box-shadow: 0 10px 40px rgba(192, 57, 43, 0.4); text-transform: uppercase;">Enter the Hall</button>
                </div>
            </div>
            <style>
                .rebuttal-btn {
                    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.3); color: white; padding: 20px; text-align: left; cursor: pointer; border-radius: 8px; transition: all 0.2s; font-family: 'Georgia', serif; font-size: 18px; line-height: 1.4;
                }
                .rebuttal-btn:hover { background: rgba(255,255,255,0.2); transform: translateX(10px); border-color: #27ae60; }
                .rebuttal-btn:active { transform: scale(0.98); }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => this.startGame();
    }

    startGame() {
        super.start();
        this.currentQ = 0;
        this.score = 0;
        this.persuasion = 50;
        this.container.querySelector('#score').textContent = this.score;
        this.container.querySelector('#persuasion-bar').style.width = `${this.persuasion}%`;
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.showFeedback('Court is now in session', 'info', 1200);
        this.loadScenario();
    }

    loadScenario() {
        if (this.currentQ >= this.shuffled.length) {
            this.endGame();
            return;
        }

        const q = this.shuffled[this.currentQ];
        this.container.querySelector('#round-num').textContent = this.currentQ + 1;

        // Show opponent argument
        const opponentBox = this.container.querySelector('#opponent-box');
        opponentBox.style.opacity = '0';
        opponentBox.style.transform = 'translateY(20px)';

        setTimeout(() => {
            this.container.querySelector('#opponent-text').textContent = q.argument;
            opponentBox.style.opacity = '1';
            opponentBox.style.transform = 'translateY(0)';

            // Speak the argument
            this.speak(q.argument, { rate: 0.9, pitch: 0.8 });
        }, 500);

        const container = this.container.querySelector('#options-container');
        container.innerHTML = '';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'rebuttal-btn';
            btn.textContent = opt.text;
            btn.onclick = () => this.handleAnswer(idx, q.correct, opt, btn);
            container.appendChild(btn);
        });
    }

    handleAnswer(idx, correctIdx, option, btn) {
        const feedback = this.container.querySelector('#feedback-text');
        const isCorrect = idx === correctIdx;

        // Disable all buttons
        this.container.querySelectorAll('.rebuttal-btn').forEach(b => b.style.pointerEvents = 'none');

        if (isCorrect) {
            const earned = this.addScore(500);
            this.persuasion = Math.min(100, this.persuasion + 20);
            btn.style.background = 'rgba(39, 174, 96, 0.3)';
            btn.style.borderColor = '#27ae60';
            feedback.textContent = option.feedback;
            feedback.style.color = '#27ae60';
            this.showScoreBurst(`+${earned}`);
            this.showFeedback('Strong rebuttal', 'success', 900);
            this.celebrateMove({ burst: 'REBUTTAL', duration: 800 });
        } else {
            this.persuasion = Math.max(0, this.persuasion - 15);
            btn.style.background = 'rgba(192, 57, 43, 0.3)';
            btn.style.borderColor = '#c0392b';
            feedback.textContent = option.feedback;
            feedback.style.color = '#e67e22';
            this.showFeedback('Pressure rising', 'warning', 900);
            this.pulseStage('warning');
            this.coachMove("That counterpoint did not land. Tighten the logic.", 900);
        }

        this.container.querySelector('#persuasion-bar').style.width = `${this.persuasion}%`;
        this.container.querySelector('#score').textContent = this.score;
        feedback.style.opacity = '1';

        setTimeout(() => {
            feedback.style.opacity = '0';
            this.currentQ++;
            this.loadScenario();
        }, 2500);
    }

    endGame() {
        const victory = this.persuasion >= 50;
        this.showFeedback(victory ? 'Judges impressed' : 'Time to sharpen the rebuttal', victory ? 'success' : 'warning', 1200);
        super.end();
        return;
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #1a1a1a; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px;">
                <h1 style="font-size: 60px; color: ${victory ? '#27ae60' : '#c0392b'};">${victory ? 'DEBATE WON! 🏅' : 'DEBATE LOST 📉'}</h1>
                <p style="font-size: 32px; margin-top: -20px;">Final Score: ${this.score}</p>
                <p style="font-size: 20px; color: #95a5a6; max-width: 500px; margin-bottom: 40px;">
                    ${victory ? 'The judges were impressed by your clear reasoning and strong counter-points.' : 'Your arguments lacked the necessary logical weight to sway the court.'}
                </p>
                <div style="display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; background: #c0392b; color: white; border: none; font-size: 20px; font-weight: bold; cursor: pointer; border-radius: 4px;">New Debate</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; background: transparent; border: 2px solid white; color: white; font-size: 20px; font-weight: bold; cursor: pointer; border-radius: 4px;">Exit Hall</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new DebateDuel(container, config);
}
