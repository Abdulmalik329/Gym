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
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const usersData = await userApi.getUsers();
            const gymsData = await userApi.getGyms();

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

    const handleCreateManager = async (formData: UserFormData) => {
        setIsLoading(true);
        try {
            await userApi.createManager(formData);
            showNotification("Muvaffaqiyatli", "Yangi menejer tizimga qo'shildi.", "success");
            setIsModalOpen(false);
            fetchData();
        } catch (err: any) {
            showNotification("Xatolik", err.message, "danger");
        } finally {
            setIsLoading(false);
        }
    };

    const handleActivate = async (user: User) => {
        setIsLoading(true);
        try {
            await userApi.activateUser(user.id);
            showNotification("Aktivlashtirildi", "Foydalanuvchi holati o'zgartirildi.", "success");
            fetchData();
        } catch (err: any) {
            showNotification("Xatolik", err.message, "danger");
        } finally {
            setIsLoading(false);
        }
    };

    const initiateDelete = (user: User) => {
        setConfirmModal({
            isOpen: true,
            title: "Foydalanuvchini o'chirish",
            message: `${user.first_name} ${user.last_name} tizimdan o'chirilsinmi?`,
            type: "danger",
            onConfirm: async () => {
                try {
                    await userApi.deleteUser(user.id);
                    showNotification("O'chirildi", "Foydalanuvchi muvaffaqiyatli o'chirildi.", "success");
                    fetchData();
                } catch (err: any) {
                    showNotification("Xatolik", err.message, "danger");
                }
            }
        });
    };

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

    const filteredUsers = useMemo(() => {
        return users.filter(u => {
            const isManager = u.role === 'GYM_MANAGER';

            const matchesSearch =
                `${u.first_name} ${u.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                u.phone?.includes(searchTerm);

            return isManager && matchesSearch;
        });
    }, [users, searchTerm]);

    // --- RENDER ---
    if (isInitialLoading) {
        return (
            <div className={`min-h-screen flex flex-col items-center justify-center ${theme.bg}`}>
                <Loader2 className="animate-spin text-blue-500 w-12 h-12 mb-4" />
                <p className="font-bold animate-pulse">Tizim yuklanmoqda...</p>
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
                    onDelete={initiateDelete}
                    onActivate={handleActivate}
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