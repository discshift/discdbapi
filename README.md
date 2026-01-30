# discdbapi

TypeScript package for interfacing with [TheDiscDB](https://thediscdb.com), an open-source optical media database.

This package is written, tested, and built with Bun, but it doesn't use any Bun APIs, so it will also work in browsers and in Node. DiscDB does not allow cross-origin requests, so you will have to use a proxy if you are running in a browser environment: you can provide a custom origin to the `DiscDBClient` class when initializing.

## Installing

This package should be considered unstable; breaking changes may be pushed. For this reason it is not published on NPM, you can instead install it like so:

```bash
yarn add discdbapi@discshift/discdbapi
# or
npm install git+https://github.com/discshift/discdbapi.git
```

... which will install the latest commit on the main branch.

## Usage

To get started, import the class and create a client instance. The only option currently available to its constructor is `origin`, for use with proxies.

```ts
import { DiscDBClient } from "discdbapi";

const discdb = new DiscDBClient({
  origin: "https://thediscdb.com", // default
});
```

**Resolve a media item (movie/series) for a single disc**

Given releases that are part of boxsets (which may include multiple movies, for example), a unique disc hash may be part of multiple releases, which each may represent different media items. For simplicity, this function will return the first media item returned by the DiscDB API. Unfortunately, this means that it is possible for the returned media item to differ from the content of the disc because it is part of a release with several movies.

For all media items and releases, prefer `getMediaItemsByDiscHashes`.

```ts
const item = await discdb.getMediaItemByDiscHash("CDF7CFDBD00DE93CC559A2A8F326CC9D");
console.log(item);
// {
//   title: "Double Indemnity",
//   year: 1944,
//   slug: "double-indemnity-1944",
//   imageUrl: "Movie/double-indemnity-1944/cover.jpg",
//   type: "Movie",
//   releases: [
//     {
//       slug: "2022-criterion-4k",
//       locale: "en-us",
//       regionCode: "1",
//       year: 2022,
//       title: "Criterion 4K",
//       imageUrl: "Movie/double-indemnity-1944/2022-criterion-4k.jpg",
//       discs: [ /* ... */ ],
//     },
//     {
//       slug: "2022-criterion-bluray",
//       locale: "en-us",
//       regionCode: "A",
//       year: 2022,
//       title: "Criterion Blu-ray",
//       imageUrl: "Movie/double-indemnity-1944/2022-criterion-bluray.jpg",
//       discs: [ /* ... */ ],
//     },
//   ],
// }
```

**Resolve media items for multiple discs**

```ts
const itemsMap = await discdb.getMediaItemsByDiscHashes(["CDF7CFDBD00DE93CC559A2A8F326CC9D", "2114BF5CB3693167AE8FF4E9B0753531"]);
console.log(itemsMap);
// {
//   CDF7CFDBD00DE93CC559A2A8F326CC9D: [
//     {
//       title: "Double Indemnity",
//       year: 1944,
//       slug: "double-indemnity-1944",
//       imageUrl: "Movie/double-indemnity-1944/cover.jpg",
//       type: "Movie",
//       releases: [ /* ... */ ],
//     }
//   ],
//   "2114BF5CB3693167AE8FF4E9B0753531": [
//     {
//       title: "2001: A Space Odyssey",
//       year: 1968,
//       slug: "2001-a-space-odyssey-1968",
//       imageUrl: "Movie/2001-a-space-odyssey-1968/cover.jpg",
//       type: "Movie",
//       releases: [ /* ... */ ],
//     }
//   ],
// }
```

**Compute a disc hash**

When looking up a specific disc, its hash is the most advisable method of identification. As this package is attempting to maintain compatibility with browsers, there is no filesystem functionality here. Instead, you may pass applicable files to the method, either fitting the `FileHashInfo` interface or as `File` objects.

For DVDs, pass all files in `VIDEO_TS`. For Blu-rays, pass all `.m2ts` files in `BDMV/STREAM`.

```ts
const files = [
  {
    index: 1,
    name: "VIDEO_TS.BUP",
    size: 36864,
    created: 1164931320000,
  },
  // ...
];
const hash = await client.hash(files);
console.log(hash);
// "CDF7CFDBD00DE93CC559A2A8F326CC9D"
```

**Create image URLs**

TheDiscDB returns image paths in `imageUrl` properties, for example, the `imageUrl` of the movie `round-midnight-1986` would be `Movie/round-midnight-1986/cover.jpg`. The client may also request custom sizes, to which the image will be scaled and cropped (but not stretched or contained)

```ts
const url = client.getImageUrl("Movie/round-midnight-1986/cover.jpg", { width: 200, height: 300 });
console.log(url);
// https://thediscdb.com/images/Movie/round-midnight-1986/cover.jpg?width=200&height=300
```

There is also a non-class-bound version of `getImageUrl` which omits the convenience step of passing in the client's `origin` automatically.

### Identifying resources uniquely

TheDiscDB provides resources with integer IDs, but unfortunately they are not guaranteed to always refer to the same object.

- Media Items: `slug`
- Releases: `mediaItem.slug` + `slug`
- Discs: `release.mediaItem.slug` + `release.slug` + `index`
  - If possible, the `contentHash` of the disc should be stored and used for identification, but keep in mind the same disc may be a member of several releases, and also that not all discs have a calculated hash. If you need to identify a disc within a specific release, use its index paired with the release's key.
