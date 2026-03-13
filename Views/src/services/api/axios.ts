import axios from 'axios';
import toast from 'react-hot-toast';

export const api = axios.create({
    baseURL: import.meta.env.BACKEND_SERVICE,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401){
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        if (error.response?.status >= 500){
            const msg = error.response?.data?.errors?.join(', ') || error.message || 'Erro no servidor';
            toast.error(msg);
        }
        return Promise.reject(error);
    }
)