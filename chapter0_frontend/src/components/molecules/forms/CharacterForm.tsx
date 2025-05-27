import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateCharacterMutation,
  useGetCharacterQuery,
  useUpdateCharacterMutation,
} from "../../../store/slices/characterSlice";
import Input from "../../atoms/input/Input";
import TextArea from "../../atoms/textArea/TextArea";
import { useProjectStore } from "../../../store/projectStore";

type Props = {
  isEdit?: boolean;
};

const CharacterForm = ({ isEdit }: Props) => {
  const projectId = useProjectStore((state) => state.projectId);
  const { characterId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [description, setDescription] = useState("");
  const [history, setHistory] = useState("");
  const [psychologicalProfile, setPsychologicalProfile] = useState("");
  const [relationships, setRelationships] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [status, setStatus] = useState(false);

  const [createCharacter] = useCreateCharacterMutation();
  const [updateCharacter] = useUpdateCharacterMutation();

  const { data: existingCharacter, isSuccess } = useGetCharacterQuery(
    { id: characterId, projectId },
    { skip: !isEdit || !characterId || !projectId }
  );

  useEffect(() => {
    if (isEdit && existingCharacter && isSuccess) {
      const character = existingCharacter[0];
      setName(character.name);
      setAge(character.age);
      setDescription(character.description);
      setHistory(character.history);
      setPsychologicalProfile(character.psychologicalProfile);
      setRelationships(character.relationships);
      setImageUrl(character.imageUrl);
      setStatus(character.status);
    }
  }, [existingCharacter, isEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name,
      age,
      description,
      history,
      psychologicalProfile,
      relationships,
      imageUrl,
      status,
      projectId,
    };
    try {
      if (isEdit) {
        const result = await updateCharacter({
          ...payload,
          id: characterId,
        }).unwrap();
        navigate(`/project/${projectId}/character/${characterId}/view`);
        console.log("Character mis à jour :", result);
      } else {
        const result = await createCharacter(payload).unwrap();
        const newCharacterId = result.character?.[0]?.id;
        if (newCharacterId) {
          navigate(`/project/${projectId}/character/${newCharacterId}/view`);
        }
      }
    } catch (error) {
      console.error("Erreur lors de la création du character :", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      <Input
        type="text"
        placeholder="Nom"
        id="name"
        value={name}
        children="Nom du personnage"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Age"
        id="age"
        value={age}
        children="Age du personnage"
        onChange={(e) => setAge(e.target.value)}
      />
      <TextArea
        placeholder="Description"
        id="description"
        value={description}
        children="Description du personnage"
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextArea
        placeholder="Histoire"
        id="history"
        value={history}
        children="Histoire du personnage"
        onChange={(e) => setHistory(e.target.value)}
      />
      <TextArea
        placeholder="Profil Psychologique"
        id="psychologicalProfile"
        value={psychologicalProfile}
        children="Profil psychologique du personnage"
        onChange={(e) => setPsychologicalProfile(e.target.value)}
      />
      <TextArea
        placeholder="Relations"
        id="relationships"
        value={relationships}
        children="Relations du personnage"
        onChange={(e) => setRelationships(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Image"
        id="imageUrl"
        value={imageUrl}
        children="Image pour le personnage"
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button type="submit" className="button">
        {isEdit ? "Editer" : "Créer"}
      </button>
    </form>
  );
};

export default CharacterForm;
