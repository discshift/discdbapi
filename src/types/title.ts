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
  Episode = "Episode",
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
