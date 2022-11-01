import { CONTENTFUL_GRAPHQL_API_ENDPOINT } from "./endpoints";

export const queryContentful = async <T>(queryString: string, slug = ""): Promise<T> => {
  const response = await fetch(CONTENTFUL_GRAPHQL_API_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${process.env.CONTENTFUL_ACCESS_TOKEN}`,
      "Content-Type": "application/json"
    },
    method: "POST",
    body: JSON.stringify({
      query: queryString,
      variables: {
        slug
      }
    })
  });

  return response.json();
};
