/* assets/js/games/11-12/lyric-listener.js */
const { GameBase } = window.UEAH_GAME_ENGINE;

class LyricListener extends GameBase {
    async init() {
        await this.init3D();

        this.questions = [
            { lyric: "I'm walking on sunshine, whoa!", missing: "sunshine", sentence: "I'm walking on ________, whoa!" },
            { lyric: "Under the umbrella, ella, ella.", missing: "umbrella", sentence: "Under the ________, ella, ella." },
            { lyric: "A million dreams are keeping me awake.", missing: "dreams", sentence: "A million ________ are keeping me awake." },
            { lyric: "Can't stop the feeling!", missing: "feeling", sentence: "Can't stop the ________!" },
            { lyric: "Let it go, let it go!", missing: "go", sentence: "Let it ________, let it ________!" },
            { lyric: "It's a beautiful day.", missing: "beautiful", sentence: "It's a ________ day." },
            { lyric: "I believe I can fly.", missing: "fly", sentence: "I believe I can ________." },
            { lyric: "Roar louder than a lion.", missing: "louder", sentence: "Roar ________ than a lion." },
            { lyric: "Count your stars, not your shadows.", missing: "stars", sentence: "Count your ________, not your shadows." },
            { lyric: "The fire in my heart is burning.", missing: "burning", sentence: "The fire in my heart is ________." },
            { lyric: "You are my sunshine, my only sunshine.", missing: "sunshine", sentence: "You are my ________, my only ________." },
            { lyric: "Somewhere over the rainbow.", missing: "rainbow", sentence: "Somewhere over the ________." },
            { lyric: "We are the champions, my friends.", missing: "champions", sentence: "We are the ________, my friends." },
            { lyric: "Don't worry about a thing.", missing: "worry", sentence: "Don't ________ about a thing." },
            { lyric: "Every little thing gonna be alright.", missing: "alright", sentence: "Every little thing gonna be ________." },
            { lyric: "You've got a friend in me.", missing: "friend", sentence: "You've got a ________ in me." }
        ];

        this.currentQ = 0;
        this.score = 0;
        this.shuffled = this.shuffle([...this.questions]).slice(0, 10);

        this.setupUI();
        this.setupScene();
    }

