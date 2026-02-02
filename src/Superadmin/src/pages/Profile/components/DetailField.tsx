import React from 'react';
import type { DetailFieldProps } from '../types';

export const DetailField: React.FC<DetailFieldProps> = ({
    label,
    icon,
    value,
    isEditing,
    onChange,
    autoFocus = false
}) => {
    return (
        <div className="space-y-2">
            <label className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em] ml-1">
                {label}
            </label>

            <div className={`
                flex items-center gap-3 p-4 rounded-2xl border transition-all duration-300 
                ${isEditing
                    ? 'border-emerald-500/50 bg-emerald-500/5 ring-1 ring-emerald-500/20'
                    : 'border-slate-800 bg-slate-950/50'
                }
            `}>
                <span className="text-slate-500 shrink-0">
                    {icon}
                </span>

                {isEditing ? (
                    <input
                        className="bg-transparent border-none outline-none text-white w-full font-medium placeholder:text-slate-700 focus:ring-0"
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        autoFocus={autoFocus}
                        placeholder={`${label}ni kiriting...`}
                    />
                ) : (
                    <span className="text-white font-medium truncate">
                        {value || "Kiritilmagan"}
                    </span>
                )}
            </div>
        </div>
    );
};