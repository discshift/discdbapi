// @ts-nocheck
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Scalars = {
    String: string,
    Boolean: boolean,
    Int: number,
    DateTime: any,
    Long: any,
}

export interface Query {
    mediaItems: (MediaItemsConnection | null)
    boxsets: (BoxsetsConnection | null)
    mediaItemsByGroup: (MediaItemsByGroupConnection | null)
    __typename: 'Query'
}


/** A connection to a list of items. */
export interface MediaItemsConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges: (MediaItemsEdge[] | null)
    /** A flattened list of the nodes. */
    nodes: (MediaItem[] | null)
    __typename: 'MediaItemsConnection'
}


/** A connection to a list of items. */
export interface BoxsetsConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges: (BoxsetsEdge[] | null)
    /** A flattened list of the nodes. */
    nodes: (Boxset[] | null)
    __typename: 'BoxsetsConnection'
}


/** A connection to a list of items. */
export interface MediaItemsByGroupConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo
    /** A list of edges. */
    edges: (MediaItemsByGroupEdge[] | null)
    /** A flattened list of the nodes. */
    nodes: (MediaItem[] | null)
    __typename: 'MediaItemsByGroupConnection'
}

export type SortEnumType = 'ASC' | 'DESC'


/** Information about pagination in a connection. */
export interface PageInfo {
    /** Indicates whether more edges exist following the set defined by the clients arguments. */
    hasNextPage: Scalars['Boolean']
    /** Indicates whether more edges exist prior the set defined by the clients arguments. */
    hasPreviousPage: Scalars['Boolean']
    /** When paginating backwards, the cursor to continue. */
    startCursor: (Scalars['String'] | null)
    /** When paginating forwards, the cursor to continue. */
    endCursor: (Scalars['String'] | null)
    __typename: 'PageInfo'
}


/** An edge in a connection. */
export interface MediaItemsEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: MediaItem
    __typename: 'MediaItemsEdge'
}


/** An edge in a connection. */
export interface BoxsetsEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: Boxset
    __typename: 'BoxsetsEdge'
}


/** An edge in a connection. */
export interface MediaItemsByGroupEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String']
    /** The item at the end of the edge. */
    node: MediaItem
    __typename: 'MediaItemsByGroupEdge'
}

export interface Boxset {
    id: Scalars['Int']
    title: (Scalars['String'] | null)
    sortTitle: (Scalars['String'] | null)
    slug: (Scalars['String'] | null)
    imageUrl: (Scalars['String'] | null)
    release: (Release | null)
    releaseId: Scalars['Int']
    type: Scalars['String']
    __typename: 'Boxset'
}

export interface MediaItem {
    id: Scalars['Int']
    title: (Scalars['String'] | null)
    slug: (Scalars['String'] | null)
    fullTitle: (Scalars['String'] | null)
    sortTitle: (Scalars['String'] | null)
    year: Scalars['Int']
    type: (Scalars['String'] | null)
    imageUrl: (Scalars['String'] | null)
    externalids: ExternalIds
    externalIdsId: Scalars['Int']
    releases: Release[]
    mediaItemGroups: MediaItemGroup[]
    plot: (Scalars['String'] | null)
    tagline: (Scalars['String'] | null)
    directors: (Scalars['String'] | null)
    writers: (Scalars['String'] | null)
    stars: (Scalars['String'] | null)
    genres: (Scalars['String'] | null)
    runtimeMinutes: Scalars['Int']
    runtime: (Scalars['String'] | null)
    contentRating: (Scalars['String'] | null)
    releaseDate: Scalars['DateTime']
    latestReleaseDate: Scalars['DateTime']
    dateAdded: Scalars['DateTime']
    __typename: 'MediaItem'
}

export interface ExternalIds {
    id: Scalars['Int']
    tmdb: (Scalars['String'] | null)
    imdb: (Scalars['String'] | null)
    tvdb: (Scalars['String'] | null)
    mediaItem: (MediaItem | null)
    __typename: 'ExternalIds'
}

export interface Release {
    id: Scalars['Int']
    slug: (Scalars['String'] | null)
    title: (Scalars['String'] | null)
    regionCode: (Scalars['String'] | null)
    locale: (Scalars['String'] | null)
    year: Scalars['Int']
    upc: (Scalars['String'] | null)
    isbn: (Scalars['String'] | null)
    asin: (Scalars['String'] | null)
    imageUrl: (Scalars['String'] | null)
    backImageUrl: (Scalars['String'] | null)
    releaseDate: Scalars['DateTime']
    dateAdded: Scalars['DateTime']
    fullTitle: Scalars['String']
    type: Scalars['String']
    discs: Disc[]
    releaseGroups: ReleaseGroup[]
    mediaItem: (MediaItem | null)
    boxset: (Boxset | null)
    contributors: Contributor[]
    __typename: 'Release'
}

export interface MediaItemGroup {
    id: Scalars['Int']
    mediaItemId: Scalars['Int']
    groupId: Scalars['Int']
    role: (Scalars['String'] | null)
    isFeatured: Scalars['Boolean']
    mediaItem: (MediaItem | null)
    group: (Group | null)
    __typename: 'MediaItemGroup'
}

