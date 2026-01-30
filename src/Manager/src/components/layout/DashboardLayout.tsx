import  { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";
import styled from "styled-components";

// --- STYLES ---
const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
  background-color: #101922; /* Asosiy fon */
`;

const Main = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  position: relative;
`;

const Content = styled.div`
  flex: 1;
  padding: 24px;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #374151;
    border-radius: 4px;
  }
`;

// --- COMPONENT ---
const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Wrapper>
      <Sidebar isOpen={isSidebarOpen} />
      <Main>
        {/* toggleSidebar funksiyasini Navbarga beramiz */}
        <Navbar toggleSidebar={toggleSidebar} />
        <Content>
          <Outlet />
        </Content>
      </Main>
    </Wrapper>
  );
};

export default DashboardLayout;
