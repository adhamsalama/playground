import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/schema.graphql",
  generates: {
    "src/generated/graphql.ts": {
      plugins: ["typescript", "typescript-resolvers", "typescript-mongodb"],
    },
    "./graphql.schema.json": {
      plugins: ["introspection"],
    },
  },
  config: {
    mappers: {
      Product: "../types/product#IProduct",
    },
  },
};

export default config;
