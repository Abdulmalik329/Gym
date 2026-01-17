import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100%;
  background-color: #1a2634;
  border-bottom: 1px solid #2a3b4c;
  position: sticky;
  top: 0;
  z-index: 1000;
  backdrop-filter: blur(10px);
`;

export const NavbarContent = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 16px 40px;
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LogoIcon = styled.div`
  color: #2b8feb;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;

  ${LogoSection}:hover & {
    color: #2380d8;
  }
`;

export const LogoText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;

  span {
    color: #2b8feb;
    transition: color 0.3s ease;
  }

  ${LogoSection}:hover span {
    color: #2380d8;
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const NotificationButton = styled.button`
  position: relative;
  background-color: #2a3b4c;
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #8b98a8;

  &:hover {
    background-color: #3a4b5c;
    color: #ffffff;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 20px;
    height: 20px;
  }
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background-color: #ef4444;
  color: #ffffff;
  font-size: 10px;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 4px;
  border: 2px solid #1a2634;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0%,
    100% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.1);
    }
  }
`;

export const ProfileButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 50%;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(43, 143, 235, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const ProfileImage = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #2a3b4c;
  transition: border-color 0.3s ease;

  ${ProfileButton}:hover & {
    border-color: #2b8feb;
  }
`;
