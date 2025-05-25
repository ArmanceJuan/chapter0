const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

export const sanitizeCharacter = (data: {
  name: string;
  age: number;
  description: string;
  history: string;
  psychologicalProfile: string;
  relationships: string;
  imageUrl: string;
  status: boolean;
}) => {
  return {
    name: data.name.replace(/[^\w\s.-]/g, "").trim(),
    age: data.age,
    description: escapeHtml(data.description.trim()),
    history: escapeHtml(data.history.trim()),
    psychologicalProfile: escapeHtml(data.psychologicalProfile.trim()),
    relationships: escapeHtml(data.relationships.trim()),
    imageUrl: data.imageUrl.trim(),
    status: data.status,
  };
};
