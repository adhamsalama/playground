import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http, { IncomingHttpHeaders } from "http";
import cors from "cors";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/index";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "graphql-tag";
async function start() {
  const _typeDefs = readFileSync("src/schema.graphql", "utf-8");
  const typeDefs = gql(_typeDefs);
  const app = express();

  const httpServer = http.createServer(app);
  // @ts-ignore
  const schema = buildSubgraphSchema({ typeDefs, resolvers });

  // Set up Apollo Server
  const server = new ApolloServer<{
    headers: IncomingHttpHeaders;
  }>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await mongoose
    .connect("mongodb://localhost:27017")
    .then(() => console.log("Connected to MongoDB"));
  mongoose.set("debug", true);

  await server.start();
  app.use(
    cors(),
    express.json(),
    (req, res, next) => {
      // Do something here...
      next();
    },
    expressMiddleware(server, {
      context: async (context) => {
        return { headers: context.req.headers };
      },
    })
  );
  httpServer.listen({ port: 4002 }, () =>
    console.log("Server started at port 4002")
  );
}

start();
