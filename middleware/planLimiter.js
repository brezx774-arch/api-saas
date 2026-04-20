import fs from "fs";
import { PLANS } from "../config/plans.js";

const DB_FILE = "./data.json";

function loadDB() {
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export default function planLimiter(req, res, next) {
  const db = loadDB();
  const user = req.user;

  if (!user) return res.status(401).json({ error: "Unauthorized" });

  const plan = user.plan || "free";
  const limit = PLANS[plan].requestsPerDay;

  if (!db.usage[user.email]) {
    db.usage[user.email] = {
      count: 0,
      date: new Date().toDateString(),
    };
  }

  const usage = db.usage[user.email];
  const today = new Date().toDateString();

  if (usage.date !== today) {
    usage.count = 0;
    usage.date = today;
  }

  if (usage.count >= limit) {
    return res.status(429).json({
      error: "API limit reached",
      plan,
      limit,
    });
  }

  usage.count += 1;
  saveDB(db);

  req.plan = plan;
  next();
}
