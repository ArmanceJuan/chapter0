import { RouterProvider } from "react-router-dom";
import router from "./routing/router";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "default";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
