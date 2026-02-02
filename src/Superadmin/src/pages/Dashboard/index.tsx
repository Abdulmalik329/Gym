import { Trophy, Users, DollarSign, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import { DashboardHeader } from './components/DashboardHeader';
import { StatCard } from './components/StatCard';
import GymChart from "../../components/GymChart";
import GymPieChart from "../../components/GymPieChart";
import { useDashboardData } from './hooks/useDashboardData';
import { dashboardTheme as theme } from './constants/dashboard.theme';
import { LoadingState } from '../../components/loadingState';

export default function Dashboard() {
    const { data, fetchData, isInitialLoading } = useDashboardData();

    if (isInitialLoading) {
        return <LoadingState message='Yuklanmoqda...' />;
    }

    return (
        <div className={`min-h-screen ${theme.bg} p-4 md:p-8 custom-scrollbar`}>
            <div className="max-w-7xl mx-auto">
                <DashboardHeader
                    isLoading={data.isLoading}
                    onRefresh={fetchData}
                    theme={theme}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <StatCard
                        title="Jami Zallar"
                        value={data.totalGyms}
                        subValue="ta markaz"
                        Icon={Trophy}
                        iconColor="text-emerald-500"
                    />
                    <StatCard
                        title="Jami Mijozlar"
                        value={data.totalUsers.toLocaleString()}
                        subValue="+ faol"
                        Icon={Users}
                        iconColor="text-blue-500"
                    />
                    <StatCard
                        title="Umumiy tushum"
                        value={data.totalRevenue}
                        subValue="O'zbekiston so'mi (UZS)"
                        Icon={DollarSign}
                        iconColor="text-emerald-400"
                        gradient={true}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className={`lg:col-span-3 rounded-[2.5rem] border p-8 ${theme.card}`}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-500">
                                <TrendingUp size={20} />
                            </div>
                            <h2 className="text-xl font-black italic uppercase tracking-tight">Daromad tahlili</h2>
                        </div>
                        <div className="w-full h-[350px]">
                            <GymChart
                                data={data.chartData}
                                totalLabel={data.totalRevenue}
                                barColor="#10b981"
                            />
                        </div>
                    </div>

                    <div className={`lg:col-span-2 rounded-[2.5rem] border p-8 ${theme.card}`}>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-500">
                                <PieChartIcon size={20} />
                            </div>
                            <h2 className="text-xl font-black italic uppercase tracking-tight">Zallar ulushi</h2>
                        </div>
                        <div className="w-full flex items-center justify-center">
                            <GymPieChart data={data.chartData} />
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                body { background-color: #020617; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            `}</style>
        </div>
    );
}