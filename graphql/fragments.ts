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
