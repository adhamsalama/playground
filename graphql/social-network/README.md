# GraphQL + TypeScript + MongoDB

Resources:

- [Mappers](https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers#mappers---overwrite-parents-and-resolved-values)

  - Fixes returning Mongoose documents to GraphQL

- [Context](https://www.apollographql.com/docs/apollo-server/integrations/building-integrations/#overviews)

  - How to add context

- [Context Generic for Apollo Server](https://github.com/apollographql/apollo-server/commit/d1b5b6abffdaa0440c7e95aa598a5d5a37b7066a)
  - Fixes the issue where expressMiddleware(server) was causing and error by specifying the right context to Apollo Server
