import { Users, CreditCard } from 'lucide-react';

import { FinancialHeader } from './components/FinancialHeader';
import { RevenueChart } from './components/RevenueChart';
import { PaymentsTable } from './components/PaymentsTable';
import { LoadingState } from '../Dashboard/components/LoadingState'; 

import { useFinancialData } from './hooks/useFinancialData';
import { dashboardTheme as theme } from '../Dashboard/constants/dashboard.theme';
import { useMemo, useState } from 'react';

export default function FinancialReports() {
    const [searchTerm, setSearchTerm] = useState("");

    const {
        payments,
        gyms,
        chartData,
        isLoading,
        isChartLoading,
        selectedGymId,
        setSelectedGymId,
        totalRevenue
    } = useFinancialData();

    const filteredPayments = useMemo(() => {
        return payments.filter(p =>
            `${p.user.firstName} ${p.user.lastName}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
        );
    }, [payments, searchTerm]);

    if (isLoading) {
        return <LoadingState theme={theme} message="Moliyaviy ma'lumotlar tahlil qilinmoqda..." />;
    }

    return (
        <div className={`min-h-screen ${theme.bg} p-4 md:p-8 custom-scrollbar`}>
            <div className="max-w-7xl mx-auto">

                <FinancialHeader />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                    <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Umumiy Tushum</p>
                        <div className="text-4xl font-black text-emerald-500 tracking-tighter">
                            {totalRevenue.toLocaleString()} <span className="text-sm">UZS</span>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                            <CreditCard size={140} />
                        </div>
                    </div>

                    <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 shadow-xl relative overflow-hidden group">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Tranzaksiyalar soni</p>
                        <div className="text-4xl font-black text-blue-500 tracking-tighter">
                            {payments.length} <span className="text-sm">ta</span>
                        </div>
                        <div className="absolute -right-4 -bottom-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                            <Users size={140} />
                        </div>
                    </div>
                </div>

                <RevenueChart
                    gyms={gyms}
                    selectedId={selectedGymId}
                    onSelect={setSelectedGymId}
                    data={chartData}
                    loading={isChartLoading}
                />

                <PaymentsTable
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filteredPayments={filteredPayments}
                />

            </div>

            <style>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            `}</style>
        </div>
    );
}