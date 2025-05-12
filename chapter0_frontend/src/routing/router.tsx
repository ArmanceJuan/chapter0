import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout";
import Dashboard from "../components/pages/Dashboard";
import NotFound from "../components/pages/NotFound";
import AuthLayout from "../components/templates/AuthLayout";
import Authenticate from "../components/pages/Authenticate";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Authenticate />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "about",
        element: <div>About</div>,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
