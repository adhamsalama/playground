import { ApolloServer } from "@apollo/server";
import { ApolloGateway } from "@apollo/gateway";
import express from "express";
import cors from "cors";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import { expressMiddleware } from "@apollo/server/express4";

async function start() {
  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    gateway: new ApolloGateway({
      serviceList: [
        { name: "users", url: "http://localhost:4001" },
        { name: "products", url: "http://localhost:4002" },
      ],
    }),
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
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
  httpServer.listen({ port: 4000 }, () =>
    console.log("Server started at port 4000")
  );
}

start();
