// next
import type { GetStaticProps, NextPage } from 'next';

// components
import BlogPosts from '../components/BlogPosts/BlogPosts';

// graphql fragments
import { FRAGMENT_CONTENTFUL_IMAGE } from '../graphql/fragments';

// custom types
import type { ContentfulBlogPost } from '../types/contentful';

type ContentfulResponse = {
  data: {
    blogPostCollection: {
      items: ContentfulBlogPost[];
    };
  };
};

const gql = String.raw;

export const getStaticProps: GetStaticProps = async () => {
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
          query HomepageQuery {
            blogPostCollection {
              items {
                image {
                  ...ImageFields
                }
                slug
                sys {
                  id
                }
                title
              }
            }
          }

          ${FRAGMENT_CONTENTFUL_IMAGE}
        `
      })
    }
  );

  const { data }: ContentfulResponse = await response.json();

  return {
    props: {
      data
    }
  };
};

type HomeProps = ContentfulResponse;

const Home: NextPage<HomeProps> = ({ data }) => (
  <main>
    <BlogPosts posts={data.blogPostCollection.items} />
  </main>
);

export default Home;
