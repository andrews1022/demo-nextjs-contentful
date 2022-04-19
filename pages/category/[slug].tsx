import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';

// components
import BlogPosts from '../../components/BlogPosts/BlogPosts';
import NextHead from '../../components/NextHead/NextHead';

// styled components
import { MainHeading } from '../../components/UI/MainHeading';

// api
import { queryContentful } from '../../api/functions';

// graphql
import { categorySlugsQuery, postByCategoryQuery } from '../../graphql/queries';

// custom types
import type { ContentfulBlogPost, ContentfulCategory } from '../../types/contentful';
import type { IParams } from '../../types/global';

type PathsGraphQLResponse = {
  data: {
    categoryCollection: {
      items: ContentfulCategory[];
    };
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await queryContentful<PathsGraphQLResponse>(categorySlugsQuery);

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

  const { data } = await queryContentful<PropsGraphQLResponse>(postByCategoryQuery, slug);

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
      <NextHead description={data.name} title={data.name} />

      <MainHeading>
        <span style={{ fontWeight: 'normal' }}>Category Page for</span> {data.name}
      </MainHeading>

      <BlogPosts mode='simple' posts={data.linkedFrom.blogPostCollection.items} />
    </>
  );
};

export default CategoryPage;
