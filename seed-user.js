import fs from "fs";

const DB_FILE = "./data.json";

const db = JSON.parse(fs.readFileSync(DB_FILE));

db.users.push({
  email: "test@test.com",
  password: "123456",
  apiKey: "sk_live_test_key"
});

fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

console.log("User seeded");
