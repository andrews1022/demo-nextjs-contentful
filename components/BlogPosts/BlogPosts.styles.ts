import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  padding: 5% 0;
  width: 90%;
`;

export const MainHeading = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.heading.large};
  margin-bottom: 3.5vw;
`;

export const Grid = styled.div`
  display: grid;
  grid-gap: 3.5vw;
  grid-template-columns: repeat(12, 1fr);

  @media ${({ theme }) => theme.mediaQueries.tabletPortrait} {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 7vw;
  }
`;

export const Card = styled.div`
  border-radius: 1.5rem;
  grid-column: span 4;
  overflow: hidden;
  transition: ${({ theme }) => theme.transitions.short};

  @media (hover) {
    &:hover {
      box-shadow: 0 0.75rem 1.5rem 0 rgba(0, 0, 0, 0.1);
      transform: translateY(-0.25rem);
    }
  }

  @media ${({ theme }) => theme.mediaQueries.tabletLandscape} {
    grid-column: span 6;
  }

  @media ${({ theme }) => theme.mediaQueries.tabletPortrait} {
    grid-column: 1 / -1;
  }
`;

export const CardBody = styled.div`
  background-color: ${({ theme }) => theme.colors.whiteSmoke};
  margin-top: -4px;
  padding: 1.5rem;

  a {
    font-weight: ${({ theme }) => theme.fontWeights.bold};

    @media (hover) {
      &:hover,
      &:active,
      &:focus {
        color: ${({ theme }) => theme.colors.carrot};
      }
    }
  }
`;

export const PostTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.copy.large};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  margin-bottom: 1rem;
`;

export const TimeToRead = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.fontSizes.copy.small};
  margin-top: 2rem;
`;
