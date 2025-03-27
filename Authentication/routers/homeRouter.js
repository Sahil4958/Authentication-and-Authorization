import express from "express";
import authMiddleware from "../middlewares/auth_middleware.js";

const homeRouter = express.Router();

homeRouter.get("/welcome", authMiddleware,(req,res)=>{
    const {username,userId,role} = req.userInfo;

    res.json({
        message : "Welcome to home page",
        user : {
            _id : userId,
            username,
            role
        }
    })
})

export default homeRouter