import { useState, useEffect } from 'react';
import type { AdminData, ProfileUpdatePayload } from '../types';

const BASE_URL = "https://nt-gym-api.it-mahalla.uz/api";

export const useProfile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [adminData, setAdminData] = useState<AdminData | null>(null);
    const [tempData, setTempData] = useState<AdminData | null>(null);

    const token = localStorage.getItem("token");

    // 1. Profil ma'lumotlarini yuklash
    const fetchProfile = async () => {
        if (!token) return;
        try {
            const response = await fetch(`${BASE_URL}/users/me`, {
                headers: { "Authorization": `Bearer ${token}` }
            });
            const data = await response.json();
            if (response.ok) {
                setAdminData(data);
                setTempData(data);
            }
        } catch (error) {
            console.error("Yuklashda xatolik:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [token]);

    // 2. Rasm yuklash (Upload)
    const handleImageUpload = async (file: File) => {
        if (!file || !token) return;

        const formData = new FormData();
        formData.append("image", file);

        setIsUploading(true);
        try {
            const response = await fetch(`${BASE_URL}/upload`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });

            const uploadRes = await response.json();

            if (response.ok) {
                const newImageUrl = `https://nt-gym-api.it-mahalla.uz/uploads/${uploadRes.filename}`;
                setTempData(prev => prev ? { ...prev, image_url: newImageUrl } : null);
                setIsEditing(true);
                return newImageUrl;
            }
        } catch (error) {
            console.error("Rasm yuklashda xatolik:", error);
            alert("Rasm yuklashda xatolik yuz berdi");
        } finally {
            setIsUploading(false);
        }
    };

    // 3. Ma'lumotlarni saqlash (Patch)
    const handleSave = async () => {
        if (!adminData || !tempData || !token) return;
        setIsSaving(true);

        const payload: ProfileUpdatePayload = {
            first_name: tempData.firstName,
            last_name: tempData.lastName,
            phone: tempData.phone,
            email: tempData.email,
            birthDate: adminData.birthDate || null,
            weight: adminData.weight || null,
            height: adminData.height || null,
            address: adminData.address || null,
            bio: adminData.bio || null,
            gym_id: adminData.gymId || null,
            image_url: tempData.image_url,
            isActive: true
        };

        try {
            const response = await fetch(`${BASE_URL}/users/${adminData.id}`, {
                method: 'PATCH',
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            const updated = await response.json();
            if (response.ok) {
                setAdminData(updated);
                setTempData(updated);
                setIsEditing(false);
            }
        } catch (error) {
            console.error("Saqlashda xatolik:", error);
        } finally {
            setIsSaving(false);
        }
    };

    // 4. Tahrirlashni bekor qilish
    const cancelEditing = () => {
        setIsEditing(false);
        setTempData(adminData);
    };

    return {
        adminData,
        tempData,
        setTempData,
        isLoading,
        isSaving,
        isUploading,
        isEditing,
        setIsEditing,
        handleImageUpload,
        handleSave,
        cancelEditing
    };
};