import type { NodeRelease, TitleType } from "./node";

export interface Boxset {
  id: number;
  title: string | null;
  sortTitle: string | null;
  slug: string | null;
  imageUrl: string | null;
  release: NodeRelease | null;
  releaseId: number;
  type: TitleType;
}
