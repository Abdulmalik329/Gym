export const getTheme = (isDarkMode: boolean) => {
    return {
        isDarkMode,
        // Asosiy fon va matn ranglari
        bg: isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900',

        // Kartochkalar, jadval va modallar foni
        card: isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200',

        // Inputlar va Selectlar
        input: isDarkMode
            ? 'bg-slate-800 border-slate-700 text-white placeholder-slate-500'
            : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400',

        // Jadval sarlavhasi
        tableHeader: isDarkMode ? 'bg-slate-800/50 text-slate-400' : 'bg-slate-100 text-slate-600',

        // Jadval qatoriga sichqoncha borgandagi effekt
        rowHover: isDarkMode ? 'hover:bg-slate-800/50' : 'hover:bg-blue-50/50',

        // Yordamchi (kichik) matnlar
        subText: isDarkMode ? 'text-slate-400' : 'text-slate-500',

        // Modal ichidagi scrollbar va boshqa elementlar uchun
        border: isDarkMode ? 'border-slate-800' : 'border-slate-100'
    };
};