import { Building2, Plus, RefreshCw } from 'lucide-react';

interface GymHeaderProps {
    openModal: () => void;
    fetchData: () => void;
    isLoading: boolean;
}

export default function GymHeader({ openModal, fetchData, isLoading }: GymHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            {/* CHAP TOMON: LOGO VA MATN */}
            <div className="flex items-center gap-5">
                {/* Ikonka uchun neon effektli konteyner */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                    <div className="relative bg-blue-600 p-3.5 rounded-2xl shadow-lg shadow-blue-500/20 text-white flex items-center justify-center">
                        <Building2 size={30} strokeWidth={2.5} />
                    </div>
                </div>

                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white">
                        Sport Zallari
                    </h1>
                    <div className="flex items-center gap-2 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                        <p className="text-slate-400 text-sm font-medium tracking-wide">
                            Zallar va filiallarni boshqarish
                        </p>
                    </div>
                </div>
            </div>

            {/* O'NG TOMON: AMALLAR TUGMALARI */}
            <div className="flex items-center gap-3 w-full md:w-auto">
                {/* Yangilash tugmasi */}
                <button
                    onClick={fetchData}
                    disabled={isLoading}
                    className={`
                        p-3.5 rounded-xl border border-slate-800 bg-slate-900 text-slate-400 
                        hover:text-white hover:bg-slate-800 transition-all active:scale-90
                        ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                    title="Ma'lumotlarni yangilash"
                >
                    <RefreshCw className={isLoading ? 'animate-spin' : ''} size={20} />
                </button>

                {/* Gym qo'shish tugmasi */}
                <button
                    onClick={openModal}
                    className="
                        flex-1 md:flex-none bg-blue-600 hover:bg-blue-700 text-white 
                        px-8 py-3.5 rounded-xl flex items-center justify-center gap-2 
                        font-extrabold shadow-xl shadow-blue-600/20 transition-all 
                        active:scale-95 hover:shadow-blue-600/40
                    "
                >
                    <Plus size={20} strokeWidth={3} />
                    <span className="tracking-wide">Gym qo'shish</span>
                </button>
            </div>
        </div>
    );
}