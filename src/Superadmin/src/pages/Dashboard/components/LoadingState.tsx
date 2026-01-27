import { Loader2 } from 'lucide-react';
import type { DashboardTheme } from '../types/dashboard.types';

interface LoadingStateProps {
    theme: DashboardTheme;
    message?: string;
}

export const LoadingState = ({ theme, message = "Dashboard yuklanmoqda..." }: LoadingStateProps) => {
    return (
        <div className={`min-h-screen flex flex-col items-center justify-center ${theme.bg}`}>
            <div className="relative flex items-center justify-center">
                <div className="absolute inset-0 rounded-full bg-emerald-500/20 animate-ping"></div>

                <Loader2 className="animate-spin text-emerald-500 w-16 h-16 mb-4 relative z-10" />
            </div>

            <h2 className="text-xl font-bold tracking-tight animate-pulse">
                {message}
            </h2>

            <p className={`${theme.subText} mt-2 text-sm`}>
                Iltimos, kuting, tizim tahlil qilinmoqda...
            </p>

            <style dangerouslySetInnerHTML={{
                __html: `
                body { background-color: #020617; }
            ` }} />
        </div>
    );
};