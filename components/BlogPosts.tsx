import Link from 'next/link';

// custom types
import type { ContentfulBlogPost } from '../types/contentful';

type BlogPostsProps = {
  posts: ContentfulBlogPost[];
};

// destructure and rename to posts
// eslint-disable-next-line arrow-body-style
const BlogPosts = ({ posts }: BlogPostsProps) => {
  // console.log('posts: ', posts);

  return (
    <div>
      <h2>Blog Posts</h2>

      {posts.map((post) => (
        <div key={post.sys.id}>
          <h3>{post.title}</h3>
          <p>
            View post{' '}
            <button style={{ color: 'blue' }} type='button'>
              <Link href={`/blog/${post.slug}`}>here</Link>
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default BlogPosts;
