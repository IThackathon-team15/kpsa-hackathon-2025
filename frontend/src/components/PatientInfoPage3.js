import React, { useState } from 'react';

const PatientInfoPage3 = ({ onNext }) => {
  const [metastasisSites, setMetastasisSites] = useState([]);
  const [geneticMutations, setGeneticMutations] = useState([]);
  const [treatmentHistory, setTreatmentHistory] = useState({
    chemotherapy: false,
    radiation: false,
    surgery: false
  });
  const [dataConnected, setDataConnected] = useState(false);

  // 흔한 전이 부위
  const commonMetastasisSites = [
    { value: 'lung', label: '폐', icon: '🫁' },
    { value: 'liver', label: '간', icon: '🫀' },
    { value: 'bone', label: '뼈', icon: '🦴' },
    { value: 'brain', label: '뇌', icon: '🧠' },
    { value: 'lymph', label: '림프절', icon: '🔗' },
    { value: 'none', label: '전이 없음', icon: '✅' }
  ];

  // 흔한 암 유전자 변이
  const commonGeneticMutations = [
    { value: 'EGFR', label: 'EGFR', icon: '🧬' },
    { value: 'KRAS', label: 'KRAS', icon: '🧬' },
    { value: 'TP53', label: 'TP53', icon: '🧬' },
    { value: 'BRCA1', label: 'BRCA1', icon: '🧬' },
    { value: 'BRCA2', label: 'BRCA2', icon: '🧬' },
    { value: 'ALK', label: 'ALK', icon: '🧬' },
    { value: 'ROS1', label: 'ROS1', icon: '🧬' },
    { value: 'HER2', label: 'HER2', icon: '🧬' },
    { value: 'PIK3CA', label: 'PIK3CA', icon: '🧬' },
    { value: 'none', label: '변이 없음', icon: '✅' }
  ];

  const handleMetastasisToggle = (site) => {
    if (site === 'none') {
      setMetastasisSites(['none']);
    } else {
      setMetastasisSites(prev => {
        const filtered = prev.filter(s => s !== 'none');
        if (filtered.includes(site)) {
          return filtered.filter(s => s !== site);
        } else {
          return [...filtered, site];
        }
      });
    }
  };

  const handleGeneticMutationToggle = (mutation) => {
    if (mutation === 'none') {
      setGeneticMutations(['none']);
    } else {
      setGeneticMutations(prev => {
        const filtered = prev.filter(m => m !== 'none');
        if (filtered.includes(mutation)) {
          return filtered.filter(m => m !== mutation);
        } else {
          return [...filtered, mutation];
        }
      });
    }
  };

  const handleTreatmentToggle = (treatment) => {
    setTreatmentHistory(prev => ({
      ...prev,
      [treatment]: !prev[treatment]
    }));
  };

  const handleDataConnection = () => {
    // 더미 데이터로 자동 입력
    setMetastasisSites(['liver', 'lung']);
    setGeneticMutations(['EGFR', 'TP53']);
    setTreatmentHistory({
      chemotherapy: true,
      radiation: true,
      surgery: true
    });
    setDataConnected(true);
  };

  const handleNext = () => {
    const data = {
      metastasisSites,
      geneticMutations,
      treatmentHistory,
      dataConnected
    };
    console.log('Page 3 data:', data);
    if (onNext) {
      onNext(data);
    }
  };

  const isFormComplete = () => {
    return metastasisSites.length > 0 && 
           geneticMutations.length > 0 && 
           (treatmentHistory.chemotherapy || treatmentHistory.radiation || treatmentHistory.surgery);
  };

  return (
    <div className="patient-info-container">
      <div className="progress-bar">
        <div className="progress-step completed">1</div>
        <div className="progress-line completed"></div>
        <div className="progress-step completed">2</div>
        <div className="progress-line completed"></div>
        <div className="progress-step active">3</div>
      </div>

      <h1 className="page-title">유전자 검사 결과 및 치료 이력</h1>
      <p className="page-subtitle">상세 의료 정보를 입력해주세요</p>

      {/* 암 전이 위치 */}
      <div className="selection-section">
        <h3 className="section-title">암 전이 위치</h3>
        <div className="multi-option-group">
          {commonMetastasisSites.map((site) => (
            <button
              key={site.value}
              className={`multi-option-btn ${metastasisSites.includes(site.value) ? 'selected' : ''}`}
              onClick={() => handleMetastasisToggle(site.value)}
            >
              <div className="option-icon">{site.icon}</div>
              <span>{site.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 유전자 변이 정보 */}
      <div className="selection-section">
        <h3 className="section-title">유전자 변이 정보</h3>
        <div className="multi-option-group">
          {commonGeneticMutations.map((mutation) => (
            <button
              key={mutation.value}
              className={`multi-option-btn ${geneticMutations.includes(mutation.value) ? 'selected' : ''}`}
              onClick={() => handleGeneticMutationToggle(mutation.value)}
            >
              <div className="option-icon">{mutation.icon}</div>
              <span>{mutation.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 치료 이력 */}
      <div className="selection-section">
        <h3 className="section-title">치료 이력</h3>
        <div className="treatment-group">
          <button
            className={`treatment-btn ${treatmentHistory.chemotherapy ? 'selected' : ''}`}
            onClick={() => handleTreatmentToggle('chemotherapy')}
          >
            <div className="treatment-icon">💊</div>
            <span>항암치료</span>
          </button>
          <button
            className={`treatment-btn ${treatmentHistory.radiation ? 'selected' : ''}`}
            onClick={() => handleTreatmentToggle('radiation')}
          >
            <div className="treatment-icon">☢️</div>
            <span>방사선치료</span>
          </button>
          <button
            className={`treatment-btn ${treatmentHistory.surgery ? 'selected' : ''}`}
            onClick={() => handleTreatmentToggle('surgery')}
          >
            <div className="treatment-icon">🔪</div>
            <span>수술</span>
          </button>
        </div>
      </div>

      {/* 기관 데이터 연동 */}
      <div className="data-connection-section">
        <h3 className="section-title">기관 데이터 연동</h3>
        <p className="connection-description">
          병원 시스템과 연동하여 정확한 의료 정보를 자동으로 가져옵니다.
        </p>
        
        {!dataConnected ? (
          <button 
            className="data-connection-btn"
            onClick={handleDataConnection}
          >
            <div className="connection-icon">🏥</div>
            <span>기관 데이터 연동하기</span>
          </button>
        ) : (
          <div className="connection-success">
            <div className="success-icon">✅</div>
            <p>기관 데이터 연동이 완료되었습니다.</p>
            <div className="connected-data">
              <p><strong>연동된 데이터:</strong></p>
              <ul>
                <li>전이 부위: 간, 폐</li>
                <li>유전자 변이: EGFR, TP53</li>
                <li>치료 이력: 항암치료, 방사선치료, 수술</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <button 
        className={`next-btn ${isFormComplete() ? 'enabled' : 'disabled'}`}
        onClick={handleNext}
        disabled={!isFormComplete()}
      >
        다음
      </button>
    </div>
  );
};

export default PatientInfoPage3;