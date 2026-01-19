import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  font-family: "Arial", sans-serif;

  background: url("https://images.unsplash.com/photo-1570829460005-c840387bb1ca?q=80&w=1920&auto=format&fit=crop")
    center/cover no-repeat;

  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
`;

export const LoginCard = styled.div`
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #fff;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: #ccc;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid transparent;
  border-radius: 6px;
  margin-bottom: 15px;
  font-size: 14px;
  outline: none;

  &:focus {
    background: #fff;
    border-color: #2f80ed;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background: #2f80ed;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  margin-top: 10px;
  transition: background 0.3s;

  &:hover {
    background: #1c5fd1;
  }
`;

export const BottomLinks = styled.div`
  margin-top: 20px;
  font-size: 13px;
  display: flex;
  justify-content: space-between;
  width: 100%;

  span {
    color: #ddd;
    cursor: pointer;
    &:hover {
      text-decoration: underline;
    }
  }

  a {
    color: #4faaff;
    text-decoration: none;
    font-weight: bold;
    &:hover {
      color: #8ecfff;
    }
  }
`;
