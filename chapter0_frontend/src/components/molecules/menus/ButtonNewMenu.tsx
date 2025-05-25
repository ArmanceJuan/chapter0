import { useNavigate } from "react-router-dom";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  projectId: string;
  closeMenu: () => void;
};

const categories = [
  { label: "Chapitre", value: "chapter" },
  { label: "Arc narratif", value: "storyarc" },
  { label: "Lieu", value: "place" },
  { label: "Personnage", value: "character" },
  { label: "Projet", value: "project" },
];

const ButtonNewMenu = ({ projectId, closeMenu }: Props) => {
  const navigate = useNavigate();

  const handleClick = (category: string) => {
    const route = category.includes("project")
      ? `/project/form/create`
      : `/project/${projectId}/${category}/new`;
    navigate(route);
    closeMenu();
  };
  return (
    <div className="button-new-menu">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => handleClick(category.value)}
          className="button-new-menu__item"
        >
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonNewMenu;
