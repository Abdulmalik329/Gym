import { useState, useEffect, useMemo } from 'react';
import { Loader2 } from 'lucide-react';

import { Header } from './components/Header';
import { UserTable } from './components/UserTable';
import { UserForm } from './components/UserForm';
import { ConfirmModal } from './components/ConfirmModal';
import { userApi } from './services/userApi';
import { getTheme } from './constants/theme';
import type { User, Gym, UserFormData, ConfirmModalState } from './types';

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [gyms, setGyms] = useState<Gym[]>([]);
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

    // Doimiy dark mode
    const theme = getTheme(true);

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
            const isManager = u.role === "GYM_MANAGER";
            const fullSearchString = `${u.firstName} ${u.lastName} ${u.email} ${u.phone}`.toLowerCase();
            const matchesSearch = fullSearchString.includes(searchTerm.toLowerCase());
            return isManager && matchesSearch;
        });
    }, [users, searchTerm]);

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
                    await userApi.activateUser(user.id);
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
        <div className={`min-h-screen ${theme.bg} p-4 md:p-8 font-sans`}>
            <div className="max-w-7xl mx-auto">
                <Header
                    totalUsers={filteredUsers.length}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
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