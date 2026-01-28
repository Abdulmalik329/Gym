import styled from "styled-components";
/* Asosiy wrapper */
export const Wrapper = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Arial", sans-serif;
  overflow: hidden;
`;

/* Background video */
export const BgVideo = styled.video`
  position: fixed;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -3;
  transform: scale(1.5);
  background-size: cover;
  /* filter: blur(10px); */
`;

/* Qora overlay */
export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  /* background: rgba(0, 0, 0, 0.6); */
  z-index: -1;
`;

/* Login card */
export const LoginCard = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 400px;
  padding: 40px;

  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px);

  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);

  display: flex;
  flex-direction: column;
  align-items: center;
`;

/* Title */
export const Title = styled.h1`
  color: #fff;
  font-size: 32px;
  margin-bottom: 8px;
`;

/* Subtitle */
export const Subtitle = styled.p`
  color: #ccc;
  font-size: 14px;
  margin-bottom: 30px;
`;

/* Input */
export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 15px;

  border-radius: 8px;
  border: 1px solid transparent;
  outline: none;

  background: rgba(255, 255, 255, 0.85);
  font-size: 14px;

  &:focus {
    background: #fff;
    border-color: #2f80ed;
  }
`;
export const PasswordWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 15px; /* Input marginini shu yerga ko'chirdik */
`;

export const ToggleIcon = styled.button`
  /* Button qildik, click ishlashi uchun qulay */
  position: absolute;
  top: 50%;
   right: 15px;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #a0a0a0;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;

  &:hover {
    color: #2f80ed;
  }

  &:focus {
    outline: none;
  }
`;

/* Button */
export const Button = styled.button`
  width: 100%;
  padding: 12px;
  margin-top: 10px;

  background: #2f80ed;
  color: #fff;
  font-size: 16px;
  font-weight: bold;

  border: none;
  border-radius: 8px;
  cursor: pointer;

  transition: background 0.3s;

  &:hover {
    background: #1c5fd1;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

/* Bottom links */
export const BottomLinks = styled.div`
  margin-top: 20px;
  width: 100%;
  font-size: 13px;

  display: flex;
  justify-content: space-between;

  span {
    color: #ddd;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }

  a {
    color: #4faaff;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      color: #8ecfff;
    }
  }
`;
