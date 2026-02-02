import styled, { keyframes, css } from "styled-components";

// --- Animatsiyalar ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// --- Asosiy Layout ---
export const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px 20px 40px;
  animation: ${fadeIn} 0.5s ease-out;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Title = styled.h1`
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
`;

export const Subtitle = styled.p`
  color: #94a3b8;
  font-size: 16px;
  margin-bottom: 8px;
  line-height: 1.5;
  max-width: 600px;
`;

// --- Karta Dizayni ---
export const Card = styled.div`
  background: linear-gradient(145deg, #111827, #0f172a);
  border: 1px solid #1f2937;
  border-radius: 24px;
  padding: clamp(20px, 4vw, 32px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    border-color 0.2s;

  &:hover {
    border-color: #374151;
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #1f2937;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CardTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: "";
    width: 4px;
    height: 20px;
    background: #3b82f6;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
  }
`;

// --- Form Elementlari ---
export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 20px;
  align-items: end;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border-radius: 12px;
  background: #1f2937;
  border: 1px solid #374151;
  color: #ffffff;
  font-size: 15px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// --- TOG'RILANGAN/QO'SHILGAN KOMPONENTLAR ---

export const Divider = styled.div`
  height: 1px;
  background: #1f2937;
  margin: 32px 0;
  width: 100%;
`;

export const Hint = styled.p`
  margin: 6px 0 0;
  font-size: 13px;
  color: #64748b;
  line-height: 1.4;
`;

export const CodeRow = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  margin: 24px 0;
`;

export const CodeInput = styled.input`
  width: 48px;
  height: 56px;
  border-radius: 12px;
  border: 2px solid #374151;
  background: #1f2937;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: #111827;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(59, 130, 246, 0.15);
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 48px;
    font-size: 18px;
  }
`;

// --- Tugmalar ---
export const Button = styled.button<{ $loading?: boolean }>`
  padding: 14px 24px;
  border-radius: 12px;
  background: #3b82f6;
  color: #ffffff;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SecondaryButton = styled(Button)`
  background: #1f2937;
  border: 1px solid #374151;
  color: #e2e8f0;

  &:hover:not(:disabled) {
    background: #374151;
    box-shadow: none;
  }
`;

// --- Xabarlar ---
const baseMessage = css`
  margin: 16px 0;
  padding: 14px;
  border-radius: 12px;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  animation: ${fadeIn} 0.3s ease;
`;

export const ErrorText = styled.div`
  ${baseMessage}
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
`;

export const SuccessText = styled.div`
  ${baseMessage}
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid rgba(16, 185, 129, 0.2);
  color: #6ee7b7;
`;

// --- Avatar ---
export const AvatarRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 10px 0;
`;

export const AvatarImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #3b82f6;
  padding: 2px;
  background: #0f172a;
`;

export const AvatarFallback = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 28px;
  font-weight: 700;
  color: white;
  border: 3px solid #1f2937;
`;
