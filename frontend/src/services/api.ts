import axios from "axios";

const API_BASE_URL = "http://localhost:8000";

export const initiatePostRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};

export const getScanResults = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/results`);
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
};
