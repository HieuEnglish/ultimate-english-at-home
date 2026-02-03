
const { GameBase } = window.UEAH_GAME_ENGINE;

class BabyPianoGame extends GameBase {
    constructor(container, config) {
        super(container, config);
        this.ctx = null;
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
    }

    async init() {
        await this.init3D();

        this.container.innerHTML = `
            <div class="piano-wrapper">
                <h1 class="game-header">🎹 Baby Piano</h1>
                
                <div class="piano-container">
                    ${this.notes.map((n, i) => `
                        <div class="piano-key" data-index="${i}" style="--key-color: ${n.color}">
                            <div class="decoration" style="background: ${n.color}"></div>
                            <div class="key-label">${n.label}</div>
                            <div class="key-note">${n.note}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="hint-text">Tap keys or press 1-8</div>
            </div>
        `;

        this.injectStyles();
        this.bindEvents();
        this.showStartOverlay();
    }

    injectStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .piano-wrapper {
                height: 600px;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(180deg, #2d3436 0%, #000000 100%);
                font-family: 'Fredoka One', cursive, sans-serif;
                border-radius: 24px;
                overflow: hidden;
            }
            .game-header {
                color: white;
                margin-bottom: 40px;
                font-size: 42px;
                text-shadow: 0 4px 15px rgba(0,0,0,0.5);
            }
            .piano-container {
                display: flex;
                gap: 8px;
                padding: 20px;
                background: #1a1a1a;
                border-radius: 24px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.8), inset 0 2px 2px rgba(255,255,255,0.1);
            }
            .piano-key {
                width: 70px;
                height: 280px;
                background: white;
                border-radius: 0 0 15px 15px;
                position: relative;
                cursor: pointer;
                transition: all 0.1s;
                box-shadow: inset 0 -12px 0 rgba(0,0,0,0.1), 0 5px 15px rgba(0,0,0,0.3);
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                align-items: center;
                padding-bottom: 25px;
                user-select: none;
            }
            .piano-key:active, .piano-key.active {
                transform: translateY(8px);
                box-shadow: inset 0 -4px 0 rgba(0,0,0,0.1);
                background: #f0f0f0;
            }
            .key-label {
                font-size: 20px;
                font-weight: 800;
                color: #333;
            }
            .key-note {
                font-size: 13px;
                color: #999;
                margin-top: 4px;
            }
            .decoration {
                position: absolute;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                width: 25px;
                height: 25px;
                border-radius: 50%;
                opacity: 0.3;
                box-shadow: 0 0 10px currentColor;
            }
            .hint-text {
                color: #888;
                margin-top: 40px;
                font-size: 18px;
                letter-spacing: 1px;
            }
            
            /* Music Note Particles */
            .music-note-part {
                position: absolute;
                font-size: 40px;
                pointer-events: none;
                animation: noteFloat 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
                z-index: 100;
            }
            @keyframes noteFloat {
                0% { transform: translate(0, 0) scale(0.5); opacity: 0; }
                20% { opacity: 1; }
                100% { transform: translate(var(--dx), -150px) rotate(var(--dr)); opacity: 0; scale(1.5); }
            }
        `;
        this.container.appendChild(style);
    }

    initAudio() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    bindEvents() {
        const keys = this.container.querySelectorAll('.piano-key');

        const playHandler = (index) => {
            this.initAudio();
            const noteData = this.notes[index];
            const keyEl = keys[index];

            this.playNote(noteData.freq);
            this.animateKey(keyEl);
            this.spawnNote(keyEl, noteData.color);
        };

        keys.forEach((key, i) => {
            key.onmousedown = (e) => { e.preventDefault(); playHandler(i); };
            key.ontouchstart = (e) => { e.preventDefault(); playHandler(i); };
        });

        this.keyHandler = (e) => {
            const num = parseInt(e.key);
            if (num >= 1 && num <= 8) {
                playHandler(num - 1);
            }
        };
        document.addEventListener('keydown', this.keyHandler);
    }

    playNote(freq) {
        if (!this.ctx) return;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.8);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(this.ctx.currentTime + 0.8);
    }

    animateKey(key) {
        key.classList.add('active');
        setTimeout(() => key.classList.remove('active'), 150);
    }

    spawnNote(key, color) {
        const rect = key.getBoundingClientRect();
        const note = document.createElement('div');
        note.className = 'music-note-part';
        note.textContent = ['🎵', '🎶', '🎼'][Math.floor(Math.random() * 3)];
        note.style.left = (rect.left + rect.width / 2 - 20) + 'px';
        note.style.top = (rect.top - 20) + 'px';
        note.style.color = color;
        note.style.setProperty('--dx', (Math.random() - 0.5) * 100 + 'px');
        note.style.setProperty('--dr', (Math.random() - 0.5) * 90 + 'deg');

        document.body.appendChild(note);
        setTimeout(() => note.remove(), 1200);
    }

    cleanup() {
        if (this.ctx) {
            this.ctx.close();
        }
        document.removeEventListener('keydown', this.keyHandler);
    }
}

export function createGame(container, config) {
    return new BabyPianoGame(container, config);
}
