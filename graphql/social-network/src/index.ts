import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http, { IncomingHttpHeaders } from "http";
import cors from "cors";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/index";

async function start() {
  const typeDefs = readFileSync("src/schema.graphql", "utf-8");

  const app = express();

  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer<{
    headers: IncomingHttpHeaders;
  }>({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      // ? https://github.com/apollographql/apollo-server/commit/d1b5b6abffdaa0440c7e95aa598a5d5a37b7066a
      // {
      //   async requestDidStart({ contextValue }) {
      //     console.log({ contextValue });
      //     return new Promise((resolve, reject) => resolve());
      //   },
      // },
    ],
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
    // ? https://www.apollographql.com/docs/apollo-server/integrations/building-integrations/#overviews
    expressMiddleware(server, {
      context: async (context) => {
        console.log({ context });
        return { headers: context.req.headers };
      },
    })
  );
  httpServer.listen({ port: 4000 }, () =>
    console.log("Server started at port 4000")
  );
}

start();
