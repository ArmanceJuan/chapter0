export const validateChapter = (data: {
  name: string;
  number: number;
  content: string;
  version: string;
  status: boolean;
}) => {
  if (!data.name) {
    throw new Error("Le nom est requis");
  }
  if (!data.number) {
    throw new Error("Le numéro est requis");
  }
  if (!data.version) {
    throw new Error("La version est requis");
  }
  if (data.name.length < 3 || data.name.length > 128) {
    throw new Error("Le nom doit être compris entre 3 et 128 caractères");
  }
  if (data.number < 1 || data.number > 100) {
    throw new Error("Le numéro doit être compris entre 1 et 100");
  }
  if (data.content.length > 2000) {
    throw new Error("Le contenu ne doit pas dépasser 2000 caractères");
  }
  if (data.version.length > 2000) {
    throw new Error("La version ne doit pas dépasser 2000 caractères");
  }
};
