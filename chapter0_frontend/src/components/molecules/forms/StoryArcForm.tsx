import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "../../../store/projectStore";
import {
  useCreateStoryArcMutation,
  useGetStoryArcQuery,
} from "../../../store/slices/storyArcSlice";
import Input from "../../atoms/input/Input";
import TextArea from "../../atoms/textArea/TextArea";

type Props = {
  isEdit?: boolean;
};

const StoryArcForm = ({ isEdit }: Props) => {
  const projectId = useProjectStore((state) => state.projectId);
  const { storyArcId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [linkedArcs, setLinkedArcs] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState(false);

  const [createStoryArc] = useCreateStoryArcMutation();

  const { data: existingStoryArc, isSuccess } = useGetStoryArcQuery(
    { id: storyArcId, projectId },
    { skip: !isEdit || !storyArcId || !projectId }
  );

  useEffect(() => {
    if (isEdit && existingStoryArc && isSuccess) {
      const storyArc = existingStoryArc[0];
      setName(storyArc.name);
      setDescription(storyArc.description);
      setLinkedArcs(storyArc.linkedArcs);
      setImageUrl(storyArc.imageUrl);
      setStatus(storyArc.status);
    }
  }, [existingStoryArc, isEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createStoryArc({
        name,
        description,
        linkedArcs,
        imageUrl,
        status,
        projectId,
      }).unwrap();
      const storyArcId = response.storyArc?.[0]?.id;
      if (storyArcId) {
        navigate(`/project/${projectId}/storyarc/${storyArcId}/view`);
      }
    } catch (error) {
      console.error("Erreur lors de la création du projet :", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Input
        type="text"
        placeholder="Nom"
        id="name"
        value={name}
        children="Nom de l'arc narratif"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        id="description"
        value={description}
        children="Description de l'arc narratif"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextArea
        placeholder="Arcs liés"
        id="linkedArcs"
        value={linkedArcs}
        children="Arcs liés"
        onChange={(e) => setLinkedArcs(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Image"
        id="imageUrl"
        value={imageUrl}
        children="Image de l'arc narratif"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit" className="form-container__button">
        {isEdit ? "Editer" : "Créer"}
      </button>
    </form>
  );
};

export default StoryArcForm;
