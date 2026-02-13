import { useThemeStore } from "../stores/themeStore";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "lucide-react";

export function Header() {
    const { theme, toggleTheme } = useThemeStore();
    const { i18n } = useTranslation();

    const logoSrc = theme === "dark" ? "/logo-dark.svg" : "/logo-light.svg";

    return (
        <header className="h-16 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 md:px-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur">
            <div className="flex items-center gap-2 md:gap-3">
                {/* Logo no mobile */}
                <img
                    src={logoSrc}
                    alt="Finance Flow"
                    className="h-7 w-auto md:hidden"
                />
                <span className="font-semibold text-lg hidden md:block">
                    Finance Flow Premium
                </span>
            </div>

            <div className="flex items-center gap-3">
                <select
                    className="bg-gray-100 dark:bg-gray-800 text-sm rounded-lg px-2 py-1 outline-none"
                    value={i18n.language}
                    onChange={(e) => i18n.changeLanguage(e.target.value)}
                >
                    <option value="pt">PT</option>
                    <option value="en">EN</option>
                    <option value="es">ES</option>
                </select>

                <button
                    onClick={toggleTheme}
                    className="w-9 h-9 rounded-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 transition-transform hover:scale-105"
                >
                    {theme === "light" ? (
                        <Moon className="w-5 h-5" />
                    ) : (
                        <Sun className="w-5 h-5 text-yellow-400" />
                    )}
                </button>
            </div>
        </header>
    );
}
