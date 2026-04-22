/**
 * AuthContext — global authentication state.
 *
 * Provides: user, isLoading, login(), logout()
 * Listens for the custom "auth:logout" event dispatched by the Axios interceptor
 * so that a 401 response automatically clears state without a full page reload.
 *
 * NOTE: Token stored in localStorage for simplicity.
 * In production, prefer httpOnly cookies to mitigate XSS risks.
 */
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import * as authService from "@/services/authService";
import type { User } from "@/types";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // ── Hydrate on mount ─────────────────────────────────────────────
    useEffect(() => {
        const hydrate = async () => {
            const token = localStorage.getItem("token");
            if (!token) { setIsLoading(false); return; }
            try {
                const { data } = await authService.getProfile();
                const profile = data.data;
                setUser({
                    ...profile,
                    role: profile.role ?? (profile.isAdmin ? "ADMIN" : "USER"),
                    isAdmin: profile.role ? profile.role === "ADMIN" : Boolean(profile.isAdmin),
                    token,
                });
            } catch {
                localStorage.removeItem("token");
            } finally {
                setIsLoading(false);
            }
        };
        hydrate();
    }, []);

    // ── Listen for 401-triggered logouts from Axios interceptor ──────
    useEffect(() => {
        const handleForceLogout = () => {
            setUser(null);
        };
        window.addEventListener("auth:logout", handleForceLogout);
        return () => window.removeEventListener("auth:logout", handleForceLogout);
    }, []);

    // ── Login ──────────────────────────────────────────────────────────
    const login = useCallback(async (email: string, password: string) => {
        const { data } = await authService.login({ email, password });
        const userData = data.data;
        localStorage.setItem("token", userData.token);
        setUser({
            ...userData,
            role: userData.role ?? (userData.isAdmin ? "ADMIN" : "USER"),
            isAdmin: userData.role ? userData.role === "ADMIN" : Boolean(userData.isAdmin),
        });
    }, []);

    // ── Logout ─────────────────────────────────────────────────────────
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("cart_items");
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

export default AuthContext;
