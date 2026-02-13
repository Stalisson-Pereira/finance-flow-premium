import { useTranslation } from "react-i18next";
import { useTransactionStore } from "../stores/transactionStore";
import { useDreamStore } from "../stores/dreamStore";
import { useUserStore } from "../stores/userStore";
import { StatsCard } from "../components/StatsCard";
import { BalanceChart } from "../components/BalanceChart";
import { CategoryChart } from "../components/CategoryChart";
import { Wallet, TrendingUp, TrendingDown, Target } from "lucide-react";

export function Dashboard() {
    const { t } = useTranslation();
    const { transactions } = useTransactionStore();
    const { dreams } = useDreamStore();
    const { user } = useUserStore();

    const currency = user?.currency ?? "BRL";

    const totalIncome = transactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = totalIncome - totalExpenses;

    const totalDreamsTarget = dreams.reduce((acc, d) => acc + d.targetAmount, 0);
    const totalDreamsSaved = dreams.reduce((acc, d) => acc + d.currentAmount, 0);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                    {t("dashboard.welcome")}
                </h1>
                <p className="text-gray-500 dark:text-gray-400">
                    {t("dashboard.subtitle")}
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
                <StatsCard
                    title={t("dashboard.balance")}
                    value={balance}
                    currency={currency}
                    icon={Wallet}
                    trend={balance >= 0 ? "up" : "down"}
                    trendValue={12.3}
                />
                <StatsCard
                    title={t("dashboard.income")}
                    value={totalIncome}
                    currency={currency}
                    icon={TrendingUp}
                    trend="up"
                    trendValue={7.2}
                />
                <StatsCard
                    title={t("dashboard.expenses")}
                    value={totalExpenses}
                    currency={currency}
                    icon={TrendingDown}
                    trend="down"
                    trendValue={3.1}
                />
                <StatsCard
                    title={t("dashboard.dreams")}
                    value={totalDreamsSaved}
                    currency={currency}
                    icon={Target}
                    trend="up"
                    trendValue={15.0}
                    subtitle={
                        totalDreamsTarget > 0
                            ? `${t("dashboard.of")} ${totalDreamsTarget.toFixed(2)}`
                            : undefined
                    }
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
                <div className="xl:col-span-2">
                    <BalanceChart />
                </div>
                <div>
                    <CategoryChart />
                </div>
            </div>
        </div>
    );
}
