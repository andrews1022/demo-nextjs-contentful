// components
import Complex from './Complex/Complex';
import Simple from './Simple/Simple';

// styled components
import * as S from './BlogPosts.styles';
import { Wrapper } from '../UI/Wrapper';

// custom types
import type { ContentfulBlogPost } from '../../types/contentful';

// props type
type BlogPostsProps = {
  mode: 'complex' | 'simple';
  posts: ContentfulBlogPost[];
};

const BlogPosts = ({ mode, posts }: BlogPostsProps) => (
  <Wrapper>
    <S.Grid>{mode === 'complex' ? <Complex posts={posts} /> : <Simple posts={posts} />}</S.Grid>
  </Wrapper>
);

export default BlogPosts;
