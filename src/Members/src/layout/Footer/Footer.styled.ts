import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #1a2634;
  border-top: 1px solid #2a3b4c;
  margin-top: 80px;
`;

export const FooterContent = styled.div`
  max-width: 1395px;
  margin: 0 auto;
  padding: 60px 80px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 60px;

  @media (max-width: 1024px) {
    padding: 48px 40px 32px;
    gap: 48px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 40px 20px 24px;
    gap: 32px;
    align-items: flex-start;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const LogoIcon = styled.div`
  color: #2b8feb;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const LogoText = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.5px;

  span {
    color: #2b8feb;
  }
`;

export const FooterDescription = styled.p`
  font-size: 14px;
  color: #8b98a8;
  line-height: 1.6;
  margin: 0;
  max-width: 300px;
`;

export const LinksSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

export const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LinkTitle = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const LinkList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const LinkItem = styled.a`
  font-size: 14px;
  color: #8b98a8;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #2b8feb;
  }
`;

export const BottomSection = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px 80px;
  border-top: 1px solid #2a3b4c;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 1024px) {
    padding: 24px 40px;
  }

  @media (max-width: 768px) {
    padding: 20px;
    flex-direction: column;
    gap: 20px;
  }
`;

export const Copyright = styled.p`
  font-size: 13px;
  color: #6b7a8f;
  margin: 0;
`;

export const SocialLinks = styled.div`
  display: flex;
  gap: 12px;
`;

export const SocialIcon = styled.a`
  width: 36px;
  height: 36px;
  background-color: #2a3b4c;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8b98a8;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #2b8feb;
    color: #ffffff;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
