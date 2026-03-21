/* assets/js/games/13-18/pronunciation-pro.js
   Pronunciation Pro - Ages 13-18
   
   Advanced speaking game with microphone!
   Practice pronunciation using speech recognition.
*/

const { GameBase, Animations } = window.UEAH_GAME_ENGINE;

// Words and phrases for pronunciation practice
const PRONUNCIATION_CHALLENGES = [
    { text: "thoroughly", difficulty: 3, tip: "THUR-oh-lee" },
    { text: "phenomenon", difficulty: 3, tip: "fuh-NOM-uh-non" },
    { text: "particularly", difficulty: 2, tip: "par-TIK-yuh-lar-lee" },
    { text: "entrepreneur", difficulty: 3, tip: "on-truh-pruh-NUR" },
    { text: "specifically", difficulty: 2, tip: "spuh-SIF-ik-lee" },
    { text: "The weather is wonderful today", difficulty: 2, tip: "Speak clearly and naturally" },
    { text: "World", difficulty: 2, tip: "Curl your tongue for 'r'" },
    { text: "Squirrel", difficulty: 3, tip: "SKWUR-uhl" },
    { text: "I would have gone if I had known", difficulty: 3, tip: "Would've, not would of" },
    { text: "She sells seashells by the seashore", difficulty: 3, tip: "Tongue twister! Go slow" },
    { text: "comfortable", difficulty: 2, tip: "KUMF-ter-buhl (3 syllables)" },
    { text: "February", difficulty: 2, tip: "FEB-roo-air-ee" },
    { text: "How much wood would a woodchuck chuck", difficulty: 3, tip: "Tongue twister! Emphasize each word" },
    { text: "Colonel", difficulty: 3, tip: "KER-nuhl (silent 'o' and 'l')" },
    { text: "vocabulary", difficulty: 2, tip: "voh-KAB-yuh-lair-ee" },
    { text: "Unique New York, unique New York", difficulty: 3, tip: "Tongue twister! Keep pace steady" },
];

class PronunciationProGame extends GameBase {
    constructor(container, config) {
        super(container, { ...config, usesMicrophone: true });
        this.currentChallenge = null;
        this.recognition = null;
        this.isListening = false;
        this.rounds = 0;
        this.correctAnswers = 0;
        this.attempts = 0;
        this.maxAttempts = 3;
    }

    async init() {
        this.container.innerHTML = `
      <div class="game-area pronunciation-game">
        <div class="pronunciation-header">
          <span class="pronunciation-title">🎙️ Pronunciation Pro</span>
          <span class="pronunciation-subtitle">Say the word or phrase clearly</span>
        </div>
        <div class="challenge-display" id="challenge-display">
          <div class="challenge-text" id="challenge-text"></div>
          <div class="challenge-tip" id="challenge-tip"></div>
        </div>
        <div class="microphone-area" id="microphone-area">
          <button class="mic-btn" id="mic-btn">
            <span class="mic-icon">🎤</span>
            <span class="mic-label">Click to Speak</span>
          </button>
          <div class="mic-status" id="mic-status"></div>
        </div>
        <div class="user-speech" id="user-speech"></div>
        <div class="pronunciation-controls">
          <button class="btn btn--small hear-btn">🔊 Hear It</button>
          <button class="btn btn--small skip-btn">⏭️ Skip</button>
        </div>
        <div class="game-feedback" id="game-feedback"></div>
        <div class="game-progress" id="game-progress"></div>
      </div>
    `;

        const style = document.createElement('style');
        style.textContent = `
      .pronunciation-game { max-width: 500px; margin: 0 auto; text-align: center; }
      .pronunciation-header { margin-bottom: 20px; }
      .pronunciation-title { font-size: 22px; font-weight: 700; display: block; }
      .pronunciation-subtitle { font-size: 14px; color: var(--muted); }
      .challenge-display {
        padding: 30px;
        border-radius: 16px;
        background: var(--surface);
        border: 2px solid var(--border);
        margin-bottom: 24px;
      }
      .challenge-text {
        font-size: 28px;
        font-weight: 700;
        margin-bottom: 12px;
        color: var(--accent);
      }
      .challenge-tip {
        font-size: 14px;
        color: var(--muted);
        font-style: italic;
      }
      .microphone-area {
        margin: 24px 0;
      }
      .mic-btn {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 24px 40px;
        border-radius: 50%;
        width: 120px;
        height: 120px;
        background: linear-gradient(135deg, var(--accent), var(--accent2));
        border: none;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 20px rgba(107, 102, 255, 0.4);
      }
      .mic-btn:hover {
        transform: scale(1.05);
        box-shadow: 0 6px 30px rgba(107, 102, 255, 0.5);
      }
      .mic-btn.listening {
        animation: pulse-mic 1s ease-in-out infinite;
        background: linear-gradient(135deg, #00ff88, #00cc6a);
      }
      @keyframes pulse-mic {
        0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(0, 255, 136, 0.4); }
        50% { transform: scale(1.08); box-shadow: 0 6px 30px rgba(0, 255, 136, 0.6); }
      }
      .mic-icon { font-size: 36px; }
      .mic-label { font-size: 12px; font-weight: 600; color: white; }
      .mic-status {
        margin-top: 12px;
        font-size: 14px;
        color: var(--muted);
        min-height: 20px;
      }
      .user-speech {
        min-height: 40px;
        margin: 16px 0;
        font-size: 18px;
        font-style: italic;
        color: var(--text);
      }
      .pronunciation-controls {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 16px;
      }
      .feedback-message {
        padding: 14px 24px;
        border-radius: 12px;
        font-weight: 700;
      }
      .feedback-success { background: rgba(0, 255, 136, 0.15); color: #00cc6a; }
      .feedback-error { background: rgba(255, 95, 95, 0.15); color: #ff5f5f; }
      .feedback-warning { background: rgba(255, 230, 70, 0.15); color: #d4a800; }
      .progress-bar { height: 8px; background: var(--border); border-radius: 4px; overflow: hidden; margin-top: 16px; }
      .progress-fill { height: 100%; background: linear-gradient(90deg, var(--accent), var(--accent2)); transition: width 0.3s ease; }
      .progress-text { font-size: 12px; color: var(--muted); margin-top: 8px; }
      .no-speech-support {
        padding: 20px;
        border-radius: 12px;
        background: rgba(255, 95, 95, 0.15);
        color: #ff5f5f;
        text-align: center;
      }
    `;
        this.container.appendChild(style);

        // Check for speech recognition support
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            document.getElementById('microphone-area').innerHTML = `
        <div class="no-speech-support">
          <p>😢 Speech recognition is not supported in this browser.</p>
          <p>Try using Chrome or Edge for the full experience!</p>
        </div>
      `;
            return;
        }

