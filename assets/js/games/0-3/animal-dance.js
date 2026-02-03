
const { GameBase } = window.UEAH_GAME_ENGINE;

class AnimalDanceGame extends GameBase {
    init() {
        super.init();
        this.animals = [
            { id: 'dog', emoji: '🐶', name: 'Dog', dance: 'bounce' },
            { id: 'cat', emoji: '🐱', name: 'Cat', dance: 'spin' },
            { id: 'cow', emoji: '🐮', name: 'Cow', dance: 'wobble' },
            { id: 'duck', emoji: '🦆', name: 'Duck', dance: 'jump' },
            { id: 'pig', emoji: '🐷', name: 'Pig', dance: 'shake' },
            { id: 'lion', emoji: '🦁', name: 'Lion', dance: 'pulse' }
        ];

        this.container.innerHTML = `
            <div class="animal-dance-wrapper">
                <style>
                    .animal-dance-wrapper {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(135deg, #fce043 0%, #fb7ba2 100%);
                        font-family: 'Comic Sans MS', cursive, sans-serif;
                    }
                    .dance-floor {
                        display: grid;
                        grid-template-columns: repeat(3, 1fr);
                        gap: 20px;
                        margin-bottom: 30px;
                    }
                    .animal-card {
                        background: white;
                        border-radius: 20px;
                        padding: 20px;
                        font-size: 60px;
                        cursor: pointer;
                        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                        transition: transform 0.2s;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        user-select: none;
                    }
                    .animal-card:active { transform: scale(0.9); }
                    .animal-name {
                        font-size: 20px;
                        margin-top: 10px;
                        color: #555;
                        font-weight: bold;
                    }
                    
                    .controls {
                        display: flex;
                        gap: 20px;
                    }
                    .action-btn {
                        padding: 15px 30px;
                        font-size: 24px;
                        border: none;
                        border-radius: 50px;
                        background: #fff;
                        color: #ff4081;
                        font-weight: bold;
                        cursor: pointer;
                        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                        transition: all 0.2s;
                    }
                    .action-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,0.2); }
                    .action-btn:active { transform: translateY(1px); }

                    /* Animations */
                    @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-30px); } }
                    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
                    @keyframes wobble { 0%, 100% { transform: rotate(0deg); } 25% { transform: rotate(-20deg); } 75% { transform: rotate(20deg); } }
                    @keyframes jump { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.4); } }
                    @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-15px); } 75% { transform: translateX(15px); } }
                    @keyframes pulse { 0% { transform: scale(1); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }

                    .dancing.bounce .animal-emoji { animation: bounce 0.6s infinite; }
                    .dancing.spin .animal-emoji { animation: spin 1s infinite; }
                    .dancing.wobble .animal-emoji { animation: wobble 0.5s infinite; }
                    .dancing.jump .animal-emoji { animation: jump 0.6s infinite; }
                    .dancing.shake .animal-emoji { animation: shake 0.4s infinite; }
                    .dancing.pulse .animal-emoji { animation: pulse 0.8s infinite; }
                </style>

                <h1 style="color: white; text-shadow: 2px 2px 0 rgba(0,0,0,0.2); margin-bottom: 30px; font-size: 40px;">Animal Dance Party! 💃</h1>

                <div class="dance-floor">
                    ${this.animals.map(a => `
                        <div class="animal-card" data-id="${a.id}" data-dance="${a.dance}">
                            <div class="animal-emoji">${a.emoji}</div>
                            <div class="animal-name">${a.name}</div>
                        </div>
                    `).join('')}
                </div>

                <div class="controls">
                    <button class="action-btn" id="stop-btn">🛑 Stop</button>
                    <button class="action-btn" id="party-btn">🎉 PARTY TIME!</button>
                </div>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const cards = this.container.querySelectorAll('.animal-card');

        cards.forEach(card => {
            card.addEventListener('click', () => {
                this.toggleDance(card);
                this.playSound(card.querySelector('.animal-name').textContent);
            });
        });

        this.container.querySelector('#party-btn').addEventListener('click', () => {
            cards.forEach(card => {
                card.classList.add('dancing');
                card.classList.add(card.dataset.dance);
            });
            this.speak("Party Time!");
            this.confetti();
        });

        this.container.querySelector('#stop-btn').addEventListener('click', () => {
            cards.forEach(card => {
                card.classList.remove('dancing');
                card.classList.remove(card.dataset.dance);
            });
            this.speak("Stop!");
        });
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

    playSound(text) {
        // Simple speech synthesis for now
        this.speak(text);
    }

    speak(text) {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 1;
            utterance.pitch = 1.2;
            window.speechSynthesis.speak(utterance);
        }
    }

    confetti() {
        // Simple particle burst
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.textContent = ['✨', '🎵', '⭐', '🎈'][Math.floor(Math.random() * 4)];
            p.style.position = 'absolute';
            p.style.left = '50%';
            p.style.top = '50%';
            p.style.fontSize = '30px';
            p.style.pointerEvents = 'none';
            p.style.transition = 'all 1s ease-out';
            this.container.appendChild(p);

            const angle = Math.random() * Math.PI * 2;
            const dist = 100 + Math.random() * 200;

            setTimeout(() => {
                p.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
                p.style.opacity = '0';
            }, 50);

            setTimeout(() => p.remove(), 1000);
        }
    }
}

export function createGame(container, config) {
    return new AnimalDanceGame(container, config);
}
