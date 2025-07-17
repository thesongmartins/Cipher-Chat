import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <main className="flex items-start justify-start bg-background size-full font-dm-sans">
      <SideBar />
      <div className="flex size-full items-start justify-start h-screen">
        <Outlet />
      </div>
    </main>
  );
};

export default AppLayout;
