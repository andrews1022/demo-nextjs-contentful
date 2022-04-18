import Head from 'next/head';
import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import type { ParsedUrlQuery } from 'querystring';

// components
import Author from '../../components/Author/Author';
import NextImage from '../../components/NextImage/NextImage';

// styled components
import * as S from '../../styles/blog.styles';

// utils
import { gql } from '../../utils/gql';
import { formatDate } from '../../utils/formatDate';
import { timeToRead } from '../../utils/timeToRead';

// graphql fragments
import { FRAGMENT_CONTENTFUL_IMAGE } from '../../graphql/fragments';

// custom types
import type { ContentfulBlogPost } from '../../types/contentful';

type GraphQLResponse = {
  data: {
    blogPostCollection: {
      items: ContentfulBlogPost[];
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
          query BlogPostSlugsQuery {
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

  const { data }: GraphQLResponse = await response.json();

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
          query SingleBlogPostQuery($slug: String!) {
            blogPostCollection(where: { slug: $slug }, limit: 1) {
              items {
                author {
                  bio
                  image {
                    ...ImageFields
                  }
                  name
                }
                content
                datePublished
                image {
                  ...ImageFields
                }
                title
              }
            }
          }

          ${FRAGMENT_CONTENTFUL_IMAGE}
        `,
        variables: {
          slug
        }
      })
    }
  );

  const { data }: GraphQLResponse = await response.json();

  const [blogPostData] = data.blogPostCollection.items;

  return {
    props: {
      blogPostData
    }
  };
};

// props type
type BlogPostPageProps = {
  blogPostData: ContentfulBlogPost;
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ blogPostData }) => (
  <>
    {/* dyanmic head for seo */}
    <Head>
      <title>{blogPostData.title} | Next.js Contentful Blog</title>
      <meta name='description' content={blogPostData.title} />
    </Head>

    <S.Wrapper>
      <S.PostTitle>{blogPostData.title}</S.PostTitle>

      <S.ImageWrapper>
        <NextImage imageData={blogPostData.image} />
      </S.ImageWrapper>

      <S.InfoWrapper>
        <p>
          <strong>Date Published: </strong>
          <span>{formatDate(blogPostData.datePublished)}</span>
        </p>

        <strong>&bull;</strong>

        <p>
          <strong>Estimated Time to Read: </strong>
          <span>{timeToRead(blogPostData.content)} min</span>
        </p>
      </S.InfoWrapper>

      <S.StyledReactMarkdown>{blogPostData.content}</S.StyledReactMarkdown>

      <Author authorData={blogPostData.author} />
    </S.Wrapper>
  </>
);

export default BlogPostPage;
