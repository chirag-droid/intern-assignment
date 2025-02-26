import { Router } from "express";
import redis from "../cache";

const router: Router = Router();

router.post("/clearCache", async (_req, res) => {
   await redis.flushdb();
   res.json({ message: "Redis cache cleared successfully!" });
});

export default router;
