---
title: Advanced Usage
group: Documents
category: Guides
---

### GraphQL

Most functions in this library execute GraphQL queries or mutations. You may access the underlying typed client to compose custom queries with {@link client!DiscDBClient#gql | DiscDBClient#gql} or {@link contributions!DiscDBContributionsClient#gql | DiscDBContributionsClient#gql}.

Respectively, documentation for these two modules is available at {@link genql!} and {@link genql-contributions!}. Because TheDiscDB publishes two separate GraphQL endpoints, two clients must be generated in this library.
