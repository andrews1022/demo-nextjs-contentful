import Image from 'next/image';

// custom types
import { ContentfulImage } from '../../types/contentful';

type NextImageProps = {
  imageData: ContentfulImage;
};

const NextImage = ({ imageData }: NextImageProps) => (
  <Image
    src={imageData.url}
    alt={imageData.description}
    height={imageData.height}
    width={imageData.width}
    placeholder='blur'
    blurDataURL={imageData.url}
  />
);

export default NextImage;
