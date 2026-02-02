import React, { useRef } from 'react';
import { Camera, Loader2 } from 'lucide-react';

interface ProfileAvatarProps {
    imageUrl: string | null;
    firstName: string;
    lastName: string;
    role: string;
    isUploading: boolean;
    onImageChange: (file: File) => void;
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
    imageUrl,
    firstName,
    lastName,
    role,
    isUploading,
    onImageChange
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            onImageChange(file);
        }
    };

    return (
        <div className="bg-slate-900/50 border border-slate-800 p-8 rounded-[2.5rem] flex flex-col items-center text-center h-fit shadow-2xl">
            <div className="relative">
                <div className="w-36 h-36 rounded-full bg-slate-800 flex items-center justify-center text-white text-5xl font-black shadow-2xl overflow-hidden border-4 border-slate-700">
                    {isUploading ? (
                        <Loader2 className="animate-spin text-emerald-500" size={32} />
                    ) : imageUrl ? (
                        <img src={imageUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                        <span>{firstName ? firstName[0] : "A"}</span>
                    )}
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-1 right-1 bg-emerald-600 p-3 rounded-full border-4 border-slate-900 text-white hover:scale-110 transition-transform shadow-lg disabled:opacity-50"
                    disabled={isUploading}
                    title="Rasmni o'zgartirish"
                >
                    <Camera size={20} />
                </button>
            </div>

            <h2 className="mt-5 text-xl font-bold text-white">
                {firstName} {lastName}
            </h2>
            <span className="mt-2 px-4 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em] rounded-full border border-emerald-500/20">
                {role}
            </span>
        </div>
    );
};