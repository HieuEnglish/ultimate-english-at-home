
const { GameBase } = window.UEAH_GAME_ENGINE;

class AnimalDanceGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.animals = [
            { id: 'dog', emoji: '🐶', name: 'Dog', dance: 'bounce' },
            { id: 'cat', emoji: '🐱', name: 'Cat', dance: 'spin' },
            { id: 'cow', emoji: '🐮', name: 'Cow', dance: 'wobble' },
            { id: 'duck', emoji: '🦆', name: 'Duck', dance: 'jump' },
            { id: 'pig', emoji: '🐷', name: 'Pig', dance: 'shake' },
            { id: 'lion', emoji: '🦁', name: 'Lion', dance: 'pulse' },
            { id: 'frog', emoji: '🐸', name: 'Frog', dance: 'bounce' },
            { id: 'monkey', emoji: '🐒', name: 'Monkey', dance: 'wobble' },
            { id: 'penguin', emoji: '🐧', name: 'Penguin', dance: 'wobble' },
            { id: 'bear', emoji: '🐻', name: 'Bear', dance: 'stomp' },
            { id: 'bunny', emoji: '🐰', name: 'Bunny', dance: 'jump' },
            { id: 'elephant', emoji: '🐘', name: 'Elephant', dance: 'stomp' },
        ];
    }

    async init() {
        await this.init3D(); // Keep standard engine pattern

        this.container.innerHTML = `
            <div class="animal-dance-wrapper">
                <h1 class="game-header">Animal Dance Party! 💃</h1>

                <div class="dance-floor" id="dance-floor">
                    ${this.animals.map(a => `
                        <div class="animal-card" data-id="${a.id}" data-dance="${a.dance}">
                            <div class="animal-emoji">${a.emoji}</div>
                            <div class="animal-name">${a.name}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="controls">
                    <button class="action-btn stop-btn" id="stop-btn">🛑 STOP</button>
                    <button class="action-btn party-btn" id="party-btn">🎉 PARTY TIME!</button>
                </div>
            </div>
        `;

        this.injectStyles();
        this.bindEvents();
        this.showStartOverlay();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .animal-dance-wrapper {
                height: 600px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #FF9A8B 0%, #FF6A88 55%, #FF99AC 100%);
                font-family: 'Fredoka One', cursive, sans-serif;
                border-radius: 24px;
                position: relative;
                overflow: hidden;
            }
            .game-header {
                color: white;
                text-shadow: 0 4px 10px rgba(0,0,0,0.2);
                margin-bottom: 25px;
                font-size: 36px;
                z-index: 2;
            }
            .dance-floor {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 15px;
                margin-bottom: 30px;
                z-index: 2;
            }
            .animal-card {
                background: rgba(255,255,255,0.9);
                backdrop-filter: blur(5px);
                border-radius: 20px;
                padding: 15px;
                font-size: 55px;
                cursor: pointer;
                box-shadow: 0 8px 0 rgba(0,0,0,0.1);
                transition: transform 0.2s, background 0.3s;
                display: flex;
                flex-direction: column;
                align-items: center;
                user-select: none;
                border: 2px solid white;
            }
            .animal-card:active { transform: translateY(4px); box-shadow: 0 4px 0 rgba(0,0,0,0.1); }
            .animal-name {
                font-size: 18px;
                margin-top: 8px;
                color: #555;
                font-weight: 800;
            }
            
            .controls {
                display: flex;
                gap: 15px;
                z-index: 2;
            }
            .action-btn {
                padding: 12px 30px;
                font-size: 20px;
                border: none;
                border-radius: 50px;
                background: #fff;
                color: #ff4081;
                font-weight: 800;
                cursor: pointer;
                box-shadow: 0 6px 0 #ddd;
                transition: all 0.2s;
            }
            .action-btn:active { transform: translateY(4px); box-shadow: 0 2px 0 #ddd; }
            .party-btn { background: #fee440; color: #333; box-shadow: 0 6px 0 #d4bc1c; }
            .party-btn:active { box-shadow: 0 2px 0 #d4bc1c; }

            /* Animations */
            @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
            @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
            @keyframes wobble { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(15deg); } }
            @keyframes jump { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
            @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 75% { transform: translateX(10px); } }
            @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.15); } 100% { transform: scale(1); } }

            .dancing.bounce .animal-emoji { animation: bounce 0.6s infinite; }
            .dancing.spin .animal-emoji { animation: spin 1s infinite; }
            .dancing.wobble .animal-emoji { animation: wobble 0.5s infinite; }
            .dancing.jump .animal-emoji { animation: jump 0.6s infinite; }
            .dancing.shake .animal-emoji { animation: shake 0.4s infinite; }
            .dancing.pulse .animal-emoji { animation: pulse 0.8s infinite; }

            /* New action animations */
            .action-stomp { animation: stomp 0.5s infinite; }
            .action-stretch { animation: stretch 1.2s infinite ease-in-out; }
            .action-shake { animation: shake 0.4s infinite; }
            .action-wiggle { animation: wiggle 0.6s infinite; }
            .action-march { animation: march 0.8s infinite; }
            .action-fly { animation: fly 1s infinite ease-in-out; }

            @keyframes stomp { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(10px) scale(1.1); } }
            @keyframes stretch { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(1.3); } }
            @keyframes wiggle { 0%, 100% { transform: rotate(0); } 25% { transform: rotate(-15deg); } 75% { transform: rotate(15deg); } }
            @keyframes march { 0%, 100% { transform: translateY(0) rotate(0); } 25% { transform: translateY(-10px) rotate(-5deg); } 75% { transform: translateY(-10px) rotate(5deg); } }
            @keyframes fly { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-40px) scale(1.1); } }

            .dancing.stomp .animal-emoji { animation: stomp 0.5s infinite; }
            .dancing.stretch .animal-emoji { animation: stretch 1.2s infinite ease-in-out; }
            .dancing.wiggle .animal-emoji { animation: wiggle 0.6s infinite; }
            .dancing.march .animal-emoji { animation: march 0.8s infinite; }
            .dancing.fly .animal-emoji { animation: fly 1s infinite ease-in-out; }
        `;
        this.container.appendChild(style);
    }

    bindEvents() {
        const cards = this.container.querySelectorAll('.animal-card');

        cards.forEach(card => {
            card.onclick = () => {
                this.toggleDance(card);
                this.speak(card.dataset.id);
            };
        });

        this.container.querySelector('#party-btn').onclick = () => {
            cards.forEach(card => {
                card.classList.add('dancing');
                card.classList.add(card.dataset.dance);
            });
            this.speak("Party Time!");
            this.confetti.explode();
        };

        this.container.querySelector('#stop-btn').onclick = () => {
            cards.forEach(card => {
                card.classList.remove('dancing');
                card.classList.remove(card.dataset.dance);
            });
            this.speak("Stop!");
        };
    }

    toggleDance(card) {
        if (card.classList.contains('dancing')) {
            card.classList.remove('dancing');
            card.classList.remove(card.dataset.dance);
        } else {
            card.classList.add('dancing');
            card.classList.add(card.dataset.dance);
        }
    }
}

export function createGame(container, config) {
    return new AnimalDanceGame(container, config);
}
