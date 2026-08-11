import axios from "axios";

const API_URL = "http://localhost:8080/api";

export const predictPlacement = async (formData) => {
    const response = await axios.post(`${API_URL}/predict`, formData);
    return response.data;
};