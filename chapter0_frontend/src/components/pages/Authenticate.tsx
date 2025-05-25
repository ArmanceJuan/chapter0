import { useState } from "react";
import LoginForm from "../molecules/forms/LoginForm";
import RegisterForm from "../molecules/forms/RegisterForm";
import Button from "../atoms/buttons/Button";

const Authenticate = () => {
  const [mode, setMode] = useState<"login" | "register">("login");
  return (
    <section className="auth-form-container">
      <div className="auth-form-container__tabs">
        <Button
          className={`auth-form-container__tabs_button ${
            mode === "login" ? "auth-form-container__tabs_active" : ""
          }`}
          onClick={() => setMode("login")}
        >
          Connexion
        </Button>
        <Button
          className={`auth-form-container__tabs_button ${
            mode === "register" ? "auth-form-container__tabs_active" : ""
          }`}
          onClick={() => setMode("register")}
        >
          Inscription
        </Button>
      </div>
      {mode === "login" ? <LoginForm /> : <RegisterForm />}
    </section>
  );
};

export default Authenticate;
