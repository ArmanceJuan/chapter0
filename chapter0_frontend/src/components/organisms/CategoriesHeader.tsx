import ButtonAction from "../atoms/buttons/ButtonAction";

type Props = {
  title: string;
  description: string;
  status: boolean;
  projectId: string;
  createdAt?: string;
  updatedAt?: string;
};

const CategoriesHeader = ({ status, createdAt, updatedAt }: Props) => {
  return (
    <article>
      <p>Créé le {createdAt}</p>
      <p>Modifié le {updatedAt}</p>
      <p>Statut : {status ? "Actif" : "Inactif"}</p>
    </article>
  );
};

export default CategoriesHeader;
