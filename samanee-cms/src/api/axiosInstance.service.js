import axios from 'axios';

const API = axios.create({
    baseURL:
        window.location.hostname === 'localhost'
            ? 'http://localhost:6001/api'
            : import.meta.env.VITE_API_BASE_URL, // e.g. https://yourdomain.com/api
    withCredentials: true, // optional if you're using cookies/sessions
});

API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
