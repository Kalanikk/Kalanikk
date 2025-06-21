const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const quizScreen = document.getElementById("quiz-screen");
const startScreen = document.getElementById("start-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("time");
const highScoreText = document.getElementById("high-score");


let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;



const questions = [
  {
    question: "What is the capital of Sri Lanka?",
    answers: [
      { text: "Colombo", correct: false },
      { text: "Kandy", correct: false },
      { text: "Sri Jayawardenepura Kotte", correct: true },
      { text: "Galle", correct: false }
    ]
  },
  {
    question: "What is 10 + 15?",
    answers: [
      { text: "25", correct: false },
      { text: "20", correct: false },
      { text: "30", correct: false },
      { text: "25", correct: true }
    ]
  },
  {
    question: "Which language is used to style websites?",
    answers: [
      { text: "HTML", correct: false },
      { text: "CSS", correct: true },
      { text: "Java", correct: false },
      { text: "Python", correct: false }
    ]
  }
];

window.onload = () => {
  const best = localStorage.getItem("highScore") || 0;
  highScoreText.innerText = `Your Best Score: ${best}`;
};






startBtn.addEventListener("click", startQuiz);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});
restartBtn.addEventListener("click", startQuiz);

function startQuiz() {
  startScreen.classList.add("hide");
  resultScreen.classList.add("hide");
  quizScreen.classList.remove("hide");
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  if (currentQuestionIndex < questions.length) {
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
  } else {
    showResult();
  }
}

function showQuestion(questionObj) {
  questionElement.innerText = questionObj.question;
  questionObj.answers.forEach(answer => {
    const btn = document.createElement("button");
    btn.innerText = answer.text;
    btn.classList.add("btn");
    if (answer.correct) {
      btn.dataset.correct = true;
    }
    btn.addEventListener("click", selectAnswer);
    answerButtons.appendChild(btn);
  });
}

function resetState() {
  nextBtn.classList.add("hide");
  answerButtons.innerHTML = "";
clearInterval(timer);
  timeLeft = 10;
  timerDisplay.innerText = timeLeft;


}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";
  if (correct) score++;
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });

  clearInterval(timer);
  nextBtn.classList.remove("hide");
}

function setStatusClass(element, correct) {
  element.classList.add(correct ? "correct" : "wrong");
}

function showResult() {
  quizScreen.classList.add("hide");
  resultScreen.classList.remove("hide");
  scoreDisplay.innerText = `${score} / ${questions.length}`;
const best = localStorage.getItem("highScore") || 0;
  if (score > best) {
    localStorage.setItem("highScore", score);
    highScoreText.innerText = `Your Best Score: ${score}`;
  }

}

function startTimer() {
  timerDisplay.innerText = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      autoSkip();
    }
  }, 1000);
}

function autoSkip() {
  Array.from(answerButtons.children).forEach(button => {
    setStatusClass(button, button.dataset.correct === "true");
    button.disabled = true;
  });
  nextBtn.classList.remove("hide");
}