import { categoryModel } from "../database/schema/category_model";
import { productModel } from "../database/schema/product_model";
import { Request, Response } from "express";

interface AuthenticatedRequest extends Request {
  params: any;
  user?: { userId: string };
}

export const createProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const {
      name,
      description,
      price,
      discountPrice,
      stock,
      images,
      features,
      tags,
      category,
    } = req.body;

    const categoryDoc = await categoryModel.findOne({ name: category });
    if (!categoryDoc) {
      return res.status(400).json({ error: "Category not found" });
    }
    const categoryId = categoryDoc._id;

    const product = new productModel({
      name,
      description,
      price,
      discountPrice,
      stock,
      images: images.split(",").map((i: any) => i.trim()),
      features: features.split(",").map((f: any) => f.trim()),
      tags: tags.split(",").map((f: any) => f.trim()),
      category,
      categoryId,
    });

    await product.save();

    res.status(200).json({
      sucess: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: "There was an error creating the order",
        error: error.message,
      });
    }
  }
};

export const getAllProducts = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const products = await productModel.find();
    if (products.length > 0)
      res.status(200).json({
        success: true,
        message: "Products Fetched successfully",
        data: products,
      });
    else throw new Error("No Product Found!! Please Add New Products.");
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: "No data available",
        error: err.message,
      });
    }
  }
};

export const getSingleProduct = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const productId = req.params?.id;
    const product = await productModel.findById(productId);
    if (product)
      res.status(200).json({
        success: true,
        message: "Product found successfully",
        data: [product],
      });
    else throw new Error("No Product Found");
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: "No product found ",
        error: err.message,
      });
    }
  }
};

export const getAllProductCategory = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const categoriesQuery = req.query.categories as string | undefined;
    console.log(categoriesQuery, "categoriesQuery");
    let products;

    if (!categoriesQuery || categoriesQuery.trim() === "") {
      products = await productModel.find();
    } else {
      const categoryNames = categoriesQuery.split(",").map((c) => c.trim());

      const categories = await categoryModel.find({
        name: { $in: categoryNames },
      });

      if (categories.length === 0) {
        return res.status(404).json({
          success: false,
          message: "No categories found",
        });
      }

      const categoryIds = categories.map((cat) => cat._id);

      products = await productModel.find({ categoryId: { $in: categoryIds } });
    }

    if (products.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
};

export const addProductWishlist = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.userId;

    if (!userId)
      return res.status(401).json({
        success: false,
        error: "Unauthorized",
        data: [],
      });

    const productId = req.params?.id;
    const product = await productModel.findByIdAndUpdate(
      productId,
      { wishlist: true },
      { new: true }
    );

    if (product)
      res.status(200).json({
        success: true,
        message: "Product wishlist updated successfully",
        data: product,
      });
    else throw new Error("No Product Found");
  } catch (err) {
    if (err instanceof Error) {
      res.status(404).json({
        success: false,
        message: "No product found ",
        error: err.message,
      });
    }
  }
};

export async function getProductsBySearch(
  req: AuthenticatedRequest,
  res: Response
) {
  try {
    const searchQuery = req.query.q as string;

    if (!searchQuery || searchQuery.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const products = await productModel.find({
      name: { $regex: new RegExp(searchQuery, "i") },
    });
    console.log(products, "products search query");

    if (products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      data: products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: err instanceof Error ? err.message : err,
    });
  }
}
