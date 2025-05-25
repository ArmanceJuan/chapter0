import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../molecules/forms/ProjectForm";
import ChapterForm from "../molecules/forms/ChapterForm";
import CharacterForm from "../molecules/forms/CharacterForm";
import PlaceForm from "../molecules/forms/PlaceForm";
import StoryArcForm from "../molecules/forms/StoryArcForm";
import { useAuthStore } from "../../store/useAuthStore";
import { useEffect } from "react";

const Edit = () => {
  const { user } = useAuthStore();
  const { userId } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id !== userId) {
      navigate("/");
    }
  }, [user, userId, navigate]);

  return (
    <div>
      {path.includes("form") && <ProjectForm />}
      {path.includes("character") && <CharacterForm />}
      {path.includes("place") && <PlaceForm />}
      {path.includes("storyarc") && <StoryArcForm />}
      {path.includes("chapter") && <ChapterForm />}
    </div>
  );
};

export default Edit;
