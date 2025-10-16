// src/constants.ts
var DISCDB_ORIGIN = "https://thediscdb.com";

// src/graphql.ts
var queries = {
  GetDiscDetailByContentHashes: `
    query GetDiscDetailByContentHashes($hashes: [String]) {
    mediaItems(
      where: {
        releases: { some: { discs: { some: { contentHash: { in: $hashes } } } } }
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
    }
  }`
};
// package.json
var version = "0.1.0";

// src/client.ts
var getImageUrl = (path, origin) => new URL(path, `${origin ?? DISCDB_ORIGIN}/images/`).href;

class DiscDBClient {
  origin = DISCDB_ORIGIN;
  constructor(options) {
    if (options?.origin) {
      this.origin = options.origin;
    }
  }
  getImageUrl(path) {
    return getImageUrl(path, this.origin);
  }
  async graphql(operationName, variables) {
    const response = await fetch(new URL("/graphql", this.origin), {
      method: "POST",
      body: JSON.stringify({
        operationName,
        query: queries[operationName],
        variables
      }),
      headers: {
        "Content-Type": "application/json",
        "User-Agent": `discdbapi/${version}`
      }
    });
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}: ${await response.text()}`);
    }
    const { data } = await response.json();
    return data;
  }
  async getMediaItemByDiscHash(hash) {
    const data = await this.graphql("GetDiscDetailByContentHashes", { hashes: [hash] });
    const node = data.mediaItems.nodes[0];
    if (!node) {
      throw Error(`No such disc with hash "${hash}"`);
    }
    return node;
  }
  async getMediaItemsByDiscHashes(hashes) {
    const data = await this.graphql("GetDiscDetailByContentHashes", { hashes });
    const nodes = data.mediaItems.nodes;
    const results = Object.fromEntries(hashes.map((hash) => [hash, []]));
    for (const node of nodes) {
      for (const release of node.releases) {
        for (const disc of release.discs) {
          if (disc.contentHash && hashes.includes(disc.contentHash)) {
            if (results[disc.contentHash]) {
              results[disc.contentHash]?.push(node);
            } else {
              results[disc.contentHash] = [node];
            }
          }
        }
      }
    }
    return results;
  }
}
// src/types/media.ts
var TitleType;
((TitleType2) => {
  TitleType2["Movie"] = "Movie";
  TitleType2["Series"] = "Series";
})(TitleType ||= {});
// src/types/title.ts
var ItemType;
((ItemType2) => {
  ItemType2["MainMovie"] = "MainMovie";
  ItemType2["DeletedScene"] = "DeletedScene";
  ItemType2["Trailer"] = "Trailer";
  ItemType2["Extra"] = "Extra";
  ItemType2["Episode"] = "Episode";
})(ItemType ||= {});
export {
  getImageUrl,
  TitleType,
  ItemType,
  DiscDBClient
};
