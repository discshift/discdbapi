import type { FileHashInfo } from "./types/hash";
import { type BoxsetFilterInput, type BoxsetGenqlSelection, type BoxsetSortInput, type Client as GQLClient, type MediaItemFilterInput, type MediaItemSortInput } from "./genql";
import { type BidirectionalPaginationQuery } from "./common";
import { type MediaItemGroupRole, type SearchResult } from "./types";
export declare class DiscDBClient {
    origin: string;
    userAgent: string;
    /**
     * Internal, typed GraphQL client that may be used to bypass wrapper logic
     * or compose custom queries
     *
     * @see https://genql.dev/docs
     */
    gql: GQLClient;
    constructor(options?: {
        origin?: string;
        userAgent?: string;
    });
    /**
     * Returns a qualified image URL from a path. If only one dimension is
     * provided, the other dimension will be resized automatically, maintaining
     * the original aspect ratio.
     */
    getImageUrl(path: string, options?: {
        width?: number;
        height?: number;
    }): string;
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
    getBarcodeImageUrl(code: string | number, options?: {
        width?: number;
        label?: boolean;
    }): string;
    private fetch;
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
    search(query: string, options?: {
        limit: number;
    }): Promise<SearchResult[]>;
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
    getMediaItemByDiscHash(hash: string): Promise<any>;
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
    getMediaItemsByDiscHashes(hashes: string[]): Promise<Record<string, any>>;
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
    getMediaItemsByGroup(slug: string, role?: MediaItemGroupRole, input?: BidirectionalPaginationQuery<MediaItemFilterInput, MediaItemSortInput>): Promise<{
        mediaItems: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
    }>;
    /**
     * Fetch a release by its URL slugs, useful for resolving a user-provided link.
     *
     * @param mediaItemSlug the slug for the media item as a whole on thediscdb.com
     * @param slug the slug for just the release on thediscdb.com
     * @returns a matching release with required `mediaItem` prop, whose
     *   `releases` array contains all releases for the media item other
     *   than the one requested.
     */
    getReleaseBySlug(mediaItemSlug: string, slug: string): Promise<any>;
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
    getMediaItemByExternalIds(ids: {
        tmdbId?: string;
        imdbId?: string;
        tvdbId?: string;
    }): Promise<any>;
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
    hash(files: (FileHashInfo | File)[]): Promise<string>;
    getBoxsets<Selection extends BoxsetGenqlSelection = {
        title: true;
        slug: true;
        sortTitle: true;
        imageUrl: true;
        type: true;
        release: {
            title: true;
            slug: true;
            year: true;
            imageUrl: true;
        };
    }>(input?: BidirectionalPaginationQuery<BoxsetFilterInput, BoxsetSortInput>, select?: Selection): Promise<{
        boxsets: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
    }>;
    getBoxsetBySlug(slug: string): Promise<any>;
}
