import { useState, type ChangeEvent, type FormEvent } from 'react';
import { X, Loader2, Package, MapPin, Phone, Send, Instagram, Globe } from 'lucide-react';
import type { Gym, GymFormData } from '../types';

interface GymModalProps {
    onClose: () => void;
    onSuccess: (newGym: Gym) => void;
    isDarkMode: boolean; // Bu doim true bo'lib kelsada, props saqlab qolindi
}

export default function GymModal({ onClose, onSuccess }: GymModalProps) {
    const [isLoading, setIsLoading] = useState(false);

    const initialFormState: GymFormData = {
        name: '',
        address: '',
        phones: '',
        phones2: '',
        social_tg: '',
        social_ins: ''
    };

    const [formData, setFormData] = useState<GymFormData>(initialFormState);

    // Dizayn ranglari Dashboard bilan bir xil
    const theme = {
        modalBg: 'bg-slate-900',
        inputBg: 'bg-slate-800',
        inputBorder: 'border-slate-700',
        text: 'text-white',
        subText: 'text-slate-400',
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const formattedData = {
            ...formData,
            social_tg: formData.social_tg.startsWith('http')
                ? formData.social_tg
                : `https://t.me/${formData.social_tg.replace('@', '')}`,
            social_ins: formData.social_ins.startsWith('http')
                ? formData.social_ins
                : `https://www.instagram.com/${formData.social_ins.replace('@', '')}`
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch("https://nt-gym-api.it-mahalla.uz/api/gyms", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token ? `Bearer ${token}` : ''
                },
                body: JSON.stringify(formattedData)
            });

            if (!response.ok) throw new Error("Serverda xatolik yuz berdi");

            const responseData = await response.json();
            onSuccess(responseData.data || responseData);
            onClose();
        } catch (err: any) {
            alert("Xatolik: " + err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <div className={`${theme.modalBg} rounded-[2.5rem] border border-slate-800 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col transition-all scale-100`}>

                {/* MODAL HEADER */}
                <div className="p-8 border-b border-slate-800 flex justify-between items-center bg-gradient-to-r from-blue-600/10 to-transparent">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
                            <Package size={24} />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black text-white">Yangi Gym</h2>
                            <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">Ma'lumotlarni kiriting</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* MODAL FORM */}
                <form onSubmit={handleSubmit} className="p-8 space-y-5">

                    {/* Gym Name */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                            <Globe size={18} />
                        </div>
                        <input
                            type="text" name="name" required value={formData.name} onChange={handleInputChange}
                            placeholder="Gym Nomi"
                            className={`w-full pl-12 pr-4 py-3.5 ${theme.inputBg} ${theme.inputBorder} border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all`}
                        />
                    </div>

                    {/* Address */}
                    <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors">
                            <MapPin size={18} />
                        </div>
                        <input
                            type="text" name="address" required value={formData.address} onChange={handleInputChange}
                            placeholder="Manzil"
                            className={`w-full pl-12 pr-4 py-3.5 ${theme.inputBg} ${theme.inputBorder} border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all`}
                        />
                    </div>

                    {/* Phones */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                <Phone size={16} />
                            </div>
                            <input
                                type="text" name="phones" required value={formData.phones} onChange={handleInputChange}
                                placeholder="Telefon 1"
                                className={`w-full pl-10 pr-4 py-3 ${theme.inputBg} ${theme.inputBorder} border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all`}
                            />
                        </div>
                        <input
                            type="text" name="phones2" value={formData.phones2} onChange={handleInputChange}
                            placeholder="Telefon 2"
                            className={`w-full px-4 py-3 ${theme.inputBg} ${theme.inputBorder} border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all`}
                        />
                    </div>

                    {/* Socials */}
                    <div className="space-y-4">
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#0088cc]">
                                <Send size={18} />
                            </div>
                            <input
                                type="text" name="social_tg" value={formData.social_tg} onChange={handleInputChange}
                                placeholder="Telegram (@username)"
                                className={`w-full pl-12 pr-4 py-3.5 ${theme.inputBg} ${theme.inputBorder} border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all`}
                            />
                        </div>
                        <div className="relative group">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-[#e1306c]">
                                <Instagram size={18} />
                            </div>
                            <input
                                type="text" name="social_ins" value={formData.social_ins} onChange={handleInputChange}
                                placeholder="Instagram username"
                                className={`w-full pl-12 pr-4 py-3.5 ${theme.inputBg} ${theme.inputBorder} border rounded-xl outline-none focus:ring-2 focus:ring-blue-500 font-bold transition-all`}
                            />
                        </div>
                    </div>

                    {/* BUTTONS */}
                    <div className="flex gap-4 pt-6">
                        <button
                            type="button" onClick={onClose}
                            className="flex-1 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-all active:scale-95"
                        >
                            Bekor qilish
                        </button>
                        <button
                            type="submit" disabled={isLoading}
                            className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-2xl shadow-xl shadow-blue-600/20 flex justify-center items-center transition-all active:scale-95 disabled:opacity-50"
                        >
                            {isLoading ? <Loader2 className="animate-spin w-6 h-6" /> : 'Saqlash'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}