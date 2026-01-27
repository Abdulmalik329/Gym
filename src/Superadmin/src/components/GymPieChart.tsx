import React from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

interface GymData {
    name: string;
    value: number;
}

interface GymPieChartProps {
    data: GymData[];
    height?: number;
}

// Dashboard dizayniga mos keladigan zamonaviy ranglar palitrasi
const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899'];

const GymPieChart: React.FC<GymPieChartProps> = ({ data = [], height = 350 }) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);

    const formatCurrency = (value: number | string): string => {
        const numericValue = typeof value === 'number' ? value : parseFloat(value);
        return (numericValue || 0).toLocaleString('uz-UZ') + ' UZS';
    };

    const renderCustomizedLabel = (props: any) => {
        const { cx, cy, midAngle, outerRadius, percent, name } = props;
        const RADIAN = Math.PI / 180;
        const radius = outerRadius + 25;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text
                x={x}
                y={y}
                fill="#64748b"
                textAnchor={x > cx ? 'start' : 'end'}
                dominantBaseline="central"
                className="text-[10px] md:text-[12px] font-medium"
                style={{ fontFamily: 'inherit' }}
            >
                {`${name.length > 10 ? name.substring(0, 10) + '...' : name} (${(percent * 100).toFixed(0)}%)`}
            </text>
        );
    };

    if (!data || data.length === 0) {
        return (
            <div className="w-full flex items-center justify-center" style={{ height }}>
                <p className="text-slate-500 text-sm">Ma'lumotlar mavjud emas</p>
            </div>
        );
    }

    return (
        <div className="w-full bg-transparent p-0" style={{ fontFamily: 'inherit' }}>
            <div style={{ height: height, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="45%"
                            innerRadius={height * 0.15} // Donut ko'rinishi uchun
                            outerRadius={height * 0.25}
                            paddingAngle={5}
                            dataKey="value"
                            stroke="none"
                            label={renderCustomizedLabel}
                            labelLine={{ stroke: '#334155', strokeWidth: 1 }}
                        >
                            {data.map((_, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            contentStyle={{
                                backgroundColor: '#0f172a',
                                border: '1px solid #1e293b',
                                borderRadius: '12px',
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
                            }}
                            itemStyle={{ color: '#ffffff', fontSize: '12px' }}
                            formatter={(value: any) => {
                                const percentage = total > 0 ? ((Number(value) / total) * 100).toFixed(1) : '0';
                                return [`${formatCurrency(value)} (${percentage}%)`, "Ulush"];
                            }}
                        />

                        <Legend
                            verticalAlign="bottom"
                            content={({ payload }) => (
                                <ul className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 px-2">
                                    {payload?.map((entry: any, index: number) => (
                                        <li key={`item-${index}`} className="flex items-center gap-2">
                                            <div
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: entry.color }}
                                            />
                                            <span className="text-slate-400 text-[11px] font-medium uppercase tracking-wider">
                                                {entry.value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default GymPieChart;