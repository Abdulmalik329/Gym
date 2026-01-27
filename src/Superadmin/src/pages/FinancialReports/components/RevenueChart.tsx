import { Calendar, Building2, ChevronDown, RefreshCw } from 'lucide-react';
import GymChart from "../../../components/GymChart";
import type { Gym, ChartData } from "../types/financial.types";

interface RevenueChartProps {
    gyms: Gym[];
    selectedId: string | null;
    onSelect: (id: string) => void;
    data: ChartData[];
    loading: boolean;
}

export const RevenueChart = ({ gyms, selectedId, onSelect, data, loading }: RevenueChartProps) => {
    return (
        <div className="bg-slate-900 p-8 rounded-[2.5rem] border border-slate-800 mb-10 shadow-2xl relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <h2 className="text-xl font-black flex items-center gap-3 italic uppercase tracking-tight">
                    <Calendar className="text-blue-500" />
                    Daromad Grafigi
                </h2>

                <div className="relative w-full md:w-72">
                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500 z-10" size={18} />
                    <select
                        value={selectedId || ""}
                        onChange={(e) => onSelect(e.target.value)}
                        className="w-full pl-12 pr-10 py-3.5 bg-slate-800 border border-slate-700 rounded-2xl text-sm font-bold outline-none appearance-none focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer text-white relative z-0"
                    >
                        {gyms.map((gym) => (
                            <option key={gym.id} value={gym.id}>
                                {gym.name}
                            </option>
                        ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 z-10 pointer-events-none" size={18} />
                </div>
            </div>

            <div className="h-[350px] w-full relative">
                {loading && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-10 flex items-center justify-center rounded-xl">
                        <div className="flex flex-col items-center gap-2">
                            <RefreshCw className="animate-spin text-blue-500 w-10 h-10" />
                            <span className="text-xs font-bold text-blue-400">Yangilanmoqda...</span>
                        </div>
                    </div>
                )}

                <GymChart
                    data={data}
                    barColor="#3b82f6"
                />
            </div>
        </div>
    );
};