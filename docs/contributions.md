---
title: Contributions
group: Documents
category: Guides
---

This package implements almost all of the endpoints required to create and manage contributions on TheDiscDB. As these are mostly authenticated endpoints, you will have to populate `options.cookies` when initializing the {@link contributions!DiscDBContributionsClient | client} with a cookie string for the site. I haven't done any reverse engineering per authorization, so it'll just be easier to copy the entire `Cookie` value from your browser. TheDiscDB uses session expiry for its cookies, but they may have an additional validity window internally.

Lifecycle of a contribution:
1. Select media type of the release ({@link types!MediaItemType | MediaItemType})
2. Search for the media to obtain its TMDB ID: {@link contributions!DiscDBContributionsClient#externalSearch | externalSearch}
3. Obtain or generate an `uploaderId` UUID (unknown)
4. Upload front image (required) and back image (optional): {@link contributions!DiscDBContributionsClient#uploadTemporalContributionImage | uploadTemporalContributionImage}
5. Create the release with its details: TMDB ID and uploaded image details -> {@link contributions!DiscDBContributionsClient#createContribution | createContribution} -> returns contribution ID
6. Add a disc:
    1. Hash the disc: contribution ID and files -> {@link contributions!DiscDBContributionsClient#hash | hash} -> returns hash
    2. Create the disc with its details: contribution ID and hash -> {@link contributions!DiscDBContributionsClient#createDisc | createDisc} -> returns encoded ID
    3. Upload MakeMKV logs for the disc: contribution ID and disc ID -> {@link contributions!DiscDBContributionsClient#uploadDiscLogs | uploadDiscLogs}
    4. Identify items: contribution ID and disc ID -> {@link contributions!DiscDBContributionsClient#addItemToDisc addItemToDisc}
7. Submit for review: discdbapi cannot do this currently. You will need to manually visit `https://thediscdb.com/contribution/{contributionId}/review` and click "Submit for Review"
