import Link from 'next/link';

// styled components
import * as S from './Categories.styles';

// custom types
import type { ContentfulCategory } from '../../types/contentful';

// props type
type CategoriesProps = {
  addMarginBottom: boolean;
  categories: ContentfulCategory[];
};

const Categories = ({ addMarginBottom, categories }: CategoriesProps) => (
  <S.CategoriesList addMarginBottom={addMarginBottom}>
    {categories.map((category) => (
      <S.CategoryItem key={category.sys.id} category={category.name}>
        <Link href={`/category/${category.slug}`}>{category.name}</Link>
      </S.CategoryItem>
    ))}
  </S.CategoriesList>
);

export default Categories;
