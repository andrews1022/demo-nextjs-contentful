import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// components
import Author from '../../components/Author/Author';
import Categories from '../../components/Categories/Categories';
import BlogPosts from '../../components/BlogPosts/BlogPosts';
import NextHead from '../../components/NextHead/NextHead';
import NextImage from '../../components/NextImage/NextImage';

// styled components
import * as S from '../../styles/blog.styles';

// api
import { queryContentful } from '../../api/functions';

// graphql
import { blogPostSlugsQuery, singleBlogPostQuery } from '../../graphql/queries';

// utils
import { formatDate } from '../../utils/formatDate';
import { timeToRead } from '../../utils/timeToRead';

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
  const { data } = await queryContentful<PathsGraphQLResponse>(blogPostSlugsQuery);

  const slugs = data.blogPostCollection.items.map((post) => ({
    params: { slug: post.slug }
  }));

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

  const { data } = await queryContentful<PropsGraphQLResponse>(singleBlogPostQuery, slug);

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

          <strong>&bull;</strong>

          <p>
            <strong>Categories: </strong>
          </p>

          <Categories
            addMarginBottom={false}
            categories={currentBlogPost.categoriesCollection.items}
          />
        </S.InfoWrapper>

        <S.StyledReactMarkdown>{currentBlogPost.content}</S.StyledReactMarkdown>

        <Author authorData={currentBlogPost.author} />

        <S.RelatedPosts>
          <h2>Related Posts</h2>

          <BlogPosts mode='simple' posts={relatedBlogPosts.items} />
        </S.RelatedPosts>
      </S.Wrapper>
    </>
  );
};

export default BlogPostPage;
