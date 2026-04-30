import type { ExternalMetadata, UpdateDiscInput, AddItemToDiscInput, WithEncodedId } from "./types/contributions";
import { type ApiKeyInfoFilterInput, type ApiKeyInfoSortInput, type ApiKeyUsageLogInfoFilterInput, type ApiKeyUsageLogInfoSortInput, type ContributionHistorySortInput, type ContributionMutationRequestInput, type EditItemOnDiscInput, type Client as GQLClient, type UpdateContributionInput, type UserContributionFilterInput, type UserContributionGenqlSelection, type UserContributionSortInput, type UserMessageSortInput, type UserMessageType } from "./genql-contributions";
import { type BidirectionalPaginationQuery } from "./common";
import type { DiscFormat, MediaItemType } from "./types";
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
        contributions: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
        totalCount: any;
    }>;
    /**
     * Get a contribution by its encoded ID
     * @param id encoded ID
     */
    getContribution(id: string): Promise<any>;
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
    getDiscUploadStatus(discId: string): Promise<any>;
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
    getDiscLogs(contributionId: string, discId: string): Promise<any>;
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
    reorderDiscs(contributionId: string, discIds: string[]): Promise<any>;
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
        name: any;
        year: any;
        episodes: any;
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
        name: any;
        season: any;
        episode: any;
    }>;
    generateApiKey(name: string, ownerEmail: string, roles: string[], expiresAt?: Date): Promise<any>;
    /**
     * Get a list of API keys.
     *
     * @param input customize returned results
     * @returns list of API keys as well as page info for pagination
     */
    getApiKeys(input?: BidirectionalPaginationQuery<ApiKeyInfoFilterInput, ApiKeyInfoSortInput>): Promise<{
        keys: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
    }>;
    getApiKey(keyPrefix: string): Promise<any>;
    /**
     * Get a list of API key usage logs.
     *
     * @param input customize returned results
     * @returns list of logs as well as pagination info
     */
    getApiKeyUsageLogs(input?: BidirectionalPaginationQuery<ApiKeyUsageLogInfoFilterInput, ApiKeyUsageLogInfoSortInput>): Promise<{
        logs: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
    }>;
    revokeApiKey(keyPrefix: string): Promise<any>;
    /**
     *
     * @param contributionId encoded contribution ID
     * @param input customize returned results
     */
    getContributionChat(contributionId: string, input?: BidirectionalPaginationQuery<never, UserMessageSortInput>): Promise<{
        messages: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
        totalCount: any;
    }>;
    getContributionHistory(contributionId: number, input?: BidirectionalPaginationQuery<never, ContributionHistorySortInput>): Promise<{
        history: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
        totalCount: any;
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
        contributions: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
        totalCount: any;
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
    sendMessage(contributionId: string, content: string, type?: UserMessageType): Promise<any>;
    /**
     * Get a list of message threads that the client is part of
     * @returns Message threads keyed by contribution ID
     */
    getMessageThreads(): Promise<any>;
    getMyMessages(input?: BidirectionalPaginationQuery<never, UserMessageSortInput>): Promise<{
        messages: any;
        page: {
            cursor: PageInfo;
            hasMoreData: PageInfo;
        };
        totalCount: any;
    }>;
    getAmazonProductMetadata(asin: string): Promise<any>;
}
