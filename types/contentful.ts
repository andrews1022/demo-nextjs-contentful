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

export type ContentfulSocialLink = {
  iconCode: string;
  link: string;
  name: string;
  sys: {
    id: string;
  };
};

// sections
export type ContentfulAboutMe = {
  copy: string;
  image: ContentfulImage;
  myTools: string[];
  primaryTitle: string;
  secondaryTitle: string;
};

export type ContentfulContact = {
  copy: string;
  linksCollection: {
    items: ContentfulSocialLink[];
  };
  title: string;
};

export type ContentfulHero = {
  backgroundImage: ContentfulImage;
  tagline: string;
  title: string;
};

export type ContentfulProject = {
  codeLink: string | null;
  liveLink: string;
  slug: string;
  summary: string;
  sys: {
    id: string;
  };
  techUsed: string[];
  thumbnail: ContentfulImage;
  title: string;
};

export type ContentfulProjectGroup = {
  copy: string;
  projectsCollection: {
    items: ContentfulProject[];
  };
  title: string;
};
