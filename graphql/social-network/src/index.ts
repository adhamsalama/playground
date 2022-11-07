import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { readFileSync } from "fs";
import { resolvers } from "./resolvers/index";
import mongoose from "mongoose";
// The GraphQL schema
const typeDefs = readFileSync("src/schema.graphql", "utf-8");

const app = express();
const httpServer = http.createServer(app);

// Set up Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

async function start() {
  await mongoose
    .connect("mongodb://localhost:27017")
    .then(() => console.log("Connected to MongoDB"));
  await server.start();
  // @ts-ignore
  app.use(cors(), bodyParser.json(), expressMiddleware(server));

  httpServer.listen({ port: 4000 }, () =>
    console.log("Server started at port 4000")
  );
}

start();
