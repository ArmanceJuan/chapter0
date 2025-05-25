import { create } from "zustand";
import { persist } from "zustand/middleware";

type ProjectStore = {
  projectId: string | null;
  setActiveProject: (projectId: string) => void;
  clearActiveProject: () => void;
};

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set) => ({
      projectId: null,
      setActiveProject: (projectId) => set({ projectId }),
      clearActiveProject: () => set({ projectId: "" }),
    }),
    {
      name: "project-store",
    }
  )
);
