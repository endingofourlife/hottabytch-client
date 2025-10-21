import axios from "axios";

export const baseApi = axios.create({
    baseURL: "https://lang-api-jr3f.onrender.com/api",
    // baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});