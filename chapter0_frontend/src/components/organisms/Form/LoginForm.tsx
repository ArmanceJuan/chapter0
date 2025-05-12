import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../../services/authApi";

const LoginForm = () => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password } = data;
    const response = await loginUser(email, password);
    console.log(response);
    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder="Email"
        children="Email"
        onChange={handleChange}
      />
      <Input
        type="password"
        placeholder="Mot de passe"
        children="Mot de passe"
        onChange={handleChange}
      />
      <Button type="submit">Se connecter</Button>
    </form>
  );
};

export default LoginForm;
