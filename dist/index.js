// package.json
var version = "0.1.0";

// src/constants.ts
var DISCDB_ORIGIN = "https://thediscdb.com";

// src/graphql.ts
var fullNodeQuery = `
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
var queries = {
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
    }`
};

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
  async fetch(path, options) {
    const response = await fetch(new URL(path, this.origin), {
      method: options?.method ?? "GET",
      ...options,
      headers: {
        ...options?.headers,
        "User-Agent": `discdbapi/${version}`
      }
    });
    if (!response.ok) {
      throw Error(`${response.status} ${response.statusText}: ${await response.text()}`);
    }
    const { data } = await response.json();
    return data;
  }
  graphql(operationName, variables) {
    return this.fetch("/graphql", {
      body: JSON.stringify({
        operationName,
        query: queries[operationName],
        variables
      }),
      headers: { "Content-Type": "application/json" }
    });
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
  async getReleaseBySlug(mediaItemSlug, slug) {
    const data = await this.graphql("GetReleasesBySlugs", {
      mediaItemSlug,
      slug
    });
    const node = data.mediaItems.nodes[0];
    if (!node) {
      throw Error(`No such release matching slugs ${mediaItemSlug} / ${slug}`);
    }
    const release = node.releases.find((r) => r.slug === slug);
    if (!release) {
      throw Error(`No such release for item ${mediaItemSlug} with slug ${slug}`);
    }
    return {
      ...release,
      mediaItem: {
        ...node,
        releases: node.releases.filter((r) => r.slug !== release.slug)
      }
    };
  }
  async getMediaItemByExternalIds(ids) {
    const data = await this.graphql("GetMediaItemsByExternalIds", {
      imdbId: ids.imdbId ?? "",
      tmdbId: ids.tmdbId ?? "",
      tvdbId: ids.tvdbId ?? ""
    });
    const node = data.mediaItems.nodes[0];
    if (!node) {
      throw Error(`No media item matching any external IDs from ${JSON.stringify(ids)}`);
    }
    return node;
  }
  async hash(files) {
    const data = await this.fetch("/api/hash", {
      method: "POST",
      body: JSON.stringify({
        Files: files.map((file, i) => file instanceof File ? {
          Index: i + 1,
          Name: file.name,
          Size: file.size,
          CreationTime: new Date(file.lastModified).toISOString()
        } : {
          Index: file.index,
          Name: file.name,
          Size: file.size,
          CreationTime: new Date(file.created).toISOString()
        })
      }),
      headers: {
        "Content-Type": "application/json"
      }
    });
    return data.hash;
  }
}
// src/types/media.ts
var MediaItemType;
((MediaItemType2) => {
  MediaItemType2["Movie"] = "Movie";
  MediaItemType2["Series"] = "Series";
})(MediaItemType ||= {});
var DiscFormat;
((DiscFormat2) => {
  DiscFormat2["DVD"] = "DVD";
  DiscFormat2["Bluray"] = "Blu-Ray";
  DiscFormat2["UHD"] = "UHD";
})(DiscFormat ||= {});
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
  MediaItemType,
  ItemType,
  DiscFormat,
  DiscDBClient
};
