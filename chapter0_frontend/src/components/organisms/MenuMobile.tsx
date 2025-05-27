import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBell,
  faUser,
  faRightFromBracket,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../store/useAuthStore";
import { useLogoutMutation } from "../../store/slices/authSlice";
import { useProjectStore } from "../../store/projectStore";

const MenuMobile = () => {
  const { projectId } = useProjectStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const clearAuthState = useAuthStore((state) => state.clearAuthState);

  const handleLogout = async () => {
    try {
      await logout(null);
      clearAuthState();
      navigate("/access");
    } catch (error) {
      console.log("Erreur lors de la déconnexion", error);
    }
  };

  console.log("projectId:", projectId);
  return (
    <div className="menu-mobile">
      <FontAwesomeIcon icon={faHouse} onClick={() => navigate("/")} />
      <FontAwesomeIcon
        icon={faUser}
        onClick={() => navigate(`${user?.id}/profile`)}
      />
      <FontAwesomeIcon
        icon={faBell}
        onClick={() => navigate(`/project/${projectId}/users`)}
      />
      {user?.isAdmin && (
        <FontAwesomeIcon
          icon={faUser}
          onClick={() => navigate(`${user?.id}/profile`)}
        />
      )}
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="header__logout"
        onClick={handleLogout}
      />
    </div>
  );
};

export default MenuMobile;
