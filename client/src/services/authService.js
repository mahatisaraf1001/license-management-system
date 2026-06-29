import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

export const registerAdmin = async (adminData) => {
    const response = await axios.post(`${API_URL}/register`, adminData);
    return response.data;
};

export const loginAdmin = async (loginData) => {
    const response = await axios.post(`${API_URL}/login`, loginData);
    return response.data;
};