    setupUI() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: linear-gradient(135deg, #1e3c72, #2a5298); color: white; font-family: 'Poppins', sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; overflow: hidden;">
                <!-- Stage Header -->
                <div style="position: absolute; top: 20px; width: 90%; display: flex; justify-content: space-between; align-items: center; z-index: 10;">
                    <div style="font-size: 28px; font-weight: 800; text-shadow: 0 0 15px #00d2ff;">🎤 Lyric Listener</div>
                    <div style="background: rgba(0,0,0,0.3); padding: 10px 20px; border-radius: 20px; font-size: 20px;">Score: <span id="score-val">0</span></div>
                </div>

                <!-- Lyric Card -->
                <div id="lyric-card" style="background: rgba(255, 255, 255, 0.1); backdrop-filter: blur(10px); padding: 40px; border-radius: 30px; border: 1px solid rgba(255,255,255,0.2); width: 80%; max-width: 600px; text-align: center; box-shadow: 0 20px 50px rgba(0,0,0,0.3); z-index: 10; display: none;">
                    <div style="margin-bottom: 30px;">
                        <button id="play-btn" style="width: 80px; height: 80px; border-radius: 50%; border: none; background: #00d2ff; color: white; cursor: pointer; font-size: 32px; box-shadow: 0 0 20px rgba(0,210,255,0.5); transition: transform 0.2s;">▶️</button>
                        <p style="margin-top: 10px; opacity: 0.8; font-size: 14px;">(Click to Hear Lyric)</p>
                    </div>

                    <h2 id="sentence-display" style="font-size: 32px; margin-bottom: 30px; letter-spacing: 1px;">...</h2>

                    <div style="display: flex; gap: 10px; justify-content: center; align-items: center;">
                        <input type="text" id="lyric-input" autocomplete="off" placeholder="Type the missing word..." style="padding: 15px 25px; border-radius: 30px; border: none; background: rgba(255,255,255,0.9); color: #333; font-size: 18px; width: 60%; outline: none; box-shadow: 0 5px 15px rgba(0,0,0,0.1);">
                        <button id="submit-btn" style="padding: 15px 30px; border-radius: 30px; border: none; background: #ff007b; color: white; font-weight: bold; cursor: pointer; font-size: 18px; transition: background 0.2s;">CHECK</button>
                    </div>
                </div>

                <!-- Feedback -->
                <div id="feedback-msg" style="position: fixed; bottom: 100px; font-size: 24px; font-weight: bold; opacity: 0; transition: opacity 0.3s; z-index: 10;"></div>

                <!-- Start Overlay -->
                <div id="start-overlay" style="position: absolute; inset: 0; background: rgba(0,0,0,0.8); z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                    <div style="font-size: 100px; margin-bottom: 20px;">🎵</div>
                    <h1 style="font-size: 48px; margin: 0 0 20px 0;">Lyric Listener</h1>
                    <p style="font-size: 20px; max-width: 500px; margin: 0 0 40px 0; opacity: 0.9;">Listen to the melodies and fill in the missing words. Let the rhythm guide you!</p>
                    <button id="start-btn" style="padding: 18px 50px; border-radius: 50px; background: #00d2ff; color: white; border: none; font-size: 24px; font-weight: 800; cursor: pointer; box-shadow: 0 10px 30px rgba(0,210,255,0.3);">ENTER STAGE</button>
                </div>
            </div>
            <style>
                #play-btn:active { transform: scale(0.9); }
                #submit-btn:hover { background: #ff2a9b; }
            </style>
        `;

        this.container.querySelector('#start-btn').onclick = () => this.startGame();
        this.container.querySelector('#play-btn').onclick = () => this.playLyric();
        this.container.querySelector('#submit-btn').onclick = () => this.checkInput();
        this.container.querySelector('#lyric-input').onkeypress = (e) => {
            if (e.key === 'Enter') this.checkInput();
        };
    }

    setupScene() {
        // Musical stage visuals
        const lightGeo = new THREE.CylinderGeometry(0.5, 2, 20, 32);
        const lightMat = new THREE.MeshBasicMaterial({ color: 0x00d2ff, transparent: true, opacity: 0.2 });

        for (let i = 0; i < 3; i++) {
            const cone = new THREE.Mesh(lightGeo, lightMat);
            cone.position.set((i - 1) * 5, 0, -5);
            cone.rotation.x = Math.PI / 1.1;
            this.threeHelper.scene.add(cone);
        }

        // Add musical notes floating
        const noteGeo = new THREE.TorusGeometry(0.5, 0.1, 8, 20);
        const noteMat = new THREE.MeshNormalMaterial({ wireframe: true });
        this.threeHelper.addFloatingObject(noteGeo, noteMat, 8);
    }

    startGame() {
        this.container.querySelector('#start-overlay').style.display = 'none';
        this.container.querySelector('#lyric-card').style.display = 'block';
        this.loadQuestion();
    }

    loadQuestion() {
        if (this.currentQ >= this.shuffled.length) {
            this.endGame();
            return;
        }

        const q = this.shuffled[this.currentQ];
        this.container.querySelector('#sentence-display').textContent = q.sentence;
        this.container.querySelector('#lyric-input').value = '';
        this.container.querySelector('#lyric-input').focus();
        this.container.querySelector('#submit-btn').disabled = false;

        // Auto play on load (optional, but good for listening games)
        setTimeout(() => this.playLyric(), 500);
    }

    playLyric() {
        const q = this.shuffled[this.currentQ];
        this.speak(q.lyric, { rate: 0.8, pitch: 1.1 });

        const btn = this.container.querySelector('#play-btn');
        btn.textContent = '🔊';
        setTimeout(() => btn.textContent = '▶️', 1000);
    }

    checkInput() {
        const input = this.container.querySelector('#lyric-input').value.trim().toLowerCase();
        const correct = this.shuffled[this.currentQ].missing.toLowerCase();
        const feedback = this.container.querySelector('#feedback-msg');

        if (!input) return;

        if (input === correct) {
            this.score += 100;
            this.container.querySelector('#score-val').textContent = this.score;
            feedback.textContent = "✨ Correct! You're a star!";
            feedback.style.color = "#00ff88";
            this.container.querySelector('#submit-btn').disabled = true;

            setTimeout(() => {
                feedback.style.opacity = 0;
                this.currentQ++;
                this.loadQuestion();
            }, 1500);
        } else {
            feedback.textContent = "❌ Oops! Listen again!";
            feedback.style.color = "#ff4d4d";
            // Shake effect
            const card = this.container.querySelector('#lyric-card');
            card.style.transform = 'translateX(10px)';
            setTimeout(() => card.style.transform = 'translateX(-10px)', 50);
            setTimeout(() => card.style.transform = 'translateX(0)', 100);
        }

        feedback.style.opacity = 1;
    }

    endGame() {
        this.container.innerHTML = `
            <div style="position: absolute; inset: 0; background: #121212; color: white; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <h1 style="font-size: 60px; color: #ff007b;">Full House! 🏟️</h1>
                <p style="font-size: 32px; margin-top: -20px;">Total Score: ${this.score}</p>
                <div style="margin-top: 40px; display: flex; gap: 20px;">
                    <button onclick="location.reload()" style="padding: 15px 40px; border-radius: 30px; background: #00d2ff; color: white; border: none; font-size: 20px; font-weight: 800; cursor: pointer;">Play Again</button>
                    <button onclick="window.history.back()" style="padding: 15px 40px; border-radius: 30px; background: transparent; border: 2px solid white; color: white; font-size: 20px; font-weight: 800; cursor: pointer;">Exit</button>
                </div>
            </div>
        `;
    }

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}

export function createGame(container, config) {
    return new LyricListener(container, config);
}
