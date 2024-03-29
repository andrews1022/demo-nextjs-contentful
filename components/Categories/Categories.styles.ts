import styled from "styled-components";

// utils
import { setCategoryItemBackgroundColor } from "../../utils/setCategoryItemBackgroundColor";

// prop types
type CategoryItemProps = {
  category: string;
};

type CategoriesListProps = {
  addMarginBottom: boolean;
};

export const CategoriesList = styled.ul<CategoriesListProps>`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.25rem;
  margin-bottom: ${({ addMarginBottom }) => (addMarginBottom ? "1.25rem" : 0)};
`;

export const CategoryItem = styled.li<CategoryItemProps>`
  background-color: ${({ category }) => setCategoryItemBackgroundColor(category)};
  padding: 0.5rem;
`;
