import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  NavbarContainer,
  NavbarContent,
  LogoSection,
  LogoIcon,
  LogoText,
  RightSection,
  NotificationButton,
  NotificationBadge,
  ProfileButton,
  ProfileImage,
} from "./Navbar.styled";

const decodeJwt = (token: string) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

interface UserProfile {
  name: string;
  avatar: string;
}

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [notifCount, setNotifCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const decoded = decodeJwt(token);
      const userId = decoded?.id || decoded?.sub || decoded?.user?.id;

      if (!userId) return;

      try {
        // --- 1. USER MA'LUMOTINI OLISH (Avatar uchun) ---
        const userRes = await fetch(
          `https://nt-gym-api.it-mahalla.uz/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // --- 2. NOTIFICATIONLAR SONINI HISOBLASH ---
        // Notifications sahifasidagi mantiq bilan bir xil bo'lishi kerak
        const paymentsRes = await fetch(
          `https://nt-gym-api.it-mahalla.uz/api/payments`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const attendanceRes = await fetch(
          `https://nt-gym-api.it-mahalla.uz/api/attendances`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // -- User Profilini o'rnatish --
        if (userRes.ok) {
          const userDataRaw = await userRes.json();
          const user = Array.isArray(userDataRaw)
            ? userDataRaw[0]
            : userDataRaw;

          let avatarUrl = "https://th.bing.com/th/id/R.ca1aa447d07684a6edc3067c6cf35b41?rik=vDTxmCKREnh4sQ&pid=ImgRaw&r=0"; // Default

          // Agar backenddan rasm kelsa, unga to'liq URL ulaymiz
          if (user.image_url) {
            avatarUrl = `https://nt-gym-api.it-mahalla.uz/uploads/${user.image_url}`;
          }

          const fullName = `${user.first_name || ""} ${
            user.last_name || ""
          }`.trim();

          setUserProfile({
            name: fullName || user.phone || "User",
            avatar: avatarUrl,
          });
        }

        // -- Notification sonini hisoblash --
        let count = 0;

        // To'lovlar soni
        if (paymentsRes.ok) {
          const payments = await paymentsRes.json();
          if (Array.isArray(payments)) count += payments.length;
        }

        // Davomat soni (Notifications page da slice(0,10) qilgan edik)
        let attendanceArr = [];
        if (attendanceRes.ok) {
          attendanceArr = await attendanceRes.json();
          if (Array.isArray(attendanceArr)) {
            // Oxirgi 10 ta tashrif + Streak xabari (agar bo'lsa)
            const recentVisits = attendanceArr.slice(0, 10).length;
            count += recentVisits;
            if (attendanceArr.length >= 3) count += 1; // Streak uchun +1
          }
        }

        // Statik xabarlar (Notifications sahifasida qo'lda qo'shganimiz uchun)
        // 1. Kelmaganlik haqida, 2. Profil, 3. Parol
        count += 3;

        setNotifCount(count);
      } catch (error) {
        console.error("Navbar data error:", error);
      } finally {
        setLoading(false);
      }
    };

    initData();
  }, []);

  return (
    <NavbarContainer>
      <NavbarContent className="container">
        <LogoSection onClick={() => navigate("/profile")}>
          <LogoIcon>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 16L14.5 18.5L20 13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </LogoIcon>
          <LogoText>
            Gym<span>Bros</span>
          </LogoText>
        </LogoSection>

        <RightSection>
          <NotificationButton
            onClick={() => navigate("/profile/notifications")}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.73 21a2 2 0 0 1-3.46 0"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            {/* Dinamik hisoblangan son */}
            {notifCount > 0 && (
              <NotificationBadge>
                {notifCount > 99 ? "99+" : notifCount}
              </NotificationBadge>
            )}
          </NotificationButton>

          <ProfileButton onClick={() => navigate("/profile/profile")}>
            {loading ? (
              <ProfileImage
                src="https://th.bing.com/th/id/R.ca1aa447d07684a6edc3067c6cf35b41?rik=vDTxmCKREnh4sQ&pid=ImgRaw&r=0"
                alt="Loading..."
              />
            ) : (
              <ProfileImage
                src={
                  userProfile?.avatar ||
                  "https://th.bing.com/th/id/R.ca1aa447d07684a6edc3067c6cf35b41?rik=vDTxmCKREnh4sQ&pid=ImgRaw&r=0"
                }
                alt={userProfile?.name || "User"}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://th.bing.com/th/id/R.ca1aa447d07684a6edc3067c6cf35b41?rik=vDTxmCKREnh4sQ&pid=ImgRaw&r=0";
                }}
              />
            )}
          </ProfileButton>
        </RightSection>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
