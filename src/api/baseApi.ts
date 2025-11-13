import axios from "axios";

export const StorageManager = {
    saveToken: (userId: number, token: string): void => {
        localStorage.setItem(`token_${userId}`, token);
        localStorage.setItem('current_user_id', userId.toString());
    },

    getToken: (userId: number): string | null => {
        return localStorage.getItem(`token_${userId}`);
    },

    getCurrentUserId: (): number | null => {
        const idStr = localStorage.getItem('current_user_id');
        return idStr ? parseInt(idStr, 10) : null;
    },

    removeToken: (userId: number): void => {
        localStorage.removeItem(`token_${userId}`);
        if (localStorage.getItem('current_user_id') === userId.toString()) {
            localStorage.removeItem('current_user_id');
        }
    },

    isAuthenticated: (): boolean => {
        const currentId = StorageManager.getCurrentUserId();
        return currentId !== null && StorageManager.getToken(currentId) !== null;
    }
};

export const baseApi = axios.create({
    // baseURL: "https://lang-api-jr3f.onrender.com/api",
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

baseApi.interceptors.request.use(
    (config) => {
        const currentUserId = StorageManager.getCurrentUserId();
        if (currentUserId) {
            const token = StorageManager.getToken(currentUserId);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            } else {
                console.warn(`No token for current user ${currentUserId}`);
            }
        } else {
            console.warn("No current user — auth required");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);