import { FC } from "react"
import { ILocalizedProject } from "types/Projects"

interface IProps {
  project: ILocalizedProject
}

const ProjectCard: FC<IProps> = ({ project }) => {
  return (
    <div>
      <h3>{project.name}</h3>
      <p>{project.description}</p>
    </div>
  )
}

export default ProjectCard
