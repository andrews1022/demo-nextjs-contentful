import Link from 'next/link';

// components
import NextImage from '../../NextImage/NextImage';

// styled components
import * as S from '../BlogPosts.styles';

// utils
import { timeToRead } from '../../../utils/timeToRead';

// custom types
import type { ContentfulBlogPost } from '../../../types/contentful';
import Categories from '../../Categories/Categories';

// props type
type ComplexProps = {
  posts: ContentfulBlogPost[];
};

const Complex = ({ posts }: ComplexProps) => (
  <>
    {posts.map((post) => (
      <S.Card key={post.sys.id}>
        <NextImage imageData={post.image} />

        <S.CardBody>
          <S.PostTitle>
            {post.title}

            <span>&bull;</span>

            <S.TimeToRead>{timeToRead(post.content)} min read</S.TimeToRead>
          </S.PostTitle>

          <S.PreviewText>{post.previewText}</S.PreviewText>

          <Categories addMarginBottom categories={post.categoriesCollection.items} />

          <Link href={`/blog/${post.slug}`}>Read Post &rarr;</Link>
        </S.CardBody>
      </S.Card>
    ))}
  </>
);

export default Complex;
