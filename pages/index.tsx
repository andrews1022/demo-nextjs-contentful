// next
import Head from 'next/head';
import type { GetStaticProps, NextPage } from 'next';

// components
import Projects from '../components/Projects';

// custom types
import type {
  ContentfulAboutMe,
  ContentfulContact,
  ContentfulHero,
  ContentfulProjectGroup
} from '../types/contentful';

type ContentfulData = {
  aboutMe: ContentfulAboutMe;
  contact: ContentfulContact;
  hero: ContentfulHero;
  projectGroup: ContentfulProjectGroup;
};

type ContentfulResponse = {
  data: ContentfulData;
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
            projectGroup(id: "6hJ1c777JLjdLQ8GfoxwNG") {
              copy
              projectsCollection {
                items {
                  codeLink
                  liveLink
                  slug
                  summary
                  sys {
                    id
                  }
                  techUsed
                  thumbnail {
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
              title
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
  data: ContentfulData;
};

const Home: NextPage<HomeProps> = ({ data }) => {
  console.log('data: ', data);

  return (
    <>
      <Head>
        <title>Andrew Shearer Dev Portfolio</title>
        <meta name='description' content="Andrew Shearer's front end developer portfolio" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main>
        <Projects contentfulData={data.projectGroup} />
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
