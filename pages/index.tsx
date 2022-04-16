// next
import Head from 'next/head';
import type { NextPage } from 'next';

// components
import About from '../components/About/About';
import BlogPosts from '../components/BlogPosts/BlogPosts';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Hero from '../components/Hero/Hero';
import Projects from '../components/Projects/Projects';

// custom types
import type {
  ContentfulAboutMe,
  ContentfulContact,
  ContentfulHero,
  ContentfulProjectGroup
} from '../types/contentful';
import type { DevPost } from '../types/dev';

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

export const getStaticProps = async () => {
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
            hero(id: "6QxrkJQ8nBBKwVNEx819gh") {
              backgroundImage {
                description
                height
                sys {
                  id
                }
                url
                width
              }
              tagline
              title
            }
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
            aboutMe(id: "WfAgE4X0zNssIAqxH2rPo") {
              primaryTitle
              copy
              secondaryTitle
              myTools
              image {
                description
                height
                sys {
                  id
                }
                url
                width
              }
            }
            contact(id: "5AzhRGIP6WBOFen2llPXvK") {
              copy
              linksCollection {
                items {
                  iconCode
                  link
                  name
                  sys {
                    id
                  }
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

  // get dev.to data
  const postsResponse = await fetch('https://dev.to/api/articles?username=andrews1022&per_page=2');
  const posts: DevPost[] = await postsResponse.json();

  return {
    props: {
      data,
      posts
    }
  };
};

type HomeProps = {
  data: ContentfulData;
  posts: DevPost[];
};

const Home: NextPage<HomeProps> = ({ data, posts }) => {
  console.log('data: ', data);

  return (
    <>
      <Head>
        <title>Andrew Shearer Dev Portfolio</title>
        <meta name='description' content="Andrew Shearer's front end developer portfolio" />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Hero contentfulData={data.hero} />

      <main>
        <Projects contentfulData={data.projectGroup} />
        <About contentfulData={data.aboutMe} />
        <BlogPosts posts={posts} />
        <Contact contentfulData={data.contact} />
      </main>

      <Footer />
    </>
  );
};

export default Home;
