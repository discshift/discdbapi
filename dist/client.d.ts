import type { MediaItem, ReleaseWithMediaItem } from "./types/media";
import type { FileHashInfo } from "./types/hash";
/**
 * Returns a qualified image URL from a path
 */
export declare const getImageUrl: (path: string, origin?: string) => string;
export declare class DiscDBClient {
    origin: string;
    constructor(options?: {
        origin?: string;
    });
    getImageUrl(path: string): string;
    private fetch;
    private graphql;
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
    getMediaItemByDiscHash(hash: string): Promise<MediaItem>;
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
    getMediaItemsByDiscHashes(hashes: string[]): Promise<Record<string, MediaItem[]>>;
    /**
     * Fetch a release by its URL slugs, useful for resolving a user-provided link.
     *
     * @param mediaItemSlug the slug for the media item as a whole on thediscdb.com
     * @param slug the slug for just the release on thediscdb.com
     * @returns a matching release with required `mediaItem` prop, whose
     *   `releases` array contains all releases for the media item other
     *   than the one requested.
     */
    getReleaseBySlug(mediaItemSlug: string, slug: string): Promise<ReleaseWithMediaItem>;
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
    }): Promise<MediaItem>;
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
}
