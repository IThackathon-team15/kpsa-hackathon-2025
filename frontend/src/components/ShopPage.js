import React, { useState, useEffect } from 'react';

const ShopPage = ({ user, onBackToMain, storeType = 'stomach' }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cartItems, setCartItems] = useState([]);
    const [products, setProducts] = useState([]);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Store type configurations
    const storeConfigs = {
        stomach: {
            title: '위암 환자 전용 스토어',
            symptoms: ['위통', '소화불량', '식욕부진'],
            bannerText: '위암 환자 맞춤 추천',
            description: '영양사가 직접 설계한 소화 잘되는 건강 밀키트'
        },
        chemo: {
            title: '항암제 부작용 전용 스토어',
            symptoms: ['구토', '메스꺼움', '피로'],
            bannerText: '항암 치료 중 맞춤 추천',
            description: '부작용 완화에 도움되는 영양 밀키트'
        },
        colon: {
            title: '대장암 환자를 위한 스토어',
            symptoms: ['복통', '변비', '설사'],
            bannerText: '대장암 환자 맞춤 추천',
            description: '장 건강에 좋은 맞춤형 밀키트'
        },
        breast: {
            title: '유방암 환자를 위한 스토어',
            symptoms: ['피로', '면역력저하', '체중감소'],
            bannerText: '유방암 환자 맞춤 추천',
            description: '면역력 강화와 회복에 도움되는 밀키트'
        },
        prostate: {
            title: '전립선암 환자를 위한 스토어',
            symptoms: ['배뇨곤란', '피로', '체력저하'],
            bannerText: '전립선암 환자 맞춤 추천',
            description: '체력 회복과 영양 보충을 위한 밀키트'
        }
    };
    
    const currentStore = storeConfigs[storeType] || storeConfigs.stomach;

    // API 호출 함수들
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3001/products');
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error('상품 데이터 로드 실패:', error);
            // 에러 시 기본 데이터 사용
            setProducts(mealKits);
        }
    };

    const fetchRecommendedProducts = async () => {
        try {
            const response = await fetch('http://127.0.0.1:3001/recommend-gpt', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    symptoms: currentStore.symptoms,
                    top_k: 5
                })
            });
            const data = await response.json();
            setRecommendedProducts(data);
        } catch (error) {
            console.error('추천 상품 데이터 로드 실패:', error);
            // 에러 시 기본 추천 상품 사용
            setRecommendedProducts(mealKits.slice(0, 3));
        }
    };

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            await Promise.all([fetchProducts(), fetchRecommendedProducts()]);
            setLoading(false);
        };
        loadData();
    }, [storeType]);

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

    const categories = [
        { id: 'all', name: '전체', icon: '🍽️' },
        { id: 'porridge', name: '죽/미음', icon: '🍲' },
        { id: 'protein', name: '단백질', icon: '🥩' },
        { id: 'soup', name: '수프', icon: '🍜' },
        { id: 'drink', name: '음료', icon: '🥤' }
    ];

    // 검색 및 카테고리 필터링 로직
    const getFilteredProducts = () => {
        let filtered = products;
        
        // 검색어 필터링
        if (searchQuery.trim()) {
            filtered = filtered.filter(product => 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        
        // 카테고리 필터링
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(product => product.category === selectedCategory);
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

            {/* Search Bar */}
            <div className="shop-search" style={{ padding: '20px' }}>
                <div className="search-bar" style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: '#F9FAFB',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    padding: '12px 16px'
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
            </div>

            {/* Category Filter */}
            <div className="category-filter">
                {categories.map(category => (
                    <button
                        key={category.id}
                        className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category.id)}
                    >
                        <span className="category-icon">{category.icon}</span>
                        <span>{category.name}</span>
                    </button>
                ))}
            </div>

            {/* Featured Banner */}
            <div className="featured-banner" style={{
                margin: '0 20px 20px',
                background: 'linear-gradient(135deg, #10B981, #059669)',
                borderRadius: '12px',
                padding: '20px',
                color: 'white'
            }}>
                <div className="banner-content">
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>🎯 {currentStore.bannerText}</h3>
                    <p style={{ margin: '0', fontSize: '14px', opacity: '0.9' }}>{currentStore.description}</p>
                </div>
            </div>

            {/* Recommended Products Section */}
            {recommendedProducts.length > 0 && (
                <div className="recommended-section" style={{ padding: '0 20px', marginBottom: '30px' }}>
                    <div className="section-header" style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '16px'
                    }}>
                        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>맞춤 추천 상품</h3>
                    </div>
                    
                    <div className="products-grid" style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                        gap: '16px'
                    }}>
                        {recommendedProducts.map(product => (
                            <div key={`rec-${product.id}`} className="product-card" style={{
                                border: '2px solid #10B981',
                                borderRadius: '12px',
                                padding: '16px',
                                backgroundColor: 'white',
                                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                                position: 'relative'
                            }}>
                                <div style={{
                                    position: 'absolute',
                                    top: '8px',
                                    right: '8px',
                                    background: '#10B981',
                                    color: 'white',
                                    padding: '4px 8px',
                                    borderRadius: '6px',
                                    fontSize: '12px',
                                    fontWeight: '600'
                                }}>추천</div>
                                
                                <div className="product-image" style={{ textAlign: 'center', marginBottom: '12px' }}>
                                    {product.image_url ? (
                                        <img src={product.image_url} alt={product.name} style={{ width: '60px', height: '60px', borderRadius: '8px' }} />
                                    ) : (
                                        <span style={{ fontSize: '48px' }}>🍽️</span>
                                    )}
                                </div>
                                
                                <div className="product-info">
                                    <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>{product.name}</h4>
                                    <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6B7280', lineHeight: '1.4' }}>{product.description}</p>
                                    
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                                            {typeof product.price === 'string' ? product.price : `${product.price?.toLocaleString()}원`}
                                        </span>
                                        <button 
                                            onClick={() => addToCart(product)}
                                            style={{
                                                background: '#10B981',
                                                color: 'white',
                                                border: 'none',
                                                padding: '8px 16px',
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                fontSize: '14px',
                                                fontWeight: '600'
                                            }}
                                        >
                                            담기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* All Products Section */}
            <div className="products-section" style={{ padding: '0 20px' }}>
                <div className="section-header" style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '16px'
                }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>전체 상품 ({filteredProducts.length}개)</h3>
                    <span className="sort-btn" style={{ color: '#6B7280', cursor: 'pointer' }}>정렬 ⌄</span>
                </div>
                
                <div className="products-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '16px'
                }}>
                    {filteredProducts.map(product => (
                        <div key={product.id} className="product-card" style={{
                            border: '1px solid #E5E7EB',
                            borderRadius: '12px',
                            padding: '16px',
                            backgroundColor: 'white',
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                            position: 'relative'
                        }}>
                            <div className="product-image" style={{ textAlign: 'center', marginBottom: '12px', position: 'relative' }}>
                                {product.image_url ? (
                                    <img src={product.image_url} alt={product.name} style={{ width: '60px', height: '60px', borderRadius: '8px' }} />
                                ) : (
                                    <span style={{ fontSize: '48px' }}>{product.image || '🍽️'}</span>
                                )}
                                {product.discount && product.discount > 0 && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '0',
                                        right: '0',
                                        background: '#EF4444',
                                        color: 'white',
                                        padding: '4px 8px',
                                        borderRadius: '6px',
                                        fontSize: '12px',
                                        fontWeight: '600'
                                    }}>{product.discount}%</div>
                                )}
                            </div>
                            
                            <div className="product-info">
                                <h4 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600' }}>{product.name}</h4>
                                <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#6B7280', lineHeight: '1.4' }}>{product.description}</p>
                                
                                {product.nutrition && (
                                    <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                                        {product.nutrition.protein && (
                                            <span style={{ fontSize: '12px', background: '#F3F4F6', padding: '4px 8px', borderRadius: '4px' }}>단백질 {product.nutrition.protein}</span>
                                        )}
                                        {product.nutrition.calories && (
                                            <span style={{ fontSize: '12px', background: '#F3F4F6', padding: '4px 8px', borderRadius: '4px' }}>{product.nutrition.calories}</span>
                                        )}
                                    </div>
                                )}
                                
                                {product.suitable && (
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '12px' }}>
                                        {product.suitable.map((tag, index) => (
                                            <span key={index} style={{
                                                fontSize: '12px',
                                                background: '#EBF8FF',
                                                color: '#1E40AF',
                                                padding: '2px 6px',
                                                borderRadius: '4px'
                                            }}>#{tag}</span>
                                        ))}
                                    </div>
                                )}
                                
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <span style={{ fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                                            {typeof product.price === 'string' ? product.price : `${product.price?.toLocaleString()}원`}
                                        </span>
                                        {product.originalPrice && product.originalPrice > (product.price || 0) && (
                                            <span style={{ fontSize: '14px', color: '#9CA3AF', textDecoration: 'line-through', marginLeft: '8px' }}>
                                                {product.originalPrice.toLocaleString()}원
                                            </span>
                                        )}
                                    </div>
                                    <button 
                                        onClick={() => addToCart(product)}
                                        style={{
                                            background: '#4A90E2',
                                            color: 'white',
                                            border: 'none',
                                            padding: '8px 16px',
                                            borderRadius: '8px',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            fontWeight: '600'
                                        }}
                                    >
                                        담기
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Bottom Cart Summary */}
            {cartItems.length > 0 && (
                <div className="cart-summary">
                    <div className="cart-info">
                        <span>{getTotalItems()}개 상품</span>
                        <span className="total-price">
                            {cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toLocaleString()}원
                        </span>
                    </div>
                    <button className="checkout-btn">주문하기</button>
                </div>
            )}
        </div>
    );
};

export default ShopPage;