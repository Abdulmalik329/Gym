import React from 'react';
import { LogOut } from 'lucide-react';

interface ProfileHeaderProps {
    onLogoutClick: () => void;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ onLogoutClick }) => {
    return (
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-3xl font-black text-white tracking-tight">
                    Profil Sozlamalari
                </h1>
                <p className="text-slate-500 text-sm">
                    Ma'lumotlar va rasmni boshqarish
                </p>
            </div>

            <button
                onClick={onLogoutClick}
                className="flex items-center gap-2 bg-red-500/10 text-red-500 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500 hover:text-white transition-all font-bold group"
            >
                <LogOut
                    size={18}
                    className="group-hover:-translate-x-1 transition-transform"
                />
                Chiqish
            </button>
        </div>
    );
};