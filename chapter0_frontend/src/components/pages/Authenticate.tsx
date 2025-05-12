import { useState } from "react";
import AuthenticateButton from "../atoms/Button/AuthenticateButton";
import LoginForm from "../organisms/Form/LoginForm";
import RegisterForm from "../organisms/Form/RegisterForm";

const Authenticate = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <section>
      <div>
        <AuthenticateButton
          className={mode === "login" ? "active" : ""}
          onClick={() => setMode("login")}
        >
          Connexion
        </AuthenticateButton>
        <AuthenticateButton
          className={mode === "register" ? "active" : ""}
          onClick={() => setMode("register")}
        >
          Inscription
        </AuthenticateButton>
      </div>
      <div>{mode === "login" ? <LoginForm /> : <RegisterForm />}</div>
    </section>
  );
};

export default Authenticate;
