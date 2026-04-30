import { version } from "../package.json";
import {
  type BidirectionalPaginationQuery,
  fixMediaTypes,
  getImageUrl,
  unifyPageArgs,
  unifyPageInfo,
} from "./common";
import { DISCDB_ORIGIN } from "./constants";
import {
  type BoxsetFilterInput,
  type BoxsetGenqlSelection,
  type BoxsetSortInput,
  createClient as createGqlClient,
  enumSortEnumType,
  type Client as GQLClient,
  type MediaItemFilterInput,
  type MediaItemGenqlSelection,
  type MediaItemSortInput,
} from "./genql";
import {
  type APISearchResult,
  type MediaItemGroupRole,
  type SearchResult,
  SearchType,
} from "./types";
import type { FileHashInfo } from "./types/hash";

export class DiscDBClient {
  public origin = DISCDB_ORIGIN;
  public userAgent = `discdbapi/${version}`;

  /**
   * Internal, typed GraphQL client that may be used to bypass wrapper logic
   * or compose custom queries
   *
   * @see https://genql.dev/docs
   */
  public gql: GQLClient;

  constructor(options?: {
    origin?: string;
    userAgent?: string;
  }) {
    if (options?.origin) {
      this.origin = options.origin;
    }
    if (options?.userAgent !== undefined) {
      this.userAgent = options.userAgent;
    }

    this.gql = createGqlClient({
      url: new URL("/graphql", this.origin ?? DISCDB_ORIGIN).href,
      headers: { "User-Agent": this.userAgent },
    });
  }

  /**
   * Returns a qualified image URL from a path. If only one dimension is
   * provided, the other dimension will be resized automatically, maintaining
   * the original aspect ratio.
   */
  getImageUrl(
    path: string,
    options?: { width?: number; height?: number },
  ): string {
    return getImageUrl(path, { origin: this.origin, ...options });
  }

  /**
   * Returns a qualified image URL for a barcode representing a given UPC
   *
   * @see https://en.wikipedia.org/wiki/Universal_Product_Code
   * @param code the UPC value
   * @param options options for creating the image
   *   - width: the width of the image
   *   - label: whether to show the number in the image (not recommended; may gets cropped out)
   * @returns URL to the barcode image
   */
  getBarcodeImageUrl(
    code: string | number,
    options?: { width?: number; label?: boolean },
  ) {
    const params = new URLSearchParams({
      data: String(code),
      width: options?.width?.toString() ?? "300",
      showLabel: options?.label !== undefined ? String(options.label) : "false",
    });
    return getImageUrl(`/api/barcode?${params}`, { origin: this.origin });
  }

  private async fetch<T>(path: string, options?: RequestInit) {
    const headers = new Headers();
    headers.set("User-Agent", this.userAgent);

    const response = await fetch(new URL(path, this.origin), {
      method: options?.method ?? "GET",
      ...options,
      headers: {
        ...Object.fromEntries(headers.entries()),
        ...options?.headers,
      },
    });
    if (!response.ok) {
      throw Error(
        `${response.status} ${response.statusText}: ${await response.text()}`,
      );
    }

    const data = (await response.json()) as T;
    return data;
  }

