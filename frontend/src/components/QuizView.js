import React, { useState } from 'react';
import imageIcon from '../assets/image.png';
import quizData from '../data/Quizdata.json';
import './QuizView.css';

const QuizView = ({ onBackToMain }) => {
    const [selectedAnswer, setSelectedAnswer] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const [earnedPoints, setEarnedPoints] = useState(0);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);

    const currentQuestion = quizData.questions[currentQuestionIndex];

    const handleAnswerSelect = (answerIndex) => {
        if (!showResult) {
            setSelectedAnswer(answerIndex);
        }
    };

    const handleCheck = () => {
        const correct = selectedAnswer === currentQuestion.correctAnswer;
        setIsCorrect(correct);
        setShowResult(true);

        if (correct) {
            setEarnedPoints(currentQuestion.points);
            setShowSuccessModal(true);
            // Here you would typically save points to user's account
            console.log(`정답! ${currentQuestion.points}포인트 적립되었습니다.`);
        } else {
            setEarnedPoints(0);
            setShowFailModal(true);
            console.log('틀렸습니다. 다시 시도해보세요!');
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < quizData.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(0);
            setShowResult(false);
            setIsCorrect(false);
            setEarnedPoints(0);
            setShowSuccessModal(false);
        } else {
            // All questions completed
            onBackToMain();
        }
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
    };

    const getIllustrationEmoji = (illustration) => {
        const emojiMap = {
            'fruits-vegetables': '🍎🥬',
            'walking': '🚶‍♂️',
            'water-glass': '💧🥤',
            'hand-wash': '🧼👐',
            'journaling': '📝✍️'
        };
        return emojiMap[illustration] || '🩺💊';
    };

    return (
        <div className="main-page-container">
            {/* Header Section - MainPage와 동일한 디자인 */}
            <div className="header-content" style={{
                background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
                padding: '40px 20px 30px',
                borderRadius: '0 0 20px 20px',
                color: 'white',
                position: 'relative',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <div>
                    <button
                        onClick={onBackToMain}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'white',
                            fontSize: '24px',
                            cursor: 'pointer',
                            padding: '0',
                            marginBottom: '10px'
                        }}
                    >
                        ←
                    </button>
                    <h1 className="completion-rate" style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>오늘의 건강 퀴즈</h1>
                    <p className="completion-subtitle" style={{ fontSize: '14px', opacity: '0.9', margin: '0' }}>건강 지식을 테스트해보세요</p>
                    <div className="header-icons" style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                        <span className="icon" style={{ fontSize: '20px', opacity: '0.9' }}>🔔</span>
                        <span className="icon" style={{ fontSize: '20px', opacity: '0.9' }}>💬</span>
                    </div>
                </div>
                <div className="profile-circle" style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img src={imageIcon} alt="Profile" style={{ width: '24px', height: '24px', opacity: '0.8' }} />
                </div>
            </div>

            {/* Quiz Content */}
            <div style={{ padding: '20px' }}>
                {/* Quiz Question Card */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E5E7EB'
                }}>
                    <div className="card-content">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                            {/* <span style={{ fontSize: '14px', color: '#6B7280', fontWeight: '500' }}>
                                문제 {currentQuestionIndex + 1} / {quizData.questions.length}
                            </span> */}
                            <span style={{  width: '50px', fontSize: '14px', color: '#059669', fontWeight: '600', marginRight: '1px', }}>
                                <p>{currentQuestion.points} p</p>
                                <p styple={{fontSize: '9px'}}>포인트</p>
                            </span>
                        </div>
                        <h2 style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#111827',
                            margin: '0',
                            lineHeight: '1.4'
                        }}>
                            {currentQuestion.question}
                        </h2>
                    </div>
                </div>

                {/* Quiz Illustration */}
                <div style={{
                    backgroundColor: 'white',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #E5E7EB',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <div className="card-content">
                        <div style={{
                            width: '280px',
                            height: '180px',
                            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            border: '2px solid #E0F2FE'
                        }}>
                            {getIllustrationEmoji(currentQuestion.illustration)}
                        </div>
                    </div>
                </div>

                {/* Quiz Options */}
                <div style={{ marginBottom: '20px' }}>
                    {currentQuestion.options.map((option, index) => {
                        let borderColor = '#E5E7EB';
                        let backgroundColor = 'white';

                        if (showResult) {
                            if (index === currentQuestion.correctAnswer) {
                                borderColor = '#10B981';
                                backgroundColor = '#F0FDF4';
                            } else if (index === selectedAnswer && index !== currentQuestion.correctAnswer) {
                                borderColor = '#EF4444';
                                backgroundColor = '#FEF2F2';
                            }
                        } else if (selectedAnswer === index) {
                            borderColor = '#3B82F6';
                        }

                        return (
                            <div
                                key={index}
                                style={{
                                    backgroundColor,
                                    borderRadius: '12px',
                                    marginBottom: '12px',
                                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                    border: `2px solid ${borderColor}`,
                                    cursor: showResult ? 'default' : 'pointer',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={() => handleAnswerSelect(index)}
                            >
                                <div className="card-content" style={{
                                    padding: '16px 20px',
                                    display: 'flex',
                                    alignItems: 'center'
                                }}>
                                    <div style={{
                                        width: '24px',
                                        height: '24px',
                                        borderRadius: '50%',
                                        border: `2px solid ${borderColor}`,
                                        marginRight: '16px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: selectedAnswer === index ? borderColor : 'white',
                                        flexShrink: 0
                                    }}>
                                        {showResult && index === currentQuestion.correctAnswer && (
                                            <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                                        )}
                                        {showResult && index === selectedAnswer && index !== currentQuestion.correctAnswer && (
                                            <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>✗</span>
                                        )}
                                        {!showResult && selectedAnswer === index && (
                                            <span style={{ color: 'white', fontSize: '14px', fontWeight: 'bold' }}>✓</span>
                                        )}
                                    </div>
                                    <span style={{
                                        fontSize: '16px',
                                        color: '#111827',
                                        fontWeight: '500'
                                    }}>
                                        {option}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Result Display */}
                {showResult && (
                    <div style={{
                        backgroundColor: isCorrect ? '#F0FDF4' : '#FEF2F2',
                        borderRadius: '12px',
                        padding: '20px',
                        marginBottom: '20px',
                        border: `2px solid ${isCorrect ? '#10B981' : '#EF4444'}`
                    }}>
                        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                            <div style={{ fontSize: '48px', marginBottom: '8px' }}>
                                {isCorrect ? '🎉' : '😔'}
                            </div>
                            <h3 style={{
                                fontSize: '18px',
                                fontWeight: '600',
                                color: isCorrect ? '#059669' : '#DC2626',
                                margin: '0 0 8px 0'
                            }}>
                                {isCorrect ? '정답입니다!' : '틀렸습니다'}
                            </h3>
                            {isCorrect && (
                                <p style={{
                                    fontSize: '16px',
                                    color: '#059669',
                                    fontWeight: '600',
                                    margin: '0'
                                }}>
                                    {earnedPoints}포인트가 적립되었습니다!
                                </p>
                            )}
                        </div>
                        <div style={{
                            backgroundColor: 'white',
                            borderRadius: '8px',
                            padding: '16px',
                            border: '1px solid #E5E7EB'
                        }}>
                            <h4 style={{
                                fontSize: '14px',
                                fontWeight: '600',
                                color: '#374151',
                                margin: '0 0 8px 0'
                            }}>
                                해설
                            </h4>
                            <p style={{
                                fontSize: '14px',
                                color: '#6B7280',
                                margin: '0',
                                lineHeight: '1.5'
                            }}>
                                {currentQuestion.explanation}
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Button */}
                {!showResult ? (
                    <button
                        onClick={handleCheck}
                        style={{
                            width: '100%',
                            padding: '16px',
                            backgroundColor: '#3B82F6',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#2563EB'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#3B82F6'}
                    >
                        정답 확인하기
                    </button>
                ) : (
                    <button
                        onClick={handleNextQuestion}
                        style={{
                            width: '100%',
                            padding: '16px',
                            backgroundColor: '#10B981',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: '600',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
                            transition: 'all 0.2s ease'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#059669'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#10B981'}
                    >
                        {currentQuestionIndex < quizData.questions.length - 1 ? '다음 문제' : '퀴즈 완료'}
                    </button>
                )}
            </div>

            {/* Success Modal */}
            {showSuccessModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '20px',
                        padding: '40px 30px',
                        maxWidth: '350px',
                        width: '100%',
                        textAlign: 'center',
                        position: 'relative',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)'
                    }}>
                        {/* Confetti Animation Background */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)',
                            opacity: 0.3,
                            zIndex: -1
                        }} />

                        {/* Animated Confetti Dots */}
                        <div style={{ position: 'absolute', top: '20px', left: '30px', color: '#3B82F6', fontSize: '8px' }}>●</div>
                        <div style={{ position: 'absolute', top: '40px', right: '40px', color: '#10B981', fontSize: '6px' }}>●</div>
                        <div style={{ position: 'absolute', top: '60px', left: '50px', color: '#F59E0B', fontSize: '10px' }}>●</div>
                        <div style={{ position: 'absolute', bottom: '80px', right: '30px', color: '#EF4444', fontSize: '8px' }}>●</div>
                        <div style={{ position: 'absolute', bottom: '60px', left: '40px', color: '#8B5CF6', fontSize: '6px' }}>●</div>
                        <div style={{ position: 'absolute', top: '80px', right: '60px', color: '#06B6D4', fontSize: '12px' }}>◆</div>
                        <div style={{ position: 'absolute', bottom: '100px', left: '60px', color: '#F97316', fontSize: '10px' }}>◆</div>
                        <div style={{ position: 'absolute', top: '100px', left: '80px', color: '#84CC16', fontSize: '8px' }}>▲</div>
                        <div style={{ position: 'absolute', bottom: '120px', right: '50px', color: '#EC4899', fontSize: '10px' }}>▲</div>

                        {/* Main Hand Clapping Icon */}
                        <div style={{
                            fontSize: '80px',
                            marginBottom: '20px',
                            position: 'relative',
                            display: 'inline-block'
                        }}>
                            👏
                            {/* Blue checkmark circle */}
                            <div style={{
                                position: 'absolute',
                                bottom: '10px',
                                right: '10px',
                                width: '32px',
                                height: '32px',
                                backgroundColor: '#3B82F6',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '3px solid white',
                                boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
                            }}>
                                <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>✓</span>
                            </div>
                        </div>

                        <h2 style={{
                            fontSize: '24px',
                            fontWeight: '700',
                            color: '#111827',
                            margin: '0 0 12px 0'
                        }}>
                            정답입니다
                        </h2>

                        <p style={{
                            fontSize: '16px',
                            color: '#6B7280',
                            margin: '0 0 30px 0',
                            fontWeight: '500'
                        }}>
                            포인트 {earnedPoints}P가 적립되었습니다.
                        </p>

                        <button
                            onClick={handleCloseModal}
                            style={{
                                width: '100%',
                                padding: '16px 24px',
                                backgroundColor: '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '12px',
                                fontSize: '16px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                                transition: 'all 0.2s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.backgroundColor = '#2563EB';
                                e.target.style.transform = 'translateY(-1px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.backgroundColor = '#3B82F6';
                                e.target.style.transform = 'translateY(0)';
                            }}
                        >
                            포인트 확인하기
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuizView;