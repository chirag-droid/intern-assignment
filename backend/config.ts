import dotenv from "dotenv";

dotenv.config();

export const port = process.env.PORT || 3000;
export const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
export const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

if (!redisUrl || !redisToken) {
   throw new Error("Redis URL or Token not found");
}
