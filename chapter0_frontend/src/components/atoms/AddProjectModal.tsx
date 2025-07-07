import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "./input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAddUserToProjectMutation } from "../../store/slices/usersProjectSlice";
import { useGetUserQuery } from "../../store/slices/authSlice";

type AddProjectModalProps = {
  onClose: () => void;
};

type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};

const AddProjectModal = ({ onClose }: AddProjectModalProps) => {
  const navigate = useNavigate();
  const [projectId, setProjectId] = useState("");
  const [addUserToProject] = useAddUserToProjectMutation();

  const { data: user, isLoading } = useGetUserQuery() as {
    data: User | undefined;
    isLoading: boolean;
  };

  const handleJoin = async () => {
    if (!user) return;
    try {
      await addUserToProject({
        projectId,
        userId: user?.id,
        role: "pending",
      }).unwrap();
      setProjectId("");
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur :", error);
    }
  };

  if (isLoading) return <p>Chargement utilisateur...</p>;

  return (
    <section className="modal-container">
      <div className="modal">
        <button onClick={onClose} className="modal__button-close">
          <FontAwesomeIcon
            icon={faXmark}
            className="modal__button-close__icon"
          />
        </button>
        <div>
          <h2 className="modal_create-h2">Créer un projet</h2>
          <div className="modal__content">
            <button onClick={() => navigate(`/project/form/create`)}>
              Créer un projet
            </button>
          </div>
        </div>
        <div>
          <h2>Rejoindre un projet</h2>
          <div className="modal__content">
            <Input
              type="text"
              placeholder="Renseignez l'id du projet"
              value={projectId}
              onChange={(e) => setProjectId(e.target.value)}
            />
            <button onClick={handleJoin}>Rejoindre</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddProjectModal;
