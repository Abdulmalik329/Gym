import styled from "styled-components";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export const Container = styled.aside<SidebarProps>`
  width: ${({ isOpen }) => (isOpen ? "260px" : "80px")};
  background: #111418;
  border-right: 1px solid #1f2937;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 20px 12px;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  flex-shrink: 0;
  z-index: 20;
`;

export const LogoWrapper = styled.div<{ isOpen: boolean }>`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  padding-left: ${({ isOpen }) => (isOpen ? "8px" : "0")};
  margin-bottom: 30px;
  white-space: nowrap;
`;

export const LogoIcon = styled.div`
  min-width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid #3b82f6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 14px;
`;

export const LogoText = styled.h1<{ isOpen: boolean }>`
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-left: 12px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  transition: opacity 0.2s;

  span {
    color: #3b82f6;
  }
`;

export const Menu = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
`;

export const MenuItem = styled(NavLink)<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  padding: 12px 14px;
  border-radius: 12px;
  color: #9ca3af;
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;
  height: 48px;
  transition: all 0.2s;
  white-space: nowrap;

  &.active {
    background: #1f2937;
    color: #fff;
    border-left: 3px solid #3b82f6;
  }

  &:hover:not(.active) {
    background: #1f2937;
    color: #e5e7eb;
  }
`;

export const ItemText = styled.span<{ isOpen: boolean }>`
  margin-left: 12px;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};
  transition: opacity 0.2s;
`;

export const LogoutBtn = styled.button<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ isOpen }) => (isOpen ? "flex-start" : "center")};
  width: 100%;
  padding: 12px 14px;
  margin-top: auto;
  background: transparent;
  border: 1px solid #ef4444;
  color: #ef4444;
  border-radius: 12px;
  cursor: pointer;
  height: 48px;
  transition: all 0.2s;

  &:hover {
    background: #ef4444;
    color: white;
  }
`;
