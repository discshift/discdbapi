import { version } from "../package.json";
import { DISCDB_ORIGIN } from "./constants";
import type {
  ExternalSearchResponse,
  ExternalMetadata,
  HashDiscInput,
  UpdateDiscInput,
  AddItemToDiscInput,
  WithEncodedId,
} from "./types/contributions";
import {
  createClient,
  enumUserMessageType,
  type ApiKeyInfoFilterInput,
  type ApiKeyInfoSortInput,
  type ApiKeyUsageLogInfoFilterInput,
  type ApiKeyUsageLogInfoSortInput,
  type ContributionHistorySortInput,
  type ContributionMutationRequestInput,
  type EditItemOnDiscInput,
  type Client as GQLClient,
  type UpdateContributionInput,
  type UserContributionFilterInput,
  type UserContributionGenqlSelection,
  type UserContributionSortInput,
  type UserMessageSortInput,
  type UserMessageType,
} from "./genql-contributions";
import {
  fixMediaTypes,
  getImageUrl,
  slugify,
  unifyPageArgs,
  unifyPageInfo,
  type BidirectionalPaginationQuery,
} from "./common";
import type { DiscFormat, MediaItemType } from "./types";
import type { FileHashInfo } from "./types/hash";

export {
  enumApplyPolicy,
  enumContributionHistoryType,
  enumUserContributionStatus,
  enumUserMessageType,
} from "./genql-contributions/schema";

/** Throw mutation errors and type guard for the data prop */
const mutationHasData = <
  T extends { errors: { message: string }[] | null },
  S extends keyof T,
>(
  data: T,
  dataProp: S,
): data is T & Record<S, NonNullable<T[S]>> => {
  if (data.errors) {
    throw Error(data.errors.map((e) => e.message).join("; "));
  }
  return data[dataProp] !== null;
};

// Remove URLs with no actual path
const removeInvalidTmdbImageUrls = (results: ExternalMetadata[]) => {
  return results.map((r) => {
    if (r.imageUrl) {
      try {
        const { pathname } = new URL(r.imageUrl);
        // /t/p/w92/path.jpg
        const split = pathname.split("/");
        // no segment at index 4 or it is blank
        if (!split[4]) r.imageUrl = null;
      } catch {
        // invalid URL
        r.imageUrl = null;
      }
    }
    return r;
  });
};

export class DiscDBContributionsClient {
  public origin = DISCDB_ORIGIN;
  public userAgent = `discdbapi/${version}`;
  public cookies: string | undefined;

  /**
   * Internal, typed GraphQL client that may be used to bypass wrapper logic
   * or compose custom queries
   *
   * @see https://genql.dev/docs
   */
  public gql: GQLClient;

  constructor(options?: {
    origin?: string;
    userAgent?: string;
    cookies?: string;
  }) {
    if (options?.origin) {
      this.origin = options.origin;
    }
    if (options?.userAgent !== undefined) {
      this.userAgent = options.userAgent;
    }
    if (options?.cookies !== undefined) {
      this.cookies = options.cookies;
    }

    this.gql = createClient({
      url: new URL("/graphql", this.origin ?? DISCDB_ORIGIN).href,
      headers: {
        "User-Agent": options?.userAgent,
        Cookie: options?.cookies,
      },
    });
  }

  /**
   * Returns a qualified image URL from a path. If only one dimension is
   * provided, the other dimension will be resized automatically, maintaining
   * the original aspect ratio.
   */
  getImageUrl(
    path: string,
    options?: { width?: number; height?: number },
  ): string {
    return getImageUrl(path, { origin: this.origin, ...options });
  }

  private async fetch<T>(
    path: string,
    options?: RequestInit & { ignoreResponseType?: boolean },
  ) {
    const { ignoreResponseType, ...opts } = options ?? {};

    const headers = new Headers();
    headers.set("User-Agent", this.userAgent);
    if (this.cookies) headers.set("Cookie", this.cookies);

    const response = await fetch(new URL(path, this.origin), {
      method: opts?.method ?? "GET",
      ...opts,
      headers: {
        ...Object.fromEntries(headers.entries()),
        ...opts?.headers,
      },
    });
    if (!response.ok) {
      throw Error(
        `${response.status} ${response.statusText}: ${await response.text()}`,
      );
    }
    console.log(response.headers.get("Content-Type"));
    if (ignoreResponseType) return null as T;

    if (!response.headers.get("Content-Type")?.startsWith("application/json")) {
      throw Error("Invalid non-JSON response. Are you properly authenticated?");
    }

    const data = (await response.json()) as T;
    return data;
  }

