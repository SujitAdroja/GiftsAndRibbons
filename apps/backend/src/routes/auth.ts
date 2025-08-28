// const express = require("express");
import express from "express";

// import registerUser, loginUser, updateUser according to their export style in ../controller/auth
import {
  registerUser,
  loginUser,
  updateUser,
  userDetails,
  logout,
} from "../controller/auth";
import { auth } from "../middleware/auth";
const router = express.Router();

// Register a new user
router.route("/register").post(registerUser);
//Login user and generate JWT token
router.route("/login").post(loginUser);
router.route("/update").patch(auth, updateUser);
router.route("/user").get(auth, userDetails);
router.route("/logout").post(auth, logout);
router.route("/user").patch(auth, updateUser);

export const authRoutes = router;
