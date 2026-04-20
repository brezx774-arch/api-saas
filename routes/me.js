import express from "express";
import fs from "fs";

const router = express.Router();
const DB_FILE = "/root/api-saas/data.json";

/* GET CURRENT USER INFO */
router.get("/me", (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  const db = JSON.parse(fs.readFileSync(DB_FILE));

  const user = db.users.find(
    (u) => u.apiKey === token || u.token === token
  );

  if (!user) {
    return res.status(401).json({ error: "Invalid token" });
  }

  res.json({
    email: user.email,
    apiKey: user.apiKey,
    plan: user.plan || "free",
    usage: user.usage || 0
  });
});

export default router;
