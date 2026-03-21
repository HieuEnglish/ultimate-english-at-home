/* assets/js/games/13-18/speech-coach.js */
const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

const SPEECH_SCRIPTS = [
    {
        title: "The Moon Speech",
        origin: "John F. Kennedy",
        text: "We choose to go to the moon and do the other things, not because they are easy, but because they are hard.",
        difficulty: "Medium"
    },
    {
        title: "I Have a Dream",
        origin: "Martin Luther King Jr.",
        text: "I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin.",
        difficulty: "Hard"
    },
    {
        title: "Business Keynote",
        origin: "Tech CEO",
        text: "Innovation is not just about technology, it is about solving the human problems that define our generation.",
        difficulty: "Easy"
    },
    {
        title: "The Power of Education",
        origin: "Malala Yousafzai",
        text: "One child, one teacher, one book, and one pen can change the world. Education is the only solution.",
        difficulty: "Medium"
    },
    {
        title: "Courage and Persistence",
        origin: "Winston Churchill",
        text: "Success is not final, failure is not fatal. It is the courage to continue that counts.",
        difficulty: "Easy"
    }
];

class SpeechCoach extends GameBase {
    async init() {
        await this.init3D();
        this.currentQ = 0;
        this.score = 0;
        this.recognition = null;
        this.isListening = false;

        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #1a1a1a; color: white; font-family: 'Helvetica Neue', Arial, sans-serif; display: flex; flex-direction: column; overflow: hidden;">
                <!-- Podium/Logo Header -->
                <div style="padding: 20px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #555;">
                    <div style="font-size: 24px; font-weight: 800; letter-spacing: 1px; color: #f1c40f;">🎤 SPEECH COACH</div>
                    <div style="display: flex; gap: 30px;">
                        <div>PROGRESS: <span id="q-num">1</span>/3</div>
                        <div>CONFIDENCE: <span id="score">0</span></div>
                    </div>
                </div>

                <!-- Main Public Speaking Area -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 40px; text-align: center; position: relative;">
                    
                    <!-- The Script -->
                    <div id="script-card" style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px; padding: 40px; width: 90%; max-width: 800px; margin-bottom: 40px;">
                        <div id="script-info" style="color: #95a5a6; font-size: 14px; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 2px;">AUTHOR</div>
                        <h2 id="script-title" style="margin: 0 0 30px 0; font-size: 32px; color: #f1c40f;">TITLE</h2>
                        <div id="script-text" style="font-size: 24px; line-height: 1.6; color: #ecf0f1; font-family: 'Georgia', serif;">
                            Loading script...
                        </div>
                    </div>

                    <!-- Mic Controls -->
                    <div id="mic-area" style="display: flex; flex-direction: column; align-items: center; gap: 20px;">
                        <button id="mic-btn" style="width: 100px; height: 100px; border-radius: 50%; border: none; background: #e74c3c; color: white; font-size: 40px; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 0 30px rgba(231, 76, 60, 0.4); transition: transform 0.2s, background 0.2s;">
                            🎤
                        </button>
                        <div id="mic-status" style="font-weight: bold; color: #95a5a6; font-size: 14px; text-transform: uppercase;">Ready to record</div>
                        <div id="transcript" style="font-style: italic; color: #f1c40f; min-height: 30px; max-width: 600px;"></div>
                    </div>

                </div>

                <!-- Feedback Message -->
                <div id="feedback" style="position: absolute; top: 100px; left: 50%; transform: translateX(-50%); font-size: 30px; font-weight: 900; opacity: 0; transition: all 0.3s; z-index: 50; text-shadow: 0 4px 10px rgba(0,0,0,0.5);">
                    ORATOR!
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.95); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px;">
                    <div style="font-size: 120px; margin-bottom: 20px;">🗣️</div>
                    <h1 style="font-size: 50px; color: #f1c40f; margin: 0;">SPEECH COACH</h1>
                    <p style="font-size: 20px; max-width: 500px; margin: 20px 0 40px 0; color: #bdc3c7;">Master the art of rhetoric. Read the provided scripts clearly into your microphone to earn high marks.</p>
                    <button id="start-btn" style="padding: 20px 60px; border: none; background: #f1c40f; color: #1a1a1a; font-size: 24px; font-weight: bold; cursor: pointer; border-radius: 4px; text-transform: uppercase;">Take the Podium</button>
                    <p id="mic-warning" style="margin-top: 20px; color: #e74c3c; font-size: 14px; display: none;">Speech recognition not supported in this browser.</p>
                </div>
            </div>
            <style>
                @keyframes mic-pulse {
                    0% { transform: scale(1); box-shadow: 0 0 30px rgba(231, 76, 60, 0.4); }
                    50% { transform: scale(1.1); box-shadow: 0 0 60px rgba(231, 76, 60, 0.8); }
                    100% { transform: scale(1); box-shadow: 0 0 30px rgba(231, 76, 60, 0.4); }
                }
                .listening { animation: mic-pulse 1s infinite !important; background: #2ecc71 !important; box-shadow: 0 0 30px rgba(46, 204, 113, 0.4) !important; }
            </style>
        `;

        this.setupRecognition();
        this.container.querySelector('#start-btn').onclick = () => this.startGame();
    }

    setupRecognition() {
        if (!('webkitSpeechRecognition' in window)) {
            this.container.querySelector('#mic-warning').style.display = 'block';
            this.container.querySelector('#start-btn').disabled = true;
            return;
        }

        const SpeechRecognition = window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = true;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            this.container.querySelector('#transcript').textContent = transcript;

            // Debounced check
            if (event.results[event.results.length - 1].isFinal) {
                this.analyzeSpeech(transcript);
            }
        };

        this.recognition.onstart = () => {
            this.isListening = true;
            this.container.querySelector('#mic-btn').classList.add('listening');
            this.container.querySelector('#mic-status').textContent = 'Listening...';
        };

        this.recognition.onend = () => {
            this.isListening = false;
            this.container.querySelector('#mic-btn').classList.remove('listening');
            this.container.querySelector('#mic-status').textContent = 'Recording stopped';
        };
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.loadScript();
    }

    loadScript() {
        if (this.currentQ >= SPEECH_SCRIPTS.length) {
            this.endGame();
            return;
        }

        const script = SPEECH_SCRIPTS[this.currentQ];
        this.container.querySelector('#q-num').textContent = this.currentQ + 1;
        this.container.querySelector('#script-title').textContent = script.title;
        this.container.querySelector('#script-info').textContent = script.origin;
        this.container.querySelector('#script-text').textContent = script.text;
        this.container.querySelector('#transcript').textContent = '';

        const micBtn = this.container.querySelector('#mic-btn');
        micBtn.onclick = () => {
            if (this.isListening) {
                this.recognition.stop();
            } else {
                this.recognition.start();
            }
        };
    }

    analyzeSpeech(transcript) {
        const target = SPEECH_SCRIPTS[this.currentQ].text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        const spoken = transcript.toLowerCase().trim();

        // Check if main keywords from the target are in the spoken transcript
        const words = target.split(/\s+/);
        const spokenWords = spoken.split(/\s+/);

        let matchCount = 0;
        words.forEach(w => {
            if (spokenWords.includes(w)) matchCount++;
        });

        const accuracy = matchCount / words.length;

        if (accuracy > 0.4) { // Allow for some error in recognition
            this.recognition.stop();
            this.score += Math.round(accuracy * 1000);
            this.container.querySelector('#score').textContent = this.score;
            this.showFeedback("ELOQUENT!");
            this.celebrateMove({ burst: 'ELOQUENT', duration: 800 });

            setTimeout(() => {
                this.currentQ++;
                this.loadScript();
            }, 2000);
        } else {
            this.coachMove();
        }
    }

    showFeedback(text) {
        const feed = this.container.querySelector('#feedback');
        feed.textContent = text;
        feed.style.opacity = '1';
        feed.style.transform = 'translateX(-50%) scale(1.5)';
        setTimeout(() => {
            feed.style.opacity = '0';
            feed.style.transform = 'translateX(-50%) scale(1)';
        }, 1500);
    }

    endGame() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #1a1a1a; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center; padding: 40px;">
                <h1 style="font-size: 60px; color: #f1c40f;">Speech Concluded! 🎙️</h1>
                <p style="font-size: 32px; margin-top: -20px;">Oratorical Rating: ${this.score}</p>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; background: #f1c40f; color: #1a1a1a; border: none; font-size: 20px; font-weight: bold; cursor: pointer;">New Performance</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; background: transparent; border: 2px solid white; color: white; font-size: 20px; font-weight: bold; cursor: pointer;">Leave Stage</button>
                </div>
            </div>
        `;
    }

    cleanup() {
        super.cleanup();
        if (this.recognition) this.recognition.stop();
    }
}

export function createGame(container, config) {
    return new SpeechCoach(container, config);
}
