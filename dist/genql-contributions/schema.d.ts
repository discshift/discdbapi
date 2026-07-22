export type Scalars = {
    String: string;
    Int: number;
    Boolean: boolean;
    Float: number;
    DateTime: any;
    EncodedId: any;
    EncodedIdFilter: any;
    Long: any;
    TimeSpan: any;
    UUID: any;
};
export type Error = (ApiKeyNotFoundError | AuthenticationError | BoxsetNotFoundError | ContributionAlreadyInBoxsetError | ContributionNotFoundError | CouldNotParseLogsError | DiscItemNotFoundError | DiscNotFoundError | ExistingDiscAlreadyInBoxsetError | ExternalDataNotFoundError | ExternalDataSerializationError | FieldRequiredError | InvalidBoxsetStatusError | InvalidContributionStatusError | InvalidDiscPathError | InvalidIdError | InvalidOwnershipError | LogsNotFoundError | MismatchedReleaseSlugError) & {
    __isUnion?: true;
};
export interface AddAudioTrackToItemPayload {
    userContributionAudioTrack: (UserContributionAudioTrack | null);
    errors: (AddAudioTrackToItemError[] | null);
    __typename: 'AddAudioTrackToItemPayload';
}
export interface AddChapterToItemPayload {
    userContributionChapter: (UserContributionChapter | null);
    errors: (AddChapterToItemError[] | null);
    __typename: 'AddChapterToItemPayload';
}
export interface AddDiscToBoxsetPayload {
    userContributionBoxset: (UserContributionBoxset | null);
    errors: (AddDiscToBoxsetError[] | null);
    __typename: 'AddDiscToBoxsetPayload';
}
export interface AddExistingDiscToBoxsetPayload {
    userContributionBoxset: (UserContributionBoxset | null);
    errors: (AddExistingDiscToBoxsetError[] | null);
    __typename: 'AddExistingDiscToBoxsetPayload';
}
export interface AddItemToDiscPayload {
    userContributionDiscItem: (UserContributionDiscItem | null);
    errors: (AddItemToDiscError[] | null);
    __typename: 'AddItemToDiscPayload';
}
export interface AddSubtitleTrackToItemPayload {
    userContributionSubtitleTrack: (UserContributionSubtitleTrack | null);
    errors: (AddSubtitleTrackToItemError[] | null);
    __typename: 'AddSubtitleTrackToItemPayload';
}
export interface AmazonProductMetadata {
    asin: (Scalars['String'] | null);
    title: (Scalars['String'] | null);
    upc: (Scalars['String'] | null);
    frontImageUrl: (Scalars['String'] | null);
    backImageUrl: (Scalars['String'] | null);
    releaseDate: (Scalars['DateTime'] | null);
    numberOfDiscs: (Scalars['Int'] | null);
    aspectRatio: (Scalars['String'] | null);
    isDiscontinued: (Scalars['Boolean'] | null);
    mpaaRating: (Scalars['String'] | null);
    modelNumber: (Scalars['String'] | null);
    director: (Scalars['String'] | null);
    mediaFormat: (Scalars['String'] | null);
    actors: (Scalars['String'] | null);
    producers: (Scalars['String'] | null);
    language: (Scalars['String'] | null);
    dubbed: (Scalars['String'] | null);
    subtitles: (Scalars['String'] | null);
    studio: (Scalars['String'] | null);
    __typename: 'AmazonProductMetadata';
}
export interface ApiKeyInfo {
    name: Scalars['String'];
    keyPrefix: Scalars['String'];
    isActive: Scalars['Boolean'];
    logUsage: Scalars['Boolean'];
    roles: (Scalars['String'] | null);
    ownerEmail: Scalars['String'];
    createdAt: Scalars['DateTime'];
    expiresAt: (Scalars['DateTime'] | null);
    lastUsedAt: (Scalars['DateTime'] | null);
    __typename: 'ApiKeyInfo';
}
export interface ApiKeyNotFoundError {
    message: Scalars['String'];
    __typename: 'ApiKeyNotFoundError';
}
export interface ApiKeyUsageLogInfo {
    apiKeyPrefix: Scalars['String'];
    apiKeyName: Scalars['String'];
    timestamp: Scalars['DateTime'];
    operationName: (Scalars['String'] | null);
    fieldCost: Scalars['Float'];
    typeCost: Scalars['Float'];
    durationMs: Scalars['Int'];
    __typename: 'ApiKeyUsageLogInfo';
}
/** A connection to a list of items. */
export interface ApiKeyUsageLogsConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (ApiKeyUsageLogsEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (ApiKeyUsageLogInfo[] | null);
    __typename: 'ApiKeyUsageLogsConnection';
}
/** An edge in a connection. */
export interface ApiKeyUsageLogsEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: ApiKeyUsageLogInfo;
    __typename: 'ApiKeyUsageLogsEdge';
}
/** A connection to a list of items. */
export interface ApiKeysConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (ApiKeysEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (ApiKeyInfo[] | null);
    __typename: 'ApiKeysConnection';
}
/** An edge in a connection. */
export interface ApiKeysEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: ApiKeyInfo;
    __typename: 'ApiKeysEdge';
}
export interface AttachDiscIdResult {
    outcome: AttachDiscIdOutcome;
    contentHash: Scalars['String'];
    mediaItemSlug: (Scalars['String'] | null);
    boxsetSlug: (Scalars['String'] | null);
    mediaItemType: (Scalars['String'] | null);
    releaseSlug: (Scalars['String'] | null);
    discSlug: (Scalars['String'] | null);
    discIndex: (Scalars['Int'] | null);
    globalDiscId: (Scalars['String'] | null);
    existingGlobalDiscId: (Scalars['String'] | null);
    matchedDifferentDisc: Scalars['Boolean'];
    __typename: 'AttachDiscIdResult';
}
export interface AttachGlobalDiscIdPayload {
    attachDiscIdResult: (AttachDiscIdResult | null);
    errors: (AttachGlobalDiscIdError[] | null);
    __typename: 'AttachGlobalDiscIdPayload';
}
export interface AuthenticationError {
    message: Scalars['String'];
    __typename: 'AuthenticationError';
}
/** A connection to a list of items. */
export interface BoxsetChatConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (BoxsetChatEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (UserMessage[] | null);
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int'];
    __typename: 'BoxsetChatConnection';
}
/** An edge in a connection. */
export interface BoxsetChatEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: UserMessage;
    __typename: 'BoxsetChatEdge';
}
/** A connection to a list of items. */
export interface BoxsetContributionsConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (BoxsetContributionsEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (UserContributionBoxset[] | null);
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int'];
    __typename: 'BoxsetContributionsConnection';
}
/** An edge in a connection. */
export interface BoxsetContributionsEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: UserContributionBoxset;
    __typename: 'BoxsetContributionsEdge';
}
export interface BoxsetNotFoundError {
    message: Scalars['String'];
    __typename: 'BoxsetNotFoundError';
}
export interface ContributionAlreadyInBoxsetError {
    message: Scalars['String'];
    __typename: 'ContributionAlreadyInBoxsetError';
}
/** A connection to a list of items. */
export interface ContributionChatConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (ContributionChatEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (UserMessage[] | null);
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int'];
    __typename: 'ContributionChatConnection';
}
/** An edge in a connection. */
export interface ContributionChatEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: UserMessage;
    __typename: 'ContributionChatEdge';
}
export interface ContributionHistory {
    id: Scalars['Int'];
    contributionId: Scalars['Int'];
    timeStamp: Scalars['DateTime'];
    description: Scalars['String'];
    userId: Scalars['String'];
    type: ContributionHistoryType;
    __typename: 'ContributionHistory';
}
/** A connection to a list of items. */
export interface ContributionHistoryConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (ContributionHistoryEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (ContributionHistory[] | null);
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int'];
    __typename: 'ContributionHistoryConnection';
}
/** An edge in a connection. */
export interface ContributionHistoryEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: ContributionHistory;
    __typename: 'ContributionHistoryEdge';
}
export interface ContributionMutations {
    addAudioTrackToItem: AddAudioTrackToItemPayload;
    addChapterToItem: AddChapterToItemPayload;
    addDiscToBoxset: AddDiscToBoxsetPayload;
    addExistingDiscToBoxset: AddExistingDiscToBoxsetPayload;
    addItemToDisc: AddItemToDiscPayload;
    addSubtitleTrackToItem: AddSubtitleTrackToItemPayload;
    attachGlobalDiscId: AttachGlobalDiscIdPayload;
    createBoxset: CreateBoxsetPayload;
    createContribution: CreateContributionPayload;
    createDisc: CreateDiscPayload;
    deleteBoxset: DeleteBoxsetPayload;
    deleteContribution: DeleteContributionPayload;
    deleteDiscFromContribution: DeleteDiscFromContributionPayload;
    deleteItemFromDisc: DeleteItemFromDiscPayload;
    editItemOnDisc: EditItemOnDiscPayload;
    setFileNameTemplate: SetFileNameTemplatePayload;
    deleteFileNameTemplate: DeleteFileNameTemplatePayload;
    generateApiKey: GenerateApiKeyPayload;
    discLogs: DiscLogsPayload;
    discUploadStatus: DiscUploadStatusPayload;
    episodeNames: EpisodeNamesPayload;
    externalData: ExternalDataPayload;
    externalDataForContribution: ExternalDataForContributionPayload;
    hashDisc: HashDiscPayload;
    markMessagesAsRead: MarkMessagesAsReadPayload;
    markBoxsetMessagesAsRead: MarkBoxsetMessagesAsReadPayload;
    removeBoxsetMember: RemoveBoxsetMemberPayload;
    removeDiscFromBoxset: RemoveDiscFromBoxsetPayload;
    reorderBoxsetMembers: ReorderBoxsetMembersPayload;
    reorderDiscs: ReorderDiscsPayload;
    revokeApiKey: RevokeApiKeyPayload;
    sendAdminMessage: SendAdminMessagePayload;
    sendUserMessage: SendUserMessagePayload;
    sendAdminBoxsetMessage: SendAdminBoxsetMessagePayload;
    sendBoxsetUserMessage: SendBoxsetUserMessagePayload;
    updateBoxset: UpdateBoxsetPayload;
    updateContribution: UpdateContributionPayload;
    updateDisc: UpdateDiscPayload;
    __typename: 'ContributionMutations';
}
export interface ContributionNotFoundError {
    message: Scalars['String'];
    __typename: 'ContributionNotFoundError';
}
export interface ContributionQuery {
    contributions: (ContributionsConnection | null);
    myContributions: (MyContributionsConnection | null);
    contributionHistory: (ContributionHistoryConnection | null);
    contributionChat: (ContributionChatConnection | null);
    boxsetChat: (BoxsetChatConnection | null);
    hasUnreadMessages: Scalars['Boolean'];
    myMessages: (MyMessagesConnection | null);
    messageThreads: MessageThread[];
    boxsetContributions: (BoxsetContributionsConnection | null);
    myBoxsets: (MyBoxsetsConnection | null);
    amazonProductMetadata: (AmazonProductMetadata | null);
    apiKeys: (ApiKeysConnection | null);
    apiKeyUsageLogs: (ApiKeyUsageLogsConnection | null);
    myFileNameTemplates: UserFileNameTemplate[];
    __typename: 'ContributionQuery';
}
/** A connection to a list of items. */
export interface ContributionsConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (ContributionsEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (UserContribution[] | null);
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int'];
    __typename: 'ContributionsConnection';
}
/** An edge in a connection. */
export interface ContributionsEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: UserContribution;
    __typename: 'ContributionsEdge';
}
export interface CouldNotParseLogsError {
    message: Scalars['String'];
    __typename: 'CouldNotParseLogsError';
}
export interface CreateBoxsetPayload {
    userContributionBoxset: (UserContributionBoxset | null);
    errors: (CreateBoxsetError[] | null);
    __typename: 'CreateBoxsetPayload';
}
export interface CreateContributionPayload {
    userContribution: (UserContribution | null);
    errors: (CreateContributionError[] | null);
    __typename: 'CreateContributionPayload';
}
export interface CreateDiscPayload {
    userContributionDisc: (UserContributionDisc | null);
    errors: (CreateDiscError[] | null);
    __typename: 'CreateDiscPayload';
}
export interface DeleteBoxsetPayload {
    userContributionBoxset: (UserContributionBoxset | null);
    errors: (DeleteBoxsetError[] | null);
    __typename: 'DeleteBoxsetPayload';
}
export interface DeleteContributionPayload {
    userContribution: (UserContribution | null);
    errors: (DeleteContributionError[] | null);
    __typename: 'DeleteContributionPayload';
}
export interface DeleteDiscFromContributionPayload {
    userContributionDisc: (UserContributionDisc | null);
    errors: (DeleteDiscFromContributionError[] | null);
    __typename: 'DeleteDiscFromContributionPayload';
}
export interface DeleteFileNameTemplatePayload {
    boolean: (Scalars['Boolean'] | null);
    errors: (DeleteFileNameTemplateError[] | null);
    __typename: 'DeleteFileNameTemplatePayload';
}
export interface DeleteItemFromDiscPayload {
    userContributionDiscItem: (UserContributionDiscItem | null);
    errors: (DeleteItemFromDiscError[] | null);
    __typename: 'DeleteItemFromDiscPayload';
}
export interface DiscHash {
    hash: Scalars['String'];
    __typename: 'DiscHash';
}
export interface DiscInfo {
    name: (Scalars['String'] | null);
    type: (Scalars['String'] | null);
    languageCode: (Scalars['String'] | null);
    language: (Scalars['String'] | null);
    titles: Title[];
    hashInfo: HashInfoLogLine[];
    __typename: 'DiscInfo';
}
export interface DiscItemNotFoundError {
    message: Scalars['String'];
    __typename: 'DiscItemNotFoundError';
}
export interface DiscLogs {
    info: (DiscInfo | null);
    disc: (UserContributionDisc | null);
    contribution: (UserContribution | null);
    __typename: 'DiscLogs';
}
export interface DiscLogsPayload {
    discLogs: (DiscLogs | null);
    errors: (DiscLogsError[] | null);
    __typename: 'DiscLogsPayload';
}
export interface DiscNotFoundError {
    message: Scalars['String'];
    __typename: 'DiscNotFoundError';
}
export interface DiscUploadStatus {
    logsUploaded: Scalars['Boolean'];
    logUploadError: (Scalars['String'] | null);
    __typename: 'DiscUploadStatus';
}
export interface DiscUploadStatusPayload {
    discUploadStatus: (DiscUploadStatus | null);
    errors: (DiscUploadStatusError[] | null);
    __typename: 'DiscUploadStatusPayload';
}
export interface EditItemOnDiscPayload {
    userContributionDiscItem: (UserContributionDiscItem | null);
    errors: (EditItemOnDiscError[] | null);
    __typename: 'EditItemOnDiscPayload';
}
export interface EpisodeNamesPayload {
    seriesEpisodeNames: (SeriesEpisodeNames | null);
    errors: (EpisodeNamesError[] | null);
    __typename: 'EpisodeNamesPayload';
}
export interface ExistingDiscAlreadyInBoxsetError {
    message: Scalars['String'];
    __typename: 'ExistingDiscAlreadyInBoxsetError';
}
export interface ExternalDataForContributionPayload {
    externalMetadata: (ExternalMetadata | null);
    errors: (ExternalDataForContributionError[] | null);
    __typename: 'ExternalDataForContributionPayload';
}
export interface ExternalDataNotFoundError {
    message: Scalars['String'];
    __typename: 'ExternalDataNotFoundError';
}
export interface ExternalDataPayload {
    externalMetadata: (ExternalMetadata | null);
    errors: (ExternalDataError[] | null);
    __typename: 'ExternalDataPayload';
}
export interface ExternalDataSerializationError {
    message: Scalars['String'];
    __typename: 'ExternalDataSerializationError';
}
export interface ExternalMetadata {
    id: Scalars['Int'];
    title: Scalars['String'];
    year: Scalars['Int'];
    imageUrl: Scalars['String'];
    __typename: 'ExternalMetadata';
}
export interface FieldRequiredError {
    message: Scalars['String'];
    __typename: 'FieldRequiredError';
}
export interface GenerateApiKeyPayload {
    key: Scalars['String'];
    keyPrefix: Scalars['String'];
    name: Scalars['String'];
    ownerEmail: Scalars['String'];
    __typename: 'GenerateApiKeyPayload';
}
export interface HashDiscPayload {
    discHash: (DiscHash | null);
    errors: (HashDiscError[] | null);
    __typename: 'HashDiscPayload';
}
export interface HashInfoLogLine {
    matches: Scalars['Boolean'];
    index: Scalars['Int'];
    name: (Scalars['String'] | null);
    creationTime: Scalars['DateTime'];
    size: Scalars['Long'];
    originalLine: (Scalars['String'] | null);
    prefix: (Scalars['String'] | null);
    __typename: 'HashInfoLogLine';
}
export interface InvalidBoxsetStatusError {
    message: Scalars['String'];
    __typename: 'InvalidBoxsetStatusError';
}
export interface InvalidContributionStatusError {
    message: Scalars['String'];
    __typename: 'InvalidContributionStatusError';
}
export interface InvalidDiscPathError {
    message: Scalars['String'];
    __typename: 'InvalidDiscPathError';
}
export interface InvalidIdError {
    message: Scalars['String'];
    __typename: 'InvalidIdError';
}
export interface InvalidOwnershipError {
    message: Scalars['String'];
    __typename: 'InvalidOwnershipError';
}
export interface LogsNotFoundError {
    message: Scalars['String'];
    __typename: 'LogsNotFoundError';
}
export interface MarkBoxsetMessagesAsReadPayload {
    boolean: (Scalars['Boolean'] | null);
    errors: (MarkBoxsetMessagesAsReadError[] | null);
    __typename: 'MarkBoxsetMessagesAsReadPayload';
}
export interface MarkMessagesAsReadPayload {
    boolean: (Scalars['Boolean'] | null);
    errors: (MarkMessagesAsReadError[] | null);
    __typename: 'MarkMessagesAsReadPayload';
}
export interface MessageThread {
    contributionId: Scalars['Int'];
    encodedContributionId: Scalars['String'];
    contributionTitle: Scalars['String'];
    mediaTitle: (Scalars['String'] | null);
    lastMessagePreview: Scalars['String'];
    lastMessageAt: Scalars['DateTime'];
    unreadCount: Scalars['Int'];
    totalCount: Scalars['Int'];
    isBoxset: Scalars['Boolean'];
    __typename: 'MessageThread';
}
export interface MismatchedReleaseSlugError {
    message: Scalars['String'];
    boxsetSlug: Scalars['String'];
    offendingReleaseSlug: Scalars['String'];
    contributionTitle: Scalars['String'];
    __typename: 'MismatchedReleaseSlugError';
}
/** A connection to a list of items. */
export interface MyBoxsetsConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (MyBoxsetsEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (UserContributionBoxset[] | null);
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int'];
    __typename: 'MyBoxsetsConnection';
}
/** An edge in a connection. */
export interface MyBoxsetsEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: UserContributionBoxset;
    __typename: 'MyBoxsetsEdge';
}
/** A connection to a list of items. */
export interface MyContributionsConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (MyContributionsEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (UserContribution[] | null);
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int'];
    __typename: 'MyContributionsConnection';
}
/** An edge in a connection. */
export interface MyContributionsEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: UserContribution;
    __typename: 'MyContributionsEdge';
}
/** A connection to a list of items. */
export interface MyMessagesConnection {
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
    /** A list of edges. */
    edges: (MyMessagesEdge[] | null);
    /** A flattened list of the nodes. */
    nodes: (UserMessage[] | null);
    /** Identifies the total count of items in the connection. */
    totalCount: Scalars['Int'];
    __typename: 'MyMessagesConnection';
}
/** An edge in a connection. */
export interface MyMessagesEdge {
    /** A cursor for use in pagination. */
    cursor: Scalars['String'];
    /** The item at the end of the edge. */
    node: UserMessage;
    __typename: 'MyMessagesEdge';
}
/** Information about pagination in a connection. */
export interface PageInfo {
    /** Indicates whether more edges exist following the set defined by the clients arguments. */
    hasNextPage: Scalars['Boolean'];
    /** Indicates whether more edges exist prior the set defined by the clients arguments. */
    hasPreviousPage: Scalars['Boolean'];
    /** When paginating backwards, the cursor to continue. */
    startCursor: (Scalars['String'] | null);
    /** When paginating forwards, the cursor to continue. */
    endCursor: (Scalars['String'] | null);
    __typename: 'PageInfo';
}
export interface RemoveBoxsetMemberPayload {
    userContributionBoxset: (UserContributionBoxset | null);
    errors: (RemoveBoxsetMemberError[] | null);
    __typename: 'RemoveBoxsetMemberPayload';
}
export interface RemoveDiscFromBoxsetPayload {
    userContributionBoxset: (UserContributionBoxset | null);
    errors: (RemoveDiscFromBoxsetError[] | null);
    __typename: 'RemoveDiscFromBoxsetPayload';
}
export interface ReorderBoxsetMembersPayload {
    userContributionBoxset: (UserContributionBoxset | null);
    errors: (ReorderBoxsetMembersError[] | null);
    __typename: 'ReorderBoxsetMembersPayload';
}
export interface ReorderDiscsPayload {
    userContributionDisc: (UserContributionDisc[] | null);
    errors: (ReorderDiscsError[] | null);
    __typename: 'ReorderDiscsPayload';
}
export interface RevokeApiKeyPayload {
    apiKeyInfo: (ApiKeyInfo | null);
    errors: (RevokeApiKeyError[] | null);
    __typename: 'RevokeApiKeyPayload';
}
export interface Segment {
    index: Scalars['Int'];
    type: (Scalars['String'] | null);
    name: (Scalars['String'] | null);
    audioType: (Scalars['String'] | null);
    languageCode: (Scalars['String'] | null);
    language: (Scalars['String'] | null);
    resolution: (Scalars['String'] | null);
    aspectRatio: (Scalars['String'] | null);
    __typename: 'Segment';
}
export interface SendAdminBoxsetMessagePayload {
    userMessage: (UserMessage | null);
    errors: (SendAdminBoxsetMessageError[] | null);
    __typename: 'SendAdminBoxsetMessagePayload';
}
export interface SendAdminMessagePayload {
    userMessage: (UserMessage | null);
    errors: (SendAdminMessageError[] | null);
    __typename: 'SendAdminMessagePayload';
}
export interface SendBoxsetUserMessagePayload {
    userMessage: (UserMessage | null);
    errors: (SendBoxsetUserMessageError[] | null);
    __typename: 'SendBoxsetUserMessagePayload';
}
export interface SendUserMessagePayload {
    userMessage: (UserMessage | null);
    errors: (SendUserMessageError[] | null);
    __typename: 'SendUserMessagePayload';
}
export interface SeriesEpisodeNameEntry {
    seasonNumber: Scalars['String'];
    episodeNumber: Scalars['String'];
    episodeName: Scalars['String'];
    __typename: 'SeriesEpisodeNameEntry';
}
export interface SeriesEpisodeNames {
    tryFind: (SeriesEpisodeNameEntry | null);
    seriesTitle: Scalars['String'];
    seriesYear: Scalars['String'];
    episodes: SeriesEpisodeNameEntry[];
    __typename: 'SeriesEpisodeNames';
}
export interface SetFileNameTemplatePayload {
    userFileNameTemplate: (UserFileNameTemplate | null);
    errors: (SetFileNameTemplateError[] | null);
    __typename: 'SetFileNameTemplatePayload';
}
export interface Title {
    index: Scalars['Int'];
    chapterCount: Scalars['Int'];
    length: (Scalars['String'] | null);
    displaySize: (Scalars['String'] | null);
    size: Scalars['Long'];
    playlist: (Scalars['String'] | null);
    segmentMap: (Scalars['String'] | null);
    comment: (Scalars['String'] | null);
    javaComment: (Scalars['String'] | null);
    segments: Segment[];
    lengthAsTimeSpan: Scalars['TimeSpan'];
    __typename: 'Title';
}
export interface UpdateBoxsetPayload {
    userContributionBoxset: (UserContributionBoxset | null);
    errors: (UpdateBoxsetError[] | null);
    __typename: 'UpdateBoxsetPayload';
}
export interface UpdateContributionPayload {
    userContribution: (UserContribution | null);
    errors: (UpdateContributionError[] | null);
    __typename: 'UpdateContributionPayload';
}
export interface UpdateDiscPayload {
    userContributionDisc: (UserContributionDisc | null);
    errors: (UpdateDiscError[] | null);
    __typename: 'UpdateDiscPayload';
}
export interface UserContribution {
    id: Scalars['Int'];
    userId: Scalars['String'];
    created: Scalars['DateTime'];
    status: UserContributionStatus;
    boxsetId: (Scalars['Int'] | null);
    boxset: (UserContributionBoxset | null);
    discs: UserContributionDisc[];
    hashItems: UserContributionDiscHashItem[];
    mediaType: Scalars['String'];
    externalId: Scalars['String'];
    externalProvider: Scalars['String'];
    releaseDate: Scalars['DateTime'];
    asin: Scalars['String'];
    upc: Scalars['String'];
    frontImageUrl: Scalars['String'];
    backImageUrl: (Scalars['String'] | null);
    releaseTitle: Scalars['String'];
    releaseSlug: (Scalars['String'] | null);
    locale: Scalars['String'];
    regionCode: Scalars['String'];
    title: (Scalars['String'] | null);
    year: (Scalars['String'] | null);
    titleSlug: Scalars['String'];
    encodedId: Scalars['EncodedId'];
    __typename: 'UserContribution';
}
export interface UserContributionAudioTrack {
    id: Scalars['Int'];
    index: Scalars['Int'];
    title: Scalars['String'];
    item: UserContributionDiscItem;
    encodedId: Scalars['EncodedId'];
    __typename: 'UserContributionAudioTrack';
}
export interface UserContributionBoxset {
    id: Scalars['Int'];
    userId: Scalars['String'];
    created: Scalars['DateTime'];
    status: UserContributionStatus;
    title: Scalars['String'];
    sortTitle: (Scalars['String'] | null);
    slug: Scalars['String'];
    frontImageUrl: (Scalars['String'] | null);
    backImageUrl: (Scalars['String'] | null);
    asin: (Scalars['String'] | null);
    upc: (Scalars['String'] | null);
    releaseDate: (Scalars['DateTime'] | null);
    locale: (Scalars['String'] | null);
    regionCode: (Scalars['String'] | null);
    members: UserContributionBoxsetMember[];
    encodedId: Scalars['EncodedId'];
    __typename: 'UserContributionBoxset';
}
export interface UserContributionBoxsetMember {
    id: Scalars['Int'];
    boxset: UserContributionBoxset;
    disc: (UserContributionDisc | null);
    sortOrder: Scalars['Int'];
    existingDiscPath: (Scalars['String'] | null);
    existingDiscName: (Scalars['String'] | null);
    existingDiscFormat: (Scalars['String'] | null);
    __typename: 'UserContributionBoxsetMember';
}
export interface UserContributionChapter {
    id: Scalars['Int'];
    index: Scalars['Int'];
    title: Scalars['String'];
    item: UserContributionDiscItem;
    encodedId: Scalars['EncodedId'];
    __typename: 'UserContributionChapter';
}
export interface UserContributionDisc {
    id: Scalars['Int'];
    userContribution: UserContribution;
    contentHash: Scalars['String'];
    globalDiscId: (Scalars['String'] | null);
    format: Scalars['String'];
    name: Scalars['String'];
    slug: Scalars['String'];
    logsUploaded: Scalars['Boolean'];
    logUploadError: (Scalars['String'] | null);
    index: (Scalars['Int'] | null);
    existingDiscPath: (Scalars['String'] | null);
    items: UserContributionDiscItem[];
    encodedId: Scalars['EncodedId'];
    __typename: 'UserContributionDisc';
}
export interface UserContributionDiscHashItem {
    id: Scalars['Int'];
    userContribution: UserContribution;
    discHash: Scalars['String'];
    index: Scalars['Int'];
    name: Scalars['String'];
    creationTime: Scalars['DateTime'];
    size: Scalars['Long'];
    encodedId: Scalars['EncodedId'];
    __typename: 'UserContributionDiscHashItem';
}
export interface UserContributionDiscItem {
    id: Scalars['Int'];
    disc: UserContributionDisc;
    name: Scalars['String'];
    source: Scalars['String'];
    duration: Scalars['String'];
    size: Scalars['String'];
    chapterCount: Scalars['Int'];
    segmentCount: Scalars['Int'];
    segmentMap: Scalars['String'];
    type: Scalars['String'];
    description: (Scalars['String'] | null);
    season: (Scalars['String'] | null);
    episode: (Scalars['String'] | null);
    chapters: UserContributionChapter[];
    audioTracks: UserContributionAudioTrack[];
    subtitleTracks: UserContributionSubtitleTrack[];
    encodedId: Scalars['EncodedId'];
    filename: Scalars['String'];
    __typename: 'UserContributionDiscItem';
}
export interface UserContributionSubtitleTrack {
    id: Scalars['Int'];
    index: Scalars['Int'];
    title: Scalars['String'];
    item: UserContributionDiscItem;
    encodedId: Scalars['EncodedId'];
    __typename: 'UserContributionSubtitleTrack';
}
export interface UserFileNameTemplate {
    id: Scalars['Int'];
    userId: Scalars['String'];
    itemType: Scalars['String'];
    template: Scalars['String'];
    updatedAt: Scalars['DateTime'];
    __typename: 'UserFileNameTemplate';
}
export interface UserMessage {
    id: Scalars['Int'];
    contributionId: (Scalars['Int'] | null);
    boxsetId: (Scalars['Int'] | null);
    contribution: (UserContribution | null);
    boxset: (UserContributionBoxset | null);
    fromUserId: Scalars['String'];
    toUserId: Scalars['String'];
    message: Scalars['String'];
    isRead: Scalars['Boolean'];
    createdAt: Scalars['DateTime'];
    type: UserMessageType;
    __typename: 'UserMessage';
}
export type AddAudioTrackToItemError = (ContributionNotFoundError | DiscNotFoundError | DiscItemNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type AddChapterToItemError = (ContributionNotFoundError | DiscNotFoundError | DiscItemNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type AddDiscToBoxsetError = (AuthenticationError | BoxsetNotFoundError | DiscNotFoundError | ContributionAlreadyInBoxsetError | InvalidIdError | InvalidOwnershipError | InvalidBoxsetStatusError | MismatchedReleaseSlugError) & {
    __isUnion?: true;
};
export type AddExistingDiscToBoxsetError = (AuthenticationError | BoxsetNotFoundError | InvalidIdError | InvalidOwnershipError | InvalidDiscPathError | ExistingDiscAlreadyInBoxsetError | InvalidBoxsetStatusError | MismatchedReleaseSlugError) & {
    __isUnion?: true;
};
export type AddItemToDiscError = (ContributionNotFoundError | DiscNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type AddSubtitleTrackToItemError = (ContributionNotFoundError | DiscNotFoundError | DiscItemNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type AttachGlobalDiscIdError = (AuthenticationError) & {
    __isUnion?: true;
};
export type CreateBoxsetError = (AuthenticationError) & {
    __isUnion?: true;
};
export type CreateContributionError = (AuthenticationError | BoxsetNotFoundError | InvalidIdError | InvalidOwnershipError | InvalidBoxsetStatusError) & {
    __isUnion?: true;
};
export type CreateDiscError = (ContributionNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError | InvalidDiscPathError) & {
    __isUnion?: true;
};
export type DeleteBoxsetError = (AuthenticationError | BoxsetNotFoundError | InvalidIdError | InvalidOwnershipError | InvalidBoxsetStatusError) & {
    __isUnion?: true;
};
export type DeleteContributionError = (ContributionNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError | InvalidContributionStatusError) & {
    __isUnion?: true;
};
export type DeleteDiscFromContributionError = (ContributionNotFoundError | DiscNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError | InvalidContributionStatusError) & {
    __isUnion?: true;
};
export type DeleteFileNameTemplateError = (AuthenticationError) & {
    __isUnion?: true;
};
export type DeleteItemFromDiscError = (ContributionNotFoundError | DiscNotFoundError | DiscItemNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type DiscLogsError = (LogsNotFoundError | ContributionNotFoundError | DiscNotFoundError | CouldNotParseLogsError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type DiscUploadStatusError = (DiscNotFoundError | FieldRequiredError | InvalidIdError) & {
    __isUnion?: true;
};
export type EditItemOnDiscError = (ContributionNotFoundError | DiscNotFoundError | DiscItemNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type EpisodeNamesError = (ContributionNotFoundError | ExternalDataNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type ExternalDataError = (ContributionNotFoundError | ExternalDataNotFoundError) & {
    __isUnion?: true;
};
export type ExternalDataForContributionError = (ContributionNotFoundError | ExternalDataSerializationError | ExternalDataNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type HashDiscError = (ContributionNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type MarkBoxsetMessagesAsReadError = (AuthenticationError) & {
    __isUnion?: true;
};
export type MarkMessagesAsReadError = (AuthenticationError) & {
    __isUnion?: true;
};
export type RemoveBoxsetMemberError = (AuthenticationError | BoxsetNotFoundError | InvalidIdError | InvalidOwnershipError | InvalidBoxsetStatusError) & {
    __isUnion?: true;
};
export type RemoveDiscFromBoxsetError = (AuthenticationError | BoxsetNotFoundError | DiscNotFoundError | InvalidIdError | InvalidOwnershipError | InvalidBoxsetStatusError) & {
    __isUnion?: true;
};
export type ReorderBoxsetMembersError = (AuthenticationError | BoxsetNotFoundError | InvalidIdError | InvalidOwnershipError | InvalidBoxsetStatusError) & {
    __isUnion?: true;
};
export type ReorderDiscsError = (ContributionNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type RevokeApiKeyError = (ApiKeyNotFoundError) & {
    __isUnion?: true;
};
export type SendAdminBoxsetMessageError = (BoxsetNotFoundError | AuthenticationError | InvalidIdError) & {
    __isUnion?: true;
};
export type SendAdminMessageError = (ContributionNotFoundError | AuthenticationError) & {
    __isUnion?: true;
};
export type SendBoxsetUserMessageError = (BoxsetNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type SendUserMessageError = (ContributionNotFoundError | AuthenticationError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type SetFileNameTemplateError = (AuthenticationError) & {
    __isUnion?: true;
};
export type UpdateBoxsetError = (AuthenticationError | BoxsetNotFoundError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
export type UpdateContributionError = (ContributionNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError | InvalidContributionStatusError) & {
    __isUnion?: true;
};
export type UpdateDiscError = (ContributionNotFoundError | DiscNotFoundError | AuthenticationError | InvalidIdError | InvalidOwnershipError) & {
    __isUnion?: true;
};
/** Defines when a policy shall be executed. */
export type ApplyPolicy = 'BEFORE_RESOLVER' | 'AFTER_RESOLVER' | 'VALIDATION';
export type AttachDiscIdOutcome = 'APPLIED' | 'ALREADY_RECORDED' | 'CONFLICT' | 'NOT_FOUND' | 'MISMATCH';
export type ContributionHistoryType = 'CREATED' | 'STATUS_CHANGED' | 'DELETED' | 'ADMIN_MESSAGE' | 'USER_MESSAGE';
export type SortEnumType = 'ASC' | 'DESC';
export type UserContributionStatus = 'PENDING' | 'READY_FOR_REVIEW' | 'APPROVED' | 'CHANGES_REQUESTED' | 'REJECTED' | 'IMPORTED';
export type UserMessageType = 'ADMIN_MESSAGE' | 'USER_MESSAGE';
export type Query = ContributionQuery;
export type Mutation = ContributionMutations;
export interface ErrorGenqlSelection {
    message?: boolean | number;
    on_ApiKeyNotFoundError?: ApiKeyNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_ContributionAlreadyInBoxsetError?: ContributionAlreadyInBoxsetErrorGenqlSelection;
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_CouldNotParseLogsError?: CouldNotParseLogsErrorGenqlSelection;
    on_DiscItemNotFoundError?: DiscItemNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_ExistingDiscAlreadyInBoxsetError?: ExistingDiscAlreadyInBoxsetErrorGenqlSelection;
    on_ExternalDataNotFoundError?: ExternalDataNotFoundErrorGenqlSelection;
    on_ExternalDataSerializationError?: ExternalDataSerializationErrorGenqlSelection;
    on_FieldRequiredError?: FieldRequiredErrorGenqlSelection;
    on_InvalidBoxsetStatusError?: InvalidBoxsetStatusErrorGenqlSelection;
    on_InvalidContributionStatusError?: InvalidContributionStatusErrorGenqlSelection;
    on_InvalidDiscPathError?: InvalidDiscPathErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_LogsNotFoundError?: LogsNotFoundErrorGenqlSelection;
    on_MismatchedReleaseSlugError?: MismatchedReleaseSlugErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AddAudioTrackToItemPayloadGenqlSelection {
    userContributionAudioTrack?: UserContributionAudioTrackGenqlSelection;
    errors?: AddAudioTrackToItemErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AddChapterToItemPayloadGenqlSelection {
    userContributionChapter?: UserContributionChapterGenqlSelection;
    errors?: AddChapterToItemErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AddDiscToBoxsetPayloadGenqlSelection {
    userContributionBoxset?: UserContributionBoxsetGenqlSelection;
    errors?: AddDiscToBoxsetErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AddExistingDiscToBoxsetPayloadGenqlSelection {
    userContributionBoxset?: UserContributionBoxsetGenqlSelection;
    errors?: AddExistingDiscToBoxsetErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AddItemToDiscPayloadGenqlSelection {
    userContributionDiscItem?: UserContributionDiscItemGenqlSelection;
    errors?: AddItemToDiscErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AddSubtitleTrackToItemPayloadGenqlSelection {
    userContributionSubtitleTrack?: UserContributionSubtitleTrackGenqlSelection;
    errors?: AddSubtitleTrackToItemErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AmazonProductMetadataGenqlSelection {
    asin?: boolean | number;
    title?: boolean | number;
    upc?: boolean | number;
    frontImageUrl?: boolean | number;
    backImageUrl?: boolean | number;
    releaseDate?: boolean | number;
    numberOfDiscs?: boolean | number;
    aspectRatio?: boolean | number;
    isDiscontinued?: boolean | number;
    mpaaRating?: boolean | number;
    modelNumber?: boolean | number;
    director?: boolean | number;
    mediaFormat?: boolean | number;
    actors?: boolean | number;
    producers?: boolean | number;
    language?: boolean | number;
    dubbed?: boolean | number;
    subtitles?: boolean | number;
    studio?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ApiKeyInfoGenqlSelection {
    name?: boolean | number;
    keyPrefix?: boolean | number;
    isActive?: boolean | number;
    logUsage?: boolean | number;
    roles?: boolean | number;
    ownerEmail?: boolean | number;
    createdAt?: boolean | number;
    expiresAt?: boolean | number;
    lastUsedAt?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ApiKeyNotFoundErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ApiKeyUsageLogInfoGenqlSelection {
    apiKeyPrefix?: boolean | number;
    apiKeyName?: boolean | number;
    timestamp?: boolean | number;
    operationName?: boolean | number;
    fieldCost?: boolean | number;
    typeCost?: boolean | number;
    durationMs?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface ApiKeyUsageLogsConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: ApiKeyUsageLogsEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: ApiKeyUsageLogInfoGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface ApiKeyUsageLogsEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: ApiKeyUsageLogInfoGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface ApiKeysConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: ApiKeysEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: ApiKeyInfoGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface ApiKeysEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: ApiKeyInfoGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AttachDiscIdResultGenqlSelection {
    outcome?: boolean | number;
    contentHash?: boolean | number;
    mediaItemSlug?: boolean | number;
    boxsetSlug?: boolean | number;
    mediaItemType?: boolean | number;
    releaseSlug?: boolean | number;
    discSlug?: boolean | number;
    discIndex?: boolean | number;
    globalDiscId?: boolean | number;
    existingGlobalDiscId?: boolean | number;
    matchedDifferentDisc?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AttachGlobalDiscIdPayloadGenqlSelection {
    attachDiscIdResult?: AttachDiscIdResultGenqlSelection;
    errors?: AttachGlobalDiscIdErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AuthenticationErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface BoxsetChatConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: BoxsetChatEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: UserMessageGenqlSelection;
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface BoxsetChatEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: UserMessageGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface BoxsetContributionsConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: BoxsetContributionsEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: UserContributionBoxsetGenqlSelection;
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface BoxsetContributionsEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: UserContributionBoxsetGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface BoxsetNotFoundErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ContributionAlreadyInBoxsetErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface ContributionChatConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: ContributionChatEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: UserMessageGenqlSelection;
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface ContributionChatEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: UserMessageGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ContributionHistoryGenqlSelection {
    id?: boolean | number;
    contributionId?: boolean | number;
    timeStamp?: boolean | number;
    description?: boolean | number;
    userId?: boolean | number;
    type?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface ContributionHistoryConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: ContributionHistoryEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: ContributionHistoryGenqlSelection;
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface ContributionHistoryEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: ContributionHistoryGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ContributionMutationsGenqlSelection {
    addAudioTrackToItem?: (AddAudioTrackToItemPayloadGenqlSelection & {
        __args: {
            input: AddAudioTrackToItemInput;
        };
    });
    addChapterToItem?: (AddChapterToItemPayloadGenqlSelection & {
        __args: {
            input: AddChapterToItemInput;
        };
    });
    addDiscToBoxset?: (AddDiscToBoxsetPayloadGenqlSelection & {
        __args: {
            input: AddDiscToBoxsetInput;
        };
    });
    addExistingDiscToBoxset?: (AddExistingDiscToBoxsetPayloadGenqlSelection & {
        __args: {
            input: AddExistingDiscToBoxsetInput;
        };
    });
    addItemToDisc?: (AddItemToDiscPayloadGenqlSelection & {
        __args: {
            input: AddItemToDiscInput;
        };
    });
    addSubtitleTrackToItem?: (AddSubtitleTrackToItemPayloadGenqlSelection & {
        __args: {
            input: AddSubtitleTrackToItemInput;
        };
    });
    attachGlobalDiscId?: (AttachGlobalDiscIdPayloadGenqlSelection & {
        __args: {
            input: AttachGlobalDiscIdInput;
        };
    });
    createBoxset?: (CreateBoxsetPayloadGenqlSelection & {
        __args: {
            input: CreateBoxsetInput;
        };
    });
    createContribution?: (CreateContributionPayloadGenqlSelection & {
        __args: {
            input: CreateContributionInput;
        };
    });
    createDisc?: (CreateDiscPayloadGenqlSelection & {
        __args: {
            input: CreateDiscInput;
        };
    });
    deleteBoxset?: (DeleteBoxsetPayloadGenqlSelection & {
        __args: {
            input: DeleteBoxsetInput;
        };
    });
    deleteContribution?: (DeleteContributionPayloadGenqlSelection & {
        __args: {
            input: DeleteContributionInput;
        };
    });
    deleteDiscFromContribution?: (DeleteDiscFromContributionPayloadGenqlSelection & {
        __args: {
            input: DeleteDiscFromContributionInput;
        };
    });
    deleteItemFromDisc?: (DeleteItemFromDiscPayloadGenqlSelection & {
        __args: {
            input: DeleteItemFromDiscInput;
        };
    });
    editItemOnDisc?: (EditItemOnDiscPayloadGenqlSelection & {
        __args: {
            input: EditItemOnDiscInput;
        };
    });
    setFileNameTemplate?: (SetFileNameTemplatePayloadGenqlSelection & {
        __args: {
            input: SetFileNameTemplateInput;
        };
    });
    deleteFileNameTemplate?: (DeleteFileNameTemplatePayloadGenqlSelection & {
        __args: {
            input: DeleteFileNameTemplateInput;
        };
    });
    generateApiKey?: (GenerateApiKeyPayloadGenqlSelection & {
        __args: {
            input: GenerateApiKeyInput;
        };
    });
    discLogs?: (DiscLogsPayloadGenqlSelection & {
        __args: {
            input: DiscLogsInput;
        };
    });
    discUploadStatus?: (DiscUploadStatusPayloadGenqlSelection & {
        __args: {
            input: DiscUploadStatusInput;
        };
    });
    episodeNames?: (EpisodeNamesPayloadGenqlSelection & {
        __args: {
            input: EpisodeNamesInput;
        };
    });
    externalData?: (ExternalDataPayloadGenqlSelection & {
        __args: {
            input: ExternalDataInput;
        };
    });
    externalDataForContribution?: (ExternalDataForContributionPayloadGenqlSelection & {
        __args: {
            input: ExternalDataForContributionInput;
        };
    });
    hashDisc?: (HashDiscPayloadGenqlSelection & {
        __args: {
            input: HashDiscInput;
        };
    });
    markMessagesAsRead?: (MarkMessagesAsReadPayloadGenqlSelection & {
        __args: {
            input: MarkMessagesAsReadInput;
        };
    });
    markBoxsetMessagesAsRead?: (MarkBoxsetMessagesAsReadPayloadGenqlSelection & {
        __args: {
            input: MarkBoxsetMessagesAsReadInput;
        };
    });
    removeBoxsetMember?: (RemoveBoxsetMemberPayloadGenqlSelection & {
        __args: {
            input: RemoveBoxsetMemberInput;
        };
    });
    removeDiscFromBoxset?: (RemoveDiscFromBoxsetPayloadGenqlSelection & {
        __args: {
            input: RemoveDiscFromBoxsetInput;
        };
    });
    reorderBoxsetMembers?: (ReorderBoxsetMembersPayloadGenqlSelection & {
        __args: {
            input: ReorderBoxsetMembersInput;
        };
    });
    reorderDiscs?: (ReorderDiscsPayloadGenqlSelection & {
        __args: {
            input: ReorderDiscsInput;
        };
    });
    revokeApiKey?: (RevokeApiKeyPayloadGenqlSelection & {
        __args: {
            input: RevokeApiKeyInput;
        };
    });
    sendAdminMessage?: (SendAdminMessagePayloadGenqlSelection & {
        __args: {
            input: SendAdminMessageInput;
        };
    });
    sendUserMessage?: (SendUserMessagePayloadGenqlSelection & {
        __args: {
            input: SendUserMessageInput;
        };
    });
    sendAdminBoxsetMessage?: (SendAdminBoxsetMessagePayloadGenqlSelection & {
        __args: {
            input: SendAdminBoxsetMessageInput;
        };
    });
    sendBoxsetUserMessage?: (SendBoxsetUserMessagePayloadGenqlSelection & {
        __args: {
            input: SendBoxsetUserMessageInput;
        };
    });
    updateBoxset?: (UpdateBoxsetPayloadGenqlSelection & {
        __args: {
            input: UpdateBoxsetInput;
        };
    });
    updateContribution?: (UpdateContributionPayloadGenqlSelection & {
        __args: {
            input: UpdateContributionInput;
        };
    });
    updateDisc?: (UpdateDiscPayloadGenqlSelection & {
        __args: {
            input: UpdateDiscInput;
        };
    });
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ContributionNotFoundErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ContributionQueryGenqlSelection {
    contributions?: (ContributionsConnectionGenqlSelection & {
        __args?: {
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            where?: (UserContributionFilterInput | null);
            order?: (UserContributionSortInput[] | null);
        };
    });
    myContributions?: (MyContributionsConnectionGenqlSelection & {
        __args?: {
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            where?: (UserContributionFilterInput | null);
            order?: (UserContributionSortInput[] | null);
        };
    });
    contributionHistory?: (ContributionHistoryConnectionGenqlSelection & {
        __args: {
            contributionId: Scalars['Int'];
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            order?: (ContributionHistorySortInput[] | null);
        };
    });
    contributionChat?: (ContributionChatConnectionGenqlSelection & {
        __args: {
            contributionId: Scalars['String'];
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            order?: (UserMessageSortInput[] | null);
        };
    });
    boxsetChat?: (BoxsetChatConnectionGenqlSelection & {
        __args: {
            boxsetId: Scalars['String'];
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            order?: (UserMessageSortInput[] | null);
        };
    });
    hasUnreadMessages?: boolean | number;
    myMessages?: (MyMessagesConnectionGenqlSelection & {
        __args?: {
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            order?: (UserMessageSortInput[] | null);
        };
    });
    messageThreads?: MessageThreadGenqlSelection;
    boxsetContributions?: (BoxsetContributionsConnectionGenqlSelection & {
        __args?: {
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            where?: (UserContributionBoxsetFilterInput | null);
            order?: (UserContributionBoxsetSortInput[] | null);
        };
    });
    myBoxsets?: (MyBoxsetsConnectionGenqlSelection & {
        __args?: {
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            where?: (UserContributionBoxsetFilterInput | null);
            order?: (UserContributionBoxsetSortInput[] | null);
        };
    });
    amazonProductMetadata?: (AmazonProductMetadataGenqlSelection & {
        __args: {
            asin: Scalars['String'];
        };
    });
    apiKeys?: (ApiKeysConnectionGenqlSelection & {
        __args?: {
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            where?: (ApiKeyInfoFilterInput | null);
            order?: (ApiKeyInfoSortInput[] | null);
        };
    });
    apiKeyUsageLogs?: (ApiKeyUsageLogsConnectionGenqlSelection & {
        __args?: {
            /** Returns the first _n_ elements from the list. */
            first?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come after the specified cursor. */
            after?: (Scalars['String'] | null);
            /** Returns the last _n_ elements from the list. */
            last?: (Scalars['Int'] | null);
            /** Returns the elements in the list that come before the specified cursor. */
            before?: (Scalars['String'] | null);
            where?: (ApiKeyUsageLogInfoFilterInput | null);
            order?: (ApiKeyUsageLogInfoSortInput[] | null);
        };
    });
    myFileNameTemplates?: UserFileNameTemplateGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface ContributionsConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: ContributionsEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: UserContributionGenqlSelection;
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface ContributionsEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: UserContributionGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface CouldNotParseLogsErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface CreateBoxsetPayloadGenqlSelection {
    userContributionBoxset?: UserContributionBoxsetGenqlSelection;
    errors?: CreateBoxsetErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface CreateContributionPayloadGenqlSelection {
    userContribution?: UserContributionGenqlSelection;
    errors?: CreateContributionErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface CreateDiscPayloadGenqlSelection {
    userContributionDisc?: UserContributionDiscGenqlSelection;
    errors?: CreateDiscErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DeleteBoxsetPayloadGenqlSelection {
    userContributionBoxset?: UserContributionBoxsetGenqlSelection;
    errors?: DeleteBoxsetErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DeleteContributionPayloadGenqlSelection {
    userContribution?: UserContributionGenqlSelection;
    errors?: DeleteContributionErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DeleteDiscFromContributionPayloadGenqlSelection {
    userContributionDisc?: UserContributionDiscGenqlSelection;
    errors?: DeleteDiscFromContributionErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DeleteFileNameTemplatePayloadGenqlSelection {
    boolean?: boolean | number;
    errors?: DeleteFileNameTemplateErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DeleteItemFromDiscPayloadGenqlSelection {
    userContributionDiscItem?: UserContributionDiscItemGenqlSelection;
    errors?: DeleteItemFromDiscErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DiscHashGenqlSelection {
    hash?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DiscInfoGenqlSelection {
    name?: boolean | number;
    type?: boolean | number;
    languageCode?: boolean | number;
    language?: boolean | number;
    titles?: TitleGenqlSelection;
    hashInfo?: HashInfoLogLineGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DiscItemNotFoundErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DiscLogsGenqlSelection {
    info?: DiscInfoGenqlSelection;
    disc?: UserContributionDiscGenqlSelection;
    contribution?: UserContributionGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DiscLogsPayloadGenqlSelection {
    discLogs?: DiscLogsGenqlSelection;
    errors?: DiscLogsErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DiscNotFoundErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DiscUploadStatusGenqlSelection {
    logsUploaded?: boolean | number;
    logUploadError?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface DiscUploadStatusPayloadGenqlSelection {
    discUploadStatus?: DiscUploadStatusGenqlSelection;
    errors?: DiscUploadStatusErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface EditItemOnDiscPayloadGenqlSelection {
    userContributionDiscItem?: UserContributionDiscItemGenqlSelection;
    errors?: EditItemOnDiscErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface EpisodeNamesPayloadGenqlSelection {
    seriesEpisodeNames?: SeriesEpisodeNamesGenqlSelection;
    errors?: EpisodeNamesErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ExistingDiscAlreadyInBoxsetErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ExternalDataForContributionPayloadGenqlSelection {
    externalMetadata?: ExternalMetadataGenqlSelection;
    errors?: ExternalDataForContributionErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ExternalDataNotFoundErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ExternalDataPayloadGenqlSelection {
    externalMetadata?: ExternalMetadataGenqlSelection;
    errors?: ExternalDataErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ExternalDataSerializationErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ExternalMetadataGenqlSelection {
    id?: boolean | number;
    title?: boolean | number;
    year?: boolean | number;
    imageUrl?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface FieldRequiredErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface GenerateApiKeyPayloadGenqlSelection {
    key?: boolean | number;
    keyPrefix?: boolean | number;
    name?: boolean | number;
    ownerEmail?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface HashDiscPayloadGenqlSelection {
    discHash?: DiscHashGenqlSelection;
    errors?: HashDiscErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface HashInfoLogLineGenqlSelection {
    matches?: {
        __args: {
            prefix: Scalars['String'];
        };
    };
    index?: boolean | number;
    name?: boolean | number;
    creationTime?: boolean | number;
    size?: boolean | number;
    originalLine?: boolean | number;
    prefix?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface InvalidBoxsetStatusErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface InvalidContributionStatusErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface InvalidDiscPathErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface InvalidIdErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface InvalidOwnershipErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface LogsNotFoundErrorGenqlSelection {
    message?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface MarkBoxsetMessagesAsReadPayloadGenqlSelection {
    boolean?: boolean | number;
    errors?: MarkBoxsetMessagesAsReadErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface MarkMessagesAsReadPayloadGenqlSelection {
    boolean?: boolean | number;
    errors?: MarkMessagesAsReadErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface MessageThreadGenqlSelection {
    contributionId?: boolean | number;
    encodedContributionId?: boolean | number;
    contributionTitle?: boolean | number;
    mediaTitle?: boolean | number;
    lastMessagePreview?: boolean | number;
    lastMessageAt?: boolean | number;
    unreadCount?: boolean | number;
    totalCount?: boolean | number;
    isBoxset?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface MismatchedReleaseSlugErrorGenqlSelection {
    message?: boolean | number;
    boxsetSlug?: boolean | number;
    offendingReleaseSlug?: boolean | number;
    contributionTitle?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface MyBoxsetsConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: MyBoxsetsEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: UserContributionBoxsetGenqlSelection;
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface MyBoxsetsEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: UserContributionBoxsetGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface MyContributionsConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: MyContributionsEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: UserContributionGenqlSelection;
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface MyContributionsEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: UserContributionGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** A connection to a list of items. */
export interface MyMessagesConnectionGenqlSelection {
    /** Information to aid in pagination. */
    pageInfo?: PageInfoGenqlSelection;
    /** A list of edges. */
    edges?: MyMessagesEdgeGenqlSelection;
    /** A flattened list of the nodes. */
    nodes?: UserMessageGenqlSelection;
    /** Identifies the total count of items in the connection. */
    totalCount?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** An edge in a connection. */
export interface MyMessagesEdgeGenqlSelection {
    /** A cursor for use in pagination. */
    cursor?: boolean | number;
    /** The item at the end of the edge. */
    node?: UserMessageGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
/** Information about pagination in a connection. */
export interface PageInfoGenqlSelection {
    /** Indicates whether more edges exist following the set defined by the clients arguments. */
    hasNextPage?: boolean | number;
    /** Indicates whether more edges exist prior the set defined by the clients arguments. */
    hasPreviousPage?: boolean | number;
    /** When paginating backwards, the cursor to continue. */
    startCursor?: boolean | number;
    /** When paginating forwards, the cursor to continue. */
    endCursor?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface RemoveBoxsetMemberPayloadGenqlSelection {
    userContributionBoxset?: UserContributionBoxsetGenqlSelection;
    errors?: RemoveBoxsetMemberErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface RemoveDiscFromBoxsetPayloadGenqlSelection {
    userContributionBoxset?: UserContributionBoxsetGenqlSelection;
    errors?: RemoveDiscFromBoxsetErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ReorderBoxsetMembersPayloadGenqlSelection {
    userContributionBoxset?: UserContributionBoxsetGenqlSelection;
    errors?: ReorderBoxsetMembersErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface ReorderDiscsPayloadGenqlSelection {
    userContributionDisc?: UserContributionDiscGenqlSelection;
    errors?: ReorderDiscsErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface RevokeApiKeyPayloadGenqlSelection {
    apiKeyInfo?: ApiKeyInfoGenqlSelection;
    errors?: RevokeApiKeyErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface SegmentGenqlSelection {
    index?: boolean | number;
    type?: boolean | number;
    name?: boolean | number;
    audioType?: boolean | number;
    languageCode?: boolean | number;
    language?: boolean | number;
    resolution?: boolean | number;
    aspectRatio?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface SendAdminBoxsetMessagePayloadGenqlSelection {
    userMessage?: UserMessageGenqlSelection;
    errors?: SendAdminBoxsetMessageErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface SendAdminMessagePayloadGenqlSelection {
    userMessage?: UserMessageGenqlSelection;
    errors?: SendAdminMessageErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface SendBoxsetUserMessagePayloadGenqlSelection {
    userMessage?: UserMessageGenqlSelection;
    errors?: SendBoxsetUserMessageErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface SendUserMessagePayloadGenqlSelection {
    userMessage?: UserMessageGenqlSelection;
    errors?: SendUserMessageErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface SeriesEpisodeNameEntryGenqlSelection {
    seasonNumber?: boolean | number;
    episodeNumber?: boolean | number;
    episodeName?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface SeriesEpisodeNamesGenqlSelection {
    tryFind?: (SeriesEpisodeNameEntryGenqlSelection & {
        __args: {
            season: Scalars['String'];
            episode: Scalars['String'];
        };
    });
    seriesTitle?: boolean | number;
    seriesYear?: boolean | number;
    episodes?: SeriesEpisodeNameEntryGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface SetFileNameTemplatePayloadGenqlSelection {
    userFileNameTemplate?: UserFileNameTemplateGenqlSelection;
    errors?: SetFileNameTemplateErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface TitleGenqlSelection {
    index?: boolean | number;
    chapterCount?: boolean | number;
    length?: boolean | number;
    displaySize?: boolean | number;
    size?: boolean | number;
    playlist?: boolean | number;
    segmentMap?: boolean | number;
    comment?: boolean | number;
    javaComment?: boolean | number;
    segments?: SegmentGenqlSelection;
    lengthAsTimeSpan?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UpdateBoxsetPayloadGenqlSelection {
    userContributionBoxset?: UserContributionBoxsetGenqlSelection;
    errors?: UpdateBoxsetErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UpdateContributionPayloadGenqlSelection {
    userContribution?: UserContributionGenqlSelection;
    errors?: UpdateContributionErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UpdateDiscPayloadGenqlSelection {
    userContributionDisc?: UserContributionDiscGenqlSelection;
    errors?: UpdateDiscErrorGenqlSelection;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionGenqlSelection {
    id?: boolean | number;
    userId?: boolean | number;
    created?: boolean | number;
    status?: boolean | number;
    boxsetId?: boolean | number;
    boxset?: UserContributionBoxsetGenqlSelection;
    discs?: (UserContributionDiscGenqlSelection & {
        __args?: {
            where?: (UserContributionDiscFilterInput | null);
            order?: (UserContributionDiscSortInput[] | null);
        };
    });
    hashItems?: (UserContributionDiscHashItemGenqlSelection & {
        __args?: {
            where?: (UserContributionDiscHashItemFilterInput | null);
            order?: (UserContributionDiscHashItemSortInput[] | null);
        };
    });
    mediaType?: boolean | number;
    externalId?: boolean | number;
    externalProvider?: boolean | number;
    releaseDate?: boolean | number;
    asin?: boolean | number;
    upc?: boolean | number;
    frontImageUrl?: boolean | number;
    backImageUrl?: boolean | number;
    releaseTitle?: boolean | number;
    releaseSlug?: boolean | number;
    locale?: boolean | number;
    regionCode?: boolean | number;
    title?: boolean | number;
    year?: boolean | number;
    titleSlug?: boolean | number;
    encodedId?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionAudioTrackGenqlSelection {
    id?: boolean | number;
    index?: boolean | number;
    title?: boolean | number;
    item?: UserContributionDiscItemGenqlSelection;
    encodedId?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionBoxsetGenqlSelection {
    id?: boolean | number;
    userId?: boolean | number;
    created?: boolean | number;
    status?: boolean | number;
    title?: boolean | number;
    sortTitle?: boolean | number;
    slug?: boolean | number;
    frontImageUrl?: boolean | number;
    backImageUrl?: boolean | number;
    asin?: boolean | number;
    upc?: boolean | number;
    releaseDate?: boolean | number;
    locale?: boolean | number;
    regionCode?: boolean | number;
    members?: (UserContributionBoxsetMemberGenqlSelection & {
        __args?: {
            where?: (UserContributionBoxsetMemberFilterInput | null);
            order?: (UserContributionBoxsetMemberSortInput[] | null);
        };
    });
    encodedId?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionBoxsetMemberGenqlSelection {
    id?: boolean | number;
    boxset?: UserContributionBoxsetGenqlSelection;
    disc?: UserContributionDiscGenqlSelection;
    sortOrder?: boolean | number;
    existingDiscPath?: boolean | number;
    existingDiscName?: boolean | number;
    existingDiscFormat?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionChapterGenqlSelection {
    id?: boolean | number;
    index?: boolean | number;
    title?: boolean | number;
    item?: UserContributionDiscItemGenqlSelection;
    encodedId?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionDiscGenqlSelection {
    id?: boolean | number;
    userContribution?: UserContributionGenqlSelection;
    contentHash?: boolean | number;
    globalDiscId?: boolean | number;
    format?: boolean | number;
    name?: boolean | number;
    slug?: boolean | number;
    logsUploaded?: boolean | number;
    logUploadError?: boolean | number;
    index?: boolean | number;
    existingDiscPath?: boolean | number;
    items?: (UserContributionDiscItemGenqlSelection & {
        __args?: {
            where?: (UserContributionDiscItemFilterInput | null);
            order?: (UserContributionDiscItemSortInput[] | null);
        };
    });
    encodedId?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionDiscHashItemGenqlSelection {
    id?: boolean | number;
    userContribution?: UserContributionGenqlSelection;
    discHash?: boolean | number;
    index?: boolean | number;
    name?: boolean | number;
    creationTime?: boolean | number;
    size?: boolean | number;
    encodedId?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionDiscItemGenqlSelection {
    id?: boolean | number;
    disc?: UserContributionDiscGenqlSelection;
    name?: boolean | number;
    source?: boolean | number;
    duration?: boolean | number;
    size?: boolean | number;
    chapterCount?: boolean | number;
    segmentCount?: boolean | number;
    segmentMap?: boolean | number;
    type?: boolean | number;
    description?: boolean | number;
    season?: boolean | number;
    episode?: boolean | number;
    chapters?: (UserContributionChapterGenqlSelection & {
        __args?: {
            where?: (UserContributionChapterFilterInput | null);
            order?: (UserContributionChapterSortInput[] | null);
        };
    });
    audioTracks?: (UserContributionAudioTrackGenqlSelection & {
        __args?: {
            where?: (UserContributionAudioTrackFilterInput | null);
            order?: (UserContributionAudioTrackSortInput[] | null);
        };
    });
    subtitleTracks?: (UserContributionSubtitleTrackGenqlSelection & {
        __args?: {
            where?: (UserContributionSubtitleTrackFilterInput | null);
            order?: (UserContributionSubtitleTrackSortInput[] | null);
        };
    });
    encodedId?: boolean | number;
    filename?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserContributionSubtitleTrackGenqlSelection {
    id?: boolean | number;
    index?: boolean | number;
    title?: boolean | number;
    item?: UserContributionDiscItemGenqlSelection;
    encodedId?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserFileNameTemplateGenqlSelection {
    id?: boolean | number;
    userId?: boolean | number;
    itemType?: boolean | number;
    template?: boolean | number;
    updatedAt?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface UserMessageGenqlSelection {
    id?: boolean | number;
    contributionId?: boolean | number;
    boxsetId?: boolean | number;
    contribution?: UserContributionGenqlSelection;
    boxset?: UserContributionBoxsetGenqlSelection;
    fromUserId?: boolean | number;
    toUserId?: boolean | number;
    message?: boolean | number;
    isRead?: boolean | number;
    createdAt?: boolean | number;
    type?: boolean | number;
    __typename?: boolean | number;
    __scalar?: boolean | number;
}
export interface AddAudioTrackToItemErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_DiscItemNotFoundError?: DiscItemNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface AddChapterToItemErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_DiscItemNotFoundError?: DiscItemNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface AddDiscToBoxsetErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_ContributionAlreadyInBoxsetError?: ContributionAlreadyInBoxsetErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidBoxsetStatusError?: InvalidBoxsetStatusErrorGenqlSelection;
    on_MismatchedReleaseSlugError?: MismatchedReleaseSlugErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface AddExistingDiscToBoxsetErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidDiscPathError?: InvalidDiscPathErrorGenqlSelection;
    on_ExistingDiscAlreadyInBoxsetError?: ExistingDiscAlreadyInBoxsetErrorGenqlSelection;
    on_InvalidBoxsetStatusError?: InvalidBoxsetStatusErrorGenqlSelection;
    on_MismatchedReleaseSlugError?: MismatchedReleaseSlugErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface AddItemToDiscErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface AddSubtitleTrackToItemErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_DiscItemNotFoundError?: DiscItemNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface AttachGlobalDiscIdErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface CreateBoxsetErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface CreateContributionErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidBoxsetStatusError?: InvalidBoxsetStatusErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface CreateDiscErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidDiscPathError?: InvalidDiscPathErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface DeleteBoxsetErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidBoxsetStatusError?: InvalidBoxsetStatusErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface DeleteContributionErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidContributionStatusError?: InvalidContributionStatusErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface DeleteDiscFromContributionErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidContributionStatusError?: InvalidContributionStatusErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface DeleteFileNameTemplateErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface DeleteItemFromDiscErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_DiscItemNotFoundError?: DiscItemNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface DiscLogsErrorGenqlSelection {
    on_LogsNotFoundError?: LogsNotFoundErrorGenqlSelection;
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_CouldNotParseLogsError?: CouldNotParseLogsErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface DiscUploadStatusErrorGenqlSelection {
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_FieldRequiredError?: FieldRequiredErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface EditItemOnDiscErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_DiscItemNotFoundError?: DiscItemNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface EpisodeNamesErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_ExternalDataNotFoundError?: ExternalDataNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface ExternalDataErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_ExternalDataNotFoundError?: ExternalDataNotFoundErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface ExternalDataForContributionErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_ExternalDataSerializationError?: ExternalDataSerializationErrorGenqlSelection;
    on_ExternalDataNotFoundError?: ExternalDataNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface HashDiscErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface MarkBoxsetMessagesAsReadErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface MarkMessagesAsReadErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface RemoveBoxsetMemberErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidBoxsetStatusError?: InvalidBoxsetStatusErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface RemoveDiscFromBoxsetErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidBoxsetStatusError?: InvalidBoxsetStatusErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface ReorderBoxsetMembersErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidBoxsetStatusError?: InvalidBoxsetStatusErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface ReorderDiscsErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface RevokeApiKeyErrorGenqlSelection {
    on_ApiKeyNotFoundError?: ApiKeyNotFoundErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface SendAdminBoxsetMessageErrorGenqlSelection {
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface SendAdminMessageErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface SendBoxsetUserMessageErrorGenqlSelection {
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface SendUserMessageErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface SetFileNameTemplateErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface UpdateBoxsetErrorGenqlSelection {
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_BoxsetNotFoundError?: BoxsetNotFoundErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface UpdateContributionErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_InvalidContributionStatusError?: InvalidContributionStatusErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface UpdateDiscErrorGenqlSelection {
    on_ContributionNotFoundError?: ContributionNotFoundErrorGenqlSelection;
    on_DiscNotFoundError?: DiscNotFoundErrorGenqlSelection;
    on_AuthenticationError?: AuthenticationErrorGenqlSelection;
    on_InvalidIdError?: InvalidIdErrorGenqlSelection;
    on_InvalidOwnershipError?: InvalidOwnershipErrorGenqlSelection;
    on_Error?: ErrorGenqlSelection;
    __typename?: boolean | number;
}
export interface AddAudioTrackToItemInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
    itemId: Scalars['String'];
    trackIndex: Scalars['Int'];
    trackName: Scalars['String'];
}
export interface AddChapterToItemInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
    itemId: Scalars['String'];
    chapterIndex: Scalars['Int'];
    chapterName: Scalars['String'];
}
export interface AddDiscToBoxsetInput {
    boxsetId: Scalars['String'];
    discId: Scalars['String'];
}
export interface AddExistingDiscToBoxsetInput {
    boxsetId: Scalars['String'];
    existingDiscPath: Scalars['String'];
    discName: Scalars['String'];
    discFormat: Scalars['String'];
}
export interface AddItemToDiscInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
    name: Scalars['String'];
    source: Scalars['String'];
    duration: Scalars['String'];
    size: Scalars['String'];
    chapterCount: Scalars['Int'];
    segmentCount: Scalars['Int'];
    segmentMap: Scalars['String'];
    type: Scalars['String'];
    description?: (Scalars['String'] | null);
    season?: (Scalars['String'] | null);
    episode?: (Scalars['String'] | null);
}
export interface AddSubtitleTrackToItemInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
    itemId: Scalars['String'];
    trackIndex: Scalars['Int'];
    trackName: Scalars['String'];
}
export interface ApiKeyInfoFilterInput {
    and?: (ApiKeyInfoFilterInput[] | null);
    or?: (ApiKeyInfoFilterInput[] | null);
    name?: (StringOperationFilterInput | null);
    keyPrefix?: (StringOperationFilterInput | null);
    isActive?: (BooleanOperationFilterInput | null);
    logUsage?: (BooleanOperationFilterInput | null);
    roles?: (StringOperationFilterInput | null);
    ownerEmail?: (StringOperationFilterInput | null);
    createdAt?: (DateTimeOperationFilterInput | null);
    expiresAt?: (DateTimeOperationFilterInput | null);
    lastUsedAt?: (DateTimeOperationFilterInput | null);
}
export interface ApiKeyInfoSortInput {
    name?: (SortEnumType | null);
    keyPrefix?: (SortEnumType | null);
    isActive?: (SortEnumType | null);
    logUsage?: (SortEnumType | null);
    roles?: (SortEnumType | null);
    ownerEmail?: (SortEnumType | null);
    createdAt?: (SortEnumType | null);
    expiresAt?: (SortEnumType | null);
    lastUsedAt?: (SortEnumType | null);
}
export interface ApiKeyUsageLogInfoFilterInput {
    and?: (ApiKeyUsageLogInfoFilterInput[] | null);
    or?: (ApiKeyUsageLogInfoFilterInput[] | null);
    apiKeyPrefix?: (StringOperationFilterInput | null);
    apiKeyName?: (StringOperationFilterInput | null);
    timestamp?: (DateTimeOperationFilterInput | null);
    operationName?: (StringOperationFilterInput | null);
    fieldCost?: (FloatOperationFilterInput | null);
    typeCost?: (FloatOperationFilterInput | null);
    durationMs?: (IntOperationFilterInput | null);
}
export interface ApiKeyUsageLogInfoSortInput {
    apiKeyPrefix?: (SortEnumType | null);
    apiKeyName?: (SortEnumType | null);
    timestamp?: (SortEnumType | null);
    operationName?: (SortEnumType | null);
    fieldCost?: (SortEnumType | null);
    typeCost?: (SortEnumType | null);
    durationMs?: (SortEnumType | null);
}
export interface AttachGlobalDiscIdInput {
    files: FileHashInfoInput[];
    globalDiscId: Scalars['String'];
    mediaItemSlug?: (Scalars['String'] | null);
    boxsetSlug?: (Scalars['String'] | null);
    releaseSlug?: (Scalars['String'] | null);
    discSlug?: (Scalars['String'] | null);
    discIndex?: (Scalars['Int'] | null);
}
export interface BooleanOperationFilterInput {
    eq?: (Scalars['Boolean'] | null);
    neq?: (Scalars['Boolean'] | null);
}
export interface BoxsetMutationRequestInput {
    title: Scalars['String'];
    sortTitle?: (Scalars['String'] | null);
    slug: Scalars['String'];
    frontImageUrl?: (Scalars['String'] | null);
    backImageUrl?: (Scalars['String'] | null);
    asin?: (Scalars['String'] | null);
    upc?: (Scalars['String'] | null);
    releaseDate?: (Scalars['DateTime'] | null);
    locale?: (Scalars['String'] | null);
    regionCode?: (Scalars['String'] | null);
}
export interface ContributionHistorySortInput {
    id?: (SortEnumType | null);
    contributionId?: (SortEnumType | null);
    timeStamp?: (SortEnumType | null);
    description?: (SortEnumType | null);
    userId?: (SortEnumType | null);
    type?: (SortEnumType | null);
}
export interface ContributionMutationRequestInput {
    mediaType: Scalars['String'];
    externalId: Scalars['String'];
    externalProvider: Scalars['String'];
    releaseDate: Scalars['DateTime'];
    asin: Scalars['String'];
    upc: Scalars['String'];
    frontImageUrl: Scalars['String'];
    backImageUrl?: (Scalars['String'] | null);
    releaseTitle: Scalars['String'];
    releaseSlug: Scalars['String'];
    regionCode: Scalars['String'];
    locale: Scalars['String'];
    title: Scalars['String'];
    year: Scalars['String'];
    storageId: Scalars['UUID'];
    status: UserContributionStatus;
    boxsetId?: (Scalars['String'] | null);
}
export interface CreateBoxsetInput {
    input: BoxsetMutationRequestInput;
}
export interface CreateContributionInput {
    input: ContributionMutationRequestInput;
}
export interface CreateDiscInput {
    contributionId: Scalars['String'];
    contentHash: Scalars['String'];
    format: Scalars['String'];
    name: Scalars['String'];
    slug: Scalars['String'];
    existingDiscPath?: (Scalars['String'] | null);
    globalDiscId?: (Scalars['String'] | null);
}
export interface DateTimeOperationFilterInput {
    eq?: (Scalars['DateTime'] | null);
    neq?: (Scalars['DateTime'] | null);
    in?: ((Scalars['DateTime'] | null)[] | null);
    nin?: ((Scalars['DateTime'] | null)[] | null);
    gt?: (Scalars['DateTime'] | null);
    ngt?: (Scalars['DateTime'] | null);
    gte?: (Scalars['DateTime'] | null);
    ngte?: (Scalars['DateTime'] | null);
    lt?: (Scalars['DateTime'] | null);
    nlt?: (Scalars['DateTime'] | null);
    lte?: (Scalars['DateTime'] | null);
    nlte?: (Scalars['DateTime'] | null);
}
export interface DeleteBoxsetInput {
    boxsetId: Scalars['String'];
}
export interface DeleteContributionInput {
    contributionId: Scalars['String'];
}
export interface DeleteDiscFromContributionInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
}
export interface DeleteFileNameTemplateInput {
    itemType: Scalars['String'];
}
export interface DeleteItemFromDiscInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
    itemId: Scalars['String'];
}
export interface DiscLogsInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
}
export interface DiscUploadStatusInput {
    discId: Scalars['String'];
}
export interface EditItemOnDiscInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
    itemId: Scalars['String'];
    name: Scalars['String'];
    source: Scalars['String'];
    duration: Scalars['String'];
    size: Scalars['String'];
    chapterCount: Scalars['Int'];
    segmentCount: Scalars['Int'];
    segmentMap: Scalars['String'];
    type: Scalars['String'];
    description?: (Scalars['String'] | null);
    season?: (Scalars['String'] | null);
    episode?: (Scalars['String'] | null);
}
export interface EncodedIdOperationFilterInput {
    and?: (EncodedIdOperationFilterInput[] | null);
    or?: (EncodedIdOperationFilterInput[] | null);
    eq?: (Scalars['EncodedIdFilter'] | null);
    neq?: (Scalars['EncodedIdFilter'] | null);
}
export interface EpisodeNamesInput {
    contributionId: Scalars['String'];
}
export interface ExternalDataForContributionInput {
    contributionId: Scalars['String'];
}
export interface ExternalDataInput {
    externalId: Scalars['String'];
    mediaType: Scalars['String'];
    provider: Scalars['String'];
}
export interface FileHashInfoInput {
    index: Scalars['Int'];
    name?: (Scalars['String'] | null);
    creationTime: Scalars['DateTime'];
    size: Scalars['Long'];
}
export interface FloatOperationFilterInput {
    eq?: (Scalars['Float'] | null);
    neq?: (Scalars['Float'] | null);
    in?: ((Scalars['Float'] | null)[] | null);
    nin?: ((Scalars['Float'] | null)[] | null);
    gt?: (Scalars['Float'] | null);
    ngt?: (Scalars['Float'] | null);
    gte?: (Scalars['Float'] | null);
    ngte?: (Scalars['Float'] | null);
    lt?: (Scalars['Float'] | null);
    nlt?: (Scalars['Float'] | null);
    lte?: (Scalars['Float'] | null);
    nlte?: (Scalars['Float'] | null);
}
export interface GenerateApiKeyInput {
    name: Scalars['String'];
    ownerEmail: Scalars['String'];
    roles?: (Scalars['String'][] | null);
    expiresAt?: (Scalars['DateTime'] | null);
}
export interface HashDiscInput {
    contributionId: Scalars['String'];
    files: FileHashInfoInput[];
}
export interface IntOperationFilterInput {
    eq?: (Scalars['Int'] | null);
    neq?: (Scalars['Int'] | null);
    in?: ((Scalars['Int'] | null)[] | null);
    nin?: ((Scalars['Int'] | null)[] | null);
    gt?: (Scalars['Int'] | null);
    ngt?: (Scalars['Int'] | null);
    gte?: (Scalars['Int'] | null);
    ngte?: (Scalars['Int'] | null);
    lt?: (Scalars['Int'] | null);
    nlt?: (Scalars['Int'] | null);
    lte?: (Scalars['Int'] | null);
    nlte?: (Scalars['Int'] | null);
}
export interface ListEncodedIdFilterTypeOfUserContributionAudioTrackFilterInput {
    all?: (UserContributionAudioTrackFilterInput | null);
    none?: (UserContributionAudioTrackFilterInput | null);
    some?: (UserContributionAudioTrackFilterInput | null);
    any?: (Scalars['Boolean'] | null);
}
export interface ListEncodedIdFilterTypeOfUserContributionChapterFilterInput {
    all?: (UserContributionChapterFilterInput | null);
    none?: (UserContributionChapterFilterInput | null);
    some?: (UserContributionChapterFilterInput | null);
    any?: (Scalars['Boolean'] | null);
}
export interface ListEncodedIdFilterTypeOfUserContributionDiscFilterInput {
    all?: (UserContributionDiscFilterInput | null);
    none?: (UserContributionDiscFilterInput | null);
    some?: (UserContributionDiscFilterInput | null);
    any?: (Scalars['Boolean'] | null);
}
export interface ListEncodedIdFilterTypeOfUserContributionDiscHashItemFilterInput {
    all?: (UserContributionDiscHashItemFilterInput | null);
    none?: (UserContributionDiscHashItemFilterInput | null);
    some?: (UserContributionDiscHashItemFilterInput | null);
    any?: (Scalars['Boolean'] | null);
}
export interface ListEncodedIdFilterTypeOfUserContributionDiscItemFilterInput {
    all?: (UserContributionDiscItemFilterInput | null);
    none?: (UserContributionDiscItemFilterInput | null);
    some?: (UserContributionDiscItemFilterInput | null);
    any?: (Scalars['Boolean'] | null);
}
export interface ListEncodedIdFilterTypeOfUserContributionSubtitleTrackFilterInput {
    all?: (UserContributionSubtitleTrackFilterInput | null);
    none?: (UserContributionSubtitleTrackFilterInput | null);
    some?: (UserContributionSubtitleTrackFilterInput | null);
    any?: (Scalars['Boolean'] | null);
}
export interface ListFilterInputTypeOfUserContributionBoxsetMemberFilterInput {
    all?: (UserContributionBoxsetMemberFilterInput | null);
    none?: (UserContributionBoxsetMemberFilterInput | null);
    some?: (UserContributionBoxsetMemberFilterInput | null);
    any?: (Scalars['Boolean'] | null);
}
export interface LongOperationFilterInput {
    eq?: (Scalars['Long'] | null);
    neq?: (Scalars['Long'] | null);
    in?: ((Scalars['Long'] | null)[] | null);
    nin?: ((Scalars['Long'] | null)[] | null);
    gt?: (Scalars['Long'] | null);
    ngt?: (Scalars['Long'] | null);
    gte?: (Scalars['Long'] | null);
    ngte?: (Scalars['Long'] | null);
    lt?: (Scalars['Long'] | null);
    nlt?: (Scalars['Long'] | null);
    lte?: (Scalars['Long'] | null);
    nlte?: (Scalars['Long'] | null);
}
export interface MarkBoxsetMessagesAsReadInput {
    boxsetId: Scalars['String'];
}
export interface MarkMessagesAsReadInput {
    contributionId: Scalars['String'];
}
export interface RemoveBoxsetMemberInput {
    boxsetId: Scalars['String'];
    memberId: Scalars['Int'];
}
export interface RemoveDiscFromBoxsetInput {
    boxsetId: Scalars['String'];
    discId: Scalars['String'];
}
export interface ReorderBoxsetMembersInput {
    boxsetId: Scalars['String'];
    memberIds: Scalars['Int'][];
}
export interface ReorderDiscsInput {
    contributionId: Scalars['String'];
    discIds: Scalars['String'][];
}
export interface RevokeApiKeyInput {
    keyPrefix: Scalars['String'];
}
export interface SendAdminBoxsetMessageInput {
    boxsetId: Scalars['String'];
    message: Scalars['String'];
}
export interface SendAdminMessageInput {
    contributionId: Scalars['String'];
    message: Scalars['String'];
}
export interface SendBoxsetUserMessageInput {
    boxsetId: Scalars['String'];
    message: Scalars['String'];
}
export interface SendUserMessageInput {
    contributionId: Scalars['String'];
    message: Scalars['String'];
}
export interface SetFileNameTemplateInput {
    itemType: Scalars['String'];
    template: Scalars['String'];
}
export interface StringOperationFilterInput {
    and?: (StringOperationFilterInput[] | null);
    or?: (StringOperationFilterInput[] | null);
    eq?: (Scalars['String'] | null);
    neq?: (Scalars['String'] | null);
    contains?: (Scalars['String'] | null);
    ncontains?: (Scalars['String'] | null);
    in?: ((Scalars['String'] | null)[] | null);
    nin?: ((Scalars['String'] | null)[] | null);
    startsWith?: (Scalars['String'] | null);
    nstartsWith?: (Scalars['String'] | null);
    endsWith?: (Scalars['String'] | null);
    nendsWith?: (Scalars['String'] | null);
}
export interface UpdateBoxsetInput {
    boxsetId: Scalars['String'];
    input: BoxsetMutationRequestInput;
}
export interface UpdateContributionInput {
    contributionId: Scalars['String'];
    asin: Scalars['String'];
    upc: Scalars['String'];
    releaseDate: Scalars['DateTime'];
    releaseTitle: Scalars['String'];
    releaseSlug: Scalars['String'];
    locale: Scalars['String'];
    regionCode: Scalars['String'];
    frontImageUrl?: (Scalars['String'] | null);
    backImageUrl?: (Scalars['String'] | null);
    deleteBackImage: Scalars['Boolean'];
}
export interface UpdateDiscInput {
    contributionId: Scalars['String'];
    discId: Scalars['String'];
    format: Scalars['String'];
    name: Scalars['String'];
    slug: Scalars['String'];
}
export interface UserContributionAudioTrackFilterInput {
    and?: (UserContributionAudioTrackFilterInput[] | null);
    or?: (UserContributionAudioTrackFilterInput[] | null);
    encodedId?: (EncodedIdOperationFilterInput | null);
    index?: (IntOperationFilterInput | null);
    title?: (StringOperationFilterInput | null);
    item?: (UserContributionDiscItemFilterInput | null);
}
export interface UserContributionAudioTrackSortInput {
    id?: (SortEnumType | null);
    index?: (SortEnumType | null);
    title?: (SortEnumType | null);
    item?: (UserContributionDiscItemSortInput | null);
}
export interface UserContributionBoxsetFilterInput {
    and?: (UserContributionBoxsetFilterInput[] | null);
    or?: (UserContributionBoxsetFilterInput[] | null);
    encodedId?: (EncodedIdOperationFilterInput | null);
    userId?: (StringOperationFilterInput | null);
    created?: (DateTimeOperationFilterInput | null);
    status?: (UserContributionStatusOperationFilterInput | null);
    title?: (StringOperationFilterInput | null);
    sortTitle?: (StringOperationFilterInput | null);
    slug?: (StringOperationFilterInput | null);
    frontImageUrl?: (StringOperationFilterInput | null);
    backImageUrl?: (StringOperationFilterInput | null);
    asin?: (StringOperationFilterInput | null);
    upc?: (StringOperationFilterInput | null);
    releaseDate?: (DateTimeOperationFilterInput | null);
    locale?: (StringOperationFilterInput | null);
    regionCode?: (StringOperationFilterInput | null);
    members?: (ListFilterInputTypeOfUserContributionBoxsetMemberFilterInput | null);
}
export interface UserContributionBoxsetMemberFilterInput {
    and?: (UserContributionBoxsetMemberFilterInput[] | null);
    or?: (UserContributionBoxsetMemberFilterInput[] | null);
    id?: (IntOperationFilterInput | null);
    boxset?: (UserContributionBoxsetFilterInput | null);
    disc?: (UserContributionDiscFilterInput | null);
    sortOrder?: (IntOperationFilterInput | null);
    existingDiscPath?: (StringOperationFilterInput | null);
    existingDiscName?: (StringOperationFilterInput | null);
    existingDiscFormat?: (StringOperationFilterInput | null);
}
export interface UserContributionBoxsetMemberSortInput {
    id?: (SortEnumType | null);
    boxset?: (UserContributionBoxsetSortInput | null);
    disc?: (UserContributionDiscSortInput | null);
    sortOrder?: (SortEnumType | null);
    existingDiscPath?: (SortEnumType | null);
    existingDiscName?: (SortEnumType | null);
    existingDiscFormat?: (SortEnumType | null);
}
export interface UserContributionBoxsetSortInput {
    id?: (SortEnumType | null);
    userId?: (SortEnumType | null);
    created?: (SortEnumType | null);
    status?: (SortEnumType | null);
    title?: (SortEnumType | null);
    sortTitle?: (SortEnumType | null);
    slug?: (SortEnumType | null);
    frontImageUrl?: (SortEnumType | null);
    backImageUrl?: (SortEnumType | null);
    asin?: (SortEnumType | null);
    upc?: (SortEnumType | null);
    releaseDate?: (SortEnumType | null);
    locale?: (SortEnumType | null);
    regionCode?: (SortEnumType | null);
}
export interface UserContributionChapterFilterInput {
    and?: (UserContributionChapterFilterInput[] | null);
    or?: (UserContributionChapterFilterInput[] | null);
    encodedId?: (EncodedIdOperationFilterInput | null);
    index?: (IntOperationFilterInput | null);
    title?: (StringOperationFilterInput | null);
    item?: (UserContributionDiscItemFilterInput | null);
}
export interface UserContributionChapterSortInput {
    id?: (SortEnumType | null);
    index?: (SortEnumType | null);
    title?: (SortEnumType | null);
    item?: (UserContributionDiscItemSortInput | null);
}
export interface UserContributionDiscFilterInput {
    and?: (UserContributionDiscFilterInput[] | null);
    or?: (UserContributionDiscFilterInput[] | null);
    encodedId?: (EncodedIdOperationFilterInput | null);
    userContribution?: (UserContributionFilterInput | null);
    contentHash?: (StringOperationFilterInput | null);
    globalDiscId?: (StringOperationFilterInput | null);
    format?: (StringOperationFilterInput | null);
    name?: (StringOperationFilterInput | null);
    slug?: (StringOperationFilterInput | null);
    logsUploaded?: (BooleanOperationFilterInput | null);
    logUploadError?: (StringOperationFilterInput | null);
    index?: (IntOperationFilterInput | null);
    existingDiscPath?: (StringOperationFilterInput | null);
    items?: (ListEncodedIdFilterTypeOfUserContributionDiscItemFilterInput | null);
}
export interface UserContributionDiscHashItemFilterInput {
    and?: (UserContributionDiscHashItemFilterInput[] | null);
    or?: (UserContributionDiscHashItemFilterInput[] | null);
    encodedId?: (EncodedIdOperationFilterInput | null);
    userContribution?: (UserContributionFilterInput | null);
    discHash?: (StringOperationFilterInput | null);
    index?: (IntOperationFilterInput | null);
    name?: (StringOperationFilterInput | null);
    creationTime?: (DateTimeOperationFilterInput | null);
    size?: (LongOperationFilterInput | null);
}
export interface UserContributionDiscHashItemSortInput {
    id?: (SortEnumType | null);
    userContribution?: (UserContributionSortInput | null);
    discHash?: (SortEnumType | null);
    index?: (SortEnumType | null);
    name?: (SortEnumType | null);
    creationTime?: (SortEnumType | null);
    size?: (SortEnumType | null);
}
export interface UserContributionDiscItemFilterInput {
    and?: (UserContributionDiscItemFilterInput[] | null);
    or?: (UserContributionDiscItemFilterInput[] | null);
    encodedId?: (EncodedIdOperationFilterInput | null);
    disc?: (UserContributionDiscFilterInput | null);
    name?: (StringOperationFilterInput | null);
    source?: (StringOperationFilterInput | null);
    duration?: (StringOperationFilterInput | null);
    size?: (StringOperationFilterInput | null);
    chapterCount?: (IntOperationFilterInput | null);
    segmentCount?: (IntOperationFilterInput | null);
    segmentMap?: (StringOperationFilterInput | null);
    type?: (StringOperationFilterInput | null);
    description?: (StringOperationFilterInput | null);
    season?: (StringOperationFilterInput | null);
    episode?: (StringOperationFilterInput | null);
    chapters?: (ListEncodedIdFilterTypeOfUserContributionChapterFilterInput | null);
    audioTracks?: (ListEncodedIdFilterTypeOfUserContributionAudioTrackFilterInput | null);
    subtitleTracks?: (ListEncodedIdFilterTypeOfUserContributionSubtitleTrackFilterInput | null);
}
export interface UserContributionDiscItemSortInput {
    id?: (SortEnumType | null);
    disc?: (UserContributionDiscSortInput | null);
    name?: (SortEnumType | null);
    source?: (SortEnumType | null);
    duration?: (SortEnumType | null);
    size?: (SortEnumType | null);
    chapterCount?: (SortEnumType | null);
    segmentCount?: (SortEnumType | null);
    segmentMap?: (SortEnumType | null);
    type?: (SortEnumType | null);
    description?: (SortEnumType | null);
    season?: (SortEnumType | null);
    episode?: (SortEnumType | null);
}
export interface UserContributionDiscSortInput {
    id?: (SortEnumType | null);
    userContribution?: (UserContributionSortInput | null);
    contentHash?: (SortEnumType | null);
    globalDiscId?: (SortEnumType | null);
    format?: (SortEnumType | null);
    name?: (SortEnumType | null);
    slug?: (SortEnumType | null);
    logsUploaded?: (SortEnumType | null);
    logUploadError?: (SortEnumType | null);
    index?: (SortEnumType | null);
    existingDiscPath?: (SortEnumType | null);
}
export interface UserContributionFilterInput {
    and?: (UserContributionFilterInput[] | null);
    or?: (UserContributionFilterInput[] | null);
    encodedId?: (EncodedIdOperationFilterInput | null);
    userId?: (StringOperationFilterInput | null);
    created?: (DateTimeOperationFilterInput | null);
    status?: (UserContributionStatusOperationFilterInput | null);
    boxsetId?: (IntOperationFilterInput | null);
    boxset?: (UserContributionBoxsetFilterInput | null);
    discs?: (ListEncodedIdFilterTypeOfUserContributionDiscFilterInput | null);
    hashItems?: (ListEncodedIdFilterTypeOfUserContributionDiscHashItemFilterInput | null);
    mediaType?: (StringOperationFilterInput | null);
    externalId?: (StringOperationFilterInput | null);
    externalProvider?: (StringOperationFilterInput | null);
    releaseDate?: (DateTimeOperationFilterInput | null);
    asin?: (StringOperationFilterInput | null);
    upc?: (StringOperationFilterInput | null);
    frontImageUrl?: (StringOperationFilterInput | null);
    backImageUrl?: (StringOperationFilterInput | null);
    releaseTitle?: (StringOperationFilterInput | null);
    releaseSlug?: (StringOperationFilterInput | null);
    locale?: (StringOperationFilterInput | null);
    regionCode?: (StringOperationFilterInput | null);
    title?: (StringOperationFilterInput | null);
    year?: (StringOperationFilterInput | null);
    titleSlug?: (StringOperationFilterInput | null);
}
export interface UserContributionSortInput {
    id?: (SortEnumType | null);
    userId?: (SortEnumType | null);
    created?: (SortEnumType | null);
    status?: (SortEnumType | null);
    boxsetId?: (SortEnumType | null);
    boxset?: (UserContributionBoxsetSortInput | null);
    mediaType?: (SortEnumType | null);
    externalId?: (SortEnumType | null);
    externalProvider?: (SortEnumType | null);
    releaseDate?: (SortEnumType | null);
    asin?: (SortEnumType | null);
    upc?: (SortEnumType | null);
    frontImageUrl?: (SortEnumType | null);
    backImageUrl?: (SortEnumType | null);
    releaseTitle?: (SortEnumType | null);
    releaseSlug?: (SortEnumType | null);
    locale?: (SortEnumType | null);
    regionCode?: (SortEnumType | null);
    title?: (SortEnumType | null);
    year?: (SortEnumType | null);
    titleSlug?: (SortEnumType | null);
}
export interface UserContributionStatusOperationFilterInput {
    eq?: (UserContributionStatus | null);
    neq?: (UserContributionStatus | null);
    in?: (UserContributionStatus[] | null);
    nin?: (UserContributionStatus[] | null);
}
export interface UserContributionSubtitleTrackFilterInput {
    and?: (UserContributionSubtitleTrackFilterInput[] | null);
    or?: (UserContributionSubtitleTrackFilterInput[] | null);
    encodedId?: (EncodedIdOperationFilterInput | null);
    index?: (IntOperationFilterInput | null);
    title?: (StringOperationFilterInput | null);
    item?: (UserContributionDiscItemFilterInput | null);
}
export interface UserContributionSubtitleTrackSortInput {
    id?: (SortEnumType | null);
    index?: (SortEnumType | null);
    title?: (SortEnumType | null);
    item?: (UserContributionDiscItemSortInput | null);
}
export interface UserMessageSortInput {
    id?: (SortEnumType | null);
    contributionId?: (SortEnumType | null);
    boxsetId?: (SortEnumType | null);
    contribution?: (UserContributionSortInput | null);
    boxset?: (UserContributionBoxsetSortInput | null);
    fromUserId?: (SortEnumType | null);
    toUserId?: (SortEnumType | null);
    message?: (SortEnumType | null);
    isRead?: (SortEnumType | null);
    createdAt?: (SortEnumType | null);
    type?: (SortEnumType | null);
}
export type QueryGenqlSelection = ContributionQueryGenqlSelection;
export type MutationGenqlSelection = ContributionMutationsGenqlSelection;
export declare const isError: (obj?: {
    __typename?: any;
} | null) => obj is Error;
export declare const isAddAudioTrackToItemPayload: (obj?: {
    __typename?: any;
} | null) => obj is AddAudioTrackToItemPayload;
export declare const isAddChapterToItemPayload: (obj?: {
    __typename?: any;
} | null) => obj is AddChapterToItemPayload;
export declare const isAddDiscToBoxsetPayload: (obj?: {
    __typename?: any;
} | null) => obj is AddDiscToBoxsetPayload;
export declare const isAddExistingDiscToBoxsetPayload: (obj?: {
    __typename?: any;
} | null) => obj is AddExistingDiscToBoxsetPayload;
export declare const isAddItemToDiscPayload: (obj?: {
    __typename?: any;
} | null) => obj is AddItemToDiscPayload;
export declare const isAddSubtitleTrackToItemPayload: (obj?: {
    __typename?: any;
} | null) => obj is AddSubtitleTrackToItemPayload;
export declare const isAmazonProductMetadata: (obj?: {
    __typename?: any;
} | null) => obj is AmazonProductMetadata;
export declare const isApiKeyInfo: (obj?: {
    __typename?: any;
} | null) => obj is ApiKeyInfo;
export declare const isApiKeyNotFoundError: (obj?: {
    __typename?: any;
} | null) => obj is ApiKeyNotFoundError;
export declare const isApiKeyUsageLogInfo: (obj?: {
    __typename?: any;
} | null) => obj is ApiKeyUsageLogInfo;
export declare const isApiKeyUsageLogsConnection: (obj?: {
    __typename?: any;
} | null) => obj is ApiKeyUsageLogsConnection;
export declare const isApiKeyUsageLogsEdge: (obj?: {
    __typename?: any;
} | null) => obj is ApiKeyUsageLogsEdge;
export declare const isApiKeysConnection: (obj?: {
    __typename?: any;
} | null) => obj is ApiKeysConnection;
export declare const isApiKeysEdge: (obj?: {
    __typename?: any;
} | null) => obj is ApiKeysEdge;
export declare const isAttachDiscIdResult: (obj?: {
    __typename?: any;
} | null) => obj is AttachDiscIdResult;
export declare const isAttachGlobalDiscIdPayload: (obj?: {
    __typename?: any;
} | null) => obj is AttachGlobalDiscIdPayload;
export declare const isAuthenticationError: (obj?: {
    __typename?: any;
} | null) => obj is AuthenticationError;
export declare const isBoxsetChatConnection: (obj?: {
    __typename?: any;
} | null) => obj is BoxsetChatConnection;
export declare const isBoxsetChatEdge: (obj?: {
    __typename?: any;
} | null) => obj is BoxsetChatEdge;
export declare const isBoxsetContributionsConnection: (obj?: {
    __typename?: any;
} | null) => obj is BoxsetContributionsConnection;
export declare const isBoxsetContributionsEdge: (obj?: {
    __typename?: any;
} | null) => obj is BoxsetContributionsEdge;
export declare const isBoxsetNotFoundError: (obj?: {
    __typename?: any;
} | null) => obj is BoxsetNotFoundError;
export declare const isContributionAlreadyInBoxsetError: (obj?: {
    __typename?: any;
} | null) => obj is ContributionAlreadyInBoxsetError;
export declare const isContributionChatConnection: (obj?: {
    __typename?: any;
} | null) => obj is ContributionChatConnection;
export declare const isContributionChatEdge: (obj?: {
    __typename?: any;
} | null) => obj is ContributionChatEdge;
export declare const isContributionHistory: (obj?: {
    __typename?: any;
} | null) => obj is ContributionHistory;
export declare const isContributionHistoryConnection: (obj?: {
    __typename?: any;
} | null) => obj is ContributionHistoryConnection;
export declare const isContributionHistoryEdge: (obj?: {
    __typename?: any;
} | null) => obj is ContributionHistoryEdge;
export declare const isContributionMutations: (obj?: {
    __typename?: any;
} | null) => obj is ContributionMutations;
export declare const isContributionNotFoundError: (obj?: {
    __typename?: any;
} | null) => obj is ContributionNotFoundError;
export declare const isContributionQuery: (obj?: {
    __typename?: any;
} | null) => obj is ContributionQuery;
export declare const isContributionsConnection: (obj?: {
    __typename?: any;
} | null) => obj is ContributionsConnection;
export declare const isContributionsEdge: (obj?: {
    __typename?: any;
} | null) => obj is ContributionsEdge;
export declare const isCouldNotParseLogsError: (obj?: {
    __typename?: any;
} | null) => obj is CouldNotParseLogsError;
export declare const isCreateBoxsetPayload: (obj?: {
    __typename?: any;
} | null) => obj is CreateBoxsetPayload;
export declare const isCreateContributionPayload: (obj?: {
    __typename?: any;
} | null) => obj is CreateContributionPayload;
export declare const isCreateDiscPayload: (obj?: {
    __typename?: any;
} | null) => obj is CreateDiscPayload;
export declare const isDeleteBoxsetPayload: (obj?: {
    __typename?: any;
} | null) => obj is DeleteBoxsetPayload;
export declare const isDeleteContributionPayload: (obj?: {
    __typename?: any;
} | null) => obj is DeleteContributionPayload;
export declare const isDeleteDiscFromContributionPayload: (obj?: {
    __typename?: any;
} | null) => obj is DeleteDiscFromContributionPayload;
export declare const isDeleteFileNameTemplatePayload: (obj?: {
    __typename?: any;
} | null) => obj is DeleteFileNameTemplatePayload;
export declare const isDeleteItemFromDiscPayload: (obj?: {
    __typename?: any;
} | null) => obj is DeleteItemFromDiscPayload;
export declare const isDiscHash: (obj?: {
    __typename?: any;
} | null) => obj is DiscHash;
export declare const isDiscInfo: (obj?: {
    __typename?: any;
} | null) => obj is DiscInfo;
export declare const isDiscItemNotFoundError: (obj?: {
    __typename?: any;
} | null) => obj is DiscItemNotFoundError;
export declare const isDiscLogs: (obj?: {
    __typename?: any;
} | null) => obj is DiscLogs;
export declare const isDiscLogsPayload: (obj?: {
    __typename?: any;
} | null) => obj is DiscLogsPayload;
export declare const isDiscNotFoundError: (obj?: {
    __typename?: any;
} | null) => obj is DiscNotFoundError;
export declare const isDiscUploadStatus: (obj?: {
    __typename?: any;
} | null) => obj is DiscUploadStatus;
export declare const isDiscUploadStatusPayload: (obj?: {
    __typename?: any;
} | null) => obj is DiscUploadStatusPayload;
export declare const isEditItemOnDiscPayload: (obj?: {
    __typename?: any;
} | null) => obj is EditItemOnDiscPayload;
export declare const isEpisodeNamesPayload: (obj?: {
    __typename?: any;
} | null) => obj is EpisodeNamesPayload;
export declare const isExistingDiscAlreadyInBoxsetError: (obj?: {
    __typename?: any;
} | null) => obj is ExistingDiscAlreadyInBoxsetError;
export declare const isExternalDataForContributionPayload: (obj?: {
    __typename?: any;
} | null) => obj is ExternalDataForContributionPayload;
export declare const isExternalDataNotFoundError: (obj?: {
    __typename?: any;
} | null) => obj is ExternalDataNotFoundError;
export declare const isExternalDataPayload: (obj?: {
    __typename?: any;
} | null) => obj is ExternalDataPayload;
export declare const isExternalDataSerializationError: (obj?: {
    __typename?: any;
} | null) => obj is ExternalDataSerializationError;
export declare const isExternalMetadata: (obj?: {
    __typename?: any;
} | null) => obj is ExternalMetadata;
export declare const isFieldRequiredError: (obj?: {
    __typename?: any;
} | null) => obj is FieldRequiredError;
export declare const isGenerateApiKeyPayload: (obj?: {
    __typename?: any;
} | null) => obj is GenerateApiKeyPayload;
export declare const isHashDiscPayload: (obj?: {
    __typename?: any;
} | null) => obj is HashDiscPayload;
export declare const isHashInfoLogLine: (obj?: {
    __typename?: any;
} | null) => obj is HashInfoLogLine;
export declare const isInvalidBoxsetStatusError: (obj?: {
    __typename?: any;
} | null) => obj is InvalidBoxsetStatusError;
export declare const isInvalidContributionStatusError: (obj?: {
    __typename?: any;
} | null) => obj is InvalidContributionStatusError;
export declare const isInvalidDiscPathError: (obj?: {
    __typename?: any;
} | null) => obj is InvalidDiscPathError;
export declare const isInvalidIdError: (obj?: {
    __typename?: any;
} | null) => obj is InvalidIdError;
export declare const isInvalidOwnershipError: (obj?: {
    __typename?: any;
} | null) => obj is InvalidOwnershipError;
export declare const isLogsNotFoundError: (obj?: {
    __typename?: any;
} | null) => obj is LogsNotFoundError;
export declare const isMarkBoxsetMessagesAsReadPayload: (obj?: {
    __typename?: any;
} | null) => obj is MarkBoxsetMessagesAsReadPayload;
export declare const isMarkMessagesAsReadPayload: (obj?: {
    __typename?: any;
} | null) => obj is MarkMessagesAsReadPayload;
export declare const isMessageThread: (obj?: {
    __typename?: any;
} | null) => obj is MessageThread;
export declare const isMismatchedReleaseSlugError: (obj?: {
    __typename?: any;
} | null) => obj is MismatchedReleaseSlugError;
export declare const isMyBoxsetsConnection: (obj?: {
    __typename?: any;
} | null) => obj is MyBoxsetsConnection;
export declare const isMyBoxsetsEdge: (obj?: {
    __typename?: any;
} | null) => obj is MyBoxsetsEdge;
export declare const isMyContributionsConnection: (obj?: {
    __typename?: any;
} | null) => obj is MyContributionsConnection;
export declare const isMyContributionsEdge: (obj?: {
    __typename?: any;
} | null) => obj is MyContributionsEdge;
export declare const isMyMessagesConnection: (obj?: {
    __typename?: any;
} | null) => obj is MyMessagesConnection;
export declare const isMyMessagesEdge: (obj?: {
    __typename?: any;
} | null) => obj is MyMessagesEdge;
export declare const isPageInfo: (obj?: {
    __typename?: any;
} | null) => obj is PageInfo;
export declare const isRemoveBoxsetMemberPayload: (obj?: {
    __typename?: any;
} | null) => obj is RemoveBoxsetMemberPayload;
export declare const isRemoveDiscFromBoxsetPayload: (obj?: {
    __typename?: any;
} | null) => obj is RemoveDiscFromBoxsetPayload;
export declare const isReorderBoxsetMembersPayload: (obj?: {
    __typename?: any;
} | null) => obj is ReorderBoxsetMembersPayload;
export declare const isReorderDiscsPayload: (obj?: {
    __typename?: any;
} | null) => obj is ReorderDiscsPayload;
export declare const isRevokeApiKeyPayload: (obj?: {
    __typename?: any;
} | null) => obj is RevokeApiKeyPayload;
export declare const isSegment: (obj?: {
    __typename?: any;
} | null) => obj is Segment;
export declare const isSendAdminBoxsetMessagePayload: (obj?: {
    __typename?: any;
} | null) => obj is SendAdminBoxsetMessagePayload;
export declare const isSendAdminMessagePayload: (obj?: {
    __typename?: any;
} | null) => obj is SendAdminMessagePayload;
export declare const isSendBoxsetUserMessagePayload: (obj?: {
    __typename?: any;
} | null) => obj is SendBoxsetUserMessagePayload;
export declare const isSendUserMessagePayload: (obj?: {
    __typename?: any;
} | null) => obj is SendUserMessagePayload;
export declare const isSeriesEpisodeNameEntry: (obj?: {
    __typename?: any;
} | null) => obj is SeriesEpisodeNameEntry;
export declare const isSeriesEpisodeNames: (obj?: {
    __typename?: any;
} | null) => obj is SeriesEpisodeNames;
export declare const isSetFileNameTemplatePayload: (obj?: {
    __typename?: any;
} | null) => obj is SetFileNameTemplatePayload;
export declare const isTitle: (obj?: {
    __typename?: any;
} | null) => obj is Title;
export declare const isUpdateBoxsetPayload: (obj?: {
    __typename?: any;
} | null) => obj is UpdateBoxsetPayload;
export declare const isUpdateContributionPayload: (obj?: {
    __typename?: any;
} | null) => obj is UpdateContributionPayload;
export declare const isUpdateDiscPayload: (obj?: {
    __typename?: any;
} | null) => obj is UpdateDiscPayload;
export declare const isUserContribution: (obj?: {
    __typename?: any;
} | null) => obj is UserContribution;
export declare const isUserContributionAudioTrack: (obj?: {
    __typename?: any;
} | null) => obj is UserContributionAudioTrack;
export declare const isUserContributionBoxset: (obj?: {
    __typename?: any;
} | null) => obj is UserContributionBoxset;
export declare const isUserContributionBoxsetMember: (obj?: {
    __typename?: any;
} | null) => obj is UserContributionBoxsetMember;
export declare const isUserContributionChapter: (obj?: {
    __typename?: any;
} | null) => obj is UserContributionChapter;
export declare const isUserContributionDisc: (obj?: {
    __typename?: any;
} | null) => obj is UserContributionDisc;
export declare const isUserContributionDiscHashItem: (obj?: {
    __typename?: any;
} | null) => obj is UserContributionDiscHashItem;
export declare const isUserContributionDiscItem: (obj?: {
    __typename?: any;
} | null) => obj is UserContributionDiscItem;
export declare const isUserContributionSubtitleTrack: (obj?: {
    __typename?: any;
} | null) => obj is UserContributionSubtitleTrack;
export declare const isUserFileNameTemplate: (obj?: {
    __typename?: any;
} | null) => obj is UserFileNameTemplate;
export declare const isUserMessage: (obj?: {
    __typename?: any;
} | null) => obj is UserMessage;
export declare const isAddAudioTrackToItemError: (obj?: {
    __typename?: any;
} | null) => obj is AddAudioTrackToItemError;
export declare const isAddChapterToItemError: (obj?: {
    __typename?: any;
} | null) => obj is AddChapterToItemError;
export declare const isAddDiscToBoxsetError: (obj?: {
    __typename?: any;
} | null) => obj is AddDiscToBoxsetError;
export declare const isAddExistingDiscToBoxsetError: (obj?: {
    __typename?: any;
} | null) => obj is AddExistingDiscToBoxsetError;
export declare const isAddItemToDiscError: (obj?: {
    __typename?: any;
} | null) => obj is AddItemToDiscError;
export declare const isAddSubtitleTrackToItemError: (obj?: {
    __typename?: any;
} | null) => obj is AddSubtitleTrackToItemError;
export declare const isAttachGlobalDiscIdError: (obj?: {
    __typename?: any;
} | null) => obj is AttachGlobalDiscIdError;
export declare const isCreateBoxsetError: (obj?: {
    __typename?: any;
} | null) => obj is CreateBoxsetError;
export declare const isCreateContributionError: (obj?: {
    __typename?: any;
} | null) => obj is CreateContributionError;
export declare const isCreateDiscError: (obj?: {
    __typename?: any;
} | null) => obj is CreateDiscError;
export declare const isDeleteBoxsetError: (obj?: {
    __typename?: any;
} | null) => obj is DeleteBoxsetError;
export declare const isDeleteContributionError: (obj?: {
    __typename?: any;
} | null) => obj is DeleteContributionError;
export declare const isDeleteDiscFromContributionError: (obj?: {
    __typename?: any;
} | null) => obj is DeleteDiscFromContributionError;
export declare const isDeleteFileNameTemplateError: (obj?: {
    __typename?: any;
} | null) => obj is DeleteFileNameTemplateError;
export declare const isDeleteItemFromDiscError: (obj?: {
    __typename?: any;
} | null) => obj is DeleteItemFromDiscError;
export declare const isDiscLogsError: (obj?: {
    __typename?: any;
} | null) => obj is DiscLogsError;
export declare const isDiscUploadStatusError: (obj?: {
    __typename?: any;
} | null) => obj is DiscUploadStatusError;
export declare const isEditItemOnDiscError: (obj?: {
    __typename?: any;
} | null) => obj is EditItemOnDiscError;
export declare const isEpisodeNamesError: (obj?: {
    __typename?: any;
} | null) => obj is EpisodeNamesError;
export declare const isExternalDataError: (obj?: {
    __typename?: any;
} | null) => obj is ExternalDataError;
export declare const isExternalDataForContributionError: (obj?: {
    __typename?: any;
} | null) => obj is ExternalDataForContributionError;
export declare const isHashDiscError: (obj?: {
    __typename?: any;
} | null) => obj is HashDiscError;
export declare const isMarkBoxsetMessagesAsReadError: (obj?: {
    __typename?: any;
} | null) => obj is MarkBoxsetMessagesAsReadError;
export declare const isMarkMessagesAsReadError: (obj?: {
    __typename?: any;
} | null) => obj is MarkMessagesAsReadError;
export declare const isRemoveBoxsetMemberError: (obj?: {
    __typename?: any;
} | null) => obj is RemoveBoxsetMemberError;
export declare const isRemoveDiscFromBoxsetError: (obj?: {
    __typename?: any;
} | null) => obj is RemoveDiscFromBoxsetError;
export declare const isReorderBoxsetMembersError: (obj?: {
    __typename?: any;
} | null) => obj is ReorderBoxsetMembersError;
export declare const isReorderDiscsError: (obj?: {
    __typename?: any;
} | null) => obj is ReorderDiscsError;
export declare const isRevokeApiKeyError: (obj?: {
    __typename?: any;
} | null) => obj is RevokeApiKeyError;
export declare const isSendAdminBoxsetMessageError: (obj?: {
    __typename?: any;
} | null) => obj is SendAdminBoxsetMessageError;
export declare const isSendAdminMessageError: (obj?: {
    __typename?: any;
} | null) => obj is SendAdminMessageError;
export declare const isSendBoxsetUserMessageError: (obj?: {
    __typename?: any;
} | null) => obj is SendBoxsetUserMessageError;
export declare const isSendUserMessageError: (obj?: {
    __typename?: any;
} | null) => obj is SendUserMessageError;
export declare const isSetFileNameTemplateError: (obj?: {
    __typename?: any;
} | null) => obj is SetFileNameTemplateError;
export declare const isUpdateBoxsetError: (obj?: {
    __typename?: any;
} | null) => obj is UpdateBoxsetError;
export declare const isUpdateContributionError: (obj?: {
    __typename?: any;
} | null) => obj is UpdateContributionError;
export declare const isUpdateDiscError: (obj?: {
    __typename?: any;
} | null) => obj is UpdateDiscError;
export declare const enumApplyPolicy: {
    BEFORE_RESOLVER: "BEFORE_RESOLVER";
    AFTER_RESOLVER: "AFTER_RESOLVER";
    VALIDATION: "VALIDATION";
};
export declare const enumAttachDiscIdOutcome: {
    APPLIED: "APPLIED";
    ALREADY_RECORDED: "ALREADY_RECORDED";
    CONFLICT: "CONFLICT";
    NOT_FOUND: "NOT_FOUND";
    MISMATCH: "MISMATCH";
};
export declare const enumContributionHistoryType: {
    CREATED: "CREATED";
    STATUS_CHANGED: "STATUS_CHANGED";
    DELETED: "DELETED";
    ADMIN_MESSAGE: "ADMIN_MESSAGE";
    USER_MESSAGE: "USER_MESSAGE";
};
export declare const enumSortEnumType: {
    ASC: "ASC";
    DESC: "DESC";
};
export declare const enumUserContributionStatus: {
    PENDING: "PENDING";
    READY_FOR_REVIEW: "READY_FOR_REVIEW";
    APPROVED: "APPROVED";
    CHANGES_REQUESTED: "CHANGES_REQUESTED";
    REJECTED: "REJECTED";
    IMPORTED: "IMPORTED";
};
export declare const enumUserMessageType: {
    ADMIN_MESSAGE: "ADMIN_MESSAGE";
    USER_MESSAGE: "USER_MESSAGE";
};
