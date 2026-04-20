import express from "express";
import paypalClient from "../config/paypal.js";
import { BILLING_PLANS } from "../config/billingPlans.js";

const router = express.Router();

/* CREATE ORDER */
router.post("/create-order", async (req, res) => {
  const { plan } = req.body;

  const planData = BILLING_PLANS[plan];

  const request = new paypal.orders.OrdersCreateRequest();

  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: "USD",
          value: planData.price
        }
      }
    ]
  });

  const order = await paypalClient.execute(request);

  res.json({ id: order.result.id });
});

export default router;
