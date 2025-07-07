import { useLocation, useNavigate, useParams } from "react-router-dom";
import ProjectForm from "../molecules/forms/ProjectForm";
import ChapterForm from "../molecules/forms/ChapterForm";
import CharacterForm from "../molecules/forms/CharacterForm";
import PlaceForm from "../molecules/forms/PlaceForm";
import StoryArcForm from "../molecules/forms/StoryArcForm";
import { useEffect } from "react";
import { useGetUserQuery } from "../../store/slices/authSlice";

type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};

const Edit = () => {
  const { data: user, isLoading } = useGetUserQuery() as {
    data: User | undefined;
    isLoading: boolean;
  };
  const { userId } = useParams();
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && user && user.id !== userId) {
      navigate("/");
    }
  }, [user, userId, navigate, isLoading]);

  if (isLoading) return <p>Chargement...</p>;

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
