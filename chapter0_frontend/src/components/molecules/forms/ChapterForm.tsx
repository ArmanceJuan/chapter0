import { useEffect, useState } from "react";
import {
  useCreateChapterMutation,
  useGetChapterQuery,
} from "../../../store/slices/chapterSlice";
import { useNavigate, useParams } from "react-router-dom";
import { useProjectStore } from "../../../store/projectStore";
import Input from "../../atoms/input/Input";
import TextArea from "../../atoms/textArea/TextArea";

type Props = {
  isEdit?: boolean;
};

const ChapterForm = ({ isEdit }: Props) => {
  const projectId = useProjectStore((state) => state.projectId);
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [content, setContent] = useState("");
  const [version, setVersion] = useState("");
  const [status, setStatus] = useState(false);

  const [createChapter] = useCreateChapterMutation();

  const { data: existingChapter, isSuccess } = useGetChapterQuery(
    { id: chapterId, projectId },
    { skip: !isEdit || !chapterId || !projectId }
  );

  useEffect(() => {
    if (isEdit && existingChapter && isSuccess) {
      const chapter = existingChapter[0];
      setName(chapter.name);
      setNumber(chapter.number);
      setContent(chapter.content);
      setVersion(chapter.version);
      setStatus(chapter.status);
    }
  }, [existingChapter, isEdit]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await createChapter({
        name,
        number,
        content,
        version,
        status,
        projectId,
      }).unwrap();
      const chapterId = response.chapter?.[0]?.id;
      if (chapterId) {
        navigate(`/project/${projectId}/chapter/${chapterId}/view`);
      }
    } catch (error) {
      console.error("Erreur lors de la création du projet :", error);
    }
  };
  return (
    <form onSubmit={handleSubmit} className="form-container">
      {isEdit ? (
        <h1>Editer le chapitre</h1>
      ) : (
        <h1>Créer un nouveau chapitre</h1>
      )}
      <Input
        type="text"
        placeholder="Titre"
        id="name"
        value={name}
        children="Titre du chapitre"
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Numéro de chapitre"
        id="number"
        value={number}
        children="Numéro du chapitre"
        onChange={(e) => setNumber(e.target.value)}
      />
      <Input
        type="number"
        placeholder="Version"
        id="version"
        value={version}
        children="Version du chapitre"
        onChange={(e) => setVersion(e.target.value)}
      />
      <TextArea
        placeholder="Contenu"
        id="content"
        value={content}
        children="Contenu du chapitre"
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit" className="form-container__button">
        {isEdit ? "Editer" : "Créer"}
      </button>
    </form>
  );
};

export default ChapterForm;
