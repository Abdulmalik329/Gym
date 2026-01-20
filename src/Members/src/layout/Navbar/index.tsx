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

interface NavbarProps {
  unreadCount?: number;
}

interface UserProfile {
  name: string;
  avatar: string;
}

const Navbar: React.FC<NavbarProps> = ({ unreadCount = 0 }) => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  // API dan user profile ma'lumotlarini olish
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Haqiqiy API endpoint
        // const response = await fetch('https://your-api.com/api/user/profile', {
        //   headers: {
        //     'Authorization': `Bearer ${localStorage.getItem('token')}`
        //   }
        // });
        // const data = await response.json();
        // setUserProfile(data);

        // Hozircha mock data

        // setUserProfile({});
        setLoading(false);
      } catch (error) {
        console.error("Profile ma'lumotlarini olishda xatolik:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleLogoClick = () => {
    navigate("/users");
  };

  const handleNotificationClick = () => {
    navigate("/users/notifications");
  };

  const handleProfileClick = () => {
    navigate("/users/profile");
  };

  return (
    <NavbarContainer>
      <NavbarContent>
        <LogoSection onClick={handleLogoClick}>
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
          <NotificationButton onClick={handleNotificationClick}>
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
            {unreadCount > 0 && (
              <NotificationBadge>
                {unreadCount > 9 ? "9+" : unreadCount}
              </NotificationBadge>
            )}
          </NotificationButton>

          <ProfileButton onClick={handleProfileClick}>
            {loading ? (
              <ProfileImage
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Loading..."
              />
            ) : (
              <ProfileImage
                src={userProfile?.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                alt={userProfile?.name || "User"}
              />
            )}
          </ProfileButton>
        </RightSection>
      </NavbarContent>
    </NavbarContainer>
  );
};

export default Navbar;
