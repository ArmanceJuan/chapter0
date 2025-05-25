import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBell,
  faUser,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../store/useAuthStore";
import { useLogoutMutation } from "../../store/slices/authSlice";

const MenuMobile = () => {
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

  return (
    <div className="menu-mobile">
      <FontAwesomeIcon icon={faHouse} onClick={() => navigate("/")} />
      <FontAwesomeIcon
        icon={faUser}
        onClick={() => navigate(`${user?.id}/profile`)}
      />
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="header__logout"
        onClick={handleLogout}
      />
    </div>
  );
};

export default MenuMobile;
