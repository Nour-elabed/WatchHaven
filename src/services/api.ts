/**
 * Centralized Axios instance — the ONLY place we configure HTTP calls.
 *
 * Request interceptor:  auto-attaches Authorization header from localStorage.
 * Response interceptor: on 401, clears the stale token so the user is
 *                       effectively logged out on the next navigation.
 *
 * NOTE: For production, prefer httpOnly cookies over localStorage JWT
 * to mitigate XSS attacks. Using localStorage here for simplicity.
 */
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL ;

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
        // Log out on 401 Unauthorized or if the server goes completely offline (ERR_NETWORK)
        if (error.response?.status === 401 || !error.response || error.code === 'ERR_NETWORK') {
            // Token expired, invalid, or server unreachable — clear it
            localStorage.removeItem("token");
            localStorage.removeItem("cart_items");
            // Dispatch a custom event so AuthContext can sync state
            window.dispatchEvent(new Event("auth:logout"));
        }
        return Promise.reject(error);
    }
);

export default api;
