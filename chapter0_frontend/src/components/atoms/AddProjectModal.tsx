import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";
import Input from "./input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAddUserToProjectMutation } from "../../store/slices/usersProjectSlice";

const AddProjectModal = ({ onClose }: { onClose: () => void }) => {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [projectId, setProjectId] = useState("");
  const [addUserToProject] = useAddUserToProjectMutation();

  console.log("user modal:", user?.id);
  const handleJoin = async () => {
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
