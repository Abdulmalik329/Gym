import type { MembershipPlan } from '../types';

const API_BASE = "https://nt-gym-api.it-mahalla.uz/api";

/**
 * Brauzerda ekanligini tekshirib, tokenni olish
 */
const getHeaders = (): HeadersInit => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : '';
    return {
        'Content-Type': 'application/json',
        'Authorization': token ? `Bearer ${token}` : ''
    };
};

export const planApi = {
    /**
     * Barcha tariflarni olish
     * Qaytayotgan ma'lumotni MembershipPlan[] ekanligini aniq ko'rsatamiz
     */
    getPlans: async (): Promise<MembershipPlan[]> => {
        const response = await fetch(`${API_BASE}/membership-plans`, {
            headers: getHeaders()
        });

        if (response.status === 401) {
            throw new Error("Sessiya xatosi");
        }

        const data = await response.json();
        // API dan kelayotgan ma'lumot strukturasiga qarab:
        return Array.isArray(data) ? data : (data.data || []);
    },

    /**
     * Tarifni saqlash (Yaratish yoki Tahrirlash)
     */
    savePlan: async (formData: Partial<MembershipPlan>, id?: number | string) => {
        const method = id ? 'PATCH' : 'POST';
        const url = id
            ? `${API_BASE}/membership-plans/${id}`
            : `${API_BASE}/membership-plans`;

        // Raqam bo'lishi shart bo'lgan qiymatlarni formatlash
        const payload = {
            ...formData,
            price: Number(formData.price) || 0,
            duration_days: Number(formData.duration_days) || 0,
            session_count: Number(formData.session_count) || 0,
            gym_id: Number(formData.gym_id) || 1
        };

        const response = await fetch(url, {
            method,
            headers: getHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || "Saqlashda xatolik yuz berdi");
        }

        return response.json();
    },

    /**
     * Tarifning faollik holatini o'zgartirish (Toggle)
     * index.tsx dagi chaqiruvga moslash uchun nomini toggleStatus qildik
     */
    toggleStatus: async (id: number | string) => {
        const response = await fetch(`${API_BASE}/membership-plans/${id}`, {
            method: 'POST',
            headers: getHeaders()
        });

        if (!response.ok) {
            throw new Error("Holatni o'zgartirishda xatolik");
        }

        return response.json();
    },

    /**
     * Tarifni o'chirish (Delete)
     */
    deletePlan: async (id: number | string) => {
        const response = await fetch(`${API_BASE}/membership-plans/${id}`, {
            method: 'DELETE',
            headers: getHeaders()
        });

        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "O'chirishda xatolik");
        }

        return response.json();
    }
};