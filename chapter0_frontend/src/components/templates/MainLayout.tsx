import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import MenuMobile from "../organisms/MenuMobile";

const MainLayout = () => {
  const isMobile = window.innerWidth < 768;
  return (
    <div data-theme="default">
      <Header />
      <main>
        <Outlet />
      </main>
      {isMobile && <MenuMobile />}
    </div>
  );
};

export default MainLayout;
