import axios from "axios";


export const BASE_URL = 'http://localhost:5002/api';

const $api = axios.create({
    withCredentials: true,
    baseURL: BASE_URL
})

$api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
});

$api.interceptors.response.use((response) => response,
    error => {
        if (error.response?.status === 401 && !window.location.pathname.includes("/login")) {
            localStorage.removeItem('token');
            window.location.href = "/login";
        }
        return Promise.reject(error);
    });

export default $api;