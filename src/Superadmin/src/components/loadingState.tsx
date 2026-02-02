import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingStateProps {
    message?: string;
    fullScreen?: boolean;
    theme?: {
        bg?: string;
        text?: string;
    };
}

export const LoadingState: React.FC<LoadingStateProps> = ({
    message = "Yuklanmoqda...",
    fullScreen = true,
    theme
}) => {
    const bgColor = theme?.bg || "bg-slate-950";
    const textColor = theme?.text || "text-slate-400";

    return (
        <div className={`
            flex flex-col items-center justify-center gap-4 transition-all duration-500
            ${fullScreen ? `fixed inset-0 ${bgColor}` : `w-full h-full`}
        `}>
            <div className="relative flex items-center justify-center">
                <div className="absolute w-16 h-16 border-4 border-emerald-500/20 rounded-full"></div>
                <Loader2
                    className="w-12 h-12 animate-spin text-emerald-500 relative z-10"
                    strokeWidth={2.5}
                />
            </div>

            <div className="flex flex-col items-center">
                <p className={`font-black uppercase tracking-[0.3em] text-sm animate-pulse ${textColor}`}>
                    {message}
                </p>
                <div className="w-12 bg-emerald-500/30 mt-2 rounded-full overflow-hidden">
                    <div className="w-full h-full bg-emerald-500 animate-[loading_1.5s_infinite_ease-in-out]"></div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes loading {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
            `}} />
        </div>
    );
};