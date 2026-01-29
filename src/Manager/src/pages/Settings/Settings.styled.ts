// Settings.styled.ts
import styled from "styled-components";

export const Page = styled.div`
  padding: 32px;
  max-width: 900px;
`;

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 900;
  color: #ffffff;
  margin-bottom: 6px;
`;

export const Subtitle = styled.p`
  color: #94a3b8;
  margin-bottom: 32px;
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 18px;
  padding: 24px;
  margin-bottom: 24px;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 16px;
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border};
  margin: 24px 0;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 16px;
  align-items: end;

  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  padding: 12px 14px;
  border-radius: 12px;
  background: ${({ theme }) => theme.colors.sidebar};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: #ffffff;
  font-size: 14px;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export const Button = styled.button`
  padding: 12px 20px;
  border-radius: 12px;
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(Button)`
  background: #1e293b;

  &:hover {
    background: #334155;
  }
`;

export const Hint = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  color: #94a3b8;
`;

export const ErrorText = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  color: #fb7185;
`;

export const SuccessText = styled.p`
  margin: 10px 0 0;
  font-size: 13px;
  color: #34d399;
`;

export const CodeRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

export const CodeInput = styled.input`
  width: 48px;
  height: 52px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.sidebar};
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 18px;
`;

export const AvatarImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.colors.border};
  object-fit: cover;
`;

export const AvatarFallback = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #1e293b;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 800;
  color: #ffffff;
`;