export interface Contributor {
    id: Scalars['Int']
    name: (Scalars['String'] | null)
    releases: Release[]
    userId: (Scalars['String'] | null)
    source: (Scalars['String'] | null)
    __typename: 'Contributor'
}

export interface ReleaseGroup {
    id: Scalars['Int']
    releaseId: Scalars['Int']
    groupId: Scalars['Int']
    release: (Release | null)
    group: (Group | null)
    __typename: 'ReleaseGroup'
}

export interface Disc {
    id: Scalars['Int']
    index: Scalars['Int']
    slug: (Scalars['String'] | null)
    name: (Scalars['String'] | null)
    format: (Scalars['String'] | null)
    contentHash: (Scalars['String'] | null)
    titles: Title[]
    release: (Release | null)
    __typename: 'Disc'
}

export interface Group {
    id: Scalars['Int']
    imdbId: (Scalars['String'] | null)
    name: (Scalars['String'] | null)
    slug: (Scalars['String'] | null)
    imageUrl: (Scalars['String'] | null)
    mediaItemGroups: MediaItemGroup[]
    releaseGroups: ReleaseGroup[]
    __typename: 'Group'
}

export interface Title {
    index: Scalars['Int']
    disc: (Disc | null)
    id: Scalars['Int']
    comment: (Scalars['String'] | null)
    sourceFile: (Scalars['String'] | null)
    segmentMap: (Scalars['String'] | null)
    duration: (Scalars['String'] | null)
    size: Scalars['Long']
    displaySize: (Scalars['String'] | null)
    item: (DiscItemReference | null)
    discItemReferenceId: (Scalars['Int'] | null)
    tracks: Track[]
    description: Scalars['String']
    itemType: Scalars['String']
    season: Scalars['String']
    episode: Scalars['String']
    hasItem: Scalars['Boolean']
    __typename: 'Title'
}

export interface Track {
    id: Scalars['Int']
    index: Scalars['Int']
    name: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    resolution: (Scalars['String'] | null)
    aspectRatio: (Scalars['String'] | null)
    audioType: (Scalars['String'] | null)
    languageCode: (Scalars['String'] | null)
    language: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    title: (Title | null)
    __typename: 'Track'
}

export interface DiscItemReference {
    id: Scalars['Int']
    title: (Scalars['String'] | null)
    type: (Scalars['String'] | null)
    description: (Scalars['String'] | null)
    chapters: Chapter[]
    season: (Scalars['String'] | null)
    episode: (Scalars['String'] | null)
    discItem: (Title | null)
    __typename: 'DiscItemReference'
}

export interface Chapter {
    id: Scalars['Int']
    index: Scalars['Int']
    title: (Scalars['String'] | null)
    __typename: 'Chapter'
}

