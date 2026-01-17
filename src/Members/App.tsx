import { Route, Routes } from "react-router-dom";
import AppRouter from "./src/router/AppRouter";

const MembersApp = () => {
  return (
    <Routes>
      <Route path="/*" element={<AppRouter />} />
      
    </Routes>
  );
}

export default MembersApp
