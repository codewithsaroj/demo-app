import Sidenav from "./Sidenav";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div style={{ display: "flex" }}>
      
      <Sidenav />
      <Outlet/>
    </div>
  );
};

export default Layout;
