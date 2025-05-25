import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faPlus,
  faTrash,
  faCircleChevronDown,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { useState, type JSX } from "react";
import { useDeleteChapterMutation } from "../../../store/slices/chapterSlice";
import { useDeleteStoryArcMutation } from "../../../store/slices/storyArcSlice";
import { useDeletePlaceMutation } from "../../../store/slices/placeSlice";
import { useDeleteCharacterMutation } from "../../../store/slices/characterSlice";

type Variant = "see" | "edit" | "delete" | "new" | "more" | "add";
type Category = "chapter" | "storyarc" | "place" | "character" | "profile";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: Variant;
  projectId?: string;
  category?: Category;
  id?: string;
  navigateTo?: string;
  onClick?: () => void;
};

const variantLabels: Record<Variant, JSX.Element> = {
  add: <FontAwesomeIcon icon={faPlus} />,
  see: <FontAwesomeIcon icon={faEye} />,
  edit: <FontAwesomeIcon icon={faEdit} />,
  delete: <FontAwesomeIcon icon={faTrash} />,
  new: <FontAwesomeIcon icon={faPlus} />,
  more: <FontAwesomeIcon icon={faCircleChevronDown} />,
};

const generateRoute = ({
  variant,
  projectId,
  category,
  id,
}: {
  variant: Variant;
  projectId: string;
  category?: Category;
  id?: string;
}): string => {
  if (category === "profile") {
    return `/${id}/profile/${variant}`;
  }
  if (!category) {
    return `/project/form/${projectId}/${variant}`;
  }
  if (variant === "new") {
    return `/project/${projectId}/${category}/new`;
  }
  return `/project/${projectId}/${category}/${id}/${variant}`;
};

const ButtonAction = ({
  variant,
  projectId,
  category,
  id,
  navigateTo,
  onClick,
  ...props
}: Props) => {
  const navigate = useNavigate();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [deleteChapter] = useDeleteChapterMutation();
  const [deleteCharacter] = useDeleteCharacterMutation();
  const [deletePlace] = useDeletePlaceMutation();
  const [deleteStoryArc] = useDeleteStoryArcMutation();

  const mutationMap: Record<Category, any> = {
    chapter: deleteChapter,
    character: deleteCharacter,
    place: deletePlace,
    storyarc: deleteStoryArc,
    profile: null, // pas de suppression
  };

  const handleDelete = async () => {
    if (!id || !projectId || !category) return;
    const mutation = mutationMap[category];
    if (!mutation) return;

    try {
      await mutation({ id, projectId }).unwrap();
      setShowConfirmModal(false);
      window.location.reload();
    } catch (err) {
      console.error("Erreur suppression :", err);
      alert("Erreur lors de la suppression.");
    }
  };

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
    if (variant === "delete") {
      setShowConfirmModal(true);
    } else {
      const route =
        navigateTo || generateRoute({ variant, projectId, category, id });
      navigate(route);
    }
  };

  return (
    <>
      {showConfirmModal && (
        <section className="modal-delete-container">
          <div className="modal-delete-container-modal">
            <button
              onClick={() => setShowConfirmModal(false)}
              className="modal-delete-container-close"
            >
              <FontAwesomeIcon
                icon={faXmark}
                className="modal-delete-container__icon"
              />
            </button>
            <div className="modal-delete-container__content">
              <h2>Confirmer la suppression</h2>
              <p>Êtes-vous sûr de vouloir supprimer cet élément ?</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "1rem",
                  marginTop: "1.5rem",
                }}
              >
                <button
                  style={{
                    background: "#ccc",
                    padding: "0.4rem 0.8rem",
                    borderRadius: 4,
                  }}
                  onClick={() => setShowConfirmModal(false)}
                >
                  Annuler
                </button>
                <button
                  style={{
                    background: "red",
                    color: "#fff",
                    padding: "0.4rem 0.8rem",
                    borderRadius: 4,
                  }}
                  onClick={handleDelete}
                >
                  Supprimer
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <button
        className={`button ${props.className}`}
        {...props}
        onClick={handleClick}
      >
        {variantLabels[variant]}
      </button>
    </>
  );
};

export default ButtonAction;
