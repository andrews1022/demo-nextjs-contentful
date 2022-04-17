import Image from 'next/image';
import Link from 'next/link';

// styled components
import * as S from './BlogPosts.styles';

// custom types
import type { ContentfulBlogPost } from '../../types/contentful';

// props type
type BlogPostsProps = {
  posts: ContentfulBlogPost[];
};

const BlogPosts = ({ posts }: BlogPostsProps) => (
  <S.Wrapper>
    <S.Grid>
      {posts.map((post) => (
        <S.Card key={post.sys.id}>
          <Image
            src={post.image.url}
            alt={post.image.description}
            height={post.image.height}
            width={post.image.width}
            placeholder='blur'
            blurDataURL={post.image.url}
          />

          <S.CardBody>
            <S.PostTitle>{post.title}</S.PostTitle>

            <Link href={`/blog/${post.slug}`}>Read Post &rarr;</Link>
          </S.CardBody>
        </S.Card>
      ))}
    </S.Grid>
  </S.Wrapper>
);

export default BlogPosts;
