import Link from 'next/link';

// components
import NextImage from '../NextImage/NextImage';

// styled components
import * as S from './BlogPosts.styles';

// utils
import { timeToRead } from '../../utils/timeToRead';

// custom types
import type { ContentfulBlogPost } from '../../types/contentful';

// props type
type BlogPostsProps = {
  posts: ContentfulBlogPost[];
};

const BlogPosts = ({ posts }: BlogPostsProps) => (
  <S.Wrapper>
    <S.MainHeading>Blog Posts</S.MainHeading>

    <S.Grid>
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

            <ul className='categories-list'>
              {post.categoriesCollection.items.map((category) => (
                <li key={category.sys.id}>{category.name}</li>
              ))}
            </ul>

            <br />

            <Link href={`/blog/${post.slug}`}>Read Post &rarr;</Link>
          </S.CardBody>
        </S.Card>
      ))}
    </S.Grid>
  </S.Wrapper>
);

export default BlogPosts;
