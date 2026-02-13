import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
    id: string;
    email: string;
    isPremium: boolean;
    currency: string;
}

interface UserState {
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: {
                id: "demo",
                email: "demo@user.com",
                isPremium: true,
                currency: "BRL"
            },
            setUser: (user) => set({ user }),
            logout: () => set({ user: null })
        }),
        { name: "user-storage" }
    )
);
