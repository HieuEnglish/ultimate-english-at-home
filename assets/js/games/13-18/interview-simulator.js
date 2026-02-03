/* assets/js/games/13-18/interview-simulator.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

const INTERVIEW_QUESTIONS = [
    {
        question: "Can you tell me about a time you had to deal with a difficult situation?",
        options: [
            { text: "I once managed a project conflict by facilitating a discussion to find common ground.", tone: "Professional", points: 100 },
            { text: "I just ignored it until it went away. No point in making a fuss.", tone: "Passive", points: 20 },
            { text: "I yelled at everyone until they did what I said. It worked.", tone: "Aggressive", points: 10 }
        ]
    },
    {
        question: "Why should we hire you over other candidates?",
        options: [
            { text: "Because I'm the best, obviously. You'd be lucky to have me.", tone: "Arrogant", points: 20 },
            { text: "I possess a unique combination of technical skills and a proactive mindset that aligns with your company's values.", tone: "Professional", points: 100 },
            { text: "I don't know, I just need the money.", tone: "Blunt", points: 10 }
        ]
    },
    {
        question: "What is your greatest weakness?",
        options: [
            { text: "I don't have any weaknesses. I'm perfect.", tone: "Dishonest", points: 10 },
            { text: "I sometimes struggle with perfectionism, but I've learned to manage my time more effectively by setting realistic deadlines.", tone: "Professional", points: 100 },
            { text: "I'm really lazy and hate waking up early.", tone: "Too Honest", points: 20 }
        ]
    }
];

class InterviewSimulator extends GameBase {
    async init() {
        await this.init3D();
        this.currentQ = 0;
        this.score = 0;
        this.hireability = 0; // 0 to 100

        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #f4f7f6; color: #333; font-family: 'Inter', sans-serif; display: flex; flex-direction: column; overflow: hidden;">
                <!-- UI Header -->
                <div style="background: #2c3e50; padding: 15px 30px; display: flex; justify-content: space-between; align-items: center; color: white;">
                    <div style="font-weight: bold; font-size: 20px;">💼 CAREER SIMULATOR</div>
                    <div style="display: flex; gap: 30px;">
                        <div>QUESTION: <span id="q-num">1</span>/3</div>
                        <div>SCORE: <span id="score">0</span></div>
                    </div>
                </div>

                <!-- Main Content -->
                <div style="flex: 1; display: flex; align-items: center; justify-content: center; padding: 40px; gap: 40px;">
                    
                    <!-- Interviewer Side -->
                    <div style="flex: 1; display: flex; flex-direction: column; align-items: center; max-width: 400px;">
                        <div style="font-size: 150px; margin-bottom: 20px;">👔</div>
                        <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #ddd; box-shadow: 0 4px 15px rgba(0,0,0,0.05); position: relative;">
                            <div id="interviewer-text" style="font-size: 18px; font-weight: 500; text-align: center;">Welcome. Let's begin.</div>
                            <div style="position: absolute; left: -10px; top: 50%; width: 20px; height: 20px; background: white; transform: rotate(45deg); border-left: 1px solid #ddd; border-bottom: 1px solid #ddd;"></div>
                        </div>
                    </div>

                    <!-- Player Response Side -->
                    <div style="flex: 1.5; display: flex; flex-direction: column; gap: 15px;">
                        <div id="options-container" style="display: flex; flex-direction: column; gap: 12px;">
                            <!-- Buttons -->
                        </div>
                    </div>
                </div>

                <!-- Footer Stats -->
                <div style="background: #fff; border-top: 1px solid #eee; padding: 20px 40px; display: flex; align-items: center; gap: 20px;">
                    <div style="font-weight: bold; font-size: 14px; width: 120px;">HIREABILITY:</div>
                    <div style="flex: 1; height: 10px; background: #eee; border-radius: 5px; overflow: hidden;">
                        <div id="hire-bar" style="width: 0%; height: 100%; background: #27ae60; transition: width 0.5s;"></div>
                    </div>
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.9); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; color: white;">
                    <div style="font-size: 100px; margin-bottom: 20px;">🏢</div>
                    <h1 style="font-size: 40px; margin: 0;">INTERVIEW SIMULATOR</h1>
                    <p style="font-size: 18px; max-width: 500px; margin: 20px 0 40px 0; opacity: 0.8;">Professionalism is key. Select the most articulate and appropriately-toned responses to secure your dream job.</p>
                    <button id="start-btn" style="padding: 15px 50px; border: none; background: #27ae60; color: white; font-size: 20px; font-weight: bold; cursor: pointer; border-radius: 30px;">ENTER INTERVIEW</button>
                </div>
            </div>
            <style>
                .response-btn {
                    padding: 20px; background: white; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; text-align: left; font-size: 16px; transition: all 0.2s; box-shadow: 0 2px 5px rgba(0,0,0,0.02);
                }
                .response-btn:hover { border-color: #27ae60; background: #fafffa; transform: translateX(5px); }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => this.startGame();
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQ >= INTERVIEW_QUESTIONS.length) {
            this.endGame();
            return;
        }

        const q = INTERVIEW_QUESTIONS[this.currentQ];
        this.container.querySelector('#q-num').textContent = this.currentQ + 1;
        this.container.querySelector('#interviewer-text').textContent = q.question;

        // Speak the question
        this.speak(q.question, { rate: 0.95, pitch: 1 });

        const container = this.container.querySelector('#options-container');
        container.innerHTML = '';

        q.options.forEach((opt, idx) => {
            const btn = document.createElement('button');
            btn.className = 'response-btn';
            btn.textContent = opt.text;
            btn.onclick = () => this.handleResponse(opt, btn);
            container.appendChild(btn);
        });
    }

    handleResponse(opt, btn) {
        this.container.querySelectorAll('.response-btn').forEach(b => b.style.pointerEvents = 'none');

        const isPerfect = opt.tone === "Professional";
        if (isPerfect) {
            btn.style.borderColor = '#27ae60';
            btn.style.background = '#fafffa';
        } else {
            btn.style.borderColor = '#e74c3c';
            btn.style.background = '#fffafa';
        }

        this.score += opt.points;
        this.hireability = Math.min(100, this.hireability + (opt.points / INTERVIEW_QUESTIONS.length));

        this.container.querySelector('#score').textContent = this.score;
        this.container.querySelector('#hire-bar').style.width = `${this.hireability}%`;

        setTimeout(() => {
            this.currentQ++;
            this.loadQuestion();
        }, 2000);
    }

    endGame() {
        const hired = this.hireability >= 70;
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #2c3e50; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px;">
                <div style="font-size: 100px; margin-bottom: 20px;">${hired ? '📜' : '🏢'}</div>
                <h1 style="font-size: 50px;">${hired ? "YOU'RE HIRED!" : "NOT THIS TIME"}</h1>
                <p style="font-size: 24px;">Professional Standing: ${Math.round(this.hireability)}%</p>
                <p style="max-width: 500px; margin: 20px 0 40px 0; color: #bdc3c7;">
                    ${hired ? "Your articulate communication and professional demeanor stood out. Welcome to the team!" : "While you have potential, your communication style didn't quite match our professional standards."}
                </p>
                <div style="display: flex; gap: 15px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; background: #27ae60; color: white; border: none; border-radius: 30px; font-weight: bold; cursor: pointer;">Try Again</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; background: transparent; border: 2px solid white; color: white; border-radius: 30px; font-weight: bold; cursor: pointer;">Return Home</button>
                </div>
            </div>
        `;
    }
}

export function createGame(container, config) {
    return new InterviewSimulator(container, config);
}
