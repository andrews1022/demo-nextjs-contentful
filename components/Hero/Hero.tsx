// next
import Image from 'next/image';

// custom types
import type { ContentfulHero } from '../../types/contentful';

// props type
type HeroProps = {
  contentfulData: ContentfulHero;
};

const Hero = ({ contentfulData }: HeroProps) => {
  // destructure fields out of contentfulData for cleaner jsx
  const { backgroundImage, tagline, title } = contentfulData;

  return (
    <header>
      <div className='text-wrapper'>
        <h1 className='heading'>{title}</h1>
        <p className='tagline'>{tagline}</p>
      </div>

      <div className='image-wrapper'>
        <Image
          src={backgroundImage.url}
          alt={backgroundImage.description}
          height={backgroundImage.height}
          width={backgroundImage.width}
        />
      </div>
    </header>
  );
};

export default Hero;
