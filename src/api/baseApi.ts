import axios from "axios";

export const baseApi = axios.create({
    baseURL: "https://lang-api-jr3f.onrender.com/api",
    // baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

let accessToken: string | null = null;

baseApi.interceptors.request.use(config => {
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
});

baseApi.interceptors.response.use(
    res => res,
    err => {
        if (err.response?.status === 401) {
            accessToken = null;
        }
        return Promise.reject(err);
    }
);

export const setAuthToken = (token: string | null) => {
    accessToken = token;
};