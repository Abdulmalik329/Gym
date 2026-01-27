import { useState, useEffect } from 'react';
import type { Gym } from '../types';

const API_URL = "https://nt-gym-api.it-mahalla.uz/api/gyms";

export const useGymActions = () => {
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getHeaders = () => ({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
    });

    const fetchGyms = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(API_URL, { headers: getHeaders() });
            const data = await response.json();
            setGyms(Array.isArray(data) ? data : (data.data || []));
        } catch (err) {
            setError("Ma'lumotlarni yuklashda xatolik!");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteGym = async (id: number | string) => {
        if (!window.confirm("O'chirishni tasdiqlaysizmi?")) return;
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE', headers: getHeaders() });
            setGyms(prev => prev.filter(g => g.id !== id));
        } catch (err) { alert("O'chirishda xatolik!"); }
    };

    useEffect(() => { fetchGyms(); }, []);

    return { gyms, isLoading, error, fetchGyms, deleteGym, setGyms };
};