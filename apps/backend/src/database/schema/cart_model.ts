import mongoose from "mongoose";
const CartItemsSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  quantity: { type: Number, default: 1 },
  price: { type: Number, require: true },
});

const CartSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  cartItems: [CartItemsSchema],
});

export const cartModel = mongoose.model("Cart", CartSchema);
