import styled from 'styled-components';

// utils
import { setCategoryItemBackgroundColor } from '../../utils/setCategoryItemBackgroundColor';

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
  padding: 2rem;

  & > a {
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
  display: flex;
  align-items: center;
  font-size: ${({ theme }) => theme.fontSizes.copy.xlarge};
  font-weight: ${({ theme }) => theme.fontWeights.normal};
  gap: 0.75rem;
`;

export const PreviewText = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.copy.medium};
  margin: 1.25rem 0;
`;

export const CategoriesList = styled.ul`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: 1.25rem;
`;

type CategoryItemProps = {
  category: string;
};

export const CategoryItem = styled.li<CategoryItemProps>`
  background-color: ${(props) => setCategoryItemBackgroundColor(props.category)};
  padding: 0.5rem;
`;

export const TimeToRead = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.copy.small};
`;
