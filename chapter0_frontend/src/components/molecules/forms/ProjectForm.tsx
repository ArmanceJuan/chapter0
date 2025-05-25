import { useEffect, useState } from "react";
import Input from "../../atoms/input/Input";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateProjectMutation,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../../store/slices/projectSlice";

type Props = {
  isEdit?: boolean;
};

const ProjectForm = ({ isEdit }: Props) => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  console.log("projectId:", projectId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createProject] = useCreateProjectMutation();
  const [updateProject] = useUpdateProjectMutation();

  const { data, isSuccess } = useGetProjectQuery(
    { id: projectId },
    { skip: !isEdit || !projectId }
  );

  useEffect(() => {
    if (isEdit && data && isSuccess) {
      setName(data.name);
      setDescription(data.description);
    }
  }, [data, isEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = {
      name,
      description,
    };
    try {
      if (isEdit) {
        await updateProject({ ...payload, id: projectId }).unwrap();
        navigate(`/project/${projectId}/see`);
      } else {
        const result = await createProject(payload).unwrap();
        const newProjectId = result.project?.[0]?.id;
        if (newProjectId) {
          navigate(`/project/${newProjectId}/see`);
        }
        console.log("Projet créé :", result);
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
        children="Nom du projet"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="text"
        placeholder="Description"
        id="description"
        value={description}
        children="Description du projet"
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className="button">
        {isEdit ? "Editer" : "Créer"}
      </button>
    </form>
  );
};
export default ProjectForm;
