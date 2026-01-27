import { useState } from 'react';
import type { Gym } from './types';
import { useGymActions } from './hooks/useGymActions';
// Komponentlar importini qayta tekshiring
import GymHeader from './components/GymHeader';
import GymTable from './components/GymTable'; // <--- SHU TO'G'RI IMPORT QILINGANIGA ISHONCH HOSIL QILING
import GymModal from './components/GymModal';
import ConfirmationModal from './components/ConfirmationModal';
import { Loader2, PackageSearch } from 'lucide-react';

export default function GymPage() {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    // Xatolikni oldini olish uchun id turini aniq ko'rsatamiz
    const [deleteConfig, setDeleteConfig] = useState<{
        isOpen: boolean,
        id: number | string | null
    }>({
        isOpen: false,
        id: null
    });

    const { gyms, isLoading, fetchGyms, deleteGym, setGyms } = useGymActions();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans transition-colors duration-500">
            <div className="max-w-7xl mx-auto">

                {/* Sahifa Sarlavhasi */}
                <GymHeader
                    openModal={() => setIsModalOpen(true)}
                    fetchData={fetchGyms}
                    isLoading={isLoading}
                />

                {/* ASOSIY JADVAL: Xatolik aynan shu yerda bo'lgan */}
                {gyms.length > 0 ? (
                    <GymTable
                        gyms={gyms}
                        isLoading={isLoading}
                        // 'id' parametriga aniq tur berildi
                        onDelete={(id: number | string) => setDeleteConfig({ isOpen: true, id })}
                    />
                ) : !isLoading ? (
                    <div className="flex flex-col items-center justify-center mt-20 p-12 rounded-[2.5rem] border border-dashed border-slate-800 bg-slate-900/20">
                        <PackageSearch size={64} className="text-slate-700 mb-4" />
                        <h3 className="text-xl font-bold text-slate-400">Zallar topilmadi</h3>
                        <p className="text-slate-500 text-sm mt-2">Hali birorta ham sport zali qo'shilmagan.</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-6 text-blue-500 font-bold hover:underline"
                        >
                            Birinchi zalni qo'shish
                        </button>
                    </div>
                ) : null}

                {/* O'chirishni tasdiqlash modali */}
                <ConfirmationModal
                    isOpen={deleteConfig.isOpen}
                    isDarkMode={true}
                    title="Gymni o'chirish"
                    message="Rostdan ham ushbu ma'lumotni o'chirmoqchimisiz?"
                    type="danger"
                    confirmText="Ha, o'chirilsin"
                    onClose={() => setDeleteConfig({ isOpen: false, id: null })}
                    onConfirm={() => {
                        if (deleteConfig.id !== null) {
                            deleteGym(deleteConfig.id);
                        }
                    }}
                />

                {/* Yangi zal qo'shish modali */}
                {isModalOpen && (
                    <GymModal
                        isDarkMode={true}
                        onClose={() => setIsModalOpen(false)}
                        onSuccess={(newGym: Gym) => {
                            setGyms((prev) => [...prev, newGym]);
                        }}
                    />
                )}

                {/* Dastlabki yuklanish holati */}
                {isLoading && gyms.length === 0 && (
                    <div className="flex flex-col items-center justify-center mt-32 gap-4">
                        <Loader2 className="animate-spin text-blue-500 w-12 h-12" />
                        <p className="text-slate-400 font-medium">Zallar yuklanmoqda...</p>
                    </div>
                )}
            </div>

            <style>{`
                body { background-color: #020617; }
                ::-webkit-scrollbar { width: 8px; }
                ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 10px; }
            `}</style>
        </div>
    );
}