import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User, Mail, Phone, Shield, Edit2, Save, X, LogOut,
    AlertTriangle, Camera, Loader2
} from 'lucide-react';

// Ma'lumot turlari
interface AdminData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    role: string;
    image_url: string | null;
    birthDate?: string | null;
    weight?: number | null;
    height?: number | null;
    address?: string | null;
    bio?: string | null;
    gymId?: number | null;
}

interface DetailFieldProps {
    label: string;
    icon: React.ReactNode;
    value: string;
    isEditing: boolean;
    onChange: (val: string) => void;
}

export default function AdminProfile() {
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const [adminData, setAdminData] = useState<AdminData | null>(null);
    const [tempData, setTempData] = useState<AdminData | null>(null);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const token = localStorage.getItem("token");
    const BASE_URL = "https://nt-gym-api.it-mahalla.uz/api";

    // 1. Profilni yuklash
    useEffect(() => {
        const fetchProfile = async () => {
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
        fetchProfile();
    }, [token]);

    // 2. Rasmni POST /api/upload ga yuklash
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

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
                // Yangi URL yasash: https://nt-gym-api.it-mahalla.uz/uploads/${filename}
                const newImageUrl = `https://nt-gym-api.it-mahalla.uz/uploads/${uploadRes.filename}`;

                // Vaqtinchalik ma'lumotni yangilash
                setTempData(prev => prev ? { ...prev, image_url: newImageUrl } : null);
                setIsEditing(true); // Tahrirlash rejimini avtomat yoqish
                console.log("Yangi rasm URL:", newImageUrl);
            }
        } catch (error) {
            console.error("Rasm yuklashda xatolik:", error);
            alert("Rasm yuklashda xatolik yuz berdi");
        } finally {
            setIsUploading(false);
        }
    };

    // 3. Ma'lumotlarni PATCH orqali saqlash
    const handleSave = async () => {
        if (!adminData || !tempData) return;
        setIsSaving(true);

        const payload = {
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
            image_url: tempData.image_url, // Yuklangan yangi rasm URL'i
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (isLoading) return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
            <Loader2 className="animate-spin text-emerald-500" size={40} />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-black text-white tracking-tight">Profil Sozlamalari</h1>
                        <p className="text-slate-500 text-sm">Ma'lumotlar va rasmni boshqarish</p>
                    </div>
                    <button
                        onClick={() => setShowLogoutModal(true)}
                        className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-bold"
                    >
                        <LogOut size={18} /> Chiqish
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Avatar qismi */}
                    <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center text-center h-fit shadow-2xl">
                        <div className="relative">
                            <div className="w-36 h-36 rounded-full bg-slate-800 flex items-center justify-center text-white text-5xl font-black shadow-2xl overflow-hidden border-4 border-slate-700">
                                {isUploading ? (
                                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                                ) : tempData?.image_url ? (
                                    <img src={tempData.image_url} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    tempData?.firstName ? tempData.firstName[0] : "A"
                                )}
                            </div>

                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageUpload}
                            />

                            <button
                                onClick={() => fileInputRef.current?.click()}
                                className="absolute bottom-1 right-1 bg-emerald-600 p-3 rounded-full border-4 border-slate-900 text-white hover:scale-110 transition-transform shadow-lg"
                                disabled={isUploading}
                                title="Rasmni o'zgartirish"
                            >
                                <Camera size={20} />
                            </button>
                        </div>
                        <h2 className="mt-5 text-xl font-bold text-white">{adminData?.firstName} {adminData?.lastName}</h2>
                        <span className="mt-2 px-4 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">
                            {adminData?.role}
                        </span>
                    </div>

                    {/* Ma'lumotlar qismi */}
                    <div className="md:col-span-2 bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] shadow-2xl">
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-lg font-bold flex items-center gap-2 text-white">
                                <Shield className="text-emerald-500" size={20} /> Asosiy ma'lumotlar
                            </h3>
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-sm text-emerald-500 font-bold flex items-center gap-2 hover:bg-emerald-500/10 px-4 py-2 rounded-lg transition-all"
                                >
                                    <Edit2 size={14} /> Tahrirlash
                                </button>
                            ) : (
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => { setIsEditing(false); setTempData(adminData); }}
                                        className="text-slate-400 hover:text-white transition-colors"
                                        disabled={isSaving}
                                    >
                                        <X size={24} />
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-emerald-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-emerald-500 transition-all disabled:opacity-50 shadow-lg shadow-emerald-900/20"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
                                        Saqlash
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <DetailField
                                    label="Ism"
                                    icon={<User size={18} />}
                                    value={isEditing ? tempData?.firstName || "" : adminData?.firstName || ""}
                                    isEditing={isEditing}
                                    onChange={(v: string) => setTempData(prev => prev ? { ...prev, firstName: v } : null)}
                                />
                                <DetailField
                                    label="Familiya"
                                    icon={<User size={18} />}
                                    value={isEditing ? tempData?.lastName || "" : adminData?.lastName || ""}
                                    isEditing={isEditing}
                                    onChange={(v: string) => setTempData(prev => prev ? { ...prev, lastName: v } : null)}
                                />
                            </div>
                            <DetailField
                                label="Email"
                                icon={<Mail size={18} />}
                                value={isEditing ? tempData?.email || "" : adminData?.email || ""}
                                isEditing={isEditing}
                                onChange={(v: string) => setTempData(prev => prev ? { ...prev, email: v } : null)}
                            />
                            <DetailField
                                label="Telefon"
                                icon={<Phone size={18} />}
                                value={isEditing ? tempData?.phone || "" : adminData?.phone || ""}
                                isEditing={isEditing}
                                onChange={(v: string) => setTempData(prev => prev ? { ...prev, phone: v } : null)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Logout Modal */}
            {showLogoutModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
                    <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-[2.5rem] p-10 text-center shadow-2xl transform animate-in zoom-in duration-200">
                        <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                            <AlertTriangle size={40} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">Tizimdan chiqish</h3>
                        <p className="text-slate-400 mb-8 leading-relaxed">Haqiqatan ham akkauntdan chiqmoqchimisiz?</p>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setShowLogoutModal(false)}
                                className="flex-1 py-4 rounded-2xl bg-slate-800 font-bold hover:bg-slate-700 text-slate-300 transition-colors"
                            >
                                Bekor qilish
                            </button>
                            <button
                                onClick={handleLogout}
                                className="flex-1 py-4 rounded-2xl bg-red-600 text-white font-bold hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all"
                            >
                                Chiqish
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailField({ label, icon, value, isEditing, onChange }: DetailFieldProps) {
    return (
        <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">{label}</label>
            <div className={`flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 ${isEditing ? 'border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20' : 'border-slate-800 bg-slate-950/50'}`}>
                <span className="text-slate-500">{icon}</span>
                {isEditing ? (
                    <input
                        className="bg-transparent border-none outline-none text-white w-full font-medium placeholder:text-slate-700"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        autoFocus={label === "Ism"}
                    />
                ) : (
                    <span className="text-white font-medium truncate">{value || "Kiritilmagan"}</span>
                )}
            </div>
        </div>
    );
}