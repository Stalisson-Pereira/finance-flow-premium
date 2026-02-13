import { useTranslation } from "react-i18next";
import { useThemeStore } from "../stores/themeStore";
import { useUserStore } from "../stores/userStore";

export function Settings() {
    const { t, i18n } = useTranslation();
    const { theme, setTheme } = useThemeStore();
    const { user, setUser } = useUserStore();

    return (
        <div className="space-y-6 max-w-xl">
            <h1 className="text-2xl font-bold">{t("settings.title")}</h1>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-5 border border-gray-100 dark:border-gray-700 space-y-4">
                <div>
                    <h2 className="font-semibold mb-2">{t("settings.theme")}</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setTheme("light")}
                            className={`px-3 py-1.5 rounded-full text-sm ${theme === "light"
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 dark:bg-gray-900"
                                }`}
                        >
                            {t("settings.light")}
                        </button>
                        <button
                            onClick={() => setTheme("dark")}
                            className={`px-3 py-1.5 rounded-full text-sm ${theme === "dark"
                                    ? "bg-primary text-white"
                                    : "bg-gray-100 dark:bg-gray-900"
                                }`}
                        >
                            {t("settings.dark")}
                        </button>
                    </div>
                </div>

                <div>
                    <h2 className="font-semibold mb-2">{t("settings.language")}</h2>
                    <select
                        value={i18n.language}
                        onChange={(e) => i18n.changeLanguage(e.target.value)}
                        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    >
                        <option value="pt">Português</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                    </select>
                </div>

                <div>
                    <h2 className="font-semibold mb-2">Moeda padrão</h2>
                    <select
                        value={user?.currency ?? "BRL"}
                        onChange={(e) =>
                            user &&
                            setUser({
                                ...user,
                                currency: e.target.value,
                            })
                        }
                        className="px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-sm outline-none"
                    >
                        <option value="BRL">BRL - Real Brasileiro</option>
                        <option value="USD">USD - Dólar Americano</option>
                        <option value="EUR">EUR - Euro</option>
                        <option value="GBP">GBP - Libra Esterlina</option>
                        <option value="JPY">JPY - Iene Japonês</option>
                    </select>
                </div>

                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                        Versão: 1.0.0 | Modo: {user?.isPremium ? "Premium ✨" : "Gratuito"}
                    </p>
                </div>
            </div>
        </div>
    );
}
