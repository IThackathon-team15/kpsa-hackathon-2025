import React, { useState, useEffect } from 'react';
import { getCancerTypeInfo } from '../services/cbioportalApi';
import './PatientInfoPage2.css';

const PatientInfoPage2 = ({ onNext }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [passAuthenticated, setPassAuthenticated] = useState(false);
  const [cancerTypeData, setCancerTypeData] = useState(null);
  const [isLoadingCancerData, setIsLoadingCancerData] = useState(false);

  const questions = [
    {
      id: 'cancer_diagnosis',
      title: '암 진단 받으셨나요?',
      options: [
        { value: 'yes', label: '예', icon: '✅' },
        { value: 'no', label: '아니오', icon: '❌' }
      ]
    },
    {
      id: 'cancer_type',
      title: '어떤 암 진단 받으셨나요?',
      options: [
        { value: 'thyroid', label: '갑상선암', icon: '🦋', cancerTypeId: 'thme' },
        { value: 'colon', label: '대장암', icon: '🩺', cancerTypeId: 'coad' },
        { value: 'lung', label: '폐암', icon: '🫁', cancerTypeId: 'luad' },
        { value: 'breast', label: '유방암', icon: '🎀', cancerTypeId: 'mbc' },
        { value: 'stomach', label: '위암', icon: '🫃', cancerTypeId: 'stad' },
        { value: 'prostate', label: '전립선암', icon: '♂️', cancerTypeId: 'bccp' },
        { value: 'liver', label: '간암', icon: '🫀', cancerTypeId: 'hcc' },
        { value: 'other', label: '기타', icon: '📋' }
      ],
      showIf: (answers) => answers.cancer_diagnosis === 'yes'
    }
  ];

  const handleAnswer = async (questionId, value) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    
    // 암 종류를 선택했을 때 API 호출
    if (questionId === 'cancer_type' && value !== 'other') {
      const selectedOption = questions[1].options.find(option => option.value === value);
      if (selectedOption && selectedOption.cancerTypeId) {
        setIsLoadingCancerData(true);
        try {
          const cancerData = await getCancerTypeInfo(selectedOption.cancerTypeId);
          setCancerTypeData(cancerData);
          console.log('Cancer type data:', cancerData);
        } catch (error) {
          console.error('Failed to fetch cancer type data:', error);
          setCancerTypeData(null);
        } finally {
          setIsLoadingCancerData(false);
        }
      }
    }
    
    // 다음 질문으로 이동하거나 PASS 인증으로 이동
    const nextQuestionIndex = currentQuestion + 1;
    
    // 모든 필요한 질문에 답변했는지 확인
    const allAnswered = questions.every(question => {
      if (question.showIf && !question.showIf(newAnswers)) {
        return true; // 조건에 맞지 않는 질문은 답변하지 않아도 됨
      }
      return newAnswers[question.id];
    });
    
    if (allAnswered) {
      // 모든 질문에 답변했으면 PASS 인증으로 이동
      setCurrentQuestion(questions.length);
    } else if (nextQuestionIndex < questions.length) {
      const nextQuestion = questions[nextQuestionIndex];
      if (!nextQuestion.showIf || nextQuestion.showIf(newAnswers)) {
        setCurrentQuestion(nextQuestionIndex);
      } else {
        // 조건에 맞지 않으면 그 다음 질문으로
        setCurrentQuestion(nextQuestionIndex + 1);
      }
    }
  };

  const handlePassAuth = () => {
    setPassAuthenticated(true);
  };

  const handleNext = () => {
    const data = {
      cancerDiagnosis: answers.cancer_diagnosis,
      cancerType: answers.cancer_type,
      cancerTypeData: cancerTypeData,
      passAuthenticated
    };
    console.log('Page 2 data:', data);
    if (onNext) {
      onNext(data);
    }
  };

  const getCurrentQuestion = () => {
    return questions[currentQuestion];
  };

  const isAllQuestionsAnswered = () => {
    return questions.every(question => {
      if (question.showIf && !question.showIf(answers)) {
        return true; // 조건에 맞지 않는 질문은 답변하지 않아도 됨
      }
      return answers[question.id];
    });
  };

  const currentQ = getCurrentQuestion();
  const showPassAuth = currentQuestion >= questions.length;
  const showNextButton = showPassAuth && passAuthenticated;

  return (
    <div className="patient-info-container">
      <div className="progress-bar">
        <div className="progress-step completed">1</div>
        <div className="progress-line completed"></div>
        <div className="progress-step active">2</div>
        <div className="progress-line"></div>
        <div className="progress-step">3</div>
      </div>

      <h1 className="page-title">환자 정보 입력</h1>
      <p className="page-subtitle">추가 정보를 입력해주세요</p>

      {!showPassAuth && currentQ && (
        <div className="question-section">
          <h3 className="section-title">{currentQ.title}</h3>
          <div className="option-group">
            {currentQ.options.map((option) => (
              <button
                key={option.value}
                className={`option-btn ${answers[currentQ.id] === option.value ? 'selected' : ''}`}
                onClick={() => handleAnswer(currentQ.id, option.value)}
                disabled={isLoadingCancerData}
              >
                <div className="option-icon">{option.icon}</div>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
          
          {/* 암 종류 데이터 로딩 상태 */}
          {isLoadingCancerData && (
            <div className="loading-indicator">
              <p>암 종류 정보를 불러오는 중...</p>
            </div>
          )}
          
          {/* 암 종류 데이터 표시 */}
          {cancerTypeData && answers.cancer_type && (
            <div className="cancer-info-card">
              <h4>선택한 암 종류 정보</h4>
              <div className="cancer-details">
                <p><strong>이름:</strong> {cancerTypeData.name}</p>
                <p><strong>약어:</strong> {cancerTypeData.shortName}</p>
                <p><strong>분류:</strong> {cancerTypeData.parent}</p>
                <div className="cancer-color" style={{backgroundColor: cancerTypeData.dedicatedColor, width: '20px', height: '20px', borderRadius: '50%', display: 'inline-block'}}></div>
                <span style={{marginLeft: '8px'}}>대표 색상</span>
              </div>
            </div>
          )}
        </div>
      )}

      {showPassAuth && (
        <div className="pass-auth-section">
          <h3 className="section-title">건강보험 및 검사결과 데이터 연동</h3>
          <p className="auth-description">
            정확한 진료 정보 제공을 위해 PASS 인증을 통해 
            건강보험공단 데이터와 연동합니다.
          </p>
          
          {!passAuthenticated ? (
            <button 
              className="pass-auth-btn"
              onClick={handlePassAuth}
            >
              <div className="auth-icon">🔐</div>
              <span>PASS 인증하기</span>
            </button>
          ) : (
            <div className="auth-success">
              <div className="success-icon">✅</div>
              <p>PASS 인증이 완료되었습니다.</p>
            </div>
          )}
        </div>
      )}

      {showNextButton && (
        <button 
          className="next-btn enabled"
          onClick={handleNext}
        >
          다음
        </button>
      )}
    </div>
  );
};

export default PatientInfoPage2;