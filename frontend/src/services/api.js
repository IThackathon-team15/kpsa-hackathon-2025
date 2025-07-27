// API 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

// API 호출 헬퍼 함수
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'API 요청 실패');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// 사용자 관련 API
export const userAPI = {
  // 핸드폰 번호로 사용자 조회
  checkUserByPhone: async (phoneNumber) => {
    return apiCall(`/users/check-phone`, {
      method: 'POST',
      body: JSON.stringify({ phoneNumber }),
    });
  },

  // 새 사용자 등록
  createUser: async (userData) => {
    return apiCall('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  // 사용자 정보 업데이트
  updateUser: async (userId, userData) => {
    return apiCall(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  // 사용자 정보 조회
  getUser: async (userId) => {
    return apiCall(`/users/${userId}`);
  },
};

// 환자 정보 관련 API
export const patientAPI = {
  // 환자 정보 저장
  savePatientInfo: async (patientData) => {
    return apiCall('/patients', {
      method: 'POST',
      body: JSON.stringify(patientData),
    });
  },

  // 환자 정보 업데이트
  updatePatientInfo: async (patientId, patientData) => {
    return apiCall(`/patients/${patientId}`, {
      method: 'PUT',
      body: JSON.stringify(patientData),
    });
  },
};