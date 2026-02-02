import React from 'react';
import { AlertTriangle } from 'lucide-react';
import type { LogoutModalProps } from '../types';

export const LogoutModal: React.FC<LogoutModalProps> = ({
    isOpen,
    onClose,
    onConfirm
}) => {
    // Agar modal ochiq bo'lmasa, hech narsa ko'rsatmaymiz
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-[2.5rem] p-10 text-center shadow-2xl transform animate-in zoom-in duration-200">

                {/* Ogohlantirish ikonasi */}
                <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} />
                </div>

                <h3 className="text-2xl font-bold text-white mb-3">
                    Tizimdan chiqish
                </h3>

                <p className="text-slate-400 mb-8 leading-relaxed">
                    Haqiqatan ham akkauntdan chiqmoqchimisiz?
                </p>

                {/* Tugmalar */}
                <div className="flex gap-4">
                    <button
                        onClick={onClose}
                        className="flex-1 py-4 rounded-2xl bg-slate-800 font-bold hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                        Bekor qilish
                    </button>

                    <button
                        onClick={onConfirm}
                        className="flex-1 py-4 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all"
                    >
                        Chiqish
                    </button>
                </div>
            </div>
        </div>
    );
};