import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import MenuMobile from "../organisms/MenuMobile";

const MainLayout = () => {
  return (
    <div data-theme="default">
      <Header />
      <main>
        <Outlet />
        <MenuMobile />
      </main>
    </div>
  );
};

export default MainLayout;
