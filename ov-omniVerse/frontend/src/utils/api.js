import axios from 'axios';

const API = axios.create({
    // URL Backend Koyeb Anda
    baseURL: 'https://cooing-mireille-omniverse-502f0d60.koyeb.app/api',
});

// Menambahkan token ke header setiap request jika user sudah login
API.interceptors.request.use((req) => {
    const token = localStorage.getItem('token');
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

export default API;
