import type { MediaItem } from "./media";

export interface MediaItemsResponse {
  mediaItems: {
    nodes: MediaItem[];
  };
}
