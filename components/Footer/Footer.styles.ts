import styled from "styled-components";

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.sapphire};
  color: ${({ theme }) => theme.colors.whiteSmoke};
  font-size: 1.25rem;
  margin-top: auto;
  padding: 2rem;
  text-align: center;

  p {
    font-size: inherit;
  }
`;
