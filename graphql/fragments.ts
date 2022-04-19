import { gql } from '../utils/gql';

export const FRAGMENT_CONTENTFUL_IMAGE = gql`
  fragment ImageFields on Asset {
    description
    height
    sys {
      id
    }
    url
    width
  }
`;

export const FRAGMENT_CONTENTFUL_CATEGORY = gql`
  fragment CategoryFields on Category {
    name
    slug
    sys {
      id
    }
  }
`;

export const FRAGMENT_CONTENTFUL_SIMPLE_POST = gql`
  fragment SimplePostFields on BlogPost {
    previewText
    slug
    sys {
      id
    }
    title
  }
`;
