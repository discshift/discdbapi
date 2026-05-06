export declare enum ItemType {
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
    /**
     * Used only for episodic content like TV shows (Note: Season and Episode
     * fields are required if the Type field is Episode)
     */
    Episode = "Episode",
    /**
     * Any supplemental feature which does not fall in other categories. See its
     * subtypes for further specification.
     */
    Extra = "Extra",
    /**
     * Short, edited/produced content which is a sidecar to the main feature.
     * This is often used for behind the scenes titles.
     *
     * Subtype of {@link ItemType.Extra}
     */
    Featurette = "Featurette",
    /**
     * Interview with someone associated with the feature.
     *
     * Subtype of {@link ItemType.Extra}
     */
    Interview = "Interview",
    /**
     * A scene or clip from the feature. For deleted scenes,
     * use {@link ItemType.DeletedScene}.
     *
     * Subtype of {@link ItemType.Extra}
     */
    Scene = "Scene",
    /**
     * A musical extra, such as karaoke, music videos, or lyric videos.
     *
     * Subtype of {@link ItemType.Extra}
     */
    Music = "Music",
    /**
     * A related but not intrinsically linked short feature also on the disc.
     * This is different from {@link ItemType.Featurette} in that it is not an
     * accessory to the feature. An example might be The Steamroller and the
     * Violin (1961) on the Criterion Blu-ray release of Andrei Rublev (1966),
     * whereas the included 1966 documentary, On the Set of "Andrei Rublev",
     * would be a featurette.
     *
     * Subtype of {@link ItemType.Extra}
     */
    Short = "Short",
    /**
     * Roughly-defined type for overflow, but distinct from
     * {@link ItemType.Extra} in that often an "Other" item is not something
     * the user wants to view or save, but it may still warrant labeling for
     * archival purposes.
     *
     * Subtype of {@link ItemType.Extra}
     */
    Other = "Other"
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
