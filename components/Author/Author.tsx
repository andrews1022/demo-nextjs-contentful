// components
import NextImage from '../NextImage/NextImage';

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
      <NextImage imageData={authorData.image} />
    </S.ImageWrapper>

    <S.TextWrapper className='text-wrapper'>
      <h3>{authorData.name}</h3>
      <p>{authorData.bio}</p>
    </S.TextWrapper>
  </S.Wrapper>
);

export default Author;
