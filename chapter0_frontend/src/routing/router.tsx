import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout";
import Dashboard from "../components/pages/Dashboard";
import NotFound from "../components/pages/NotFound";
import AuthLayout from "../components/templates/AuthLayout";
import Authenticate from "../components/pages/Authenticate";
import Create from "../components/pages/Create";
import ProjectView from "../components/pages/views/ProjectView";
import CategoryTable from "../components/pages/views/CategoryTable";
import View from "../components/pages/views/View";
import Profile from "../components/pages/Profile";
import EditProfile from "../components/pages/EditProfile";
import DashboardAdmin from "../components/pages/DashboardAdmin";
import ProjectUsersList from "../components/pages/ProjectUsersList";

const router = createBrowserRouter([
  {
    path: "/access",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <Authenticate />,
      },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      // Projects routes
      {
        path: "/project/form/create",
        element: <Create />,
      },
      {
        path: "/project/form/:projectId/edit",
        element: <Create />,
      },
      {
        path: "/project/form/:projectId/see",
        element: <ProjectView />,
      },
      {
        path: "/project/:projectId/chapter",
        element: <CategoryTable category="chapter" />,
      },
      {
        path: "/project/:projectId/character",
        element: <CategoryTable category="character" />,
      },
      {
        path: "/project/:projectId/place",
        element: <CategoryTable category="place" />,
      },
      {
        path: "/project/:projectId/storyarc",
        element: <CategoryTable category="storyarc" />,
      },
      // Create routes
      {
        path: "/project/:projectId/chapter/new",
        element: <Create />,
      },
      {
        path: "/project/:projectId/character/new",
        element: <Create />,
      },
      {
        path: "/project/:projectId/place/new",
        element: <Create />,
      },
      {
        path: "/project/:projectId/storyarc/new",
        element: <Create />,
      },
      // Edit routes
      {
        path: "/project/:projectId/chapter/:chapterId/edit",
        element: <Create />,
      },
      {
        path: "/project/:projectId/character/:characterId/edit",
        element: <Create />,
      },
      { path: "/project/:projectId/place/:placeId/edit", element: <Create /> },
      {
        path: "/project/:projectId/storyarc/:storyArcId/edit",
        element: <Create />,
      },
      {
        path: "/:id/profile/edit",
        element: <Create />,
      },
      // View routes
      {
        path: "/project/:projectId/:category/:id/view",
        element: <View />,
      },
      // Profile routes
      {
        path: "/:userId/profile",
        element: <Profile />,
      },
      {
        path: "/:userId/profile/edit",
        element: <EditProfile />,
      },
      // Admin routes
      {
        path: "/admin",
        element: <DashboardAdmin />,
      },
      // Gestion des collaborateurs
      {
        path: "/project/:projectId/users",
        element: <ProjectUsersList />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
