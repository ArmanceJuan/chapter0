import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";

const RegisterForm = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted");
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input type="text" placeholder="Username" children="Nom d'utilisateur" />
      <Input type="email" placeholder="Email" children="Email" />
      <Input type="password" placeholder="Password" children="Mot de passe" />
      <Button type="submit">S'inscrire</Button>
    </form>
  );
};

export default RegisterForm;
