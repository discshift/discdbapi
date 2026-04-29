---
title: Images
group: Documents
category: Guides
---

For media items and releases, TheDiscDB returns image _paths_ in `imageUrl` properties, for example, the `imageUrl` of the movie ['Round Midnight (1986)](https://thediscdb.com/movie/round-midnight-1986) would be `Movie/round-midnight-1986/cover.jpg`.

To convert these paths to usable URLs, the application must use {@link client!DiscDBClient#getImageUrl | getImageUrl} to automatically prepend the client's origin, as well as optionally suffix with size parameters, to which the image will be scaled and cropped (but not stretched or contained)

```ts
const url = client.getImageUrl("Movie/round-midnight-1986/cover.jpg", { width: 200, height: 300 });
console.log(url);
// https://thediscdb.com/images/Movie/round-midnight-1986/cover.jpg?width=200&height=300
```

There is also a non-class-bound version of {@link common!getImageUrl | getImageUrl} which omits the convenience step of passing in the client's origin automatically.
