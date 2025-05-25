const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

export const sanitizePlace = (data: {
  name: string;
  description: string;
  history: string;
  location: string;
  imageUrl: string;
  status: boolean;
}) => {
  return {
    name: data.name.replace(/[^\w\s.-]/g, "").trim(),
    description: escapeHtml(data.description.trim()),
    history: escapeHtml(data.history.trim()),
    location: escapeHtml(data.location.trim()),
    imageUrl: data.imageUrl.trim(),
    status: data.status,
  };
};
