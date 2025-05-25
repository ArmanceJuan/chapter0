import { Outlet } from "react-router-dom";
import Header from "../organisms/Header";
import MenuMobile from "../organisms/MenuMobile";

const MainLayout = () => {
  return (
    <div data-theme="default">
      <Header />
      <main>
        <Outlet />
      </main>
      <MenuMobile />
    </div>
  );
};

export default MainLayout;
