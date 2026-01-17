import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import Footer from "./Footer"
import Content, { LayoutWrapper } from "./Layout.styled"

const MainLayout = () => {
  return (
    <LayoutWrapper>
        <Navbar />
          <Content>
           <Outlet />
            </Content>
        <Footer />
    </LayoutWrapper>
  )
}

export default MainLayout
