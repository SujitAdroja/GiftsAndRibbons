import mongoose from "mongoose";
import { recentModel } from "../database/schema/recent_model";
import { Response, Request } from "express";
interface AuthenticatedRequest extends Request {
  params: any;
  user?: { userId: string };
}

const recentlyVisitedAggregation = async (userId: string | undefined) => {
  try {
    const [result] = await recentModel.aggregate([
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
          localField: "productIds.productId",
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
          visitedAt: "$productDetails.visitedAt",
        },
      },
      {
        $group: {
          _id: "$_id",
          userId: { $first: "$userId" },
          products: {
            $push: {
              _id: "$productId",
              name: "$name",
              description: "$description",
              category: "$category",
              price: "$actualPrice",
              quantity: "$quantity",
              images: "$images",
              visitedAt: "$visitedAt",
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

export const addRecentlyVisited = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.userId;
  const productId = req?.params?.productId;
  if (!userId || !productId) {
    return res.status(401).send({
      success: false,
      statusCode: 401,
      message: "User ID and Product ID are required",
    });
  }
  try {
    const user = await recentModel.findOne({ userId });

    if (!user) {
      // Create new recent list
      const newRecent = new recentModel({
        userId,
        recents: [{ productId, visitedAt: new Date() }],
      });
      await newRecent.save();
    } else {
      // Remove if already exists

      user.set(
        "productIds",
        user.productIds.filter(
          (r: any) => r?.productId?.toString() !== productId
        )
      );
      // Add at the top
      user.productIds.unshift({ productId, visitedAt: new Date() });

      // Keep only latest 5
      user.set("productIds", user.productIds.slice(0, 5));
      user.set("productIds", user.productIds);

      await user.save();
    }
    const result = await recentlyVisitedAggregation(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No recently visited products found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recently visited updated successfully",
      data: result,
    });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Error updating wishlist", error: err });
  }
};

export async function getRecentlyVisited(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res.status(401).send({
        success: false,
        statusCode: 401,
        message: "User ID is required",
      });
    }
    const result = await recentlyVisitedAggregation(userId);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "No recently visited products found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Recently visited fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching recently visited",
      error: error,
    });
  }
}
