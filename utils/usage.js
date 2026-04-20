import fs from "fs";

const DB_FILE = "/root/api-saas/data.json";

export function incrementUsage(apiKey) {
  const db = JSON.parse(fs.readFileSync(DB_FILE));

  const user = db.users.find(u => u.apiKey === apiKey);

  if (!user) return;

  if (!user.usage) user.usage = 0;

  user.usage += 1;

  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}
