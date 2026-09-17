import { Outlet } from "react-router-dom";
import MobileNavigation from "../components/MobileNavigation";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

function MainLayout() {
  return (
    <div className="min-h-screen bg-page">
      <Sidebar />

      <div className="min-h-screen lg:ml-[17rem]">
        <Topbar />
        <main className="px-4 pb-24 pt-5 sm:px-6 sm:pt-7 lg:pb-10 xl:px-9">
          <Outlet />
        </main>
      </div>

      <MobileNavigation />
    </div>
  );
}

export default MainLayout;
