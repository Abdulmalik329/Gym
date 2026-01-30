import styled from "styled-components";

/* ================= STYLED COMPONENTS ================= */

export const Wrapper = styled.div`
  background: linear-gradient(180deg, #0f1318, #0b0e13);
  border-radius: 20px;
  border: 1px solid #1f2937;
  padding: 24px;

  /* Mobil uchun paddingni kamaytiramiz */
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 18px;

  /* Mobil uchun: Sarlavha va tugmalarni ustma-ust tushirish */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
`;

export const Title = styled.h2`
  color: #fff;
  font-size: 20px;
  font-weight: 600;

  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const Controls = styled.div`
  display: flex;
  gap: 10px;

  /* Mobil uchun: Tugmalarni to'liq ekranga yoyish */
  @media (max-width: 600px) {
    width: 100%;
    justify-content: space-between;
  }
`;

export const ActionBtn = styled.button`
  background: #111827;
  border: 1px solid #1f2937;
  color: #fff;
  padding: 8px 14px;
  border-radius: 10px;
  font-size: 13px;
  cursor: pointer;
  white-space: nowrap; /* Matnni sig'dirish uchun */

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    flex: 1; /* Tugmalar teng bo'linadi */
    display: flex;
    justify-content: center;
  }
`;

export const Table = styled.div`
  width: 100%;
  /* RESPONSIVE TABLE MAGIC */
  overflow-x: auto; /* Sig'masa scroll bo'ladi */

  /* Scrollbar dizayni (Dark mode) */
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #111827;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #4b5563;
  }
`;

export const Row = styled.div`
  display: grid;
  /* Grid ustunlar o'lchami */
  grid-template-columns: 2.2fr 1.6fr 1.2fr 1.2fr 0.8fr;
  align-items: center;
  padding: 16px 12px;
  border-bottom: 1px solid #1f2937;

  /* MUHIM: Jadval minimal kengligi. 
     Agar ekran bundan kichik bo'lsa, scroll paydo bo'ladi.
     Bu jadval siqilib xunuk bo'lib qolishini oldini oladi. */
  min-width: 800px;
`;

export const HeadRow = styled(Row)`
  padding: 12px;
  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;
  background-color: rgba(17, 24, 39, 0.5); /* Header foni */
  border-radius: 8px 8px 0 0;
`;

export const Cell = styled.div`
  font-size: 14px;
  color: #e5e7eb;
  white-space: nowrap; /* So'zlar pastga tushib ketmasligi uchun */
  overflow: hidden;
  text-overflow: ellipsis; /* Sig'masa ... qo'yadi */
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
  flex-shrink: 0; /* Avatar ezilib qolmasligi uchun */
`;

export const Name = styled.div`
  font-weight: 600;
  color: #fff;
`;

export const Sub = styled.div`
  font-size: 12px;
  color: #64748b;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 14px;
  font-size: 12px;
  color: #64748b;

  @media (max-width: 600px) {
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
`;

export const ErrorText = styled.div`
  color: #fecaca;
  margin-bottom: 12px;
  font-size: 13px;
`;

export const Loading = styled.div`
  color: #fff;
  padding: 12px 0;
  text-align: center; /* Loading o'rtada turishi uchun */
`;
