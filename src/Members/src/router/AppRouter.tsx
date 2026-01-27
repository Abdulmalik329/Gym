import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "../layout/LayoutMain";

const Home = lazy(() => import("../pages/Home"));
const Notificate = lazy(() => import("../pages/Notificate"));
const Profile = lazy(() => import("../pages/Profile"));
const ChangePassword = lazy(() => import("../pages/change-password"));
const Login = lazy(() => import("../pages/login"));

const AppRouter = () => {
  return (
    <Suspense fallback={<p>Yuklanmoqda...</p>}>
      <Routes>
        <Route path="login" element={<Login />} />

        <Route path="/users" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="notifications" element={<Notificate />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/change-password" element={<ChangePassword />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