  async externalSearch(
    type: MediaItemType,
    query: string,
  ): Promise<ExternalMetadata[]> {
    const { results } = await this.fetch<ExternalSearchResponse>(
      `/api/contribute/externalsearch/${type.toLowerCase()}?${new URLSearchParams({ query })}`,
      { method: "GET" },
    );
    return removeInvalidTmdbImageUrls(results);
  }

  async getExternalData(
    type: MediaItemType,
    externalId: string | number,
    provider = "TMDB",
  ): Promise<ExternalMetadata> {
    const data = await this.gql.mutation({
      externalData: {
        __args: {
          input: {
            mediaType: type.toLowerCase(),
            externalId: String(externalId),
            provider,
          },
        },
        externalMetadata: { id: true, title: true, year: true, imageUrl: true },
        errors: {
          on_ContributionNotFoundError: { message: true },
          on_ExternalDataNotFoundError: { message: true },
        },
      },
    });
    if (!mutationHasData(data.externalData, "externalMetadata")) {
      throw Error("No external data found");
    }
    removeInvalidTmdbImageUrls([data.externalData.externalMetadata]);
    return data.externalData.externalMetadata;
  }

  /**
   * The same as getExternalData, but takes a contribution ID instead of a
   * provider-specific identifier
   *
   * @param contributionId the encoded ID of the contribution
   * @returns title metadata
   */
  async getContributionExternalData(
    contributionId: string,
  ): Promise<ExternalMetadata> {
    const data = await this.gql.mutation({
      externalDataForContribution: {
        __args: { input: { contributionId } },
        externalMetadata: { id: true, title: true, year: true, imageUrl: true },
        errors: {
          on_ContributionNotFoundError: { message: true },
          on_ExternalDataNotFoundError: { message: true },
        },
      },
    });
    if (
      !mutationHasData(data.externalDataForContribution, "externalMetadata")
    ) {
      throw Error("No external data found");
    }
    return data.externalDataForContribution.externalMetadata;
  }

  async getMyContributions<
    Selection extends UserContributionGenqlSelection = {
      id: true;
      encodedId: true;
      title: true;
      releaseTitle: true;
      year: true;
      mediaType: true;
      status: true;
      frontImageUrl: true;
      created: true;
    },
  >(
    input?: BidirectionalPaginationQuery<
      UserContributionFilterInput,
      UserContributionSortInput
    >,
    select?: Selection,
  ) {
    const data = await this.gql.query({
      myContributions: {
        __args: unifyPageArgs(input),
        nodes:
          select ??
          ({
            id: true,
            encodedId: true,
            title: true,
            releaseTitle: true,
            year: true,
            mediaType: true,
            status: true,
            frontImageUrl: true,
            created: true,
          } as Selection),
        pageInfo: { __scalar: true },
        totalCount: true,
      },
    });
    return {
      contributions: fixMediaTypes(
        data.myContributions?.nodes ?? [],
        "mediaType",
      ),
      page: data.myContributions
        ? unifyPageInfo(input, data.myContributions.pageInfo)
        : undefined,
      totalCount: data.myContributions?.totalCount ?? 0,
    };
  }

  /**
   * Get a contribution by its encoded ID
   * @param id encoded ID
   */
  async getContribution(id: string) {
    const data = await this.gql.query({
      myContributions: {
        __args: { where: { encodedId: { eq: id } } },
        nodes: {
          id: true,
          encodedId: true,
          year: true,
          releaseTitle: true,
          releaseSlug: true,
          status: true,
          mediaType: true,
          releaseDate: true,
          regionCode: true,
          title: true,
          asin: true,
          upc: true,
          externalProvider: true,
          externalId: true,
          frontImageUrl: true,
          backImageUrl: true,
          created: true,
          locale: true,
          discs: {
            encodedId: true,
            name: true,
            existingDiscPath: true,
            logsUploaded: true,
            format: true,
            slug: true,
            id: true,
          },
        },
      },
    });
    const contribution = data.myContributions?.nodes?.[0];
    if (!contribution) throw Error("No such contribution");

    fixMediaTypes([contribution], "mediaType");
    return contribution;
  }

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
  async uploadTemporalContributionImage(
    uploaderId: string,
    variant: "front" | "back",
    file: Blob,
  ) {
    const body = new FormData();
    body.append(`uploader-${uploaderId}`, file);

    await this.fetch(`/api/contribute/images/${variant}/upload/${uploaderId}`, {
      method: "POST",
      body,
      ignoreResponseType: true,
    });
    return {
      id: uploaderId,
      variant,
      url: `/api/contribute/images/Contributions/releaseImages/${uploaderId}/${variant}.jpg`,
    };
  }

