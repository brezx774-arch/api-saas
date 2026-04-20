import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

const users = [
  {
    email: "test@test.com",
    apiKey: "sk_live_test",
    plan: "free",
    usage: 0
  }
];

function auth(req, res, next) {
  const token = req.headers.authorization?.replace("Bearer ", "");
  const user = users.find(u => u.apiKey === token);

  if (!user) return res.status(401).json({ error: "No token" });

  req.user = user;
  next();
}

app.get("/api/me", auth, (req, res) => {
  res.json(req.user);
});

app.get("/api/ip", auth, (req, res) => {
  req.user.usage++;

  res.json({
    domain: req.query.domain,
    ip: "1.2.3.4",
    plan: req.user.plan,
    usage: req.user.usage
  });
});

// 🔥 IMPORTANT FIX HERE
app.listen(4000, "0.0.0.0", () => {
  console.log("API running on 0.0.0.0:4000");
});
