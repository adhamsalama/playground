import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "./src/schema.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  // ? https://the-guild.dev/graphql/codegen/plugins/typescript/typescript-resolvers#mappers---overwrite-parents-and-resolved-values
  config: {
    mappers: {
      User: "../types/user#IUser",
      Post: "../types/post#IPost",
    },
  },
};

export default config;
