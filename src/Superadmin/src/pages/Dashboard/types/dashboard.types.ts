export interface TopGym {
    name: string;
    totalRevenue: string; 
}

export interface GymReport {
    total_gyms: number;
    total_users: number;
    total_revenue: string;
    top_performing_gyms: TopGym[];
}

export interface ChartDataItem {
    name: string;
    value: number;
}

export interface DashboardState {
    totalGyms: number;
    totalUsers: number;
    totalRevenue: string;
    topGyms: TopGym[];
    chartData: ChartDataItem[];
    isLoading: boolean;
}

export interface DashboardTheme {
    bg: string;
    card: string;
    subText: string;
    accent: string;
}