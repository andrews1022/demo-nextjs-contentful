// next
import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';

// custom types
import type { ContentfulBlogPost } from '../types/contentful';
import BlogPosts from '../components/BlogPosts';

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
                  description
                  height
                  sys {
                    id
                  }
                  url
                  width
                }
                slug
                sys {
                  id
                }
                title
              }
            }
          }
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

const Home: NextPage<HomeProps> = ({ data }) => {
  // eslint-disable-next-line no-console
  console.log('data: ', data);

  return (
    <main>
      <BlogPosts contentfulData={data.blogPostCollection.items} />
    </main>
  );
};

export default Home;
