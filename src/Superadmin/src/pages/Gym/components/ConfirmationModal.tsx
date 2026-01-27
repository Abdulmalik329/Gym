import { AlertTriangle, Info, CheckCircle2, Trash2, X } from 'lucide-react';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm?: () => void;
    title: string;
    message: string;
    type?: 'danger' | 'warning' | 'info' | 'success';
    confirmText?: string;
    isDarkMode: boolean;
}

export default function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    message,
    type = 'info',
    confirmText = 'Tasdiqlash',
    isDarkMode
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    // Ranglar va ikonkalarni yangi dizayn tizimiga mosladik
    const themes = {
        danger: {
            icon: <Trash2 size={32} />,
            color: 'text-rose-500',
            bg: 'bg-rose-500/10',
            btn: 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/20'
        },
        warning: {
            icon: <AlertTriangle size={32} />,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            btn: 'bg-amber-600 hover:bg-amber-700 shadow-amber-600/20'
        },
        info: {
            icon: <Info size={32} />,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            btn: 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
        },
        success: {
            icon: <CheckCircle2 size={32} />,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            btn: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/20'
        },
    };

    const currentTheme = themes[type];

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop: Orqa fonni xiralashtirish */}
            <div
                className="absolute inset-0 bg-slate-950/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className={`
                relative w-full max-w-sm rounded-[2.5rem] border p-8 text-center flex flex-col items-center shadow-2xl transition-all scale-100
                ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100'}
            `}>

                {/* Tepada yopish tugmasi (ixtiyoriy) */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
                >
                    <X size={20} />
                </button>

                {/* Markaziy Ikonka */}
                <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 ${currentTheme.bg} ${currentTheme.color} animate-pulse`}>
                    {currentTheme.icon}
                </div>

                {/* Sarlavha va Matn */}
                <h3 className={`text-2xl font-black mb-3 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {title}
                </h3>
                <p className={`text-sm font-medium mb-8 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                    {message}
                </p>

                {/* Amallar tugmalari */}
                <div className="flex flex-col gap-3 w-full">
                    {onConfirm ? (
                        <>
                            <button
                                onClick={() => { onConfirm(); onClose(); }}
                                className={`w-full py-4 rounded-2xl font-black text-white shadow-xl transition-all active:scale-95 ${currentTheme.btn}`}
                            >
                                {confirmText}
                            </button>
                            <button
                                onClick={onClose}
                                className={`w-full py-4 rounded-2xl font-bold border transition-all active:scale-95 ${isDarkMode
                                        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                            >
                                Yo'q, bekor qilish
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={onClose}
                            className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black shadow-xl shadow-blue-600/20 active:scale-95"
                        >
                            Tushunarli
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}