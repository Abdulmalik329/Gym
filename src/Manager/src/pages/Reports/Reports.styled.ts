import styled, { keyframes, css } from "styled-components";

// --- ANIMATIONS ---
const shimmer = keyframes`
  0% { background-position: -500px 0; }
  100% { background-position: 500px 0; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- LAYOUT ---
export const Container = styled.div`
  padding-bottom: 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  animation: ${fadeIn} 0.4s ease-out;
  width: 100%;
  max-width: 1600px;
  margin: 0 auto;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #94a3b8;
`;

// --- GRID SYSTEMS ---
export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

// --- CARDS ---
export const Card = styled.div`
  background: linear-gradient(145deg, #111827, #0f172a);
  border: 1px solid #1f2937;
  border-radius: 20px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
  transition:
    transform 0.2s,
    border-color 0.2s;

  &:hover {
    border-color: #374151;
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
`;

export const CardTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #9ca3af;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const CardValue = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  line-height: 1;
`;

export const Badge = styled.span<{
  type: "success" | "warning" | "primary" | "danger";
}>`
  font-size: 11px;
  font-weight: 700;
  padding: 4px 10px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  gap: 4px;

  ${(p) =>
    p.type === "success" &&
    css`
      background: rgba(34, 197, 94, 0.1);
      color: #4ade80;
      border: 1px solid rgba(34, 197, 94, 0.2);
    `}
  ${(p) =>
    p.type === "warning" &&
    css`
      background: rgba(245, 158, 11, 0.1);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.2);
    `}
  ${(p) =>
    p.type === "primary" &&
    css`
      background: rgba(59, 130, 246, 0.1);
      color: #60a5fa;
      border: 1px solid rgba(59, 130, 246, 0.2);
    `}
  ${(p) =>
    p.type === "danger" &&
    css`
      background: rgba(239, 68, 68, 0.1);
      color: #f87171;
      border: 1px solid rgba(239, 68, 68, 0.2);
    `}
`;

// --- LISTS & CHART ITEMS ---
export const ChartList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
`;

export const ChartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 13px;
`;

export const ProgressBarContainer = styled.div`
  flex: 1;
  height: 8px;
  background: #1f2937;
  border-radius: 4px;
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ width: number }>`
  height: 100%;
  width: ${(p) => p.width}%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
  border-radius: 4px;
  transition: width 1s ease-in-out;
`;

export const ListRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #1f2937;

  &:last-child {
    border-bottom: none;
  }
`;

export const RowText = styled.span`
  color: #e2e8f0;
  font-size: 14px;
  font-weight: 500;
`;
export const RowSubText = styled.span`
  color: #64748b;
  font-size: 12px;
`;

// --- TABLE STYLES ---
export const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;

  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 4px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  min-width: 600px;
`;

export const Thead = styled.thead`
  border-bottom: 1px solid #374151;
`;

export const Th = styled.th`
  text-align: left;
  padding: 16px;
  color: #94a3b8;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Tbody = styled.tbody``;

export const Tr = styled.tr`
  border-bottom: 1px solid #1f2937;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }
  &:hover {
    background: rgba(31, 41, 55, 0.4);
  }
`;

export const Td = styled.td`
  padding: 16px;
  color: #e2e8f0;
  font-size: 14px;
  vertical-align: middle;
`;

export const UserAvatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #374151;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  margin-right: 12px;
  text-transform: uppercase;
`;

export const UserInfoWrapper = styled.div`
  display: flex;
  align-items: center;
`;

// --- SKELETON & HEADERS ---
export const Skeleton = styled.div<{ h?: string; w?: string }>`
  height: ${(p) => p.h || "16px"};
  width: ${(p) => p.w || "100%"};
  border-radius: 6px;
  background: linear-gradient(90deg, #111827 25%, #1f2937 37%, #111827 63%);
  background-size: 400% 100%;
  animation: ${shimmer} 1.4s ease infinite;
`;

export const SectionHeader = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 4px;
    height: 18px;
    background: #3b82f6;
    border-radius: 2px;
    display: inline-block;
  }
`;
