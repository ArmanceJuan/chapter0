import { useEffect } from "react";
import { useProjectStore } from "../../store/projectStore";
import { useGetProjectsByUserQuery } from "../../store/slices/usersProjectSlice";
import { useAuthStore } from "../../store/useAuthStore";
import CardBloc from "../organisms/CardsBloc";
import ProjectSelector from "../molecules/project-selector/ProjectSelector";
import NewButton from "../organisms/newButton/NewButton";
import ButtonAction from "../atoms/buttons/ButtonAction";
import NewProjecButton from "../molecules/NewProjecButton";
import { useGetProjectQuery } from "../../store/slices/projectSlice";

const Dashboard = () => {
  const { user } = useAuthStore();
  const { projectId, setActiveProject } = useProjectStore();
  const { data: project } = useGetProjectQuery({ id: projectId });

  const autoriseUser = project?.ownerId === user?.id || user?.isAdmin;

  const {
    data: projects,
    isLoading,
    error,
  } = useGetProjectsByUserQuery(user?.id, { skip: !user?.id });

  useEffect(() => {
    if (projects?.length === 1 && !projectId) {
      setActiveProject(projects[0].id);
    } else if (projects?.length > 1 && !projectId) {
      setActiveProject(projects[0].id);
    }
  }, [projects, projectId]);

  if (isLoading) return <p>Chargement des projets...</p>;
  if (error) return <p>Erreur lors de la récupération des projets</p>;

  console.log("projects:", projectId);
  return (
    <div className="content-container">
      {projects.length === 0 ? (
        <section className="project-select-container">
          <NewProjecButton />

          {projects.length > 1 && (
            <ProjectSelector
              projects={projects}
              selectedId={projectId || ""}
              onChange={(id) => {
                setActiveProject(id);
              }}
            />
          )}
        </section>
      ) : (
        <>
          <section className="project-select-container">
            <NewProjecButton />

            {projects.length > 1 && (
              <ProjectSelector
                projects={projects}
                selectedId={projectId || ""}
                onChange={(id) => {
                  setActiveProject(id);
                }}
              />
            )}
          </section>
          <section>
            <div className="project-infos">
              <h1>
                {projects?.find((p: any) => p.id === projectId)?.name ||
                  "Aucun projet sélectionné"}
              </h1>
              {autoriseUser && (
                <div className="project-infos__actions">
                  <ButtonAction
                    variant="see"
                    projectId={projectId ?? undefined}
                    className="project-infos__actions__button"
                  />
                  <ButtonAction
                    variant="edit"
                    projectId={projectId ?? undefined}
                    className="project-infos__actions__button"
                  />
                </div>
              )}
            </div>

            <CardBloc projectId={projects[0].id} />
          </section>
          <section>
            <NewButton />
          </section>
        </>
      )}
    </div>
  );
};

export default Dashboard;
