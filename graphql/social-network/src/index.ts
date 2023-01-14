import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http, { IncomingHttpHeaders } from "http";
import cors from "cors";
import mongoose from "mongoose";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/index";
import { Context } from "./types/context";
import { User } from "./models/user";
import jwt from "jsonwebtoken";
import { Post } from "./models/post";
import { UserDataSource } from "./datasources/user";
import { PostDataSource } from "./datasources/post";
import { applyMiddleware } from "graphql-middleware";
import { permissions } from "./middleware";
import { makeExecutableSchema } from "@graphql-tools/schema";

async function start() {
  process.env.JWT_SECRET = "secret";
  let typeDefs = readFileSync("src/schema.graphql", "utf-8");
  let schema = makeExecutableSchema({ typeDefs, resolvers });
  let schemaWithMiddleWare = applyMiddleware(schema, permissions);

  const app = express();

  const httpServer = http.createServer(app);

  // Set up Apollo Server
  const server = new ApolloServer({
    // typeDefs,
    schema: schemaWithMiddleWare,
    // resolvers,
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
        const headers = context.req.headers;
        const authorization = headers.authorization;
        if (!authorization) {
          return {
            user: null,
            res: context.res,
            models: { user: User, post: Post },
            datasources: {
              users: new UserDataSource(),
              posts: new PostDataSource(),
            },
          };
        }
        const decoded = jwt.verify(authorization, process.env.JWT_SECRET!) as {
          id: string;
          username: string;
        };
        const user = await User.findById(decoded.id);
        return {
          user: user,
          res: context.res,
          models: {
            user: User,
            post: Post,
          },
          datasources: {
            users: new UserDataSource(),
            posts: new PostDataSource(),
          },
        };
      },
    })
  );
  httpServer.listen({ port: 4000 }, () =>
    console.log("Server started at port 4000")
  );
}

start();
