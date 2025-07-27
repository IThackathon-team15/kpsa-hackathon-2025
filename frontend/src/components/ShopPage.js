import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import productData from '../data/productdata.json';

const ShopPage = ({ user, onBackToMain, storeType = 'all' }) => {
    const [storeTypeState, setStoreTypeState] = useState(storeType);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recommendationLoading, setRecommendationLoading] = useState(false);
    const [showRecommendations, setShowRecommendations] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [userPoints, setUserPoints] = useState(0);
    const [pointsLoading, setPointsLoading] = useState(true);
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    
    // Store type configurations
    const storeConfigs = {
        all: {
            title: '항암 치료 환자 전용 스토어',
            symptoms: ['탈모', '구강 건조', '손발톱 문제', '피로'],
            bannerText: '항암치료 부작용 기반 맞춤 추천',
            description: '항암치료 부작용을 완화하는 맞춤형 스토어'
        },
        stomach: {
            title: '위암 환자 전용 스토어',
            symptoms: ['위통', '소화불량', '식욕부진'],
            bannerText: '위암 환자 증상 기반 맞춤 추천',
            description: '영양사가 직접 설계한 소화 잘되는 건강 밀키트'
        },
        chemo: {
            title: '항암제 부작용 전용 스토어',
            symptoms: ['구토', '메스꺼움', '피로'],
            bannerText: '항암 치료 중 증상 기반 맞춤 추천',
            description: '항암제 부작용 관리에 도움되는 기구'
        },
        colon: {
            title: '대장암 환자를 위한 스토어',
            symptoms: ['복통', '장루 관리', '설사'],
            bannerText: '대장암 환자 증상 기반 맞춤 추천',
            description: '대장암 환자 건강에 좋은 맞춤형 스토어'
        },
        breast: {
            title: '유방암 환자를 위한 스토어',
            symptoms: ['피로', '팔 림프 부종', '가슴형태 보존'],
            bannerText: '유방암 환자 증상 기반 맞춤 추천',
            description: '유방암 환자 건강에 좋은 맞춤형 스토어'
        },
        prostate: {
            title: '전립선암 환자를 위한 스토어',
            symptoms: ['배뇨곤란', '피로', '체력저하'],
            bannerText: '전립선암 환자 증상 기반 맞춤 추천',
            description: '전립선암 환자 건강에 좋은 맞춤형 스토어'
        }
    };
    
    const currentStore = storeConfigs[selectedCategory] || storeConfigs.all;


    // API 호출 함수들
    const fetchUserPoints = async (accountId) => {
        try {
            setPointsLoading(true);
            const response = await fetch(`/points/${accountId}`);
            
            if (!response.ok) {
                throw new Error('포인트 조회에 실패했습니다.');
            }
            
            const data = await response.json();
            setUserPoints(data.points || 0);
            console.log('포인트 조회 성공:', data);
        } catch (error) {
            console.error('포인트 조회 오류:', error);
            setUserPoints(0); // 에러 시 기본값 0으로 설정
        } finally {
            setPointsLoading(false);
        }
    };



    const fetchProductsByStoreType = (storeType) => {
        try {
            // productdata.json에서 해당 스토어 타입의 상품들을 가져옴
            const storeProducts = productData[storeType] || productData['all'];
            let allProducts = [];
            
            // 각 증상별 상품들을 하나의 배열로 합침
            Object.keys(storeProducts).forEach(symptom => {
                const symptomProducts = storeProducts[symptom].map(product => ({
                    ...product,
                    symptom: symptom
                }));
                allProducts = [...allProducts, ...symptomProducts];
            });
            
            setProducts(allProducts);
            console.log('로컬 데이터에서 스토어 타입별 상품 조회 성공:', allProducts);
            return allProducts;
        } catch (error) {
            console.error('로컬 데이터 상품 조회 오류:', error);
            // 에러 시 기본 데이터 사용
            setProducts(mealKits);
            return mealKits;
        }
    };

    const recommendStoreType = async (accountId, patientData) => {
        try {
            const response = await fetch('/storetype/recommend-gpt', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    account_id: accountId,
                    cancer_type: patientData.cancer_type || 'unknown',
                    symptoms: patientData.symptoms || currentStore.symptoms,
                    treatment_stage: patientData.treatment_stage || 'ongoing'
                })
            });
            
            if (!response.ok) {
                throw new Error('스토어 타입 추천에 실패했습니다.');
            }
            
            const data = await response.json();
            console.log('스토어 타입 추천 성공:', data);
            return data.recommended_store_type;
        } catch (error) {
            console.error('스토어 타입 추천 오류:', error);
            throw error;
        }
    };

    const fetchUserStoreType = async (accountId) => {
        try {
            const response = await fetch(`/storetype/${accountId}`);
            if (!response.ok) {
                throw new Error('사용자 스토어 타입 조회에 실패했습니다.');
            }
            const data = await response.json();
            console.log('사용자 스토어 타입 조회 성공:', data);
            return data.store_type;
        } catch (error) {
            console.error('사용자 스토어 타입 조회 오류:', error);
            return null;
        }
    };

    const fetchRecommendedProducts = async () => {
        setRecommendationLoading(true);
        try {
            // Step 1: Get store type recommendation based on patient data
            let recommendedStoreType = selectedCategory;
            
            if (user && user.cancer_type && user.symptoms && user.treatment_stage) {
                try {
                    const storeTypeRecommendation = await recommendStoreType({
                        cancer_type: user.cancer_type,
                        symptoms: user.symptoms,
                        treatment_stage: user.treatment_stage
                    });
                    
                    if (storeTypeRecommendation && storeTypeRecommendation !== selectedCategory) {
                        console.log('새로운 스토어 타입 추천:', storeTypeRecommendation);
                        recommendedStoreType = storeTypeRecommendation;
                        setSelectedCategory(storeTypeRecommendation);
                    }
                } catch (error) {
                    console.error('스토어 타입 추천 실패:', error);
                    // Continue with current store type
                }
            }
            
            // Step 2: Fetch fresh products for the recommended store type from local data
            let freshProducts = [];
            try {
                freshProducts = fetchProductsByStoreType(recommendedStoreType);
                console.log('로컬 데이터에서 새로 가져온 상품들:', freshProducts);
            } catch (error) {
                console.error('로컬 데이터에서 상품 가져오기 실패:', error);
                // Fallback to dummy data
                freshProducts = mealKits;
            }
            
            // Step 3: Apply recommendation logic to get final recommended products
            let finalRecommendedProducts = freshProducts;
            
            // If we have user data, try to get personalized recommendations
            if (user && freshProducts.length > 0) {
                try {
                    const response = await fetch('http://localhost:8080/products/recommend', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            account_id: user.id || 'default_user',
                            cancer_type: user.cancer_type,
                            symptoms: user.symptoms,
                            treatment_stage: user.treatment_stage
                        })
                    });
                    
                    if (response.ok) {
                        const recommendedData = await response.json();
                        if (recommendedData && recommendedData.length > 0) {
                            finalRecommendedProducts = recommendedData;
                            console.log('개인화된 추천 상품들:', finalRecommendedProducts);
                        }
                    }
                } catch (error) {
                    console.error('개인화 추천 실패:', error);
                    // Use the fresh products from store type
                }
            }
            
            // Set recommended products and show recommendations
            setRecommendedProducts(finalRecommendedProducts);
            setShowRecommendations(true);
            
        } catch (error) {
            console.error('추천 시스템 오류:', error);
            // 에러 시 기본 추천 상품 사용
            setRecommendedProducts(mealKits.slice(0, 3));
            setShowRecommendations(true);
        } finally {
            setRecommendationLoading(false);
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            // Load products from local data based on store type
            fetchProductsByStoreType(storeType);
            // Fetch user points - assuming user has an id or account_id property
            if (user && user.id) {
                await fetchUserPoints(user.id);
            } else {
                // If no user id, fetch with a default account id or handle accordingly
                await fetchUserPoints('default_user');
            }
            setLoading(false);
        };
        loadData();
        // Reset recommendations when store type changes
        setShowRecommendations(false);
        setRecommendedProducts([]);
        setStoreTypeState(storeType);
    }, [storeType, user]);

    // 기본 상품 데이터 (API 실패 시 백업용)
    const mealKits = [
        {
            id: 1,
            name: '부드러운 닭가슴살 죽',
            description: '소화가 쉬운 닭가슴살과 야채로 만든 영양죽',
            price: 15000,
            originalPrice: 18000,
            discount: 17,
            image: '🍲',
            category: 'porridge',
            nutrition: { protein: '15g', calories: '280kcal' },
            suitable: ['수술 후', '항암 치료 중']
        },
        {
            id: 2,
            name: '연어 스팀 세트',
            description: '오메가3가 풍부한 연어와 찐 야채',
            price: 22000,
            originalPrice: 25000,
            discount: 12,
            image: '🐟',
            category: 'protein',
            nutrition: { protein: '25g', calories: '350kcal' },
            suitable: ['체력 회복', '면역력 강화']
        },
        {
            id: 3,
            name: '단백질 스무디 팩',
            description: '소화 잘되는 단백질과 비타민이 풍부한 스무디',
            price: 12000,
            originalPrice: 15000,
            discount: 20,
            image: '🥤',
            category: 'drink',
            nutrition: { protein: '20g', calories: '200kcal' },
            suitable: ['식욕 부진', '영양 보충']
        },
        {
            id: 4,
            name: '부드러운 두부 스테이크',
            description: '고단백 두부로 만든 부드러운 스테이크',
            price: 18000,
            originalPrice: 20000,
            discount: 10,
            image: '🥩',
            category: 'protein',
            nutrition: { protein: '18g', calories: '320kcal' },
            suitable: ['단백질 보충', '근력 유지']
        },
        {
            id: 5,
            name: '영양 미음 세트',
            description: '곡물과 야채로 만든 소화 잘되는 미음',
            price: 13000,
            originalPrice: 16000,
            discount: 19,
            image: '🥣',
            category: 'porridge',
            nutrition: { protein: '8g', calories: '180kcal' },
            suitable: ['소화 불량', '회복기']
        },
        {
            id: 6,
            name: '면역력 수프',
            description: '버섯과 야채로 만든 면역력 강화 수프',
            price: 16000,
            originalPrice: 19000,
            discount: 16,
            image: '🍜',
            category: 'soup',
            nutrition: { protein: '12g', calories: '220kcal' },
            suitable: ['면역력 강화', '항암 치료 중']
        }
    ];

    const storeTypes = [
        { id: 'all', name: '항암 치료', icon: '💊' },
        { id: 'stomach', name: '위암', icon: '🫃' },
        { id: 'colon', name: '대장암', icon: '🩺' },
        { id: 'breast', name: '유방암', icon: '🎗️' },
        { id: 'prostate', name: '전립선암', icon: '👨‍⚕️' }
    ];

    // 검색 및 스토어 타입 필터링 로직
    const getFilteredProducts = () => {
        let filtered = products;
        
        // 검색어 필터링
        if (searchQuery.trim()) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // 스토어 타입 필터링
        if (selectedCategory !== 'all') {
            // 선택된 스토어 타입에 맞는 제품만 필터링
            filtered = filtered.filter(product => {
                // 제품의 store_type이 선택된 카테고리와 일치하는지 확인
                return product.store_type === selectedCategory;
            });
        }
        
        return filtered;
    };
    
    const filteredProducts = getFilteredProducts();

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item => 
                    item.id === product.id 
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const getTotalAmount = () => {
        return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Toss Payments 결제 처리
    const handleCheckout = async () => {
        if (cartItems.length === 0) {
            alert('장바구니에 상품을 추가해주세요.');
            return;
        }

        setIsPaymentLoading(true);

        try {
            // Toss Payments 초기화
            const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";
            const tossPayments = window.TossPayments(clientKey);
            
            // 고유한 주문 ID 생성
            const orderId = uuidv4();
            const totalAmount = getTotalAmount();
            
            // 주문명 생성 (첫 번째 상품명 + 외 N건)
            const orderName = cartItems.length === 1 
                ? cartItems[0].name
                : `${cartItems[0].name} 외 ${cartItems.length - 1}건`;

            // 결제 요청
            await tossPayments.requestPayment({
                method: "CARD", // 카드 결제
                amount: {
                    currency: "KRW",
                    value: totalAmount,
                },
                orderId: orderId,
                orderName: orderName,
                successUrl: `${window.location.origin}/payment-success`,
                failUrl: `${window.location.origin}/payment-fail`,
                customerEmail: user?.email || "customer@example.com",
                customerName: user?.name || "고객",
                customerMobilePhone: "01012341234",
                card: {
                    useEscrow: false,
                    flowMode: "DEFAULT",
                    useCardPoint: false,
                    useAppCardOnly: false,
                },
            });
        } catch (error) {
            console.error('결제 요청 실패:', error);
            alert('결제 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setIsPaymentLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="shop-page-container" style={{ padding: '20px', textAlign: 'center' }}>
                <div style={{ marginTop: '50px' }}>
                    <div style={{ fontSize: '24px', marginBottom: '10px' }}>🔄</div>
                    <p>상품을 불러오는 중...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="shop-page-container">
            {/* Header - MainPage.js 스타일 적용 */}
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
                        className="back-btn" 
                        onClick={onBackToMain}
                        style={{
                            background: 'rgba(255, 255, 255, 0.2)',
                            border: 'none',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '16px',
                            marginBottom: '10px'
                        }}
                    >
                        ← 뒤로
                    </button>
                    <h1 style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px 0' }}>
                        {currentStore.title}
                    </h1>
                    <p style={{ fontSize: '14px', opacity: '0.9', margin: '0' }}>
                        {currentStore.description}
                    </p>
                </div>
                <div className="cart-icon" style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: 'pointer'
                }}>
                    🛒
                    {getTotalItems() > 0 && (
                        <span className="cart-badge" style={{
                            position: 'absolute',
                            top: '-5px',
                            right: '-5px',
                            background: '#EF4444',
                            color: 'white',
                            borderRadius: '50%',
                            width: '20px',
                            height: '20px',
                            fontSize: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>{getTotalItems()}</span>
                    )}
                </div>
            </div>

            {/* Search Bar with Points Display */}
            <div className="shop-search" style={{ padding: '20px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div className="search-bar" style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#F9FAFB',
                        border: '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        flex: 1
                    }}>
                        <span className="search-icon" style={{ marginRight: '10px', color: '#6B7280' }}>🔍</span>
                        <input 
                            type="text" 
                            placeholder="원하는 밀키트를 검색하세요"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={{
                                border: 'none',
                                background: 'transparent',
                                outline: 'none',
                                flex: 1,
                                fontSize: '16px'
                            }}
                        />
                    </div>
                    
                    {/* Points Display */}
                    <div className="points-display" style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: 'linear-gradient(135deg, #4A90E2, #357ABD)',
                        color: 'white',
                        borderRadius: '12px',
                        padding: '12px 16px',
                        minWidth: '120px',
                        justifyContent: 'center',
                        boxShadow: '0 2px 8px rgba(74, 144, 226, 0.2)'
                    }}>
                        <span style={{ marginRight: '6px', fontSize: '16px' }}>💎</span>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <span style={{ fontSize: '16px', fontWeight: '600' }}>
                                {pointsLoading ? '...' : userPoints.toLocaleString()}
                            </span>
                            <span style={{ fontSize: '12px', opacity: '0.9' }}>포인트</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Store Type Filter */}
            <div className="category-filter">
                {storeTypes.map(storeType => (
                    <button
                        key={storeType.id}
                        className={`category-btn ${selectedCategory === storeType.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(storeType.id)}
                    >
                        <span className="category-icon">{storeType.icon}</span>
                        <span>{storeType.name}</span>
                    </button>
                ))}
            </div>

            {/* Recommendation Button */}
            <button 
                className="recommendation-btn"
                onClick={fetchRecommendedProducts}
                disabled={recommendationLoading}
                style={{
                    width: 'calc(100% - 40px)',
                    margin: '0 20px 20px',
                    background: recommendationLoading ? '#9CA3AF' : 'linear-gradient(135deg, #10B981, #059669)',
                    borderRadius: '12px',
                    padding: '20px',
                    color: 'white',
                    border: 'none',
                    cursor: recommendationLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px'
                }}
            >
                {recommendationLoading ? (
                    <>
                        <div style={{
                            width: '20px',
                            height: '20px',
                            border: '2px solid rgba(255, 255, 255, 0.3)',
                            borderTop: '2px solid white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite'
                        }}></div>
                        <span>추천 상품을 찾는 중...</span>
                    </>
                ) : (
                    <>
                        <span style={{ fontSize: '20px' }}>🎯</span>
                        <div style={{ textAlign: 'left' }}>
                            <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '4px' }}>
                                {currentStore.bannerText}
                            </div>
                            <div style={{ fontSize: '14px', opacity: '0.9' }}>
                                {currentStore.description}
                            </div>
                        </div>
                    </>
                )}
            </button>
            
            {/* Add CSS animation for spinner */}
            <style jsx>{`
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>

            {/* Recommended Products Section */}
            {showRecommendations && recommendedProducts.length > 0 && (
                <div className="recommended-section" style={{ padding: '0 20px', marginBottom: '30px' }}>
                    {/* Group products by symptoms from dummy data */}
                    {Object.keys(productData[selectedCategory] || productData['all']).map((symptom) => {
                        // Get products for this specific symptom
                        const symptomProducts = recommendedProducts.filter(product => product.symptom === symptom);
                        
                        if (symptomProducts.length === 0) return null;
                        
                        return (
                            <div key={symptom} style={{ marginBottom: '40px' }}>
                                {/* Symptom Header */}
                                <div style={{
                                    background: '#E0E7FF',
                                    borderRadius: '20px',
                                    padding: '8px 16px',
                                    display: 'inline-block',
                                    marginBottom: '16px'
                                }}>
                                    <span style={{ fontSize: '14px', color: '#4338CA', fontWeight: '600' }}>
                                        {symptom} 증상 추천 상품
                                    </span>
                                </div>
                                
                                {/* Symptom Title */}
                                <h3 style={{
                                    margin: '0 0 16px 0',
                                    fontSize: '20px',
                                    fontWeight: '700',
                                    color: '#1F2937'
                                }}>
                                    {symptom} (빈도 매우 높음)
                                </h3>
                                
                                {/* Products Grid - 2 columns */}
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: '1fr 1fr',
                                    gap: '12px'
                                }}>
                                    {symptomProducts.map((product, index) => (
                                        <div key={`${symptom}-${product.id}`} style={{
                                            background: 'white',
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                            position: 'relative'
                                        }}>
                                            {/* Product Image */}
                                            <div style={{
                                                position: 'relative',
                                                height: '120px',
                                                background: '#F3F4F6',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}>
                                                {/* Recommendation Badge */}
                                                <div style={{
                                                    position: 'absolute',
                                                    top: '8px',
                                                    left: '8px',
                                                    background: '#3B82F6',
                                                    color: 'white',
                                                    padding: '4px 8px',
                                                    borderRadius: '6px',
                                                    fontSize: '12px',
                                                    fontWeight: '600',
                                                    transform: 'rotate(-15deg)'
                                                }}>
                                                    추천
                                                </div>
                                                
                                                {product.image_url ? (
                                                    <img 
                                                        src={product.image_url} 
                                                        alt={product.name} 
                                                        style={{ 
                                                            width: '80px', 
                                                            height: '80px', 
                                                            borderRadius: '8px',
                                                            objectFit: 'cover'
                                                        }} 
                                                    />
                                                ) : (
                                                    <span style={{ fontSize: '60px' }}>{product.image || '🍽️'}</span>
                                                )}
                                            </div>
                                            
                                            {/* Product Info */}
                                            <div style={{ padding: '12px' }}>
                                                {/* Product Name */}
                                                <h4 style={{
                                                    margin: '0 0 4px 0',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    color: '#1F2937',
                                                    lineHeight: '1.3'
                                                }}>
                                                    {product.name}
                                                </h4>
                                                
                                                {/* Product Description */}
                                                <p style={{
                                                    margin: '0 0 8px 0',
                                                    fontSize: '12px',
                                                    color: '#6B7280',
                                                    lineHeight: '1.3'
                                                }}>
                                                    {product.description}
                                                </p>
                                                
                                                {/* Price and Rating */}
                                                <div style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    alignItems: 'center',
                                                    marginBottom: '8px'
                                                }}>
                                                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                                                        <span style={{
                                                            fontSize: '16px',
                                                            fontWeight: '700',
                                                            color: '#1F2937'
                                                        }}>
                                                            {typeof product.price === 'string' ? product.price : `${product.price?.toLocaleString()}원`}
                                                        </span>
                                                        {product.originalPrice && (
                                                            <span style={{
                                                                fontSize: '12px',
                                                                color: '#9CA3AF',
                                                                textDecoration: 'line-through'
                                                            }}>
                                                                {product.originalPrice.toLocaleString()}원
                                                            </span>
                                                        )}
                                                    </div>
                                                    
                                                    {/* Star Rating */}
                                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                                        <span style={{ color: '#FCD34D', marginRight: '2px' }}>★</span>
                                                        <span style={{ fontSize: '12px', fontWeight: '600', color: '#1F2937' }}>
                                                            {(4 + Math.random()).toFixed(1)}
                                                        </span>
                                                    </div>
                                                </div>
                                                
                                                {/* Add to Cart Button */}
                                                <button 
                                                    onClick={() => addToCart(product)}
                                                    style={{
                                                        width: '100%',
                                                        background: '#3B82F6',
                                                        color: 'white',
                                                        border: 'none',
                                                        padding: '8px',
                                                        borderRadius: '6px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: '600'
                                                    }}
                                                >
                                                    담기
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                {/* More Button */}
                                <div style={{ textAlign: 'right', marginTop: '12px' }}>
                                    <button style={{
                                        background: 'transparent',
                                        border: 'none',
                                        color: '#6B7280',
                                        fontSize: '14px',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginLeft: 'auto'
                                    }}>
                                        기본순 ↑
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Bottom Cart Summary */}
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <div className="cart-info">
                        <span>{getTotalItems()}개 상품</span>
                        <span className="total-price">
                            {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}원
                        </span>
                    </div>
                    <button 
                        className="checkout-btn"
                        onClick={handleCheckout}
                        disabled={isPaymentLoading}
                        style={{
                            opacity: isPaymentLoading ? 0.6 : 1,
                            cursor: isPaymentLoading ? 'not-allowed' : 'pointer'
                        }}
                    >
                        {isPaymentLoading ? '결제 준비 중...' : '주문하기'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default ShopPage;