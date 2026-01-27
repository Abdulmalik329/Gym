import  { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

// Komponentlarni import qilish (Named imports)
import { Header } from './components/Header';
import { PlanCard } from './components/PlanCard';
import { PlanForm } from './components/PlanForm';
import { ConfirmModal } from './components/ConfirmModal';

// API va Theme (Casing xatosi to'g'rilangan: kichik 'user' harfi bilan)
import { planApi } from './services/planApi';
import { getTheme } from '../User/constants/theme';

// Turlarni import qilish (verbatimModuleSyntax xatosi to'g'rilangan)
import type { MembershipPlan, ConfirmModalState } from './types';

export default function MembershipManagement() {
    // --- STATES ---
    const [plans, setPlans] = useState<MembershipPlan[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);

    const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
        isOpen: false,
        title: "",
        message: "",
        type: "info",
        onConfirm: null
    });

    const theme = getTheme(isDarkMode);

    // --- API CALLS ---
    const fetchPlans = async () => {
        setIsLoading(true);
        try {
            // planApi.getPlans endi MembershipPlan[] qaytaradi
            const data = await planApi.getPlans();
            setPlans(data);
        } catch (err: any) {
            showNotification("Xatolik", "Tariflarni yuklashda xatolik yuz berdi", "danger");
        } finally {
            setIsLoading(false);
            setIsInitialLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleSave = async (formData: Partial<MembershipPlan>) => {
        setIsLoading(true);
        try {
            await planApi.savePlan(formData, editingPlan?.id);
            showNotification(
                "Muvaffaqiyatli",
                editingPlan ? "Tarif yangilandi" : "Yangi tarif yaratildi",
                "success"
            );
            setIsModalOpen(false);
            fetchPlans();
        } catch (err: any) {
            showNotification("Xatolik", err.message, "danger");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleActive = async (plan: MembershipPlan) => {
        setIsLoading(true);
        try {
            // toggleStatus nomi planApi da to'g'irlandi
            await planApi.toggleStatus(plan.id);
            fetchPlans();
        } catch (err: any) {
            showNotification("Xatolik", "Holatni o'zgartirib bo'lmadi", "danger");
        } finally {
            setIsLoading(false);
        }
    };

    const deactivatePlan = (plan: MembershipPlan) => {
        setConfirmModal({
            isOpen: true,
            title: "Tarifni deaktivatsiya qilish",
            message: `${plan.name} tarifini o'chirish yoki nofaol holatga keltirmoqchimisiz?`,
            type: "danger",
            onConfirm: async () => {
                try {
                    await planApi.deletePlan(plan.id);
                    showNotification("Bajarildi", "Tarif o'chirildi", "success");
                    fetchPlans();
                } catch (err: any) {
                    showNotification("Xatolik", err.message, "danger");
                }
            }
        });
    };

    // --- HELPERS ---
    const showNotification = (title: string, message: string, type: ConfirmModalState['type']) => {
        setConfirmModal({ isOpen: true, title, message, type, onConfirm: null });
    };

    const filteredPlans = useMemo(() => {
        return plans.filter((p: MembershipPlan) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [plans, searchTerm]);

    // --- RENDER ---
    if (isInitialLoading) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center ${theme.bg}`}>
                <Loader2 className="animate-spin text-emerald-500 w-12 h-12 mb-4" />
                <p className="font-bold animate-pulse">Tariflar yuklanmoqda...</p>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme.bg} p-4 md:p-8 transition-colors duration-500`}>
            <div className="max-w-7xl mx-auto">

                <Header
                    totalPlans={plans.length}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isDarkMode={isDarkMode}
                    toggleTheme={() => setIsDarkMode(!isDarkMode)}
                    isLoading={isLoading}
                    onRefresh={fetchPlans}
                    onAddClick={() => { setEditingPlan(null); setIsModalOpen(true); }}
                    theme={theme}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPlans.length === 0 ? (
                        <div className="md:col-span-2 lg:col-span-3 p-20 text-center opacity-50 font-medium">
                            Ma'lumot topilmadi
                        </div>
                    ) : (
                        filteredPlans.map((plan: MembershipPlan) => (
                            <PlanCard
                                key={plan.id}
                                plan={plan}
                                theme={theme}
                                onEdit={(p: MembershipPlan) => { setEditingPlan(p); setIsModalOpen(true); }}
                                onDelete={deactivatePlan}
                                onToggle={handleToggleActive}
                            />
                        ))
                    )}
                </div>

                {isModalOpen && (
                    <PlanForm
                        plan={editingPlan}
                        theme={theme}
                        isLoading={isLoading}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleSave}
                        gyms={[]}
                    />
                )}

                <ConfirmModal
                    state={confirmModal}
                    theme={theme}
                    onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                />

                {/* Next.js/React Style xatoligi tuzatildi */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                    .custom-scrollbar::-webkit-scrollbar-thumb { 
                        background: ${isDarkMode ? '#334155' : '#cbd5e1'}; 
                        border-radius: 10px; 
                    }
                ` }} />

            </div>
        </div>
    );
}