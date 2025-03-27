import express from "express";
import authMiddleware from "../middlewares/auth_middleware.js";
import isAdmin from "../middlewares/admin_middleware.js";

const adminRouter = express.Router();

adminRouter.get("/welcome", authMiddleware, isAdmin, (req, res) => {
  res.json({ message: "Welcome to Admin Page" });
});

export default adminRouter;
