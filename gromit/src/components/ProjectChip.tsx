import { useEffect, useState } from "react";
import { useProjectContext } from "../ProjectContext";

type Props = {
  project: Project;
};

function ProjectChip({ project }: Props) {
    const { selectProject } = useProjectContext();
    const [isExpanded, setExpanded] = useState<boolean>(false);

    const toggleProject = () => {
        setExpanded((prev: any) => (!prev));
    };


    return (
        <span className="project-wrapper">
            <span className="project-id-label" style={{ display: "none" }}>
                {project.id}
            </span>

            <a
                href="#"
                className={'project-name project-content ' + (isExpanded ? 'active' : '')}
                onClick={e => {
                    e.preventDefault();
                    toggleProject();
                    selectProject(project);
                }}
            >
                {project.name}
            </a>

            {isExpanded && (
                <div className="package">
                    {project.icons.map((item, index) => (
                        <div
                            key={index}
                            className="project-item"
                            style={{
                            backgroundImage: `url(${item.data})`,
                            }}
                        >
                            {item.name.split(".")[0]}
                        </div>
                    ))}
                </div>
            )}
        </span>
    )
}

export default ProjectChip