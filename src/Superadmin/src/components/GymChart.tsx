import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

export interface ChartDataItem {
    name: string;
    value: number;
}

interface GymChartProps {
    data?: ChartDataItem[];
    totalLabel?: string;
    height?: string | number;
    barColor?: string;
}

const GymChart: React.FC<GymChartProps> = ({
    data = [],
    totalLabel,
    height = '100%',
    barColor = "#10b981" // Dashboard'dagi emerald-500 rangiga mosladim
}) => {
    const formatCurrency = (value: any) => {
        const numericValue = typeof value === 'number' ? value : parseFloat(value);
        return (numericValue || 0).toLocaleString('uz-UZ') + ' UZS';
    };

    if (!data || data.length === 0) {
        return (
            <div className="w-full flex items-center justify-center" style={{ height }}>
                <p className="text-slate-500 text-sm font-medium">
                    Ma'lumotlar mavjud emas
                </p>
            </div>
        );
    }

    const dataCount = data.length;
    const dynamicBarSize = Math.max(8, Math.min(50, 500 / dataCount));
    const dynamicFontSize = dataCount > 10 ? 10 : 12;

    return (
        <div style={{
            width: '100%',
            height: height,
            backgroundColor: 'transparent', // Kulrang olib tashlandi
            padding: '10px 0px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'inherit' // Dashboard shriftini oladi
        }}>
            {totalLabel && (
                <div className="mb-4">
                    <h2 className="text-2xl font-black text-emerald-500">
                        {totalLabel}
                    </h2>
                </div>
            )}

            <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                    >
                        {/* To'r chiziqlarini juda xira qildik, dizaynga xalaqit bermasligi uchun */}
                        <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="3 3" opacity={0.5} />

                        <XAxis
                            dataKey="name"
                            axisLine={false} // Chiziqni olib tashladik
                            tickLine={false}
                            tick={{ fill: '#64748b', fontSize: dynamicFontSize }} // Slate-500 rangli yozuvlar
                            interval={dataCount > 12 ? 'preserveStartEnd' : 0}
                            angle={dataCount > 5 ? -35 : 0}
                            textAnchor={dataCount > 5 ? "end" : "middle"}
                            height={dataCount > 5 ? 60 : 30}
                        />

                        <YAxis hide domain={[0, 'dataMax + 100000']} />

                        <Tooltip
                            cursor={{ fill: 'rgba(255, 255, 255, 0.03)' }}
                            contentStyle={{
                                backgroundColor: '#0f172a', // Dashboard'dagi slate-900 rangiga mos
                                border: '1px solid #1e293b',
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            labelStyle={{ color: '#f1f5f9', fontWeight: 'bold', marginBottom: '4px' }}
                            itemStyle={{ color: '#10b981', padding: 0 }}
                            formatter={(value: any) => [formatCurrency(value), '']}
                        />

                        <Bar dataKey="value" barSize={dynamicBarSize} radius={[6, 6, 0, 0]}>
                            {data.map((_entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={barColor}
                                    style={{ filter: 'drop-shadow(0px 4px 10px rgba(16, 185, 129, 0.2))' }}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GymChart;