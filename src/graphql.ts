const fullNodeQuery = `
  nodes {
    title
    year
    slug
    imageUrl
    type
    externalids {
      tmdb
      imdb
      tvdb
    }
    releases {
      slug
      locale
      regionCode
      year
      title
      imageUrl
      discs(order: { index: ASC }) {
        contentHash
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
`;

export const queries = {
  GetDiscDetailByContentHashes: `
    query GetDiscDetailByContentHashes($hashes: [String]) {
      mediaItems(
        where: {
          releases: { some: { discs: { some: { contentHash: { in: $hashes } } } } }
        }
      ) {
        ${fullNodeQuery}
      }
    }`,
  GetReleasesBySlugs: `
    query GetReleasesBySlugs($mediaItemSlug: String, $slug: String) {
      mediaItems(
        where: {
          slug: { eq: $mediaItemSlug },
          releases: { some: { slug: { eq: $slug } } }
        }
      ) {
        ${fullNodeQuery}
      }
    }`,
  GetMediaItemsByExternalIds: `
    query GetMediaItemsByExternalIds($imdbId: String, $tmdbId: String, $tvdbId: String) {
      mediaItems(
        where: {
          externalids: {
            or: [
              { imdb: { eq: $imdbId } },
              { tmdb: { eq: $tmdbId } },
              { tvdb: { eq: $tvdbId } }
            ]
          }
        }
      ) {
        ${fullNodeQuery}
      }
    }`,
  // GetMovies:
  //   'query GetMovies($after: String, $order: [MediaItemSortInput!]) { mediaItems(where: { type: { eq: "Movie" } }, order: $order, after: $after) { __typename nodes { __typename slug year title type imageUrl releases { __typename slug locale year title discs { __typename index name format ... on Disc { id } } ... on Release { id } } ... on MediaItem { id } } pageInfo { __typename hasNextPage hasPreviousPage startCursor endCursor } } }',
};
