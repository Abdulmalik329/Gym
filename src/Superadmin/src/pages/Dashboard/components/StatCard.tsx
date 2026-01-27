import type { LucideIcon } from 'lucide-react';
import { dashboardTheme as theme } from '../constants/dashboard.theme';

interface StatCardProps {
    title: string;
    value: string | number;
    subValue: string;
    Icon: LucideIcon;
    iconColor: string;
    gradient?: boolean;
}

export const StatCard = ({
    title,
    value,
    subValue,
    Icon,
    iconColor,
    gradient = false
}: StatCardProps) => {
    return (
        <div className={`
            relative overflow-hidden rounded-[2rem] border p-8 
            ${theme.card} 
            ${gradient ? 'bg-gradient-to-br from-slate-900 to-emerald-950/20' : ''}
        `}>
            <div className={`absolute top-0 right-0 p-6 opacity-10 ${iconColor}`}>
                <Icon size={80} />
            </div>

            <h3 className="text-xs font-black uppercase tracking-widest mb-4 opacity-50">
                {title}
            </h3>

            <div className="flex items-end gap-2">
                <span className="text-4xl font-black tracking-tight">
                    {value}
                </span>
                <span className={`${iconColor} text-sm font-bold mb-1`}>
                    {subValue}
                </span>
            </div>
        </div>
    );
};