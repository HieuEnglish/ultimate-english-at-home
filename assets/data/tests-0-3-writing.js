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
    },
    {
      id: "q17",
      type: "prompt",
      question: "Draw a curved line (like a rainbow).",
      model: "⌒⌒⌒",
      difficulty: "easy",
      explanation: "Curves build smooth control. Any ‘rainbow’ curve is great."
    },
    {
      id: "q18",
      type: "prompt",
      question: "Draw a wavy line.",
      model: "~~~",
      difficulty: "easy",
      explanation: "Say: “wave… wave…” while making the line."
    },
    {
      id: "q19",
      type: "prompt",
      question: "Draw a spiral (like a snail shell).",
      model: "@",
      difficulty: "medium",
      explanation: "Start big and go in, or start small and go out."
    },
    {
      id: "q20",
      type: "prompt",
      question: "Draw two parallel lines (like a road).",
      model: "|   |",
      difficulty: "medium",
      explanation: "Parallel lines help with direction and spacing."
    },
    {
      id: "q21",
      type: "prompt",
      question: "Make 10 dots.",
      model: "• • • • •  • • • • •",
      difficulty: "easy",
      explanation: "Dots are quick wins and build confidence."
    },
    {
      id: "q22",
      type: "prompt",
      question: "Draw 3 vertical lines.",
      model: "| | |",
      difficulty: "easy",
      explanation: "Say: “down… down… down…”"
    },
    {
      id: "q23",
      type: "prompt",
      question: "Draw 3 horizontal lines.",
      model: "— — —",
      difficulty: "easy",
      explanation: "Say: “across… across… across…”"
    },
    {
      id: "q24",
      type: "prompt",
      question: "Draw an X.",
      model: "×",
      difficulty: "medium",
      explanation: "Two crossing lines. Try one line, then the other."
    },
    {
      id: "q25",
      type: "prompt",
      question: "Draw a triangle (any size).",
      model: "△",
      difficulty: "hard",
      explanation: "Caregiver can model it first. ‘Point… point… point…’"
    },
    {
      id: "q26",
      type: "prompt",
      question: "Copy a V shape.",
      model: "V",
      difficulty: "medium",
      explanation: "Two lines that meet at the bottom."
    },
    {
      id: "q27",
      type: "prompt",
      question: "Copy a U shape.",
      model: "U",
      difficulty: "medium",
      explanation: "One smooth curve down and up."
    },
    {
      id: "q28",
      type: "prompt",
      question: "Colour inside a big square (caregiver draws the square).",
      model: "□",
      difficulty: "hard",
      explanation: "Staying inside is hard—focus on trying and short strokes."
    },
    {
      id: "q29",
      type: "prompt",
      question: "Trace a big O (caregiver writes O first).",
      model: "O",
      difficulty: "hard",
      explanation: "Tracing big shapes supports later letter writing."
    },
    {
      id: "q30",
      type: "prompt",
      question: "Draw a simple house (square + triangle roof).",
      model: "□ + △",
      difficulty: "hard",
      explanation: "Caregiver can draw one first; child copies or adds lines."
    },

    {
      id: "q31",
      type: "prompt",
      question: "Scribble inside a big circle (caregiver draws the circle).",
      model: "◯",
      difficulty: "easy",
      explanation: "A big target helps. Any marks inside the shape are a win."
    },
    {
      id: "q32",
      type: "prompt",
      question: "Scribble inside a big triangle (caregiver draws the triangle).",
      model: "△",
      difficulty: "easy",
      explanation: "This builds ‘staying in an area’ without pressure to be neat."
    },
    {
      id: "q33",
      type: "prompt",
      question: "Make 6 dots in a row.",
      model: "• • • • • •",
      difficulty: "easy",
      explanation: "Row dots build control and simple spacing."
    },
    {
      id: "q34",
      type: "prompt",
      question: "Make 8 dots anywhere on the page.",
      model: "• • • • • • • •",
      difficulty: "easy",
      explanation: "Let the child choose where to place each dot."
    },
    {
      id: "q35",
      type: "prompt",
      question: "Draw a diagonal line (from top-left to bottom-right).",
      model: "/",
      difficulty: "easy",
      explanation: "Diagonal strokes are great pre-writing practice."
    },
    {
      id: "q36",
      type: "prompt",
      question: "Draw a diagonal line (from top-right to bottom-left).",
      model: "\\",
      difficulty: "easy",
      explanation: "Try slowly. Caregiver can point to the start and end."
    },
    {
      id: "q37",
      type: "prompt",
      question: "Draw 3 diagonal lines (same direction).",
      model: "///",
      difficulty: "medium",
      explanation: "Repeating the same stroke builds consistency."
    },
    {
      id: "q38",
      type: "prompt",
      question: "Draw 3 diagonal lines (the other direction).",
      model: "\\\\\\",
      difficulty: "medium",
      explanation: "Switching direction builds flexible wrist movement."
    },
    {
      id: "q39",
      type: "prompt",
      question: "Draw an L shape (down, then across).",
      model: "└",
      difficulty: "medium",
      explanation: "Say: “Down… stop… across…” to guide the movement."
    },
    {
      id: "q40",
      type: "prompt",
      question: "Draw a T shape (one line, then a line across the top).",
      model: "T",
      difficulty: "medium",
      explanation: "Two simple strokes. Caregiver can model first."
    },
    {
      id: "q41",
      type: "prompt",
      question: "Draw a rectangle (a long box).",
      model: "▭",
      difficulty: "hard",
      explanation: "Rectangles are tricky—any ‘box-ish’ shape is great."
    },
    {
      id: "q42",
      type: "prompt",
      question: "Draw an oval (an egg shape).",
      model: "⬭",
      difficulty: "medium",
      explanation: "Aim for ‘egg-ish’, not perfect. Go slowly around."
    },
    {
      id: "q43",
      type: "prompt",
      question: "Draw 2 circles: one big and one small.",
      model: "◯ ○",
      difficulty: "medium",
      explanation: "Changing size helps control and planning."
    },
    {
      id: "q44",
      type: "prompt",
      question: "Draw 4 circles in a row.",
      model: "○ ○ ○ ○",
      difficulty: "medium",
      explanation: "Repeated circles build smooth round movement."
    },
    {
      id: "q45",
      type: "prompt",
      question: "Try to draw a heart shape.",
      model: "♥",
      difficulty: "hard",
      explanation: "Hearts are hard. Caregiver can draw one for the child to copy."
    },
    {
      id: "q46",
      type: "prompt",
      question: "Draw a 'C' shape.",
      model: "C",
      difficulty: "medium",
      explanation: "This is a simple curve used later in letter writing."
    },
    {
      id: "q47",
      type: "prompt",
      question: "Draw an 'S' shape.",
      model: "S",
      difficulty: "hard",
      explanation: "An S uses two curves. Try a slow ‘snake’ shape."
    },
    {
      id: "q48",
      type: "prompt",
      question: "Draw a 'J' hook line.",
      model: "J",
      difficulty: "medium",
      explanation: "Start with a line down, then add a small hook."
    },
    {
      id: "q49",
      type: "prompt",
      question: "Draw 5 little dashes.",
      model: "– – – – –",
      difficulty: "easy",
      explanation: "Short strokes are great for fine-motor practice."
    },
    {
      id: "q50",
      type: "prompt",
      question: "Draw a row of bumps (like little hills).",
      model: "∩∩∩",
      difficulty: "medium",
      explanation: "Bumps practice smooth up-and-down curves."
    },
    {
      id: "q51",
      type: "prompt",
      question: "Draw an equals sign (two lines on top of each other).",
      model: "=",
      difficulty: "medium",
      explanation: "This builds parallel line control in a simple way."
    },
    {
      id: "q52",
      type: "prompt",
      question: "Draw a simple sun (a circle with lines around it).",
      model: "☀",
      difficulty: "hard",
      explanation: "Caregiver can draw the circle first; child adds ‘sun rays’."
    },
    {
      id: "q53",
      type: "prompt",
      question: "Draw a balloon (a circle with a string).",
      model: "🎈",
      difficulty: "hard",
      explanation: "Caregiver can model: circle first, then one long ‘string’ line."
    },
    {
      id: "q54",
      type: "prompt",
      question: "Draw a simple flower (circle + 4 petals).",
      model: "✿",
      difficulty: "hard",
      explanation: "Let petals be any shapes. Focus on adding parts."
    },
    {
      id: "q55",
      type: "prompt",
      question: "Draw a simple tree (a line trunk + round top).",
      model: "🌳",
      difficulty: "hard",
      explanation: "Caregiver can draw the trunk first; child adds the ‘leaf’ shape."
    },
    {
      id: "q56",
      type: "prompt",
      question: "Trace a dotted diagonal line (caregiver makes the dots).",
      model: "• • • • •",
      difficulty: "medium",
      explanation: "Caregiver: place dots diagonally; child connects them."
    },
    {
      id: "q57",
      type: "prompt",
      question: "Trace a dotted curve (caregiver makes the dots).",
      model: "•  •  •  •  •",
      difficulty: "medium",
      explanation: "Curved dot tracing builds smooth control."
    },
    {
      id: "q58",
      type: "prompt",
      question: "Trace a dotted square (caregiver makes the dots).",
      model: "•   •   •   •",
      difficulty: "hard",
      explanation: "Caregiver: place dots like corners/sides; child connects slowly."
    },
    {
      id: "q59",
      type: "prompt",
      question: "Trace a dotted triangle (caregiver makes the dots).",
      model: "•   •   •",
      difficulty: "hard",
      explanation: "Three points are enough. Keep the dots far apart at first."
    },
    {
      id: "q60",
      type: "prompt",
      question: "Connect 3 dots in a row (caregiver places 3 dots).",
      model: "•   •   •",
      difficulty: "medium",
      explanation: "This makes two short lines—great for control and aiming."
    },
    {
      id: "q61",
      type: "prompt",
      question: "Connect 4 dots to make a square (caregiver places 4 corner dots).",
      model: "• • • •",
      difficulty: "hard",
      explanation: "Caregiver: place the dots like corners; child connects the corners."
    },
    {
      id: "q62",
      type: "prompt",
      question: "Colour inside a big triangle (caregiver draws the triangle).",
      model: "△",
      difficulty: "hard",
      explanation: "Staying inside is hard—aim for ‘mostly inside’ and praise effort."
    },
    {
      id: "q63",
      type: "prompt",
      question: "Colour inside a big rectangle (caregiver draws the rectangle).",
      model: "▭",
      difficulty: "hard",
      explanation: "Use short strokes. Turn the paper if it helps."
    },
    {
      id: "q64",
      type: "prompt",
      question: "Make a line of dots along a straight line (caregiver draws the line first).",
      model: "• • • • •",
      difficulty: "easy",
      explanation: "Caregiver draws a line; child ‘taps’ dots along it."
    },
    {
      id: "q65",
      type: "prompt",
      question: "Draw around your hand (caregiver helps hold still).",
      model: "✋",
      difficulty: "hard",
      explanation: "This is tricky—caregiver can guide lightly and keep it fun."
    },
    {
      id: "q66",
      type: "prompt",
      question: "Draw a path for a toy car (one long road line).",
      model: "🛣️",
      difficulty: "medium",
      explanation: "A ‘road’ can be straight or curvy. Let the child choose."
    },
    {
      id: "q67",
      type: "prompt",
      question: "Draw a 'rain' pattern: 8 short lines going down.",
      model: "||||||||",
      difficulty: "easy",
      explanation: "Short lines are easier than long ones—great for quick practice."
    },
    {
      id: "q68",
      type: "prompt",
      question: "Draw a 'fence' pattern (many lines, then one line across).",
      model: "|||—|||—|||",
      difficulty: "hard",
      explanation: "Caregiver can model first: lots of posts, then one long line."
    },
    {
      id: "q69",
      type: "prompt",
      question: "Draw 3 small circles inside a big circle (caregiver draws the big circle).",
      model: "◯ + ○○○",
      difficulty: "hard",
      explanation: "Caregiver draws the big circle; child adds the small circles inside."
    },
    {
      id: "q70",
      type: "prompt",
      question: "Make 10 'stamp dots' (caregiver supervises).",
      model: "● ● ● ● ● ● ● ● ● ●",
      difficulty: "easy",
      explanation: "Use a marker tip or dauber. Keep it washable and safe."
    },
    {
      id: "q71",
      type: "prompt",
      question: "Draw 5 tiny circles (like beads).",
      model: "° ° ° ° °",
      difficulty: "easy",
      explanation: "Tiny circles build finger control. Any little loops are fine."
    },
    {
      id: "q72",
      type: "prompt",
      question: "Draw a curved path that turns left, then right.",
      model: "〰",
      difficulty: "medium",
      explanation: "This practices direction changes without sharp corners."
    },
    {
      id: "q73",
      type: "prompt",
      question: "Draw one loop (like a lasso).",
      model: "⟲",
      difficulty: "medium",
      explanation: "Loops prepare for later letter strokes. One loop is enough."
    },
    {
      id: "q74",
      type: "prompt",
      question: "Try drawing a figure-8.",
      model: "∞",
      difficulty: "hard",
      explanation: "This is advanced—attempts count. Keep it slow and playful."
    },
    {
      id: "q75",
      type: "prompt",
      question: "Trace the first letter of your name (caregiver writes it big first).",
      model: "A / B / C",
      difficulty: "hard",
      explanation: "Big letters are easier. Tracing helps build confidence."
    },
    {
      id: "q76",
      type: "prompt",
      question: "Trace a big I (caregiver writes I first).",
      model: "I",
      difficulty: "medium",
      explanation: "An I is mostly straight lines—great early letter practice."
    },
    {
      id: "q77",
      type: "prompt",
      question: "Trace a big L (caregiver writes L first).",
      model: "L",
      difficulty: "medium",
      explanation: "An L uses two simple strokes: down, then across."
    },
    {
      id: "q78",
      type: "prompt",
      question: "Make 3 marks in a pattern: dot, line, dot.",
      model: "• — •",
      difficulty: "easy",
      explanation: "Patterns build attention and control with simple marks."
    },
    {
      id: "q79",
      type: "prompt",
      question: "Make 6 marks in a pattern: dot, line, dot, line, dot, line.",
      model: "• — • — • —",
      difficulty: "medium",
      explanation: "Go slowly and name each mark: “dot… line… dot…”"
    },
    {
      id: "q80",
      type: "prompt",
      question: "Draw a simple 'train track' pattern (two lines with small cross lines).",
      model: "||=||=||",
      difficulty: "hard",
      explanation: "Caregiver can draw two lines first; child adds the little ‘ties’."
    },

    /* Added questions (q81+) */
    {
      id: "q81",
      type: "prompt",
      question: "Scribble inside a big rectangle (caregiver draws the rectangle).",
      model: "▭",
      difficulty: "easy",
      explanation: "A big shape helps aim the scribbles. Any marks inside are a win."
    },
    {
      id: "q82",
      type: "prompt",
      question: "Make 5 dots inside a big circle (caregiver draws the circle).",
      model: "◯ + •••••",
      difficulty: "easy",
      explanation: "A ‘target’ shape helps children place marks with more control."
    },
    {
      id: "q83",
      type: "prompt",
      question: "Draw 5 short vertical lines (like grass).",
      model: "|||||",
      difficulty: "easy",
      explanation: "Short lines are easier than long ones and build quick control."
    },
    {
      id: "q84",
      type: "prompt",
      question: "Draw 5 short horizontal lines (like little roads).",
      model: "——— ——",
      difficulty: "easy",
      explanation: "Keep them short and separate. Praise effort over neatness."
    },
    {
      id: "q85",
      type: "prompt",
      question: "Copy this simple ‘stairs’ pattern.",
      model: "┐┐┐",
      difficulty: "medium",
      explanation: "Corners and direction changes are great practice. Go slowly."
    },
    {
      id: "q86",
      type: "prompt",
      question: "Draw a ‘snake’ line across the page (one long wavy line).",
      model: "~~~~~~~",
      difficulty: "medium",
      explanation: "Encourage one continuous line. Speed doesn’t matter."
    },
    {
      id: "q87",
      type: "prompt",
      question: "Draw a lollipop (a circle with one line down).",
      model: "○|",
      difficulty: "medium",
      explanation: "Caregiver can model first: circle, then a straight ‘stick’ line."
    },
    {
      id: "q88",
      type: "prompt",
      question: "Draw two circles stacked (like a snowman).",
      model: "○\n○",
      difficulty: "hard",
      explanation: "Two circles in a row is challenging—attempts count."
    },
    {
      id: "q89",
      type: "prompt",
      question: "Copy a plus sign (+) two times.",
      model: "+  +",
      difficulty: "medium",
      explanation: "Two simple strokes each time. Repeat for control."
    },
    {
      id: "q90",
      type: "prompt",
      question: "Draw 3 tiny dots, then 1 big dot.",
      model: "• • •  ●",
      difficulty: "medium",
      explanation: "Changing size helps planning and finger pressure control."
    },
    {
      id: "q91",
      type: "prompt",
      question: "Draw 3 small circles inside a big square (caregiver draws the square).",
      model: "□ + ○○○",
      difficulty: "hard",
      explanation: "Caregiver draws the square; child adds circles inside the space."
    },
    {
      id: "q92",
      type: "prompt",
      question: "Colour in just the top half of a big circle (caregiver draws the circle).",
      model: "◯ (top half)",
      difficulty: "hard",
      explanation: "Half-and-half colouring supports early control without strict accuracy."
    },
    {
      id: "q93",
      type: "prompt",
      question: "Draw a cloud shape (any bumpy shape).",
      model: "☁",
      difficulty: "hard",
      explanation: "Cloud bumps are like repeated curves. Any ‘cloud-ish’ outline is fine."
    },
    {
      id: "q94",
      type: "prompt",
      question: "Copy a row of bumps (4 bumps).",
      model: "∩∩∩∩",
      difficulty: "medium",
      explanation: "Repeated curves build smooth up-and-down movement."
    },
    {
      id: "q95",
      type: "prompt",
      question: "Draw a ladder (two lines, then 3 small lines across).",
      model: "||=|=||",
      difficulty: "hard",
      explanation: "Caregiver can draw the two long lines first; child adds the rungs."
    },
    {
      id: "q96",
      type: "prompt",
      question: "Draw a big circle, then put 2 dots inside (like eyes).",
      model: "◯ + • •",
      difficulty: "hard",
      explanation: "This builds ‘add parts’ drawing: a face starting step."
    },
    {
      id: "q97",
      type: "prompt",
      question: "Draw a simple face: circle + 2 eyes + a mouth line.",
      model: "☺ (simple)",
      difficulty: "hard",
      explanation: "Caregiver can model each step: circle, eyes, then a mouth."
    },
    {
      id: "q98",
      type: "prompt",
      question: "Trace a big X (caregiver writes X first).",
      model: "X",
      difficulty: "medium",
      explanation: "Tracing supports crossing strokes. Keep it large and slow."
    },
    {
      id: "q99",
      type: "prompt",
      question: "Draw a simple fish (oval body + triangle tail).",
      model: "⬭ + △",
      difficulty: "hard",
      explanation: "Caregiver can draw the oval first; child adds a triangle tail."
    },
    {
      id: "q100",
      type: "prompt",
      question: "Try drawing a star (caregiver draws one first for copying).",
      model: "★",
      difficulty: "hard",
      explanation: "Stars are advanced. Copying and any attempt is a success."
    },
    {
      id: "q101",
      type: "prompt",
      question: "Trace your name (caregiver writes it in big letters first).",
      model: "NAME",
      difficulty: "hard",
      explanation: "Tracing name letters builds control. Any letter attempt is OK."
    }
  ];



  // Added to normalize this bank to 111 items.
  QUESTIONS.push(
    {
      "id": "q102",
      "type": "prompt",
      "question": "Trace a big triangle.",
      "model": "?",
      "difficulty": "easy",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q103",
      "type": "prompt",
      "question": "Trace a small square.",
      "model": "?",
      "difficulty": "easy",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q104",
      "type": "prompt",
      "question": "Draw three short lines.",
      "model": "|||",
      "difficulty": "easy",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q105",
      "type": "prompt",
      "question": "Draw three big circles.",
      "model": "? ? ?",
      "difficulty": "easy",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q106",
      "type": "prompt",
      "question": "Copy a zigzag line.",
      "model": "/\\/\\",
      "difficulty": "easy",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q107",
      "type": "prompt",
      "question": "Draw a smiling face: circle, eyes, mouth.",
      "model": ":)",
      "difficulty": "medium",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q108",
      "type": "prompt",
      "question": "Trace a big letter A.",
      "model": "A",
      "difficulty": "medium",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q109",
      "type": "prompt",
      "question": "Trace a big letter B.",
      "model": "B",
      "difficulty": "medium",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q110",
      "type": "prompt",
      "question": "Draw a house: square and triangle roof.",
      "model": "? + ?",
      "difficulty": "medium",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },
    {
      "id": "q111",
      "type": "prompt",
      "question": "Copy your favourite shape two times.",
      "model": "? ?",
      "difficulty": "medium",
      "explanation": "Keep strokes large and slow. Any close try is fine."
    },

{
    "id": "q112",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q113",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q114",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q115",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q116",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q117",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q118",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q119",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q120",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},
{
    "id": "q121",
    "type": "prompt",
    "question": "Say the letter A and draw one thing that starts with A.",
    "difficulty": "easy",
    "explanation": "Use a clear sentence."
},

{
    "id": "q122",
    "type": "prompt",
    "question": "Trace letter C and say a word that starts with C.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q123",
    "type": "prompt",
    "question": "Draw a sun and say one sentence about it.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q124",
    "type": "prompt",
    "question": "Say your name and write the first letter.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q125",
    "type": "prompt",
    "question": "Draw your favorite food and name it.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q126",
    "type": "prompt",
    "question": "Trace letter D and clap the sounds in dog.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q127",
    "type": "prompt",
    "question": "Draw a ball and say its color.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q128",
    "type": "prompt",
    "question": "Write one short sentence about your pet.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q129",
    "type": "prompt",
    "question": "Draw your house and label one room.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q130",
    "type": "prompt",
    "question": "Say two action words you can do.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},
{
    "id": "q131",
    "type": "prompt",
    "question": "Write one sentence: I like ____.",
    "difficulty": "easy",
    "explanation": "Keep it short and clear."
},

{
    "id": "q132",
    "type": "prompt",
    "question": "Say the letter and draw one matching object.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q133",
    "type": "prompt",
    "question": "Write one short sentence about your day.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q134",
    "type": "prompt",
    "question": "Draw your favorite animal and label it.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q135",
    "type": "prompt",
    "question": "Write: I like ____.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q136",
    "type": "prompt",
    "question": "Say three words you know.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q137",
    "type": "prompt",
    "question": "Trace a letter and say its sound.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q138",
    "type": "prompt",
    "question": "Draw your home and name one room.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q139",
    "type": "prompt",
    "question": "Write one sentence about school.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q140",
    "type": "prompt",
    "question": "Say one color and one food.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q141",
    "type": "prompt",
    "question": "Write your name clearly.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q142",
    "type": "prompt",
    "question": "Say the letter and draw one matching object.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q143",
    "type": "prompt",
    "question": "Write one short sentence about your day.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q144",
    "type": "prompt",
    "question": "Draw your favorite animal and label it.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q145",
    "type": "prompt",
    "question": "Write: I like ____.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q146",
    "type": "prompt",
    "question": "Say three words you know.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q147",
    "type": "prompt",
    "question": "Trace a letter and say its sound.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q148",
    "type": "prompt",
    "question": "Draw your home and name one room.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q149",
    "type": "prompt",
    "question": "Write one sentence about school.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q150",
    "type": "prompt",
    "question": "Say one color and one food.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
},
{
    "id": "q151",
    "type": "prompt",
    "question": "Write your name clearly.",
    "difficulty": "easy",
    "explanation": "Keep your answer short and clear."
}



  );
  window.UEAH_TEST_BANKS = window.UEAH_TEST_BANKS || {};
  window.UEAH_TEST_BANKS[SLUG] = QUESTIONS;
})();
