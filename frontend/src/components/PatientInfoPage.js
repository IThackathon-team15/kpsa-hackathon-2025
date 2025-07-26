import React, { useState } from 'react';

const PatientInfoPage = ({ onNext }) => {
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');

  const handleNext = () => {
    if (nationality && gender) {
      const data = { nationality, gender };
      console.log('Page 1 data:', data);
      if (onNext) {
        onNext(data);
      }
    } else {
      alert('국적과 성별을 모두 선택해주세요.');
    }
  };

  return (
    <div className="patient-info-container">
      <div className="progress-bar">
        <div className="progress-step active">1</div>
        <div className="progress-line"></div>
        <div className="progress-step">2</div>
        <div className="progress-line"></div>
        <div className="progress-step">3</div>
      </div>

      <h1 className="page-title">환자 정보 시작하기</h1>
      <p className="page-subtitle">기본 정보를 입력해주세요</p>

      <div className="selection-section">
        <h3 className="section-title">국적</h3>
        <div className="option-group">
          <button
            className={`option-btn ${nationality === 'domestic' ? 'selected' : ''}`}
            onClick={() => setNationality('domestic')}
          >
            <div className="option-icon">🇰🇷</div>
            <span>내국인</span>
          </button>
          <button
            className={`option-btn ${nationality === 'foreign' ? 'selected' : ''}`}
            onClick={() => setNationality('foreign')}
          >
            <div className="option-icon">🌍</div>
            <span>외국인</span>
          </button>
        </div>
      </div>

      <div className="selection-section">
        <h3 className="section-title">성별</h3>
        <div className="option-group">
          <button
            className={`option-btn ${gender === 'male' ? 'selected' : ''}`}
            onClick={() => setGender('male')}
          >
            <div className="option-icon">👨</div>
            <span>남성</span>
          </button>
          <button
            className={`option-btn ${gender === 'female' ? 'selected' : ''}`}
            onClick={() => setGender('female')}
          >
            <div className="option-icon">👩</div>
            <span>여성</span>
          </button>
        </div>
      </div>

      <button
        className={`next-btn ${nationality && gender ? 'enabled' : 'disabled'}`}
        onClick={handleNext}
        disabled={!nationality || !gender}
      >
        다음
      </button>
    </div>
  );
};

export default PatientInfoPage;