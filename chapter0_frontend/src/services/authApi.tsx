import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/api/user/login", {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (email: string, password: string) => {
  const response = await axios.post("/api/user/register", {
    email,
    password,
  });
  return response.data;
};
