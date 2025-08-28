import express from "express";
const router = express.Router();

import {
  addProductWishlist,
  createProduct,
  getAllProductCategory,
  getAllProducts,
  getProductsBySearch,
  getSingleProduct,
} from "../controller/products";
import { auth } from "../middleware/auth";

router.route("/products").get(getAllProducts);
router.route("/product").post(createProduct);
router.route("/product/:id").get(getSingleProduct);
router.route("/products/category").get(getAllProductCategory);
router.route("/products/addtowishlist/:id").post(auth, addProductWishlist);
router.route("/products/search").get(getProductsBySearch);

export const productRouter = router;
