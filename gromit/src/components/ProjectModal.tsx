import React, { useState, useEffect } from 'react';
import '../static/css/modal.css';

type Props = {
  onClose: () => void;
  onSubmit: (project: Project) => void;
  project?: Project | null; // Optional project to edit
};

function ProjectModal({ onClose, onSubmit, project }: Props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  // Set the initial state if editing an existing project
  useEffect(() => {
    if (project) {
      setName(project.name);
      setDescription(project.description);
    }
  }, [project]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return; // Ensure name is not empty

    onSubmit({
      id: project ? project.id : Date.now().toString(), // Use existing id for editing, new id for creating
      name,
      description,
      icons: project ? project.icons : [], // Use existing icons or empty array for new project
    });
    onClose(); // Close the modal after submission
  }

  return (
    <div className="modal" id="projectModal">
      <div className="modal-content">
        <form id="addProjectForm" onSubmit={handleSubmit}>
          <div className="modal-header">
            <span className="modal-title">{project ? 'Edit Project' : 'Create a New Gromit Project'}</span>
            <span className="close" onClick={onClose}>&times;</span>
          </div>
          <div className="modal-body">
            <label htmlFor="name" className="modal-label">Project Name</label>
            <input
              type="text"
              className="text-box"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><br /><br />

            <label htmlFor="description" className="modal-label">Project Description</label>
            <input
              type="text"
              className="text-box"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            /><br /><br />
          </div>
          <div className="modal-footer">
            <button className="bold-button accent" type="submit">
              {project ? 'Save Changes' : 'Create Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProjectModal;
