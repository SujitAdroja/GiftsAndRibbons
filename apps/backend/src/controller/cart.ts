import mongoose from "mongoose";
import { cartModel } from "../database/schema/cart_model";
import { orderModel } from "../database/schema/order_model";
import { productModel } from "../database/schema/product_model";
import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

const getAggregatedCart = async (userId: string | undefined) => {
  return await cartModel.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $unwind: "$cartItems",
    },
    {
      $lookup: {
        from: "products",
        localField: "cartItems.productId",
        foreignField: "_id",
        as: "productDetails",
      },
    },
    {
      $unwind: "$productDetails",
    },
    {
      $project: {
        _id: 0,
        userId: 1,
        productId: "$productDetails._id",
        quantity: "$cartItems.quantity",
        price: "$cartItems.price",
        name: "$productDetails.name",
        images: "$productDetails.images",
        description: "$productDetails.description",
        category: "$productDetails.category",
      },
    },
    {
      $group: {
        _id: "$userId",
        cartItems: {
          $push: {
            productId: "$productId",
            quantity: "$quantity",
            price: "$price",
            name: "$name",
            images: "$images",
            description: "$description",
            category: "$category",
          },
        },
      },
    },
  ]);
};

export const getCart = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user?.userId;
  try {
    const cart = await cartModel.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $unwind: "$cartItems",
      },
      {
        $lookup: {
          from: "products",
          localField: "cartItems.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails",
      },
      {
        $project: {
          _id: 0,
          userId: 1,
          productId: "$productDetails._id",
          quantity: "$cartItems.quantity",
          price: "$cartItems.price",
          name: "$productDetails.name",
          images: "$productDetails.images",
          description: "$productDetails.description",
          category: "$productDetails.category",
        },
      },
      {
        $group: {
          _id: "$userId",
          cartItems: {
            $push: {
              productId: "$productId",
              quantity: "$quantity",
              price: "$price",
              name: "$name",
              images: "$images",
              description: "$description",
              category: "$category",
            },
          },
        },
      },
    ]);
    res.status(200).json({
      success: true,
      message: "Cart retrieved successfully",
      data: cart,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving cart",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
  const { productId, quantity, price } = req.body;

  const userId = req.user?.userId;
  try {
    // First check if the cart and product already exist
    const existingCart = await cartModel.findOne({
      userId,
      "cartItems.productId": productId,
    });

    if (existingCart) {
      const product = await productModel.findById(productId);
      if (!product) throw new Error("Product not found");

      const cart = await cartModel.findOne({ userId });
      if (!cart) throw new Error("Cart not found");

      const item = cart.cartItems.find(
        (item: any) => item.productId.toString() === productId
      );

      if (!item) throw new Error("Product not in cart");

      // 🧮 Calculate new quantity and price
      const newQuantity = item.quantity + quantity;
      const updatedPrice = newQuantity * price;

      // If product exists in cart → increment quantity
      await cartModel.findOneAndUpdate(
        { userId, "cartItems.productId": productId },
        {
          $set: {
            "cartItems.$.quantity": newQuantity,
            "cartItems.$.price": updatedPrice,
          },
        },

        { new: true }
      );
    } else {
      // If product not in cart or cart doesn't exist → push new item
      await cartModel.findOneAndUpdate(
        { userId },
        {
          $push: {
            cartItems: {
              productId: productId,
              quantity: quantity,
              price: quantity * price,
            },
          },
        },
        { new: true, upsert: true }
      );
    }
    const updatedCart = await getCart(req, res);
    console.log(updatedCart, "updated cart in add to cart");
    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (error) {
    if (error instanceof Error) {
      return res.status(404).json({
        success: false,
        message: "cart  updated unsuccessfully",
        error: error.message,
      });
    }
  }
};

export const updateCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    const { action, id: productId } = req.params;

    if (!userId || !productId)
      return res
        .status(400)
        .json({ success: false, message: "Invalid request" });

    const product = await productModel.findById(productId);
    if (!product || typeof product.price !== "number")
      return res
        .status(400)
        .json({ success: false, message: "Invalid product or price" });

    // Find the cart that already contains the specific product
    const cart = await cartModel.findOne(
      { userId, "cartItems.productId": productId },
      { "cartItems.$": 1 }
    );
    if (!cart)
      return res
        .status(404)
        .json({ success: false, message: "Product not found in cart" });

    const item = cart.cartItems[0]; // Only matched item returned
    let updateQuery;

    if (action === "Increment") {
      updateQuery = {
        $inc: { "cartItems.$.quantity": 1, "cartItems.$.price": product.price },
      };
    } else if (action === "Decrement") {
      updateQuery =
        item.quantity > 1
          ? {
              $inc: {
                "cartItems.$.quantity": -1,
                "cartItems.$.price": -product.price,
              },
            }
          : { $pull: { cartItems: { productId } } };
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Invalid action" });
    }

    const updatedCart = await cartModel.findOneAndUpdate(
      { userId, ...(updateQuery.$inc && { "cartItems.productId": productId }) },
      updateQuery,
      { new: true }
    );

    const newCart = await getAggregatedCart(userId);

    const totalPrice = newCart[0]?.cartItems.reduce(
      (sum: number, i: any) => sum + i?.price,
      0
    );

    res.status(200).json({
      success: true,
      message: "Cart updated",
      data: { newCart, totalPrice },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err instanceof Error ? err.message : "Server error",
    });
  }
};

export const clearCart = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.user;
  try {
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      { cartItems: [] }
    );

    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: "Cart updated not successfully",
        error: err.message,
      });
    }
  }
};

export const removeItemFromCart = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.userId;
  const productId = req.params.id;
  try {
    await cartModel.findOneAndUpdate(
      { userId },
      { $pull: { cartItems: { productId } } },
      { new: true }
    );

    const updatedCart = await getAggregatedCart(userId);
    res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedCart,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: "Cart updated not successfully",
        error: err.message,
      });
    }
  }
};

export const checkOutCart = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.user?.userId;
  const payment_id = req.params?.payment_id;
  try {
    const cart = await cartModel.findOne({ userId });
    if (!cart) res.status(500).json("No Items in the cart");

    const products = cart?.cartItems.map((item: any) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      };
    });

    const totalAmount = products?.reduce(
      (sum: any, p: any) => sum + p.price,
      0
    );
    const totalQuantity = products?.reduce(
      (sum: any, p: any) => sum + p.quantity,
      0
    );
    const order = new orderModel({
      userId: userId,
      payment_id: payment_id,
      products: products,
      paymentMethod: "card",
      paymentStatus: "paid",
      shippingAddress: {
        addressLine1: "303 uma avenue",
        addressLine2: "mahajan nagar",
        state: "Maharashtra",
        city: "Nashik",
        pincode: 422010,
      },
      shippingFees: 400,
      totalAmount,
      totalQuantity,
    });
    await order.save();
    const deletedCart = await cartModel.deleteOne({ userId });
    res.status(200).json({
      success: true,
      message: "checkout cart successfully",
      data: { orderDetails: order, cartDetails: deletedCart },
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: "Item not added to the orders",
        error: err.message,
      });
    }
  }
};
