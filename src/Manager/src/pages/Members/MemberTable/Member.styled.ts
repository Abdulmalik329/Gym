import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  color: #fff;
  font-size: 22px;
  font-weight: 700;
  margin: 0;
`;

export const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Btn = styled.button`
  padding: 10px 14px;
  border-radius: 10px;
  border: 1px solid #1f2937;
  background: #3b82f6;
  color: #fff;
  cursor: pointer;

  &:hover {
    opacity: 0.95;
  }

  &:active {
    transform: scale(0.99);
  }
`;

export const Card = styled.div`
  background: linear-gradient(180deg, #0b1220, #020617);
  border: 1px solid #1f2937;
  border-radius: 18px;
  overflow: hidden;
`;

export const HeadRow = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 2fr 1.6fr 1.2fr 40px;
  gap: 12px;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #1f2937;

  font-size: 12px;
  color: #64748b;
  text-transform: uppercase;

  @media (max-width: 900px) {
    grid-template-columns: 2.4fr 2fr 40px;

    > div:nth-child(3),
    > div:nth-child(4) {
      display: none;
    }
  }
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 2.4fr 2fr 1.6fr 1.2fr 40px;
  gap: 12px;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #1f2937;

  @media (max-width: 900px) {
    grid-template-columns: 2.4fr 2fr 40px;

    > div:nth-child(3),
    > div:nth-child(4) {
      display: none;
    }
  }
`;

export const Cell = styled.div`
  font-size: 14px;
  color: #e5e7eb;
`;

export const MemberCell = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const Avatar = styled.img`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  object-fit: cover;
`;

export const Name = styled.div`
  font-weight: 700;
  color: #fff;
`;

export const Sub = styled.div`
  font-size: 12px;
  color: #94a3b8;
`;

export const Status = styled.span`
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 600;
  background: rgba(34, 197, 94, 0.15);
  color: #22c55e;
`;

export const Kebab = styled.div`
  text-align: right;
  color: #94a3b8;
  cursor: pointer;
  user-select: none;

  &:hover {
    color: #e5e7eb;
  }
`;

export const Loading = styled.div`
  color: #fff;
  padding: 16px;
`;

export const ErrorBox = styled.div`
  padding: 16px;
  color: #fecaca;
  background: rgba(239, 68, 68, 0.08);
  border: 1px solid rgba(239, 68, 68, 0.25);
  border-radius: 14px;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 14px 16px;
  font-size: 13px;
  color: #94a3b8;
`;
