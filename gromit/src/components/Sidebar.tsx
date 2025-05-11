import React, { useState } from 'react';
import ProjectChip from './ProjectChip';
import { useProjectContext } from '../ProjectContext';

type Props = {
  projects: Project[];
};


function Sidebar({ projects }: Props) {
    const { selectProject } = useProjectContext();

    return (
        <div className="sidebar">
            <div className="nav-block padded-container">
                <a className="title selectable" tabIndex={0} onClick={() => selectProject(null)} style={{padding: '0.5rem'}}><i className="icon-grom1" style={{marginRight: '0.5rem', fontSize: '2rem'}}></i>Gromit</a>
                <span className="subheading">ver. 0.1.1</span>
            </div>
            <div className="nav-content">
                <div className="container padded-container">
                <span className="heading">PROJECTS</span>
                <input className="text-box" placeholder="Search projects" type="text" disabled></input>
                </div>

                <div className="sidebar-project-container" id="projectList">
                    {projects.map(project => {
                        return (
                            <ProjectChip key={project.id} project={project}/>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;