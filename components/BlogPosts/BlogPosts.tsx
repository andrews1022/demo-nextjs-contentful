import Image from 'next/image';
import Link from 'next/link';

// custom types
import type { ContentfulBlogPost } from '../../types/contentful';

type BlogPostsProps = {
  posts: ContentfulBlogPost[];
};

const dummyStyles = {
  border: '1px solid red',
  margin: '2rem auto',
  padding: '1rem',
  width: '90%'
};

const BlogPosts = ({ posts }: BlogPostsProps) => (
  <div>
    <h2>Blog Posts</h2>

    {posts.map((post) => (
      <div key={post.sys.id} style={dummyStyles}>
        <Image
          src={post.image.url}
          alt={post.image.description}
          height={post.image.height}
          width={post.image.width}
        />

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

export default BlogPosts;
