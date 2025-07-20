import axios from 'axios';

const getBaseUrl = () => {
    const isLocalhost = window.location.hostname === 'localhost';
    return isLocalhost
        ? 'http://localhost:6001/api'
        : import.meta.env.VITE_API_BASE_URL; // From .env in production
};

const API = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true, // Optional if using cookies/sessions
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
