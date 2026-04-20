import express from "express";
import fs from "fs";
import { BILLING_PLANS } from "../config/billingPlans.js";

const router = express.Router();
const DB_FILE = "/root/api-saas/data.json";

/* PAYPAL SUCCESS WEBHOOK (simplified) */
router.post("/paypal-success", (req, res) => {
  const { email, plan } = req.body;

  const db = JSON.parse(fs.readFileSync(DB_FILE));

  const user = db.users.find(u => u.email === email);

  if (user) {
    user.plan = plan;
    user.apiLimit = BILLING_PLANS[plan].apiLimit;
  }

  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));

  res.json({ success: true });
});

export default router;
