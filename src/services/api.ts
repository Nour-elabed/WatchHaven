import axios from "axios";

/**
 * BASE_URL Configuration:
 * In development (Vite), it will use the proxy if VITE_API_URL is undefined.
 * In production (Vercel), VITE_API_URL MUST be set in the dashboard.
 */
const BASE_URL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

// ── Request Interceptor ──────────────────────────────────────────────────
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// ── Response Interceptor ──────────────────────────────────────────────────
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || !error.response || error.code === 'ERR_NETWORK') {
            localStorage.removeItem("token");
            localStorage.removeItem("cart_items");
            window.dispatchEvent(new Event("auth:logout"));
        }
        return Promise.reject(error);
    }
);

export default api;
