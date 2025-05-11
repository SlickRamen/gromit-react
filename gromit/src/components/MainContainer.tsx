import React from 'react';
import InfoContainer from './InfoContainer';
import ProjectContainer from './ProjectContainer';

type Props = {
    selectedProject: (Project | null);
}

function MainContainer({ selectedProject }: Props) {
    return (
        <>
            { selectedProject == null ? (
                <InfoContainer />
            ) : (
                <ProjectContainer project={selectedProject} />
            )}
            
        </>
    );
}

export default MainContainer;