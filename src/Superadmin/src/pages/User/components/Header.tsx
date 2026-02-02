import React from 'react';
import { Users, UserPlus, RefreshCw, Search } from 'lucide-react';

interface HeaderProps {
    totalUsers: number;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    isLoading: boolean;
    onRefresh: () => void;
    onAddClick: () => void;
    theme: any;
}

export const Header: React.FC<HeaderProps> = ({
    totalUsers,
    searchTerm,
    setSearchTerm,
    isLoading,
    onRefresh,
    onAddClick,
    theme
}) => {
    return (
        <header className="mb-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
                <div className="flex items-center gap-5">
                    <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20">
                        <Users className="text-white w-8 h-8" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight">Menejerlar</h1>
                        <p className={`${theme.subText} text-sm mt-1 font-medium flex items-center gap-2`}>
                            <span className={`w-2 h-2 rounded-full ${isLoading ? 'bg-blue-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                            Jami: {totalUsers} ta menejer
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button
                        onClick={onRefresh}
                        disabled={isLoading}
                        className={`p-3 rounded-xl border transition-all active:scale-95 disabled:opacity-50 ${theme.card}`}
                    >
                        <RefreshCw size={20} className={`${isLoading ? 'animate-spin text-blue-500' : ''}`} />
                    </button>

                    <button
                        onClick={onAddClick}
                        className="flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-xl shadow-blue-600/20 transition-all font-semibold active:scale-95"
                    >
                        <UserPlus size={20} />
                        <span>Menejer Qo'shish</span>
                    </button>
                </div>
            </div>

            <div className={`p-4 rounded-2xl border shadow-sm flex flex-col md:flex-row gap-4 items-center ${theme.card}`}>
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Ism, email yoki telefon orqali qidirish..."
                        className={`w-full pl-12 pr-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm font-medium ${theme.input}`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
        </header>
    );
};