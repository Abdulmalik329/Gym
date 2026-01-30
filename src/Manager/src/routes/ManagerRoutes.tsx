import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import MemberManagement from "../pages/Members/MembersTable/MemberManagement";
import Settings from "../pages/Settings/Settings";
import CreateMember from "../pages/Members/CreateMember/CreateMember";
import ReportsMain from "../pages/Reports/Reports";
import Payments from "../pages/Payments/Payments";

const ManagerRoutes = () => (
  <Routes>
    <Route element={<DashboardLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="members">
        <Route index element={<MemberManagement />} />
        <Route path="create" element={<CreateMember />} />
      </Route>
      <Route path="payments" element={<Payments />} />
      <Route path ="reports" element={<ReportsMain />} />
      <Route path="settings" element={<Settings />} />

      <Route path="*" element={<div>404 Not Found </div>} />
    </Route>
  </Routes>
);

export default ManagerRoutes;
