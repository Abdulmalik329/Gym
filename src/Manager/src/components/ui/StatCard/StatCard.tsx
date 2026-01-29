import styled from "styled-components";

const Card = styled.div<{ clickable?: boolean }>`
  background: linear-gradient(180deg, #0f1318, #0b0e13);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid #1f2937;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  overflow: hidden;
  cursor: ${({ clickable }) => (clickable ? "pointer" : "default")};
  transition: transform 0.2s;

  &:hover {
    transform: ${({ clickable }) => (clickable ? "translateY(-2px)" : "none")};
  }
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const IconBox = styled.div<{ color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 10px;
  background: ${({ color }) => color};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.p`
  font-size: 14px;
  color: #9ca3af;
`;

const Value = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #fff;
`;

const Change = styled.span<{ positive?: boolean }>`
  font-size: 13px;
  font-weight: 500;
  color: ${({ positive }) => (positive ? "#22c55e" : "#ef4444")};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background: #1f2937;
  border-radius: 10px;
  overflow: hidden;
`;

const Progress = styled.div<{ width: number }>`
  height: 100%;
  width: ${({ width }) => width}%;
  background: linear-gradient(90deg, #3b82f6, #60a5fa);
`;

type Props = {
  title: string;
  value: string | number;
  change?: string;
  progress?: number;
  icon?: React.ReactNode;
  positive?: boolean;
  iconColor?: string;
  onClick?: () => void; // 🔹 Qo‘shildi
};

const StatCard = ({
  title,
  value,
  change,
  progress,
  icon,
  positive,
  iconColor = "#1f2937",
  onClick,
}: Props) => {
  return (
    <Card clickable={!!onClick} onClick={onClick}>
      <Top>
        <IconBox color={iconColor}>{icon}</IconBox>
        {change && <Change positive={positive}>{change}</Change>}
      </Top>

      <Title>{title}</Title>
      <Value>{value}</Value>

      {progress !== undefined && (
        <ProgressBar>
          <Progress width={progress} />
        </ProgressBar>
      )}
    </Card>
  );
};

export default StatCard;
