// const jwt = require("jsonwebtoken");

import jwt from "jsonwebtoken";
import { Response, Request, NextFunction } from "express";
import { setSourceMapsSupport } from "module";

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}
export const auth = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  // cookies -> hhtp
  // const authToken = req.header("Authorization")?.split(" ")[1];

  const authToken = req.cookies.authToken;

  if (!authToken)
    return res
      .status(404)
      .json({ success: false, message: "Access denied. No token provided." });

  try {
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return res.status(500).json({
        success: false,
        message: "Internal server error. Token secret not configured.",
      });
    }
    const decode = jwt.verify(authToken, secret);
    if (
      typeof decode === "object" &&
      decode !== null &&
      "userId" in decode &&
      typeof (decode as any).userId === "string"
    ) {
      req.user = { userId: (decode as any).userId };
      next();
    } else {
      return res
        .status(404)
        .json({ success: false, error: "Invalid Token Payload" });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Try to login using the new token",
      error: "Invalid Token",
    });
  }
};
