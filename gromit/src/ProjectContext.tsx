import React, { createContext, useContext } from "react";

type ProjectContextType = {
  addProject: (project: Project) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  showProjectModal: (project: Project | null) => void;
  showDeleteModal: () => void;
  selectProject: (project: Project | null) => void;
};

export const ProjectContext = createContext<ProjectContextType | null>(null);

export const useProjectContext = () => {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error("useProjectContext must be used inside ProjectProvider");
  return ctx;
};