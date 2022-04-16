// custom types
import Link from 'next/link';
import type { ContentfulProjectGroup } from '../../types/contentful';

// props type
type ProjectsProps = {
  contentfulData: ContentfulProjectGroup;
};

const Projects = ({ contentfulData }: ProjectsProps) => {
  // destructure fields out of contentfulData for cleaner jsx
  const { copy, projectsCollection, title } = contentfulData;

  return (
    <div className='wrapper'>
      <h2 className='heading'>{title}</h2>
      <p className='tagline'>{copy}</p>

      <div className='projects'>
        {projectsCollection.items.map((project) => (
          <div className='card' key={project.sys.id}>
            <h3>{project.title}</h3>
            <div>
              View project <Link href={`/project/${project.slug}`}>here</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
