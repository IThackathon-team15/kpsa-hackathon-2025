import React, { useState } from 'react';

const ShopPage = ({ user, onBackToMain }) => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [cartItems, setCartItems] = useState([]);

    // 위암 환자에 적합한 밀키트 상품 데이터
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

    const filteredMealKits = selectedCategory === 'all' 
        ? mealKits 
        : mealKits.filter(kit => kit.category === selectedCategory);

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

    return (
        <div className="shop-page-container">
            {/* Header */}
            <div className="shop-header">
                <button className="back-btn" onClick={onBackToMain}>
                    ← 
                </button>
                <h2>위암 환자 전용 밀키트</h2>
                <div className="cart-icon">
                    🛒
                    {getTotalItems() > 0 && (
                        <span className="cart-badge">{getTotalItems()}</span>
                    )}
                </div>
            </div>

            {/* Search Bar */}
            <div className="shop-search">
                <div className="search-bar">
                    <span className="search-icon">🔍</span>
                    <input type="text" placeholder="원하는 밀키트를 검색하세요" />
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
            <div className="featured-banner">
                <div className="banner-content">
                    <h3>🎯 위암 환자 맞춤 추천</h3>
                    <p>영양사가 직접 설계한 소화 잘되는 건강 밀키트</p>
                </div>
            </div>

            {/* Product Grid */}
            <div className="products-section">
                <div className="section-header">
                    <h3>추천 밀키트 ({filteredMealKits.length}개)</h3>
                    <span className="sort-btn">정렬 ⌄</span>
                </div>
                
                <div className="products-grid">
                    {filteredMealKits.map(kit => (
                        <div key={kit.id} className="product-card">
                            <div className="product-image">
                                <span className="product-emoji">{kit.image}</span>
                                {kit.discount > 0 && (
                                    <div className="discount-badge">{kit.discount}%</div>
                                )}
                            </div>
                            
                            <div className="product-info">
                                <h4 className="product-name">{kit.name}</h4>
                                <p className="product-description">{kit.description}</p>
                                
                                <div className="nutrition-info">
                                    <span className="nutrition-item">단백질 {kit.nutrition.protein}</span>
                                    <span className="nutrition-item">{kit.nutrition.calories}</span>
                                </div>
                                
                                <div className="suitable-tags">
                                    {kit.suitable.map((tag, index) => (
                                        <span key={index} className="suitable-tag">#{tag}</span>
                                    ))}
                                </div>
                                
                                <div className="price-section">
                                    <div className="price-info">
                                        <span className="current-price">{kit.price.toLocaleString()}원</span>
                                        {kit.originalPrice > kit.price && (
                                            <span className="original-price">{kit.originalPrice.toLocaleString()}원</span>
                                        )}
                                    </div>
                                    <button 
                                        className="add-to-cart-btn"
                                        onClick={() => addToCart(kit)}
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