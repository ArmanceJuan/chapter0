export const validateUsername = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  if (!data.username) {
    throw new Error("Le username est requis");
  }
  if (!data.email) {
    throw new Error("L'email est requis");
  }
  if (!data.password) {
    throw new Error("Le mot de passe est requis");
  }
  if (data.username.length < 3 || data.username.length > 128) {
    throw new Error("Le username doit être compris entre 3 et 128 caractères");
  }
  if (data.email.length < 4 || data.email.length > 128) {
    throw new Error("L'email doit être compris entre 4 et 128 caractères");
  }
  if (!/^[a-zA-Z0-9!@#$%^&*]{8,128}$/.test(data.password)) {
    throw new Error(
      "Le mot de passe doit contenir au moins 8 caractères, et maximum 128"
    );
  }
  if (!data.email.includes("@")) {
    throw new Error("L'email doit contenir un @");
  }
};
