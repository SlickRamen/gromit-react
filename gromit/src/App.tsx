import MainContainer from './components/MainContainer';
import Sidebar from './components/Sidebar';
import './static/css/styles.css';
import './static/css/colours.css';
import { useEffect, useState } from 'react';
import { ProjectContext } from './ProjectContext';
import ProjectModal from './components/ProjectModal';
import DeleteModal from './components/DeleteModal';

function App() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [showModal, setShowModal] = useState("none");
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);


  const addProject = (project: Project) => {
    setProjects(prev => [...prev, project]);
  };

  const showProjectModal = (project: Project | null) => {
    setEditingProject(project);
    setShowModal("create");
  }

  const showDeleteModal = () => {
    setShowModal("delete");
  }



  const selectProject = (project: Project | null) => {
    setSelectedProject(project);
  }

  // Load projects from local storage
  useEffect(() => {
    const saved = localStorage.getItem("projects");
    if (saved) {
      try {
        setProjects(JSON.parse(saved));
      } catch (e) {
        console.error("Invalid JSON in localStorage");
      }
    }
    setLoaded(true);
  }, []);

  // Save when projects change
  useEffect(() => {
    if (loaded) {
      localStorage.setItem("projects", JSON.stringify(projects));
    }
  }, [projects, loaded]);


  return (
    <ProjectContext.Provider value={{ addProject, projects, setProjects, showDeleteModal, showProjectModal, selectProject }}>
      <>
        <div className="page">
          <div className="layout">
            <div className="lay-column three" style={{minWidth: '200px', maxWidth: '200px'}}>
              <Sidebar projects={projects}/>
            </div>
            <div className="lay-column seven">
              <div className="main-content">
                <div className="main-content-scroll">
                  <MainContainer selectedProject={selectedProject}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {showModal === "create" && (
          <ProjectModal
            onClose={() => setShowModal("none")}
            onSubmit={({ name, description }) => {
              if (editingProject) {
                // Update the existing project
                setProjects((prevProjects) =>
                  prevProjects.map((project) =>
                    project.id === editingProject.id
                      ? { ...project, name, description }
                      : project
                  )
                );
              } else {
                // Add a new project
                addProject({
                  id: Date.now().toString(),
                  name,
                  description,
                  icons: []
                });
              }
            }}
            project={editingProject}
          />
        )}


        {showModal === "delete" && selectedProject && (
          <DeleteModal
            onClose={() => setShowModal("none")}
            onSubmit={(projectToDelete) => {
              setProjects(prev => prev.filter(p => p.id !== projectToDelete.id));
              setSelectedProject(null);
            }}
            project={selectedProject}
          />
        )}
      </>
    </ProjectContext.Provider>
  );
}

export default App;
