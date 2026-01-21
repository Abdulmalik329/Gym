import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: #101922;
  color: #ffffff;
  padding: 40px 80px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", sans-serif;

  @media (max-width: 1024px) {
    padding: 24px 40px;
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const WelcomeSection = styled.div`
  max-width: 600px;
`;

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0 0 12px 0;
  color: #ffffff;

  @media (max-width: 768px) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  font-size: 16px;
  color: #8b98a8;
  margin: 0;
  line-height: 1.5;
`;

export const HeroImage = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 280px;
  background: linear-gradient(
      to bottom,
      rgba(16, 25, 34, 0.3),
      rgba(16, 25, 34, 0.7)
    ),
    url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  border-radius: 16px;
  margin-bottom: 32px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
      circle at center,
      rgba(43, 143, 235, 0.15),
      transparent 70%
    );
  }
`;

export const WorkoutBadge = styled.div`
  background-color: rgba(43, 143, 235, 0.95);
  border-radius: 50%;
  width: 140px;
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 32px rgba(43, 143, 235, 0.4);
`;

export const BadgeNumber = styled.div`
  font-size: 40px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1;
`;

export const BadgeText = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 1px;
  margin-top: 4px;
  text-transform: uppercase;
`;

export const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const StatCard = styled.div`
  background: #1a2634;
  border-radius: 14px;
  padding: 24px;
  text-align: center;
  border: 1px solid #2a3b4c;
`;

export const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #ffffff;
`;

export const StatLabel = styled.div`
  font-size: 13px;
  color: #8b98a8;
  margin-top: 8px;
`;

export const MembershipCard = styled.div`
  background-color: #1a2634;
  border-radius: 16px;
  padding: 32px;
  margin-bottom: 32px;
  border: 1px solid #2a3b4c;
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const Label = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #6b7a8f;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-bottom: 8px;
`;

export const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
`;

export const MembershipDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const DetailRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Value = styled.div`
  font-size: 16px;
  color: #ffffff;
  font-weight: 500;
`;

export const StatusBadge = styled.div`
  font-size: 14px;
  color: #10b981;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const MainContent = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const AttendanceCard = styled.div`
  background-color: #1a2634;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #2a3b4c;
`;

export const AttendanceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
`;

export const StreakBadge = styled.div`
  background-color: rgba(43, 143, 235, 0.1);
  color: #2b8feb;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  border: 1px solid rgba(43, 143, 235, 0.3);
`;

export const VisitsCount = styled.div`
  display: flex;
  align-items: baseline;
  gap: 12px;
  margin-top: 8px;
`;

export const VisitsNumber = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
`;

export const WeekGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

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

export const StatusCell = styled.td`
  padding: 16px 0;
  font-size: 14px;
  color: #10b981;
  font-weight: 600;
`;

export const PerksCard = styled.div`
  background-color: #1a2634;
  border-radius: 16px;
  padding: 32px;
  border: 1px solid #2a3b4c;
`;

export const PerksTitle = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 24px 0;
`;

export const PerksList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const MotivationCard = styled.div`
  background: linear-gradient(135deg, #2b8feb, #1e6fbd);
  padding: 24px;
  border-radius: 16px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 20px rgba(43, 143, 235, 0.4);
`;

// --- PLANS (TARIFLAR) QISMI STILLARI ---

export const PlansSection = styled.div`
  margin-top: 48px;
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  text-align: center;
`;

export const PlansGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const PlanCard = styled.div<{ active?: boolean }>`
  background-color: ${(props) =>
    props.active ? "rgba(43, 143, 235, 0.1)" : "#1a2634"};
  border: 1px solid ${(props) => (props.active ? "#2b8feb" : "#2a3b4c")};
  border-radius: 16px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease, border-color 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-5px);
    border-color: #2b8feb;
  }

  ${(props) =>
    props.active &&
    `
    &::before {
      content: "JORIY REJA";
      position: absolute;
      top: 12px;
      right: 12px;
      background: #2b8feb;
      color: white;
      font-size: 10px;
      padding: 4px 8px;
      border-radius: 4px;
      font-weight: bold;
    }
  `}
`;

export const PlanName = styled.h3`
  font-size: 20px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 16px 0;
  text-transform: uppercase;
`;

export const PlanPrice = styled.div`
  font-size: 28px;
  font-weight: 800;
  color: #2b8feb;
  margin-bottom: 24px;

  span {
    font-size: 14px;
    color: #8b98a8;
    font-weight: 500;
  }
`;

export const PlanFeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0 0 32px 0;
  width: 100%;
`;

export const PlanFeatureItem = styled.li`
  color: #b0b8c4;
  font-size: 14px;
  padding: 8px 0;
  border-bottom: 1px solid #2a3b4c;

  &:last-child {
    border-bottom: none;
  }
`;

// PlanButton importda xato bermasligi uchun qoldirildi,
// lekin UI da ishlatilmasligi mumkin.
export const PlanButton = styled.button<{ active?: boolean }>`
  width: 100%;
  padding: 14px;
  border-radius: 8px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  background-color: ${(props) => (props.active ? "#10b981" : "#2b8feb")};
  color: white;
  transition: background 0.3s;

  &:hover {
    background-color: ${(props) => (props.active ? "#059669" : "#2380d8")};
  }
`;
