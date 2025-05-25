import { useParams } from "react-router-dom";
import { useProjectStore } from "../../../store/projectStore";
import { useGetChapterQuery } from "../../../store/slices/chapterSlice";
import { useGetCharacterQuery } from "../../../store/slices/characterSlice";
import { useGetPlaceQuery } from "../../../store/slices/placeSlice";
import { useGetStoryArcQuery } from "../../../store/slices/storyArcSlice";
import CharacterView from "../../organisms/CategoryView/CharacterView";
import StoryArcView from "../../organisms/CategoryView/StoryArcView";
import PlaceView from "../../organisms/CategoryView/PlaceView";
import ChapterView from "../../organisms/CategoryView/ChapterView";

const View = () => {
  const { projectId } = useProjectStore();

  const { category, id } = useParams();

  const skipQuery = !projectId || !id;

  const characterQuery = useGetCharacterQuery(
    { id, projectId },
    { skip: skipQuery }
  );
  const chapterQuery = useGetChapterQuery(
    { id, projectId },
    { skip: skipQuery }
  );
  const placeQuery = useGetPlaceQuery({ id, projectId }, { skip: skipQuery });
  const storyArcQuery = useGetStoryArcQuery(
    { id, projectId },
    { skip: skipQuery }
  );

  const queries = {
    character: characterQuery,
    chapter: chapterQuery,
    place: placeQuery,
    storyarc: storyArcQuery,
  };

  const query = queries[category as keyof typeof queries];
  const { data, isLoading, error } = query ?? {};

  if (isLoading) return <p>Chargement du projet...</p>;
  if (error) return <p>Erreur lors de la récupération du projet</p>;

  if (category === "character") {
    return (
      <section className="view-container">
        {data && <CharacterView data={data} />}
      </section>
    );
  } else if (category === "place") {
    return (
      <section className="view-container">
        {data && <PlaceView data={data} />}
      </section>
    );
  } else if (category === "storyarc") {
    return (
      <section className="view-container">
        {data && <StoryArcView data={data} />}
      </section>
    );
  } else if (category === "chapter") {
    return (
      <section className="view-container">
        {data && <ChapterView data={data} />}
      </section>
    );
  }
};

export default View;
