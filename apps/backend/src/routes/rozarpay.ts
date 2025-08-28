import express from "express";
const router = express.Router();
import Razorpay from "razorpay";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});
router.route("/").post(async (req, res) => {
  try {
    const amount = req.body.amount;
    console.log(amount);
    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    });
    console.log(order);
    res
      .status(200)
      .json({ message: "payment success full", orderId: order.id });
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

export const razorpayRoutes = router;
