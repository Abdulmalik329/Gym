import { DollarSign } from 'lucide-react';

interface FinancialHeaderProps {
    title?: string;
    subtitle?: string;
}

export const FinancialHeader = ({
    title = "Moliyaviy Hisobotlar",
    subtitle = "Filiallar daromad tahlili (Oylar bo'yicha)"
}: FinancialHeaderProps) => {
    return (
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div className="flex items-center gap-5">
                <div className="bg-blue-600 p-3 rounded-2xl shadow-lg shadow-blue-500/20 text-white transform hover:rotate-12 transition-transform duration-300">
                    <DollarSign size={32} />
                </div>

                <div>
                    <h1 className="text-3xl font-black tracking-tight text-white italic uppercase">
                        {title}
                    </h1>
                    <p className="text-slate-400 font-medium">
                        {subtitle}
                    </p>
                </div>
            </div>
        </header>
    );
};