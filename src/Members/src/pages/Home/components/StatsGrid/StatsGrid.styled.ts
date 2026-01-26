import styled from "styled-components";

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #1a2634;
  border-radius: 14px;
  padding: 24px;
  text-align: center;
  border: 1px solid #2a3b4c;
`;

export const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: #8b98a8;
  margin-top: 8px;
`;
