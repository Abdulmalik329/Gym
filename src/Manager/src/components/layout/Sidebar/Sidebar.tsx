import React from "react";
// Agar react-icons bo'lmasa o'rnating: npm install react-icons
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

interface Props {
  isOpen: boolean;
}

const Sidebar: React.FC<Props> = ({ isOpen }) => {
  return (
    <Container isOpen={isOpen}>
      <LogoWrapper isOpen={isOpen}>
        <LogoIcon>
          <FiCheck size={18} strokeWidth={4} />
        </LogoIcon>
        <LogoText isOpen={isOpen}>
          Gym<span>Bros</span>
        </LogoText>
      </LogoWrapper>

      <Menu>
        <MenuItem to="/manager/dashboard" isOpen={isOpen}>
          <FiGrid size={22} />
          <ItemText isOpen={isOpen}>Dashboard</ItemText>
        </MenuItem>

        <MenuItem to="/manager/members" isOpen={isOpen}>
          <FiUsers size={22} />
          <ItemText isOpen={isOpen}>Members</ItemText>
        </MenuItem>

        <MenuItem to="/manager/payments" isOpen={isOpen}>
          <FiCreditCard size={22} />
          <ItemText isOpen={isOpen}>Payments</ItemText>
        </MenuItem>

        <MenuItem to="/manager/reports" isOpen={isOpen}>
          <FiPieChart size={22} />
          <ItemText isOpen={isOpen}>Reports</ItemText>
        </MenuItem>

        <MenuItem to="/manager/settings" isOpen={isOpen}>
          <FiSettings size={22} />
          <ItemText isOpen={isOpen}>Settings</ItemText>
        </MenuItem>
      </Menu>

      <LogoutBtn
        isOpen={isOpen}
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }}
      >
        <FiLogOut size={20} />
        <ItemText isOpen={isOpen}>Logout</ItemText>
      </LogoutBtn>
    </Container>
  );
};

export default Sidebar;
