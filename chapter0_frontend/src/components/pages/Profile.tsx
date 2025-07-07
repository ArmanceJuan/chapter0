import { useEffect } from "react";
import { useGetUserQuery } from "../../store/slices/authSlice";
import { useGetProjectsByUserQuery } from "../../store/slices/usersProjectSlice";
import ButtonAction from "../atoms/buttons/ButtonAction";
import { useNavigate, useParams } from "react-router-dom";

type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};

const Profile = () => {
  const { data: user, isLoading } = useGetUserQuery() as {
    data: User | undefined;
    isLoading: boolean;
  };
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user && user.id !== userId) {
      navigate("/");
    }
  }, [user, userId, navigate, isLoading]);

  const { data: projects, isLoading: isProjectsLoading } =
    useGetProjectsByUserQuery(user?.id, {
      skip: !user?.id,
    });

  if (isLoading || !user) return <p>Chargement du profil...</p>;

  return (
    <div className="content-container">
      <div className="user-profile">
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
        {isProjectsLoading ? (
          <p>Chargement des projets...</p>
        ) : (
          <ul className="user-profile__projects__list">
            {projects?.map((project: any) => (
              <li key={project.id}>
                <h4>{project.name}</h4>
                <p>{project.id}</p>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default Profile;
