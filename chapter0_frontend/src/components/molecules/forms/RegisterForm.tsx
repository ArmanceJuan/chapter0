import Input from "../../atoms/input/Input";
import Button from "../../atoms/buttons/Button";
import { useState } from "react";
import { useRegisterMutation } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [register, { isLoading }] = useRegisterMutation();
  const [errorFields, setErrorFields] = useState<{ [key: string]: string }>({});
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorFields({});
    setSuccess("");

    try {
      await register({ email, username, password, isAdmin }).unwrap();
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
        type="text"
        placeholder="Nom d'utilisateur"
        id="username"
        value={username}
        children="Nom d'utilisateur"
        onChange={(e) => setUsername(e.target.value)}
      />
      {errorFields.username && (
        <p className="error-message">{errorFields.username}</p>
      )}
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
      )}
      <div className="checkbox-field">
        <input
          type="checkbox"
          id="isAdmin"
          checked={isAdmin}
          onChange={(e) => setIsAdmin(e.target.checked)}
        />
        <label htmlFor="isAdmin">Administrateur</label>
      </div>
      {success && <p className="auth-form-success">{success}</p>}
      <Button
        type="submit"
        className="auth-form-container__button"
        disabled={isLoading}
      >
        {isLoading ? "Inscription en cours..." : "S'inscrire"}
      </Button>
    </form>
  );
};

export default RegisterForm;
