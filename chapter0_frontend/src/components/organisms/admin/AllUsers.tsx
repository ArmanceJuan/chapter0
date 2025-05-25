import { useGetAllUsersQuery } from "../../../store/slices/adminSlice";

const AllUsers = () => {
  const { data: users, isLoading, error } = useGetAllUsersQuery();
  console.log("users:", users);
  if (isLoading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur lors de la récupération des utilisateurs</p>;
  return (
    <section className="content-container">
      <h1>Projets</h1>

      {users.length === 0 ? (
        <section className="project-select-container">
          <p>Aucun projet</p>
        </section>
      ) : (
        <section className="project-select-container">
          <ul>
            {users.map((user: any) => (
              <li key={user.id}>
                <h4>{user.username}</h4>
                <p>{user.email}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};

export default AllUsers;
