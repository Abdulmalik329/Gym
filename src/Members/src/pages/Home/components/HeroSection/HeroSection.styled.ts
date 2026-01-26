import styled from "styled-components";

export const HeroImage = styled.div<{ backgroundImage: string }>`
  width: 100%;
  height: 280px;
  background:
    linear-gradient(to bottom, rgba(16, 25, 34, 0.3), rgba(16, 25, 34, 0.7)),
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
