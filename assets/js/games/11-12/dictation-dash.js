/* assets/js/games/11-12/dictation-dash.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

class DictationDash extends GameBase {
    async init() {
        await this.init3D();

        this.sentences = [
            "The quick brown fox jumps over the lazy dog.",
            "Technology is evolving faster than ever before.",
            "Please make sure to bring your umbrella today.",
            "The ancient ruins were hidden deep in the jungle.",
            "Our team won the championship after a hard match.",
            "Listening carefully is a very important skill to have.",
            "She decided to bake a delicious chocolate cake.",
            "The scientist discovered a new species of butterfly.",
            "Traveling around the world opens up your mind.",
            "Practice makes perfect in everything you do."
        ];

        this.currentLap = 0;
        this.score = 0;
        this.totalLaps = 5;
        this.shuffled = this.shuffle([...this.sentences]).slice(0, this.totalLaps);

        this.setupUI();
        this.setupScene();
    }

    setupUI() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #222; color: white; font-family: 'Segoe UI', sans-serif; display: flex; flex-direction: column; overflow: hidden;">
                <!-- Race HUD -->
                <div style="padding: 20px; display: flex; justify-content: space-between; background: rgba(0,0,0,0.5); border-bottom: 2px solid #555; z-index: 10;">
                    <div style="font-size: 24px; font-weight: bold; color: #ffeb3b;">🏎️ Dictation Dash</div>
                    <div style="display: flex; gap: 30px;">
                        <div style="font-size: 20px;">Lap: <span id="lap-num">1</span>/${this.totalLaps}</div>
                        <div style="font-size: 20px;">Score: <span id="score-num">0</span></div>
                    </div>
                </div>

                <!-- Main Game Area -->
                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
                    
                    <!-- Speedometer (Animated Ring) -->
                    <div id="meter" style="width: 250px; height: 125px; border: 10px solid #444; border-bottom: 0; border-radius: 125px 125px 0 0; position: absolute; top: 10%; overflow: hidden; display: flex; align-items: flex-end; justify-content: center;">
                        <div id="needle" style="width: 4px; height: 100px; background: red; transform-origin: bottom; transform: rotate(-90deg); transition: transform 0.2s;"></div>
                        <div style="position: absolute; bottom: 5px; font-weight: bold; font-size: 12px;">READY</div>
                    </div>

                    <!-- Input Box -->
                    <div id="race-card" style="background: white; color: #333; padding: 40px; border-radius: 15px; width: 80%; max-width: 800px; box-shadow: 0 10px 30px rgba(0,0,0,0.5); z-index: 10; margin-top: 50px;">
                        <div style="display: flex; justify-content: center; margin-bottom: 20px;">
                            <button id="hear-btn" style="padding: 15px 30px; background: #2196F3; color: white; border: none; border-radius: 5px; cursor: pointer; font-size: 18px; font-weight: bold; display: flex; align-items: center; gap: 10px;">
                                <span>🔈</span> LISTEN TO SENTENCE
                            </button>
                        </div>
                        
                        <textarea id="dash-input" placeholder="Type what you hear exactly..." style="width: 100%; height: 100px; padding: 15px; border: 2px solid #ddd; border-radius: 8px; font-size: 20px; font-family: inherit; resize: none; outline: none; transition: border-color 0.3s;"></textarea>
                        
                        <div id="progress-bar" style="width: 100%; height: 10px; background: #eee; border-radius: 5px; margin-top: 20px; overflow: hidden;">
                            <div id="progress-fill" style="width: 0%; height: 100%; background: #4CAF50; transition: width 0.1s;"></div>
                        </div>
                    </div>

                    <!-- Feedback -->
                    <div id="feedback" style="position: absolute; bottom: 10%; font-size: 40px; font-weight: 800; opacity: 0; transition: all 0.5s;">✅ PERFECT!</div>
                </div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.9); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                    <div style="font-size: 100px; margin-bottom: 20px;">🏁</div>
                    <h1 style="font-size: 50px; color: #ffeb3b; margin: 0;">Dictation Dash</h1>
                    <p style="font-size: 20px; opacity: 0.8; margin: 10px 0 30px 0;">Listen and type as fast as you can. Accuracy is key!</p>
                    <button id="start-btn" style="padding: 20px 60px; font-size: 24px; font-weight: bold; background: #4CAF50; color: white; border: none; border-radius: 10px; cursor: pointer; transition: transform 0.2s;">START RACING</button>
                    <div style="margin-top: 20px; color: #ffeb3b;">3... 2... 1... GO!</div>
                </div>
            </div>
        `;

        this.container.querySelector('#start-btn').onclick = () => this.startGame();
        this.container.querySelector('#hear-btn').onclick = () => this.playSentence();

        const input = this.container.querySelector('#dash-input');
        input.oninput = (e) => this.handleInput(e);
    }

    setupScene() {
        // Track visual
        const trackGeo = new THREE.PlaneGeometry(10, 100);
        const trackMat = new THREE.MeshPhongMaterial({ color: 0x333333 });
        const track = new THREE.Mesh(trackGeo, trackMat);
        track.rotation.x = -Math.PI / 2;
        track.position.y = -2;
        this.threeHelper.scene.add(track);

        // Lines
        const lineGeo = new THREE.PlaneGeometry(0.2, 2);
        const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        for (let i = 0; i < 20; i++) {
            const line = new THREE.Mesh(lineGeo, lineMat);
            line.rotation.x = -Math.PI / 2;
            line.position.set(0, -1.95, -i * 5);
            this.threeHelper.scene.add(line);
        }

        this.threeHelper.camera.position.set(0, 1, 10);
        this.threeHelper.camera.lookAt(0, 0, -20);
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.loadLap();
    }

    loadLap() {
        if (this.currentLap >= this.totalLaps) {
            this.endGame();
            return;
        }

        this.container.querySelector('#lap-num').textContent = this.currentLap + 1;
        const input = this.container.querySelector('#dash-input');
        input.value = '';
        input.disabled = false;
        input.style.borderColor = '#ddd';
        this.container.querySelector('#progress-fill').style.width = '0%';
        this.container.querySelector('#needle').style.transform = 'rotate(-90deg)';

        setTimeout(() => this.playSentence(), 500);
    }

    playSentence() {
        const sentence = this.shuffled[this.currentLap];
        this.speak(sentence, { rate: 0.85 });

        const btn = this.container.querySelector('#hear-btn');
        btn.style.background = '#ff9800';
        setTimeout(() => btn.style.background = '#2196F3', 1000);
    }

    handleInput(e) {
        const value = e.target.value;
        const target = this.shuffled[this.currentLap];

        // Match progress
        let correctedValue = value;
        let matchCount = 0;
        for (let i = 0; i < Math.min(value.length, target.length); i++) {
            if (value[i].toLowerCase() === target[i].toLowerCase()) {
                matchCount++;
            } else {
                break;
            }
        }

        const percentage = (matchCount / target.length) * 100;
        this.container.querySelector('#progress-fill').style.width = `${percentage}%`;

        // Speedometer effect
        const angle = -90 + (percentage * 1.8); // -90 to 90
        this.container.querySelector('#needle').style.transform = `rotate(${angle}deg)`;

        // Check completion (case insensitive for flow, but can be strict)
        if (value.length >= target.length && value.toLowerCase() === target.toLowerCase()) {
            this.finishLap();
        }
    }

    finishLap() {
        const input = this.container.querySelector('#dash-input');
        input.disabled = true;
        input.style.borderColor = '#4CAF50';

        const feedback = this.container.querySelector('#feedback');
        feedback.style.opacity = 1;
        feedback.style.transform = 'scale(1.2)';

        this.score += 200;
        this.container.querySelector('#score-num').textContent = this.score;

        setTimeout(() => {
            feedback.style.opacity = 0;
            feedback.style.transform = 'scale(1)';
            this.currentLap++;
            this.loadLap();
        }, 1500);
    }

    endGame() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #111; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <h1 style="font-size: 60px; color: #ffeb3b;">Podium Finish! 🏆</h1>
                <p style="font-size: 32px; margin-top: -20px;">Race Points: ${this.score}</p>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; background: #ffeb3b; color: black; border: none; font-size: 20px; font-weight: 800; cursor: pointer; border-radius: 5px;">New Race</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; background: transparent; border: 2px solid white; color: white; font-size: 20px; font-weight: 800; cursor: pointer; border-radius: 5px;">Garage (Exit)</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new DictationDash(container, config);
}
