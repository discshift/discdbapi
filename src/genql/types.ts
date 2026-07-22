export default {
    "scalars": [
        12,
        36,
        42,
        46,
        50,
        59
    ],
    "types": {
        "ListFilterInputTypeOfTrackFilterInput": {
            "all": [
                35
            ],
            "none": [
                35
            ],
            "some": [
                35
            ],
            "any": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "MediaItem": {
            "id": [
                46
            ],
            "title": [
                50
            ],
            "slug": [
                50
            ],
            "fullTitle": [
                50
            ],
            "sortTitle": [
                50
            ],
            "year": [
                46
            ],
            "type": [
                50
            ],
            "imageUrl": [
                50
            ],
            "externalids": [
                45
            ],
            "externalIdsId": [
                46
            ],
            "releases": [
                56,
                {
                    "where": [
                        62
                    ],
                    "order": [
                        4,
                        "[ReleaseSortInput!]"
                    ]
                }
            ],
            "mediaItemGroups": [
                66,
                {
                    "where": [
                        19
                    ],
                    "order": [
                        11,
                        "[MediaItemGroupSortInput!]"
                    ]
                }
            ],
            "plot": [
                50
            ],
            "tagline": [
                50
            ],
            "directors": [
                50
            ],
            "writers": [
                50
            ],
            "stars": [
                50
            ],
            "genres": [
                50
            ],
            "runtimeMinutes": [
                46
            ],
            "runtime": [
                50
            ],
            "contentRating": [
                50
            ],
            "releaseDate": [
                59
            ],
            "latestReleaseDate": [
                59
            ],
            "dateAdded": [
                59
            ],
            "__typename": [
                50
            ]
        },
        "DateTimeOperationFilterInput": {
            "eq": [
                59
            ],
            "neq": [
                59
            ],
            "in": [
                59
            ],
            "nin": [
                59
            ],
            "gt": [
                59
            ],
            "ngt": [
                59
            ],
            "gte": [
                59
            ],
            "ngte": [
                59
            ],
            "lt": [
                59
            ],
            "nlt": [
                59
            ],
            "lte": [
                59
            ],
            "nlte": [
                59
            ],
            "__typename": [
                50
            ]
        },
        "MediaItemSortInput": {
            "id": [
                12
            ],
            "title": [
                12
            ],
            "slug": [
                12
            ],
            "fullTitle": [
                12
            ],
            "sortTitle": [
                12
            ],
            "year": [
                12
            ],
            "type": [
                12
            ],
            "imageUrl": [
                12
            ],
            "externalids": [
                38
            ],
            "externalIdsId": [
                12
            ],
            "plot": [
                12
            ],
            "tagline": [
                12
            ],
            "directors": [
                12
            ],
            "writers": [
                12
            ],
            "stars": [
                12
            ],
            "genres": [
                12
            ],
            "runtimeMinutes": [
                12
            ],
            "runtime": [
                12
            ],
            "contentRating": [
                12
            ],
            "releaseDate": [
                12
            ],
            "latestReleaseDate": [
                12
            ],
            "dateAdded": [
                12
            ],
            "__typename": [
                50
            ]
        },
        "ReleaseSortInput": {
            "id": [
                12
            ],
            "slug": [
                12
            ],
            "title": [
                12
            ],
            "regionCode": [
                12
            ],
            "locale": [
                12
            ],
            "year": [
                12
            ],
            "upc": [
                12
            ],
            "isbn": [
                12
            ],
            "asin": [
                12
            ],
            "imageUrl": [
                12
            ],
            "backImageUrl": [
                12
            ],
            "releaseDate": [
                12
            ],
            "dateAdded": [
                12
            ],
            "fullTitle": [
                12
            ],
            "type": [
                12
            ],
            "mediaItem": [
                3
            ],
            "boxset": [
                40
            ],
            "__typename": [
                50
            ]
        },
        "ChapterSortInput": {
            "id": [
                12
            ],
            "index": [
                12
            ],
            "title": [
                12
            ],
            "__typename": [
                50
            ]
        },
        "ListFilterInputTypeOfReleaseFilterInput": {
            "all": [
                62
            ],
            "none": [
                62
            ],
            "some": [
                62
            ],
            "any": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "ReleaseGroupSortInput": {
            "id": [
                12
            ],
            "releaseId": [
                12
            ],
            "groupId": [
                12
            ],
            "release": [
                4
            ],
            "group": [
                24
            ],
            "__typename": [
                50
            ]
        },
        "MediaItemFilterInput": {
            "and": [
                8
            ],
            "or": [
                8
            ],
            "id": [
                14
            ],
            "title": [
                57
            ],
            "slug": [
                57
            ],
            "fullTitle": [
                57
            ],
            "sortTitle": [
                57
            ],
            "year": [
                14
            ],
            "type": [
                57
            ],
            "imageUrl": [
                57
            ],
            "externalids": [
                33
            ],
            "externalIdsId": [
                14
            ],
            "releases": [
                6
            ],
            "mediaItemGroups": [
                18
            ],
            "plot": [
                57
            ],
            "tagline": [
                57
            ],
            "directors": [
                57
            ],
            "writers": [
                57
            ],
            "stars": [
                57
            ],
            "genres": [
                57
            ],
            "runtimeMinutes": [
                14
            ],
            "runtime": [
                57
            ],
            "contentRating": [
                57
            ],
            "releaseDate": [
                2
            ],
            "latestReleaseDate": [
                2
            ],
            "dateAdded": [
                2
            ],
            "__typename": [
                50
            ]
        },
        "Group": {
            "id": [
                46
            ],
            "imdbId": [
                50
            ],
            "name": [
                50
            ],
            "slug": [
                50
            ],
            "imageUrl": [
                50
            ],
            "mediaItemGroups": [
                66,
                {
                    "where": [
                        19
                    ],
                    "order": [
                        11,
                        "[MediaItemGroupSortInput!]"
                    ]
                }
            ],
            "releaseGroups": [
                44,
                {
                    "where": [
                        60
                    ],
                    "order": [
                        7,
                        "[ReleaseGroupSortInput!]"
                    ]
                }
            ],
            "__typename": [
                50
            ]
        },
        "FileNameTemplateInput": {
            "itemType": [
                50
            ],
            "template": [
                50
            ],
            "__typename": [
                50
            ]
        },
        "MediaItemGroupSortInput": {
            "id": [
                12
            ],
            "mediaItemId": [
                12
            ],
            "groupId": [
                12
            ],
            "role": [
                12
            ],
            "isFeatured": [
                12
            ],
            "mediaItem": [
                3
            ],
            "group": [
                24
            ],
            "__typename": [
                50
            ]
        },
        "SortEnumType": {},
        "BoxsetFilterInput": {
            "and": [
                13
            ],
            "or": [
                13
            ],
            "id": [
                14
            ],
            "title": [
                57
            ],
            "sortTitle": [
                57
            ],
            "slug": [
                57
            ],
            "imageUrl": [
                57
            ],
            "release": [
                62
            ],
            "releaseId": [
                14
            ],
            "type": [
                57
            ],
            "__typename": [
                50
            ]
        },
        "IntOperationFilterInput": {
            "eq": [
                46
            ],
            "neq": [
                46
            ],
            "in": [
                46
            ],
            "nin": [
                46
            ],
            "gt": [
                46
            ],
            "ngt": [
                46
            ],
            "gte": [
                46
            ],
            "ngte": [
                46
            ],
            "lt": [
                46
            ],
            "nlt": [
                46
            ],
            "lte": [
                46
            ],
            "nlte": [
                46
            ],
            "__typename": [
                50
            ]
        },
        "MediaItemsConnection": {
            "pageInfo": [
                30
            ],
            "edges": [
                26
            ],
            "nodes": [
                1
            ],
            "__typename": [
                50
            ]
        },
        "ReleaseDiscFilterInput": {
            "and": [
                16
            ],
            "or": [
                16
            ],
            "id": [
                14
            ],
            "releaseId": [
                14
            ],
            "release": [
                62
            ],
            "discId": [
                14
            ],
            "disc": [
                52
            ],
            "index": [
                14
            ],
            "slug": [
                57
            ],
            "name": [
                57
            ],
            "titles": [
                37
            ],
            "format": [
                57
            ],
            "contentHash": [
                57
            ],
            "globalDiscId": [
                57
            ],
            "__typename": [
                50
            ]
        },
        "ListFilterInputTypeOfReleaseGroupFilterInput": {
            "all": [
                60
            ],
            "none": [
                60
            ],
            "some": [
                60
            ],
            "any": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "ListFilterInputTypeOfMediaItemGroupFilterInput": {
            "all": [
                19
            ],
            "none": [
                19
            ],
            "some": [
                19
            ],
            "any": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "MediaItemGroupFilterInput": {
            "and": [
                19
            ],
            "or": [
                19
            ],
            "id": [
                14
            ],
            "mediaItemId": [
                14
            ],
            "groupId": [
                14
            ],
            "role": [
                57
            ],
            "isFeatured": [
                25
            ],
            "mediaItem": [
                8
            ],
            "group": [
                48
            ],
            "__typename": [
                50
            ]
        },
        "LongOperationFilterInput": {
            "eq": [
                42
            ],
            "neq": [
                42
            ],
            "in": [
                42
            ],
            "nin": [
                42
            ],
            "gt": [
                42
            ],
            "ngt": [
                42
            ],
            "gte": [
                42
            ],
            "ngte": [
                42
            ],
            "lt": [
                42
            ],
            "nlt": [
                42
            ],
            "lte": [
                42
            ],
            "nlte": [
                42
            ],
            "__typename": [
                50
            ]
        },
        "TrackSortInput": {
            "id": [
                12
            ],
            "index": [
                12
            ],
            "name": [
                12
            ],
            "type": [
                12
            ],
            "resolution": [
                12
            ],
            "aspectRatio": [
                12
            ],
            "audioType": [
                12
            ],
            "languageCode": [
                12
            ],
            "language": [
                12
            ],
            "description": [
                12
            ],
            "title": [
                53
            ],
            "__typename": [
                50
            ]
        },
        "ListReleaseDiscFilterTypeFilterInput": {
            "all": [
                16
            ],
            "none": [
                16
            ],
            "some": [
                16
            ],
            "any": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "Chapter": {
            "id": [
                46
            ],
            "index": [
                46
            ],
            "title": [
                50
            ],
            "__typename": [
                50
            ]
        },
        "GroupSortInput": {
            "id": [
                12
            ],
            "imdbId": [
                12
            ],
            "name": [
                12
            ],
            "slug": [
                12
            ],
            "imageUrl": [
                12
            ],
            "__typename": [
                50
            ]
        },
        "BooleanOperationFilterInput": {
            "eq": [
                36
            ],
            "neq": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "MediaItemsEdge": {
            "cursor": [
                50
            ],
            "node": [
                1
            ],
            "__typename": [
                50
            ]
        },
        "BoxsetsEdge": {
            "cursor": [
                50
            ],
            "node": [
                31
            ],
            "__typename": [
                50
            ]
        },
        "Contributor": {
            "id": [
                46
            ],
            "name": [
                50
            ],
            "releases": [
                56
            ],
            "userId": [
                50
            ],
            "source": [
                50
            ],
            "__typename": [
                50
            ]
        },
        "TitleFilterInput": {
            "and": [
                29
            ],
            "or": [
                29
            ],
            "index": [
                14
            ],
            "disc": [
                52
            ],
            "id": [
                14
            ],
            "comment": [
                57
            ],
            "sourceFile": [
                57
            ],
            "segmentMap": [
                57
            ],
            "duration": [
                57
            ],
            "size": [
                20
            ],
            "displaySize": [
                57
            ],
            "item": [
                34
            ],
            "discItemReferenceId": [
                14
            ],
            "tracks": [
                0
            ],
            "description": [
                57
            ],
            "itemType": [
                57
            ],
            "season": [
                57
            ],
            "episode": [
                57
            ],
            "hasItem": [
                25
            ],
            "__typename": [
                50
            ]
        },
        "PageInfo": {
            "hasNextPage": [
                36
            ],
            "hasPreviousPage": [
                36
            ],
            "startCursor": [
                50
            ],
            "endCursor": [
                50
            ],
            "__typename": [
                50
            ]
        },
        "Boxset": {
            "id": [
                46
            ],
            "title": [
                50
            ],
            "sortTitle": [
                50
            ],
            "slug": [
                50
            ],
            "imageUrl": [
                50
            ],
            "release": [
                56
            ],
            "releaseId": [
                46
            ],
            "type": [
                50
            ],
            "__typename": [
                50
            ]
        },
        "ContributorFilterInput": {
            "and": [
                32
            ],
            "or": [
                32
            ],
            "id": [
                14
            ],
            "name": [
                57
            ],
            "releases": [
                6
            ],
            "userId": [
                57
            ],
            "source": [
                57
            ],
            "__typename": [
                50
            ]
        },
        "ExternalIdsFilterInput": {
            "and": [
                33
            ],
            "or": [
                33
            ],
            "id": [
                14
            ],
            "tmdb": [
                57
            ],
            "imdb": [
                57
            ],
            "tvdb": [
                57
            ],
            "mediaItem": [
                8
            ],
            "__typename": [
                50
            ]
        },
        "DiscItemReferenceFilterInput": {
            "and": [
                34
            ],
            "or": [
                34
            ],
            "id": [
                14
            ],
            "title": [
                57
            ],
            "type": [
                57
            ],
            "description": [
                57
            ],
            "chapters": [
                64
            ],
            "season": [
                57
            ],
            "episode": [
                57
            ],
            "discItem": [
                29
            ],
            "__typename": [
                50
            ]
        },
        "TrackFilterInput": {
            "and": [
                35
            ],
            "or": [
                35
            ],
            "id": [
                14
            ],
            "index": [
                14
            ],
            "name": [
                57
            ],
            "type": [
                57
            ],
            "resolution": [
                57
            ],
            "aspectRatio": [
                57
            ],
            "audioType": [
                57
            ],
            "languageCode": [
                57
            ],
            "language": [
                57
            ],
            "description": [
                57
            ],
            "title": [
                29
            ],
            "__typename": [
                50
            ]
        },
        "Boolean": {},
        "ListFilterInputTypeOfTitleFilterInput": {
            "all": [
                29
            ],
            "none": [
                29
            ],
            "some": [
                29
            ],
            "any": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "ExternalIdsSortInput": {
            "id": [
                12
            ],
            "tmdb": [
                12
            ],
            "imdb": [
                12
            ],
            "tvdb": [
                12
            ],
            "mediaItem": [
                3
            ],
            "__typename": [
                50
            ]
        },
        "MediaItemsByGroupEdge": {
            "cursor": [
                50
            ],
            "node": [
                1
            ],
            "__typename": [
                50
            ]
        },
        "BoxsetSortInput": {
            "id": [
                12
            ],
            "title": [
                12
            ],
            "sortTitle": [
                12
            ],
            "slug": [
                12
            ],
            "imageUrl": [
                12
            ],
            "release": [
                4
            ],
            "releaseId": [
                12
            ],
            "type": [
                12
            ],
            "__typename": [
                50
            ]
        },
        "DiscSortInput": {
            "id": [
                12
            ],
            "index": [
                12
            ],
            "slug": [
                12
            ],
            "name": [
                12
            ],
            "format": [
                12
            ],
            "contentHash": [
                12
            ],
            "globalDiscId": [
                12
            ],
            "release": [
                4
            ],
            "__typename": [
                50
            ]
        },
        "Long": {},
        "Track": {
            "id": [
                46
            ],
            "index": [
                46
            ],
            "name": [
                50
            ],
            "type": [
                50
            ],
            "resolution": [
                50
            ],
            "aspectRatio": [
                50
            ],
            "audioType": [
                50
            ],
            "languageCode": [
                50
            ],
            "language": [
                50
            ],
            "description": [
                50
            ],
            "title": [
                58
            ],
            "__typename": [
                50
            ]
        },
        "ReleaseGroup": {
            "id": [
                46
            ],
            "releaseId": [
                46
            ],
            "groupId": [
                46
            ],
            "release": [
                56,
                {
                    "where": [
                        62
                    ],
                    "order": [
                        4,
                        "[ReleaseSortInput!]"
                    ]
                }
            ],
            "group": [
                9,
                {
                    "where": [
                        48
                    ],
                    "order": [
                        24,
                        "[GroupSortInput!]"
                    ]
                }
            ],
            "__typename": [
                50
            ]
        },
        "ExternalIds": {
            "id": [
                46
            ],
            "tmdb": [
                50
            ],
            "imdb": [
                50
            ],
            "tvdb": [
                50
            ],
            "mediaItem": [
                1
            ],
            "__typename": [
                50
            ]
        },
        "Int": {},
        "DiscItemReferenceSortInput": {
            "id": [
                12
            ],
            "title": [
                12
            ],
            "type": [
                12
            ],
            "description": [
                12
            ],
            "season": [
                12
            ],
            "episode": [
                12
            ],
            "discItem": [
                53
            ],
            "__typename": [
                50
            ]
        },
        "GroupFilterInput": {
            "and": [
                48
            ],
            "or": [
                48
            ],
            "id": [
                14
            ],
            "imdbId": [
                57
            ],
            "name": [
                57
            ],
            "slug": [
                57
            ],
            "imageUrl": [
                57
            ],
            "mediaItemGroups": [
                18
            ],
            "releaseGroups": [
                17
            ],
            "__typename": [
                50
            ]
        },
        "Query": {
            "mediaItems": [
                15,
                {
                    "first": [
                        46
                    ],
                    "after": [
                        50
                    ],
                    "last": [
                        46
                    ],
                    "before": [
                        50
                    ],
                    "where": [
                        8
                    ],
                    "order": [
                        3,
                        "[MediaItemSortInput!]"
                    ]
                }
            ],
            "boxsets": [
                68,
                {
                    "first": [
                        46
                    ],
                    "after": [
                        50
                    ],
                    "last": [
                        46
                    ],
                    "before": [
                        50
                    ],
                    "where": [
                        13
                    ],
                    "order": [
                        40,
                        "[BoxsetSortInput!]"
                    ]
                }
            ],
            "mediaItemsByGroup": [
                51,
                {
                    "slug": [
                        50,
                        "String!"
                    ],
                    "role": [
                        50
                    ],
                    "first": [
                        46
                    ],
                    "after": [
                        50
                    ],
                    "last": [
                        46
                    ],
                    "before": [
                        50
                    ],
                    "where": [
                        8
                    ],
                    "order": [
                        3,
                        "[MediaItemSortInput!]"
                    ]
                }
            ],
            "__typename": [
                50
            ]
        },
        "String": {},
        "MediaItemsByGroupConnection": {
            "pageInfo": [
                30
            ],
            "edges": [
                39
            ],
            "nodes": [
                1
            ],
            "__typename": [
                50
            ]
        },
        "DiscFilterInput": {
            "and": [
                52
            ],
            "or": [
                52
            ],
            "id": [
                14
            ],
            "index": [
                14
            ],
            "slug": [
                57
            ],
            "name": [
                57
            ],
            "format": [
                57
            ],
            "contentHash": [
                57
            ],
            "globalDiscId": [
                57
            ],
            "titles": [
                37
            ],
            "release": [
                62
            ],
            "releaseDiscs": [
                22
            ],
            "__typename": [
                50
            ]
        },
        "TitleSortInput": {
            "index": [
                12
            ],
            "disc": [
                41
            ],
            "id": [
                12
            ],
            "comment": [
                12
            ],
            "sourceFile": [
                12
            ],
            "segmentMap": [
                12
            ],
            "duration": [
                12
            ],
            "size": [
                12
            ],
            "displaySize": [
                12
            ],
            "item": [
                47
            ],
            "discItemReferenceId": [
                12
            ],
            "description": [
                12
            ],
            "itemType": [
                12
            ],
            "season": [
                12
            ],
            "episode": [
                12
            ],
            "hasItem": [
                12
            ],
            "__typename": [
                50
            ]
        },
        "ChapterFilterInput": {
            "and": [
                54
            ],
            "or": [
                54
            ],
            "id": [
                14
            ],
            "index": [
                14
            ],
            "title": [
                57
            ],
            "__typename": [
                50
            ]
        },
        "ReleaseDiscSortInput": {
            "id": [
                12
            ],
            "releaseId": [
                12
            ],
            "release": [
                4
            ],
            "discId": [
                12
            ],
            "disc": [
                41
            ],
            "index": [
                12
            ],
            "slug": [
                12
            ],
            "name": [
                12
            ],
            "format": [
                12
            ],
            "contentHash": [
                12
            ],
            "globalDiscId": [
                12
            ],
            "__typename": [
                50
            ]
        },
        "Release": {
            "id": [
                46
            ],
            "slug": [
                50
            ],
            "title": [
                50
            ],
            "regionCode": [
                50
            ],
            "locale": [
                50
            ],
            "year": [
                46
            ],
            "upc": [
                50
            ],
            "isbn": [
                50
            ],
            "asin": [
                50
            ],
            "imageUrl": [
                50
            ],
            "backImageUrl": [
                50
            ],
            "releaseDate": [
                59
            ],
            "dateAdded": [
                59
            ],
            "fullTitle": [
                50
            ],
            "type": [
                50
            ],
            "discs": [
                67,
                {
                    "where": [
                        16
                    ],
                    "order": [
                        55,
                        "[ReleaseDiscSortInput!]"
                    ]
                }
            ],
            "releaseGroups": [
                44,
                {
                    "where": [
                        60
                    ],
                    "order": [
                        7,
                        "[ReleaseGroupSortInput!]"
                    ]
                }
            ],
            "mediaItem": [
                1
            ],
            "boxset": [
                31
            ],
            "contributors": [
                28
            ],
            "__typename": [
                50
            ]
        },
        "StringOperationFilterInput": {
            "and": [
                57
            ],
            "or": [
                57
            ],
            "eq": [
                50
            ],
            "neq": [
                50
            ],
            "contains": [
                50
            ],
            "ncontains": [
                50
            ],
            "in": [
                50
            ],
            "nin": [
                50
            ],
            "startsWith": [
                50
            ],
            "nstartsWith": [
                50
            ],
            "endsWith": [
                50
            ],
            "nendsWith": [
                50
            ],
            "__typename": [
                50
            ]
        },
        "Title": {
            "index": [
                46
            ],
            "disc": [
                61
            ],
            "id": [
                46
            ],
            "comment": [
                50
            ],
            "sourceFile": [
                50
            ],
            "segmentMap": [
                50
            ],
            "duration": [
                50
            ],
            "size": [
                42
            ],
            "displaySize": [
                50
            ],
            "item": [
                63
            ],
            "discItemReferenceId": [
                46
            ],
            "tracks": [
                43,
                {
                    "where": [
                        35
                    ],
                    "order": [
                        21,
                        "[TrackSortInput!]"
                    ]
                }
            ],
            "description": [
                50
            ],
            "itemType": [
                50
            ],
            "season": [
                50
            ],
            "episode": [
                50
            ],
            "hasItem": [
                36
            ],
            "filename": [
                50,
                {
                    "templates": [
                        10,
                        "[FileNameTemplateInput!]"
                    ]
                }
            ],
            "__typename": [
                50
            ]
        },
        "DateTime": {},
        "ReleaseGroupFilterInput": {
            "and": [
                60
            ],
            "or": [
                60
            ],
            "id": [
                14
            ],
            "releaseId": [
                14
            ],
            "groupId": [
                14
            ],
            "release": [
                62
            ],
            "group": [
                48
            ],
            "__typename": [
                50
            ]
        },
        "Disc": {
            "id": [
                46
            ],
            "index": [
                46
            ],
            "slug": [
                50
            ],
            "name": [
                50
            ],
            "format": [
                50
            ],
            "contentHash": [
                50
            ],
            "globalDiscId": [
                50
            ],
            "titles": [
                58,
                {
                    "where": [
                        29
                    ],
                    "order": [
                        53,
                        "[TitleSortInput!]"
                    ]
                }
            ],
            "release": [
                56
            ],
            "releaseDiscs": [
                67
            ],
            "__typename": [
                50
            ]
        },
        "ReleaseFilterInput": {
            "and": [
                62
            ],
            "or": [
                62
            ],
            "id": [
                14
            ],
            "slug": [
                57
            ],
            "title": [
                57
            ],
            "regionCode": [
                57
            ],
            "locale": [
                57
            ],
            "year": [
                14
            ],
            "upc": [
                57
            ],
            "isbn": [
                57
            ],
            "asin": [
                57
            ],
            "imageUrl": [
                57
            ],
            "backImageUrl": [
                57
            ],
            "releaseDate": [
                2
            ],
            "dateAdded": [
                2
            ],
            "fullTitle": [
                57
            ],
            "type": [
                57
            ],
            "discs": [
                22
            ],
            "releaseGroups": [
                17
            ],
            "mediaItem": [
                8
            ],
            "boxset": [
                13
            ],
            "contributors": [
                65
            ],
            "__typename": [
                50
            ]
        },
        "DiscItemReference": {
            "id": [
                46
            ],
            "title": [
                50
            ],
            "type": [
                50
            ],
            "description": [
                50
            ],
            "chapters": [
                23,
                {
                    "where": [
                        54
                    ],
                    "order": [
                        5,
                        "[ChapterSortInput!]"
                    ]
                }
            ],
            "season": [
                50
            ],
            "episode": [
                50
            ],
            "discItem": [
                58
            ],
            "__typename": [
                50
            ]
        },
        "ListFilterInputTypeOfChapterFilterInput": {
            "all": [
                54
            ],
            "none": [
                54
            ],
            "some": [
                54
            ],
            "any": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "ListFilterInputTypeOfContributorFilterInput": {
            "all": [
                32
            ],
            "none": [
                32
            ],
            "some": [
                32
            ],
            "any": [
                36
            ],
            "__typename": [
                50
            ]
        },
        "MediaItemGroup": {
            "id": [
                46
            ],
            "mediaItemId": [
                46
            ],
            "groupId": [
                46
            ],
            "role": [
                50
            ],
            "isFeatured": [
                36
            ],
            "mediaItem": [
                1,
                {
                    "where": [
                        8
                    ],
                    "order": [
                        3,
                        "[MediaItemSortInput!]"
                    ]
                }
            ],
            "group": [
                9,
                {
                    "where": [
                        48
                    ],
                    "order": [
                        24,
                        "[GroupSortInput!]"
                    ]
                }
            ],
            "__typename": [
                50
            ]
        },
        "ReleaseDisc": {
            "id": [
                46
            ],
            "releaseId": [
                46
            ],
            "release": [
                56
            ],
            "discId": [
                46
            ],
            "disc": [
                61
            ],
            "index": [
                46
            ],
            "slug": [
                50
            ],
            "name": [
                50
            ],
            "format": [
                50
            ],
            "contentHash": [
                50
            ],
            "globalDiscId": [
                50
            ],
            "titles": [
                58,
                {
                    "where": [
                        29
                    ],
                    "order": [
                        53,
                        "[TitleSortInput!]"
                    ]
                }
            ],
            "__typename": [
                50
            ]
        },
        "BoxsetsConnection": {
            "pageInfo": [
                30
            ],
            "edges": [
                27
            ],
            "nodes": [
                31
            ],
            "__typename": [
                50
            ]
        }
    }
}