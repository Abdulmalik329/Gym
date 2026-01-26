import styled from "styled-components";

export const SectionContainer = styled.div`
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
  transition:
    transform 0.3s ease,
    border-color 0.3s ease;
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
