import { useProjectStore } from "../../store/projectStore";
import { useGetUsersByProjectQuery } from "../../store/slices/usersProjectSlice";

const CategoriesSection = () => {
  const { projectId } = useProjectStore();
  const {
    data: users,
    isLoading,
    isError,
  } = useGetUsersByProjectQuery(projectId);

  if (isLoading) return <p>Chargement des utilisateurs...</p>;
  if (isError) return <p>Erreur lors de la récupération des utilisateurs</p>;
  return (
    <article>
      <h3>Utilisateurs travaillant sur ce projet : </h3>
      <ul>
        {users?.map((user: any) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </article>
  );
};

export default CategoriesSection;
