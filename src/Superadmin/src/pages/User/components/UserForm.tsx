import React, { useState } from 'react';
import { X, UserPlus, Loader2 } from 'lucide-react';
import type { UserFormData, Gym } from '../types';

interface UserFormProps {
    gyms: Gym[];
    theme: any;
    isLoading: boolean;
    onClose: () => void;
    onSubmit: (formData: UserFormData) => void;
}

export const UserForm: React.FC<UserFormProps> = ({
    gyms,
    theme,
    isLoading,
    onClose,
    onSubmit
}) => {
    const initialForm: UserFormData = {
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        password: '',
        gym_id: '',
    };

    const [formData, setFormData] = useState<UserFormData>(initialForm);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <div className={`w-full max-w-2xl border shadow-2xl overflow-hidden flex flex-col ${theme.card}`}>

                {/* MODAL HEADER */}
                <div className="p-8 border-b border-slate-800 flex justify-between items-center from-blue-600/10 to-transparent">
                    <h2 className="text-2xl font-black flex items-center gap-3 text-white">
                        <UserPlus className="text-blue-600" /> Yangi Menejer
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-800 rounded-full transition-colors text-slate-400"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* MODAL FORM */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input
                            name="first_name"
                            type="text"
                            placeholder="Ism"
                            required
                            className={`p-3.5 rounded-xl border outline-none font-medium transition-all focus:ring-2 focus:ring-blue-600/50 ${theme.input}`}
                            value={formData.first_name}
                            onChange={handleChange}
                        />
                        <input
                            name="last_name"
                            type="text"
                            placeholder="Familiya"
                            required
                            className={`p-3.5 rounded-xl border outline-none font-medium transition-all focus:ring-2 focus:ring-blue-600/50 ${theme.input}`}
                            value={formData.last_name}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input
                            name="email"
                            type="email"
                            placeholder="Email"
                            required
                            className={`p-3.5 rounded-xl border outline-none font-medium transition-all focus:ring-2 focus:ring-blue-600/50 ${theme.input}`}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <input
                            name="phone"
                            type="text"
                            placeholder="Telefon (+998...)"
                            required
                            className={`p-3.5 rounded-xl border outline-none font-medium transition-all focus:ring-2 focus:ring-blue-600/50 ${theme.input}`}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <input
                            name="password"
                            type="password"
                            placeholder="Parol"
                            required
                            className={`p-3.5 rounded-xl border outline-none font-medium transition-all focus:ring-2 focus:ring-blue-600/50 ${theme.input}`}
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <select
                            name="gym_id"
                            required
                            className={`p-3.5 rounded-xl border outline-none font-medium transition-all focus:ring-2 focus:ring-blue-600/50 ${theme.input}`}
                            value={formData.gym_id}
                            onChange={handleChange}
                        >
                            <option value="">Zalni tanlang...</option>
                            {gyms.map(gym => (
                                <option key={gym.id} value={gym.id}>{gym.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 rounded-xl font-bold bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 py-4 rounded-xl bg-blue-600 text-white font-bold flex justify-center items-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin" /> : "Saqlash"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};