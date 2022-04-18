import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// styled components
import { MainHeading } from '../../components/UI/MainHeading';

// utils
import { gql } from '../../utils/gql';

// custom types
import type { ContentfulBlogPost, ContentfulCategory } from '../../types/contentful';
import type { IParams } from '../../types/global';
import Simple from '../../components/BlogPosts/Simple/Simple';

type PathsGraphQLResponse = {
  data: {
    categoryCollection: {
      items: ContentfulCategory[];
    };
  };
};

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
          query CategorySlugsQuery {
            categoryCollection {
              items {
                slug
              }
            }
          }
        `
      })
    }
  );

  const { data }: PathsGraphQLResponse = await response.json();

  const slugs = data.categoryCollection.items.map((category) => ({
    params: { slug: category.slug }
  }));

  return {
    paths: slugs,
    fallback: false // show 404 page
  };
};

type PropsGraphQLResponse = {
  data: {
    categoryCollection: {
      items: {
        linkedFrom: {
          blogPostCollection: {
            items: ContentfulBlogPost[];
          };
        };
        name: string;
      }[];
    };
  };
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
          query PostByCategoryQuery($slug: String!) {
            categoryCollection(where: { slug: $slug }) {
              items {
                linkedFrom {
                  blogPostCollection {
                    items {
                      previewText
                      slug
                      sys {
                        id
                      }
                      title
                    }
                  }
                }
                name
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

  const { data }: PropsGraphQLResponse = await response.json();

  const blogPostData = data.categoryCollection.items;

  return {
    props: {
      blogPostData
    }
  };
};

type CategoryPageProps = {
  blogPostData: {
    linkedFrom: {
      blogPostCollection: {
        items: ContentfulBlogPost[];
      };
    };
    name: string;
  }[];
};

const CategoryPage: NextPage<CategoryPageProps> = ({ blogPostData }) => {
  // destructure the one item out of blogPostData array
  const [data] = blogPostData;

  return (
    <>
      {/* dyanmic head for seo */}
      <Head>
        <title>{data.name} | Next.js Contentful Blog</title>
        <meta name='description' content={data.name} />
      </Head>

      <MainHeading>
        <span style={{ fontWeight: 'normal' }}>Category Page for</span> {data.name}
      </MainHeading>

      <Simple posts={data.linkedFrom.blogPostCollection.items} />
    </>
  );
};

export default CategoryPage;
