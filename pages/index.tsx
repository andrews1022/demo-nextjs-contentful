import type { GetStaticProps, NextPage } from 'next';

// components
import BlogPosts from '../components/BlogPosts/BlogPosts';

// styled components
import { MainHeading } from '../components/UI/MainHeading';

// api
import { queryContentful } from '../api/functions';

// graphql
import { homepageQuery } from '../graphql/queries';

// custom types
import type { ContentfulBlogPost } from '../types/contentful';

type PropsGraphQLResponse = {
  data: {
    blogPostCollection: {
      items: ContentfulBlogPost[];
    };
  };
};

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await queryContentful<PropsGraphQLResponse>(homepageQuery);

  return {
    props: {
      data
    }
  };
};

type HomeProps = PropsGraphQLResponse;

const Home: NextPage<HomeProps> = ({ data }) => (
  <>
    <MainHeading>Blog Posts</MainHeading>

    <BlogPosts mode='complex' posts={data.blogPostCollection.items} />
  </>
);

export default Home;
