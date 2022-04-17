// this file is used for styling 'pages/blog/[slug].tsx'

import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 5% 0;
  width: 90%;
`;

export const PostTitle = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.heading.large};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
`;

export const ImageWrapper = styled.div`
  height: 33vw;
  margin: 2rem 0;
  overflow: hidden;

  & > span {
    height: 100% !important; /* need important to override default styles */

    img {
      object-fit: cover;
      object-position: center;
    }
  }
`;

export const StyledReactMarkdown = styled(ReactMarkdown)`
  /* add spacing to all these elements */
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  ol,
  ul,
  hr,
  pre {
    margin: 0.75rem 0;
  }

  /* headings */
  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.75rem;
  }

  h3 {
    font-size: 1.5rem;
  }

  h4 {
    font-size: 1.375rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1.125rem;
  }

  /* lists */
  ol,
  ul {
    padding-left: 1.25rem;
  }

  ul {
    list-style: disc;
  }

  ol {
    list-style: decimal;
  }

  /* links */
  a {
    color: ${({ theme }) => theme.colors.carrot};
  }

  /* code blocks */
  pre {
    background-color: #ddd;
    line-height: 1.5;
    padding: 0.75rem;
  }
`;
