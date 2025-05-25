import { useParams } from "react-router-dom";
import { useGetProjectQuery } from "../../../store/slices/projectSlice";
import CategoriesSection from "../../organisms/CategoriesSection";

const ProjectView = () => {
  const { projectId } = useParams();
  const {
    data: project,
    isLoading,
    error,
  } = useGetProjectQuery({ id: projectId });

  if (isLoading) return <p>Chargement du projet...</p>;
  if (error || !project) return <p>Erreur lors de la récupération du projet</p>;
  return (
    <section key={project.id} className="content-container">
      <h1>{project.name}</h1>
      <div className="view-container__header">
        <div className="view-container__infos">
          <p>{project.description}</p>
        </div>
        <div className="view-container__infos">
          <h4>Informations</h4>
          <p>Status : {project.status ? "Actif" : "Inactif"}</p>
          <p>Crée le : {project.createdAt}</p>
          <p>Mis à jour le : {project.updatedAt}</p>
        </div>
        <CategoriesSection />
      </div>
    </section>
  );
};

export default ProjectView;
