export default {
    "scalars": [
        0,
        1,
        2,
        17,
        26,
        40
    ],
    "types": {
        "String": {},
        "Boolean": {},
        "Int": {},
        "Query": {
            "mediaItems": [
                8,
                {
                    "first": [
                        2
                    ],
                    "after": [
                        0
                    ],
                    "last": [
                        2
                    ],
                    "before": [
                        0
                    ],
                    "where": [
                        4
                    ],
                    "order": [
                        5,
                        "[MediaItemSortInput!]"
                    ]
                }
            ],
            "boxsets": [
                9,
                {
                    "first": [
                        2
                    ],
                    "after": [
                        0
                    ],
                    "last": [
                        2
                    ],
                    "before": [
                        0
                    ],
                    "where": [
                        6
                    ],
                    "order": [
                        7,
                        "[BoxsetSortInput!]"
                    ]
                }
            ],
            "mediaItemsByGroup": [
                10,
                {
                    "slug": [
                        0,
                        "String!"
                    ],
                    "role": [
                        0
                    ],
                    "first": [
                        2
                    ],
                    "after": [
                        0
                    ],
                    "last": [
                        2
                    ],
                    "before": [
                        0
                    ],
                    "where": [
                        4
                    ],
                    "order": [
                        5,
                        "[MediaItemSortInput!]"
                    ]
                }
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemFilterInput": {
            "and": [
                4
            ],
            "or": [
                4
            ],
            "id": [
                11
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
                11
            ],
            "type": [
                12
            ],
            "imageUrl": [
                12
            ],
            "externalids": [
                13
            ],
            "externalIdsId": [
                11
            ],
            "releases": [
                14
            ],
            "mediaItemGroups": [
                15
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
                11
            ],
            "runtime": [
                12
            ],
            "contentRating": [
                12
            ],
            "releaseDate": [
                16
            ],
            "latestReleaseDate": [
                16
            ],
            "dateAdded": [
                16
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemSortInput": {
            "id": [
                17
            ],
            "title": [
                17
            ],
            "slug": [
                17
            ],
            "fullTitle": [
                17
            ],
            "sortTitle": [
                17
            ],
            "year": [
                17
            ],
            "type": [
                17
            ],
            "imageUrl": [
                17
            ],
            "externalids": [
                18
            ],
            "externalIdsId": [
                17
            ],
            "plot": [
                17
            ],
            "tagline": [
                17
            ],
            "directors": [
                17
            ],
            "writers": [
                17
            ],
            "stars": [
                17
            ],
            "genres": [
                17
            ],
            "runtimeMinutes": [
                17
            ],
            "runtime": [
                17
            ],
            "contentRating": [
                17
            ],
            "releaseDate": [
                17
            ],
            "latestReleaseDate": [
                17
            ],
            "dateAdded": [
                17
            ],
            "__typename": [
                0
            ]
        },
        "BoxsetFilterInput": {
            "and": [
                6
            ],
            "or": [
                6
            ],
            "id": [
                11
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
                19
            ],
            "releaseId": [
                11
            ],
            "type": [
                12
            ],
            "__typename": [
                0
            ]
        },
        "BoxsetSortInput": {
            "id": [
                17
            ],
            "title": [
                17
            ],
            "sortTitle": [
                17
            ],
            "slug": [
                17
            ],
            "imageUrl": [
                17
            ],
            "release": [
                20
            ],
            "releaseId": [
                17
            ],
            "type": [
                17
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemsConnection": {
            "pageInfo": [
                21
            ],
            "edges": [
                22
            ],
            "nodes": [
                45
            ],
            "__typename": [
                0
            ]
        },
        "BoxsetsConnection": {
            "pageInfo": [
                21
            ],
            "edges": [
                23
            ],
            "nodes": [
                44
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemsByGroupConnection": {
            "pageInfo": [
                21
            ],
            "edges": [
                24
            ],
            "nodes": [
                45
            ],
            "__typename": [
                0
            ]
        },
        "IntOperationFilterInput": {
            "eq": [
                2
            ],
            "neq": [
                2
            ],
            "in": [
                2
            ],
            "nin": [
                2
            ],
            "gt": [
                2
            ],
            "ngt": [
                2
            ],
            "gte": [
                2
            ],
            "ngte": [
                2
            ],
            "lt": [
                2
            ],
            "nlt": [
                2
            ],
            "lte": [
                2
            ],
            "nlte": [
                2
            ],
            "__typename": [
                0
            ]
        },
        "StringOperationFilterInput": {
            "and": [
                12
            ],
            "or": [
                12
            ],
            "eq": [
                0
            ],
            "neq": [
                0
            ],
            "contains": [
                0
            ],
            "ncontains": [
                0
            ],
            "in": [
                0
            ],
            "nin": [
                0
            ],
            "startsWith": [
                0
            ],
            "nstartsWith": [
                0
            ],
            "endsWith": [
                0
            ],
            "nendsWith": [
                0
            ],
            "__typename": [
                0
            ]
        },
        "ExternalIdsFilterInput": {
            "and": [
                13
            ],
            "or": [
                13
            ],
            "id": [
                11
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
                4
            ],
            "__typename": [
                0
            ]
        },
        "ListFilterInputTypeOfReleaseFilterInput": {
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
                1
            ],
            "__typename": [
                0
            ]
        },
        "ListFilterInputTypeOfMediaItemGroupFilterInput": {
            "all": [
                25
            ],
            "none": [
                25
            ],
            "some": [
                25
            ],
            "any": [
                1
            ],
            "__typename": [
                0
            ]
        },
        "DateTimeOperationFilterInput": {
            "eq": [
                26
            ],
            "neq": [
                26
            ],
            "in": [
                26
            ],
            "nin": [
                26
            ],
            "gt": [
                26
            ],
            "ngt": [
                26
            ],
            "gte": [
                26
            ],
            "ngte": [
                26
            ],
            "lt": [
                26
            ],
            "nlt": [
                26
            ],
            "lte": [
                26
            ],
            "nlte": [
                26
            ],
            "__typename": [
                0
            ]
        },
        "SortEnumType": {},
        "ExternalIdsSortInput": {
            "id": [
                17
            ],
            "tmdb": [
                17
            ],
            "imdb": [
                17
            ],
            "tvdb": [
                17
            ],
            "mediaItem": [
                5
            ],
            "__typename": [
                0
            ]
        },
        "ReleaseFilterInput": {
            "and": [
                19
            ],
            "or": [
                19
            ],
            "id": [
                11
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
                11
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
                16
            ],
            "dateAdded": [
                16
            ],
            "fullTitle": [
                12
            ],
            "type": [
                12
            ],
            "discs": [
                27
            ],
            "releaseGroups": [
                28
            ],
            "mediaItem": [
                4
            ],
            "boxset": [
                6
            ],
            "contributors": [
                29
            ],
            "__typename": [
                0
            ]
        },
        "ReleaseSortInput": {
            "id": [
                17
            ],
            "slug": [
                17
            ],
            "title": [
                17
            ],
            "regionCode": [
                17
            ],
            "locale": [
                17
            ],
            "year": [
                17
            ],
            "upc": [
                17
            ],
            "isbn": [
                17
            ],
            "asin": [
                17
            ],
            "imageUrl": [
                17
            ],
            "backImageUrl": [
                17
            ],
            "releaseDate": [
                17
            ],
            "dateAdded": [
                17
            ],
            "fullTitle": [
                17
            ],
            "type": [
                17
            ],
            "mediaItem": [
                5
            ],
            "boxset": [
                7
            ],
            "__typename": [
                0
            ]
        },
        "PageInfo": {
            "hasNextPage": [
                1
            ],
            "hasPreviousPage": [
                1
            ],
            "startCursor": [
                0
            ],
            "endCursor": [
                0
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemsEdge": {
            "cursor": [
                0
            ],
            "node": [
                45
            ],
            "__typename": [
                0
            ]
        },
        "BoxsetsEdge": {
            "cursor": [
                0
            ],
            "node": [
                44
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemsByGroupEdge": {
            "cursor": [
                0
            ],
            "node": [
                45
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemGroupFilterInput": {
            "and": [
                25
            ],
            "or": [
                25
            ],
            "id": [
                11
            ],
            "mediaItemId": [
                11
            ],
            "groupId": [
                11
            ],
            "role": [
                12
            ],
            "isFeatured": [
                30
            ],
            "mediaItem": [
                4
            ],
            "group": [
                31
            ],
            "__typename": [
                0
            ]
        },
        "DateTime": {},
        "ListFilterInputTypeOfDiscFilterInput": {
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
                1
            ],
            "__typename": [
                0
            ]
        },
        "ListFilterInputTypeOfReleaseGroupFilterInput": {
            "all": [
                33
            ],
            "none": [
                33
            ],
            "some": [
                33
            ],
            "any": [
                1
            ],
            "__typename": [
                0
            ]
        },
        "ListFilterInputTypeOfContributorFilterInput": {
            "all": [
                34
            ],
            "none": [
                34
            ],
            "some": [
                34
            ],
            "any": [
                1
            ],
            "__typename": [
                0
            ]
        },
        "BooleanOperationFilterInput": {
            "eq": [
                1
            ],
            "neq": [
                1
            ],
            "__typename": [
                0
            ]
        },
        "GroupFilterInput": {
            "and": [
                31
            ],
            "or": [
                31
            ],
            "id": [
                11
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
            "mediaItemGroups": [
                15
            ],
            "releaseGroups": [
                28
            ],
            "__typename": [
                0
            ]
        },
        "DiscFilterInput": {
            "and": [
                32
            ],
            "or": [
                32
            ],
            "id": [
                11
            ],
            "index": [
                11
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
            "titles": [
                35
            ],
            "release": [
                19
            ],
            "__typename": [
                0
            ]
        },
        "ReleaseGroupFilterInput": {
            "and": [
                33
            ],
            "or": [
                33
            ],
            "id": [
                11
            ],
            "releaseId": [
                11
            ],
            "groupId": [
                11
            ],
            "release": [
                19
            ],
            "group": [
                31
            ],
            "__typename": [
                0
            ]
        },
        "ContributorFilterInput": {
            "and": [
                34
            ],
            "or": [
                34
            ],
            "id": [
                11
            ],
            "name": [
                12
            ],
            "releases": [
                14
            ],
            "userId": [
                12
            ],
            "source": [
                12
            ],
            "__typename": [
                0
            ]
        },
        "ListFilterInputTypeOfTitleFilterInput": {
            "all": [
                36
            ],
            "none": [
                36
            ],
            "some": [
                36
            ],
            "any": [
                1
            ],
            "__typename": [
                0
            ]
        },
        "TitleFilterInput": {
            "and": [
                36
            ],
            "or": [
                36
            ],
            "index": [
                11
            ],
            "disc": [
                32
            ],
            "id": [
                11
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
                37
            ],
            "displaySize": [
                12
            ],
            "item": [
                38
            ],
            "discItemReferenceId": [
                11
            ],
            "tracks": [
                39
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
                30
            ],
            "__typename": [
                0
            ]
        },
        "LongOperationFilterInput": {
            "eq": [
                40
            ],
            "neq": [
                40
            ],
            "in": [
                40
            ],
            "nin": [
                40
            ],
            "gt": [
                40
            ],
            "ngt": [
                40
            ],
            "gte": [
                40
            ],
            "ngte": [
                40
            ],
            "lt": [
                40
            ],
            "nlt": [
                40
            ],
            "lte": [
                40
            ],
            "nlte": [
                40
            ],
            "__typename": [
                0
            ]
        },
        "DiscItemReferenceFilterInput": {
            "and": [
                38
            ],
            "or": [
                38
            ],
            "id": [
                11
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
            "chapters": [
                41
            ],
            "season": [
                12
            ],
            "episode": [
                12
            ],
            "discItem": [
                36
            ],
            "__typename": [
                0
            ]
        },
        "ListFilterInputTypeOfTrackFilterInput": {
            "all": [
                42
            ],
            "none": [
                42
            ],
            "some": [
                42
            ],
            "any": [
                1
            ],
            "__typename": [
                0
            ]
        },
        "Long": {},
        "ListFilterInputTypeOfChapterFilterInput": {
            "all": [
                43
            ],
            "none": [
                43
            ],
            "some": [
                43
            ],
            "any": [
                1
            ],
            "__typename": [
                0
            ]
        },
        "TrackFilterInput": {
            "and": [
                42
            ],
            "or": [
                42
            ],
            "id": [
                11
            ],
            "index": [
                11
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
                36
            ],
            "__typename": [
                0
            ]
        },
        "ChapterFilterInput": {
            "and": [
                43
            ],
            "or": [
                43
            ],
            "id": [
                11
            ],
            "index": [
                11
            ],
            "title": [
                12
            ],
            "__typename": [
                0
            ]
        },
        "Boxset": {
            "id": [
                2
            ],
            "title": [
                0
            ],
            "sortTitle": [
                0
            ],
            "slug": [
                0
            ],
            "imageUrl": [
                0
            ],
            "release": [
                49
            ],
            "releaseId": [
                2
            ],
            "type": [
                0
            ],
            "__typename": [
                0
            ]
        },
        "MediaItem": {
            "id": [
                2
            ],
            "title": [
                0
            ],
            "slug": [
                0
            ],
            "fullTitle": [
                0
            ],
            "sortTitle": [
                0
            ],
            "year": [
                2
            ],
            "type": [
                0
            ],
            "imageUrl": [
                0
            ],
            "externalids": [
                48
            ],
            "externalIdsId": [
                2
            ],
            "releases": [
                49,
                {
                    "where": [
                        19
                    ],
                    "order": [
                        20,
                        "[ReleaseSortInput!]"
                    ]
                }
            ],
            "mediaItemGroups": [
                50,
                {
                    "where": [
                        25
                    ],
                    "order": [
                        46,
                        "[MediaItemGroupSortInput!]"
                    ]
                }
            ],
            "plot": [
                0
            ],
            "tagline": [
                0
            ],
            "directors": [
                0
            ],
            "writers": [
                0
            ],
            "stars": [
                0
            ],
            "genres": [
                0
            ],
            "runtimeMinutes": [
                2
            ],
            "runtime": [
                0
            ],
            "contentRating": [
                0
            ],
            "releaseDate": [
                26
            ],
            "latestReleaseDate": [
                26
            ],
            "dateAdded": [
                26
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemGroupSortInput": {
            "id": [
                17
            ],
            "mediaItemId": [
                17
            ],
            "groupId": [
                17
            ],
            "role": [
                17
            ],
            "isFeatured": [
                17
            ],
            "mediaItem": [
                5
            ],
            "group": [
                47
            ],
            "__typename": [
                0
            ]
        },
        "GroupSortInput": {
            "id": [
                17
            ],
            "imdbId": [
                17
            ],
            "name": [
                17
            ],
            "slug": [
                17
            ],
            "imageUrl": [
                17
            ],
            "__typename": [
                0
            ]
        },
        "ExternalIds": {
            "id": [
                2
            ],
            "tmdb": [
                0
            ],
            "imdb": [
                0
            ],
            "tvdb": [
                0
            ],
            "mediaItem": [
                45
            ],
            "__typename": [
                0
            ]
        },
        "Release": {
            "id": [
                2
            ],
            "slug": [
                0
            ],
            "title": [
                0
            ],
            "regionCode": [
                0
            ],
            "locale": [
                0
            ],
            "year": [
                2
            ],
            "upc": [
                0
            ],
            "isbn": [
                0
            ],
            "asin": [
                0
            ],
            "imageUrl": [
                0
            ],
            "backImageUrl": [
                0
            ],
            "releaseDate": [
                26
            ],
            "dateAdded": [
                26
            ],
            "fullTitle": [
                0
            ],
            "type": [
                0
            ],
            "discs": [
                55,
                {
                    "where": [
                        32
                    ],
                    "order": [
                        51,
                        "[DiscSortInput!]"
                    ]
                }
            ],
            "releaseGroups": [
                54,
                {
                    "where": [
                        33
                    ],
                    "order": [
                        52,
                        "[ReleaseGroupSortInput!]"
                    ]
                }
            ],
            "mediaItem": [
                45
            ],
            "boxset": [
                44
            ],
            "contributors": [
                53
            ],
            "__typename": [
                0
            ]
        },
        "MediaItemGroup": {
            "id": [
                2
            ],
            "mediaItemId": [
                2
            ],
            "groupId": [
                2
            ],
            "role": [
                0
            ],
            "isFeatured": [
                1
            ],
            "mediaItem": [
                45,
                {
                    "where": [
                        4
                    ],
                    "order": [
                        5,
                        "[MediaItemSortInput!]"
                    ]
                }
            ],
            "group": [
                56,
                {
                    "where": [
                        31
                    ],
                    "order": [
                        47,
                        "[GroupSortInput!]"
                    ]
                }
            ],
            "__typename": [
                0
            ]
        },
        "DiscSortInput": {
            "id": [
                17
            ],
            "index": [
                17
            ],
            "slug": [
                17
            ],
            "name": [
                17
            ],
            "format": [
                17
            ],
            "contentHash": [
                17
            ],
            "release": [
                20
            ],
            "__typename": [
                0
            ]
        },
        "ReleaseGroupSortInput": {
            "id": [
                17
            ],
            "releaseId": [
                17
            ],
            "groupId": [
                17
            ],
            "release": [
                20
            ],
            "group": [
                47
            ],
            "__typename": [
                0
            ]
        },
        "Contributor": {
            "id": [
                2
            ],
            "name": [
                0
            ],
            "releases": [
                49
            ],
            "userId": [
                0
            ],
            "source": [
                0
            ],
            "__typename": [
                0
            ]
        },
        "ReleaseGroup": {
            "id": [
                2
            ],
            "releaseId": [
                2
            ],
            "groupId": [
                2
            ],
            "release": [
                49,
                {
                    "where": [
                        19
                    ],
                    "order": [
                        20,
                        "[ReleaseSortInput!]"
                    ]
                }
            ],
            "group": [
                56,
                {
                    "where": [
                        31
                    ],
                    "order": [
                        47,
                        "[GroupSortInput!]"
                    ]
                }
            ],
            "__typename": [
                0
            ]
        },
        "Disc": {
            "id": [
                2
            ],
            "index": [
                2
            ],
            "slug": [
                0
            ],
            "name": [
                0
            ],
            "format": [
                0
            ],
            "contentHash": [
                0
            ],
            "titles": [
                59,
                {
                    "where": [
                        36
                    ],
                    "order": [
                        57,
                        "[TitleSortInput!]"
                    ]
                }
            ],
            "release": [
                49
            ],
            "__typename": [
                0
            ]
        },
        "Group": {
            "id": [
                2
            ],
            "imdbId": [
                0
            ],
            "name": [
                0
            ],
            "slug": [
                0
            ],
            "imageUrl": [
                0
            ],
            "mediaItemGroups": [
                50,
                {
                    "where": [
                        25
                    ],
                    "order": [
                        46,
                        "[MediaItemGroupSortInput!]"
                    ]
                }
            ],
            "releaseGroups": [
                54,
                {
                    "where": [
                        33
                    ],
                    "order": [
                        52,
                        "[ReleaseGroupSortInput!]"
                    ]
                }
            ],
            "__typename": [
                0
            ]
        },
        "TitleSortInput": {
            "index": [
                17
            ],
            "disc": [
                51
            ],
            "id": [
                17
            ],
            "comment": [
                17
            ],
            "sourceFile": [
                17
            ],
            "segmentMap": [
                17
            ],
            "duration": [
                17
            ],
            "size": [
                17
            ],
            "displaySize": [
                17
            ],
            "item": [
                58
            ],
            "discItemReferenceId": [
                17
            ],
            "description": [
                17
            ],
            "itemType": [
                17
            ],
            "season": [
                17
            ],
            "episode": [
                17
            ],
            "hasItem": [
                17
            ],
            "__typename": [
                0
            ]
        },
        "DiscItemReferenceSortInput": {
            "id": [
                17
            ],
            "title": [
                17
            ],
            "type": [
                17
            ],
            "description": [
                17
            ],
            "season": [
                17
            ],
            "episode": [
                17
            ],
            "discItem": [
                57
            ],
            "__typename": [
                0
            ]
        },
        "Title": {
            "index": [
                2
            ],
            "disc": [
                55
            ],
            "id": [
                2
            ],
            "comment": [
                0
            ],
            "sourceFile": [
                0
            ],
            "segmentMap": [
                0
            ],
            "duration": [
                0
            ],
            "size": [
                40
            ],
            "displaySize": [
                0
            ],
            "item": [
                62
            ],
            "discItemReferenceId": [
                2
            ],
            "tracks": [
                61,
                {
                    "where": [
                        42
                    ],
                    "order": [
                        60,
                        "[TrackSortInput!]"
                    ]
                }
            ],
            "description": [
                0
            ],
            "itemType": [
                0
            ],
            "season": [
                0
            ],
            "episode": [
                0
            ],
            "hasItem": [
                1
            ],
            "__typename": [
                0
            ]
        },
        "TrackSortInput": {
            "id": [
                17
            ],
            "index": [
                17
            ],
            "name": [
                17
            ],
            "type": [
                17
            ],
            "resolution": [
                17
            ],
            "aspectRatio": [
                17
            ],
            "audioType": [
                17
            ],
            "languageCode": [
                17
            ],
            "language": [
                17
            ],
            "description": [
                17
            ],
            "title": [
                57
            ],
            "__typename": [
                0
            ]
        },
        "Track": {
            "id": [
                2
            ],
            "index": [
                2
            ],
            "name": [
                0
            ],
            "type": [
                0
            ],
            "resolution": [
                0
            ],
            "aspectRatio": [
                0
            ],
            "audioType": [
                0
            ],
            "languageCode": [
                0
            ],
            "language": [
                0
            ],
            "description": [
                0
            ],
            "title": [
                59
            ],
            "__typename": [
                0
            ]
        },
        "DiscItemReference": {
            "id": [
                2
            ],
            "title": [
                0
            ],
            "type": [
                0
            ],
            "description": [
                0
            ],
            "chapters": [
                64,
                {
                    "where": [
                        43
                    ],
                    "order": [
                        63,
                        "[ChapterSortInput!]"
                    ]
                }
            ],
            "season": [
                0
            ],
            "episode": [
                0
            ],
            "discItem": [
                59
            ],
            "__typename": [
                0
            ]
        },
        "ChapterSortInput": {
            "id": [
                17
            ],
            "index": [
                17
            ],
            "title": [
                17
            ],
            "__typename": [
                0
            ]
        },
        "Chapter": {
            "id": [
                2
            ],
            "index": [
                2
            ],
            "title": [
                0
            ],
            "__typename": [
                0
            ]
        }
    }
}