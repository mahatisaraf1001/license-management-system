import axios from "axios";

const API = "http://localhost:5000/api/licenses";

export const getAllLicenses = async () => {
    const response = await axios.get(API);
    return response.data;
};

export const createLicense = async (data) => {
    const response = await axios.post(API, data);
    return response.data;
};

export const getLicenseById = async (id) => {
    const response = await axios.get(`${API}/${id}`);
    return response.data;
};

export const updateLicense = async (id, data) => {
    const response = await axios.put(`${API}/${id}`, data);
    return response.data;
};

export const deleteLicense = async (id) => {
    const response = await axios.delete(`${API}/${id}`);
    return response.data;
};