import React, { useState } from 'react';

const SymptomCheck = ({ selectedDate, onSaveSymptoms, onClose, isInline = false }) => {
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [customSymptom, setCustomSymptom] = useState('');
    const [severity, setSeverity] = useState({});
    const [notes, setNotes] = useState('');

    // 일반적인 암 환자 증상 목록
    const commonSymptoms = [
        { id: 'fatigue', name: '피로감' },
        { id: 'nausea', name: '메스꺼움' },
        { id: 'pain', name: '통증' },
        { id: 'appetite_loss', name: '식욕부진' },
        { id: 'vomiting', name: '구토' },
        { id: 'diarrhea', name: '설사' },
        { id: 'constipation', name: '변비' },
        { id: 'fever', name: '발열' },
        { id: 'headache', name: '두통' },
        { id: 'dizziness', name: '어지러움' },
        { id: 'sleep_disorder', name: '수면장애' },
        { id: 'anxiety', name: '불안감' }
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
                const isCustom = id.startsWith('custom_');
                return {
                    id,
                    name: commonSymptom ? commonSymptom.name : (isCustom ? `사용자 증상 ${id.split('_')[1]}` : id),
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

    const SymptomItem = ({ symptom }) => (
        <div
            key={symptom.id}
            onClick={() => handleSymptomToggle(symptom.id)}
            style={{
                padding: '8px 12px',
                border: selectedSymptoms.includes(symptom.id) 
                    ? '1px solid #3B82F6' 
                    : '1px solid #E5E7EB',
                borderRadius: '4px',
                cursor: 'pointer',
                backgroundColor: selectedSymptoms.includes(symptom.id) 
                    ? '#F0F9FF' 
                    : 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s ease',
                fontSize: '13px',
                fontWeight: selectedSymptoms.includes(symptom.id) ? '500' : '400',
                color: selectedSymptoms.includes(symptom.id) ? '#1E40AF' : '#374151'
            }}
        >
            {symptom.name}
        </div>
    );

    if (isInline) {
        return (
            <div className="symptom-check-inline" style={{
                width: '100%'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                        증상 기록
                    </h2>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: '#6B7280'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Date Display */}
                <div style={{
                    backgroundColor: '#F9FAFB',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    textAlign: 'center',
                    border: '1px solid #F3F4F6'
                }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        {formatDate(selectedDate)}
                    </span>
                </div>

                {/* Symptom Selection */}
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>증상 선택</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '6px'
                    }}>
                        {commonSymptoms.map(symptom => (
                            <SymptomItem key={symptom.id} symptom={symptom} />
                        ))}
                    </div>
                </div>

                {/* Custom Symptom Input */}
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>기타 증상</h3>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                            type="text"
                            value={customSymptom}
                            onChange={(e) => setCustomSymptom(e.target.value)}
                            placeholder="직접 입력하세요"
                            style={{
                                flex: 1,
                                padding: '6px 10px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                        <button
                            onClick={handleAddCustomSymptom}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '13px'
                            }}
                        >
                            추가
                        </button>
                    </div>
                </div>

                {/* Severity Selection */}
                {selectedSymptoms.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>심각도 선택</h3>
                        {selectedSymptoms.map(symptomId => {
                            const symptom = commonSymptoms.find(s => s.id === symptomId);
                            const symptomName = symptom ? symptom.name : '기타 증상';
                            
                            return (
                                <div key={symptomId} style={{ marginBottom: '8px' }}>
                                    <div style={{ fontSize: '13px', marginBottom: '4px', color: '#374151' }}>
                                        {symptomName}
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {severityLevels.map(level => (
                                            <button
                                                key={level.value}
                                                onClick={() => handleSeverityChange(symptomId, level.value)}
                                                style={{
                                                    padding: '4px 10px',
                                                    border: severity[symptomId] === level.value 
                                                        ? `1px solid ${level.color}` 
                                                        : '1px solid #E5E7EB',
                                                    borderRadius: '4px',
                                                    backgroundColor: severity[symptomId] === level.value 
                                                        ? level.color 
                                                        : 'white',
                                                    color: severity[symptomId] === level.value 
                                                        ? 'white' 
                                                        : '#374151',
                                                    cursor: 'pointer',
                                                    fontSize: '11px'
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
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>추가 메모</h3>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="증상에 대한 추가 설명이나 메모를 입력하세요"
                        style={{
                            width: '100%',
                            height: '60px',
                            padding: '6px 10px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '4px',
                            fontSize: '13px',
                            resize: 'vertical'
                        }}
                    />
                </div>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={selectedSymptoms.length === 0}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: selectedSymptoms.length > 0 ? '#3B82F6' : '#9CA3AF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: selectedSymptoms.length > 0 ? 'pointer' : 'not-allowed',
                            fontSize: '13px'
                        }}
                    >
                        저장
                    </button>
                </div>
            </div>
        );
    }

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
                borderRadius: '8px',
                padding: '20px',
                width: '90%',
                maxWidth: '480px',
                maxHeight: '80vh',
                overflowY: 'auto'
            }}>
                {/* Header */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h2 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                        증상 기록
                    </h2>
                    <button 
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '20px',
                            cursor: 'pointer',
                            color: '#6B7280'
                        }}
                    >
                        ×
                    </button>
                </div>

                {/* Date Display */}
                <div style={{
                    backgroundColor: '#F9FAFB',
                    padding: '8px 12px',
                    borderRadius: '4px',
                    marginBottom: '16px',
                    textAlign: 'center',
                    border: '1px solid #F3F4F6'
                }}>
                    <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                        {formatDate(selectedDate)}
                    </span>
                </div>

                {/* Symptom Selection */}
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>증상 선택</h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        gap: '6px'
                    }}>
                        {commonSymptoms.map(symptom => (
                            <SymptomItem key={symptom.id} symptom={symptom} />
                        ))}
                    </div>
                </div>

                {/* Custom Symptom Input */}
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>기타 증상</h3>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <input
                            type="text"
                            value={customSymptom}
                            onChange={(e) => setCustomSymptom(e.target.value)}
                            placeholder="직접 입력하세요"
                            style={{
                                flex: 1,
                                padding: '6px 10px',
                                border: '1px solid #E5E7EB',
                                borderRadius: '4px',
                                fontSize: '13px'
                            }}
                        />
                        <button
                            onClick={handleAddCustomSymptom}
                            style={{
                                padding: '6px 12px',
                                backgroundColor: '#3B82F6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '13px'
                            }}
                        >
                            추가
                        </button>
                    </div>
                </div>

                {/* Severity Selection */}
                {selectedSymptoms.length > 0 && (
                    <div style={{ marginBottom: '16px' }}>
                        <h3 style={{ fontSize: '14px', marginBottom: '8px', fontWeight: '500' }}>심각도 선택</h3>
                        {selectedSymptoms.map(symptomId => {
                            const symptom = commonSymptoms.find(s => s.id === symptomId);
                            const symptomName = symptom ? symptom.name : '기타 증상';
                            
                            return (
                                <div key={symptomId} style={{ marginBottom: '8px' }}>
                                    <div style={{ fontSize: '13px', marginBottom: '4px', color: '#374151' }}>
                                        {symptomName}
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px' }}>
                                        {severityLevels.map(level => (
                                            <button
                                                key={level.value}
                                                onClick={() => handleSeverityChange(symptomId, level.value)}
                                                style={{
                                                    padding: '4px 10px',
                                                    border: severity[symptomId] === level.value 
                                                        ? `1px solid ${level.color}` 
                                                        : '1px solid #E5E7EB',
                                                    borderRadius: '4px',
                                                    backgroundColor: severity[symptomId] === level.value 
                                                        ? level.color 
                                                        : 'white',
                                                    color: severity[symptomId] === level.value 
                                                        ? 'white' 
                                                        : '#374151',
                                                    cursor: 'pointer',
                                                    fontSize: '11px'
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
                <div style={{ marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '14px', marginBottom: '6px', fontWeight: '500' }}>추가 메모</h3>
                    <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="증상에 대한 추가 설명이나 메모를 입력하세요"
                        style={{
                            width: '100%',
                            height: '60px',
                            padding: '6px 10px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '4px',
                            fontSize: '13px',
                            resize: 'vertical'
                        }}
                    />
                </div>

                {/* Action Buttons */}
                <div style={{
                    display: 'flex',
                    gap: '8px',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px 16px',
                            border: '1px solid #E5E7EB',
                            borderRadius: '4px',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            fontSize: '13px'
                        }}
                    >
                        취소
                    </button>
                    <button
                        onClick={handleSave}
                        disabled={selectedSymptoms.length === 0}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: selectedSymptoms.length > 0 ? '#3B82F6' : '#9CA3AF',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: selectedSymptoms.length > 0 ? 'pointer' : 'not-allowed',
                            fontSize: '13px'
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