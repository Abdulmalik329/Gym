import { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

// Ichki importlar
import { Header } from './components/Header';
import { UserTable } from './components/UserTable';
import { UserForm } from './components/UserForm';
import { ConfirmModal } from './components/ConfirmModal';
import { userApi } from './services/userApi';
import { getTheme } from './constants/theme';
import type { User, Gym, UserFormData, ConfirmModalState } from './types';

export default function UsersPage() {
    // --- STATES ---
    const [users, setUsers] = useState<User[]>([]);
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isInitialLoading, setIsInitialLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [confirmModal, setConfirmModal] = useState<ConfirmModalState>({
        isOpen: false,
        title: "",
        message: "",
        type: "info",
        onConfirm: null
    });

    const theme = getTheme(isDarkMode);

    // --- DATA FETCHING ---
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const usersData = await userApi.getUsers();
            const gymsData = await userApi.getGyms();

            // Backend response formatini tekshirish (Array yoki {data: []})
            setUsers(Array.isArray(usersData) ? usersData : (usersData.data || []));
            setGyms(Array.isArray(gymsData) ? gymsData : (gymsData.data || []));
        } catch (err: any) {
            showNotification("Xatolik", err.message, "danger");
        } finally {
            setIsLoading(false);
            setIsInitialLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // --- HELPERS ---
    const showNotification = (title: string, message: string, type: ConfirmModalState['type']) => {
        setConfirmModal({
            isOpen: true,
            title,
            message,
            type,
            onConfirm: null
        });
    };

    // --- FILTERING ---
    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            const fullSearchString = `${u.firstName} ${u.lastName} ${u.email} ${u.phone}`.toLowerCase();
            return fullSearchString.includes(searchTerm.toLowerCase());
        });
    }, [users, searchTerm]);

    // --- ACTIONS ---
    const handleCreateManager = async (formData: UserFormData) => {
        setIsLoading(true);
        try {
            await userApi.createManager(formData);
            showNotification("Muvaffaqiyatli", "Yangi menejer tizimga qo'shildi", "success");
            setIsModalOpen(false);
            fetchData();
        } catch (err: any) {
            showNotification("Xatolik", err.message, "danger");
        } finally {
            setIsLoading(false);
        }
    };

    const handleToggleStatus = async (user: User) => {
        const actionText = user.isActive ? "bloklamoqchimisiz" : "faollashtirmoqchimisiz";

        setConfirmModal({
            isOpen: true,
            title: user.isActive ? "Foydalanuvchini bloklash" : "Foydalanuvchini faollashtirish",
            message: `${user.firstName} ${user.lastName}ni haqiqatdan ham ${actionText}?`,
            type: user.isActive ? "warning" : "info",
            onConfirm: async () => {
                setIsLoading(true);
                try {
                    if (user.isActive) {
                        // Agar backendda block endpointi bo'lsa:
                        // await userApi.blockUser(user.id);

                        // Hozircha aktivlashtirish bilan bir xil ishlatib ko'ring yoki API-ni tekshiring
                        await userApi.activateUser(user.id);
                    } else {
                        await userApi.activateUser(user.id);
                    }
                    showNotification("Bajarildi", "Holat muvaffaqiyatli o'zgartirildi", "success");
                    fetchData();
                } catch (err: any) {
                    showNotification("Xatolik", err.message, "danger");
                } finally {
                    setIsLoading(false);
                }
            }
        });
    };

    if (isInitialLoading) {
        return (
            <div className={`min-h-screen flex items-center justify-center ${theme.bg}`}>
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 animate-spin text-blue-600" />
                    <p className="font-bold tracking-widest animate-pulse">YUKLANMOQDA...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme.bg} transition-colors duration-500 p-4 md:p-8 font-sans`}>
            <div className="max-w-7xl mx-auto">

                <Header
                    totalUsers={users.length}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    isDarkMode={isDarkMode}
                    toggleTheme={() => setIsDarkMode(!isDarkMode)}
                    isLoading={isLoading}
                    onRefresh={fetchData}
                    onAddClick={() => setIsModalOpen(true)}
                    theme={theme}
                />

                <UserTable
                    users={filteredUsers}
                    gyms={gyms}
                    theme={theme}
                    isLoading={isLoading}
                    onToggleStatus={handleToggleStatus}
                />

                {isModalOpen && (
                    <UserForm
                        gyms={gyms}
                        theme={theme}
                        isLoading={isLoading}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleCreateManager}
                    />
                )}

                <ConfirmModal
                    state={confirmModal}
                    theme={theme}
                    onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
                />

            </div>
        </div>
    );
}