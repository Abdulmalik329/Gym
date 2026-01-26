import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1265px;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
  min-height: 100vh;
  color: #fff;
`;

export const Header = styled.div`
  height: 260px;
  background-image: url("https://images.unsplash.com/photo-1517836357463-d25dfeac3438");
  background-size: cover;
  background-position: center;
  border-radius: 20px;
  position: relative;
`;

export const AvatarWrapper = styled.div`
  position: absolute;
  bottom: -65px;
  left: 50%;
  transform: translateX(-50%);
  width: 140px;
  height: 140px;
  border-radius: 50%;
  border: 4px solid #0b1620;
  overflow: hidden;
  background: #000;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Camera = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  background: #2f80ed;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

export const Form = styled.div`
  margin-top: 100px;
  background: #0f2233;
  border-radius: 20px;
  padding: 35px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
`;

export const Column = styled.div``;

export const Field = styled.div`
  margin-bottom: 22px;
`;

export const Label = styled.label`
  font-size: 13px;
  color: #9bb0c4;
  display: block;
  margin-bottom: 6px;
`;

export const Input = styled.input`
  width: 100%;
  background: #162f45;
  border: 1px solid #1f3b55;
  border-radius: 10px;
  padding: 12px 14px;
  color: #fff;
  outline: none;

  &:focus {
    border-color: #2f80ed;
  }
`;

export const SaveButton = styled.button`
  margin-top: 25px;
  float: right;
  padding: 12px 32px;
  border-radius: 10px;
  border: none;
  background: #2f80ed;
  color: #fff;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
