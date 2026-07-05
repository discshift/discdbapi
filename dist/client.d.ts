import { type BidirectionalPaginationQuery } from "./common";
import { type BoxsetFilterInput, type BoxsetGenqlSelection, type BoxsetSortInput, type FieldsSelection, type Client as GQLClient, type MediaItem, type MediaItemFilterInput, type MediaItemSortInput, type Release } from "./genql";
import { type MediaItemGroupRole, type SearchResult } from "./types";
import type { FileHashInfo } from "./types/hash";
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
    getMediaItemByDiscHash(hash: string): Promise<MediaItemViaStandardQuery>;
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
    getMediaItemsByDiscHashes(hashes: string[]): Promise<Record<string, MediaItemViaStandardQuery[]>>;
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
        mediaItems: MediaItem[] | Pick<{
            id: import("./genql").Scalars["Int"];
            title: (import("./genql").Scalars["String"] | null);
            slug: (import("./genql").Scalars["String"] | null);
            fullTitle: (import("./genql").Scalars["String"] | null);
            sortTitle: (import("./genql").Scalars["String"] | null);
            year: import("./genql").Scalars["Int"];
            type: (import("./genql").Scalars["String"] | null);
            imageUrl: (import("./genql").Scalars["String"] | null);
            externalids: import("./genql").ExternalIds;
            externalIdsId: import("./genql").Scalars["Int"];
            releases: Pick<{
                id: import("./genql").Scalars["Int"];
                slug: (import("./genql").Scalars["String"] | null);
                title: (import("./genql").Scalars["String"] | null);
                regionCode: (import("./genql").Scalars["String"] | null);
                locale: (import("./genql").Scalars["String"] | null);
                year: import("./genql").Scalars["Int"];
                upc: (import("./genql").Scalars["String"] | null);
                isbn: (import("./genql").Scalars["String"] | null);
                asin: (import("./genql").Scalars["String"] | null);
                imageUrl: (import("./genql").Scalars["String"] | null);
                backImageUrl: (import("./genql").Scalars["String"] | null);
                releaseDate: import("./genql").Scalars["DateTime"];
                dateAdded: import("./genql").Scalars["DateTime"];
                fullTitle: import("./genql").Scalars["String"];
                type: import("./genql").Scalars["String"];
                discs: Pick<{
                    id: import("./genql").Scalars["Int"];
                    releaseId: import("./genql").Scalars["Int"];
                    release: (Release | null);
                    discId: import("./genql").Scalars["Int"];
                    disc: (import("./genql").Disc | null);
                    index: import("./genql").Scalars["Int"];
                    slug: (import("./genql").Scalars["String"] | null);
                    name: (import("./genql").Scalars["String"] | null);
                    format: (import("./genql").Scalars["String"] | null);
                    contentHash: (import("./genql").Scalars["String"] | null);
                    titles: import("./genql").Title[];
                    __typename: "ReleaseDisc";
                }, "name" | "index" | "format" | "on_Disc">[];
                releaseGroups: import("./genql").ReleaseGroup[];
                mediaItem: (MediaItem | null);
                boxset: (import("./genql").Boxset | null);
                contributors: import("./genql").Contributor[];
                __typename: "Release";
            }, "title" | "slug" | "year" | "locale" | "discs" | "on_Release">[];
            mediaItemGroups: Pick<{
                id: import("./genql").Scalars["Int"];
                mediaItemId: import("./genql").Scalars["Int"];
                groupId: import("./genql").Scalars["Int"];
                role: (import("./genql").Scalars["String"] | null);
                isFeatured: import("./genql").Scalars["Boolean"];
                mediaItem: (MediaItem | null);
                group: FieldsSelection<import("./genql").Group | null, {
                    name: true;
                    slug: true;
                    imageUrl: true;
                    on_Group: {
                        id: boolean;
                    };
                }>;
                __typename: "MediaItemGroup";
            }, "group" | "role" | "on_MediaItemGroup">[];
            plot: (import("./genql").Scalars["String"] | null);
            tagline: (import("./genql").Scalars["String"] | null);
            directors: (import("./genql").Scalars["String"] | null);
            writers: (import("./genql").Scalars["String"] | null);
            stars: (import("./genql").Scalars["String"] | null);
            genres: (import("./genql").Scalars["String"] | null);
            runtimeMinutes: import("./genql").Scalars["Int"];
            runtime: (import("./genql").Scalars["String"] | null);
            contentRating: (import("./genql").Scalars["String"] | null);
            releaseDate: import("./genql").Scalars["DateTime"];
            latestReleaseDate: import("./genql").Scalars["DateTime"];
            dateAdded: import("./genql").Scalars["DateTime"];
            __typename: "MediaItem";
        }, "title" | "slug" | "year" | "type" | "imageUrl" | "releases" | "mediaItemGroups" | "on_MediaItem">[];
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        } | undefined;
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
    getReleaseBySlug(mediaItemSlug: string, slug: string): Promise<FieldsSelection<Release, (typeof GQL_NODE_QUERY)["releases"]> & {
        mediaItem: MediaItemViaStandardQuery;
    }>;
    /**
     * Fetch a release by its Universal Product Code (UPC).
     *
     * @param upc the upc for the release, a 12-digit number
     */
    getReleaseByUPC(upc: string | number): Promise<FieldsSelection<Release, (typeof GQL_NODE_QUERY)["releases"]> & {
        mediaItem: MediaItemViaStandardQuery;
    }>;
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
    }): Promise<MediaItemViaStandardQuery>;
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
        boxsets: import("./genql").Boxset[] | NonNullable<FieldsSelection<import("./genql").Boxset[] | null, NonNullable<Selection>>>;
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        } | undefined;
    }>;
    getBoxsetBySlug(slug: string): Promise<import("./genql").Boxset | Pick<{
        id: import("./genql").Scalars["Int"];
        title: (import("./genql").Scalars["String"] | null);
        sortTitle: (import("./genql").Scalars["String"] | null);
        slug: (import("./genql").Scalars["String"] | null);
        imageUrl: (import("./genql").Scalars["String"] | null);
        release: FieldsSelection<Release | null, {
            slug: boolean;
            locale: boolean;
            regionCode: boolean;
            year: boolean;
            title: boolean;
            imageUrl: boolean;
            upc: boolean;
            asin: boolean;
            discs: {
                __args: {
                    order: {
                        index: "ASC";
                    }[];
                };
                contentHash: boolean;
                index: boolean;
                name: boolean;
                format: boolean;
                slug: boolean;
                titles: {
                    __args: {
                        order: {
                            index: "ASC";
                        }[];
                    };
                    index: boolean;
                    duration: boolean;
                    displaySize: boolean;
                    sourceFile: boolean;
                    size: boolean;
                    segmentMap: boolean;
                    item: {
                        title: boolean;
                        season: boolean;
                        episode: boolean;
                        type: boolean;
                        chapters: {
                            __args: {
                                order: {
                                    index: "ASC";
                                }[];
                            };
                            index: boolean;
                            title: boolean;
                        };
                    };
                };
            };
        }>;
        releaseId: import("./genql").Scalars["Int"];
        type: import("./genql").Scalars["String"];
        __typename: "Boxset";
    }, "title" | "slug" | "sortTitle" | "type" | "imageUrl" | "release"> | undefined>;
}
declare const GQL_NODE_QUERY: {
    title: boolean;
    year: boolean;
    slug: boolean;
    imageUrl: boolean;
    type: boolean;
    externalids: {
        tmdb: boolean;
        imdb: boolean;
        tvdb: boolean;
    };
    releases: {
        slug: boolean;
        locale: boolean;
        regionCode: boolean;
        year: boolean;
        title: boolean;
        imageUrl: boolean;
        upc: boolean;
        asin: boolean;
        discs: {
            __args: {
                order: {
                    index: "ASC";
                }[];
            };
            contentHash: boolean;
            index: boolean;
            name: boolean;
            format: boolean;
            slug: boolean;
            titles: {
                __args: {
                    order: {
                        index: "ASC";
                    }[];
                };
                index: boolean;
                duration: boolean;
                displaySize: boolean;
                sourceFile: boolean;
                size: boolean;
                segmentMap: boolean;
                item: {
                    title: boolean;
                    season: boolean;
                    episode: boolean;
                    type: boolean;
                    chapters: {
                        __args: {
                            order: {
                                index: "ASC";
                            }[];
                        };
                        index: boolean;
                        title: boolean;
                    };
                };
            };
        };
    };
};
export type MediaItemViaStandardQuery = FieldsSelection<MediaItem, typeof GQL_NODE_QUERY>;
export type MediaItemVSQRelease = MediaItemViaStandardQuery["releases"][number];
export type MediaItemVSQDisc = MediaItemVSQRelease["discs"][number];
export {};
