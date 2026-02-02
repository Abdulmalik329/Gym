import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Shield, Edit2, Save, X, Loader2 } from 'lucide-react';

// Ichki importlar
import { useProfile } from './hooks/useProfile';
import { DetailField } from './components/DetailField';
import { ProfileHeader } from './components/ProfileHeader';
import { ProfileAvatar } from './components/ProfileAvatar';
import { LogoutModal } from './components/LogoutModal';
import { LoadingState } from '../../components/loadingState';

export default function AdminProfile() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    // Custom hook'dan hamma narsani olamiz
    const {
        adminData, tempData, setTempData,
        isLoading, isSaving, isUploading, isEditing, setIsEditing,
        handleImageUpload, handleSave, cancelEditing
    } = useProfile();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    if (isLoading) {
        return (
            <LoadingState message='Yuklanmoqda...'/>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-200 p-6 md:p-12 font-sans">
            <div className="max-w-4xl mx-auto">

                <ProfileHeader onLogoutClick={() => setShowLogoutModal(true)} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Chap taraf: Avatar */}
                    <ProfileAvatar
                        imageUrl={tempData?.image_url || null}
                        firstName={adminData?.firstName || ""}
                        lastName={adminData?.lastName || ""}
                        role={adminData?.role || "User"}
                        isUploading={isUploading}
                        onImageChange={handleImageUpload}
                    />

                    {/* O'ng taraf: Ma'lumotlar */}
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
                                    <button onClick={cancelEditing} className="text-slate-400 hover:text-white" disabled={isSaving}>
                                        <X size={24} />
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="bg-emerald-600 text-white px-5 py-2 rounded-xl flex items-center gap-2 font-bold hover:bg-emerald-500 transition-all disabled:opacity-50"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />} Saqlash
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
                                    onChange={(v) => setTempData(prev => prev ? { ...prev, firstName: v } : null)}
                                    autoFocus
                                />
                                <DetailField
                                    label="Familiya"
                                    icon={<User size={18} />}
                                    value={isEditing ? tempData?.lastName || "" : adminData?.lastName || ""}
                                    isEditing={isEditing}
                                    onChange={(v) => setTempData(prev => prev ? { ...prev, lastName: v } : null)}
                                />
                            </div>
                            <DetailField
                                label="Email"
                                icon={<Mail size={18} />}
                                value={isEditing ? tempData?.email || "" : adminData?.email || ""}
                                isEditing={isEditing}
                                onChange={(v) => setTempData(prev => prev ? { ...prev, email: v } : null)}
                            />
                            <DetailField
                                label="Telefon"
                                icon={<Phone size={18} />}
                                value={isEditing ? tempData?.phone || "" : adminData?.phone || ""}
                                isEditing={isEditing}
                                onChange={(v) => setTempData(prev => prev ? { ...prev, phone: v } : null)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <LogoutModal
                isOpen={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onConfirm={handleLogout}
            />
        </div>
    );
}