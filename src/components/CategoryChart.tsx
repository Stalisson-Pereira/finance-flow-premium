import { useTranslation } from "react-i18next";
import { useTransactionStore } from "../stores/transactionStore";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#EC4899", "#14B8A6", "#F97316"];

export function CategoryChart() {
    const { t } = useTranslation();
    const { transactions } = useTransactionStore();

    const expenses = transactions.filter((tx) => tx.type === "expense");

    const categoryData = expenses.reduce((acc, tx) => {
        if (!acc[tx.category]) {
            acc[tx.category] = 0;
        }
        acc[tx.category] += tx.amount;
        return acc;
    }, {} as Record<string, number>);

    const chartData = Object.entries(categoryData).map(([name, value]) => ({
        name,
        value,
    }));

    if (chartData.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold mb-4">Despesas por Categoria</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                    Adicione despesas para visualizar
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700">
            <h2 className="font-semibold mb-4">Despesas por Categoria</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: "rgba(17, 24, 39, 0.9)",
                            border: "none",
                            borderRadius: "8px",
                            color: "#fff",
                        }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
