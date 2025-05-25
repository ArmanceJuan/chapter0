export const validateProject = (data: {
  name: string;
  description: string;
}) => {
  if (!data.name) {
    throw new Error("Le nom du projet est requis");
  }
  if (!data.description) {
    throw new Error("La description est requise");
  }
  if (data.name.length < 3 || data.name.length > 128) {
    throw new Error(
      "Le nom du projet doit être compris entre 3 et 128 caractères"
    );
  }
  if (data.description.length > 2000) {
    throw new Error("La description ne doit pas dépasser 2000 caractères");
  }
};
