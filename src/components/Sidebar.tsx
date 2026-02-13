import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    ArrowLeftRight,
    PiggyBank,
    ListChecks,
    Settings,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useThemeStore } from "../stores/themeStore";

const navBase =
    "flex items-center gap-3 px-4 py-2 rounded-xl text-sm font-medium transition-colors";
const navActive = "bg-primary text-white shadow-sm";
const navInactive =
    "text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50";

export function Sidebar() {
    const { t } = useTranslation();
    const { theme } = useThemeStore();

    const logoSrc = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

    return (
        <aside className="w-64 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hidden md:flex flex-col">
            {/* Logo */}
            <div className="h-16 flex items-center justify-center px-6 border-b border-gray-200 dark:border-gray-800">
                <img
                    src={logoSrc}
                    alt="Finance Flow"
                    className="h-10 w-auto object-contain logo-fade-in"
                />
            </div>

            <nav className="flex-1 px-3 py-4 space-y-1">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    <LayoutDashboard className="w-4 h-4" />
                    {t("navbar.dashboard")}
                </NavLink>
                <NavLink
                    to="/transactions"
                    className={({ isActive }) =>
                        `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    <ListChecks className="w-4 h-4" />
                    {t("navbar.transactions")}
                </NavLink>
                <NavLink
                    to="/dreams"
                    className={({ isActive }) =>
                        `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    <PiggyBank className="w-4 h-4" />
                    {t("navbar.dreams")}
                </NavLink>
                <NavLink
                    to="/exchange"
                    className={({ isActive }) =>
                        `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    <ArrowLeftRight className="w-4 h-4" />
                    {t("navbar.exchange")}
                </NavLink>
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `${navBase} ${isActive ? navActive : navInactive}`
                    }
                >
                    <Settings className="w-4 h-4" />
                    {t("navbar.settings")}
                </NavLink>
            </nav>

            <div className="p-4 border-t border-gray-200 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Finance Flow Premium · v1.0.0
                </p>
            </div>
        </aside>
    );
}