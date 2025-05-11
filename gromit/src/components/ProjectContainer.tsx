import React, { useEffect, useRef, useState } from 'react';
import '../static/css/project.css';
import { useProjectContext } from '../ProjectContext';

type Props = {
  project: Project;
};

function ProjectContainer({ project }: Props) {
  const { showProjectModal, showDeleteModal, projects, setProjects } = useProjectContext();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentProject = projects.find(p => p.id === project.id);
  if (!currentProject) return null; // handle error case

  const toggleEditDropdown = () => {
    dropdownRef.current?.classList.toggle('active');
  };

  async function handleGenerate() {
    // Send the project data to the backend
    const response = await fetch("http://localhost:4000/api/generate-font", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentProject), 
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Font generated successfully:", data);
    } else {
      console.error("Error generating font:", response.statusText);
    }
  }

  function formatFileName(name: string): string {
    return name
      .toLowerCase()
      .replace(/\.[^/.]+$/, "")         // remove file extension
      .replace(/[^a-z0-9]+/g, "-")      // replace non-alphanumeric with "-"
      .replace(/^-+|-+$/g, "");         // trim leading/trailing hyphens
  }

  /**
   * Deal with file input
   */
  const handleFileSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          const formattedName = formatFileName(file.name);

          setProjects(prev =>
            prev.map(p => {
              if (p.id === project.id) {
                const nameExists = p.icons.some(icon => icon.name === formattedName);

                // Don't add duplicate
                if (nameExists) {
                  console.warn(`Icon with name "${formattedName}" already exists.`);
                  return p;
                }

                const newIcon: Icon = {
                  name: formattedName,
                  data: reader.result as string,
                };

                return {
                  ...p,
                  icons: [...p.icons, newIcon],
                };
              }
              return p;
            })
          );
        }
      };
      reader.readAsDataURL(file);
    });

    // Reset file input
    event.target.value = "";
  };


  const uploadIcons = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="project-container" id="projectPane" style={{ display: 'block', paddingLeft: '2rem' }}>
      <div className="nav-block">
        <div className="lay-column three" style={{ minWidth: '300px' }}>
          <div className="lay-row align-centre" style={{ width: '100%'}}>

            <i className="icon-folder use-line-height" style={{ fontSize: '2rem', marginRight: '1rem' }}></i>
            <span className="title" id="projectTitle">{currentProject.name}</span>

            <div className="dropdown-holder" style={{ marginLeft: 'auto', marginRight: '1rem' }}>
              <button
                className="options-button cancel icon-options use-line-height"
                onClick={toggleEditDropdown}
              />
              <div className="dropdown-content" ref={dropdownRef} id="editDropdown">
                <button className="bold-button spaced cancel" onClick={() => showProjectModal(currentProject)}>
                  Edit<i className="icon-edit" style={{ fontSize: '1.5rem' }}></i>
                </button>
                <button className="bold-button spaced warning" onClick={() => showDeleteModal()}>
                  Delete<i className="icon-trashcan" style={{ fontSize: '1.5rem' }}></i>
                </button>
              </div>
            </div>
          </div>
          <span id="projectId" style={{ display: 'none' }}>{currentProject.id}</span>
          <span id="projectDescription">{currentProject.description ?? 'A Gromit project'}</span>
        </div>
      </div>

      <div className="page-content">
        <div className="tabs-block">
          <button className="bold-button fit accent">
            Glyphs<i className="icon-edit" style={{ marginLeft: '0.25rem', fontSize: '1.5rem' }}></i>
          </button>
          <button className="bold-button fit" disabled>
            Playground<i className="icon-calendar" style={{ marginLeft: '0.25rem', fontSize: '1.5rem' }}></i>
          </button>
          <button className="bold-button fit cancel" id="generateButton" onClick={handleGenerate}>
            Export Iconfont<i className="icon-redirect" style={{ marginLeft: '0.25rem', fontSize: '1.5rem' }}></i>
          </button>
        </div>

        <hr />

        <div className="button-tray">
          <button className="bold-button fit accent" onClick={uploadIcons}>
            Add Glyph<i className="icon-add" style={{ marginLeft: '0.25rem', fontSize: '1.5rem' }}></i>
          </button>
        </div>

        <input
          type="file"
          multiple
          accept=".svg"
          style={{ visibility: 'hidden', display: 'none' }}
          ref={fileInputRef}
          id="iconUpload"
          onChange={handleFileSelection}
        />

        <div id="iconGrid" className="grid-icon">
          {currentProject.icons.map((icon, index) => (
            <div key={index} className="item-icon">
              <img src={icon.data} alt={icon.name} className="display-icon"/>
              <span className="label-icon">{icon.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectContainer;
