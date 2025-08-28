import express from "express";
import {
  getWishlistItems,
  addItemsToWishlist,
  removeFromWishlist,
} from "../controller/wishlist";
const router = express.Router();

router.route("/").get(getWishlistItems);
router.route("/addtowishlist/:productId").post(addItemsToWishlist);
router.route("/removeFromWishlist/:productId").delete(removeFromWishlist);

export const wishlistRouter = router;