export interface QueryGenqlSelection{
    mediaItems?: (MediaItemsConnectionGenqlSelection & { __args?: {
    /** Returns the first _n_ elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the last _n_ elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), where?: (MediaItemFilterInput | null), order?: (MediaItemSortInput[] | null)} })
    boxsets?: (BoxsetsConnectionGenqlSelection & { __args?: {
    /** Returns the first _n_ elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the last _n_ elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), where?: (BoxsetFilterInput | null), order?: (BoxsetSortInput[] | null)} })
    mediaItemsByGroup?: (MediaItemsByGroupConnectionGenqlSelection & { __args: {slug: Scalars['String'], role?: (Scalars['String'] | null), 
    /** Returns the first _n_ elements from the list. */
    first?: (Scalars['Int'] | null), 
    /** Returns the elements in the list that come after the specified cursor. */
    after?: (Scalars['String'] | null), 
    /** Returns the last _n_ elements from the list. */
    last?: (Scalars['Int'] | null), 
    /** Returns the elements in the list that come before the specified cursor. */
    before?: (Scalars['String'] | null), where?: (MediaItemFilterInput | null), order?: (MediaItemSortInput[] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MediaItemFilterInput {and?: (MediaItemFilterInput[] | null),or?: (MediaItemFilterInput[] | null),id?: (IntOperationFilterInput | null),title?: (StringOperationFilterInput | null),slug?: (StringOperationFilterInput | null),fullTitle?: (StringOperationFilterInput | null),sortTitle?: (StringOperationFilterInput | null),year?: (IntOperationFilterInput | null),type?: (StringOperationFilterInput | null),imageUrl?: (StringOperationFilterInput | null),externalids?: (ExternalIdsFilterInput | null),externalIdsId?: (IntOperationFilterInput | null),releases?: (ListFilterInputTypeOfReleaseFilterInput | null),mediaItemGroups?: (ListFilterInputTypeOfMediaItemGroupFilterInput | null),plot?: (StringOperationFilterInput | null),tagline?: (StringOperationFilterInput | null),directors?: (StringOperationFilterInput | null),writers?: (StringOperationFilterInput | null),stars?: (StringOperationFilterInput | null),genres?: (StringOperationFilterInput | null),runtimeMinutes?: (IntOperationFilterInput | null),runtime?: (StringOperationFilterInput | null),contentRating?: (StringOperationFilterInput | null),releaseDate?: (DateTimeOperationFilterInput | null),latestReleaseDate?: (DateTimeOperationFilterInput | null),dateAdded?: (DateTimeOperationFilterInput | null)}

export interface MediaItemSortInput {id?: (SortEnumType | null),title?: (SortEnumType | null),slug?: (SortEnumType | null),fullTitle?: (SortEnumType | null),sortTitle?: (SortEnumType | null),year?: (SortEnumType | null),type?: (SortEnumType | null),imageUrl?: (SortEnumType | null),externalids?: (ExternalIdsSortInput | null),externalIdsId?: (SortEnumType | null),plot?: (SortEnumType | null),tagline?: (SortEnumType | null),directors?: (SortEnumType | null),writers?: (SortEnumType | null),stars?: (SortEnumType | null),genres?: (SortEnumType | null),runtimeMinutes?: (SortEnumType | null),runtime?: (SortEnumType | null),contentRating?: (SortEnumType | null),releaseDate?: (SortEnumType | null),latestReleaseDate?: (SortEnumType | null),dateAdded?: (SortEnumType | null)}

export interface BoxsetFilterInput {and?: (BoxsetFilterInput[] | null),or?: (BoxsetFilterInput[] | null),id?: (IntOperationFilterInput | null),title?: (StringOperationFilterInput | null),sortTitle?: (StringOperationFilterInput | null),slug?: (StringOperationFilterInput | null),imageUrl?: (StringOperationFilterInput | null),release?: (ReleaseFilterInput | null),releaseId?: (IntOperationFilterInput | null),type?: (StringOperationFilterInput | null)}

export interface BoxsetSortInput {id?: (SortEnumType | null),title?: (SortEnumType | null),sortTitle?: (SortEnumType | null),slug?: (SortEnumType | null),imageUrl?: (SortEnumType | null),release?: (ReleaseSortInput | null),releaseId?: (SortEnumType | null),type?: (SortEnumType | null)}


/** A connection to a list of items. */
export interface MediaItemsConnectionGenqlSelection{
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** A list of edges. */
    edges?: MediaItemsEdgeGenqlSelection
    /** A flattened list of the nodes. */
    nodes?: MediaItemGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A connection to a list of items. */
export interface BoxsetsConnectionGenqlSelection{
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** A list of edges. */
    edges?: BoxsetsEdgeGenqlSelection
    /** A flattened list of the nodes. */
    nodes?: BoxsetGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** A connection to a list of items. */
export interface MediaItemsByGroupConnectionGenqlSelection{
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection
    /** A list of edges. */
    edges?: MediaItemsByGroupEdgeGenqlSelection
    /** A flattened list of the nodes. */
    nodes?: MediaItemGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface IntOperationFilterInput {eq?: (Scalars['Int'] | null),neq?: (Scalars['Int'] | null),in?: ((Scalars['Int'] | null)[] | null),nin?: ((Scalars['Int'] | null)[] | null),gt?: (Scalars['Int'] | null),ngt?: (Scalars['Int'] | null),gte?: (Scalars['Int'] | null),ngte?: (Scalars['Int'] | null),lt?: (Scalars['Int'] | null),nlt?: (Scalars['Int'] | null),lte?: (Scalars['Int'] | null),nlte?: (Scalars['Int'] | null)}

export interface StringOperationFilterInput {and?: (StringOperationFilterInput[] | null),or?: (StringOperationFilterInput[] | null),eq?: (Scalars['String'] | null),neq?: (Scalars['String'] | null),contains?: (Scalars['String'] | null),ncontains?: (Scalars['String'] | null),in?: ((Scalars['String'] | null)[] | null),nin?: ((Scalars['String'] | null)[] | null),startsWith?: (Scalars['String'] | null),nstartsWith?: (Scalars['String'] | null),endsWith?: (Scalars['String'] | null),nendsWith?: (Scalars['String'] | null)}

export interface ExternalIdsFilterInput {and?: (ExternalIdsFilterInput[] | null),or?: (ExternalIdsFilterInput[] | null),id?: (IntOperationFilterInput | null),tmdb?: (StringOperationFilterInput | null),imdb?: (StringOperationFilterInput | null),tvdb?: (StringOperationFilterInput | null),mediaItem?: (MediaItemFilterInput | null)}

export interface ListFilterInputTypeOfReleaseFilterInput {all?: (ReleaseFilterInput | null),none?: (ReleaseFilterInput | null),some?: (ReleaseFilterInput | null),any?: (Scalars['Boolean'] | null)}

export interface ListFilterInputTypeOfMediaItemGroupFilterInput {all?: (MediaItemGroupFilterInput | null),none?: (MediaItemGroupFilterInput | null),some?: (MediaItemGroupFilterInput | null),any?: (Scalars['Boolean'] | null)}

export interface DateTimeOperationFilterInput {eq?: (Scalars['DateTime'] | null),neq?: (Scalars['DateTime'] | null),in?: ((Scalars['DateTime'] | null)[] | null),nin?: ((Scalars['DateTime'] | null)[] | null),gt?: (Scalars['DateTime'] | null),ngt?: (Scalars['DateTime'] | null),gte?: (Scalars['DateTime'] | null),ngte?: (Scalars['DateTime'] | null),lt?: (Scalars['DateTime'] | null),nlt?: (Scalars['DateTime'] | null),lte?: (Scalars['DateTime'] | null),nlte?: (Scalars['DateTime'] | null)}

export interface ExternalIdsSortInput {id?: (SortEnumType | null),tmdb?: (SortEnumType | null),imdb?: (SortEnumType | null),tvdb?: (SortEnumType | null),mediaItem?: (MediaItemSortInput | null)}

export interface ReleaseFilterInput {and?: (ReleaseFilterInput[] | null),or?: (ReleaseFilterInput[] | null),id?: (IntOperationFilterInput | null),slug?: (StringOperationFilterInput | null),title?: (StringOperationFilterInput | null),regionCode?: (StringOperationFilterInput | null),locale?: (StringOperationFilterInput | null),year?: (IntOperationFilterInput | null),upc?: (StringOperationFilterInput | null),isbn?: (StringOperationFilterInput | null),asin?: (StringOperationFilterInput | null),imageUrl?: (StringOperationFilterInput | null),backImageUrl?: (StringOperationFilterInput | null),releaseDate?: (DateTimeOperationFilterInput | null),dateAdded?: (DateTimeOperationFilterInput | null),fullTitle?: (StringOperationFilterInput | null),type?: (StringOperationFilterInput | null),discs?: (ListFilterInputTypeOfDiscFilterInput | null),releaseGroups?: (ListFilterInputTypeOfReleaseGroupFilterInput | null),mediaItem?: (MediaItemFilterInput | null),boxset?: (BoxsetFilterInput | null),contributors?: (ListFilterInputTypeOfContributorFilterInput | null)}

export interface ReleaseSortInput {id?: (SortEnumType | null),slug?: (SortEnumType | null),title?: (SortEnumType | null),regionCode?: (SortEnumType | null),locale?: (SortEnumType | null),year?: (SortEnumType | null),upc?: (SortEnumType | null),isbn?: (SortEnumType | null),asin?: (SortEnumType | null),imageUrl?: (SortEnumType | null),backImageUrl?: (SortEnumType | null),releaseDate?: (SortEnumType | null),dateAdded?: (SortEnumType | null),fullTitle?: (SortEnumType | null),type?: (SortEnumType | null),mediaItem?: (MediaItemSortInput | null),boxset?: (BoxsetSortInput | null)}


/** Information about pagination in a connection. */
export interface PageInfoGenqlSelection{
    /** Indicates whether more edges exist following the set defined by the clients arguments. */
    hasNextPage?: boolean | number
    /** Indicates whether more edges exist prior the set defined by the clients arguments. */
    hasPreviousPage?: boolean | number
    /** When paginating backwards, the cursor to continue. */
    startCursor?: boolean | number
    /** When paginating forwards, the cursor to continue. */
    endCursor?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An edge in a connection. */
export interface MediaItemsEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: MediaItemGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An edge in a connection. */
export interface BoxsetsEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: BoxsetGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}


/** An edge in a connection. */
export interface MediaItemsByGroupEdgeGenqlSelection{
    /** A cursor for use in pagination. */
    cursor?: boolean | number
    /** The item at the end of the edge. */
    node?: MediaItemGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MediaItemGroupFilterInput {and?: (MediaItemGroupFilterInput[] | null),or?: (MediaItemGroupFilterInput[] | null),id?: (IntOperationFilterInput | null),mediaItemId?: (IntOperationFilterInput | null),groupId?: (IntOperationFilterInput | null),role?: (StringOperationFilterInput | null),isFeatured?: (BooleanOperationFilterInput | null),mediaItem?: (MediaItemFilterInput | null),group?: (GroupFilterInput | null)}

export interface ListFilterInputTypeOfDiscFilterInput {all?: (DiscFilterInput | null),none?: (DiscFilterInput | null),some?: (DiscFilterInput | null),any?: (Scalars['Boolean'] | null)}

export interface ListFilterInputTypeOfReleaseGroupFilterInput {all?: (ReleaseGroupFilterInput | null),none?: (ReleaseGroupFilterInput | null),some?: (ReleaseGroupFilterInput | null),any?: (Scalars['Boolean'] | null)}

export interface ListFilterInputTypeOfContributorFilterInput {all?: (ContributorFilterInput | null),none?: (ContributorFilterInput | null),some?: (ContributorFilterInput | null),any?: (Scalars['Boolean'] | null)}

export interface BooleanOperationFilterInput {eq?: (Scalars['Boolean'] | null),neq?: (Scalars['Boolean'] | null)}

export interface GroupFilterInput {and?: (GroupFilterInput[] | null),or?: (GroupFilterInput[] | null),id?: (IntOperationFilterInput | null),imdbId?: (StringOperationFilterInput | null),name?: (StringOperationFilterInput | null),slug?: (StringOperationFilterInput | null),imageUrl?: (StringOperationFilterInput | null),mediaItemGroups?: (ListFilterInputTypeOfMediaItemGroupFilterInput | null),releaseGroups?: (ListFilterInputTypeOfReleaseGroupFilterInput | null)}

export interface DiscFilterInput {and?: (DiscFilterInput[] | null),or?: (DiscFilterInput[] | null),id?: (IntOperationFilterInput | null),index?: (IntOperationFilterInput | null),slug?: (StringOperationFilterInput | null),name?: (StringOperationFilterInput | null),format?: (StringOperationFilterInput | null),contentHash?: (StringOperationFilterInput | null),titles?: (ListFilterInputTypeOfTitleFilterInput | null),release?: (ReleaseFilterInput | null)}

export interface ReleaseGroupFilterInput {and?: (ReleaseGroupFilterInput[] | null),or?: (ReleaseGroupFilterInput[] | null),id?: (IntOperationFilterInput | null),releaseId?: (IntOperationFilterInput | null),groupId?: (IntOperationFilterInput | null),release?: (ReleaseFilterInput | null),group?: (GroupFilterInput | null)}

export interface ContributorFilterInput {and?: (ContributorFilterInput[] | null),or?: (ContributorFilterInput[] | null),id?: (IntOperationFilterInput | null),name?: (StringOperationFilterInput | null),releases?: (ListFilterInputTypeOfReleaseFilterInput | null),userId?: (StringOperationFilterInput | null),source?: (StringOperationFilterInput | null)}

export interface ListFilterInputTypeOfTitleFilterInput {all?: (TitleFilterInput | null),none?: (TitleFilterInput | null),some?: (TitleFilterInput | null),any?: (Scalars['Boolean'] | null)}

export interface TitleFilterInput {and?: (TitleFilterInput[] | null),or?: (TitleFilterInput[] | null),index?: (IntOperationFilterInput | null),disc?: (DiscFilterInput | null),id?: (IntOperationFilterInput | null),comment?: (StringOperationFilterInput | null),sourceFile?: (StringOperationFilterInput | null),segmentMap?: (StringOperationFilterInput | null),duration?: (StringOperationFilterInput | null),size?: (LongOperationFilterInput | null),displaySize?: (StringOperationFilterInput | null),item?: (DiscItemReferenceFilterInput | null),discItemReferenceId?: (IntOperationFilterInput | null),tracks?: (ListFilterInputTypeOfTrackFilterInput | null),description?: (StringOperationFilterInput | null),itemType?: (StringOperationFilterInput | null),season?: (StringOperationFilterInput | null),episode?: (StringOperationFilterInput | null),hasItem?: (BooleanOperationFilterInput | null)}

export interface LongOperationFilterInput {eq?: (Scalars['Long'] | null),neq?: (Scalars['Long'] | null),in?: ((Scalars['Long'] | null)[] | null),nin?: ((Scalars['Long'] | null)[] | null),gt?: (Scalars['Long'] | null),ngt?: (Scalars['Long'] | null),gte?: (Scalars['Long'] | null),ngte?: (Scalars['Long'] | null),lt?: (Scalars['Long'] | null),nlt?: (Scalars['Long'] | null),lte?: (Scalars['Long'] | null),nlte?: (Scalars['Long'] | null)}

export interface DiscItemReferenceFilterInput {and?: (DiscItemReferenceFilterInput[] | null),or?: (DiscItemReferenceFilterInput[] | null),id?: (IntOperationFilterInput | null),title?: (StringOperationFilterInput | null),type?: (StringOperationFilterInput | null),description?: (StringOperationFilterInput | null),chapters?: (ListFilterInputTypeOfChapterFilterInput | null),season?: (StringOperationFilterInput | null),episode?: (StringOperationFilterInput | null),discItem?: (TitleFilterInput | null)}

export interface ListFilterInputTypeOfTrackFilterInput {all?: (TrackFilterInput | null),none?: (TrackFilterInput | null),some?: (TrackFilterInput | null),any?: (Scalars['Boolean'] | null)}

export interface ListFilterInputTypeOfChapterFilterInput {all?: (ChapterFilterInput | null),none?: (ChapterFilterInput | null),some?: (ChapterFilterInput | null),any?: (Scalars['Boolean'] | null)}

export interface TrackFilterInput {and?: (TrackFilterInput[] | null),or?: (TrackFilterInput[] | null),id?: (IntOperationFilterInput | null),index?: (IntOperationFilterInput | null),name?: (StringOperationFilterInput | null),type?: (StringOperationFilterInput | null),resolution?: (StringOperationFilterInput | null),aspectRatio?: (StringOperationFilterInput | null),audioType?: (StringOperationFilterInput | null),languageCode?: (StringOperationFilterInput | null),language?: (StringOperationFilterInput | null),description?: (StringOperationFilterInput | null),title?: (TitleFilterInput | null)}

export interface ChapterFilterInput {and?: (ChapterFilterInput[] | null),or?: (ChapterFilterInput[] | null),id?: (IntOperationFilterInput | null),index?: (IntOperationFilterInput | null),title?: (StringOperationFilterInput | null)}

export interface BoxsetGenqlSelection{
    id?: boolean | number
    title?: boolean | number
    sortTitle?: boolean | number
    slug?: boolean | number
    imageUrl?: boolean | number
    release?: ReleaseGenqlSelection
    releaseId?: boolean | number
    type?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MediaItemGenqlSelection{
    id?: boolean | number
    title?: boolean | number
    slug?: boolean | number
    fullTitle?: boolean | number
    sortTitle?: boolean | number
    year?: boolean | number
    type?: boolean | number
    imageUrl?: boolean | number
    externalids?: ExternalIdsGenqlSelection
    externalIdsId?: boolean | number
    releases?: (ReleaseGenqlSelection & { __args?: {where?: (ReleaseFilterInput | null), order?: (ReleaseSortInput[] | null)} })
    mediaItemGroups?: (MediaItemGroupGenqlSelection & { __args?: {where?: (MediaItemGroupFilterInput | null), order?: (MediaItemGroupSortInput[] | null)} })
    plot?: boolean | number
    tagline?: boolean | number
    directors?: boolean | number
    writers?: boolean | number
    stars?: boolean | number
    genres?: boolean | number
    runtimeMinutes?: boolean | number
    runtime?: boolean | number
    contentRating?: boolean | number
    releaseDate?: boolean | number
    latestReleaseDate?: boolean | number
    dateAdded?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MediaItemGroupSortInput {id?: (SortEnumType | null),mediaItemId?: (SortEnumType | null),groupId?: (SortEnumType | null),role?: (SortEnumType | null),isFeatured?: (SortEnumType | null),mediaItem?: (MediaItemSortInput | null),group?: (GroupSortInput | null)}

export interface GroupSortInput {id?: (SortEnumType | null),imdbId?: (SortEnumType | null),name?: (SortEnumType | null),slug?: (SortEnumType | null),imageUrl?: (SortEnumType | null)}

export interface ExternalIdsGenqlSelection{
    id?: boolean | number
    tmdb?: boolean | number
    imdb?: boolean | number
    tvdb?: boolean | number
    mediaItem?: MediaItemGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReleaseGenqlSelection{
    id?: boolean | number
    slug?: boolean | number
    title?: boolean | number
    regionCode?: boolean | number
    locale?: boolean | number
    year?: boolean | number
    upc?: boolean | number
    isbn?: boolean | number
    asin?: boolean | number
    imageUrl?: boolean | number
    backImageUrl?: boolean | number
    releaseDate?: boolean | number
    dateAdded?: boolean | number
    fullTitle?: boolean | number
    type?: boolean | number
    discs?: (DiscGenqlSelection & { __args?: {where?: (DiscFilterInput | null), order?: (DiscSortInput[] | null)} })
    releaseGroups?: (ReleaseGroupGenqlSelection & { __args?: {where?: (ReleaseGroupFilterInput | null), order?: (ReleaseGroupSortInput[] | null)} })
    mediaItem?: MediaItemGenqlSelection
    boxset?: BoxsetGenqlSelection
    contributors?: ContributorGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface MediaItemGroupGenqlSelection{
    id?: boolean | number
    mediaItemId?: boolean | number
    groupId?: boolean | number
    role?: boolean | number
    isFeatured?: boolean | number
    mediaItem?: (MediaItemGenqlSelection & { __args?: {where?: (MediaItemFilterInput | null), order?: (MediaItemSortInput[] | null)} })
    group?: (GroupGenqlSelection & { __args?: {where?: (GroupFilterInput | null), order?: (GroupSortInput[] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscSortInput {id?: (SortEnumType | null),index?: (SortEnumType | null),slug?: (SortEnumType | null),name?: (SortEnumType | null),format?: (SortEnumType | null),contentHash?: (SortEnumType | null),release?: (ReleaseSortInput | null)}

export interface ReleaseGroupSortInput {id?: (SortEnumType | null),releaseId?: (SortEnumType | null),groupId?: (SortEnumType | null),release?: (ReleaseSortInput | null),group?: (GroupSortInput | null)}

export interface ContributorGenqlSelection{
    id?: boolean | number
    name?: boolean | number
    releases?: ReleaseGenqlSelection
    userId?: boolean | number
    source?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ReleaseGroupGenqlSelection{
    id?: boolean | number
    releaseId?: boolean | number
    groupId?: boolean | number
    release?: (ReleaseGenqlSelection & { __args?: {where?: (ReleaseFilterInput | null), order?: (ReleaseSortInput[] | null)} })
    group?: (GroupGenqlSelection & { __args?: {where?: (GroupFilterInput | null), order?: (GroupSortInput[] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscGenqlSelection{
    id?: boolean | number
    index?: boolean | number
    slug?: boolean | number
    name?: boolean | number
    format?: boolean | number
    contentHash?: boolean | number
    titles?: (TitleGenqlSelection & { __args?: {where?: (TitleFilterInput | null), order?: (TitleSortInput[] | null)} })
    release?: ReleaseGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface GroupGenqlSelection{
    id?: boolean | number
    imdbId?: boolean | number
    name?: boolean | number
    slug?: boolean | number
    imageUrl?: boolean | number
    mediaItemGroups?: (MediaItemGroupGenqlSelection & { __args?: {where?: (MediaItemGroupFilterInput | null), order?: (MediaItemGroupSortInput[] | null)} })
    releaseGroups?: (ReleaseGroupGenqlSelection & { __args?: {where?: (ReleaseGroupFilterInput | null), order?: (ReleaseGroupSortInput[] | null)} })
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TitleSortInput {index?: (SortEnumType | null),disc?: (DiscSortInput | null),id?: (SortEnumType | null),comment?: (SortEnumType | null),sourceFile?: (SortEnumType | null),segmentMap?: (SortEnumType | null),duration?: (SortEnumType | null),size?: (SortEnumType | null),displaySize?: (SortEnumType | null),item?: (DiscItemReferenceSortInput | null),discItemReferenceId?: (SortEnumType | null),description?: (SortEnumType | null),itemType?: (SortEnumType | null),season?: (SortEnumType | null),episode?: (SortEnumType | null),hasItem?: (SortEnumType | null)}

export interface DiscItemReferenceSortInput {id?: (SortEnumType | null),title?: (SortEnumType | null),type?: (SortEnumType | null),description?: (SortEnumType | null),season?: (SortEnumType | null),episode?: (SortEnumType | null),discItem?: (TitleSortInput | null)}

export interface TitleGenqlSelection{
    index?: boolean | number
    disc?: DiscGenqlSelection
    id?: boolean | number
    comment?: boolean | number
    sourceFile?: boolean | number
    segmentMap?: boolean | number
    duration?: boolean | number
    size?: boolean | number
    displaySize?: boolean | number
    item?: DiscItemReferenceGenqlSelection
    discItemReferenceId?: boolean | number
    tracks?: (TrackGenqlSelection & { __args?: {where?: (TrackFilterInput | null), order?: (TrackSortInput[] | null)} })
    description?: boolean | number
    itemType?: boolean | number
    season?: boolean | number
    episode?: boolean | number
    hasItem?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface TrackSortInput {id?: (SortEnumType | null),index?: (SortEnumType | null),name?: (SortEnumType | null),type?: (SortEnumType | null),resolution?: (SortEnumType | null),aspectRatio?: (SortEnumType | null),audioType?: (SortEnumType | null),languageCode?: (SortEnumType | null),language?: (SortEnumType | null),description?: (SortEnumType | null),title?: (TitleSortInput | null)}

export interface TrackGenqlSelection{
    id?: boolean | number
    index?: boolean | number
    name?: boolean | number
    type?: boolean | number
    resolution?: boolean | number
    aspectRatio?: boolean | number
    audioType?: boolean | number
    languageCode?: boolean | number
    language?: boolean | number
    description?: boolean | number
    title?: TitleGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface DiscItemReferenceGenqlSelection{
    id?: boolean | number
    title?: boolean | number
    type?: boolean | number
    description?: boolean | number
    chapters?: (ChapterGenqlSelection & { __args?: {where?: (ChapterFilterInput | null), order?: (ChapterSortInput[] | null)} })
    season?: boolean | number
    episode?: boolean | number
    discItem?: TitleGenqlSelection
    __typename?: boolean | number
    __scalar?: boolean | number
}

export interface ChapterSortInput {id?: (SortEnumType | null),index?: (SortEnumType | null),title?: (SortEnumType | null)}

export interface ChapterGenqlSelection{
    id?: boolean | number
    index?: boolean | number
    title?: boolean | number
    __typename?: boolean | number
    __scalar?: boolean | number
}


    const Query_possibleTypes: string[] = ['Query']
    export const isQuery = (obj?: { __typename?: any } | null): obj is Query => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isQuery"')
      return Query_possibleTypes.includes(obj.__typename)
    }
    


    const MediaItemsConnection_possibleTypes: string[] = ['MediaItemsConnection']
    export const isMediaItemsConnection = (obj?: { __typename?: any } | null): obj is MediaItemsConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMediaItemsConnection"')
      return MediaItemsConnection_possibleTypes.includes(obj.__typename)
    }
    


    const BoxsetsConnection_possibleTypes: string[] = ['BoxsetsConnection']
    export const isBoxsetsConnection = (obj?: { __typename?: any } | null): obj is BoxsetsConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBoxsetsConnection"')
      return BoxsetsConnection_possibleTypes.includes(obj.__typename)
    }
    


    const MediaItemsByGroupConnection_possibleTypes: string[] = ['MediaItemsByGroupConnection']
    export const isMediaItemsByGroupConnection = (obj?: { __typename?: any } | null): obj is MediaItemsByGroupConnection => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMediaItemsByGroupConnection"')
      return MediaItemsByGroupConnection_possibleTypes.includes(obj.__typename)
    }
    


    const PageInfo_possibleTypes: string[] = ['PageInfo']
    export const isPageInfo = (obj?: { __typename?: any } | null): obj is PageInfo => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isPageInfo"')
      return PageInfo_possibleTypes.includes(obj.__typename)
    }
    


    const MediaItemsEdge_possibleTypes: string[] = ['MediaItemsEdge']
    export const isMediaItemsEdge = (obj?: { __typename?: any } | null): obj is MediaItemsEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMediaItemsEdge"')
      return MediaItemsEdge_possibleTypes.includes(obj.__typename)
    }
    


    const BoxsetsEdge_possibleTypes: string[] = ['BoxsetsEdge']
    export const isBoxsetsEdge = (obj?: { __typename?: any } | null): obj is BoxsetsEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBoxsetsEdge"')
      return BoxsetsEdge_possibleTypes.includes(obj.__typename)
    }
    


    const MediaItemsByGroupEdge_possibleTypes: string[] = ['MediaItemsByGroupEdge']
    export const isMediaItemsByGroupEdge = (obj?: { __typename?: any } | null): obj is MediaItemsByGroupEdge => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMediaItemsByGroupEdge"')
      return MediaItemsByGroupEdge_possibleTypes.includes(obj.__typename)
    }
    


    const Boxset_possibleTypes: string[] = ['Boxset']
    export const isBoxset = (obj?: { __typename?: any } | null): obj is Boxset => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isBoxset"')
      return Boxset_possibleTypes.includes(obj.__typename)
    }
    


    const MediaItem_possibleTypes: string[] = ['MediaItem']
    export const isMediaItem = (obj?: { __typename?: any } | null): obj is MediaItem => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMediaItem"')
      return MediaItem_possibleTypes.includes(obj.__typename)
    }
    


    const ExternalIds_possibleTypes: string[] = ['ExternalIds']
    export const isExternalIds = (obj?: { __typename?: any } | null): obj is ExternalIds => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isExternalIds"')
      return ExternalIds_possibleTypes.includes(obj.__typename)
    }
    


    const Release_possibleTypes: string[] = ['Release']
    export const isRelease = (obj?: { __typename?: any } | null): obj is Release => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isRelease"')
      return Release_possibleTypes.includes(obj.__typename)
    }
    


    const MediaItemGroup_possibleTypes: string[] = ['MediaItemGroup']
    export const isMediaItemGroup = (obj?: { __typename?: any } | null): obj is MediaItemGroup => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isMediaItemGroup"')
      return MediaItemGroup_possibleTypes.includes(obj.__typename)
    }
    


    const Contributor_possibleTypes: string[] = ['Contributor']
    export const isContributor = (obj?: { __typename?: any } | null): obj is Contributor => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isContributor"')
      return Contributor_possibleTypes.includes(obj.__typename)
    }
    


    const ReleaseGroup_possibleTypes: string[] = ['ReleaseGroup']
    export const isReleaseGroup = (obj?: { __typename?: any } | null): obj is ReleaseGroup => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isReleaseGroup"')
      return ReleaseGroup_possibleTypes.includes(obj.__typename)
    }
    


    const Disc_possibleTypes: string[] = ['Disc']
    export const isDisc = (obj?: { __typename?: any } | null): obj is Disc => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDisc"')
      return Disc_possibleTypes.includes(obj.__typename)
    }
    


    const Group_possibleTypes: string[] = ['Group']
    export const isGroup = (obj?: { __typename?: any } | null): obj is Group => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isGroup"')
      return Group_possibleTypes.includes(obj.__typename)
    }
    


    const Title_possibleTypes: string[] = ['Title']
    export const isTitle = (obj?: { __typename?: any } | null): obj is Title => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTitle"')
      return Title_possibleTypes.includes(obj.__typename)
    }
    


    const Track_possibleTypes: string[] = ['Track']
    export const isTrack = (obj?: { __typename?: any } | null): obj is Track => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isTrack"')
      return Track_possibleTypes.includes(obj.__typename)
    }
    


    const DiscItemReference_possibleTypes: string[] = ['DiscItemReference']
    export const isDiscItemReference = (obj?: { __typename?: any } | null): obj is DiscItemReference => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isDiscItemReference"')
      return DiscItemReference_possibleTypes.includes(obj.__typename)
    }
    


    const Chapter_possibleTypes: string[] = ['Chapter']
    export const isChapter = (obj?: { __typename?: any } | null): obj is Chapter => {
      if (!obj?.__typename) throw new Error('__typename is missing in "isChapter"')
      return Chapter_possibleTypes.includes(obj.__typename)
    }
    

export const enumSortEnumType = {
   ASC: 'ASC' as const,
   DESC: 'DESC' as const
}
