import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { useTransactionStore } from "../stores/transactionStore";
import type { TransactionType, Transaction } from "../stores/transactionStore";
import { useUserStore } from "../stores/userStore";

export function Transactions() {
    const { t } = useTranslation();
    const { transactions, addTransaction, removeTransaction, updateTransaction } =
        useTransactionStore();
    const { user } = useUserStore();
    const currency = user?.currency ?? "BRL";

    // Form de criação
    const [type, setType] = useState<TransactionType>("income");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("Geral");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(() =>
        new Date().toISOString().slice(0, 10)
    );

    // Edição
    const [editing, setEditing] = useState<Transaction | null>(null);
    const [editType, setEditType] = useState<TransactionType>("income");
    const [editAmount, setEditAmount] = useState("");
    const [editCategory, setEditCategory] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editDate, setEditDate] = useState("");

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const value = Number(amount.replace(",", "."));
        if (!value || value <= 0) return;

        addTransaction({
            type,
            amount: value,
            currency,
            category,
            description,
            date,
        });

        setAmount("");
        setDescription("");
    }

    function openEdit(tx: Transaction) {
        setEditing(tx);
        setEditType(tx.type);
        setEditAmount(String(tx.amount));
        setEditCategory(tx.category);
        setEditDescription(tx.description);
        setEditDate(tx.date.slice(0, 10));
    }

    function handleEditSubmit(e: FormEvent) {
        e.preventDefault();
        if (!editing) return;

        const value = Number(editAmount.replace(",", "."));
        if (!value || value <= 0) return;

        updateTransaction(editing.id, {
            type: editType,
            amount: value,
            category: editCategory,
            description: editDescription,
            date: editDate,
        });

        setEditing(null);
    }

    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency,
    });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{t("transactions.title")}</h1>

            {/* Form de criação */}
            <form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-4"
            >
                <div className="flex flex-wrap gap-3">
                    <div className="flex gap-2">
                        <button
                            type="button"
                            onClick={() => setType("income")}
                            className={`px-3 py-1.5 rounded-full text-sm ${type === "income"
                                    ? "bg-green-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-700"
                                }`}
                        >
                            {t("transactions.income")}
                        </button>
                        <button
                            type="button"
                            onClick={() => setType("expense")}
                            className={`px-3 py-1.5 rounded-full text-sm ${type === "expense"
                                    ? "bg-red-500 text-white"
                                    : "bg-gray-100 dark:bg-gray-700"
                                }`}
                        >
                            {t("transactions.expense")}
                        </button>
                    </div>

                    <input
                        type="number"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={t("transactions.amount") || ""}
                        className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    />

                    <input
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        placeholder={t("transactions.category") || ""}
                        className="flex-1 min-w-[120px] px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    />

                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    />
                </div>

                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("transactions.description") || ""}
                    className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                />

                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium"
                >
                    {t("transactions.add")}
                </button>
            </form>

            {/* Tabela */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                        <tr className="text-left">
                            <th className="px-4 py-2">{t("transactions.date")}</th>
                            <th className="px-4 py-2">{t("transactions.description")}</th>
                            <th className="px-4 py-2">{t("transactions.category")}</th>
                            <th className="px-4 py-2">{t("transactions.amount")}</th>
                            <th className="px-4 py-2 text-right">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((tx) => (
                            <tr
                                key={tx.id}
                                className="border-t border-gray-100 dark:border-gray-800"
                            >
                                <td className="px-4 py-2">
                                    {new Date(tx.date).toLocaleDateString()}
                                </td>
                                <td className="px-4 py-2">{tx.description}</td>
                                <td className="px-4 py-2">{tx.category}</td>
                                <td
                                    className={`px-4 py-2 font-medium ${tx.type === "income" ? "text-green-500" : "text-red-500"
                                        }`}
                                >
                                    {tx.type === "expense" ? "- " : "+ "}
                                    {formatter.format(tx.amount)}
                                </td>
                                <td className="px-4 py-2 text-right space-x-2">
                                    <button
                                        onClick={() => openEdit(tx)}
                                        className="text-xs px-2 py-1 rounded bg-blue-500/10 text-blue-500 hover:bg-blue-500/20"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => removeTransaction(tx.id)}
                                        className="text-xs px-2 py-1 rounded bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                    >
                                        Remover
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {transactions.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                                >
                                    Nenhuma transação ainda.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Modal de edição */}
            {editing && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 w-full max-w-md border border-gray-200 dark:border-gray-700 space-y-4">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-lg">Editar transação</h2>
                            <button
                                onClick={() => setEditing(null)}
                                className="text-sm text-gray-500 hover:text-gray-300"
                            >
                                Fechar
                            </button>
                        </div>

                        <form onSubmit={handleEditSubmit} className="space-y-3">
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => setEditType("income")}
                                    className={`px-3 py-1.5 rounded-full text-sm ${editType === "income"
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-100 dark:bg-gray-800"
                                        }`}
                                >
                                    {t("transactions.income")}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditType("expense")}
                                    className={`px-3 py-1.5 rounded-full text-sm ${editType === "expense"
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-100 dark:bg-gray-800"
                                        }`}
                                >
                                    {t("transactions.expense")}
                                </button>
                            </div>

                            <input
                                type="number"
                                step="0.01"
                                value={editAmount}
                                onChange={(e) => setEditAmount(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none"
                            />
                            <input
                                type="text"
                                value={editCategory}
                                onChange={(e) => setEditCategory(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none"
                            />
                            <input
                                type="date"
                                value={editDate}
                                onChange={(e) => setEditDate(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none"
                            />
                            <input
                                type="text"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm outline-none"
                            />

                            <div className="flex justify-end gap-2 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setEditing(null)}
                                    className="px-4 py-2 rounded-lg text-sm bg-gray-100 dark:bg-gray-800"
                                >
                                    Cancelar
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 rounded-lg text-sm bg-primary text-white"
                                >
                                    Salvar mudanças
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
