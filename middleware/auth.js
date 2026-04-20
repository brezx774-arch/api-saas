import fs from "fs";

const DB_FILE = "/root/api-saas/data.json";

export default function auth(req, res, next) {
  const key = req.headers.authorization?.split(" ")[1];

  if (!key) {
    return res.status(401).json({ error: "Missing API key" });
  }

  const db = JSON.parse(fs.readFileSync(DB_FILE));

  const user = db.users.find(u => u.apiKey === key);

  if (!user) {
    return res.status(403).json({ error: "Invalid API key" });
  }

  req.user = user;
  next();
}
