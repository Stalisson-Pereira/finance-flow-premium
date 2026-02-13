import type { LucideIcon } from "lucide-react"; 
import { ArrowDown, ArrowUp } from "lucide-react";

interface Props {
    title: string;
    value: number;
    currency: string;
    icon: LucideIcon;
    trend?: "up" | "down";
    trendValue?: number;
    subtitle?: string;
}

export function StatsCard({
    title,
    value,
    currency,
    icon: Icon,
    trend,
    trendValue,
    subtitle,
}: Props) {
    const formatter = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency,
    });

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                </div>
                {trend && trendValue !== undefined && (
                    <div
                        className={`flex items-center gap-1 text-sm ${trend === "up" ? "text-green-500" : "text-red-500"
                            }`}
                    >
                        {trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        <span>{trendValue}%</span>
                    </div>
                )}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
            <div className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
                {formatter.format(value)}
            </div>
            {subtitle && <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</div>}
        </div>
    );
}
