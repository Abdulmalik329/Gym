import React from "react";
import { useLocation } from "react-router-dom";
import {
  FiGrid,
  FiUsers,
  FiPieChart,
  FiSettings,
  FiLogOut,
  FiCheck,
  FiCreditCard,
} from "react-icons/fi";

import {
  Container,
  LogoWrapper,
  LogoIcon,
  LogoText,
  Menu,
  MenuItem,
  ItemText,
  LogoutBtn,
} from "./Sidebar.styled";

interface SidebarProps {
  isOpen: boolean;
}

interface MenuLink {
  path: string;
  label: string;
  icon: React.ReactNode;
}

const menuItems: MenuLink[] = [
  {
    path: "/manager/dashboard",
    label: "Dashboard",
    icon: <FiGrid size={22} />,
  },
  { path: "/manager/members", label: "Members", icon: <FiUsers size={22} /> },
  {
    path: "/manager/membership-plans",
    label: "Membership Plans",
    icon: <FiCreditCard size={22} />,
  },
  {
    path: "/manager/payments",
    label: "Payments",
    icon: <FiCreditCard size={22} />,
  },
  {
    path: "/manager/reports",
    label: "Reports",
    icon: <FiPieChart size={22} />,
  },
  {
    path: "/manager/settings",
    label: "Settings",
    icon: <FiSettings size={22} />,
  },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm("Tizimdan chiqmoqchimisiz?")) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <Container isOpen={isOpen}>
      <LogoWrapper isOpen={isOpen}>
        <LogoIcon>
          <FiCheck size={18} strokeWidth={4} color="#fff" />
        </LogoIcon>
        <LogoText isOpen={isOpen}>
          Gym<span>Bros</span>
        </LogoText>
      </LogoWrapper>

      <Menu>
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            to={item.path}
            isOpen={isOpen}
            // location.pathname kiritilgan path bilan bir xil bo'lsa true qaytadi
            $active={location.pathname === item.path}
          >
            {item.icon}
            <ItemText isOpen={isOpen}>{item.label}</ItemText>
          </MenuItem>
        ))}
      </Menu>

      <LogoutBtn isOpen={isOpen} onClick={handleLogout}>
        <FiLogOut size={20} />
        <ItemText isOpen={isOpen}>Logout</ItemText>
      </LogoutBtn>
    </Container>
  );
};

export default Sidebar;
