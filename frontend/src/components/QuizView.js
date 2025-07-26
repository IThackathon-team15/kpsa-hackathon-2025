import React, { useState } from 'react';
import './QuizView.css';

const QuizView = () => {
  const [selectedAnswer, setSelectedAnswer] = useState('A');

  const question = "아래 중 항생제를 먹어야 하는 경우는 어떤 경우일까요?";
  
  const options = [
    { id: 'A', text: '바이러스 감기' },
    { id: 'B', text: '머리가 아플 때' },
    { id: 'C', text: '세균 감염일 때' },
    { id: 'D', text: '졸릴 때' }
  ];

  const handleAnswerSelect = (answerId) => {
    setSelectedAnswer(answerId);
  };

  const handleCheck = () => {
    // Handle quiz submission logic here
    console.log('Selected answer:', selectedAnswer);
  };

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h2 className="quiz-question">{question}</h2>
      </div>

      <div className="quiz-illustration">
        <div className="doctor-patient-scene">
          {/* Placeholder for illustration - you can add an image or SVG here */}
          <div className="illustration-placeholder">
            <div className="doctor-figure"></div>
            <div className="patient-figure"></div>
            <div className="medical-charts"></div>
          </div>
        </div>
      </div>

      <div className="quiz-options">
        {options.map((option) => (
          <div
            key={option.id}
            className={`option-item ${selectedAnswer === option.id ? 'selected' : ''}`}
            onClick={() => handleAnswerSelect(option.id)}
          >
            <div className="option-indicator">
              {selectedAnswer === option.id && <div className="checkmark">✓</div>}
            </div>
            <span className="option-text">
              {option.id}. {option.text}
            </span>
          </div>
        ))}
      </div>

      <button className="check-button" onClick={handleCheck}>
        Check
      </button>
    </div>
  );
};

export default QuizView;