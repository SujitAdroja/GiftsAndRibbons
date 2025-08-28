import express from "express";
import { findSingleOrder, getAllOrders } from "../controller/order";
const router = express.Router();

router.route("/").get(getAllOrders);
router.route("/:orderId").get(findSingleOrder);
export const OrderRoutes = router;
