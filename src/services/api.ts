import axios, { AxiosError } from "axios";
import type { User } from "@/types";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: { "Content-Type": "application/json" },
});

const readStoredUser = (): User | null => {
    try {
        const raw = localStorage.getItem("user");
        return raw ? (JSON.parse(raw) as User) : null;
    } catch {
        return null;
    }
};

api.interceptors.request.use((config) => {
    const stored = readStoredUser();
    if (stored?.token) {
        config.headers.Authorization = `Bearer ${stored.token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<{ message?: string }>) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("user");
            localStorage.removeItem("cart_items");
            window.dispatchEvent(new Event("auth:logout"));
        }
        const message =
            error.response?.data?.message ||
            error.message ||
            "Network error";
        return Promise.reject(new Error(message));
    }
);

export default api;
