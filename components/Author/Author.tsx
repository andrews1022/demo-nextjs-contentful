import Image from 'next/image';

// styled components
import * as S from './Author.styles';

// custom types
import { ContentfulAuthor } from '../../types/contentful';

// props type
type AuthorProps = {
  authorData: ContentfulAuthor;
};

const Author = ({ authorData }: AuthorProps) => (
  <S.Wrapper>
    <S.ImageWrapper>
      <Image
        src={authorData.image.url}
        alt={authorData.image.description}
        height={authorData.image.height}
        width={authorData.image.width}
        placeholder='blur'
        blurDataURL={authorData.image.url}
      />
    </S.ImageWrapper>

    <S.TextWrapper className='text-wrapper'>
      <h3>{authorData.name}</h3>
      <p>{authorData.bio}</p>
    </S.TextWrapper>
  </S.Wrapper>
);

export default Author;
