
const { GameBase } = window.UEAH_GAME_ENGINE;

class BabyPianoGame extends GameBase {
    init() {
        super.init();

        this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        this.notes = [
            { note: 'C', freq: 261.63, color: '#FF5252', label: 'Do' },
            { note: 'D', freq: 293.66, color: '#FF9800', label: 'Re' },
            { note: 'E', freq: 329.63, color: '#FFEB3B', label: 'Mi' },
            { note: 'F', freq: 349.23, color: '#4CAF50', label: 'Fa' },
            { note: 'G', freq: 392.00, color: '#2196F3', label: 'Sol' },
            { note: 'A', freq: 440.00, color: '#9C27B0', label: 'La' },
            { note: 'B', freq: 493.88, color: '#E040FB', label: 'Ti' },
            { note: 'C2', freq: 523.25, color: '#FF5252', label: 'Do' }
        ];

        this.container.innerHTML = `
            <div class="piano-wrapper">
                <style>
                    .piano-wrapper {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        background: linear-gradient(180deg, #333 0%, #1a1a1a 100%);
                        font-family: 'Segoe UI', sans-serif;
                    }
                    .piano-container {
                        display: flex;
                        gap: 10px;
                        padding: 20px;
                        background: #444;
                        border-radius: 20px;
                        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
                    }
                    .piano-key {
                        width: 80px;
                        height: 300px;
                        background: white;
                        border-radius: 0 0 15px 15px;
                        position: relative;
                        cursor: pointer;
                        transition: all 0.1s;
                        box-shadow: inset 0 -10px 0 rgba(0,0,0,0.1);
                        display: flex;
                        flex-direction: column;
                        justify-content: flex-end;
                        align-items: center;
                        padding-bottom: 30px;
                        user-select: none;
                    }
                    .piano-key:active, .piano-key.active {
                        transform: translateY(5px);
                        box-shadow: inset 0 -5px 0 rgba(0,0,0,0.1);
                        background: #eee;
                    }
                    .key-label {
                        font-size: 24px;
                        font-weight: bold;
                        color: #555;
                    }
                    .key-note {
                        font-size: 14px;
                        color: #999;
                        margin-top: 5px;
                    }
                    .decoration {
                        position: absolute;
                        top: 20px;
                        left: 50%;
                        transform: translateX(-50%);
                        width: 30px;
                        height: 30px;
                        border-radius: 50%;
                        background: var(--key-color);
                        opacity: 0.2;
                    }
                    h1 { color: white; margin-bottom: 40px; text-shadow: 0 2px 10px rgba(0,0,0,0.5); }
                    
                    /* Note particle */
                    .music-note {
                        position: absolute;
                        font-size: 40px;
                        color: white;
                        pointer-events: none;
                        animation: floatUp 1s forwards;
                        text-shadow: 0 0 10px var(--color);
                    }
                    @keyframes floatUp {
                        0% { transform: translateY(0) scale(0.5); opacity: 0; }
                        50% { opacity: 1; transform: translateY(-50px) scale(1.2); }
                        100% { transform: translateY(-100px) scale(1); opacity: 0; }
                    }
                </style>
                
                <h1>🎹 Baby Piano</h1>
                
                <div class="piano-container">
                    ${this.notes.map((n, i) => `
                        <div class="piano-key" data-index="${i}" style="--key-color: ${n.color}">
                            <div class="decoration"></div>
                            <div class="key-label">${n.label}</div>
                            <div class="key-note">${n.note}</div>
                        </div>
                    `).join('')}
                </div>
                
                <p style="color: #888; margin-top: 30px;">Tap keys or use number keys 1-8</p>
            </div>
        `;

        this.bindEvents();
    }

    bindEvents() {
        const keys = this.container.querySelectorAll('.piano-key');

        keys.forEach(key => {
            const index = parseInt(key.dataset.index);
            const noteData = this.notes[index];

            // Mouse/Touch events
            const play = (e) => {
                e.preventDefault();
                this.playNote(noteData.freq, noteData.color);
                this.animateKey(key);
                this.spawnNote(key, noteData.color);
            };

            key.addEventListener('mousedown', play);
            key.addEventListener('touchstart', play);
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            const num = parseInt(e.key);
            if (num >= 1 && num <= 8) {
                const index = num - 1;
                const key = keys[index];
                if (key) {
                    const noteData = this.notes[index];
                    this.playNote(noteData.freq, noteData.color);
                    this.animateKey(key);
                    this.spawnNote(key, noteData.color);
                }
            }
        });
    }

    playNote(freq, color) {
        if (!this.ctx) return;

        // Simple oscillator
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.5, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 1);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 1);
    }

    animateKey(key) {
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 100);
    }

    spawnNote(key, color) {
        const rect = key.getBoundingClientRect();
        const note = document.createElement('div');
        note.className = 'music-note';
        note.textContent = '🎵';
        note.style.left = (rect.left + rect.width / 2 - 20) + 'px';
        note.style.top = (rect.top - 20) + 'px';
        note.style.setProperty('--color', color);

        document.body.appendChild(note); // Append to body to float freely
        setTimeout(() => note.remove(), 1000);
    }
}

export function createGame(container, config) {
    return new BabyPianoGame(container, config);
}
