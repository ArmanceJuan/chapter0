export const validatePlace = (data: {
  name: string;
  description: string;
  history: string;
  location: string;
  imageUrl: string;
  status: boolean;
}) => {
  if (!data.name) {
    throw new Error("Le nom est requis");
  }
  if (!data.status) {
    throw new Error("Le statut est requis");
  }
  if (data.name.length < 3 || data.name.length > 128) {
    throw new Error("Le nom doit être compris entre 3 et 128 caractères");
  }
  if (data.description.length > 2000) {
    throw new Error("La description ne doit pas dépasser 2000 caractères");
  }
  if (data.history.length > 2000) {
    throw new Error("L'histoire ne doit pas dépasser 2000 caractères");
  }
  if (data.location.length > 2000) {
    throw new Error("La localisation ne doit pas dépasser 2000 caractères");
  }
  if (data.imageUrl.length > 2000) {
    throw new Error("L'image ne doit pas dépasser 2000 caractères");
  }
};
