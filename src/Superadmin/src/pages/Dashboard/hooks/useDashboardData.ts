import { useState, useEffect, useCallback } from 'react';
import { request } from "../../../utils/useApi";
import type { DashboardState, GymReport, ChartDataItem } from "../types/dashboard.types";

export const useDashboardData = () => {
    const [data, setData] = useState<DashboardState>({
        totalGyms: 0,
        totalUsers: 0,
        totalRevenue: "0",
        topGyms: [],
        chartData: [],
        isLoading: true,
    });

    const fetchData = useCallback(async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            setData(prev => ({ ...prev, isLoading: false }));
            return;
        }

        setData(prev => ({ ...prev, isLoading: true }));

        try {
            const { data: apiData } = await request<GymReport>(
                'https://nt-gym-api.it-mahalla.uz/api/reports/super-admin',
                'GET',
                token
            );

            if (apiData) {
                const formattedChartData: ChartDataItem[] = apiData.top_performing_gyms.map((gym) => ({
                    name: gym.name,
                    value: Number(gym.totalRevenue.replace(/[^0-9.-]+/g, ""))
                }));

                setData({
                    totalGyms: apiData.total_gyms,
                    totalUsers: apiData.total_users,
                    totalRevenue: apiData.total_revenue,
                    topGyms: apiData.top_performing_gyms,
                    chartData: formattedChartData,
                    isLoading: false
                });
            }
        } catch (error) {
            console.error("Dashboard yuklanishida xatolik:", error);
            setData(prev => ({ ...prev, isLoading: false }));
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return {
        data,
        fetchData,
        isInitialLoading: data.isLoading && data.totalGyms === 0
    };
};