// const express = require("express");
import express from "express";

import {
  registerUser,
  loginUser,
  updateUser,
  userDetails,
} from "../controller/auth";
import { auth } from "../middleware/auth";
const router = express.Router();

// Register a new user
router.route("/register").post(registerUser);
//Login user and generate JWT token
router.route("/login").post(loginUser);
router.route("/update").put(updateUser);
router.route("/user").get(auth, userDetails);

export const userRoutes = router;
