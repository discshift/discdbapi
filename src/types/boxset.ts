import type { Release, TitleType } from "./media";

export interface Boxset {
  id: number;
  title: string | null;
  sortTitle: string | null;
  slug: string | null;
  imageUrl: string | null;
  release: Release | null;
  releaseId: number;
  type: TitleType;
}
