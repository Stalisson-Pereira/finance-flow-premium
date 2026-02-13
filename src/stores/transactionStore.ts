import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TransactionType = "income" | "expense";

export interface Transaction {
    id: string;
    type: TransactionType;
    amount: number;
    currency: string;
    category: string;
    description: string;
    date: string;
    createdAt: string;
}

interface TransactionState {
    transactions: Transaction[];
    addTransaction: (t: Omit<Transaction, "id" | "createdAt">) => void;
    removeTransaction: (id: string) => void;
    updateTransaction: (id: string, data: Partial<Omit<Transaction, "id" | "createdAt">>) => void;
}

export const useTransactionStore = create<TransactionState>()(
    persist(
        (set) => ({
            transactions: [],
            addTransaction: (t) =>
                set((state) => ({
                    transactions: [
                        ...state.transactions,
                        {
                            ...t,
                            id: crypto.randomUUID(),
                            createdAt: new Date().toISOString(),
                        },
                    ],
                })),
            removeTransaction: (id) =>
                set((state) => ({
                    transactions: state.transactions.filter((tx) => tx.id !== id),
                })),
            updateTransaction: (id, data) =>
                set((state) => ({
                    transactions: state.transactions.map((tx) =>
                        tx.id === id ? { ...tx, ...data } : tx
                    ),
                })),
        }),
        { name: "transactions-storage" }
    )
);
