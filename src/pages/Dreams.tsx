import { useState } from "react";
import type { FormEvent } from "react"; 
import { useTranslation } from "react-i18next";
import { useDreamStore } from "../stores/dreamStore";
import { useUserStore } from "../stores/userStore";

export function Dreams() {
    const { t } = useTranslation();
    const { dreams, addDream, addToDream } = useDreamStore();
    const { user } = useUserStore();
    const currency = user?.currency ?? "BRL";

    const [title, setTitle] = useState("");
    const [targetAmount, setTargetAmount] = useState("");
    const [deadline, setDeadline] = useState(() => new Date().toISOString().slice(0, 10));
    const [category, setCategory] = useState("Geral");

    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency,
    });

    function handleAddDream(e: FormEvent) {
        e.preventDefault();
        const value = Number(targetAmount.replace(",", "."));
        if (!title || !value) return;

        addDream({
            title,
            targetAmount: value,
            deadline,
            category,
            currency,
        });

        setTitle("");
        setTargetAmount("");
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold">{t("dreams.title")}</h1>

            <form
                onSubmit={handleAddDream}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-3"
            >
                <div className="flex flex-wrap gap-3">
                    <input
                        type="text"
                        placeholder="Título do sonho"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="flex-1 min-w-[150px] px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    />
                    <input
                        type="number"
                        step="0.01"
                        placeholder={t("dreams.target") || ""}
                        value={targetAmount}
                        onChange={(e) => setTargetAmount(e.target.value)}
                        className="w-40 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    />
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    />
                    <input
                        type="text"
                        placeholder={t("transactions.category") || ""}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-40 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium"
                >
                    {t("dreams.add")}
                </button>
            </form>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {dreams.map((dream) => {
                    const progress =
                        dream.targetAmount > 0
                            ? Math.min(100, (dream.currentAmount / dream.targetAmount) * 100)
                            : 0;

                    return (
                        <div
                            key={dream.id}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-4 border border-gray-100 dark:border-gray-700 space-y-2"
                        >
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="font-semibold">{dream.title}</h3>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {dream.category} · {new Date(dream.deadline).toLocaleDateString()}
                                    </p>
                                </div>
                                <span className="text-xs text-gray-500 dark:text-gray-400">
                                    {progress.toFixed(0)}%
                                </span>
                            </div>
                            <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-900 overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                                {formatter.format(dream.currentAmount)} / {formatter.format(dream.targetAmount)}
                            </div>

                            <button
                                onClick={() => addToDream(dream.id, 100)}
                                className="mt-2 text-xs px-3 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                            >
                                Investir +100
                            </button>
                        </div>
                    );
                })}
                {dreams.length === 0 && (
                    <p className="text-gray-500 dark:text-gray-400 col-span-full">
                        Nenhum sonho criado ainda. Que tal começar pelo seu sonho mais importante?
                    </p>
                )}
            </div>
        </div>
    );
}
