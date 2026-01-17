import axios from 'axios';

const api = axios.create({
    //https://api.wellcometoserbia.com/api   http://localhost:5000/api
    baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
    const userData = localStorage.getItem("userInfo");
    
    // 1. Check if the item exists in localStorage at all
    if (userData) {
        try {
            const user = JSON.parse(userData);
            // 2. Use optional chaining (?.) to safely access the token
            const token = user?.token;

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (e) {
            console.error("Error parsing userInfo from localStorage", e);
        }
    }
    
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;