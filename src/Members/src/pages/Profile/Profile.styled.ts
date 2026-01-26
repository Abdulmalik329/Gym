import styled from "styled-components";

export const Wrapper = styled.div`
  max-width: 1265px;
  width: 100%;
  padding: 0 16px;
  margin: 0 auto;
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

export const Avatar = styled.div`
  position: absolute;
  bottom: -60px;
  left: 50%;
  transform: translateX(-50%);
  width: 130px;
  height: 130px;
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

export const Content = styled.div`
  margin-top: 90px;
  padding: 30px;
  background: #0f2233;
  border-radius: 20px;
`;

export const Name = styled.h2`
  margin-bottom: 10px;
  text-align: center;
`;

export const Bio = styled.p`
  text-align: center;
  color: #8fa6bc;
  margin-bottom: 30px;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
`;

export const Item = styled.div`
  background: #162f45;
  padding: 15px;
  border-radius: 12px;

  span {
    font-size: 12px;
    color: #8fa6bc;
  }

  p {
    margin-top: 5px;
    font-weight: 600;
  }
`;

export const Actions = styled.div`
  margin-top: 30px;
  display: flex;
  gap: 15px;
  justify-content: center;
`;

export const Button = styled.button<{ outline?: boolean }>`
  padding: 12px 20px;
  border-radius: 12px;
  border: ${({ outline }) => (outline ? "1px solid #2f80ed" : "none")};
  background: ${({ outline }) => (outline ? "transparent" : "#2f80ed")};
  color: #fff;
  cursor: pointer;
`;
