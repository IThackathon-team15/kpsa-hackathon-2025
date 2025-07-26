import React, { useState } from 'react';
import surgeryIcon from '../assets/surgery.png';
import medicationIcon from '../assets/medication.png'
import radiationIcon from '../assets/radiation.png'
import sideeffectIcon from '../assets/sideeffect.png'
import imageIcon from '../assets/image.png'
import SymptomCheck from './SymptomCheck';
import CancerEncyclopedia from './CancerEncyclopedia';

const DrugScheduleCard = () => {
    return (
        <div className="drug-schedule-card" style={{
            width: 'calc(100% - 40px)',
            border: '1px solid #e5e7eb',
            borderRadius: '12px',
            padding: '16px',
            boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            marginTop: '20px'
        }}>
            {/* 날짜 */}
            <div style={{ fontSize: '14px', color: '#6b7280' }}>2025.07.02</div>
            {/* D-day */}
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#111827' }}>D+59</div>
            {/* 사이클 */}
            <div style={{ fontSize: '14px', color: '#9ca3af' }}>Xeloda #8 cycle 완료</div>
            {/* 메뉴 아이콘 */}
            <div style={{ marginLeft: 'auto', color: '#9ca3af', fontSize: '20px', lineHeight: '1' }}>⋯</div>
        </div>
    );
};

