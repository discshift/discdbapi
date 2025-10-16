import type { MediaItem } from "./types/media";
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
}
