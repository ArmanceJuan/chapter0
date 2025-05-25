import { useNavigate } from "react-router-dom";
import { useProjectStore } from "../../../store/projectStore";
import { useGetChaptersQuery } from "../../../store/slices/chapterSlice";
import { useGetCharactersQuery } from "../../../store/slices/characterSlice";
import { useGetPlacesQuery } from "../../../store/slices/placeSlice";
import { useGetStoryArcsQuery } from "../../../store/slices/storyArcSlice";
import ButtonAction from "../../atoms/buttons/ButtonAction";
import lieu from "/img/lieu.jpg";
import perso from "/img/perso.jpg";
import arc from "/img/arc.jpg";
import { useGetProjectQuery } from "../../../store/slices/projectSlice";
import { useAuthStore } from "../../../store/useAuthStore";

type Props = {
  category: "chapter" | "character" | "place" | "storyarc";
};

const CategoryTitles: Record<Props["category"], string> = {
  chapter: "chapitres",
  character: "personnages",
  place: "lieux",
  storyarc: "arcs",
};

const CategoryTable = ({ category }: Props) => {
  const { projectId } = useProjectStore();
  const { data: project } = useGetProjectQuery({ id: projectId });
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const isOwner = project?.ownerId === user?.id;

  const queries = {
    chapter: useGetChaptersQuery,
    character: useGetCharactersQuery,
    place: useGetPlacesQuery,
    storyarc: useGetStoryArcsQuery,
  };

  const { data = [], isLoading } = queries[category](
    { projectId },
    {
      skip: !projectId,
    }
  );

  return (
    <div className="content-container">
      <h2>Liste des {CategoryTitles[category]}</h2>
      <section className="category-table">
        {isLoading ? (
          <p>Chargement des {CategoryTitles[category]}...</p>
        ) : (
          <div className="category-table__grid">
            {data.map((item: any) => (
              <div key={item.id} className="category-table__card">
                <img
                  src={
                    item.imageUrl === ""
                      ? category === "character"
                        ? perso
                        : category === "place"
                        ? lieu
                        : arc
                      : item.imageUrl
                  }
                  onClick={() =>
                    navigate(
                      `/project/${projectId}/${category}/${item.id}/view`
                    )
                  }
                  className="category-table__image"
                  alt={item.name}
                />
                <div className="category-table__infos">
                  <h3>{item.name}</h3>
                  {isOwner && (
                    <div className="category-table__actions">
                      <ButtonAction
                        variant="edit"
                        projectId={projectId || ""}
                        category={category}
                        id={item.id}
                      />
                      <ButtonAction
                        variant="delete"
                        projectId={projectId || ""}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryTable;
