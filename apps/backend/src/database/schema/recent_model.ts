import mongoose from "mongoose";
const RecentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productIds: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      visitedAt: { type: Date, default: Date.now },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

export const recentModel = mongoose.model("Recent", RecentSchema);
