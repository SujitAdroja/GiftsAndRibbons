import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const addressSchema = new mongoose.Schema({
  addressLine1: String,
  addressLine2: String,
  state: String,
  city: String,
  pincode: Number,
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: Number },
  extension: { type: Number },
  address: addressSchema,
});

// Hash password before saving
userSchema.pre("save", async function (this: any, next: any) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const userModel = mongoose.model("User", userSchema);
export const userAddressSchema = addressSchema;
