const gql = String.raw;

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
