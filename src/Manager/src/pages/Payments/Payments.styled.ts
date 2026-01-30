import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const Wrapper = styled.div`
  background: linear-gradient(180deg, #0f1318, #0b0e13);
  border-radius: 20px;
  border: 1px solid #1f2937;
  padding: 24px;
  min-height: 80vh;

  /* Mobil uchun paddingni kamaytiramiz */
  @media (max-width: 768px) {
    padding: 16px;
    border-radius: 12px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  /* Mobilda sarlavha chapda qolaveradi, agar knopka qo'shilsa pastga tushadi */
  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 500px) {
    font-size: 18px;
  }
`;

/* ================= RESPONSIVE TABLE ================= */
export const Table = styled.div`
  width: 100%;
  overflow-x: auto; /* Sig'masa scroll bo'ladi */

  /* Scrollbar dizayni */
  &::-webkit-scrollbar {
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 4px;
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 2fr 1.5fr 1fr;
  align-items: center;
  padding: 16px 12px;
  border-bottom: 1px solid #1f2937;
  cursor: pointer;
  transition: background 0.2s;

  /* Muhim: Kichik ekranda jadval siqilmasligi uchun minimal kenglik */
  min-width: 700px;

  &:hover {
    background: rgba(31, 41, 55, 0.4);
  }
`;

export const HeadRow = styled(Row)`
  padding: 12px;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  cursor: default;
  background: rgba(17, 24, 39, 0.5);
  border-radius: 8px 8px 0 0;
  &:hover {
    background: rgba(17, 24, 39, 0.5);
  }
`;

export const Cell = styled.div`
  font-size: 14px;
  color: #e5e7eb;
  white-space: nowrap;
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
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: white;
  font-size: 14px;
  flex-shrink: 0;
`;

/* ================= RESPONSIVE MODAL ================= */
export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.75);
  backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px; /* Chetlaridan joy qoldirish */
`;

export const ModalContent = styled.div`
  background: #111418;
  border: 1px solid #1f2937;
  border-radius: 16px;
  width: 100%;
  max-width: 480px;
  padding: 24px;
  animation: ${fadeIn} 0.2s ease-out;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;

  /* Mobil uchun */
  @media (max-width: 500px) {
    padding: 20px;
    max-width: 100%;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
`;

export const CloseBtn = styled.button`
  background: transparent;
  border: none;
  color: #64748b;
  font-size: 24px;
  cursor: pointer;
  line-height: 1;
  padding: 4px;
  &:hover {
    color: #fff;
  }
`;

export const UserInfo = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #1f2937;
`;

export const UserName = styled.h3`
  color: #fff;
  font-size: 18px;
  margin-bottom: 4px;
`;

export const UserDetail = styled.p`
  color: #94a3b8;
  font-size: 13px;
`;

/* ================= FORM STYLES ================= */
export const Tabs = styled.div`
  display: flex;
  background: #1f2937;
  padding: 4px;
  border-radius: 10px;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 10px;
  border-radius: 8px;
  border: none;
  background: ${(p) => (p.$active ? "#3b82f6" : "transparent")};
  color: ${(p) => (p.$active ? "#fff" : "#94a3b8")};
  font-weight: 600;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    color: #fff;
  }
`;

export const Label = styled.label`
  display: block;
  font-size: 12px;
  color: #94a3b8;
  margin-bottom: 6px;
  font-weight: 600;
`;

export const Input = styled.input`
  width: 100%;
  background: #0b0e13;
  border: 1px solid #1f2937;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const Select = styled.select`
  width: 100%;
  background: #0b0e13;
  border: 1px solid #1f2937;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
  margin-bottom: 16px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  margin-bottom: 24px;

  /* Mobil uchun 2 qator qilish */
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const MethodCard = styled.div<{ $active: boolean }>`
  border: 1px solid ${(p) => (p.$active ? "#3b82f6" : "#1f2937")};
  background: ${(p) => (p.$active ? "rgba(59, 130, 246, 0.1)" : "#0b0e13")};
  color: ${(p) => (p.$active ? "#3b82f6" : "#94a3b8")};
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const PayButton = styled.button`
  width: 100%;
  background: #2563eb;
  color: white;
  border: none;
  padding: 14px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #1d4ed8;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const Loading = styled.div`
  color: #fff;
  padding: 40px;
  text-align: center;
  font-size: 14px;
  color: #94a3b8;
`;
