const quizData = [
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "80°C"],
    correct: 1
  },
  {
    question: "Solve: 5 + 3 × 2",
    options: ["16", "11", "13", "10"],
    correct: 1
  },
  {
    question: "Capital of Sri Lanka?",
    options: ["Galle", "Kandy", "Colombo", "Sri Jayawardenepura Kotte"],
    correct: 3
  },
  {
    question: "Which is a mammal?",
    options: ["Shark", "Whale", "Eagle", "Crocodile"],
    correct: 1
  },
  {
    question: "12 × 8 = ?",
    options: ["96", "82", "108", "88"],
    correct: 0
  },
  {
    question: "Gas used in balloons?",
    options: ["Hydrogen", "Oxygen", "Helium", "Nitrogen"],
    correct: 2
  },
  {
    question: "Largest planet?",
    options: ["Earth", "Mars", "Saturn", "Jupiter"],
    correct: 3
  },
  {
    question: "H2O is the chemical formula for?",
    options: ["Salt", "Water", "Oxygen", "Carbon dioxide"],
    correct: 1
  }
];

let currentQuestion = 0;
let score = 0;

const quizEl = document.getElementById("quiz");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

function showQuestion() {
  const q = quizData[currentQuestion];
  quizEl.innerHTML = `
    <div class="question">${q.question}</div>
    <ul class="options">
      ${q.options.map((opt, i) => `<li onclick="selectAnswer(this, ${i})">${opt}</li>`).join("")}
    </ul>
  `;
  nextBtn.style.display = "none";
}

function selectAnswer(selectedEl, selectedIndex) {
  const q = quizData[currentQuestion];
  const optionEls = document.querySelectorAll(".options li");

  optionEls.forEach((el, i) => {
    el.onclick = null; // disable all
    if (i === q.correct) el.classList.add("correct");
    if (i === selectedIndex && i !== q.correct) el.classList.add("wrong");
  });

  if (selectedIndex === q.correct) {
    score++;
  }

  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  quizEl.innerHTML = "";
  nextBtn.style.display = "none";
  resultEl.classList.remove("hidden");
  resultEl.innerHTML = `🎉 Congratulations! You scored ${score} out of ${quizData.length}!`;
}

showQuestion();
