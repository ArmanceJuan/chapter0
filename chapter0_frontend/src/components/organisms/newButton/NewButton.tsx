import { useState } from "react";
import ButtonNewMenu from "../../molecules/menus/ButtonNewMenu";
import { useProjectStore } from "../../../store/projectStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const NewButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const projectId = useProjectStore((state) => state.projectId);

  if (!projectId) {
    return null;
  }

  return (
    <div>
      {isMenuOpen && (
        <ButtonNewMenu
          projectId={projectId}
          closeMenu={() => setIsMenuOpen(false)}
        />
      )}
      <button
        onClick={() => setIsMenuOpen((prev) => !prev)}
        className="button-new"
      >
        <FontAwesomeIcon icon={faPlus} className="button-new__icon" />
      </button>
    </div>
  );
};

export default NewButton;
