import React, { useState } from 'react';

const SymptomCheck = ({ selectedDate, onSaveSymptoms, onClose }) => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [customSymptom, setCustomSymptom] = useState('');
    const [severity, setSeverity] = useState({});
    const [notes, setNotes] = useState('');

    // 일반적인 암 환자 증상 목록
    const commonSymptoms = [
        { id: 'fatigue', name: '피로감', icon: '😴' },
        { id: 'nausea', name: '메스꺼움', icon: '🤢' },
        { id: 'pain', name: '통증', icon: '😣' },
        { id: 'appetite_loss', name: '식욕부진', icon: '🍽️' },
        { id: 'vomiting', name: '구토', icon: '🤮' },
        { id: 'diarrhea', name: '설사', icon: '💩' },
        { id: 'constipation', name: '변비', icon: '🚽' },
        { id: 'fever', name: '발열', icon: '🌡️' },
        { id: 'headache', name: '두통', icon: '🤕' },
        { id: 'dizziness', name: '어지러움', icon: '😵' },
        { id: 'sleep_disorder', name: '수면장애', icon: '😪' },
        { id: 'anxiety', name: '불안감', icon: '😰' }
    ];

    const severityLevels = [
        { value: 1, label: '경미', color: '#10B981' },
        { value: 2, label: '보통', color: '#F59E0B' },
        { value: 3, label: '심함', color: '#EF4444' }
    ];

    const handleSymptomToggle = (symptomId) => {
        setSelectedSymptoms(prev => {
            if (prev.includes(symptomId)) {
                // 증상 제거 시 심각도도 제거
                const newSeverity = { ...severity };
                delete newSeverity[symptomId];
                setSeverity(newSeverity);
                return prev.filter(id => id !== symptomId);
            } else {
                return [...prev, symptomId];
            }
        });
    };

    const handleSeverityChange = (symptomId, level) => {
        setSeverity(prev => ({
            ...prev,
            [symptomId]: level
        }));
    };

    const handleAddCustomSymptom = () => {
        if (customSymptom.trim()) {
            const customId = `custom_${Date.now()}`;
            setSelectedSymptoms(prev => [...prev, customId]);
            setCustomSymptom('');
        }
    };

    const handleSave = () => {
        const symptomData = {
            date: selectedDate,
            symptoms: selectedSymptoms.map(id => {
                const commonSymptom = commonSymptoms.find(s => s.id === id);
                return {
                    id,
                    name: commonSymptom ? commonSymptom.name : customSymptom,
                    severity: severity[id] || 1
                };
            }),
            notes,
            timestamp: new Date().toISOString()
        };
        
        onSaveSymptoms(symptomData);
        onClose();
    };

    const formatDate = (date) => {
        if (typeof date === 'number') {
            return `2025년 9월 ${date}일`;
        }
        return date;
    };

    return (
        <div className="symptom-check-overlay" style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="symptom-check-modal" style={{
                backgroundColor: 'white',
                borderRadius: '16px',
                padding: '24px',
                width: '90%',
                maxWidth: '500px',
                maxHeight: '80vh',
                overflowY: 'auto'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}>
                    <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 'bold' }}>
                        증상 기록
                    </h2>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Date Display */}
                <div style={{
                    backgroundColor: '#F3F4F6',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    textAlign: 'center'
                }}>
                    <span style={{ fontSize: '16px', fontWeight: '500' }}>
                        {formatDate(selectedDate)}
                    </span>
                </div>

                {/* Symptom Selection */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>증상 선택</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '8px'
                    }}>
                        {commonSymptoms.map(symptom => (
                            <div
                                key={symptom.id}
                                onClick={() => handleSymptomToggle(symptom.id)}
                                style={{
                                    padding: '12px',
                                    border: selectedSymptoms.includes(symptom.id) 
                                        ? '2px solid #3B82F6' 
                                        : '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    backgroundColor: selectedSymptoms.includes(symptom.id) 
                                        ? '#EFF6FF' 
                                        : 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <span style={{ fontSize: '20px' }}>{symptom.icon}</span>
                                <span style={{ fontSize: '14px' }}>{symptom.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Custom Symptom Input */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>기타 증상</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={customSymptom}
                            onChange={(e) => setCustomSymptom(e.target.value)}
                            placeholder="직접 입력하세요"
                            style={{
                                flex: 1,
                                padding: '8px 12px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '6px',
                                fontSize: '14px'
                            }}
                        />
                        <button
                            onClick={handleAddCustomSymptom}
                            style={{
                                padding: '8px 16px',
                                backgroundColor: '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                cursor: 'pointer',
                                fontSize: '14px'
                            }}
                        >
                            추가
                        </button>
                    </div>
                </div>

                {/* Severity Selection */}
                {selectedSymptoms.length > 0 && (
                    <div style={{ marginBottom: '20px' }}>
                        <h3 style={{ fontSize: '16px', marginBottom: '12px' }}>심각도 선택</h3>
                        {selectedSymptoms.map(symptomId => {
                            const symptom = commonSymptoms.find(s => s.id === symptomId);
                            const symptomName = symptom ? symptom.name : '기타 증상';
                            
                            return (
                                <div key={symptomId} style={{ marginBottom: '12px' }}>
                                    <div style={{ fontSize: '14px', marginBottom: '6px' }}>
                                        {symptomName}
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px' }}>
                                        {severityLevels.map(level => (
                                            <button
                                                key={level.value}
                                                onClick={() => handleSeverityChange(symptomId, level.value)}
                                                style={{
                                                    padding: '6px 12px',
                                                    border: severity[symptomId] === level.value 
                                                        ? `2px solid ${level.color}` 
                                                        : '1px solid #E5E7EB',
                                                    borderRadius: '6px',
                                                    backgroundColor: severity[symptomId] === level.value 
                                                        ? level.color 
                                                        : 'white',
                                                    color: severity[symptomId] === level.value 
                                                        ? 'white' 
                                                        : '#374151',
                                                    cursor: 'pointer',
                                                    fontSize: '12px'
                                                }}
                                            >
                                                {level.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Notes */}
                <div style={{ marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '16px', marginBottom: '8px' }}>추가 메모</h3>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="증상에 대한 추가 설명이나 메모를 입력하세요"
                        style={{
                            width: '100%',
                            height: '80px',
                            padding: '8px 12px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            fontSize: '14px',
                            resize: 'vertical'
                        }}
                    />
                </div>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '10px 20px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '6px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            fontSize: '14px'
                        }}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={selectedSymptoms.length === 0}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: selectedSymptoms.length > 0 ? '#3B82F6' : '#9CA3AF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: selectedSymptoms.length > 0 ? 'pointer' : 'not-allowed',
                            fontSize: '14px'
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SymptomCheck;