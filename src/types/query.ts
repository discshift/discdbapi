export interface MediaItemsResponse<T> {
  mediaItems: {
    nodes: T[];
  };
}
