import axios from 'axios';
import { authStore } from './authStore';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const setupInterceptors = () => {
    api.interceptors.request.use((config) => {
        const token = authStore.getToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    });

    api.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response?.status === 401) authStore.getUnauthorizedHandler?.();
            return Promise.reject(error);
        }
    );
};

setupInterceptors();

export default api;
