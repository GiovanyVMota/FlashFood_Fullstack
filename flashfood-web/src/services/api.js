import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080'
});

// Adiciona o token em toda requisição se o usuário estiver logado
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default api;