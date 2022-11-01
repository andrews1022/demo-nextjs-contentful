import type { ParsedUrlQuery } from "querystring";

export type IParams = ParsedUrlQuery & {
  slug: string;
};
