import express from "express";
const router = express.Router();

import {
  getCart,
  addToCart,
  clearCart,
  updateCart,
  removeItemFromCart,
  checkOutCart,
} from "../controller/cart";

router.route("/").get(getCart);
router.route("/addToCart").post(addToCart);
router.route("/clear").patch(clearCart);
router.route("/update/:id/:action").patch(updateCart);
router.route("/remove/:id").patch(removeItemFromCart);
router.route("/checkout/:payment_id").post(checkOutCart);

export const cartRouter = router;
