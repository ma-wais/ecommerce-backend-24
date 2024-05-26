import express from "express";
import { adminOnly } from "../middlewares/auth.js";
import {
  allCoupons,
  applyDiscount,
  createPaymentIntent,
  deleteCoupon,
  newCoupon,
} from "../controllers/payment.js";

const app = express.Router();

// route - /api/v1/payment/create
app.post("/create", createPaymentIntent);

// route - /api/v1/payment/coupon/new
app.get("/discount", applyDiscount);

// route - /api/v1/payment/coupon/new
app.post("/coupon/new", newCoupon);

// route - /api/v1/payment/coupon/all
app.get("/coupon/all", allCoupons);

// route - /api/v1/payment/coupon/:id
app.delete("/coupon/:id",deleteCoupon);

export default app;
