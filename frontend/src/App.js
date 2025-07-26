import React, { useState } from 'react';
import WelcomePage from './components/WelcomePage';
import PatientInfoPage from './components/PatientInfoPage';
import PatientInfoPage2 from './components/PatientInfoPage2';
import PatientInfoPage3 from './components/PatientInfoPage3';
import MainPage from './components/MainPage';
import ShopPage from './components/ShopPage';
import MembershipPage from './components/MembershipPage';
import QuizView from './components/QuizView';
import { patientAPI } from './services/api';
import './App.css';

function App() {
  const [storeType, setStoreType] = useState('stomach');
  const [currentPage, setCurrentPage] = useState('welcome');
  const [currentUser, setCurrentUser] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [patientData, setPatientData] = useState({});

  // 기존 사용자 로그인 (메인 페이지로 이동)
  const handleExistingUser = (user) => {
    setCurrentUser(user);
    setCurrentPage('main');
  };

  // 새 사용자 로그인 (환자 정보 입력 시작)
  const handleNewUserLogin = (phone) => {
    setPhoneNumber(phone);
    setCurrentPage('patientInfo');
  };

  // Google 로그인 (임시로 환자 정보 페이지로)
  const handleGoogleLogin = () => {
    setCurrentPage('patientInfo');
  };

  // 1페이지 → 2페이지
  const handleNextToPage2 = (data) => {
    setPatientData(prev => ({ ...prev, ...data }));
    setCurrentPage('patientInfo2');
  };

  // 2페이지 → 3페이지
  const handleNextToPage3 = (data) => {
    setPatientData(prev => ({ ...prev, ...data }));
    setCurrentPage('patientInfo3');
  };

  // 3페이지 완료 → 백엔드 전송 후 메인 페이지
  const handleCompletePatientInfo = async (data) => {
    const finalPatientData = {
      ...patientData,
      ...data,
      phoneNumber
    };
    
    try {
      console.log('Sending patient data to backend:', finalPatientData);
      
      // 백엔드로 환자 정보 전송
      const response = await patientAPI.savePatientInfo(finalPatientData);
      
      console.log('Patient data saved successfully:', response);
      
      // 사용자 정보 설정 후 메인 페이지로 이동
      setCurrentUser({
        id: response.userId,
        phoneNumber,
        ...response.user
      });
      setCurrentPage('main');
      
    } catch (error) {
      console.error('Failed to save patient data:', error);
      //alert('정보 저장에 실패했습니다. 다시 시도해주세요.');
      
      // 개발용: 에러 발생 시에도 메인 페이지로 이동
      setCurrentUser({
        phoneNumber,
        name: '사용자'
      });
      setCurrentPage('main');
    }
  };

  // 쇼핑 페이지로 이동
  const handleGoToShop = (type) => {
    setStoreType(type || 'stomach'); // 기본값 fallback
    setCurrentPage('shop');
  };

  // 멤버십 페이지로 이동
  const handleGoToMembership = () => {
    setCurrentPage('membership');
  };

  // 퀴즈 페이지로 이동
  const handleGoToQuiz = () => {
    setCurrentPage('quiz');
  };

  // 메인 페이지로 돌아가기
  const handleBackToMain = () => {
    setCurrentPage('main');
  };

  // 로그아웃
  const handleLogout = () => {
    setCurrentUser(null);
    setPhoneNumber('');
    setPatientData({});
    setCurrentPage('welcome');
  };

  return (
    <div className="App">
      {currentPage === 'welcome' && (
        <WelcomePage 
          onLogin={handleNewUserLogin}
          onExistingUser={handleExistingUser}
        />
      )}
      {currentPage === 'patientInfo' && (
        <PatientInfoPage onNext={handleNextToPage2} />
      )}
      {currentPage === 'patientInfo2' && (
        <PatientInfoPage2 onNext={handleNextToPage3} />
      )}
      {currentPage === 'patientInfo3' && (
        <PatientInfoPage3 onNext={handleCompletePatientInfo} />
      )}
      {currentPage === 'main' && (
        <MainPage 
          user={currentUser}
          onLogout={handleLogout}
          onGoToShop={handleGoToShop}
          onGoToMembership={handleGoToMembership}
          onGoToQuiz={handleGoToQuiz}
        />
      )}
      {currentPage === 'shop' && (
        <ShopPage 
          user={currentUser}
          onBackToMain={handleBackToMain}
          storeType={storeType}
        />
      )}
      {currentPage === 'membership' && (
        <MembershipPage 
          user={currentUser}
          onBackToMain={handleBackToMain}
        />
      )}
      {currentPage === 'quiz' && (
        <QuizView 
          user={currentUser}
          onBackToMain={handleBackToMain}
        />
      )}
    </div>
  );
}

export default App;