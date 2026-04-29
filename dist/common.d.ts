import type { PageInfo } from "./genql";
/**
 * Returns a qualified image URL from a path. If only one dimension is
 * provided, the other dimension will be resized automatically, maintaining
 * the original aspect ratio.
 */
export declare const getImageUrl: (path: string, options?: {
    origin?: string;
    width?: number;
    height?: number;
}) => string;
/**
 * Sometimes media item types are returned in lowercase by the server.
 * This function casts them to their appropriate enum values and returns the
 * iterable in place.
 *
 * @internal
 */
export declare const fixMediaTypes: <K extends string, I extends Iterable<Record<K, string>>>(items: I, key: K) => I;
/** @internal */
export type BidirectionalPaginationQuery<F, S> = {
    /** Filter results by this query */
    query?: F;
    /** Sort asc/desc by a specific property */
    sort?: S[];
    /** Returns the elements in the list that come after the specified cursor */
    after?: string;
    /** Returns the first _n_ elements from the list */
    first?: number;
} | {
    /** Filter results by this query */
    query?: F;
    /** Sort asc/desc by a specific property */
    sort?: S[];
    /** Returns the elements in the list that come before the specified cursor (use to paginate backwards) */
    before?: string;
    /** Returns the last _n_ elements from the list (use to paginate backwards) */
    last?: number;
};
/** @internal */
export declare const unifyPageInfo: (input: BidirectionalPaginationQuery<unknown, unknown> | undefined, info: Omit<PageInfo, "__typename">) => {
    cursor: PageInfo;
    hasMoreData: PageInfo;
};
/** @internal */
export declare const unifyPageArgs: <F, S>(input: BidirectionalPaginationQuery<F, S> | undefined) => {
    first: number;
    last: number;
    after: string;
    before: string;
    where: F;
    order: S[];
};
