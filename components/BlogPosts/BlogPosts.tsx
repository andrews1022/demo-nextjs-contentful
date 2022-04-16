// custom types
import type { DevPost } from '../../types/dev';

// props type
type BlogPostsProps = {
  posts: DevPost[];
};

const BlogPosts = ({ posts }: BlogPostsProps) => {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
