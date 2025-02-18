import { Redis } from "@upstash/redis";

import { redisUrl, redisToken } from "./config";

const redis = new Redis({
   url: redisUrl,
   token: redisToken,
});

export default redis;
