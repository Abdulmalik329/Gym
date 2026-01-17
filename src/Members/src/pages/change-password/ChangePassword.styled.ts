import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Card = styled.div`
  width: 420px;
  background: #0f2233;
  border-radius: 24px;
  padding: 42px 34px;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65);
  color: #fff;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 6px;
`;

export const Subtitle = styled.p`
  text-align: center;
  font-size: 13px;
  color: #8fa6bc;
  margin-bottom: 30px;
`;

export const Field = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #9bb0c4;
  display: block;
  margin-bottom: 6px;
`;

export const InputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  height: 46px;
  background: #162f45;
  border: 1px solid #1f3b55;
  border-radius: 14px;
  padding: 0 48px 0 16px;
  color: #fff;
  outline: none;
  box-sizing: border-box;

  &::placeholder {
    color: #8fa6bc;
  }

  &:focus {
    border-color: #2f80ed;
  }
`;

export const Toggle = styled.span`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #8fa6bc;

  &:hover {
    color: #fff;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 48px;
  margin-top: 22px;
  border-radius: 16px;
  border: none;
  background: linear-gradient(135deg, #2f80ed, #56ccf2);
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
