import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  max-width: 830px;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: #101922;
  color: white;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const Header = styled.div`
  margin-bottom: 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin: 0;
`;

export const ClearButton = styled.button`
  background: transparent;
  border: 1px solid #2a3b4c;
  color: #8b98a8;
  padding: 8px 16px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: white;
    border-color: white;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 800px;
  margin: 0 auto;
`;

export const NotificationCard = styled.div<{ type: string }>`
  background-color: #1a2634;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-left: 4px solid
    ${(props) => {
      switch (props.type) {
        case "success":
          return "#10b981"; // Yashil (To'lov, Keldi)
        case "warning":
          return "#f59e0b"; // Sariq (Streak, Ogohlantirish)
        case "danger":
          return "#ef4444"; // Qizil (Kelmadi)
        case "info":
          return "#3b82f6"; // Ko'k (Profil)
        default:
          return "#6b7a8f";
      }
    }};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;

  &:hover {
    transform: translateX(5px);
    background-color: #233040;
  }
`;

export const IconWrapper = styled.div<{ type: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  flex-shrink: 0;
  background-color: ${(props) => {
    switch (props.type) {
      case "success":
        return "rgba(16, 185, 129, 0.15)";
      case "warning":
        return "rgba(245, 158, 11, 0.15)";
      case "danger":
        return "rgba(239, 68, 68, 0.15)";
      case "info":
        return "rgba(59, 130, 246, 0.15)";
      default:
        return "rgba(107, 122, 143, 0.15)";
    }
  }};
  color: ${(props) => {
    switch (props.type) {
      case "success":
        return "#10b981";
      case "warning":
        return "#f59e0b";
      case "danger":
        return "#ef4444";
      case "info":
        return "#3b82f6";
      default:
        return "#6b7a8f";
    }
  }};
`;

export const Content = styled.div`
  flex: 1;
`;

export const MessageTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  margin: 0 0 4px 0;
  color: #fff;
`;

export const MessageBody = styled.p`
  font-size: 14px;
  color: #8b98a8;
  margin: 0 0 8px 0;
  line-height: 1.4;
`;

export const Time = styled.span`
  font-size: 12px;
  color: #556270;
  font-weight: 500;
`;

const shimmer = keyframes`
  0% { background-position: -468px 0; }
  100% { background-position: 468px 0; }
`;

export const SkeletonPulse = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
  marginBottom?: string;
}>`
  display: block;
  height: ${(props) => props.height || "100%"};
  width: ${(props) => props.width || "100%"};
  border-radius: ${(props) => props.borderRadius || "4px"};
  margin-bottom: ${(props) => props.marginBottom || "0"};
  background: #233040; /* Card ichidagi element rangi */
  background-image: linear-gradient(
    to right,
    #233040 0%,
    #2a3b4c 20%,
    /* Yaltirash rangi */ #233040 40%,
    #233040 100%
  );
  background-repeat: no-repeat;
  background-size: 800px 100%;
  animation: ${shimmer} 1.2s linear infinite forwards;
`;

export const SkeletonCard = styled.div`
  background-color: #1a2634;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: flex-start;
  gap: 16px;
  border-left: 4px solid #2a3b4c; /* Neytral border */
`;