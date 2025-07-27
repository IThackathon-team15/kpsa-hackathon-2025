// API 기본 설정
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

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
    
    // 응답이 JSON이 아닐 수 있으므로 체크
    const contentType = response.headers.get('content-type');
    let data;
    
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }
    
    if (!response.ok) {
      throw new Error(data.message || data || 'API 요청 실패');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// 로그인 관련 API
export const authAPI = {
  // 휴대폰 번호로 로그인
  login: async (phoneNumber) => {
    return apiCall('/api/login', {
      method: 'POST',
      body: JSON.stringify({ phoneNumber }),
    });
  },
};

// 프로필 관련 API
export const profileAPI = {
  // 프로필 조회
  getProfile: async (userId) => {
    return apiCall(`/api/profile/${userId}`);
  },

  // 프로필 저장
  saveProfile: async (userId, profileData) => {
    return apiCall(`/api/profile/${userId}`, {
      method: 'POST',
      body: JSON.stringify(profileData),
    });
  },
};

// 복약 관련 API
export const medicationAPI = {
  // 복약 정보 조회
  getMedications: async (userId) => {
    return apiCall(`/api/medications/${userId}`);
  },

  // 복약 정보 추가
  addMedication: async (userId, medicationData) => {
    return apiCall(`/api/medications/${userId}`, {
      method: 'POST',
      body: JSON.stringify(medicationData),
    });
  },
};

// 복약 로그 관련 API
export const logAPI = {
  // 복약 로그 조회
  getLogs: async (userId, year, month) => {
    return apiCall(`/api/logs/${userId}?year=${year}&month=${month}`);
  },

  // 복약 로그 추가
  createLog: async (userId, logData) => {
    return apiCall(`/api/logs/${userId}`, {
      method: 'POST',
      body: JSON.stringify(logData),
    });
  },
};

// 포인트 관련 API
export const pointAPI = {
  // 포인트 조회
  getPoints: async (userId) => {
    return apiCall(`/api/points/${userId}`);
  },

  // 포인트 추가
  addPoints: async (userId, points) => {
    return apiCall('/api/points/add', {
      method: 'POST',
      body: JSON.stringify({ userId, points }),
    });
  },

  // 포인트 차감
  subtractPoints: async (userId, points) => {
    return apiCall('/api/points/subtract', {
      method: 'POST',
      body: JSON.stringify({ userId, points }),
    });
  },
};

// 상품 관련 API
export const productAPI = {
  // 전체 상품 조회
  getAllProducts: async () => {
    return apiCall('/api/products');
  },

  // 스토어 유형별 상품 조회
  getProductsByStoreType: async (storeType) => {
    return apiCall(`/api/products/by-storetype/${storeType}`);
  },

  // 계정별 추천 상품 조회
  getProductsByAccount: async (accountId) => {
    return apiCall(`/api/products/by-account/${accountId}`);
  },
};

// 스토어 유형 관련 API
export const storeTypeAPI = {
  // 스토어 유형 조회
  getStoreType: async (accountId) => {
    return apiCall(`/api/storetype/${accountId}`);
  },

  // 스토어 유형 업데이트
  updateStoreType: async (accountId, storeType) => {
    return apiCall('/api/storetype/update', {
      method: 'POST',
      body: JSON.stringify({ accountId, storeType }),
    });
  },
};

// AI 관련 API
export const aiAPI = {
  // 텍스트 요약
  getSummary: async (text) => {
    return apiCall('/api/ai/summary', {
      method: 'GET',
      body: JSON.stringify({ text }),
    });
  },
};

// 기존 API와의 호환성을 위한 별칭
export const userAPI = {
  checkUserByPhone: authAPI.login,
  createUser: (userData) => profileAPI.saveProfile(userData.id, userData),
  updateUser: (userId, userData) => profileAPI.saveProfile(userId, userData),
  getUser: profileAPI.getProfile,
};

export const patientAPI = {
  savePatientInfo: (patientData) => profileAPI.saveProfile(patientData.userId, patientData),
  updatePatientInfo: (patientId, patientData) => profileAPI.saveProfile(patientId, patientData),
};
