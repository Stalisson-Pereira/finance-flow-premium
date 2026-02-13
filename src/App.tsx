import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useThemeStore } from "./stores/themeStore";
import { Sidebar } from "./components/Sidebar";
import { Header } from "./components/Header";
import { Dashboard } from "./pages/Dashboard";
import { Transactions } from "./pages/Transactions";
import { Dreams } from "./pages/Dreams";
import { Exchange } from "./pages/Exchange";
import { Settings } from "./pages/Settings";

export default function App() {
  const { theme } = useThemeStore();

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, [theme]);

  return (
    <BrowserRouter>
      <div className="h-screen flex bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/dreams" element={<Dreams />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}
