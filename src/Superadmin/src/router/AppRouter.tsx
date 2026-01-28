import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const MainLayout = lazy(() => import("../layout/MainLayout"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Gym = lazy(() => import("../pages/Gym"));
const User = lazy(() => import("../pages/User"));
const MembershipPlans = lazy(() => import("../pages/MembershipPlans"));
const FinancialReports = lazy(() => import("../pages/FinancialReports"));
const Profile = lazy(() => import("../pages/Profile"));

const AdminRouter = () => {
  return (
    <Suspense fallback={<p>Admin sahifasi yuklanmoqda...</p>}>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />

          <Route path="dashboard" element={<Dashboard />} />
          <Route path="gym" element={<Gym />} />
          <Route path="user" element={<User />} />
          <Route path="membership-plans" element={<MembershipPlans />} />
          <Route path="financial-reports" element={<FinancialReports />} />
          <Route path="profile" element={<Profile />} />

        </Route>
      </Routes>
    </Suspense>
  );
};

export default AdminRouter;
