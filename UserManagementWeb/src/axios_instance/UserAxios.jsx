import axios from "axios";

export const userInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})


userInstance.interceptors.request.use((config) => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
        config.headers.Authorization = `Bearer ${userToken}`
    }
    return config;
})

