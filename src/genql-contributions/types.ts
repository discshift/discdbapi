export default {
    "scalars": [
        1,
        6,
        7,
        11,
        153,
        154,
        155,
        156,
        157,
        158,
        159,
        160,
        161,
        162,
        163
    ],
    "types": {
        "Error": {
            "message": [
                1
            ],
            "on_ApiKeyNotFoundError": [
                9
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_ContributionNotFoundError": [
                22
            ],
            "on_CouldNotParseLogsError": [
                25
            ],
            "on_DiscItemNotFoundError": [
                32
            ],
            "on_DiscNotFoundError": [
                35
            ],
            "on_ExternalDataNotFoundError": [
                41
            ],
            "on_ExternalDataSerializationError": [
                43
            ],
            "on_FieldRequiredError": [
                45
            ],
            "on_InvalidContributionStatusError": [
                49
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
            ],
            "on_LogsNotFoundError": [
                52
            ],
            "__typename": [
                1
            ]
        },
        "String": {},
        "AddAudioTrackToItemPayload": {
            "userContributionAudioTrack": [
                71
            ],
            "errors": [
                77
            ],
            "__typename": [
                1
            ]
        },
        "AddChapterToItemPayload": {
            "userContributionChapter": [
                72
            ],
            "errors": [
                78
            ],
            "__typename": [
                1
            ]
        },
        "AddItemToDiscPayload": {
            "userContributionDiscItem": [
                75
            ],
            "errors": [
                79
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
                158
            ],
            "numberOfDiscs": [
                6
            ],
            "aspectRatio": [
                1
            ],
            "isDiscontinued": [
                7
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
                7
            ],
            "logUsage": [
                7
            ],
            "roles": [
                1
            ],
            "ownerEmail": [
                1
            ],
            "createdAt": [
                158
            ],
            "expiresAt": [
                158
            ],
            "lastUsedAt": [
                158
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
                158
            ],
            "operationName": [
                1
            ],
            "fieldCost": [
                11
            ],
            "typeCost": [
                11
            ],
            "durationMs": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "Float": {},
        "ApiKeyUsageLogsConnection": {
            "pageInfo": [
                59
            ],
            "edges": [
                13
            ],
            "nodes": [
                10
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
                10
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeysConnection": {
            "pageInfo": [
                59
            ],
            "edges": [
                15
            ],
            "nodes": [
                8
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
                8
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
        "ContributionChatConnection": {
            "pageInfo": [
                59
            ],
            "edges": [
                18
            ],
            "nodes": [
                76
            ],
            "totalCount": [
                6
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
                76
            ],
            "__typename": [
                1
            ]
        },
        "ContributionHistory": {
            "id": [
                6
            ],
            "contributionId": [
                6
            ],
            "timeStamp": [
                158
            ],
            "description": [
                1
            ],
            "userId": [
                1
            ],
            "type": [
                154
            ],
            "__typename": [
                1
            ]
        },
        "ContributionHistoryConnection": {
            "pageInfo": [
                59
            ],
            "edges": [
                21
            ],
            "nodes": [
                19
            ],
            "totalCount": [
                6
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
                19
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
                59
            ],
            "edges": [
                24
            ],
            "nodes": [
                70
            ],
            "totalCount": [
                6
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
                70
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
        "CreateContributionPayload": {
            "userContribution": [
                70
            ],
            "errors": [
                80
            ],
            "__typename": [
                1
            ]
        },
        "CreateDiscPayload": {
            "userContributionDisc": [
                73
            ],
            "errors": [
                81
            ],
            "__typename": [
                1
            ]
        },
        "DeleteContributionPayload": {
            "userContribution": [
                70
            ],
            "errors": [
                82
            ],
            "__typename": [
                1
            ]
        },
        "DeleteItemFromDiscPayload": {
            "userContributionDiscItem": [
                75
            ],
            "errors": [
                83
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
                67
            ],
            "hashInfo": [
                48
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
                31
            ],
            "disc": [
                73
            ],
            "contribution": [
                70
            ],
            "__typename": [
                1
            ]
        },
        "DiscLogsPayload": {
            "discLogs": [
                33
            ],
            "errors": [
                84
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
                7
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
                36
            ],
            "errors": [
                85
            ],
            "__typename": [
                1
            ]
        },
        "EditItemOnDiscPayload": {
            "userContributionDiscItem": [
                75
            ],
            "errors": [
                86
            ],
            "__typename": [
                1
            ]
        },
        "EpisodeNamesPayload": {
            "seriesEpisodeNames": [
                66
            ],
            "errors": [
                87
            ],
            "__typename": [
                1
            ]
        },
        "ExternalDataForContributionPayload": {
            "externalMetadata": [
                44
            ],
            "errors": [
                89
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
                44
            ],
            "errors": [
                88
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
                6
            ],
            "title": [
                1
            ],
            "year": [
                6
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
                30
            ],
            "errors": [
                90
            ],
            "__typename": [
                1
            ]
        },
        "HashInfoLogLine": {
            "matches": [
                7,
                {
                    "prefix": [
                        1,
                        "String!"
                    ]
                }
            ],
            "index": [
                6
            ],
            "name": [
                1
            ],
            "creationTime": [
                158
            ],
            "size": [
                161
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
        "InvalidContributionStatusError": {
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
        "MarkMessagesAsReadPayload": {
            "boolean": [
                7
            ],
            "errors": [
                91
            ],
            "__typename": [
                1
            ]
        },
        "MessageThread": {
            "contributionId": [
                6
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
                158
            ],
            "unreadCount": [
                6
            ],
            "totalCount": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "MyContributionsConnection": {
            "pageInfo": [
                59
            ],
            "edges": [
                56
            ],
            "nodes": [
                70
            ],
            "totalCount": [
                6
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
                70
            ],
            "__typename": [
                1
            ]
        },
        "MyMessagesConnection": {
            "pageInfo": [
                59
            ],
            "edges": [
                58
            ],
            "nodes": [
                76
            ],
            "totalCount": [
                6
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
                76
            ],
            "__typename": [
                1
            ]
        },
        "PageInfo": {
            "hasNextPage": [
                7
            ],
            "hasPreviousPage": [
                7
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
        "ReorderDiscsPayload": {
            "userContributionDisc": [
                73
            ],
            "errors": [
                92
            ],
            "__typename": [
                1
            ]
        },
        "RevokeApiKeyPayload": {
            "apiKeyInfo": [
                8
            ],
            "errors": [
                93
            ],
            "__typename": [
                1
            ]
        },
        "Segment": {
            "index": [
                6
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
        "SendAdminMessagePayload": {
            "userMessage": [
                76
            ],
            "errors": [
                94
            ],
            "__typename": [
                1
            ]
        },
        "SendUserMessagePayload": {
            "userMessage": [
                76
            ],
            "errors": [
                95
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
                65,
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
                65
            ],
            "__typename": [
                1
            ]
        },
        "Title": {
            "index": [
                6
            ],
            "chapterCount": [
                6
            ],
            "length": [
                1
            ],
            "displaySize": [
                1
            ],
            "size": [
                161
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
                62
            ],
            "lengthAsTimeSpan": [
                162
            ],
            "__typename": [
                1
            ]
        },
        "UpdateContributionPayload": {
            "userContribution": [
                70
            ],
            "errors": [
                96
            ],
            "__typename": [
                1
            ]
        },
        "UpdateDiscPayload": {
            "userContributionDisc": [
                73
            ],
            "errors": [
                97
            ],
            "__typename": [
                1
            ]
        },
        "UserContribution": {
            "id": [
                6
            ],
            "userId": [
                1
            ],
            "created": [
                158
            ],
            "status": [
                156
            ],
            "discs": [
                73,
                {
                    "where": [
                        143
                    ],
                    "order": [
                        148,
                        "[UserContributionDiscSortInput!]"
                    ]
                }
            ],
            "hashItems": [
                74,
                {
                    "where": [
                        144
                    ],
                    "order": [
                        145,
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
                158
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
                159
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionAudioTrack": {
            "id": [
                6
            ],
            "index": [
                6
            ],
            "title": [
                1
            ],
            "item": [
                75
            ],
            "encodedId": [
                159
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionChapter": {
            "id": [
                6
            ],
            "index": [
                6
            ],
            "title": [
                1
            ],
            "item": [
                75
            ],
            "encodedId": [
                159
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDisc": {
            "id": [
                6
            ],
            "userContribution": [
                70
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
            "logsUploaded": [
                7
            ],
            "logUploadError": [
                1
            ],
            "index": [
                6
            ],
            "existingDiscPath": [
                1
            ],
            "items": [
                75,
                {
                    "where": [
                        146
                    ],
                    "order": [
                        147,
                        "[UserContributionDiscItemSortInput!]"
                    ]
                }
            ],
            "encodedId": [
                159
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscHashItem": {
            "id": [
                6
            ],
            "userContribution": [
                70
            ],
            "discHash": [
                1
            ],
            "index": [
                6
            ],
            "name": [
                1
            ],
            "creationTime": [
                158
            ],
            "size": [
                161
            ],
            "encodedId": [
                159
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscItem": {
            "id": [
                6
            ],
            "disc": [
                73
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
                6
            ],
            "segmentCount": [
                6
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
                72,
                {
                    "where": [
                        141
                    ],
                    "order": [
                        142,
                        "[UserContributionChapterSortInput!]"
                    ]
                }
            ],
            "audioTracks": [
                71,
                {
                    "where": [
                        139
                    ],
                    "order": [
                        140,
                        "[UserContributionAudioTrackSortInput!]"
                    ]
                }
            ],
            "encodedId": [
                159
            ],
            "__typename": [
                1
            ]
        },
        "UserMessage": {
            "id": [
                6
            ],
            "contributionId": [
                6
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
                7
            ],
            "createdAt": [
                158
            ],
            "type": [
                157
            ],
            "__typename": [
                1
            ]
        },
        "AddAudioTrackToItemError": {
            "on_ContributionNotFoundError": [
                22
            ],
            "on_DiscNotFoundError": [
                35
            ],
            "on_DiscItemNotFoundError": [
                32
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                22
            ],
            "on_DiscNotFoundError": [
                35
            ],
            "on_DiscItemNotFoundError": [
                32
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                22
            ],
            "on_DiscNotFoundError": [
                35
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                16
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
                22
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                22
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
            ],
            "on_InvalidContributionStatusError": [
                49
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
                22
            ],
            "on_DiscNotFoundError": [
                35
            ],
            "on_DiscItemNotFoundError": [
                32
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                52
            ],
            "on_ContributionNotFoundError": [
                22
            ],
            "on_DiscNotFoundError": [
                35
            ],
            "on_CouldNotParseLogsError": [
                25
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                35
            ],
            "on_FieldRequiredError": [
                45
            ],
            "on_InvalidIdError": [
                50
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
                22
            ],
            "on_DiscNotFoundError": [
                35
            ],
            "on_DiscItemNotFoundError": [
                32
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                22
            ],
            "on_ExternalDataNotFoundError": [
                41
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                22
            ],
            "on_ExternalDataNotFoundError": [
                41
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
                22
            ],
            "on_ExternalDataSerializationError": [
                43
            ],
            "on_ExternalDataNotFoundError": [
                41
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                22
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                16
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
                22
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                9
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
                22
            ],
            "on_AuthenticationError": [
                16
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
                22
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidOwnershipError": [
                51
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
                22
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
            ],
            "on_InvalidContributionStatusError": [
                49
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
                22
            ],
            "on_DiscNotFoundError": [
                35
            ],
            "on_AuthenticationError": [
                16
            ],
            "on_InvalidIdError": [
                50
            ],
            "on_InvalidOwnershipError": [
                51
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
                6
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
                6
            ],
            "chapterName": [
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
                6
            ],
            "segmentCount": [
                6
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
        "ApiKeyInfoFilterInput": {
            "and": [
                101
            ],
            "or": [
                101
            ],
            "name": [
                136
            ],
            "keyPrefix": [
                136
            ],
            "isActive": [
                105
            ],
            "logUsage": [
                105
            ],
            "roles": [
                136
            ],
            "ownerEmail": [
                136
            ],
            "createdAt": [
                110
            ],
            "expiresAt": [
                110
            ],
            "lastUsedAt": [
                110
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyInfoSortInput": {
            "name": [
                155
            ],
            "keyPrefix": [
                155
            ],
            "isActive": [
                155
            ],
            "logUsage": [
                155
            ],
            "roles": [
                155
            ],
            "ownerEmail": [
                155
            ],
            "createdAt": [
                155
            ],
            "expiresAt": [
                155
            ],
            "lastUsedAt": [
                155
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyUsageLogInfoFilterInput": {
            "and": [
                103
            ],
            "or": [
                103
            ],
            "apiKeyPrefix": [
                136
            ],
            "apiKeyName": [
                136
            ],
            "timestamp": [
                110
            ],
            "operationName": [
                136
            ],
            "fieldCost": [
                121
            ],
            "typeCost": [
                121
            ],
            "durationMs": [
                124
            ],
            "__typename": [
                1
            ]
        },
        "ApiKeyUsageLogInfoSortInput": {
            "apiKeyPrefix": [
                155
            ],
            "apiKeyName": [
                155
            ],
            "timestamp": [
                155
            ],
            "operationName": [
                155
            ],
            "fieldCost": [
                155
            ],
            "typeCost": [
                155
            ],
            "durationMs": [
                155
            ],
            "__typename": [
                1
            ]
        },
        "BooleanOperationFilterInput": {
            "eq": [
                7
            ],
            "neq": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "ContributionHistorySortInput": {
            "id": [
                155
            ],
            "contributionId": [
                155
            ],
            "timeStamp": [
                155
            ],
            "description": [
                155
            ],
            "userId": [
                155
            ],
            "type": [
                155
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
                158
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
                163
            ],
            "status": [
                156
            ],
            "__typename": [
                1
            ]
        },
        "CreateContributionInput": {
            "input": [
                107
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
            "__typename": [
                1
            ]
        },
        "DateTimeOperationFilterInput": {
            "eq": [
                158
            ],
            "neq": [
                158
            ],
            "in": [
                158
            ],
            "nin": [
                158
            ],
            "gt": [
                158
            ],
            "ngt": [
                158
            ],
            "gte": [
                158
            ],
            "ngte": [
                158
            ],
            "lt": [
                158
            ],
            "nlt": [
                158
            ],
            "lte": [
                158
            ],
            "nlte": [
                158
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
                6
            ],
            "segmentCount": [
                6
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
                116
            ],
            "or": [
                116
            ],
            "eq": [
                160
            ],
            "neq": [
                160
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
                6
            ],
            "name": [
                1
            ],
            "creationTime": [
                158
            ],
            "size": [
                161
            ],
            "__typename": [
                1
            ]
        },
        "FloatOperationFilterInput": {
            "eq": [
                11
            ],
            "neq": [
                11
            ],
            "in": [
                11
            ],
            "nin": [
                11
            ],
            "gt": [
                11
            ],
            "ngt": [
                11
            ],
            "gte": [
                11
            ],
            "ngte": [
                11
            ],
            "lt": [
                11
            ],
            "nlt": [
                11
            ],
            "lte": [
                11
            ],
            "nlte": [
                11
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
                158
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
                120
            ],
            "__typename": [
                1
            ]
        },
        "IntOperationFilterInput": {
            "eq": [
                6
            ],
            "neq": [
                6
            ],
            "in": [
                6
            ],
            "nin": [
                6
            ],
            "gt": [
                6
            ],
            "ngt": [
                6
            ],
            "gte": [
                6
            ],
            "ngte": [
                6
            ],
            "lt": [
                6
            ],
            "nlt": [
                6
            ],
            "lte": [
                6
            ],
            "nlte": [
                6
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionAudioTrackFilterInput": {
            "all": [
                139
            ],
            "none": [
                139
            ],
            "some": [
                139
            ],
            "any": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionChapterFilterInput": {
            "all": [
                141
            ],
            "none": [
                141
            ],
            "some": [
                141
            ],
            "any": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionDiscFilterInput": {
            "all": [
                143
            ],
            "none": [
                143
            ],
            "some": [
                143
            ],
            "any": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionDiscHashItemFilterInput": {
            "all": [
                144
            ],
            "none": [
                144
            ],
            "some": [
                144
            ],
            "any": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "ListEncodedIdFilterTypeOfUserContributionDiscItemFilterInput": {
            "all": [
                146
            ],
            "none": [
                146
            ],
            "some": [
                146
            ],
            "any": [
                7
            ],
            "__typename": [
                1
            ]
        },
        "LongOperationFilterInput": {
            "eq": [
                161
            ],
            "neq": [
                161
            ],
            "in": [
                161
            ],
            "nin": [
                161
            ],
            "gt": [
                161
            ],
            "ngt": [
                161
            ],
            "gte": [
                161
            ],
            "ngte": [
                161
            ],
            "lt": [
                161
            ],
            "nlt": [
                161
            ],
            "lte": [
                161
            ],
            "nlte": [
                161
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
        "StringOperationFilterInput": {
            "and": [
                136
            ],
            "or": [
                136
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
                158
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
                7
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
                139
            ],
            "or": [
                139
            ],
            "encodedId": [
                116
            ],
            "index": [
                124
            ],
            "title": [
                136
            ],
            "item": [
                146
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionAudioTrackSortInput": {
            "id": [
                155
            ],
            "index": [
                155
            ],
            "title": [
                155
            ],
            "item": [
                147
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionChapterFilterInput": {
            "and": [
                141
            ],
            "or": [
                141
            ],
            "encodedId": [
                116
            ],
            "index": [
                124
            ],
            "title": [
                136
            ],
            "item": [
                146
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionChapterSortInput": {
            "id": [
                155
            ],
            "index": [
                155
            ],
            "title": [
                155
            ],
            "item": [
                147
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscFilterInput": {
            "and": [
                143
            ],
            "or": [
                143
            ],
            "encodedId": [
                116
            ],
            "userContribution": [
                149
            ],
            "contentHash": [
                136
            ],
            "format": [
                136
            ],
            "name": [
                136
            ],
            "slug": [
                136
            ],
            "logsUploaded": [
                105
            ],
            "logUploadError": [
                136
            ],
            "index": [
                124
            ],
            "existingDiscPath": [
                136
            ],
            "items": [
                129
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscHashItemFilterInput": {
            "and": [
                144
            ],
            "or": [
                144
            ],
            "encodedId": [
                116
            ],
            "userContribution": [
                149
            ],
            "discHash": [
                136
            ],
            "index": [
                124
            ],
            "name": [
                136
            ],
            "creationTime": [
                110
            ],
            "size": [
                130
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscHashItemSortInput": {
            "id": [
                155
            ],
            "userContribution": [
                150
            ],
            "discHash": [
                155
            ],
            "index": [
                155
            ],
            "name": [
                155
            ],
            "creationTime": [
                155
            ],
            "size": [
                155
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscItemFilterInput": {
            "and": [
                146
            ],
            "or": [
                146
            ],
            "encodedId": [
                116
            ],
            "disc": [
                143
            ],
            "name": [
                136
            ],
            "source": [
                136
            ],
            "duration": [
                136
            ],
            "size": [
                136
            ],
            "chapterCount": [
                124
            ],
            "segmentCount": [
                124
            ],
            "segmentMap": [
                136
            ],
            "type": [
                136
            ],
            "description": [
                136
            ],
            "season": [
                136
            ],
            "episode": [
                136
            ],
            "chapters": [
                126
            ],
            "audioTracks": [
                125
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscItemSortInput": {
            "id": [
                155
            ],
            "disc": [
                148
            ],
            "name": [
                155
            ],
            "source": [
                155
            ],
            "duration": [
                155
            ],
            "size": [
                155
            ],
            "chapterCount": [
                155
            ],
            "segmentCount": [
                155
            ],
            "segmentMap": [
                155
            ],
            "type": [
                155
            ],
            "description": [
                155
            ],
            "season": [
                155
            ],
            "episode": [
                155
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionDiscSortInput": {
            "id": [
                155
            ],
            "userContribution": [
                150
            ],
            "contentHash": [
                155
            ],
            "format": [
                155
            ],
            "name": [
                155
            ],
            "slug": [
                155
            ],
            "logsUploaded": [
                155
            ],
            "logUploadError": [
                155
            ],
            "index": [
                155
            ],
            "existingDiscPath": [
                155
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionFilterInput": {
            "and": [
                149
            ],
            "or": [
                149
            ],
            "encodedId": [
                116
            ],
            "userId": [
                136
            ],
            "created": [
                110
            ],
            "status": [
                151
            ],
            "discs": [
                127
            ],
            "hashItems": [
                128
            ],
            "mediaType": [
                136
            ],
            "externalId": [
                136
            ],
            "externalProvider": [
                136
            ],
            "releaseDate": [
                110
            ],
            "asin": [
                136
            ],
            "upc": [
                136
            ],
            "frontImageUrl": [
                136
            ],
            "backImageUrl": [
                136
            ],
            "releaseTitle": [
                136
            ],
            "releaseSlug": [
                136
            ],
            "locale": [
                136
            ],
            "regionCode": [
                136
            ],
            "title": [
                136
            ],
            "year": [
                136
            ],
            "titleSlug": [
                136
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionSortInput": {
            "id": [
                155
            ],
            "userId": [
                155
            ],
            "created": [
                155
            ],
            "status": [
                155
            ],
            "mediaType": [
                155
            ],
            "externalId": [
                155
            ],
            "externalProvider": [
                155
            ],
            "releaseDate": [
                155
            ],
            "asin": [
                155
            ],
            "upc": [
                155
            ],
            "frontImageUrl": [
                155
            ],
            "backImageUrl": [
                155
            ],
            "releaseTitle": [
                155
            ],
            "releaseSlug": [
                155
            ],
            "locale": [
                155
            ],
            "regionCode": [
                155
            ],
            "title": [
                155
            ],
            "year": [
                155
            ],
            "titleSlug": [
                155
            ],
            "__typename": [
                1
            ]
        },
        "UserContributionStatusOperationFilterInput": {
            "eq": [
                156
            ],
            "neq": [
                156
            ],
            "in": [
                156
            ],
            "nin": [
                156
            ],
            "__typename": [
                1
            ]
        },
        "UserMessageSortInput": {
            "id": [
                155
            ],
            "contributionId": [
                155
            ],
            "fromUserId": [
                155
            ],
            "toUserId": [
                155
            ],
            "message": [
                155
            ],
            "isRead": [
                155
            ],
            "createdAt": [
                155
            ],
            "type": [
                155
            ],
            "__typename": [
                1
            ]
        },
        "ApplyPolicy": {},
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
                23,
                {
                    "first": [
                        6
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        6
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        149
                    ],
                    "order": [
                        150,
                        "[UserContributionSortInput!]"
                    ]
                }
            ],
            "myContributions": [
                55,
                {
                    "first": [
                        6
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        6
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        149
                    ],
                    "order": [
                        150,
                        "[UserContributionSortInput!]"
                    ]
                }
            ],
            "contributionHistory": [
                20,
                {
                    "contributionId": [
                        6,
                        "Int!"
                    ],
                    "first": [
                        6
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        6
                    ],
                    "before": [
                        1
                    ],
                    "order": [
                        106,
                        "[ContributionHistorySortInput!]"
                    ]
                }
            ],
            "contributionChat": [
                17,
                {
                    "contributionId": [
                        1,
                        "String!"
                    ],
                    "first": [
                        6
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        6
                    ],
                    "before": [
                        1
                    ],
                    "order": [
                        152,
                        "[UserMessageSortInput!]"
                    ]
                }
            ],
            "hasUnreadMessages": [
                7
            ],
            "myMessages": [
                57,
                {
                    "first": [
                        6
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        6
                    ],
                    "before": [
                        1
                    ],
                    "order": [
                        152,
                        "[UserMessageSortInput!]"
                    ]
                }
            ],
            "messageThreads": [
                54
            ],
            "amazonProductMetadata": [
                5,
                {
                    "asin": [
                        1,
                        "String!"
                    ]
                }
            ],
            "apiKeys": [
                14,
                {
                    "first": [
                        6
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        6
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        101
                    ],
                    "order": [
                        102,
                        "[ApiKeyInfoSortInput!]"
                    ]
                }
            ],
            "apiKeyUsageLogs": [
                12,
                {
                    "first": [
                        6
                    ],
                    "after": [
                        1
                    ],
                    "last": [
                        6
                    ],
                    "before": [
                        1
                    ],
                    "where": [
                        103
                    ],
                    "order": [
                        104,
                        "[ApiKeyUsageLogInfoSortInput!]"
                    ]
                }
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
                        98,
                        "AddAudioTrackToItemInput!"
                    ]
                }
            ],
            "addChapterToItem": [
                3,
                {
                    "input": [
                        99,
                        "AddChapterToItemInput!"
                    ]
                }
            ],
            "addItemToDisc": [
                4,
                {
                    "input": [
                        100,
                        "AddItemToDiscInput!"
                    ]
                }
            ],
            "createContribution": [
                26,
                {
                    "input": [
                        108,
                        "CreateContributionInput!"
                    ]
                }
            ],
            "createDisc": [
                27,
                {
                    "input": [
                        109,
                        "CreateDiscInput!"
                    ]
                }
            ],
            "deleteContribution": [
                28,
                {
                    "input": [
                        111,
                        "DeleteContributionInput!"
                    ]
                }
            ],
            "deleteItemFromDisc": [
                29,
                {
                    "input": [
                        112,
                        "DeleteItemFromDiscInput!"
                    ]
                }
            ],
            "editItemOnDisc": [
                38,
                {
                    "input": [
                        115,
                        "EditItemOnDiscInput!"
                    ]
                }
            ],
            "generateApiKey": [
                46,
                {
                    "input": [
                        122,
                        "GenerateApiKeyInput!"
                    ]
                }
            ],
            "discLogs": [
                34,
                {
                    "input": [
                        113,
                        "DiscLogsInput!"
                    ]
                }
            ],
            "discUploadStatus": [
                37,
                {
                    "input": [
                        114,
                        "DiscUploadStatusInput!"
                    ]
                }
            ],
            "episodeNames": [
                39,
                {
                    "input": [
                        117,
                        "EpisodeNamesInput!"
                    ]
                }
            ],
            "externalData": [
                42,
                {
                    "input": [
                        119,
                        "ExternalDataInput!"
                    ]
                }
            ],
            "externalDataForContribution": [
                40,
                {
                    "input": [
                        118,
                        "ExternalDataForContributionInput!"
                    ]
                }
            ],
            "hashDisc": [
                47,
                {
                    "input": [
                        123,
                        "HashDiscInput!"
                    ]
                }
            ],
            "markMessagesAsRead": [
                53,
                {
                    "input": [
                        131,
                        "MarkMessagesAsReadInput!"
                    ]
                }
            ],
            "reorderDiscs": [
                60,
                {
                    "input": [
                        132,
                        "ReorderDiscsInput!"
                    ]
                }
            ],
            "revokeApiKey": [
                61,
                {
                    "input": [
                        133,
                        "RevokeApiKeyInput!"
                    ]
                }
            ],
            "sendAdminMessage": [
                63,
                {
                    "input": [
                        134,
                        "SendAdminMessageInput!"
                    ]
                }
            ],
            "sendUserMessage": [
                64,
                {
                    "input": [
                        135,
                        "SendUserMessageInput!"
                    ]
                }
            ],
            "updateContribution": [
                68,
                {
                    "input": [
                        137,
                        "UpdateContributionInput!"
                    ]
                }
            ],
            "updateDisc": [
                69,
                {
                    "input": [
                        138,
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