import { Content, MainLayout } from "./MainLayout.styled";
import { Outlet } from "react-router-dom";
import LeftCol from "../Sidebar";

function Mainlayout() {
    return (
        <MainLayout>
            <LeftCol />
            <Content>
                <Outlet />
            </Content>
        </MainLayout>
    );
}

export default Mainlayout;