import styled from "styled-components";

export const AttendanceCard = styled.div`
  background-color: #1a2634;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #2a3b4c;
`;

export const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Label = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #6b7a8f;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export const StreakBadge = styled.div`
  background-color: rgba(43, 143, 235, 0.1);
  color: #2b8feb;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(43, 143, 235, 0.3);
`;

export const WeekGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
