import { userModel } from "../database/schema/user_model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

export const registerUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const name = firstName + lastName;
    console.log(name, "name");
    console.log(name, email, password, "auth registering");
    const newUser = new userModel({ name, email, password });
    await newUser.save();
    // res.status(200).json({ message: "User registered successfully" });
    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
      data: newUser,
    });
  } catch (error) {
    // res.status(400).json({ error: "User already exists" });
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: "Registration Unsuccessfull",
        error: {
          details: error.message,
        },
      });
    }
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
    if (!accessTokenSecret) {
      throw new Error(
        "ACCESS_TOKEN_SECRET is not defined in environment variables"
      );
    }
    const authToken = jwt.sign(
      { userId: user._id, ...user.toObject(), password: " " },
      accessTokenSecret,
      {
        expiresIn: "1d",
      }
    );

    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: false, // Only sent over HTTPS
      maxAge: 24 * 60 * 60 * 1000, // Cookie expiration (e.g., 1 day)
      sameSite: "lax",
    });
    res.status(200).json({
      success: true,
      message: "Login Successfull",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: "Login Unsuccessfull",
        error: {
          details: error.message,
        },
      });
    }
  }
};

interface AuthenticatedRequest extends Request {
  user?: { userId: string };
}

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user?.userId;
    if (!userId) {
      return res
        .status(401)
        .json({ error: "Unauthorized: user not found in request" });
    }
    const { firstName, lastName, mobile, extension, address, email } =
      req?.body;
    const user = await userModel.findByIdAndUpdate(userId, {
      firstName,
      lastName,
      mobile,
      email,
      extension,
      address,
    });
    // res.status(200).json(user);
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: "User update unsuccessful",
        error: {
          details: error.message,
        },
      });
    }
  }
};

export async function userDetails(req: AuthenticatedRequest, res: Response) {
  try {
    const userId = req.user?.userId;
    console.log(userId);
    const user = await userModel.findById(userId);
    console.log(user);
    if (!user)
      return res.status(404).json({
        success: false,
        message: "No user found",
        error: {
          details: "user not found ",
        },
      });
    res.status(200).json({
      success: true,
      message: "user details found successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: "No user found",
        error: {
          details: error.message,
        },
      });
    }
  }
}

export function logout(req: Request, res: Response) {
  try {
    res.clearCookie("authToken");
    res
      .status(200)
      .json({ message: "Logged out successfully", data: null, success: true });
  } catch (error) {
    if (error instanceof Error) {
      res.status(404).json({
        success: false,
        message: "Logout Unsuccessful",
        error: {
          details: error.message,
        },
      });
    }
  }
}
