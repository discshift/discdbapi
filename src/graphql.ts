export const queries = {
  GetDiscDetailByContentHash: `
    query GetDiscDetailByContentHash($hash: String) {
    mediaItems(
      where: {
        releases: { some: { discs: { some: { contentHash: { eq: $hash } } } } }
      }
    ) {
      nodes {
        id
        title
        year
        slug
        imageUrl
        type
        releases {
          slug
          locale
          regionCode
          year
          title
          imageUrl
          discs(order: { index: ASC }) {
            index
            name
            format
            slug
            titles(order: { index: ASC }) {
              index
              duration
              displaySize
              sourceFile
              size
              segmentMap
              item {
                title
                season
                episode
                type
                chapters(order: { index: ASC }) {
                  index
                  title
                }
              }
            }
          }
        }
      }
    }
  }`,
  // GetMovies:
  //   'query GetMovies($after: String, $order: [MediaItemSortInput!]) { mediaItems(where: { type: { eq: "Movie" } }, order: $order, after: $after) { __typename nodes { __typename slug year title type imageUrl releases { __typename slug locale year title discs { __typename index name format ... on Disc { id } } ... on Release { id } } ... on MediaItem { id } } pageInfo { __typename hasNextPage hasPreviousPage startCursor endCursor } } }',
};
