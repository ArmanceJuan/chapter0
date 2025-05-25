import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "../../../store/projectStore";
import {
  useCreatePlaceMutation,
  useGetPlaceQuery,
} from "../../../store/slices/placeSlice";
import Input from "../../atoms/input/Input";
import TextArea from "../../atoms/textArea/TextArea";

type Props = {
  isEdit?: boolean;
};

const PlaceForm = ({ isEdit }: Props) => {
  const projectId = useProjectStore((state) => state.projectId);
  const { placeId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState(false);

  const [createPlace] = useCreatePlaceMutation();

  const { data: existingPlace, isSuccess } = useGetPlaceQuery(
    { id: placeId, projectId },
    { skip: !isEdit || !placeId || !projectId }
  );

  useEffect(() => {
    if (isEdit && existingPlace && isSuccess) {
      const place = existingPlace[0];
      setName(place.name);
      setDescription(place.description);
      setHistory(place.history);
      setLocation(place.location);
      setImageUrl(place.imageUrl);
      setStatus(place.status);
    }
  }, [existingPlace, isEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createPlace({
        name,
        description,
        history,
        location,
        imageUrl,
        status,
        projectId,
      }).unwrap();
      const placeId = response.place?.[0]?.id;
      if (placeId) {
        navigate(`/project/${projectId}/place/${placeId}/view`);
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
        children="Nom du lieu"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        id="description"
        value={description}
        children="Description du lieu"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextArea
        placeholder="Histoire"
        id="history"
        value={history}
        children="Histoire du lieu"
        onChange={(e) => setHistory(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Localisation"
        id="location"
        value={location}
        children="Localisation du lieu"
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Image"
        id="imageUrl"
        value={imageUrl}
        children="Image du lieu"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit" className="form-container__button">
        {isEdit ? "Editer" : "Créer"}
      </button>
    </form>
  );
};

export default PlaceForm;
