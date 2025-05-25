import Card from "../molecules/Card";
import { useGetChaptersQuery } from "../../store/slices/chapterSlice";
import { useGetCharactersQuery } from "../../store/slices/characterSlice";
import { useGetPlacesQuery } from "../../store/slices/placeSlice";
import { useGetStoryArcsQuery } from "../../store/slices/storyArcSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  projectId: string;
};

type Category = "chapter" | "character" | "place" | "storyarc";

const CardBloc = ({ projectId }: Props) => {
  console.log("projectId:", projectId);
  const navigate = useNavigate();
  const { data: chapters } = useGetChaptersQuery(
    { projectId },
    {
      skip: !projectId,
    }
  );
  const { data: characters } = useGetCharactersQuery(
    { projectId },
    {
      skip: !projectId,
    }
  );
  const { data: places } = useGetPlacesQuery(
    { projectId },
    {
      skip: !projectId,
    }
  );
  const { data: storyArcs } = useGetStoryArcsQuery(
    { projectId },
    {
      skip: !projectId,
    }
  );

  const handleClick = (category: Category) => {
    navigate(`/project/${projectId}/${category}`);
  };
  return (
    <div className="cards-bloc">
      <Card
        title="Chapitres"
        items={chapters}
        onClick={() => handleClick("chapter")}
      />
      <Card
        title="Personnages"
        items={characters}
        onClick={() => handleClick("character")}
      />
      <Card title="Lieux" items={places} onClick={() => handleClick("place")} />
      <Card
        title="Arcs"
        items={storyArcs}
        onClick={() => handleClick("storyarc")}
      />
    </div>
  );
};

export default CardBloc;
