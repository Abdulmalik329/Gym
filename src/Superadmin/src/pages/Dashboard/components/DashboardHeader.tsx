import { LayoutDashboard, RefreshCw } from 'lucide-react';
import type { DashboardTheme } from '../types/dashboard.types';

interface DashboardHeaderProps {
    isLoading: boolean;
    onRefresh: () => void;
    theme: DashboardTheme;
}

export const DashboardHeader = ({ isLoading, onRefresh, theme }: DashboardHeaderProps) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="flex items-center gap-5">
                <div className="bg-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-500/20 text-white">
                    <LayoutDashboard size={32} />
                </div>
                <div>
                    <h1 className="text-3xl font-black tracking-tight">
                        Super Admin Dashboard
                    </h1>
                    <p className={theme.subText}>
                        Tizimning umumiy holati va tahlillar
                    </p>
                </div>
            </div>

            <button
                onClick={onRefresh}
                disabled={isLoading}
                className={`p-3 px-5 rounded-xl border flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 ${theme.card}`}
            >
                <RefreshCw
                    className={`${isLoading ? 'animate-spin' : ''} text-emerald-500`}
                    size={20}
                />
                <span className="text-sm font-bold">
                    {isLoading ? 'Yangilanmoqda...' : 'Yangilash'}
                </span>
            </button>
        </header>
    );
};