        // Setup speech recognition
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'en-US';

        this.recognition.onresult = (event) => this.handleSpeechResult(event);
        this.recognition.onend = () => this.stopListening();
        this.recognition.onerror = (event) => this.handleSpeechError(event);
    }

    start() {
        super.start();
        this.rounds = 0;
        this.correctAnswers = 0;
        this.nextRound();

        // Setup event handlers
        document.getElementById('mic-btn').onclick = () => this.toggleListening();
        document.querySelector('.hear-btn').onclick = () => this.speakChallenge();
        document.querySelector('.skip-btn').onclick = () => this.skipChallenge();
    }

    nextRound() {
        if (this.rounds >= 8) {
            this.end();
            return;
        }

        this.rounds++;
        this.attempts = 0;
        this.updateProgress();

        // Pick random challenge
        const shuffled = [...PRONUNCIATION_CHALLENGES].sort(() => Math.random() - 0.5);
        this.currentChallenge = shuffled[0];

        this.renderRound();
    }

    renderRound() {
        const textEl = document.getElementById('challenge-text');
        const tipEl = document.getElementById('challenge-tip');
        const speechEl = document.getElementById('user-speech');
        const feedbackEl = document.getElementById('game-feedback');

        textEl.textContent = this.currentChallenge.text;
        tipEl.textContent = `💡 ${this.currentChallenge.tip}`;
        speechEl.textContent = '';
        feedbackEl.innerHTML = '';

        // Speak the challenge
        setTimeout(() => this.speakChallenge(), 500);
    }

    speakChallenge() {
        this.speak(this.currentChallenge.text, { rate: 0.8 });
    }

    skipChallenge() {
        this.resetCombo();
        this.showFeedback('Skipped - keep practicing!', 'warning');
        setTimeout(() => this.nextRound(), 1000);
    }

    toggleListening() {
        if (this.isListening) {
            this.recognition.stop();
        } else {
            this.startListening();
        }
    }

    startListening() {
        if (!this.recognition) return;

        this.isListening = true;
        const micBtn = document.getElementById('mic-btn');
        const statusEl = document.getElementById('mic-status');

        micBtn.classList.add('listening');
        micBtn.querySelector('.mic-label').textContent = 'Listening...';
        statusEl.textContent = '🎧 Speak now!';

        try {
            this.recognition.start();
        } catch (e) {
            console.error('Speech recognition error:', e);
            this.stopListening();
        }
    }

    stopListening() {
        this.isListening = false;
        const micBtn = document.getElementById('mic-btn');
        const statusEl = document.getElementById('mic-status');

        micBtn.classList.remove('listening');
        micBtn.querySelector('.mic-label').textContent = 'Click to Speak';
        statusEl.textContent = '';
    }

    handleSpeechResult(event) {
        const speechEl = document.getElementById('user-speech');
        let transcript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
        }

        speechEl.textContent = `"${transcript}"`;

        // Check if final
        if (event.results[event.resultIndex].isFinal) {
            this.checkPronunciation(transcript);
        }
    }

    handleSpeechError(event) {
        console.error('Speech error:', event.error);
        const statusEl = document.getElementById('mic-status');

        if (event.error === 'no-speech') {
            statusEl.textContent = 'No speech detected. Try again!';
        } else if (event.error === 'not-allowed') {
            statusEl.textContent = '⚠️ Microphone access denied';
        } else {
            statusEl.textContent = 'Error. Please try again.';
        }

        this.stopListening();
    }

    checkPronunciation(transcript) {
        this.attempts++;
        const target = this.currentChallenge.text.toLowerCase().trim();
        const spoken = transcript.toLowerCase().trim();

        // Calculate similarity (simple word match for now)
        const targetWords = target.split(/\s+/);
        const spokenWords = spoken.split(/\s+/);

        let matchedWords = 0;
        targetWords.forEach(tw => {
            if (spokenWords.some(sw => sw.includes(tw) || tw.includes(sw))) {
                matchedWords++;
            }
        });

        const accuracy = matchedWords / targetWords.length;

        if (accuracy >= 0.8) {
            // Great pronunciation!
            this.incrementCombo();
            this.addScore(100 + (this.currentChallenge.difficulty * 20));
            this.correctAnswers++;
            this.updateScoreDisplay();
            this.celebrateMove({ burst: 'CLEAR', duration: 700 });
            this.showFeedback('🎉 Excellent pronunciation!', 'success');
            setTimeout(() => this.nextRound(), 1500);
        } else if (accuracy >= 0.5) {
            // Close
            this.showFeedback('Close! Listen again and try once more.', 'warning');
            this.coachMove("Closer. Tighten the sounds and try again.", 900);
            this.speakChallenge();
        } else if (this.attempts < this.maxAttempts) {
            // Not quite
            this.showFeedback(`Try again! (Attempt ${this.attempts}/${this.maxAttempts})`, 'error');
            this.coachMove();
        } else {
            // Max attempts
            this.resetCombo();
            this.coachMove("Reset the mouth shape and attack the next word cleanly.", 900);
            this.showFeedback('Good effort! Moving to next word.', 'warning');
            setTimeout(() => this.nextRound(), 1500);
        }
    }

    showFeedback(message, type) {
        const feedbackEl = document.getElementById('game-feedback');
        feedbackEl.innerHTML = `<div class="feedback-message feedback-${type}">${message}</div>`;
    }

    updateProgress() {
        const progressEl = document.getElementById('game-progress');
        if (progressEl) {
            const percent = (this.rounds / 8) * 100;
            progressEl.innerHTML = `
        <div class="progress-bar"><div class="progress-fill" style="width: ${percent}%"></div></div>
        <div class="progress-text">Word ${this.rounds} of 8 • Correct: ${this.correctAnswers}</div>
      `;
        }
    }

    updateScoreDisplay() {
        let hud = this.container.querySelector('.game-hud');
        if (!hud) {
            const gameArea = this.container.querySelector('.game-area');
            gameArea.insertAdjacentHTML('afterbegin', `
        <div class="game-hud">
          <div class="hud-score"><span class="hud-label">Score</span><span class="hud-value" data-game-score>${this.score}</span></div>
          <div class="hud-combo"><span class="hud-value" data-game-combo>${this.combo}x</span><span class="hud-label">Combo</span></div>
        </div>
      `);
        }
        const scoreEl = this.container.querySelector('[data-game-score]');
        if (scoreEl) { scoreEl.textContent = this.score; Animations.bounce(scoreEl, 1.2, 200); }
        const comboEl = this.container.querySelector('[data-game-combo]');
        if (comboEl) { comboEl.textContent = `${this.combo}x`; }
    }

    cleanup() {
        super.cleanup();
        if (this.recognition) {
            this.recognition.stop();
        }
    }

    end() {
        this.isRunning = false;
        this.endTime = Date.now();
        if (this.recognition) this.recognition.stop();
        if (this.correctAnswers >= 6) this.addScore(500);
        const isHighScore = this.saveScore();
        this.showResults(isHighScore);
    }
}

export function createGame(container, config) {
    return new PronunciationProGame(container, config);
}
