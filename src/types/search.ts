import { MediaItemType } from "./media";

enum MediaTypeExtended {
  Boxset = "Boxset",
}

export type SearchType = MediaItemType | MediaTypeExtended;
export const SearchType = { ...MediaItemType, ...MediaTypeExtended };

export interface APISearchResult {
  /** unique key combining the type and slug for media items, and the numeric ID + "Boxset" for boxsets */
  id: string;
  /** extension of {@link types!MediaItemType} which also includes Boxset */
  type: SearchType;
  /** title of the media/boxset */
  title: string;
  /**
   * path to the image on the origin
   * @see {@link client!DiscDBClient#getImageUrl | getImageUrl}
   */
  imageUrl: string;
  /** full pathname to the media/boxset on the origin (an HTML webpage) */
  relativeUrl: string;
  /** IMDb, TMDB, UPC, and ASIN */
  identifiers: string[];
  /** should be an array of group slugs, but was always empty in testing */
  groups: string[];
  /** the associated media item/boxset. practically just a container for the slug */
  mediaItem: {
    slug: string;
    imageUrl: string;
  };
  release: null;
  disc: null;
}

export type SearchResult = Pick<
  APISearchResult,
  "type" | "title" | "imageUrl" | "relativeUrl" | "groups"
> & {
  /** unique key combining the type and slug */
  key: string;
  /**
   * URL slug for the media/boxset. unique only per {@link type} (use
   * {@link key} if you need an identifier for search results)
   */
  slug: string;
  /** parsed external IDs from {@link externalIdsRaw} for ease of use */
  externalIds: {
    /** IMDb title ID */
    imdb?: string;
    /** themoviedb.org */
    tmdb?: number;
    /** @see https://en.wikipedia.org/wiki/Universal_Product_Code */
    upc?: number;
    /** @see https://en.wikipedia.org/wiki/Amazon_Standard_Identification_Number */
    asin?: string;
  };
  /** unparsed external identifiers */
  externalIdsRaw: string[];
};
