// custom types
import type { ContentfulContact } from '../../types/contentful';

// props type
type ContactProps = {
  contentfulData: ContentfulContact;
};

const Contact = ({ contentfulData }: ContactProps) => {
  // destructure fields out of contentfulData for cleaner jsx
  const { copy, linksCollection, title } = contentfulData;

  return (
    <div className='wrapper'>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
};

export default Contact;
