import { useState } from "react";
import type { FormEvent } from "react";
import { useTranslation } from "react-i18next";
import { exchangeService } from "../services/exchangeService";

export function Exchange() {
    const { t } = useTranslation();
    const currencies = exchangeService.getSupportedCurrencies();

    const [from, setFrom] = useState("BRL");
    const [to, setTo] = useState("USD");
    const [amount, setAmount] = useState("100");
    const [result, setResult] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleConvert(e: FormEvent) {
        e.preventDefault();
        setError(null);
        setResult(null);

        const value = Number(amount.replace(",", "."));
        if (!value || value <= 0) {
            setError("Informe um valor válido.");
            return;
        }

        try {
            setLoading(true);
            const converted = await exchangeService.convert(value, from, to);
            setResult(converted);
        } catch (err) {
            setError("Não foi possível converter agora. Tente novamente.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6 max-w-xl">
            <h1 className="text-2xl font-bold">{t("exchange.title")}</h1>

            <form
                onSubmit={handleConvert}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-4"
            >
                <div className="flex flex-col gap-3">
                    <div className="flex gap-3">
                        <div className="flex-1 space-y-1">
                            <label className="text-xs text-gray-500 dark:text-gray-400">
                                {t("exchange.from")}
                            </label>
                            <select
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                            >
                                {currencies.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-xs text-gray-500 dark:text-gray-400">
                                {t("exchange.to")}
                            </label>
                            <select
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                            >
                                {currencies.map((c) => (
                                    <option key={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs text-gray-500 dark:text-gray-400">
                            {t("exchange.amount")}
                        </label>
                        <input
                            type="number"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                        />
                    </div>
                </div>

                {error && (
                    <p className="text-xs text-red-500 bg-red-500/5 px-3 py-2 rounded-lg">{error}</p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium disabled:opacity-60"
                >
                    {loading ? "Convertendo..." : t("exchange.convert")}
                </button>

                {result !== null && (
                    <div className="mt-3 text-sm">
                        <span className="text-gray-500 dark:text-gray-400">{t("exchange.result")}:</span>{" "}
                        <span className="font-semibold text-lg">
                            {result.toFixed(2)} {to}
                        </span>
                    </div>
                )}
            </form>
        </div>
    );
}
