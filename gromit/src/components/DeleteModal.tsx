import React, { useState, useEffect } from 'react';
import '../static/css/modal.css';

type Props = {
  onClose: () => void;
  onSubmit: (project: Project) => void;
  project: Project;
};

function DeleteModal({ onClose, onSubmit, project }: Props) {

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit(project);

    onClose(); // Close the modal after submission
  }

  return (
    <div className="modal" id="projectModal">
      <div className="modal-content">
        <form id="addProjectForm" onSubmit={handleSubmit}>
          <div className="modal-header">
            <span className="modal-title">{'Delete ' + project.name + '?'}</span>
            <span className="close" onClick={onClose}>&times;</span>
          </div>
          <div className="modal-body">
            This action cannot be undone!
          </div>
          <div className="modal-footer">
            <button className="bold-button cancel" onClick={onClose}>
              Cancel
            </button>
            <button className="bold-button warning" type="submit">
              Delete<i className="icon-trashcan" style={{ fontSize: '1.5rem', marginLeft: '0.5rem' }}></i>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DeleteModal;
