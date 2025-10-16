import type { MediaItem } from "./node";

export interface MediaItemsResponse {
  mediaItems: {
    nodes: MediaItem[];
  };
}
