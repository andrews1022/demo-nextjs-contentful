// graphql
import {
  FRAGMENT_CONTENTFUL_CATEGORY,
  FRAGMENT_CONTENTFUL_IMAGE,
  FRAGMENT_CONTENTFUL_SIMPLE_POST
} from "./fragments";

// utils
import { gql } from "../utils/gql";

// home page
export const homepageQuery = gql`
  query HomepageQuery {
    blogPostCollection(order: [datePublished_DESC]) {
      items {
        categoriesCollection {
          items {
            ...CategoryFields
          }
        }
        content
        image {
          ...ImageFields
        }
        previewText
        slug
        sys {
          id
        }
        title
      }
    }
  }

  ${FRAGMENT_CONTENTFUL_CATEGORY}
  ${FRAGMENT_CONTENTFUL_IMAGE}
`;

// categories
export const categorySlugsQuery = gql`
  query CategorySlugsQuery {
    categoryCollection {
      items {
        slug
      }
    }
  }
`;

export const postByCategoryQuery = gql`
  query PostByCategoryQuery($slug: String!) {
    categoryCollection(where: { slug: $slug }) {
      items {
        linkedFrom {
          blogPostCollection {
            items {
              ...SimplePostFields
            }
          }
        }
        name
      }
    }
  }

  ${FRAGMENT_CONTENTFUL_SIMPLE_POST}
`;

// blog posts
export const blogPostSlugsQuery = gql`
  query BlogPostSlugsQuery {
    blogPostCollection {
      items {
        slug
      }
    }
  }
`;

export const singleBlogPostQuery = gql`
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
        categoriesCollection {
          items {
            ...CategoryFields
          }
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
        ...SimplePostFields
      }
    }
  }

  ${FRAGMENT_CONTENTFUL_CATEGORY}
  ${FRAGMENT_CONTENTFUL_IMAGE}
  ${FRAGMENT_CONTENTFUL_SIMPLE_POST}
`;
