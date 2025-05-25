import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../../store/slices/authSlice";
import { useGetAllProjectsQuery } from "../../../store/slices/adminSlice";
import { useEffect } from "react";

type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};

const AllProjects = () => {
  const { data: userData } = useGetUserQuery() as { data: User };
  const { data: projects, isLoading, error } = useGetAllProjectsQuery();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData || userData.isAdmin !== true) {
      navigate("/");
    }
  }, [userData, navigate]);

  if (isLoading) return <p>Chargement des projets...</p>;
  if (error) return <p>Erreur lors de la récupération des projets</p>;
  return (
    <section className="content-container">
      <h1>Projets</h1>

      {projects.length === 0 ? (
        <section className="project-select-container">
          <p>Aucun projet</p>
        </section>
      ) : (
        <section className="project-select-container">
          <ul>
            {projects.map((project: any) => (
              <li key={project.id}>
                <h4>{project.name}</h4>
                <p>{project.ownerName}</p>
                <p>{project.id}</p>
                <p>{project.description}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};

export default AllProjects;
