import { Search, User, CreditCard, Clock } from 'lucide-react';
import type { PaymentResponse } from '../types/financial.types';

interface PaymentsTableProps {
    searchTerm: string;
    onSearchChange: (value: string) => void;
    filteredPayments: PaymentResponse[];
}

export const PaymentsTable = ({
    searchTerm,
    onSearchChange,
    filteredPayments
}: PaymentsTableProps) => {
    return (
        <div className="bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden shadow-2xl">
            <div className="p-8 border-b border-slate-800 flex flex-col md:flex-row justify-between gap-4 bg-slate-900/50">
                <h2 className="text-xl font-black italic uppercase tracking-tight flex items-center gap-2">
                    To'lovlar Tarixi
                    <span className="text-xs bg-slate-800 text-slate-500 px-2 py-1 rounded-md not-italic font-mono">
                        {filteredPayments.length}
                    </span>
                </h2>

                <div className="relative w-full md:w-80">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Mijoz ismi bo'yicha..."
                        className="w-full pl-12 pr-4 py-3.5 bg-slate-800 border border-slate-700 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold text-white placeholder:text-slate-600"
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-800/30 text-slate-500 text-[10px] uppercase font-black tracking-widest">
                            <th className="p-6">Mijoz</th>
                            <th className="p-6 text-center">Tarif</th>
                            <th className="p-6 text-center">Sana</th>
                            <th className="p-6 text-right">Summa (UZS)</th>
                            <th className="p-6 text-center">Uslub</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {filteredPayments.length > 0 ? (
                            filteredPayments.map((p) => (
                                <tr key={p.id} className="hover:bg-blue-500/5 transition-colors group">
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-all border border-slate-700 shadow-inner">
                                                <User size={18} />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-black text-white group-hover:text-blue-400 transition-colors">
                                                    {p.user.firstName} {p.user.lastName}
                                                </span>
                                                <span className="text-[10px] text-slate-500 font-mono italic">
                                                    {p.user.phone}
                                                </span>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-6 text-center">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-lg text-[10px] font-black uppercase tracking-tighter border border-blue-500/20">
                                            <CreditCard size={12} />
                                            {p.membership?.plan?.name || 'Oddiy'}
                                        </div>
                                    </td>

                                    <td className="p-6 text-center">
                                        <div className="flex flex-col text-sm text-slate-400 font-medium">
                                            <span className="text-slate-200">
                                                {new Date(p.paidAt).toLocaleDateString()}
                                            </span>
                                            <span className="text-[10px] opacity-40 flex items-center justify-center gap-1 font-mono">
                                                <Clock size={10} />
                                                {new Date(p.paidAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="p-6 text-right font-black text-emerald-500 text-lg tabular-nums">
                                        {Number(p.amount).toLocaleString()}
                                    </td>

                                    <td className="p-6 text-center">
                                        <span className="px-3 py-1 rounded-lg text-[9px] font-black uppercase bg-slate-800 text-slate-400 border border-slate-700 tracking-widest group-hover:bg-slate-700 group-hover:text-slate-200 transition-all">
                                            {p.method}
                                        </span>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="p-20 text-center text-slate-600 font-bold italic">
                                    Qidiruv bo'yicha ma'lumot topilmadi...
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};