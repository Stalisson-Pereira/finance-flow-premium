import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface Dream {
    id: string;
    title: string;
    targetAmount: number;
    currentAmount: number;
    currency: string;
    deadline: string;
    category: string;
    createdAt: string;
}

interface DreamState {
    dreams: Dream[];
    addDream: (d: Omit<Dream, "id" | "createdAt" | "currentAmount">) => void;
    addToDream: (id: string, amount: number) => void;
}

export const useDreamStore = create<DreamState>()(
    persist(
        (set) => ({
            dreams: [],
            addDream: (d) =>
                set((state) => ({
                    dreams: [
                        ...state.dreams,
                        {
                            ...d,
                            id: crypto.randomUUID(),
                            currentAmount: 0,
                            createdAt: new Date().toISOString()
                        }
                    ]
                })),
            addToDream: (id, amount) =>
                set((state) => ({
                    dreams: state.dreams.map((dream) =>
                        dream.id === id
                            ? { ...dream, currentAmount: dream.currentAmount + amount }
                            : dream
                    )
                }))
        }),
        { name: "dreams-storage" }
    )
);
