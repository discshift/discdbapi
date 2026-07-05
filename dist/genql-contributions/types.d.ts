declare const _default: {
    scalars: number[];
    types: {
        Error: {
            message: number[];
            on_ApiKeyNotFoundError: number[];
            on_AuthenticationError: number[];
            on_ContributionNotFoundError: number[];
            on_CouldNotParseLogsError: number[];
            on_DiscItemNotFoundError: number[];
            on_DiscNotFoundError: number[];
            on_ExternalDataNotFoundError: number[];
            on_ExternalDataSerializationError: number[];
            on_FieldRequiredError: number[];
            on_InvalidContributionStatusError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_LogsNotFoundError: number[];
            __typename: number[];
        };
        String: {};
        AddAudioTrackToItemPayload: {
            userContributionAudioTrack: number[];
            errors: number[];
            __typename: number[];
        };
        AddChapterToItemPayload: {
            userContributionChapter: number[];
            errors: number[];
            __typename: number[];
        };
        AddItemToDiscPayload: {
            userContributionDiscItem: number[];
            errors: number[];
            __typename: number[];
        };
        AmazonProductMetadata: {
            asin: number[];
            title: number[];
            upc: number[];
            frontImageUrl: number[];
            backImageUrl: number[];
            releaseDate: number[];
            numberOfDiscs: number[];
            aspectRatio: number[];
            isDiscontinued: number[];
            mpaaRating: number[];
            modelNumber: number[];
            director: number[];
            mediaFormat: number[];
            actors: number[];
            producers: number[];
            language: number[];
            dubbed: number[];
            subtitles: number[];
            studio: number[];
            __typename: number[];
        };
        Int: {};
        Boolean: {};
        ApiKeyInfo: {
            name: number[];
            keyPrefix: number[];
            isActive: number[];
            logUsage: number[];
            roles: number[];
            ownerEmail: number[];
            createdAt: number[];
            expiresAt: number[];
            lastUsedAt: number[];
            __typename: number[];
        };
        ApiKeyNotFoundError: {
            message: number[];
            __typename: number[];
        };
        ApiKeyUsageLogInfo: {
            apiKeyPrefix: number[];
            apiKeyName: number[];
            timestamp: number[];
            operationName: number[];
            fieldCost: number[];
            typeCost: number[];
            durationMs: number[];
            __typename: number[];
        };
        Float: {};
        ApiKeyUsageLogsConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            __typename: number[];
        };
        ApiKeyUsageLogsEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        ApiKeysConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            __typename: number[];
        };
        ApiKeysEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        AuthenticationError: {
            message: number[];
            __typename: number[];
        };
        ContributionChatConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            totalCount: number[];
            __typename: number[];
        };
        ContributionChatEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        ContributionHistory: {
            id: number[];
            contributionId: number[];
            timeStamp: number[];
            description: number[];
            userId: number[];
            type: number[];
            __typename: number[];
        };
        ContributionHistoryConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            totalCount: number[];
            __typename: number[];
        };
        ContributionHistoryEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        ContributionNotFoundError: {
            message: number[];
            __typename: number[];
        };
        ContributionsConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            totalCount: number[];
            __typename: number[];
        };
        ContributionsEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        CouldNotParseLogsError: {
            message: number[];
            __typename: number[];
        };
        CreateContributionPayload: {
            userContribution: number[];
            errors: number[];
            __typename: number[];
        };
        CreateDiscPayload: {
            userContributionDisc: number[];
            errors: number[];
            __typename: number[];
        };
        DeleteContributionPayload: {
            userContribution: number[];
            errors: number[];
            __typename: number[];
        };
        DeleteItemFromDiscPayload: {
            userContributionDiscItem: number[];
            errors: number[];
            __typename: number[];
        };
        DiscHash: {
            hash: number[];
            __typename: number[];
        };
        DiscInfo: {
            name: number[];
            type: number[];
            languageCode: number[];
            language: number[];
            titles: number[];
            hashInfo: number[];
            __typename: number[];
        };
        DiscItemNotFoundError: {
            message: number[];
            __typename: number[];
        };
        DiscLogs: {
            info: number[];
            disc: number[];
            contribution: number[];
            __typename: number[];
        };
        DiscLogsPayload: {
            discLogs: number[];
            errors: number[];
            __typename: number[];
        };
        DiscNotFoundError: {
            message: number[];
            __typename: number[];
        };
        DiscUploadStatus: {
            logsUploaded: number[];
            logUploadError: number[];
            __typename: number[];
        };
        DiscUploadStatusPayload: {
            discUploadStatus: number[];
            errors: number[];
            __typename: number[];
        };
        EditItemOnDiscPayload: {
            userContributionDiscItem: number[];
            errors: number[];
            __typename: number[];
        };
        EpisodeNamesPayload: {
            seriesEpisodeNames: number[];
            errors: number[];
            __typename: number[];
        };
        ExternalDataForContributionPayload: {
            externalMetadata: number[];
            errors: number[];
            __typename: number[];
        };
        ExternalDataNotFoundError: {
            message: number[];
            __typename: number[];
        };
        ExternalDataPayload: {
            externalMetadata: number[];
            errors: number[];
            __typename: number[];
        };
        ExternalDataSerializationError: {
            message: number[];
            __typename: number[];
        };
        ExternalMetadata: {
            id: number[];
            title: number[];
            year: number[];
            imageUrl: number[];
            __typename: number[];
        };
        FieldRequiredError: {
            message: number[];
            __typename: number[];
        };
        GenerateApiKeyPayload: {
            key: number[];
            keyPrefix: number[];
            name: number[];
            ownerEmail: number[];
            __typename: number[];
        };
        HashDiscPayload: {
            discHash: number[];
            errors: number[];
            __typename: number[];
        };
        HashInfoLogLine: {
            matches: (number | {
                prefix: (string | number)[];
            })[];
            index: number[];
            name: number[];
            creationTime: number[];
            size: number[];
            originalLine: number[];
            prefix: number[];
            __typename: number[];
        };
        InvalidContributionStatusError: {
            message: number[];
            __typename: number[];
        };
        InvalidIdError: {
            message: number[];
            __typename: number[];
        };
        InvalidOwnershipError: {
            message: number[];
            __typename: number[];
        };
        LogsNotFoundError: {
            message: number[];
            __typename: number[];
        };
        MarkMessagesAsReadPayload: {
            boolean: number[];
            errors: number[];
            __typename: number[];
        };
        MessageThread: {
            contributionId: number[];
            encodedContributionId: number[];
            contributionTitle: number[];
            mediaTitle: number[];
            lastMessagePreview: number[];
            lastMessageAt: number[];
            unreadCount: number[];
            totalCount: number[];
            __typename: number[];
        };
        MyContributionsConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            totalCount: number[];
            __typename: number[];
        };
        MyContributionsEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        MyMessagesConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            totalCount: number[];
            __typename: number[];
        };
        MyMessagesEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        PageInfo: {
            hasNextPage: number[];
            hasPreviousPage: number[];
            startCursor: number[];
            endCursor: number[];
            __typename: number[];
        };
        ReorderDiscsPayload: {
            userContributionDisc: number[];
            errors: number[];
            __typename: number[];
        };
        RevokeApiKeyPayload: {
            apiKeyInfo: number[];
            errors: number[];
            __typename: number[];
        };
        Segment: {
            index: number[];
            type: number[];
            name: number[];
            audioType: number[];
            languageCode: number[];
            language: number[];
            resolution: number[];
            aspectRatio: number[];
            __typename: number[];
        };
        SendAdminMessagePayload: {
            userMessage: number[];
            errors: number[];
            __typename: number[];
        };
        SendUserMessagePayload: {
            userMessage: number[];
            errors: number[];
            __typename: number[];
        };
        SeriesEpisodeNameEntry: {
            seasonNumber: number[];
            episodeNumber: number[];
            episodeName: number[];
            __typename: number[];
        };
        SeriesEpisodeNames: {
            tryFind: (number | {
                season: (string | number)[];
                episode: (string | number)[];
            })[];
            seriesTitle: number[];
            seriesYear: number[];
            episodes: number[];
            __typename: number[];
        };
        Title: {
            index: number[];
            chapterCount: number[];
            length: number[];
            displaySize: number[];
            size: number[];
            playlist: number[];
            segmentMap: number[];
            comment: number[];
            javaComment: number[];
            segments: number[];
            lengthAsTimeSpan: number[];
            __typename: number[];
        };
        UpdateContributionPayload: {
            userContribution: number[];
            errors: number[];
            __typename: number[];
        };
        UpdateDiscPayload: {
            userContributionDisc: number[];
            errors: number[];
            __typename: number[];
        };
        UserContribution: {
            id: number[];
            userId: number[];
            created: number[];
            status: number[];
            discs: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            hashItems: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            mediaType: number[];
            externalId: number[];
            externalProvider: number[];
            releaseDate: number[];
            asin: number[];
            upc: number[];
            frontImageUrl: number[];
            backImageUrl: number[];
            releaseTitle: number[];
            releaseSlug: number[];
            locale: number[];
            regionCode: number[];
            title: number[];
            year: number[];
            titleSlug: number[];
            encodedId: number[];
            __typename: number[];
        };
        UserContributionAudioTrack: {
            id: number[];
            index: number[];
            title: number[];
            item: number[];
            encodedId: number[];
            __typename: number[];
        };
        UserContributionChapter: {
            id: number[];
            index: number[];
            title: number[];
            item: number[];
            encodedId: number[];
            __typename: number[];
        };
        UserContributionDisc: {
            id: number[];
            userContribution: number[];
            contentHash: number[];
            format: number[];
            name: number[];
            slug: number[];
            logsUploaded: number[];
            logUploadError: number[];
            index: number[];
            existingDiscPath: number[];
            items: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            encodedId: number[];
            __typename: number[];
        };
        UserContributionDiscHashItem: {
            id: number[];
            userContribution: number[];
            discHash: number[];
            index: number[];
            name: number[];
            creationTime: number[];
            size: number[];
            encodedId: number[];
            __typename: number[];
        };
        UserContributionDiscItem: {
            id: number[];
            disc: number[];
            name: number[];
            source: number[];
            duration: number[];
            size: number[];
            chapterCount: number[];
            segmentCount: number[];
            segmentMap: number[];
            type: number[];
            description: number[];
            season: number[];
            episode: number[];
            chapters: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            audioTracks: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            encodedId: number[];
            __typename: number[];
        };
        UserMessage: {
            id: number[];
            contributionId: number[];
            fromUserId: number[];
            toUserId: number[];
            message: number[];
            isRead: number[];
            createdAt: number[];
            type: number[];
            __typename: number[];
        };
        AddAudioTrackToItemError: {
            on_ContributionNotFoundError: number[];
            on_DiscNotFoundError: number[];
            on_DiscItemNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        AddChapterToItemError: {
            on_ContributionNotFoundError: number[];
            on_DiscNotFoundError: number[];
            on_DiscItemNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        AddItemToDiscError: {
            on_ContributionNotFoundError: number[];
            on_DiscNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        CreateContributionError: {
            on_AuthenticationError: number[];
            on_Error: number[];
            __typename: number[];
        };
        CreateDiscError: {
            on_ContributionNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        DeleteContributionError: {
            on_ContributionNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_InvalidContributionStatusError: number[];
            on_Error: number[];
            __typename: number[];
        };
        DeleteItemFromDiscError: {
            on_ContributionNotFoundError: number[];
            on_DiscNotFoundError: number[];
            on_DiscItemNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        DiscLogsError: {
            on_LogsNotFoundError: number[];
            on_ContributionNotFoundError: number[];
            on_DiscNotFoundError: number[];
            on_CouldNotParseLogsError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        DiscUploadStatusError: {
            on_DiscNotFoundError: number[];
            on_FieldRequiredError: number[];
            on_InvalidIdError: number[];
            on_Error: number[];
            __typename: number[];
        };
        EditItemOnDiscError: {
            on_ContributionNotFoundError: number[];
            on_DiscNotFoundError: number[];
            on_DiscItemNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        EpisodeNamesError: {
            on_ContributionNotFoundError: number[];
            on_ExternalDataNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        ExternalDataError: {
            on_ContributionNotFoundError: number[];
            on_ExternalDataNotFoundError: number[];
            on_Error: number[];
            __typename: number[];
        };
        ExternalDataForContributionError: {
            on_ContributionNotFoundError: number[];
            on_ExternalDataSerializationError: number[];
            on_ExternalDataNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        HashDiscError: {
            on_ContributionNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        MarkMessagesAsReadError: {
            on_AuthenticationError: number[];
            on_Error: number[];
            __typename: number[];
        };
        ReorderDiscsError: {
            on_ContributionNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        RevokeApiKeyError: {
            on_ApiKeyNotFoundError: number[];
            on_Error: number[];
            __typename: number[];
        };
        SendAdminMessageError: {
            on_ContributionNotFoundError: number[];
            on_AuthenticationError: number[];
            on_Error: number[];
            __typename: number[];
        };
        SendUserMessageError: {
            on_ContributionNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        UpdateContributionError: {
            on_ContributionNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_InvalidContributionStatusError: number[];
            on_Error: number[];
            __typename: number[];
        };
        UpdateDiscError: {
            on_ContributionNotFoundError: number[];
            on_DiscNotFoundError: number[];
            on_AuthenticationError: number[];
            on_InvalidIdError: number[];
            on_InvalidOwnershipError: number[];
            on_Error: number[];
            __typename: number[];
        };
        AddAudioTrackToItemInput: {
            contributionId: number[];
            discId: number[];
            itemId: number[];
            trackIndex: number[];
            trackName: number[];
            __typename: number[];
        };
        AddChapterToItemInput: {
            contributionId: number[];
            discId: number[];
            itemId: number[];
            chapterIndex: number[];
            chapterName: number[];
            __typename: number[];
        };
        AddItemToDiscInput: {
            contributionId: number[];
            discId: number[];
            name: number[];
            source: number[];
            duration: number[];
            size: number[];
            chapterCount: number[];
            segmentCount: number[];
            segmentMap: number[];
            type: number[];
            description: number[];
            season: number[];
            episode: number[];
            __typename: number[];
        };
        ApiKeyInfoFilterInput: {
            and: number[];
            or: number[];
            name: number[];
            keyPrefix: number[];
            isActive: number[];
            logUsage: number[];
            roles: number[];
            ownerEmail: number[];
            createdAt: number[];
            expiresAt: number[];
            lastUsedAt: number[];
            __typename: number[];
        };
        ApiKeyInfoSortInput: {
            name: number[];
            keyPrefix: number[];
            isActive: number[];
            logUsage: number[];
            roles: number[];
            ownerEmail: number[];
            createdAt: number[];
            expiresAt: number[];
            lastUsedAt: number[];
            __typename: number[];
        };
        ApiKeyUsageLogInfoFilterInput: {
            and: number[];
            or: number[];
            apiKeyPrefix: number[];
            apiKeyName: number[];
            timestamp: number[];
            operationName: number[];
            fieldCost: number[];
            typeCost: number[];
            durationMs: number[];
            __typename: number[];
        };
        ApiKeyUsageLogInfoSortInput: {
            apiKeyPrefix: number[];
            apiKeyName: number[];
            timestamp: number[];
            operationName: number[];
            fieldCost: number[];
            typeCost: number[];
            durationMs: number[];
            __typename: number[];
        };
        BooleanOperationFilterInput: {
            eq: number[];
            neq: number[];
            __typename: number[];
        };
        ContributionHistorySortInput: {
            id: number[];
            contributionId: number[];
            timeStamp: number[];
            description: number[];
            userId: number[];
            type: number[];
            __typename: number[];
        };
        ContributionMutationRequestInput: {
            mediaType: number[];
            externalId: number[];
            externalProvider: number[];
            releaseDate: number[];
            asin: number[];
            upc: number[];
            frontImageUrl: number[];
            backImageUrl: number[];
            releaseTitle: number[];
            releaseSlug: number[];
            regionCode: number[];
            locale: number[];
            title: number[];
            year: number[];
            storageId: number[];
            status: number[];
            __typename: number[];
        };
        CreateContributionInput: {
            input: number[];
            __typename: number[];
        };
        CreateDiscInput: {
            contributionId: number[];
            contentHash: number[];
            format: number[];
            name: number[];
            slug: number[];
            existingDiscPath: number[];
            __typename: number[];
        };
        DateTimeOperationFilterInput: {
            eq: number[];
            neq: number[];
            in: number[];
            nin: number[];
            gt: number[];
            ngt: number[];
            gte: number[];
            ngte: number[];
            lt: number[];
            nlt: number[];
            lte: number[];
            nlte: number[];
            __typename: number[];
        };
        DeleteContributionInput: {
            contributionId: number[];
            __typename: number[];
        };
        DeleteItemFromDiscInput: {
            contributionId: number[];
            discId: number[];
            itemId: number[];
            __typename: number[];
        };
        DiscLogsInput: {
            contributionId: number[];
            discId: number[];
            __typename: number[];
        };
        DiscUploadStatusInput: {
            discId: number[];
            __typename: number[];
        };
        EditItemOnDiscInput: {
            contributionId: number[];
            discId: number[];
            itemId: number[];
            name: number[];
            source: number[];
            duration: number[];
            size: number[];
            chapterCount: number[];
            segmentCount: number[];
            segmentMap: number[];
            type: number[];
            description: number[];
            season: number[];
            episode: number[];
            __typename: number[];
        };
        EncodedIdOperationFilterInput: {
            and: number[];
            or: number[];
            eq: number[];
            neq: number[];
            __typename: number[];
        };
        EpisodeNamesInput: {
            contributionId: number[];
            __typename: number[];
        };
        ExternalDataForContributionInput: {
            contributionId: number[];
            __typename: number[];
        };
        ExternalDataInput: {
            externalId: number[];
            mediaType: number[];
            provider: number[];
            __typename: number[];
        };
        FileHashInfoInput: {
            index: number[];
            name: number[];
            creationTime: number[];
            size: number[];
            __typename: number[];
        };
        FloatOperationFilterInput: {
            eq: number[];
            neq: number[];
            in: number[];
            nin: number[];
            gt: number[];
            ngt: number[];
            gte: number[];
            ngte: number[];
            lt: number[];
            nlt: number[];
            lte: number[];
            nlte: number[];
            __typename: number[];
        };
        GenerateApiKeyInput: {
            name: number[];
            ownerEmail: number[];
            roles: number[];
            expiresAt: number[];
            __typename: number[];
        };
        HashDiscInput: {
            contributionId: number[];
            files: number[];
            __typename: number[];
        };
        IntOperationFilterInput: {
            eq: number[];
            neq: number[];
            in: number[];
            nin: number[];
            gt: number[];
            ngt: number[];
            gte: number[];
            ngte: number[];
            lt: number[];
            nlt: number[];
            lte: number[];
            nlte: number[];
            __typename: number[];
        };
        ListEncodedIdFilterTypeOfUserContributionAudioTrackFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        ListEncodedIdFilterTypeOfUserContributionChapterFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        ListEncodedIdFilterTypeOfUserContributionDiscFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        ListEncodedIdFilterTypeOfUserContributionDiscHashItemFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        ListEncodedIdFilterTypeOfUserContributionDiscItemFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        LongOperationFilterInput: {
            eq: number[];
            neq: number[];
            in: number[];
            nin: number[];
            gt: number[];
            ngt: number[];
            gte: number[];
            ngte: number[];
            lt: number[];
            nlt: number[];
            lte: number[];
            nlte: number[];
            __typename: number[];
        };
        MarkMessagesAsReadInput: {
            contributionId: number[];
            __typename: number[];
        };
        ReorderDiscsInput: {
            contributionId: number[];
            discIds: number[];
            __typename: number[];
        };
        RevokeApiKeyInput: {
            keyPrefix: number[];
            __typename: number[];
        };
        SendAdminMessageInput: {
            contributionId: number[];
            message: number[];
            __typename: number[];
        };
        SendUserMessageInput: {
            contributionId: number[];
            message: number[];
            __typename: number[];
        };
        StringOperationFilterInput: {
            and: number[];
            or: number[];
            eq: number[];
            neq: number[];
            contains: number[];
            ncontains: number[];
            in: number[];
            nin: number[];
            startsWith: number[];
            nstartsWith: number[];
            endsWith: number[];
            nendsWith: number[];
            __typename: number[];
        };
        UpdateContributionInput: {
            contributionId: number[];
            asin: number[];
            upc: number[];
            releaseDate: number[];
            releaseTitle: number[];
            releaseSlug: number[];
            locale: number[];
            regionCode: number[];
            frontImageUrl: number[];
            backImageUrl: number[];
            deleteBackImage: number[];
            __typename: number[];
        };
        UpdateDiscInput: {
            contributionId: number[];
            discId: number[];
            format: number[];
            name: number[];
            slug: number[];
            __typename: number[];
        };
        UserContributionAudioTrackFilterInput: {
            and: number[];
            or: number[];
            encodedId: number[];
            index: number[];
            title: number[];
            item: number[];
            __typename: number[];
        };
        UserContributionAudioTrackSortInput: {
            id: number[];
            index: number[];
            title: number[];
            item: number[];
            __typename: number[];
        };
        UserContributionChapterFilterInput: {
            and: number[];
            or: number[];
            encodedId: number[];
            index: number[];
            title: number[];
            item: number[];
            __typename: number[];
        };
        UserContributionChapterSortInput: {
            id: number[];
            index: number[];
            title: number[];
            item: number[];
            __typename: number[];
        };
        UserContributionDiscFilterInput: {
            and: number[];
            or: number[];
            encodedId: number[];
            userContribution: number[];
            contentHash: number[];
            format: number[];
            name: number[];
            slug: number[];
            logsUploaded: number[];
            logUploadError: number[];
            index: number[];
            existingDiscPath: number[];
            items: number[];
            __typename: number[];
        };
        UserContributionDiscHashItemFilterInput: {
            and: number[];
            or: number[];
            encodedId: number[];
            userContribution: number[];
            discHash: number[];
            index: number[];
            name: number[];
            creationTime: number[];
            size: number[];
            __typename: number[];
        };
        UserContributionDiscHashItemSortInput: {
            id: number[];
            userContribution: number[];
            discHash: number[];
            index: number[];
            name: number[];
            creationTime: number[];
            size: number[];
            __typename: number[];
        };
        UserContributionDiscItemFilterInput: {
            and: number[];
            or: number[];
            encodedId: number[];
            disc: number[];
            name: number[];
            source: number[];
            duration: number[];
            size: number[];
            chapterCount: number[];
            segmentCount: number[];
            segmentMap: number[];
            type: number[];
            description: number[];
            season: number[];
            episode: number[];
            chapters: number[];
            audioTracks: number[];
            __typename: number[];
        };
        UserContributionDiscItemSortInput: {
            id: number[];
            disc: number[];
            name: number[];
            source: number[];
            duration: number[];
            size: number[];
            chapterCount: number[];
            segmentCount: number[];
            segmentMap: number[];
            type: number[];
            description: number[];
            season: number[];
            episode: number[];
            __typename: number[];
        };
        UserContributionDiscSortInput: {
            id: number[];
            userContribution: number[];
            contentHash: number[];
            format: number[];
            name: number[];
            slug: number[];
            logsUploaded: number[];
            logUploadError: number[];
            index: number[];
            existingDiscPath: number[];
            __typename: number[];
        };
        UserContributionFilterInput: {
            and: number[];
            or: number[];
            encodedId: number[];
            userId: number[];
            created: number[];
            status: number[];
            discs: number[];
            hashItems: number[];
            mediaType: number[];
            externalId: number[];
            externalProvider: number[];
            releaseDate: number[];
            asin: number[];
            upc: number[];
            frontImageUrl: number[];
            backImageUrl: number[];
            releaseTitle: number[];
            releaseSlug: number[];
            locale: number[];
            regionCode: number[];
            title: number[];
            year: number[];
            titleSlug: number[];
            __typename: number[];
        };
        UserContributionSortInput: {
            id: number[];
            userId: number[];
            created: number[];
            status: number[];
            mediaType: number[];
            externalId: number[];
            externalProvider: number[];
            releaseDate: number[];
            asin: number[];
            upc: number[];
            frontImageUrl: number[];
            backImageUrl: number[];
            releaseTitle: number[];
            releaseSlug: number[];
            locale: number[];
            regionCode: number[];
            title: number[];
            year: number[];
            titleSlug: number[];
            __typename: number[];
        };
        UserContributionStatusOperationFilterInput: {
            eq: number[];
            neq: number[];
            in: number[];
            nin: number[];
            __typename: number[];
        };
        UserMessageSortInput: {
            id: number[];
            contributionId: number[];
            fromUserId: number[];
            toUserId: number[];
            message: number[];
            isRead: number[];
            createdAt: number[];
            type: number[];
            __typename: number[];
        };
        ApplyPolicy: {};
        ContributionHistoryType: {};
        SortEnumType: {};
        UserContributionStatus: {};
        UserMessageType: {};
        DateTime: {};
        EncodedId: {};
        EncodedIdFilter: {};
        Long: {};
        TimeSpan: {};
        UUID: {};
        Query: {
            contributions: (number | {
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                where: number[];
                order: (string | number)[];
            })[];
            myContributions: (number | {
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                where: number[];
                order: (string | number)[];
            })[];
            contributionHistory: (number | {
                contributionId: (string | number)[];
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                order: (string | number)[];
            })[];
            contributionChat: (number | {
                contributionId: (string | number)[];
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                order: (string | number)[];
            })[];
            hasUnreadMessages: number[];
            myMessages: (number | {
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                order: (string | number)[];
            })[];
            messageThreads: number[];
            amazonProductMetadata: (number | {
                asin: (string | number)[];
            })[];
            apiKeys: (number | {
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                where: number[];
                order: (string | number)[];
            })[];
            apiKeyUsageLogs: (number | {
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                where: number[];
                order: (string | number)[];
            })[];
            __typename: number[];
        };
        Mutation: {
            addAudioTrackToItem: (number | {
                input: (string | number)[];
            })[];
            addChapterToItem: (number | {
                input: (string | number)[];
            })[];
            addItemToDisc: (number | {
                input: (string | number)[];
            })[];
            createContribution: (number | {
                input: (string | number)[];
            })[];
            createDisc: (number | {
                input: (string | number)[];
            })[];
            deleteContribution: (number | {
                input: (string | number)[];
            })[];
            deleteItemFromDisc: (number | {
                input: (string | number)[];
            })[];
            editItemOnDisc: (number | {
                input: (string | number)[];
            })[];
            generateApiKey: (number | {
                input: (string | number)[];
            })[];
            discLogs: (number | {
                input: (string | number)[];
            })[];
            discUploadStatus: (number | {
                input: (string | number)[];
            })[];
            episodeNames: (number | {
                input: (string | number)[];
            })[];
            externalData: (number | {
                input: (string | number)[];
            })[];
            externalDataForContribution: (number | {
                input: (string | number)[];
            })[];
            hashDisc: (number | {
                input: (string | number)[];
            })[];
            markMessagesAsRead: (number | {
                input: (string | number)[];
            })[];
            reorderDiscs: (number | {
                input: (string | number)[];
            })[];
            revokeApiKey: (number | {
                input: (string | number)[];
            })[];
            sendAdminMessage: (number | {
                input: (string | number)[];
            })[];
            sendUserMessage: (number | {
                input: (string | number)[];
            })[];
            updateContribution: (number | {
                input: (string | number)[];
            })[];
            updateDisc: (number | {
                input: (string | number)[];
            })[];
            __typename: number[];
        };
    };
};
export default _default;
