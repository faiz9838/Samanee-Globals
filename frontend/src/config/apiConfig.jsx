import axios from 'axios';

const getBaseUrl = () => {
    return window.location.hostname === 'localhost'
        ? 'http://localhost:6001/api'
        : 'https://samanee-globals-1.onrender.com/api';
};

const API = axios.create({
    baseURL: getBaseUrl(),
    withCredentials: true, // important if using cookies/session
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
