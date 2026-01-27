import styled, { keyframes } from "styled-components";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  /* Navbar va Footerni yopish uchun asosiy konteyner */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  display: flex;
  justify-content: center;
  align-items: center;
  background: radial-gradient(circle at center, #1e3a5f 0%, #0f2233 100%);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    background: rgba(47, 128, 237, 0.15);
    filter: blur(80px);
    border-radius: 50%;
    top: 10%;
    right: 15%;
    animation: ${float} 6s ease-in-out infinite;
  }
`;

export const Card = styled.div`
  width: 100%;
  max-width: 420px;
  background: rgba(22, 47, 69, 0.7);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 32px;
  padding: 48px 40px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  color: #fff;
  position: relative;
  z-index: 1;
`;

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #fff 0%, #8fa6bc 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtitle = styled.p`
  text-align: center;
  font-size: 14px;
  color: #8fa6bc;
  margin-bottom: 35px;
  letter-spacing: 0.5px;
`;

export const Field = styled.div`
  margin-bottom: 24px;
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: #9bb0c4;
  display: block;
  margin-bottom: 8px;
  margin-left: 4px;
  text-transform: uppercase;
  letter-spacing: 0.8px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 52px;
  background: rgba(15, 34, 51, 0.6);
  border: 1px solid rgba(47, 128, 237, 0.2);
  border-radius: 16px;
  padding: 0 54px 0 18px;
  color: #fff;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(143, 166, 188, 0.5);
  }

  &:focus {
    border-color: #2f80ed;
    background: rgba(15, 34, 51, 0.9);
    box-shadow: 0 0 0 4px rgba(47, 128, 237, 0.15);
  }

  /* Parollar mos kelmaganda qizarishi */
  &[style*="border-color: red"] {
    border-color: #eb5757 !important;
    box-shadow: 0 0 0 4px rgba(235, 87, 87, 0.15) !important;
  }
`;

export const Toggle = styled.span`
  position: absolute;
  right: 18px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  color: #2f80ed;
  text-transform: uppercase;
  user-select: none;
  transition: color 0.2s;

  &:hover {
    color: #56ccf2;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 54px;
  margin-top: 15px;
  border-radius: 18px;
  border: none;
  background: linear-gradient(135deg, #2f80ed 0%, #56ccf2 100%);
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 25px rgba(47, 128, 237, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(47, 128, 237, 0.4);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
