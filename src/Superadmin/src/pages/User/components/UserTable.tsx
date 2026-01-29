import React from 'react';
import {
    Mail, Phone, ShieldAlert, Building2,
    CheckCircle, Ban, Info
} from 'lucide-react';
import type { User, Gym } from '../types';

interface UserTableProps {
    users: User[];
    gyms: Gym[];
    theme: any;
    isLoading: boolean;
    onToggleStatus: (user: User) => void;
}

export const UserTable: React.FC<UserTableProps> = ({
    users,
    gyms,
    theme,
    isLoading,
    onToggleStatus
}) => {
    
    const getGymName = (gymId: string | number | undefined | null) => {
        if (!gymId) return "Zal biriktirilmagan";
        const foundGym = gyms.find(g => String(g.id) === String(gymId));
        return foundGym ? foundGym.name : "Zal topilmadi";
    };

    return (
        <div className={`rounded-3xl border shadow-2xl overflow-hidden ${theme.card}`}>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className={`${theme.tableHeader} text-xs font-bold uppercase tracking-widest`}>
                            <th className="p-5 text-left">Profil</th>
                            <th className="p-5 text-left">Aloqa</th>
                            <th className="p-5 text-left">Zal va Rol</th>
                            <th className="p-5 text-left">Holati</th>
                            <th className="p-5 text-right">Amallar</th>
                        </tr>
                    </thead>
                    <tbody className={`divide-y ${theme.isDarkMode ? 'divide-slate-800' : 'divide-slate-100'}`}>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="p-20 text-center text-slate-500">
                                    <div className="flex flex-col items-center gap-3">
                                        <Info size={40} className="opacity-20" />
                                        <p>{isLoading ? "Yuklanmoqda..." : "Ma'lumot topilmadi"}</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user.id} className={`${theme.rowHover} transition-colors`}>
                                    <td className="p-5">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-lg 
                                                ${user.role === 'SUPER_ADMIN' ? 'bg-purple-500/10 text-purple-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                                {user.firstName?.[0]}{user.lastName?.[0]}
                                            </div>
                                            <div>
                                                <div className="font-bold text-base flex items-center gap-2">
                                                    {user.firstName} {user.lastName}
                                                    {user.role === 'SUPER_ADMIN' && <ShieldAlert size={14} className="text-purple-500" />}
                                                </div>
                                                <div className={`text-xs ${theme.subText}`}>ID: #{user.id}</div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-5 text-sm">
                                        <div className="flex items-center gap-2 mb-1">
                                            <Mail size={14} className="opacity-50" /> {user.email}
                                        </div>
                                        <div className="flex items-center gap-2 opacity-50">
                                            <Phone size={14} /> {user.phone}
                                        </div>
                                    </td>

                                    <td className="p-5">
                                        <div className="flex flex-col gap-2">
                                            <span className="px-2 py-1 rounded-lg text-[10px] font-black uppercase bg-blue-500/10 text-blue-500 border border-blue-500/20 w-fit">
                                                {user.role}
                                            </span>
                                            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                                                <Building2 size={14} className="text-blue-500" />
                                                {getGymName(user.gymId)}
                                            </div>
                                        </div>
                                    </td>

                                    <td className="p-5">
                                        {user.isActive ? (
                                            <span className="text-emerald-500 text-xs font-bold px-3 py-1 bg-emerald-500/10 rounded-full flex items-center gap-1.5 w-fit">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div> Faol
                                            </span>
                                        ) : (
                                            <span className="text-rose-500 text-xs font-bold px-3 py-1 bg-rose-500/10 rounded-full flex items-center gap-1.5 w-fit">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div> Bloklangan
                                            </span>
                                        )}
                                    </td>

                                    {/* AMALLAR */}
                                    <td className="p-5 text-right">
                                        <button
                                            onClick={() => onToggleStatus(user)}
                                            className={`p-2.5 rounded-xl transition-all active:scale-90 ${user.isActive
                                                    ? 'text-rose-500 hover:bg-rose-500/10'
                                                    : 'text-emerald-500 hover:bg-emerald-500/10'
                                                }`}
                                            title={user.isActive ? "Bloklash" : "Aktivlashtirish"}
                                        >
                                            {user.isActive ? <Ban size={20} /> : <CheckCircle size={20} />}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};