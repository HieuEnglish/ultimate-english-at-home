/* assets/data/tests-0-3-writing.js
   Question bank: Ages 0–3 • Writing (pre-writing / mark-making)

   No build step: exposes the bank on window.UEAH_TEST_BANKS.
   Key: "age-0-3-writing"

   Notes:
   - This is caregiver-led. Children at this age are building fine-motor control.
   - Items are short prompts (no auto-grading). The runner tracks "Done" vs "Skip".
*/

(function () {
  "use strict";

  const SLUG = "age-0-3-writing";

  const QUESTIONS = [
    {
      id: "q1",
      type: "prompt",
      question: "Scribble on paper for 10 seconds.",
      model: "🖍️",
      difficulty: "easy",
      explanation: "Any grip is OK at this age. Praise effort and keep it playful."
    },
    {
      id: "q2",
      type: "prompt",
      question: "Make 5 dots.",
      model: "• • • • •",
      difficulty: "easy",
      explanation: "Use a thick crayon/marker to make marks easier."
    },
    {
      id: "q3",
      type: "prompt",
      question: "Draw a long line across the page.",
      model: "────────",
      difficulty: "easy",
      explanation: "Help by holding the paper still. Let the child lead."
    },
    {
      id: "q4",
      type: "prompt",
      question: "Draw a short line.",
      model: "──",
      difficulty: "easy",
      explanation: "Short, quick movements are great practice."
    },
    {
      id: "q5",
      type: "prompt",
      question: "Draw a vertical line (up and down).",
      model: "|",
      difficulty: "easy",
      explanation: "Say: “Up… down…” while drawing."
    },
    {
      id: "q6",
      type: "prompt",
      question: "Draw a horizontal line (left to right).",
      model: "—",
      difficulty: "easy",
      explanation: "Say: “Left… right…” while drawing."
    },
    {
      id: "q7",
      type: "prompt",
      question: "Draw a circle.",
      model: "○",
      difficulty: "medium",
      explanation: "Round shapes take time—aim for ‘round-ish’, not perfect."
    },
    {
      id: "q8",
      type: "prompt",
      question: "Draw 3 circles.",
      model: "○ ○ ○",
      difficulty: "medium",
      explanation: "Repeat the same movement to build control."
    },
    {
      id: "q9",
      type: "prompt",
      question: "Draw a cross.",
      model: "+",
      difficulty: "medium",
      explanation: "Two lines: one down, one across."
    },
    {
      id: "q10",
      type: "prompt",
      question: "Draw a zig-zag line.",
      model: "／＼／＼",
      difficulty: "medium",
      explanation: "This builds wrist movement and direction changes."
    },
    {
      id: "q11",
      type: "prompt",
      question: "Trace the dotted line (caregiver draws dots first).",
      model: "• • • • •",
      difficulty: "medium",
      explanation: "Caregiver: place dots; child: connect them."
    },
    {
      id: "q12",
      type: "prompt",
      question: "Connect two dots (caregiver makes the dots).",
      model: "•     •",
      difficulty: "medium",
      explanation: "Start with dots close together, then increase the distance."
    },
    {
      id: "q13",
      type: "prompt",
      question: "Colour inside a big circle (caregiver draws the circle).",
      model: "◯",
      difficulty: "hard",
      explanation: "Staying inside lines is difficult at this age—focus on trying."
    },
    {
      id: "q14",
      type: "prompt",
      question: "Copy a simple smiley face.",
      model: "☺",
      difficulty: "hard",
      explanation: "Caregiver: draw one first; child tries to copy."
    },
    {
      id: "q15",
      type: "prompt",
      question: "Draw a square (any size).",
      model: "□",
      difficulty: "hard",
      explanation: "If needed, caregiver can guide the hand lightly."
    },
    {
      id: "q16",
      type: "prompt",
      question: "Try writing your first letter (any letter).",
      model: "A / B / C",
      difficulty: "hard",
      explanation: "It can be a ‘pretend’ letter—celebrate the attempt."
    }
  ];

  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
