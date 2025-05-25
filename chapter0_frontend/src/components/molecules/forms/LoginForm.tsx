import Input from "../../atoms/input/Input";
import Button from "../../atoms/buttons/Button";
import { useState } from "react";
import { useLoginMutation } from "../../../store/slices/authSlice";
import { useAuthStore } from "../../../store/useAuthStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login] = useLoginMutation();
  const setAuthState = useAuthStore((state) => state.setAuthState);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      setAuthState({ token: response.token, user: response.user });
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form-container">
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
        Se connecter
      </Button>
    </form>
  );
};

export default LoginForm;
