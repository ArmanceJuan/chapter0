const sanitizeUsername = (username: string) => {
  return username.replace(/[^\w.-]/g, "").trim();
};

const sanitizeEmail = (email: string) => {
  return email
    .replace(/[^\w.@+-]/g, "")
    .trim()
    .toLowerCase();
};

export const sanitizeData = (data: {
  username: string;
  email: string;
  password: string;
}) => {
  return {
    username: sanitizeUsername(data.username),
    email: sanitizeEmail(data.email),
    password: data.password,
  };
};
