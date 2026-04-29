---
title: Resource Identifiers
group: Documents
category: Guides
---

TheDiscDB provides most resources with integer IDs, but for some types, they are [not guaranteed](https://github.com/TheDiscDb/web/issues/9#issuecomment-3651767444) to always refer to the same object. Instead, use the following properties/combinations of properties:

- Media Items: `slug`
- Releases: `mediaItem.slug` + `slug`
- Discs: `release.mediaItem.slug` + `release.slug` + `index`

> [!TIP]
> If possible, the `contentHash` of the disc should be stored and used for identification, but keep in mind the same disc may be a member of several releases, and also that not all discs have a calculated hash. If you need to identify a disc within a specific release, use its index paired with the release's key.
