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

    useEffect(() => {
        setUser(readStoredUser());
        setIsLoading(false);
    }, []);

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

    const logout = useCallback(() => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem("cart_items");
        setUser(null);
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
