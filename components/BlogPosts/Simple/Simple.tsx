import Link from 'next/link';

// styled components
import * as S from '../BlogPosts.styles';

// custom types
import type { ContentfulBlogPost } from '../../../types/contentful';

// props type
type SimpleProps = {
  posts: ContentfulBlogPost[];
};

const Simple = ({ posts }: SimpleProps) => (
  <>
    {posts.map((post) => (
      <S.Card key={post.sys.id}>
        <S.CardBody>
          <S.PostTitle>{post.title}</S.PostTitle>

          <S.PreviewText>{post.previewText}</S.PreviewText>

          <Link href={`/blog/${post.slug}`}>Read Post &rarr;</Link>
        </S.CardBody>
      </S.Card>
    ))}
  </>
);

export default Simple;
