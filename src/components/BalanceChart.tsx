import { useTranslation } from "react-i18next";
import { useTransactionStore } from "../stores/transactionStore";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export function BalanceChart() {
    const { t } = useTranslation();
    const { transactions } = useTransactionStore();

    // Agrupar por mês
    const monthlyData = transactions.reduce((acc, tx) => {
        const date = new Date(tx.date);
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

        if (!acc[monthKey]) {
            acc[monthKey] = { month: monthKey, income: 0, expense: 0 };
        }

        if (tx.type === "income") {
            acc[monthKey].income += tx.amount;
        } else {
            acc[monthKey].expense += tx.amount;
        }

        return acc;
    }, {} as Record<string, { month: string; income: number; expense: number }>);

    const chartData = Object.values(monthlyData)
        .sort((a, b) => a.month.localeCompare(b.month))
        .map((item) => ({
            ...item,
            balance: item.income - item.expense,
        }));

    if (chartData.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold mb-4">Evolução Financeira</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                    Adicione transações para visualizar os gráficos
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold mb-4">Evolução Financeira</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
                    <XAxis
                        dataKey="month"
                        className="text-xs"
                        stroke="#9CA3AF"
                    />
                    <YAxis
                        className="text-xs"
                        stroke="#9CA3AF"
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(17, 24, 39, 0.9)",
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                    />
                    <Legend />
                    <Line
                        type="monotone"
                        dataKey="income"
                        stroke="#10B981"
                        strokeWidth={2}
                        name="Receitas"
                    />
                    <Line
                        type="monotone"
                        dataKey="expense"
                        stroke="#EF4444"
                        strokeWidth={2}
                        name="Despesas"
                    />
                    <Line
                        type="monotone"
                        dataKey="balance"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        name="Saldo"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}
