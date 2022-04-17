export const timeToRead = (content: string) => {
  const wordsPerMinute = 225;
  const numberOfWordsInPost = content.trim().split(/\s+/).length;

  return Math.ceil(numberOfWordsInPost / wordsPerMinute);
};
