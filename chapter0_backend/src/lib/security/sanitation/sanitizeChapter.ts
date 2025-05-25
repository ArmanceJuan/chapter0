const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
};

export const sanitizeChapter = (data: {
  name: string;
  number: number;
  content: string;
  version: string;
  status: boolean;
}) => {
  return {
    name: data.name.replace(/[^\w\s.-]/g, "").trim(),
    number: data.number,
    content: escapeHtml(data.content.trim()),
    version: data.version.replace(/[^\w\s.-]/g, "").trim(),
    status: data.status,
  };
};
