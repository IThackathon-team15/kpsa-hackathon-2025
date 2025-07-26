const CBIOPORTAL_BASE_URL = 'https://www.cbioportal.org/api';

export const getCancerTypeInfo = async (cancerTypeId) => {
  try {
    const response = await fetch(`${CBIOPORTAL_BASE_URL}/cancer-types/${cancerTypeId}`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching cancer type info:', error);
    throw error;
  }
};

export const getAllCancerTypes = async () => {
  try {
    const response = await fetch(`${CBIOPORTAL_BASE_URL}/cancer-types`, {
      method: 'GET',
      headers: {
        'accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching all cancer types:', error);
    throw error;
  }
};
