// custom types
import type { ContentfulAboutMe } from '../../types/contentful';

// props type
type AboutProps = {
  contentfulData: ContentfulAboutMe;
};

const About = ({ contentfulData }: AboutProps) => {
  // destructure fields out of contentfulData for cleaner jsx
  const { copy, image, myTools, primaryTitle, secondaryTitle } = contentfulData;

  return (
    <div className='wrapper'>
      <h2>{primaryTitle}</h2>
      <p>{copy}</p>
    </div>
  );
};

export default About;
