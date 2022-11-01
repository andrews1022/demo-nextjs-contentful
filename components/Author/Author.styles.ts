import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  border-top: 1px solid ${({ theme }) => theme.colors.nero};
  border-bottom: 1px solid ${({ theme }) => theme.colors.nero};
  margin: 2rem 0;
  padding: 2rem 0;

  @media ${({ theme }) => theme.mediaQueries.tabletPortrait} {
    flex-direction: column;
    text-align: center;
  }
`;

export const ImageWrapper = styled.div`
  height: 8rem;
  width: 8rem;
  border-radius: 50%;
  overflow: hidden;

  & > span {
    height: 100% !important; /* need important to override default styles */

    img {
      object-fit: cover;
      object-position: center;
    }
  }
`;

export const TextWrapper = styled.div`
  h3 {
    font-size: ${({ theme }) => theme.fontSizes.heading.small};
  }
`;
