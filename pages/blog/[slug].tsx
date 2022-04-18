import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// components
import Author from '../../components/Author/Author';
import NextHead from '../../components/NextHead/NextHead';
import NextImage from '../../components/NextImage/NextImage';
import Simple from '../../components/BlogPosts/Simple/Simple';

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
import type { IParams } from '../../types/global';

type PathsGraphQLResponse = {
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

  const { data }: PathsGraphQLResponse = await response.json();

  const slugs = data.blogPostCollection.items.map((post) => ({ params: { slug: post.slug } }));

  return {
    paths: slugs,
    fallback: false // show 404 page
  };
};

type PropsGraphQLResponse = {
  data: {
    currentBlogPost: {
      items: ContentfulBlogPost[];
    };
    relatedBlogPosts: {
      items: ContentfulBlogPost[];
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
          query SingleBlogPostQuery($slug: String!) {
            currentBlogPost: blogPostCollection(where: { slug: $slug }, limit: 1) {
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

            relatedBlogPosts: blogPostCollection(where: { slug_not: $slug }, limit: 3) {
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

          ${FRAGMENT_CONTENTFUL_IMAGE}
        `,
        variables: {
          slug
        }
      })
    }
  );

  const { data }: PropsGraphQLResponse = await response.json();

  return {
    props: {
      data
    }
  };
};

// props type
type BlogPostPageProps = {
  data: {
    currentBlogPost: {
      items: ContentfulBlogPost[];
    };
    relatedBlogPosts: {
      items: ContentfulBlogPost[];
    };
  };
};

const BlogPostPage: NextPage<BlogPostPageProps> = ({ data }) => {
  // destructure currentBlogPost & relatedBlogPosts out accordingly
  const [currentBlogPost] = data.currentBlogPost.items;
  const { relatedBlogPosts } = data;

  return (
    <>
      {/* dyanmic head for seo */}
      <NextHead description={currentBlogPost.title} title={currentBlogPost.title} />

      <S.Wrapper>
        <S.PostTitle>{currentBlogPost.title}</S.PostTitle>

        <S.ImageWrapper>
          <NextImage imageData={currentBlogPost.image} />
        </S.ImageWrapper>

        <S.InfoWrapper>
          <p>
            <strong>Date Published: </strong>
            <span>{formatDate(currentBlogPost.datePublished)}</span>
          </p>

          <strong>&bull;</strong>

          <p>
            <strong>Estimated Time to Read: </strong>
            <span>{timeToRead(currentBlogPost.content)} min</span>
          </p>
        </S.InfoWrapper>

        <S.StyledReactMarkdown>{currentBlogPost.content}</S.StyledReactMarkdown>

        <Author authorData={currentBlogPost.author} />

        <S.RelatedPosts>
          <h2>Related Posts</h2>

          <Simple posts={relatedBlogPosts.items} />
        </S.RelatedPosts>
      </S.Wrapper>
    </>
  );
};

export default BlogPostPage;
