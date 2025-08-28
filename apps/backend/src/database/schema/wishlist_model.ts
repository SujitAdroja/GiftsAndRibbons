import mongoose from "mongoose";
const Wishlist = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, require: true },
  productIds: [mongoose.Schema.Types.ObjectId],
});

export const wishlist = mongoose.model("Wishlist", Wishlist);
