import React from 'react';
import {
    Check, Clock, Dumbbell, Edit3, Trash2,
    ToggleLeft, ToggleRight
} from 'lucide-react';
// Turlarni 'type' orqali import qilish xavfsizroq
import type { MembershipPlan } from '../types';

interface PlanCardProps {
    plan: MembershipPlan;
    theme: any;
    onEdit: (plan: MembershipPlan) => void;
    onDelete: (plan: MembershipPlan) => void;
    onToggle: (plan: MembershipPlan) => void;
}

// Named export: index.tsx da { PlanCard } ko'rinishida import qilinadi
export const PlanCard: React.FC<PlanCardProps> = ({
    plan,
    theme,
    onEdit,
    onDelete,
    onToggle
}) => {
    return (
        <div className={`group relative rounded-[2.5rem] border p-1 shadow-xl transition-all hover:scale-[1.02] ${theme.card}`}>
            <div className={`h-full rounded-[2.3rem] p-8 flex flex-col ${theme.isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>

                {/* KARTANING YUQORI QISMI */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col gap-2">
                        {plan.tag && (
                            <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full w-fit">
                                {plan.tag}
                            </span>
                        )}
                        <button
                            onClick={() => onToggle(plan)}
                            className={`text-[9px] font-bold uppercase px-3 py-1 rounded-full transition-colors flex items-center gap-1 ${plan.isActive
                                    ? 'bg-emerald-500/20 text-emerald-500'
                                    : 'bg-rose-500/20 text-rose-500'
                                }`}
                        >
                            {plan.isActive ? <ToggleRight size={14} /> : <ToggleLeft size={14} />}
                            {plan.isActive ? 'Faol' : 'Nofaol'}
                        </button>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-black text-emerald-500">
                            {plan.price.toLocaleString()}
                        </div>
                        <div className="text-[10px] font-bold uppercase opacity-50">
                            UZS / {plan.duration_days} kun
                        </div>
                    </div>
                </div>

                {/* SARLAVHA VA TAVSIF */}
                <h3 className="text-2xl font-black mb-2">{plan.name}</h3>
                <p className={`text-sm mb-6 line-clamp-2 ${theme.subText}`}>
                    {plan.description}
                </p>

                {/* IMKONIYATLAR RO'YXATI */}
                <div className="space-y-3 mb-8 flex-1">
                    {plan.features?.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-3 text-sm font-medium">
                            <div className="bg-emerald-500/10 p-1 rounded-full">
                                <Check size={12} className="text-emerald-500" />
                            </div>
                            <span className="line-clamp-1">{feature}</span>
                        </div>
                    ))}
                </div>

                {/* KARTANING PASTI (STATISTIKA) */}
                <div className={`grid grid-cols-2 gap-4 pt-6 border-t ${theme.isDarkMode ? 'border-slate-800' : 'border-slate-100'
                    }`}>
                    <div className="flex items-center gap-2">
                        <Clock size={16} className="text-slate-500" />
                        <span className="text-xs font-bold">{plan.duration_days} kun</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Dumbbell size={16} className="text-slate-500" />
                        <span className="text-xs font-bold">
                            {plan.type === 'TIME_BASED' ? 'Cheksiz' : `${plan.session_count} ta`}
                        </span>
                    </div>
                </div>

                {/* BOSHQARUV TUGMALARI (HOVER BO'LGANDA) */}
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all scale-90 group-hover:scale-100">
                    <button
                        onClick={() => onEdit(plan)}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-emerald-600 text-white transition-all shadow-xl"
                    >
                        <Edit3 size={18} />
                    </button>
                    <button
                        onClick={() => onDelete(plan)}
                        className="p-3 bg-white/10 backdrop-blur-md rounded-2xl hover:bg-rose-600 text-white transition-all shadow-xl"
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};