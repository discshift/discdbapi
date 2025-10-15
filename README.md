# discdbapi

This package is written and tested with Bun, but it doesn't use any Bun APIs, so it should also work in browsers and in Node. I haven't confirmed, but I doubt DiscDB allows cross-origin requests, so you may have to run a proxy if you are running in a browser environment. You can provide a custom origin to the `DiscDBClient` class when initializing.

## Usage

```js
const client = new DiscDBClient();
const item = await client.getMediaItemByDiscHash("CDF7CFDBD00DE93CC559A2A8F326CC9D");
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
```
