import { orderModel } from "../database/schema/order_model";
import { Request, Response } from "express";
import mongoose from "mongoose";
interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const getAllOrders = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.userId;

  try {
    const result = await orderModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId), // Match by real ObjectId
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: "$productDetails._id",
          orderId: "$_id",
          userId: 1,
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
          address: "$userDetails.address",
          mobile: "$userDetails.mobile",
          extension: "$userDetails.extension",
          orderedAt: "$placedAt",
          quantity: "$products.quantity",
          priceInOrder: "$products.price",
          productId: "$products.productId",
          productName: "$productDetails.name",
          productDescription: "$productDetails.description",
          category: "$productDetails.category",
          actualPrice: "$productDetails.price",
          images: "$productDetails.images",
          status: "$status",
          paymentStatus: "$paymentStatus",
          totalAmount: "$totalAmount",
          totalQuantity: "$totalQuantity",
        },
      },
      {
        $group: {
          _id: "$orderId",
          userId: { $first: "$userId" },
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          address: { $first: "$address" },
          mobile: { $first: "$mobile" },
          extension: { $first: "$extension" },
          orderedAt: { $first: "$orderedAt" },
          status: { $first: "$status" },
          paymentStatus: { $first: "$paymentStatus" },
          priceInOrder: { $first: "$priceInOrder" },
          totalAmount: { $first: "$totalAmount" },
          totalQuantity: { $first: "$totalQuantity" },
          products: {
            $push: {
              productId: "$productId",
              productName: "$productName",
              productDescription: "$productDescription",
              category: "$category",
              actualPrice: "$actualPrice",
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

    // res.json(result);
    res.status(200).json({
      success: true,
      message: "Orders Aggregation successfully",
      data: result,
    });
  } catch (err) {
    if (err instanceof Error) {
      // res.json({ ERROR: err.message });
      res.status(404).json({
        success: false,
        message: "Order Aggregation unsuccessfull",
        error: {
          details: err.message,
        },
      });
    }
  }
};

export const findSingleOrder = async function (req: Request, res: Response) {
  const orderId = req.params.orderId;
  console.log(orderId);
  try {
    // const order = await orderModel.findById({ _id: orderId });
    const [result] = await orderModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(orderId), // Match by real ObjectId
        },
      },
      {
        $unwind: "$products",
      },
      {
        $lookup: {
          from: "products",
          localField: "products.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          _id: "$productDetails._id",
          orderId: "$_id",
          userId: 1,
          firstName: "$userDetails.firstName",
          lastName: "$userDetails.lastName",
          address: "$userDetails.address",
          mobile: "$userDetails.mobile",
          extension: "$userDetails.extension",
          orderedAt: "$placedAt",
          quantity: "$products.quantity",
          productDescription: "$productDetails.description",
          priceInOrder: "$products.price",
          productId: "$products.productId",
          productName: "$productDetails.name",
          category: "$productDetails.category",
          actualPrice: "$productDetails.price",
          images: "$productDetails.images",
          status: "$status",
          paymentStatus: "$paymentStatus",
          totalAmount: "$totalAmount",
          totalQuantity: "$totalQuantity",
          payment_id: "$payment_id",
        },
      },
      {
        $group: {
          _id: "$orderId",
          payment_id: { $first: "$payment_id" },
          userId: { $first: "$userId" },
          firstName: { $first: "$firstName" },
          lastName: { $first: "$lastName" },
          address: { $first: "$address" },
          mobile: { $first: "$mobile" },
          extension: { $first: "$extension" },
          orderedAt: { $first: "$orderedAt" },
          status: { $first: "$status" },
          paymentStatus: { $first: "$paymentStatus" },
          priceInOrder: { $first: "$priceInOrder" },
          totalAmount: { $first: "$totalAmount" },
          totalQuantity: { $first: "$totalQuantity" },
          products: {
            $push: {
              productId: "$productId",
              productName: "$productName",
              category: "$category",
              actualPrice: "$actualPrice",
              productDescription: "$productDescription",
              quantity: "$quantity",
              images: "$images",
            },
          },
        },
      },
    ]);
    if (!result) throw new Error("order not found in database");
    res.status(200).json({
      success: true,
      message: "order found successfully",
      data: result,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: "Order not found in Database",
        error: error.message,
      });
    }
  }
};
