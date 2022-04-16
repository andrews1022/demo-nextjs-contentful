// next
import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';

// components
import Projects from '../components/Projects';

// custom types
import type {
  ContentfulAboutMe,
  ContentfulBlogPost,
  ContentfulContact,
  ContentfulHero,
  ContentfulProjectGroup
} from '../types/contentful';
import BlogPosts from '../components/BlogPosts';

type ContentfulData = {
  blogPostCollection: {
    items: ContentfulBlogPost[];
  };
};

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

type HomeProps = {
  data: {
    blogPostCollection: {
      items: ContentfulBlogPost[];
    };
  };
};

const Home: NextPage<HomeProps> = ({ data }) => {
  // console.log('data: ', data);

  return (
    <>
      <Head>
        <title>Andrew Shearer Dev Portfolio</title>
        <meta name='description' content="Andrew Shearer's front end developer portfolio" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <BlogPosts contentfulData={data.blogPostCollection.items} />
        {/* <Projects contentfulData={data.projectGroup} /> */}
      </main>

      <footer>
        <p>
          &copy; {new Date().getFullYear()} all rights reserved <span> | </span> designed and built
          by andrew shearer
        </p>
      </footer>
    </>
  );
};

export default Home;
