import React from 'react';
import imageIcon from '../assets/image.png';
import './MembershipPage.css';
import subscriptionimage from '../assets/subscription-square.png';

const MembershipPage = ({ user, onBackToMain }) => {
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
          <h1 className="completion-rate" style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0' }}>멤버십</h1>
          <p className="completion-subtitle" style={{ fontSize: '14px', opacity: '0.9', margin: '0' }}>프리미엄 서비스를 이용해보세요</p>
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

      {/* Membership Content */}
      <div style={{ padding: '20px' }}>
        {/* 첫 번째 멤버십 카드 */}
        <div className="membership-card" style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          marginBottom: '16px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB',
          overflow: 'hidden'
        }}>
          <div className="card-content" style={{ padding: '20px' }}>
            <div className="premium-badge" style={{
              backgroundColor: '#3B82F6',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              프리미엄 멤버십
            </div>
            <div className="plan-info" style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111827' }}>4인 12개월</h2>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 8px 0' }}>*2026년 1월 4일 오후 3시 25분까지</p>
              <div className="pricing">
                <span className="price" style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>₩40,500</span>
                <span className="monthly" style={{ fontSize: '10px', color: '#10B981', marginLeft: '12px' }}>월 구독 할인: 33,750원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 두 번째 멤버십 카드 */}
        <div className="membership-card" style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #E5E7EB',
          overflow: 'hidden'
        }}>
          <div className="card-content" style={{ padding: '20px' }}>
            <div className="premium-badge" style={{
              backgroundColor: '#10B981',
              color: 'white',
              padding: '8px 12px',
              borderRadius: '8px',
              fontSize: '12px',
              fontWeight: '600',
              display: 'inline-block',
              marginBottom: '16px'
            }}>
              베이직 멤버십
            </div>
            <div className="plan-info" style={{ marginBottom: '16px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#111827' }}>1인 6개월</h2>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: '0 0 12px 0' }}>*2025년 12월 31일까지</p>
              <div className="pricing">
                <span className="price" style={{ fontSize: '14px', fontWeight: 'bold', color: '#111827' }}>₩19,900</span>
                <span className="monthly" style={{ fontSize: '10px', color: '#10B981', marginLeft: '12px' }}>월 구독 할인: 16,500원</span>
              </div>
            </div>
          </div>
        </div>

        {/* 구독시 혜택 섹션 */}
        <div className="benefits-section" style={{
          backgroundImage: `url(${subscriptionimage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          borderRadius: '12px',
          marginBottom: '20px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: '1px solid #FDE68A',
          overflow: 'hidden',
          position: 'relative'
        }}>
          <div className="card-content" style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div className="benefits-content">
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 8px 0', color: '#92400E' }}>구독 혜택</h3>
              <p style={{ fontSize: '14px', color: '#42400E', margin: '0' }}>전문 의료진 상담</p>
              <p style={{ fontSize: '14px', color: '#42400E', margin: '0' }}>맞춤형 건강 관리</p>
            </div>
            <div className="benefits-image" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div className="stethoscope-icon" style={{ fontSize: '32px' }}>🩺</div>
              <div className="pills" style={{ fontSize: '24px' }}>💊</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipPage;