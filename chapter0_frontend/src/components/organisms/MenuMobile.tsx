import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faBell,
  faUser,
  faRightFromBracket,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import {
  useGetUserQuery,
  useLogoutMutation,
} from "../../store/slices/authSlice";
import { useProjectStore } from "../../store/projectStore";

type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};

const MenuMobile = () => {
  const { projectId } = useProjectStore();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const { data: user, isLoading } = useGetUserQuery() as {
    data: User | undefined;
    isLoading: boolean;
  };

  const handleLogout = async () => {
    try {
      await logout(null);
      navigate("/access");
    } catch (error) {
      console.log("Erreur lors de la déconnexion", error);
    }
  };

  if (isLoading) return <p>Chargement utilisateur...</p>;

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
          icon={faUserSecret}
          onClick={() => navigate(`/admin`)}
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
