import React, { useState, useEffect } from 'react';
import { X, Package, DollarSign, Trash2, Loader2 } from 'lucide-react';
// TypeScript turlarini 'type' orqali import qilish xatoliklarni oldini oladi
import type { MembershipPlan } from '../types';

interface PlanFormProps {
    plan: MembershipPlan | null;
    theme: any;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (formData: Partial<MembershipPlan>) => void;
    // index.tsx da uzatilgan gyms propini qabul qilish uchun qo'shildi
    gyms?: any[];
}

export const PlanForm: React.FC<PlanFormProps> = ({
    plan,
    theme,
    isLoading,
    onClose,
    onSubmit
}) => {
    // Boshlang'ich holatni turlarga moslab yaratish
    const initialForm: Partial<MembershipPlan> = {
        name: '',
        description: '',
        tag: '',
        features: [''],
        type: 'TIME_BASED',
        duration_days: 30,
        session_count: 0,
        price: 0,
        isActive: true,
        gym_id: 1
    };

    const [formData, setFormData] = useState<Partial<MembershipPlan>>(initialForm);

    // Tahrirlash rejimida ma'lumotlarni yuklash
    useEffect(() => {
        if (plan) {
            setFormData(plan);
        }
    }, [plan]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...(formData.features || [])];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <div className={`w-full max-w-2xl rounded-[2.5rem] border shadow-2xl overflow-hidden flex flex-col max-h-[90vh] ${theme.card}`}>

                {/* MODAL HEADER */}
                <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-emerald-600/10 to-transparent">
                    <div className="flex items-center gap-4 text-slate-100">
                        <div className="p-3 bg-emerald-600 rounded-2xl">
                            <Package size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black">{plan ? 'Tahrirlash' : 'Yangi Tarif'}</h2>
                            <p className="text-slate-400 text-xs uppercase tracking-widest mt-1">Global sozlamalar</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* MODAL FORM */}
                <form onSubmit={handleSubmit} className="p-8 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text" required placeholder="Tarif nomi"
                            className={`p-3 rounded-xl border outline-none font-bold ${theme.input}`}
                            value={formData.name || ''}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                        <input
                            type="text" placeholder="Teg (Best Seller...)"
                            className={`p-3 rounded-xl border outline-none font-bold ${theme.input}`}
                            value={formData.tag || ''}
                            onChange={e => setFormData({ ...formData, tag: e.target.value })}
                        />
                        <textarea
                            rows={2} placeholder="Tavsif..."
                            className={`md:col-span-2 p-4 rounded-xl border outline-none font-medium resize-none ${theme.input}`}
                            value={formData.description || ''}
                            onChange={e => setFormData({ ...formData, description: e.target.value })}
                        />

                        <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                            <input
                                type="number" required placeholder="Narxi"
                                className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none font-bold ${theme.input}`}
                                value={formData.price || 0}
                                onChange={e => setFormData({ ...formData, price: Number(e.target.value) })}
                            />
                        </div>

                        <select
                            className={`p-3 rounded-xl border outline-none font-bold ${theme.input}`}
                            value={formData.type || 'TIME_BASED'}
                            onChange={e => setFormData({ ...formData, type: e.target.value as any })}
                        >
                            <option value="TIME_BASED">Vaqtga asoslangan</option>
                            <option value="SESSION_BASED">Mashg'ulotga asoslangan</option>
                        </select>

                        <input
                            type="number" required placeholder="Muddati (Kun)"
                            className={`p-3 rounded-xl border outline-none font-bold ${theme.input}`}
                            value={formData.duration_days || 30}
                            onChange={e => setFormData({ ...formData, duration_days: Number(e.target.value) })}
                        />

                        {formData.type === 'SESSION_BASED' && (
                            <input
                                type="number" required placeholder="Mashg'ulotlar soni"
                                className={`p-3 rounded-xl border outline-none font-bold ${theme.input}`}
                                value={formData.session_count || 0}
                                onChange={e => setFormData({ ...formData, session_count: Number(e.target.value) })}
                            />
                        )}

                        <div className="md:col-span-2 space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-black uppercase opacity-50">Imkoniyatlar</label>
                                <button
                                    type="button"
                                    onClick={() => setFormData({ ...formData, features: [...(formData.features || []), ''] })}
                                    className="text-[10px] font-black bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-lg"
                                >
                                    + Qo'shish
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {formData.features?.map((f, i) => (
                                    <div key={i} className="relative group">
                                        <input
                                            type="text"
                                            className={`w-full p-3 pr-10 rounded-xl border outline-none ${theme.input}`}
                                            value={f}
                                            onChange={e => handleFeatureChange(i, e.target.value)}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setFormData({ ...formData, features: formData.features?.filter((_, idx) => idx !== i) })}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-rose-500 opacity-0 group-hover:opacity-100"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-10">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`flex-1 py-4 rounded-2xl font-bold border transition-colors ${theme.card} hover:opacity-80`}
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-4 rounded-2xl bg-emerald-600 text-white font-bold shadow-xl shadow-emerald-600/20 hover:bg-emerald-700 transition-all flex justify-center items-center"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : "Saqlash"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};