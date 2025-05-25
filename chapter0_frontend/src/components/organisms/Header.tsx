import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "/img/logo.png";
import { useLogoutMutation } from "../../store/slices/authSlice";
import { useAuthStore } from "../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [logout] = useLogoutMutation();
  const clearAuthState = useAuthStore((state) => state.clearAuthState);
  const navigate = useNavigate();

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
    <header className="header">
      <img src={logo} alt="logo" className="logo" />
      <FontAwesomeIcon
        icon={faRightFromBracket}
        className="header__logout"
        onClick={handleLogout}
      />
    </header>
  );
};

export default Header;
