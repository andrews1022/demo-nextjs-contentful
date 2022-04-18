import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';

// utils
import { gql } from '../../utils/gql';

// custom types
import type { ContentfulBlogPost, ContentfulCategory } from '../../types/contentful';
import { FRAGMENT_CONTENTFUL_IMAGE } from '../../graphql/fragments';
import BlogPosts from '../../components/BlogPosts/BlogPosts';
import { MainHeading } from '../../components/UI/MainHeading';
import Head from 'next/head';

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

// extend interface using type keyword
type IParams = ParsedUrlQuery & {
  slug: string;
};

type PropsGraphQLResponse = {
  data: {
    categoryCollection: {
      items: {
        name: string;
        linkedFrom: {
          blogPostCollection: {
            items: ContentfulBlogPost[];
          };
        };
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
                name
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
    name: string;
    linkedFrom: {
      blogPostCollection: {
        items: ContentfulBlogPost[];
      };
    };
  }[];
};

const CategoryPage: NextPage<CategoryPageProps> = ({ blogPostData }) => {
  // console.log('blogPostData: ', blogPostData);

  // destructure the one item out of blogPostData array
  const [data] = blogPostData;
  // console.log('data: ', data);

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

      <div className='grid'>
        {data.linkedFrom.blogPostCollection.items.map((post) => (
          <h3 key={post.title}>{post.title}</h3>
        ))}
      </div>
    </>
  );
};

export default CategoryPage;
