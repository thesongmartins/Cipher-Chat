import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="flex">
      <SideBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
