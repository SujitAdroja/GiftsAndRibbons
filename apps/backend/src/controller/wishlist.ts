import { wishlist } from "../database/schema/wishlist_model";
import { Request, Response } from "express";
import mongoose from "mongoose";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const getAggregatedWishlist = async (userId: string | undefined) => {
  try {
    const [result] = await wishlist.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$productIds",
      },
      {
        $lookup: {
          from: "products",
          localField: "productIds",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: "$_id",
          userId: 1,
          productId: "$productDetails._id",
          name: "$productDetails.name",
          description: "$productDetails.description",
          category: "$productDetails.category",
          actualPrice: "$productDetails.price",
          images: "$productDetails.images",
          quantity: "$productDetails.quantity",
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          products: {
            $push: {
              _id: "$productId",
              productId: "$productId",
              name: "$name",
              description: "$description",
              category: "$category",
              price: "$actualPrice",
              quantity: "$quantity",
              images: "$images",
            },
          },
        },
      },
      {
        $sort: { orderedAt: -1 }, // Sort newest orders first
      },
    ]);
    return result;
  } catch (error) {
    throw new Error("aggregation unsuccessfull");
  }
};

export const getWishlistItems = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.userId;
  try {
    if (userId) {
      const wishlistItems = await getAggregatedWishlist(userId);
      res.status(200).json({
        success: true,
        message: "Wishlist fetched successfully",
        data: wishlistItems,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error fetching wishlist", error: err });
  }
};

export const addItemsToWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.userId;
  const productId = req?.params?.productId;
  if (!userId || !productId) {
    return res.status(401).json({
      success: false,
      statusCode: 401,
      message: "User ID and Product ID are required",
    });
  }
  console.log("Adding to wishlist", userId, productId);
  try {
    const user = await wishlist.findOne({ userId });
    if (!user) {
      const newWishlist = new wishlist({
        userId: userId,
        productIds: [productId],
      });
      await newWishlist.save();
    } else {
      await wishlist.findOneAndUpdate(
        { userId },
        { $push: { productIds: productId } },
        { new: true }
      );
      const result = await getAggregatedWishlist(userId);
      res.status(200).json({
        success: true,
        message: "Wishlist updated successfully",
        data: result,
      });
    }
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error updating wishlist", error: err });
  }
};

export const removeFromWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.userId;
  const { productId } = req?.params;
  try {
    await wishlist.findOneAndUpdate(
      { userId },
      {
        $pull: { productIds: productId },
      },
      { new: true }
    );
    const result = await getAggregatedWishlist(userId);
    res.status(200).json({
      success: true,
      message: "Wishlist updated successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error updating wishlist", error: err });
  }
};
