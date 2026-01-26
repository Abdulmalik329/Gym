import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom"; // 1. Navigate ni import qiling
import MainLayout from "../layout/LayoutMain";

const Home = lazy(() => import("../pages/Home"));
const Notificate = lazy(() => import("../pages/Notificate"));
const Profile = lazy(() => import("../pages/Profile"));
const ChangePassword = lazy(() => import("../pages/change-password"));
const Login = lazy(() => import("../pages/login"));
const EditProfile = lazy(() => import("../pages/Profile/edit"))

const AppRouter = () => {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />

        <Route path="/profile" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="notifications" element={<Notificate />} />
          <Route path="profile" element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="profile/change-password" element={<ChangePassword />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
