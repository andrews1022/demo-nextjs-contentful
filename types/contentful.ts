// reusable
export type ContentfulId = {
  id: string;
};

export type ContentfulImage = {
  description: string;
  height: number;
  sys: ContentfulId;
  url: string;
  width: number;
};

// sections
export type ContentfulAuthor = {
  bio: string;
  image: ContentfulImage;
  name: string;
};

export type ContentfulCategory = {
  sys: ContentfulId;
  name: string;
  slug: string;
};

export type ContentfulBlogPost = {
  author: ContentfulAuthor;
  categoriesCollection: {
    items: ContentfulCategory[];
  };
  content: string;
  datePublished: string;
  image: ContentfulImage;
  previewText: string;
  slug: string;
  sys: ContentfulId;
  title: string;
};
