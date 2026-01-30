import { Routes, Route } from "react-router-dom";
import DashboardLayout from "../components/layout/DashboardLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import MemberManagement from "../pages/Members/MembersTable/MemberManagement";
import Settings from "../pages/Settings/Settings";
import CreateMember from "../pages/Members/CreateMember/CreateMember";
import ReportsMain from "../pages/Reports/Reports";

const ManagerRoutes = () => (
  <Routes>
    {/* Bu yerda path yozilmaydi, chunki u ota routerdan (/menager/*) davom etadi */}
    <Route element={<DashboardLayout />}>
      {/* /menager ga kirganda ochiladi */}
      <Route index element={<Dashboard />} />

      {/* /menager/dashboard ga kirganda ochiladi */}
      <Route path="dashboard" element={<Dashboard />} />

      {/* /menager/members... */}
      <Route path="members">
        <Route index element={<MemberManagement />} />
        <Route path="create" element={<CreateMember />} />
        <Route path="details/:email" element={<div>Member Details Page</div>} />
        <Route
          path="payment/:email"
          element={<div>Receive Payment Page</div>}
        />
      </Route>
      <Route path ="reports" element={<ReportsMain />} />
      <Route path="settings" element={<Settings />} />

      <Route path="*" element={<div>404 Not Found (Manager)</div>} />
    </Route>
  </Routes>
);

export default ManagerRoutes;
