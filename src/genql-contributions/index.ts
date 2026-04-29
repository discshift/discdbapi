// @ts-nocheck
import type {
  ContributionQueryGenqlSelection,
  ContributionQuery,
  ContributionMutationsGenqlSelection,
  ContributionMutations,
} from './schema'
import {
  linkTypeMap,
  createClient as createClientOriginal,
  generateGraphqlOperation,
  type FieldsSelection,
  type GraphqlOperation,
  type ClientOptions,
  GenqlError,
} from './runtime'
export type { FieldsSelection } from './runtime'
export { GenqlError }

import types from './types'
export * from './schema'
const typeMap = linkTypeMap(types as any)

export interface Client {
  query<R extends ContributionQueryGenqlSelection>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<ContributionQuery, R>>

  mutation<R extends ContributionMutationsGenqlSelection>(
    request: R & { __name?: string },
  ): Promise<FieldsSelection<ContributionMutations, R>>
}

export const createClient = function (options?: ClientOptions): Client {
  return createClientOriginal({
    url: undefined,

    ...options,
    queryRoot: typeMap.Query!,
    mutationRoot: typeMap.Mutation!,
    subscriptionRoot: typeMap.Subscription!,
  }) as any
}

export const everything = {
  __scalar: true,
}

export type QueryResult<fields extends ContributionQueryGenqlSelection> =
  FieldsSelection<ContributionQuery, fields>
export const generateQueryOp: (
  fields: ContributionQueryGenqlSelection & { __name?: string },
) => GraphqlOperation = function (fields) {
  return generateGraphqlOperation('query', typeMap.Query!, fields as any)
}

export type MutationResult<fields extends ContributionMutationsGenqlSelection> =
  FieldsSelection<ContributionMutations, fields>
export const generateMutationOp: (
  fields: ContributionMutationsGenqlSelection & { __name?: string },
) => GraphqlOperation = function (fields) {
  return generateGraphqlOperation('mutation', typeMap.Mutation!, fields as any)
}
