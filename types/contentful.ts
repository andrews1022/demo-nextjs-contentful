// reusable
export type ContentfulImage = {
  description: string;
  height: number;
  sys: {
    id: string;
  };
  url: string;
  width: number;
};

// sections
export type ContentfulAuthor = {
  bio: string;
  image: ContentfulImage;
  name: string;
};

export type ContentfulBlogPost = {
  author: ContentfulAuthor;
  content: string;
  image: ContentfulImage;
  slug: string;
  sys: {
    id: string;
  };
  title: string;
};
