import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from "react";
import * as authService from "@/services/authService";
import { ROLES, type User } from "@/types";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<User>;
    logout: () => void;
    updateProfile: (data: { username?: string; email?: string; password?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = "user";

const readStoredUser = (): User | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? (JSON.parse(raw) as User) : null;
    } catch {
        return null;
    }
};

const writeStoredUser = (user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("cart_items");
        setUser(null);
    }, []);

    useEffect(() => {
        const stored = readStoredUser();
        if (stored) {
            setUser(stored);
            // Validate token on startup to ensure session is still valid on server
            authService.getProfile()
                .then(profile => {
                    // Update local storage with fresh profile data but keep existing token
                    const merged = { ...profile, token: stored.token };
                    setUser(merged);
                    writeStoredUser(merged);
                })
                .catch(() => {
                    // If profile fetch fails (e.g. 401), interceptor in api.ts 
                    // will emit "auth:logout" which we handle in the other useEffect.
                    // But we can also explicitly logout here for robustness.
                    logout();
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, [logout]);

    useEffect(() => {
        const handleForceLogout = () => {
            setUser(null);
            localStorage.removeItem(STORAGE_KEY);
        };
        window.addEventListener("auth:logout", handleForceLogout);
        return () => window.removeEventListener("auth:logout", handleForceLogout);
    }, []);

    const login = useCallback(async (email: string, password: string): Promise<User> => {
        const userData = await authService.login({ email, password });
        writeStoredUser(userData);
        setUser(userData);
        return userData;
    }, []);


    const updateProfile = useCallback(async (payload: { username?: string; email?: string; password?: string }) => {
        const updated = await authService.updateProfile(payload);
        // Preserve token if backend didn't return a fresh one.
        const merged: User = { ...updated, token: updated.token ?? user?.token };
        writeStoredUser(merged);
        setUser(merged);
    }, [user?.token]);

    return (
        <AuthContext.Provider value={{ user, isLoading, login, logout, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};

export const useIsAdmin = (): boolean => {
    const { user } = useAuth();
    return user?.role === ROLES.ADMIN || user?.role === ROLES.SUPER_ADMIN;
};

export const useIsSuperAdmin = (): boolean => {
    const { user } = useAuth();
    return user?.role === ROLES.SUPER_ADMIN;
};

export default AuthContext;
