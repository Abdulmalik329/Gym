import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAppNavigate = () => {
    const navigate = useNavigate();

    return useMemo(() => ({
        goDashboard: () => navigate('/admin/dashboard'),
        goGymManagment: () => navigate('/admin/gym'),
        goUser: () => navigate("/admin/user"),
        goMembershipPlans: () => navigate("/admin/membership-plans"),
        goFinancialReports: () => navigate("/admin/financial-reports"),
        goAdminProfile: () => navigate("/admin/profile")

    }), [navigate]);
};