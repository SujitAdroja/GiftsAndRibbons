import mongoose from "mongoose";
import { userAddressSchema } from "./user_model";
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  payment_id: String,
  status: {
    type: String,
    enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
    default: "pending",
  },

  paymentStatus: {
    type: String,
    enum: ["unpaid", "paid", "failed", "refunded"],
    default: "unpaid",
  },

  paymentMethod: {
    type: String,
    enum: ["card", "cod", "wallet"],
    required: true,
    default: "card",
  },

  shippingAddress: userAddressSchema,

  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number,
      price: Number,
    },
  ],

  totalAmount: Number,
  shippingFee: Number,
  totalQuantity: Number,
  placedAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const OrderSchema = orderSchema;
export const orderModel = mongoose.model("Orders", orderSchema);
