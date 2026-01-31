import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
  padding-bottom: 40px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  color: #ffffff;
  margin: 0;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const DateText = styled.p`
  color: #94a3b8;
  font-size: 14px;
  margin: 4px 0 0 0;
`;

/* ================= TOP CARDS GRID ================= */
export const TopGrid = styled.div`
  display: grid;
  // 3 ta karta uchun moslashtirildi
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #1f2937;
  border-radius: 20px;
  padding: 24px;
  border: 1px solid #374151;
  display: flex;
  flex-direction: column;
  gap: 16px;
  transition: transform 0.2s;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const IconBox = styled.div<{ $color: string; $bg: string }>`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: ${({ $bg }) => $bg};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
`;

export const PercentBadge = styled.div<{ $isPositive: boolean }>`
  font-size: 13px;
  font-weight: 700;
  padding: 6px 12px;
  border-radius: 99px;
  background: ${({ $isPositive }) =>
    $isPositive ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${({ $isPositive }) => ($isPositive ? "#10b981" : "#ef4444")};
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const StatValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 14px;
  color: #9ca3af;
  font-weight: 500;
`;

/* ================= CHARTS SECTION ================= */
export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// Attendance Section uchun maxsus card
export const AttendanceSection = styled.div`
  background: #1f2937;
  border-radius: 20px;
  border: 1px solid #374151;
  padding: 24px;
  display: flex;
  gap: 20px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const AttendanceInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;
  min-width: 150px;
`;

export const AttendanceChartWrapper = styled.div`
  flex: 2;
  height: 250px;
  width: 100%;
`;

// Umumiy Chart Card (Revenue va boshqalar uchun)
export const ChartCard = styled.div`
  background: #1f2937;
  border-radius: 20px;
  border: 1px solid #374151;
  padding: 24px;
  display: flex;
  flex-direction: column;
`;

export const SectionTitle = styled.h3`
  color: white;
  margin: 0 0 20px 0;
  font-size: 18px;
  font-weight: 600;
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #374151;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 10px;
`;

export const ProgressFill = styled.div<{ $width: number; $color: string }>`
  height: 100%;
  width: ${({ $width }) => $width}%;
  background: ${({ $color }) => $color};
  border-radius: 5px;
  transition: width 1s ease-in-out;
`;

export const LargeValue = styled.div`
  font-size: 36px;
  font-weight: 800;
  color: #fff;
  line-height: 1;

  span {
    font-size: 16px;
    color: #64748b;
    font-weight: 600;
    margin-left: 8px;
  }
`;

/* ================= EXPIRING LIST ================= */
export const ExpiringList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ExpiringItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid transparent;
  transition: 0.2s;

  &:hover {
    border-color: #ef4444;
    background: rgba(239, 68, 68, 0.05);
  }

  .user-info {
    .name {
      color: #fff;
      font-weight: 500;
      font-size: 14px;
    }
    .phone {
      color: #94a3b8;
      font-size: 12px;
      margin-top: 2px;
    }
  }

  .date-info {
    color: #f87171;
    font-size: 13px;
    font-weight: 500;
    background: rgba(239, 68, 68, 0.1);
    padding: 4px 10px;
    border-radius: 8px;
  }
`;
