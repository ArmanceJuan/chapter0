import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  email: string;
  username: string;
  isAdmin: boolean;
};
type AuthState = {
  token: string | null;
  user: User | null;
  setAuthState: (data: { token: string; user: User }) => void;
  clearAuthState: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setAuthState: ({ token, user }) =>
        set({
          token: token,
          user: user,
        }),
      clearAuthState: () => set({ token: null, user: null }),
    }),
    {
      name: "auth-store",
    }
  )
);
