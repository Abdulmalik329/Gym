import styled from "styled-components";

// --- LAYOUT & WRAPPER ---
export const Wrapper = styled.div`
  background: #0f1318;
  min-height: 100vh;
  padding: 24px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #d1d5db;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin: 0;
`;

export const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

// --- BUTTONS ---
export const ActionBtn = styled.button`
  background: #2563eb;
  border: 1px solid #2563eb;
  color: #fff;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;

  &:hover {
    background: #1d4ed8;
  }
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const IconBtn = styled.button<{
  $variant?: "primary" | "secondary" | "danger" | "edit";
}>`
  padding: 6px 12px;
  border-radius: 6px;
  border: 1px solid transparent;
  font-size: 12px;
  cursor: pointer;
  transition: 0.2s;
  font-weight: 500;

  ${(p) => {
    switch (p.$variant) {
      case "primary":
        return `
          background-color: #2563eb;
          color: white;
          &:hover { background-color: #1d4ed8; }
        `;
      case "danger":
        return `
          background-color: rgba(239, 68, 68, 0.1);
          color: #f87171;
          border-color: rgba(239, 68, 68, 0.2);
          &:hover { background-color: rgba(239, 68, 68, 0.2); }
        `;
      case "edit":
        return `
           background-color: rgba(56, 189, 248, 0.1);
           color: #38bdf8;
           border-color: rgba(56, 189, 248, 0.2);
           &:hover { background-color: rgba(56, 189, 248, 0.2); }
        `;
      default: // secondary
        return `
          background-color: #374151;
          color: #e5e7eb;
          border-color: #4b5563;
          &:hover { background-color: #4b5563; }
        `;
    }
  }}
`;

export const BtnGroup = styled.div`
  display: flex;
  gap: 8px;
`;

// --- TABLE STYLES ---
export const Table = styled.div`
  width: 100%;
  background: #111827; /* Darker bg for table area */
  border: 1px solid #1f2937;
  border-radius: 8px;
  overflow: hidden;
`;

export const Row = styled.div`
  display: grid;
  /* Gridni sahifaga qarab moslash uchun style prop ishlatiladi, default qiymat: */
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  align-items: center;
  padding: 14px 16px;
  border-bottom: 1px solid #1f2937;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.02);
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const HeadRow = styled(Row)`
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 700;
  color: #9ca3af;
  text-transform: uppercase;
  background-color: #1f2937; /* Header slightly lighter than body */
  border-bottom: 1px solid #374151;
  &:hover {
    background-color: #1f2937;
  } /* No hover effect on header */
`;

export const Cell = styled.div`
  font-size: 14px;
  color: #d1d5db;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
`;

// --- MEMBER SPECIFIC ---
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

// --- BADGES ---
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

// --- UTILS ---
export const Footer = styled.div`
  padding-top: 16px;
  font-size: 12px;
  color: #6b7280;
`;

export const ErrorText = styled.div`
  color: #f87171;
  background: rgba(239, 68, 68, 0.1);
  padding: 10px;
  border-radius: 6px;
  margin-bottom: 12px;
  font-size: 13px;
  border: 1px solid rgba(239, 68, 68, 0.2);
`;

export const Loading = styled.div`
  color: #9ca3af;
  padding: 20px;
  text-align: center;
  font-size: 13px;
`;

// --- MODAL STYLES ---
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(3px);
`;

export const ModalContent = styled.div`
  background: #111827;
  width: 500px;
  max-width: 90vw;
  border-radius: 12px;
  border: 1px solid #374151;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  max-height: 90vh;
`;

export const ModalHeader = styled.div`
  padding: 16px 24px;
  background: #1f2937;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #374151;
  border-radius: 12px 12px 0 0;

  h3 {
    color: #fff;
    font-size: 16px;
    margin: 0;
    font-weight: 600;
  }
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
  transition: 0.2s;
  &:hover {
    color: #fff;
  }
`;

export const ModalBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  color: #d1d5db;
`;

export const ModalFooter = styled.div`
  padding: 16px 24px;
  background: #1f2937;
  border-top: 1px solid #374151;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  border-radius: 0 0 12px 12px;
`;

// --- HISTORY LIST ---
export const HistoryList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-bottom: 1px solid #374151;
  font-size: 13px;

  &:last-child {
    border-bottom: none;
  }

  .date {
    color: #9ca3af;
    font-family: monospace;
    background: #374151;
    padding: 2px 6px;
    border-radius: 4px;
  }
`;

// --- FORMS (INPUTS) ---
export const FormGroup = styled.div`
  margin-bottom: 16px;

  label {
    display: block;
    margin-bottom: 6px;
    font-weight: 500;
    font-size: 13px;
    color: #9ca3af;
  }

  input,
  select,
  textarea {
    width: 100%;
    padding: 10px 12px;
    background: #0f1318; /* Dark input bg */
    border: 1px solid #374151;
    border-radius: 6px;
    color: #f3f4f6;
    font-size: 14px;
    outline: none;
    transition: all 0.2s;

    &:focus {
      border-color: #2563eb;
      box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
    }

    &::placeholder {
      color: #4b5563;
    }
  }

  textarea {
    min-height: 80px;
    resize: vertical;
  }
`;
