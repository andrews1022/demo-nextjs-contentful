import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';
import type { ContentfulBlogPost } from '../../types/contentful';

type ContentfulPathsResponse = {
  data: {
    blogPostCollection: {
      items: ContentfulBlogPost[];
    };
  };
};

type ContentfulPropsResponse = {
  data: {
    blogPostCollection: {
      items: ContentfulBlogPost[];
    };
  };
};

const gql = String.raw;

export const getStaticPaths: GetStaticPaths = async () => {
  // get contentful data
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: gql`
          query ProjectPageQuery {
            blogPostCollection {
              items {
                slug
              }
            }
          }
        `
      })
    }
  );

  const { data }: ContentfulPathsResponse = await response.json();

  const slugs = data.blogPostCollection.items.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths: slugs,
    fallback: false // show 404 page
  };
};

// extend interface using type keyword
type IParams = ParsedUrlQuery & {
  slug: string;
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  // get contentful data
  const { slug } = params as IParams;

  // get contentful data
  const response = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        query: gql`
          query SingleProjectQuery($slug: String!) {
            blogPostCollection(where: { slug: $slug }, limit: 1) {
              items {
                content
                image {
                  description
                  height
                  sys {
                    id
                  }
                  url
                  width
                }
                title
              }
            }
          }
        `,
        variables: {
          slug
        }
      })
    }
  );

  const { data }: ContentfulPropsResponse = await response.json();

  const [blogPostData] = data.blogPostCollection.items;

  return {
    props: {
      blogPostData
    }
  };
};

// props type
type ProjectPageProps = {
  blogPostData: ContentfulBlogPost;
};

const ProjectPage: NextPage<ProjectPageProps> = ({ blogPostData }) => (
  <div>
    {/* dyanmic head for seo */}
    <Head>
      <title>{blogPostData.title} | Andrew Shearer Dev Portfolio</title>
      <meta name='description' content={blogPostData.title} />
    </Head>

    <h1>Blog Post Page</h1>

    <p>
      This is the blog post page for <strong>{blogPostData.title}</strong>
    </p>

    <Link href='/'>Go Back Home</Link>
  </div>
);

export default ProjectPage;
