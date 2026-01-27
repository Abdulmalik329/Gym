import styled, { keyframes } from "styled-components";

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

// --- SKELETON LOADER STYLES ---

const shimmer = keyframes`
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
`;

// 1. (YANGI) Sarlavha qismi uchun o'rovchi
export const SkeletonHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* Katta va kichik yozuv orasidagi masofa */
  margin-bottom: 30px;
`;

// 2. Asosiy Skeleton elementi
export const SkeletonBox = styled.div<{
  $height?: string;
  $width?: string;
  $mb?: string;
}>`
  height: ${(props) => props.$height || "20px"};
  width: ${(props) => props.$width || "100%"};
  margin-bottom: ${(props) => props.$mb || "0"};
  background: #1a2634;
  background-image: linear-gradient(
    to right,
    #1a2634 0%,
    #233040 20%,
    #1a2634 40%,
    #1a2634 100%
  );
  background-repeat: no-repeat;
  background-size: 2000px 100%;
  display: block; /* inline-block dan block ga o'zgartirildi, to'g'ri joylashishi uchun */
  border-radius: 16px;
  animation: ${shimmer} 1.5s infinite linear forwards;
`;

// 3. Gridlar uchun skeleton
export const SkeletonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;
