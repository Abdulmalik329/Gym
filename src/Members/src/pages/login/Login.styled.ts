import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  font-family: "Arial", sans-serif;
`;

export const Left = styled.div`
  flex: 1;
  background: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 60px;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: #777;
  margin-bottom: 30px;
`;

export const Input = styled.input`
  width: 280px;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  margin-bottom: 15px;
`;

export const Button = styled.button`
  width: 280px;
  padding: 12px;
  background: #2f80ed;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;

  &:hover {
    background: #1c5fd1;
  }
`;

export const BottomLinks = styled.div`
  margin-top: 20px;
  font-size: 13px;

  span {
    color: #555;
  }

  a {
    margin-left: 10px;
    color: #2f80ed;
    text-decoration: none;
  }
`;

export const Right = styled.div`
  flex: 2;
  background: url("https://freedomfitnessequipment.com/cdn/shop/articles/Ultimate-Guide-to-Setting-Up-Your-Home-Garage-Gym-86121198.png?v=1726676809&width=500")
    center/cover no-repeat;
`;
