import React from 'react';
import '../static/css/project.css';
import { useProjectContext } from '../ProjectContext';

function InfoContainer() {
    const { showProjectModal } = useProjectContext();

    return (
        <div className="project-container" id="infoPane" style={{paddingLeft: '2rem'}}>
            <div className="nav-block">
                <div className="lay-column three" style={{minWidth: '300px'}}>
                <span className="title">Welcome to Gromit</span>
                <span>A lightweight iconfont generator</span>
                </div>
            </div>
            <div className="page-content">
                <div className="tabs-block">
                <button className="bold-button fit accent" 
                    id="addProjectButton" 
                    onClick={() => showProjectModal(null)}
                >
                    New Project
                    <i className="icon-add" style={{marginLeft: '0.25rem', fontSize: '1.5rem'}} />
                </button>
                <button className="bold-button fit" disabled>Import Existing Project</button>
                <button className="bold-button fit" disabled>Project Templates</button>
                </div>

                <hr/>

                <span className="heading">INFO</span>
                Gromit is an open source iconfont generator. I made it because I wanted a more straightforward way to generate iconfonts for use in web applications.

                <span className="heading">LINKS</span>
                <div className="info-block">
                <a className="info-link" href=""><i className="icon-redirect" style={{marginRight: '0.25rem', fontSize: '1.5rem'}}></i><span>About</span></a>
                <a className="info-link" href="https://github.com/SlickRamen/gromit"><i className="icon-github-mark" style={{marginRight: '0.25rem', fontSize: '1.5rem'}}></i><span>Source Code (GitHub)</span></a>
                </div>
            </div>
        </div>
    );
}

export default InfoContainer;