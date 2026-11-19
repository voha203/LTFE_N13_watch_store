import { createContext, useContext, useState, useEffect, useMemo } from "react";
import type { ReactNode } from "react";

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    joinDate: string;
    membershipTier: string;
}

interface AuthContextValue {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, name?: string) => void;
    logout: () => void;
    updateProfile: (data: Partial<User>) => void;
}

const STORAGE_KEY = "watch-store-auth-user";

const defaultDemoUser: User = {
    id: "user_001",
    name: "Hà Ánh Hợp",
    email: "hop.ha@watchstore.com",
    phone: "0988 123 456",
    address: "Khu phố 6, P. Linh Trung, TP. Thủ Đức, TP.HCM",
    joinDate: "01/10/2026",
    membershipTier: "Gold Member",
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readInitialUser(): User | null {
    try {
        const raw = globalThis.localStorage?.getItem(STORAGE_KEY);
        if (!raw) return null;
        return JSON.parse(raw);
    } catch {
        return null;
    }
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(readInitialUser);

    useEffect(() => {
        try {
            if (user) {
                globalThis.localStorage?.setItem(STORAGE_KEY, JSON.stringify(user));
            } else {
                globalThis.localStorage?.removeItem(STORAGE_KEY);
            }
        } catch {
            return;
        }
    }, [user]);

    const login = (email: string, name?: string) => {
        const loggedUser: User = {
            id: `user_${Date.now()}`,
            name: name || (email.split("@")[0].toUpperCase()),
            email,
            phone: "0988 123 456",
            address: "TP. Hồ Chí Minh, Việt Nam",
            joinDate: new Date().toLocaleDateString("vi-VN"),
            membershipTier: "Standard Member",
        };
        setUser(loggedUser);
    };

    const logout = () => {
        setUser(null);
    };

    const updateProfile = (data: Partial<User>) => {
        setUser((prev) => (prev ? { ...prev, ...data } : null));
    };

    const value = useMemo<AuthContextValue>(
        () => ({
            user,
            isAuthenticated: Boolean(user),
            login,
            logout,
            updateProfile,
        }),
        [user]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth phải được dùng bên trong AuthProvider.");
    }
    return context;
}
