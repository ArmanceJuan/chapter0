import Input from "../../atoms/input/Input";
import Button from "../../atoms/buttons/Button";
import { useState } from "react";
import { useLoginMutation } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();
  const [errorFields, setErrorFields] = useState<{ [key: string]: string }>({});

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorFields({});
    try {
      await login({ email, password }).unwrap();
      navigate("/");
    } catch (err: any) {
      if (err?.data?.fields) {
        setErrorFields(err.data.fields);
      }
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
      {errorFields.email && (
        <p className="error-message">{errorFields.email}</p>
      )}
      <Input
        type="password"
        placeholder="Mot de passe"
        id="password"
        value={password}
        children="Mot de passe"
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorFields.password && (
        <p className="error-message">{errorFields.password}</p>
      )}{" "}
      <Button
        type="submit"
        className="auth-form-container__button"
        disabled={isLoading}
      >
        {isLoading ? "Connexion en cours..." : "Se connecter"}
      </Button>
    </form>
  );
};

export default LoginForm;
