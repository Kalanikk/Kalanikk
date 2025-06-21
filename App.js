import React, { useState } from 'react';

const questions = [
  {
    questionText: 'What is the capital of Sri Lanka?',
    answerOptions: [
      { answerText: 'Colombo', isCorrect: true },
      { answerText: 'Kandy', isCorrect: false },
      { answerText: 'Galle', isCorrect: false },
      { answerText: 'Jaffna', isCorrect: false },
    ],
  },
  {
    questionText: 'Who discovered gravity?',
    answerOptions: [
      { answerText: 'Albert Einstein', isCorrect: false },
      { answerText: 'Isaac Newton', isCorrect: true },
      { answerText: 'Galileo Galilei', isCorrect: false },
      { answerText: 'Stephen Hawking', isCorrect: false },
    ],
  },
  {
    questionText: 'What is 5 + 3?',
    answerOptions: [
      { answerText: '8', isCorrect: true },
      { answerText: '6', isCorrect: false },
      { answerText: '9', isCorrect: false },
      { answerText: '7', isCorrect: false },
    ],
  },
  {
    questionText: 'Which planet is known as the Red Planet?',
    answerOptions: [
      { answerText: 'Earth', isCorrect: false },
      { answerText: 'Venus', isCorrect: false },
      { answerText: 'Mars', isCorrect: true },
      { answerText: 'Jupiter', isCorrect: false },
    ],
  },
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerButtonClick = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', textAlign: 'center', marginTop: '50px', fontFamily: 'Arial' }}>
      <h1>Quiz Game</h1>
      {showScore ? (
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={() => window.location.reload()}>Play Again</button>
        </div>
      ) : (
        <>
          <h3>Question {currentQuestion + 1} of {questions.length}</h3>
          <p>{questions[currentQuestion].questionText}</p>
          {questions[currentQuestion].answerOptions.map((answerOption, index) => (
            <button
              key={index}
              onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}
              style={{
                display: 'block',
                width: '100%',
                margin: '10px 0',
                padding: '10px',
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              {answerOption.answerText}
            </button>
          ))}
        </>
      )}
    </div>
  );
}

export default App;
