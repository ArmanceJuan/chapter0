import { useState } from "react";
import { useProjectStore } from "../../store/projectStore";
import {
  useGetUsersByProjectQuery,
  useUpdateUserRoleMutation,
} from "../../store/slices/usersProjectSlice";
import { useAuthStore } from "../../store/useAuthStore";
import Select from "../atoms/Select";
import { useGetProjectQuery } from "../../store/slices/projectSlice";

const ROLES = [
  { label: "Lecteur", value: "reader" },
  { label: "Collaborateur", value: "collaborator" },
  { label: "Propriétaire", value: "owner" },
  { label: "En attente", value: "pending" },
];

type ProjectUsers = {
  id: string;
  username: string;
  email: string;
  role: "reader" | "collaborator" | "owner" | "pending";
};

const ProjectUsersList = () => {
  const { user: currentUser } = useAuthStore();
  const { projectId, setActiveProject } = useProjectStore();
  const { data: project } = useGetProjectQuery({ id: projectId });

  const {
    data: users,
    isLoading,
    error,
  } = useGetUsersByProjectQuery(projectId);

  const [updateUserRole] = useUpdateUserRoleMutation();

  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string | string>("");

  const autoriseUser =
    project?.ownerId === currentUser?.id || currentUser?.isAdmin;

  const handleChangeRole = async (userId: string) => {
    if (!selectedRole) return;
    try {
      await updateUserRole({
        projectId,
        userId,
        role: selectedRole,
      }).unwrap();
      setEditingUser(null);
      setSelectedRole("");
    } catch (error) {
      console.error("Erreur lors de la modification du rôle :", error);
    }
  };

  if (isLoading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>Erreur lors de la récupération des utilisateurs</p>;

  return (
    <div className="content-container">
      <h2>Utilisateurs du projet</h2>
      <div className="project-users-list">
        <ul>
          {users?.map((user: ProjectUsers) => (
            <li key={user.id}>
              <h4>{user.username}</h4>
              <p>{user.email}</p>
              <p>Rôle :{user.role}</p>
              {autoriseUser && user.role !== "owner" && (
                <button
                  className="button"
                  onClick={() => {
                    setEditingUser(user.id);
                    setSelectedRole(user.role);
                  }}
                >
                  Modifier le rôle
                </button>
              )}
              {editingUser === user.id && (
                <div className="project-users-list__edit-role-container">
                  <Select
                    options={ROLES}
                    value={selectedRole}
                    onChange={setSelectedRole}
                  />
                  <button
                    className="button"
                    disabled={!selectedRole}
                    onClick={() => handleChangeRole(user.id)}
                  >
                    Modifier
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectUsersList;
