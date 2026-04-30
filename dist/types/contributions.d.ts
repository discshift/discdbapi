import type { DiscFormat } from "./media";
import type { ItemType } from "./title";
export interface WithEncodedId {
    /** integer identifier */
    id: number;
    /** `id` encoded by [sqids](https://sqids.org/dotnet) */
    encodedId: string;
}
export interface ExternalMetadata {
    /** TMDB ID of the item */
    id: number;
    /** Title of the item in English */
    title: string;
    /** Release year of the item, or 0 if no year is available */
    year: number;
    /** TMDB poster at size w92 */
    imageUrl: string | null;
}
export interface ExternalSearchResponse {
    results: ExternalMetadata[];
}
export interface HashDiscInput {
    contributionId: string;
    files: {
        index: number;
        name: string;
        creationTime: string;
        size: number;
    }[];
}
export interface CreateDiscInput {
    contributionId: string;
    contentHash: string;
    format: DiscFormat;
    name: string;
    slug: string;
}
export interface UpdateDiscInput extends CreateDiscInput {
    discId: string;
}
export interface AddItemToDiscInput {
    contributionId: string;
    discId: string;
    name: string;
    source: string;
    type: ItemType;
    description?: string | null;
    season?: string | null;
    episode?: string | null;
    duration: string;
    size: string;
    chapterCount: number;
    segmentCount: number;
    segmentMap: string;
}
