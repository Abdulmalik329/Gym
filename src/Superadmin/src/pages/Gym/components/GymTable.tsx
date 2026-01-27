import type { Gym } from '../types';
import { Trash2, Send, Instagram, Loader2, MapPin, Phone, Building2 } from 'lucide-react';

// Props interfeysini aniq belgilaymiz
interface GymTableProps {
    gyms: Gym[];
    isLoading: boolean;
    onDelete: (id: number | string) => void;
}

export default function GymTable({ gyms, isLoading, onDelete }: GymTableProps) {
    // Dashboard dizayn tizimiga mos ranglar
    const theme = {
        cardBg: 'bg-slate-900',
        cardBorder: 'border-slate-800',
        headerBg: 'bg-slate-800/50',
        rowHover: 'hover:bg-slate-800/30',
        textMain: 'text-slate-100',
        textSub: 'text-slate-400',
    };

    return (
        <div className={`${theme.cardBg} rounded-[2rem] shadow-2xl overflow-hidden border ${theme.cardBorder} transition-all duration-300 min-h-[400px] relative`}>

            {/* Yuklanish holati uchun qatlam */}
            {isLoading && gyms.length === 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-950/40 backdrop-blur-[2px] z-20">
                    <div className="bg-slate-900 p-6 rounded-3xl border border-slate-700 shadow-2xl flex flex-col items-center gap-3">
                        <Loader2 className="animate-spin text-blue-500 w-10 h-10" />
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Yangilanmoqda</span>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className={`${theme.headerBg} text-slate-500 text-[10px] uppercase font-black tracking-[0.2em]`}>
                            <th className="p-6 border-b border-slate-800">Gym Nomi</th>
                            <th className="p-6 border-b border-slate-800">Manzil</th>
                            <th className="p-6 border-b border-slate-800">Aloqa Ma'lumotlari</th>
                            <th className="p-6 border-b border-slate-800 text-center">Ijtimoiy Tarmoq</th>
                            <th className="p-6 border-b border-slate-800 text-center">Boshqaruv</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {gyms.length === 0 && !isLoading ? (
                            <tr>
                                <td colSpan={5} className="p-20 text-center">
                                    <div className="flex flex-col items-center gap-3 opacity-20 text-slate-400">
                                        <Building2 size={48} />
                                        <p className="font-bold">Ma'lumotlar topilmadi</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            gyms.map((gym) => (
                                <tr key={gym.id} className={`${theme.rowHover} transition-colors group`}>
                                    {/* Gym Nomi */}
                                    <td className="p-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                                <Building2 size={20} />
                                            </div>
                                            <span className="font-black text-white text-base tracking-tight">{gym.name}</span>
                                        </div>
                                    </td>

                                    {/* Manzil */}
                                    <td className="p-6">
                                        <div className="flex items-center gap-2 text-slate-400 group-hover:text-slate-200 transition-colors">
                                            <MapPin size={16} className="text-slate-600" />
                                            <span className="text-sm font-medium">{gym.address}</span>
                                        </div>
                                    </td>

                                    {/* Aloqa */}
                                    <td className="p-6">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-slate-300 font-bold text-sm">
                                                <Phone size={14} className="text-blue-500/50" />
                                                {gym.phones}
                                            </div>
                                            {gym.phones2 && (
                                                <span className="text-[11px] text-slate-500 pl-5 font-semibold">{gym.phones2}</span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Ijtimoiy tarmoqlar */}
                                    <td className="p-6">
                                        <div className="flex justify-center gap-2">
                                            {gym.social_tg && (
                                                <a
                                                    href={gym.social_tg} target="_blank" rel="noreferrer"
                                                    className="p-2.5 bg-slate-800 text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-blue-600/5"
                                                >
                                                    <Send size={16} />
                                                </a>
                                            )}
                                            {gym.social_ins && (
                                                <a
                                                    href={gym.social_ins} target="_blank" rel="noreferrer"
                                                    className="p-2.5 bg-slate-800 text-pink-500 rounded-xl hover:bg-pink-600 hover:text-white transition-all shadow-lg shadow-pink-600/5"
                                                >
                                                    <Instagram size={16} />
                                                </a>
                                            )}
                                        </div>
                                    </td>

                                    {/* Amallar */}
                                    <td className="p-6 text-center">
                                        <button
                                            onClick={() => onDelete(gym.id)}
                                            className="
                                                p-3 bg-rose-500/10 text-rose-500 rounded-2xl 
                                                opacity-0 group-hover:opacity-100 transition-all 
                                                hover:bg-rose-600 hover:text-white hover:scale-110 
                                                active:scale-90 shadow-xl shadow-rose-600/20
                                            "
                                            title="O'chirish"
                                        >
                                            <Trash2 size={20} />
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
}