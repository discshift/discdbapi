declare const _default: {
    scalars: number[];
    types: {
        ListFilterInputTypeOfTrackFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        MediaItem: {
            id: number[];
            title: number[];
            slug: number[];
            fullTitle: number[];
            sortTitle: number[];
            year: number[];
            type: number[];
            imageUrl: number[];
            externalids: number[];
            externalIdsId: number[];
            releases: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            mediaItemGroups: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            plot: number[];
            tagline: number[];
            directors: number[];
            writers: number[];
            stars: number[];
            genres: number[];
            runtimeMinutes: number[];
            runtime: number[];
            contentRating: number[];
            releaseDate: number[];
            latestReleaseDate: number[];
            dateAdded: number[];
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
        MediaItemSortInput: {
            id: number[];
            title: number[];
            slug: number[];
            fullTitle: number[];
            sortTitle: number[];
            year: number[];
            type: number[];
            imageUrl: number[];
            externalids: number[];
            externalIdsId: number[];
            plot: number[];
            tagline: number[];
            directors: number[];
            writers: number[];
            stars: number[];
            genres: number[];
            runtimeMinutes: number[];
            runtime: number[];
            contentRating: number[];
            releaseDate: number[];
            latestReleaseDate: number[];
            dateAdded: number[];
            __typename: number[];
        };
        ReleaseSortInput: {
            id: number[];
            slug: number[];
            title: number[];
            regionCode: number[];
            locale: number[];
            year: number[];
            upc: number[];
            isbn: number[];
            asin: number[];
            imageUrl: number[];
            backImageUrl: number[];
            releaseDate: number[];
            dateAdded: number[];
            fullTitle: number[];
            type: number[];
            mediaItem: number[];
            boxset: number[];
            __typename: number[];
        };
        ChapterSortInput: {
            id: number[];
            index: number[];
            title: number[];
            __typename: number[];
        };
        ListFilterInputTypeOfReleaseFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        ReleaseGroupSortInput: {
            id: number[];
            releaseId: number[];
            groupId: number[];
            release: number[];
            group: number[];
            __typename: number[];
        };
        MediaItemFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            title: number[];
            slug: number[];
            fullTitle: number[];
            sortTitle: number[];
            year: number[];
            type: number[];
            imageUrl: number[];
            externalids: number[];
            externalIdsId: number[];
            releases: number[];
            mediaItemGroups: number[];
            plot: number[];
            tagline: number[];
            directors: number[];
            writers: number[];
            stars: number[];
            genres: number[];
            runtimeMinutes: number[];
            runtime: number[];
            contentRating: number[];
            releaseDate: number[];
            latestReleaseDate: number[];
            dateAdded: number[];
            __typename: number[];
        };
        Group: {
            id: number[];
            imdbId: number[];
            name: number[];
            slug: number[];
            imageUrl: number[];
            mediaItemGroups: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            releaseGroups: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            __typename: number[];
        };
        FileNameTemplateInput: {
            itemType: number[];
            template: number[];
            __typename: number[];
        };
        MediaItemGroupSortInput: {
            id: number[];
            mediaItemId: number[];
            groupId: number[];
            role: number[];
            isFeatured: number[];
            mediaItem: number[];
            group: number[];
            __typename: number[];
        };
        SortEnumType: {};
        BoxsetFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            title: number[];
            sortTitle: number[];
            slug: number[];
            imageUrl: number[];
            release: number[];
            releaseId: number[];
            type: number[];
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
        MediaItemsConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            __typename: number[];
        };
        ReleaseDiscFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            releaseId: number[];
            release: number[];
            discId: number[];
            disc: number[];
            index: number[];
            slug: number[];
            name: number[];
            titles: number[];
            format: number[];
            contentHash: number[];
            __typename: number[];
        };
        ListFilterInputTypeOfReleaseGroupFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        ListFilterInputTypeOfMediaItemGroupFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        MediaItemGroupFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            mediaItemId: number[];
            groupId: number[];
            role: number[];
            isFeatured: number[];
            mediaItem: number[];
            group: number[];
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
        TrackSortInput: {
            id: number[];
            index: number[];
            name: number[];
            type: number[];
            resolution: number[];
            aspectRatio: number[];
            audioType: number[];
            languageCode: number[];
            language: number[];
            description: number[];
            title: number[];
            __typename: number[];
        };
        ListReleaseDiscFilterTypeFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        Chapter: {
            id: number[];
            index: number[];
            title: number[];
            __typename: number[];
        };
        GroupSortInput: {
            id: number[];
            imdbId: number[];
            name: number[];
            slug: number[];
            imageUrl: number[];
            __typename: number[];
        };
        BooleanOperationFilterInput: {
            eq: number[];
            neq: number[];
            __typename: number[];
        };
        MediaItemsEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        BoxsetsEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        Contributor: {
            id: number[];
            name: number[];
            releases: number[];
            userId: number[];
            source: number[];
            __typename: number[];
        };
        TitleFilterInput: {
            and: number[];
            or: number[];
            index: number[];
            disc: number[];
            id: number[];
            comment: number[];
            sourceFile: number[];
            segmentMap: number[];
            duration: number[];
            size: number[];
            displaySize: number[];
            item: number[];
            discItemReferenceId: number[];
            tracks: number[];
            description: number[];
            itemType: number[];
            season: number[];
            episode: number[];
            hasItem: number[];
            __typename: number[];
        };
        PageInfo: {
            hasNextPage: number[];
            hasPreviousPage: number[];
            startCursor: number[];
            endCursor: number[];
            __typename: number[];
        };
        Boxset: {
            id: number[];
            title: number[];
            sortTitle: number[];
            slug: number[];
            imageUrl: number[];
            release: number[];
            releaseId: number[];
            type: number[];
            __typename: number[];
        };
        ContributorFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            name: number[];
            releases: number[];
            userId: number[];
            source: number[];
            __typename: number[];
        };
        ExternalIdsFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            tmdb: number[];
            imdb: number[];
            tvdb: number[];
            mediaItem: number[];
            __typename: number[];
        };
        DiscItemReferenceFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            title: number[];
            type: number[];
            description: number[];
            chapters: number[];
            season: number[];
            episode: number[];
            discItem: number[];
            __typename: number[];
        };
        TrackFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            index: number[];
            name: number[];
            type: number[];
            resolution: number[];
            aspectRatio: number[];
            audioType: number[];
            languageCode: number[];
            language: number[];
            description: number[];
            title: number[];
            __typename: number[];
        };
        Boolean: {};
        ListFilterInputTypeOfTitleFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        ExternalIdsSortInput: {
            id: number[];
            tmdb: number[];
            imdb: number[];
            tvdb: number[];
            mediaItem: number[];
            __typename: number[];
        };
        MediaItemsByGroupEdge: {
            cursor: number[];
            node: number[];
            __typename: number[];
        };
        BoxsetSortInput: {
            id: number[];
            title: number[];
            sortTitle: number[];
            slug: number[];
            imageUrl: number[];
            release: number[];
            releaseId: number[];
            type: number[];
            __typename: number[];
        };
        DiscSortInput: {
            id: number[];
            index: number[];
            slug: number[];
            name: number[];
            format: number[];
            contentHash: number[];
            release: number[];
            __typename: number[];
        };
        Long: {};
        Track: {
            id: number[];
            index: number[];
            name: number[];
            type: number[];
            resolution: number[];
            aspectRatio: number[];
            audioType: number[];
            languageCode: number[];
            language: number[];
            description: number[];
            title: number[];
            __typename: number[];
        };
        ReleaseGroup: {
            id: number[];
            releaseId: number[];
            groupId: number[];
            release: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            group: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            __typename: number[];
        };
        ExternalIds: {
            id: number[];
            tmdb: number[];
            imdb: number[];
            tvdb: number[];
            mediaItem: number[];
            __typename: number[];
        };
        Int: {};
        DiscItemReferenceSortInput: {
            id: number[];
            title: number[];
            type: number[];
            description: number[];
            season: number[];
            episode: number[];
            discItem: number[];
            __typename: number[];
        };
        GroupFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            imdbId: number[];
            name: number[];
            slug: number[];
            imageUrl: number[];
            mediaItemGroups: number[];
            releaseGroups: number[];
            __typename: number[];
        };
        Query: {
            mediaItems: (number | {
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                where: number[];
                order: (string | number)[];
            })[];
            boxsets: (number | {
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                where: number[];
                order: (string | number)[];
            })[];
            mediaItemsByGroup: (number | {
                slug: (string | number)[];
                role: number[];
                first: number[];
                after: number[];
                last: number[];
                before: number[];
                where: number[];
                order: (string | number)[];
            })[];
            __typename: number[];
        };
        String: {};
        MediaItemsByGroupConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            __typename: number[];
        };
        DiscFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            index: number[];
            slug: number[];
            name: number[];
            format: number[];
            contentHash: number[];
            titles: number[];
            release: number[];
            releaseDiscs: number[];
            __typename: number[];
        };
        TitleSortInput: {
            index: number[];
            disc: number[];
            id: number[];
            comment: number[];
            sourceFile: number[];
            segmentMap: number[];
            duration: number[];
            size: number[];
            displaySize: number[];
            item: number[];
            discItemReferenceId: number[];
            description: number[];
            itemType: number[];
            season: number[];
            episode: number[];
            hasItem: number[];
            __typename: number[];
        };
        ChapterFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            index: number[];
            title: number[];
            __typename: number[];
        };
        ReleaseDiscSortInput: {
            id: number[];
            releaseId: number[];
            release: number[];
            discId: number[];
            disc: number[];
            index: number[];
            slug: number[];
            name: number[];
            format: number[];
            contentHash: number[];
            __typename: number[];
        };
        Release: {
            id: number[];
            slug: number[];
            title: number[];
            regionCode: number[];
            locale: number[];
            year: number[];
            upc: number[];
            isbn: number[];
            asin: number[];
            imageUrl: number[];
            backImageUrl: number[];
            releaseDate: number[];
            dateAdded: number[];
            fullTitle: number[];
            type: number[];
            discs: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            releaseGroups: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            mediaItem: number[];
            boxset: number[];
            contributors: number[];
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
        Title: {
            index: number[];
            disc: number[];
            id: number[];
            comment: number[];
            sourceFile: number[];
            segmentMap: number[];
            duration: number[];
            size: number[];
            displaySize: number[];
            item: number[];
            discItemReferenceId: number[];
            tracks: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            description: number[];
            itemType: number[];
            season: number[];
            episode: number[];
            hasItem: number[];
            filename: (number | {
                templates: (string | number)[];
            })[];
            __typename: number[];
        };
        DateTime: {};
        ReleaseGroupFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            releaseId: number[];
            groupId: number[];
            release: number[];
            group: number[];
            __typename: number[];
        };
        Disc: {
            id: number[];
            index: number[];
            slug: number[];
            name: number[];
            format: number[];
            contentHash: number[];
            titles: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            release: number[];
            releaseDiscs: number[];
            __typename: number[];
        };
        ReleaseFilterInput: {
            and: number[];
            or: number[];
            id: number[];
            slug: number[];
            title: number[];
            regionCode: number[];
            locale: number[];
            year: number[];
            upc: number[];
            isbn: number[];
            asin: number[];
            imageUrl: number[];
            backImageUrl: number[];
            releaseDate: number[];
            dateAdded: number[];
            fullTitle: number[];
            type: number[];
            discs: number[];
            releaseGroups: number[];
            mediaItem: number[];
            boxset: number[];
            contributors: number[];
            __typename: number[];
        };
        DiscItemReference: {
            id: number[];
            title: number[];
            type: number[];
            description: number[];
            chapters: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            season: number[];
            episode: number[];
            discItem: number[];
            __typename: number[];
        };
        ListFilterInputTypeOfChapterFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        ListFilterInputTypeOfContributorFilterInput: {
            all: number[];
            none: number[];
            some: number[];
            any: number[];
            __typename: number[];
        };
        MediaItemGroup: {
            id: number[];
            mediaItemId: number[];
            groupId: number[];
            role: number[];
            isFeatured: number[];
            mediaItem: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            group: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            __typename: number[];
        };
        ReleaseDisc: {
            id: number[];
            releaseId: number[];
            release: number[];
            discId: number[];
            disc: number[];
            index: number[];
            slug: number[];
            name: number[];
            format: number[];
            contentHash: number[];
            titles: (number | {
                where: number[];
                order: (string | number)[];
            })[];
            __typename: number[];
        };
        BoxsetsConnection: {
            pageInfo: number[];
            edges: number[];
            nodes: number[];
            __typename: number[];
        };
    };
};
export default _default;
