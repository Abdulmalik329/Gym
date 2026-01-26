import styled from "styled-components";

export const PaymentHistoryCard = styled.div`
  background-color: #1a2634;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #2a3b4c;
`;

export const PaymentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Label = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #6b7a8f;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const PaymentTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.tr`
  th {
    text-align: left;
    font-size: 11px;
    font-weight: 600;
    color: #6b7a8f;
    letter-spacing: 1px;
    padding-bottom: 16px;
    border-bottom: 1px solid #2a3b4c;
  }
`;

export const TableRow = styled.tr`
  &:not(:last-child) td {
    border-bottom: 1px solid #2a3b4c;
  }
`;

export const TableCell = styled.td`
  padding: 16px 0;
  font-size: 14px;
  color: #ffffff;
  font-weight: 500;

  &:first-child {
    color: #8b98a8;
  }
`;
