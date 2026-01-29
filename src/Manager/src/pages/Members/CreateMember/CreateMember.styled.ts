import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 24px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

export const Card = styled.div`
  background: linear-gradient(180deg, #0f172a, #0b1220);
  border: 1px solid #1f2937;
  border-radius: 18px;
  padding: 28px;
  color: #e5e7eb;
`;

export const Header = styled.div`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  font-size: 26px;
  font-weight: 800;
  color: #fff;
  margin: 0;
`;

export const Subtitle = styled.p`
  font-size: 14px;
  color: #94a3b8;
  margin: 8px 0 0;
`;

export const Steps = styled.div`
  display: flex;
  gap: 16px;
  margin: 28px 0;
`;

/* ✅ active -> $active */
export const StepItem = styled.div<{ $active: boolean }>`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${({ $active }) => ($active ? 1 : 0.4)};
  transition: opacity 0.3s;
`;

/* ✅ active -> $active */
export const StepCircle = styled.div<{ $active: boolean }>`
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#3b82f6" : "#1f2937")};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  transition: all 0.3s ease;
  color: #fff;
`;

export const StepLabel = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const SectionTitle = styled.h3`
  margin-bottom: 18px;
  color: #e5e7eb;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;

  @media (max-width: 520px) {
    grid-template-columns: 1fr;
  }
`;

export const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #94a3b8;
`;

export const Input = styled.input`
  background: #020617;
  border: 1px solid #1f2937;
  border-radius: 10px;
  padding: 12px;
  color: #e5e7eb;
  transition: border-color 0.2s;
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
`;

export const UploadBox = styled.div`
  grid-column: span 2;
  border: 2px dashed #1f2937;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  background: #020617;
  cursor: pointer;
  transition: border 0.2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const PreviewImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid #3b82f6;
`;

/* ✅ active -> $active */
export const PlanCard = styled.div<{ $active?: boolean }>`
  padding: 20px;
  border-radius: 14px;
  border: 1px solid ${({ $active }) => ($active ? "#3b82f6" : "#1f2937")};
  background: ${({ $active }) =>
    $active ? "rgba(59, 130, 246, 0.1)" : "#020617"};
  color: #e5e7eb;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;

  &:hover {
    border-color: #3b82f6;
    transform: translateY(-2px);
  }
`;

export const PlanTag = styled.span`
  position: absolute;
  top: 10px;
  right: 10px;
  background: #3b82f6;
  color: white;
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  font-weight: bold;
`;

/* ✅ active -> $active */
export const Option = styled.button<{ $active?: boolean }>`
  padding: 16px;
  border-radius: 14px;
  border: 1px solid ${({ $active }) => ($active ? "#3b82f6" : "#1f2937")};
  background: ${({ $active }) =>
    $active ? "rgba(59, 130, 246, 0.1)" : "#020617"};
  color: #e5e7eb;
  font-weight: 700;
  cursor: pointer;
  text-align: center;
  transition: all 0.2s ease;

  &:hover {
    border-color: #3b82f6;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 28px;
`;

/* ✅ primary -> $primary */
export const Button = styled.button<{ $primary?: boolean }>`
  padding: 12px 22px;
  border-radius: 12px;
  border: ${({ $primary }) => ($primary ? "none" : "1px solid #334155")};
  background: ${({ $primary }) => ($primary ? "#3b82f6" : "transparent")};
  color: #e5e7eb;
  font-weight: 800;
  cursor: pointer;
  transition: opacity 0.2s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #cbd5e1;
`;

export const Divider = styled.hr`
  border: 0;
  border-top: 1px solid #1f2937;
  margin: 16px 0;
`;

export const Total = styled.div`
  margin-top: 18px;
  font-size: 24px;
  font-weight: 900;
  color: #3b82f6;
  text-align: right;
`;
