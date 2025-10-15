import type { DiscFormat } from "../../src-legacy/types/disc";
import type { Boxset } from "./boxset";
import type { Title } from "./title";

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
 * might be expected (see NodeRelease.regionCode)
 */
export type NumberRegionCode =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8";

export type LetterRegionCode = "A" | "B" | "C";

export enum TitleType {
  Movie = "Movie",
  Series = "Series",
}

export interface ReleaseDisc {
  index: number;
  name: string;
  format: DiscFormat;
  slug: string;
  titles: Title[];
}

export interface NodeRelease {
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

export interface DiscDetailNode {
  id: number;
  title: string;
  year: number;
  slug: string;
  imageUrl: string | null;
  type: TitleType;
  releases: NodeRelease[];
}
