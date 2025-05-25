import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateUserMutation } from "../../store/slices/userSlice";
import { useAuthStore } from "../../store/useAuthStore";
import Input from "../atoms/input/Input";

const EditProfile = () => {
  const { user } = useAuthStore();
  const { userId } = useParams();
  const navigate = useNavigate();

  const [updateUser] = useUpdateUserMutation();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (user?.id !== userId) {
    navigate("/");
  }

  useEffect(() => {
    if (user) {
      setEmail(user.email);
      setUsername(user.username);
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload: any = {
        id: user?.id,
        email,
        username,
      };
      if (password) {
        payload.password = password;
        payload.currentPassword = currentPassword;
        payload.confirmPassword = confirmPassword;
      }

      const response = await updateUser(payload).unwrap();
      console.log("Mis à jour du profil :", response);
      navigate(`/${user?.id}/profile`);
    } catch (error) {
      console.error("Erreur lors de la mise à jour du profil :", error);
    }
  };
  return (
    <section className="content-container">
      <form onSubmit={handleSubmit}>
        <h1>Editer mon profil</h1>
        <Input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          children="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Nom d'utilisateur"
          id="username"
          value={username}
          children="Nom d'utilisateur"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mot de passe actuel"
          id="currentPassword"
          children="Mot de passe actuel"
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Mot de passe"
          id="password"
          value={password}
          children="Mot de passe"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Confirmer le mot de passe"
          id="confirmPassword"
          value={confirmPassword}
          children="Confirmer le mot de passe"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" className="form-container__button">
          Modifier
        </button>
      </form>
    </section>
  );
};

export default EditProfile;
