import { useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../../store/slices/authSlice";
import { useGetAllProjectsQuery } from "../../../store/slices/adminSlice";
import { useEffect } from "react";
import NewProjecButton from "../../molecules/NewProjecButton";
import ButtonAction from "../../atoms/buttons/ButtonAction";

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
        <>
          <section className="project-select-container">
            <NewProjecButton />
          </section>

          <section className="project-select-container">
            <ul>
              {projects.map((project: any) => (
                <li key={project.id}>
                  <div>
                    <h4>{project.name}</h4>
                    <div className="project-actions">
                      <ButtonAction
                        variant="see"
                        projectId={project.id}
                        className="project-infos__actions__button"
                      />
                      <ButtonAction
                        variant="edit"
                        projectId={project.id}
                        className="project-infos__actions__button"
                      />
                      <ButtonAction
                        variant="delete"
                        projectId={project.id}
                        id={project.id}
                        className="project-infos__actions__button"
                        category="project"
                      />
                    </div>
                  </div>
                  <p>Propriétaire : {project.ownerName}</p>
                  <p>Id du projet : {project.id}</p>
                  <p>{project.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </section>
  );
};

export default AllProjects;
