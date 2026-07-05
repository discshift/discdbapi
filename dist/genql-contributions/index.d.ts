import type { ContributionQueryGenqlSelection, ContributionQuery, ContributionMutationsGenqlSelection, ContributionMutations } from './schema';
import { type FieldsSelection, type GraphqlOperation, type ClientOptions, GenqlError } from './runtime';
export type { FieldsSelection } from './runtime';
export { GenqlError };
export * from './schema';
export interface Client {
    query<R extends ContributionQueryGenqlSelection>(request: R & {
        __name?: string;
    }): Promise<FieldsSelection<ContributionQuery, R>>;
    mutation<R extends ContributionMutationsGenqlSelection>(request: R & {
        __name?: string;
    }): Promise<FieldsSelection<ContributionMutations, R>>;
}
export declare const createClient: (options?: ClientOptions) => Client;
export declare const everything: {
    __scalar: boolean;
};
export type QueryResult<fields extends ContributionQueryGenqlSelection> = FieldsSelection<ContributionQuery, fields>;
export declare const generateQueryOp: (fields: ContributionQueryGenqlSelection & {
    __name?: string;
}) => GraphqlOperation;
export type MutationResult<fields extends ContributionMutationsGenqlSelection> = FieldsSelection<ContributionMutations, fields>;
export declare const generateMutationOp: (fields: ContributionMutationsGenqlSelection & {
    __name?: string;
}) => GraphqlOperation;
