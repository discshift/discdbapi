import type { MediaItem, ReleaseWithMediaItem } from "./types/media";
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
     * Fetch multiple releases by their numeric IDs.
     *
     * If a requested ID is not found, it will be missing from the returned
     * record, but no error will be thrown.
     *
     * @param id the release ID
     * @returns a map of ID to releases with required `mediaItem` props, whose
     *   `releases` arrays contains all releases for the media item other than
     *   the parent.
     */
    getReleases(ids: number[]): Promise<Record<string, ReleaseWithMediaItem>>;
    /**
     * Fetch a single release by its numeric ID.
     *
     * @param id the release ID
     * @returns a matching release with required `mediaItem` prop, whose
     *   `releases` array contains all releases for the media item other
     *   than the one requested.
     */
    getRelease(id: number): Promise<ReleaseWithMediaItem>;
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
}
