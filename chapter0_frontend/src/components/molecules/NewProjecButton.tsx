import { useState } from "react";
import AddProjectModal from "../atoms/AddProjectModal";

const NewProjecButton = () => {
  const [openModel, setOpenModel] = useState(false);

  return (
    <>
      <button className="new-projectbutton" onClick={() => setOpenModel(true)}>
        Ajouter un Projet
      </button>
      {openModel && <AddProjectModal onClose={() => setOpenModel(false)} />}
    </>
  );
};

export default NewProjecButton;
