import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../store/slices/authSlice";
import { useEffect, useState } from "react";
import Button from "../atoms/buttons/Button";
import AllProjects from "../organisms/admin/AllProjects";
import AllUsers from "../organisms/admin/AllUsers";

type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};
const DashboardAdmin = () => {
  const { data: userData } = useGetUserQuery() as { data: User };
  const [mode, setMode] = useState<"projects" | "users">("projects");
  const navigate = useNavigate();

  useEffect(() => {
    if (userData && userData.isAdmin !== true) {
      navigate("/");
    }
  }, [userData, navigate]);

  if (!userData) return <p>Chargement...</p>;

  return (
    <div className="content-container">
      <section className="auth-form-container">
        <div className="auth-form-container__tabs">
          <Button
            className={`auth-form-container__tabs_button ${
              mode === "projects" ? "auth-form-container__tabs_active" : ""
            }`}
            onClick={() => setMode("projects")}
          >
            Projects
          </Button>
          <Button
            className={`auth-form-container__tabs_button ${
              mode === "users" ? "auth-form-container__tabs_active" : ""
            }`}
            onClick={() => setMode("users")}
          >
            Users
          </Button>
        </div>
        {mode === "projects" ? <AllProjects /> : <AllUsers />}
      </section>
    </div>
  );
};

export default DashboardAdmin;
