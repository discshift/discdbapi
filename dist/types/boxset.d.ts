import type { MediaItemType, Release } from "./media";
export interface Boxset {
    title: string | null;
    sortTitle: string | null;
    slug: string | null;
    imageUrl: string | null;
    release: Release | null;
    type: MediaItemType;
}
