export default {
    "scalars": [
        1,
        9,
        10,
        14,
        227,
        228,
        229,
        230,
        231,
        232,
        233,
        234,
        235,
        236,
        237,
        238
    ],
    "types": {
        "Error": {
            "message": [
                1
            ],
            "on_ApiKeyNotFoundError": [
                12
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_ContributionAlreadyInBoxsetError": [
                27
            ],
            "on_ContributionNotFoundError": [
                33
            ],
            "on_CouldNotParseLogsError": [
                36
            ],
            "on_DiscItemNotFoundError": [
                47
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_ExistingDiscAlreadyInBoxsetError": [
                55
            ],
            "on_ExternalDataNotFoundError": [
                57
            ],
            "on_ExternalDataSerializationError": [
                59
            ],
            "on_FieldRequiredError": [
                61
            ],
            "on_InvalidBoxsetStatusError": [
                65
            ],
            "on_InvalidContributionStatusError": [
                66
            ],
            "on_InvalidDiscPathError": [
                67
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_LogsNotFoundError": [
                70
            ],
            "on_MismatchedReleaseSlugError": [
                74
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "AddAudioTrackToItemPayload": {
            "userContributionAudioTrack": [
                100
            ],
            "errors": [
                110
            ],
            "__typename": [
                1
            ]
        },
        "AddChapterToItemPayload": {
            "userContributionChapter": [
                103
            ],
            "errors": [
                111
            ],
            "__typename": [
                1
            ]
        },
        "AddDiscToBoxsetPayload": {
            "userContributionBoxset": [
                101
            ],
            "errors": [
                112
            ],
            "__typename": [
                1
            ]
        },
        "AddExistingDiscToBoxsetPayload": {
            "userContributionBoxset": [
                101
            ],
            "errors": [
                113
            ],
            "__typename": [
                1
            ]
        },
        "AddItemToDiscPayload": {
            "userContributionDiscItem": [
                106
            ],
            "errors": [
                114
            ],
            "__typename": [
                1
            ]
        },
        "AddSubtitleTrackToItemPayload": {
            "userContributionSubtitleTrack": [
                107
            ],
            "errors": [
                115
            ],
            "__typename": [
                1
            ]
        },
        "AmazonProductMetadata": {
            "asin": [
                1
            ],
            "title": [
                1
            ],
            "upc": [
                1
            ],
            "frontImageUrl": [
                1
            ],
            "backImageUrl": [
                1
            ],
            "releaseDate": [
                233
            ],
            "numberOfDiscs": [
                9
            ],
            "aspectRatio": [
                1
            ],
            "isDiscontinued": [
                10
            ],
            "mpaaRating": [
                1
            ],
            "modelNumber": [
                1
            ],
            "director": [
                1
            ],
            "mediaFormat": [
                1
            ],
            "actors": [
                1
            ],
            "producers": [
                1
            ],
            "language": [
                1
            ],
            "dubbed": [
                1
            ],
            "subtitles": [
                1
            ],
            "studio": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "Int": {},
        "Boolean": {},
        "ApiKeyInfo": {
            "name": [
                1
            ],
            "keyPrefix": [
                1
            ],
            "isActive": [
                10
            ],
            "logUsage": [
                10
            ],
            "roles": [
                1
            ],
            "ownerEmail": [
                1
            ],
            "createdAt": [
                233
            ],
            "expiresAt": [
                233
            ],
            "lastUsedAt": [
                233
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyNotFoundError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyUsageLogInfo": {
            "apiKeyPrefix": [
                1
            ],
            "apiKeyName": [
                1
            ],
            "timestamp": [
                233
            ],
            "operationName": [
                1
            ],
            "fieldCost": [
                14
            ],
            "typeCost": [
                14
            ],
            "durationMs": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "Float": {},
        "ApiKeyUsageLogsConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                16
            ],
            "nodes": [
                13
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyUsageLogsEdge": {
            "cursor": [
                1
            ],
            "node": [
                13
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeysConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                18
            ],
            "nodes": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeysEdge": {
            "cursor": [
                1
            ],
            "node": [
                11
            ],
            "__typename": [
                1
            ]
        },
        "AttachDiscIdResult": {
            "outcome": [
                228
            ],
            "contentHash": [
                1
            ],
            "mediaItemSlug": [
                1
            ],
            "boxsetSlug": [
                1
            ],
            "mediaItemType": [
                1
            ],
            "releaseSlug": [
                1
            ],
            "discSlug": [
                1
            ],
            "discIndex": [
                9
            ],
            "globalDiscId": [
                1
            ],
            "existingGlobalDiscId": [
                1
            ],
            "matchedDifferentDisc": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "AttachGlobalDiscIdPayload": {
            "attachDiscIdResult": [
                19
            ],
            "errors": [
                116
            ],
            "__typename": [
                1
            ]
        },
        "AuthenticationError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "BoxsetChatConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                23
            ],
            "nodes": [
                109
            ],
            "totalCount": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "BoxsetChatEdge": {
            "cursor": [
                1
            ],
            "node": [
                109
            ],
            "__typename": [
                1
            ]
        },
        "BoxsetContributionsConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                25
            ],
            "nodes": [
                101
            ],
            "totalCount": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "BoxsetContributionsEdge": {
            "cursor": [
                1
            ],
            "node": [
                101
            ],
            "__typename": [
                1
            ]
        },
        "BoxsetNotFoundError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ContributionAlreadyInBoxsetError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ContributionChatConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                29
            ],
            "nodes": [
                109
            ],
            "totalCount": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "ContributionChatEdge": {
            "cursor": [
                1
            ],
            "node": [
                109
            ],
            "__typename": [
                1
            ]
        },
        "ContributionHistory": {
            "id": [
                9
            ],
            "contributionId": [
                9
            ],
            "timeStamp": [
                233
            ],
            "description": [
                1
            ],
            "userId": [
                1
            ],
            "type": [
                229
            ],
            "__typename": [
                1
            ]
        },
        "ContributionHistoryConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                32
            ],
            "nodes": [
                30
            ],
            "totalCount": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "ContributionHistoryEdge": {
            "cursor": [
                1
            ],
            "node": [
                30
            ],
            "__typename": [
                1
            ]
        },
        "ContributionNotFoundError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ContributionsConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                35
            ],
            "nodes": [
                99
            ],
            "totalCount": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "ContributionsEdge": {
            "cursor": [
                1
            ],
            "node": [
                99
            ],
            "__typename": [
                1
            ]
        },
        "CouldNotParseLogsError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateBoxsetPayload": {
            "userContributionBoxset": [
                101
            ],
            "errors": [
                117
            ],
            "__typename": [
                1
            ]
        },
        "CreateContributionPayload": {
            "userContribution": [
                99
            ],
            "errors": [
                118
            ],
            "__typename": [
                1
            ]
        },
        "CreateDiscPayload": {
            "userContributionDisc": [
                104
            ],
            "errors": [
                119
            ],
            "__typename": [
                1
            ]
        },
        "DeleteBoxsetPayload": {
            "userContributionBoxset": [
                101
            ],
            "errors": [
                120
            ],
            "__typename": [
                1
            ]
        },
        "DeleteContributionPayload": {
            "userContribution": [
                99
            ],
            "errors": [
                121
            ],
            "__typename": [
                1
            ]
        },
        "DeleteDiscFromContributionPayload": {
            "userContributionDisc": [
                104
            ],
            "errors": [
                122
            ],
            "__typename": [
                1
            ]
        },
        "DeleteFileNameTemplatePayload": {
            "boolean": [
                10
            ],
            "errors": [
                123
            ],
            "__typename": [
                1
            ]
        },
        "DeleteItemFromDiscPayload": {
            "userContributionDiscItem": [
                106
            ],
            "errors": [
                124
            ],
            "__typename": [
                1
            ]
        },
        "DiscHash": {
            "hash": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DiscInfo": {
            "name": [
                1
            ],
            "type": [
                1
            ],
            "languageCode": [
                1
            ],
            "language": [
                1
            ],
            "titles": [
                95
            ],
            "hashInfo": [
                64
            ],
            "__typename": [
                1
            ]
        },
        "DiscItemNotFoundError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DiscLogs": {
            "info": [
                46
            ],
            "disc": [
                104
            ],
            "contribution": [
                99
            ],
            "__typename": [
                1
            ]
        },
        "DiscLogsPayload": {
            "discLogs": [
                48
            ],
            "errors": [
                125
            ],
            "__typename": [
                1
            ]
        },
        "DiscNotFoundError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DiscUploadStatus": {
            "logsUploaded": [
                10
            ],
            "logUploadError": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DiscUploadStatusPayload": {
            "discUploadStatus": [
                51
            ],
            "errors": [
                126
            ],
            "__typename": [
                1
            ]
        },
        "EditItemOnDiscPayload": {
            "userContributionDiscItem": [
                106
            ],
            "errors": [
                127
            ],
            "__typename": [
                1
            ]
        },
        "EpisodeNamesPayload": {
            "seriesEpisodeNames": [
                93
            ],
            "errors": [
                128
            ],
            "__typename": [
                1
            ]
        },
        "ExistingDiscAlreadyInBoxsetError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataForContributionPayload": {
            "externalMetadata": [
                60
            ],
            "errors": [
                130
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataNotFoundError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataPayload": {
            "externalMetadata": [
                60
            ],
            "errors": [
                129
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataSerializationError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ExternalMetadata": {
            "id": [
                9
            ],
            "title": [
                1
            ],
            "year": [
                9
            ],
            "imageUrl": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "FieldRequiredError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "GenerateApiKeyPayload": {
            "key": [
                1
            ],
            "keyPrefix": [
                1
            ],
            "name": [
                1
            ],
            "ownerEmail": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "HashDiscPayload": {
            "discHash": [
                45
            ],
            "errors": [
                131
            ],
            "__typename": [
                1
            ]
        },
        "HashInfoLogLine": {
            "matches": [
                10,
                {
                    "prefix": [
                        1,
                        "String!"
                    ]
                }
            ],
            "index": [
                9
            ],
            "name": [
                1
            ],
            "creationTime": [
                233
            ],
            "size": [
                236
            ],
            "originalLine": [
                1
            ],
            "prefix": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "InvalidBoxsetStatusError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "InvalidContributionStatusError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "InvalidDiscPathError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "InvalidIdError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "InvalidOwnershipError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "LogsNotFoundError": {
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MarkBoxsetMessagesAsReadPayload": {
            "boolean": [
                10
            ],
            "errors": [
                132
            ],
            "__typename": [
                1
            ]
        },
        "MarkMessagesAsReadPayload": {
            "boolean": [
                10
            ],
            "errors": [
                133
            ],
            "__typename": [
                1
            ]
        },
        "MessageThread": {
            "contributionId": [
                9
            ],
            "encodedContributionId": [
                1
            ],
            "contributionTitle": [
                1
            ],
            "mediaTitle": [
                1
            ],
            "lastMessagePreview": [
                1
            ],
            "lastMessageAt": [
                233
            ],
            "unreadCount": [
                9
            ],
            "totalCount": [
                9
            ],
            "isBoxset": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "MismatchedReleaseSlugError": {
            "message": [
                1
            ],
            "boxsetSlug": [
                1
            ],
            "offendingReleaseSlug": [
                1
            ],
            "contributionTitle": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MyBoxsetsConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                76
            ],
            "nodes": [
                101
            ],
            "totalCount": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "MyBoxsetsEdge": {
            "cursor": [
                1
            ],
            "node": [
                101
            ],
            "__typename": [
                1
            ]
        },
        "MyContributionsConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                78
            ],
            "nodes": [
                99
            ],
            "totalCount": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "MyContributionsEdge": {
            "cursor": [
                1
            ],
            "node": [
                99
            ],
            "__typename": [
                1
            ]
        },
        "MyMessagesConnection": {
            "pageInfo": [
                81
            ],
            "edges": [
                80
            ],
            "nodes": [
                109
            ],
            "totalCount": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "MyMessagesEdge": {
            "cursor": [
                1
            ],
            "node": [
                109
            ],
            "__typename": [
                1
            ]
        },
        "PageInfo": {
            "hasNextPage": [
                10
            ],
            "hasPreviousPage": [
                10
            ],
            "startCursor": [
                1
            ],
            "endCursor": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RemoveBoxsetMemberPayload": {
            "userContributionBoxset": [
                101
            ],
            "errors": [
                134
            ],
            "__typename": [
                1
            ]
        },
        "RemoveDiscFromBoxsetPayload": {
            "userContributionBoxset": [
                101
            ],
            "errors": [
                135
            ],
            "__typename": [
                1
            ]
        },
        "ReorderBoxsetMembersPayload": {
            "userContributionBoxset": [
                101
            ],
            "errors": [
                136
            ],
            "__typename": [
                1
            ]
        },
        "ReorderDiscsPayload": {
            "userContributionDisc": [
                104
            ],
            "errors": [
                137
            ],
            "__typename": [
                1
            ]
        },
        "RevokeApiKeyPayload": {
            "apiKeyInfo": [
                11
            ],
            "errors": [
                138
            ],
            "__typename": [
                1
            ]
        },
        "Segment": {
            "index": [
                9
            ],
            "type": [
                1
            ],
            "name": [
                1
            ],
            "audioType": [
                1
            ],
            "languageCode": [
                1
            ],
            "language": [
                1
            ],
            "resolution": [
                1
            ],
            "aspectRatio": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendAdminBoxsetMessagePayload": {
            "userMessage": [
                109
            ],
            "errors": [
                139
            ],
            "__typename": [
                1
            ]
        },
        "SendAdminMessagePayload": {
            "userMessage": [
                109
            ],
            "errors": [
                140
            ],
            "__typename": [
                1
            ]
        },
        "SendBoxsetUserMessagePayload": {
            "userMessage": [
                109
            ],
            "errors": [
                141
            ],
            "__typename": [
                1
            ]
        },
        "SendUserMessagePayload": {
            "userMessage": [
                109
            ],
            "errors": [
                142
            ],
            "__typename": [
                1
            ]
        },
        "SeriesEpisodeNameEntry": {
            "seasonNumber": [
                1
            ],
            "episodeNumber": [
                1
            ],
            "episodeName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SeriesEpisodeNames": {
            "tryFind": [
                92,
                {
                    "season": [
                        1,
                        "String!"
                    ],
                    "episode": [
                        1,
                        "String!"
                    ]
                }
            ],
            "seriesTitle": [
                1
            ],
            "seriesYear": [
                1
            ],
            "episodes": [
                92
            ],
            "__typename": [
                1
            ]
        },
        "SetFileNameTemplatePayload": {
            "userFileNameTemplate": [
                108
            ],
            "errors": [
                143
            ],
            "__typename": [
                1
            ]
        },
        "Title": {
            "index": [
                9
            ],
            "chapterCount": [
                9
            ],
            "length": [
                1
            ],
            "displaySize": [
                1
            ],
            "size": [
                236
            ],
            "playlist": [
                1
            ],
            "segmentMap": [
                1
            ],
            "comment": [
                1
            ],
            "javaComment": [
                1
            ],
            "segments": [
                87
            ],
            "lengthAsTimeSpan": [
                237
            ],
            "__typename": [
                1
            ]
        },
        "UpdateBoxsetPayload": {
            "userContributionBoxset": [
                101
            ],
            "errors": [
                144
            ],
            "__typename": [
                1
            ]
        },
        "UpdateContributionPayload": {
            "userContribution": [
                99
            ],
            "errors": [
                145
            ],
            "__typename": [
                1
            ]
        },
        "UpdateDiscPayload": {
            "userContributionDisc": [
                104
            ],
            "errors": [
                146
            ],
            "__typename": [
                1
            ]
        },
        "UserContribution": {
            "id": [
                9
            ],
            "userId": [
                1
            ],
            "created": [
                233
            ],
            "status": [
                231
            ],
            "boxsetId": [
                9
            ],
            "boxset": [
                101
            ],
            "discs": [
                104,
                {
                    "where": [
                        215
                    ],
                    "order": [
                        220,
                        "[UserContributionDiscSortInput!]"
                    ]
                }
            ],
            "hashItems": [
                105,
                {
                    "where": [
                        216
                    ],
                    "order": [
                        217,
                        "[UserContributionDiscHashItemSortInput!]"
                    ]
                }
            ],
            "mediaType": [
                1
            ],
            "externalId": [
                1
            ],
            "externalProvider": [
                1
            ],
            "releaseDate": [
                233
            ],
            "asin": [
                1
            ],
            "upc": [
                1
            ],
            "frontImageUrl": [
                1
            ],
            "backImageUrl": [
                1
            ],
            "releaseTitle": [
                1
            ],
            "releaseSlug": [
                1
            ],
            "locale": [
                1
            ],
            "regionCode": [
                1
            ],
            "title": [
                1
            ],
            "year": [
                1
            ],
            "titleSlug": [
                1
            ],
            "encodedId": [
                234
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionAudioTrack": {
            "id": [
                9
            ],
            "index": [
                9
            ],
            "title": [
                1
            ],
            "item": [
                106
            ],
            "encodedId": [
                234
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionBoxset": {
            "id": [
                9
            ],
            "userId": [
                1
            ],
            "created": [
                233
            ],
            "status": [
                231
            ],
            "title": [
                1
            ],
            "sortTitle": [
                1
            ],
            "slug": [
                1
            ],
            "frontImageUrl": [
                1
            ],
            "backImageUrl": [
                1
            ],
            "asin": [
                1
            ],
            "upc": [
                1
            ],
            "releaseDate": [
                233
            ],
            "locale": [
                1
            ],
            "regionCode": [
                1
            ],
            "members": [
                102,
                {
                    "where": [
                        210
                    ],
                    "order": [
                        211,
                        "[UserContributionBoxsetMemberSortInput!]"
                    ]
                }
            ],
            "encodedId": [
                234
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionBoxsetMember": {
            "id": [
                9
            ],
            "boxset": [
                101
            ],
            "disc": [
                104
            ],
            "sortOrder": [
                9
            ],
            "existingDiscPath": [
                1
            ],
            "existingDiscName": [
                1
            ],
            "existingDiscFormat": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionChapter": {
            "id": [
                9
            ],
            "index": [
                9
            ],
            "title": [
                1
            ],
            "item": [
                106
            ],
            "encodedId": [
                234
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDisc": {
            "id": [
                9
            ],
            "userContribution": [
                99
            ],
            "contentHash": [
                1
            ],
            "globalDiscId": [
                1
            ],
            "format": [
                1
            ],
            "name": [
                1
            ],
            "slug": [
                1
            ],
            "logsUploaded": [
                10
            ],
            "logUploadError": [
                1
            ],
            "index": [
                9
            ],
            "existingDiscPath": [
                1
            ],
            "items": [
                106,
                {
                    "where": [
                        218
                    ],
                    "order": [
                        219,
                        "[UserContributionDiscItemSortInput!]"
                    ]
                }
            ],
            "encodedId": [
                234
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscHashItem": {
            "id": [
                9
            ],
            "userContribution": [
                99
            ],
            "discHash": [
                1
            ],
            "index": [
                9
            ],
            "name": [
                1
            ],
            "creationTime": [
                233
            ],
            "size": [
                236
            ],
            "encodedId": [
                234
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscItem": {
            "id": [
                9
            ],
            "disc": [
                104
            ],
            "name": [
                1
            ],
            "source": [
                1
            ],
            "duration": [
                1
            ],
            "size": [
                1
            ],
            "chapterCount": [
                9
            ],
            "segmentCount": [
                9
            ],
            "segmentMap": [
                1
            ],
            "type": [
                1
            ],
            "description": [
                1
            ],
            "season": [
                1
            ],
            "episode": [
                1
            ],
            "chapters": [
                103,
                {
                    "where": [
                        213
                    ],
                    "order": [
                        214,
                        "[UserContributionChapterSortInput!]"
                    ]
                }
            ],
            "audioTracks": [
                100,
                {
                    "where": [
                        207
                    ],
                    "order": [
                        208,
                        "[UserContributionAudioTrackSortInput!]"
                    ]
                }
            ],
            "subtitleTracks": [
                107,
                {
                    "where": [
                        224
                    ],
                    "order": [
                        225,
                        "[UserContributionSubtitleTrackSortInput!]"
                    ]
                }
            ],
            "encodedId": [
                234
            ],
            "filename": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionSubtitleTrack": {
            "id": [
                9
            ],
            "index": [
                9
            ],
            "title": [
                1
            ],
            "item": [
                106
            ],
            "encodedId": [
                234
            ],
            "__typename": [
                1
            ]
        },
        "UserFileNameTemplate": {
            "id": [
                9
            ],
            "userId": [
                1
            ],
            "itemType": [
                1
            ],
            "template": [
                1
            ],
            "updatedAt": [
                233
            ],
            "__typename": [
                1
            ]
        },
        "UserMessage": {
            "id": [
                9
            ],
            "contributionId": [
                9
            ],
            "boxsetId": [
                9
            ],
            "contribution": [
                99
            ],
            "boxset": [
                101
            ],
            "fromUserId": [
                1
            ],
            "toUserId": [
                1
            ],
            "message": [
                1
            ],
            "isRead": [
                10
            ],
            "createdAt": [
                233
            ],
            "type": [
                232
            ],
            "__typename": [
                1
            ]
        },
        "AddAudioTrackToItemError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_DiscItemNotFoundError": [
                47
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "AddChapterToItemError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_DiscItemNotFoundError": [
                47
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "AddDiscToBoxsetError": {
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_ContributionAlreadyInBoxsetError": [
                27
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidBoxsetStatusError": [
                65
            ],
            "on_MismatchedReleaseSlugError": [
                74
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "AddExistingDiscToBoxsetError": {
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidDiscPathError": [
                67
            ],
            "on_ExistingDiscAlreadyInBoxsetError": [
                55
            ],
            "on_InvalidBoxsetStatusError": [
                65
            ],
            "on_MismatchedReleaseSlugError": [
                74
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "AddItemToDiscError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "AddSubtitleTrackToItemError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_DiscItemNotFoundError": [
                47
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "AttachGlobalDiscIdError": {
            "on_AuthenticationError": [
                21
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "CreateBoxsetError": {
            "on_AuthenticationError": [
                21
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "CreateContributionError": {
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidBoxsetStatusError": [
                65
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "CreateDiscError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidDiscPathError": [
                67
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "DeleteBoxsetError": {
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidBoxsetStatusError": [
                65
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "DeleteContributionError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidContributionStatusError": [
                66
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "DeleteDiscFromContributionError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidContributionStatusError": [
                66
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "DeleteFileNameTemplateError": {
            "on_AuthenticationError": [
                21
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "DeleteItemFromDiscError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_DiscItemNotFoundError": [
                47
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "DiscLogsError": {
            "on_LogsNotFoundError": [
                70
            ],
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_CouldNotParseLogsError": [
                36
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "DiscUploadStatusError": {
            "on_DiscNotFoundError": [
                50
            ],
            "on_FieldRequiredError": [
                61
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "EditItemOnDiscError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_DiscItemNotFoundError": [
                47
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "EpisodeNamesError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_ExternalDataNotFoundError": [
                57
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_ExternalDataNotFoundError": [
                57
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataForContributionError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_ExternalDataSerializationError": [
                59
            ],
            "on_ExternalDataNotFoundError": [
                57
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "HashDiscError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "MarkBoxsetMessagesAsReadError": {
            "on_AuthenticationError": [
                21
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "MarkMessagesAsReadError": {
            "on_AuthenticationError": [
                21
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "RemoveBoxsetMemberError": {
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidBoxsetStatusError": [
                65
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "RemoveDiscFromBoxsetError": {
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidBoxsetStatusError": [
                65
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "ReorderBoxsetMembersError": {
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidBoxsetStatusError": [
                65
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "ReorderDiscsError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "RevokeApiKeyError": {
            "on_ApiKeyNotFoundError": [
                12
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "SendAdminBoxsetMessageError": {
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "SendAdminMessageError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "SendBoxsetUserMessageError": {
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "SendUserMessageError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "SetFileNameTemplateError": {
            "on_AuthenticationError": [
                21
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "UpdateBoxsetError": {
            "on_AuthenticationError": [
                21
            ],
            "on_BoxsetNotFoundError": [
                26
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "UpdateContributionError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_InvalidContributionStatusError": [
                66
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "UpdateDiscError": {
            "on_ContributionNotFoundError": [
                33
            ],
            "on_DiscNotFoundError": [
                50
            ],
            "on_AuthenticationError": [
                21
            ],
            "on_InvalidIdError": [
                68
            ],
            "on_InvalidOwnershipError": [
                69
            ],
            "on_Error": [
                0
            ],
            "__typename": [
                1
            ]
        },
        "AddAudioTrackToItemInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "itemId": [
                1
            ],
            "trackIndex": [
                9
            ],
            "trackName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AddChapterToItemInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "itemId": [
                1
            ],
            "chapterIndex": [
                9
            ],
            "chapterName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AddDiscToBoxsetInput": {
            "boxsetId": [
                1
            ],
            "discId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AddExistingDiscToBoxsetInput": {
            "boxsetId": [
                1
            ],
            "existingDiscPath": [
                1
            ],
            "discName": [
                1
            ],
            "discFormat": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AddItemToDiscInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "name": [
                1
            ],
            "source": [
                1
            ],
            "duration": [
                1
            ],
            "size": [
                1
            ],
            "chapterCount": [
                9
            ],
            "segmentCount": [
                9
            ],
            "segmentMap": [
                1
            ],
            "type": [
                1
            ],
            "description": [
                1
            ],
            "season": [
                1
            ],
            "episode": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "AddSubtitleTrackToItemInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "itemId": [
                1
            ],
            "trackIndex": [
                9
            ],
            "trackName": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyInfoFilterInput": {
            "and": [
                153
            ],
            "or": [
                153
            ],
            "name": [
                203
            ],
            "keyPrefix": [
                203
            ],
            "isActive": [
                158
            ],
            "logUsage": [
                158
            ],
            "roles": [
                203
            ],
            "ownerEmail": [
                203
            ],
            "createdAt": [
                165
            ],
            "expiresAt": [
                165
            ],
            "lastUsedAt": [
                165
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyInfoSortInput": {
            "name": [
                230
            ],
            "keyPrefix": [
                230
            ],
            "isActive": [
                230
            ],
            "logUsage": [
                230
            ],
            "roles": [
                230
            ],
            "ownerEmail": [
                230
            ],
            "createdAt": [
                230
            ],
            "expiresAt": [
                230
            ],
            "lastUsedAt": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyUsageLogInfoFilterInput": {
            "and": [
                155
            ],
            "or": [
                155
            ],
            "apiKeyPrefix": [
                203
            ],
            "apiKeyName": [
                203
            ],
            "timestamp": [
                165
            ],
            "operationName": [
                203
            ],
            "fieldCost": [
                179
            ],
            "typeCost": [
                179
            ],
            "durationMs": [
                182
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyUsageLogInfoSortInput": {
            "apiKeyPrefix": [
                230
            ],
            "apiKeyName": [
                230
            ],
            "timestamp": [
                230
            ],
            "operationName": [
                230
            ],
            "fieldCost": [
                230
            ],
            "typeCost": [
                230
            ],
            "durationMs": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "AttachGlobalDiscIdInput": {
            "files": [
                178
            ],
            "globalDiscId": [
                1
            ],
            "mediaItemSlug": [
                1
            ],
            "boxsetSlug": [
                1
            ],
            "releaseSlug": [
                1
            ],
            "discSlug": [
                1
            ],
            "discIndex": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "BooleanOperationFilterInput": {
            "eq": [
                10
            ],
            "neq": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "BoxsetMutationRequestInput": {
            "title": [
                1
            ],
            "sortTitle": [
                1
            ],
            "slug": [
                1
            ],
            "frontImageUrl": [
                1
            ],
            "backImageUrl": [
                1
            ],
            "asin": [
                1
            ],
            "upc": [
                1
            ],
            "releaseDate": [
                233
            ],
            "locale": [
                1
            ],
            "regionCode": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ContributionHistorySortInput": {
            "id": [
                230
            ],
            "contributionId": [
                230
            ],
            "timeStamp": [
                230
            ],
            "description": [
                230
            ],
            "userId": [
                230
            ],
            "type": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "ContributionMutationRequestInput": {
            "mediaType": [
                1
            ],
            "externalId": [
                1
            ],
            "externalProvider": [
                1
            ],
            "releaseDate": [
                233
            ],
            "asin": [
                1
            ],
            "upc": [
                1
            ],
            "frontImageUrl": [
                1
            ],
            "backImageUrl": [
                1
            ],
            "releaseTitle": [
                1
            ],
            "releaseSlug": [
                1
            ],
            "regionCode": [
                1
            ],
            "locale": [
                1
            ],
            "title": [
                1
            ],
            "year": [
                1
            ],
            "storageId": [
                238
            ],
            "status": [
                231
            ],
            "boxsetId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "CreateBoxsetInput": {
            "input": [
                159
            ],
            "__typename": [
                1
            ]
        },
        "CreateContributionInput": {
            "input": [
                161
            ],
            "__typename": [
                1
            ]
        },
        "CreateDiscInput": {
            "contributionId": [
                1
            ],
            "contentHash": [
                1
            ],
            "format": [
                1
            ],
            "name": [
                1
            ],
            "slug": [
                1
            ],
            "existingDiscPath": [
                1
            ],
            "globalDiscId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DateTimeOperationFilterInput": {
            "eq": [
                233
            ],
            "neq": [
                233
            ],
            "in": [
                233
            ],
            "nin": [
                233
            ],
            "gt": [
                233
            ],
            "ngt": [
                233
            ],
            "gte": [
                233
            ],
            "ngte": [
                233
            ],
            "lt": [
                233
            ],
            "nlt": [
                233
            ],
            "lte": [
                233
            ],
            "nlte": [
                233
            ],
            "__typename": [
                1
            ]
        },
        "DeleteBoxsetInput": {
            "boxsetId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteContributionInput": {
            "contributionId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteDiscFromContributionInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteFileNameTemplateInput": {
            "itemType": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DeleteItemFromDiscInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "itemId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DiscLogsInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "DiscUploadStatusInput": {
            "discId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EditItemOnDiscInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "itemId": [
                1
            ],
            "name": [
                1
            ],
            "source": [
                1
            ],
            "duration": [
                1
            ],
            "size": [
                1
            ],
            "chapterCount": [
                9
            ],
            "segmentCount": [
                9
            ],
            "segmentMap": [
                1
            ],
            "type": [
                1
            ],
            "description": [
                1
            ],
            "season": [
                1
            ],
            "episode": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "EncodedIdOperationFilterInput": {
            "and": [
                174
            ],
            "or": [
                174
            ],
            "eq": [
                235
            ],
            "neq": [
                235
            ],
            "__typename": [
                1
            ]
        },
        "EpisodeNamesInput": {
            "contributionId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataForContributionInput": {
            "contributionId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataInput": {
            "externalId": [
                1
            ],
            "mediaType": [
                1
            ],
            "provider": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "FileHashInfoInput": {
            "index": [
                9
            ],
            "name": [
                1
            ],
            "creationTime": [
                233
            ],
            "size": [
                236
            ],
            "__typename": [
                1
            ]
        },
        "FloatOperationFilterInput": {
            "eq": [
                14
            ],
            "neq": [
                14
            ],
            "in": [
                14
            ],
            "nin": [
                14
            ],
            "gt": [
                14
            ],
            "ngt": [
                14
            ],
            "gte": [
                14
            ],
            "ngte": [
                14
            ],
            "lt": [
                14
            ],
            "nlt": [
                14
            ],
            "lte": [
                14
            ],
            "nlte": [
                14
            ],
            "__typename": [
                1
            ]
        },
        "GenerateApiKeyInput": {
            "name": [
                1
            ],
            "ownerEmail": [
                1
            ],
            "roles": [
                1
            ],
            "expiresAt": [
                233
            ],
            "__typename": [
                1
            ]
        },
        "HashDiscInput": {
            "contributionId": [
                1
            ],
            "files": [
                178
            ],
            "__typename": [
                1
            ]
        },
        "IntOperationFilterInput": {
            "eq": [
                9
            ],
            "neq": [
                9
            ],
            "in": [
                9
            ],
            "nin": [
                9
            ],
            "gt": [
                9
            ],
            "ngt": [
                9
            ],
            "gte": [
                9
            ],
            "ngte": [
                9
            ],
            "lt": [
                9
            ],
            "nlt": [
                9
            ],
            "lte": [
                9
            ],
            "nlte": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionAudioTrackFilterInput": {
            "all": [
                207
            ],
            "none": [
                207
            ],
            "some": [
                207
            ],
            "any": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionChapterFilterInput": {
            "all": [
                213
            ],
            "none": [
                213
            ],
            "some": [
                213
            ],
            "any": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionDiscFilterInput": {
            "all": [
                215
            ],
            "none": [
                215
            ],
            "some": [
                215
            ],
            "any": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionDiscHashItemFilterInput": {
            "all": [
                216
            ],
            "none": [
                216
            ],
            "some": [
                216
            ],
            "any": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionDiscItemFilterInput": {
            "all": [
                218
            ],
            "none": [
                218
            ],
            "some": [
                218
            ],
            "any": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionSubtitleTrackFilterInput": {
            "all": [
                224
            ],
            "none": [
                224
            ],
            "some": [
                224
            ],
            "any": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "ListFilterInputTypeOfUserContributionBoxsetMemberFilterInput": {
            "all": [
                210
            ],
            "none": [
                210
            ],
            "some": [
                210
            ],
            "any": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "LongOperationFilterInput": {
            "eq": [
                236
            ],
            "neq": [
                236
            ],
            "in": [
                236
            ],
            "nin": [
                236
            ],
            "gt": [
                236
            ],
            "ngt": [
                236
            ],
            "gte": [
                236
            ],
            "ngte": [
                236
            ],
            "lt": [
                236
            ],
            "nlt": [
                236
            ],
            "lte": [
                236
            ],
            "nlte": [
                236
            ],
            "__typename": [
                1
            ]
        },
        "MarkBoxsetMessagesAsReadInput": {
            "boxsetId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "MarkMessagesAsReadInput": {
            "contributionId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RemoveBoxsetMemberInput": {
            "boxsetId": [
                1
            ],
            "memberId": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "RemoveDiscFromBoxsetInput": {
            "boxsetId": [
                1
            ],
            "discId": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "ReorderBoxsetMembersInput": {
            "boxsetId": [
                1
            ],
            "memberIds": [
                9
            ],
            "__typename": [
                1
            ]
        },
        "ReorderDiscsInput": {
            "contributionId": [
                1
            ],
            "discIds": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "RevokeApiKeyInput": {
            "keyPrefix": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendAdminBoxsetMessageInput": {
            "boxsetId": [
                1
            ],
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendAdminMessageInput": {
            "contributionId": [
                1
            ],
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendBoxsetUserMessageInput": {
            "boxsetId": [
                1
            ],
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SendUserMessageInput": {
            "contributionId": [
                1
            ],
            "message": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "SetFileNameTemplateInput": {
            "itemType": [
                1
            ],
            "template": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "StringOperationFilterInput": {
            "and": [
                203
            ],
            "or": [
                203
            ],
            "eq": [
                1
            ],
            "neq": [
                1
            ],
            "contains": [
                1
            ],
            "ncontains": [
                1
            ],
            "in": [
                1
            ],
            "nin": [
                1
            ],
            "startsWith": [
                1
            ],
            "nstartsWith": [
                1
            ],
            "endsWith": [
                1
            ],
            "nendsWith": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UpdateBoxsetInput": {
            "boxsetId": [
                1
            ],
            "input": [
                159
            ],
            "__typename": [
                1
            ]
        },
        "UpdateContributionInput": {
            "contributionId": [
                1
            ],
            "asin": [
                1
            ],
            "upc": [
                1
            ],
            "releaseDate": [
                233
            ],
            "releaseTitle": [
                1
            ],
            "releaseSlug": [
                1
            ],
            "locale": [
                1
            ],
            "regionCode": [
                1
            ],
            "frontImageUrl": [
                1
            ],
            "backImageUrl": [
                1
            ],
            "deleteBackImage": [
                10
            ],
            "__typename": [
                1
            ]
        },
        "UpdateDiscInput": {
            "contributionId": [
                1
            ],
            "discId": [
                1
            ],
            "format": [
                1
            ],
            "name": [
                1
            ],
            "slug": [
                1
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionAudioTrackFilterInput": {
            "and": [
                207
            ],
            "or": [
                207
            ],
            "encodedId": [
                174
            ],
            "index": [
                182
            ],
            "title": [
                203
            ],
            "item": [
                218
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionAudioTrackSortInput": {
            "id": [
                230
            ],
            "index": [
                230
            ],
            "title": [
                230
            ],
            "item": [
                219
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionBoxsetFilterInput": {
            "and": [
                209
            ],
            "or": [
                209
            ],
            "encodedId": [
                174
            ],
            "userId": [
                203
            ],
            "created": [
                165
            ],
            "status": [
                223
            ],
            "title": [
                203
            ],
            "sortTitle": [
                203
            ],
            "slug": [
                203
            ],
            "frontImageUrl": [
                203
            ],
            "backImageUrl": [
                203
            ],
            "asin": [
                203
            ],
            "upc": [
                203
            ],
            "releaseDate": [
                165
            ],
            "locale": [
                203
            ],
            "regionCode": [
                203
            ],
            "members": [
                189
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionBoxsetMemberFilterInput": {
            "and": [
                210
            ],
            "or": [
                210
            ],
            "id": [
                182
            ],
            "boxset": [
                209
            ],
            "disc": [
                215
            ],
            "sortOrder": [
                182
            ],
            "existingDiscPath": [
                203
            ],
            "existingDiscName": [
                203
            ],
            "existingDiscFormat": [
                203
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionBoxsetMemberSortInput": {
            "id": [
                230
            ],
            "boxset": [
                212
            ],
            "disc": [
                220
            ],
            "sortOrder": [
                230
            ],
            "existingDiscPath": [
                230
            ],
            "existingDiscName": [
                230
            ],
            "existingDiscFormat": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionBoxsetSortInput": {
            "id": [
                230
            ],
            "userId": [
                230
            ],
            "created": [
                230
            ],
            "status": [
                230
            ],
            "title": [
                230
            ],
            "sortTitle": [
                230
            ],
            "slug": [
                230
            ],
            "frontImageUrl": [
                230
            ],
            "backImageUrl": [
                230
            ],
            "asin": [
                230
            ],
            "upc": [
                230
            ],
            "releaseDate": [
                230
            ],
            "locale": [
                230
            ],
            "regionCode": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionChapterFilterInput": {
            "and": [
                213
            ],
            "or": [
                213
            ],
            "encodedId": [
                174
            ],
            "index": [
                182
            ],
            "title": [
                203
            ],
            "item": [
                218
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionChapterSortInput": {
            "id": [
                230
            ],
            "index": [
                230
            ],
            "title": [
                230
            ],
            "item": [
                219
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscFilterInput": {
            "and": [
                215
            ],
            "or": [
                215
            ],
            "encodedId": [
                174
            ],
            "userContribution": [
                221
            ],
            "contentHash": [
                203
            ],
            "globalDiscId": [
                203
            ],
            "format": [
                203
            ],
            "name": [
                203
            ],
            "slug": [
                203
            ],
            "logsUploaded": [
                158
            ],
            "logUploadError": [
                203
            ],
            "index": [
                182
            ],
            "existingDiscPath": [
                203
            ],
            "items": [
                187
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscHashItemFilterInput": {
            "and": [
                216
            ],
            "or": [
                216
            ],
            "encodedId": [
                174
            ],
            "userContribution": [
                221
            ],
            "discHash": [
                203
            ],
            "index": [
                182
            ],
            "name": [
                203
            ],
            "creationTime": [
                165
            ],
            "size": [
                190
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscHashItemSortInput": {
            "id": [
                230
            ],
            "userContribution": [
                222
            ],
            "discHash": [
                230
            ],
            "index": [
                230
            ],
            "name": [
                230
            ],
            "creationTime": [
                230
            ],
            "size": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscItemFilterInput": {
            "and": [
                218
            ],
            "or": [
                218
            ],
            "encodedId": [
                174
            ],
            "disc": [
                215
            ],
            "name": [
                203
            ],
            "source": [
                203
            ],
            "duration": [
                203
            ],
            "size": [
                203
            ],
            "chapterCount": [
                182
            ],
            "segmentCount": [
                182
            ],
            "segmentMap": [
                203
            ],
            "type": [
                203
            ],
            "description": [
                203
            ],
            "season": [
                203
            ],
            "episode": [
                203
            ],
            "chapters": [
                184
            ],
            "audioTracks": [
                183
            ],
            "subtitleTracks": [
                188
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscItemSortInput": {
            "id": [
                230
            ],
            "disc": [
                220
            ],
            "name": [
                230
            ],
            "source": [
                230
            ],
            "duration": [
                230
            ],
            "size": [
                230
            ],
            "chapterCount": [
                230
            ],
            "segmentCount": [
                230
            ],
            "segmentMap": [
                230
            ],
            "type": [
                230
            ],
            "description": [
                230
            ],
            "season": [
                230
            ],
            "episode": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscSortInput": {
            "id": [
                230
            ],
            "userContribution": [
                222
            ],
            "contentHash": [
                230
            ],
            "globalDiscId": [
                230
            ],
            "format": [
                230
            ],
            "name": [
                230
            ],
            "slug": [
                230
            ],
            "logsUploaded": [
                230
            ],
            "logUploadError": [
                230
            ],
            "index": [
                230
            ],
            "existingDiscPath": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionFilterInput": {
            "and": [
                221
            ],
            "or": [
                221
            ],
            "encodedId": [
                174
            ],
            "userId": [
                203
            ],
            "created": [
                165
            ],
            "status": [
                223
            ],
            "boxsetId": [
                182
            ],
            "boxset": [
                209
            ],
            "discs": [
                185
            ],
            "hashItems": [
                186
            ],
            "mediaType": [
                203
            ],
            "externalId": [
                203
            ],
            "externalProvider": [
                203
            ],
            "releaseDate": [
                165
            ],
            "asin": [
                203
            ],
            "upc": [
                203
            ],
            "frontImageUrl": [
                203
            ],
            "backImageUrl": [
                203
            ],
            "releaseTitle": [
                203
            ],
            "releaseSlug": [
                203
            ],
            "locale": [
                203
            ],
            "regionCode": [
                203
            ],
            "title": [
                203
            ],
            "year": [
                203
            ],
            "titleSlug": [
                203
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionSortInput": {
            "id": [
                230
            ],
            "userId": [
                230
            ],
            "created": [
                230
            ],
            "status": [
                230
            ],
            "boxsetId": [
                230
            ],
            "boxset": [
                212
            ],
            "mediaType": [
                230
            ],
            "externalId": [
                230
            ],
            "externalProvider": [
                230
            ],
            "releaseDate": [
                230
            ],
            "asin": [
                230
            ],
            "upc": [
                230
            ],
            "frontImageUrl": [
                230
            ],
            "backImageUrl": [
                230
            ],
            "releaseTitle": [
                230
            ],
            "releaseSlug": [
                230
            ],
            "locale": [
                230
            ],
            "regionCode": [
                230
            ],
            "title": [
                230
            ],
            "year": [
                230
            ],
            "titleSlug": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionStatusOperationFilterInput": {
            "eq": [
                231
            ],
            "neq": [
                231
            ],
            "in": [
                231
            ],
            "nin": [
                231
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionSubtitleTrackFilterInput": {
            "and": [
                224
            ],
            "or": [
                224
            ],
            "encodedId": [
                174
            ],
            "index": [
                182
            ],
            "title": [
                203
            ],
            "item": [
                218
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionSubtitleTrackSortInput": {
            "id": [
                230
            ],
            "index": [
                230
            ],
            "title": [
                230
            ],
            "item": [
                219
            ],
            "__typename": [
                1
            ]
        },
        "UserMessageSortInput": {
            "id": [
                230
            ],
            "contributionId": [
                230
            ],
            "boxsetId": [
                230
            ],
            "contribution": [
                222
            ],
            "boxset": [
                212
            ],
            "fromUserId": [
                230
            ],
            "toUserId": [
                230
            ],
            "message": [
                230
            ],
            "isRead": [
                230
            ],
            "createdAt": [
                230
            ],
            "type": [
                230
            ],
            "__typename": [
                1
            ]
        },
        "ApplyPolicy": {},
        "AttachDiscIdOutcome": {},
        "ContributionHistoryType": {},
        "SortEnumType": {},
        "UserContributionStatus": {},
        "UserMessageType": {},
        "DateTime": {},
        "EncodedId": {},
        "EncodedIdFilter": {},
        "Long": {},
        "TimeSpan": {},
        "UUID": {},
        "Query": {
            "contributions": [
                34,
                {
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        221
                    ],
                    "order": [
                        222,
                        "[UserContributionSortInput!]"
                    ]
                }
            ],
            "myContributions": [
                77,
                {
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        221
                    ],
                    "order": [
                        222,
                        "[UserContributionSortInput!]"
                    ]
                }
            ],
            "contributionHistory": [
                31,
                {
                    "contributionId": [
                        9,
                        "Int!"
                    ],
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "order": [
                        160,
                        "[ContributionHistorySortInput!]"
                    ]
                }
            ],
            "contributionChat": [
                28,
                {
                    "contributionId": [
                        1,
                        "String!"
                    ],
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "order": [
                        226,
                        "[UserMessageSortInput!]"
                    ]
                }
            ],
            "boxsetChat": [
                22,
                {
                    "boxsetId": [
                        1,
                        "String!"
                    ],
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "order": [
                        226,
                        "[UserMessageSortInput!]"
                    ]
                }
            ],
            "hasUnreadMessages": [
                10
            ],
            "myMessages": [
                79,
                {
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "order": [
                        226,
                        "[UserMessageSortInput!]"
                    ]
                }
            ],
            "messageThreads": [
                73
            ],
            "boxsetContributions": [
                24,
                {
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        209
                    ],
                    "order": [
                        212,
                        "[UserContributionBoxsetSortInput!]"
                    ]
                }
            ],
            "myBoxsets": [
                75,
                {
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        209
                    ],
                    "order": [
                        212,
                        "[UserContributionBoxsetSortInput!]"
                    ]
                }
            ],
            "amazonProductMetadata": [
                8,
                {
                    "asin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "apiKeys": [
                17,
                {
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        153
                    ],
                    "order": [
                        154,
                        "[ApiKeyInfoSortInput!]"
                    ]
                }
            ],
            "apiKeyUsageLogs": [
                15,
                {
                    "first": [
                        9
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        9
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        155
                    ],
                    "order": [
                        156,
                        "[ApiKeyUsageLogInfoSortInput!]"
                    ]
                }
            ],
            "myFileNameTemplates": [
                108
            ],
            "__typename": [
                1
            ]
        },
        "Mutation": {
            "addAudioTrackToItem": [
                2,
                {
                    "input": [
                        147,
                        "AddAudioTrackToItemInput!"
                    ]
                }
            ],
            "addChapterToItem": [
                3,
                {
                    "input": [
                        148,
                        "AddChapterToItemInput!"
                    ]
                }
            ],
            "addDiscToBoxset": [
                4,
                {
                    "input": [
                        149,
                        "AddDiscToBoxsetInput!"
                    ]
                }
            ],
            "addExistingDiscToBoxset": [
                5,
                {
                    "input": [
                        150,
                        "AddExistingDiscToBoxsetInput!"
                    ]
                }
            ],
            "addItemToDisc": [
                6,
                {
                    "input": [
                        151,
                        "AddItemToDiscInput!"
                    ]
                }
            ],
            "addSubtitleTrackToItem": [
                7,
                {
                    "input": [
                        152,
                        "AddSubtitleTrackToItemInput!"
                    ]
                }
            ],
            "attachGlobalDiscId": [
                20,
                {
                    "input": [
                        157,
                        "AttachGlobalDiscIdInput!"
                    ]
                }
            ],
            "createBoxset": [
                37,
                {
                    "input": [
                        162,
                        "CreateBoxsetInput!"
                    ]
                }
            ],
            "createContribution": [
                38,
                {
                    "input": [
                        163,
                        "CreateContributionInput!"
                    ]
                }
            ],
            "createDisc": [
                39,
                {
                    "input": [
                        164,
                        "CreateDiscInput!"
                    ]
                }
            ],
            "deleteBoxset": [
                40,
                {
                    "input": [
                        166,
                        "DeleteBoxsetInput!"
                    ]
                }
            ],
            "deleteContribution": [
                41,
                {
                    "input": [
                        167,
                        "DeleteContributionInput!"
                    ]
                }
            ],
            "deleteDiscFromContribution": [
                42,
                {
                    "input": [
                        168,
                        "DeleteDiscFromContributionInput!"
                    ]
                }
            ],
            "deleteItemFromDisc": [
                44,
                {
                    "input": [
                        170,
                        "DeleteItemFromDiscInput!"
                    ]
                }
            ],
            "editItemOnDisc": [
                53,
                {
                    "input": [
                        173,
                        "EditItemOnDiscInput!"
                    ]
                }
            ],
            "setFileNameTemplate": [
                94,
                {
                    "input": [
                        202,
                        "SetFileNameTemplateInput!"
                    ]
                }
            ],
            "deleteFileNameTemplate": [
                43,
                {
                    "input": [
                        169,
                        "DeleteFileNameTemplateInput!"
                    ]
                }
            ],
            "generateApiKey": [
                62,
                {
                    "input": [
                        180,
                        "GenerateApiKeyInput!"
                    ]
                }
            ],
            "discLogs": [
                49,
                {
                    "input": [
                        171,
                        "DiscLogsInput!"
                    ]
                }
            ],
            "discUploadStatus": [
                52,
                {
                    "input": [
                        172,
                        "DiscUploadStatusInput!"
                    ]
                }
            ],
            "episodeNames": [
                54,
                {
                    "input": [
                        175,
                        "EpisodeNamesInput!"
                    ]
                }
            ],
            "externalData": [
                58,
                {
                    "input": [
                        177,
                        "ExternalDataInput!"
                    ]
                }
            ],
            "externalDataForContribution": [
                56,
                {
                    "input": [
                        176,
                        "ExternalDataForContributionInput!"
                    ]
                }
            ],
            "hashDisc": [
                63,
                {
                    "input": [
                        181,
                        "HashDiscInput!"
                    ]
                }
            ],
            "markMessagesAsRead": [
                72,
                {
                    "input": [
                        192,
                        "MarkMessagesAsReadInput!"
                    ]
                }
            ],
            "markBoxsetMessagesAsRead": [
                71,
                {
                    "input": [
                        191,
                        "MarkBoxsetMessagesAsReadInput!"
                    ]
                }
            ],
            "removeBoxsetMember": [
                82,
                {
                    "input": [
                        193,
                        "RemoveBoxsetMemberInput!"
                    ]
                }
            ],
            "removeDiscFromBoxset": [
                83,
                {
                    "input": [
                        194,
                        "RemoveDiscFromBoxsetInput!"
                    ]
                }
            ],
            "reorderBoxsetMembers": [
                84,
                {
                    "input": [
                        195,
                        "ReorderBoxsetMembersInput!"
                    ]
                }
            ],
            "reorderDiscs": [
                85,
                {
                    "input": [
                        196,
                        "ReorderDiscsInput!"
                    ]
                }
            ],
            "revokeApiKey": [
                86,
                {
                    "input": [
                        197,
                        "RevokeApiKeyInput!"
                    ]
                }
            ],
            "sendAdminMessage": [
                89,
                {
                    "input": [
                        199,
                        "SendAdminMessageInput!"
                    ]
                }
            ],
            "sendUserMessage": [
                91,
                {
                    "input": [
                        201,
                        "SendUserMessageInput!"
                    ]
                }
            ],
            "sendAdminBoxsetMessage": [
                88,
                {
                    "input": [
                        198,
                        "SendAdminBoxsetMessageInput!"
                    ]
                }
            ],
            "sendBoxsetUserMessage": [
                90,
                {
                    "input": [
                        200,
                        "SendBoxsetUserMessageInput!"
                    ]
                }
            ],
            "updateBoxset": [
                96,
                {
                    "input": [
                        204,
                        "UpdateBoxsetInput!"
                    ]
                }
            ],
            "updateContribution": [
                97,
                {
                    "input": [
                        205,
                        "UpdateContributionInput!"
                    ]
                }
            ],
            "updateDisc": [
                98,
                {
                    "input": [
                        206,
                        "UpdateDiscInput!"
                    ]
                }
            ],
            "__typename": [
                1
            ]
        }
    }
}