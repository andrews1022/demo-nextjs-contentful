// custom types
import Link from 'next/link';
import type { ContentfulBlogPost } from '../types/contentful';

type BlogPostsProps = {
  contentfulData: ContentfulBlogPost[];
};

// destructure and rename to posts
const BlogPosts = ({ contentfulData: posts }: BlogPostsProps) => {
  console.log('posts: ', posts);

  return (
    <div>
      <h2>Blog Posts</h2>

      {posts.map((post) => (
        <div key={post.sys.id}>
          <h3>{post.title}</h3>
          <p>
            View post <Link href={`/blog/${post.slug}`}>here</Link>
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
