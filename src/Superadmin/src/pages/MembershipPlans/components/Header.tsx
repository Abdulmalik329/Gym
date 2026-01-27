import React from 'react';
import {
    Package, Plus, RefreshCw, Sun, Moon, Search
} from 'lucide-react';

interface HeaderProps {
    totalPlans: number;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    isDarkMode: boolean;
    toggleTheme: () => void;
    isLoading: boolean;
    onRefresh: () => void;
    onAddClick: () => void;
    theme: any;
}

export const Header: React.FC<HeaderProps> = ({
    totalPlans,
    searchTerm,
    setSearchTerm,
    isDarkMode,
    toggleTheme,
    isLoading,
    onRefresh,
    onAddClick,
    theme
}) => {
    return (
        <header className="mb-10">
            {/* YUQORI QISM: SARLAVHA VA TUGMALAR */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex items-center gap-5">
                    <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-500/20 text-white">
                        <Package size={32} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black tracking-tight">Tarif Rejalari</h1>
                        <p className={theme.subText}>
                            {isLoading ? 'Yangilanmoqda...' : `Jami ${totalPlans} ta faol paket mavjud`}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    {/* Yangilash */}
                    <button
                        onClick={onRefresh}
                        className={`p-3 rounded-xl border transition-all active:scale-90 ${theme.card}`}
                        title="Ma'lumotlarni yangilash"
                    >
                        <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
                    </button>

                    {/* Tema */}
                    <button
                        onClick={toggleTheme}
                        className={`p-3 rounded-xl border transition-all active:scale-90 ${theme.card}`}
                    >
                        {isDarkMode ? <Sun size={20} className="text-yellow-400" /> : <Moon size={20} />}
                    </button>

                    {/* Yangi tarif qo'shish */}
                    <button
                        onClick={onAddClick}
                        className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-all active:scale-95 shadow-xl shadow-emerald-600/20"
                    >
                        <Plus size={20} />
                        <span className="hidden sm:inline">Tarif yaratish</span>
                        <span className="sm:hidden">Yaratish</span>
                    </button>
                </div>
            </div>

            {/* QIDIRUV PANELI */}
            <div className={`p-4 rounded-2xl border shadow-sm ${theme.card}`}>
                <div className="relative w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Tarif nomi bo'yicha qidiruv..."
                        className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm font-medium ${theme.input}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </header>
    );
};