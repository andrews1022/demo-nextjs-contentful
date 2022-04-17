import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

export const StyledReactMarkdown = styled(ReactMarkdown)`
  ul {
    list-style: disc;
    padding-left: 1.25rem;
  }

  a {
    color: blue;
  }
`;
