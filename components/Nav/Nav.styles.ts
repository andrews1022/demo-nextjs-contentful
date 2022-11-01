import styled from "styled-components";

export const Header = styled.header`
  background-color: ${({ theme }) => theme.colors.gainsboro};
  color: ${({ theme }) => theme.colors.nero};
  font-size: ${({ theme }) => theme.fontSizes.heading.small};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  padding: 2rem 5%;
`;
