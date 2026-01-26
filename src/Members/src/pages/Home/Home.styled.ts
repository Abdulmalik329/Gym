import styled from "styled-components";

export const Container = styled.div`
  min-height: 100vh;
  background-color: #101922;
  color: #ffffff;
  padding: 40px 80px;
  font-family:
    -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu",
    sans-serif;

  @media (max-width: 1024px) {
    padding: 24px 40px;
  }

  @media (max-width: 768px) {
    padding: 16px 20px;
  }
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

export const LoadingTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
`;
