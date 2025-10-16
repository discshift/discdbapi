import { DISCDB_ORIGIN } from "./constants";
import { queries } from "./graphql";
import type { MediaItem } from "./types/media";
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
      throw Error(
        `${response.status} ${response.statusText}: ${await response.text()}`,
      );
    }

    const { data } = (await response.json()) as { data: T };
    return data;
  }

  /**
   * Returns a matching media item (movies/series) with releases that contain
   * a disc with the specified hash and details for the disc. There may be
   * multiple releases and media items with the same disc. This method will
   * only return the first media item, use `getMediaItemsByDiscHashes` to
   * receive all results.
   *
   * @param hash the disc hash (from `hashDisc`)
   * @returns matching media item
   */
  async getMediaItemByDiscHash(hash: string): Promise<MediaItem> {
    const data = await this.graphql<MediaItemsResponse>(
      "GetDiscDetailByContentHashes",
      { hashes: [hash] },
    );
    const node = data.mediaItems.nodes[0];
    if (!node) {
      throw Error(`No such disc with hash "${hash}"`);
    }
    return node;
  }

  /**
   * Returns multiple matching media items (movies/series) with releases that
   * contain a disc with the specified hash and details for the disc.
   * There may be multiple releases and media items with the same disc.
   *
   * Hashes with no matches will still be in the resulting record, but with an
   * empty array.
   *
   * @param hash the disc hashes (from `hashDisc`)
   * @returns a mapping of disc hashes to media item arrays
   */
  async getMediaItemsByDiscHashes(
    hashes: string[],
  ): Promise<Record<string, MediaItem[]>> {
    const data = await this.graphql<MediaItemsResponse>(
      "GetDiscDetailByContentHashes",
      { hashes },
    );
    const nodes = data.mediaItems.nodes;
    // build the map ahead of time so there is always an array even for hashes
    // that returned no discs
    const results: Record<string, MediaItem[]> = Object.fromEntries(
      hashes.map((hash) => [hash, []]),
    );
    for (const node of nodes) {
      for (const release of node.releases) {
        for (const disc of release.discs) {
          if (disc.contentHash && hashes.includes(disc.contentHash)) {
            if (results[disc.contentHash]) {
              results[disc.contentHash]?.push(node);
            } else {
              results[disc.contentHash] = [node];
            }
          }
        }
      }
    }

    return results;
  }
}