const MainPage = ({ user, onLogout, onGoToShop, onGoToMembership, onGoToQuiz }) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(2); // September 2nd selected
    const [showSymptomCheck, setShowSymptomCheck] = useState(false);
    const [symptomData, setSymptomData] = useState({});
    const [showEncyclopedia, setShowEncyclopedia] = useState(false);
    const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);

    // Sample calendar data - 증상 기록이 있는 날짜 표시
    const calendarEvents = {
        2: { hasEvent: true, isSelected: true, hasSymptoms: true },
        13: { hasEvent: true, hasSymptoms: false },
        15: { hasEvent: true, hasSymptoms: true },
        17: { hasEvent: true, hasSymptoms: false },
        29: { hasEvent: true, hasSymptoms: true },
        30: { hasEvent: true, hasSymptoms: false }
    };

    const getDaysInMonth = () => {
        const year = 2025;
        const month = 8; // September (0-indexed)
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days = [];

        // Previous month's last days
        const prevMonth = new Date(year, month - 1, 0);
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            days.push({ day: prevMonth.getDate() - i, isPrevMonth: true });
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            days.push({ day, isCurrentMonth: true });
        }

        // Next month's first days
        const remainingCells = 42 - days.length;
        for (let day = 1; day <= remainingCells; day++) {
            days.push({ day, isNextMonth: true });
        }

        return days;
    };

    const handleSaveSymptoms = (data) => {
        setSymptomData(prev => ({
            ...prev,
            [data.date]: data
        }));

        // 증상이 기록된 날짜에 표시 업데이트
        console.log('증상 데이터 저장됨:', data);
    };

    const renderCalendar = () => {
        const days = getDaysInMonth();

        return (
            <div className="calendar-container">
                <div className="calendar-header">
                    <button className="nav-btn">‹</button>
                    <div className="month-year">
                        <h3>September</h3>
                        <span>2025</span>
                    </div>
                    <button className="nav-btn">›</button>
                </div>

                <div className="calendar-weekdays">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                        <div key={day} className="weekday">{day}</div>
                    ))}
                </div>

                <div className="calendar-grid">
                    {days.map((dayObj, index) => {
                        const { day, isCurrentMonth, isPrevMonth, isNextMonth } = dayObj;
                        const eventData = calendarEvents[day];
                        const isSelected = eventData?.isSelected && isCurrentMonth;
                        const hasEvent = eventData?.hasEvent && isCurrentMonth;

                        return (
                            <div
                                key={index}
                                className={`calendar-day ${isCurrentMonth ? 'current' : ''} ${isPrevMonth ? 'prev' : ''} ${isNextMonth ? 'next' : ''} ${isSelected ? 'selected' : ''} ${hasEvent ? 'has-event' : ''}`}
                                onClick={() => {
                                    if (isCurrentMonth) {
                                        setSelectedDate(day);
                                        setShowSymptomCheck(true);
                                    }
                                }}
                                style={{ cursor: isCurrentMonth ? 'pointer' : 'default' }}
                            >
                                <span className="day-number">{day}</span>
                                {hasEvent && <div className="event-indicator"></div>}
                                {eventData?.hasSymptoms && isCurrentMonth && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '2px',
                                        right: '2px',
                                        width: '6px',
                                        height: '6px',
                                        backgroundColor: '#10B981',
                                        borderRadius: '50%'
                                    }}></div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    };

    return (
        <div className="main-page-container">
            {/* Header Section */}
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
                    <h1 className="completion-rate" style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>Cancer Companion</h1>
                    <p className="completion-subtitle" style={{ fontSize: '14px', opacity: '0.9', margin: '0' }}>다음 병원 예약: 8월 7일 월요일</p>
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

            {/* Calendar */}
            {renderCalendar()}

            {/* Calendar Label */}
            <div style={{
                textAlign: 'center'
            }}>
                <span style={{
                    fontSize: '12px',
                    color: '#6B7280',
                    fontWeight: '500'
                }}>
                    📝 날짜를 클릭하여 증상을 기록하세요
                </span>
            </div>

            {/* Symptom Check Section */}
            <div style={{
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                maxHeight: showSymptomCheck ? '800px' : '0',
                opacity: showSymptomCheck ? 1 : 0
            }}>
                {showSymptomCheck && (
                    <div style={{
                        margin: '20px 0',
                        padding: '20px',
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        border: '1px solid #E5E7EB',
                        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                        transform: showSymptomCheck ? 'translateY(0)' : 'translateY(-20px)',
                        transition: 'transform 0.3s ease-in-out'
                    }}>
                        <SymptomCheck
                            selectedDate={selectedDate}
                            onSaveSymptoms={handleSaveSymptoms}
                            onClose={() => setShowSymptomCheck(false)}
                            isInline={true}
                        />
                    </div>
                )}
            </div>

            {/* Selected Date Symptom Summary */}
            {symptomData[selectedDate] && (
                <div style={{
                    margin: '20px 0',
                    padding: '16px',
                    backgroundColor: '#F0F9FF',
                    borderRadius: '12px',
                    border: '1px solid #E0F2FE'
                }}>
                    <h3 style={{
                        fontSize: '16px',
                        fontWeight: 'bold',
                        marginBottom: '8px',
                        color: '#0369A1'
                    }}>
                        {selectedDate}일 증상 기록
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                        {symptomData[selectedDate].symptoms.map((symptom, index) => (
                            <span
                                key={index}
                                style={{
                                    padding: '4px 8px',
                                    backgroundColor: symptom.severity === 3 ? '#FEE2E2' :
                                        symptom.severity === 2 ? '#FEF3C7' : '#D1FAE5',
                                    color: symptom.severity === 3 ? '#DC2626' :
                                        symptom.severity === 2 ? '#D97706' : '#059669',
                                    borderRadius: '12px',
                                    fontSize: '12px',
                                    fontWeight: '500'
                                }}
                            >
                                {symptom.name}
                            </span>
                        ))}
                    </div>
                    {symptomData[selectedDate].notes && (
                        <p style={{
                            fontSize: '14px',
                            color: '#64748B',
                            margin: 0,
                            fontStyle: 'italic'
                        }}>
                            "{symptomData[selectedDate].notes}"
                        </p>
                    )}
                </div>
            )}

            {/* Carousel Section */}
            <div className="carousel-container" style={{
                position: 'relative',
                overflow: 'hidden',
                marginBottom: '20px',
                borderRadius: '12px'
            }}>
                <div className="carousel-wrapper" style={{
                    display: 'flex',
                    transform: `translateX(-${currentCarouselIndex * 100}%)`,
                    transition: 'transform 0.3s ease-in-out'
                }}>
                    {/* Slide 1: Next Anticancer Drug Schedule */}
                    <div className="carousel-slide" style={{
                        minWidth: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '0 20px'
                    }}>
                        <DrugScheduleCard />
                    </div>

                    {/* Slide 2: Service Icons */}
                    <div className="carousel-slide" style={{
                        minWidth: '100%',
                        padding: '0 20px'
                    }}>
                        <div className="services-section">
                            <h3 className="section-title">암 치료 백과사전</h3>
                            <div className="service-icons">
                                <div className="service-icon" onClick={() => setShowEncyclopedia(true)} style={{ cursor: 'pointer' }}>
                                    <div className="icon-circle pink">
                                        <img src={medicationIcon} alt="항암제 아이콘" style={{ width: '40px', height: '40px' }} />
                                    </div>
                                    <span>항암제</span>
                                </div>
                                <div className="service-icon" onClick={() => setShowEncyclopedia(true)} style={{ cursor: 'pointer' }}>
                                    <div className="icon-circle orange">
                                        <img src={radiationIcon} alt="방사선 아이콘" style={{ width: '40px', height: '40px' }} />
                                    </div>
                                    <span>방사선</span>
                                </div>
                                <div className="service-icon" onClick={() => setShowEncyclopedia(true)} style={{ cursor: 'pointer' }}>
                                    <div className="icon-circle green">
                                        <img src={surgeryIcon} alt="수술 아이콘" style={{ width: '40px', height: '40px' }} />
                                    </div>
                                    <span>수술</span>
                                </div>
                                <div className="service-icon" onClick={() => setShowEncyclopedia(true)} style={{ cursor: 'pointer' }}>
                                    <div className="icon-circle blue">
                                        <img src={sideeffectIcon} alt="부작용 아이콘" style={{ width: '40px', height: '40px' }} />
                                    </div>
                                    <span>부작용 관리</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Slide 3: Promotion Banner */}
                    <div className="carousel-slide" style={{
                        minWidth: '100%',
                        padding: '0 20px'
                    }}>
                        <div className="promotion-banner" onClick={onGoToShop} style={{ cursor: 'pointer' }}>
                            <div className="banner-content">
                                <h4>위암 환자에 적합한</h4>
                                <h4>밀키트를 구매하세요.</h4>
                                <p>"Purchase a meal kit suitable for gastric cancer patients."</p>
                            </div>
                            <div className="banner-image">
                                <span>🩺</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Carousel Navigation */}
                <div className="carousel-nav" style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '8px',
                    marginTop: '16px'
                }}>
                    {[0, 1, 2].map((index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentCarouselIndex(index)}
                            style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                border: 'none',
                                backgroundColor: currentCarouselIndex === index ? '#3B82F6' : '#D1D5DB',
                                cursor: 'pointer',
                                transition: 'background-color 0.2s ease'
                            }}
                        />
                    ))}
                </div>

                {/* Carousel Arrow Buttons */}
                <button
                    onClick={() => setCurrentCarouselIndex(prev => prev > 0 ? prev - 1 : 2)}
                    style={{
                        position: 'absolute',
                        left: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid #E5E7EB',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#374151',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    ‹
                </button>
                <button
                    onClick={() => setCurrentCarouselIndex(prev => prev < 2 ? prev + 1 : 0)}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        backgroundColor: 'rgba(255, 255, 255, 0.8)',
                        border: '1px solid #E5E7EB',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        fontSize: '16px',
                        color: '#374151',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    ›
                </button>
            </div>


            {/* Bottom Action Buttons */}
            <div style={{
                display: 'flex',
                gap: '12px',
                padding: '20px',
                marginBottom: '20px'
            }}>
                <button
                    onClick={onGoToMembership}
                    style={{
                        flex: 1,
                        padding: '14px 16px',
                        backgroundColor: '#3B82F6',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(59, 130, 246, 0.2)',
                        transition: 'all 0.2s ease'
                    }}>
                    구독
                </button>

                <button
                    onClick={onGoToQuiz}
                    style={{
                        flex: 1,
                        padding: '14px 16px',
                        backgroundColor: '#10B981',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(16, 185, 129, 0.2)',
                        transition: 'all 0.2s ease'
                    }}>
                    오늘의 건강 퀴즈
                </button>

                <button
                    onClick={onGoToShop}
                    style={{
                        flex: 1,
                        padding: '14px 16px',
                        backgroundColor: '#F59E0B',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        boxShadow: '0 2px 4px rgba(245, 158, 11, 0.2)',
                        transition: 'all 0.2s ease'
                    }}
                >
                    스토어
                </button>
            </div>

            {/* Logout Button */}
            <div className="main-footer">
                <button className="logout-btn" onClick={onLogout}>
                    로그아웃
                </button>
            </div>

            {/* Cancer Encyclopedia Modal */}
            {showEncyclopedia && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'white',
                    zIndex: 1000,
                    overflow: 'auto'
                }}>
                    <CancerEncyclopedia onBack={() => setShowEncyclopedia(false)} />
                </div>
            )}

        </div>
    );
};

export default MainPage;