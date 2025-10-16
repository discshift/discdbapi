# discdbapi

This package is written, tested, and built with Bun, but it doesn't use any Bun APIs, so it should also work in browsers and in Node. I haven't confirmed, but I doubt DiscDB allows cross-origin requests, so you may have to run a proxy if you are running in a browser environment. You can provide a custom origin to the `DiscDBClient` class when initializing.

## Installing

This package should be considered unstable; breaking changes may be pushed. For this reason it is not published on NPM, you can instead install it like so:

```
yarn add discshift/discdbapi
```

... which will install the latest commit on the main branch.

## Usage

```ts
import { DiscDBClient } from "discdbapi";

const discdb = new DiscDBClient();

// Resolve media information (movie/series) for a single disc
const item = await discdb.getMediaItemByDiscHash("CDF7CFDBD00DE93CC559A2A8F326CC9D");
console.log(item);
// {
//   id: 164,
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

// Resolve media information for multiple discs
const itemsMap = await discdb.getMediaItemsByDiscHashes(["CDF7CFDBD00DE93CC559A2A8F326CC9D", "2114BF5CB3693167AE8FF4E9B0753531"]);
console.log(itemsMap);
// {
//   CDF7CFDBD00DE93CC559A2A8F326CC9D: [
//     {
//       id: 164,
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
//       id: 5,
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
