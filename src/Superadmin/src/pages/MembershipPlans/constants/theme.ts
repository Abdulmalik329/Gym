export interface Theme {
    isDarkMode: boolean;
    bg: string;
    card: string;
    input: string;
    tableHeader: string;
    rowHover: string;
    subText: string;
    border: string;
}

export const getTheme = (isDarkMode: boolean): Theme => {
    return {
        isDarkMode,
        bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',
        card: isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',
        input: isDarkMode
            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400',
        tableHeader: isDarkMode ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-100 text-slate-600',
        rowHover: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-blue-50/50',
        subText: isDarkMode ? 'text-slate-400' : 'text-slate-500',
        border: isDarkMode ? 'border-slate-800' : 'border-slate-100'
    };
};