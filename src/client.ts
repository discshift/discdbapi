import { DISCDB_ORIGIN } from "./constants";
import { queries } from "./graphql";
import type { DiscDetailNode } from "./types/node";
import type { MediaItemsResponse } from "./types/query";
import { version } from "../package.json";

/**
 * Returns a qualified image URL from a path
 */
export const getImageUrl = (path: string, origin?: string): string =>
  new URL(path, `${origin ?? DISCDB_ORIGIN}/images/`).href;

export class DiscDBClient {
  origin = DISCDB_ORIGIN;

  constructor(options?: {
    origin?: string;
  }) {
    if (options?.origin) {
      this.origin = options.origin;
    }
  }

  getImageUrl(path: string): string {
    return getImageUrl(path, this.origin);
  }

  private async graphql<T>(
    operationName: keyof typeof queries,
    variables?: unknown,
  ) {
    const response = await fetch(new URL("/graphql", this.origin), {
      method: "POST",
      body: JSON.stringify({
        operationName,
        query: queries[operationName],
        variables,
      }),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `discdbapi/${version}`,
      },
    });
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}`);
    }

    const { data } = (await response.json()) as { data: T };
    return data;
  }

  /**
   * Returns a matching media item (movies/series) with releases that
   * contain a disc with the specified hash and details for the disc.
   * There may be multiple releases with the same disc.
   *
   * @param hash the disc hash (from `hashDisc`)
   * @returns matching media item
   */
  async getMediaItemByDiscHash(hash: string): Promise<DiscDetailNode> {
    const data = await this.graphql<MediaItemsResponse<DiscDetailNode>>(
      "GetDiscDetailByContentHash",
      { hash },
    );
    const node = data.mediaItems.nodes[0];
    if (!node) {
      throw Error(`No such disc with hash "${hash}"`);
    }
    return node;
  }
}
