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

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const DateText = styled.p`
  color: #94a3b8;
  font-size: 14px;
`;

/* ================= TOP CARDS GRID ================= */
export const TopGrid = styled.div`
  display: grid;
  /* Katta ekranda 2 ta ustun, kichik ekranda 1 ta */
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media (max-width: 768px) {
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
  font-size: 28px;
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
  font-size: 36px;
  font-weight: 800;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 15px;
  color: #9ca3af;
  font-weight: 500;
`;

/* ================= ATTENDANCE SECTION (BOTTOM) ================= */
export const AttendanceSection = styled.div`
  background: #1f2937;
  border-radius: 20px;
  border: 1px solid #374151;
  padding: 32px;
  display: flex;
  gap: 40px;

  /* Mobil versiya: Chart pastga tushadi */
  @media (max-width: 1024px) {
    flex-direction: column;
    gap: 32px;
    padding: 24px;
  }
`;

export const AttendanceInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px;
`;

export const AttendanceChartWrapper = styled.div`
  flex: 2;
  height: 320px;
  width: 100%;

  @media (max-width: 600px) {
    height: 250px;
  }
`;

export const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
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
  font-size: 48px;
  font-weight: 800;
  color: #fff;
  line-height: 1;

  span {
    font-size: 24px;
    color: #64748b;
    font-weight: 600;
  }
`;
