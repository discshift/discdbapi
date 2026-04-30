# TheDiscDB API for JavaScript

[TheDiscDB](https://thediscdb.com) is an open-source optical media database for which this package provides a friendly interface.

This library is designed to work in browsers, Node.js, and any other common JavaScript runtime (like [Bun](https://bun.com)!). It has no dependencies.

**Browser disclaimer:** TheDiscDB does not allow cross-origin requests, so you will have to use a proxy. You can provide a custom origin to the `DiscDBClient` and `DiscDBContributionsClient` classes when initializing.

## Installing

This package is not currently published on NPM. You can install it like so:

```bash
bun add github:discshift/discdbapi
# or
yarn add discdbapi@discshift/discdbapi
# or
npm install git+https://github.com/discshift/discdbapi.git
```

For a full reference, [read the docs](https://discshift.github.io/discdbapi).

## Examples

To get started, import the class and create a client instance.

```ts
import { DiscDBClient } from "discdbapi";

const discdb = new DiscDBClient({
  origin: "https://thediscdb.com", // default
  userAgent: "discdbapi/{version}", // default
});
```

This is your basic class for everything not associated with adding new releases to the database. For contribution information, see [Contributions](https://discshift.github.io/discdbapi/documents/Contributions.html).

### Search media items

```ts
await discdb.search("Shrek", { limit: 50 });
```

### Resolve a media item (movie/series) for a single disc

A unique disc hash may be part of multiple releases. For simplicity, this function will return the first media item returned by the DiscDB API. Unfortunately, this means that it is possible for the returned media item to differ from the content of the disc because it is part of a release with several movies (for example, box sets of a director's films).

To get all media items and releases, prefer [getMediaItemsByDiscHashes](#resolve-media-items-for-multiple-discs).

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

### Resolve media items for multiple discs

Similar to the above example, except that it returns all matching media items for each hash provided to it.

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

### Compute a disc hash

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
const hash = await discdb.hash(files);
console.log(hash);
// "CDF7CFDBD00DE93CC559A2A8F326CC9D"
```

## Development

Pull requests are welcome. Please refrain from using generative AI to wholly compose your contribution, and please check and test its work if you use it in any way. Remember that this is an MIT-licensed repository.

### GraphQL

This package uses [genql](https://github.com/remorses/genql) to generate an internal client based on TheDiscDB's GraphQL schema, ensuring types are accurate and minimizing the work necessary to maintain this library.

The main drawback is that, since TheDiscDB technically has two GraphQL endpoints, two clients must be generated, which contributes to bloat.

Generate the schema for the primary endpoint: `bun generate-gql`
For the contributions endpoint: Download the [schema](https://thediscdb.com/graphql/contributions) as `contributions.graphql`, then `bun generate-cgql` (genql fails to fetch it remotely)
