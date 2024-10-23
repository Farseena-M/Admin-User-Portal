import axios from "axios";

export const adminInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


adminInstance.interceptors.request.use((config) => {
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
        config.headers.Authorization = `Bearer ${adminToken}`
    }
    return config;
})

