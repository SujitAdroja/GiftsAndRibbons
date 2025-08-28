import express from "express";
import {
  addRecentlyVisited,
  getRecentlyVisited,
} from "../controller/recentlyVisited";
const router = express.Router();

router.route("/:productId").post(addRecentlyVisited);
router.route("/").get(getRecentlyVisited);
export const RecentlyVisitedRoutes = router;
