import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar"; 
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #101922;
`;

const Content = styled.div`
  padding: 24px;
  overflow-y: auto;
`;

const DashboardLayout = () => (
  <Wrapper>
    <Sidebar />
    <Main>
      <Navbar /> 
      <Content>
        <Outlet />
      </Content>
    </Main>
  </Wrapper>
);

export default DashboardLayout;
