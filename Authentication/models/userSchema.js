import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // only allow 'user' or 'admin' roles
      default: "user",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
