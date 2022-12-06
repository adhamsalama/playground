import express, { Request, Response, NextFunction } from "express";
import { createClient } from "redis";
import { RateLimiterRedis } from "rate-limiter-flexible";
const app = express();

async function main() {
  const redisClient = createClient({
    disableOfflineQueue: true,
    url: "redis://localhost:6379",
    legacyMode: true, // ! rate-limiter only supports redis in legacy mode
  });
  await redisClient.connect();
  const rateLimiter = new RateLimiterRedis({
    storeClient: redisClient,
    keyPrefix: "middleware",
    points: 10, // 10 requests
    duration: 60, // per 60 second by IP,
  });
  const rateLimiterMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    rateLimiter
      .consume(req.ip)
      .then(() => {
        next();
      })
      .catch((err) => {
        console.log({ err });
        res.status(429).send("Too Many Requests");
      });
  };
  app.use(rateLimiterMiddleware);
  app.get("/hello", (_, res) => {
    return res.send("hi");
  });
  const PORT = 3000;
  app.listen(PORT, () => console.log(`Server running at port ${PORT}`));
}

main();
