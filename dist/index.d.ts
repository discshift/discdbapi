declare module "src/types/title" {
    export enum ItemType {
        /**
         * Used for the main movie on a disc. It is possible that there can be
         * several main movies - for example multiple movies on a single disc or
         * multiple versions of the same movie.
         */
        MainMovie = "MainMovie",
        /** Deleted or extended scenes */
        DeletedScene = "DeletedScene",
        /** Trailers or promotional tv spots */
        Trailer = "Trailer",
        /** Any supplemental feature which does not fall in other categories */
        Extra = "Extra",
        /**
         * Used only for episodic content like TV shows (Note: Season and Episode
         * fields are required if the Type field is Episode)
         */
        Episode = "Episode"
    }
    export interface ItemChapter {
        index: number;
        title: string;
    }
    export interface TitleItem {
        title: string;
        /** Should be parsable to int */
        season: string | null;
        /** May be a range (like `1-2`) or a single episode number */
        episode: string | null;
        type: ItemType;
        chapters: ItemChapter[];
    }
    export interface Title {
        index: number;
        /** in hh:mm:ss */
        duration: string;
        /** mebibytes/gibibytes */
        displaySize: string;
        /**
         * For DVDs, the title/track index. For Blu-rays/UHD, the filename in
         * `/BDMV/STREAM`.
         */
        sourceFile: string;
        /** bytes */
        size: number;
        segmentMap: string;
        item: TitleItem | null;
    }
    export interface ExternalIds {
        tmdb: number;
        imdb?: string | null;
        tvdb?: string | null;
        mediaItem?: Title | null;
    }
}
declare module "src/types/media" {
    import type { DiscFormat } from "src-legacy/types/disc";
    import type { Boxset } from "src/types/boxset";
    import type { Title } from "src/types/title";
    /**
     * From Wikipedia (https://en.wikipedia.org/wiki/DVD_region_code):
     *
     * - `0` = Worldwide
     * - `1` = United States (incl. Puerto Rico), Canada, and Bermuda
     * - `2` = Europe (except Belarus, Russia, and Ukraine), Greenland, British
     *   Overseas Territories, Overseas France, Middle East, Eswatini, Lesotho,
     *   South Africa, and Japan
     * - `3` = Southeast Asia, South Korea, Taiwan, Hong Kong, and Macau
     * - `4` = Latin America (except French Guiana, Puerto Rico, and the French
     *   West Indies), and Oceania (except French Polynesia, New Caledonia, Wallis
     *   and Futuna, and Hawaii)
     * - `5` = Africa (except Egypt, Lesotho, Eswatini, South Africa, Mayotte and
     *   Réunion), Russia, Belarus, Ukraine, Central Asia, South Asia, Mongolia,
     *   and North Korea
     * - `6` = Mainland China
     * - `7` = MPA-related DVDs and "media copies" of pre-releases in Asia
     * - `8` = International venues such as aircraft, cruise ships, and spacecraft
     *
     * https://en.wikipedia.org/wiki/Blu-ray#Region_codes -
     * Blu-ray only specifies 3 region codes (A, B, C), but that does not mean
     * that Blu-ray region codes are always present in Blu-ray release files as
     * might be expected (see Release.regionCode)
     */
    export type NumberRegionCode = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
    export type LetterRegionCode = "A" | "B" | "C";
    export enum TitleType {
        Movie = "Movie",
        Series = "Series"
    }
    export interface ReleaseDisc {
        contentHash: string | null;
        index: number;
        name: string;
        format: DiscFormat;
        slug: string;
        titles: Title[];
    }
    export interface Release {
        slug: string;
        locale: string;
        /**
         * For most releases, this is a numeric code, but not always. It seems that
         * the default is `1` and must be changed manually.
         */
        regionCode: string;
        year: number;
        title: string;
        fullTitle?: string;
        imageUrl: string | null;
        discs: ReleaseDisc[];
        mediaItem?: Title;
        boxset?: Boxset;
    }
    export interface MediaItem {
        id: number;
        title: string;
        year: number;
        slug: string;
        imageUrl: string | null;
        type: TitleType;
        releases: Release[];
    }
}
declare module "src/types/boxset" {
    import type { Release, TitleType } from "src/types/media";
    export interface Boxset {
        id: number;
        title: string | null;
        sortTitle: string | null;
        slug: string | null;
        imageUrl: string | null;
        release: Release | null;
        releaseId: number;
        type: TitleType;
    }
}
declare module "src/types/query" {
    import type { MediaItem } from "src/types/media";
    export interface MediaItemsResponse {
        mediaItems: {
            nodes: MediaItem[];
        };
    }
}
declare module "src/types/index" {
    export * from "src/types/boxset";
    export * from "src/types/media";
    export * from "src/types/query";
    export * from "src/types/title";
}
