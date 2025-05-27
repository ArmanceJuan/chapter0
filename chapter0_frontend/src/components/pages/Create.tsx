import { useLocation } from "react-router-dom";
import ProjectForm from "../molecules/forms/ProjectForm";
import CharacterForm from "../molecules/forms/CharacterForm";
import StoryArcForm from "../molecules/forms/StoryArcForm";
import PlaceForm from "../molecules/forms/PlaceForm";
import ChapterForm from "../molecules/forms/ChapterForm";
import EditProfile from "./EditProfile";

const Create = () => {
  const location = useLocation();
  const path = location.pathname;
  const isEdit = path.includes("edit");
  return (
    <div className="create-container">
      {path.includes("form") && <ProjectForm isEdit={isEdit} />}
      {path.includes("character") && <CharacterForm isEdit={isEdit} />}
      {path.includes("place") && <PlaceForm isEdit={isEdit} />}
      {path.includes("storyarc") && <StoryArcForm isEdit={isEdit} />}
      {path.includes("chapter") && <ChapterForm isEdit={isEdit} />}
      {path.includes("profile") && <EditProfile />}
    </div>
  );
};

export default Create;
