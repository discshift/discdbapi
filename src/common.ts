import { DISCDB_ORIGIN } from "./constants";
import type { PageInfo } from "./genql";
import { MediaItemType } from "./types";

/**
 * Returns a qualified image URL from a path. If only one dimension is
 * provided, the other dimension will be resized automatically, maintaining
 * the original aspect ratio.
 */
export const getImageUrl = (
  path: string,
  options?: { origin?: string; width?: number; height?: number },
): string => {
  const origin = options?.origin ?? DISCDB_ORIGIN;
  const url = new URL(
    path,
    path.startsWith("/") ? origin : `${origin}/images/`,
  );
  if (options?.width !== undefined) {
    url.searchParams.set("width", String(options.width));
  }
  if (options?.height !== undefined) {
    url.searchParams.set("height", String(options.height));
  }

  return url.href;
};

/**
 * Sometimes media item types are returned in lowercase by the server.
 * This function casts them to their appropriate enum values and returns the
 * iterable in place.
 * 
 * @internal
 */
export const fixMediaTypes = <
  K extends string,
  I extends Iterable<Record<K, string>>,
>(
  items: I,
  key: K,
): I => {
  for (const item of items) {
    if (item[key].toLowerCase() === "series") {
      item[key] = MediaItemType.Series;
    } else if (item[key].toLowerCase() === "movie") {
      item[key] = MediaItemType.Movie;
    }
  }
  return items;
};

/** @internal */
export type BidirectionalPaginationQuery<F, S> =
  | {
      /** Filter results by this query */
      query?: F;
      /** Sort asc/desc by a specific property */
      sort?: S[];
      /** Returns the elements in the list that come after the specified cursor */
      after?: string;
      /** Returns the first _n_ elements from the list */
      first?: number;
    }
  | {
      /** Filter results by this query */
      query?: F;
      /** Sort asc/desc by a specific property */
      sort?: S[];
      /** Returns the elements in the list that come before the specified cursor (use to paginate backwards) */
      before?: string;
      /** Returns the last _n_ elements from the list (use to paginate backwards) */
      last?: number;
    };

/** @internal */
export const unifyPageInfo = (
  input: BidirectionalPaginationQuery<unknown, unknown> | undefined,
  info: Omit<PageInfo, "__typename">,
) => {
  if (!input || "first" in input || "after" in input) {
    return { cursor: info.endCursor, hasMoreData: info.hasNextPage };
  }
  return { cursor: info.startCursor, hasMoreData: info.hasPreviousPage };
};

/** @internal */
export const unifyPageArgs = <F, S>(
  input: BidirectionalPaginationQuery<F, S> | undefined,
) => {
  return {
    first: input ? ("first" in input ? input.first : null) : null,
    last: input ? ("last" in input ? input.last : null) : null,
    after: input ? ("after" in input ? input.after : null) : null,
    before: input ? ("before" in input ? input.before : null) : null,
    where: input?.query,
    order: input?.sort,
  };
};

/**
 * Make a string URL-safe by turning it into a slug, thereby replacing or
 * omitting non-alphanumeric characters.
 * 
 * @see https://github.com/TheDiscDb/web/blob/main/code/TheDiscDb.Core/StringExtensions.cs
 * @param value value to be slugified
 * @returns slugified string
 */
export const slugify = (value: string): string => value
  // keep "and"s sensible while removing the & sign
  .replace(/&/g, "and")
  // replace whitespace with dashes
  .replace(/\s/g, "-")
  // lowercase all characters
  .replace(/\w/g, (v) => v.toLowerCase())
  // strip out everything that isn't compliant
  .replace(/[^-a-z0-9]/g, "");
