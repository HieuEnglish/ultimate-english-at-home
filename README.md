# Ultimate English At Home (UEAH) 🏡✨📚

A friendly GitHub Pages web app for **FREE English practice** — organized by **Age ➜ Skill**.  
Built to be **simple**, **fast**, and **easy to expand** 🚀

✅ **Core promise:** This project is focused on **FREE learning** and **FREE resources** for everyone 💛

---

## 🔗 Quick Links

🌍 **Live site:** https://hieuenglish.github.io/ultimate-english-at-home/  
🧭 **Repository:** https://github.com/HieuEnglish/ultimate-english-at-home  
🐛 **Issues:** https://github.com/HieuEnglish/ultimate-english-at-home/issues  
🚀 **Pull Requests:** https://github.com/HieuEnglish/ultimate-english-at-home/pulls  

---

## ✨ What this app does

UEAH helps learners, parents, and teachers quickly find useful **FREE** English practice by:

👶🧒🧑‍🎓 Choosing an **age group**  
🎧📖✍️🗣️ Choosing a **skill**  
✅ Browsing **clear, parent-friendly** resource pages  

🎯 Goal: **zero clutter**, easy navigation, easy updates — while keeping the focus on **FREE access**.

---

## ⭐ Features

🗂️ **Age ➜ Skill** structure (predictable and easy to browse)  
🆓 **Free-first content** (priority is always FREE resources)  
📱 **Responsive** (works well on mobile + desktop)  
🔗 Resource pages with **external links** (clean repo, no hosted downloads)  
🧩 **Easy to extend** (add resources without rewriting the whole app)  
🎮 **Games + Tests** (contributions welcome!)  

---

## 🎮 Games & Tests (Contributions welcome!) 🎉

✅ **Fixing broken games/tests or adding new ones is welcomed.**  
✅ **All games and tests must work off of the Question Banks** (no hard-coded questions inside game logic).  
✅ **Questions must be age-appropriate** and **aligned with IELTS-style standards for the target age/level**.

### 🧠 Question Bank rules (required)

- 🗃️ Questions live in shared data files (**question banks**)  
- 🔌 Games/tests **pull questions from those banks** using IDs/tags/filters  
- ♻️ Games/tests should be reusable across levels by changing the bank/filter — not rewriting the game  

If you’re adding a game/test and you find yourself typing lots of questions into the game code, stop ✋ and move them into the question bank ✅

### 🎯 Question quality rules

👶 **Age-appropriate**
- 🚫 No profanity, hate, sexual content, violence, drugs, gambling, or mature themes  
- ✅ Topics should fit the age group (school, hobbies, family, daily life, etc.)  

🧑‍🎓 **IELTS-aligned (for the age/level)**
- ✅ For teens/adults: IELTS-style clarity, realistic vocabulary, proper difficulty  
- ✅ For younger learners: skill-building that supports IELTS later (clear vocab targets + simple grammar focus)  

🧼 **Clear + consistent**
- ✅ Unambiguous questions  
- ✅ Consistent spelling/punctuation  
- ✅ If multiple-choice: only **one** clearly correct answer  

---

## 🧾 Free Resource Policy 🆓✅

To keep the app aligned with its mission:

🆓 Include **FREE resources first** (avoid paywalls where possible)  
🔗 Use **external links** for resources (keep the repo lightweight)  
✍️ Keep descriptions **short, clear, parent-friendly**  
✅ Prioritize **age-appropriate, practical** materials  
⚠️ If a resource changes (paywall / removed), **open an issue** so it can be replaced  

---

## 🔊 TTS Notes

- Pre-generated local audio clips are preferred when a matching clip exists  
- The current test audio pack lives under `assets/audio/tts/`  
- The current pack covers fixed test prompts plus reusable game words, phrases, and simple template expansions  
- To rebuild the prompt list, run `node tools/tts/export-prompts.js`  
- To regenerate clips, run `python tools/tts/generate-prebuilt-audio.py` after installing `edge-tts`  
- Browser-only speech uses the voices exposed by the current device/browser  
- For more natural Microsoft-style neural speech, configure an endpoint in `assets/js/tts-config.js`  
- That endpoint should synthesize audio server-side and return audio or a playable audio URL  
- Without that endpoint, the app safely falls back to browser speech on GitHub Pages  

---

## 📁 Project Structure (high level)

- `assets/` — app code, styles, and resource data  
- `tools/` — helper scripts  
- `index.html` — app entry  

---

## 🐛 Report Issues / Request Features

Found a bug, broken link, broken game/test, or want a feature? Open an issue here:  
https://github.com/HieuEnglish/ultimate-english-at-home/issues

When reporting, include:

✅ What you expected  
❌ What actually happened  
🧭 Page/age/skill you were on  
📱 Device + browser (if relevant)  
🖼️ Screenshot (if helpful)  

---

## 🤝 Contributing (PRs welcome!) 🎉

Contributions are welcomed and appreciated 💛 You can help by:

➕ Adding new **FREE** resources to age/skill packs  
🆕  Adding to existing question banks (make sure questions are age relevant & in line with IELTS standards)  
🎮 Fixing or adding **Games** (must use question banks ✅)  
🎨 Improving UI (layout, spacing, buttons, mobile polish)  
♿ Accessibility improvements  
🧹 Fixing typos and improving wording  

---

## 🎨 Theme & Format Guidelines (please follow)

🧁 Keep the **friendly / minimal** style  
🧩 Follow the existing structure (**Age ➜ Skill ➜ Resources**)  
📝 Use the same tone: **short, clear, parent-friendly**  
🔘 Keep buttons/cards consistent in size, spacing, and wording  
🚫 Avoid large UI changes unless discussed in an issue first  

---

## 🚀 How to contribute

1) Fork this repo 🍴  
2) Create a branch: `feat/your-change` 🌿  
3) Commit your changes ✅  
4) Open a Pull Request 🚀  

Start here: https://github.com/HieuEnglish/ultimate-english-at-home/pulls

---

## 🧾 License

MIT License 📄

---

## 💡 Credits

Made with ❤️ for learners, families, and teachers who want **FREE English practice at home** 🏡📚✨
