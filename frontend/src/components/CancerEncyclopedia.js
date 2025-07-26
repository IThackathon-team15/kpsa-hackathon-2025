import React, { useState } from 'react';
import medicationIcon from '../assets/medication.png';
import radiationIcon from '../assets/radiation.png';
import sideeffectIcon from '../assets/sideeffect.png';
import surgeryIcon from '../assets/surgery.png';

const CancerEncyclopedia = ({ onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTopic, setSelectedTopic] = useState(null);

    const categories = {
        medication: {
            title: '항암제',
            icon: medicationIcon,
            color: 'pink',
            topics: [
                {
                    id: 'chemo-types',
                    title: '항암제 종류',
                    content: {
                        overview: '항암제는 암세포의 성장과 분열을 억제하거나 파괴하는 약물입니다.',
                        types: [
                            { name: '알킬화제', description: 'DNA를 손상시켜 암세포를 파괴합니다.' },
                            { name: '항대사제', description: '암세포의 DNA 합성을 방해합니다.' },
                            { name: '식물 알칼로이드', description: '세포 분열을 억제합니다.' },
                            { name: '항생제', description: 'DNA와 RNA 합성을 방해합니다.' }
                        ]
                    }
                },
                {
                    id: 'chemo-schedule',
                    title: '투여 일정',
                    content: {
                        overview: '항암제 투여는 환자의 상태와 암의 종류에 따라 개별화됩니다.',
                        schedules: [
                            { cycle: '3주 주기', description: '3주마다 반복하는 가장 일반적인 주기' },
                            { cycle: '매주 투여', description: '부작용을 줄이기 위한 저용량 빈번 투여' },
                            { cycle: '연속 투여', description: '경구약의 경우 매일 복용' }
                        ]
                    }
                }
            ]
        },
        radiation: {
            title: '방사선',
            icon: radiationIcon,
            color: 'orange',
            topics: [
                {
                    id: 'radiation-types',
                    title: '방사선 치료 종류',
                    content: {
                        overview: '방사선 치료는 고에너지 방사선을 이용해 암세포를 파괴하는 치료법입니다.',
                        types: [
                            { name: '외부 방사선 치료', description: '체외에서 방사선을 조사하는 방법' },
                            { name: '내부 방사선 치료', description: '방사성 물질을 체내에 삽입하는 방법' },
                            { name: 'IMRT', description: '세기조절 방사선치료로 정상조직 보호' },
                            { name: 'SBRT', description: '정위적 체부 방사선치료로 고정밀 치료' }
                        ]
                    }
                },
                {
                    id: 'radiation-preparation',
                    title: '치료 준비사항',
                    content: {
                        overview: '방사선 치료 전 충분한 준비가 필요합니다.',
                        preparations: [
                            { step: '시뮬레이션', description: '치료 계획을 위한 CT 촬영' },
                            { step: '마킹', description: '치료 부위 표시를 위한 문신' },
                            { step: '고정 장치', description: '치료 시 자세 고정을 위한 장치 제작' }
                        ]
                    }
                }
            ]
        },
        surgery: {
            title: '수술',
            icon: surgeryIcon,
            color: 'green',
            topics: [
                {
                    id: 'surgery-types',
                    title: '수술 종류',
                    content: {
                        overview: '암 수술은 암의 위치, 크기, 진행 정도에 따라 다양한 방법이 있습니다.',
                        types: [
                            { name: '근치적 수술', description: '암과 주변 조직을 완전히 제거' },
                            { name: '완화 수술', description: '증상 완화를 위한 부분 제거' },
                            { name: '복강경 수술', description: '최소침습적 수술 방법' },
                            { name: '로봇 수술', description: '정밀한 로봇 보조 수술' }
                        ]
                    }
                },
                {
                    id: 'surgery-recovery',
                    title: '수술 후 회복',
                    content: {
                        overview: '수술 후 적절한 관리가 회복에 중요합니다.',
                        recovery: [
                            { phase: '즉시 회복기', description: '수술 직후 1-2주, 상처 관리 중점' },
                            { phase: '단기 회복기', description: '2-6주, 일상 활동 점진적 증가' },
                            { phase: '장기 회복기', description: '6주 이후, 정상 활동 복귀' }
                        ]
                    }
                }
            ]
        },
        sideeffect: {
            title: '부작용 관리',
            icon: sideeffectIcon,
            color: 'blue',
            topics: [
                {
                    id: 'common-sideeffects',
                    title: '일반적인 부작용',
                    content: {
                        overview: '암 치료 중 나타날 수 있는 일반적인 부작용들입니다.',
                        sideeffects: [
                            { name: '피로감', management: '충분한 휴식과 가벼운 운동' },
                            { name: '오심/구토', management: '소량씩 자주 섭취, 항구토제 복용' },
                            { name: '식욕부진', management: '영양가 높은 음식 섭취' },
                            { name: '탈모', management: '두피 보호, 가발이나 모자 착용' }
                        ]
                    }
                },
                {
                    id: 'infection-prevention',
                    title: '감염 예방',
                    content: {
                        overview: '면역력 저하로 인한 감염을 예방하는 방법입니다.',
                        prevention: [
                            { method: '손 위생', description: '자주 손 씻기, 손 소독제 사용' },
                            { method: '마스크 착용', description: '외출 시 마스크 착용' },
                            { method: '사람 많은 곳 피하기', description: '감염 위험 장소 회피' },
                            { method: '상처 관리', description: '작은 상처도 즉시 소독' }
                        ]
                    }
                }
            ]
        }
    };

    const handleCategoryClick = (categoryKey) => {
        setSelectedCategory(categoryKey);
        setSelectedTopic(null);
    };

    const handleTopicClick = (topic) => {
        setSelectedTopic(topic);
    };

    const handleBackToCategories = () => {
        setSelectedCategory(null);
        setSelectedTopic(null);
    };

    const handleBackToTopics = () => {
        setSelectedTopic(null);
    };

    const renderCategoryList = () => (
        <div className="encyclopedia-container">
            <div className="encyclopedia-header">
                <button className="back-btn" onClick={onBack}>
                    ← 뒤로
                </button>
                <h2>암 치료 백과사전</h2>
            </div>

            <div className="category-grid">
                {Object.entries(categories).map(([key, category]) => (
                    <div
                        key={key}
                        className="category-card"
                        onClick={() => handleCategoryClick(key)}
                    >
                        <div className={`category-icon-circle ${category.color}`}>
                            <img
                                src={category.icon}
                                alt={`${category.title} 아이콘`}
                                style={{ width: '50px', height: '50px' }}
                            />
                        </div>
                        <h3>{category.title}</h3>
                        <p>자세한 정보 보기</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderTopicList = () => {
        const category = categories[selectedCategory];
        return (
            <div className="encyclopedia-container">
                <div className="encyclopedia-header">
                    <button className="back-btn" onClick={handleBackToCategories}>
                        ← 뒤로
                    </button>
                    <h2>{category.title}</h2>
                </div>

                <div className="topic-list">
                    {category.topics.map((topic) => (
                        <div
                            key={topic.id}
                            className="topic-card"
                            onClick={() => handleTopicClick(topic)}
                        >
                            <h3>{topic.title}</h3>
                            <span className="arrow">→</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderTopicDetail = () => {
        const category = categories[selectedCategory];
        const content = selectedTopic.content;

        return (
            <div className="encyclopedia-container">
                <div className="encyclopedia-header">
                    <button className="back-btn" onClick={handleBackToTopics}>
                        ← 뒤로
                    </button>
                    <h2>{selectedTopic.title}</h2>
                </div>

                <div className="topic-content">
                    <div className="content-overview">
                        <p>{content.overview}</p>
                    </div>

                    <div className="content-details">
                        {content.types && (
                            <div className="detail-section">
                                <h3>종류</h3>
                                {content.types.map((type, index) => (
                                    <div key={index} className="detail-item">
                                        <h4>{type.name}</h4>
                                        <p>{type.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {content.schedules && (
                            <div className="detail-section">
                                <h3>투여 일정</h3>
                                {content.schedules.map((schedule, index) => (
                                    <div key={index} className="detail-item">
                                        <h4>{schedule.cycle}</h4>
                                        <p>{schedule.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {content.preparations && (
                            <div className="detail-section">
                                <h3>준비사항</h3>
                                {content.preparations.map((prep, index) => (
                                    <div key={index} className="detail-item">
                                        <h4>{prep.step}</h4>
                                        <p>{prep.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {content.recovery && (
                            <div className="detail-section">
                                <h3>회복 단계</h3>
                                {content.recovery.map((phase, index) => (
                                    <div key={index} className="detail-item">
                                        <h4>{phase.phase}</h4>
                                        <p>{phase.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {content.sideeffects && (
                            <div className="detail-section">
                                <h3>부작용 및 관리법</h3>
                                {content.sideeffects.map((effect, index) => (
                                    <div key={index} className="detail-item">
                                        <h4>{effect.name}</h4>
                                        <p>{effect.management}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {content.prevention && (
                            <div className="detail-section">
                                <h3>예방 방법</h3>
                                {content.prevention.map((method, index) => (
                                    <div key={index} className="detail-item">
                                        <h4>{method.method}</h4>
                                        <p>{method.description}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    if (selectedTopic) {
        return renderTopicDetail();
    }

    if (selectedCategory) {
        return renderTopicList();
    }

    return renderCategoryList();
};

export default CancerEncyclopedia;