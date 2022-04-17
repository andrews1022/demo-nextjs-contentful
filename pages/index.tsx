// next
import type { GetStaticProps, NextPage } from 'next';

// components
import BlogPosts from '../components/BlogPosts/BlogPosts';

// utils
import { gql } from '../utils/gql';

// graphql fragments
import { FRAGMENT_CONTENTFUL_IMAGE } from '../graphql/fragments';

// custom types
import type { ContentfulBlogPost } from '../types/contentful';

type GraphQLResponse = {
  data: {
    blogPostCollection: {
      items: ContentfulBlogPost[];
    };
  };
};

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

  const { data }: GraphQLResponse = await response.json();

  return {
    props: {
      data
    }
  };
};

type HomeProps = GraphQLResponse;

const Home: NextPage<HomeProps> = ({ data }) => (
  <main>
    <BlogPosts posts={data.blogPostCollection.items} />
  </main>
);

export default Home;
