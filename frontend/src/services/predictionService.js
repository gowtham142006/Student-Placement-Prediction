import API from "./api";

export const predictPlacement = async (formData) => {
    const response = await API.post("/predict", formData);
    return response.data;
};