import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useGetProjectsByUserQuery } from "../../store/slices/usersProjectSlice";
import { useAuthStore } from "../../store/useAuthStore";
import ButtonAction from "../atoms/buttons/ButtonAction";
import { useNavigate, useParams } from "react-router-dom";

const Profile = () => {
  const { user } = useAuthStore();
  const { userId } = useParams();
  const navigate = useNavigate();

  const { data: project } = useGetProjectsByUserQuery(user?.id);
  if (user?.id !== userId) {
    navigate("/");
  }
  return (
    <div className="content-container">
      <div>
        <h1>Profile</h1>
        <ButtonAction variant="edit" category="profile" id={user?.id} />
      </div>

      <section className="user-profile">
        <h4>Username</h4>
        <p>{user?.username}</p>
        <h4>Email</h4>
        <p>{user?.email}</p>
      </section>
      <section className="user-profile__projects">
        <h2>Projets</h2>
        <div>
          <ul className="user-profile__projects__list">
            {project?.map((project: any) => (
              <li key={project.id}>
                <h4>{project.name}</h4>
                <p>{project.id}</p>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default Profile;
