import { type BidirectionalPaginationQuery } from "./common";
import { type ApiKeyInfoFilterInput, type ApiKeyInfoSortInput, type ApiKeyUsageLogInfoFilterInput, type ApiKeyUsageLogInfoSortInput, type ContributionHistorySortInput, type ContributionMutationRequestInput, type EditItemOnDiscInput, type Client as GQLClient, type UpdateContributionInput, type UserContributionFilterInput, type UserContributionGenqlSelection, type UserContributionSortInput, type UserMessageSortInput, type UserMessageType } from "./genql-contributions";
import type { DiscFormat, MediaItemType } from "./types";
import type { AddItemToDiscInput, ExternalMetadata, UpdateDiscInput, WithEncodedId } from "./types/contributions";
import type { FileHashInfo } from "./types/hash";
export { enumApplyPolicy, enumContributionHistoryType, enumUserContributionStatus, enumUserMessageType, } from "./genql-contributions/schema";
export declare class DiscDBContributionsClient {
    origin: string;
    userAgent: string;
    cookies: string | undefined;
    /**
     * Internal, typed GraphQL client that may be used to bypass wrapper logic
     * or compose custom queries
     *
     * @see https://genql.dev/docs
     */
    gql: GQLClient;
    constructor(options?: {
        origin?: string;
        userAgent?: string;
        cookies?: string;
    });
    /**
     * Returns a qualified image URL from a path. If only one dimension is
     * provided, the other dimension will be resized automatically, maintaining
     * the original aspect ratio.
     */
    getImageUrl(path: string, options?: {
        width?: number;
        height?: number;
    }): string;
    private fetch;
    externalSearch(type: MediaItemType, query: string): Promise<ExternalMetadata[]>;
    getExternalData(type: MediaItemType, externalId: string | number, provider?: string): Promise<ExternalMetadata>;
    /**
     * The same as getExternalData, but takes a contribution ID instead of a
     * provider-specific identifier
     *
     * @param contributionId the encoded ID of the contribution
     * @returns title metadata
     */
    getContributionExternalData(contributionId: string): Promise<ExternalMetadata>;
    getMyContributions<Selection extends UserContributionGenqlSelection = {
        id: true;
        encodedId: true;
        title: true;
        releaseTitle: true;
        year: true;
        mediaType: true;
        status: true;
        frontImageUrl: true;
        created: true;
    }>(input?: BidirectionalPaginationQuery<UserContributionFilterInput, UserContributionSortInput>, select?: Selection): Promise<{
        contributions: import("./genql-contributions").UserContribution[] | NonNullable<import("./genql-contributions").FieldsSelection<import("./genql-contributions").UserContribution[] | null, NonNullable<Selection>>>;
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        } | undefined;
        totalCount: number;
    }>;
    /**
     * Get a contribution by its encoded ID
     * @param id encoded ID
     */
    getContribution(id: string): Promise<import("./genql-contributions").UserContribution | Pick<{
        id: import("./genql-contributions").Scalars["Int"];
        userId: import("./genql-contributions").Scalars["String"];
        created: import("./genql-contributions").Scalars["DateTime"];
        status: import("./genql-contributions").UserContributionStatus;
        discs: Pick<{
            id: import("./genql-contributions").Scalars["Int"];
            userContribution: import("./genql-contributions").UserContribution;
            contentHash: import("./genql-contributions").Scalars["String"];
            format: import("./genql-contributions").Scalars["String"];
            name: import("./genql-contributions").Scalars["String"];
            slug: import("./genql-contributions").Scalars["String"];
            logsUploaded: import("./genql-contributions").Scalars["Boolean"];
            logUploadError: (import("./genql-contributions").Scalars["String"] | null);
            index: (import("./genql-contributions").Scalars["Int"] | null);
            existingDiscPath: (import("./genql-contributions").Scalars["String"] | null);
            items: import("./genql-contributions").UserContributionDiscItem[];
            encodedId: import("./genql-contributions").Scalars["EncodedId"];
            __typename: "UserContributionDisc";
        }, "id" | "slug" | "name" | "format" | "logsUploaded" | "encodedId" | "existingDiscPath">[];
        hashItems: import("./genql-contributions").UserContributionDiscHashItem[];
        mediaType: import("./genql-contributions").Scalars["String"];
        externalId: import("./genql-contributions").Scalars["String"];
        externalProvider: import("./genql-contributions").Scalars["String"];
        releaseDate: import("./genql-contributions").Scalars["DateTime"];
        asin: import("./genql-contributions").Scalars["String"];
        upc: import("./genql-contributions").Scalars["String"];
        frontImageUrl: import("./genql-contributions").Scalars["String"];
        backImageUrl: (import("./genql-contributions").Scalars["String"] | null);
        releaseTitle: import("./genql-contributions").Scalars["String"];
        releaseSlug: (import("./genql-contributions").Scalars["String"] | null);
        locale: import("./genql-contributions").Scalars["String"];
        regionCode: import("./genql-contributions").Scalars["String"];
        title: (import("./genql-contributions").Scalars["String"] | null);
        year: (import("./genql-contributions").Scalars["String"] | null);
        titleSlug: import("./genql-contributions").Scalars["String"];
        encodedId: import("./genql-contributions").Scalars["EncodedId"];
        __typename: "UserContribution";
    }, "id" | "title" | "year" | "releaseDate" | "regionCode" | "locale" | "upc" | "asin" | "backImageUrl" | "discs" | "frontImageUrl" | "created" | "status" | "mediaType" | "externalId" | "externalProvider" | "releaseTitle" | "releaseSlug" | "encodedId">>;
    /**
     * Upload an image for a contribution before the contribution is actually
     * created
     *
     * @param uploaderId
     *  Temporary UUID to use when uploading the image.
     *
     *  Currently unsure how to get this value. It may be the case that it is
     *  generated on the client as an arbitrary value and then sent to the
     *  server to link the temporary file with the new contribution record.
     * @param variant Whether the image is the front or back cover
     * @param file File data to upload
     * @returns metadata for the uploaded image
     */
    uploadTemporalContributionImage(uploaderId: string, variant: "front" | "back", file: Blob): Promise<{
        id: string;
        variant: "front" | "back";
        url: string;
    }>;
    deleteTemporalContributionImage(
    /** The ID used to upload the image */
    uploaderId: string, 
    /** Whether the image is the front or back cover */
    variant: "front" | "back"): Promise<void>;
    /**
     * Upload an image to an extant contribution
     *
     * @param variant Whether the image is the front or back cover
     * @param file File data to upload
     * @param uploaderId
     *  Temporary UUID from the details form.
     *
     *  @see uploadTemporalContributionImage
     * @returns metadata for the uploaded image
     */
    uploadContributionImage(contributionId: string, variant: "front" | "back", file: Blob, uploaderId: string): Promise<{
        variant: "front" | "back";
        url: string;
    }>;
    deleteContributionImage(contributionId: string, variant: "front" | "back"): Promise<void>;
    createContribution(input: Omit<ContributionMutationRequestInput, "releaseSlug"> & Partial<Pick<ContributionMutationRequestInput, "releaseSlug">>): Promise<WithEncodedId>;
    updateContribution(input: UpdateContributionInput): Promise<WithEncodedId>;
    deleteContribution(contributionId: string): Promise<void>;
    /**
     * Generate a unique hash based on the files on a disc.
     * See {@link client!DiscDBClient#hash | DiscDBClient#hash} for more
     * information.
     *
     * @param files details for the relevant files from the disc.
     * - DVD: the contents of VIDEO_TS
     * - Blu-ray: every `.m2ts` file in BDMV/STREAM
     * @returns the computed hash
     */
    hash(contributionId: string, files: (FileHashInfo | File)[]): Promise<string>;
    /**
     * Add a disc to a contribution. This is only for specifying the surface
     * details of the disc; after creating it, you must
     * {@link uploadDiscLogs | upload logs} before you can
     * {@link addItemToDisc | identify items}.
     *
     * @param contributionId encoded ID of the contribtion
     * @param contentHash {@link hash | content hash} of the disc
     * @param format the disc format
     * @param name the name of the disc, like "Disc 1", "Extras", "DVD"
     * @param slug by default, a {@link common!slugify | slugified} version of the name is generated
     */
    createDisc(contributionId: string, contentHash: string, format: DiscFormat, name: string, slug?: string): Promise<WithEncodedId>;
    updateDisc(contributionId: string, discId: string, input: Omit<UpdateDiscInput, "contributionId" | "discId">): Promise<WithEncodedId>;
    /**
     * Upload [MakeMKV](https://makemkv.com) logs to a contribution disc.
     *
     * Example for generating compatible logs:
     * ```bash
     * makemkvcon --minlength=0 --robot info disc:0 2>&1 | tee logs.txt
     * # or simply read from stdout if in an integrated application
     * ```
     *
     * @param contributionId encoded ID of the contribution
     * @param discId encoded ID of the disc
     * @param logs plaintext log output from MakeMKV
     */
    uploadDiscLogs(contributionId: string, discId: string, logs: string): Promise<void>;
    /**
     * Check (poll) the status of uploading logs. If you are using
     * {@link uploadDiscLogs} in the same application, this endpoint is probably
     * not useful to you, as you can just wait for the promise to resolve.
     *
     * @param discId encoded ID for the disc
     * @returns upload status for the disc's logs
     */
    getDiscUploadStatus(discId: string): Promise<import("./genql-contributions").FieldsSelection<import("./genql-contributions").DiscUploadStatus | null, {
        logsUploaded: true;
        logUploadError: true;
    }> & NonNullable<import("./genql-contributions").FieldsSelection<import("./genql-contributions").DiscUploadStatus | null, {
        logsUploaded: true;
        logUploadError: true;
    }>>>;
    /**
     * Get disc & title information for the disc, as described by a
     * previously-uploaded MakeMKV log file.
     *
     * @see uploadDiscLogs to upload plaintext logs for a disc
     *
     * @param contributionId encoded ID for the contribution
     * @param discId encoded ID for the disc
     * @returns parsed logs for the disc, including parent contribution info
     */
    getDiscLogs(contributionId: string, discId: string): Promise<import("./genql-contributions").FieldsSelection<import("./genql-contributions").DiscLogs | null, {
        info: {
            titles: {
                index: true;
                chapterCount: true;
                length: true;
                displaySize: true;
                size: true;
                playlist: true;
                segmentMap: true;
                comment: true;
                javaComment: true;
                segments: {
                    type: true;
                    name: true;
                    audioType: true;
                };
            };
        };
        disc: {
            contentHash: true;
            format: true;
            name: true;
            slug: true;
            logsUploaded: true;
            existingDiscPath: true;
            encodedId: true;
            items: {
                description: true;
                encodedId: true;
                name: true;
                source: true;
                duration: true;
                size: true;
                chapterCount: true;
                segmentCount: true;
                segmentMap: true;
                type: true;
                season: true;
                episode: true;
                audioTracks: {
                    encodedId: true;
                    index: true;
                    title: true;
                    id: true;
                };
                chapters: {
                    encodedId: true;
                    index: true;
                    title: true;
                    id: true;
                };
                id: true;
            };
            id: true;
        };
        contribution: {
            encodedId: true;
            mediaType: true;
            title: true;
            year: true;
            releaseTitle: true;
            discs: {
                encodedId: true;
                name: true;
                items: {
                    chapterCount: true;
                    name: true;
                    chapters: {
                        encodedId: true;
                        index: true;
                        title: true;
                        id: true;
                    };
                    id: true;
                };
                id: true;
            };
            id: true;
        };
    }> & NonNullable<import("./genql-contributions").FieldsSelection<import("./genql-contributions").DiscLogs | null, {
        info: {
            titles: {
                index: true;
                chapterCount: true;
                length: true;
                displaySize: true;
                size: true;
                playlist: true;
                segmentMap: true;
                comment: true;
                javaComment: true;
                segments: {
                    type: true;
                    name: true;
                    audioType: true;
                };
            };
        };
        disc: {
            contentHash: true;
            format: true;
            name: true;
            slug: true;
            logsUploaded: true;
            existingDiscPath: true;
            encodedId: true;
            items: {
                description: true;
                encodedId: true;
                name: true;
                source: true;
                duration: true;
                size: true;
                chapterCount: true;
                segmentCount: true;
                segmentMap: true;
                type: true;
                season: true;
                episode: true;
                audioTracks: {
                    encodedId: true;
                    index: true;
                    title: true;
                    id: true;
                };
                chapters: {
                    encodedId: true;
                    index: true;
                    title: true;
                    id: true;
                };
                id: true;
            };
            id: true;
        };
        contribution: {
            encodedId: true;
            mediaType: true;
            title: true;
            year: true;
            releaseTitle: true;
            discs: {
                encodedId: true;
                name: true;
                items: {
                    chapterCount: true;
                    name: true;
                    chapters: {
                        encodedId: true;
                        index: true;
                        title: true;
                        id: true;
                    };
                    id: true;
                };
                id: true;
            };
            id: true;
        };
    }>>>;
    addItemToDisc(contributionId: string, discId: string, input: Omit<AddItemToDiscInput, "contributionId" | "discId">): Promise<WithEncodedId>;
    updateItemOnDisc(contributionId: string, discId: string, itemId: string, input: Omit<EditItemOnDiscInput, "contributionId" | "discId" | "itemId">): Promise<WithEncodedId>;
    deleteItemFromDisc(contributionId: string, discId: string, itemId: string): Promise<void>;
    /**
     * Change the order of a contribution's discs by submitting all IDs in the
     * new desired order.
     *
     * @param contributionId encoded ID of the contribution that the discs are from
     * @param discIds new order for all disc IDs
     * @returns all discs in the contribution
     */
    reorderDiscs(contributionId: string, discIds: string[]): Promise<import("./genql-contributions").FieldsSelection<import("./genql-contributions").UserContributionDisc[] | null, {
        id: true;
        encodedId: true;
        index: true;
        name: true;
        slug: true;
    }> & NonNullable<import("./genql-contributions").FieldsSelection<import("./genql-contributions").UserContributionDisc[] | null, {
        id: true;
        encodedId: true;
        index: true;
        name: true;
        slug: true;
    }>>>;
    addAudioTrackToItem(contributionId: string, discId: string, itemId: string, trackIndex: number, trackName: string): Promise<WithEncodedId>;
    addChapterToItem(contributionId: string, discId: string, itemId: string, chapterIndex: number, chapterName: string): Promise<WithEncodedId>;
    /**
     * Get surface details for the series associated with a contribution,
     * including its full episode list
     *
     * Episodes are numbered according to TMDB given that is currently the only
     * external data source.
     *
     * @param contributionId encoded contribution ID for a series release
     * @returns
     */
    getSeriesEpisodes(contributionId: string): Promise<{
        name: string;
        year: string;
        episodes: import("./genql-contributions").SeriesEpisodeNameEntry[] | Pick<{
            seasonNumber: import("./genql-contributions").Scalars["String"];
            episodeNumber: import("./genql-contributions").Scalars["String"];
            episodeName: import("./genql-contributions").Scalars["String"];
            __typename: "SeriesEpisodeNameEntry";
        }, "__typename" | "seasonNumber" | "episodeNumber" | "episodeName">[] | (import("./genql-contributions").SeriesEpisodeNameEntry[] & Pick<{
            seasonNumber: import("./genql-contributions").Scalars["String"];
            episodeNumber: import("./genql-contributions").Scalars["String"];
            episodeName: import("./genql-contributions").Scalars["String"];
            __typename: "SeriesEpisodeNameEntry";
        }, "__typename" | "seasonNumber" | "episodeNumber" | "episodeName">[]) | (Pick<{
            seasonNumber: import("./genql-contributions").Scalars["String"];
            episodeNumber: import("./genql-contributions").Scalars["String"];
            episodeName: import("./genql-contributions").Scalars["String"];
            __typename: "SeriesEpisodeNameEntry";
        }, "__typename" | "seasonNumber" | "episodeNumber" | "episodeName">[] & import("./genql-contributions").SeriesEpisodeNameEntry[]);
    }>;
    /**
     * Find a specific episode of the series associated with a contribution
     *
     * Episodes are numbered according to TMDB given that is currently the only
     * external data source.
     *
     * @param contributionId encoded contribution ID for a series release
     * @param season season number of the episode
     * @param episode episode number within the season
     * @returns episode details, or null if not found
     */
    findSeriesEpisode(contributionId: string, season: string | number, episode: string | number): Promise<{
        name: string;
        season: string;
        episode: string;
    } | null>;
    generateApiKey(name: string, ownerEmail: string, roles: string[], expiresAt?: Date): Promise<Pick<{
        key: import("./genql-contributions").Scalars["String"];
        keyPrefix: import("./genql-contributions").Scalars["String"];
        name: import("./genql-contributions").Scalars["String"];
        ownerEmail: import("./genql-contributions").Scalars["String"];
        __typename: "GenerateApiKeyPayload";
    }, "name" | "keyPrefix" | "ownerEmail" | "key">>;
    /**
     * Get a list of API keys.
     *
     * @param input customize returned results
     * @returns list of API keys as well as page info for pagination
     */
    getApiKeys(input?: BidirectionalPaginationQuery<ApiKeyInfoFilterInput, ApiKeyInfoSortInput>): Promise<{
        keys: Pick<{
            name: import("./genql-contributions").Scalars["String"];
            keyPrefix: import("./genql-contributions").Scalars["String"];
            isActive: import("./genql-contributions").Scalars["Boolean"];
            logUsage: import("./genql-contributions").Scalars["Boolean"];
            roles: (import("./genql-contributions").Scalars["String"] | null);
            ownerEmail: import("./genql-contributions").Scalars["String"];
            createdAt: import("./genql-contributions").Scalars["DateTime"];
            expiresAt: (import("./genql-contributions").Scalars["DateTime"] | null);
            lastUsedAt: (import("./genql-contributions").Scalars["DateTime"] | null);
            __typename: "ApiKeyInfo";
        }, "name" | "isActive" | "roles" | "ownerEmail" | "createdAt" | "expiresAt" | "lastUsedAt">[];
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        } | undefined;
    }>;
    getApiKey(keyPrefix: string): Promise<Pick<{
        name: import("./genql-contributions").Scalars["String"];
        keyPrefix: import("./genql-contributions").Scalars["String"];
        isActive: import("./genql-contributions").Scalars["Boolean"];
        logUsage: import("./genql-contributions").Scalars["Boolean"];
        roles: (import("./genql-contributions").Scalars["String"] | null);
        ownerEmail: import("./genql-contributions").Scalars["String"];
        createdAt: import("./genql-contributions").Scalars["DateTime"];
        expiresAt: (import("./genql-contributions").Scalars["DateTime"] | null);
        lastUsedAt: (import("./genql-contributions").Scalars["DateTime"] | null);
        __typename: "ApiKeyInfo";
    }, "name" | "isActive" | "roles" | "ownerEmail" | "createdAt" | "expiresAt" | "lastUsedAt"> | undefined>;
    /**
     * Get a list of API key usage logs.
     *
     * @param input customize returned results
     * @returns list of logs as well as pagination info
     */
    getApiKeyUsageLogs(input?: BidirectionalPaginationQuery<ApiKeyUsageLogInfoFilterInput, ApiKeyUsageLogInfoSortInput>): Promise<{
        logs: import("./genql-contributions").ApiKeyUsageLogInfo[];
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        } | undefined;
    }>;
    revokeApiKey(keyPrefix: string): Promise<import("./genql-contributions").FieldsSelection<import("./genql-contributions").ApiKeyInfo | null, {
        name: true;
        ownerEmail: true;
        roles: true;
        createdAt: true;
        expiresAt: true;
        lastUsedAt: true;
    }> & NonNullable<import("./genql-contributions").FieldsSelection<import("./genql-contributions").ApiKeyInfo | null, {
        name: true;
        ownerEmail: true;
        roles: true;
        createdAt: true;
        expiresAt: true;
        lastUsedAt: true;
    }>>>;
    /**
     *
     * @param contributionId encoded contribution ID
     * @param input customize returned results
     */
    getContributionChat(contributionId: string, input?: BidirectionalPaginationQuery<never, UserMessageSortInput>): Promise<{
        messages: import("./genql-contributions").FieldsSelection<import("./genql-contributions").UserMessage[] | null, {
            contributionId: true;
            createdAt: true;
            id: true;
            isRead: true;
            message: true;
            fromUserId: true;
            toUserId: true;
            type: true;
        }>;
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        };
        totalCount: number;
    }>;
    getContributionHistory(contributionId: number, input?: BidirectionalPaginationQuery<never, ContributionHistorySortInput>): Promise<{
        history: import("./genql-contributions").FieldsSelection<import("./genql-contributions").ContributionHistory[] | null, {
            contributionId: true;
            description: true;
            id: true;
            timeStamp: true;
            type: true;
            userId: true;
        }>;
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        };
        totalCount: number;
    }>;
    getContributions<Selection extends UserContributionGenqlSelection = {
        id: true;
        encodedId: true;
        title: true;
        year: true;
        mediaType: true;
        status: true;
        frontImageUrl: true;
        backImageUrl: true;
        created: true;
        releaseTitle: true;
        releaseSlug: true;
    }>(input?: BidirectionalPaginationQuery<UserContributionFilterInput, UserContributionSortInput>, select?: Selection): Promise<{
        contributions: import("./genql-contributions").UserContribution[] | NonNullable<import("./genql-contributions").FieldsSelection<import("./genql-contributions").UserContribution[] | null, NonNullable<Selection>>>;
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        } | undefined;
        totalCount: number;
    }>;
    /**
     * @returns Whether the client has any unread messages
     */
    hasUnreadMessages(): Promise<boolean>;
    /**
     * Mark all messages as read for a given contribution thread
     *
     * @param contributionId encoded contribution ID that the messages apply to
     * @returns
     */
    markMessagesAsRead(contributionId: string): Promise<boolean>;
    /**
     * Send a message in a contribution thread.
     *
     * @param contributionId encoded contribution ID
     * @param content the message content to send
     * @param type if you are an admin, this may be ADMIN_MESSAGE, but it defaults to USER_MESSAGE
     * @returns the sent message
     */
    sendMessage(contributionId: string, content: string, type?: UserMessageType): Promise<import("./genql-contributions").FieldsSelection<import("./genql-contributions").UserMessage | null, {
        contributionId: boolean;
        createdAt: boolean;
        id: boolean;
        isRead: boolean;
        message: boolean;
        fromUserId: boolean;
        toUserId: boolean;
        type: boolean;
    }> & NonNullable<import("./genql-contributions").FieldsSelection<import("./genql-contributions").UserMessage | null, {
        contributionId: boolean;
        createdAt: boolean;
        id: boolean;
        isRead: boolean;
        message: boolean;
        fromUserId: boolean;
        toUserId: boolean;
        type: boolean;
    }>>>;
    /**
     * Get a list of message threads that the client is part of
     * @returns Message threads keyed by contribution ID
     */
    getMessageThreads(): Promise<Pick<{
        contributionId: import("./genql-contributions").Scalars["Int"];
        encodedContributionId: import("./genql-contributions").Scalars["String"];
        contributionTitle: import("./genql-contributions").Scalars["String"];
        mediaTitle: (import("./genql-contributions").Scalars["String"] | null);
        lastMessagePreview: import("./genql-contributions").Scalars["String"];
        lastMessageAt: import("./genql-contributions").Scalars["DateTime"];
        unreadCount: import("./genql-contributions").Scalars["Int"];
        totalCount: import("./genql-contributions").Scalars["Int"];
        __typename: "MessageThread";
    }, "__typename" | "totalCount" | "contributionId" | "encodedContributionId" | "contributionTitle" | "mediaTitle" | "lastMessagePreview" | "lastMessageAt" | "unreadCount">[]>;
    getMyMessages(input?: BidirectionalPaginationQuery<never, UserMessageSortInput>): Promise<{
        messages: Pick<{
            id: import("./genql-contributions").Scalars["Int"];
            contributionId: import("./genql-contributions").Scalars["Int"];
            fromUserId: import("./genql-contributions").Scalars["String"];
            toUserId: import("./genql-contributions").Scalars["String"];
            message: import("./genql-contributions").Scalars["String"];
            isRead: import("./genql-contributions").Scalars["Boolean"];
            createdAt: import("./genql-contributions").Scalars["DateTime"];
            type: UserMessageType;
            __typename: "UserMessage";
        }, "id" | "type" | "message" | "createdAt" | "contributionId" | "fromUserId" | "toUserId" | "isRead">[];
        page: {
            cursor: string | null;
            hasMoreData: boolean;
        } | undefined;
        totalCount: number;
    }>;
    getAmazonProductMetadata(asin: string): Promise<import("./genql-contributions").AmazonProductMetadata | Pick<{
        asin: (import("./genql-contributions").Scalars["String"] | null);
        title: (import("./genql-contributions").Scalars["String"] | null);
        upc: (import("./genql-contributions").Scalars["String"] | null);
        frontImageUrl: (import("./genql-contributions").Scalars["String"] | null);
        backImageUrl: (import("./genql-contributions").Scalars["String"] | null);
        releaseDate: (import("./genql-contributions").Scalars["DateTime"] | null);
        numberOfDiscs: (import("./genql-contributions").Scalars["Int"] | null);
        aspectRatio: (import("./genql-contributions").Scalars["String"] | null);
        isDiscontinued: (import("./genql-contributions").Scalars["Boolean"] | null);
        mpaaRating: (import("./genql-contributions").Scalars["String"] | null);
        modelNumber: (import("./genql-contributions").Scalars["String"] | null);
        director: (import("./genql-contributions").Scalars["String"] | null);
        mediaFormat: (import("./genql-contributions").Scalars["String"] | null);
        actors: (import("./genql-contributions").Scalars["String"] | null);
        producers: (import("./genql-contributions").Scalars["String"] | null);
        language: (import("./genql-contributions").Scalars["String"] | null);
        dubbed: (import("./genql-contributions").Scalars["String"] | null);
        subtitles: (import("./genql-contributions").Scalars["String"] | null);
        studio: (import("./genql-contributions").Scalars["String"] | null);
        __typename: "AmazonProductMetadata";
    }, "title" | "releaseDate" | "aspectRatio" | "language" | "upc" | "asin" | "backImageUrl" | "__typename" | "frontImageUrl" | "numberOfDiscs" | "isDiscontinued" | "mpaaRating" | "modelNumber" | "director" | "mediaFormat" | "actors" | "producers" | "dubbed" | "subtitles" | "studio">>;
}
