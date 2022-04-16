import Head from 'next/head';
import Link from 'next/link';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';

type ContentfulPathsResponse = {
  data: {
    projectCollection: {
      items: {
        slug: string;
      }[];
    };
  };
};

type ContentfulPropsResponse = {
  data: {
    projectCollection: {
      items: {
        title: string;
      }[];
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
            projectCollection {
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

  const slugs = data.projectCollection.items.map((item) => ({ params: { slug: item.slug } }));

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
            projectCollection(where: { slug: $slug }, limit: 1) {
              items {
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

  const [projectData] = data.projectCollection.items;

  return {
    props: {
      projectData
    }
  };
};

// props type
type ProjectPageProps = {
  projectData: {
    title: string;
  };
};

const ProjectPage: NextPage<ProjectPageProps> = ({ projectData }) => (
  <div>
    {/* dyanmic head for seo */}
    <Head>
      <title>{projectData.title} | Andrew Shearer Dev Portfolio</title>
      <meta name='description' content={projectData.title} />
    </Head>

    <h2>Project Page</h2>

    <p>
      This is the project page for <strong>{projectData.title}</strong>
    </p>

    <Link href='/'>Go Back Home</Link>
  </div>
);

export default ProjectPage;
