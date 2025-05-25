import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHouse,
  faBell,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useAuthStore } from "../../store/useAuthStore";

const MenuMobile = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="menu-mobile">
      <FontAwesomeIcon icon={faBars} onClick={() => navigate("/")} />
      <FontAwesomeIcon icon={faHouse} onClick={() => navigate("/")} />
      <FontAwesomeIcon
        icon={faUser}
        onClick={() => navigate(`${user?.id}/profile`)}
      />
      <FontAwesomeIcon
        icon={faBell}
        onClick={() => navigate("/notifications")}
      />
    </div>
  );
};

export default MenuMobile;
