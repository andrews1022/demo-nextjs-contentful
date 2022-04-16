import { gql } from 'graphql-request';

export const FRAGMENT_IMAGE = gql`
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
