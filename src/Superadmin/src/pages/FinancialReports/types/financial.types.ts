export interface PaymentResponse {
    id: number;
    amount: string;
    paidAt: string;
    method: string;
    user: {
        firstName: string;
        lastName: string;
        phone: string;
    };
    membership: {
        plan: {
            name: string;
        };
    };
}

export interface Gym {
    id: number;
    name: string;
}

export interface ChartData {
    name: string;
    value: number;
}

export interface FinancialState {
    payments: PaymentResponse[];
    gyms: Gym[];
    chartData: ChartData[];
    isLoading: boolean;
    isChartLoading: boolean;
    selectedGymId: string | null;
    searchTerm: string;
}