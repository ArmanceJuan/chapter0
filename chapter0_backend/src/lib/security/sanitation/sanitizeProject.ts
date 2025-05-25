const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

export const sanitizeProject = (data: {
  name: string;
  description: string;
}) => {
  return {
    name: data.name.replace(/[^\w\s.-]/g, "").trim(),
    description: escapeHtml(data.description.trim()),
  };
};