  async deleteTemporalContributionImage(
    /** The ID used to upload the image */
    uploaderId: string,
    /** Whether the image is the front or back cover */
    variant: "front" | "back",
  ) {
    await this.fetch(`/api/contribute/images/${variant}/remove/${uploaderId}`, {
      method: "POST",
      ignoreResponseType: true,
    });
  }

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
  async uploadContributionImage(
    contributionId: string,
    variant: "front" | "back",
    file: Blob,
    uploaderId: string,
  ) {
    const body = new FormData();
    body.append(`uploader-${uploaderId}`, file);

    const data = await this.fetch<{ imageUrl: string }>(
      `/api/contribute/${contributionId}/images/${variant}/upload`,
      { method: "POST", body },
    );
    return { variant, url: data.imageUrl };
  }

  async deleteContributionImage(
    contributionId: string,
    variant: "front" | "back",
  ) {
    await this.fetch(
      `/api/contribute/${contributionId}/images/${variant}/delete`,
      { method: "POST", ignoreResponseType: true },
    );
  }

  async createContribution(
    input: Omit<ContributionMutationRequestInput, "releaseSlug"> &
      Partial<Pick<ContributionMutationRequestInput, "releaseSlug">>,
  ): Promise<WithEncodedId> {
    const data = await this.gql.mutation({
      createContribution: {
        __args: {
          input: {
            input: {
              releaseSlug: slugify(input.releaseTitle),
              ...input,
            },
          },
        },
        userContribution: { encodedId: true, id: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.createContribution, "userContribution")) {
      throw Error("Mutation returned no data");
    }
    return data.createContribution.userContribution;
  }

  async updateContribution(
    input: UpdateContributionInput,
  ): Promise<WithEncodedId> {
    const data = await this.gql.mutation({
      updateContribution: {
        __args: { input },
        userContribution: { encodedId: true, id: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.updateContribution, "userContribution")) {
      throw Error("Mutation returned no data");
    }
    return data.updateContribution.userContribution;
  }

  async deleteContribution(contributionId: string): Promise<void> {
    const data = await this.gql.mutation({
      deleteContribution: {
        __args: { input: { contributionId } },
        userContribution: { id: true },
        errors: { on_Error: { message: true } },
      },
    });
    mutationHasData(data.deleteContribution, "userContribution");
  }

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
  async hash(
    contributionId: string,
    files: (FileHashInfo | File)[],
  ): Promise<string> {
    const data = await this.gql.mutation({
      hashDisc: {
        __args: {
          input: {
            contributionId,
            files: files.map((file, i) =>
              file instanceof File
                ? {
                    index: i + 1,
                    name: file.name,
                    size: file.size,
                    creationTime: new Date(file.lastModified).toISOString(),
                  }
                : {
                    index: file.index,
                    name: file.name,
                    size: file.size,
                    creationTime: new Date(file.created).toISOString(),
                  },
            ),
          } satisfies HashDiscInput,
        },
        discHash: { hash: true },
        errors: { on_ContributionNotFoundError: { message: true } },
      },
    });
    if (!mutationHasData(data.hashDisc, "discHash")) {
      throw Error("Server did not return a hash");
    }
    return data.hashDisc.discHash.hash;
  }

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
  async createDisc(
    contributionId: string,
    contentHash: string,
    format: DiscFormat,
    name: string,
    slug?: string,
  ): Promise<WithEncodedId> {
    const data = await this.gql.mutation({
      createDisc: {
        __args: {
          input: {
            contentHash,
            contributionId,
            format,
            name,
            slug: slug ?? slugify(name),
          },
        },
        userContributionDisc: { encodedId: true, id: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.createDisc, "userContributionDisc")) {
      throw Error("Mutation returned no data");
    }
    return data.createDisc.userContributionDisc;
  }

  async updateDisc(
    contributionId: string,
    discId: string,
    input: Omit<UpdateDiscInput, "contributionId" | "discId">,
  ): Promise<WithEncodedId> {
    const data = await this.gql.mutation({
      updateDisc: {
        __args: { input: { contributionId, discId, ...input } },
        userContributionDisc: { encodedId: true, id: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.updateDisc, "userContributionDisc")) {
      throw Error("Mutation returned no data");
    }
    return data.updateDisc.userContributionDisc;
  }

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
  async uploadDiscLogs(
    contributionId: string,
    discId: string,
    logs: string,
  ): Promise<void> {
    await this.fetch(`/api/contribute/${contributionId}/discs/${discId}/logs`, {
      method: "POST",
      body: logs,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  /**
   * Check (poll) the status of uploading logs. If you are using
   * {@link uploadDiscLogs} in the same application, this endpoint is probably
   * not useful to you, as you can just wait for the promise to resolve.
   *
   * @param discId encoded ID for the disc
   * @returns upload status for the disc's logs
   */
  async getDiscUploadStatus(discId: string) {
    const data = await this.gql.mutation({
      discUploadStatus: {
        __args: { input: { discId } },
        discUploadStatus: { logsUploaded: true, logUploadError: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.discUploadStatus, "discUploadStatus")) {
      throw Error("Mutation returned no data");
    }
    return data.discUploadStatus.discUploadStatus;
  }

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
  async getDiscLogs(contributionId: string, discId: string) {
    const data = await this.gql.mutation({
      discLogs: {
        __args: { input: { contributionId, discId } },
        discLogs: {
          info: {
            titles: {
              index: true,
              chapterCount: true,
              length: true,
              displaySize: true,
              size: true,
              playlist: true,
              segmentMap: true,
              comment: true,
              javaComment: true,
              segments: { type: true, name: true, audioType: true },
            },
          },
          disc: {
            contentHash: true,
            format: true,
            name: true,
            slug: true,
            logsUploaded: true,
            existingDiscPath: true,
            encodedId: true,
            items: {
              description: true,
              encodedId: true,
              name: true,
              source: true,
              duration: true,
              size: true,
              chapterCount: true,
              segmentCount: true,
              segmentMap: true,
              type: true,
              season: true,
              episode: true,
              audioTracks: {
                encodedId: true,
                index: true,
                title: true,
                id: true,
              },
              chapters: {
                encodedId: true,
                index: true,
                title: true,
                id: true,
              },
              id: true,
            },
            id: true,
          },
          contribution: {
            encodedId: true,
            mediaType: true,
            title: true,
            year: true,
            releaseTitle: true,
            discs: {
              encodedId: true,
              name: true,
              items: {
                chapterCount: true,
                name: true,
                chapters: {
                  encodedId: true,
                  index: true,
                  title: true,
                  id: true,
                },
                id: true,
              },
              id: true,
            },
            id: true,
          },
        },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.discLogs, "discLogs")) {
      throw Error("Server returned no log data");
    }
    return data.discLogs.discLogs;
  }

  async addItemToDisc(
    contributionId: string,
    discId: string,
    input: Omit<AddItemToDiscInput, "contributionId" | "discId">,
  ): Promise<WithEncodedId> {
    const data = await this.gql.mutation({
      addItemToDisc: {
        __args: { input: { contributionId, discId, ...input } },
        userContributionDiscItem: { encodedId: true, id: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.addItemToDisc, "userContributionDiscItem")) {
      throw Error("Mutation returned no data");
    }
    return data.addItemToDisc.userContributionDiscItem;
  }

  async updateItemOnDisc(
    contributionId: string,
    discId: string,
    itemId: string,
    input: Omit<EditItemOnDiscInput, "contributionId" | "discId" | "itemId">,
  ): Promise<WithEncodedId> {
    const data = await this.gql.mutation({
      editItemOnDisc: {
        __args: { input: { contributionId, discId, itemId, ...input } },
        userContributionDiscItem: { encodedId: true, id: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.editItemOnDisc, "userContributionDiscItem")) {
      throw Error("Mutation returned no data");
    }
    return data.editItemOnDisc.userContributionDiscItem;
  }

  async deleteItemFromDisc(
    contributionId: string,
    discId: string,
    itemId: string,
  ): Promise<void> {
    const data = await this.gql.mutation({
      deleteItemFromDisc: {
        __args: { input: { contributionId, discId, itemId } },
        userContributionDiscItem: {
          __typename: true,
          on_UserContributionDiscItem: { id: true },
        },
        errors: { on_Error: { message: true } },
      },
    });
    mutationHasData(data.deleteItemFromDisc, "userContributionDiscItem");
  }

  /**
   * Change the order of a contribution's discs by submitting all IDs in the
   * new desired order.
   *
   * @param contributionId encoded ID of the contribution that the discs are from
   * @param discIds new order for all disc IDs
   * @returns all discs in the contribution
   */
  async reorderDiscs(contributionId: string, discIds: string[]) {
    const data = await this.gql.mutation({
      reorderDiscs: {
        __args: { input: { contributionId, discIds } },
        userContributionDisc: {
          id: true,
          encodedId: true,
          index: true,
          name: true,
          slug: true,
        },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.reorderDiscs, "userContributionDisc")) {
      throw Error("Mutation returned no data");
    }
    return data.reorderDiscs.userContributionDisc;
  }

  async addAudioTrackToItem(
    contributionId: string,
    discId: string,
    itemId: string,
    trackIndex: number,
    trackName: string,
  ): Promise<WithEncodedId> {
    const data = await this.gql.mutation({
      addAudioTrackToItem: {
        __args: {
          input: { contributionId, discId, itemId, trackIndex, trackName },
        },
        userContributionAudioTrack: { encodedId: true, id: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (
      !mutationHasData(data.addAudioTrackToItem, "userContributionAudioTrack")
    ) {
      throw Error("Mutation returned no data");
    }
    return data.addAudioTrackToItem.userContributionAudioTrack;
  }

  async addChapterToItem(
    contributionId: string,
    discId: string,
    itemId: string,
    chapterIndex: number,
    chapterName: string,
  ): Promise<WithEncodedId> {
    const data = await this.gql.mutation({
      addChapterToItem: {
        __args: {
          input: { contributionId, discId, itemId, chapterIndex, chapterName },
        },
        userContributionChapter: { encodedId: true, id: true },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.addChapterToItem, "userContributionChapter")) {
      throw Error("Mutation returned no data");
    }
    return data.addChapterToItem.userContributionChapter;
  }

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
  async getSeriesEpisodes(contributionId: string) {
    const data = await this.gql.mutation({
      episodeNames: {
        __args: { input: { contributionId } },
        seriesEpisodeNames: {
          __scalar: true,
          episodes: { __scalar: true },
        },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.episodeNames, "seriesEpisodeNames")) {
      throw Error("Mutation returned no data");
    }
    const result = data.episodeNames.seriesEpisodeNames;
    return {
      name: result.seriesTitle,
      year: result.seriesYear,
      episodes: result.episodes,
    };
  }

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
  async findSeriesEpisode(
    contributionId: string,
    season: string | number,
    episode: string | number,
  ) {
    const data = await this.gql.mutation({
      episodeNames: {
        __args: { input: { contributionId } },
        seriesEpisodeNames: {
          tryFind: {
            __args: { season: String(season), episode: String(episode) },
            episodeName: true,
            seasonNumber: true,
            episodeNumber: true,
          },
        },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.episodeNames, "seriesEpisodeNames")) {
      throw Error("Mutation returned no data");
    }
    const result = data.episodeNames.seriesEpisodeNames.tryFind;
    if (result) {
      return {
        name: result.episodeName,
        season: result.seasonNumber,
        episode: result.episodeNumber,
      };
    }
    return null;
  }

  async generateApiKey(
    name: string,
    ownerEmail: string,
    roles: string[],
    expiresAt?: Date,
  ) {
    const data = await this.gql.mutation({
      generateApiKey: {
        __args: { input: { name, ownerEmail, roles, expiresAt } },
        name: true,
        ownerEmail: true,
        key: true,
        keyPrefix: true,
      },
    });
    return data.generateApiKey;
  }

  /**
   * Get a list of API keys.
   *
   * @param input customize returned results
   * @returns list of API keys as well as page info for pagination
   */
  async getApiKeys(
    input?: BidirectionalPaginationQuery<
      ApiKeyInfoFilterInput,
      ApiKeyInfoSortInput
    >,
  ) {
    const data = await this.gql.query({
      apiKeys: {
        __args: unifyPageArgs(input),
        nodes: {
          name: true,
          ownerEmail: true,
          roles: true,
          createdAt: true,
          expiresAt: true,
          lastUsedAt: true,
          isActive: true,
        },
        pageInfo: { __scalar: true },
      },
    });
    return {
      keys: data.apiKeys?.nodes ?? [],
      page: data.apiKeys?.pageInfo
        ? unifyPageInfo(input, data.apiKeys.pageInfo)
        : undefined,
    };
  }

  async getApiKey(keyPrefix: string) {
    const data = await this.getApiKeys({
      query: { keyPrefix: { eq: keyPrefix } },
    });
    if (data.keys.length === 0) {
      throw Error(`No such key with the prefix "${keyPrefix}"`);
    }
    return data.keys[0];
  }

  /**
   * Get a list of API key usage logs.
   *
   * @param input customize returned results
   * @returns list of logs as well as pagination info
   */
  async getApiKeyUsageLogs(
    input?: BidirectionalPaginationQuery<
      ApiKeyUsageLogInfoFilterInput,
      ApiKeyUsageLogInfoSortInput
    >,
  ) {
    const data = await this.gql.query({
      apiKeyUsageLogs: {
        __args: unifyPageArgs(input),
        nodes: { __scalar: true },
        pageInfo: { __scalar: true },
      },
    });
    return {
      logs: data.apiKeyUsageLogs?.nodes ?? [],
      page: data.apiKeyUsageLogs?.pageInfo
        ? unifyPageInfo(input, data.apiKeyUsageLogs.pageInfo)
        : undefined,
    };
  }

  async revokeApiKey(keyPrefix: string) {
    const data = await this.gql.mutation({
      revokeApiKey: {
        __args: { input: { keyPrefix } },
        apiKeyInfo: {
          name: true,
          ownerEmail: true,
          roles: true,
          createdAt: true,
          expiresAt: true,
          lastUsedAt: true,
        },
        errors: {
          on_ApiKeyNotFoundError: { message: true },
          on_Error: { message: true },
        },
      },
    });
    if (!mutationHasData(data.revokeApiKey, "apiKeyInfo")) {
      throw Error("Mutation returned no data");
    }
    return data.revokeApiKey.apiKeyInfo;
  }

  /**
   *
   * @param contributionId encoded contribution ID
   * @param input customize returned results
   */
  async getContributionChat(
    contributionId: string,
    input?: BidirectionalPaginationQuery<never, UserMessageSortInput>,
  ) {
    const data = await this.gql.query({
      contributionChat: {
        __args: { contributionId, ...unifyPageArgs(input) },
        nodes: {
          contributionId: true,
          createdAt: true,
          id: true,
          isRead: true,
          message: true,
          fromUserId: true,
          toUserId: true,
          type: true,
        },
        pageInfo: { __scalar: true },
        totalCount: true,
      },
    });
    if (!data.contributionChat) {
      throw Error("No contribution chat for that ID");
    }
    return {
      messages: data.contributionChat.nodes,
      page: unifyPageInfo(input, data.contributionChat.pageInfo),
      totalCount: data.contributionChat.totalCount,
    };
  }

  async getContributionHistory(
    contributionId: number,
    input?: BidirectionalPaginationQuery<never, ContributionHistorySortInput>,
  ) {
    const data = await this.gql.query({
      contributionHistory: {
        __args: { contributionId, ...unifyPageArgs(input) },
        nodes: {
          contributionId: true,
          description: true,
          id: true,
          timeStamp: true,
          type: true,
          userId: true,
        },
        pageInfo: { __scalar: true },
        totalCount: true,
      },
    });
    if (!data.contributionHistory) {
      throw Error("No contribution history for that ID");
    }
    return {
      history: data.contributionHistory.nodes,
      page: unifyPageInfo(input, data.contributionHistory.pageInfo),
      totalCount: data.contributionHistory.totalCount,
    };
  }

  async getContributions<
    Selection extends UserContributionGenqlSelection = {
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
    },
  >(
    input?: BidirectionalPaginationQuery<
      UserContributionFilterInput,
      UserContributionSortInput
    >,
    select?: Selection,
  ) {
    const data = await this.gql.query({
      contributions: {
        __args: unifyPageArgs(input),
        nodes:
          select ??
          ({
            id: true,
            encodedId: true,
            title: true,
            year: true,
            mediaType: true,
            status: true,
            frontImageUrl: true,
            backImageUrl: true,
            created: true,
            releaseTitle: true,
            releaseSlug: true,
          } as Selection),
        pageInfo: { __scalar: true },
        totalCount: true,
      },
    });
    return {
      contributions: fixMediaTypes(
        data.contributions?.nodes ?? [],
        "mediaType",
      ),
      page: data.contributions
        ? unifyPageInfo(input, data.contributions.pageInfo)
        : undefined,
      totalCount: data.contributions?.totalCount ?? 0,
    };
  }

  /**
   * @returns Whether the client has any unread messages
   */
  async hasUnreadMessages(): Promise<boolean> {
    const data = await this.gql.query({ hasUnreadMessages: true });
    return data.hasUnreadMessages;
  }

  /**
   * Mark all messages as read for a given contribution thread
   *
   * @param contributionId encoded contribution ID that the messages apply to
   * @returns
   */
  async markMessagesAsRead(contributionId: string): Promise<boolean> {
    const data = await this.gql.mutation({
      markMessagesAsRead: {
        __args: { input: { contributionId } },
        boolean: true,
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data.markMessagesAsRead, "boolean")) {
      throw Error("Mutation returned no data");
    }
    return data.markMessagesAsRead.boolean;
  }

  /**
   * Send a message in a contribution thread.
   *
   * @param contributionId encoded contribution ID
   * @param content the message content to send
   * @param type if you are an admin, this may be ADMIN_MESSAGE, but it defaults to USER_MESSAGE
   * @returns the sent message
   */
  async sendMessage(
    contributionId: string,
    content: string,
    type: UserMessageType = enumUserMessageType.USER_MESSAGE,
  ) {
    const mutation =
      type === enumUserMessageType.ADMIN_MESSAGE
        ? "sendAdminMessage"
        : "sendUserMessage";
    const data = await this.gql.mutation({
      [mutation]: {
        __args: { input: { contributionId, message: content } },
        userMessage: {
          contributionId: true,
          createdAt: true,
          id: true,
          isRead: true,
          message: true,
          fromUserId: true,
          toUserId: true,
          type: true,
        },
        errors: { on_Error: { message: true } },
      },
    });
    if (!mutationHasData(data[mutation], "userMessage")) {
      throw Error("Mutation returned no data");
    }
    return data[mutation].userMessage;
  }

  /**
   * Get a list of message threads that the client is part of
   * @returns Message threads keyed by contribution ID
   */
  async getMessageThreads() {
    const data = await this.gql.query({ messageThreads: { __scalar: true } });
    return data.messageThreads;
  }

  async getMyMessages(
    input?: BidirectionalPaginationQuery<never, UserMessageSortInput>,
  ) {
    const data = await this.gql.query({
      myMessages: {
        __args: input,
        nodes: {
          contributionId: true,
          createdAt: true,
          id: true,
          isRead: true,
          message: true,
          fromUserId: true,
          toUserId: true,
          type: true,
        },
        pageInfo: { __scalar: true },
        totalCount: true,
      },
    });
    return {
      messages: data.myMessages?.nodes ?? [],
      page: data.myMessages
        ? unifyPageInfo(input, data.myMessages.pageInfo)
        : undefined,
      totalCount: data.myMessages?.totalCount ?? 0,
    };
  }

  async getAmazonProductMetadata(asin: string) {
    const data = await this.gql.query({
      amazonProductMetadata: { __args: { asin }, __scalar: true },
    });
    if (!data.amazonProductMetadata) {
      throw Error(`No metadata found for ASIN "${asin}"`);
    }
    return data.amazonProductMetadata;
  }
}
