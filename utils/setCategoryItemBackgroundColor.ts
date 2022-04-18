export const setCategoryItemBackgroundColor = (category: string) => {
  switch (category) {
    case 'Category A':
      return '#fafdd6';

    case 'Category B':
      return '#D57E7E';

    case 'Category C':
      return '#8fbdd3';

    case 'Category D':
      return '#E4D1B9';

    case 'Category E':
      return '#ECA6A6';

    case 'Category F':
      return '#D18CE0';

    case 'Category G':
      return '#F0D9FF';

    case 'Category H':
      return '#D1E8E4';

    default:
      return `#92ba92`;
  }
};
