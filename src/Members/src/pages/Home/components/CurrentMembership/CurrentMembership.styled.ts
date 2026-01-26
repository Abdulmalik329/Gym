import styled from "styled-components";

export const MembershipCard = styled.div`
  background-color: #1a2634;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid #2a3b4c;
`;

export const CardHeader = styled.div`
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

export const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const MembershipDetails = styled.div`
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

export const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Value = styled.div`
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
`;

export const StatusBadge = styled.div`
  font-size: 14px;
  color: #10b981;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;
