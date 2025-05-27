export const validateCharacter = (data: {
  name: string;
  age: number;
  description: string;
  history: string;
  psychologicalProfile: string;
  relationships: string;
  imageUrl: string;
  status: boolean;
}) => {
  if (!data.name) {
    throw new Error("Le nom est requis");
  }
  if (!data.age) {
    throw new Error("L'âge est requis");
  }
  if (data.name.length < 3 || data.name.length > 128) {
    throw new Error("Le nom doit être compris entre 3 et 128 caractères");
  }
  if (data.age < 1 || data.age > 100) {
    throw new Error("L'âge doit être compris entre 1 et 100");
  }
  if (data.description.length > 2000) {
    throw new Error("La description ne doit pas dépasser 2000 caractères");
  }
  if (data.history.length > 2000) {
    throw new Error("L'histoire ne doit pas dépasser 2000 caractères");
  }
  if (data.psychologicalProfile.length > 2000) {
    throw new Error(
      "Le profil psychologique ne doit pas dépasser 2000 caractères"
    );
  }
  if (data.relationships.length > 2000) {
    throw new Error("Les relations ne doit pas dépasser 2000 caractères");
  }
  if (data.imageUrl.length > 2000) {
    throw new Error("L'image ne doit pas dépasser 2000 caractères");
  }
};
