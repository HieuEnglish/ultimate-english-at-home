/* assets/js/games/13-18/speech-coach.js
   Speech Coach - Ages 13-18

   Senior pass:
   - Stronger public-speaking practice loop
   - Better microphone fallback and scoring clarity
   - More usable feedback around pacing, accuracy, and confidence
*/

const { GameBase } = window.UEAH_GAME_ENGINE;

const SPEECH_SCRIPTS = [
  {
    title: 'The Moon Speech',
    origin: 'John F. Kennedy',
    text: 'We choose to go to the moon and do the other things, not because they are easy, but because they are hard.',
    focus: 'Stress the contrast clearly.',
  },
  {
    title: 'I Have a Dream',
    origin: 'Martin Luther King Jr.',
    text: 'I have a dream that my four little children will one day live in a nation where they will not be judged by the color of their skin.',
    focus: 'Keep a steady rhythm and emotional clarity.',
  },
  {
    title: 'Business Keynote',
    origin: 'Tech CEO',
    text: 'Innovation is not just about technology, it is about solving the human problems that define our generation.',
    focus: 'Use a calm, persuasive keynote tone.',
  },
  {
    title: 'The Power of Education',
    origin: 'Malala Yousafzai',
    text: 'One child, one teacher, one book, and one pen can change the world. Education is the only solution.',
    focus: 'Pause for emphasis after each repeated phrase.',
  },
  {
    title: 'Courage and Persistence',
    origin: 'Winston Churchill',
    text: 'Success is not final, failure is not fatal. It is the courage to continue that counts.',
    focus: 'Deliver the second sentence with conviction.',
  },
];

class SpeechCoach extends GameBase {
  constructor(container, config) {
    super(container, config);
    this.currentQ = 0;
    this.score = 0;
    this.recognition = null;
    this.isListening = false;
    this.supported = false;
    this.rounds = [];
  }

  async init() {
    this.container.innerHTML = `
      <div class="scoach-game">
        <div class="scoach-panel">
          <div class="scoach-topbar">
            <div class="pill">⭐ <span id="score-val">0</span></div>
            <div class="title-wrap">
              <div class="title">Speech Coach</div>
              <div class="progress" id="progress-text">Speech 1 of 5</div>
            </div>
            <div class="pill">🎤</div>
          </div>

          <div class="script-card">
            <div class="script-meta"><span id="script-origin">Author</span> • <span id="script-title">Title</span></div>
            <div class="script-text" id="script-text">Loading...</div>
            <div class="focus-tip" id="focus-tip">Focus tip</div>
          </div>

          <div class="controls-row">
            <button class="btn hear" id="hear-btn">🔊 Hear Model</button>
            <button class="btn mic" id="mic-btn">🎙️ Record</button>
            <button class="btn skip" id="skip-btn">⏭️ Skip</button>
          </div>

          <div class="status-box" id="status-box">Listen to the script, then record yourself reading it.</div>
          <div class="transcript-box" id="transcript-box">Transcript will appear here.</div>
        </div>
      </div>
    `;

    this.injectStyles();
    this.setupRecognition();
    this.start();
  }

  injectStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .scoach-game{min-height:600px;height:auto;overflow:visible;border-radius:24px;background:linear-gradient(180deg,#1a1a1a 0%,#2a2a2a 100%);font-family:Inter,Arial,sans-serif;display:flex;align-items:center;justify-content:center;padding:20px;color:#fff}.scoach-panel{width:min(860px,96%);background:rgba(255,255,255,.06);border-radius:28px;border:1px solid rgba(255,255,255,.08);padding:22px;display:flex;flex-direction:column;gap:16px;box-shadow:0 18px 50px rgba(0,0,0,.35)}.scoach-topbar{display:flex;align-items:center;gap:12px}.pill{background:#2c2c2c;color:#f1c40f;padding:10px 16px;border-radius:999px;font-weight:800}.title-wrap{flex:1;text-align:center}.title{font-size:30px;font-weight:900;color:#fff}.progress{font-size:14px;color:#bdbdbd}.script-card{background:rgba(255,255,255,.05);border:1px solid rgba(241,196,15,.35);border-radius:22px;padding:22px}.script-meta{font-size:13px;letter-spacing:1px;text-transform:uppercase;color:#f1c40f;font-weight:800;margin-bottom:12px}.script-text{font-size:28px;line-height:1.55;font-family:Georgia,serif}.focus-tip{margin-top:14px;background:rgba(241,196,15,.1);padding:12px 14px;border-radius:12px;color:#f8dfa1}.controls-row{display:flex;justify-content:center;gap:12px;flex-wrap:wrap}.btn{border:none;border-radius:14px;padding:14px 18px;font-size:16px;font-weight:800;cursor:pointer}.btn.hear{background:#546e7a;color:#fff}.btn.mic{background:#e74c3c;color:#fff}.btn.mic.listening{background:#2ecc71}.btn.skip{background:#616161;color:#fff}.status-box,.transcript-box{background:rgba(255,255,255,.05);border-radius:14px;padding:14px 16px}.status-box{border-left:4px solid #f1c40f;color:#f3ecc1}.transcript-box{min-height:74px;color:#fff;font-size:17px;line-height:1.5}
    `;
    this.container.appendChild(style);
  }

  setupRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      this.supported = false;
      return;
    }

    this.supported = true;
    this.recognition = new SpeechRecognition();
    this.recognition.continuous = false;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      const btn = document.getElementById('mic-btn');
      btn.classList.add('listening');
      btn.textContent = '🛑 Stop';
      document.getElementById('status-box').textContent = 'Recording... speak clearly and keep a steady pace.';
    };

    this.recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i += 1) transcript += event.results[i][0].transcript;
      document.getElementById('transcript-box').textContent = transcript || 'Transcript will appear here.';
      if (event.results[event.results.length - 1].isFinal) this.evaluateSpeech(transcript);
    };

    this.recognition.onerror = () => {
      this.stopListeningUI();
      document.getElementById('status-box').textContent = 'Microphone issue detected. You can still use Hear Model and skip rounds.';
    };

    this.recognition.onend = () => this.stopListeningUI();
  }

  stopListeningUI() {
    this.isListening = false;
    const btn = document.getElementById('mic-btn');
    if (!btn) return;
    btn.classList.remove('listening');
    btn.textContent = '🎙️ Record';
  }

  start() {
    super.start();
    this.currentQ = 0;
    this.score = 0;
    this.rounds = [...SPEECH_SCRIPTS].sort(() => Math.random() - 0.5);
    document.getElementById('hear-btn').onclick = () => this.playModel();
    document.getElementById('skip-btn').onclick = () => this.skipRound();
    document.getElementById('mic-btn').onclick = () => this.toggleRecording();
    this.loadScript();
  }

  loadScript() {
    if (this.currentQ >= this.rounds.length) return this.end();
    const s = this.rounds[this.currentQ];
    document.getElementById('progress-text').textContent = `Speech ${this.currentQ + 1} of ${this.rounds.length}`;
    document.getElementById('script-origin').textContent = s.origin;
    document.getElementById('script-title').textContent = s.title;
    document.getElementById('script-text').textContent = s.text;
    document.getElementById('focus-tip').textContent = `Focus: ${s.focus}`;
    document.getElementById('transcript-box').textContent = 'Transcript will appear here.';
    document.getElementById('status-box').textContent = this.supported ? 'Listen to the script, then record yourself reading it.' : 'Speech recognition is unavailable in this browser. Use Hear Model to practice aloud.';
  }

  playModel() {
    const s = this.rounds[this.currentQ];
    this.speak(s.text, { rate: 0.9, pitch: 1 });
  }

  toggleRecording() {
    if (!this.supported || !this.recognition) {
      this.coachMove('Microphone practice is not supported here.', 1000);
      return;
    }
    if (this.isListening) {
      this.recognition.stop();
      return;
    }
    try {
      this.recognition.start();
    } catch {
      document.getElementById('status-box').textContent = 'Recording could not start. Try again.';
    }
  }

  normalize(text) {
    return text.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim();
  }

  evaluateSpeech(transcript) {
    const targetWords = this.normalize(this.rounds[this.currentQ].text).split(' ');
    const spokenWords = this.normalize(transcript).split(' ').filter(Boolean);
    let matched = 0;
    targetWords.forEach((word) => {
      if (spokenWords.includes(word)) matched += 1;
    });
    const accuracy = matched / targetWords.length;

    if (accuracy >= 0.78) {
      this.addScore(180);
      document.getElementById('score-val').textContent = this.score;
      document.getElementById('status-box').textContent = 'Strong delivery: clear enough for a strong audience performance.';
      this.celebrateMove({ burst: 'ELOQUENT', duration: 900 });
      setTimeout(() => { this.currentQ += 1; this.loadScript(); }, 1200);
      return;
    }

    if (accuracy >= 0.5) {
      document.getElementById('status-box').textContent = 'Decent attempt. Replay the model and sharpen the wording and pacing.';
      this.coachMove('Closer. Tighten accuracy and emphasis.', 1000);
      return;
    }

    document.getElementById('status-box').textContent = 'Too much of the script was lost. Listen again and try another clean reading.';
    this.coachMove('Reset your pace and attack the sentence more clearly.', 1000);
  }

  skipRound() {
    this.currentQ += 1;
    this.loadScript();
  }

  cleanup() {
    super.cleanup();
    if (this.recognition) this.recognition.stop();
  }

  end() {
    this.showResults(this.saveScore());
  }
}

export function createGame(container, config) {
  return new SpeechCoach(container, config);
}
