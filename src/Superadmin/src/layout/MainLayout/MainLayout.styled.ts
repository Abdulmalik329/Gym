import styled from "styled-components";

export const MainLayout = styled.div`
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
    display: flex;
    height: 100vh;
    font-family: "Montserrat", sans-serif;
`

export const Content = styled.div`
  width: 82%;
  overflow-x: auto;
  background-color: #020617;

  &::-webkit-scrollbar {
    height: 8px; 
    width: 8px;  
  }

  &::-webkit-scrollbar-track {
    background: #020617;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #1e293b;
    border-radius: 10px;
    border: 2px solid #020617;
    transition: all 0.3s ease;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #334155;
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #10b981;
  }
`;