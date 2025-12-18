import { DISCDB_ORIGIN } from "./constants";
import { queries } from "./graphql";
import type { MediaItem, ReleaseWithMediaItem } from "./types/media";
import type { MediaItemsResponse } from "./types/query";
import { version } from "../package.json";

/**
 * Returns a qualified image URL from a path
 */
export const getImageUrl = (path: string, origin?: string): string =>
  new URL(path, `${origin ?? DISCDB_ORIGIN}/images/`).href;

export class DiscDBClient {
  public origin = DISCDB_ORIGIN;

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

  /**
   * Fetch a release by its URL slugs, useful for resolving a user-provided link.
   *
   * @param mediaItemSlug the slug for the media item as a whole on thediscdb.com
   * @param slug the slug for just the release on thediscdb.com
   * @returns a matching release with required `mediaItem` prop, whose
   *   `releases` array contains all releases for the media item other
   *   than the one requested.
   */
  async getReleaseBySlug(
    mediaItemSlug: string,
    slug: string,
  ): Promise<ReleaseWithMediaItem> {
    const data = await this.graphql<MediaItemsResponse>("GetReleasesBySlugs", {
      mediaItemSlug,
      slug,
    });
    const node = data.mediaItems.nodes[0];
    if (!node) {
      throw Error(`No such release matching slugs ${mediaItemSlug} / ${slug}`);
    }

    const release = node.releases.find((r) => r.slug === slug);
    if (!release) {
      // Shouldn't happen if the query is correct
      throw Error(
        `No such release for item ${mediaItemSlug} with slug ${slug}`,
      );
    }

    return {
      ...release,
      mediaItem: {
        ...node,
        releases: node.releases.filter((r) => r.slug !== release.slug),
      },
    };
  }

  /**
   * Fetch a media item by its external database IDs. If there are multiple
   * results (e.g you provided IDs for items that are not the same), only the
   * first result will be returned.
   *
   * Database items are created with their TMDB association, so every item
   * should have one. If you only have an IMDb or TVDB ID, you may find more
   * success if you first consult TMDB:
   *
   * @see https://developer.themoviedb.org/reference/find-by-id
   *
   * @param ids one or multiple IDs with which to try to identify the item.
   * @returns a matching media item
   */
  async getMediaItemByExternalIds(ids: {
    tmdbId?: string;
    imdbId?: string;
    tvdbId?: string;
  }): Promise<MediaItem> {
    const data = await this.graphql<MediaItemsResponse>(
      "GetMediaItemsByExternalIds",
      {
        imdbId: ids.imdbId ?? "",
        tmdbId: ids.tmdbId ?? "",
        tvdbId: ids.tvdbId ?? "",
      },
    );
    const node = data.mediaItems.nodes[0];
    if (!node) {
      throw Error(
        `No media item matching any external IDs from ${JSON.stringify(ids)}`,
      );
    }
    return node;
  }
}
