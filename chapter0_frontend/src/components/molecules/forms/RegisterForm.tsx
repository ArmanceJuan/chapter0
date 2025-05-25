import Input from "../../atoms/input/Input";
import Button from "../../atoms/buttons/Button";
import { useState } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useRegisterMutation } from "../../../store/slices/authSlice";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [register] = useRegisterMutation();
  const setAuthState = useAuthStore((state) => state.setAuthState);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await register({ email, username, password }).unwrap();
      console.log("Payload envoyé :", { email, username, password });

      setAuthState({ token: response.token, user: response.user });
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-container">
      <Input
        type="text"
        placeholder="Nom d'utilisateur"
        id="username"
        value={username}
        children="Nom d'utilisateur"
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type="email"
        placeholder="Email"
        id="email"
        value={email}
        children="Email"
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        id="password"
        value={password}
        children="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button type="submit" className="auth-form-container__button">
        S'inscrire
      </Button>
    </form>
  );
};

export default RegisterForm;
