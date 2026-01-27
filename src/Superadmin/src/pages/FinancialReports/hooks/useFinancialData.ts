import { useState, useEffect, useMemo, useCallback } from 'react';
import { request } from "../../../utils/useApi";
import type { PaymentResponse, Gym, ChartData } from "../types/financial.types";

export const useFinancialData = () => {
    const [payments, setPayments] = useState<PaymentResponse[]>([]);
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [chartData, setChartData] = useState<ChartData[]>([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isChartLoading, setIsChartLoading] = useState(false);
    const [selectedGymId, setSelectedGymId] = useState<string | null>(null);

    const token = localStorage.getItem("token") || "";

    const fetchGyms = async () => {
        try {
            const { data } = await request<Gym[]>('https://nt-gym-api.it-mahalla.uz/api/gyms', 'GET', token);
            if (data && data.length > 0) {
                setGyms(data);
                setSelectedGymId(String(data[0].id));
            }
        } catch (err) {
            console.error("Zallarni yuklashda xato:", err);
        }
    };

    const fetchPayments = async () => {
        try {
            const { data } = await request<PaymentResponse[]>('https://nt-gym-api.it-mahalla.uz/api/payments', 'GET', token);
            if (data) setPayments(data);
        } catch (err) {
            console.error("To'lovlarni yuklashda xato:", err);
        }
    };

    const fetchChartData = useCallback(async (gymId: string) => {
        setIsChartLoading(true);
        try {
            const { data } = await request<any>(
                `https://nt-gym-api.it-mahalla.uz/api/reports/gym-manager/revenue-chart?gym_id=${gymId}`,
                'GET',
                token
            );

            if (data && Array.isArray(data)) {
                const formatted = data.map((item: any) => ({
                    name: item.month,
                    value: Number(item.amount)
                }));
                setChartData(formatted);
            }
        } catch (error) {
            console.error("Grafik yuklashda xato:", error);
        } finally {
            setIsChartLoading(false);
        }
    }, [token]);

    useEffect(() => {
        const init = async () => {
            setIsLoading(true);
            await Promise.all([fetchGyms(), fetchPayments()]);
            setIsLoading(false);
        };
        init();
    }, []);

    useEffect(() => {
        if (selectedGymId) {
            fetchChartData(selectedGymId);
        }
    }, [selectedGymId, fetchChartData]);

    const totalRevenue = useMemo(() => {
        return payments.reduce((sum, p) => sum + Number(p.amount), 0);
    }, [payments]);

    return {
        payments,
        gyms,
        chartData,
        isLoading,
        isChartLoading,
        selectedGymId,
        setSelectedGymId,
        totalRevenue,
        refreshData: fetchPayments
    };
};