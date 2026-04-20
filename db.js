import fs from "fs";

const DB_FILE = "./data.json";

let db = { users: [] };

if (fs.existsSync(DB_FILE)) {
  db = JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB() {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

export default db;
export { saveDB };
