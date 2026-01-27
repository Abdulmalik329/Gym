import type { UserFormData } from '../types';

const API_BASE = "https://nt-gym-api.it-mahalla.uz/api";

/**
 * Har bir so'rov uchun Authorization header-ni tayyorlash
 */
const getHeaders = (): HeadersInit => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const userApi = {
    /**
     * Barcha foydalanuvchilarni olish
     */
    getUsers: async () => {
        const response = await fetch(`${API_BASE}/users`, {
            headers: getHeaders()
        });
        if (response.status === 401) throw new Error("Sessiya tugagan");
        return response.json();
    },

    /**
     * Mavjud zallarni olish
     */
    getGyms: async () => {
        const response = await fetch(`${API_BASE}/gyms`, {
            headers: getHeaders()
        });
        return response.json();
    },

    /**
     * Yangi menejer yaratish
     */
    createManager: async (formData: UserFormData) => {
        const payload = {
            ...formData,
            weight: Number(formData.weight) || 0,
            height: Number(formData.height) || 0,
            gym_id: Number(formData.gym_id)
        };

        const response = await fetch(`${API_BASE}/users/create-gym-manager`, {
            method: 'POST',
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.message || "Menejer yaratishda xatolik");
        }
        return result;
    },

    /**
     * Foydalanuvchini o'chirish
     */
    deleteUser: async (id: string | number) => {
        const response = await fetch(`${API_BASE}/users/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "O'chirish imkonsiz");
        }
        return response.json();
    },

    /**
     * Foydalanuvchini aktivlashtirish
     */
    activateUser: async (id: string | number) => {
        const response = await fetch(`${API_BASE}/users/activate/${id}`, {
            method: 'POST',
            headers: getHeaders()
        });

        if (!response.ok) throw new Error("Aktivlashtirishda xatolik");
        return response.json();
    }
};