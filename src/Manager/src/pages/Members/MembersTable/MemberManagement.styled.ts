import styled from "styled-components";

export const Wrapper = styled.div`
  background: #0f1318;
  border-radius: 12px;
  border: 1px solid #1f2937;
  padding: 24px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 18px;
  font-weight: 600;
  margin: 0;
`;

export const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

export const ActionBtn = styled.button`
  background: #1f2937;
  border: 1px solid #374151;
  color: #e5e7eb;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #374151;
    color: #fff;
  }
`;

export const Table = styled.div`
  width: 100%;
  overflow-x: auto;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1.5fr;
  align-items: center;
  padding: 14px 12px;
  border-bottom: 1px solid #1f2937;
  min-width: 800px;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
`;

export const HeadRow = styled(Row)`
  padding: 12px;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  background-color: #111827;
  border-radius: 6px 6px 0 0;
  border-bottom: none;
`;

export const Cell = styled.div`
  font-size: 14px;
  color: #d1d5db;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
`;

export const Member = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 14px;
  font-weight: 600;
`;

export const Name = styled.div`
  font-weight: 500;
  color: #f3f4f6;
`;

export const Sub = styled.div`
  font-size: 12px;
  color: #6b7280;
`;

// --- STATUS BADGE (CLICKABLE) ---
export const StatusBadge = styled.button<{ $active: boolean }>`
  background-color: ${(props) =>
    props.$active ? "rgba(16, 185, 129, 0.1)" : "rgba(239, 68, 68, 0.1)"};
  color: ${(props) => (props.$active ? "#34d399" : "#f87171")};
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid
    ${(props) =>
      props.$active ? "rgba(16, 185, 129, 0.2)" : "rgba(239, 68, 68, 0.2)"};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    opacity: 0.8;
    transform: scale(1.05);
  }
`;

export const BtnGroup = styled.div`
  display: flex;
  gap: 8px;
`;

export const IconBtn = styled.button<{ $variant: "primary" | "secondary" }>`
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  font-size: 12px;
  cursor: pointer;
  color: #fff;
  background-color: ${(props) =>
    props.$variant === "primary" ? "#2563eb" : "#374151"};
  transition: 0.2s;

  &:hover {
    background-color: ${(props) =>
      props.$variant === "primary" ? "#1d4ed8" : "#4b5563"};
  }

  &:disabled {
    background-color: #1f2937;
    color: #4b5563;
    cursor: not-allowed;
  }
`;

export const Footer = styled.div`
  padding-top: 16px;
  font-size: 12px;
  color: #6b7280;
`;

export const ErrorText = styled.div`
  color: #f87171;
  margin-bottom: 12px;
  font-size: 13px;
`;

export const Loading = styled.div`
  color: #9ca3af;
  padding: 20px;
  text-align: center;
  font-size: 13px;
`;

// Modal Styles
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
`;

export const ModalContent = styled.div`
  background: #1f2937;
  width: 400px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid #374151;
`;

export const ModalHeader = styled.div`
  padding: 16px;
  background: #111827;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #374151;

  h3 {
    color: #fff;
    font-size: 15px;
    margin: 0;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 20px;
  cursor: pointer;
  &:hover {
    color: #fff;
  }
`;

export const ModalBody = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid #374151;
  color: #d1d5db;
  font-size: 13px;
  .date {
    color: #9ca3af;
    font-size: 12px;
  }
`;
