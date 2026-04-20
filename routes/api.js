import express from "express";
import dns from "dns/promises";
import fs from "fs";
import { PLANS } from "../config/plans.js";
import { incrementUsage } from "../utils/usage.js";
import auth from "../middleware/auth.js";

const router = express.Router();

const DB_FILE = "/root/api-saas/data.json";

function getUser(apiKey) {
  const db = JSON.parse(fs.readFileSync(DB_FILE));
  return db.users.find(u => u.apiKey === apiKey);
}

/* IP API (SAAS CORE) */
router.get("/ip", auth, async (req, res) => {
  const { domain } = req.query;

  const user = req.user;

  const plan = user.plan || "free";
  const limit = PLANS[plan].limit;

  if (user.usage >= limit) {
    return res.status(429).json({ error: "Plan limit reached" });
  }

  const result = await dns.lookup(domain);

  incrementUsage(user.apiKey);

  res.json({
    domain,
    ip: result.address,
    usage: user.usage + 1,
    limit
  });
});

export default router;