  /**
   * Search media items and boxsets.
   *
   * @param query Search string to find results with. The effective minimum
   *  query length is 2.
   * @param options.limit Truncate the number of results returned. I have seen
   *  up to 467 results without providing a limit.
   *
   * @example Search for all The Mummy movies and boxsets
   * ```ts
   * const results = await discdb.search("the mummy", { limit: 50 });
   * console.log(results);
   * // [
   * //   {
   * //     key: "movie-the-mummy-1999",
   * //     type: SearchType.Movie,
   * //     title: "The Mummy",
   * //     slug: "the-mummy-1999",
   * //     imageUrl: "Movie/the-mummy-1999/cover.jpg",
   * //     relativeUrl: "/movie/the-mummy-1999",
   * //     externalIds: {
   * //       imdb: "tt0120616",
   * //       tmdb: 564,
   * //       upc: 191329243763,
   * //       asin: "B0C25X1883",
   * //     },
   * //     groups: [],
   * //   },
   * //   // ...
   * //   {
   * //     key: "boxset-the-mummy-trilogy-4k",
   * //     type: SearchType.Boxset,
   * //     title: "The Mummy Trilogy 4K",
   * //     slug: "the-mummy-trilogy-4k",
   * //     imageUrl: "boxset/the-mummy-trilogy-4k.jpg",
   * //     relativeUrl: "/boxset/the-mummy-trilogy-4k",
   * //     externalIds: {},
   * //     groups: [],
   * //   },
   * //   // ...
   * // ]
   * ```
   */
  async search(
    query: string,
    options?: { limit: number },
  ): Promise<SearchResult[]> {
    const params = new URLSearchParams({ q: query });
    if (options?.limit !== undefined) {
      params.set("limit", String(options.limit));
    }
    const data = await this.fetch<APISearchResult[]>(`/api/search?${params}`, {
      method: "GET",
    });
    const results = data.map((result) => {
      const newResult: SearchResult = {
        key: result.id,
        title: result.title,
        slug: result.mediaItem.slug,
        imageUrl: result.imageUrl,
        type: result.type,
        relativeUrl: result.relativeUrl,
        externalIds: {},
        externalIdsRaw: result.identifiers,
        groups: result.groups,
      };
      // Not very consequential but the default is inconsistent with the
      // keys used for media items
      if (result.type === SearchType.Boxset) {
        newResult.key = `boxset-${result.mediaItem.slug}`;
      }

      // No individual ID is guaranteed (except probably TMDB on non-boxsets),
      // so we have to make some educated guesses as to which ID is which
      // based on its structure and location.
      let i = -1;
      for (const id of result.identifiers) {
        i += 1;
        if (id.startsWith("tt") && i === 0) {
          newResult.externalIds.imdb = id;
          continue;
        }
        if (!Number.isNaN(Number(id))) {
          const nextId = result.identifiers[i + 1];
          if (
            // This is the second item or there was no imdb item
            ((newResult.externalIds.imdb && i === 1) || i === 0) &&
            // If the next item is numeric, it must be a UPC
            (!nextId ||
              (!Number.isNaN(Number(nextId)) ? nextId?.length === 12 : true))
          ) {
            newResult.externalIds.tmdb = Number(id);
          } else if (id.length === 12) {
            newResult.externalIds.upc = Number(id);
          }
        } else if (id.length === 10) {
          newResult.externalIds.asin = id;
        }
      }
      return newResult;
    });
    return results;
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
  async getMediaItemByDiscHash(hash: string) {
    const data = await this.gql.query({
      mediaItems: {
        __args: {
          where: {
            releases: {
              some: { discs: { some: { contentHash: { eq: hash } } } },
            },
          },
        },
        nodes: GQL_NODE_QUERY,
      },
    });
    const node = data.mediaItems?.nodes?.[0];
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
   * @param hashes the disc hashes (from `hashDisc`)
   * @returns a mapping of disc hashes to media item arrays
   */
  async getMediaItemsByDiscHashes(hashes: string[]) {
    const data = await this.gql.query({
      mediaItems: {
        __args: {
          where: {
            releases: {
              some: { discs: { some: { contentHash: { in: hashes } } } },
            },
          },
        },
        nodes: GQL_NODE_QUERY,
      },
    });
    const nodes = data.mediaItems?.nodes ?? [];
    // build the map ahead of time so there is always an array even for hashes
    // that returned no discs
    const results: Record<string, typeof nodes> = Object.fromEntries(
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
   * Get all media items which are "tagged" with a specific group.
   * This is used by TheDiscDB to identify cast, crew, genres, and studios.
   *
   * @param slug group slug, e.g. comedy, jim-carrey, a24
   * @param role narrow results by role, useful in removing irrelevant results
   * @param input input & pagination options
   * @returns media items and page info
   *
   * @example Get media items produced by Disney
   * ```ts
   * await discdb.getMediaItemsByGroup("disney", MediaItemGroupRole.Company);
   * ```
   *
   * @example Get TV shows with Adam Scott
   * ```ts
   * await discdb.getMediaItemsByGroup(
   *   "adam-scott",
   *   MediaItemGroupRole.Actor,
   *   { query: { type: MediaItemType.Series } },
   * );
   * ```
   */
  async getMediaItemsByGroup(
    slug: string,
    role?: MediaItemGroupRole,
    input?: BidirectionalPaginationQuery<
      MediaItemFilterInput,
      MediaItemSortInput
    >,
  ) {
    const data = await this.gql.query({
      mediaItemsByGroup: {
        __args: { slug, role, ...unifyPageArgs(input) },
        nodes: {
          slug: true,
          year: true,
          title: true,
          type: true,
          imageUrl: true,
          mediaItemGroups: {
            __args: { where: { group: { slug: { eq: slug } } } },
            role: true,
            group: {
              name: true,
              slug: true,
              imageUrl: true,
              on_Group: { id: true },
            },
            on_MediaItemGroup: { id: true },
          },
          releases: {
            slug: true,
            locale: true,
            year: true,
            title: true,
            discs: {
              index: true,
              name: true,
              format: true,
              on_Disc: { id: true },
            },
            on_Release: { id: true },
          },
          on_MediaItem: { id: true },
        },
        pageInfo: { __scalar: true },
      },
    });

    return {
      mediaItems: data.mediaItemsByGroup?.nodes ?? [],
      page: data.mediaItemsByGroup
        ? unifyPageInfo(input, data.mediaItemsByGroup.pageInfo)
        : undefined,
    };
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
  async getReleaseBySlug(mediaItemSlug: string, slug: string) {
    const data = await this.gql.query({
      mediaItems: {
        __args: {
          where: {
            and: [
              { slug: { eq: mediaItemSlug } },
              { releases: { some: { slug: { eq: slug } } } },
            ],
          },
        },
        nodes: GQL_NODE_QUERY,
      },
    });
    const node = data.mediaItems?.nodes?.[0];
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
  }) {
    const ors = [];
    if (ids.imdbId) ors.push({ imdb: { eq: ids.imdbId } });
    if (ids.tmdbId) ors.push({ tmdb: { eq: ids.tmdbId } });
    if (ids.tvdbId) ors.push({ tvdb: { eq: ids.tvdbId } });

    const data = await this.gql.query({
      mediaItems: {
        __args: { where: { externalids: { or: ors } } },
        nodes: GQL_NODE_QUERY,
      },
    });
    const node = data.mediaItems?.nodes?.[0];
    if (!node) {
      throw Error(
        `No media item matching any external IDs from ${JSON.stringify(ids)}`,
      );
    }
    return node;
  }

  /**
   * Ask the server to hash a disc's files. It should be preferred to do this
   * locally when possible.
   *
   * This could be used to hash files uploaded to a web form on a browser that
   * does not support the filesystem API (not tested - relies on date modified
   * instead of date created, which are often the same, but perhaps not always)
   *
   * @param files details for the relevant files from the disc.
   * - DVD: the contents of VIDEO_TS
   * - Blu-ray: every `.m2ts` file in BDMV/STREAM
   * @returns the computed hash
   */
  async hash(files: (FileHashInfo | File)[]): Promise<string> {
    const data = await this.fetch<{ hash: string }>("/api/hash", {
      method: "POST",
      body: JSON.stringify({
        // Seems like index and order do not actually matter
        Files: files.map((file, i) =>
          file instanceof File
            ? {
                Index: i + 1,
                Name: file.name,
                Size: file.size,
                CreationTime: new Date(file.lastModified).toISOString(),
              }
            : {
                Index: file.index,
                Name: file.name,
                Size: file.size,
                CreationTime: new Date(file.created).toISOString(),
              },
        ),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data.hash;
  }

  async getBoxsets<
    Selection extends BoxsetGenqlSelection = {
      title: true;
      slug: true;
      sortTitle: true;
      imageUrl: true;
      type: true;
      release: { title: true; slug: true; year: true; imageUrl: true };
    },
  >(
    input?: BidirectionalPaginationQuery<BoxsetFilterInput, BoxsetSortInput>,
    select?: Selection,
  ) {
    const data = await this.gql.query({
      boxsets: {
        __args: unifyPageArgs(input),
        nodes:
          select ??
          ({
            title: true,
            slug: true,
            sortTitle: true,
            imageUrl: true,
            type: true,
            release: {
              title: true,
              slug: true,
              year: true,
              imageUrl: true,
            },
          } as Selection),
        pageInfo: { __scalar: true },
      },
    });
    return {
      boxsets: fixMediaTypes(data.boxsets?.nodes ?? [], "type"),
      page: data.boxsets
        ? unifyPageInfo(input, data.boxsets.pageInfo)
        : undefined,
    };
  }

  async getBoxsetBySlug(slug: string) {
    const data = await this.getBoxsets(
      { query: { slug: { eq: slug } } },
      {
        title: true,
        slug: true,
        sortTitle: true,
        imageUrl: true,
        type: true,
        release: GQL_NODE_QUERY.releases,
      },
    );
    if (data.boxsets.length === 0) {
      throw Error(`No such boxset with slug "${slug}"`);
    }
    return data.boxsets[0];
  }
}

const GQL_NODE_QUERY = {
  title: true,
  year: true,
  slug: true,
  imageUrl: true,
  type: true,
  externalids: {
    tmdb: true,
    imdb: true,
    tvdb: true,
  },
  releases: {
    slug: true,
    locale: true,
    regionCode: true,
    year: true,
    title: true,
    imageUrl: true,
    discs: {
      __args: { order: [{ index: enumSortEnumType.ASC }] },
      contentHash: true,
      index: true,
      name: true,
      format: true,
      slug: true,
      titles: {
        __args: { order: [{ index: enumSortEnumType.ASC }] },
        index: true,
        duration: true,
        displaySize: true,
        sourceFile: true,
        size: true,
        segmentMap: true,
        item: {
          title: true,
          season: true,
          episode: true,
          type: true,
          chapters: {
            __args: { order: [{ index: enumSortEnumType.ASC }] },
            index: true,
            title: true,
          },
        },
      },
    },
  },
} satisfies MediaItemGenqlSelection;
