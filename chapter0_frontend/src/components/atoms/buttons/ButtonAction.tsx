import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEdit,
  faPlus,
  faTrash,
  faCircleChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import type { JSX } from "react";

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
  console.log("id:", id);
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

  const handleClick = () => {
    if (onClick) {
      return onClick();
    }
    if (variant === "delete") {
      console.log("Suppression de :", id);
    } else {
      const route =
        navigateTo || generateRoute({ variant, projectId, category, id });
      navigate(route);
    }
  };

  return (
    <button
      className={`button ${props.className}`}
      {...props}
      onClick={handleClick}
    >
      {variantLabels[variant]}
    </button>
  );
};

export default ButtonAction;
