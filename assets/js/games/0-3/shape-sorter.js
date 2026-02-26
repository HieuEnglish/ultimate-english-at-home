/* assets/js/games/0-3/shape-sorter.js
   Shape Sorter - Ages 0-3
   
   Match shapes to their holes.
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SHAPES = [
    { name: "Circle", emoji: "🔴", cssShape: "border-radius: 50%;", color: "#ff7675" },
    { name: "Square", emoji: "🟥", cssShape: "border-radius: 10px;", color: "#0984e3" },
    { name: "Triangle", emoji: "🔺", cssShape: "clip-path: polygon(50% 0%, 0% 100%, 100% 100%);", color: "#fdcb6e" },
    { name: "Star", emoji: "⭐", cssShape: "clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);", color: "#ffeaa7" },
    { name: "Heart", emoji: "❤️", cssShape: "clip-path: path('M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z'); transform: scale(3);", color: "#e17055" }, // SVG path for simplicity or emoji
];

// Simplified SHAPES using svgs/emojis directly to avoid complex CSS clip-paths issues on simple implementation
const SHAPES_SIMPLE = [
    { name: "Circle", icon: "⚫", match: "🔴", color: "#ff7675" },
    { name: "Square", icon: "⬛", match: "🟥", color: "#0984e3" },
    { name: "Triangle", icon: "📐", match: "🔺", color: "#fdcb6e" },
    { name: "Star", icon: "⭐", match: "⭐", color: "#ffeaa7" },
    { name: "Heart", icon: "❤️", match: "❤️", color: "#e17055" },
    { name: "Diamond", icon: "💠", match: "💎", color: "#00cec9" },
    { name: "Moon", icon: "🌙", match: "🌙", color: "#a29bfe" },
    { name: "Sun", icon: "☀️", match: "☀️", color: "#ff9f43" },
    { name: "Cloud", icon: "☁️", match: "☁️", color: "#74b9ff" },
    { name: "Flower", icon: "🌸", match: "🌸", color: "#fd79a8" },
];

class ShapeSorterGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.currentShape = null;
        this.options = [];
        this.rounds = 0;
        this.maxRounds = 8;
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="game-wrapper">
                <div class="bg-shapes"></div>
                
                <div class="main-content">
                    <div class="header">
                         <div class="score-pill">⭐ <span id="score-val">0</span></div>
                    </div>

                    <div class="hole-container">
                        <div class="hole-label">Hole</div>
                        <div class="shape-hole" id="target-hole"></div>
                    </div>

                    <div class="arrow-down">⬇️</div>

                    <div class="options-container" id="shape-options"></div>
                    
                    <div class="instruction-box">
                        <span id="instruction-text">Match the shape!</span>
                        <button class="speak-btn" id="hear-btn">🔊</button>
                    </div>
                </div>

                <div class="celebration" id="celebration">
                    <span class="celeb-emoji" id="celeb-emoji">🌟</span>
                </div>
            </div>
        `;

        this.injectStyles();
        this.showStartOverlay();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .game-wrapper {
                position: relative;
                width: 100%;
                height: 600px;
                overflow: hidden;
                border-radius: 24px;
                background: linear-gradient(135deg, #74b9ff 0%, #a29bfe 100%);
                font-family: 'Fredoka One', cursive, sans-serif;
            }
            .bg-shapes {
                position: absolute;
                inset: 0;
                opacity: 0.2;
                background-image: radial-gradient(#ffffff 2px, transparent 2px);
                background-size: 30px 30px;
            }
            .main-content {
                position: relative;
                z-index: 2;
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 20px;
            }
            .header {
                width: 100%;
                display: flex;
                justify-content: flex-end;
            }
            .score-pill {
                background: rgba(0,0,0,0.2);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                font-weight: bold;
            }
            
            .hole-container {
                margin-top: 20px;
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            .hole-label {
                color: rgba(255,255,255,0.8);
                margin-bottom: 5px;
                text-transform: uppercase;
                letter-spacing: 2px;
            }
            .shape-hole {
                width: 150px;
                height: 150px;
                background: rgba(0,0,0,0.3);
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 100px;
                filter: brightness(0); /* Make emoji black silhouette */
                opacity: 0.6;
                border: 4px dashed rgba(255,255,255,0.5);
                transition: transform 0.3s;
            }
            
            .arrow-down {
                font-size: 40px;
                margin: 20px 0;
                animation: bounce 2s infinite;
                color: white;
            }
            
            .options-container {
                display: flex;
                gap: 20px;
                justify-content: center;
            }
            .shape-option {
                width: 100px;
                height: 100px;
                font-size: 70px;
                background: white;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                box-shadow: 0 10px 0 rgba(0,0,0,0.1);
                border-bottom: 4px solid #ddd;
                transition: transform 0.2s;
            }
            .shape-option:active { transform: translateY(4px); box-shadow: 0 6px 0 rgba(0,0,0,0.1); }
            
            .shape-option.correct {
                background: #55efc4;
                animation: pulse 0.5s;
            }
            .shape-option.wrong {
                background: #ff7675;
                animation: shake 0.5s;
            }
            
            .instruction-box {
                margin-top: auto;
                background: white;
                padding: 15px 30px;
                border-radius: 50px;
                display: flex;
                align-items: center;
                gap: 15px;
                box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            }
            #instruction-text {
                font-size: 24px;
                color: #2d3436;
            }
            .speak-btn {
                background: #fdcb6e;
                border: none;
                width: 40px;
                height: 40px;
                border-radius: 50%;
                cursor: pointer;
                font-size: 20px;
            }
            
            .celebration {
                position: absolute;
                inset: 0;
                background: rgba(255,255,255,0.9);
                display: flex;
                align-items: center;
                justify-content: center;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s;
                z-index: 100;
            }
            .celebration.visible { opacity: 1; pointer-events: auto; }
            .celeb-emoji { font-size: 150px; animation: spin 2s infinite linear; }
            
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px); } }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
            @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
            @keyframes spin { 100% { transform: rotate(360deg); } }
        `;
        this.container.appendChild(style);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.score = 0;

        // Add 3D shapes
        const geometry = new THREE.TorusGeometry(1, 0.4, 16, 100);
        const material = new THREE.MeshNormalMaterial();
        this.threeHelper.addFloatingObject(geometry, material, 5);

        this.nextRound();

        document.getElementById('hear-btn').onclick = () => this.speakInstruction();
    }

    nextRound() {
        if (this.rounds >= this.maxRounds) {
            this.end();
            return;
        }

        this.rounds++;

        const shuffled = [...SHAPES_SIMPLE].sort(() => Math.random() - 0.5);
        this.currentShape = shuffled[0];
        this.options = shuffled.slice(0, 3).sort(() => Math.random() - 0.5);

        this.renderRound();
        setTimeout(() => this.speakInstruction(), 500);
    }

    renderRound() {
        const hole = document.getElementById('target-hole');
        const optionsDiv = document.getElementById('shape-options');
        const text = document.getElementById('instruction-text');

        // Show silhouette of the match in the hole
        hole.textContent = this.currentShape.match;
        text.textContent = `Find the ${this.currentShape.name}`;

        optionsDiv.innerHTML = this.options.map(shape => `
            <div class="shape-option" data-name="${shape.name}">
                ${shape.match}
            </div>
        `).join('');

        optionsDiv.querySelectorAll('.shape-option').forEach(opt => {
            opt.onclick = () => this.handlePick(opt);
        });
    }

    speakInstruction() {
        this.speak(`Put the ${this.currentShape.name} in the hole!`);
    }

    handlePick(opt) {
        const name = opt.dataset.name;

        if (name === this.currentShape.name) {
            // Correct
            opt.classList.add('correct');
            this.addScore(100);
            document.getElementById('score-val').textContent = this.score;
            document.getElementById('target-hole').style.filter = 'none'; // Reveal color
            document.getElementById('target-hole').style.opacity = '1';

            this.speak("Good job!");
            this.confetti.explode(null, null, 10);

            setTimeout(() => this.nextRound(), 1500);
        } else {
            // Wrong
            opt.classList.add('wrong');
            this.speak("Not that one!");
        }
    }

    end() {
        this.showResults(this.saveScore());
    }
}

export function createGame(container, config) {
    return new ShapeSorterGame(container, config);
}
