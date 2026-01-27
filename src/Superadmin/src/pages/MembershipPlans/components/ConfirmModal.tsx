import React from 'react';
import { Trash2, Info } from 'lucide-react';
import type { ConfirmModalState } from '../types';

interface ConfirmModalProps {
    state: ConfirmModalState;
    theme: any;
    onClose: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({ state, theme, onClose }) => {
    if (!state.isOpen) return null;

    const isDanger = state.type === 'danger';

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 backdrop-blur-sm p-4">
            <div className={`w-full max-w-sm rounded-[2rem] border p-8 text-center flex flex-col items-center animate-in fade-in zoom-in duration-200 ${theme.card}`}>

                {/* ICON SECTION */}
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 ${isDanger ? 'bg-rose-500/10 text-rose-500' : 'bg-blue-500/10 text-blue-500'
                    }`}>
                    {isDanger ? <Trash2 size={40} /> : <Info size={40} />}
                </div>

                {/* TEXT CONTENT */}
                <h3 className="text-xl font-black mb-2">{state.title}</h3>
                <p className={`${theme.subText} text-sm mb-8 leading-relaxed`}>
                    {state.message}
                </p>

                {/* ACTIONS */}
                <div className="flex flex-col gap-3 w-full">
                    {state.onConfirm ? (
                        <>
                            <button
                                onClick={() => {
                                    state.onConfirm?.();
                                    onClose();
                                }}
                                className={`w-full py-4 rounded-2xl font-black text-white transition-transform active:scale-95 ${isDanger ? 'bg-rose-600 hover:bg-rose-700' : 'bg-emerald-600 hover:bg-emerald-700'
                                    }`}
                            >
                                Tasdiqlash
                            </button>
                            <button
                                onClick={onClose}
                                className={`w-full py-4 rounded-2xl font-bold border transition-colors ${theme.isDarkMode ? 'border-slate-700 hover:bg-slate-800' : 'border-slate-200 hover:bg-slate-50'
                                    }`}
                            >
                                Yo'q, bekor qilish
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black hover:bg-blue-700 transition-transform active:scale-95"
                        >
                            Tushunarli
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};