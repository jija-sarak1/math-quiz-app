import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

function MathQuizApp() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [answer, setAnswer] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [operation, setOperation] = useState('+'); // Initialize with addition

  const generateQuestion = useCallback(() => {
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operationOptions = ['+', '-', '*', '/'];
    const randomOperation = operationOptions[Math.floor(Math.random() * operationOptions.length)];
    let answer = 0;

    switch (randomOperation) {
      case '+':
        answer = num1 + num2;
        break;
      case '-':
        answer = num1 - num2;
        break;
      case '*':
        answer = num1 * num2;
        break;
      case '/':
        answer = (num1 / num2).toFixed(2); // Round to 2 decimal places for division
        break;
      default:
        break;
    }

    setNum1(num1);
    setNum2(num2);
    setAnswer(answer);
    setUserAnswer('');
    setOperation(randomOperation);
  }, []);

  useEffect(() => {
    generateQuestion();
  }, [generateQuestion]);

  const checkAnswer = () => {
    if (userAnswer !== '') {
      if (parseFloat(userAnswer) === parseFloat(answer)) {
        setScore(score + 1);
        setCorrectAnswers(correctAnswers + 1);
      } else {
        setWrongAnswers(wrongAnswers + 1);
      }
      setTotalQuestions(totalQuestions + 1);
      generateQuestion();
    }
  };

  const handleChange = (e) => {
    setUserAnswer(e.target.value);
  };

  return (
    <div className="App">
      <h1>Math Quiz</h1>
      <div className="score-container">
        <div className="score-labels">
          <div className="score-label">
            <p>Total</p>
            <p>{totalQuestions}</p>
          </div>
          <div className="score-label">
            <p>Correct</p>
            <p>{correctAnswers}</p>
          </div>
          <div className="score-label">
            <p>Wrong</p>
            <p>{wrongAnswers}</p>
          </div>
        </div>
      </div>
      <div className="question-container">
        <h1>
          {num1} {operation} {num2}
        </h1>
        <div className="input-container">
          <input
            type="text"
            value= {userAnswer}
            onChange={handleChange}
          />
          <button onClick={checkAnswer}>Answer</button>
        </div>
      </div>
    </div>
  );
}

export default MathQuizApp;
